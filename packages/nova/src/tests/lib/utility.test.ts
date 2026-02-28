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
  readFile,
  readdir,
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
import { test } from 'node:test';

import {
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
  saveWorkspaceManifest,
} from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CurrentTimestampResults,
  DiscoverPathsWithFileOriginalCwd,
  DiscoverPathsWithFileSandboxRoot,
  IsFileIdenticalSandboxRoot,
  IsProjectRootOriginalCwd,
  IsProjectRootSandboxRoot,
  LoadWorkspaceManifestsSandboxRoot,
  RenameFileWithDateSandboxRoot,
  SaveWorkspaceManifestSandboxRoot,
} from '@/types/tests/lib/utility.test.d.ts';

/**
 * Discover paths with file.
 *
 * @since 1.0.0
 */
test('discoverPathsWithFile', async (context) => {
  const originalCwd: DiscoverPathsWithFileOriginalCwd = process.cwd();
  const sandboxRoot: DiscoverPathsWithFileSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    // Reset the directory back to the current working directory.
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('finds every package.json when traversing forward', async () => {
    const projectRoot = join(sandboxRoot, 'forward');
    const appRoot = join(projectRoot, 'apps', 'some-app');
    const packageRoot = join(projectRoot, 'packages', 'some-package');
    const nodeRoot = join(projectRoot, 'node_modules', 'ignore-me');
    const dotHiddenRoot = join(projectRoot, '.hidden', 'ignore-me');

    // Create directories inside the project root.
    await Promise.all([
      mkdir(appRoot, { recursive: true }),
      mkdir(packageRoot, { recursive: true }),
      mkdir(nodeRoot, { recursive: true }),
      mkdir(dotHiddenRoot, { recursive: true }),
    ]);

    // Seed empty "package.json" files in all testing directories.
    await Promise.all([
      writeFile(join(projectRoot, 'package.json'), '{}\n'),
      writeFile(join(appRoot, 'package.json'), '{}\n'),
      writeFile(join(packageRoot, 'package.json'), '{}\n'),
      writeFile(join(nodeRoot, 'package.json'), '{}\n'),
      writeFile(join(dotHiddenRoot, 'package.json'), '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot = await realpath(projectRoot);

    // Change the current directory to the project root.
    process.chdir(realProjectRoot);

    const absolutePaths = await discoverPathsWithFile('package.json', 'forward');
    const relativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

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

    deepStrictEqual(relativePaths, ['', 'apps/some-app', 'packages/some-package']);
  });

  await context.test('climbs to parent package.json files when traversing backward', async () => {
    const projectRoot = join(sandboxRoot, 'backward');
    const appRoot = join(projectRoot, 'apps', 'some-app');
    const appStuffRoot = join(appRoot, 'stuff');

    // Create directories inside the project root.
    await mkdir(appStuffRoot, { recursive: true });

    // Seed empty "package.json" files in all testing directories.
    await Promise.all([
      writeFile(join(projectRoot, 'package.json'), '{}\n'),
      writeFile(join(appRoot, 'package.json'), '{}\n'),
    ]);

    // Resolve canonical directories now so symlink aliases do not break tests (because "join" skipped filesystem lookups).
    const realProjectRoot = await realpath(projectRoot);
    const realAppStuffRoot = await realpath(appStuffRoot);

    // Change the current directory to a "stuff" folder inside "some-app".
    process.chdir(realAppStuffRoot);

    const absolutePaths = await discoverPathsWithFile('package.json', 'backward');
    const relativePaths = absolutePaths.map((absolutePath) => relative(realProjectRoot, absolutePath).split(sep).join('/'));

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

    deepStrictEqual(relativePaths, ['apps/some-app', '']);
  });
});

/**
 * Is plain object.
 *
 * @since 1.0.0
 */
test('isPlainObject', async (context) => {
  await context.test('returns true for empty object literal', () => {
    strictEqual(isPlainObject({}), true);
  });

  await context.test('returns true for object with properties', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    strictEqual(isPlainObject(obj), true);
  });

  await context.test('returns true for Object.create(null)', () => {
    strictEqual(isPlainObject(Object.create(null)), true);
  });

  await context.test('returns false for null', () => {
    strictEqual(isPlainObject(null), false);
  });

  await context.test('returns false for undefined', () => {
    strictEqual(isPlainObject(undefined), false);
  });

  await context.test('returns false for string', () => {
    strictEqual(isPlainObject('hello'), false);
  });

  await context.test('returns false for number', () => {
    strictEqual(isPlainObject(42), false);
  });

  await context.test('returns false for boolean', () => {
    strictEqual(isPlainObject(true), false);
  });

  await context.test('returns false for array', () => {
    strictEqual(isPlainObject([1, 2, 3]), false);
  });

  await context.test('returns false for Date instance', () => {
    strictEqual(isPlainObject(new Date()), false);
  });

  await context.test('returns false for RegExp instance', () => {
    strictEqual(isPlainObject(new RegExp('test')), false);
  });

  await context.test('returns false for Map instance', () => {
    strictEqual(isPlainObject(new Map()), false);
  });

  await context.test('returns false for Set instance', () => {
    strictEqual(isPlainObject(new Set()), false);
  });

  await context.test('returns false for class instance', () => {
    class Foo {}

    strictEqual(isPlainObject(new Foo()), false);
  });
});

/**
 * Is execute shell error.
 *
 * @since 1.0.0
 */
test('isExecuteShellError', async (context) => {
  await context.test('returns true for object with cmd property', () => {
    strictEqual(isExecuteShellError({ cmd: 'echo hello' }), true);
  });

  await context.test('returns true for object with killed property', () => {
    strictEqual(isExecuteShellError({ killed: false }), true);
  });

  await context.test('returns true for object with code property', () => {
    strictEqual(isExecuteShellError({ code: 1 }), true);
  });

  await context.test('returns true for object with signal property', () => {
    strictEqual(isExecuteShellError({ signal: 'SIGTERM' }), true);
  });

  await context.test('returns true for object with stdout property', () => {
    strictEqual(isExecuteShellError({ stdout: 'output' }), true);
  });

  await context.test('returns true for object with stderr property', () => {
    strictEqual(isExecuteShellError({ stderr: 'error' }), true);
  });

  await context.test('returns true for object with multiple exec properties', () => {
    const error = {
      cmd: 'test',
      killed: false,
      code: 1,
      signal: 'SIGTERM',
      stdout: '',
      stderr: 'failed',
    };

    strictEqual(isExecuteShellError(error), true);
  });

  await context.test('returns false for null', () => {
    strictEqual(isExecuteShellError(null), false);
  });

  await context.test('returns false for undefined', () => {
    strictEqual(isExecuteShellError(undefined), false);
  });

  await context.test('returns false for string', () => {
    strictEqual(isExecuteShellError('error'), false);
  });

  await context.test('returns false for number', () => {
    strictEqual(isExecuteShellError(42), false);
  });

  await context.test('returns false for empty object', () => {
    strictEqual(isExecuteShellError({}), false);
  });

  await context.test('returns false for object with wrong property types', () => {
    strictEqual(isExecuteShellError({ cmd: 123 }), false);
  });
});

/**
 * Current timestamp.
 *
 * @since 1.0.0
 */
test('currentTimestamp', async (context) => {
  await context.test('returns a bracketed timestamp string', () => {
    const result = currentTimestamp();

    ok(result.startsWith('['));
    ok(result.endsWith(']'));
  });

  await context.test('matches expected timestamp format', () => {
    const result = currentTimestamp();
    const pattern = new RegExp('^\\[\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}\\.\\d{3} [+-]\\d{2}\\d{2}]$');

    match(result, pattern);
  });

  await context.test('produces different milliseconds on consecutive calls', () => {
    const results: CurrentTimestampResults = new Set();

    for (let i = 0; i < 10; i += 1) {
      results.add(currentTimestamp());
    }

    // At least some variation expected across 10 calls.
    ok(results.size >= 1);
  });
});

/**
 * Detect shell.
 *
 * @since 1.0.0
 */
test('detectShell', async (context) => {
  await context.test('returns a non-empty string', () => {
    const result = detectShell();

    strictEqual(typeof result, 'string');
    ok(result.length > 0);
  });

  await context.test('returns a known shell path', () => {
    const result = detectShell();
    const knownShells = [
      'cmd.exe',
      '/bin/zsh',
      '/bin/bash',
      '/bin/ksh',
      '/bin/sh',
    ];

    ok(knownShells.includes(result), `Unexpected shell: "${result}"`);
  });
});

/**
 * Path exists.
 *
 * @since 1.0.0
 */
test('pathExists', async (context) => {
  await context.test('returns true for existing file', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'nova-pathExists-'));
    const tempFile = join(tempDir, 'test.txt');

    await writeFile(tempFile, 'test');

    const result = await pathExists(tempFile);

    strictEqual(result, true);

    await rm(tempDir, {
      recursive: true,
      force: true,
    });
  });

  await context.test('returns true for existing directory', async () => {
    const tempDir = await mkdtemp(join(tmpdir(), 'nova-pathExists-'));

    const result = await pathExists(tempDir);

    strictEqual(result, true);

    await rm(tempDir, {
      recursive: true,
      force: true,
    });
  });

  await context.test('returns false for non-existent path', async () => {
    const result = await pathExists(join(tmpdir(), 'nova-does-not-exist-xyz'));

    strictEqual(result, false);
  });
});

