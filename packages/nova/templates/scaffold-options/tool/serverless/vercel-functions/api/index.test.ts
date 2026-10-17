import {
  describe,
  expect,
  it,
} from 'vitest';

import { GET } from './index.js';

import type { Api_IndexTest_Get_ReturnsTheStarterResponse_Response } from '../src/types/api/index.test.d.ts';

describe('GET', () => {
  it('returns the starter response', async () => {
    const response: Api_IndexTest_Get_ReturnsTheStarterResponse_Response = GET(new Request('https://example.com/api'));

    expect(response.status).toBe(200);

    expect(await response.json()).toEqual({ message: 'Welcome to [__PROJECT_SLUG__]' });

    return;
  });

  return;
});
