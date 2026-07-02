/**
 * Lib - Dotenv - Classify Env Value.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_ClassifyEnvValue_Key = string;

export type Lib_Dotenv_ClassifyEnvValue_Value = string;

export type Lib_Dotenv_ClassifyEnvValue_Returns = string | null;

export type Lib_Dotenv_ClassifyEnvValue_Trimmed = string;

export type Lib_Dotenv_ClassifyEnvValue_FirstChar = string;

/**
 * Lib - Dotenv - Find Env Quote Violations.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_FindEnvQuoteViolations_Content = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Returns = Lib_Dotenv_FindEnvQuoteViolations_Violations;

export type Lib_Dotenv_FindEnvQuoteViolations_ViolationKey = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ViolationReason = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Violation = {
  key: Lib_Dotenv_FindEnvQuoteViolations_ViolationKey;
  reason: Lib_Dotenv_FindEnvQuoteViolations_ViolationReason;
};

export type Lib_Dotenv_FindEnvQuoteViolations_Violations = Lib_Dotenv_FindEnvQuoteViolations_Violation[];

export type Lib_Dotenv_FindEnvQuoteViolations_Lines = string[];

export type Lib_Dotenv_FindEnvQuoteViolations_Cursor = number;

export type Lib_Dotenv_FindEnvQuoteViolations_Line = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Lead = string;

export type Lib_Dotenv_FindEnvQuoteViolations_KeyMatch = RegExpMatchArray | null;

export type Lib_Dotenv_FindEnvQuoteViolations_Key = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ValueLine = string;

export type Lib_Dotenv_FindEnvQuoteViolations_ValueLines = Lib_Dotenv_FindEnvQuoteViolations_ValueLine[];

export type Lib_Dotenv_FindEnvQuoteViolations_Value = string;

export type Lib_Dotenv_FindEnvQuoteViolations_Reason = string | null;

/**
 * Lib - Dotenv - Has Unclosed Double Quote.
 *
 * @since 0.20.0
 */
export type Lib_Dotenv_HasUnclosedDoubleQuote_Text = string;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Returns = boolean;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Open = boolean;

export type Lib_Dotenv_HasUnclosedDoubleQuote_Escaped = boolean;
