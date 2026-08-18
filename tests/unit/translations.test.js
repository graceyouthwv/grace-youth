import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TRANSLATIONS, getTranslation } from '../../src/data/translations.js';

describe('Unit Tests: Translations & Localization', () => {
  it('should return translation for existing key in English', () => {
    assert.strictEqual(getTranslation('nav_feed', 'en'), 'Feed');
    assert.strictEqual(getTranslation('hero_title_1', 'en'), 'EXCEL IN');
  });

  it('should return translation for existing key in Hiligaynon (hlg/hil)', () => {
    assert.strictEqual(getTranslation('nav_feed', 'hlg'), 'Balita');
    assert.strictEqual(getTranslation('nav_feed', 'hil'), 'Balita');
  });

  it('should fall back to English if key is missing in Hiligaynon', () => {
    const customKey = 'crisis_call_btn';
    const enVal = TRANSLATIONS.en[customKey];
    assert.ok(enVal, 'en should have crisis_call_btn');
    const result = getTranslation(customKey, 'hlg');
    assert.ok(result, 'Should return non-empty translation');
  });

  it('should fall back to key itself if key is not defined in any dictionary', () => {
    const nonExistentKey = 'non_existent_random_key_12345';
    assert.strictEqual(getTranslation(nonExistentKey, 'en'), nonExistentKey);
    assert.strictEqual(getTranslation(nonExistentKey, 'hlg'), nonExistentKey);
  });

  it('should handle undefined or null lang parameter by defaulting to English', () => {
    assert.strictEqual(getTranslation('nav_feed', undefined), 'Feed');
    assert.strictEqual(getTranslation('nav_feed', null), 'Feed');
  });

  it('should ensure all core navigation and hero keys exist in English and Hiligaynon', () => {
    const criticalKeys = [
      'nav_feed',
      'nav_acads',
      'nav_groups',
      'nav_camps',
      'nav_partners',
      'hero_title_1',
      'hero_title_2',
      'stat_students',
      'stat_tutors',
      'stat_lifegroups'
    ];

    for (const key of criticalKeys) {
      assert.ok(TRANSLATIONS.en[key], `English dictionary missing critical key: ${key}`);
      assert.ok(TRANSLATIONS.hlg[key], `Hiligaynon dictionary missing critical key: ${key}`);
    }
  });
});
