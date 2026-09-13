import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/**
 * Check Scaffolds - Find Tarball.
 *
 * Finds the package archive produced by npm pack without coupling the smoke
 * test to the current lock-step package version.
 *
 * @param {string} directory   - Directory.
 * @param {string} packageStem - Package stem.
 *
 * @returns {string}
 *
 * @since UNRELEASED
 */
function findTarball(directory, packageStem) {
  const tarballName = readdirSync(directory).find((entry) => {
    return entry.startsWith(packageStem) === true && entry.endsWith('.tgz') === true;
  });

  if (tarballName === undefined) {
    throw new Error(`Unable to find the packed archive for "${packageStem}" in "${directory}".`);
  }

  return join(directory, tarballName);
}

/**
 * Check Scaffolds - Read Command Output.
 *
 * Runs one consumer command while capturing stdout so package-boundary checks
 * can verify the installed executable rather than only its process exit code.
 *
 * @param {string}   command - Command.
 * @param {string[]} args    - Args.
 * @param {string}   cwd     - Cwd.
 *
 * @returns {string}
 *
 * @since UNRELEASED
 */
function readCommandOutput(command, args, cwd) {
  return execFileSync(command, args, {
    cwd,
    encoding: 'utf-8',
  });
}

/**
 * Check Scaffolds - Run Command.
 *
 * Runs one consumer command with inherited output so failures retain the
 * framework's original diagnostic and exit code.
 *
 * @param {string}   command - Command.
 * @param {string[]} args    - Args.
 * @param {string}   cwd     - Cwd.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function runCommand(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  });

  return;
}

/**
 * Check Scaffolds - Verify Workspace Registrations.
 *
 * Confirms that public scaffold commands preserve every workspace and use one
 * canonical identity in both nova.config.json and each workspace package.json.
 *
 * @param {string}                 projectDirectory   - Project directory.
 * @param {Record<string, string>} expectedWorkspaces - Expected workspaces.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function verifyWorkspaceRegistrations(projectDirectory, expectedWorkspaces) {
  const config = JSON.parse(readFileSync(join(projectDirectory, 'nova.config.json'), 'utf-8'));
  const configWorkspaces = config['workspaces'];

  for (const expectedWorkspaceEntry of Object.entries(expectedWorkspaces)) {
    const workspacePath = expectedWorkspaceEntry[0];
    const expectedName = expectedWorkspaceEntry[1];
    const registeredWorkspace = configWorkspaces[workspacePath];

    if (registeredWorkspace === undefined || registeredWorkspace['name'] !== expectedName) {
      throw new Error(`Workspace "${workspacePath}" should be registered as "${expectedName}".`);
    }

    if (workspacePath !== './') {
      const packageDirectory = (workspacePath.startsWith('./') === true) ? workspacePath.slice(2) : workspacePath;
      const packageJson = JSON.parse(readFileSync(join(projectDirectory, packageDirectory, 'package.json'), 'utf-8'));

      if (packageJson['name'] !== expectedName) {
        throw new Error(`Workspace "${workspacePath}" package.json should be named "${expectedName}".`);
      }
    }
  }

  return;
}

/**
 * Check Scaffolds - Check Scaffolds.
 *
 * Builds and packs the current Nova workspaces, generates every supported
 * scaffold into one clean monorepo, installs it, and exercises each applicable
 * check, lint, test, and production build command.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function checkScaffolds() {
  const repositoryDirectory = process.cwd();
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-scaffold-smoke-'));
  const projectDirectory = join(temporaryDirectory, 'project');
  const directProjectDirectory = join(temporaryDirectory, 'direct-project');
  const novaCliPath = join(repositoryDirectory, 'packages', 'nova', 'bin', 'nova.mjs');

  try {
    runCommand('npm', [
      'run',
      'build',
      '--workspace',
      '@cbnventures/nova',
      '--workspace',
      '@cbnventures/docusaurus-preset-nova',
    ], repositoryDirectory);

    runCommand('npm', [
      'pack',
      '--silent',
      '--workspace',
      '@cbnventures/nova',
      '--workspace',
      '@cbnventures/docusaurus-preset-nova',
      '--pack-destination',
      temporaryDirectory,
    ], repositoryDirectory);

    const novaTarballPath = findTarball(temporaryDirectory, 'cbnventures-nova-');
    const docusaurusPresetTarballPath = findTarball(temporaryDirectory, 'cbnventures-docusaurus-preset-nova-');

    // Prove that starter base is optional: this one command creates the root
    // and its first workspace together.
    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'vite',
      '--non-interactive',
      '--name',
      'direct-smoke',
      '--workspace-name',
      'web',
      '--output',
      './direct-project',
    ], temporaryDirectory);

    verifyWorkspaceRegistrations(directProjectDirectory, {
      './': 'direct-smoke-project',
      './apps/web': 'direct-smoke-app-web',
    });

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--name',
      'scaffold-smoke',
      '--output',
      './project',
    ], temporaryDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'expressjs',
      '--non-interactive',
      '--workspace-name',
      'express',
      '--output',
      './apps/express',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'nextjs',
      '--non-interactive',
      '--workspace-name',
      'nextjs',
      '--output',
      './apps/nextjs',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'vite',
      '--non-interactive',
      '--workspace-name',
      'vite',
      '--output',
      './apps/vite',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'workers',
      '--non-interactive',
      '--workspace-name',
      'workers',
      '--output',
      './apps/workers',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'docs',
      'docusaurus',
      '--non-interactive',
      '--workspace-name',
      'docs',
      '--output',
      './apps/docs',
      '--preset',
      'foundry',
    ], projectDirectory);

    verifyWorkspaceRegistrations(projectDirectory, {
      './': 'scaffold-smoke-project',
      './apps/express': 'scaffold-smoke-app-express',
      './apps/nextjs': 'scaffold-smoke-app-nextjs',
      './apps/vite': 'scaffold-smoke-app-vite',
      './apps/workers': 'scaffold-smoke-app-workers',
      './apps/docs': 'scaffold-smoke-docs',
    });

    runCommand('npm', [
      'pkg',
      'set',
      `devDependencies.@cbnventures/nova=file:${novaTarballPath}`,
    ], directProjectDirectory);

    runCommand('npm', [
      'pkg',
      'set',
      `devDependencies.@cbnventures/nova=file:${novaTarballPath}`,
    ], projectDirectory);

    runCommand('npm', [
      'pkg',
      'set',
      `dependencies.@cbnventures/docusaurus-preset-nova=file:${docusaurusPresetTarballPath}`,
      `devDependencies.@cbnventures/nova=file:${novaTarballPath}`,
      '--workspace',
      './apps/docs',
    ], projectDirectory);

    runCommand('npm', [
      'install',
      '--prefer-offline',
    ], projectDirectory);

    runCommand('npm', [
      'install',
      '--prefer-offline',
    ], directProjectDirectory);

    const novaPackageJson = JSON.parse(readFileSync(join(repositoryDirectory, 'packages', 'nova', 'package.json'), 'utf-8'));
    const novaVersion = novaPackageJson['version'];
    const novaHelpOutput = readCommandOutput('npm', [
      'exec',
      '--offline',
      '--',
      'nova',
      '--help',
    ], directProjectDirectory);

    process.stdout.write(novaHelpOutput);

    if (
      novaHelpOutput.includes(`Nova v${novaVersion}`) === false
      || novaHelpOutput.includes('Usage: nova') === false
    ) {
      throw new Error(`Installed Nova executable should report version "${novaVersion}" and render its help menu.`);
    }

    const docusaurusPresetPackageJson = JSON.parse(readFileSync(join(repositoryDirectory, 'packages', 'docusaurus-preset-nova', 'package.json'), 'utf-8'));
    const docusaurusPresetVersion = docusaurusPresetPackageJson['version'];
    const themeNovaHelpOutput = readCommandOutput('npm', [
      'exec',
      '--offline',
      '--workspace',
      './apps/docs',
      '--',
      'theme-nova',
      '--help',
    ], projectDirectory);

    process.stdout.write(themeNovaHelpOutput);

    if (
      themeNovaHelpOutput.includes(`theme-nova v${docusaurusPresetVersion}`) === false
      || themeNovaHelpOutput.includes('Usage: theme-nova') === false
    ) {
      throw new Error(`Installed theme-nova executable should report version "${docusaurusPresetVersion}" and render its help menu.`);
    }

    runCommand('npm', [
      'run',
      'check',
    ], projectDirectory);

    runCommand('npm', [
      'run',
      'build',
    ], projectDirectory);

    runCommand('npm', [
      'run',
      'check',
    ], directProjectDirectory);

    runCommand('npm', [
      'run',
      'build',
    ], directProjectDirectory);
  } finally {
    rmSync(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }

  process.stdout.write('All generated scaffold consumers passed.\n');

  return;
}

checkScaffolds();
