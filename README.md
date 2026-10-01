# Saheli (सहेली) — Voice-First Maternity Benefit Companion

> A voice-first AI companion that helps a woman using the internet for the first time get the **Pradhan Mantri Matru Vandana Yojana (PMMVY)** maternity benefit, in her own language, with zero reading, typing, or login.

Built for **PromptWars x HackArena — "The Invisible Woman"**.

---

## 1. The Problem Statement

> *"A woman who has never used the internet, reads no English, has no tech background and nobody to ask, must independently reach one government scheme, by voice or simple text, in her own language, with zero prior digital knowledge."*

---

## 2. How Saheli Answers It (Phrase-to-File Mapping)

| Phrase from Problem Statement | Feature in Saheli | Implementation File |
|---|---|---|
| **"never used the internet"** | Single screen with one giant tactile pulsing button; no browser navigation, no tabs, no menus, self-driving screen. | `src/web/screens/Welcome.tsx`, `src/web/components/BigButton.tsx` |
| **"reads no English"** | Native regional voice & text in Hindi, Marathi, Bengali, Tamil, Telugu, Kannada; bilingual printable Anganwadi slip. | `src/shared/i18n.ts`, `src/web/voice/speechHelper.ts`, `src/web/components/Slip.tsx` |
| **"has no tech background"** | Visual picture checklist with camera verification; mother simply shows her passbook or card to the camera. | `src/web/screens/Documents.tsx`, `src/web/components/CameraSheet.tsx`, `src/server/services/gemini.ts` |
| **"and nobody to ask"** | Saheli acts as a warm, patient older sister; explains PMMVY in 2 spoken sentences, answers doubts, locates nearest Anganwadi centre. | `src/shared/prompt.ts`, `src/server/services/centres.ts`, `src/web/screens/Centre.tsx` |
| **"independently reach one government scheme"** | Dedicated specifically to PMMVY (₹5,000 / ₹6,000 direct benefit transfer). Full journey from eligibility to official centre and slip. | `src/shared/scheme/pmmvy.ts`, `src/shared/scheme/eligibility.ts` |
| **"by voice or simple text"** | Dual transport: Gemini Live API & browser speech synthesis + seamless text fallback drawer for quiet spaces. | `src/web/voice/LiveTransport.ts`, `src/web/transport/TextTransport.ts`, `src/server/routes/chat.ts` |
| **"in her own language"** | Automatic spoken language detection; instantly switches dialect and screen labels. | `src/shared/prompt.ts`, `src/web/journey/dispatcher.ts` |
| **"zero prior digital knowledge"** | Barge-in interruption at any time; persistent "Say it again" and "Go back" picture buttons; never asks for OTP or passwords. | `src/web/components/BigButton.tsx`, `src/web/journey/useJourney.ts`, `src/App.tsx` |

---

## 3. The 9-Step User Journey

1. **`welcome`**: Full-screen pulsing tactile button with hand tapping animation. First tap starts audio; Saheli greets her warmly.
2. **`about`**: Picture of mother & baby, benefit amount in large bold numerals (₹5,000 / ₹6,000). Two short spoken sentences explain the scheme.
3. **`eligibility`**: One yes/no picture question at a time (pregnancy stage, first/second child, qualifying cards). Evaluated by the pure rules engine.
4. **`result`**: Giant green checkmark or gentle orange advisory with exact amount and next steps.
5. **`documents`**: Visual picture checklist (Aadhaar, bank passbook, MCP vaccination card, ration card).
6. **`camera check`**: Mother holds up any document; Gemini Flash checks legibility and confirms document type without recording ID numbers.
7. **`prepare`**: Non-sensitive preparation slip fills visibly as she speaks (Name, bank, pincode).
8. **`centre`**: Locates her nearest Anganwadi centre or CSC via Google Maps Places API with one-tap directions.
9. **`done`**: Generates her bilingual slip and an anonymous 6-digit code (`123-456`) to resume anytime.

---

## 4. Architectural Decisions

1. **The Model Talks; The Code Decides**: Scheme rules and eligibility decisions are 100% computed by pure TypeScript functions (`src/shared/scheme/eligibility.ts`) backed by table-driven unit tests. The model never hallucinates or guesses government rules.
2. **Client-Side Tool Dispatcher**: Tools execute directly in the browser (`src/web/journey/dispatcher.ts`) to mutate UI state with zero latency. Arguments are validated with Zod schemas.
3. **Dual Transport Abstraction**: `LiveTransport` (voice) and `TextTransport` (text fallback) share the exact same `AgentTransport` interface. The UI is completely agnostic to whether audio or text is running.
4. **Zero Stored Personal Data**: Names stay exclusively in browser session memory. Save-and-resume stores only journey progress under a 6-digit code.
5. **Safe Document Vision**: Camera checks verify document legibility and type without ever transcribing or storing Aadhaar numbers, PAN, or bank account numbers.

---

## 5. Google Cloud & AI Studio Services Used

| Service | Used For | Source File |
|---|---|---|
| **Gemini Live API** | Native real-time streaming audio & multilingual tool execution | `src/web/voice/LiveTransport.ts`, `src/server/routes/session.ts` |
| **Gemini Flash (`gemini-3.8-flash`)** | Dialogue turns and on-device document photo verification | `src/server/services/gemini.ts`, `src/server/routes/chat.ts` |
| **Google Maps Places API (New)** | Real-time text search for nearest Anganwadi & CSC centres | `src/server/services/centres.ts`, `src/server/routes/centres.ts` |
| **Cloud Run** | Scalable containerized hosting in Mumbai (`asia-south1`) | `server.ts`, `Dockerfile` |
| **Firestore & In-Memory Store** | Anonymous 30-day journey save & resume via 6-digit code | `src/server/services/journeys.ts` |

---

## 6. Trust, Safety, and Privacy

- **Never Asks for Sensitive Data**: Saheli never requests Aadhaar numbers, bank account numbers, OTPs, PINs, or passwords.
- **Teaches Fraud Prevention**: Explicitly warns the user that government schemes do not require paying money or sharing OTPs.
- **Strict Compliance with Indian Law**: Never asks the sex of an unborn baby (prenatal sex determination is illegal in India under the PC-PNDT Act).
- **Emergency Helplines**: Women Helpline **181** and National Emergency **112** are always accessible.

---

## 7. Adding Another Scheme

To add a new scheme (e.g. Sukanya Samriddhi or PM-JAY):
1. Create `src/shared/scheme/new_scheme.ts` with metadata, benefits, and qualifying categories.
2. Implement its pure evaluation function in `src/shared/scheme/new_scheme_rules.ts`.
3. Saheli automatically gets the new scheme in all 7 languages without modifying prompt persona code!

---

## 8. Verification & Tests

```bash
# Run unit tests, schema validations, and full-stack route checks
npm run test

# Run full verification (typecheck + test + build)
npm run verify
```
