import { format } from 'node:util';

import chalk from 'chalk';

import { LIB_REGEX_LINEBREAK_CRLF_OR_LF, LIB_REGEX_PATTERN_ANSI } from '../lib/regex.js';
import { currentTimestamp } from '../lib/utility.js';

import type {
  ToolkitLoggerCustomizeOptions,
  ToolkitLoggerCustomizeReturns,
  ToolkitLoggerDebugMessage,
  ToolkitLoggerDebugReturns,
  ToolkitLoggerDevMessage,
  ToolkitLoggerDevReturns,
  ToolkitLoggerEmitAlignedMessage,
  ToolkitLoggerEmitFormattedMessage,
  ToolkitLoggerEmitIndent,
  ToolkitLoggerEmitLevel,
  ToolkitLoggerEmitLinebreakPattern,
  ToolkitLoggerEmitMessage,
  ToolkitLoggerEmitOptions,
  ToolkitLoggerEmitPadBottom,
  ToolkitLoggerEmitPadBottomCount,
  ToolkitLoggerEmitPadTop,
  ToolkitLoggerEmitPadTopCount,
  ToolkitLoggerEmitPayload,
  ToolkitLoggerEmitPrefix,
  ToolkitLoggerEmitPrefixVisibleLength,
  ToolkitLoggerEmitReturns,
  ToolkitLoggerEmitStream,
  ToolkitLoggerErrorMessage,
  ToolkitLoggerErrorReturns,
  ToolkitLoggerInfoMessage,
  ToolkitLoggerInfoReturns,
  ToolkitLoggerPrefixColoredLevelLabel,
  ToolkitLoggerPrefixLevel,
  ToolkitLoggerPrefixLevelLabelUpper,
  ToolkitLoggerPrefixOptions,
  ToolkitLoggerPrefixReturns,
  ToolkitLoggerPrefixScopeLabel,
  ToolkitLoggerPrefixScopeTag,
  ToolkitLoggerPrefixShowScope,
  ToolkitLoggerPrefixTimestamp,
  ToolkitLoggerScopeLabelOptions,
  ToolkitLoggerScopeLabelReturns,
  ToolkitLoggerScopeLabelSegments,
  ToolkitLoggerShouldLogCurrentLogLevel,
  ToolkitLoggerShouldLogDefaultLogLevel,
  ToolkitLoggerShouldLogIsBrowser,
  ToolkitLoggerShouldLogLevel,
  ToolkitLoggerShouldLogNodeEnv,
  ToolkitLoggerShouldLogPreferredLogLevel,
  ToolkitLoggerShouldLogPreferredLogLevelCurrentLogLevel,
  ToolkitLoggerShouldLogReturns,
  ToolkitLoggerShouldLogWeights,
  ToolkitLoggerStripAnsiColorsPattern,
  ToolkitLoggerStripAnsiColorsReturns,
  ToolkitLoggerStripAnsiColorsValue,
  ToolkitLoggerWarnMessage,
  ToolkitLoggerWarnReturns,
} from '../types/toolkit/logger.d.ts';

/**
 * Toolkit - Logger.
 *
 * Structured logging utility used across all CLI commands, API modules,
 * and library helpers. Supports scoped labels, level filtering, and timestamped output.
 *
 * @since 0.11.0
 */
