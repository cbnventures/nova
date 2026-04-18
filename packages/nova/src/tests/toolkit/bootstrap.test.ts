import { doesNotThrow, ok, strictEqual } from 'node:assert/strict';
import {
  existsSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach, beforeEach, describe, it,
} from 'vitest';

import { Bootstrap } from '../../toolkit/index.js';

import type {
  TestsToolkitBootstrapGetCacheDirDirectoryExists,
  TestsToolkitBootstrapGetCacheDirIncludesAppName,
  TestsToolkitBootstrapGetCacheDirResult,
  TestsToolkitBootstrapGetConfigDirDirectoryExists,
  TestsToolkitBootstrapGetConfigDirIncludesAppName,
  TestsToolkitBootstrapGetConfigDirOriginalXdgConfigHome,
  TestsToolkitBootstrapGetConfigDirResult,
  TestsToolkitBootstrapGetConfigDirSandboxDir,
  TestsToolkitBootstrapGetConfigDirTempDirPath,
  TestsToolkitBootstrapGetConfigDirTmpDir,
  TestsToolkitBootstrapGetDataDirDirectoryExists,
  TestsToolkitBootstrapGetDataDirIncludesAppName,
  TestsToolkitBootstrapGetDataDirResult,
  TestsToolkitBootstrapGetProjectRootPackageJsonExists,
  TestsToolkitBootstrapGetProjectRootPackageJsonPath,
  TestsToolkitBootstrapGetProjectRootResult,
  TestsToolkitBootstrapLoadEnvEnvContent,
  TestsToolkitBootstrapLoadEnvEnvFilePath,
  TestsToolkitBootstrapLoadEnvOriginalValue,
  TestsToolkitBootstrapLoadEnvTempDir,
  TestsToolkitBootstrapLoadEnvTempDirPath,
  TestsToolkitBootstrapLoadEnvTmpDir,
  TestsToolkitBootstrapResolveFileDirFilePath,
  TestsToolkitBootstrapResolveFileDirResult,
  TestsToolkitBootstrapResolveFileDirsFilePath,
  TestsToolkitBootstrapResolveFileDirsFilePath2,
  TestsToolkitBootstrapResolveFileDirsIncludesFirst,
  TestsToolkitBootstrapResolveFileDirsIncludesSecond,
  TestsToolkitBootstrapResolveFileDirsResult,
  TestsToolkitBootstrapResolveFileDirsTempDir,
  TestsToolkitBootstrapResolveFileDirsTempDir2,
  TestsToolkitBootstrapResolveFileDirsTempDir2Path,
  TestsToolkitBootstrapResolveFileDirsTempDirPath,
  TestsToolkitBootstrapResolveFileDirsTmpDir,
  TestsToolkitBootstrapResolveFileDirTempDir,
  TestsToolkitBootstrapResolveFileDirTempDirPath,
  TestsToolkitBootstrapResolveFileDirTmpDir,
} from '../../types/tests/toolkit/bootstrap.test.d.ts';

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetConfigDir.
 *
 * @since 0.14.0
 */
