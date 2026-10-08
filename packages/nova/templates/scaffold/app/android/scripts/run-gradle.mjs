import { spawn } from 'node:child_process';

/**
 * Run Gradle - Is Windows.
 *
 * Identifies whether the generated project is running on Windows.
 * The result selects the platform-appropriate Gradle wrapper executable.
 *
 * @since 0.0.0
 */
const isWindows = process.platform === 'win32';

/**
 * Run Gradle - Executable.
 *
 * Selects the checked-in Gradle wrapper for the current operating system.
 * Keeping this choice here makes every package script platform-neutral.
 *
 * @since 0.0.0
 */
const executable = (isWindows === true) ? 'gradlew.bat' : './gradlew';

/**
 * Run Gradle - Child.
 *
 * Runs the wrapper from the Android workspace and forwards all arguments.
 * Inherited stdio keeps Gradle output and prompts visible to the developer.
 *
 * @since 0.0.0
 */
const child = spawn(executable, process.argv.slice(2), {
  cwd: new URL('../', import.meta.url),
  shell: isWindows,
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
