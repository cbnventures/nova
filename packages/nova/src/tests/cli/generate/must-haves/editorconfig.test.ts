import { ok, strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { CliGenerateMustHavesEditorconfig } from '../../../../cli/generate/must-haves/editorconfig.js';
import * as utility from '../../../../lib/utility.js';

import type {
  TestsCliGenerateMustHavesEditorconfigRunEditorconfigPath,
  TestsCliGenerateMustHavesEditorconfigRunExists,
  TestsCliGenerateMustHavesEditorconfigRunHeaderArg,
  TestsCliGenerateMustHavesEditorconfigRunOriginalCwd,
  TestsCliGenerateMustHavesEditorconfigRunPackageJson,
  TestsCliGenerateMustHavesEditorconfigRunPackageJsonPath,
  TestsCliGenerateMustHavesEditorconfigRunProjectDirectory,
  TestsCliGenerateMustHavesEditorconfigRunSandboxRoot,
  TestsCliGenerateMustHavesEditorconfigRunSaveCalls,
  TestsCliGenerateMustHavesEditorconfigRunSaveSpy,
  TestsCliGenerateMustHavesEditorconfigRunTargetCall,
  TestsCliGenerateMustHavesEditorconfigRunTemporaryDirectory,
  TestsCliGenerateMustHavesEditorconfigRunTemporaryPrefix,
} from '../../../../types/tests/cli/generate/must-haves/editorconfig.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Editorconfig - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesEditorconfig.run', async () => {
  const originalCwd: TestsCliGenerateMustHavesEditorconfigRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliGenerateMustHavesEditorconfigRunTemporaryDirectory = tmpdir();
  const temporaryPrefix: TestsCliGenerateMustHavesEditorconfigRunTemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliGenerateMustHavesEditorconfigRunSandboxRoot = await mkdtemp(temporaryPrefix);

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    const projectDirectory: TestsCliGenerateMustHavesEditorconfigRunProjectDirectory = join(sandboxRoot, 'not-project-root');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliGenerateMustHavesEditorconfig.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliGenerateMustHavesEditorconfigRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesEditorconfigRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesEditorconfigRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesEditorconfig.run({ dryRun: true });

    let exists: TestsCliGenerateMustHavesEditorconfigRunExists = true;

    try {
      const editorconfigPath: TestsCliGenerateMustHavesEditorconfigRunEditorconfigPath = join(projectDirectory, '.editorconfig');

      await access(editorconfigPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('generates file from template', async () => {
    const projectDirectory: TestsCliGenerateMustHavesEditorconfigRunProjectDirectory = join(sandboxRoot, 'generates-file');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliGenerateMustHavesEditorconfigRunPackageJson = JSON.stringify({ name: 'test' }, null, 2);

    const packageJsonPath: TestsCliGenerateMustHavesEditorconfigRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesEditorconfig.run({});

    const editorconfigPath: TestsCliGenerateMustHavesEditorconfigRunEditorconfigPath = join(projectDirectory, '.editorconfig');

    await access(editorconfigPath);

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const projectDirectory: TestsCliGenerateMustHavesEditorconfigRunProjectDirectory = join(sandboxRoot, 'header-metadata');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), JSON.stringify({ name: 'test' }));

    process.chdir(projectDirectory);

    const saveSpy: TestsCliGenerateMustHavesEditorconfigRunSaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesEditorconfig.run({ replaceFile: true });

    const calls: TestsCliGenerateMustHavesEditorconfigRunSaveCalls = saveSpy['mock']['calls'];

    const targetCall: TestsCliGenerateMustHavesEditorconfigRunTargetCall = calls.find((call) => typeof call[0] === 'string' && call[0].endsWith('/.editorconfig'));

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for .editorconfig');

    const headerArg: TestsCliGenerateMustHavesEditorconfigRunHeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves editorconfig');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/editorconfig');
    strictEqual(headerArg['mode'], 'strict');

    return;
  });

  return;
});