describe('Bootstrap getConfigDir', async () => {
  let sandboxDir: TestsToolkitBootstrapGetConfigDirSandboxDir = undefined;
  let originalXdgConfigHome: TestsToolkitBootstrapGetConfigDirOriginalXdgConfigHome = undefined;

  beforeEach(() => {
    const tempTmpDir: TestsToolkitBootstrapGetConfigDirTmpDir = tmpdir();
    const tempDirPath: TestsToolkitBootstrapGetConfigDirTempDirPath = join(tempTmpDir, 'nova-bootstrap-config-');

    sandboxDir = mkdtempSync(tempDirPath);
    originalXdgConfigHome = process.env['XDG_CONFIG_HOME'];

    Reflect.set(process.env, 'XDG_CONFIG_HOME', sandboxDir);

    return;
  });

  afterEach(() => {
    if (originalXdgConfigHome !== undefined) {
      Reflect.set(process.env, 'XDG_CONFIG_HOME', originalXdgConfigHome);
    } else {
      Reflect.deleteProperty(process.env, 'XDG_CONFIG_HOME');
    }

    rmSync(sandboxDir!, {
      recursive: true, force: true,
    });

    return;
  });

  it('result includes app name', () => {
    const result: TestsToolkitBootstrapGetConfigDirResult = Bootstrap.getConfigDir('nova-test-app');
    const includesAppName: TestsToolkitBootstrapGetConfigDirIncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: TestsToolkitBootstrapGetConfigDirResult = Bootstrap.getConfigDir('nova-test-app');
    const directoryExists: TestsToolkitBootstrapGetConfigDirDirectoryExists = existsSync(result);

    ok(directoryExists);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetDataDir.
 *
 * @since 0.14.0
 */
describe('Bootstrap getDataDir', async () => {
  it('result includes app name', () => {
    const result: TestsToolkitBootstrapGetDataDirResult = Bootstrap.getDataDir('nova-test-app');
    const includesAppName: TestsToolkitBootstrapGetDataDirIncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: TestsToolkitBootstrapGetDataDirResult = Bootstrap.getDataDir('nova-test-app');
    const directoryExists: TestsToolkitBootstrapGetDataDirDirectoryExists = existsSync(result);

    ok(directoryExists);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetCacheDir.
 *
 * @since 0.14.0
 */
describe('Bootstrap getCacheDir', async () => {
  it('result includes app name', () => {
    const result: TestsToolkitBootstrapGetCacheDirResult = Bootstrap.getCacheDir('nova-test-app');
    const includesAppName: TestsToolkitBootstrapGetCacheDirIncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: TestsToolkitBootstrapGetCacheDirResult = Bootstrap.getCacheDir('nova-test-app');
    const directoryExists: TestsToolkitBootstrapGetCacheDirDirectoryExists = existsSync(result);

    ok(directoryExists);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetProjectRoot.
 *
 * @since 0.14.0
 */
describe('Bootstrap getProjectRoot', async () => {
  it('returns a string when run from a directory with package.json', () => {
    const result: TestsToolkitBootstrapGetProjectRootResult = Bootstrap.getProjectRoot();

    strictEqual(typeof result, 'string');

    return;
  });

  it('result contains package.json', () => {
    const result: TestsToolkitBootstrapGetProjectRootResult = Bootstrap.getProjectRoot();
    const packageJsonPath: TestsToolkitBootstrapGetProjectRootPackageJsonPath = join(result!, 'package.json');
    const packageJsonExists: TestsToolkitBootstrapGetProjectRootPackageJsonExists = existsSync(packageJsonPath);

    ok(packageJsonExists);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDir.
 *
 * @since 0.14.0
 */
describe('Bootstrap resolveFileDir', async () => {
  let tempDir: TestsToolkitBootstrapResolveFileDirTempDir = undefined;

  beforeEach(() => {
    const tempTmpDir: TestsToolkitBootstrapResolveFileDirTmpDir = tmpdir();
    const tempDirPath: TestsToolkitBootstrapResolveFileDirTempDirPath = join(tempTmpDir, 'nova-bootstrap-test-');

    tempDir = mkdtempSync(tempDirPath);

    return;
  });

  afterEach(() => {
    rmSync(tempDir!, {
      recursive: true, force: true,
    });

    return;
  });

  it('finds file at absolute path', () => {
    const filePath: TestsToolkitBootstrapResolveFileDirFilePath = join(tempDir!, 'config.json');

    writeFileSync(filePath, '{}');

    const result: TestsToolkitBootstrapResolveFileDirResult = Bootstrap.resolveFileDir('nova-test-app', 'config.json', [tempDir!]);

    strictEqual(result, tempDir!);

    return;
  });

  it('returns undefined when not found', () => {
    const result: TestsToolkitBootstrapResolveFileDirResult = Bootstrap.resolveFileDir('nova-test-app', 'missing.json', [tempDir!]);

    strictEqual(result, undefined);

    return;
  });

  it('respects search order', () => {
    const filePath: TestsToolkitBootstrapResolveFileDirFilePath = join(tempDir!, 'config.json');

    writeFileSync(filePath, '{}');

    const result: TestsToolkitBootstrapResolveFileDirResult = Bootstrap.resolveFileDir('nova-test-app', 'config.json', [
      '/nonexistent-path',
      tempDir!,
    ]);

    strictEqual(result, tempDir!);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap ResolveFileDirs.
 *
 * @since 0.14.0
 */
describe('Bootstrap resolveFileDirs', async () => {
  let tempDir: TestsToolkitBootstrapResolveFileDirsTempDir = '';
  let tempDir2: TestsToolkitBootstrapResolveFileDirsTempDir2 = '';

  beforeEach(() => {
    const tempTmpDir: TestsToolkitBootstrapResolveFileDirsTmpDir = tmpdir();
    const tempDirPath: TestsToolkitBootstrapResolveFileDirsTempDirPath = join(tempTmpDir, 'nova-bootstrap-test-');
    const tempDir2Path: TestsToolkitBootstrapResolveFileDirsTempDir2Path = join(tempTmpDir, 'nova-bootstrap-test2-');

    tempDir = mkdtempSync(tempDirPath);
    tempDir2 = mkdtempSync(tempDir2Path);

    return;
  });

  afterEach(() => {
    rmSync(tempDir!, {
      recursive: true, force: true,
    });
    rmSync(tempDir2!, {
      recursive: true, force: true,
    });

    return;
  });

  it('returns all matching dirs', () => {
    const filePath: TestsToolkitBootstrapResolveFileDirsFilePath = join(tempDir!, 'config.json');
    const filePath2: TestsToolkitBootstrapResolveFileDirsFilePath2 = join(tempDir2!, 'config.json');

    writeFileSync(filePath, '{}');
    writeFileSync(filePath2, '{}');

    const result: TestsToolkitBootstrapResolveFileDirsResult = Bootstrap.resolveFileDirs('nova-test-app', 'config.json', [
      tempDir!,
      tempDir2!,
    ]);
    const includesFirst: TestsToolkitBootstrapResolveFileDirsIncludesFirst = result.includes(tempDir!);
    const includesSecond: TestsToolkitBootstrapResolveFileDirsIncludesSecond = result.includes(tempDir2!);

    strictEqual(result.length, 2);
    ok(includesFirst);
    ok(includesSecond);

    return;
  });

  it('returns empty array when none found', () => {
    const result: TestsToolkitBootstrapResolveFileDirsResult = Bootstrap.resolveFileDirs('nova-test-app', 'missing.json', [
      tempDir!,
      tempDir2!,
    ]);

    strictEqual(result.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Bootstrap - Bootstrap LoadEnv.
 *
 * @since 0.14.0
 */
describe('Bootstrap loadEnv', async () => {
  let tempDir: TestsToolkitBootstrapLoadEnvTempDir = undefined;

  beforeEach(() => {
    const tempTmpDir: TestsToolkitBootstrapLoadEnvTmpDir = tmpdir();
    const tempDirPath: TestsToolkitBootstrapLoadEnvTempDirPath = join(tempTmpDir, 'nova-bootstrap-env-');

    tempDir = mkdtempSync(tempDirPath);

    return;
  });

  afterEach(() => {
    rmSync(tempDir!, {
      recursive: true, force: true,
    });

    Reflect.deleteProperty(process.env, 'NOVA_TEST_KEY');
    Reflect.deleteProperty(process.env, 'NOVA_TEST_QUOTED');
    Reflect.deleteProperty(process.env, 'NOVA_TEST_SINGLE');

    return;
  });

  it('loads KEY=value', () => {
    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_KEY=hello\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'hello');

    return;
  });

  it('loads double-quoted value', () => {
    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_QUOTED="hello world"\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_QUOTED'], 'hello world');

    return;
  });

  it('loads single-quoted value', () => {
    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_SINGLE=\'hello world\'\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_SINGLE'], 'hello world');

    return;
  });

  it('does not override existing vars', () => {
    const originalValue: TestsToolkitBootstrapLoadEnvOriginalValue = 'original';

    Reflect.set(process.env, 'NOVA_TEST_KEY', originalValue);

    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_KEY=overridden\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'original');

    return;
  });

  it('ignores comments', () => {
    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');
    const envContent: TestsToolkitBootstrapLoadEnvEnvContent = [
      '# This is a comment',
      'NOVA_TEST_KEY=hello',
    ].join('\n');

    writeFileSync(envFilePath, envContent);

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'hello');

    return;
  });

  it('ignores empty lines', () => {
    const envFilePath: TestsToolkitBootstrapLoadEnvEnvFilePath = join(tempDir!, '.env');
    const envContent: TestsToolkitBootstrapLoadEnvEnvContent = [
      '',
      '',
      'NOVA_TEST_KEY=hello',
      '',
    ].join('\n');

    writeFileSync(envFilePath, envContent);

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'hello');

    return;
  });

  it('does not throw when no .env exists', () => {
    doesNotThrow(() => {
      Bootstrap.loadEnv(tempDir!);

      return;
    });

    return;
  });

  return;
});
