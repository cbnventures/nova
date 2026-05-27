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
  Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_DirectoryExists,
  Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_IncludesAppName,
  Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_Result,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_DirectoryExists,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_IncludesAppName,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_OriginalXdgConfigHome,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_Result,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_SandboxDir,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TempDirPath,
  Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TmpDir,
  Tests_Toolkit_Bootstrap_BootstrapGetDataDir_DirectoryExists,
  Tests_Toolkit_Bootstrap_BootstrapGetDataDir_IncludesAppName,
  Tests_Toolkit_Bootstrap_BootstrapGetDataDir_Result,
  Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_PackageJsonExists,
  Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_PackageJsonPath,
  Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_Result,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvContent,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_OriginalValue,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDir,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDirPath,
  Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TmpDir,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_FilePath,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_Result,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDir,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDirPath,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TmpDir,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_FilePath,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_FilePath2,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_IncludesFirst,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_IncludesSecond,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_Result,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2Path,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDirPath,
  Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TmpDir,
} from '../../types/tests/toolkit/bootstrap.test.d.ts';

/**
 * Tests - Toolkit - Bootstrap - Bootstrap GetConfigDir.
 *
 * @since 0.14.0
 */
describe('Bootstrap getConfigDir', async () => {
  let sandboxDir: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_SandboxDir = undefined;
  let originalXdgConfigHome: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_OriginalXdgConfigHome = undefined;

  beforeEach(() => {
    const tempTmpDir: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TmpDir = tmpdir();
    const tempDirPath: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_TempDirPath = join(tempTmpDir, 'nova-bootstrap-config-');

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
    const result: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_Result = Bootstrap.getConfigDir('nova-test-app');
    const includesAppName: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_IncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_Result = Bootstrap.getConfigDir('nova-test-app');
    const directoryExists: Tests_Toolkit_Bootstrap_BootstrapGetConfigDir_DirectoryExists = existsSync(result);

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
    const result: Tests_Toolkit_Bootstrap_BootstrapGetDataDir_Result = Bootstrap.getDataDir('nova-test-app');
    const includesAppName: Tests_Toolkit_Bootstrap_BootstrapGetDataDir_IncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapGetDataDir_Result = Bootstrap.getDataDir('nova-test-app');
    const directoryExists: Tests_Toolkit_Bootstrap_BootstrapGetDataDir_DirectoryExists = existsSync(result);

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
    const result: Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_Result = Bootstrap.getCacheDir('nova-test-app');
    const includesAppName: Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_IncludesAppName = result.includes('nova-test-app');

    ok(includesAppName);

    return;
  });

  it('creates directory', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_Result = Bootstrap.getCacheDir('nova-test-app');
    const directoryExists: Tests_Toolkit_Bootstrap_BootstrapGetCacheDir_DirectoryExists = existsSync(result);

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
    const result: Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_Result = Bootstrap.getProjectRoot();

    strictEqual(typeof result, 'string');

    return;
  });

  it('result contains package.json', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_Result = Bootstrap.getProjectRoot();
    const packageJsonPath: Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_PackageJsonPath = join(result!, 'package.json');
    const packageJsonExists: Tests_Toolkit_Bootstrap_BootstrapGetProjectRoot_PackageJsonExists = existsSync(packageJsonPath);

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
  let tempDir: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDir = undefined;

  beforeEach(() => {
    const tempTmpDir: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TmpDir = tmpdir();
    const tempDirPath: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_TempDirPath = join(tempTmpDir, 'nova-bootstrap-test-');

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
    const filePath: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_FilePath = join(tempDir!, 'config.json');

    writeFileSync(filePath, '{}');

    const result: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_Result = Bootstrap.resolveFileDir('nova-test-app', 'config.json', [tempDir!]);

    strictEqual(result, tempDir!);

    return;
  });

  it('returns undefined when not found', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_Result = Bootstrap.resolveFileDir('nova-test-app', 'missing.json', [tempDir!]);

    strictEqual(result, undefined);

    return;
  });

  it('respects search order', () => {
    const filePath: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_FilePath = join(tempDir!, 'config.json');

    writeFileSync(filePath, '{}');

    const result: Tests_Toolkit_Bootstrap_BootstrapResolveFileDir_Result = Bootstrap.resolveFileDir('nova-test-app', 'config.json', [
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
  let tempDir: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir = '';
  let tempDir2: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2 = '';

  beforeEach(() => {
    const tempTmpDir: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TmpDir = tmpdir();
    const tempDirPath: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDirPath = join(tempTmpDir, 'nova-bootstrap-test-');
    const tempDir2Path: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_TempDir2Path = join(tempTmpDir, 'nova-bootstrap-test2-');

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
    const filePath: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_FilePath = join(tempDir!, 'config.json');
    const filePath2: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_FilePath2 = join(tempDir2!, 'config.json');

    writeFileSync(filePath, '{}');
    writeFileSync(filePath2, '{}');

    const result: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_Result = Bootstrap.resolveFileDirs('nova-test-app', 'config.json', [
      tempDir!,
      tempDir2!,
    ]);
    const includesFirst: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_IncludesFirst = result.includes(tempDir!);
    const includesSecond: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_IncludesSecond = result.includes(tempDir2!);

    strictEqual(result.length, 2);
    ok(includesFirst);
    ok(includesSecond);

    return;
  });

  it('returns empty array when none found', () => {
    const result: Tests_Toolkit_Bootstrap_BootstrapResolveFileDirs_Result = Bootstrap.resolveFileDirs('nova-test-app', 'missing.json', [
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
  let tempDir: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDir = undefined;

  beforeEach(() => {
    const tempTmpDir: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TmpDir = tmpdir();
    const tempDirPath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_TempDirPath = join(tempTmpDir, 'nova-bootstrap-env-');

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
    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_KEY=hello\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'hello');

    return;
  });

  it('loads double-quoted value', () => {
    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_QUOTED="hello world"\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_QUOTED'], 'hello world');

    return;
  });

  it('loads single-quoted value', () => {
    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_SINGLE=\'hello world\'\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_SINGLE'], 'hello world');

    return;
  });

  it('does not override existing vars', () => {
    const originalValue: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_OriginalValue = 'original';

    Reflect.set(process.env, 'NOVA_TEST_KEY', originalValue);

    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');

    writeFileSync(envFilePath, 'NOVA_TEST_KEY=overridden\n');

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'original');

    return;
  });

  it('ignores comments', () => {
    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');
    const envContent: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvContent = [
      '# This is a comment',
      'NOVA_TEST_KEY=hello',
    ].join('\n');

    writeFileSync(envFilePath, envContent);

    Bootstrap.loadEnv(tempDir!);

    strictEqual(process.env['NOVA_TEST_KEY'], 'hello');

    return;
  });

  it('ignores empty lines', () => {
    const envFilePath: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvFilePath = join(tempDir!, '.env');
    const envContent: Tests_Toolkit_Bootstrap_BootstrapLoadEnv_EnvContent = [
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
