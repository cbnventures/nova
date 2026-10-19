import {
  spawn,
  spawnSync,
} from 'node:child_process';
import { once } from 'node:events';
import {
  access,
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  delimiter,
  join,
  resolve,
} from 'node:path';

import {
  afterAll,
  describe,
  expect,
  it,
} from 'vitest';

const repositoryDirectory = process.cwd();
const novaCliPath = resolve(repositoryDirectory, 'packages', 'nova', 'bin', 'nova.mjs');
const novaRunWorkspacesPath = resolve(repositoryDirectory, 'scripts', 'nova-run-workspaces.mjs');
const temporaryDirectory = await mkdtemp(join(tmpdir(), 'nova-cli-integration-'));

/**
 * Tests - CLI - Command Lifecycle - Collect Output.
 *
 * Combines both child streams so assertions remain independent of whether
 * a command reports through Commander or Nova's Logger.
 *
 * @param {import('node:child_process').SpawnSyncReturns<string>} result - Result.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function collectOutput(result) {
  return `${result.stdout}${result.stderr}`;
}

/**
 * Tests - CLI - Command Lifecycle - Create Project.
 *
 * Creates the smallest project root accepted by config-free Nova commands.
 * Individual tests add only the files required by their command family.
 *
 * @param {string} directory - Directory.
 * @param {string} name      - Name.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function createProject(directory, name) {
  await mkdir(directory, { recursive: true });

  const packageJsonContents = JSON.stringify({
    name,
    private: true,
  }, null, 2);
  const packageJsonPath = join(directory, 'package.json');

  await writeFile(packageJsonPath, `${packageJsonContents}\n`, 'utf-8');

  return;
}

/**
 * Tests - CLI - Command Lifecycle - Path Exists.
 *
 * Checks filesystem effects without coupling tests to a particular error code.
 * Missing paths return false while unexpected access failures stay isolated.
 *
 * @param {string} filePath - File path.
 *
 * @returns {Promise<boolean>}
 *
 * @since 0.0.0
 */
async function pathExists(filePath) {
  try {
    await access(filePath);

    return true;
  } catch {
    return false;
  }
}

/**
 * Tests - CLI - Command Lifecycle - Run Nova.
 *
 * Starts the compiled public executable in a separate process, matching the
 * process boundary used by consumers instead of importing a Runner directly.
 *
 * @param {string}            currentDirectory - Current directory.
 * @param {string[]}          commandArguments - Command arguments.
 * @param {NodeJS.ProcessEnv} [environment]    - Environment.
 *
 * @returns {import('node:child_process').SpawnSyncReturns<string>}
 *
 * @since 0.0.0
 */
function runNova(currentDirectory, commandArguments, environment = {}) {
  return spawnSync(process.execPath, [
    novaCliPath,
    ...commandArguments,
  ], {
    cwd: currentDirectory,
    encoding: 'utf-8',
    env: {
      ...process.env,
      ...environment,
      NO_COLOR: '1',
    },
  });
}

/**
 * Tests - CLI - Command Lifecycle - Compiled Nova CLI Integration.
 *
 * Exercises complete command lifecycles through the compiled executable while
 * keeping every filesystem mutation isolated inside a temporary directory.
 *
 * @since 0.0.0
 */
