import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { createMessage } from './run.js';

describe('createMessage', () => {
  it('returns the action output', () => {
    strictEqual(createMessage('Nova'), 'Hello, Nova!');

    return;
  });

  return;
});
