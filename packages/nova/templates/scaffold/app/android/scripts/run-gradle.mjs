import { spawn } from 'node:child_process';

import {
  androidEnvironment,
  isWindows,
} from './android-environment.mjs';

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
  env: androidEnvironment,
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
