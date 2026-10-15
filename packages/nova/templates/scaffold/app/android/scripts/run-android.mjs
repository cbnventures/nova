import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  androidEnvironment,
  isWindows,
} from './android-environment.mjs';

/**
 * Run Android - Workspace Directory.
 *
 * Anchors generated build and APK paths to the Android workspace rather than
 * the shell's current directory.
 *
 * @since 0.0.0
 */
const workspaceDirectory = fileURLToPath(new URL('../', import.meta.url));

/**
 * Run Android - Debug Apk.
 *
 * Points Google's Android CLI at the artifact produced by assembleDebug and
 * keeps the path independent from the shell's current directory.
 *
 * @since 0.0.0
 */
const debugApk = join(workspaceDirectory, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk');

/**
 * Run Android - Run Command.
 *
 * Runs one visible child command synchronously so the APK build always
 * completes before deployment begins.
 *
 * @param {string}   executable - Executable.
 * @param {string[]} args       - Args.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function runCommand(executable, args) {
  execFileSync(executable, args, {
    cwd: workspaceDirectory,
    env: androidEnvironment,
    shell: isWindows,
    stdio: 'inherit',
  });

  return;
}

/**
 * Run Android - Main.
 *
 * Builds the debug APK before asking Google's Android CLI to install and open
 * the generated application's launcher activity.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function main() {
  runCommand(process.execPath, [
    './scripts/run-gradle.mjs',
    'assembleDebug',
  ]);

  runCommand('android', [
    '--no-metrics',
    'run',
    '--apks',
    debugApk,
    '--activity',
    '[__ANDROID_APPLICATION_ID__].MainActivity',
  ]);

  return;
}

main();
