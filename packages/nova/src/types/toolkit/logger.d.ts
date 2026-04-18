import type { SharedLoggerCustomizeReturns, SharedLogLevel, SharedLogOptions } from '../shared.d.ts';

/**
 * Toolkit - Logger - Customize.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerCustomizeOptions = SharedLogOptions;

export type ToolkitLoggerCustomizeReturns = SharedLoggerCustomizeReturns;

/**
 * Toolkit - Logger - Debug.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerDebugMessage = unknown[];

export type ToolkitLoggerDebugReturns = void;

/**
 * Toolkit - Logger - Dev.
 *
 * @since 0.12.0
 */
export type ToolkitLoggerDevMessage = unknown[];

export type ToolkitLoggerDevReturns = void;

/**
 * Toolkit - Logger - Emit.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerEmitLevel = SharedLogLevel;

export type ToolkitLoggerEmitOptions = SharedLogOptions;

export type ToolkitLoggerEmitMessage = unknown[];

export type ToolkitLoggerEmitReturns = void;

export type ToolkitLoggerEmitPadTopCount = number;

export type ToolkitLoggerEmitPadBottomCount = number;

export type ToolkitLoggerEmitPadTop = string;

export type ToolkitLoggerEmitPadBottom = string;

export type ToolkitLoggerEmitStream = NodeJS.WriteStream;

export type ToolkitLoggerEmitFormattedMessage = string;

export type ToolkitLoggerEmitPrefix = string;

export type ToolkitLoggerEmitPrefixVisibleLength = number;

export type ToolkitLoggerEmitIndent = string;

export type ToolkitLoggerEmitLinebreakPattern = RegExp;

export type ToolkitLoggerEmitAlignedMessage = string;

export type ToolkitLoggerEmitPayload = string;

/**
 * Toolkit - Logger - Error.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerErrorMessage = unknown[];

export type ToolkitLoggerErrorReturns = void;

/**
 * Toolkit - Logger - Info.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerInfoMessage = unknown[];

export type ToolkitLoggerInfoReturns = void;

/**
 * Toolkit - Logger - Prefix.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerPrefixLevel = SharedLogLevel;

export type ToolkitLoggerPrefixOptions = SharedLogOptions;

export type ToolkitLoggerPrefixReturns = string;

export type ToolkitLoggerPrefixLevelLabelUpper = string;

export type ToolkitLoggerPrefixScopeLabel = string | null;

export type ToolkitLoggerPrefixShowScope = boolean;

export type ToolkitLoggerPrefixScopeTag = string;

export type ToolkitLoggerPrefixColoredLevelLabel = string | undefined;

export type ToolkitLoggerPrefixTimestamp = string;

/**
 * Toolkit - Logger - Scope Label.
 *
 * @since 0.12.0
 */
export type ToolkitLoggerScopeLabelOptions = SharedLogOptions;

export type ToolkitLoggerScopeLabelReturns = string | null;

export type ToolkitLoggerScopeLabelSegments = string[];

/**
 * Toolkit - Logger - Should Log.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerShouldLogLevel = SharedLogLevel;

export type ToolkitLoggerShouldLogReturns = boolean;

export type ToolkitLoggerShouldLogWeights = Record<SharedLogLevel, number>;

export type ToolkitLoggerShouldLogIsBrowser = boolean;

export type ToolkitLoggerShouldLogNodeEnv = string;

export type ToolkitLoggerShouldLogCurrentLogLevel = string;

export type ToolkitLoggerShouldLogDefaultLogLevel = SharedLogLevel | undefined;

export type ToolkitLoggerShouldLogPreferredLogLevelCurrentLogLevel = SharedLogLevel;

export type ToolkitLoggerShouldLogPreferredLogLevel = SharedLogLevel;

/**
 * Toolkit - Logger - Strip ANSI Colors.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerStripAnsiColorsValue = string;

export type ToolkitLoggerStripAnsiColorsReturns = string;

export type ToolkitLoggerStripAnsiColorsPattern = RegExp;

/**
 * Toolkit - Logger - Warn.
 *
 * @since 0.11.0
 */
export type ToolkitLoggerWarnMessage = unknown[];

export type ToolkitLoggerWarnReturns = void;
