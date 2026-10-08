import {
  execFileSync,
  spawnSync,
} from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { verifyBundlerLoad } from './lib/verify-scaffold-install.mjs';

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
 * @since 0.0.0
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
 * @since 0.0.0
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
 * @since 0.0.0
 */
function runCommand(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  });

  return;
}

/**
 * Check Scaffolds - Expect Command Failure.
 *
 * Runs an invalid consumer command and verifies the installed CLI rejects it
 * with the intended diagnostic instead of partially generating a workspace.
 *
 * @param {string}   command         - Command.
 * @param {string[]} args            - Args.
 * @param {string}   cwd             - Cwd.
 * @param {string}   expectedMessage - Expected message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function expectCommandFailure(command, args, cwd, expectedMessage) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf-8',
  });
  const output = [
    result.stdout,
    result.stderr,
  ].join('\n');

  if (result.status === 0 || output.includes(expectedMessage) === false) {
    throw new Error([
      `Expected command failure containing "${expectedMessage}".`,
      output,
    ].join('\n'));
  }

  return;
}

/**
 * Check Scaffolds - Has Command.
 *
 * Reports whether an optional external runtime is installed without turning
 * the missing runtime into a scaffold-generation failure.
 *
 * @param {string} command - Command.
 *
 * @returns {boolean}
 *
 * @since 0.0.0
 */
