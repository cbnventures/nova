import {
  doesNotMatch,
  fail,
  match,
  strictEqual,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  LIB_REGEX_CHARACTER_DOUBLE_QUOTE,
  LIB_REGEX_CHARACTER_PIPE,
  LIB_REGEX_CHARACTER_SINGLE_QUOTE,
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_ANSI,
  LIB_REGEX_PATTERN_ANSI_START,
  LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE,
  LIB_REGEX_PATTERN_DIGITS,
  LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  LIB_REGEX_PATTERN_EMAIL_SIMPLE,
  LIB_REGEX_PATTERN_ERROR_PREFIX,
  LIB_REGEX_PATTERN_LEADING_NEWLINES,
  LIB_REGEX_PATTERN_LEADING_NON_DIGITS,
  LIB_REGEX_PATTERN_LEADING_V,
  LIB_REGEX_PATTERN_NAME_AT_VERSION,
  LIB_REGEX_PATTERN_NOVA_PREFIX,
  LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER,
  LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR,
  LIB_REGEX_PATTERN_RANGE_MAJOR,
  LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE,
  LIB_REGEX_PATTERN_RUSTC_VERSION_LINE,
  LIB_REGEX_PATTERN_SEMVER,
  LIB_REGEX_PATTERN_SLUG_SCOPED,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
  LIB_REGEX_PATTERN_WHITESPACE,
} from '../../lib/regex.js';

import type {
  Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSIDoesNotMatchPlainText_Subject,
  Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSIMatchesEscapeCode_Subject,
  Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSISTARTDoesNotMatchEscapeInMiddle_Subject,
  Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSISTARTMatchesEscapeAtStart_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERDOUBLEQUOTEDoesNotMatchSingleQuote_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERDOUBLEQUOTEMatchesDoubleQuote_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERPIPEDoesNotMatchPlainText_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERPIPEMatchesPipe_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERSINGLEQUOTEDoesNotMatchDoubleQuote_Subject,
  Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERSINGLEQUOTEMatchesSingleQuote_Subject,
  Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_DoesNotMatchPlainText_Subject,
  Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_MatchesCRLF_Subject,
  Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_MatchesLF_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchALowercaseStart_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchATrailingUnderscore_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchDoubleUnderscores_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_MatchesASinglePascalCaseChunk_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_MatchesMultiplePascalCaseChunksJoinedByUnderscores_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNDIGITS_DoesNotMatchNonDigitString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNDIGITS_MatchesDigitsInString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_CapturesContentBetweenDoubleQuotes_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_CapturesContentBetweenDoubleQuotes_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_DoesNotMatchSingleQuotedString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_DoesNotMatchUnquotedString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_DoesNotMatchMissingAtSign_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_DoesNotMatchMissingDomain_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_MatchesEmailWithSubdomain_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_MatchesStandardEmail_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNERRORPREFIX_DoesNotMatchWarningPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNERRORPREFIX_MatchesErrorPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNEWLINES_DoesNotMatchTextWithoutLeadingNewlines_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNEWLINES_MatchesLeadingNewlines_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_MatchesLeadingNonDigitCharacters_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_MatchesLeadingNonDigitCharacters_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_ReturnsEmptyMatchWhenStringStartsWithDigit_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_ReturnsEmptyMatchWhenStringStartsWithDigit_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGV_DoesNotMatchStringWithoutLeadingV_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNLEADINGV_MatchesLeadingV_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNNAMEATVERSION_DoesNotMatchScopedPackage_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNNAMEATVERSION_MatchesNameAtVersion_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNNOVAPREFIX_DoesNotMatchUnrelatedString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNNOVAPREFIX_MatchesNovaPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterCaretPrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterCaretPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterEqualPrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterEqualPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterThanPrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterThanPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessEqualPrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessEqualPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessThanPrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessThanPrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterTildePrefix_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterTildePrefix_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchAlreadyPinnedVersion_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchFileProtocol_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchLatest_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchWildcard_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_DoesNotMatchEmptyLine_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_MatchesWindowsRegistryLine_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_MatchesWindowsRegistryLine_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_DoesNotMatchUnrelatedVersionString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_MatchesRustcVersionOutput_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_MatchesRustcVersionOutput_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_DoesNotMatchTwoPartVersion_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_MatchGroups,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_MatchGroups,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_MatchGroups,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_Matches,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_MatchGroups,
  Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_DoesNotMatchNonWhitespaceString_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_MatchesSpaces_Subject,
  Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_MatchesTabs_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDDoesNotMatchUnscopedName_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDDoesNotMatchUppercaseScope_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDMatchesScopedPackage_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEDoesNotMatchScopedName_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEDoesNotMatchUppercase_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEMatchesSimpleSlug_Subject,
  Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEMatchesSingleWord_Subject,
  Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEGREATEREQUALMAJORCapturesMajorFromRange_Matches,
  Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEGREATEREQUALMAJORDoesNotMatchCaretRange_Subject,
  Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromBareNumber_Matches,
  Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromCaretRange_Matches,
  Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromTildeRange_Matches,
} from '../../types/tests/lib/regex.test.d.ts';

