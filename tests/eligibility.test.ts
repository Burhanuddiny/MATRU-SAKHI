/**
 * Table-driven unit tests for PMMVY pure eligibility rules engine
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateEligibility } from '../src/shared/scheme/eligibility.js';
import { EligibilityInput } from '../src/shared/types.js';

describe('PMMVY Eligibility Rules Engine', () => {
  it('qualifies first child with valid age and qualifying category for ₹5,000', () => {
    const input: EligibilityInput = {
      ageYears: 24,
      stage: 'pregnant',
      childOrder: 1,
      categories: ['ration_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'eligible');
    assert.equal(result.amountRupees, 5000);
    assert.ok(result.reasons.includes('FIRST_CHILD_ELIGIBLE'));
    assert.ok(result.nextSteps.includes('COLLECT_DOCUMENTS'));
  });

  it('marks age 18 as conditional with AGE_CHECK_AT_CENTRE due to 18y 7m threshold', () => {
    const input: EligibilityInput = {
      ageYears: 18,
      stage: 'pregnant',
      childOrder: 1,
      categories: ['sc_st'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'conditional');
    assert.equal(result.amountRupees, 5000);
    assert.ok(result.reasons.includes('AGE_CHECK_AT_CENTRE'));
  });

  it('rejects under 18 years as not_eligible', () => {
    const input: EligibilityInput = {
      ageYears: 17,
      stage: 'pregnant',
      childOrder: 1,
      categories: ['ration_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('AGE_OUT_OF_RANGE'));
  });

  it('rejects over 55 years as not_eligible', () => {
    const input: EligibilityInput = {
      ageYears: 56,
      stage: 'pregnant',
      childOrder: 1,
      categories: ['bpl_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('AGE_OUT_OF_RANGE'));
  });

  it('rejects if no qualifying category is selected', () => {
    const input: EligibilityInput = {
      ageYears: 22,
      stage: 'pregnant',
      childOrder: 1,
      categories: [],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('NO_QUALIFYING_CATEGORY'));
  });

  it('gives conditional ₹6,000 for second child when still pregnant without asking sex', () => {
    const input: EligibilityInput = {
      ageYears: 25,
      stage: 'pregnant',
      childOrder: 2,
      categories: ['eshram'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'conditional');
    assert.equal(result.amountRupees, 6000);
    assert.ok(result.reasons.includes('SECOND_CHILD_GIRL_ONLY_AFTER_BIRTH'));
    assert.ok(result.nextSteps.includes('WAIT_FOR_DELIVERY'));
  });

  it('qualifies second delivered child if baby is a girl for ₹6,000', () => {
    const input: EligibilityInput = {
      ageYears: 26,
      stage: 'delivered',
      childOrder: 2,
      secondChildIsGirl: true,
      daysSinceBirth: 45,
      categories: ['ayushman_pmjay'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'eligible');
    assert.equal(result.amountRupees, 6000);
    assert.ok(result.reasons.includes('SECOND_CHILD_GIRL_ELIGIBLE'));
  });

  it('rejects second delivered child if baby is a boy under PMMVY 2.0', () => {
    const input: EligibilityInput = {
      ageYears: 26,
      stage: 'delivered',
      childOrder: 2,
      secondChildIsGirl: false,
      daysSinceBirth: 45,
      categories: ['ration_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('SECOND_CHILD_BOY_NOT_ELIGIBLE'));
  });

  it('rejects third or later child', () => {
    const input: EligibilityInput = {
      ageYears: 28,
      stage: 'pregnant',
      childOrder: 3,
      categories: ['ration_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('THIRD_OR_LATER_CHILD_NOT_ELIGIBLE'));
  });

  it('rejects if delivered more than 270 days ago', () => {
    const input: EligibilityInput = {
      ageYears: 24,
      stage: 'delivered',
      childOrder: 1,
      daysSinceBirth: 300,
      categories: ['ration_card'],
    };

    const result = evaluateEligibility(input);
    assert.equal(result.status, 'not_eligible');
    assert.equal(result.amountRupees, 0);
    assert.ok(result.reasons.includes('REGISTRATION_WINDOW_CLOSED'));
  });
});