function hasCommand(command) {
  try {
    execFileSync(command, ['--version'], {
      stdio: 'ignore',
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Check Scaffolds - Read npm Output.
 *
 * Routes direct npm invocations through Corepack so they use the
 * packageManager version declared by the current project.
 *
 * @param {string[]} args - Args.
 * @param {string}   cwd  - Cwd.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function readNpmOutput(args, cwd) {
  return readCommandOutput('corepack', [
    'npm',
    ...args,
  ], cwd);
}

/**
 * Check Scaffolds - Run npm.
 *
 * Routes direct npm invocations through Corepack so installs and package
 * operations use the declared packageManager version.
 *
 * @param {string[]} args - Args.
 * @param {string}   cwd  - Cwd.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function runNpm(args, cwd) {
  runCommand('corepack', [
    'npm',
    ...args,
  ], cwd);

  return;
}

/**
 * Check Scaffolds - Verify Workspace Registrations.
 *
 * Confirms that public scaffold commands preserve every workspace and use one
 * canonical identity in both nova.config.json and each workspace package.json.
 *
 * @param {string}                 projectDirectory   - Project directory.
 * @param {Record<string, string | {name: string, policy: string, role: string}>} expectedWorkspaces - Expected workspaces.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyWorkspaceRegistrations(projectDirectory, expectedWorkspaces) {
  const config = JSON.parse(readFileSync(join(projectDirectory, 'nova.config.json'), 'utf-8'));
  const configWorkspaces = config['workspaces'];

  for (const expectedWorkspaceEntry of Object.entries(expectedWorkspaces)) {
    const workspacePath = expectedWorkspaceEntry[0];
    const expectedWorkspace = expectedWorkspaceEntry[1];
    const expectedName = (typeof expectedWorkspace === 'string') ? expectedWorkspace : expectedWorkspace['name'];
    const registeredWorkspace = configWorkspaces[workspacePath];

    if (registeredWorkspace === undefined || registeredWorkspace['name'] !== expectedName) {
      throw new Error(`Workspace "${workspacePath}" should be registered as "${expectedName}".`);
    }

    if (
      typeof expectedWorkspace !== 'string'
      && (
        registeredWorkspace['policy'] !== expectedWorkspace['policy']
        || registeredWorkspace['role'] !== expectedWorkspace['role']
      )
    ) {
      throw new Error(`Workspace "${workspacePath}" should use role "${expectedWorkspace['role']}" and policy "${expectedWorkspace['policy']}".`);
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
 * @since 0.0.0
 */
function checkScaffolds() {
  const repositoryDirectory = process.cwd();
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-scaffold-smoke-'));
  const projectDirectory = join(temporaryDirectory, 'project');
  const directProjectDirectory = join(temporaryDirectory, 'direct-project');
  const cliHostDirectory = join(temporaryDirectory, 'cli-host');

  try {
    runNpm([
      'run',
      'build',
      '--workspace',
      '@cbnventures/nova',
      '--workspace',
      '@cbnventures/docusaurus-preset-nova',
    ], repositoryDirectory);

    runNpm([
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

    mkdirSync(cliHostDirectory, { recursive: true });

    writeFileSync(join(cliHostDirectory, 'package.json'), `${JSON.stringify({
      name: 'nova-scaffold-cli-host',
      private: true,
      dependencies: {
        '@cbnventures/nova': `file:${novaTarballPath}`,
      },
    }, null, 2)}\n`, 'utf-8');

    runNpm(['install'], cliHostDirectory);

    const novaCliPath = join(cliHostDirectory, 'node_modules', '@cbnventures', 'nova', 'bin', 'nova.mjs');

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
      './': {
        name: 'direct-smoke-project',
        policy: 'freezable',
        role: 'project',
      },
      './apps/web': {
        name: 'direct-smoke-app-web',
        policy: 'trackable',
        role: 'app',
      },
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

    expectCommandFailure(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'astro',
      '--adapter',
      'cloudflare',
      '--docker-image',
      '--non-interactive',
      '--rendering',
      'server',
      '--workspace-name',
      'invalid-astro',
      '--output',
      './apps/invalid-astro',
    ], projectDirectory, 'Cloudflare owns the Astro server runtime');

    if (existsSync(join(projectDirectory, 'apps', 'invalid-astro')) === true) {
      throw new Error('The rejected Astro option combination should not write a workspace.');
    }

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'astro',
      '--adapter',
      'node',
      '--docker-image',
      '--non-interactive',
      '--rendering',
      'server',
      '--workspace-name',
      'astro',
      '--output',
      './apps/astro',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'astro',
      '--adapter',
      'cloudflare',
      '--non-interactive',
      '--rendering',
      'server',
      '--workspace-name',
      'astro-cloudflare',
      '--output',
      './apps/astro-cloudflare',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'discord-bot',
      '--docker-image',
      '--non-interactive',
      '--workspace-name',
      'bot',
      '--output',
      './apps/bot',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'docker-image',
      '--architectures',
      'amd64,arm64',
      '--non-interactive',
      '--publish',
      'ghcr',
      '--workspace-name',
      'service',
      '--output',
      './apps/service',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'docker-image',
      '--architectures',
      'arm64',
      '--non-interactive',
      '--publish',
      'docker-hub',
      '--workspace-name',
      'service-hub',
      '--output',
      './apps/service-hub',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'expressjs',
      '--docker-image',
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
      '--docker-image',
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
      '--docker-image',
      '--framework',
      'react',
      '--non-interactive',
      '--pwa',
      '--workspace-name',
      'vite',
      '--output',
      './apps/vite',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'vite',
      '--framework',
      'vue',
      '--non-interactive',
      '--workspace-name',
      'vite-vue',
      '--output',
      './apps/vite-vue',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'vite',
      '--framework',
      'svelte',
      '--non-interactive',
      '--workspace-name',
      'vite-svelte',
      '--output',
      './apps/vite-svelte',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'cloudflare-workers',
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
      '--content',
      'docs-blog',
      '--docker-image',
      '--non-interactive',
      '--workspace-name',
      'docs',
      '--output',
      './apps/docs',
      '--preset',
      'foundry',
      '--search',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'package',
      'node-cli',
      '--non-interactive',
      '--workspace-name',
      'scaffold-cli',
      '--output',
      './packages/scaffold-cli',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'package',
      'github-action',
      '--non-interactive',
      '--workspace-name',
      'scaffold-action',
      '--output',
      './tools/scaffold-action',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'package',
      'homebridge',
      '--custom-ui',
      '--non-interactive',
      '--workspace-name',
      'scaffold',
      '--output',
      './packages/scaffold',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'package',
      'pfsense',
      '--non-interactive',
      '--workspace-name',
      'scheduler',
      '--output',
      './packages/scheduler',
    ], projectDirectory);

    verifyWorkspaceRegistrations(projectDirectory, {
      './': {
        name: 'scaffold-smoke-project',
        policy: 'freezable',
        role: 'project',
      },
      './apps/astro': {
        name: 'scaffold-smoke-app-astro',
        policy: 'trackable',
        role: 'app',
      },
      './apps/astro-cloudflare': {
        name: 'scaffold-smoke-app-astro-cloudflare',
        policy: 'trackable',
        role: 'app',
      },
      './apps/bot': {
        name: 'scaffold-smoke-app-bot',
        policy: 'trackable',
        role: 'app',
      },
      './apps/service': {
        name: 'scaffold-smoke-app-service',
        policy: 'trackable',
        role: 'app',
      },
      './apps/service-hub': {
        name: 'scaffold-smoke-app-service-hub',
        policy: 'trackable',
        role: 'app',
      },
      './apps/express': {
        name: 'scaffold-smoke-app-express',
        policy: 'trackable',
        role: 'app',
      },
      './apps/nextjs': {
        name: 'scaffold-smoke-app-nextjs',
        policy: 'trackable',
        role: 'app',
      },
      './apps/vite': {
        name: 'scaffold-smoke-app-vite',
        policy: 'trackable',
        role: 'app',
      },
      './apps/vite-svelte': {
        name: 'scaffold-smoke-app-vite-svelte',
        policy: 'trackable',
        role: 'app',
      },
      './apps/vite-vue': {
        name: 'scaffold-smoke-app-vite-vue',
        policy: 'trackable',
        role: 'app',
      },
      './apps/workers': {
        name: 'scaffold-smoke-app-workers',
        policy: 'trackable',
        role: 'app',
      },
      './apps/docs': {
        name: 'scaffold-smoke-docs',
        policy: 'freezable',
        role: 'docs',
      },
      './packages/scaffold-cli': {
        name: 'scaffold-cli',
        policy: 'distributable',
        role: 'package',
      },
      './tools/scaffold-action': {
        name: 'scaffold-action',
        policy: 'distributable',
        role: 'package',
      },
      './packages/scaffold': {
        name: 'homebridge-scaffold',
        policy: 'distributable',
        role: 'package',
      },
      './packages/scheduler': {
        name: 'pfsense-pkg-scheduler',
        policy: 'distributable',
        role: 'package',
      },
    });

    const actionManifest = readFileSync(join(projectDirectory, 'action.yml'), 'utf-8');

    if (actionManifest.includes('main: "./tools/scaffold-action/build/index.js"') === false) {
      throw new Error('The generated action.yml should point at the selected package output path.');
    }

    const pfSenseWorkflow = readFileSync(join(projectDirectory, '.github', 'workflows', 'pfsense-scheduler.yml'), 'utf-8');

    if (pfSenseWorkflow.includes('./packages/scheduler/scripts/build-package.sh') === false) {
      throw new Error('The generated pfSense workflow should point at the selected package workspace.');
    }

    const ghcrWorkflow = readFileSync(join(projectDirectory, '.github', 'workflows', 'service-container.yml'), 'utf-8');
    const dockerHubWorkflow = readFileSync(join(projectDirectory, '.github', 'workflows', 'service-hub-container.yml'), 'utf-8');

    if (
      ghcrWorkflow.includes('platforms: linux/amd64,linux/arm64') === false
      || ghcrWorkflow.includes('registry: ghcr.io') === false
    ) {
      throw new Error('The generated GHCR workflow should use both requested architectures and GitHub authentication.');
    }

    if (
      dockerHubWorkflow.includes('platforms: linux/arm64') === false
      || dockerHubWorkflow.includes('secrets.DOCKERHUB_TOKEN') === false
    ) {
      throw new Error('The generated Docker Hub workflow should use the requested architecture and Docker Hub authentication.');
    }

    runNpm([
      'pkg',
      'set',
      `dependencies.@cbnventures/nova=file:${novaTarballPath}`,
    ], directProjectDirectory);

    runNpm([
      'pkg',
      'set',
      `dependencies.@cbnventures/nova=file:${novaTarballPath}`,
    ], projectDirectory);

    runNpm([
      'pkg',
      'set',
      `dependencies.@cbnventures/docusaurus-preset-nova=file:${docusaurusPresetTarballPath}`,
      `dependencies.@cbnventures/nova=file:${novaTarballPath}`,
      '--workspace',
      './apps/docs',
    ], projectDirectory);

    // The smoke matrix should report every generated workspace failure in one
    // pass. This changes only the temporary fixture's Turbo failure strategy.
    runNpm([
      'pkg',
      'set',
      'scripts.check:workspaces=turbo run check --concurrency=2 --continue=always',
      'scripts.build:workspaces=turbo run build --concurrency=2 --continue=always',
    ], projectDirectory);

    runNpm(['install'], projectDirectory);

    runNpm(['install'], directProjectDirectory);

    verifyBundlerLoad(projectDirectory, 'apps/docs', 'vitest');
    verifyBundlerLoad(projectDirectory, 'apps/vite', 'vite');
    verifyBundlerLoad(projectDirectory, 'apps/vite-svelte', 'vite');
    verifyBundlerLoad(projectDirectory, 'apps/vite-vue', 'vite');
    verifyBundlerLoad(directProjectDirectory, 'apps/web', 'vite');

    const novaPackageJson = JSON.parse(readFileSync(join(repositoryDirectory, 'packages', 'nova', 'package.json'), 'utf-8'));
    const novaVersion = novaPackageJson['version'];
    const novaHelpOutput = readNpmOutput([
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
    const themeNovaHelpOutput = readNpmOutput([
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

    runNpm([
      'run',
      'check',
    ], projectDirectory);

    if (hasCommand('docker') === true) {
      runNpm([
        'run',
        'build',
      ], projectDirectory);
    } else {
      process.stdout.write('Docker is unavailable; building every generated workspace except the container-native image.\n');

      runNpm([
        'run',
        'build:workspaces',
        '--',
        '--filter=!scaffold-smoke-app-service',
        '--filter=!scaffold-smoke-app-service-hub',
      ], projectDirectory);
    }

    runNpm([
      'run',
      'check',
    ], directProjectDirectory);

    runNpm([
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
