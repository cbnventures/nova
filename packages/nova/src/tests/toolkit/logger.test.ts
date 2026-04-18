import { doesNotThrow, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Logger } from '../../toolkit/index.js';

import type { TestsToolkitLoggerLoggerCustomizeScoped } from '../../types/tests/toolkit/logger.test.d.ts';

/**
 * Tests - Toolkit - Logger - Logger Static Methods.
 *
 * @since 0.13.0
 */
describe('Logger static methods', async () => {
  it('debug is a function', () => {
    strictEqual(typeof Logger['debug'], 'function');

    return;
  });

  it('dev is a function', () => {
    strictEqual(typeof Logger['dev'], 'function');

    return;
  });

  it('info is a function', () => {
    strictEqual(typeof Logger['info'], 'function');

    return;
  });

  it('warn is a function', () => {
    strictEqual(typeof Logger['warn'], 'function');

    return;
  });

  it('error is a function', () => {
    strictEqual(typeof Logger['error'], 'function');

    return;
  });

  it('customize is a function', () => {
    strictEqual(typeof Logger['customize'], 'function');

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
    const scoped: TestsToolkitLoggerLoggerCustomizeScoped = Logger.customize({ name: 'test' });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['dev'], 'function');
    strictEqual(typeof scoped['info'], 'function');
    strictEqual(typeof scoped['warn'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('returns object with all log methods when given name and purpose', () => {
    const scoped: TestsToolkitLoggerLoggerCustomizeScoped = Logger.customize({
      name: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['info'], 'function');

    return;
  });

  it('returns object with all log methods when given name, type, and purpose', () => {
    const scoped: TestsToolkitLoggerLoggerCustomizeScoped = Logger.customize({
      name: 'test',
      type: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('returns object with all log methods when given empty options', () => {
    const scoped: TestsToolkitLoggerLoggerCustomizeScoped = Logger.customize({});

    strictEqual(typeof scoped['debug'], 'function');
    strictEqual(typeof scoped['info'], 'function');
    strictEqual(typeof scoped['warn'], 'function');
    strictEqual(typeof scoped['error'], 'function');

    return;
  });

  it('scoped methods do not throw', () => {
    const scoped: TestsToolkitLoggerLoggerCustomizeScoped = Logger.customize({ name: 'test' });

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
    doesNotThrow(() => {
      Logger.info('test info message');

      return;
    });

    return;
  });

  it('warn does not throw', () => {
    doesNotThrow(() => {
      Logger.warn('test warn message');

      return;
    });

    return;
  });

  it('error does not throw', () => {
    doesNotThrow(() => {
      Logger.error('test error message');

      return;
    });

    return;
  });

  it('debug does not throw', () => {
    doesNotThrow(() => {
      Logger.debug('test debug message');

      return;
    });

    return;
  });

  it('accepts multiple arguments', () => {
    doesNotThrow(() => {
      Logger.info('message', 'arg1', 'arg2');

      return;
    });

    return;
  });

  it('accepts no arguments', () => {
    doesNotThrow(() => {
      Logger.info();

      return;
    });

    return;
  });

  return;
});
