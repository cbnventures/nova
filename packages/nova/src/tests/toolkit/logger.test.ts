import { doesNotThrow, strictEqual } from 'node:assert/strict';
import { test } from 'node:test';

import { Logger } from '@/toolkit/index.js';

/**
 * Logger static methods.
 *
 * @since 1.0.0
 */
test('Logger static methods', async (context) => {
  await context.test('debug is a function', () => {
    strictEqual(typeof Logger.debug, 'function');
  });

  await context.test('dev is a function', () => {
    strictEqual(typeof Logger.dev, 'function');
  });

  await context.test('info is a function', () => {
    strictEqual(typeof Logger.info, 'function');
  });

  await context.test('warn is a function', () => {
    strictEqual(typeof Logger.warn, 'function');
  });

  await context.test('error is a function', () => {
    strictEqual(typeof Logger.error, 'function');
  });

  await context.test('customize is a function', () => {
    strictEqual(typeof Logger.customize, 'function');
  });
});

/**
 * Logger customize.
 *
 * @since 1.0.0
 */
test('Logger customize', async (context) => {
  await context.test('returns object with all log methods', () => {
    const scoped = Logger.customize({ name: 'test' });

    strictEqual(typeof scoped.debug, 'function');
    strictEqual(typeof scoped.dev, 'function');
    strictEqual(typeof scoped.info, 'function');
    strictEqual(typeof scoped.warn, 'function');
    strictEqual(typeof scoped.error, 'function');
  });

  await context.test('returns object with all log methods when given name and purpose', () => {
    const scoped = Logger.customize({
      name: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped.debug, 'function');
    strictEqual(typeof scoped.info, 'function');
  });

  await context.test('returns object with all log methods when given name, type, and purpose', () => {
    const scoped = Logger.customize({
      name: 'test',
      type: 'test',
      purpose: 'unit',
    });

    strictEqual(typeof scoped.debug, 'function');
    strictEqual(typeof scoped.error, 'function');
  });

  await context.test('returns object with all log methods when given empty options', () => {
    const scoped = Logger.customize({});

    strictEqual(typeof scoped.debug, 'function');
    strictEqual(typeof scoped.info, 'function');
    strictEqual(typeof scoped.warn, 'function');
    strictEqual(typeof scoped.error, 'function');
  });

  await context.test('scoped methods do not throw', () => {
    const scoped = Logger.customize({ name: 'test' });

    doesNotThrow(() => {
      scoped.info('test message');
    });
  });
});

/**
 * Logger output levels.
 *
 * @since 1.0.0
 */
test('Logger output levels', async (context) => {
  await context.test('info does not throw', () => {
    doesNotThrow(() => {
      Logger.info('test info message');
    });
  });

  await context.test('warn does not throw', () => {
    doesNotThrow(() => {
      Logger.warn('test warn message');
    });
  });

  await context.test('error does not throw', () => {
    doesNotThrow(() => {
      Logger.error('test error message');
    });
  });

  await context.test('debug does not throw', () => {
    doesNotThrow(() => {
      Logger.debug('test debug message');
    });
  });

  await context.test('accepts multiple arguments', () => {
    doesNotThrow(() => {
      Logger.info('message', 'arg1', 'arg2');
    });
  });

  await context.test('accepts no arguments', () => {
    doesNotThrow(() => {
      Logger.info();
    });
  });
});
