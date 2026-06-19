import { doesNotThrow, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Logger } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethods_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenEmptyOptions_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameAndPurpose_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameTypeAndPurpose_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ScopedMethodsDoNotThrow_Scoped,
  Tests_Toolkit_Logger_LoggerOutputLevels_AcceptsMultipleArguments_Message,
  Tests_Toolkit_Logger_LoggerOutputLevels_DebugDoesNotThrow_Message,
  Tests_Toolkit_Logger_LoggerOutputLevels_ErrorDoesNotThrow_Message,
  Tests_Toolkit_Logger_LoggerOutputLevels_InfoDoesNotThrow_Message,
  Tests_Toolkit_Logger_LoggerOutputLevels_WarnDoesNotThrow_Message,
  Tests_Toolkit_Logger_LoggerStaticMethods_CustomizeIsAFunction_CustomizeType,
  Tests_Toolkit_Logger_LoggerStaticMethods_DebugIsAFunction_DebugType,
  Tests_Toolkit_Logger_LoggerStaticMethods_DevIsAFunction_DevType,
  Tests_Toolkit_Logger_LoggerStaticMethods_ErrorIsAFunction_ErrorType,
  Tests_Toolkit_Logger_LoggerStaticMethods_InfoIsAFunction_InfoType,
  Tests_Toolkit_Logger_LoggerStaticMethods_WarnIsAFunction_WarnType,
} from '../../types/tests/toolkit/logger.test.d.ts';

/**
 * Tests - Toolkit - Logger - Logger Static Methods.
 *
 * @since 0.13.0
 */
describe('Logger static methods', async () => {
  it('debug is a function', () => {
    const debugType: Tests_Toolkit_Logger_LoggerStaticMethods_DebugIsAFunction_DebugType = typeof Logger['debug'];

    strictEqual(debugType, 'function');

    return;
  });

  it('dev is a function', () => {
    const devType: Tests_Toolkit_Logger_LoggerStaticMethods_DevIsAFunction_DevType = typeof Logger['dev'];

    strictEqual(devType, 'function');

    return;
  });

  it('info is a function', () => {
    const infoType: Tests_Toolkit_Logger_LoggerStaticMethods_InfoIsAFunction_InfoType = typeof Logger['info'];

    strictEqual(infoType, 'function');

    return;
  });

  it('warn is a function', () => {
    const warnType: Tests_Toolkit_Logger_LoggerStaticMethods_WarnIsAFunction_WarnType = typeof Logger['warn'];

    strictEqual(warnType, 'function');

    return;
  });

  it('error is a function', () => {
    const errorType: Tests_Toolkit_Logger_LoggerStaticMethods_ErrorIsAFunction_ErrorType = typeof Logger['error'];

    strictEqual(errorType, 'function');

    return;
  });

  it('customize is a function', () => {
    const customizeType: Tests_Toolkit_Logger_LoggerStaticMethods_CustomizeIsAFunction_CustomizeType = typeof Logger['customize'];

    strictEqual(customizeType, 'function');

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Logger - Logger Customize.
 *
 * @since 0.13.0
 */
describe('Logger customize', async () => {
  it('returns object with all log methods', () => {
    const scoped: Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethods_Scoped = Logger.customize({ name: 'test' });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['dev'], 'function');
    strictEqual(typeof scoped['info'], 'function');
    strictEqual(typeof scoped['warn'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('returns object with all log methods when given name and purpose', () => {
    const scoped: Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameAndPurpose_Scoped = Logger.customize({
      name: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['info'], 'function');

    return;
  });

  it('returns object with all log methods when given name, type, and purpose', () => {
    const scoped: Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameTypeAndPurpose_Scoped = Logger.customize({
      name: 'test',
      type: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('returns object with all log methods when given empty options', () => {
    const scoped: Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenEmptyOptions_Scoped = Logger.customize({});

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['info'], 'function');
    strictEqual(typeof scoped['warn'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('scoped methods do not throw', () => {
    const scoped: Tests_Toolkit_Logger_LoggerCustomize_ScopedMethodsDoNotThrow_Scoped = Logger.customize({ name: 'test' });

    doesNotThrow(() => {
      scoped.info('test message');

      return;
    });

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Logger - Logger Output Levels.
 *
 * @since 0.13.0
 */
describe('Logger output levels', async () => {
  it('info does not throw', () => {
    const message: Tests_Toolkit_Logger_LoggerOutputLevels_InfoDoesNotThrow_Message = 'test info message';

    doesNotThrow(() => {
      Logger.info(message);

      return;
    });

    return;
  });

  it('warn does not throw', () => {
    const message: Tests_Toolkit_Logger_LoggerOutputLevels_WarnDoesNotThrow_Message = 'test warn message';

    doesNotThrow(() => {
      Logger.warn(message);

      return;
    });

    return;
  });

  it('error does not throw', () => {
    const message: Tests_Toolkit_Logger_LoggerOutputLevels_ErrorDoesNotThrow_Message = 'test error message';

    doesNotThrow(() => {
      Logger.error(message);

      return;
    });

    return;
  });

  it('debug does not throw', () => {
    const message: Tests_Toolkit_Logger_LoggerOutputLevels_DebugDoesNotThrow_Message = 'test debug message';

    doesNotThrow(() => {
      Logger.debug(message);

      return;
    });

    return;
  });

  it('accepts multiple arguments', () => {
    const message: Tests_Toolkit_Logger_LoggerOutputLevels_AcceptsMultipleArguments_Message = 'message';

    doesNotThrow(() => {
      Logger.info(message, 'arg1', 'arg2');

      return;
    });

    return;
  });

  it('accepts no arguments', () => {
    doesNotThrow(() => {
      return Logger.info();
    });

    return;
  });

  return;
});
