import {
  doesNotMatch,
  fail,
  match,
  strictEqual,
} from 'node:assert/strict';
import { test } from 'node:test';

import {
  CHARACTER_DOUBLE_QUOTE,
  CHARACTER_PIPE,
  CHARACTER_SINGLE_QUOTE,
  LINEBREAK_CRLF_OR_LF,
  PATTERN_ANSI,
  PATTERN_ANSI_START,
  PATTERN_DIGITS,
  PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  PATTERN_EMAIL_SIMPLE,
  PATTERN_ERROR_PREFIX,
  PATTERN_LEADING_NEWLINES,
  PATTERN_LEADING_NON_DIGITS,
  PATTERN_LEADING_V,
  PATTERN_NAME_AT_VERSION,
  PATTERN_NOVA_PREFIX,
  PATTERN_RANGE_CAPTURE_REMAINDER,
  PATTERN_RANGE_GREATER_EQUAL_MAJOR,
  PATTERN_RANGE_MAJOR,
  PATTERN_REGISTRY_QUERY_LINE,
  PATTERN_RUSTC_VERSION_LINE,
  PATTERN_SEMVER,
  PATTERN_SLUG_SCOPED,
  PATTERN_SLUG_SIMPLE,
  PATTERN_WHITESPACE,
} from '@/lib/regex.js';

/**
 * Character patterns.
 *
 * @since 1.0.0
 */
test('character patterns', async (context) => {
  await context.test('CHARACTER_DOUBLE_QUOTE matches double quote', () => {
    match('"hello"', CHARACTER_DOUBLE_QUOTE);
  });

  await context.test('CHARACTER_DOUBLE_QUOTE does not match single quote', () => {
    doesNotMatch('\'hello\'', CHARACTER_DOUBLE_QUOTE);
  });

  await context.test('CHARACTER_PIPE matches pipe', () => {
    match('a | b', CHARACTER_PIPE);
  });

  await context.test('CHARACTER_PIPE does not match plain text', () => {
    doesNotMatch('hello', CHARACTER_PIPE);
  });

  await context.test('CHARACTER_SINGLE_QUOTE matches single quote', () => {
    match('it\'s', CHARACTER_SINGLE_QUOTE);
  });

  await context.test('CHARACTER_SINGLE_QUOTE does not match double quote', () => {
    doesNotMatch('"hello"', CHARACTER_SINGLE_QUOTE);
  });
});

/**
 * Line break pattern.
 *
 * @since 1.0.0
 */
test('LINEBREAK_CRLF_OR_LF', async (context) => {
  await context.test('matches LF', () => {
    match('line1\nline2', LINEBREAK_CRLF_OR_LF);
  });

  await context.test('matches CRLF', () => {
    match('line1\r\nline2', LINEBREAK_CRLF_OR_LF);
  });

  await context.test('does not match plain text', () => {
    doesNotMatch('no linebreak', LINEBREAK_CRLF_OR_LF);
  });
});

/**
 * ANSI patterns.
 *
 * @since 1.0.0
 */
test('ANSI patterns', async (context) => {
  await context.test('PATTERN_ANSI matches escape code', () => {
    match('\x1b[31mred\x1b[0m', PATTERN_ANSI);
  });

  await context.test('PATTERN_ANSI does not match plain text', () => {
    doesNotMatch('plain text', PATTERN_ANSI);
  });

  await context.test('PATTERN_ANSI_START matches escape at start', () => {
    match('\x1b[31mred', PATTERN_ANSI_START);
  });

  await context.test('PATTERN_ANSI_START does not match escape in middle', () => {
    doesNotMatch('text\x1b[31m', PATTERN_ANSI_START);
  });
});

/**
 * PATTERN_DIGITS.
 *
 * @since 1.0.0
 */
test('PATTERN_DIGITS', async (context) => {
  await context.test('matches digits in string', () => {
    match('abc123', PATTERN_DIGITS);
  });

  await context.test('does not match non-digit string', () => {
    doesNotMatch('abcdef', PATTERN_DIGITS);
  });
});

/**
 * PATTERN_DOUBLE_QUOTED_STRING_CAPTURE.
 *
 * @since 1.0.0
 */
test('PATTERN_DOUBLE_QUOTED_STRING_CAPTURE', async (context) => {
  await context.test('captures content between double quotes', () => {
    const matches = '"hello world"'.match(PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'hello world');
  });

  await context.test('does not match unquoted string', () => {
    doesNotMatch('hello world', PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);
  });

  await context.test('does not match single-quoted string', () => {
    doesNotMatch('\'hello world\'', PATTERN_DOUBLE_QUOTED_STRING_CAPTURE);
  });
});

/**
 * PATTERN_EMAIL_SIMPLE.
 *
 * @since 1.0.0
 */
