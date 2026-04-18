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
  TestsLibRegexPatternDoubleQuotedStringCaptureMatches,
  TestsLibRegexPatternLeadingNonDigitsMatches,
  TestsLibRegexPatternRangeCaptureRemainderMatches,
  TestsLibRegexPatternRegistryQueryLineMatches,
  TestsLibRegexPatternRustcVersionLineMatches,
  TestsLibRegexPatternSemverMatches,
  TestsLibRegexPatternSemverMatchGroups,
  TestsLibRegexVersionRangePatternsMatches,
} from '../../types/tests/lib/regex.test.d.ts';

/**
 * Tests - Lib - Regex - Character Patterns.
 *
 * @since 0.13.0
 */
describe('character patterns', async () => {
  it('LIB_REGEX_CHARACTER_DOUBLE_QUOTE matches double quote', () => {
    match('"hello"', LIB_REGEX_CHARACTER_DOUBLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_DOUBLE_QUOTE does not match single quote', () => {
    doesNotMatch('\'hello\'', LIB_REGEX_CHARACTER_DOUBLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_PIPE matches pipe', () => {
    match('a | b', LIB_REGEX_CHARACTER_PIPE);

    return;
  });

  it('LIB_REGEX_CHARACTER_PIPE does not match plain text', () => {
    doesNotMatch('hello', LIB_REGEX_CHARACTER_PIPE);

    return;
  });

  it('LIB_REGEX_CHARACTER_SINGLE_QUOTE matches single quote', () => {
    match('it\'s', LIB_REGEX_CHARACTER_SINGLE_QUOTE);

    return;
  });

  it('LIB_REGEX_CHARACTER_SINGLE_QUOTE does not match double quote', () => {
    doesNotMatch('"hello"', LIB_REGEX_CHARACTER_SINGLE_QUOTE);

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
    match('line1\nline2', LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    return;
  });

  it('matches CRLF', () => {
    match('line1\r\nline2', LIB_REGEX_LINEBREAK_CRLF_OR_LF);

    return;
  });

  it('does not match plain text', () => {
    doesNotMatch('no linebreak', LIB_REGEX_LINEBREAK_CRLF_OR_LF);

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
    match('\x1b[31mred\x1b[0m', LIB_REGEX_PATTERN_ANSI);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI does not match plain text', () => {
    doesNotMatch('plain text', LIB_REGEX_PATTERN_ANSI);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI_START matches escape at start', () => {
    match('\x1b[31mred', LIB_REGEX_PATTERN_ANSI_START);

    return;
  });

  it('LIB_REGEX_PATTERN_ANSI_START does not match escape in middle', () => {
    doesNotMatch('text\x1b[31m', LIB_REGEX_PATTERN_ANSI_START);

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
    match('abc123', LIB_REGEX_PATTERN_DIGITS);

    return;
  });

  it('does not match non-digit string', () => {
    doesNotMatch('abcdef', LIB_REGEX_PATTERN_DIGITS);

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
    const matches: TestsLibRegexPatternDoubleQuotedStringCaptureMatches = '"hello world"'.match(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'hello world');

    return;
  });

  it('does not match unquoted string', () => {
    doesNotMatch('hello world', LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    return;
  });

  it('does not match single-quoted string', () => {
    doesNotMatch('\'hello world\'', LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

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
    match('user@example.com', LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('matches email with subdomain', () => {
    match('user@mail.example.com', LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('does not match missing at sign', () => {
    doesNotMatch('userexample.com', LIB_REGEX_PATTERN_EMAIL_SIMPLE);

    return;
  });

  it('does not match missing domain', () => {
    doesNotMatch('user@', LIB_REGEX_PATTERN_EMAIL_SIMPLE);

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
    match('error: something went wrong', LIB_REGEX_PATTERN_ERROR_PREFIX);

    return;
  });

  it('does not match warning prefix', () => {
    doesNotMatch('warning: something', LIB_REGEX_PATTERN_ERROR_PREFIX);

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
    match('\n\ncontent', LIB_REGEX_PATTERN_LEADING_NEWLINES);

    return;
  });

  it('does not match text without leading newlines', () => {
    doesNotMatch('content\n', LIB_REGEX_PATTERN_LEADING_NEWLINES);

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
    const matches: TestsLibRegexPatternLeadingNonDigitsMatches = 'abc123'.match(LIB_REGEX_PATTERN_LEADING_NON_DIGITS);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[0], 'abc');

    return;
  });

  it('returns empty match when string starts with digit', () => {
    const matches: TestsLibRegexPatternLeadingNonDigitsMatches = '123abc'.match(LIB_REGEX_PATTERN_LEADING_NON_DIGITS);

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
    match('v20', LIB_REGEX_PATTERN_LEADING_V);

    return;
  });

  it('does not match string without leading v', () => {
    doesNotMatch('20', LIB_REGEX_PATTERN_LEADING_V);

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
    match('node@20', LIB_REGEX_PATTERN_NAME_AT_VERSION);

    return;
  });

  it('does not match scoped package', () => {
    doesNotMatch('@scope/package', LIB_REGEX_PATTERN_NAME_AT_VERSION);

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
    match('nova-project', LIB_REGEX_PATTERN_NOVA_PREFIX);

    return;
  });

  it('does not match unrelated string', () => {
    doesNotMatch('other-project', LIB_REGEX_PATTERN_NOVA_PREFIX);

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
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '^1.2.3'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after tilde prefix', () => {
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '~1.2.3'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after >= prefix', () => {
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '>=1.2.3'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after > prefix', () => {
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '>1.2.3'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');

    return;
  });

  it('captures remainder after <= prefix', () => {
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '<=2.0.0'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');

    return;
  });

  it('captures remainder after < prefix', () => {
    const matches: TestsLibRegexPatternRangeCaptureRemainderMatches = '<2.0.0'.match(LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');

    return;
  });

  it('does not match already-pinned version', () => {
    doesNotMatch('1.2.3', LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match file protocol', () => {
    doesNotMatch('file:../local', LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match wildcard', () => {
    doesNotMatch('*', LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

    return;
  });

  it('does not match latest', () => {
    doesNotMatch('latest', LIB_REGEX_PATTERN_RANGE_CAPTURE_REMAINDER);

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
    const matches: TestsLibRegexVersionRangePatternsMatches = '>=18'.match(LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR does not match caret range', () => {
    doesNotMatch('^18', LIB_REGEX_PATTERN_RANGE_GREATER_EQUAL_MAJOR);

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from caret range', () => {
    const matches: TestsLibRegexVersionRangePatternsMatches = '^20'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '20');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from tilde range', () => {
    const matches: TestsLibRegexVersionRangePatternsMatches = '~18'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');

    return;
  });

  it('LIB_REGEX_PATTERN_RANGE_MAJOR captures major from bare number', () => {
    const matches: TestsLibRegexVersionRangePatternsMatches = '22'.match(LIB_REGEX_PATTERN_RANGE_MAJOR);

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
    const matches: TestsLibRegexPatternRegistryQueryLineMatches = '    ProductName    REG_SZ    Windows 10 Pro'.match(LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'ProductName');
    strictEqual(matches[2], 'REG_SZ');
    strictEqual(matches[3], 'Windows 10 Pro');

    return;
  });

  it('does not match empty line', () => {
    doesNotMatch('', LIB_REGEX_PATTERN_REGISTRY_QUERY_LINE);

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
    const matches: TestsLibRegexPatternRustcVersionLineMatches = 'rustc 1.75.0 (82e1608df 2023-12-21)'.match(LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.75.0');
    strictEqual(matches[2], '82e1608df');
    strictEqual(matches[3], '2023-12-21');

    return;
  });

  it('does not match unrelated version string', () => {
    doesNotMatch('node v20.10.0', LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

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
    const matches: TestsLibRegexPatternSemverMatches = '1.2.3'.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: TestsLibRegexPatternSemverMatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.2.3');

    return;
  });

  it('matches semver with prerelease', () => {
    const matches: TestsLibRegexPatternSemverMatches = '1.0.0-beta.1'.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: TestsLibRegexPatternSemverMatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0-beta.1');

    return;
  });

  it('matches semver with build metadata', () => {
    const matches: TestsLibRegexPatternSemverMatches = '1.0.0+build.123'.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: TestsLibRegexPatternSemverMatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0+build.123');

    return;
  });

  it('matches semver embedded in text', () => {
    const matches: TestsLibRegexPatternSemverMatches = 'version 2.5.10 released'.match(LIB_REGEX_PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups: TestsLibRegexPatternSemverMatchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '2.5.10');

    return;
  });

  it('does not match two-part version', () => {
    doesNotMatch('1.2', LIB_REGEX_PATTERN_SEMVER);

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
    match('my-package', LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE matches single word', () => {
    match('nova', LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE does not match uppercase', () => {
    doesNotMatch('MyPackage', LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SIMPLE does not match scoped name', () => {
    doesNotMatch('@scope/name', LIB_REGEX_PATTERN_SLUG_SIMPLE);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED matches scoped package', () => {
    match('@cbnventures/nova', LIB_REGEX_PATTERN_SLUG_SCOPED);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED does not match unscoped name', () => {
    doesNotMatch('nova', LIB_REGEX_PATTERN_SLUG_SCOPED);

    return;
  });

  it('LIB_REGEX_PATTERN_SLUG_SCOPED does not match uppercase scope', () => {
    doesNotMatch('@Scope/name', LIB_REGEX_PATTERN_SLUG_SCOPED);

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
    match('hello world', LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  it('matches tabs', () => {
    match('hello\tworld', LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  it('does not match non-whitespace string', () => {
    doesNotMatch('helloworld', LIB_REGEX_PATTERN_WHITESPACE);

    return;
  });

  return;
});
