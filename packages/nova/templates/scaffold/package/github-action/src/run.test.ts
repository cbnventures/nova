import { strictEqual } from 'node:assert/strict';

import {
  getInput,
  setOutput,
  startGroup,
} from '@actions/core';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  createMessage,
  run,
} from './run.js';

vi.mock('@actions/core', () => ({
  endGroup: vi.fn(),
  getInput: vi.fn(),
  info: vi.fn(),
  setOutput: vi.fn(),
  startGroup: vi.fn(),
}));

describe('createMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    return;
  });

  it('returns the action output', () => {
    strictEqual(createMessage('Nova'), 'Hello, Nova!');

    return;
  });

  it('groups its logs and publishes the action output', async () => {
    vi.mocked(getInput).mockReturnValue('Nova');

    await run();

    expect(startGroup).toHaveBeenNthCalledWith(1, 'Configuration');

    expect(startGroup).toHaveBeenNthCalledWith(2, 'Result');

    expect(setOutput).toHaveBeenCalledWith('message', 'Hello, Nova!');

    return;
  });

  return;
});
