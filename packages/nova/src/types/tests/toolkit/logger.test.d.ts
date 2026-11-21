/**
 * Tests - Toolkit - Logger - Logger Customize - Returns Object With All Log Methods.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethods_Scoped = {
  debug(...message: unknown[]): void;
  dev(...message: unknown[]): void;
  info(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};

/**
 * Tests - Toolkit - Logger - Logger Customize - Returns Object With All Log Methods When Given Empty Options.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenEmptyOptions_Scoped = {
  debug(...message: unknown[]): void;
  dev(...message: unknown[]): void;
  info(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};

/**
 * Tests - Toolkit - Logger - Logger Customize - Returns Object With All Log Methods When Given Name And Purpose.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameAndPurpose_Scoped = {
  debug(...message: unknown[]): void;
  dev(...message: unknown[]): void;
  info(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};

/**
 * Tests - Toolkit - Logger - Logger Customize - Returns Object With All Log Methods When Given Name Type And Purpose.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerCustomize_ReturnsObjectWithAllLogMethodsWhenGivenNameTypeAndPurpose_Scoped = {
  debug(...message: unknown[]): void;
  dev(...message: unknown[]): void;
  info(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};

/**
 * Tests - Toolkit - Logger - Logger Customize - Scoped Methods Do Not Throw.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerCustomize_ScopedMethodsDoNotThrow_Scoped = {
  debug(...message: unknown[]): void;
  dev(...message: unknown[]): void;
  info(...message: unknown[]): void;
  warn(...message: unknown[]): void;
  error(...message: unknown[]): void;
};

/**
 * Tests - Toolkit - Logger - Logger Level Selection - An Explicit Dev Level Is Ignored.
 *
 * @since 0.20.0
 */
export type Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Captured = string[];

export type Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitDevLevelIsIgnored_Shown = boolean;

/**
 * Tests - Toolkit - Logger - Logger Level Selection - An Explicit Level Overrides Auto.
 *
 * @since 0.20.0
 */
export type Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Captured = string[];

export type Tests_Toolkit_Logger_LoggerLevelSelection_AnExplicitLevelOverridesAuto_Shown = boolean;

/**
 * Tests - Toolkit - Logger - Logger Level Selection - Auto Behavior Applies For An Empty Log Level.
 *
 * @since 0.20.0
 */
export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Captured = string[];

export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoBehaviorAppliesForAnEmptyLogLevel_Shown = boolean;

/**
 * Tests - Toolkit - Logger - Logger Level Selection - Auto Derives Debug In Development.
 *
 * @since 0.20.0
 */
export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Captured = string[];

export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesDebugInDevelopment_Shown = boolean;

/**
 * Tests - Toolkit - Logger - Logger Level Selection - Auto Derives Info In Production.
 *
 * @since 0.20.0
 */
export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Captured = string[];

export type Tests_Toolkit_Logger_LoggerLevelSelection_AutoDerivesInfoInProduction_Shown = boolean;

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Keeps Newlines Inside String Messages.
 *
 * @since 0.48.1
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsNewlinesInsideStringMessages_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Keeps String Newlines Next To An Error Without A Tty.
 *
 * @since 0.49.0
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsStringNewlinesNextToAnErrorWithoutATty_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Keeps The Error Output Unchanged With A Tty.
 *
 * @since 0.49.0
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Error = Error;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Expected = string;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_ExpectedLines = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Lines = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_Indent = string;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_KeepsTheErrorOutputUnchangedWithATty_AlignedLines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Prints A Long Object On One Line Without A Tty.
 *
 * @since 0.48.1
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsALongObjectOnOneLineWithoutATty_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Prints An Error Nested In An Object On One Line Without A Tty.
 *
 * @since 0.49.0
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Error = Error;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Frames = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorNestedInAnObjectOnOneLineWithoutATty_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Prints An Error On One Line Without A Tty.
 *
 * @since 0.49.0
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Error = Error;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Frames = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_PrintsAnErrorOnOneLineWithoutATty_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Formatting - Wraps A Long Object Across Lines With A Tty.
 *
 * @since 0.48.1
 */
export type Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Expected = string;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_ExpectedLines = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_OriginalIsTty = unknown;

export type Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Captured = string[];

export type Tests_Toolkit_Logger_LoggerOutputFormatting_WrapsALongObjectAcrossLinesWithATty_Lines = string[];

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Accepts Multiple Arguments.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_AcceptsMultipleArguments_Message = string;

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Accepts No Arguments.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_AcceptsNoArguments_Result = void;

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Debug Does Not Throw.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_DebugDoesNotThrow_Message = string;

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Error Does Not Throw.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_ErrorDoesNotThrow_Message = string;

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Info Does Not Throw.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_InfoDoesNotThrow_Message = string;

/**
 * Tests - Toolkit - Logger - Logger Output Levels - Warn Does Not Throw.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerOutputLevels_WarnDoesNotThrow_Message = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Customize Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_CustomizeIsAFunction_CustomizeType = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Debug Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_DebugIsAFunction_DebugType = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Dev Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_DevIsAFunction_DevType = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Error Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_ErrorIsAFunction_ErrorType = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Info Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_InfoIsAFunction_InfoType = string;

/**
 * Tests - Toolkit - Logger - Logger Static Methods - Warn Is AFunction.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_Logger_LoggerStaticMethods_WarnIsAFunction_WarnType = string;
