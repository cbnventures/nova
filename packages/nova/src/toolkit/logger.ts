import { format } from 'node:util';

import chalk from 'chalk';

import { LIB_REGEX_LINEBREAK_CRLF_OR_LF, LIB_REGEX_PATTERN_ANSI } from '../lib/regex.js';
import { currentTimestamp } from '../lib/utility.js';

import type {
  Toolkit_Logger_Runner_Customize_Debug_Message,
  Toolkit_Logger_Runner_Customize_Debug_Returns,
  Toolkit_Logger_Runner_Customize_Dev_Message,
  Toolkit_Logger_Runner_Customize_Dev_Returns,
  Toolkit_Logger_Runner_Customize_Error_Message,
  Toolkit_Logger_Runner_Customize_Error_Returns,
  Toolkit_Logger_Runner_Customize_Info_Message,
  Toolkit_Logger_Runner_Customize_Info_Returns,
  Toolkit_Logger_Runner_Customize_Options,
  Toolkit_Logger_Runner_Customize_Returns,
  Toolkit_Logger_Runner_Customize_Warn_Message,
  Toolkit_Logger_Runner_Customize_Warn_Returns,
  Toolkit_Logger_Runner_Debug_Message,
  Toolkit_Logger_Runner_Debug_Returns,
  Toolkit_Logger_Runner_Dev_Message,
  Toolkit_Logger_Runner_Dev_Returns,
  Toolkit_Logger_Runner_Emit_AlignedMessage,
  Toolkit_Logger_Runner_Emit_FormattedMessage,
  Toolkit_Logger_Runner_Emit_Indent,
  Toolkit_Logger_Runner_Emit_Level,
  Toolkit_Logger_Runner_Emit_LinebreakPattern,
  Toolkit_Logger_Runner_Emit_Message,
  Toolkit_Logger_Runner_Emit_Options,
  Toolkit_Logger_Runner_Emit_PadBottom,
  Toolkit_Logger_Runner_Emit_PadBottomCount,
  Toolkit_Logger_Runner_Emit_PadTop,
  Toolkit_Logger_Runner_Emit_PadTopCount,
  Toolkit_Logger_Runner_Emit_Payload,
  Toolkit_Logger_Runner_Emit_Prefix,
  Toolkit_Logger_Runner_Emit_PrefixVisibleLength,
  Toolkit_Logger_Runner_Emit_Returns,
  Toolkit_Logger_Runner_Emit_Stream,
  Toolkit_Logger_Runner_Error_Message,
  Toolkit_Logger_Runner_Error_Returns,
  Toolkit_Logger_Runner_Info_Message,
  Toolkit_Logger_Runner_Info_Returns,
  Toolkit_Logger_Runner_Prefix_ColoredLevelLabel,
  Toolkit_Logger_Runner_Prefix_Level,
  Toolkit_Logger_Runner_Prefix_LevelLabelUpper,
  Toolkit_Logger_Runner_Prefix_Options,
  Toolkit_Logger_Runner_Prefix_Returns,
  Toolkit_Logger_Runner_Prefix_ScopeLabel,
  Toolkit_Logger_Runner_Prefix_ScopeTag,
  Toolkit_Logger_Runner_Prefix_ShowScope,
  Toolkit_Logger_Runner_Prefix_Timestamp,
  Toolkit_Logger_Runner_ScopeLabel_Options,
  Toolkit_Logger_Runner_ScopeLabel_Returns,
  Toolkit_Logger_Runner_ScopeLabel_Segments,
  Toolkit_Logger_Runner_ShouldLog_CurrentLogLevel,
  Toolkit_Logger_Runner_ShouldLog_DefaultLogLevel,
  Toolkit_Logger_Runner_ShouldLog_IsAutoLogLevel,
  Toolkit_Logger_Runner_ShouldLog_IsBrowser,
  Toolkit_Logger_Runner_ShouldLog_IsUserSelectableLevel,
  Toolkit_Logger_Runner_ShouldLog_Level,
  Toolkit_Logger_Runner_ShouldLog_NodeEnv,
  Toolkit_Logger_Runner_ShouldLog_PreferredLogLevel,
  Toolkit_Logger_Runner_ShouldLog_PreferredLogLevelCurrentLogLevel,
  Toolkit_Logger_Runner_ShouldLog_Returns,
  Toolkit_Logger_Runner_ShouldLog_Weights,
  Toolkit_Logger_Runner_StripAnsiColors_Pattern,
  Toolkit_Logger_Runner_StripAnsiColors_Returns,
  Toolkit_Logger_Runner_StripAnsiColors_Value,
  Toolkit_Logger_Runner_Warn_Message,
  Toolkit_Logger_Runner_Warn_Returns,
} from '../types/toolkit/logger.d.ts';

