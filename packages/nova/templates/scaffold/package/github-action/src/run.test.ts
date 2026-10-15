import { strictEqual } from 'node:assert/strict';

import {
  getInput,
  setOutput,
  startGroup,
  summary,
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
  summary: {
    addHeading: vi.fn().mockReturnThis(),
    addTable: vi.fn().mockReturnThis(),
    write: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('createMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.stubEnv('GITHUB_STEP_SUMMARY', '/tmp/github-step-summary');

    return;
  });

  it('returns the action output', () => {
    strictEqual(createMessage('Nova'), 'Hello, Nova!');

    return;
  });

  it('groups its logs and writes a step summary', async () => {
    vi.mocked(getInput).mockReturnValue('Nova');

    await run();

    expect(startGroup).toHaveBeenNthCalledWith(1, 'Configuration');

    expect(startGroup).toHaveBeenNthCalledWith(2, 'Result');

    expect(setOutput).toHaveBeenCalledWith('message', 'Hello, Nova!');

    expect(summary.addHeading).toHaveBeenCalledWith('[__WORKSPACE_TITLE__]');

    expect(summary.write).toHaveBeenCalledOnce();

    return;
  });

  return;
});