test('PATTERN_EMAIL_SIMPLE', async (context) => {
  await context.test('matches standard email', () => {
    match('user@example.com', PATTERN_EMAIL_SIMPLE);
  });

  await context.test('matches email with subdomain', () => {
    match('user@mail.example.com', PATTERN_EMAIL_SIMPLE);
  });

  await context.test('does not match missing at sign', () => {
    doesNotMatch('userexample.com', PATTERN_EMAIL_SIMPLE);
  });

  await context.test('does not match missing domain', () => {
    doesNotMatch('user@', PATTERN_EMAIL_SIMPLE);
  });
});

/**
 * PATTERN_ERROR_PREFIX.
 *
 * @since 1.0.0
 */
test('PATTERN_ERROR_PREFIX', async (context) => {
  await context.test('matches error prefix', () => {
    match('error: something went wrong', PATTERN_ERROR_PREFIX);
  });

  await context.test('does not match warning prefix', () => {
    doesNotMatch('warning: something', PATTERN_ERROR_PREFIX);
  });
});

/**
 * PATTERN_LEADING_NEWLINES.
 *
 * @since 1.0.0
 */
test('PATTERN_LEADING_NEWLINES', async (context) => {
  await context.test('matches leading newlines', () => {
    match('\n\ncontent', PATTERN_LEADING_NEWLINES);
  });

  await context.test('does not match text without leading newlines', () => {
    doesNotMatch('content\n', PATTERN_LEADING_NEWLINES);
  });
});

/**
 * PATTERN_LEADING_NON_DIGITS.
 *
 * @since 1.0.0
 */
test('PATTERN_LEADING_NON_DIGITS', async (context) => {
  await context.test('matches leading non-digit characters', () => {
    const matches = 'abc123'.match(PATTERN_LEADING_NON_DIGITS);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[0], 'abc');
  });

  await context.test('returns empty match when string starts with digit', () => {
    const matches = '123abc'.match(PATTERN_LEADING_NON_DIGITS);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[0], '');
  });
});

/**
 * PATTERN_LEADING_V.
 *
 * @since 1.0.0
 */
test('PATTERN_LEADING_V', async (context) => {
  await context.test('matches leading v', () => {
    match('v20', PATTERN_LEADING_V);
  });

  await context.test('does not match string without leading v', () => {
    doesNotMatch('20', PATTERN_LEADING_V);
  });
});

/**
 * PATTERN_NAME_AT_VERSION.
 *
 * @since 1.0.0
 */
test('PATTERN_NAME_AT_VERSION', async (context) => {
  await context.test('matches name at version', () => {
    match('node@20', PATTERN_NAME_AT_VERSION);
  });

  await context.test('does not match scoped package', () => {
    doesNotMatch('@scope/package', PATTERN_NAME_AT_VERSION);
  });
});

/**
 * PATTERN_NOVA_PREFIX.
 *
 * @since 1.0.0
 */
test('PATTERN_NOVA_PREFIX', async (context) => {
  await context.test('matches nova prefix', () => {
    match('nova-project', PATTERN_NOVA_PREFIX);
  });

  await context.test('does not match unrelated string', () => {
    doesNotMatch('other-project', PATTERN_NOVA_PREFIX);
  });
});

/**
 * PATTERN_RANGE_CAPTURE_REMAINDER.
 *
 * @since 1.0.0
 */
test('PATTERN_RANGE_CAPTURE_REMAINDER', async (context) => {
  await context.test('captures remainder after caret prefix', () => {
    const matches = '^1.2.3'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');
  });

  await context.test('captures remainder after tilde prefix', () => {
    const matches = '~1.2.3'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');
  });

  await context.test('captures remainder after >= prefix', () => {
    const matches = '>=1.2.3'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');
  });

  await context.test('captures remainder after > prefix', () => {
    const matches = '>1.2.3'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.2.3');
  });

  await context.test('captures remainder after <= prefix', () => {
    const matches = '<=2.0.0'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');
  });

  await context.test('captures remainder after < prefix', () => {
    const matches = '<2.0.0'.match(PATTERN_RANGE_CAPTURE_REMAINDER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '2.0.0');
  });

  await context.test('does not match already-pinned version', () => {
    doesNotMatch('1.2.3', PATTERN_RANGE_CAPTURE_REMAINDER);
  });

  await context.test('does not match file protocol', () => {
    doesNotMatch('file:../local', PATTERN_RANGE_CAPTURE_REMAINDER);
  });

  await context.test('does not match wildcard', () => {
    doesNotMatch('*', PATTERN_RANGE_CAPTURE_REMAINDER);
  });

  await context.test('does not match latest', () => {
    doesNotMatch('latest', PATTERN_RANGE_CAPTURE_REMAINDER);
  });
});

/**
 * Version range patterns.
 *
 * @since 1.0.0
 */
