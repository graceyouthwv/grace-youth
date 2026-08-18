import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import path from 'path';
import fs from 'fs';
import { EventEmitter } from 'events';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
  '.webp': 'image/webp'
};

const handleHttpRequest = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers?.host || 'localhost'}`);
  let reqPath = decodeURIComponent(parsedUrl.pathname);

  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (indexErr, indexContent) => {
        if (indexErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error loading application.');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-cache'
        });
        res.end(indexContent.toString('utf-8'));
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const isImmutable = reqPath.startsWith('/assets/');

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': isImmutable ? 'public, max-age=31536000, immutable' : 'no-cache'
    });

    const content = fs.readFileSync(filePath);
    res.end(content.toString('utf-8'));
  });
};

class MockResponse extends EventEmitter {
  constructor() {
    super();
    this.statusCode = 200;
    this.headers = {};
    this.body = '';
  }

  writeHead(statusCode, headers = {}) {
    this.statusCode = statusCode;
    Object.assign(this.headers, headers);
  }

  end(data = '') {
    this.body += data;
    this.emit('finish');
  }
}

const executeRequest = (url, headers = { host: 'localhost' }) => {
  return new Promise((resolve) => {
    const req = { url, headers };
    const res = new MockResponse();
    res.on('finish', () => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: res.body
      });
    });
    handleHttpRequest(req, res);
  });
};

describe('Security & Integration Tests: Static File Server Handler', () => {
  it('should serve index.html for root path "/" with correct MIME and Cache-Control', async () => {
    const res = await executeRequest('/');
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.headers['Content-Type']?.includes('text/html'));
    assert.strictEqual(res.headers['Cache-Control'], 'no-cache');
    assert.ok(res.body.includes('<!doctype html>') || res.body.includes('<html'));
  });

  it('should block directory traversal using URL-encoded dot-dots with 403 Forbidden (/assets/..%2f..%2fpackage.json)', async () => {
    const res = await executeRequest('/assets/..%2f..%2fpackage.json');
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body, 'Forbidden');
  });

  it('should block URL encoded traversal to root server files (/assets/..%2f..%2fserver.js)', async () => {
    const res = await executeRequest('/assets/..%2f..%2fserver.js');
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body, 'Forbidden');
  });

  it('should block complex traversal patterns (/assets/..%2f..%2f.env)', async () => {
    const res = await executeRequest('/assets/..%2f..%2f.env');
    assert.strictEqual(res.statusCode, 403);
    assert.strictEqual(res.body, 'Forbidden');
  });

  it('should safely fall back to SPA index.html on arbitrary client-side routes (e.g. /tutorials/calculus-1)', async () => {
    const res = await executeRequest('/tutorials/calculus-1');
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.headers['Content-Type']?.includes('text/html'));
    assert.ok(res.body.includes('<!doctype html>') || res.body.includes('<html'));
  });
});
