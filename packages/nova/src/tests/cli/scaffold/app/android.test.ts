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
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_GitAttributes,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Gitignore,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_GooglePlayMetadata,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_LauncherForeground,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_MainScreen,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Manifest,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_OutputPath,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_RunGradle,
  Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_StringsXml,
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
    const gitAttributes: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_GitAttributes = await readFile(join(outputPath, 'apps', 'mobile', '.gitattributes'), 'utf-8');
    const gitignore: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Gitignore = await readFile(join(outputPath, '.gitignore'), 'utf-8');
    const googlePlayMetadata: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_GooglePlayMetadata = await readFile(join(outputPath, 'assets', 'google-play-console', 'mobile', 'metadata', 'android', 'en-US.json'), 'utf-8');
    const launcherForeground: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_LauncherForeground = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'res', 'drawable', 'ic_launcher_foreground.xml'), 'utf-8');
    const mainScreen: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_MainScreen = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'java', 'io', 'cbnventures', 'mobile', 'ui', 'main', 'MainScreen.kt'), 'utf-8');
    const stringsXml: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_StringsXml = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'res', 'values', 'strings.xml'), 'utf-8');
    const manifest: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_Manifest = await readFile(join(outputPath, 'apps', 'mobile', 'app', 'src', 'main', 'AndroidManifest.xml'), 'utf-8');
    const runGradle: Tests_Cli_Scaffold_App_Android_CliScaffoldAppAndroidRun_OwnsCompleteNativeProject_RunGradle = await readFile(join(outputPath, 'apps', 'mobile', 'scripts', 'run-gradle.mjs'), 'utf-8');

    strictEqual(buildGradle.includes('applicationId = "io.cbnventures.mobile"'), true);
    strictEqual(gitAttributes, [
      'gradlew text eol=lf',
      'gradlew.bat text eol=crlf',
      '',
    ].join('\n'));
    strictEqual(gitignore.includes('/assets/'), false);
    strictEqual(googlePlayMetadata.includes('"fullDescription": null'), true);
    strictEqual(launcherForeground.includes('android:inset="30dp"'), true);
    strictEqual(mainScreen.includes('text = stringResource(R.string.starter_title)'), true);
    strictEqual(mainScreen.includes('@StringRes title: Int'), true);
    strictEqual(mainScreen.includes('contentAlignment = Alignment.CenterStart'), true);
    strictEqual(mainScreen.includes('.offset(x = (-6).dp)'), false);
    strictEqual(stringsXml.includes('<string name="starter_title">Mobile starts here.</string>'), true);
    strictEqual(stringsXml.includes('<string name="launch_step_one_title">Shape the experience</string>'), true);
    strictEqual(stringsXml.includes('<string name="launch_step_two_title">Keep the contract</string>'), true);
    strictEqual(stringsXml.includes('<string name="launch_step_three_title">Ship confidently</string>'), true);
    strictEqual(manifest.includes('Theme.Mobile'), true);
    strictEqual(runGradle.includes('const executable = (isWindows === true) ? \'gradlew.bat\' : \'sh\';'), true);
    strictEqual(runGradle.includes('\'./gradlew\','), true);

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
