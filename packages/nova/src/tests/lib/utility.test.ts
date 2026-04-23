import {
  deepStrictEqual,
  fail,
  match,
  notStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
  relative,
  sep,
} from 'node:path';

import { afterAll, describe, it } from 'vitest';

import {
  buildGeneratedFileHeader,
  currentTimestamp,
  detectShell,
  discoverPathsWithFile,
  executeShell,
  isCommandExists,
  isExecuteShellError,
  isFileIdentical,
  isPlainObject,
  isProjectRoot,
  loadWorkspaceManifests,
  parseLinuxOsReleaseText,
  parseWindowsRegistryText,
  pathExists,
  renameFileWithDate,
  saveGeneratedFile,
  saveWorkspaceManifest,
} from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';

import type {
  TestsLibUtilityBuildGeneratedFileHeaderResult,
  TestsLibUtilityBuildGeneratedFileHeaderThrew,
  TestsLibUtilityCurrentTimestampEndsWithBracket,
  TestsLibUtilityCurrentTimestampPattern,
  TestsLibUtilityCurrentTimestampResult,
  TestsLibUtilityCurrentTimestampResults,
  TestsLibUtilityCurrentTimestampStartsWithBracket,
  TestsLibUtilityCurrentTimestampTimestamp,
  TestsLibUtilityDetectShellIsKnownShell,
  TestsLibUtilityDetectShellKnownShells,
  TestsLibUtilityDetectShellResult,
  TestsLibUtilityDiscoverPathsWithFileAbsolutePaths,
  TestsLibUtilityDiscoverPathsWithFileAppPackage,
  TestsLibUtilityDiscoverPathsWithFileAppRoot,
  TestsLibUtilityDiscoverPathsWithFileAppStuffRoot,
  TestsLibUtilityDiscoverPathsWithFileDotHiddenPackage,
  TestsLibUtilityDiscoverPathsWithFileDotHiddenRoot,
  TestsLibUtilityDiscoverPathsWithFileNodePackage,
  TestsLibUtilityDiscoverPathsWithFileNodeRoot,
  TestsLibUtilityDiscoverPathsWithFileOriginalCwd,
  TestsLibUtilityDiscoverPathsWithFilePackagePackage,
  TestsLibUtilityDiscoverPathsWithFilePackageRoot,
  TestsLibUtilityDiscoverPathsWithFileProjectPackage,
  TestsLibUtilityDiscoverPathsWithFileProjectRoot,
  TestsLibUtilityDiscoverPathsWithFileRealAppStuffRoot,
  TestsLibUtilityDiscoverPathsWithFileRealProjectRoot,
  TestsLibUtilityDiscoverPathsWithFileRelativePaths,
  TestsLibUtilityDiscoverPathsWithFileSandboxPrefix,
  TestsLibUtilityDiscoverPathsWithFileSandboxRoot,
  TestsLibUtilityDiscoverPathsWithFileTemporaryDirectory,
  TestsLibUtilityExecuteShellIncludesHello,
  TestsLibUtilityExecuteShellResult,
  TestsLibUtilityIsCommandExistsResult,
  TestsLibUtilityIsExecuteShellErrorError,
  TestsLibUtilityIsExecuteShellErrorResult,
  TestsLibUtilityIsFileIdenticalContents,
  TestsLibUtilityIsFileIdenticalContentsJson,
  TestsLibUtilityIsFileIdenticalExistingContents,
  TestsLibUtilityIsFileIdenticalExistingJson,
  TestsLibUtilityIsFileIdenticalFilePath,
  TestsLibUtilityIsFileIdenticalProposedContents,
  TestsLibUtilityIsFileIdenticalResult,
  TestsLibUtilityIsFileIdenticalSandboxPrefix,
  TestsLibUtilityIsFileIdenticalSandboxRoot,
  TestsLibUtilityIsFileIdenticalTemporaryDirectory,
  TestsLibUtilityIsPlainObjectNullPrototypeObject,
  TestsLibUtilityIsPlainObjectPlainObject,
  TestsLibUtilityIsPlainObjectResult,
  TestsLibUtilityIsProjectRootAppPackage,
  TestsLibUtilityIsProjectRootAppRoot,
  TestsLibUtilityIsProjectRootEmptyDirectory,
  TestsLibUtilityIsProjectRootOriginalCwd,
  TestsLibUtilityIsProjectRootPackageJsonPath,
  TestsLibUtilityIsProjectRootProjectPackage,
  TestsLibUtilityIsProjectRootProjectRoot,
  TestsLibUtilityIsProjectRootRealAppRoot,
  TestsLibUtilityIsProjectRootRealEmptyDirectory,
  TestsLibUtilityIsProjectRootRealProjectRoot,
  TestsLibUtilityIsProjectRootResult,
  TestsLibUtilityIsProjectRootSandboxPrefix,
  TestsLibUtilityIsProjectRootSandboxRoot,
  TestsLibUtilityIsProjectRootTemporaryDirectory,
  TestsLibUtilityLoadWorkspaceManifestsCorePackageJson,
  TestsLibUtilityLoadWorkspaceManifestsCorePackagePath,
  TestsLibUtilityLoadWorkspaceManifestsFirstWorkspace,
  TestsLibUtilityLoadWorkspaceManifestsOnlyWorkspace,
  TestsLibUtilityLoadWorkspaceManifestsPackageDirectory,
  TestsLibUtilityLoadWorkspaceManifestsProjectRoot,
  TestsLibUtilityLoadWorkspaceManifestsResult,
  TestsLibUtilityLoadWorkspaceManifestsRootPackageJson,
  TestsLibUtilityLoadWorkspaceManifestsRootPackagePath,
  TestsLibUtilityLoadWorkspaceManifestsSandboxPrefix,
  TestsLibUtilityLoadWorkspaceManifestsSandboxRoot,
  TestsLibUtilityLoadWorkspaceManifestsSecondWorkspace,
  TestsLibUtilityLoadWorkspaceManifestsTemporaryDirectory,
  TestsLibUtilityParseLinuxOsReleaseTextResult,
  TestsLibUtilityParseLinuxOsReleaseTextResultKeys,
  TestsLibUtilityParseLinuxOsReleaseTextText,
  TestsLibUtilityParseWindowsRegistryTextCurrentBuild,
  TestsLibUtilityParseWindowsRegistryTextCurrentMajorVersionNumber,
  TestsLibUtilityParseWindowsRegistryTextProductName,
  TestsLibUtilityParseWindowsRegistryTextResult,
  TestsLibUtilityParseWindowsRegistryTextResultKeys,
  TestsLibUtilityParseWindowsRegistryTextText,
  TestsLibUtilityPathExistsNonExistentPath,
  TestsLibUtilityPathExistsResult,
  TestsLibUtilityPathExistsSandboxDirectory,
  TestsLibUtilityPathExistsTemporaryDirectory,
  TestsLibUtilityPathExistsTemporaryFile,
  TestsLibUtilityPathExistsTemporaryPrefix,
  TestsLibUtilityRenameFileWithDateExistingFilePath,
  TestsLibUtilityRenameFileWithDateExistingName,
  TestsLibUtilityRenameFileWithDateFilePath,
  TestsLibUtilityRenameFileWithDateFiles,
  TestsLibUtilityRenameFileWithDateMatchesBackupPattern,
  TestsLibUtilityRenameFileWithDateNow,
  TestsLibUtilityRenameFileWithDateOriginalExists,
  TestsLibUtilityRenameFileWithDateRenamedFile,
  TestsLibUtilityRenameFileWithDateResult,
  TestsLibUtilityRenameFileWithDateSandboxPrefix,
  TestsLibUtilityRenameFileWithDateSandboxRoot,
  TestsLibUtilityRenameFileWithDateSecondFile,
  TestsLibUtilityRenameFileWithDateSubDirectory,
  TestsLibUtilityRenameFileWithDateTemporaryDirectory,
  TestsLibUtilityRenameFileWithDateTimestamp,
  TestsLibUtilitySaveGeneratedFileWithHeaderExpectedHeader,
  TestsLibUtilitySaveGeneratedFileWithHeaderFirstWrite,
  TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptions,
  TestsLibUtilitySaveGeneratedFileWithHeaderOriginalCwd,
  TestsLibUtilitySaveGeneratedFileWithHeaderProjectDirectory,
  TestsLibUtilitySaveGeneratedFileWithHeaderSandboxRoot,
  TestsLibUtilitySaveGeneratedFileWithHeaderSecondWrite,
  TestsLibUtilitySaveGeneratedFileWithHeaderTargetPath,
  TestsLibUtilitySaveGeneratedFileWithHeaderWritten,
  TestsLibUtilitySaveWorkspaceManifestBackupFile,
  TestsLibUtilitySaveWorkspaceManifestContents,
  TestsLibUtilitySaveWorkspaceManifestContentsJson,
  TestsLibUtilitySaveWorkspaceManifestFileDirectory,
  TestsLibUtilitySaveWorkspaceManifestFilePath,
  TestsLibUtilitySaveWorkspaceManifestFiles,
  TestsLibUtilitySaveWorkspaceManifestModified,
  TestsLibUtilitySaveWorkspaceManifestOriginal,
  TestsLibUtilitySaveWorkspaceManifestOriginalJson,
  TestsLibUtilitySaveWorkspaceManifestSandboxPrefix,
  TestsLibUtilitySaveWorkspaceManifestSandboxRoot,
  TestsLibUtilitySaveWorkspaceManifestStatAfter,
  TestsLibUtilitySaveWorkspaceManifestStatBefore,
  TestsLibUtilitySaveWorkspaceManifestSubDirectory,
  TestsLibUtilitySaveWorkspaceManifestTemporaryDirectory,
  TestsLibUtilitySaveWorkspaceManifestWritten,
  TestsLibUtilitySaveWorkspaceManifestWrittenRaw,
} from '../../types/tests/lib/utility.test.d.ts';

