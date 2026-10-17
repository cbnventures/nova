import {
  execFileSync,
  spawn,
  spawnSync,
} from 'node:child_process';
import {
  copyFileSync,
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
import { pathToFileURL } from 'node:url';

import { ensureDockerEngine } from './lib/docker-engine.mjs';
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
 * Check Scaffolds - Verify Node CLI Runtime.
 *
 * Exercises the built scaffolded executable across its normal, help, version,
 * and invalid-command lifecycles. These Nova-owned assertions keep presentation
 * regressions out of the generated consumer test suite.
 *
 * @param {string} projectDirectory     - Project directory.
 * @param {string} workspaceName        - Workspace name.
 * @param {string} workspacePackageName - Workspace package name.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyNodeCliRuntime(projectDirectory, workspaceName, workspacePackageName = workspaceName) {
  const cliDirectory = join(projectDirectory, 'packages', workspaceName);
  const cliExecutable = (process.platform === 'win32') ? `${workspaceName}.cmd` : workspaceName;
  const cliPath = join(projectDirectory, 'node_modules', '.bin', cliExecutable);

  if (existsSync(cliPath) === false) {
    throw new Error('The generated Node CLI should be linked into node_modules/.bin during installation.');
  }

  const statusOutput = readCommandOutput(cliPath, ['status'], cliDirectory);

  for (const expectedText of [
    `${workspacePackageName} v0.0.0`,
    'CURRENTLY RUNNING:',
    `${workspacePackageName} status`,
    'Your command is ready.',
  ]) {
    if (statusOutput.includes(expectedText) === false) {
      throw new Error(`The generated Node CLI status command should include "${expectedText}".`);
    }
  }

  const helpOutput = readCommandOutput(cliPath, ['--help'], cliDirectory);

  for (const expectedText of [
    `${workspacePackageName} v0.0.0`,
    `Usage: ${workspacePackageName} <command> [options]`,
    'Commands:',
    'status [options]',
  ]) {
    if (helpOutput.includes(expectedText) === false) {
      throw new Error(`The generated Node CLI help should include "${expectedText}".`);
    }
  }

  const versionOutput = readCommandOutput(cliPath, ['--version'], cliDirectory).trim();

  if (versionOutput !== '0.0.0') {
    throw new Error(`The generated Node CLI should report version "0.0.0"; received "${versionOutput}".`);
  }

  expectCommandFailure(cliPath, ['unknown-command'], cliDirectory, 'ERROR Unknown command');

  return;
}

/**
 * Check Scaffolds - Verify Homebridge Utility Runtime.
 *
 * Exercises the built Homebridge REPL and API-test launchers through help mode.
 * This proves both installed commands resolve compiled output without opening an
 * interactive shell or requiring a user's live Homebridge configuration.
 *
 * @param {string} projectDirectory - Project directory.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyHomebridgeUtilityRuntime(projectDirectory) {
  const pluginDirectory = join(projectDirectory, 'packages', 'scaffold');
  const commandNames = [
    'homebridge-scaffold-repl',
    'homebridge-scaffold-test-api',
  ];

  for (const commandName of commandNames) {
    const executableName = (process.platform === 'win32') ? `${commandName}.cmd` : commandName;
    const commandPath = join(projectDirectory, 'node_modules', '.bin', executableName);

    if (existsSync(commandPath) === false) {
      throw new Error(`The generated Homebridge utility "${commandName}" should be linked into node_modules/.bin.`);
    }

    const helpOutput = readCommandOutput(commandPath, ['--help'], pluginDirectory);

    for (const expectedText of [
      'homebridge-scaffold v0.0.0',
      `Usage: ${commandName} [options]`,
      'Display the help menu',
    ]) {
      if (helpOutput.includes(expectedText) === false) {
        throw new Error(`The generated Homebridge utility "${commandName}" should include "${expectedText}".`);
      }
    }
  }

  return;
}

/**
 * Check Scaffolds - Verify GitHub Action Runtime.
 *
 * Exercises source through local-action and the isolated NCC output without
 * node_modules, proving simulation and the published artifact independently.
 *
 * @param {string} projectDirectory - Project directory.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyGithubActionRuntime(projectDirectory) {
  const workspaceDirectory = join(projectDirectory, 'tools', 'scaffold-action');
  const environmentPath = join(workspaceDirectory, '.env');
  const environment = readFileSync(environmentPath, 'utf-8').split('\n').map((environmentLine) => {
    return (environmentLine.startsWith('INPUT_NAME=') === true) ? 'INPUT_NAME="Nova"' : environmentLine;
  }).join('\n');

  writeFileSync(environmentPath, environment, 'utf-8');

  runNpm([
    'run',
    'dev',
    '--workspace',
    './tools/scaffold-action',
  ], projectDirectory);

  const isolatedDirectory = mkdtempSync(join(tmpdir(), 'nova-github-action-bundle-'));

  try {
    const isolatedBuildDirectory = join(isolatedDirectory, 'action');
    const outputPath = join(isolatedDirectory, 'github-output');

    mkdirSync(isolatedBuildDirectory, { recursive: true });

    for (const buildFileName of readdirSync(join(workspaceDirectory, 'build'))) {
      copyFileSync(join(workspaceDirectory, 'build', buildFileName), join(isolatedBuildDirectory, buildFileName));
    }

    writeFileSync(outputPath, '', 'utf-8');

    execFileSync(process.execPath, [join(isolatedBuildDirectory, 'index.js')], {
      cwd: isolatedDirectory,
      encoding: 'utf-8',
      env: {
        ...process.env,
        GITHUB_OUTPUT: outputPath,
        INPUT_NAME: 'Nova',
        NODE_PATH: '',
      },
    });

    const actionOutput = readFileSync(outputPath, 'utf-8');

    if (actionOutput.includes('Hello, Nova!') === false) {
      throw new Error('The isolated GitHub Action bundle should publish the generated greeting without node_modules.');
    }
  } finally {
    rmSync(isolatedDirectory, {
      force: true,
      recursive: true,
    });
  }

  process.stdout.write('Generated GitHub Action source runner and isolated bundle passed.\n');

  return;
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
  const configEnvironment = config['environment'];

  if (typeof configEnvironment !== 'object' || configEnvironment === null) {
    throw new Error('The generated nova.config.json should register environment namespaces.');
  }

  const configEnvironmentWorkspaces = configEnvironment['workspaces'];

  if (typeof configEnvironmentWorkspaces !== 'object' || configEnvironmentWorkspaces === null) {
    throw new Error('The generated nova.config.json should register workspace environment namespaces.');
  }

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

    verifyWorkspaceEnvironment(projectDirectory, workspacePath, configEnvironmentWorkspaces);
  }

  return;
}

/**
 * Check Scaffolds - Verify Workspace Environment.
 *
 * Confirms one generated workspace has a distinct environment namespace and
 * both Nova-managed dotenv files with the shared runtime and logging defaults.
 *
 * @param {string}                            projectDirectory      - Project directory.
 * @param {string}                            workspacePath         - Workspace path.
 * @param {Record<string, {prefix: string}>} environmentWorkspaces - Environment workspaces.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyWorkspaceEnvironment(projectDirectory, workspacePath, environmentWorkspaces) {
  const registeredEnvironmentWorkspace = environmentWorkspaces[workspacePath];

  if (
    registeredEnvironmentWorkspace === undefined
    || typeof registeredEnvironmentWorkspace['prefix'] !== 'string'
    || registeredEnvironmentWorkspace['prefix'] === ''
  ) {
    throw new Error(`Workspace "${workspacePath}" should have a non-empty environment prefix.`);
  }

  let packageDirectory = '';

  if (workspacePath !== './') {
    packageDirectory = (workspacePath.startsWith('./') === true) ? workspacePath.slice(2) : workspacePath;
  }

  const workspaceDirectory = join(projectDirectory, packageDirectory);
  const expectedBaselineLines = [
    'NODE_ENV="development"',
    'LOG_LEVEL="auto"',
    'LOG_TIME="false"',
  ];

  for (const fileName of [
    '.env',
    '.env.sample',
  ]) {
    const filePath = join(workspaceDirectory, fileName);

    if (existsSync(filePath) === false) {
      throw new Error(`Workspace "${workspacePath}" should include "${fileName}".`);
    }

    const lines = readFileSync(filePath, 'utf-8').split('\n');

    for (const expectedLine of expectedBaselineLines) {
      if (lines.includes(expectedLine) === false) {
        throw new Error(`Workspace "${workspacePath}" ${fileName} should include "${expectedLine}".`);
      }
    }
  }

  return;
}

/**
 * Check Scaffolds - Verify Workspace Environment Variables.
 *
 * Confirms scaffold-specific variables remain blank locally while their safe
 * defaults are documented in the generated sample file.
 *
 * @param {string}                 projectDirectory        - Project directory.
 * @param {string}                 workspacePath           - Workspace path.
 * @param {Record<string, string>} expectedSampleVariables - Expected sample variables.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyWorkspaceEnvironmentVariables(projectDirectory, workspacePath, expectedSampleVariables) {
  const packageDirectory = (workspacePath.startsWith('./') === true) ? workspacePath.slice(2) : workspacePath;
  const workspaceDirectory = join(projectDirectory, packageDirectory);
  const envLines = readFileSync(join(workspaceDirectory, '.env'), 'utf-8').split('\n');
  const sampleLines = readFileSync(join(workspaceDirectory, '.env.sample'), 'utf-8').split('\n');

  for (const expectedVariableEntry of Object.entries(expectedSampleVariables)) {
    const variableName = expectedVariableEntry[0];
    const sampleValue = expectedVariableEntry[1];

    if (envLines.includes(`${variableName}=""`) === false) {
      throw new Error(`Workspace "${workspacePath}" .env should include a blank "${variableName}" value.`);
    }

    if (sampleLines.includes(`${variableName}="${sampleValue}"`) === false) {
      throw new Error(`Workspace "${workspacePath}" .env.sample should include "${variableName}=\"${sampleValue}\"".`);
    }
  }

  return;
}

/**
 * Check Scaffolds - Verify Dockerfile Banners.
 *
 * Confirms that generated Dockerfile comment frames align with their title
 * lines across every Docker profile exercised by the scaffold matrix.
 *
 * @param {string[]} dockerfilePaths - Dockerfile paths.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyDockerfileBanners(dockerfilePaths) {
  for (const dockerfilePath of dockerfilePaths) {
    const dockerfileLines = readFileSync(dockerfilePath, 'utf-8').split('\n');

    for (const dockerfileLineEntry of dockerfileLines.entries()) {
      const lineIndex = dockerfileLineEntry[0];
      const dockerfileLine = dockerfileLineEntry[1];

      if (dockerfileLine.startsWith('#### ') === false || dockerfileLine.endsWith(' ####') === false) {
        continue;
      }

      const precedingBorder = dockerfileLines[lineIndex - 1];
      const followingBorder = dockerfileLines[lineIndex + 1];
      const hasAlignedBorders = precedingBorder !== undefined
        && followingBorder !== undefined
        && precedingBorder.replaceAll('#', '') === ''
        && followingBorder.replaceAll('#', '') === ''
        && precedingBorder.length === dockerfileLine.length
        && followingBorder.length === dockerfileLine.length;

      if (hasAlignedBorders === false) {
        throw new Error(`Dockerfile banner at "${dockerfilePath}:${String(lineIndex + 1)}" is not aligned.`);
      }
    }
  }

  return;
}

/**
 * Check Scaffolds - Verify Launch Sequence Copy.
 *
 * Confirms every generated launchpad presents one shared three-step sequence so
 * platform-specific starter implementations cannot drift into separate copy.
 *
 * @param {string[]} launchpadPaths - Launchpad paths.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyLaunchSequenceCopy(launchpadPaths) {
  const expectedCopy = [
    'Replace this starter with your first real product experience.',
    'Run the workspace checks while the project takes shape.',
    'Build the same production artifact Nova already validates.',
  ];

  for (const launchpadPath of launchpadPaths) {
    const launchpad = readFileSync(launchpadPath, 'utf-8');

    for (const expectedLine of expectedCopy) {
      if (launchpad.includes(expectedLine) === false) {
        throw new Error(`Generated launchpad "${launchpadPath}" does not use the shared launch-sequence copy: "${expectedLine}".`);
      }
    }
  }

  return;
}

/**
 * Check Scaffolds - Verify Cloudflare Worker Runtime.
 *
 * Starts the generated Worker long enough for Wrangler and workerd to accept
 * the scaffold configuration. Static checks and dry-run deployments do not
 * reject a compatibility date newer than the bundled runtime supports.
 *
 * @param {string} projectDirectory - Project directory.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function verifyCloudflareWorkerRuntime(projectDirectory) {
  const workspaceDirectory = join(projectDirectory, 'packages', 'cloudflare-tool');
  const rootWranglerExecutable = join(
    projectDirectory,
    'node_modules',
    '.bin',
    (process.platform === 'win32') ? 'wrangler.cmd' : 'wrangler',
  );
  const workspaceWranglerExecutable = join(
    workspaceDirectory,
    'node_modules',
    '.bin',
    (process.platform === 'win32') ? 'wrangler.cmd' : 'wrangler',
  );
  const wranglerExecutable = (existsSync(workspaceWranglerExecutable) === true) ? workspaceWranglerExecutable : rootWranglerExecutable;
  const wranglerProcess = spawn(wranglerExecutable, [
    'dev',
    '--ip',
    '127.0.0.1',
    '--port',
    '0',
    '--inspector-port',
    '0',
  ], {
    cwd: workspaceDirectory,
    env: {
      ...process.env,
      CLOUDFLARE_TELEMETRY_DISABLED: '1',
      NO_COLOR: '1',
    },
    stdio: [
      'ignore',
      'pipe',
      'pipe',
    ],
  });

  let output = '';
  let runtimeReady = false;

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      wranglerProcess.kill('SIGTERM');

      return;
    }, 30000);

    /**
     * Check Scaffolds - Verify Cloudflare Worker Runtime - Collect Output.
     *
     * Combines both streams because Wrangler may report startup readiness and
     * configuration failures through different channels.
     *
     * @param {Buffer} data - Data.
     *
     * @returns {void}
     *
     * @since 0.0.0
     */
    const collectOutput = (data) => {
      output += data.toString();

      if (runtimeReady === false && output.includes('Ready on') === true) {
        runtimeReady = true;
        wranglerProcess.kill('SIGTERM');
      }

      return;
    };

    wranglerProcess.stdout.on('data', collectOutput);

    wranglerProcess.stderr.on('data', collectOutput);

    wranglerProcess.once('error', (error) => {
      clearTimeout(timeout);
      reject(error);

      return;
    });

    wranglerProcess.once('close', (exitCode) => {
      clearTimeout(timeout);

      if (runtimeReady === true) {
        resolve(undefined);

        return;
      }

      reject(new Error([
        `Generated Cloudflare Worker runtime exited before becoming ready (exit code ${String(exitCode)}).`,
        output,
      ].join('\n')));

      return;
    });

    return;
  });

  process.stdout.write('Generated Cloudflare Worker runtime started successfully.\n');

  return;
}