/**
 * Tests - Lib - Regex - Character Patterns.
 *
 * @since 0.13.0
 */
describe('character patterns', async () => {
  it('LIB_REGEX_CHARACTER_DOUBLE_QUOTE matches double quote', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERDOUBLEQUOTEMatchesDoubleQuote_Subject = '"hello"';

    match(subject, LIB_REGEX_CHARACTER_DOUBLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_DOUBLE_QUOTE does not match single quote', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERDOUBLEQUOTEDoesNotMatchSingleQuote_Subject = '\'hello\'';

    doesNotMatch(subject, LIB_REGEX_CHARACTER_DOUBLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_PIPE matches pipe', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERPIPEMatchesPipe_Subject = 'a | b';

    match(subject, LIB_REGEX_CHARACTER_PIPE);

    return;
  });

  it('LIB_REGEX_CHARACTER_PIPE does not match plain text', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERPIPEDoesNotMatchPlainText_Subject = 'hello';

    doesNotMatch(subject, LIB_REGEX_CHARACTER_PIPE);

    return;
  });

  it('LIB_REGEX_CHARACTER_SINGLE_QUOTE matches single quote', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERSINGLEQUOTEMatchesSingleQuote_Subject = 'it\'s';

    match(subject, LIB_REGEX_CHARACTER_SINGLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_SINGLE_QUOTE does not match double quote', () => {
    const subject: Tests_Lib_Regex_CharacterPatterns_LIBREGEXCHARACTERSINGLEQUOTEDoesNotMatchDoubleQuote_Subject = '"hello"';

    doesNotMatch(subject, LIB_REGEX_CHARACTER_SINGLE_QUOTE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Linebreak CRLF Or LF.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_LINEBREAK_CRLF_OR_LF', async () => {
  it('matches LF', () => {
    const subject: Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_MatchesLF_Subject = 'line1\nline2';

    match(subject, LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    return;
  });

  it('matches CRLF', () => {
    const subject: Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_MatchesCRLF_Subject = 'line1\r\nline2';

    match(subject, LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    return;
  });

  it('does not match plain text', () => {
    const subject: Tests_Lib_Regex_LIBREGEXLINEBREAKCRLFORLF_DoesNotMatchPlainText_Subject = 'no linebreak';

    doesNotMatch(subject, LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - ANSI Patterns.
 *
 * @since 0.13.0
 */
describe('ANSI patterns', async () => {
  it('LIB_REGEX_PATTERN_ANSI matches escape code', () => {
    const subject: Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSIMatchesEscapeCode_Subject = '\x1b[31mred\x1b[0m';

    match(subject, LIB_REGEX_PATTERN_ANSI);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI does not match plain text', () => {
    const subject: Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSIDoesNotMatchPlainText_Subject = 'plain text';

    doesNotMatch(subject, LIB_REGEX_PATTERN_ANSI);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI_START matches escape at start', () => {
    const subject: Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSISTARTMatchesEscapeAtStart_Subject = '\x1b[31mred';

    match(subject, LIB_REGEX_PATTERN_ANSI_START);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI_START does not match escape in middle', () => {
    const subject: Tests_Lib_Regex_ANSIPatterns_LIBREGEXPATTERNANSISTARTDoesNotMatchEscapeInMiddle_Subject = 'text\x1b[31m';

    doesNotMatch(subject, LIB_REGEX_PATTERN_ANSI_START);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Casing Underscore Pascal Case.
 *
 * @since 0.18.0
 */
describe('LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE', async () => {
  it('matches a single PascalCase chunk', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_MatchesASinglePascalCaseChunk_Subject = 'Foo';

    match(subject, LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE);

    return;
  });

  it('matches multiple PascalCase chunks joined by underscores', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_MatchesMultiplePascalCaseChunksJoinedByUnderscores_Subject = 'Tests_TypeDeclarations_Foo_Bar';

    match(subject, LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE);

    return;
  });

  it('does not match a lowercase start', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchALowercaseStart_Subject = 'foo_Bar';

    doesNotMatch(subject, LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE);

    return;
  });

  it('does not match double underscores', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchDoubleUnderscores_Subject = 'Foo__Bar';

    doesNotMatch(subject, LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE);

    return;
  });

  it('does not match a trailing underscore', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNCASINGUNDERSCOREPASCALCASE_DoesNotMatchATrailingUnderscore_Subject = 'Foo_';

    doesNotMatch(subject, LIB_REGEX_PATTERN_CASING_UNDERSCORE_PASCAL_CASE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Digits.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_DIGITS', async () => {
  it('matches digits in string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNDIGITS_MatchesDigitsInString_Subject = 'abc123';

    match(subject, LIB_REGEX_PATTERN_DIGITS);

    return;
  });

  it('does not match non-digit string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNDIGITS_DoesNotMatchNonDigitString_Subject = 'abcdef';

    doesNotMatch(subject, LIB_REGEX_PATTERN_DIGITS);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Double Quoted String Capture.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE', async () => {
  it('captures content between double quotes', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_CapturesContentBetweenDoubleQuotes_Subject = '"hello world"';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_CapturesContentBetweenDoubleQuotes_Matches = subject.match(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'hello world');

    return;
  });

  it('does not match unquoted string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_DoesNotMatchUnquotedString_Subject = 'hello world';

    doesNotMatch(subject, LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    return;
  });

  it('does not match single-quoted string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNDOUBLEQUOTEDSTRINGCAPTURE_DoesNotMatchSingleQuotedString_Subject = '\'hello world\'';

    doesNotMatch(subject, LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Email Simple.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_EMAIL_SIMPLE', async () => {
  it('matches standard email', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_MatchesStandardEmail_Subject = 'user@example.com';

    match(subject, LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('matches email with subdomain', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_MatchesEmailWithSubdomain_Subject = 'user@mail.example.com';

    match(subject, LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('does not match missing at sign', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_DoesNotMatchMissingAtSign_Subject = 'userexample.com';

    doesNotMatch(subject, LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('does not match missing domain', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNEMAILSIMPLE_DoesNotMatchMissingDomain_Subject = 'user@';

    doesNotMatch(subject, LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Error Prefix.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_ERROR_PREFIX', async () => {
  it('matches error prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNERRORPREFIX_MatchesErrorPrefix_Subject = 'error: something went wrong';

    match(subject, LIB_REGEX_PATTERN_ERROR_PREFIX);

    return;
  });

  it('does not match warning prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNERRORPREFIX_DoesNotMatchWarningPrefix_Subject = 'warning: something';

    doesNotMatch(subject, LIB_REGEX_PATTERN_ERROR_PREFIX);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Leading Newlines.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_LEADING_NEWLINES', async () => {
  it('matches leading newlines', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNEWLINES_MatchesLeadingNewlines_Subject = '\n\ncontent';

    match(subject, LIB_REGEX_PATTERN_LEADING_NEWLINES);

    return;
  });

  it('does not match text without leading newlines', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNEWLINES_DoesNotMatchTextWithoutLeadingNewlines_Subject = 'content\n';

    doesNotMatch(subject, LIB_REGEX_PATTERN_LEADING_NEWLINES);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Leading Non Digits.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_LEADING_NON_DIGITS', async () => {
  it('matches leading non-digit characters', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_MatchesLeadingNonDigitCharacters_Subject = 'abc123';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_MatchesLeadingNonDigitCharacters_Matches = subject.match(LIB_REGEX_PATTERN_LEADING_NON_DIGITS);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[0], 'abc');

    return;
  });

  it('returns empty match when string starts with digit', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_ReturnsEmptyMatchWhenStringStartsWithDigit_Subject = '123abc';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGNONDIGITS_ReturnsEmptyMatchWhenStringStartsWithDigit_Matches = subject.match(LIB_REGEX_PATTERN_LEADING_NON_DIGITS);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[0], '');

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Leading V.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_LEADING_V', async () => {
  it('matches leading v', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGV_MatchesLeadingV_Subject = 'v20';

    match(subject, LIB_REGEX_PATTERN_LEADING_V);

    return;
  });

  it('does not match string without leading v', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNLEADINGV_DoesNotMatchStringWithoutLeadingV_Subject = '20';

    doesNotMatch(subject, LIB_REGEX_PATTERN_LEADING_V);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Name At Version.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_NAME_AT_VERSION', async () => {
  it('matches name at version', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNNAMEATVERSION_MatchesNameAtVersion_Subject = 'node@20';

    match(subject, LIB_REGEX_PATTERN_NAME_AT_VERSION);

    return;
  });

  it('does not match scoped package', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNNAMEATVERSION_DoesNotMatchScopedPackage_Subject = '@scope/package';

    doesNotMatch(subject, LIB_REGEX_PATTERN_NAME_AT_VERSION);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Nova Prefix.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_NOVA_PREFIX', async () => {
  it('matches nova prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNNOVAPREFIX_MatchesNovaPrefix_Subject = 'nova-project';

    match(subject, LIB_REGEX_PATTERN_NOVA_PREFIX);

    return;
  });

  it('does not match unrelated string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNNOVAPREFIX_DoesNotMatchUnrelatedString_Subject = 'other-project';

    doesNotMatch(subject, LIB_REGEX_PATTERN_NOVA_PREFIX);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Range Capture Remainder.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER', async () => {
  it('captures remainder after caret prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterCaretPrefix_Subject = '^1.2.3';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterCaretPrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after tilde prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterTildePrefix_Subject = '~1.2.3';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterTildePrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after greater-equal prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterEqualPrefix_Subject = '>=1.2.3';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterEqualPrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after greater-than prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterThanPrefix_Subject = '>1.2.3';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterGreaterThanPrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after less-equal prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessEqualPrefix_Subject = '<=2.0.0';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessEqualPrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');

    return;
  });

  it('captures remainder after less-than prefix', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessThanPrefix_Subject = '<2.0.0';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_CapturesRemainderAfterLessThanPrefix_Matches = subject.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');

    return;
  });

  it('does not match already-pinned version', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchAlreadyPinnedVersion_Subject = '1.2.3';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match file protocol', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchFileProtocol_Subject = 'file:../local';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match wildcard', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchWildcard_Subject = '*';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match latest', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRANGECAPTUREREMAINDER_DoesNotMatchLatest_Subject = 'latest';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Version Range Patterns.
 *
 * @since 0.13.0
 */
describe('version range patterns', async () => {
  it('LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR captures major from >= range', () => {
    const matches: Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEGREATEREQUALMAJORCapturesMajorFromRange_Matches = '>=18'.match(LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR does not match caret range', () => {
    const subject: Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEGREATEREQUALMAJORDoesNotMatchCaretRange_Subject = '^18';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from caret range', () => {
    const matches: Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromCaretRange_Matches = '^20'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '20');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from tilde range', () => {
    const matches: Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromTildeRange_Matches = '~18'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from bare number', () => {
    const matches: Tests_Lib_Regex_VersionRangePatterns_LIBREGEXPATTERNRANGEMAJORCapturesMajorFromBareNumber_Matches = '22'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '22');

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Registry Query Line.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE', async () => {
  it('matches Windows registry line', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_MatchesWindowsRegistryLine_Subject = '    ProductName    REG_SZ    Windows 10 Pro';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_MatchesWindowsRegistryLine_Matches = subject.match(LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'ProductName');
    strictEqual(matches[2], 'REG_SZ');
    strictEqual(matches[3], 'Windows 10 Pro');

    return;
  });

  it('does not match empty line', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNREGISTRYQUERYLINE_DoesNotMatchEmptyLine_Subject = '';

    doesNotMatch(subject, LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Rustc Version Line.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_RUSTC_VERSION_LINE', async () => {
  it('matches rustc version output', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_MatchesRustcVersionOutput_Subject = 'rustc 1.75.0 (82e1608df 2023-12-21)';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_MatchesRustcVersionOutput_Matches = subject.match(LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.75.0');
    strictEqual(matches[2], '82e1608df');
    strictEqual(matches[3], '2023-12-21');

    return;
  });

  it('does not match unrelated version string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNRUSTCVERSIONLINE_DoesNotMatchUnrelatedVersionString_Subject = 'node v20.10.0';

    doesNotMatch(subject, LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Semver.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_SEMVER', async () => {
  it('matches simple semver', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_Subject = '1.2.3';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_Matches = subject.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSimpleSemver_MatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.2.3');

    return;
  });

  it('matches semver with prerelease', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_Subject = '1.0.0-beta.1';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_Matches = subject.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithPrerelease_MatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0-beta.1');

    return;
  });

  it('matches semver with build metadata', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_Subject = '1.0.0+build.123';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_Matches = subject.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverWithBuildMetadata_MatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0+build.123');

    return;
  });

  it('matches semver embedded in text', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_Subject = 'version 2.5.10 released';
    const matches: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_Matches = subject.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_MatchesSemverEmbeddedInText_MatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '2.5.10');

    return;
  });

  it('does not match two-part version', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNSEMVER_DoesNotMatchTwoPartVersion_Subject = '1.2';

    doesNotMatch(subject, LIB_REGEX_PATTERN_SEMVER);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Slug Patterns.
 *
 * @since 0.13.0
 */
describe('slug patterns', async () => {
  it('LIB_REGEX_PATTERN_SLUG_SIMPLE matches simple slug', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEMatchesSimpleSlug_Subject = 'my-package';

    match(subject, LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE matches single word', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEMatchesSingleWord_Subject = 'nova';

    match(subject, LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE does not match uppercase', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEDoesNotMatchUppercase_Subject = 'MyPackage';

    doesNotMatch(subject, LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE does not match scoped name', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSIMPLEDoesNotMatchScopedName_Subject = '@scope/name';

    doesNotMatch(subject, LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED matches scoped package', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDMatchesScopedPackage_Subject = '@cbnventures/nova';

    match(subject, LIB_REGEX_PATTERN_SLUG_SCOPED);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED does not match unscoped name', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDDoesNotMatchUnscopedName_Subject = 'nova';

    doesNotMatch(subject, LIB_REGEX_PATTERN_SLUG_SCOPED);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED does not match uppercase scope', () => {
    const subject: Tests_Lib_Regex_SlugPatterns_LIBREGEXPATTERNSLUGSCOPEDDoesNotMatchUppercaseScope_Subject = '@Scope/name';

    doesNotMatch(subject, LIB_REGEX_PATTERN_SLUG_SCOPED);

    return;
  });

  return;
});

/**
 * Tests - Lib - Regex - Pattern Whitespace.
 *
 * @since 0.13.0
 */
describe('LIB_REGEX_PATTERN_WHITESPACE', async () => {
  it('matches spaces', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_MatchesSpaces_Subject = 'hello world';

    match(subject, LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  it('matches tabs', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_MatchesTabs_Subject = 'hello\tworld';

    match(subject, LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  it('does not match non-whitespace string', () => {
    const subject: Tests_Lib_Regex_LIBREGEXPATTERNWHITESPACE_DoesNotMatchNonWhitespaceString_Subject = 'helloworld';

    doesNotMatch(subject, LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  return;
});
