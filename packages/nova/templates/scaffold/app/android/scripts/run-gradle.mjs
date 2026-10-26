import { spawn } from 'node:child_process';

import {
  androidEnvironment,
  isWindows,
} from './android-environment.mjs';

/**
 * Run Gradle - Executable.
 *
 * Selects the platform-specific command used to launch Gradle.
 *
 * Uses a POSIX shell outside Windows so a generated wrapper does not rely on
 * executable mode bits that Windows Git clients cannot infer for new files.
 *
 * @since 0.0.0
 */
const executable = (isWindows === true) ? 'gradlew.bat' : 'sh';

/**
 * Run Gradle - Wrapper Arguments.
 *
 * Selects the arguments forwarded to the platform-specific Gradle command.
 *
 * Prepends the POSIX wrapper path when a shell reads it while Windows keeps
 * forwarding user arguments directly to its native batch wrapper.
 *
 * @since UNRELEASED
 */
const wrapperArguments = (isWindows === true) ? process.argv.slice(2) : [
  './gradlew',
  ...process.argv.slice(2),
];

/**
 * Run Gradle - Child.
 *
 * Runs the wrapper from the Android workspace and forwards all arguments.
 * Inherited stdio keeps Gradle output and prompts visible to the developer.
 *
 * @since 0.0.0
 */
const child = spawn(executable, wrapperArguments, {
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
