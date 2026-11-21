import { doesNotThrow, strictEqual } from 'node:assert/strict';
import { format } from 'node:util';

import { describe, it, vi } from 'vitest';

import { Logger } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethods_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenEmptyOptions_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameAndPurpose_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameTypeAndPurpose_Scoped,
  Tests_Toolkit_Logger_LoggerCustomize_ScopedMethodsDoNotThrow_Scoped,
  Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Captured,
  Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Shown,
  Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Captured,
  Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Shown,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Captured,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Shown,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Captured,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Shown,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Captured,
  Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Shown,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_AlignedLines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Error,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Expected,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_ExpectedLines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Indent,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Error,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Frames,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Error,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Frames,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_OriginalIsTty,
  Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Captured,
  Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Expected,
  Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_ExpectedLines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Lines,
  Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_OriginalIsTty,
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

/**
 * Tests - Toolkit - Logger - Logger Level Selection.
 *
 * @since 0.20.0
 */
describe('Logger level selection', async () => {
  it('auto derives debug in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const captured: Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Captured = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.debug('probe-line');

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    const shown: Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Shown = captured.some((entry) => entry.includes('probe-line'));

    strictEqual(shown, true);

    return;
  });

  it('auto derives info in production', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const captured: Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Captured = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.debug('probe-line');

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    const shown: Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Shown = captured.some((entry) => entry.includes('probe-line'));

    strictEqual(shown, false);

    return;
  });

  it('auto behavior applies for an empty log level', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('LOG_LEVEL', '');

    const captured: Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Captured = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.debug('probe-line');

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    const shown: Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Shown = captured.some((entry) => entry.includes('probe-line'));

    strictEqual(shown, true);

    return;
  });

  it('an explicit dev level is ignored', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('LOG_LEVEL', 'dev');

    const captured: Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Captured = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.debug('probe-line');

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    const shown: Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Shown = captured.some((entry) => entry.includes('probe-line'));

    strictEqual(shown, true);

    return;
  });

  it('an explicit level overrides auto', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('LOG_LEVEL', 'error');

    const captured: Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Captured = [];

    vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.debug('probe-line');

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    const shown: Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Shown = captured.some((entry) => entry.includes('probe-line'));

    strictEqual(shown, false);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Logger - Logger Output Formatting.
 *
 * @since 0.48.1
 */
describe('Logger output formatting', async () => {
  it('prints a long object on one line without a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', false);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.warn('GitHub request failed', {
      path: '/repos/example-owner/example-network-prefix-updater',
      status: 403,
    });

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Lines = captured.join('').split('\n');

    strictEqual(lines.length, 2);
    strictEqual((lines[0] ?? '').endsWith('GitHub request failed { path: \'/repos/example-owner/example-network-prefix-updater\', status: 403 }'), true);
    strictEqual(lines[1], '');

    return;
  });

  it('wraps a long object across lines with a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const expected: Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Expected = format('GitHub request failed', {
      path: '/repos/example-owner/example-network-prefix-updater',
      status: 403,
    });
    const expectedLines: Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_ExpectedLines = expected.split('\n');
    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', true);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.warn('GitHub request failed', {
      path: '/repos/example-owner/example-network-prefix-updater',
      status: 403,
    });

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Lines = captured.join('').split('\n');

    strictEqual(expectedLines.length > 1, true);
    strictEqual(lines.length, expectedLines.length + 1);
    strictEqual((lines[0] ?? '').endsWith(expectedLines[0] ?? ''), true);
    strictEqual((lines[1] ?? '').trimStart(), (expectedLines[1] ?? '').trimStart());

    return;
  });

  it('keeps newlines inside string messages', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Captured = [];

    Reflect.set(process.stderr, 'isTTY', false);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.warn([
      'first line',
      'second line',
    ].join('\n'));

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Lines = captured.join('').split('\n');

    strictEqual(lines.length, 3);
    strictEqual((lines[0] ?? '').endsWith('first line'), true);
    strictEqual(lines[1], `${' '.repeat((lines[0] ?? '').indexOf('first line'))}second line`);

    return;
  });

  it('prints an error on one line without a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const error: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Error = new Error('boom');
    const frames: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Frames = (error.stack ?? '').split('\n').slice(1).map((frame) => frame.trim());
    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', false);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.error('Request failed', error);

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Lines = captured.join('').split('\n');

    strictEqual(frames.length > 0, true);
    strictEqual(lines.length, 2);
    strictEqual((lines[0] ?? '').includes(`Request failed Error: boom ↵ ${frames[0] ?? ''}`), true);
    strictEqual(frames.every((frame) => (lines[0] ?? '').includes(frame)), true);
    strictEqual(lines[1], '');

    return;
  });

  it('prints an error nested in an object on one line without a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const error: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Error = new Error('boom');
    const frames: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Frames = (error.stack ?? '').split('\n').slice(1).map((frame) => frame.trim());
    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', false);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.error('Request failed', {
      cause: error,
      status: 500,
    });

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Lines = captured.join('').split('\n');

    strictEqual(lines.length, 2);
    strictEqual((lines[0] ?? '').includes('Request failed { cause: Error: boom ↵ '), true);
    strictEqual(frames.every((frame) => (lines[0] ?? '').includes(frame)), true);
    strictEqual((lines[0] ?? '').endsWith('status: 500 }'), true);
    strictEqual(lines[1], '');

    return;
  });

  it('keeps string newlines next to an error without a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', false);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.error([
      'first line',
      'second line',
    ].join('\n'), new Error('boom'));

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Lines = captured.join('').split('\n');

    strictEqual(lines.length, 3);
    strictEqual((lines[0] ?? '').endsWith('first line'), true);
    strictEqual((lines[1] ?? '').startsWith(`${' '.repeat((lines[0] ?? '').indexOf('first line'))}second line Error: boom ↵ at `), true);
    strictEqual(lines[2], '');

    return;
  });

  it('keeps the error output unchanged with a tty', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('LOG_LEVEL', 'auto');

    const error: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Error = new Error('boom');
    const expected: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Expected = format('Request failed', error);
    const expectedLines: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_ExpectedLines = expected.split('\n');
    const originalIsTty: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_OriginalIsTty = Reflect.get(process.stderr, 'isTTY');
    const captured: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Captured = [];

    Reflect.set(process.stderr, 'isTTY', true);

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      captured.push(String(chunk));

      return true;
    });

    Logger.error('Request failed', error);

    vi.restoreAllMocks();

    vi.unstubAllEnvs();

    Reflect.set(process.stderr, 'isTTY', originalIsTty);

    const lines: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Lines = captured.join('').split('\n');
    const indent: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Indent = ' '.repeat((lines[0] ?? '').indexOf('Request failed'));
    const alignedLines: Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_AlignedLines = expectedLines.slice(1).map((line) => `${indent}${line}`);

    strictEqual(expectedLines.length > 1, true);
    strictEqual(lines.length, expectedLines.length + 1);
    strictEqual((lines[0] ?? '').endsWith(expectedLines[0] ?? ''), true);
    strictEqual(lines.slice(1, -1).join('\n'), alignedLines.join('\n'));
    strictEqual(lines[lines.length - 1], '');

    return;
  });

  return;
});
