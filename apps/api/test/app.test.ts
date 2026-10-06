import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('GET /health', () => {
  it('returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('POST /songs validation', () => {
  it('rejects an invalid payload with 400 before touching the DB', async () => {
    const res = await request(app).post('/songs').send({ title: '', bpm: 'fast' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation failed');
    expect(res.body.issues.length).toBeGreaterThan(0);
  });
});
