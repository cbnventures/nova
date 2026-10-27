import {
  execFileSync,
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
import {
  availableParallelism,
  tmpdir,
} from 'node:os';
import {
  join,
  sep,
  win32,
} from 'node:path';
import { setTimeout as wait } from 'node:timers/promises';
import { pathToFileURL } from 'node:url';

import { ensureDockerEngine } from './lib/docker-engine.mjs';
import { PATTERN_APPLE_SCAFFOLD_SMOKE_CHANGELOG_RELEASE_HEADING } from './lib/regex.mjs';
import {
  createScaffoldTemporaryDirectory,
  removeScaffoldTemporaryDirectory,
} from './lib/scaffold-temporary-directory.mjs';
import { verifyBundlerLoad } from './lib/verify-scaffold-install.mjs';

/**
 * Check Scaffolds - Corepack Invocation.
 *
 * Describes one Corepack process launch.
 * Arguments remain separate from every command shell.
 *
 * @typedef {{
 *   command: string,
 *   commandArguments: string[],
 * }} CheckScaffoldsCorepackInvocation
 *
 * @since 0.0.0
 */

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
 * Check Scaffolds - Read Combined Command Output.
 *
 * Runs one consumer command and combines stdout with stderr so runtime warnings
 * cannot evade assertions merely because the child chose another stream.
 *
 * @param {string}   command - Command.
 * @param {string[]} args    - Args.
 * @param {string}   cwd     - Cwd.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
function readCombinedCommandOutput(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf-8',
  });

  if (result.error !== undefined) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error([
      `Command failed with exit code ${String(result.status)}: ${command} ${args.join(' ')}`,
      result.stdout,
      result.stderr,
    ].filter((line) => line !== '').join('\n'));
  }

  return `${result.stdout}${result.stderr}`;
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
 * Check Scaffolds - Resolve Corepack Invocation.
 *
 * Keeps POSIX execution direct while bypassing Windows command shims through
 * Corepack's JavaScript entry point and the active Node.js executable.
 *
 * @param {string[]} args - Args.
 *
 * @returns {CheckScaffoldsCorepackInvocation}
 *
 * @since 0.0.0
 */
