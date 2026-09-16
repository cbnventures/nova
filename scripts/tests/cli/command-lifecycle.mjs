import { spawnSync } from 'node:child_process';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import {
  afterAll,
  describe,
  expect,
  it,
} from 'vitest';

const repositoryDirectory = process.cwd();
const novaCliPath = resolve(repositoryDirectory, 'packages', 'nova', 'bin', 'nova.mjs');
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
 * @param {string}   currentDirectory - Current directory.
 * @param {string[]} commandArguments - Command arguments.
 *
 * @returns {import('node:child_process').SpawnSyncReturns<string>}
 *
 * @since 0.0.0
 */
function runNova(currentDirectory, commandArguments) {
  return spawnSync(process.execPath, [
    novaCliPath,
    ...commandArguments,
  ], {
    cwd: currentDirectory,
    encoding: 'utf-8',
    env: {
      ...process.env,
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

  it('rejects an unknown command with a nonzero exit code', () => {
    const result = runNova(temporaryDirectory, ['unknown-command']);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(1);

    expect(collectOutput(result)).toContain('Unknown command');

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
      'fix-markdown-tables',
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

  it('runs a matching package script through the utility command', async () => {
    const projectDirectory = join(temporaryDirectory, 'utility');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonContents = JSON.stringify({
      name: 'utility-project',
      private: true,
      scripts: {
        'integration:marker': 'node -e "require(\'node:fs\').writeFileSync(\'marker.txt\', \'done\')"',
      },
    }, null, 2);
    const packageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJsonContents}\n`, 'utf-8');

    const result = runNova(projectDirectory, [
      'utility',
      'run-scripts',
      'integration:*',
      '--sequential',
    ]);

    expect(result.error).toBeUndefined();

    expect(result.status).toBe(0);

    const markerPath = join(projectDirectory, 'marker.txt');

    expect(await readFile(markerPath, 'utf-8')).toBe('done');

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