/**
 * Tests - Lib - Utility - Discover Paths With File.
 *
 * @since 0.12.0
 */
describe('discoverPathsWithFile', async () => {
  const originalCwd: TestsLibUtilityDiscoverPathsWithFileOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibUtilityDiscoverPathsWithFileTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilityDiscoverPathsWithFileSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilityDiscoverPathsWithFileSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    // Reset the directory back to the current working directory.
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('finds every package.json when traversing forward', async () => {
    const projectRoot: TestsLibUtilityDiscoverPathsWithFileProjectRoot = join(sandboxRoot, 'forward');
    const appRoot: TestsLibUtilityDiscoverPathsWithFileAppRoot = join(projectRoot, 'apps', 'some-app');
    const packageRoot: TestsLibUtilityDiscoverPathsWithFilePackageRoot = join(projectRoot, 'packages', 'some-package');
    const nodeRoot: TestsLibUtilityDiscoverPathsWithFileNodeRoot = join(projectRoot, 'node_modules', 'ignore-me');
    const dotHiddenRoot: TestsLibUtilityDiscoverPathsWithFileDotHiddenRoot = join(projectRoot, '.hidden', 'ignore-me');

    // Create directories inside the project root.
    await Promise.all([
      mkdir(appRoot, { recursive: true }),
      mkdir(packageRoot, { recursive: true }),
      mkdir(nodeRoot, { recursive: true }),
      mkdir(dotHiddenRoot, { recursive: true }),
    ]);

    // Seed empty "package.json" files in all testing directories.
    const projectPackage: TestsLibUtilityDiscoverPathsWithFileProjectPackage = join(projectRoot, 'package.json');
    const appPackage: TestsLibUtilityDiscoverPathsWithFileAppPackage = join(appRoot, 'package.json');
    const packagePackage: TestsLibUtilityDiscoverPathsWithFilePackagePackage = join(packageRoot, 'package.json');
    const nodePackage: TestsLibUtilityDiscoverPathsWithFileNodePackage = join(nodeRoot, 'package.json');
    const dotHiddenPackage: TestsLibUtilityDiscoverPathsWithFileDotHiddenPackage = join(dotHiddenRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
      writeFile(packagePackage, '{}\n'),
      writeFile(nodePackage, '{}\n'),
      writeFile(dotHiddenPackage, '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot: TestsLibUtilityDiscoverPathsWithFileRealProjectRoot = await realpath(projectRoot);

    // Change the current directory to the project root.
    process.chdir(realProjectRoot);

    const absolutePaths: TestsLibUtilityDiscoverPathsWithFileAbsolutePaths = await discoverPathsWithFile('package.json', 'forward');
    const relativePaths: TestsLibUtilityDiscoverPathsWithFileRelativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'forward-relativePaths',
    }).debug(relativePaths);

    deepStrictEqual(relativePaths, [
      '',
      'apps/some-app',
      'packages/some-package',
    ]);

    return;
  });

  it('climbs to parent package.json files when traversing backward', async () => {
    const projectRoot: TestsLibUtilityDiscoverPathsWithFileProjectRoot = join(sandboxRoot, 'backward');
    const appRoot: TestsLibUtilityDiscoverPathsWithFileAppRoot = join(projectRoot, 'apps', 'some-app');
    const appStuffRoot: TestsLibUtilityDiscoverPathsWithFileAppStuffRoot = join(appRoot, 'stuff');

    // Create directories inside the project root.
    await mkdir(appStuffRoot, { recursive: true });

    // Seed empty "package.json" files in all testing directories.
    const projectPackage: TestsLibUtilityDiscoverPathsWithFileProjectPackage = join(projectRoot, 'package.json');
    const appPackage: TestsLibUtilityDiscoverPathsWithFileAppPackage = join(appRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot: TestsLibUtilityDiscoverPathsWithFileRealProjectRoot = await realpath(projectRoot);
    const realAppStuffRoot: TestsLibUtilityDiscoverPathsWithFileRealAppStuffRoot = await realpath(appStuffRoot);

    // Change the current directory to a "stuff" folder inside "some-app".
    process.chdir(realAppStuffRoot);

    const absolutePaths: TestsLibUtilityDiscoverPathsWithFileAbsolutePaths = await discoverPathsWithFile('package.json', 'backward');
    const relativePaths: TestsLibUtilityDiscoverPathsWithFileRelativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-absolutePaths',
    }).debug(absolutePaths);

    Logger.customize({
      name: 'discoverPathsWithFile',
      type: 'test',
      purpose: 'backward-relativePaths',
    }).debug(relativePaths);

    deepStrictEqual(relativePaths, [
      'apps/some-app',
      '',
    ]);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Plain Object.
 *
 * @since 0.12.0
 */
describe('isPlainObject', async () => {
  it('returns true for empty object literal', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject({});

    strictEqual(result, true);

    return;
  });

  it('returns true for object with properties', () => {
    const plainObject: TestsLibUtilityIsPlainObjectPlainObject = {
      a: 1,
      b: 2,
    };

    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(plainObject);

    strictEqual(result, true);

    return;
  });

  it('returns true for Object.create(null)', () => {
    const nullPrototypeObject: TestsLibUtilityIsPlainObjectNullPrototypeObject = Object.create(null);
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(nullPrototypeObject);

    strictEqual(result, true);

    return;
  });

  it('returns false for null', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(null);

    strictEqual(result, false);

    return;
  });

  it('returns false for undefined', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(undefined);

    strictEqual(result, false);

    return;
  });

  it('returns false for string', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject('hello');

    strictEqual(result, false);

    return;
  });

  it('returns false for number', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(42);

    strictEqual(result, false);

    return;
  });

  it('returns false for boolean', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(true);

    strictEqual(result, false);

    return;
  });

  it('returns false for array', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject([
      1,
      2,
      3,
    ]);

    strictEqual(result, false);

    return;
  });

  it('returns false for Date instance', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(new Date());

    strictEqual(result, false);

    return;
  });

  it('returns false for RegExp instance', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(new RegExp('test'));

    strictEqual(result, false);

    return;
  });

  it('returns false for Map instance', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(new Map());

    strictEqual(result, false);

    return;
  });

  it('returns false for Set instance', () => {
    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(new Set());

    strictEqual(result, false);

    return;
  });

  it('returns false for class instance', () => {
    class Foo {}

    const result: TestsLibUtilityIsPlainObjectResult = isPlainObject(new Foo());

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Execute Shell Error.
 *
 * @since 0.12.0
 */
describe('isExecuteShellError', async () => {
  it('returns true for object with cmd property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ cmd: 'echo hello' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with killed property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ killed: false });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with code property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ code: 1 });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with signal property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ signal: 'SIGTERM' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with stdout property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ stdout: 'output' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with stderr property', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ stderr: 'error' });

    strictEqual(result, true);

    return;
  });

  it('returns true for object with multiple exec properties', () => {
    const error: TestsLibUtilityIsExecuteShellErrorError = {
      cmd: 'test',
      killed: false,
      code: 1,
      signal: 'SIGTERM',
      stdout: '',
      stderr: 'failed',
    };

    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError(error);

    strictEqual(result, true);

    return;
  });

  it('returns false for null', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError(null);

    strictEqual(result, false);

    return;
  });

  it('returns false for undefined', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError(undefined);

    strictEqual(result, false);

    return;
  });

  it('returns false for string', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError('error');

    strictEqual(result, false);

    return;
  });

  it('returns false for number', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError(42);

    strictEqual(result, false);

    return;
  });

  it('returns false for empty object', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({});

    strictEqual(result, false);

    return;
  });

  it('returns false for object with wrong property types', () => {
    const result: TestsLibUtilityIsExecuteShellErrorResult = isExecuteShellError({ cmd: 123 });

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Current Timestamp.
 *
 * @since 0.12.0
 */
describe('currentTimestamp', async () => {
  it('returns a bracketed timestamp string', () => {
    const result: TestsLibUtilityCurrentTimestampResult = currentTimestamp();

    const startsWithBracket: TestsLibUtilityCurrentTimestampStartsWithBracket = result.startsWith('[');
    const endsWithBracket: TestsLibUtilityCurrentTimestampEndsWithBracket = result.endsWith(']');

    ok(startsWithBracket);
    ok(endsWithBracket);

    return;
  });

  it('matches expected timestamp format', () => {
    const result: TestsLibUtilityCurrentTimestampResult = currentTimestamp();
    const pattern: TestsLibUtilityCurrentTimestampPattern = new RegExp('^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d{3} [+-]\\d{2}\\d{2}]$');

    match(result, pattern);

    return;
  });

  it('produces different milliseconds on consecutive calls', () => {
    const results: TestsLibUtilityCurrentTimestampResults = new Set();

    for (let i = 0; i < 10; i += 1) {
      const timestamp: TestsLibUtilityCurrentTimestampTimestamp = currentTimestamp();

      results.add(timestamp);
    }

    // At least some variation expected across 10 calls.
    ok(results.size >= 1);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Detect Shell.
 *
 * @since 0.12.0
 */
describe('detectShell', async () => {
  it('returns a non-empty string', () => {
    const result: TestsLibUtilityDetectShellResult = detectShell();

    strictEqual(typeof result, 'string');
    ok(result.length > 0);

    return;
  });

  it('returns a known shell path', () => {
    const result: TestsLibUtilityDetectShellResult = detectShell();
    const knownShells: TestsLibUtilityDetectShellKnownShells = [
      'cmd.exe',
      '/bin/zsh',
      '/bin/bash',
      '/bin/ksh',
      '/bin/sh',
    ];

    const isKnownShell: TestsLibUtilityDetectShellIsKnownShell = knownShells.includes(result);

    ok(isKnownShell, `Unexpected shell: "${result}"`);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Path Exists.
 *
 * @since 0.12.0
 */
describe('pathExists', async () => {
  it('returns true for existing file', async () => {
    const temporaryDirectory: TestsLibUtilityPathExistsTemporaryDirectory = tmpdir();
    const temporaryPrefix: TestsLibUtilityPathExistsTemporaryPrefix = join(temporaryDirectory, 'nova-pathExists-');
    const sandboxDirectory: TestsLibUtilityPathExistsSandboxDirectory = await mkdtemp(temporaryPrefix);
    const temporaryFile: TestsLibUtilityPathExistsTemporaryFile = join(sandboxDirectory, 'test.txt');

    await writeFile(temporaryFile, 'test');

    const result: TestsLibUtilityPathExistsResult = await pathExists(temporaryFile);

    strictEqual(result, true);

    await rm(sandboxDirectory, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true for existing directory', async () => {
    const temporaryDirectory: TestsLibUtilityPathExistsTemporaryDirectory = tmpdir();
    const temporaryPrefix: TestsLibUtilityPathExistsTemporaryPrefix = join(temporaryDirectory, 'nova-pathExists-');
    const sandboxDirectory: TestsLibUtilityPathExistsSandboxDirectory = await mkdtemp(temporaryPrefix);

    const result: TestsLibUtilityPathExistsResult = await pathExists(sandboxDirectory);

    strictEqual(result, true);

    await rm(sandboxDirectory, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns false for non-existent path', async () => {
    const temporaryDirectory: TestsLibUtilityPathExistsTemporaryDirectory = tmpdir();
    const nonExistentPath: TestsLibUtilityPathExistsNonExistentPath = join(temporaryDirectory, 'nova-does-not-exist-xyz');
    const result: TestsLibUtilityPathExistsResult = await pathExists(nonExistentPath);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Execute Shell.
 *
 * @since 0.12.0
 */
describe('executeShell', async () => {
  it('runs a simple echo command', async () => {
    const result: TestsLibUtilityExecuteShellResult = await executeShell('echo hello');

    strictEqual(result['code'], 0);
    const includesHello: TestsLibUtilityExecuteShellIncludesHello = result['textOut'].includes('hello');

    ok(includesHello);

    return;
  });

  it('returns non-zero code for failing command', async () => {
    const result: TestsLibUtilityExecuteShellResult = await executeShell('nova-nonexistent-command-xyz-12345');

    notStrictEqual(result['code'], 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Command Exists.
 *
 * @since 0.12.0
 */
describe('isCommandExists', async () => {
  it('returns true for an existing command', async () => {
    const result: TestsLibUtilityIsCommandExistsResult = await isCommandExists('node');

    strictEqual(result, true);

    return;
  });

  it('returns false for a non-existent command', async () => {
    const result: TestsLibUtilityIsCommandExistsResult = await isCommandExists('nova-nonexistent-command-xyz-12345');

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is File Identical.
 *
 * @since 0.12.0
 */
describe('isFileIdentical', async () => {
  const temporaryDirectory: TestsLibUtilityIsFileIdenticalTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilityIsFileIdenticalSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilityIsFileIdenticalSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true when string content matches file', async () => {
    const filePath: TestsLibUtilityIsFileIdenticalFilePath = join(sandboxRoot, 'string-match.txt');

    await writeFile(filePath, 'hello world');

    const result: TestsLibUtilityIsFileIdenticalResult = await isFileIdentical(filePath, 'hello world');

    strictEqual(result, true);

    return;
  });

  it('returns false when string content differs from file', async () => {
    const filePath: TestsLibUtilityIsFileIdenticalFilePath = join(sandboxRoot, 'string-differ.txt');

    await writeFile(filePath, 'hello world');

    const result: TestsLibUtilityIsFileIdenticalResult = await isFileIdentical(filePath, 'goodbye world');

    strictEqual(result, false);

    return;
  });

  it('returns true when object content matches JSON file', async () => {
    const filePath: TestsLibUtilityIsFileIdenticalFilePath = join(sandboxRoot, 'object-match.json');
    const contents: TestsLibUtilityIsFileIdenticalContents = {
      name: 'nova',
      version: '1.0.0',
    };

    const contentsJson: TestsLibUtilityIsFileIdenticalContentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`);

    const result: TestsLibUtilityIsFileIdenticalResult = await isFileIdentical(filePath, contents);

    strictEqual(result, true);

    return;
  });

  it('returns false when object content differs from JSON file', async () => {
    const filePath: TestsLibUtilityIsFileIdenticalFilePath = join(sandboxRoot, 'object-differ.json');
    const existingContents: TestsLibUtilityIsFileIdenticalExistingContents = {
      name: 'nova',
      version: '1.0.0',
    };
    const proposedContents: TestsLibUtilityIsFileIdenticalProposedContents = {
      name: 'nova',
      version: '2.0.0',
    };

    const existingJson: TestsLibUtilityIsFileIdenticalExistingJson = JSON.stringify(existingContents, null, 2);

    await writeFile(filePath, `${existingJson}\n`);

    const result: TestsLibUtilityIsFileIdenticalResult = await isFileIdentical(filePath, proposedContents);

    strictEqual(result, false);

    return;
  });

  it('returns false when file does not exist', async () => {
    const filePath: TestsLibUtilityIsFileIdenticalFilePath = join(sandboxRoot, 'does-not-exist.txt');

    const result: TestsLibUtilityIsFileIdenticalResult = await isFileIdentical(filePath, 'content');

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Rename File With Date.
 *
 * @since 0.12.0
 */
describe('renameFileWithDate', async () => {
  const temporaryDirectory: TestsLibUtilityRenameFileWithDateTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilityRenameFileWithDateSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilityRenameFileWithDateSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('renames a file with a date-stamped name', async () => {
    const filePath: TestsLibUtilityRenameFileWithDateFilePath = join(sandboxRoot, 'rename-test.txt');

    await writeFile(filePath, 'test content');

    const result: TestsLibUtilityRenameFileWithDateResult = await renameFileWithDate(filePath);

    strictEqual(result, true);

    // Original file should no longer exist.
    const originalExists: TestsLibUtilityRenameFileWithDateOriginalExists = await pathExists(filePath);

    strictEqual(originalExists, false);

    // A date-stamped file should exist in the same directory.
    const files: TestsLibUtilityRenameFileWithDateFiles = await readdir(sandboxRoot);
    const renamedFile: TestsLibUtilityRenameFileWithDateRenamedFile = files.find((file) => file.startsWith('rename-test.'));

    ok(renamedFile !== undefined, 'Renamed file should exist');
    const matchesBackupPattern: TestsLibUtilityRenameFileWithDateMatchesBackupPattern = new RegExp('^rename-test\\.\\d{4}-\\d{2}-\\d{2}_\\d{4}\\.nova-backup\\.txt$').test(renamedFile);

    ok(matchesBackupPattern);

    return;
  });

  it('returns false when source file does not exist', async () => {
    const filePath: TestsLibUtilityRenameFileWithDateFilePath = join(sandboxRoot, 'does-not-exist.txt');

    const result: TestsLibUtilityRenameFileWithDateResult = await renameFileWithDate(filePath);

    strictEqual(result, false);

    return;
  });

  it('increments counter when target file already exists', async () => {
    const subDirectory: TestsLibUtilityRenameFileWithDateSubDirectory = join(sandboxRoot, 'counter-test');

    await mkdir(subDirectory);

    const filePath: TestsLibUtilityRenameFileWithDateFilePath = join(subDirectory, 'original.txt');

    await writeFile(filePath, 'content');

    // Pre-create a file with the expected first counter value.
    const now: TestsLibUtilityRenameFileWithDateNow = new Date();
    const timestamp: TestsLibUtilityRenameFileWithDateTimestamp = [
      now.getUTCFullYear(),
      (now.getUTCMonth() + 1).toString().padStart(2, '0'),
      now.getUTCDate().toString().padStart(2, '0'),
    ].join('-');
    const existingName: TestsLibUtilityRenameFileWithDateExistingName = `original.${timestamp}_0001.nova-backup.txt`;

    const existingFilePath: TestsLibUtilityRenameFileWithDateExistingFilePath = join(subDirectory, existingName);

    await writeFile(existingFilePath, 'existing');

    const result: TestsLibUtilityRenameFileWithDateResult = await renameFileWithDate(filePath);

    strictEqual(result, true);

    // Should have counter 0002 since 0001 already exists.
    const files: TestsLibUtilityRenameFileWithDateFiles = await readdir(subDirectory);
    const secondFile: TestsLibUtilityRenameFileWithDateSecondFile = files.find((file) => file.includes('_0002'));

    ok(secondFile !== undefined, 'File with incremented counter should exist');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Is Project Root.
 *
 * @since 0.12.0
 */
describe('isProjectRoot', async () => {
  const originalCwd: TestsLibUtilityIsProjectRootOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibUtilityIsProjectRootTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilityIsProjectRootSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilityIsProjectRootSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('returns true when cwd is project root with single package.json', async () => {
    const projectRoot: TestsLibUtilityIsProjectRootProjectRoot = join(sandboxRoot, 'single');

    await mkdir(projectRoot, { recursive: true });

    const packageJsonPath: TestsLibUtilityIsProjectRootPackageJsonPath = join(projectRoot, 'package.json');

    await writeFile(packageJsonPath, '{}\n');

    const realProjectRoot: TestsLibUtilityIsProjectRootRealProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    const result: TestsLibUtilityIsProjectRootResult = await isProjectRoot(realProjectRoot);

    strictEqual(result, true);

    return;
  });

  it('returns false when cwd has no package.json above', async () => {
    const emptyDirectory: TestsLibUtilityIsProjectRootEmptyDirectory = join(sandboxRoot, 'empty');

    await mkdir(emptyDirectory, { recursive: true });

    const realEmptyDirectory: TestsLibUtilityIsProjectRootRealEmptyDirectory = await realpath(emptyDirectory);

    process.chdir(realEmptyDirectory);

    const result: TestsLibUtilityIsProjectRootResult = await isProjectRoot(realEmptyDirectory);

    strictEqual(result, false);

    return;
  });

  it('returns false when multiple package.json files found above', async () => {
    const projectRoot: TestsLibUtilityIsProjectRootProjectRoot = join(sandboxRoot, 'multi');
    const appRoot: TestsLibUtilityIsProjectRootAppRoot = join(projectRoot, 'apps', 'my-app');

    await mkdir(appRoot, { recursive: true });

    const projectPackage: TestsLibUtilityIsProjectRootProjectPackage = join(projectRoot, 'package.json');
    const appPackage: TestsLibUtilityIsProjectRootAppPackage = join(appRoot, 'package.json');

    await Promise.all([
      writeFile(projectPackage, '{}\n'),
      writeFile(appPackage, '{}\n'),
    ]);

    const realAppRoot: TestsLibUtilityIsProjectRootRealAppRoot = await realpath(appRoot);

    process.chdir(realAppRoot);

    const result: TestsLibUtilityIsProjectRootResult = await isProjectRoot(realAppRoot);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Load Workspace Manifests.
 *
 * @since 0.12.0
 */
describe('loadWorkspaceManifests', async () => {
  const temporaryDirectory: TestsLibUtilityLoadWorkspaceManifestsTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilityLoadWorkspaceManifestsSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilityLoadWorkspaceManifestsSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('loads package.json for configured workspaces', async () => {
    const projectRoot: TestsLibUtilityLoadWorkspaceManifestsProjectRoot = join(sandboxRoot, 'valid');
    const packageDirectory: TestsLibUtilityLoadWorkspaceManifestsPackageDirectory = join(projectRoot, 'packages', 'core');

    await mkdir(packageDirectory, { recursive: true });

    const rootPackageJson: TestsLibUtilityLoadWorkspaceManifestsRootPackageJson = JSON.stringify({ name: 'root' }, null, 2);
    const corePackageJson: TestsLibUtilityLoadWorkspaceManifestsCorePackageJson = JSON.stringify({ name: '@test/core' }, null, 2);
    const rootPackagePath: TestsLibUtilityLoadWorkspaceManifestsRootPackagePath = join(projectRoot, 'package.json');
    const corePackagePath: TestsLibUtilityLoadWorkspaceManifestsCorePackagePath = join(packageDirectory, 'package.json');

    await Promise.all([
      writeFile(rootPackagePath, rootPackageJson),
      writeFile(corePackagePath, corePackageJson),
    ]);

    const result: TestsLibUtilityLoadWorkspaceManifestsResult = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        [
          './',
          {
            name: 'root',
            role: 'project',
            policy: 'freezable',
          },
        ],
        [
          './packages/core',
          {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
          },
        ],
      ],
    });

    strictEqual(result.length, 2);

    const firstWorkspace: TestsLibUtilityLoadWorkspaceManifestsFirstWorkspace = result[0];
    const secondWorkspace: TestsLibUtilityLoadWorkspaceManifestsSecondWorkspace = result[1];

    ok(firstWorkspace !== undefined);
    ok(secondWorkspace !== undefined);
    strictEqual(firstWorkspace['manifest']['name'], 'root');
    strictEqual(firstWorkspace['fileContents']['name'], 'root');
    strictEqual(secondWorkspace['manifest']['name'], '@test/core');
    strictEqual(secondWorkspace['fileContents']['name'], '@test/core');

    return;
  });

  it('skips workspace with missing package.json', async () => {
    const projectRoot: TestsLibUtilityLoadWorkspaceManifestsProjectRoot = join(sandboxRoot, 'missing');

    await mkdir(projectRoot, { recursive: true });

    const rootPackageJson: TestsLibUtilityLoadWorkspaceManifestsRootPackageJson = JSON.stringify({ name: 'root' }, null, 2);
    const rootPackagePath: TestsLibUtilityLoadWorkspaceManifestsRootPackagePath = join(projectRoot, 'package.json');

    await writeFile(rootPackagePath, rootPackageJson);

    const result: TestsLibUtilityLoadWorkspaceManifestsResult = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        [
          './',
          {
            name: 'root',
            role: 'project',
            policy: 'freezable',
          },
        ],
        [
          './packages/missing',
          {
            name: '@test/missing',
            role: 'package',
            policy: 'distributable',
          },
        ],
      ],
    });

    strictEqual(result.length, 1);

    const onlyWorkspace: TestsLibUtilityLoadWorkspaceManifestsOnlyWorkspace = result[0];

    ok(onlyWorkspace !== undefined);
    strictEqual(onlyWorkspace['manifest']['name'], 'root');

    return;
  });

  it('returns empty array when no workspaces provided', async () => {
    const result: TestsLibUtilityLoadWorkspaceManifestsResult = await loadWorkspaceManifests({
      projectRoot: sandboxRoot,
      workspaces: [],
    });

    strictEqual(result.length, 0);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Save Workspace Manifest.
 *
 * @since 0.12.0
 */
describe('saveWorkspaceManifest', async () => {
  const temporaryDirectory: TestsLibUtilitySaveWorkspaceManifestTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibUtilitySaveWorkspaceManifestSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibUtilitySaveWorkspaceManifestSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('writes changed file contents', async () => {
    const filePath: TestsLibUtilitySaveWorkspaceManifestFilePath = join(sandboxRoot, 'write-test', 'package.json');

    const fileDirectory: TestsLibUtilitySaveWorkspaceManifestFileDirectory = dirname(filePath);

    await mkdir(fileDirectory, { recursive: true });

    const original: TestsLibUtilitySaveWorkspaceManifestOriginal = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson: TestsLibUtilitySaveWorkspaceManifestOriginalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified: TestsLibUtilitySaveWorkspaceManifestModified = {
      name: 'test',
      version: '2.0.0',
    };

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: modified,
    }, true);

    const writtenRaw: TestsLibUtilitySaveWorkspaceManifestWrittenRaw = await readFile(filePath, 'utf-8');
    const written: TestsLibUtilitySaveWorkspaceManifestWritten = JSON.parse(writtenRaw);

    strictEqual(written['version'], '2.0.0');

    return;
  });

  it('skips writing when file contents are identical', async () => {
    const filePath: TestsLibUtilitySaveWorkspaceManifestFilePath = join(sandboxRoot, 'skip-test', 'package.json');

    const fileDirectory: TestsLibUtilitySaveWorkspaceManifestFileDirectory = dirname(filePath);

    await mkdir(fileDirectory, { recursive: true });

    const contents: TestsLibUtilitySaveWorkspaceManifestContents = {
      name: 'test',
      version: '1.0.0',
    };

    const contentsJson: TestsLibUtilitySaveWorkspaceManifestContentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`, 'utf-8');

    const statBefore: TestsLibUtilitySaveWorkspaceManifestStatBefore = await stat(filePath);

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: contents,
    }, true);

    const statAfter: TestsLibUtilitySaveWorkspaceManifestStatAfter = await stat(filePath);

    strictEqual(statBefore.mtimeMs, statAfter.mtimeMs);

    return;
  });

  it('creates backup when replaceFile is false', async () => {
    const subDirectory: TestsLibUtilitySaveWorkspaceManifestSubDirectory = join(sandboxRoot, 'backup-test');

    await mkdir(subDirectory, { recursive: true });

    const filePath: TestsLibUtilitySaveWorkspaceManifestFilePath = join(subDirectory, 'package.json');
    const original: TestsLibUtilitySaveWorkspaceManifestOriginal = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson: TestsLibUtilitySaveWorkspaceManifestOriginalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified: TestsLibUtilitySaveWorkspaceManifestModified = {
      name: 'test',
      version: '2.0.0',
    };

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: modified,
    }, false);

    const files: TestsLibUtilitySaveWorkspaceManifestFiles = await readdir(subDirectory);
    const backupFile: TestsLibUtilitySaveWorkspaceManifestBackupFile = files.find((file) => file.startsWith('package.') && file !== 'package.json');

    ok(backupFile !== undefined, 'Backup file should exist');

    // New file should have the modified contents.
    const writtenRaw: TestsLibUtilitySaveWorkspaceManifestWrittenRaw = await readFile(filePath, 'utf-8');
    const written: TestsLibUtilitySaveWorkspaceManifestWritten = JSON.parse(writtenRaw);

    strictEqual(written['version'], '2.0.0');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Parse Linux OS Release Text.
 *
 * @since 0.12.0
 */
describe('parseLinuxOsReleaseText', async () => {
  it('parses Ubuntu os-release text', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = [
      'NAME="Ubuntu"',
      'VERSION="22.04.3 LTS (Jammy Jellyfish)"',
      'ID=ubuntu',
      'ID_LIKE=debian',
      'PRETTY_NAME="Ubuntu 22.04.3 LTS"',
      'VERSION_ID="22.04"',
    ].join('\n');

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');
    strictEqual(result['VERSION'], '22.04.3 LTS (Jammy Jellyfish)');
    strictEqual(result['ID'], 'ubuntu');
    strictEqual(result['ID_LIKE'], 'debian');
    strictEqual(result['VERSION_ID'], '22.04');

    return;
  });

  it('parses Alpine os-release text', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = [
      'NAME="Alpine Linux"',
      'ID=alpine',
      'VERSION_ID=3.19.0',
      'PRETTY_NAME="Alpine Linux v3.19"',
    ].join('\n');

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Alpine Linux');
    strictEqual(result['ID'], 'alpine');
    strictEqual(result['VERSION_ID'], '3.19.0');

    return;
  });

  it('parses Debian os-release text', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = [
      'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"',
      'NAME="Debian GNU/Linux"',
      'VERSION_ID="12"',
      'ID=debian',
    ].join('\n');

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Debian GNU/Linux');
    strictEqual(result['ID'], 'debian');
    strictEqual(result['VERSION_ID'], '12');

    return;
  });

  it('skips comment lines', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = [
      '# This is a comment',
      'NAME="Test"',
      '# Another comment',
      'ID=test',
    ].join('\n');

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    const resultKeys: TestsLibUtilityParseLinuxOsReleaseTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');

    return;
  });

  it('skips empty lines', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = [
      '',
      'NAME="Test"',
      '',
      '',
      'ID=test',
      '',
    ].join('\n');

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    const resultKeys: TestsLibUtilityParseLinuxOsReleaseTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);

    return;
  });

  it('strips double-quoted values', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = 'NAME="Ubuntu"';

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');

    return;
  });

  it('preserves unquoted values', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = 'ID=ubuntu';

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['ID'], 'ubuntu');

    return;
  });

  it('handles values containing equals sign', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = 'BUG_REPORT_URL="https://example.com?a=1&b=2"';

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    strictEqual(result['BUG_REPORT_URL'], 'https://example.com?a=1&b=2');

    return;
  });

  it('returns empty object for empty string', () => {
    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText('');

    deepStrictEqual(result, {});

    return;
  });

  it('handles CRLF line endings', () => {
    const text: TestsLibUtilityParseLinuxOsReleaseTextText = 'NAME="Test"\r\nID=test\r\nVERSION_ID="1.0"';

    const result: TestsLibUtilityParseLinuxOsReleaseTextResult = parseLinuxOsReleaseText(text);

    const resultKeys: TestsLibUtilityParseLinuxOsReleaseTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 3);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');
    strictEqual(result['VERSION_ID'], '1.0');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Parse Windows Registry Text.
 *
 * @since 0.12.0
 */
describe('parseWindowsRegistryText', async () => {
  it('parses REG_SZ values', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = '    ProductName    REG_SZ    Windows 11 Pro';

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);

    const productName: TestsLibUtilityParseWindowsRegistryTextProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['type'], 'REG_SZ');
    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('parses REG_DWORD values', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = '    CurrentMajorVersionNumber    REG_DWORD    0xa';

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);
    const currentMajorVersionNumber: TestsLibUtilityParseWindowsRegistryTextCurrentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(currentMajorVersionNumber['type'], 'REG_DWORD');
    strictEqual(currentMajorVersionNumber['data'], '0xa');

    return;
  });

  it('parses mixed registry types', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '    ProductName    REG_SZ    Windows 11 Pro',
      '    CurrentBuild    REG_SZ    22631',
      '    CurrentMajorVersionNumber    REG_DWORD    0xa',
    ].join('\n');

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);

    const resultKeys: TestsLibUtilityParseWindowsRegistryTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 3);

    const productName: TestsLibUtilityParseWindowsRegistryTextProductName = result['ProductName'];
    const currentBuild: TestsLibUtilityParseWindowsRegistryTextCurrentBuild = result['CurrentBuild'];
    const currentMajorVersionNumber: TestsLibUtilityParseWindowsRegistryTextCurrentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(productName['type'], 'REG_SZ');
    strictEqual(currentBuild['type'], 'REG_SZ');
    strictEqual(currentMajorVersionNumber['type'], 'REG_DWORD');

    return;
  });

  it('returns empty object for empty string', () => {
    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText('');

    deepStrictEqual(result, {});

    return;
  });

  it('skips non-matching lines', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '',
      '    ProductName    REG_SZ    Windows 11 Pro',
    ].join('\n');

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);

    const resultKeys: TestsLibUtilityParseWindowsRegistryTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 1);

    const productName: TestsLibUtilityParseWindowsRegistryTextProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('trims trailing whitespace from data', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = '    ProductName    REG_SZ    Windows 11 Pro   ';

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);

    const productName: TestsLibUtilityParseWindowsRegistryTextProductName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName['data'], 'Windows 11 Pro');

    return;
  });

  it('handles LF line endings', () => {
    const text: TestsLibUtilityParseWindowsRegistryTextText = '    ProductName    REG_SZ    Windows 11\n    CurrentBuild    REG_SZ    22631';

    const result: TestsLibUtilityParseWindowsRegistryTextResult = parseWindowsRegistryText(text);

    const resultKeys: TestsLibUtilityParseWindowsRegistryTextResultKeys = Object.keys(result);

    strictEqual(resultKeys.length, 2);

    const productName: TestsLibUtilityParseWindowsRegistryTextProductName = result['ProductName'];
    const currentBuild: TestsLibUtilityParseWindowsRegistryTextCurrentBuild = result['CurrentBuild'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    strictEqual(productName['data'], 'Windows 11');
    strictEqual(currentBuild['data'], '22631');

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - Build Generated File Header.
 *
 * @since 0.16.3
 */
describe('buildGeneratedFileHeader', () => {
  it('produces a #-prefixed strict banner for a .yml path', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate github funding',
      docsSlug: 'cli/generators/github/funding',
      targetPath: '/tmp/proj/.github/FUNDING.yml',
      mode: 'strict',
    });

    strictEqual(
      result,
      [
        '# This file is generated by @cbnventures/nova.',
        '# Do not edit manually.',
        '#',
        '# Run `nova generate github funding` to regenerate.',
        '# See: https://nova.cbnventures.io/docs/cli/generators/github/funding',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('produces a #-prefixed strict banner for a .yaml path', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate github funding',
      docsSlug: 'cli/generators/github/funding',
      targetPath: '/tmp/proj/.github/FUNDING.yaml',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Do not edit manually.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for an .editorconfig basename', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate must-haves editorconfig',
      docsSlug: 'cli/generators/must-haves/editorconfig',
      targetPath: '/tmp/proj/.editorconfig',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Run `nova generate must-haves editorconfig` to regenerate.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for a .gitignore basename', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      targetPath: '/tmp/proj/.gitignore',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));

    return;
  });

  it('produces a #-prefixed strict banner for a .env.sample basename', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate must-haves dotenv',
      docsSlug: 'cli/generators/must-haves/dotenv',
      targetPath: '/tmp/proj/.env.sample',
      mode: 'strict',
    });

    ok(result.startsWith('# This file is generated by @cbnventures/nova.\n'));
    ok(result.includes('# Do not edit manually.\n'));

    return;
  });

  it('produces a #-prefixed fillable banner for a .env basename', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate must-haves dotenv',
      docsSlug: 'cli/generators/must-haves/dotenv',
      targetPath: '/tmp/proj/.env',
      mode: 'fillable',
    });

    strictEqual(
      result,
      [
        '# This file is generated by @cbnventures/nova.',
        '# You may fill in values for existing keys only — do not add, rename, or remove keys.',
        '#',
        '# Run `nova generate must-haves dotenv` to regenerate.',
        '# See: https://nova.cbnventures.io/docs/cli/generators/must-haves/dotenv',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('produces an HTML-comment strict banner for a .md path', () => {
    const result: TestsLibUtilityBuildGeneratedFileHeaderResult = buildGeneratedFileHeader({
      command: 'nova generate must-haves read-me',
      docsSlug: 'cli/generators/must-haves/read-me',
      targetPath: '/tmp/proj/README.md',
      mode: 'strict',
    });

    strictEqual(
      result,
      [
        '<!--',
        '  This file is generated by @cbnventures/nova.',
        '  Do not edit manually.',
        '',
        '  Run `nova generate must-haves read-me` to regenerate.',
        '  See: https://nova.cbnventures.io/docs/cli/generators/must-haves/read-me',
        '-->',
        '',
        '',
      ].join('\n'),
    );

    return;
  });

  it('throws when the targetPath has an unsupported extension', () => {
    let threw: TestsLibUtilityBuildGeneratedFileHeaderThrew = false;

    try {
      buildGeneratedFileHeader({
        command: 'nova generate something',
        docsSlug: 'cli/generators/something',
        targetPath: '/tmp/proj/something.json',
        mode: 'strict',
      });
    } catch (error) {
      threw = true;

      ok(error instanceof Error);
      ok(error.message.includes('buildGeneratedFileHeader'));
      ok(error.message.includes('something.json'));
    }

    strictEqual(threw, true);

    return;
  });

  return;
});

/**
 * Tests - Lib - Utility - SaveGeneratedFile (with Header).
 *
 * @since 0.16.3
 */
describe('saveGeneratedFile (with header)', async () => {
  const originalCwd: TestsLibUtilitySaveGeneratedFileWithHeaderOriginalCwd = process.cwd();
  const sandboxRoot: TestsLibUtilitySaveGeneratedFileWithHeaderSandboxRoot = await mkdtemp(join(tmpdir(), 'nova-test-savegen-'));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('prepends the banner before writing when header is supplied', async () => {
    const projectDirectory: TestsLibUtilitySaveGeneratedFileWithHeaderProjectDirectory = join(sandboxRoot, 'prepend');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: TestsLibUtilitySaveGeneratedFileWithHeaderTargetPath = join(projectDirectory, '.gitignore');

    await saveGeneratedFile(targetPath, 'node_modules\n', false, {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict',
    });

    const written: TestsLibUtilitySaveGeneratedFileWithHeaderWritten = await readFile(targetPath, 'utf-8');
    const expectedHeader: TestsLibUtilitySaveGeneratedFileWithHeaderExpectedHeader = buildGeneratedFileHeader({
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      targetPath,
      mode: 'strict',
    });

    strictEqual(written, `${expectedHeader}node_modules\n`);

    return;
  });

  it('skips the write when the header-prefixed content already matches disk', async () => {
    const projectDirectory: TestsLibUtilitySaveGeneratedFileWithHeaderProjectDirectory = join(sandboxRoot, 'skip-identical');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: TestsLibUtilitySaveGeneratedFileWithHeaderTargetPath = join(projectDirectory, '.gitignore');
    const headerOptions: TestsLibUtilitySaveGeneratedFileWithHeaderHeaderOptions = {
      command: 'nova generate must-haves gitignore',
      docsSlug: 'cli/generators/must-haves/gitignore',
      mode: 'strict' as const,
    };

    await saveGeneratedFile(targetPath, 'node_modules\n', false, headerOptions);

    const firstWrite: TestsLibUtilitySaveGeneratedFileWithHeaderFirstWrite = await stat(targetPath);

    await new Promise((resolve) => {
      setTimeout(resolve, 5);

      return;
    });

    await saveGeneratedFile(targetPath, 'node_modules\n', false, headerOptions);

    const secondWrite: TestsLibUtilitySaveGeneratedFileWithHeaderSecondWrite = await stat(targetPath);

    strictEqual(secondWrite.mtimeMs, firstWrite.mtimeMs);

    return;
  });

  it('preserves existing behavior when header is omitted', async () => {
    const projectDirectory: TestsLibUtilitySaveGeneratedFileWithHeaderProjectDirectory = join(sandboxRoot, 'no-header');

    await mkdir(projectDirectory, { recursive: true });

    const targetPath: TestsLibUtilitySaveGeneratedFileWithHeaderTargetPath = join(projectDirectory, '.gitignore');

    await saveGeneratedFile(targetPath, 'node_modules\n', false);

    const written: TestsLibUtilitySaveGeneratedFileWithHeaderWritten = await readFile(targetPath, 'utf-8');

    strictEqual(written, 'node_modules\n');

    return;
  });

  return;
});