function resolveCorepackInvocation(args) {
  if (process.platform !== 'win32') {
    return {
      command: 'corepack',
      commandArguments: args,
    };
  }

  return {
    command: process.execPath,
    commandArguments: [
      win32.join(win32.dirname(process.execPath), 'node_modules', 'corepack', 'dist', 'corepack.js'),
      ...args,
    ],
  };
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
 * Check Scaffolds - Expect npm Command Failure.
 *
 * Executes one installed package command through npm so Windows consumers do
 * not ask Node.js to launch a generated `.cmd` shim directly.
 *
 * @param {string[]} args            - Args.
 * @param {string}   cwd             - Cwd.
 * @param {string}   expectedMessage - Expected message.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function expectNpmCommandFailure(args, cwd, expectedMessage) {
  const invocation = resolveCorepackInvocation([
    'npm',
    ...args,
  ]);

  expectCommandFailure(invocation['command'], invocation['commandArguments'], cwd, expectedMessage);

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
  const cliExecutable = (process.platform === 'win32') ? `${workspaceName}.cmd` : workspaceName;
  const cliPath = join(projectDirectory, 'node_modules', '.bin', cliExecutable);

  if (existsSync(cliPath) === false) {
    throw new Error('The generated Node CLI should be linked into node_modules/.bin during installation.');
  }

  const npmExecArguments = [
    'exec',
    '--offline',
    '--workspace',
    workspacePackageName,
    '--',
    workspaceName,
  ];
  const statusOutput = readNpmOutput([
    ...npmExecArguments,
    'status',
  ], projectDirectory);

  for (const expectedText of [
    `${workspacePackageName} v0.0.1`,
    'CURRENTLY RUNNING:',
    `${workspacePackageName} status`,
    'Your command is ready.',
  ]) {
    if (statusOutput.includes(expectedText) === false) {
      throw new Error(`The generated Node CLI status command should include "${expectedText}".`);
    }
  }

  const helpOutput = readNpmOutput([
    ...npmExecArguments,
    '--help',
  ], projectDirectory);

  for (const expectedText of [
    `${workspacePackageName} v0.0.1`,
    `Usage: ${workspacePackageName} <command> [options]`,
    'Commands:',
    'status [options]',
  ]) {
    if (helpOutput.includes(expectedText) === false) {
      throw new Error(`The generated Node CLI help should include "${expectedText}".`);
    }
  }

  const versionOutput = readNpmOutput([
    ...npmExecArguments,
    '--version',
  ], projectDirectory).trim();

  if (versionOutput !== '0.0.1') {
    throw new Error(`The generated Node CLI should report version "0.0.1"; received "${versionOutput}".`);
  }

  expectNpmCommandFailure([
    ...npmExecArguments,
    'unknown-command',
  ], projectDirectory, 'ERROR Unknown command');

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
  const packageJson = JSON.parse(readFileSync(join(projectDirectory, 'packages', 'scaffold', 'package.json'), 'utf-8'));
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

    const helpOutput = readNpmOutput([
      'exec',
      '--offline',
      '--workspace',
      './packages/scaffold',
      '--',
      commandName,
      '--help',
    ], projectDirectory);

    for (const expectedText of [
      `homebridge-scaffold v${packageJson.version}`,
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
  const invocation = resolveCorepackInvocation([
    'npm',
    ...args,
  ]);

  return readCommandOutput(invocation['command'], invocation['commandArguments'], cwd);
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
  const invocation = resolveCorepackInvocation([
    'npm',
    ...args,
  ]);

  runCommand(invocation['command'], invocation['commandArguments'], cwd);

  return;
}

/**
 * Check Scaffolds - Verify Container Artifact Handoff.
 *
 * Builds immutable single- and multi-platform OCI layouts, then publishes each
 * layout twice through ORAS to two coordinates in one isolated local registry.
 *
 * @param {string} temporaryDirectory - Temporary directory.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function verifyContainerArtifactHandoff(temporaryDirectory) {
  const handoffDirectory = join(temporaryDirectory, 'container-artifact-handoff');
  const contextDirectory = join(handoffDirectory, 'context');
  const dockerfilePath = join(contextDirectory, 'Dockerfile');
  const payloadPath = join(contextDirectory, 'payload.txt');
  const resourceSuffix = `${String(process.pid)}-${String(Date.now())}`;
  const builderName = `nova-oci-builder-${resourceSuffix}`;
  const networkName = `nova-oci-network-${resourceSuffix}`;
  const orasContainerName = `nova-oci-oras-${resourceSuffix}`;
  const registryName = `nova-oci-registry-${resourceSuffix}`;
  const registryAddress = `${registryName}:5000`;
  const registryImage = 'registry:2.8.3';
  const orasImage = 'ghcr.io/oras-project/oras:v1.3.3';

  mkdirSync(contextDirectory, { recursive: true });
  writeFileSync(dockerfilePath, [
    'FROM scratch',
    '',
    'COPY payload.txt /payload.txt',
    '',
  ].join('\n'), 'utf-8');
  writeFileSync(payloadPath, 'Nova OCI handoff fixture.\n', 'utf-8');

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Run Oras.
   *
   * Runs the pinned ORAS client inside the isolated registry network. An
   * optional Docker-managed copy exposes the producer handoff without relying
   * on the daemon sharing the host's temporary-directory path.
   *
   * @param {string[]}           args              - Args.
   * @param {string | undefined} [exportDirectory] - Export directory.
   *
   * @returns {string}
   *
   * @since 0.0.0
   */
  const runOras = (args, exportDirectory = undefined) => {
    const dockerArguments = [
      'run',
      '--rm',
      '--name',
      orasContainerName,
      '--network',
      networkName,
    ];

    if (exportDirectory === undefined) {
      dockerArguments.push(
        orasImage,
        ...args,
      );

      return readCommandOutput('docker', dockerArguments, handoffDirectory).trim();
    }

    runCommand('docker', [
      'create',
      '--name',
      orasContainerName,
      '--network',
      networkName,
      orasImage,
      ...args,
    ], handoffDirectory);

    try {
      runCommand('docker', [
        'cp',
        `${exportDirectory}${sep}.`,
        `${orasContainerName}:/workspace`,
      ], handoffDirectory);

      return readCommandOutput('docker', [
        'start',
        '--attach',
        orasContainerName,
      ], handoffDirectory).trim();
    } finally {
      spawnSync('docker', [
        'container',
        'rm',
        '--force',
        orasContainerName,
      ], {
        stdio: 'ignore',
      });
    }
  };

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Verify Resolved Tags.
   *
   * Resolves every registry tag and requires all coordinates to retain the
   * producer digest before and after an idempotent publication retry.
   *
   * @param {string}   repositoryCoordinate - Repository coordinate.
   * @param {string}   expectedDigest       - Expected digest.
   * @param {string[]} tags                 - Tags.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  const verifyResolvedTags = (repositoryCoordinate, expectedDigest, tags) => {
    for (const tag of tags) {
      const publishedDigest = runOras([
        'resolve',
        '--plain-http',
        `${repositoryCoordinate}:${tag}`,
      ]);

      if (publishedDigest !== expectedDigest) {
        throw new Error(`Published digest mismatch for "${repositoryCoordinate}:${tag}": got ${publishedDigest}, expected ${expectedDigest}.`);
      }
    }

    return;
  };

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Verify Published Index.
   *
   * Reads the copied multi-platform index by producer digest and proves both
   * expected child platforms and their recursively copied manifests exist.
   *
   * @param {string}   repositoryCoordinate - Repository coordinate.
   * @param {string}   expectedDigest       - Expected digest.
   * @param {string[]} expectedPlatforms    - Expected platforms.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  const verifyPublishedIndex = (repositoryCoordinate, expectedDigest, expectedPlatforms) => {
    const indexRaw = runOras([
      'manifest',
      'fetch',
      '--plain-http',
      `${repositoryCoordinate}@${expectedDigest}`,
    ]);
    const index = JSON.parse(indexRaw);
    const indexMediaType = index['mediaType'];
    const manifestDescriptors = index['manifests'];

    if (
      indexMediaType !== 'application/vnd.oci.image.index.v1+json'
      || Array.isArray(manifestDescriptors) === false
    ) {
      throw new Error(`Published digest "${expectedDigest}" should identify a multi-platform OCI image index.`);
    }

    const publishedPlatforms = new Set();
    const childDigests = [];

    for (const manifestDescriptor of manifestDescriptors) {
      if (typeof manifestDescriptor !== 'object' || manifestDescriptor === null) {
        throw new TypeError('The published OCI index should contain object descriptors.');
      }

      const manifestDescriptorDigest = manifestDescriptor['digest'];
      const manifestDescriptorPlatform = manifestDescriptor['platform'];

      if (
        typeof manifestDescriptorDigest !== 'string'
        || typeof manifestDescriptorPlatform !== 'object'
        || manifestDescriptorPlatform === null
      ) {
        throw new TypeError('The published OCI index should contain digest-addressed platform descriptors.');
      }

      const manifestDescriptorOperatingSystem = manifestDescriptorPlatform['os'];
      const manifestDescriptorArchitecture = manifestDescriptorPlatform['architecture'];

      if (
        typeof manifestDescriptorOperatingSystem !== 'string'
        || typeof manifestDescriptorArchitecture !== 'string'
      ) {
        throw new TypeError('The published OCI index platform descriptors should identify an operating system and architecture.');
      }

      publishedPlatforms.add(`${manifestDescriptorOperatingSystem}/${manifestDescriptorArchitecture}`);

      childDigests.push(manifestDescriptorDigest);
    }

    for (const expectedPlatform of expectedPlatforms) {
      if (publishedPlatforms.has(expectedPlatform) === false) {
        throw new Error(`Published OCI index "${expectedDigest}" is missing platform "${expectedPlatform}".`);
      }
    }

    for (const childDigest of childDigests) {
      const childManifestRaw = runOras([
        'manifest',
        'fetch',
        '--plain-http',
        `${repositoryCoordinate}@${childDigest}`,
      ]);
      const childManifest = JSON.parse(childManifestRaw);

      if (childManifest['mediaType'] !== 'application/vnd.oci.image.manifest.v1+json') {
        throw new Error(`Published child digest "${childDigest}" should identify an OCI image manifest.`);
      }
    }

    return;
  };

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Publish Layout.
   *
   * Copies one read-only producer layout into a registry coordinate, applies
   * digest-based tags, and repeats the same publication to prove retry safety.
   *
   * @param {string}   exportDirectory      - Export directory.
   * @param {string}   repositoryCoordinate - Repository coordinate.
   * @param {string}   expectedDigest       - Expected digest.
   * @param {string[]} [expectedPlatforms]  - Expected platforms.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  const publishLayout = (exportDirectory, repositoryCoordinate, expectedDigest, expectedPlatforms = []) => {
    const sourceReference = `/workspace/layout@${expectedDigest}`;
    const shaTag = 'sha-fixture';
    const additionalTags = [
      'release-fixture',
      'channel-fixture',
      'latest',
    ];
    const publishedTags = [
      shaTag,
      ...additionalTags,
    ];

    runOras([
      'cp',
      '--from-oci-layout',
      '--to-plain-http',
      sourceReference,
      `${repositoryCoordinate}:${shaTag}`,
    ], exportDirectory);

    runOras([
      'tag',
      '--plain-http',
      `${repositoryCoordinate}@${expectedDigest}`,
      ...additionalTags,
    ]);

    verifyResolvedTags(repositoryCoordinate, expectedDigest, publishedTags);

    runOras([
      'cp',
      '--from-oci-layout',
      '--to-plain-http',
      sourceReference,
      `${repositoryCoordinate}:${shaTag}`,
    ], exportDirectory);

    runOras([
      'tag',
      '--plain-http',
      `${repositoryCoordinate}@${expectedDigest}`,
      ...additionalTags,
    ]);

    verifyResolvedTags(repositoryCoordinate, expectedDigest, publishedTags);

    if (expectedPlatforms.length > 0) {
      verifyPublishedIndex(repositoryCoordinate, expectedDigest, expectedPlatforms);
    }

    return;
  };

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Verify Container Export.
   *
   * Exports one platform selection through the dedicated Buildx builder and
   * proves its recorded metadata digest addresses the resulting OCI layout.
   *
   * @param {string}   label             - Label.
   * @param {string[]} platforms         - Platforms.
   * @param {string[]} expectedPlatforms - Expected platforms.
   *
   * @returns {void}
   *
   * @since 0.0.0
   */
  const verifyContainerExport = (label, platforms, expectedPlatforms) => {
    const exportDirectory = join(handoffDirectory, label);
    const layoutDirectory = join(exportDirectory, 'layout');
    const digestPath = join(exportDirectory, 'container-image.digest');
    const metadataPath = join(exportDirectory, 'metadata.json');
    const relativeLayoutDirectory = `./${label}/layout`;
    const relativeMetadataPath = `./${label}/metadata.json`;

    mkdirSync(exportDirectory, { recursive: true });

    runCommand('docker', [
      'buildx',
      'build',
      '--builder',
      builderName,
      '--file',
      './context/Dockerfile',
      '--metadata-file',
      relativeMetadataPath,
      '--output',
      `type=oci,dest=${relativeLayoutDirectory},tar=false`,
      '--platform',
      platforms.join(','),
      '--progress',
      'plain',
      '--provenance=false',
      '--tag',
      'nova.local/container:nova-oci',
      './context',
    ], handoffDirectory);

    const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'));
    const metadataDigest = metadata['containerimage.digest'];

    if (
      typeof metadataDigest !== 'string'
      || metadataDigest.startsWith('sha256:') === false
      || metadataDigest.length !== 71
    ) {
      throw new Error('Buildx metadata should contain a sha256 container image digest.');
    }

    const digestHex = metadataDigest.slice('sha256:'.length);
    const digestBlobPath = join(layoutDirectory, 'blobs', 'sha256', digestHex);
    const layoutIndexPath = join(layoutDirectory, 'index.json');
    const layoutMetadataPath = join(layoutDirectory, 'oci-layout');

    if (
      existsSync(digestBlobPath) === false
      || existsSync(layoutIndexPath) === false
      || existsSync(layoutMetadataPath) === false
    ) {
      throw new Error(`Buildx metadata digest "${metadataDigest}" should address the exported OCI layout.`);
    }

    writeFileSync(digestPath, metadataDigest, 'utf-8');

    const recordedDigest = readFileSync(digestPath, 'utf-8').trim();
    const repositoryCoordinates = [
      `${registryAddress}/docker-hub-${label}/appliance`,
      `${registryAddress}/ghcr-${label}/appliance`,
    ];

    for (const repositoryCoordinate of repositoryCoordinates) {
      publishLayout(exportDirectory, repositoryCoordinate, recordedDigest, expectedPlatforms);
    }

    return;
  };

  /**
   * Check Scaffolds - Verify Container Artifact Handoff - Wait For Registry.
   *
   * Polls the local registry through the pinned ORAS container until the empty
   * catalog endpoint responds, with a bounded failure diagnostic for startup.
   *
   * @param {number} attemptsRemaining - Attempts remaining.
   *
   * @returns {Promise<void>}
   *
   * @since 0.0.0
   */
  const waitForRegistry = async (attemptsRemaining) => {
    const result = spawnSync('docker', [
      'run',
      '--rm',
      '--name',
      orasContainerName,
      '--network',
      networkName,
      orasImage,
      'repo',
      'ls',
      '--plain-http',
      registryAddress,
    ], {
      cwd: handoffDirectory,
      encoding: 'utf-8',
    });

    if (result.error !== undefined) {
      throw result.error;
    }

    if (result.status === 0) {
      return;
    }

    if (attemptsRemaining <= 1) {
      throw new Error([
        `The disposable OCI registry at "${registryAddress}" did not become ready.`,
        result.stdout,
        result.stderr,
      ].filter((line) => line !== '').join('\n'));
    }

    await wait(250);

    return waitForRegistry(attemptsRemaining - 1);
  };

  try {
    runCommand('docker', [
      'buildx',
      'create',
      '--driver',
      'docker-container',
      '--name',
      builderName,
    ], handoffDirectory);

    runCommand('docker', [
      'buildx',
      'inspect',
      '--bootstrap',
      builderName,
    ], handoffDirectory);

    runCommand('docker', [
      'network',
      'create',
      '--internal',
      networkName,
    ], handoffDirectory);

    runCommand('docker', [
      'run',
      '--detach',
      '--name',
      registryName,
      '--network',
      networkName,
      registryImage,
    ], handoffDirectory);

    await waitForRegistry(60);

    verifyContainerExport('single-platform', ['linux/amd64'], []);

    verifyContainerExport('multi-platform', [
      'linux/amd64',
      'linux/arm64',
    ], [
      'linux/amd64',
      'linux/arm64',
    ]);
  } finally {
    spawnSync('docker', [
      'container',
      'rm',
      '--force',
      orasContainerName,
    ], {
      stdio: 'ignore',
    });

    spawnSync('docker', [
      'container',
      'rm',
      '--force',
      registryName,
    ], {
      stdio: 'ignore',
    });

    spawnSync('docker', [
      'network',
      'rm',
      networkName,
    ], {
      stdio: 'ignore',
    });

    spawnSync('docker', [
      'buildx',
      'rm',
      '--force',
      builderName,
    ], {
      stdio: 'ignore',
    });
  }

  process.stdout.write('Container OCI artifact handoff passed.\n');

  return;
}

/**
 * Check Scaffolds - Verify Generated Docker Runtime.
 *
 * Builds and starts an isolated one-service scaffold so the canonical Docker
 * output is exercised through s6 startup, aggregate health, numeric privilege
 * dropping, timezone propagation, read-only operation, and graceful shutdown.
 *
 * @param {string} novaCliPath        - Nova cli path.
 * @param {string} temporaryDirectory - Temporary directory.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function verifyGeneratedDockerRuntime(novaCliPath, temporaryDirectory) {
  const dockerPackagingModulePath = join(novaCliPath, '..', '..', 'build', 'src', 'lib', 'docker-packaging.js');
  const dockerPackagingModule = await import(pathToFileURL(dockerPackagingModulePath).href);
  const dockerPackaging = dockerPackagingModule.Runner;

  /**
   * Check Scaffolds - Verify Generated Docker Runtime - Verify Package Manager Runtime.
   *
   * Builds one manager-specific fixture serially so each image proves that an
   * internal workspace dependency remains resolvable in the final appliance.
   *
   * @param {string} runtimePackageManager      - Runtime package manager.
   * @param {string} runtimePackageManagerLabel - Runtime package manager label.
   *
   * @returns {Promise<void>}
   *
   * @since 0.0.0
   */
  const verifyPackageManagerRuntime = async (runtimePackageManager, runtimePackageManagerLabel) => {
    const runtimeProjectName = `docker-runtime-${runtimePackageManagerLabel}-project`;
    const runtimeProjectDirectory = join(temporaryDirectory, runtimeProjectName);
    const runtimeRootPackagePath = join(runtimeProjectDirectory, 'package.json');
    const runtimeSharedDirectory = join(runtimeProjectDirectory, 'packages', 'shared');
    const runtimeSharedPackagePath = join(runtimeSharedDirectory, 'package.json');
    const runtimeSharedSourcePath = join(runtimeSharedDirectory, 'src', 'index.js');
    const runtimeWorkspaceDirectory = join(runtimeProjectDirectory, 'apps', 'api');
    const runtimePackagePath = join(runtimeWorkspaceDirectory, 'package.json');
    const runtimeSourcePath = join(runtimeWorkspaceDirectory, 'src', 'index.js');
    const runtimeImageTag = `nova-scaffold-runtime-${runtimePackageManagerLabel}:${String(process.pid)}`;
    const runtimeContainerName = `nova-scaffold-runtime-${runtimePackageManagerLabel}-${String(process.pid)}`;
    const shellVariableMarker = '$';

    try {
      runCommand(process.execPath, [
        novaCliPath,
        'scaffold',
        'app',
        'expressjs',
        '--docker-image',
        '--non-interactive',
        '--no-install',
        '--name',
        runtimeProjectName,
        '--workspace-name',
        'api',
        '--output',
        `./${runtimeProjectName}`,
      ], temporaryDirectory);

      const runtimeRootPackage = JSON.parse(readFileSync(runtimeRootPackagePath, 'utf-8'));
      const runtimePackage = JSON.parse(readFileSync(runtimePackagePath, 'utf-8'));

      runtimeRootPackage.packageManager = runtimePackageManager;
      runtimePackage.dependencies = {
        'docker-runtime-shared': 'workspace:*',
      };
      runtimePackage.devDependencies = {};
      runtimePackage.scripts = {
        build: 'mkdir -p build && cp src/index.js build/index.js',
      };

      mkdirSync(join(runtimeSharedDirectory, 'src'), { recursive: true });
      writeFileSync(runtimeRootPackagePath, `${JSON.stringify(runtimeRootPackage, null, 2)}\n`, 'utf-8');
      writeFileSync(runtimeSharedPackagePath, `${JSON.stringify({
        name: 'docker-runtime-shared',
        private: true,
        type: 'module',
        version: '0.0.0',
        exports: './src/index.js',
      }, null, 2)}\n`, 'utf-8');
      writeFileSync(runtimeSharedSourcePath, 'export const healthyResponse = \'healthy\';\n', 'utf-8');
      writeFileSync(runtimePackagePath, `${JSON.stringify(runtimePackage, null, 2)}\n`, 'utf-8');
      writeFileSync(runtimeSourcePath, [
        'import { createServer } from \'node:http\';',
        'import { healthyResponse } from \'docker-runtime-shared\';',
        '',
        'const port = Number.parseInt(process.env[\'PORT\'] ?? \'3000\', 10);',
        '',
        'createServer((_request, response) => response.end(healthyResponse)).listen(port, \'0.0.0.0\');',
        '',
      ].join('\n'), 'utf-8');

      await dockerPackaging.generateForTarget({
        profile: 'http-service',
        projectDirectory: runtimeProjectDirectory,
        replaceFile: true,
        workspaceDirectory: runtimeWorkspaceDirectory,
        workspaceName: 'api',
      });

      runCommand('docker', [
        'build',
        '--tag',
        runtimeImageTag,
        '.',
      ], runtimeProjectDirectory);

      runCommand('docker', [
        'run',
        '--detach',
        '--name',
        runtimeContainerName,
        '--health-interval',
        '1s',
        '--health-retries',
        '10',
        '--health-start-period',
        '1s',
        '--health-timeout',
        '3s',
        '--read-only',
        '--tmpfs',
        '/run:rw,exec,nosuid,size=64m',
        '--tmpfs',
        '/tmp:rw,noexec,nosuid,size=64m',
        '--env',
        'PGID=1234',
        '--env',
        'PUID=1234',
        '--env',
        'S6_READ_ONLY_ROOT=1',
        '--env',
        'TZ=America/New_York',
        runtimeImageTag,
      ], runtimeProjectDirectory);

      /**
     * Check Scaffolds - Verify Generated Docker Runtime - Wait For Health.
     *
     * Polls the isolated container without hiding a terminal unhealthy state.
     * Bounds startup time so a broken supervision graph fails the smoke test.
     *
     * @param {number} attemptsRemaining - Attempts remaining.
     *
     * @returns {Promise<string>}
     *
     * @since 0.0.0
     */
      const waitForHealth = async (attemptsRemaining) => {
        const currentHealthStatus = readCommandOutput('docker', [
          'inspect',
          '--format',
          '{{.State.Health.Status}}',
          runtimeContainerName,
        ], runtimeProjectDirectory).trim();

        if (
          currentHealthStatus === 'healthy'
          || currentHealthStatus === 'unhealthy'
          || attemptsRemaining <= 1
        ) {
          return currentHealthStatus;
        }

        await wait(1000);

        return waitForHealth(attemptsRemaining - 1);
      };
      const healthStatus = await waitForHealth(60);

      if (healthStatus !== 'healthy') {
        const containerLogs = readCombinedCommandOutput('docker', [
          'logs',
          runtimeContainerName,
        ], runtimeProjectDirectory);

        throw new Error([
          `The generated s6 appliance did not become healthy (status: ${healthStatus}).`,
          containerLogs,
        ].join('\n'));
      }

      const pidOneCommand = readCommandOutput('docker', [
        'exec',
        runtimeContainerName,
        'sh',
        '-c',
        'tr "\\000" " " < /proc/1/cmdline',
      ], runtimeProjectDirectory).trim();
      const pidOneIdentity = readCommandOutput('docker', [
        'exec',
        runtimeContainerName,
        'sh',
        '-c',
        'awk \'/^Uid:/{uid=$2} /^Gid:/{gid=$2} END{print uid ":" gid}\' /proc/1/status',
      ], runtimeProjectDirectory).trim();
      const serviceIdentity = readCommandOutput('docker', [
        'exec',
        runtimeContainerName,
        'sh',
        '-c',
        `service_pid="$(pidof node)"; awk '/^Uid:/{uid=$2} /^Gid:/{gid=$2} END{print uid ":" gid}' "/proc/${shellVariableMarker}{service_pid}/status"`,
      ], runtimeProjectDirectory).trim();
      const effectiveTimezone = readCommandOutput('docker', [
        'exec',
        runtimeContainerName,
        'node',
        '-e',
        'process.stdout.write(Intl.DateTimeFormat().resolvedOptions().timeZone)',
      ], runtimeProjectDirectory).trim();
      const runtimeLogs = readCombinedCommandOutput('docker', [
        'logs',
        runtimeContainerName,
      ], runtimeProjectDirectory);

      if (pidOneCommand.includes('s6-svscan') === false) {
        throw new Error(`The generated container should run s6-svscan as PID 1 after /init hands off; received "${pidOneCommand}".`);
      }

      if (pidOneIdentity !== '0:0') {
        throw new Error(`The generated s6 supervisor should run as root; received "${pidOneIdentity}".`);
      }

      if (serviceIdentity !== '1234:1234') {
        throw new Error(`The generated service should run as 1234:1234; received "${serviceIdentity}".`);
      }

      if (effectiveTimezone !== 'America/New_York') {
        throw new Error(`The generated service should observe America/New_York; received "${effectiveTimezone}".`);
      }

      if (runtimeLogs.includes('s6-rc.d/user') === true || runtimeLogs.toLowerCase().includes('deprecated') === true) {
        throw new Error('The generated container emitted an s6 compatibility or deprecation warning.');
      }

      runCommand('docker', [
        'stop',
        '--time',
        '15',
        runtimeContainerName,
      ], runtimeProjectDirectory);

      const exitCode = readCommandOutput('docker', [
        'inspect',
        '--format',
        '{{.State.ExitCode}}',
        runtimeContainerName,
      ], runtimeProjectDirectory).trim();

      if (exitCode !== '0') {
        throw new Error(`The generated s6 appliance should stop cleanly; received exit code ${exitCode}.`);
      }
    } finally {
      spawnSync('docker', [
        'container',
        'rm',
        '--force',
        runtimeContainerName,
      ], {
        stdio: 'ignore',
      });

      spawnSync('docker', [
        'image',
        'rm',
        '--force',
        runtimeImageTag,
      ], {
        stdio: 'ignore',
      });
    }

    return;
  };

  await verifyPackageManagerRuntime('npm@11.18.0', 'npm');
  await verifyPackageManagerRuntime('pnpm@10.17.1', 'pnpm');
  await verifyPackageManagerRuntime('yarn@1.22.22', 'yarn-classic');
  await verifyPackageManagerRuntime('yarn@4.9.4', 'yarn-berry');

  process.stdout.write('Generated Docker s6 runtime passed.\n');

  return;
}

/**
 * Check Scaffolds - Verify Install Script Decisions.
 *
 * Confirms the generated root lifecycle policy covers every dependency that
 * requests an install script. npm may otherwise complete installation while
 * leaving required scripts pending approval.
 *
 * @param {string} projectDirectory - Project directory.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyInstallScriptDecisions(projectDirectory) {
  const output = readNpmOutput([
    'install-scripts',
    'ls',
    '--json',
  ], projectDirectory);
  const report = JSON.parse(output);
  const pending = report['allowScripts'];

  if (Array.isArray(pending) === false) {
    throw new TypeError('npm install-scripts should return an allowScripts array.');
  }

  if (pending.length > 0) {
    throw new Error(`Generated scaffold lifecycle policy is missing decisions for: ${pending.join(', ')}.`);
  }

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
 * @returns {void}
 *
 * @since 0.0.0
 */
function verifyCloudflareWorkerRuntime(projectDirectory) {
  const workspaceDirectory = join(projectDirectory, 'packages', 'cloudflare-tool');
  const probeLines = [
    'import { createRequire } from \'node:module\';',
    'import { join } from \'node:path\';',
    'import { pathToFileURL } from \'node:url\';',
    'const workspaceDirectory = process.argv[1];',
    'const workspaceRequire = createRequire(join(workspaceDirectory, \'package.json\'));',
    'const wranglerModulePath = workspaceRequire.resolve(\'wrangler\');',
    'const wranglerModule = await import(pathToFileURL(wranglerModulePath).href);',
    'const server = wranglerModule.createTestHarness({',
    '  root: workspaceDirectory,',
    '  workers: [{ configPath: \'./wrangler.toml\' }],',
    '});',
    'try {',
    '  await server.listen();',
    '  const response = await server.fetch(\'/\');',
    '  const expectedBody = JSON.stringify({ message: \'Welcome to scaffold-smoke\' });',
    '  if (response.status !== 200 || await response.text() !== expectedBody) {',
    '    throw new Error(\'The generated Cloudflare Worker should return the starter response.\');',
    '  }',
    '} finally {',
    '  await server.close();',
    '}',
  ];

  // Keep Wrangler and workerd in a short-lived process so Windows releases
  // their native modules before the generated scaffold directory is removed.
  runCommand(process.execPath, [
    '--input-type=module',
    '--eval',
    probeLines.join('\n'),
    workspaceDirectory,
  ], projectDirectory);

  process.stdout.write('Generated Cloudflare Worker runtime responded successfully.\n');

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
 * @since 0.0.0
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
  const scaffoldConcurrency = (process.platform === 'win32') ? 2 : Math.min(4, availableParallelism());
  const temporaryDirectory = createScaffoldTemporaryDirectory();
  const projectDirectory = join(temporaryDirectory, 'project');
  const baseProjectDirectory = join(temporaryDirectory, 'base-project');
  const novaCliPath = join(repositoryDirectory, 'packages', 'nova', 'bin', 'nova.mjs');
  let primaryError = undefined;

  try {
    runCommand(process.execPath, [
      './scripts/nova-run-workspaces.mjs',
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

    // Prove that starter base is optional while making the resulting project
    // the one fully installed, checked, and built by this smoke matrix.
    runCommand(process.execPath, [
      novaCliPath,
      'scaffold',
      'app',
      'vite',
      '--non-interactive',
      '--no-install',
      '--name',
      'scaffold-smoke',
      '--workspace-name',
      'web',
      '--output',
      './project',
    ], temporaryDirectory);

    verifyWorkspaceRegistrations(projectDirectory, {
      './': {
        name: 'scaffold-smoke-project',
        policy: 'freezable',
        role: 'project',
      },
      './apps/web': {
        name: 'scaffold-smoke-app-web',
        policy: 'trackable',
        role: 'app',
      },
    });

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
      './apps/web': {
        name: 'scaffold-smoke-app-web',
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

    const changelogDirectory = join(projectDirectory, '.changelog');
    const appleChangelogEntryPath = join(changelogDirectory, 'apple-scaffold-release.md');

    mkdirSync(changelogDirectory, { recursive: true });
    writeFileSync(appleChangelogEntryPath, [
      '---',
      'package: "scaffold-smoke-app-apple"',
      'category: fixed',
      'bump: patch',
      '---',
      '',
      'Verified the generated Apple release flow.',
      '',
    ].join('\n'), 'utf-8');

    runCommand(process.execPath, [
      novaCliPath,
      'utility',
      'changelog',
      '--release',
    ], projectDirectory);

    const applePackageJson = JSON.parse(readFileSync(join(projectDirectory, 'apps', 'apple', 'package.json'), 'utf-8'));
    const appleProjectYml = readFileSync(join(projectDirectory, 'apps', 'apple', 'project.yml'), 'utf-8');
    const appleChangelog = readFileSync(join(projectDirectory, 'apps', 'apple', 'CHANGELOG.md'), 'utf-8');

    if (
      applePackageJson['version'] !== '0.0.2'
      || appleProjectYml.includes('MARKETING_VERSION: "0.0.2"') === false
      || appleProjectYml.includes('CURRENT_PROJECT_VERSION: "2"') === false
      || new RegExp(PATTERN_APPLE_SCAFFOLD_SMOKE_CHANGELOG_RELEASE_HEADING.source, 'mu').test(appleChangelog) === false
      || existsSync(appleChangelogEntryPath) === true
    ) {
      throw new Error('The generated Apple scaffold should release package version 0.0.2 with marketing version 0.0.2 and build 2.');
    }

    verifyWorkspaceEnvironmentVariables(projectDirectory, './apps/bot', {
      DISCORD_TOKEN: '',
    });

    verifyWorkspaceEnvironmentVariables(projectDirectory, './apps/express', {
      PORT: '3000',
    });

    verifyWorkspaceEnvironmentVariables(projectDirectory, './tools/scaffold-action', {
      INPUT_NAME: 'Nova',
    });

    const dockerignorePath = join(projectDirectory, '.dockerignore');

    writeFileSync(dockerignorePath, 'stale Docker ignore file\n', 'utf-8');

    runCommand(process.execPath, [
      novaCliPath,
      'generate',
      'must-haves',
      'ignore-files',
      '--replace-file',
    ], projectDirectory);

    const regeneratedDockerignore = readFileSync(dockerignorePath, 'utf-8');

    for (const expectedCategory of [
      '#### Shared ####',
      '#### Version Control - Git / GitHub ####',
      '#### Language - Node.js ####',
      '#### Tooling - Nova ####',
      '#### Project Excludes ####',
    ]) {
      if (regeneratedDockerignore.includes(expectedCategory) === false) {
        throw new Error(`The ignore-files generator should restore ${expectedCategory} in the root .dockerignore.`);
      }
    }

    for (const expectedPattern of [
      '**/.env',
      '**/.env.*',
      '!**/.env.sample',
      '!**/.env.example',
      '**/.secrets',
      '**/build',
      '**/dist',
      '**/node_modules',
    ]) {
      if (regeneratedDockerignore.includes(expectedPattern) === false) {
        throw new Error(`The ignore-files generator should restore ${expectedPattern} in the root .dockerignore.`);
      }
    }

    verifyDockerfileBanners([join(projectDirectory, 'Dockerfile')]);

    verifyLaunchSequenceCopy([
      join(projectDirectory, 'apps', 'web', 'src', 'main.ts'),
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
      `scripts.check=nova utility run-workspaces --concurrency=${scaffoldConcurrency} --continue-on-error check`,
      `scripts.build=nova utility run-workspaces --concurrency=${scaffoldConcurrency} --continue-on-error --node-env production build`,
    ], projectDirectory);

    runNpm([
      'install',
      '--no-audit',
      '--no-fund',
    ], projectDirectory);

    verifyInstallScriptDecisions(projectDirectory);

    const installedNovaCliPath = join(projectDirectory, 'node_modules', '@cbnventures', 'nova', 'bin', 'nova.mjs');

    // Exercise the explicit starter through the packed, installed CLI. Its
    // shared root template is already covered by the fully checked project, so
    // a second dependency tree and duplicate check/build pass add no coverage.
    runCommand(process.execPath, [
      installedNovaCliPath,
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--no-install',
      '--name',
      'base-smoke',
      '--output',
      './base-project',
    ], temporaryDirectory);

    verifyWorkspaceRegistrations(baseProjectDirectory, {
      './': {
        name: 'base-smoke-project',
        policy: 'freezable',
        role: 'project',
      },
    });

    verifyCloudflareWorkerRuntime(projectDirectory);

    verifyBundlerLoad(projectDirectory, 'apps/docs', 'vitest');
    verifyBundlerLoad(projectDirectory, 'apps/vite', 'vite');
    verifyBundlerLoad(projectDirectory, 'apps/vite-svelte', 'vite');
    verifyBundlerLoad(projectDirectory, 'apps/vite-vue', 'vite');
    verifyBundlerLoad(projectDirectory, 'apps/web', 'vite');

    const novaPackageJson = JSON.parse(readFileSync(join(repositoryDirectory, 'packages', 'nova', 'package.json'), 'utf-8'));
    const novaVersion = novaPackageJson['version'];
    const novaHelpOutput = readNpmOutput([
      'exec',
      '--offline',
      '--',
      'nova',
      '--help',
    ], projectDirectory);

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
        '--',
        '--exclude-workspace',
        'scaffold-smoke-tool-docker',
      ], projectDirectory);

      // The installed smoke fixture points Nova dependencies at tarballs kept
      // outside the generated project, so its assembly workspace cannot install
      // them from inside a Docker build context. Lint the complete multi-workspace
      // Dockerfile here; the isolated runtime check below performs the full image
      // build without those test-only external file dependencies.
      runCommand('docker', [
        'build',
        '--check',
        '.',
      ], projectDirectory);

      await verifyContainerArtifactHandoff(temporaryDirectory);

      await verifyGeneratedDockerRuntime(novaCliPath, temporaryDirectory);
    } else {
      process.stdout.write('Docker is not installed; building every generated workspace except those with Docker packaging.\n');

      runNpm([
        'run',
        'build',
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
  } catch (error) {
    primaryError = error;

    throw error;
  } finally {
    try {
      removeScaffoldTemporaryDirectory(temporaryDirectory);
    } catch (cleanupError) {
      if (primaryError === undefined) {
        throw cleanupError;
      }

      const cleanupMessage = (cleanupError instanceof Error) ? cleanupError.message : String(cleanupError);

      process.stderr.write(`Scaffold cleanup also failed without replacing the primary error: ${cleanupMessage}\n`);
    }
  }

  process.stdout.write('All generated scaffold consumers passed.\n');

  return;
}

await checkScaffolds();
