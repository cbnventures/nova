import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdtemp,
  readFile,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliScaffoldAppAndroid } from '../../../../cli/scaffold/app/android.js';

import type {
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_BuildGradle,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_LauncherForeground,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_MainScreen,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Manifest,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_OutputPath,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_RejectsJavaKeywordSegmentsBeforeWritingFiles_Exists,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_RejectsJavaKeywordSegmentsBeforeWritingFiles_OutputPath,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_TemporaryDirectory,
} from '../../../../types/tests/cli/scaffold/app/android.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Android - Run.
 *
 * @since 0.31.0
 */
describe.sequential('CliScaffoldAppAndroid.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_TemporaryBase = join(temporaryDirectory, `nova-android-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  afterEach(() => {
    process.chdir(originalCwd);
    process.exitCode = undefined;

    return;
  });

  it('owns complete native project', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_OutputPath = join(sandboxRoot, 'owned-native-project');

    process.chdir(sandboxRoot);

    await CliScaffoldAppAndroid.run({
      applicationId: 'io.cbnventures.mobile',
      install: false,
      name: 'owned-native-project',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'mobile',
    });

    const buildGradle: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_BuildGradle = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'build.gradle.kts'), 'utf-8');
    const launcherForeground: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_LauncherForeground = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'res', 'drawable', 'ic_launcher_foreground.xml'), 'utf-8');
    const mainScreen: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_MainScreen = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'java', 'io', 'cbnventures', 'mobile', 'ui', 'main', 'MainScreen.kt'), 'utf-8');
    const manifest: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Manifest = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'AndroidManifest.xml'), 'utf-8');

    strictEqual(buildGradle.includes('applicationId = "io.cbnventures.mobile"'), true);
    strictEqual(launcherForeground.includes('android:inset="30dp"'), true);
    strictEqual(mainScreen.includes('text = "Mobile starts here."'), true);
    strictEqual(mainScreen.includes('title = "Shape the experience"'), true);
    strictEqual(mainScreen.includes('title = "Keep the contract"'), true);
    strictEqual(mainScreen.includes('title = "Ship confidently"'), true);
    strictEqual(mainScreen.includes('contentAlignment = Alignment.CenterStart'), true);
    strictEqual(mainScreen.includes('.offset(x = (-6).dp)'), false);
    strictEqual(manifest.includes('Theme.Mobile'), true);

    await access(join(outputPath, 'apps', 'mobile', 'gradle', 'wrapper', 'gradle-wrapper.jar'));
    await access(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'java', 'io', 'cbnventures', 'mobile', 'MainActivity.kt'));

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('rejects Java keyword segments before writing files', async () => {
    const outputPath: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_RejectsJavaKeywordSegmentsBeforeWritingFiles_OutputPath = join(sandboxRoot, 'invalid-application-id');

    await CliScaffoldAppAndroid.run({
      applicationId: 'io.cbnventures.native.review',
      dryRun: true,
      install: false,
      name: 'invalid-application-id',
      nonInteractive: true,
      output: outputPath,
      workspaceName: 'android',
    });

    let exists: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_RejectsJavaKeywordSegmentsBeforeWritingFiles_Exists = true;

    try {
      await access(outputPath);
    } catch {
      exists = false;
    }

    strictEqual(process.exitCode, 1);
    strictEqual(exists, false);

    return;
  });

  return;
});
