import type { Shared_LoggerCustomizeReturns, Shared_LogLevel, Shared_LogOptions } from '../shared.d.ts';

/**
 * Toolkit - Logger - Customize.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Customize_Options = Shared_LogOptions;

export type Toolkit_Logger_Customize_Returns = Shared_LoggerCustomizeReturns;

/**
 * Toolkit - Logger - Debug.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Debug_Message = unknown[];

export type Toolkit_Logger_Debug_Returns = void;

/**
 * Toolkit - Logger - Dev.
 *
 * @since 0.12.0
 */
export type Toolkit_Logger_Dev_Message = unknown[];

export type Toolkit_Logger_Dev_Returns = void;

/**
 * Toolkit - Logger - Emit.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Emit_Level = Shared_LogLevel;

export type Toolkit_Logger_Emit_Options = Shared_LogOptions;

export type Toolkit_Logger_Emit_Message = unknown[];

export type Toolkit_Logger_Emit_Returns = void;

export type Toolkit_Logger_Emit_PadTopCount = number;

export type Toolkit_Logger_Emit_PadBottomCount = number;

export type Toolkit_Logger_Emit_PadTop = string;

export type Toolkit_Logger_Emit_PadBottom = string;

export type Toolkit_Logger_Emit_Stream = NodeJS.WriteStream;

export type Toolkit_Logger_Emit_FormattedMessage = string;

export type Toolkit_Logger_Emit_Prefix = string;

export type Toolkit_Logger_Emit_PrefixVisibleLength = number;

export type Toolkit_Logger_Emit_Indent = string;

export type Toolkit_Logger_Emit_LinebreakPattern = RegExp;

export type Toolkit_Logger_Emit_AlignedMessage = string;

export type Toolkit_Logger_Emit_Payload = string;

/**
 * Toolkit - Logger - Error.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Error_Message = unknown[];

export type Toolkit_Logger_Error_Returns = void;

/**
 * Toolkit - Logger - Info.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Info_Message = unknown[];

export type Toolkit_Logger_Info_Returns = void;

/**
 * Toolkit - Logger - Prefix.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Prefix_Level = Shared_LogLevel;

export type Toolkit_Logger_Prefix_Options = Shared_LogOptions;

export type Toolkit_Logger_Prefix_Returns = string;

export type Toolkit_Logger_Prefix_LevelLabelUpper = string;

export type Toolkit_Logger_Prefix_ScopeLabel = string | null;

export type Toolkit_Logger_Prefix_ShowScope = boolean;

export type Toolkit_Logger_Prefix_ScopeTag = string;

export type Toolkit_Logger_Prefix_ColoredLevelLabel = string | undefined;

export type Toolkit_Logger_Prefix_Timestamp = string;

/**
 * Toolkit - Logger - Scope Label.
 *
 * @since 0.12.0
 */
export type Toolkit_Logger_ScopeLabel_Options = Shared_LogOptions;

export type Toolkit_Logger_ScopeLabel_Returns = string | null;

export type Toolkit_Logger_ScopeLabel_Segments = string[];

/**
 * Toolkit - Logger - Should Log.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_ShouldLog_Level = Shared_LogLevel;

export type Toolkit_Logger_ShouldLog_Returns = boolean;

export type Toolkit_Logger_ShouldLog_Weights = Record<Shared_LogLevel, number>;

export type Toolkit_Logger_ShouldLog_IsBrowser = boolean;

export type Toolkit_Logger_ShouldLog_NodeEnv = string;

export type Toolkit_Logger_ShouldLog_CurrentLogLevel = string;

export type Toolkit_Logger_ShouldLog_DefaultLogLevel = Shared_LogLevel | undefined;

export type Toolkit_Logger_ShouldLog_PreferredLogLevelCurrentLogLevel = Shared_LogLevel;

export type Toolkit_Logger_ShouldLog_PreferredLogLevel = Shared_LogLevel;

/**
 * Toolkit - Logger - Strip ANSI Colors.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_StripAnsiColors_Value = string;

export type Toolkit_Logger_StripAnsiColors_Returns = string;

export type Toolkit_Logger_StripAnsiColors_Pattern = RegExp;

/**
 * Toolkit - Logger - Warn.
 *
 * @since 0.11.0
 */
export type Toolkit_Logger_Warn_Message = unknown[];

export type Toolkit_Logger_Warn_Returns = void;
