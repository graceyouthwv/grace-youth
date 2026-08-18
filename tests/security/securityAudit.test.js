import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../../');
const SRC_DIR = path.join(ROOT_DIR, 'src');

const getAllFiles = (dir, extList = ['.js', '.jsx', '.html']) => {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        files = files.concat(getAllFiles(fullPath, extList));
      }
    } else if (extList.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
};

describe('Security Audit & Static Code Analysis', () => {
  const allSourceFiles = getAllFiles(SRC_DIR);

  it('should find all source files for auditing', () => {
    assert.ok(allSourceFiles.length > 30, `Expected > 30 source files, found ${allSourceFiles.length}`);
  });

  it('should not contain any instances of dangerouslySetInnerHTML', () => {
    const violations = [];
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (content.includes('dangerouslySetInnerHTML')) {
        violations.push(path.relative(ROOT_DIR, file));
      }
    }
    assert.deepStrictEqual(violations, [], `Found dangerouslySetInnerHTML in: ${violations.join(', ')}`);
  });

  it('should not contain any unsafe javascript: URLs in JSX href attributes', () => {
    const violations = [];
    const jsHrefRegex = /href\s*=\s*['"]\s*javascript:/i;
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (jsHrefRegex.test(content)) {
        violations.push(path.relative(ROOT_DIR, file));
      }
    }
    assert.deepStrictEqual(violations, [], `Found unsafe javascript: href in: ${violations.join(', ')}`);
  });

  it('should not contain eval() or new Function() code execution', () => {
    const violations = [];
    const evalRegex = /\beval\s*\(|\bnew\s+Function\s*\(/;
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (evalRegex.test(content)) {
        violations.push(path.relative(ROOT_DIR, file));
      }
    }
    assert.deepStrictEqual(violations, [], `Found eval / new Function in: ${violations.join(', ')}`);
  });

  it('should not hardcode private service role keys or secrets in source code', () => {
    const violations = [];
    const secretPatterns = [
      /SUPABASE_SERVICE_ROLE_KEY/i,
      /service_role/i,
      /-----BEGIN PRIVATE KEY-----/
    ];

    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const pattern of secretPatterns) {
        if (pattern.test(content)) {
          // Allow mock comments or demo hints if not an actual secret
          if (!file.includes('demoAccounts.js') && !content.includes('placeholder')) {
            violations.push(`${path.relative(ROOT_DIR, file)} matched ${pattern}`);
          }
        }
      }
    }
    assert.deepStrictEqual(violations, [], `Found potential secret leakage: ${violations.join(', ')}`);
  });

  it('should ensure all external links with target="_blank" include rel="noopener noreferrer" or rel="noreferrer"', () => {
    const violations = [];
    const blankRegex = /<a[^>]+target\s*=\s*['"]_blank['"][^>]*>/g;

    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const matches = content.match(blankRegex) || [];
      for (const match of matches) {
        if (!match.includes('rel=') || (!match.includes('noreferrer') && !match.includes('noopener'))) {
          violations.push(`${path.relative(ROOT_DIR, file)}: ${match}`);
        }
      }
    }

    if (violations.length > 0) {
      console.warn('Tabnabbing advisory - target="_blank" without rel="noopener noreferrer":', violations);
    }
    // We assert to track this as a QA test
    assert.strictEqual(violations.length, 0, `External links missing rel="noopener noreferrer": ${JSON.stringify(violations, null, 2)}`);
  });
});
