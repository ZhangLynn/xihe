import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';
import * as assert from 'assert';

describe('test/controller/gog.test.ts', () => {
  let app: Application

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async (done) => {
    await close(app);

    done();
  });

  it('should POST /api/game/gog', async () => {
    const result = await createHttpRequest(app).get('/api/game/gog');

    expect(result.status).toBe(200);
    expect(result.headers['content-type']).toContain('text/calendar');

    assert.deepStrictEqual(result.status, 200);
    assert.match(result.headers['content-type'], /text\/calendar/);
  });
});
