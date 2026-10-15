import { strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import { createStatusMessage } from './status.js';

describe('createStatusMessage', () => {
  it('returns the starter command result', () => {
    strictEqual(createStatusMessage(), 'Your command is ready.');

    return;
  });

  return;
});
