import { strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { VitestSetup } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_AfterEachCallback,
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_AfterEachCallbacks,
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_BeforeEachCallback,
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_BeforeEachCallbacks,
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_OriginalExitCode,
  Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_Vitest,
} from '../../types/tests/toolkit/vitest-setup.test.d.ts';

/**
 * Tests - Toolkit - Vitest Setup - Register.
 *
 * @since 0.26.0
 */
describe('VitestSetup.register', () => {
  it('registers and runs the shared hooks', () => {
    const afterEachCallbacks: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_AfterEachCallbacks = [];
    const beforeEachCallbacks: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_BeforeEachCallbacks = [];
    const originalExitCode: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_OriginalExitCode = process.exitCode;
    const vitest: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_Vitest = {
      afterEach: (callback) => {
        afterEachCallbacks.push(callback);

        return;
      },
      beforeEach: (callback) => {
        beforeEachCallbacks.push(callback);

        return;
      },
      vi,
    };

    VitestSetup.register(vitest);

    strictEqual(afterEachCallbacks.length, 1);
    strictEqual(beforeEachCallbacks.length, 1);

    const afterEachCallback: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_AfterEachCallback = afterEachCallbacks[0];
    const beforeEachCallback: Tests_Toolkit_VitestSetup_VitestSetupRegister_RegistersAndRunsTheSharedHooks_BeforeEachCallback = beforeEachCallbacks[0];

    if (afterEachCallback === undefined || beforeEachCallback === undefined) {
      throw new Error('VitestSetup did not register both shared hooks.');
    }

    vi.restoreAllMocks();

    process.exitCode = 1;

    beforeEachCallback();

    strictEqual(process.exitCode, undefined);
    strictEqual(vi.isMockFunction(globalThis['console']['error']), true);
    strictEqual(vi.isMockFunction(globalThis['console']['info']), true);
    strictEqual(vi.isMockFunction(globalThis['console']['log']), true);
    strictEqual(vi.isMockFunction(globalThis['console']['warn']), true);
    strictEqual(vi.isMockFunction(process.stdout.write), true);
    strictEqual(vi.isMockFunction(process.stderr.write), true);

    afterEachCallback();

    strictEqual(vi.isMockFunction(globalThis['console']['error']), false);
    strictEqual(vi.isMockFunction(globalThis['console']['info']), false);
    strictEqual(vi.isMockFunction(globalThis['console']['log']), false);
    strictEqual(vi.isMockFunction(globalThis['console']['warn']), false);
    strictEqual(vi.isMockFunction(process.stdout.write), false);
    strictEqual(vi.isMockFunction(process.stderr.write), false);

    process.exitCode = originalExitCode;

    return;
  });

  return;
});