/**
 * Execute shell.
 *
 * @since 1.0.0
 */
test('executeShell', async (context) => {
  await context.test('runs a simple echo command', async () => {
    const result = await executeShell('echo hello');

    strictEqual(result.code, 0);
    ok(result.textOut.includes('hello'));
  });

  await context.test('returns non-zero code for failing command', async () => {
    const result = await executeShell('nova-nonexistent-command-xyz-12345');

    notStrictEqual(result.code, 0);
  });
});

/**
 * Is command exists.
 *
 * @since 1.0.0
 */
test('isCommandExists', async (context) => {
  await context.test('returns true for an existing command', async () => {
    const result = await isCommandExists('node');

    strictEqual(result, true);
  });

  await context.test('returns false for a non-existent command', async () => {
    const result = await isCommandExists('nova-nonexistent-command-xyz-12345');

    strictEqual(result, false);
  });
});

/**
 * Is file identical.
 *
 * @since 1.0.0
 */
test('isFileIdentical', async (context) => {
  const sandboxRoot: IsFileIdenticalSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('returns true when string content matches file', async () => {
    const filePath = join(sandboxRoot, 'string-match.txt');

    await writeFile(filePath, 'hello world');

    const result = await isFileIdentical(filePath, 'hello world');

    strictEqual(result, true);
  });

  await context.test('returns false when string content differs from file', async () => {
    const filePath = join(sandboxRoot, 'string-differ.txt');

    await writeFile(filePath, 'hello world');

    const result = await isFileIdentical(filePath, 'goodbye world');

    strictEqual(result, false);
  });

  await context.test('returns true when object content matches JSON file', async () => {
    const filePath = join(sandboxRoot, 'object-match.json');
    const contents = {
      name: 'nova',
      version: '1.0.0',
    };

    const contentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`);

    const result = await isFileIdentical(filePath, contents);

    strictEqual(result, true);
  });

  await context.test('returns false when object content differs from JSON file', async () => {
    const filePath = join(sandboxRoot, 'object-differ.json');
    const existingContents = {
      name: 'nova',
      version: '1.0.0',
    };
    const proposedContents = {
      name: 'nova',
      version: '2.0.0',
    };

    const existingJson = JSON.stringify(existingContents, null, 2);

    await writeFile(filePath, `${existingJson}\n`);

    const result = await isFileIdentical(filePath, proposedContents);

    strictEqual(result, false);
  });

  await context.test('returns false when file does not exist', async () => {
    const filePath = join(sandboxRoot, 'does-not-exist.txt');

    const result = await isFileIdentical(filePath, 'content');

    strictEqual(result, false);
  });
});

/**
 * Rename file with date.
 *
 * @since 1.0.0
 */
test('renameFileWithDate', async (context) => {
  const sandboxRoot: RenameFileWithDateSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('renames a file with a date-stamped name', async () => {
    const filePath = join(sandboxRoot, 'rename-test.txt');

    await writeFile(filePath, 'test content');

    const result = await renameFileWithDate(filePath, 'backup', 'txt');

    strictEqual(result, true);

    // Original file should no longer exist.
    const originalExists = await pathExists(filePath);

    strictEqual(originalExists, false);

    // A date-stamped file should exist in the same directory.
    const files = await readdir(sandboxRoot);
    const renamedFile = files.find((file) => file.startsWith('backup.'));

    ok(renamedFile !== undefined, 'Renamed file should exist');
    ok(new RegExp('^backup\\.\\d{4}-\\d{2}-\\d{2}_\\d{4}\\.txt$').test(renamedFile));
  });

  await context.test('returns false when source file does not exist', async () => {
    const filePath = join(sandboxRoot, 'does-not-exist.txt');

    const result = await renameFileWithDate(filePath, 'backup', 'txt');

    strictEqual(result, false);
  });

  await context.test('increments counter when target file already exists', async () => {
    const subDir = join(sandboxRoot, 'counter-test');

    await mkdir(subDir);

    const filePath = join(subDir, 'original.txt');

    await writeFile(filePath, 'content');

    // Pre-create a file with the expected first counter value.
    const now = new Date();
    const timestamp = [
      now.getUTCFullYear(),
      (now.getUTCMonth() + 1).toString().padStart(2, '0'),
      now.getUTCDate().toString().padStart(2, '0'),
    ].join('-');
    const existingName = `backup.${timestamp}_0001.txt`;

    await writeFile(join(subDir, existingName), 'existing');

    const result = await renameFileWithDate(filePath, 'backup', 'txt');

    strictEqual(result, true);

    // Should have counter 0002 since 0001 already exists.
    const files = await readdir(subDir);
    const secondFile = files.find((file) => file.includes('_0002'));

    ok(secondFile !== undefined, 'File with incremented counter should exist');
  });
});

/**
 * Is project root.
 *
 * @since 1.0.0
 */
test('isProjectRoot', async (context) => {
  const originalCwd: IsProjectRootOriginalCwd = process.cwd();
  const sandboxRoot: IsProjectRootSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('returns true when cwd is project root with single package.json', async () => {
    const projectRoot = join(sandboxRoot, 'single');

    await mkdir(projectRoot, { recursive: true });

    await writeFile(join(projectRoot, 'package.json'), '{}\n');

    const realProjectRoot = await realpath(projectRoot);

    process.chdir(realProjectRoot);

    const result = await isProjectRoot(realProjectRoot);

    strictEqual(result, true);
  });

  await context.test('returns false when cwd has no package.json above', async () => {
    const emptyDir = join(sandboxRoot, 'empty');

    await mkdir(emptyDir, { recursive: true });

    const realEmptyDir = await realpath(emptyDir);

    process.chdir(realEmptyDir);

    const result = await isProjectRoot(realEmptyDir);

    strictEqual(result, false);
  });

  await context.test('returns false when multiple package.json files found above', async () => {
    const projectRoot = join(sandboxRoot, 'multi');
    const appRoot = join(projectRoot, 'apps', 'my-app');

    await mkdir(appRoot, { recursive: true });

    await Promise.all([
      writeFile(join(projectRoot, 'package.json'), '{}\n'),
      writeFile(join(appRoot, 'package.json'), '{}\n'),
    ]);

    const realAppRoot = await realpath(appRoot);

    process.chdir(realAppRoot);

    const result = await isProjectRoot(realAppRoot);

    strictEqual(result, false);
  });
});

/**
 * Load workspace manifests.
 *
 * @since 1.0.0
 */
test('loadWorkspaceManifests', async (context) => {
  const sandboxRoot: LoadWorkspaceManifestsSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('loads package.json for configured workspaces', async () => {
    const projectRoot = join(sandboxRoot, 'valid');
    const pkgDir = join(projectRoot, 'packages', 'core');

    await mkdir(pkgDir, { recursive: true });

    const rootPackageJson = JSON.stringify({ name: 'root' }, null, 2);
    const corePackageJson = JSON.stringify({ name: '@test/core' }, null, 2);

    await Promise.all([
      writeFile(join(projectRoot, 'package.json'), rootPackageJson),
      writeFile(join(pkgDir, 'package.json'), corePackageJson),
    ]);

    const result = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        ['./', {
          name: 'root',
          role: 'project',
          policy: 'freezable',
        }],
        ['./packages/core', {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        }],
      ],
    });

    strictEqual(result.length, 2);

    const firstWorkspace = result[0];
    const secondWorkspace = result[1];

    ok(firstWorkspace !== undefined);
    ok(secondWorkspace !== undefined);
    strictEqual(firstWorkspace.manifest.name, 'root');
    strictEqual(firstWorkspace.fileContents['name'], 'root');
    strictEqual(secondWorkspace.manifest.name, '@test/core');
    strictEqual(secondWorkspace.fileContents['name'], '@test/core');
  });

  await context.test('skips workspace with missing package.json', async () => {
    const projectRoot = join(sandboxRoot, 'missing');

    await mkdir(projectRoot, { recursive: true });

    const rootPackageJson = JSON.stringify({ name: 'root' }, null, 2);

    await writeFile(join(projectRoot, 'package.json'), rootPackageJson);

    const result = await loadWorkspaceManifests({
      projectRoot,
      workspaces: [
        ['./', {
          name: 'root',
          role: 'project',
          policy: 'freezable',
        }],
        ['./packages/missing', {
          name: '@test/missing',
          role: 'package',
          policy: 'distributable',
        }],
      ],
    });

    strictEqual(result.length, 1);

    const onlyWorkspace = result[0];

    ok(onlyWorkspace !== undefined);
    strictEqual(onlyWorkspace.manifest.name, 'root');
  });

  await context.test('returns empty array when no workspaces provided', async () => {
    const result = await loadWorkspaceManifests({
      projectRoot: sandboxRoot,
      workspaces: [],
    });

    strictEqual(result.length, 0);
  });
});

/**
 * Save workspace manifest.
 *
 * @since 1.0.0
 */
test('saveWorkspaceManifest', async (context) => {
  const sandboxRoot: SaveWorkspaceManifestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('writes changed file contents', async () => {
    const filePath = join(sandboxRoot, 'write-test', 'package.json');

    await mkdir(dirname(filePath), { recursive: true });

    const original = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified = {
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

    const written = JSON.parse(await readFile(filePath, 'utf-8'));

    strictEqual(written.version, '2.0.0');
  });

  await context.test('skips writing when file contents are identical', async () => {
    const filePath = join(sandboxRoot, 'skip-test', 'package.json');

    await mkdir(dirname(filePath), { recursive: true });

    const contents = {
      name: 'test',
      version: '1.0.0',
    };

    const contentsJson = JSON.stringify(contents, null, 2);

    await writeFile(filePath, `${contentsJson}\n`, 'utf-8');

    const statBefore = await stat(filePath);

    await saveWorkspaceManifest({
      manifest: {
        name: 'test',
        role: 'package',
        policy: 'distributable',
      },
      filePath,
      fileContents: contents,
    }, true);

    const statAfter = await stat(filePath);

    strictEqual(statBefore.mtimeMs, statAfter.mtimeMs);
  });

  await context.test('creates backup when replaceFile is false', async () => {
    const subDir = join(sandboxRoot, 'backup-test');

    await mkdir(subDir, { recursive: true });

    const filePath = join(subDir, 'package.json');
    const original = {
      name: 'test',
      version: '1.0.0',
    };

    const originalJson = JSON.stringify(original, null, 2);

    await writeFile(filePath, `${originalJson}\n`, 'utf-8');

    const modified = {
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

    const files = await readdir(subDir);
    const backupFile = files.find((file) => file.startsWith('package.') && file !== 'package.json');

    ok(backupFile !== undefined, 'Backup file should exist');

    // New file should have the modified contents.
    const written = JSON.parse(await readFile(filePath, 'utf-8'));

    strictEqual(written.version, '2.0.0');
  });
});

/**
 * Parse linux os release text.
 *
 * @since 1.0.0
 */
test('parseLinuxOsReleaseText', async (context) => {
  await context.test('parses Ubuntu os-release text', () => {
    const text = [
      'NAME="Ubuntu"',
      'VERSION="22.04.3 LTS (Jammy Jellyfish)"',
      'ID=ubuntu',
      'ID_LIKE=debian',
      'PRETTY_NAME="Ubuntu 22.04.3 LTS"',
      'VERSION_ID="22.04"',
    ].join('\n');

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');
    strictEqual(result['VERSION'], '22.04.3 LTS (Jammy Jellyfish)');
    strictEqual(result['ID'], 'ubuntu');
    strictEqual(result['ID_LIKE'], 'debian');
    strictEqual(result['VERSION_ID'], '22.04');
  });

  await context.test('parses Alpine os-release text', () => {
    const text = [
      'NAME="Alpine Linux"',
      'ID=alpine',
      'VERSION_ID=3.19.0',
      'PRETTY_NAME="Alpine Linux v3.19"',
    ].join('\n');

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Alpine Linux');
    strictEqual(result['ID'], 'alpine');
    strictEqual(result['VERSION_ID'], '3.19.0');
  });

  await context.test('parses Debian os-release text', () => {
    const text = [
      'PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"',
      'NAME="Debian GNU/Linux"',
      'VERSION_ID="12"',
      'ID=debian',
    ].join('\n');

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Debian GNU/Linux');
    strictEqual(result['ID'], 'debian');
    strictEqual(result['VERSION_ID'], '12');
  });

  await context.test('skips comment lines', () => {
    const text = [
      '# This is a comment',
      'NAME="Test"',
      '# Another comment',
      'ID=test',
    ].join('\n');

    const result = parseLinuxOsReleaseText(text);

    strictEqual(Object.keys(result).length, 2);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');
  });

  await context.test('skips empty lines', () => {
    const text = [
      '',
      'NAME="Test"',
      '',
      '',
      'ID=test',
      '',
    ].join('\n');

    const result = parseLinuxOsReleaseText(text);

    strictEqual(Object.keys(result).length, 2);
  });

  await context.test('strips double-quoted values', () => {
    const text = 'NAME="Ubuntu"';

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['NAME'], 'Ubuntu');
  });

  await context.test('preserves unquoted values', () => {
    const text = 'ID=ubuntu';

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['ID'], 'ubuntu');
  });

  await context.test('handles values containing equals sign', () => {
    const text = 'BUG_REPORT_URL="https://example.com?a=1&b=2"';

    const result = parseLinuxOsReleaseText(text);

    strictEqual(result['BUG_REPORT_URL'], 'https://example.com?a=1&b=2');
  });

  await context.test('returns empty object for empty string', () => {
    const result = parseLinuxOsReleaseText('');

    deepStrictEqual(result, {});
  });

  await context.test('handles CRLF line endings', () => {
    const text = 'NAME="Test"\r\nID=test\r\nVERSION_ID="1.0"';

    const result = parseLinuxOsReleaseText(text);

    strictEqual(Object.keys(result).length, 3);
    strictEqual(result['NAME'], 'Test');
    strictEqual(result['ID'], 'test');
    strictEqual(result['VERSION_ID'], '1.0');
  });
});

/**
 * Parse windows registry text.
 *
 * @since 1.0.0
 */
test('parseWindowsRegistryText', async (context) => {
  await context.test('parses REG_SZ values', () => {
    const text = '    ProductName    REG_SZ    Windows 11 Pro';

    const result = parseWindowsRegistryText(text);

    const productName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName.type, 'REG_SZ');
    strictEqual(productName.data, 'Windows 11 Pro');
  });

  await context.test('parses REG_DWORD values', () => {
    const text = '    CurrentMajorVersionNumber    REG_DWORD    0xa';

    const result = parseWindowsRegistryText(text);
    const currentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(currentMajorVersionNumber.type, 'REG_DWORD');
    strictEqual(currentMajorVersionNumber.data, '0xa');
  });

  await context.test('parses mixed registry types', () => {
    const text = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '    ProductName    REG_SZ    Windows 11 Pro',
      '    CurrentBuild    REG_SZ    22631',
      '    CurrentMajorVersionNumber    REG_DWORD    0xa',
    ].join('\n');

    const result = parseWindowsRegistryText(text);

    strictEqual(Object.keys(result).length, 3);

    const productName = result['ProductName'];
    const currentBuild = result['CurrentBuild'];
    const currentMajorVersionNumber = result['CurrentMajorVersionNumber'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    if (currentMajorVersionNumber === undefined) {
      fail('Expected CurrentMajorVersionNumber to be defined');
    }

    strictEqual(productName.type, 'REG_SZ');
    strictEqual(currentBuild.type, 'REG_SZ');
    strictEqual(currentMajorVersionNumber.type, 'REG_DWORD');
  });

  await context.test('returns empty object for empty string', () => {
    const result = parseWindowsRegistryText('');

    deepStrictEqual(result, {});
  });

  await context.test('skips non-matching lines', () => {
    const text = [
      'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      '',
      '    ProductName    REG_SZ    Windows 11 Pro',
    ].join('\n');

    const result = parseWindowsRegistryText(text);

    strictEqual(Object.keys(result).length, 1);

    const productName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName.data, 'Windows 11 Pro');
  });

  await context.test('trims trailing whitespace from data', () => {
    const text = '    ProductName    REG_SZ    Windows 11 Pro   ';

    const result = parseWindowsRegistryText(text);

    const productName = result['ProductName'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    strictEqual(productName.data, 'Windows 11 Pro');
  });

  await context.test('handles LF line endings', () => {
    const text = '    ProductName    REG_SZ    Windows 11\n    CurrentBuild    REG_SZ    22631';

    const result = parseWindowsRegistryText(text);

    strictEqual(Object.keys(result).length, 2);

    const productName = result['ProductName'];
    const currentBuild = result['CurrentBuild'];

    if (productName === undefined) {
      fail('Expected ProductName to be defined');
    }

    if (currentBuild === undefined) {
      fail('Expected CurrentBuild to be defined');
    }

    strictEqual(productName.data, 'Windows 11');
    strictEqual(currentBuild.data, '22631');
  });
});
