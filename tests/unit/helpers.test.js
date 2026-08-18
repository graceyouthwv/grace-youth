import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate, processImageUpload } from '../../src/utils/helpers.js';

describe('Unit Tests: Helpers (formatDate & Helpers)', () => {
  it('should return empty string when dateString is null or undefined', () => {
    assert.strictEqual(formatDate(null), '');
    assert.strictEqual(formatDate(undefined), '');
    assert.strictEqual(formatDate(''), '');
  });

  it('should return provided date string if valid', () => {
    assert.strictEqual(formatDate('2026-08-18'), '2026-08-18');
    assert.strictEqual(formatDate('Aug 18, 2026'), 'Aug 18, 2026');
  });

  it('should reject processImageUpload when invalid file or non-image is passed', async () => {
    await assert.rejects(
      async () => await processImageUpload(null),
      /No file selected/
    );

    const fakePdfFile = { name: 'document.pdf', type: 'application/pdf' };
    await assert.rejects(
      async () => await processImageUpload(fakePdfFile),
      /Please upload a valid image file/
    );
  });
});
