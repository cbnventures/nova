import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Run Apple - Workspace Directory.
 *
 * Anchors generated project and build paths to the Apple workspace rather than
 * the shell's current directory.
 *
 * @since 0.0.0
 */
const workspaceDirectory = fileURLToPath(new URL('../', import.meta.url));

/**
 * Run Apple - Action.
 *
 * Selects the Xcode lifecycle operation requested by the package script.
 * The resolved value chooses one supported native lifecycle command.
 *
 * @since 0.0.0
 */
const action = process.argv[2];

/**
 * Run Apple - Commands.
 *
 * Keeps XcodeGen and Xcode invocations centralized while preserving the
 * generated workspace identifier in every native command.
 *
 * @since 0.0.0
 */
const commands = new Map([
  [
    'generate',
    {
      executable: 'xcodegen',
      arguments: ['generate'],
    },
  ],
  [
    'test',
    {
      executable: 'xcodebuild',
      arguments: [
        'test',
        '-scheme',
        '[__WORKSPACE_IDENTIFIER__]',
        '-destination',
        'platform=macOS',
        '-derivedDataPath',
        './build/DerivedData',
        'CODE_SIGNING_ALLOWED=NO',
      ],
    },
  ],
  [
    'build',
    {
      executable: 'xcodebuild',
      arguments: [
        'build',
        '-scheme',
        '[__WORKSPACE_IDENTIFIER__]',
        '-destination',
        'generic/platform=macOS',
        '-derivedDataPath',
        './build/DerivedData',
        'CODE_SIGNING_ALLOWED=NO',
      ],
    },
  ],
]);

/**
 * Run Apple - Command.
 *
 * Resolves the requested native command before platform handling so malformed
 * package scripts fail consistently on every operating system.
 *
 * @since 0.0.0
 */
const command = (action === undefined) ? undefined : commands.get(action);

if (command === undefined) {
  process.stderr.write(`Unknown Apple lifecycle action: ${action ?? '(missing)'}.\n`);
  process.exitCode = 1;
} else if (process.platform !== 'darwin') {
  process.stdout.write(`Skipping Apple ${action} on ${process.platform}: Xcode requires macOS.\n`);
} else {
  /**
   * Run Apple - Child.
   *
   * Runs the selected native tool with visible output and preserves its result
   * for npm, Nova's workspace runner, and CI.
   *
   * @since 0.0.0
   */
  const child = spawn(command.executable, command.arguments, {
    cwd: workspaceDirectory,
    stdio: 'inherit',
  });

  child.once('error', (error) => {
    process.stderr.write(`${String(error)}\n`);
    process.exitCode = 1;

    return;
  });

  child.once('exit', (code) => {
    process.exitCode = code ?? 1;

    return;
  });
}
