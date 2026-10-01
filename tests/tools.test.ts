/**
 * Unit tests for tool schemas and validation
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TOOL_REGISTRY } from '../src/shared/tools.js';

describe('Tool Registry and Argument Validation', () => {
  it('validates set_language tool with valid and invalid codes', () => {
    const tool = TOOL_REGISTRY['set_language'];
    assert.ok(tool);

    const valid = tool.schema.safeParse({ code: 'mr' });
    assert.ok(valid.success);

    const invalid = tool.schema.safeParse({ code: 'fr' });
    assert.ok(!invalid.success);
  });

  it('validates find_nearest_centre requires exactly 6-digit Indian PIN', () => {
    const tool = TOOL_REGISTRY['find_nearest_centre'];
    assert.ok(tool);

    const valid = tool.schema.safeParse({ pincode: '400001' });
    assert.ok(valid.success);

    const invalidShort = tool.schema.safeParse({ pincode: '1234' });
    assert.ok(!invalidShort.success);

    const invalidLetters = tool.schema.safeParse({ pincode: 'ABC123' });
    assert.ok(!invalidLetters.success);
  });

  it('validates show_step accepts valid journey steps only', () => {
    const tool = TOOL_REGISTRY['show_step'];
    assert.ok(tool);

    assert.ok(tool.schema.safeParse({ step: 'welcome' }).success);
    assert.ok(tool.schema.safeParse({ step: 'documents' }).success);
    assert.ok(tool.schema.safeParse({ step: 'centre' }).success);
    assert.ok(!tool.schema.safeParse({ step: 'random_step' }).success);
  });

  it('validates check_eligibility child order constraints (1, 2, or 3)', () => {
    const tool = TOOL_REGISTRY['check_eligibility'];
    assert.ok(tool);

    const valid = tool.schema.safeParse({
      ageYears: 22,
      stage: 'pregnant',
      childOrder: 1,
      categories: ['ration_card'],
    });
    assert.ok(valid.success);

    const invalidChild = tool.schema.safeParse({
      ageYears: 22,
      stage: 'pregnant',
      childOrder: 5,
      categories: ['ration_card'],
    });
    assert.ok(!invalidChild.success);
  });
});