describe('Compiled Nova CLI integration', () => {
  afterAll(async () => {
    await rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('loads the binary and registers every command group', () => {
    const helpCommands = [
      ['--help'],
      [
        'generate',
        '--help',
      ],
      [
        'recipe',
        '--help',
      ],
      [
        'scaffold',
        '--help',
      ],
      [
        'utility',
        '--help',
      ],
    ];

    for (const helpCommand of helpCommands) {
      const result = runNova(temporaryDirectory, helpCommand);

      expect(result.error).toBeUndefined();

      expect(result.status).toBe(0);

      expect(collectOutput(result)).toContain('Usage:');
    }

    return;
  });

  it('documents the Apple bundle identifier option', () => {
    const result = runNova(temporaryDirectory, [
      'scaffold',
      'app',
      'apple',
      '--help',
    ]);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    expect(collectOutput(result)).toContain('--bundle-id <id>');

    return;
  });

  it('documents the serverless tool target option', () => {
    const result = runNova(temporaryDirectory, [
      'scaffold',
      'tool',
      'serverless',
      '--help',
    ]);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    expect(collectOutput(result)).toContain('--target <target>');

    return;
  });

  it('forwards force through the source-first workspace runner', async () => {
    const projectDirectory = join(temporaryDirectory, 'source-first-workspace-runner');
    const workspaceDirectory = join(projectDirectory, 'packages', 'example');

    await mkdir(workspaceDirectory, { recursive: true });

    await Promise.all([
      writeFile(join(projectDirectory, 'package.json'), `${JSON.stringify({
        name: 'source-first-workspace-runner',
        packageManager: 'npm@11.6.0',
        private: true,
        workspaces: ['packages/*'],
      }, null, 2)}\n`, 'utf-8'),
      writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
        project: {
          name: {
            slug: 'source-first-workspace-runner',
          },
        },
        workspaces: {
          './packages/example': {
            name: 'example',
            policy: 'trackable',
            role: 'package',
          },
        },
      }, null, 2)}\n`, 'utf-8'),
      writeFile(join(workspaceDirectory, 'package.json'), `${JSON.stringify({
        name: 'example',
        private: true,
        scripts: {
          check: 'node --version',
        },
        version: '0.0.0',
      }, null, 2)}\n`, 'utf-8'),
    ]);

    const result = spawnSync(process.execPath, [
      novaRunWorkspacesPath,
      '--force',
      '--dry-run',
      'check',
    ], {
      cwd: projectDirectory,
      encoding: 'utf-8',
      env: {
        ...process.env,
        NO_COLOR: '1',
      },
    });

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    expect(collectOutput(result)).toContain('Dry run complete. No workspace scripts were executed.');

    return;
  });

  it('registers the unified ignore-files generator', () => {
    const helpResult = runNova(temporaryDirectory, [
      'generate',
      'must-haves',
      '--help',
    ]);
    const helpOutput = collectOutput(helpResult);

    expect(helpResult.error).toBeUndefined();

    expect(helpResult.status).toBe(0);

    expect(helpOutput).toContain('ignore-files');

    return;
  });

  it('rejects an unknown command with a nonzero exit code', () => {
    const result = runNova(temporaryDirectory, ['unknown-command']);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(1);

    expect(collectOutput(result)).toContain('Unknown command');

    return;
  });

  it.skipIf(process.platform === 'win32')('stops parallel lifecycle scripts cleanly when the user presses Ctrl+C', async () => {
    const projectDirectory = join(temporaryDirectory, 'interrupt-parallel-scripts');
    const childPidPath = join(projectDirectory, 'child.pid');
    const waitScriptPath = join(projectDirectory, 'wait.mjs');

    await createProject(projectDirectory, 'interrupt-parallel-scripts');

    await writeFile(waitScriptPath, [
      'import { writeFileSync } from \'node:fs\';',
      '',
      'writeFileSync(\'child.pid\', String(process.pid));',
      '',
      'process.stdout.write(\'ready\' + String.fromCharCode(10));',
      '',
      'setInterval(() => undefined, 1000);',
      '',
    ].join('\n'), 'utf-8');

    const packageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents = JSON.stringify({
      name: 'interrupt-parallel-scripts',
      private: true,
      scripts: {
        'dev': `${JSON.stringify(process.execPath)} ${JSON.stringify(novaCliPath)} utility run-scripts --parallel "dev:*"`,
        'dev:wait': `${JSON.stringify(process.execPath)} ./wait.mjs`,
      },
    }, null, 2);

    await writeFile(packageJsonPath, `${packageJsonContents}\n`, 'utf-8');

    const npmProcess = spawn('npm', [
      'run',
      'dev',
    ], {
      cwd: projectDirectory,
      detached: true,
      env: {
        ...process.env,
        NO_COLOR: '1',
      },
      stdio: 'pipe',
    });
    const closePromise = once(npmProcess, 'close');

    let output = '';

    npmProcess.stdout.on('data', (data) => {
      output += data.toString();

      return;
    });

    npmProcess.stderr.on('data', (data) => {
      output += data.toString();

      return;
    });

    try {
      await expect.poll(() => output, {
        timeout: 5000,
      }).toContain('ready');

      if (npmProcess.pid === undefined) {
        throw new Error('The run-scripts lifecycle process did not expose a process identifier.');
      }

      process.kill(-npmProcess.pid, 'SIGINT');

      const closeResult = await closePromise;
      const exitCode = closeResult[0];
      const exitSignal = closeResult[1];

      if (exitCode === null) {
        expect(exitSignal).toBe('SIGINT');
      } else {
        expect(exitCode).toBe(0);

        expect(exitSignal).toBeNull();
      }

      expect(output).toContain('Scripts stopped.');

      expect(output).not.toContain('Lifecycle script `dev` failed');

      expect(output).not.toContain('Failed scripts:');

      expect(output).not.toContain('exit code 130');

      const childPid = Number(await readFile(childPidPath, 'utf-8'));

      await expect.poll(() => {
        try {
          process.kill(childPid, 0);

          return true;
        } catch {
          return false;
        }
      }, {
        timeout: 5000,
      }).toBe(false);
    } finally {
      if (npmProcess.pid !== undefined) {
        try {
          process.kill(-npmProcess.pid, 'SIGKILL');
        } catch {
          // The process group already exited cleanly.
        }
      }
    }

    return;
  });

  it('runs a generator dry run before creating the requested file', async () => {
    const projectDirectory = join(temporaryDirectory, 'generator');

    await createProject(projectDirectory, 'generator-project');

    const editorconfigPath = join(projectDirectory, '.editorconfig');
    const dryRunResult = runNova(projectDirectory, [
      'generate',
      'must-haves',
      'editorconfig',
      '--dry-run',
    ]);

    expect(dryRunResult.error).toBeUndefined();

    expect(dryRunResult.status).toBe(0);

    expect(await pathExists(editorconfigPath)).toBe(false);

    const writeResult = runNova(projectDirectory, [
      'generate',
      'must-haves',
      'editorconfig',
    ]);

    expect(writeResult.error).toBeUndefined();

    expect(writeResult.status).toBe(0);

    expect(await pathExists(editorconfigPath)).toBe(true);

    const editorconfigContents = await readFile(editorconfigPath, 'utf-8');

    expect(editorconfigContents).toContain('root = true');

    return;
  });

  it('describes base scaffold file creation during a dry run', async () => {
    const projectDirectory = join(temporaryDirectory, 'base-preview-output');
    const runnerDirectory = join(temporaryDirectory, 'base-preview-runner');

    await mkdir(runnerDirectory, { recursive: true });

    const result = runNova(runnerDirectory, [
      'scaffold',
      'starter',
      'base',
      '--dry-run',
      '--non-interactive',
      '--no-install',
      '--name',
      'base-preview-output',
      '--output',
      projectDirectory,
    ]);
    const output = collectOutput(result);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    expect(output).toContain('Would create monorepo root at');

    expect(output).toContain('Preview complete. No files were written.');

    expect(await pathExists(projectDirectory)).toBe(false);

    return;
  });

  it('reports an existing scaffold destination instead of claiming file ownership', async () => {
    const projectDirectory = join(temporaryDirectory, 'existing-destination-output');
    const runnerDirectory = join(temporaryDirectory, 'existing-destination-runner');

    await mkdir(projectDirectory, { recursive: true });
    await mkdir(runnerDirectory, { recursive: true });

    const result = runNova(runnerDirectory, [
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--no-install',
      '--name',
      'existing-destination-output',
      '--output',
      projectDirectory,
    ]);
    const output = collectOutput(result);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(1);

    expect(output).toContain('The monorepo destination');

    expect(output).toContain('already exists');

    expect(output).toContain('A new monorepo scaffold requires a new directory');

    expect(output).not.toContain('files Nova does not own');

    return;
  });

  it('reports an existing workspace destination before checking template files', async () => {
    const projectDirectory = join(temporaryDirectory, 'existing-workspace-root');
    const workspaceDirectory = join(projectDirectory, 'apps', 'vite');
    const scaffoldResult = runNova(temporaryDirectory, [
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--no-install',
      '--name',
      'existing-workspace-root',
      '--output',
      projectDirectory,
    ]);

    expect(scaffoldResult.error).toBeUndefined();

    expect(scaffoldResult.status).toBe(0);

    await mkdir(workspaceDirectory, { recursive: true });

    const result = runNova(projectDirectory, [
      'scaffold',
      'app',
      'vite',
      '--non-interactive',
      '--no-install',
      '--workspace-name',
      'vite',
      '--framework',
      'vanilla',
      '--output',
      workspaceDirectory,
    ]);
    const output = collectOutput(result);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(1);

    expect(output).toContain('The workspace destination');

    expect(output).toContain('already exists');

    expect(output).toContain('different --output path for the new workspace');

    expect(output).not.toContain('files Nova does not own');

    return;
  });

  it('checks, previews, applies, and rechecks a recipe', async () => {
    const projectDirectory = join(temporaryDirectory, 'recipe');

    await createProject(projectDirectory, 'recipe-project');

    const markdownPath = join(projectDirectory, 'README.md');
    const originalContents = [
      '|Name|Value',
      '|---|---',
      '|Nova|CLI',
      '',
    ].join('\n');

    await writeFile(markdownPath, originalContents, 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
      recipes: {
        miscellaneous: {
          'fix-markdown-tables': {
            enabled: true,
          },
        },
      },
    }, null, 2)}\n`, 'utf-8');

    const checkResult = runNova(projectDirectory, [
      'recipe',
      'miscellaneous',
      'fix-markdown-tables',
      '--check',
    ]);

    expect(checkResult.error).toBeUndefined();

    expect(checkResult.status).toBe(1);

    expect(await readFile(markdownPath, 'utf-8')).toBe(originalContents);

    const dryRunResult = runNova(projectDirectory, [
      'recipe',
      'miscellaneous',
      'fix-markdown-tables',
      '--dry-run',
    ]);

    expect(dryRunResult.error).toBeUndefined();

    expect(dryRunResult.status).toBe(0);

    expect(await readFile(markdownPath, 'utf-8')).toBe(originalContents);

    const aliasResult = runNova(projectDirectory, [
      'rcp',
      'misc',
      'fix-md-tables',
      '--dry-run',
    ]);

    expect(aliasResult.error).toBeUndefined();

    expect(aliasResult.status).toBe(0);

    expect(await readFile(markdownPath, 'utf-8')).toBe(originalContents);

    const writeResult = runNova(projectDirectory, [
      'recipe',
      'miscellaneous',
      'fix-markdown-tables',
    ]);

    expect(writeResult.error).toBeUndefined();

    expect(writeResult.status).toBe(0);

    const formattedContents = await readFile(markdownPath, 'utf-8');

    expect(formattedContents).not.toBe(originalContents);

    expect(formattedContents).toContain('| Nova | CLI   |');

    const recheckResult = runNova(projectDirectory, [
      'recipe',
      'miscellaneous',
      'fix-markdown-tables',
      '--check',
    ]);

    expect(recheckResult.error).toBeUndefined();

    expect(recheckResult.status).toBe(0);

    expect(await readFile(markdownPath, 'utf-8')).toBe(formattedContents);

    return;
  });

  it('previews and applies operating-system cleanup through its alias', async () => {
    const projectDirectory = join(temporaryDirectory, 'operating-system-files');

    await createProject(projectDirectory, 'operating-system-files-project');

    const configContents = JSON.stringify({
      recipes: {
        miscellaneous: {
          'remove-operating-system-files': {
            enabled: true,
            settings: {
              macos: {
                desktopServicesStore: true,
              },
            },
          },
        },
      },
    }, null, 2);
    const filePath = join(projectDirectory, '.DS_Store');

    await writeFile(join(projectDirectory, 'nova.config.json'), `${configContents}\n`, 'utf-8');
    await writeFile(filePath, '', 'utf-8');

    const dryRunResult = runNova(projectDirectory, [
      'rcp',
      'misc',
      'remove-os-files',
      '--dry-run',
    ]);

    expect(dryRunResult.error).toBeUndefined();

    expect(dryRunResult.status).toBe(0);

    expect(await pathExists(filePath)).toBe(true);

    const writeResult = runNova(projectDirectory, [
      'recipe',
      'miscellaneous',
      'remove-operating-system-files',
    ]);

    expect(writeResult.error).toBeUndefined();

    expect(writeResult.status).toBe(0);

    expect(await pathExists(filePath)).toBe(false);

    return;
  });

  it('applies registered recipes through the batch utility', async () => {
    const projectDirectory = join(temporaryDirectory, 'batch-recipes');
    const scaffoldResult = runNova(temporaryDirectory, [
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--name',
      'batch-recipes',
      '--output',
      projectDirectory,
      '--no-install',
    ]);

    expect(scaffoldResult.error).toBeUndefined();

    expect(scaffoldResult.status).toBe(0);

    const markdownPath = join(projectDirectory, 'README.md');
    const originalContents = [
      '|Name|Value',
      '|---|---',
      '|Nova|CLI',
      '',
    ].join('\n');

    await writeFile(markdownPath, originalContents, 'utf-8');

    const writeResult = runNova(projectDirectory, [
      'utility',
      'run-recipes',
      '--replace-file',
    ]);

    expect(writeResult.error).toBeUndefined();

    expect(writeResult.status).toBe(0);

    const formattedContents = await readFile(markdownPath, 'utf-8');

    expect(formattedContents).not.toBe(originalContents);

    expect(formattedContents).toContain('| Nova | CLI   |');

    const recheckResult = runNova(projectDirectory, [
      'utility',
      'run-recipes',
      '--replace-file',
    ]);

    expect(recheckResult.error).toBeUndefined();

    expect(recheckResult.status).toBe(0);

    expect(await readFile(markdownPath, 'utf-8')).toBe(formattedContents);

    return;
  });

  it('keeps Android generator logs out of scaffold progress output', async () => {
    const commandDirectory = join(temporaryDirectory, 'android-command');
    const projectDirectory = join(temporaryDirectory, 'android-output');
    const runnerDirectory = join(temporaryDirectory, 'android-runner');

    await mkdir(commandDirectory, { recursive: true });
    await mkdir(runnerDirectory, { recursive: true });

    const androidPath = join(commandDirectory, 'android');
    const androidContents = [
      '#!/usr/bin/env node',
      'process.stdout.write(\'INFO: noisy Android stdout\' + String.fromCharCode(10));',
      'process.stderr.write(\'INFO: noisy Android stderr\' + String.fromCharCode(10));',
      '',
    ].join('\n');

    await writeFile(androidPath, androidContents, 'utf-8');
    await chmod(androidPath, Number.parseInt('755', 8));

    const result = runNova(runnerDirectory, [
      'scaffold',
      'app',
      'android',
      '--non-interactive',
      '--no-install',
      '--name',
      'android-output',
      '--workspace-name',
      'android',
      '--application-id',
      'io.cbnventures.androidoutput',
      '--output',
      projectDirectory,
    ], {
      PATH: `${commandDirectory}${delimiter}${process.env['PATH'] ?? ''}`,
    });
    const output = collectOutput(result);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    expect(output).toContain('Android scaffold ready');

    expect(output).not.toContain('INFO: noisy Android stdout');

    expect(output).not.toContain('INFO: noisy Android stderr');

    expect(await pathExists(join(projectDirectory, 'package.json'))).toBe(true);

    return;
  });

  it('runs a matching package script through long and short utility options', async () => {
    const projectDirectory = join(temporaryDirectory, 'utility');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonContents = JSON.stringify({
      name: 'utility-project',
      private: true,
      scripts: {
        'integration:marker': 'node -e "require(\'node:fs\').writeFileSync(\'marker.txt\', process.env.NODE_ENV ?? \'\')"',
      },
    }, null, 2);
    const packageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJsonContents}\n`, 'utf-8');

    const result = runNova(projectDirectory, [
      'utility',
      'run-scripts',
      'integration:*',
      '--sequential',
      '--node-env',
      'test',
    ]);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    const markerPath = join(projectDirectory, 'marker.txt');

    expect(await readFile(markerPath, 'utf-8')).toBe('test');

    const shorthandResult = runNova(projectDirectory, [
      'utility',
      'run-scripts',
      'integration:*',
      '-s',
      '-n',
      'development',
    ]);

    expect(shorthandResult.error).toBeUndefined();

    expect(shorthandResult.status).toBe(0);

    expect(await readFile(markerPath, 'utf-8')).toBe('development');

    return;
  });

  it('fails without creating files outside a project root', async () => {
    const projectDirectory = join(temporaryDirectory, 'outside-project');

    await mkdir(projectDirectory, { recursive: true });

    const result = runNova(projectDirectory, [
      'generate',
      'must-haves',
      'editorconfig',
    ]);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(1);

    expect(await pathExists(join(projectDirectory, '.editorconfig'))).toBe(false);

    return;
  });

  return;
});
