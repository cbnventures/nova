import type { vi } from 'vitest';

/**
 * Toolkit - Vitest Setup - Register.
 *
 * @since 0.26.0
 */
export type Toolkit_VitestSetup_Runner_Register_Vitest_AfterEach_Callback = () => void;

export type Toolkit_VitestSetup_Runner_Register_Vitest_AfterEach = (callback: Toolkit_VitestSetup_Runner_Register_Vitest_AfterEach_Callback) => void;

export type Toolkit_VitestSetup_Runner_Register_Vitest_BeforeEach_Callback = () => void;

export type Toolkit_VitestSetup_Runner_Register_Vitest_BeforeEach = (callback: Toolkit_VitestSetup_Runner_Register_Vitest_BeforeEach_Callback) => void;

export type Toolkit_VitestSetup_Runner_Register_Vitest_Vi = Pick<typeof vi, 'restoreAllMocks' | 'spyOn'>;

export type Toolkit_VitestSetup_Runner_Register_Vitest = {
  afterEach: Toolkit_VitestSetup_Runner_Register_Vitest_AfterEach;
  beforeEach: Toolkit_VitestSetup_Runner_Register_Vitest_BeforeEach;
  vi: Toolkit_VitestSetup_Runner_Register_Vitest_Vi;
};

export type Toolkit_VitestSetup_Runner_Register_Returns = void;
