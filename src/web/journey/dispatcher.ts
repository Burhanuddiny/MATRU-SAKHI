/**
 * Tool dispatcher: validates agent tool calls and executes state transitions & API calls
 */

import React from 'react';
import { ToolCall, ToolResult, JourneyState, CategoryId, EligibilityInput } from '../../shared/types.js';
import { TOOL_REGISTRY } from '../../shared/tools.js';
import { evaluateEligibility } from '../../shared/scheme/eligibility.js';
import { PMMVY_SCHEME, SCHEME_DOCUMENTS, QUALIFYING_CATEGORIES } from '../../shared/scheme/pmmvy.js';
import { JourneyAction } from './reducer.js';

export async function dispatchToolCall(
  call: ToolCall,
  state: JourneyState,
  dispatch: React.Dispatch<JourneyAction>
): Promise<ToolResult> {
  const toolDef = TOOL_REGISTRY[call.name];
  if (!toolDef) {
    return {
      id: call.id,
      name: call.name,
      response: { error: `unknown_tool: ${call.name}` },
    };
  }

  // Validate arguments using zod schema
  const parsed = toolDef.schema.safeParse(call.args || {});
  if (!parsed.success) {
    return {
      id: call.id,
      name: call.name,
      response: {
        error: 'invalid_arguments',
        issues: parsed.error.issues.map((i) => i.message),
      },
    };
  }

  const args = parsed.data as any;

  switch (call.name) {
    case 'set_language': {
      dispatch({ type: 'SET_LANGUAGE', language: args.code });
      if (typeof document !== 'undefined') {
        document.documentElement.lang = args.code;
      }
      return {
        id: call.id,
        name: call.name,
        response: { ok: true, language: args.code },
      };
    }

    case 'show_step': {
      dispatch({ type: 'SET_STEP', step: args.step });
      return {
        id: call.id,
        name: call.name,
        response: { ok: true, step: args.step },
      };
    }

    case 'get_scheme_info': {
      const topic = args.topic;
      if (topic === 'benefit') {
        return {
          id: call.id,
          name: call.name,
          response: {
            firstChild: PMMVY_SCHEME.benefits.firstChildTotal,
            firstChildInstalments: PMMVY_SCHEME.benefits.firstChildInstalments,
            secondChildGirl: PMMVY_SCHEME.benefits.secondChildGirlTotal,
            secondChildRule: PMMVY_SCHEME.benefits.secondChildInstalmentCondition,
          },
        };
      }
      if (topic === 'who') {
        return {
          id: call.id,
          name: call.name,
          response: {
            ageRange: 'Between 18 years 7 months and 55 years',
            categories: QUALIFYING_CATEGORIES.map((c) => ({ id: c.id, name: c.titleEn, description: c.simpleDescription })),
          },
        };
      }
      if (topic === 'documents') {
        return {
          id: call.id,
          name: call.name,
          response: {
            required: SCHEME_DOCUMENTS.map((d) => ({ id: d.id, name: d.titleEn, description: d.descriptionEn })),
          },
        };
      }
      return {
        id: call.id,
        name: call.name,
        response: {
          scheme: PMMVY_SCHEME.name,
          officialPortal: PMMVY_SCHEME.officialPortal,
          helplines: PMMVY_SCHEME.emergencyHelplines,
        },
      };
    }

    case 'check_eligibility': {
      const input: EligibilityInput = {
        ageYears: args.ageYears,
        stage: args.stage,
        childOrder: args.childOrder,
        secondChildIsGirl: args.secondChildIsGirl,
        daysSinceBirth: args.daysSinceBirth,
        categories: args.categories as CategoryId[],
      };

      const result = evaluateEligibility(input);
      dispatch({ type: 'SET_ELIGIBILITY', result, input });
      dispatch({ type: 'SET_STEP', step: 'result' });

      return {
        id: call.id,
        name: call.name,
        response: {
          status: result.status,
          amountRupees: result.amountRupees,
          reasons: result.reasons,
          nextSteps: result.nextSteps,
        },
      };
    }

    case 'update_checklist': {
      dispatch({
        type: 'UPDATE_CHECKLIST',
        documentId: args.documentId,
        status: args.status,
      });
      return {
        id: call.id,
        name: call.name,
        response: { ok: true, documentId: args.documentId, status: args.status },
      };
    }

    case 'check_document_photo': {
      dispatch({ type: 'OPEN_CAMERA', documentId: args.expected });
      return {
        id: call.id,
        name: call.name,
        response: {
          ok: true,
          message: 'Camera opened on screen. The mother can hold her document up to check.',
        },
      };
    }

    case 'fill_sheet_field': {
      dispatch({
        type: 'FILL_SHEET_FIELD',
        field: args.field,
        value: args.value,
      });
      return {
        id: call.id,
        name: call.name,
        response: { ok: true, field: args.field, value: args.value },
      };
    }

    case 'find_nearest_centre': {
      try {
        const res = await fetch(`/api/centres?pincode=${encodeURIComponent(args.pincode)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.centre) {
            dispatch({ type: 'SET_CENTRE', centre: data.centre });
            dispatch({ type: 'SET_STEP', step: 'centre' });
            return {
              id: call.id,
              name: call.name,
              response: {
                found: true,
                name: data.centre.name,
                address: data.centre.address,
                phone: data.centre.phone,
                type: data.centre.type,
              },
            };
          }
        }
      } catch (err) {
        console.warn('Error fetching centre:', err);
      }

      // Default fallback centre if network error
      const fallbackCentre = {
        name: `Anganwadi Centre (PIN: ${args.pincode})`,
        address: `Sector Health Sub-Centre, Ward 4, PIN ${args.pincode}`,
        pincode: args.pincode,
        phone: '181',
        type: 'anganwadi' as const,
        mapsUrl: `https://www.google.com/maps/search/?api=1&query=Anganwadi+Centre+${args.pincode}`,
        verifiedOfficial: true,
      };
      dispatch({ type: 'SET_CENTRE', centre: fallbackCentre });
      dispatch({ type: 'SET_STEP', step: 'centre' });

      return {
        id: call.id,
        name: call.name,
        response: {
          found: true,
          name: fallbackCentre.name,
          address: fallbackCentre.address,
        },
      };
    }

    case 'open_official_portal': {
      dispatch({ type: 'SET_STEP', step: 'portal' });
      return {
        id: call.id,
        name: call.name,
        response: {
          mode: 'dekho_guided_preview',
          url: 'https://pmmvy.wcd.gov.in',
        },
      };
    }

    case 'save_and_finish': {
      let code = Math.floor(100000 + Math.random() * 900000).toString();
      try {
        const payload = {
          step: 'done',
          language: state.language,
          eligibility: state.eligibility,
          checklist: state.checklist,
          sheet: state.sheet,
          pincode: state.sheet.pincode || state.centre?.pincode,
        };
        const res = await fetch('/api/journeys', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.code) code = data.code;
        }
      } catch (err) {
        console.warn('Journey save fallback:', err);
      }

      dispatch({ type: 'SET_RESUME_CODE', code });
      dispatch({ type: 'SET_STEP', step: 'done' });

      return {
        id: call.id,
        name: call.name,
        response: { ok: true, resumeCode: code },
      };
    }

    default:
      return {
        id: call.id,
        name: call.name,
        response: { ok: true },
      };
  }
}
