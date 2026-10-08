import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { createProgram } from './program.js';

describe('createProgram', () => {
  it('uses the generated binary name', () => {
    strictEqual(createProgram().name(), '[__WORKSPACE_NAME__]');

    return;
  });

  return;
});
