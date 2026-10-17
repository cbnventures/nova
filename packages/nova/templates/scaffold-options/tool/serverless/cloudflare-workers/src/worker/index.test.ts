import {
  describe,
  expect,
  it,
} from 'vitest';

import handler from './index.js';

import type { Worker_IndexTest_WorkerHandler_ReturnsTheStarterResponse_Response } from '../types/worker/index.test.d.ts';

describe('Worker handler', () => {
  it('returns the starter response', async () => {
    const response: Worker_IndexTest_WorkerHandler_ReturnsTheStarterResponse_Response = await handler.fetch(new Request('https://example.com/'));

    expect(response.status).toBe(200);

    expect(await response.json()).toEqual({ message: 'Welcome to [__PROJECT_SLUG__]' });

    return;
  });

  return;
});
