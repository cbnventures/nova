import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as LibCorepack } from '../../lib/corepack.js';

/**
 * Tests - Lib - Corepack - Parse Package Manager.
 *
 * Verifies that Nova accepts only exact descriptors for the three package
 * managers Corepack supports and rejects every unsupported shape.
 *
 * @since 0.26.0
 */
describe('LibCorepack.parsePackageManager', () => {
  it('parses npm', () => {
    deepStrictEqual(LibCorepack.parsePackageManager('npm@11.18.0'), {
      name: 'npm',
      version: '11.18.0',
      value: 'npm@11.18.0',
    });

    return;
  });

  it('parses pnpm', () => {
    deepStrictEqual(LibCorepack.parsePackageManager('pnpm@10.17.1'), {
      name: 'pnpm',
      version: '10.17.1',
      value: 'pnpm@10.17.1',
    });

    return;
  });

  it('parses Yarn with a Corepack integrity hash', () => {
    deepStrictEqual(LibCorepack.parsePackageManager('yarn@4.9.4+sha512.abcdef'), {
      name: 'yarn',
      version: '4.9.4+sha512.abcdef',
      value: 'yarn@4.9.4+sha512.abcdef',
    });

    return;
  });

  it('rejects Bun', () => {
    strictEqual(LibCorepack.parsePackageManager('bun@1.2.22'), undefined);

    return;
  });

  it('rejects a partial version', () => {
    strictEqual(LibCorepack.parsePackageManager('npm@11'), undefined);

    return;
  });

  it('rejects a version range', () => {
    strictEqual(LibCorepack.parsePackageManager('pnpm@^10.0.0'), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Corepack - Resolve Spawn Invocation.
 *
 * @since 0.32.0
 */
describe('LibCorepack.resolveSpawnInvocation', () => {
  it('keeps POSIX commands direct', () => {
    deepStrictEqual(LibCorepack.resolveSpawnInvocation('npm', [
      'run',
      'check:test',
    ], 'linux', '/usr/local/bin/node'), {
      command: 'npm',
      commandArguments: [
        'run',
        'check:test',
      ],
    });

    return;
  });

  it('runs Windows npm through its JavaScript entry point', () => {
    deepStrictEqual(LibCorepack.resolveSpawnInvocation('npm', [
      'run',
      'check:test',
      '--',
      'space value',
      'a&b',
    ], 'win32', 'C:/node/node.exe'), {
      command: 'C:/node/node.exe',
      commandArguments: [
        [
          'C:',
          'node',
          'node_modules',
          'npm',
          'bin',
          'npm-cli.js',
        ].join('\\'),
        'run',
        'check:test',
        '--',
        'space value',
        'a&b',
      ],
    });

    return;
  });

  it('runs Windows Corepack through its JavaScript entry point', () => {
    deepStrictEqual(LibCorepack.resolveSpawnInvocation('corepack', [
      'pnpm',
      'install',
    ], 'win32', 'C:/node/node.exe'), {
      command: 'C:/node/node.exe',
      commandArguments: [
        [
          'C:',
          'node',
          'node_modules',
          'corepack',
          'dist',
          'corepack.js',
        ].join('\\'),
        'pnpm',
        'install',
      ],
    });

    return;
  });

  return;
});