class ToolkitLogger {
  /**
   * Toolkit - Logger - Debug.
   *
   * Emits a debug-level message to stdout. Only visible when LOG_LEVEL is set to debug or
   * NODE_ENV is development.
   *
   * @param {ToolkitLoggerDebugMessage} message - Message.
   *
   * @returns {ToolkitLoggerDebugReturns}
   *
   * @since 0.11.0
   */
  public static debug(...message: ToolkitLoggerDebugMessage): ToolkitLoggerDebugReturns {
    ToolkitLogger.emit('debug', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Dev.
   *
   * Emits a dev-level message with the highest weight so it always appears regardless of
   * LOG_LEVEL. Must be removed before production builds.
   *
   * @param {ToolkitLoggerDevMessage} message - Message.
   *
   * @returns {ToolkitLoggerDevReturns}
   *
   * @since 0.12.0
   */
  public static dev(...message: ToolkitLoggerDevMessage): ToolkitLoggerDevReturns {
    ToolkitLogger.emit('dev', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Info.
   *
   * Emits an info-level message to stdout. This is the default level in production
   * and the most common level used by CLI commands and API modules.
   *
   * @param {ToolkitLoggerInfoMessage} message - Message.
   *
   * @returns {ToolkitLoggerInfoReturns}
   *
   * @since 0.11.0
   */
  public static info(...message: ToolkitLoggerInfoMessage): ToolkitLoggerInfoReturns {
    ToolkitLogger.emit('info', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Warn.
   *
   * Emits a warning-level message to stderr. Used for non-fatal
   * issues that should be visible even when running in browser production mode.
   *
   * @param {ToolkitLoggerWarnMessage} message - Message.
   *
   * @returns {ToolkitLoggerWarnReturns}
   *
   * @since 0.11.0
   */
  public static warn(...message: ToolkitLoggerWarnMessage): ToolkitLoggerWarnReturns {
    ToolkitLogger.emit('warn', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Error.
   *
   * Emits an error-level message to stderr. Carries the second-highest weight so
   * it is only suppressed when logging is fully disabled.
   *
   * @param {ToolkitLoggerErrorMessage} message - Message.
   *
   * @returns {ToolkitLoggerErrorReturns}
   *
   * @since 0.11.0
   */
  public static error(...message: ToolkitLoggerErrorMessage): ToolkitLoggerErrorReturns {
    ToolkitLogger.emit('error', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Customize.
   *
   * Returns a scoped logger whose methods inherit the given options. Used by API
   * modules and CLI header to tag output with name, type, and purpose labels.
   *
   * @param {ToolkitLoggerCustomizeOptions} options - Options.
   *
   * @returns {ToolkitLoggerCustomizeReturns}
   *
   * @since 0.11.0
   */
  public static customize(options: ToolkitLoggerCustomizeOptions): ToolkitLoggerCustomizeReturns {
    return {
      debug(...message: ToolkitLoggerDebugMessage): ToolkitLoggerDebugReturns {
        ToolkitLogger.emit('debug', options, ...message);

        return;
      },
      dev(...message: ToolkitLoggerDevMessage): ToolkitLoggerDevReturns {
        ToolkitLogger.emit('dev', options, ...message);

        return;
      },
      info(...message: ToolkitLoggerInfoMessage): ToolkitLoggerInfoReturns {
        ToolkitLogger.emit('info', options, ...message);

        return;
      },
      warn(...message: ToolkitLoggerWarnMessage): ToolkitLoggerWarnReturns {
        ToolkitLogger.emit('warn', options, ...message);

        return;
      },
      error(...message: ToolkitLoggerErrorMessage): ToolkitLoggerErrorReturns {
        ToolkitLogger.emit('error', options, ...message);

        return;
      },
    };
  }

  /**
   * Toolkit - Logger - Emit.
   *
   * Core output method called by every log level. Checks
   * shouldLog, applies padding, formats the prefix, and writes to stdout or stderr.
   *
   * @param {ToolkitLoggerEmitLevel}   level   - Level.
   * @param {ToolkitLoggerEmitOptions} options - Options.
   * @param {ToolkitLoggerEmitMessage} message - Message.
   *
   * @private
   *
   * @returns {ToolkitLoggerEmitReturns}
   *
   * @since 0.11.0
   */
  private static emit(level: ToolkitLoggerEmitLevel, options: ToolkitLoggerEmitOptions, ...message: ToolkitLoggerEmitMessage): ToolkitLoggerEmitReturns {
    if (ToolkitLogger.shouldLog(level) === false) {
      return;
    }

    const padTopCount: ToolkitLoggerEmitPadTopCount = Math.max(0, options['padTop'] ?? 0);
    const padBottomCount: ToolkitLoggerEmitPadBottomCount = Math.max(0, options['padBottom'] ?? 0);
    const padTop: ToolkitLoggerEmitPadTop = '\n'.repeat(padTopCount);
    const padBottom: ToolkitLoggerEmitPadBottom = '\n'.repeat(padBottomCount);

    const stream: ToolkitLoggerEmitStream = (level === 'warn' || level === 'error') ? process.stderr : process.stdout;
    const formattedMessage: ToolkitLoggerEmitFormattedMessage = (message.length > 0) ? format(...message) : '';

    if (padTop.length > 0) {
      stream.write(padTop);
    }

    const prefix: ToolkitLoggerEmitPrefix = ToolkitLogger.prefix(level, options);
    const prefixVisibleLength: ToolkitLoggerEmitPrefixVisibleLength = ToolkitLogger.stripAnsiColors(prefix).length;
    const indent: ToolkitLoggerEmitIndent = ' '.repeat(prefixVisibleLength + 1);
    const linebreakPattern: ToolkitLoggerEmitLinebreakPattern = new RegExp(LIB_REGEX_LINEBREAK_CRLF_OR_LF, 'g');
    const alignedMessage: ToolkitLoggerEmitAlignedMessage = formattedMessage.replace(linebreakPattern, `$&${indent}`);

    const payload: ToolkitLoggerEmitPayload = (formattedMessage.length > 0) ? `${prefix} ${alignedMessage}` : prefix;

    stream.write(`${payload}\n`);

    if (padBottom.length > 0) {
      stream.write(padBottom);
    }

    return;
  }

  /**
   * Toolkit - Logger - Should Log.
   *
   * Compares the requested level weight against the active
   * threshold derived from LOG_LEVEL, NODE_ENV, and whether the runtime is a browser.
   *
   * @param {ToolkitLoggerShouldLogLevel} level - Level.
   *
   * @private
   *
   * @returns {ToolkitLoggerShouldLogReturns}
   *
   * @since 0.11.0
   */
  private static shouldLog(level: ToolkitLoggerShouldLogLevel): ToolkitLoggerShouldLogReturns {
    const weights: ToolkitLoggerShouldLogWeights = {
      debug: 10,
      info: 20,
      warn: 30,
      error: 40,

      // This weight is intentional.
      dev: 100,
    };

    const isBrowser: ToolkitLoggerShouldLogIsBrowser = typeof globalThis === 'object' && Reflect.has(globalThis, 'window');
    const nodeEnv: ToolkitLoggerShouldLogNodeEnv = process.env['NODE_ENV'] ?? 'production';

    const currentLogLevel: ToolkitLoggerShouldLogCurrentLogLevel = (process.env['LOG_LEVEL'] ?? '').toLowerCase();
    let defaultLogLevel: ToolkitLoggerShouldLogDefaultLogLevel = undefined;

    if (isBrowser === true && nodeEnv === 'production') {
      defaultLogLevel = 'warn';
    } else if (nodeEnv === 'development') {
      defaultLogLevel = 'debug';
    } else {
      defaultLogLevel = 'info';
    }

    const preferredLogLevel: ToolkitLoggerShouldLogPreferredLogLevel = (Object.keys(weights).includes(currentLogLevel) === true) ? (currentLogLevel as ToolkitLoggerShouldLogPreferredLogLevelCurrentLogLevel) : defaultLogLevel;

    return weights[level] >= weights[preferredLogLevel];
  }

  /**
   * Toolkit - Logger - Prefix.
   *
   * Builds the colored level label, optional scope tag, and optional timestamp
   * that precede every log line. Scope tags only appear in debug mode.
   *
   * @param {ToolkitLoggerPrefixLevel}   level   - Level.
   * @param {ToolkitLoggerPrefixOptions} options - Options.
   *
   * @private
   *
   * @returns {ToolkitLoggerPrefixReturns}
   *
   * @since 0.11.0
   */
  private static prefix(level: ToolkitLoggerPrefixLevel, options: ToolkitLoggerPrefixOptions): ToolkitLoggerPrefixReturns {
    const levelLabelUpper: ToolkitLoggerPrefixLevelLabelUpper = level.toUpperCase();
    const scopeLabel: ToolkitLoggerPrefixScopeLabel = ToolkitLogger.scopeLabel(options);
    const showScope: ToolkitLoggerPrefixShowScope = (
      process.env['LOG_LEVEL'] === 'debug'
      || process.env['NODE_ENV'] === 'development'
    ) && scopeLabel !== null;
    const scopeTag: ToolkitLoggerPrefixScopeTag = (showScope === true) ? ` ${chalk.dim(`[${scopeLabel}]`)}` : '';

    let coloredLevelLabel: ToolkitLoggerPrefixColoredLevelLabel = undefined;

    switch (level) {
      case 'debug': {
        coloredLevelLabel = chalk.grey(levelLabelUpper);
        break;
      }

      case 'dev': {
        coloredLevelLabel = chalk.magenta(levelLabelUpper);
        break;
      }

      case 'info': {
        coloredLevelLabel = chalk.blue(levelLabelUpper);
        break;
      }

      case 'warn': {
        coloredLevelLabel = chalk.yellow(levelLabelUpper);
        break;
      }

      case 'error': {
        coloredLevelLabel = chalk.red(levelLabelUpper);
        break;
      }

      default: {
        coloredLevelLabel = chalk.white(levelLabelUpper);
        break;
      }
    }

    // Show log timestamp if the "LOG_TIME" environment variable is seen.
    if (process.env['LOG_TIME'] !== undefined && process.env['LOG_TIME'] === 'true') {
      const timestamp: ToolkitLoggerPrefixTimestamp = currentTimestamp();

      return `${chalk.dim(timestamp)} ${coloredLevelLabel}${scopeTag}`;
    }

    return `${coloredLevelLabel}${scopeTag}`;
  }

  /**
   * Toolkit - Logger - Scope Label.
   *
   * Joins the name, type, and purpose segments from customize options into a
   * double-colon-separated label. Returns null when no segments are present.
   *
   * @param {ToolkitLoggerScopeLabelOptions} options - Options.
   *
   * @private
   *
   * @returns {ToolkitLoggerScopeLabelReturns}
   *
   * @since 0.12.0
   */
  private static scopeLabel(options: ToolkitLoggerScopeLabelOptions): ToolkitLoggerScopeLabelReturns {
    const segments: ToolkitLoggerScopeLabelSegments = [];

    if (options['name'] !== undefined) {
      segments.push(options['name']);
    }

    if (options['type'] !== undefined) {
      segments.push(options['type']);
    }

    if (options['purpose'] !== undefined) {
      segments.push(options['purpose']);
    }

    return (segments.length > 0) ? segments.join('::') : null;
  }

  /**
   * Toolkit - Logger - Strip ANSI Colors.
   *
   * Removes ANSI escape sequences so visible character length can be measured.
   * Used by emit to calculate the indentation width for multi-line alignment.
   *
   * @param {ToolkitLoggerStripAnsiColorsValue} value - Value.
   *
   * @private
   *
   * @returns {ToolkitLoggerStripAnsiColorsReturns}
   *
   * @since 0.11.0
   */
  private static stripAnsiColors(value: ToolkitLoggerStripAnsiColorsValue): ToolkitLoggerStripAnsiColorsReturns {
    const pattern: ToolkitLoggerStripAnsiColorsPattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return value.replace(pattern, '');
  }
}

export default ToolkitLogger;