test('version range patterns', async (context) => {
  await context.test('PATTERN_RANGE_GREATER_EQUAL_MAJOR captures major from >= range', () => {
    const matches = '>=18'.match(PATTERN_RANGE_GREATER_EQUAL_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');
  });

  await context.test('PATTERN_RANGE_GREATER_EQUAL_MAJOR does not match caret range', () => {
    doesNotMatch('^18', PATTERN_RANGE_GREATER_EQUAL_MAJOR);
  });

  await context.test('PATTERN_RANGE_MAJOR captures major from caret range', () => {
    const matches = '^20'.match(PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '20');
  });

  await context.test('PATTERN_RANGE_MAJOR captures major from tilde range', () => {
    const matches = '~18'.match(PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '18');
  });

  await context.test('PATTERN_RANGE_MAJOR captures major from bare number', () => {
    const matches = '22'.match(PATTERN_RANGE_MAJOR);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '22');
  });
});

/**
 * PATTERN_REGISTRY_QUERY_LINE.
 *
 * @since 1.0.0
 */
test('PATTERN_REGISTRY_QUERY_LINE', async (context) => {
  await context.test('matches Windows registry line', () => {
    const matches = '    ProductName    REG_SZ    Windows 10 Pro'.match(PATTERN_REGISTRY_QUERY_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], 'ProductName');
    strictEqual(matches[2], 'REG_SZ');
    strictEqual(matches[3], 'Windows 10 Pro');
  });

  await context.test('does not match empty line', () => {
    doesNotMatch('', PATTERN_REGISTRY_QUERY_LINE);
  });
});

/**
 * PATTERN_RUSTC_VERSION_LINE.
 *
 * @since 1.0.0
 */
test('PATTERN_RUSTC_VERSION_LINE', async (context) => {
  await context.test('matches rustc version output', () => {
    const matches = 'rustc 1.75.0 (82e1608df 2023-12-21)'.match(PATTERN_RUSTC_VERSION_LINE);

    if (matches === null) {
      fail('Expected regex to match');
    }

    strictEqual(matches[1], '1.75.0');
    strictEqual(matches[2], '82e1608df');
    strictEqual(matches[3], '2023-12-21');
  });

  await context.test('does not match unrelated version string', () => {
    doesNotMatch('node v20.10.0', PATTERN_RUSTC_VERSION_LINE);
  });
});

/**
 * PATTERN_SEMVER.
 *
 * @since 1.0.0
 */
test('PATTERN_SEMVER', async (context) => {
  await context.test('matches simple semver', () => {
    const matches = '1.2.3'.match(PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.2.3');
  });

  await context.test('matches semver with prerelease', () => {
    const matches = '1.0.0-beta.1'.match(PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0-beta.1');
  });

  await context.test('matches semver with build metadata', () => {
    const matches = '1.0.0+build.123'.match(PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '1.0.0+build.123');
  });

  await context.test('matches semver embedded in text', () => {
    const matches = 'version 2.5.10 released'.match(PATTERN_SEMVER);

    if (matches === null) {
      fail('Expected regex to match');
    }

    const matchGroups = matches.groups;

    if (matchGroups === undefined) {
      fail('Expected match groups');
    }

    strictEqual(matchGroups['semver'], '2.5.10');
  });

  await context.test('does not match two-part version', () => {
    doesNotMatch('1.2', PATTERN_SEMVER);
  });
});

/**
 * Slug patterns.
 *
 * @since 1.0.0
 */
test('slug patterns', async (context) => {
  await context.test('PATTERN_SLUG_SIMPLE matches simple slug', () => {
    match('my-package', PATTERN_SLUG_SIMPLE);
  });

  await context.test('PATTERN_SLUG_SIMPLE matches single word', () => {
    match('nova', PATTERN_SLUG_SIMPLE);
  });

  await context.test('PATTERN_SLUG_SIMPLE does not match uppercase', () => {
    doesNotMatch('MyPackage', PATTERN_SLUG_SIMPLE);
  });

  await context.test('PATTERN_SLUG_SIMPLE does not match scoped name', () => {
    doesNotMatch('@scope/name', PATTERN_SLUG_SIMPLE);
  });

  await context.test('PATTERN_SLUG_SCOPED matches scoped package', () => {
    match('@cbnventures/nova', PATTERN_SLUG_SCOPED);
  });

  await context.test('PATTERN_SLUG_SCOPED does not match unscoped name', () => {
    doesNotMatch('nova', PATTERN_SLUG_SCOPED);
  });

  await context.test('PATTERN_SLUG_SCOPED does not match uppercase scope', () => {
    doesNotMatch('@Scope/name', PATTERN_SLUG_SCOPED);
  });
});

/**
 * PATTERN_WHITESPACE.
 *
 * @since 1.0.0
 */
test('PATTERN_WHITESPACE', async (context) => {
  await context.test('matches spaces', () => {
    match('hello world', PATTERN_WHITESPACE);
  });

  await context.test('matches tabs', () => {
    match('hello\tworld', PATTERN_WHITESPACE);
  });

  await context.test('does not match non-whitespace string', () => {
    doesNotMatch('helloworld', PATTERN_WHITESPACE);
  });
});
