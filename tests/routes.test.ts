/**
 * Integration tests for server endpoints
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'http';
import { createApp } from '../src/server/app.js';

describe('Server Routes', () => {
  let server: http.Server;
  let baseUrl: string;

  before(async () => {
    const app = createApp();
    server = app.listen(0);
    const addr = server.address() as any;
    baseUrl = `http://127.0.0.1:${addr.port}`;
  });

  after(() => {
    server.close();
  });

  it('GET /healthz returns ok: true', async () => {
    const res = await fetch(`${baseUrl}/healthz`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.ok, true);
    assert.equal(data.app, 'saheli');
  });

  it('GET /api/centres?pincode=400001 returns verified centre', async () => {
    const res = await fetch(`${baseUrl}/api/centres?pincode=400001`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.centre);
    assert.equal(data.centre.pincode, '400001');
    assert.ok(data.centre.name.includes('Anganwadi'));
  });

  it('GET /api/centres rejects invalid pincode with 400', async () => {
    const res = await fetch(`${baseUrl}/api/centres?pincode=123`);
    assert.equal(res.status, 400);
  });

  it('POST and GET /api/journeys saves and retrieves anonymous progress without PII', async () => {
    const saveRes = await fetch(`${baseUrl}/api/journeys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: 'result',
        language: 'mr',
        eligibility: { status: 'eligible', amountRupees: 5000 },
        checklist: { aadhaar: 'have', bank_passbook: 'have' },
        sheet: { motherName: 'Sunita (should be stripped from persistence)' },
        pincode: '411001',
      }),
    });

    assert.equal(saveRes.status, 200);
    const saveData = await saveRes.json();
    assert.ok(saveData.code);
    assert.match(saveData.code, /^\d{6}$/);

    const getRes = await fetch(`${baseUrl}/api/journeys/${saveData.code}`);
    assert.equal(getRes.status, 200);
    const getData = await getRes.json();
    assert.equal(getData.journey.language, 'mr');
    assert.equal(getData.journey.checklist.bank_passbook, 'have');
    // Ensure personal name was stripped
    assert.equal(getData.journey.sheet.motherName, undefined);
  });
});