/**
 * Toolkit - Logger.
 *
 * Structured logging utility used across all CLI commands, API modules,
 * and library helpers. Supports scoped labels, level filtering, and timestamped output.
 *
 * @since 0.11.0
 */
class Runner {
  /**
   * Toolkit - Logger - Debug.
   *
   * Emits a debug-level message to stdout. Only visible when LOG_LEVEL is set to debug or
   * NODE_ENV is development.
   *
   * @param {Toolkit_Logger_Runner_Debug_Message} message - Message.
   *
   * @returns {Toolkit_Logger_Runner_Debug_Returns}
   *
   * @since 0.11.0
   */
  public static debug(...message: Toolkit_Logger_Runner_Debug_Message): Toolkit_Logger_Runner_Debug_Returns {
    Runner.emit('debug', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Dev.
   *
   * Emits a dev-level message with the highest weight so it always appears regardless of
   * LOG_LEVEL. Must be removed before production builds.
   *
   * @param {Toolkit_Logger_Runner_Dev_Message} message - Message.
   *
   * @returns {Toolkit_Logger_Runner_Dev_Returns}
   *
   * @since 0.12.0
   */
  public static dev(...message: Toolkit_Logger_Runner_Dev_Message): Toolkit_Logger_Runner_Dev_Returns {
    Runner.emit('dev', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Info.
   *
   * Emits an info-level message to stdout. This is the default level in production
   * and the most common level used by CLI commands and API modules.
   *
   * @param {Toolkit_Logger_Runner_Info_Message} message - Message.
   *
   * @returns {Toolkit_Logger_Runner_Info_Returns}
   *
   * @since 0.11.0
   */
  public static info(...message: Toolkit_Logger_Runner_Info_Message): Toolkit_Logger_Runner_Info_Returns {
    Runner.emit('info', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Warn.
   *
   * Emits a warning-level message to stderr. Used for non-fatal
   * issues that should be visible even when running in browser production mode.
   *
   * @param {Toolkit_Logger_Runner_Warn_Message} message - Message.
   *
   * @returns {Toolkit_Logger_Runner_Warn_Returns}
   *
   * @since 0.11.0
   */
  public static warn(...message: Toolkit_Logger_Runner_Warn_Message): Toolkit_Logger_Runner_Warn_Returns {
    Runner.emit('warn', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Error.
   *
   * Emits an error-level message to stderr. Carries the second-highest weight so
   * it is only suppressed when logging is fully disabled.
   *
   * @param {Toolkit_Logger_Runner_Error_Message} message - Message.
   *
   * @returns {Toolkit_Logger_Runner_Error_Returns}
   *
   * @since 0.11.0
   */
  public static error(...message: Toolkit_Logger_Runner_Error_Message): Toolkit_Logger_Runner_Error_Returns {
    Runner.emit('error', {}, ...message);

    return;
  }

  /**
   * Toolkit - Logger - Customize.
   *
   * Returns a scoped logger whose methods inherit the given options. Used by API
   * modules and CLI header to tag output with name, type, and purpose labels.
   *
   * @param {Toolkit_Logger_Runner_Customize_Options} options - Options.
   *
   * @returns {Toolkit_Logger_Runner_Customize_Returns}
   *
   * @since 0.11.0
   */
  public static customize(options: Toolkit_Logger_Runner_Customize_Options): Toolkit_Logger_Runner_Customize_Returns {
    return {
      debug(...message: Toolkit_Logger_Runner_Customize_Debug_Message): Toolkit_Logger_Runner_Customize_Debug_Returns {
        Runner.emit('debug', options, ...message);

        return;
      },
      dev(...message: Toolkit_Logger_Runner_Customize_Dev_Message): Toolkit_Logger_Runner_Customize_Dev_Returns {
        Runner.emit('dev', options, ...message);

        return;
      },
      info(...message: Toolkit_Logger_Runner_Customize_Info_Message): Toolkit_Logger_Runner_Customize_Info_Returns {
        Runner.emit('info', options, ...message);

        return;
      },
      warn(...message: Toolkit_Logger_Runner_Customize_Warn_Message): Toolkit_Logger_Runner_Customize_Warn_Returns {
        Runner.emit('warn', options, ...message);

        return;
      },
      error(...message: Toolkit_Logger_Runner_Customize_Error_Message): Toolkit_Logger_Runner_Customize_Error_Returns {
        Runner.emit('error', options, ...message);

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
   * @param {Toolkit_Logger_Runner_Emit_Level}   level   - Level.
   * @param {Toolkit_Logger_Runner_Emit_Options} options - Options.
   * @param {Toolkit_Logger_Runner_Emit_Message} message - Message.
   *
   * @private
   *
   * @returns {Toolkit_Logger_Runner_Emit_Returns}
   *
   * @since 0.11.0
   */
  private static emit(level: Toolkit_Logger_Runner_Emit_Level, options: Toolkit_Logger_Runner_Emit_Options, ...message: Toolkit_Logger_Runner_Emit_Message): Toolkit_Logger_Runner_Emit_Returns {
    if (Runner.shouldLog(level) === false) {
      return;
    }

    const padTopCount: Toolkit_Logger_Runner_Emit_PadTopCount = Math.max(0, options['padTop'] ?? 0);
    const padBottomCount: Toolkit_Logger_Runner_Emit_PadBottomCount = Math.max(0, options['padBottom'] ?? 0);
    const padTop: Toolkit_Logger_Runner_Emit_PadTop = '\n'.repeat(padTopCount);
    const padBottom: Toolkit_Logger_Runner_Emit_PadBottom = '\n'.repeat(padBottomCount);

    const stream: Toolkit_Logger_Runner_Emit_Stream = (level === 'warn' || level === 'error') ? process.stderr : process.stdout;
    const formattedMessage: Toolkit_Logger_Runner_Emit_FormattedMessage = (message.length > 0) ? format(...message) : '';

    if (padTop.length > 0) {
      stream.write(padTop);
    }

    const prefix: Toolkit_Logger_Runner_Emit_Prefix = Runner.prefix(level, options);
    const prefixVisibleLength: Toolkit_Logger_Runner_Emit_PrefixVisibleLength = Runner.stripAnsiColors(prefix).length;
    const indent: Toolkit_Logger_Runner_Emit_Indent = ' '.repeat(prefixVisibleLength + 1);
    const linebreakPattern: Toolkit_Logger_Runner_Emit_LinebreakPattern = new RegExp(LIB_REGEX_LINEBREAK_CRLF_OR_LF, 'g');
    const alignedMessage: Toolkit_Logger_Runner_Emit_AlignedMessage = formattedMessage.replace(linebreakPattern, `$&${indent}`);

    const payload: Toolkit_Logger_Runner_Emit_Payload = (formattedMessage.length > 0) ? `${prefix} ${alignedMessage}` : prefix;

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
   * @param {Toolkit_Logger_Runner_ShouldLog_Level} level - Level.
   *
   * @private
   *
   * @returns {Toolkit_Logger_Runner_ShouldLog_Returns}
   *
   * @since 0.11.0
   */
  private static shouldLog(level: Toolkit_Logger_Runner_ShouldLog_Level): Toolkit_Logger_Runner_ShouldLog_Returns {
    const weights: Toolkit_Logger_Runner_ShouldLog_Weights = {
      debug: 10,
      info: 20,
      warn: 30,
      error: 40,

      // This weight is intentional.
      dev: 100,
    };

    const isBrowser: Toolkit_Logger_Runner_ShouldLog_IsBrowser = typeof globalThis === 'object' && Reflect.has(globalThis, 'window');
    const nodeEnv: Toolkit_Logger_Runner_ShouldLog_NodeEnv = process.env['NODE_ENV'] ?? 'production';

    const currentLogLevel: Toolkit_Logger_Runner_ShouldLog_CurrentLogLevel = (process.env['LOG_LEVEL'] ?? '').toLowerCase();
    let defaultLogLevel: Toolkit_Logger_Runner_ShouldLog_DefaultLogLevel = undefined;

    if (isBrowser === true && nodeEnv === 'production') {
      defaultLogLevel = 'warn';
    } else if (nodeEnv === 'development') {
      defaultLogLevel = 'debug';
    } else {
      defaultLogLevel = 'info';
    }

    // An "auto" (or unset) LOG_LEVEL explicitly selects the NODE_ENV-derived default.
    const isAutoLogLevel: Toolkit_Logger_Runner_ShouldLog_IsAutoLogLevel = currentLogLevel === '' || currentLogLevel === 'auto';

    // The "dev" weight only backs Logger.dev()'s always-on output; it is not a user-selectable LOG_LEVEL, so an explicit "dev" falls back to the default.
    const isUserSelectableLevel: Toolkit_Logger_Runner_ShouldLog_IsUserSelectableLevel = Object.keys(weights).includes(currentLogLevel) === true && currentLogLevel !== 'dev';

    const preferredLogLevel: Toolkit_Logger_Runner_ShouldLog_PreferredLogLevel = (isAutoLogLevel === false && isUserSelectableLevel === true) ? (currentLogLevel as Toolkit_Logger_Runner_ShouldLog_PreferredLogLevelCurrentLogLevel) : defaultLogLevel;

    return weights[level] >= weights[preferredLogLevel];
  }

  /**
   * Toolkit - Logger - Prefix.
   *
   * Builds the colored level label, optional scope tag, and optional timestamp
   * that precede every log line. Scope tags only appear in debug mode.
   *
   * @param {Toolkit_Logger_Runner_Prefix_Level}   level   - Level.
   * @param {Toolkit_Logger_Runner_Prefix_Options} options - Options.
   *
   * @private
   *
   * @returns {Toolkit_Logger_Runner_Prefix_Returns}
   *
   * @since 0.11.0
   */
  private static prefix(level: Toolkit_Logger_Runner_Prefix_Level, options: Toolkit_Logger_Runner_Prefix_Options): Toolkit_Logger_Runner_Prefix_Returns {
    const levelLabelUpper: Toolkit_Logger_Runner_Prefix_LevelLabelUpper = level.toUpperCase();
    const scopeLabel: Toolkit_Logger_Runner_Prefix_ScopeLabel = Runner.scopeLabel(options);
    const showScope: Toolkit_Logger_Runner_Prefix_ShowScope = (
      process.env['LOG_LEVEL'] === 'debug'
      || process.env['NODE_ENV'] === 'development'
    ) && scopeLabel !== null;
    const scopeTag: Toolkit_Logger_Runner_Prefix_ScopeTag = (showScope === true) ? ` ${chalk.dim(`[${scopeLabel}]`)}` : '';

    let coloredLevelLabel: Toolkit_Logger_Runner_Prefix_ColoredLevelLabel = undefined;

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
      const timestamp: Toolkit_Logger_Runner_Prefix_Timestamp = currentTimestamp();

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
   * @param {Toolkit_Logger_Runner_ScopeLabel_Options} options - Options.
   *
   * @private
   *
   * @returns {Toolkit_Logger_Runner_ScopeLabel_Returns}
   *
   * @since 0.12.0
   */
  private static scopeLabel(options: Toolkit_Logger_Runner_ScopeLabel_Options): Toolkit_Logger_Runner_ScopeLabel_Returns {
    const segments: Toolkit_Logger_Runner_ScopeLabel_Segments = [];

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
   * @param {Toolkit_Logger_Runner_StripAnsiColors_Value} value - Value.
   *
   * @private
   *
   * @returns {Toolkit_Logger_Runner_StripAnsiColors_Returns}
   *
   * @since 0.11.0
   */
  private static stripAnsiColors(value: Toolkit_Logger_Runner_StripAnsiColors_Value): Toolkit_Logger_Runner_StripAnsiColors_Returns {
    const pattern: Toolkit_Logger_Runner_StripAnsiColors_Pattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return value.replace(pattern, '');
  }
}

export default Runner;
