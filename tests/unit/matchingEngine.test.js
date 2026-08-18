import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateMatchScore, GOSPEL_SESSION_FRAMEWORK } from '../../src/utils/matchingEngine.js';

describe('Unit Tests: Matching Engine (calculateMatchScore)', () => {
  const baseTutor = {
    campusId: 'upv-miagao',
    category: 'Engineering & Tech',
    subjects: ['Calculus 1', 'Physics', 'Computer Science'],
    rating: 4.9,
    preferredMode: 'In-Person (Miag-ao Campus) & Online',
    slots: [{ day: 'Monday', time: '4:00 PM', mode: 'In-Person' }]
  };

  it('should award maximum score (100) for exact campus, exact subject, and top rating', () => {
    const request = {
      campusId: 'upv-miagao',
      subject: 'Calculus 1',
      category: 'Engineering & Tech'
    };

    const result = calculateMatchScore(request, baseTutor);
    assert.strictEqual(result.score, 100);
    assert.ok(result.reasons.includes('Same Campus'));
    assert.ok(result.reasons.includes('Exact Subject Match'));
    assert.ok(result.reasons.includes('Top-Rated Mentor'));
  });

  it('should award online compatibility score when campus differs but tutor supports online', () => {
    const request = {
      campusId: 'cpu-iloilo',
      subject: 'Physics',
      category: 'Engineering & Tech'
    };

    const result = calculateMatchScore(request, baseTutor);
    // 25 (online) + 40 (subject) + 20 (rating) = 85
    assert.strictEqual(result.score, 85);
    assert.ok(result.reasons.includes('Online Compatible'));
    assert.ok(result.reasons.includes('Exact Subject Match'));
  });

  it('should fall back to category score when exact subject is not listed', () => {
    const request = {
      campusId: 'upv-miagao',
      subject: 'Thermodynamics',
      category: 'Engineering & Tech'
    };

    const result = calculateMatchScore(request, baseTutor);
    // 40 (campus) + 25 (category) + 20 (rating) = 85
    assert.strictEqual(result.score, 85);
    assert.ok(result.reasons.includes('Same Campus'));
    assert.ok(result.reasons.includes('Category Expert'));
  });

  it('should cap score at 100 even if total points exceed 100', () => {
    const request = {
      campusId: 'upv-miagao',
      subject: 'Calculus 1',
      category: 'Engineering & Tech'
    };

    const result = calculateMatchScore(request, baseTutor);
    assert.ok(result.score <= 100);
  });

  it('should handle partial or case-insensitive subject matches', () => {
    const request = {
      campusId: 'upv-miagao',
      subject: 'calculus',
      category: 'Engineering & Tech'
    };

    const result = calculateMatchScore(request, baseTutor);
    assert.ok(result.reasons.includes('Exact Subject Match'));
  });

  it('should handle undefined or null request values gracefully without throwing', () => {
    const request = {};
    const minimalTutor = { campusId: 'cpu' };

    assert.doesNotThrow(() => {
      const res = calculateMatchScore(request, minimalTutor);
      assert.strictEqual(typeof res.score, 'number');
      assert.ok(Array.isArray(res.reasons));
    });
  });

  it('should verify Gospel Session Framework phases structure', () => {
    assert.ok(GOSPEL_SESSION_FRAMEWORK.phases.length === 3);
    assert.strictEqual(GOSPEL_SESSION_FRAMEWORK.phases[0].step, '1');
    assert.strictEqual(GOSPEL_SESSION_FRAMEWORK.phases[0].title, 'Life Check & Gospel Bridge');
    assert.strictEqual(GOSPEL_SESSION_FRAMEWORK.phases[1].step, '2');
    assert.strictEqual(GOSPEL_SESSION_FRAMEWORK.phases[2].step, '3');
  });
});
