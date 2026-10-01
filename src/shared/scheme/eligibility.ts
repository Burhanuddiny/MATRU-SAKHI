/**
 * Pure rules engine for PMMVY Eligibility
 * Source: Ministry of Women & Child Development (WCD) Guidelines
 */

import { EligibilityInput, EligibilityResult, ReasonCode, NextStepCode } from '../types.js';

export function evaluateEligibility(input: EligibilityInput): EligibilityResult {
  const reasons: ReasonCode[] = [];
  const nextSteps: NextStepCode[] = [];

  // 1. Age Validation
  // Scheme requires 18 years 7 months minimum, 55 years maximum.
  // In rural areas, women often know only their year of birth.
  if (input.ageYears < 18 || input.ageYears > 55) {
    return {
      status: 'not_eligible',
      amountRupees: 0,
      reasons: ['AGE_OUT_OF_RANGE'],
      nextSteps: ['VISIT_ANGANWADI'],
    };
  }

  const isAgeBorderline = input.ageYears === 18;
  if (isAgeBorderline) {
    reasons.push('AGE_CHECK_AT_CENTRE');
  }

  // 2. Qualifying Category Check
  // Must belong to at least one eligible socio-economic category
  if (!input.categories || input.categories.length === 0) {
    return {
      status: 'not_eligible',
      amountRupees: 0,
      reasons: ['NO_QUALIFYING_CATEGORY'],
      nextSteps: ['VISIT_ANGANWADI', 'COLLECT_DOCUMENTS'],
    };
  }

  // 3. Child Order & Delivery Window
  if (input.childOrder >= 3) {
    return {
      status: 'not_eligible',
      amountRupees: 0,
      reasons: ['THIRD_OR_LATER_CHILD_NOT_ELIGIBLE'],
      nextSteps: ['VISIT_ANGANWADI'],
    };
  }

  // Check 270 days delivery window if already delivered
  if (input.stage === 'delivered' && typeof input.daysSinceBirth === 'number') {
    if (input.daysSinceBirth > 270) {
      return {
        status: 'not_eligible',
        amountRupees: 0,
        reasons: ['REGISTRATION_WINDOW_CLOSED'],
        nextSteps: ['VISIT_ANGANWADI'],
      };
    }
  }

  // First Child evaluation
  if (input.childOrder === 1) {
    reasons.push('FIRST_CHILD_ELIGIBLE');
    nextSteps.push('COLLECT_DOCUMENTS', 'VISIT_ANGANWADI');

    return {
      status: isAgeBorderline ? 'conditional' : 'eligible',
      amountRupees: 5000,
      reasons,
      nextSteps,
      childOrder: 1,
    };
  }

  // Second Child evaluation
  if (input.childOrder === 2) {
    if (input.stage === 'pregnant') {
      // For pregnant second child: Conditional!
      // Must not ask the sex of unborn baby (illegal). Scheme provides ₹6000 if baby is a girl.
      reasons.push('SECOND_CHILD_GIRL_ONLY_AFTER_BIRTH');
      nextSteps.push('WAIT_FOR_DELIVERY', 'COLLECT_DOCUMENTS', 'VISIT_ANGANWADI');

      return {
        status: 'conditional',
        amountRupees: 6000,
        reasons,
        nextSteps,
        childOrder: 2,
      };
    }

    if (input.stage === 'delivered') {
      if (input.secondChildIsGirl === true) {
        reasons.push('SECOND_CHILD_GIRL_ELIGIBLE');
        nextSteps.push('COLLECT_DOCUMENTS', 'VISIT_ANGANWADI');

        return {
          status: isAgeBorderline ? 'conditional' : 'eligible',
          amountRupees: 6000,
          reasons,
          nextSteps,
          childOrder: 2,
        };
      } else {
        // Second child is male: PMMVY 2.0 covers second child only if it's a girl child.
        return {
          status: 'not_eligible',
          amountRupees: 0,
          reasons: ['SECOND_CHILD_BOY_NOT_ELIGIBLE'],
          nextSteps: ['VISIT_ANGANWADI'],
          childOrder: 2,
        };
      }
    }
  }

  // Fallback
  return {
    status: 'conditional',
    amountRupees: 0,
    reasons: ['AGE_CHECK_AT_CENTRE'],
    nextSteps: ['VISIT_ANGANWADI'],
    childOrder: input.childOrder,
  };
}
