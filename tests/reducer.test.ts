/**
 * Unit tests for Journey reducer state transitions
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { journeyReducer, INITIAL_JOURNEY_STATE } from '../src/web/journey/reducer.js';

describe('Journey Reducer', () => {
  it('updates language correctly', () => {
    const nextState = journeyReducer(INITIAL_JOURNEY_STATE, {
      type: 'SET_LANGUAGE',
      language: 'mr',
    });
    assert.equal(nextState.language, 'mr');
  });

  it('updates journey step transition', () => {
    const nextState = journeyReducer(INITIAL_JOURNEY_STATE, {
      type: 'SET_STEP',
      step: 'eligibility',
    });
    assert.equal(nextState.step, 'eligibility');
  });

  it('updates document checklist item status', () => {
    const nextState = journeyReducer(INITIAL_JOURNEY_STATE, {
      type: 'UPDATE_CHECKLIST',
      documentId: 'bank_passbook',
      status: 'have',
    });
    assert.equal(nextState.checklist.bank_passbook, 'have');
    assert.equal(nextState.checklist.aadhaar, 'unknown');
  });

  it('caps captions history to prevent unbounded memory growth', () => {
    let state = INITIAL_JOURNEY_STATE;
    for (let i = 0; i < 25; i++) {
      state = journeyReducer(state, {
        type: 'ADD_CAPTION',
        caption: { who: 'saheli', text: `Message ${i}` },
      });
    }
    assert.ok(state.captions.length <= 15);
  });
});