/**
 * Check Scaffolds - Verify Vercel Function Runtime.
 *
 * Loads the compiled starter function through its emitted package boundary and
 * verifies the web-standard response without requiring a Vercel account.
 *
 * @param {string} projectDirectory - Project directory.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function verifyVercelFunctionRuntime(projectDirectory) {
  const functionPath = join(projectDirectory, 'packages', 'vercel-tool', 'build', 'api', 'index.js');
  const functionModule = await import(pathToFileURL(functionPath).href);
  const response = await functionModule.GET(new Request('https://example.com/api'));

  if (
    response instanceof Response === false
    || response.status !== 200
    || await response.text() !== JSON.stringify({ message: 'Welcome to scaffold-smoke' })
  ) {
    throw new Error('The generated Vercel Function should return the starter response.');
  }

  process.stdout.write('Generated Vercel Function runtime loaded successfully.\n');

  return;
}

/**
 * Check Scaffolds - Check Scaffolds.
 *
 * Builds and packs the current Nova workspaces, generates every supported
 * scaffold into one clean monorepo, installs it, and exercises each applicable
 * check, lint, test, and production build command.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function checkScaffolds() {
  const repositoryDirectory = process.cwd();
  const dockerAvailable = ensureDockerEngine();
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
      '--loglevel=error',
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
      '--no-install',
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
      '--no-install',
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
      '--no-install',
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
      'android',
      '--application-id',
      'io.cbnventures.scaffoldsmoke',
      '--non-interactive',
      '--no-install',
      '--workspace-name',
      'android',
      '--output',
      './apps/android',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'apple',
      '--bundle-id',
      'io.cbnventures.scaffold-smoke',
      '--non-interactive',
      '--no-install',
      '--workspace-name',
      'apple',
      '--output',
      './apps/apple',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'astro',
      '--adapter',
      'node',
      '--docker-image',
      '--non-interactive',
      '--no-install',
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
      '--no-install',
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
      '--no-install',
      '--workspace-name',
      'bot',
      '--output',
      './apps/bot',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'expressjs',
      '--docker-image',
      '--non-interactive',
      '--no-install',
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
      '--no-install',
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
      '--no-install',
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
      '--no-install',
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
      '--no-install',
      '--workspace-name',
      'vite-svelte',
      '--output',
      './apps/vite-svelte',
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
      '--no-install',
      '--workspace-name',
      'docs',
      '--output',
      './apps/docs',
      '--preset',
      'foundry',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'tool',
      'serverless',
      '--non-interactive',
      '--no-install',
      '--target',
      'cloudflare-workers',
      '--workspace-name',
      'cloudflare-tool',
      '--output',
      './packages/cloudflare-tool',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'tool',
      'serverless',
      '--non-interactive',
      '--no-install',
      '--target',
      'vercel-functions',
      '--workspace-name',
      'vercel-tool',
      '--output',
      './packages/vercel-tool',
    ], projectDirectory);

    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'package',
      'github-action',
      '--non-interactive',
      '--no-install',
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
      '--no-install',
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
      '--no-install',
      '--workspace-name',
      'my-package',
      '--output',
      './packages/my-package',
    ], projectDirectory);

    verifyWorkspaceRegistrations(projectDirectory, {
      './': {
        name: 'scaffold-smoke-project',
        policy: 'freezable',
        role: 'project',
      },
      './apps/android': {
        name: 'scaffold-smoke-app-android',
        policy: 'trackable',
        role: 'app',
      },
      './apps/apple': {
        name: 'scaffold-smoke-app-apple',
        policy: 'trackable',
        role: 'app',
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
      './apps/docs': {
        name: 'scaffold-smoke-docs',
        policy: 'freezable',
        role: 'docs',
      },
      './packages/cloudflare-tool': {
        name: 'scaffold-smoke-tool-cloudflare-tool',
        policy: 'distributable',
        role: 'tool',
      },
      './packages/vercel-tool': {
        name: 'scaffold-smoke-tool-vercel-tool',
        policy: 'distributable',
        role: 'tool',
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
      './packages/my-package': {
        name: 'pfsense-pkg-my-package',
        policy: 'distributable',
        role: 'package',
      },
    });

    verifyWorkspaceEnvironmentVariables(projectDirectory, './apps/bot', {
      DISCORD_TOKEN: '',
    });

    verifyWorkspaceEnvironmentVariables(projectDirectory, './apps/express', {
      PORT: '3000',
    });

    verifyWorkspaceEnvironmentVariables(projectDirectory, './tools/scaffold-action', {
      INPUT_NAME: 'Nova',
    });

    verifyDockerfileBanners([
      join(projectDirectory, 'apps', 'astro', 'Dockerfile'),
      join(projectDirectory, 'apps', 'bot', 'Dockerfile'),
      join(projectDirectory, 'apps', 'docs', 'Dockerfile'),
      join(projectDirectory, 'apps', 'express', 'Dockerfile'),
      join(projectDirectory, 'apps', 'nextjs', 'Dockerfile'),
      join(projectDirectory, 'apps', 'vite', 'Dockerfile'),
    ]);

    verifyLaunchSequenceCopy([
      join(directProjectDirectory, 'apps', 'web', 'src', 'main.ts'),
      join(projectDirectory, 'apps', 'android', 'app', 'src', 'main', 'java', 'io', 'cbnventures', 'scaffoldsmoke', 'ui', 'main', 'MainScreen.kt'),
      join(projectDirectory, 'apps', 'apple', 'Sources', 'ContentView.swift'),
      join(projectDirectory, 'apps', 'astro', 'src', 'pages', 'index.astro'),
      join(projectDirectory, 'apps', 'nextjs', 'src', 'app', 'page.tsx'),
      join(projectDirectory, 'apps', 'vite', 'src', 'app.tsx'),
      join(projectDirectory, 'apps', 'vite-svelte', 'src', 'app.svelte'),
      join(projectDirectory, 'apps', 'vite-vue', 'src', 'app.vue'),
    ]);

    const actionManifest = readFileSync(join(projectDirectory, 'action.yml'), 'utf-8');

    if (actionManifest.includes('main: "./tools/scaffold-action/build/index.js"') === false) {
      throw new Error('The generated action.yml should point at the selected package output path.');
    }

    const pfSenseWorkflow = readFileSync(join(projectDirectory, '.github', 'workflows', 'pfsense-my-package.yml'), 'utf-8');

    if (pfSenseWorkflow.includes('./packages/my-package/scripts/build-package.sh') === false) {
      throw new Error('The generated pfSense workflow should point at the selected package workspace.');
    }

    const pfSensePackageGui = readFileSync(join(projectDirectory, 'packages', 'my-package', 'port', 'files', 'usr', 'local', 'pkg', 'my-package.xml'), 'utf-8');
    const pfSensePackageHelper = readFileSync(join(projectDirectory, 'packages', 'my-package', 'port', 'files', 'usr', 'local', 'pkg', 'my-package.inc'), 'utf-8');
    const pfSensePackageExecutable = readFileSync(join(projectDirectory, 'packages', 'my-package', 'port', 'files', 'usr', 'local', 'sbin', 'my-package'), 'utf-8');
    const pfSensePackageInfo = readFileSync(join(projectDirectory, 'packages', 'my-package', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-MyPackage', 'info.xml'), 'utf-8');

    if (
      pfSensePackageGui.includes('<name>mypackage</name>') === false
      || pfSensePackageGui.includes('<addedit_string>My Package: saved settings</addedit_string>') === false
      || pfSensePackageGui.includes('<fieldname>task_frequency</fieldname>') === false
      || pfSensePackageGui.includes('<option><name>Every minute</name><value>minute</value></option>') === false
      || pfSensePackageHelper.includes('installedpackages/mypackage/config/0') === false
      || pfSensePackageHelper.includes('\'minute\' => [\'*\', \'*\', \'*\', \'*\', \'*\']') === false
      || pfSensePackageExecutable.includes('logger(LOG_NOTICE,') === false
      || pfSensePackageInfo.includes('<internal_name>MyPackage</internal_name>') === false
    ) {
      throw new Error('The generated pfSense package should keep its normalized config key and internal package identity aligned.');
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
    // pass. This changes only the temporary fixture's Nova failure strategy.
    runNpm([
      'pkg',
      'set',
      'scripts.check:workspaces=nova utility run-workspaces --concurrency=2 --continue-on-error check',
      'scripts.build:workspaces=nova utility run-workspaces --concurrency=2 --continue-on-error --node-env production build',
    ], projectDirectory);

    runNpm(['install'], projectDirectory);

    runNpm(['install'], directProjectDirectory);

    await verifyCloudflareWorkerRuntime(projectDirectory);

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

    if (dockerAvailable === true) {
      runNpm([
        'run',
        'build',
      ], projectDirectory);
    } else {
      process.stdout.write('Docker is not installed; building every generated workspace except those with Docker packaging.\n');

      runNpm([
        'run',
        'build:workspaces',
        '--',
        '--exclude-workspace',
        'scaffold-smoke-app-astro',
        'scaffold-smoke-app-bot',
        'scaffold-smoke-app-express',
        'scaffold-smoke-app-nextjs',
        'scaffold-smoke-app-vite',
        'scaffold-smoke-docs',
      ], projectDirectory);
    }

    await verifyVercelFunctionRuntime(projectDirectory);

    verifyNodeCliRuntime(projectDirectory, 'cloudflare-tool', 'scaffold-smoke-tool-cloudflare-tool');
    verifyNodeCliRuntime(projectDirectory, 'vercel-tool', 'scaffold-smoke-tool-vercel-tool');
    verifyHomebridgeUtilityRuntime(projectDirectory);
    verifyGithubActionRuntime(projectDirectory);

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

await checkScaffolds();
