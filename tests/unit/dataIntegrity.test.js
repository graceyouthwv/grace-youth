import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { PH_REGIONS, getRegionById } from '../../src/data/regions.js';
import { CAMPUSES } from '../../src/data/campuses.js';
import { INITIAL_TUTORS } from '../../src/data/tutors.js';
import { DEMO_ACCOUNTS } from '../../src/data/demoAccounts.js';
import { INITIAL_BIBLE_STUDIES, DISCIPLESHIP_STAGES } from '../../src/data/bibleStudies.js';
import { INITIAL_EVENTS } from '../../src/data/events.js';
import { DAILY_DEVOTIONALS } from '../../src/data/devotionals.js';
import { INITIAL_CAMPAIGNS } from '../../src/data/campaigns.js';
import { INITIAL_REVIEWERS } from '../../src/data/reviewers.js';
import { INITIAL_PRAYERS } from '../../src/data/prayers.js';

describe('Unit Tests: Data Integrity & Production State', () => {
  it('should have valid Philippines regions with unique IDs', () => {
    assert.ok(PH_REGIONS.length >= 17, 'Should cover all 17 regions + nationwide');
    const ids = PH_REGIONS.map(r => r.id);
    const uniqueIds = new Set(ids);
    assert.strictEqual(ids.length, uniqueIds.size, 'Region IDs must be unique');

    // Test getRegionById fallback
    assert.strictEqual(getRegionById('unknown-region-id').id, 'all');
    assert.strictEqual(getRegionById('ncr').name.includes('Metro Manila'), true);
  });

  it('should have valid campuses with unique IDs and valid region mapping', () => {
    assert.ok(CAMPUSES.length > 0, 'Campuses array should not be empty');
    const validRegionIds = new Set(PH_REGIONS.map(r => r.id));
    const campusIds = new Set();

    for (const campus of CAMPUSES) {
      assert.ok(campus.id, `Campus missing id: ${JSON.stringify(campus)}`);
      assert.ok(!campusIds.has(campus.id), `Duplicate campus id: ${campus.id}`);
      campusIds.add(campus.id);

      assert.ok(campus.name, `Campus ${campus.id} missing name`);
      assert.ok(campus.shortName, `Campus ${campus.id} missing shortName`);
      assert.ok(campus.regionId, `Campus ${campus.id} missing regionId`);
      assert.ok(validRegionIds.has(campus.regionId), `Campus ${campus.id} has invalid regionId: ${campus.regionId}`);
    }
  });

  it('should ensure production data collections are clean empty arrays', () => {
    assert.ok(Array.isArray(INITIAL_TUTORS));
    assert.strictEqual(INITIAL_TUTORS.length, 0, 'INITIAL_TUTORS must be empty');

    assert.ok(Array.isArray(INITIAL_BIBLE_STUDIES));
    assert.strictEqual(INITIAL_BIBLE_STUDIES.length, 0, 'INITIAL_BIBLE_STUDIES must be empty');

    assert.ok(Array.isArray(INITIAL_EVENTS));
    assert.strictEqual(INITIAL_EVENTS.length, 0, 'INITIAL_EVENTS must be empty');

    assert.ok(Array.isArray(INITIAL_CAMPAIGNS));
    assert.strictEqual(INITIAL_CAMPAIGNS.length, 0, 'INITIAL_CAMPAIGNS must be empty');

    assert.ok(Array.isArray(INITIAL_REVIEWERS));
    assert.strictEqual(INITIAL_REVIEWERS.length, 0, 'INITIAL_REVIEWERS must be empty');

    assert.ok(Array.isArray(INITIAL_PRAYERS));
    assert.strictEqual(INITIAL_PRAYERS.length, 0, 'INITIAL_PRAYERS must be empty');

    assert.ok(Array.isArray(DEMO_ACCOUNTS));
    assert.strictEqual(DEMO_ACCOUNTS.length, 0, 'DEMO_ACCOUNTS must be empty');
  });

  it('should preserve discipleship stages curriculum definition', () => {
    assert.ok(Array.isArray(DISCIPLESHIP_STAGES));
    assert.strictEqual(DISCIPLESHIP_STAGES.length, 4);
    assert.strictEqual(DISCIPLESHIP_STAGES[0].step, 1);
  });

  it('should validate devotionals content structure', () => {
    assert.ok(Array.isArray(DAILY_DEVOTIONALS));
    assert.ok(DAILY_DEVOTIONALS.length > 0);
    for (const devo of DAILY_DEVOTIONALS) {
      assert.ok(devo.id, 'Devotional must have id');
      assert.ok(devo.verseRef, 'Devotional must have verse reference');
      assert.ok(devo.verseTextEn, 'Devotional must have verseTextEn');
      assert.ok(devo.reflectionEn, 'Devotional must have reflectionEn');
    }
  });
});
