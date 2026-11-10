import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';
import {
  afterAll,
  describe,
  it,
} from 'vitest';

import novaPackageJson from '../../package.json' with { type: 'json' };

import {
  libItemAllowedRecipes,
  libItemSortOrderKeys,
} from '../lib/item.js';
import {
  findPackageScriptContractViolations,
  packageScriptCanonicalGroupOrder,
  packageScriptOptionalGroupOrder,
} from '../lib/package-scripts.js';
import {
  LIB_REGEX_PLACEHOLDER_ANDROID_APPLICATION_ID,
  LIB_REGEX_PLACEHOLDER_ANDROID_PACKAGE_PATH,
  LIB_REGEX_PLACEHOLDER_APPLE_BUNDLE_IDENTIFIER,
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_CONTENT,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
  LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI,
  LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_API_URL,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DEFAULT_FREQUENCY,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DOWNLOAD_PREFIX,
  LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_SETTINGS_DESCRIPTION,
  LIB_REGEX_PLACEHOLDER_PROJECT_AUTHOR_EMAIL,
  LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
  LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
  LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION,
  LIB_REGEX_PLACEHOLDER_PROJECT_FUND_SOURCES,
  LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
  LIB_REGEX_PLACEHOLDER_PROJECT_LICENSE,
  LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
  LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
  LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_VERSION,
} from '../lib/regex.js';
import { resolveScaffoldAllowScripts } from '../lib/scaffold-allow-scripts.js';
import {
  createMonorepoRoot,
  writeTemplateFiles,
} from '../lib/scaffold.js';

import type {
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsTheDockerImageOCILabelContract_DockerfileContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsTheDockerImageOCILabelContract_DockerfilePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MarksPfSenseReleasePackagesForAnyFreeBSDVersionAndKeepsThemVital_BuildPackageContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MarksPfSenseReleasePackagesForAnyFreeBSDVersionAndKeepsThemVital_BuildPackagePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_RejectedTemplateContract,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResults,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResultTypeGuard,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_AboutPageContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_AboutPagePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_CheckPackageContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_CheckPackagePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_FileLockContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_FileLockPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_MakefileContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_MakefilePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageLogoContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageLogoPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePathsContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePathsPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePlistContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePlistPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_ReleaseSigningKeyContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_ReleaseSigningKeyPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPageContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPagePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateManagerContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateManagerPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateTestsContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateTestsPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_CommentOnlyContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_CommentOnlyResult,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_GeneratedWorkspaceDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_MalformedKeyResult,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ReleaseSigningFilePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ValidKey,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ValidKeyResult,
  Tests_ScaffoldOutputContract_TemplateContracts,
  Tests_ScaffoldOutputContract_TranslationReadyContracts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintBaseline,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigIndex,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptCommand,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptEntries,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptName,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScripts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineGeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedBuffer,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageEngines,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJson,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonIndex,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKeys,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKnownKeys,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonOrderedKeys,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageScripts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderGeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireI18n,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireRootScripts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceGeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Tsconfig,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigExtends,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFileList,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigPath,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigRaw,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigReferences,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFiles,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ChildScriptNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ContractViolations,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedGroupNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand,
  Tests_ScaffoldOutputContract_VerifyScriptContract_HasParent,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonRaw,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ParentIndex,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PreviousParentIndex,
  Tests_ScaffoldOutputContract_VerifyScriptContract_RequireI18n,
  Tests_ScaffoldOutputContract_VerifyScriptContract_RequireRootScripts,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Returns,
  Tests_ScaffoldOutputContract_VerifyScriptContract_RootParentCommand,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupModes,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupNodeEnvOptions,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts,
  Tests_ScaffoldOutputContract_VerifyScriptContract_WorkspaceParentCommand,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedAllowScripts,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfig,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipe,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeName,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeNames,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedProject,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRootPackageJsonRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRunWorkspacesSettings,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedSettings,
  Tests_ScaffoldOutputContract_VerifyStarterContract_Returns,
  Tests_ScaffoldOutputContract_VerifyStarterContract_SandboxRoot,
  Tests_ScaffoldOutputContract_VerifyStarterContract_TargetDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_Contract,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_PackageDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_RequireI18n,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_Returns,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_ReviewedTemplateOptionSubpath,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_SandboxRoot,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TargetDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionSubpaths,
} from '../types/tests/scaffold-output-contract.test.d.ts';

/**
 * Tests - Scaffold Output Contract - Template Contracts.
 *
 * Lists the complete source-controlled output owned by each template-backed
 * scaffold so additions, removals, and accidental artifacts are reviewed.
 *
 * @since 0.26.0
 */
const templateContracts: Tests_ScaffoldOutputContract_TemplateContracts = [
  {
    name: 'android',
    templateSubpath: 'app/android',
    templateOptionSubpaths: [
      'scaffold-options/app/android-native',
      'scaffold-options/app/android-launchpad',
    ],
    expectedFiles: [
      '.gitattributes',
      'app/build.gradle.kts',
      'app/proguard-rules.pro',
      'app/src/main/AndroidManifest.xml',
      'app/src/main/java/com/example/mobile/MainActivity.kt',
      'app/src/main/java/com/example/mobile/Navigation.kt',
      'app/src/main/java/com/example/mobile/NavigationKeys.kt',
      'app/src/main/java/com/example/mobile/data/DataRepository.kt',
      'app/src/main/java/com/example/mobile/theme/Color.kt',
      'app/src/main/java/com/example/mobile/theme/Theme.kt',
      'app/src/main/java/com/example/mobile/theme/Type.kt',
      'app/src/main/java/com/example/mobile/ui/main/MainScreen.kt',
      'app/src/main/java/com/example/mobile/ui/main/MainScreenViewModel.kt',
      'app/src/main/res/drawable/arrow_up_right.xml',
      'app/src/main/res/drawable/ic_launcher_background.xml',
      'app/src/main/res/drawable/ic_launcher_foreground.xml',
      'app/src/main/res/drawable/nova_logo.xml',
      'app/src/main/res/drawable/social_facebook.xml',
      'app/src/main/res/drawable/social_github.xml',
      'app/src/main/res/drawable/social_google_play.xml',
      'app/src/main/res/drawable/social_instagram.xml',
      'app/src/main/res/drawable/social_linkedin.xml',
      'app/src/main/res/drawable/social_x.xml',
      'app/src/main/res/drawable/social_youtube.xml',
      'app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml',
      'app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml',
      'app/src/main/res/mipmap-hdpi/ic_launcher.webp',
      'app/src/main/res/mipmap-hdpi/ic_launcher_round.webp',
      'app/src/main/res/mipmap-mdpi/ic_launcher.webp',
      'app/src/main/res/mipmap-mdpi/ic_launcher_round.webp',
      'app/src/main/res/mipmap-xhdpi/ic_launcher.webp',
      'app/src/main/res/mipmap-xhdpi/ic_launcher_round.webp',
      'app/src/main/res/mipmap-xxhdpi/ic_launcher.webp',
      'app/src/main/res/mipmap-xxhdpi/ic_launcher_round.webp',
      'app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp',
      'app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp',
      'app/src/main/res/values/strings.xml',
      'app/src/main/res/values/themes.xml',
      'app/src/main/res/xml/backup_rules.xml',
      'app/src/main/res/xml/data_extraction_rules.xml',
      'app/src/test/java/com/example/mobile/ui/main/MainScreenViewModelTest.kt',
      'build.gradle.kts',
      'eslint.config.mts',
      'gradle.properties',
      'gradle/libs.versions.toml',
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties',
      'gradlew',
      'gradlew.bat',
      'package.json',
      'scripts/android-environment.mjs',
      'scripts/run-android.mjs',
      'scripts/run-gradle.mjs',
      'settings.gradle.kts',
      'tsconfig.scripts.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-android',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-android-app-mobile',
      ],
      [
        LIB_REGEX_PLACEHOLDER_ANDROID_APPLICATION_ID,
        'com.example.mobile',
      ],
      [
        LIB_REGEX_PLACEHOLDER_ANDROID_PACKAGE_PATH,
        'com/example/mobile',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
        'Mobile',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Mobile',
      ],
    ]),
  },
  {
    name: 'apple',
    templateSubpath: 'app/apple',
    expectedFiles: [
      'Sources/App.swift',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-ios-1024.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-128.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-128@2x.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-16.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-16@2x.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-256.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-256@2x.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-32.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-32@2x.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-512.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/AppIcon-mac-512@2x.png',
      'Sources/Assets.xcassets/AppIcon.appiconset/Contents.json',
      'Sources/Assets.xcassets/Contents.json',
      'Sources/Assets.xcassets/NovaLogo.imageset/Contents.json',
      'Sources/Assets.xcassets/NovaLogo.imageset/nova.svg',
      'Sources/Assets.xcassets/SocialFacebook.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialFacebook.imageset/facebook.svg',
      'Sources/Assets.xcassets/SocialGitHub.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialGitHub.imageset/github.svg',
      'Sources/Assets.xcassets/SocialGooglePlay.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialGooglePlay.imageset/google-play.svg',
      'Sources/Assets.xcassets/SocialInstagram.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialInstagram.imageset/instagram.svg',
      'Sources/Assets.xcassets/SocialLinkedIn.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialLinkedIn.imageset/linkedin.svg',
      'Sources/Assets.xcassets/SocialX.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialX.imageset/x.svg',
      'Sources/Assets.xcassets/SocialYouTube.imageset/Contents.json',
      'Sources/Assets.xcassets/SocialYouTube.imageset/youtube.svg',
      'Sources/ContentView.swift',
      'Sources/Localizable.xcstrings',
      'Tests/AppTests.swift',
      'eslint.config.mts',
      'package.json',
      'project.yml',
      'scripts/run-apple.mjs',
      'tsconfig.scripts.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    expectedScripts: {
      'dev:project': 'node ./scripts/run-apple.mjs generate',
      'check:lint-scripts': 'eslint ./ --max-warnings=0',
      'check:types-scripts': 'nova utility type-check --project tsconfig.scripts.json',
      'check:types-tests': 'nova utility type-check --project tsconfig.tests.json',
      'check:test-scripts': 'vitest run',
      'check:project': 'node ./scripts/run-apple.mjs generate',
      'check:test': 'node ./scripts/run-apple.mjs test',
      'build:project': 'node ./scripts/run-apple.mjs generate',
      'build:app': 'node ./scripts/run-apple.mjs build',
    },
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-apple',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-apple-app-apple',
      ],
      [
        LIB_REGEX_PLACEHOLDER_APPLE_BUNDLE_IDENTIFIER,
        'com.example.apple',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
        'Apple',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'apple',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Apple',
      ],
    ]),
  },
  {
    name: 'astro',
    templateSubpath: 'app/astro',
    templateOptionSubpaths: [
      'scaffold-options/app/web-launchpad',
      'scaffold-options/app/astro/static',
    ],
    expectedFiles: [
      'astro.config.mjs',
      'eslint.config.mts',
      'package.json',
      'public/favicon.svg',
      'public/nova-socials.svg',
      'src/i18n/en.json',
      'src/pages/index.astro',
      'src/styles/nova-launchpad.css',
      'tsconfig.astro.json',
      'tsconfig.config.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-astro',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-astro-app-web',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Web',
      ],
    ]),
  },
  {
    name: 'discord-bot',
    templateSubpath: 'app/discord-bot',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/bot.test.ts',
      'src/bot.ts',
      'src/index.ts',
      'src/types/bot.d.ts',
      'src/types/bot.test.d.ts',
      'src/types/index.d.ts',
      'tsconfig.config.json',
      'tsconfig.source.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-discord-bot',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-discord-bot-app-bot',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Bot',
      ],
    ]),
  },
  {
    name: 'docusaurus',
    templateSubpath: 'docs/docusaurus',
    expectedFiles: [
      'docs/customize.mdx',
      'docs/intro.mdx',
      'docusaurus.config.ts',
      'eslint.config.mts',
      'package.json',
      'sidebars.ts',
      'src/pages/index.tsx',
      'src/tests/dotenv.test.ts',
      'src/tests/frontmatter.test.ts',
      'src/tests/link.test.ts',
      'src/tests/markdown-table.test.ts',
      'src/tests/terminology.test.ts',
      'src/tests/type-declarations.test.ts',
      'src/types/pages/index.d.ts',
      'static/images/nova.svg',
      'tsconfig.app.json',
      'tsconfig.config.json',
      'tsconfig.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
      'vitest.setup.ts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-docusaurus',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-docusaurus-docs',
      ],
      [
        LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
        'foundry',
      ],
      [
        LIB_REGEX_PLACEHOLDER_DOCUSAURUS_CONTENT,
        'false',
      ],
    ]),
  },
  {
    name: 'express',
    templateSubpath: 'app/express',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/app.test.ts',
      'src/app.ts',
      'src/index.ts',
      'src/types/app.d.ts',
      'src/types/app.test.d.ts',
      'src/types/index.d.ts',
      'tsconfig.config.json',
      'tsconfig.source.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-express',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-express-app-api',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'API',
      ],
    ]),
  },
  {
    name: 'serverless-cloudflare-workers',
    templateSubpath: 'tool/serverless',
    templateOptionSubpaths: [
      'scaffold-options/package/node-cli-core',
      'scaffold-options/tool/serverless/cloudflare-workers',
    ],
    expectedFiles: [
      'bin/cli.mjs',
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'src/program.ts',
      'src/status.test.ts',
      'src/status.ts',
      'src/types/program.d.ts',
      'src/types/status.d.ts',
      'src/types/worker/index.d.ts',
      'src/types/worker/index.test.d.ts',
      'src/types/worker/landing-page.d.ts',
      'src/worker/index.test.ts',
      'src/worker/index.ts',
      'src/worker/landing-page.ts',
      'tsconfig.cli.json',
      'tsconfig.config.json',
      'tsconfig.tests.json',
      'tsconfig.worker.json',
      'vitest.config.mts',
      'wrangler.build.toml',
      'wrangler.toml',
    ],
    expectedScripts: {
      manage: 'tsx src/index.ts status',
      tail: 'wrangler tail --config ./wrangler.toml',
    },
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-serverless-cloudflare-workers',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        'https://github.com/example/contract-serverless-cloudflare-workers',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-serverless-tool-cloudflare',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'cloudflare',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Cloudflare',
      ],
    ]),
  },
  {
    name: 'serverless-vercel-functions',
    templateSubpath: 'tool/serverless',
    templateOptionSubpaths: [
      'scaffold-options/package/node-cli-core',
      'scaffold-options/tool/serverless/vercel-functions',
    ],
    expectedFiles: [
      'api/index.test.ts',
      'api/index.ts',
      'bin/cli.mjs',
      'eslint.config.mts',
      'package.json',
      'src/function/landing-page.ts',
      'src/index.ts',
      'src/program.ts',
      'src/status.test.ts',
      'src/status.ts',
      'src/types/api/index.d.ts',
      'src/types/api/index.test.d.ts',
      'src/types/function/landing-page.d.ts',
      'src/types/program.d.ts',
      'src/types/status.d.ts',
      'tsconfig.cli.json',
      'tsconfig.config.json',
      'tsconfig.functions.json',
      'tsconfig.tests.json',
      'vercel.json',
      'vitest.config.mts',
    ],
    expectedScripts: {
      manage: 'tsx src/index.ts status',
      tail: 'vercel logs --follow',
    },
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-serverless-vercel-functions',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        'https://github.com/example/contract-serverless-vercel-functions',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-serverless-tool-vercel',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'vercel',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Vercel',
      ],
    ]),
  },
  {
    name: 'github-action',
    templateSubpath: 'package/github-action',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'src/run.test.ts',
      'src/run.ts',
      'src/types/run.d.ts',
      'tsconfig.config.json',
      'tsconfig.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    expectedScripts: {
      'dev:local': 'local-action run ../.. packages/my-action/src/run.ts .env',
    },
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-action',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'my-action',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
        'packages/my-action',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'My Action',
      ],
    ]),
  },
  {
    name: 'github-action-root',
    templateSubpath: 'package/github-action-root',
    expectedFiles: ['action.yml'],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
        'packages/my-action',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'My Action',
      ],
    ]),
  },
  {
    name: 'homebridge',
    templateSubpath: 'package/homebridge',
    templateOptionSubpaths: ['scaffold-options/package/homebridge/custom-ui'],
    expectedFiles: [
      'bin/repl.mjs',
      'bin/test-api.mjs',
      'config.schema.json',
      'config/eslint-custom-ui.ts',
      'eslint.config.mts',
      'homebridge-ui/public/index.html',
      'homebridge-ui/public/index.js',
      'package.json',
      'src/cli/presentation.ts',
      'src/cli/repl.ts',
      'src/cli/test-api.ts',
      'src/config-ui/server.ts',
      'src/index.ts',
      'src/platform.ts',
      'src/types/cli/presentation.d.ts',
      'src/types/cli/repl.d.ts',
      'src/types/cli/test-api.d.ts',
      'src/types/index.d.ts',
      'src/types/platform.d.ts',
      'tsconfig.config.json',
      'tsconfig.source.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    expectedScripts: {
      'repl': 'node ./build/cli/repl.js',
      'test-api': 'node ./build/cli/test-api.js',
    },
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-homebridge',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'homebridge-sample',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
        'Sample',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'sample',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Sample',
      ],
      [
        LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI,
        'true',
      ],
    ]),
  },
  {
    name: 'pfsense',
    templateSubpath: 'package/pfsense',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'port/Makefile.template',
      'port/files/pkg-deinstall.in',
      'port/files/pkg-install.in',
      'port/files/usr/local/pkg/my-package.inc',
      'port/files/usr/local/pkg/my-package.xml',
      'port/files/usr/local/pkg/my-package/FileLock.php',
      'port/files/usr/local/pkg/my-package/PackagePaths.php',
      'port/files/usr/local/pkg/my-package/UpdateManager.php',
      'port/files/usr/local/sbin/my-package',
      'port/files/usr/local/share/pfSense-pkg-MyPackage/info.xml',
      'port/files/usr/local/share/pfSense-pkg-MyPackage/logo.svg',
      'port/files/usr/local/share/pfSense-pkg-MyPackage/release-signing.pub',
      'port/files/usr/local/www/my-package-about.php',
      'port/pkg-descr',
      'port/pkg-plist',
      'scripts/build-package.sh',
      'scripts/check-package.mjs',
      'scripts/regex.mjs',
      'scripts/stage-package.mjs',
      'tests/updates.php',
      'tsconfig.scripts.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-pfsense',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'pfsense-pkg-my-package',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
        'MyPackage',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'my-package',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'My Package',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_CONFIG_NAME,
        'mypackage',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_API_URL,
        'https://api.github.com/repos/example/contract-pfsense/releases/latest',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DEFAULT_FREQUENCY,
        'weekly',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_DOWNLOAD_PREFIX,
        'https://github.com/example/contract-pfsense/releases/download/',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PFSENSE_UPDATE_SETTINGS_DESCRIPTION,
        'Choose how often pfSense checks GitHub for a new package release. The check runs at a stable randomized time.',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_AUTHOR_EMAIL,
        'author@example.com',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_BUGS,
        'https://github.com/example/contract-pfsense/issues',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DESCRIPTION,
        'A generated pfSense package.',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_DOCUMENTATION,
        'https://example.com/docs',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_FUND_SOURCES,
        '[\'https://github.com/sponsors/example\']',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_HOMEPAGE,
        'https://example.com',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_LICENSE,
        'https://github.com/example/contract-pfsense/blob/main/LICENSE',
      ],
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_REPOSITORY,
        'https://github.com/example/contract-pfsense',
      ],
    ]),
  },
  {
    name: 'nextjs',
    templateSubpath: 'app/nextjs',
    templateOptionSubpaths: ['scaffold-options/app/web-launchpad'],
    expectedFiles: [
      'eslint.config.mts',
      'next.config.mjs',
      'package.json',
      'public/favicon.svg',
      'public/nova-socials.svg',
      'src/app/[lang]/dictionaries.ts',
      'src/app/[lang]/dictionaries/en.json',
      'src/app/[lang]/layout.tsx',
      'src/app/[lang]/page.tsx',
      'src/app/globals.css',
      'src/i18n/config.ts',
      'src/proxy.ts',
      'src/styles/nova-launchpad.css',
      'src/types/app/[lang]/dictionaries.d.ts',
      'src/types/app/[lang]/layout.d.ts',
      'src/types/app/[lang]/page.d.ts',
      'src/types/i18n/config.d.ts',
      'src/types/proxy.d.ts',
      'tsconfig.config.json',
      'tsconfig.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-nextjs',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-nextjs-app-web',
      ],
      [
        LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
        '',
      ],
    ]),
  },
  {
    name: 'vite',
    templateSubpath: 'app/vite',
    templateOptionSubpaths: [
      'scaffold-options/app/web-launchpad',
      'scaffold-options/app/vite/framework/vanilla',
      'scaffold-options/app/vite/pwa/disabled',
    ],
    expectedFiles: [
      'config/eslint-framework.mts',
      'config/framework-ignore-files.ts',
      'config/framework-plugins.ts',
      'config/pwa-plugins.ts',
      'eslint.config.mts',
      'index.html',
      'package.json',
      'public/favicon.svg',
      'public/nova-socials.svg',
      'src/main.ts',
      'src/styles/nova-launchpad.css',
      'tsconfig.json',
      'vite.config.mts',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-vite',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-vite-app-web',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Web',
      ],
      [
        LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
        'Vite',
      ],
    ]),
  },
];

/**
 * Tests - Scaffold Output Contract - Translation Ready Contracts.
 *
 * Records the native localization primitives that each supported scaffold and
 * every mutually exclusive template option must preserve.
 *
 * @since 0.35.0
 */
const translationReadyContracts: Tests_ScaffoldOutputContract_TranslationReadyContracts = [
  {
    path: 'templates/scaffold/docs/docusaurus/docusaurus.config.ts',
    markers: [
      'i18n: {',
      'defaultLocale: \'en\'',
      'locales: [\'en\']',
    ],
  },
  {
    path: 'templates/scaffold/docs/docusaurus/src/pages/index.tsx',
    markers: [
      'import { translate } from \'@docusaurus/Translate\'',
      'id: \'homepage.hero.heading\'',
    ],
  },
  {
    path: 'templates/scaffold/app/astro/src/i18n/en.json',
    markers: [
      '"metadata"',
      '"sequence"',
    ],
  },
  {
    path: 'templates/scaffold/app/astro/src/pages/index.astro',
    markers: [
      'import messages from \'../i18n/en.json\'',
      'Astro.currentLocale ?? \'en\'',
    ],
  },
  {
    path: 'templates/scaffold-options/app/astro/static/astro.config.mjs',
    markers: [
      'i18n: {',
      'defaultLocale: \'en\'',
      'prefixDefaultLocale: false',
    ],
  },
  {
    path: 'templates/scaffold-options/app/astro/node/astro.config.mjs',
    markers: [
      'i18n: {',
      'defaultLocale: \'en\'',
      'prefixDefaultLocale: false',
    ],
  },
  {
    path: 'templates/scaffold-options/app/astro/cloudflare/astro.config.mjs',
    markers: [
      'i18n: {',
      'defaultLocale: \'en\'',
      'prefixDefaultLocale: false',
    ],
  },
  {
    path: 'templates/scaffold/app/nextjs/src/i18n/config.ts',
    markers: [
      'defaultLocale: I18n_Config_DefaultLocale = \'en\'',
      'locales: I18n_Config_Locales = [\'en\']',
    ],
  },
  {
    path: 'templates/scaffold/app/nextjs/src/proxy.ts',
    markers: [
      'function localizeRequest(',
      'export default localizeRequest;',
      'url.pathname =',
    ],
  },
  {
    path: 'templates/scaffold/app/nextjs/src/app/[lang]/dictionaries/en.json',
    markers: [
      '"metadataTitle"',
      '"launchSequence"',
    ],
  },
  {
    path: 'templates/scaffold/app/nextjs/src/app/[lang]/layout.tsx',
    markers: [
      'export function generateStaticParams',
      '<html lang={params[\'lang\']}>',
    ],
  },
  {
    path: 'templates/scaffold/app/nextjs/src/app/[lang]/page.tsx',
    markers: [
      'import { getDictionary } from \'./dictionaries\'',
      'dictionary[\'title\']',
    ],
  },
  {
    path: 'templates/scaffold/app/apple/Sources/Localizable.xcstrings',
    markers: [
      '"sourceLanguage" : "en"',
      '"strings"',
    ],
  },
  {
    path: 'templates/scaffold/app/apple/Sources/ContentView.swift',
    markers: [
      'private let label: LocalizedStringKey',
      'private let title: LocalizedStringKey',
      'private let description: LocalizedStringKey',
    ],
  },
  {
    path: 'templates/scaffold-options/app/android-native/app/src/main/res/values/strings.xml',
    markers: [
      '<string name="starter_title">',
      '<string name="launch_sequence">',
    ],
  },
  {
    path: 'templates/scaffold-options/app/android-launchpad/app/src/main/java/[__ANDROID_PACKAGE_PATH__]/ui/main/MainScreen.kt',
    markers: [
      'import androidx.annotation.StringRes',
      'stringResource(R.string.starter_title)',
    ],
  },
];

/**
 * Tests - Scaffold Output Contract - Verify Script Contract.
 *
 * Confirms every generated lifecycle command uses the public Nova dispatcher,
 * keeps its child steps adjacent, and follows the canonical development-first
 * ordering without constraining framework-specific child names.
 *
 * @param {Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath}    packageJsonPath    - Package json path.
 * @param {Tests_ScaffoldOutputContract_VerifyScriptContract_RequireRootScripts} requireRootScripts - Require root scripts.
 * @param {Tests_ScaffoldOutputContract_VerifyScriptContract_RequireI18n}        requireI18n        - Require i18n.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyScriptContract_Returns}
 *
 * @since 0.27.0
 */
async function verifyScriptContract(packageJsonPath: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath, requireRootScripts: Tests_ScaffoldOutputContract_VerifyScriptContract_RequireRootScripts = false, requireI18n: Tests_ScaffoldOutputContract_VerifyScriptContract_RequireI18n = false): Tests_ScaffoldOutputContract_VerifyScriptContract_Returns {
  const packageJsonRaw: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonRaw = await readFile(packageJsonPath, 'utf-8');
  const packageJson: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson = JSON.parse(packageJsonRaw) as Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson;
  const scripts: Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts = packageJson['scripts'] as Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts;
  const scriptNames: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames = Object.keys(scripts);
  const scriptGroupOrder: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder = [
    ...packageScriptCanonicalGroupOrder,
    ...packageScriptOptionalGroupOrder,
  ];
  const scriptGroupModes: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupModes = {
    dev: 'parallel',
    prod: 'sequential',
    check: 'sequential',
    build: 'sequential',
    deploy: 'sequential',
    clean: 'sequential',
    i18n: 'sequential',
  };
  const scriptGroupNodeEnvOptions: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupNodeEnvOptions = {
    dev: ' --node-env development',
    prod: ' --node-env production',
    check: '',
    build: ' --node-env production',
    deploy: ' --node-env production',
    clean: '',
    i18n: '',
  };
  const contractViolations: Tests_ScaffoldOutputContract_VerifyScriptContract_ContractViolations = findPackageScriptContractViolations(scripts, {
    requireRootScripts,
    requireI18n,
  });
  let previousParentIndex: Tests_ScaffoldOutputContract_VerifyScriptContract_PreviousParentIndex = -1;

  deepStrictEqual(contractViolations, [], `Generated package scripts violate Nova's shared organization contract in "${packageJsonPath}".`);

  for (const scriptGroup of scriptGroupOrder) {
    const childScriptNames: Tests_ScaffoldOutputContract_VerifyScriptContract_ChildScriptNames = scriptNames.filter((scriptName) => scriptName.startsWith(`${scriptGroup}:`));
    const hasParent: Tests_ScaffoldOutputContract_VerifyScriptContract_HasParent = Reflect.has(scripts, scriptGroup);

    if (childScriptNames.length > 0) {
      strictEqual(hasParent, true, `Generated script group "${scriptGroup}" has child scripts but no parent dispatcher in "${packageJsonPath}".`);
    }

    if (hasParent === false) {
      continue;
    }

    const parentIndex: Tests_ScaffoldOutputContract_VerifyScriptContract_ParentIndex = scriptNames.indexOf(scriptGroup);
    const workspaceParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_WorkspaceParentCommand = `nova utility run-scripts --${scriptGroupModes[scriptGroup]}${scriptGroupNodeEnvOptions[scriptGroup]} "${scriptGroup}:*"`;
    const rootParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_RootParentCommand = `nova utility run-workspaces${scriptGroupNodeEnvOptions[scriptGroup]} ${scriptGroup}`;
    const expectedParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand = (requireRootScripts === true) ? rootParentCommand : workspaceParentCommand;
    const expectedGroupNames: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedGroupNames = [
      scriptGroup,
      ...childScriptNames,
    ];

    strictEqual(parentIndex > previousParentIndex, true, `Generated lifecycle scripts are out of order in "${packageJsonPath}".`);
    strictEqual(scripts[scriptGroup], expectedParentCommand, `Generated parent script "${scriptGroup}" does not use the canonical Nova dispatcher in "${packageJsonPath}".`);

    // A project root runs the workspace tree, so its own child steps are optional.
    if (requireRootScripts === false) {
      strictEqual(childScriptNames.length > 0, true, `Generated parent script "${scriptGroup}" has no child steps in "${packageJsonPath}".`);
    }

    deepStrictEqual(scriptNames.slice(parentIndex, parentIndex + expectedGroupNames.length), expectedGroupNames, `Generated child scripts for "${scriptGroup}" are not adjacent to their parent in "${packageJsonPath}".`);

    previousParentIndex = parentIndex;
  }

  return;
}

/**
 * Tests - Scaffold Output Contract - Verify Generated Output.
 *
 * Compares a generated directory with its reviewed file inventory and confirms
 * that no Nova template placeholder survives replacement.
 *
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory}    targetDirectory    - Target directory.
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles}      expectedFiles      - Expected files.
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireRootScripts} requireRootScripts - Require root scripts.
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireI18n}        requireI18n        - Require i18n.
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScripts}    expectedScripts    - Expected scripts.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns}
 *
 * @since 0.26.0
 */
async function verifyGeneratedOutput(targetDirectory: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory, expectedFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles, requireRootScripts: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireRootScripts = false, requireI18n: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_RequireI18n = false, expectedScripts: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScripts = {}): Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns {
  const generatedFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles = globSync('**/*', {
    cwd: targetDirectory,
    dot: true,
    nodir: true,
  }).map((generatedFile) => generatedFile.replaceAll('\\', '/')).sort();
  const inventoryMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage = `Generated scaffold inventory drifted in "${targetDirectory}".`;

  deepStrictEqual(generatedFiles, expectedFiles, inventoryMessage);

  const generatedContents: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents = await Promise.all(generatedFiles.map(async (generatedFile) => {
    const generatedFilePath: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath = join(targetDirectory, generatedFile);
    const generatedBuffer: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedBuffer = await readFile(generatedFilePath);

    return (generatedBuffer.includes(0) === true) ? undefined : generatedBuffer.toString('utf-8');
  }));
  const unresolvedFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_UnresolvedFiles = generatedFiles.filter((_generatedFile, index) => {
    const placeholderGeneratedContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderGeneratedContent = generatedContents[index] ?? '';

    return placeholderGeneratedContent.includes('[__') && placeholderGeneratedContent.includes('__]');
  });
  const placeholderMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage = [
    `Generated scaffold files retain unresolved placeholders in "${targetDirectory}":`,
    ...unresolvedFiles,
  ].join('\n');

  deepStrictEqual(unresolvedFiles, [], placeholderMessage);

  const trailingWhitespaceFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceFiles = generatedFiles.filter((_generatedFile, index) => {
    const trailingWhitespaceGeneratedContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceGeneratedContent = generatedContents[index] ?? '';

    return trailingWhitespaceGeneratedContent.split('\n').some((line) => line.endsWith(' ') || line.endsWith('\t'));
  });
  const trailingWhitespaceMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TrailingWhitespaceMessage = [
    `Generated scaffold files retain trailing whitespace in "${targetDirectory}":`,
    ...trailingWhitespaceFiles,
  ].join('\n');

  deepStrictEqual(trailingWhitespaceFiles, [], trailingWhitespaceMessage);

  const extraFinalNewlineFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFiles = generatedFiles.filter((_generatedFile, index) => {
    const extraFinalNewlineGeneratedContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineGeneratedContent = generatedContents[index] ?? '';

    return extraFinalNewlineGeneratedContent.endsWith('\n\n');
  });
  const extraFinalNewlineMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineMessage = [
    `Generated scaffold files contain an extra final newline in "${targetDirectory}":`,
    ...extraFinalNewlineFiles,
  ].join('\n');

  deepStrictEqual(extraFinalNewlineFiles, [], extraFinalNewlineMessage);

  const eslintConfigIndex: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigIndex = generatedFiles.indexOf('eslint.config.mts');

  if (eslintConfigIndex >= 0) {
    const eslintConfigContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigContent = generatedContents[eslintConfigIndex] ?? '';
    const eslintBaseline: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintBaseline = [
      'export default [',
      '  ...dxIgnore,',
      '  ...dxCodeStyle,',
    ].join('\n');

    strictEqual(eslintConfigContent.includes(eslintBaseline), true, `Generated ESLint config must begin with dxIgnore and dxCodeStyle in "${targetDirectory}".`);
    strictEqual(eslintConfigContent.includes('from \'@cbnventures/nova/presets/eslint\';'), true, `Generated ESLint config must import preset configuration from the preset entry point in "${targetDirectory}".`);
    strictEqual(eslintConfigContent.includes('from \'@cbnventures/nova/rules/eslint\';'), false, `Generated ESLint config must not import preset configuration from the rule implementation entry point in "${targetDirectory}".`);
    strictEqual(eslintConfigContent.includes('...novaRules,'), true, `Generated ESLint config must enable Nova custom rules in "${targetDirectory}".`);
    strictEqual(generatedFiles.includes('vitest.config.mts'), true, `Generated JavaScript or TypeScript tooling must include a Vitest config in "${targetDirectory}".`);
  }

  const tsconfigFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFiles = generatedFiles.filter((generatedFile) => (
    generatedFile === 'tsconfig.json'
    || (
      generatedFile.startsWith('tsconfig.')
      && generatedFile.endsWith('.json')
    )
  ));

  for (const tsconfigFile of tsconfigFiles) {
    const tsconfigPath: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigPath = join(targetDirectory, tsconfigFile);
    const tsconfigRaw: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigRaw = await readFile(tsconfigPath, 'utf-8');
    const tsconfig: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Tsconfig = JSON.parse(tsconfigRaw) as Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Tsconfig;
    const tsconfigReferences: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigReferences = tsconfig['references'];
    const tsconfigFileList: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFileList = tsconfig['files'];

    // A solution-style config only references role configs, so it compiles nothing and needs no extends chain.
    if (
      tsconfig['extends'] === undefined
      && Array.isArray(tsconfigReferences) === true
      && tsconfigReferences.length > 0
      && Array.isArray(tsconfigFileList) === true
      && tsconfigFileList.length === 0
    ) {
      continue;
    }

    const tsconfigExtends: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigExtends = tsconfig['extends'] as Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigExtends;

    strictEqual(Array.isArray(tsconfigExtends), true, `Generated TSConfig "${tsconfigFile}" must define an extends chain.`);
    deepStrictEqual(tsconfigExtends.slice(0, 2), [
      '@cbnventures/nova/presets/tsconfig/dx-essentials.json',
      '@cbnventures/nova/presets/tsconfig/dx-strict.json',
    ], `Generated TSConfig "${tsconfigFile}" must begin with dx-essentials and dx-strict.`);
    strictEqual(String(tsconfigExtends[2]).startsWith('@cbnventures/nova/presets/tsconfig/role-'), true, `Generated TSConfig "${tsconfigFile}" must select a role immediately after dx-essentials and dx-strict.`);
  }

  if (generatedFiles.includes('package.json') === true) {
    const packageJsonIndex: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonIndex = generatedFiles.indexOf('package.json');
    const packageJsonContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonContent = generatedContents[packageJsonIndex] ?? '';
    const packageJson: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJson = JSON.parse(packageJsonContent) as Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJson;
    const packageScripts: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageScripts = packageJson['scripts'] as Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageScripts;
    const expectedScriptEntries: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptEntries = Object.entries(expectedScripts);
    const packageJsonKeys: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKeys = Object.keys(packageJson);
    const packageJsonKnownKeys: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonKnownKeys = new Set(libItemSortOrderKeys);
    const packageJsonOrderedKeys: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageJsonOrderedKeys = [
      ...libItemSortOrderKeys.filter((key) => packageJsonKeys.includes(key)),
      ...packageJsonKeys.filter((key) => packageJsonKnownKeys.has(key) === false),
    ];
    const packageEngines: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PackageEngines = packageJson['engines'];

    deepStrictEqual(packageJsonKeys, packageJsonOrderedKeys, `Generated package.json keys must follow Nova's canonical order in "${targetDirectory}".`);
    strictEqual(
      typeof packageEngines === 'object'
      && packageEngines !== null
      && typeof Reflect.get(packageEngines, 'node') === 'string',
      true,
      `Generated package.json must declare engines.node in "${targetDirectory}".`,
    );

    for (const expectedScriptEntry of expectedScriptEntries) {
      const expectedScriptName: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptName = expectedScriptEntry[0];
      const expectedScriptCommand: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedScriptCommand = expectedScriptEntry[1];

      strictEqual(packageScripts[expectedScriptName], expectedScriptCommand, `Generated package.json script "${expectedScriptName}" drifted in "${targetDirectory}".`);
    }

    await verifyScriptContract(join(targetDirectory, 'package.json'), requireRootScripts, requireI18n);
  }

  return;
}

/**
 * Tests - Scaffold Output Contract - Verify Starter Contract.
 *
 * Generates the programmatic base starter and applies the same inventory and
 * placeholder assertions used by every workspace template.
 *
 * @param {Tests_ScaffoldOutputContract_VerifyStarterContract_SandboxRoot} sandboxRoot - Sandbox root.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyStarterContract_Returns}
 *
 * @since 0.26.0
 */
async function verifyStarterContract(sandboxRoot: Tests_ScaffoldOutputContract_VerifyStarterContract_SandboxRoot): Tests_ScaffoldOutputContract_VerifyStarterContract_Returns {
  const targetDirectory: Tests_ScaffoldOutputContract_VerifyStarterContract_TargetDirectory = join(sandboxRoot, 'starter');

  await createMonorepoRoot(targetDirectory, 'contract-starter', ['nodejs'], resolveScaffoldAllowScripts(['file-watching']));

  await verifyGeneratedOutput(targetDirectory, [
    '.env',
    '.env.sample',
    '.gitignore',
    'assets/README.md',
    'eslint.config.mts',
    'nova.config.json',
    'package.json',
    'tests/dotenv.test.ts',
    'tests/project.test.ts',
    'tests/setup.ts',
    'tsconfig.config.json',
    'tsconfig.tests.json',
    'vitest.config.mts',
  ], true);

  const generatedPackageJsonPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath = join(targetDirectory, 'package.json');
  const generatedPackageJsonRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw = await readFile(generatedPackageJsonPath, 'utf-8');
  const generatedPackageJson: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson = JSON.parse(generatedPackageJsonRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson;
  const generatedNovaConfigPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigPath = join(targetDirectory, 'nova.config.json');
  const generatedNovaConfigRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigRaw = await readFile(generatedNovaConfigPath, 'utf-8');
  const generatedNovaConfig: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfig = JSON.parse(generatedNovaConfigRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfig;
  const generatedProject: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedProject = generatedNovaConfig['project'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedProject;
  const generatedSettings: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedSettings = generatedNovaConfig['settings'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedSettings;
  const generatedRunWorkspacesSettings: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRunWorkspacesSettings = generatedSettings['runWorkspaces'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRunWorkspacesSettings;
  const generatedRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes = generatedNovaConfig['recipes'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes;
  const generatedMiscellaneousRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes = generatedRecipes['miscellaneous'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes;
  const generatedPackageJsonRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipes = generatedRecipes['package-json'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipes;
  const generatedRootPackageJsonRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRootPackageJsonRecipes = generatedPackageJsonRecipes['./'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRootPackageJsonRecipes;
  const generatedPackageJsonRecipeNames: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeNames = Object.keys(generatedRootPackageJsonRecipes);
  const generatedAllowScripts: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedAllowScripts = generatedPackageJson['allowScripts'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedAllowScripts;
  const generatedDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies = generatedPackageJson['dependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies;
  const generatedDevDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = generatedPackageJson['devDependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies;
  const generatedScripts: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts = generatedPackageJson['scripts'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts;

  strictEqual(generatedDependencies['@cbnventures/nova'], novaPackageJson['version']);
  deepStrictEqual(generatedAllowScripts, { fsevents: true });
  strictEqual(generatedDevDependencies['@cbnventures/nova'], undefined);
  strictEqual(generatedDevDependencies['turbo'], undefined);
  strictEqual(generatedScripts['dev'], 'nova utility run-workspaces --node-env development dev');
  strictEqual(generatedScripts['prod'], 'nova utility run-workspaces --node-env production prod');
  strictEqual(generatedScripts['check'], 'nova utility run-workspaces check');
  strictEqual(generatedScripts['build'], 'nova utility run-workspaces --node-env production build');
  strictEqual(generatedScripts['deploy'], 'nova utility run-workspaces --node-env production deploy');
  strictEqual(generatedScripts['clean'], 'nova utility run-workspaces clean');
  strictEqual(Object.keys(generatedScripts).some((scriptName) => scriptName.endsWith(':workspaces')), false);
  strictEqual(generatedScripts['changelog'], 'nova utility changelog');
  strictEqual(generatedScripts['recipes'], 'nova utility run-recipes --replace-file');
  deepStrictEqual(generatedRunWorkspacesSettings['concurrency'], {
    build: 2,
    check: 2,
    deploy: 2,
  });
  deepStrictEqual(generatedProject['platforms'], ['nodejs']);
  deepStrictEqual(generatedPackageJsonRecipeNames, [...libItemAllowedRecipes]);

  for (const recipeName of libItemAllowedRecipes) {
    const generatedPackageJsonRecipeName: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipeName = recipeName;
    const generatedPackageJsonRecipe: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRecipe = generatedRootPackageJsonRecipes[generatedPackageJsonRecipeName];

    ok(generatedPackageJsonRecipe !== undefined);
    strictEqual(generatedPackageJsonRecipe['enabled'], true);
  }

  deepStrictEqual(generatedRootPackageJsonRecipes['cleanup'], {
    enabled: true,
    settings: {
      removeUnknownKeys: true,
      reorderKeys: true,
    },
  });
  deepStrictEqual(generatedRootPackageJsonRecipes['normalize-dependencies'], {
    enabled: true,
    settings: {
      pinDependencyVersions: true,
      pinDevDependencyVersions: true,
    },
  });
  deepStrictEqual(generatedRootPackageJsonRecipes['sync-environment'], {
    enabled: true,
    settings: {
      trackNodeLtsVersions: true,
    },
  });
  deepStrictEqual(generatedMiscellaneousRecipes['fix-markdown-tables'], {
    enabled: true,
  });
  deepStrictEqual(generatedMiscellaneousRecipes['remove-operating-system-files'], {
    enabled: false,
    settings: {
      linux: {},
      macos: {
        appleDouble: false,
        desktopServicesStore: false,
      },
      windows: {
        enhancedThumbnailDatabase: false,
        enhancedVistaThumbnailDatabase: false,
        thumbnailDatabase: false,
      },
    },
  });
  deepStrictEqual(generatedRecipes['nova-config'], {
    'normalize-order': {
      enabled: true,
    },
  });

  return;
}

/**
 * Tests - Scaffold Output Contract - Verify Template Contract.
 *
 * Generates one template-backed scaffold with its reviewed replacements before
 * delegating the filesystem assertions to the shared contract checker.
 *
 * @param {Tests_ScaffoldOutputContract_VerifyTemplateContract_Contract}         contract         - Contract.
 * @param {Tests_ScaffoldOutputContract_VerifyTemplateContract_PackageDirectory} packageDirectory - Package directory.
 * @param {Tests_ScaffoldOutputContract_VerifyTemplateContract_SandboxRoot}      sandboxRoot      - Sandbox root.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyTemplateContract_Returns}
 *
 * @since 0.26.0
 */
async function verifyTemplateContract(contract: Tests_ScaffoldOutputContract_VerifyTemplateContract_Contract, packageDirectory: Tests_ScaffoldOutputContract_VerifyTemplateContract_PackageDirectory, sandboxRoot: Tests_ScaffoldOutputContract_VerifyTemplateContract_SandboxRoot): Tests_ScaffoldOutputContract_VerifyTemplateContract_Returns {
  const targetDirectory: Tests_ScaffoldOutputContract_VerifyTemplateContract_TargetDirectory = join(sandboxRoot, contract['name']);
  const templateDirectory: Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateDirectory = join(packageDirectory, 'templates', 'scaffold', contract['templateSubpath']);
  const templateOptionSubpaths: Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionSubpaths = contract['templateOptionSubpaths'] ?? [];

  contract['replacements'].set(LIB_REGEX_PLACEHOLDER_WORKSPACE_VERSION, '0.0.1');

  await writeTemplateFiles(templateDirectory, targetDirectory, contract['replacements']);

  for (const templateOptionSubpath of templateOptionSubpaths) {
    const reviewedTemplateOptionSubpath: Tests_ScaffoldOutputContract_VerifyTemplateContract_ReviewedTemplateOptionSubpath = templateOptionSubpath;
    const templateOptionDirectory: Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateOptionDirectory = join(packageDirectory, 'templates', reviewedTemplateOptionSubpath);

    await writeTemplateFiles(templateOptionDirectory, targetDirectory, contract['replacements']);
  }

  const requireI18n: Tests_ScaffoldOutputContract_VerifyTemplateContract_RequireI18n = contract['name'] === 'docusaurus';

  await verifyGeneratedOutput(targetDirectory, contract['expectedFiles'], false, requireI18n, contract['expectedScripts']);

  return;
}

/**
 * Tests - Scaffold Output Contract - Scaffold Output Contract.
 *
 * Exercises every supported scaffold through one reviewable output contract so
 * generated project structure cannot drift silently between implementations.
 *
 * @since 0.26.0
 */
describe('scaffold output contract', async () => {
  const temporaryDirectory: Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix = join(temporaryDirectory, 'nova-scaffold-contract-');
  const sandboxRoot: Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot = await mkdtemp(temporaryPrefix);
  const packageDirectory: Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('matches the base starter inventory', async () => {
    const starterContractPromise: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise = verifyStarterContract(sandboxRoot);

    await starterContractPromise;

    return;
  });

  it('matches every template inventory', async () => {
    const templateContractPromises: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises = templateContracts.map((templateContract) => verifyTemplateContract(templateContract, packageDirectory, sandboxRoot));
    const templateContractResults: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResults = await Promise.allSettled(templateContractPromises);
    const rejectedTemplateContract: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_RejectedTemplateContract = templateContractResults.find((templateContractResult): templateContractResult is Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResultTypeGuard => templateContractResult.status === 'rejected');

    if (rejectedTemplateContract !== undefined) {
      throw rejectedTemplateContract.reason;
    }

    return;
  });

  it('keeps every translation-ready scaffold on its native localization contract', async () => {
    for (const translationReadyContract of translationReadyContracts) {
      const translationReadyPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyPath = join(packageDirectory, translationReadyContract['path']);
      const translationReadyContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsEveryTranslationReadyScaffoldOnItsNativeLocalizationContract_TranslationReadyContent = await readFile(translationReadyPath, 'utf-8');

      for (const marker of translationReadyContract['markers']) {
        ok(
          translationReadyContent.includes(marker),
          `Expected ${translationReadyContract['path']} to preserve localization marker: ${marker}`,
        );
      }
    }

    return;
  });

  it('keeps the Docker image OCI label contract', async () => {
    const dockerfilePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsTheDockerImageOCILabelContract_DockerfilePath = join(packageDirectory, 'templates', 'scaffold-options', 'docker-image', 'common', 'Dockerfile');
    const dockerfileContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_KeepsTheDockerImageOCILabelContract_DockerfileContent = await readFile(dockerfilePath, 'utf-8');

    strictEqual(dockerfileContent.includes('org.opencontainers.image.title="[__PROJECT_NAME__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.description="[__PROJECT_DESCRIPTION__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.url="[__PROJECT_HOMEPAGE__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.source="[__PROJECT_REPOSITORY__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.documentation="[__PROJECT_DOCUMENTATION__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.licenses="[__PROJECT_LICENSE__]"'), true);
    strictEqual(dockerfileContent.includes('org.opencontainers.image.vendor="[__PROJECT_VENDOR__]"'), true);

    return;
  });

  it('marks pfSense release packages for any FreeBSD version and keeps them vital', async () => {
    const buildPackagePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MarksPfSenseReleasePackagesForAnyFreeBSDVersionAndKeepsThemVital_BuildPackagePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'scripts', 'build-package.sh');
    const buildPackageContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MarksPfSenseReleasePackagesForAnyFreeBSDVersionAndKeepsThemVital_BuildPackageContent = await readFile(buildPackagePath, 'utf-8');

    strictEqual(buildPackageContent.includes('PACKAGE_REBUILD_DIR=\'\''), true);
    strictEqual(buildPackageContent.includes(`rm -rf -- "${'$'}{PACKAGE_REBUILD_DIR}"`), true);
    strictEqual(buildPackageContent.includes(`mktemp -d "${'$'}{PORT_DESTINATION}/work/any-freebsd.XXXXXX"`), true);
    strictEqual(buildPackageContent.includes('root/+COMPACT_MANIFEST'), true);
    strictEqual(buildPackageContent.includes('"vital": true'), true);
    strictEqual(buildPackageContent.includes('\\1FreeBSD:*\\2'), true);
    strictEqual(buildPackageContent.includes('\\1freebsd:*\\2'), true);
    strictEqual(buildPackageContent.includes('pkg create \\'), true);
    strictEqual(buildPackageContent.includes(`pkg query -F "${'$'}{artifact}" '%q'`), true);
    strictEqual(buildPackageContent.includes(`pkg query -F "${'$'}{artifact}" '%V'`), true);
    strictEqual(buildPackageContent.includes(`if [ "${'$'}{artifact_abi}" != 'FreeBSD:*' ]; then`), true);
    strictEqual(buildPackageContent.includes(`if [ "${'$'}{artifact_vital}" != '1' ]; then`), true);

    return;
  });

  it('validates pfSense release signing key files with line-numbered diagnostics', async () => {
    const releaseSigningFilePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ReleaseSigningFilePath = join(sandboxRoot, 'pfsense', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-MyPackage', 'release-signing.pub');
    const commentOnlyContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_CommentOnlyContent = await readFile(releaseSigningFilePath, 'utf-8');
    const generatedWorkspaceDirectory: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_GeneratedWorkspaceDirectory = join(sandboxRoot, 'pfsense');

    try {
      const commentOnlyResult: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_CommentOnlyResult = spawnSync(process.execPath, ['scripts/check-package.mjs'], {
        cwd: generatedWorkspaceDirectory,
        encoding: 'utf-8',
      });

      strictEqual(commentOnlyResult.status, 0, commentOnlyResult.stderr);

      const validKey: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ValidKey = `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI${'A'.repeat(43)} contract-test`;

      await writeFile(releaseSigningFilePath, `${validKey}\n`, 'utf-8');

      const validKeyResult: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_ValidKeyResult = spawnSync(process.execPath, ['scripts/check-package.mjs'], {
        cwd: generatedWorkspaceDirectory,
        encoding: 'utf-8',
      });

      strictEqual(validKeyResult.status, 0, validKeyResult.stderr);

      await writeFile(releaseSigningFilePath, [
        '# Comment',
        '',
        '# Another comment',
        'not-a-key',
        '',
      ].join('\n'), 'utf-8');

      const malformedKeyResult: Tests_ScaffoldOutputContract_ScaffoldOutputContract_ValidatesPfSenseReleaseSigningKeyFilesWithLineNumberedDiagnostics_MalformedKeyResult = spawnSync(process.execPath, ['scripts/check-package.mjs'], {
        cwd: generatedWorkspaceDirectory,
        encoding: 'utf-8',
      });

      strictEqual(malformedKeyResult.status, 1);
      strictEqual(malformedKeyResult.stderr.includes('release-signing.pub'), true);
      strictEqual(malformedKeyResult.stderr.includes('line 4'), true);
    } finally {
      await writeFile(releaseSigningFilePath, commentOnlyContent, 'utf-8');
    }

    return;
  });

  it('routes the pfSense single-instance settings page directly to its native editor', async () => {
    const settingsPagePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPagePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__].xml');
    const settingsPageContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPageContent = await readFile(settingsPagePath, 'utf-8');
    const settingsHandlerPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__].inc');
    const settingsHandlerContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerContent = await readFile(settingsHandlerPath, 'utf-8');
    const fileLockPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_FileLockPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__]', 'FileLock.php');
    const fileLockContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_FileLockContent = await readFile(fileLockPath, 'utf-8');
    const packagePathsPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePathsPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__]', 'PackagePaths.php');
    const packagePathsContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePathsContent = await readFile(packagePathsPath, 'utf-8');
    const updateManagerPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateManagerPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__]', 'UpdateManager.php');
    const updateManagerContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateManagerContent = await readFile(updateManagerPath, 'utf-8');
    const packageScriptPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'sbin', '[__WORKSPACE_NAME__]');
    const packageScriptContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptContent = await readFile(packageScriptPath, 'utf-8');
    const packageInfoPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]', 'info.xml');
    const packageInfoContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoContent = await readFile(packageInfoPath, 'utf-8');
    const packageLogoPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageLogoPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]', 'logo.svg');
    const packageLogoContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageLogoContent = await readFile(packageLogoPath, 'utf-8');
    const releaseSigningKeyPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_ReleaseSigningKeyPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]', 'release-signing.pub');
    const releaseSigningKeyContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_ReleaseSigningKeyContent = await readFile(releaseSigningKeyPath, 'utf-8');
    const aboutPagePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_AboutPagePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'www', '[__WORKSPACE_NAME__]-about.php');
    const aboutPageContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_AboutPageContent = await readFile(aboutPagePath, 'utf-8');
    const makefilePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_MakefilePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'Makefile.template');
    const makefileContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_MakefileContent = await readFile(makefilePath, 'utf-8');
    const packagePlistPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePlistPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'pkg-plist');
    const packagePlistContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackagePlistContent = await readFile(packagePlistPath, 'utf-8');
    const checkPackagePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_CheckPackagePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'scripts', 'check-package.mjs');
    const checkPackageContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_CheckPackageContent = await readFile(checkPackagePath, 'utf-8');
    const updateTestsPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateTestsPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'tests', 'updates.php');
    const updateTestsContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_UpdateTestsContent = await readFile(updateTestsPath, 'utf-8');

    strictEqual(
      settingsPageContent.includes('<url>/pkg_edit.php?xml=[__WORKSPACE_NAME__].xml&amp;id=0</url>'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<aftersaveredirect>'),
      false,
    );

    strictEqual(
      settingsPageContent.includes('<name>Starter Configuration</name>'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<name>[__PFSENSE_CONFIG_NAME__]</name>'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<addedit_string>[__WORKSPACE_TITLE__]: saved settings</addedit_string>'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<name>Scheduled Task</name>'),
      false,
    );

    strictEqual(
      settingsPageContent.includes('<fieldname>package_status</fieldname>'),
      false,
    );

    strictEqual(
      settingsPageContent.includes('<fieldname>task_frequency</fieldname>'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<option><name>Every minute</name><value>minute</value></option>'),
      true,
    );

    strictEqual(
      settingsHandlerContent.includes('\'minute\' => [\'*\', \'*\', \'*\', \'*\', \'*\']'),
      true,
    );

    strictEqual(
      settingsPageContent.includes('<fieldname>schedule</fieldname>'),
      false,
    );

    strictEqual(
      packageScriptContent.includes('syslog(LOG_NOTICE,'),
      true,
    );

    strictEqual(
      packageInfoContent.includes('<internal_name>[__WORKSPACE_IDENTIFIER__]</internal_name>'),
      true,
    );

    strictEqual(settingsPageContent.includes('<text>About</text>'), true);
    strictEqual(settingsHandlerContent.includes('function pfsensePackage[__WORKSPACE_IDENTIFIER__]Tabs(string $active): array'), true);
    strictEqual(settingsPageContent.includes('<name>Package Updates</name>'), true);
    strictEqual(settingsPageContent.includes('<fieldname>update_check_frequency</fieldname>'), true);
    strictEqual(settingsPageContent.includes('<default_value>[__PFSENSE_UPDATE_DEFAULT_FREQUENCY__]</default_value>'), true);
    strictEqual(settingsPageContent.includes('<description>[__PFSENSE_UPDATE_SETTINGS_DESCRIPTION__]</description>'), true);
    strictEqual(settingsPageContent.includes('<fieldname>update_remote_notifications</fieldname>'), true);
    strictEqual(settingsPageContent.includes('<custom_php_deinstall_command>'), true);
    strictEqual(settingsHandlerContent.includes('PackagePaths::UPDATE_CHECK_COMMAND'), true);
    strictEqual(settingsHandlerContent.includes('UpdateManager::stableCronSchedule($storedSchedule)'), true);
    strictEqual(settingsHandlerContent.includes('$frequency === \'never\''), true);
    strictEqual(settingsHandlerContent.includes('close_notice(UpdateManager::NOTICE_ID)'), true);
    strictEqual(aboutPageContent.includes('simplexml_'), false);
    strictEqual(aboutPageContent.includes('$installedPackageVersion = UpdateManager::installedVersion()'), true);
    strictEqual(aboutPageContent.includes('gettext(\'Unknown\')'), true);
    strictEqual(aboutPageContent.includes('$packageDataPath = \'/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]\''), true);
    strictEqual(aboutPageContent.includes('display_top_tabs(pfsensePackage[__WORKSPACE_IDENTIFIER__]Tabs(\'about\'))'), true);
    strictEqual(aboutPageContent.includes('$projectRepository = \'[__PROJECT_REPOSITORY__]\''), true);
    strictEqual(aboutPageContent.includes('rtrim($projectRepository, \'/\') . \'/releases\''), true);
    strictEqual(aboutPageContent.includes('$fundSources = [__PROJECT_FUND_SOURCES__]'), true);
    strictEqual(aboutPageContent.includes('// List each pfSense release here after testing the package on it.'), true);
    strictEqual(aboutPageContent.includes('class="pkg-about-hero"'), true);
    strictEqual(aboutPageContent.includes('class="table table-striped table-hover pkg-about-table"'), true);
    strictEqual(aboutPageContent.includes('class="fab fa-github"'), true);
    strictEqual(aboutPageContent.includes('class="far fa-circle"'), true);
    strictEqual(aboutPageContent.includes('fab fa-paypal'), true);
    strictEqual(aboutPageContent.includes('.pkg-about .btn i {'), true);
    strictEqual(aboutPageContent.includes('.pkg-about-table i {'), true);
    strictEqual(aboutPageContent.includes('data:image/svg+xml;base64,'), true);
    strictEqual(aboutPageContent.includes('gettext(\'Support the Project\')'), true);
    strictEqual(aboutPageContent.includes('%1$s is free and open source under the %2$s. If it saves you time, you can support its development.'), true);
    strictEqual(aboutPageContent.includes('$supportMessageTemplateEscaped = $escape($supportMessageTemplate)'), true);
    strictEqual(aboutPageContent.includes('$supportMessage = sprintf('), true);
    strictEqual(aboutPageContent.includes('target="_blank" rel="noopener noreferrer"'), true);
    strictEqual(aboutPageContent.includes('$escape($packageVersion)'), true);
    strictEqual(aboutPageContent.includes('if ($updatesAvailable):'), true);
    strictEqual(aboutPageContent.includes('UpdateManager::queueSelfUpdate($queuedVersion)'), true);
    strictEqual(aboutPageContent.includes('mwexec_bg(PackagePaths::SELF_UPDATE_COMMAND)'), true);
    strictEqual(aboutPageContent.includes('gettext(\'Check Now\')'), true);
    strictEqual(aboutPageContent.includes('gettext(\'Update to %1$s\')'), true);
    strictEqual(aboutPageContent.includes('\'[__WORKSPACE_NAME__]-about.php?update_status=1\''), true);
    strictEqual(aboutPageContent.includes('Each tested release passed install, upgrade, a representative package operation, and removal.'), true);
    strictEqual(aboutPageContent.includes('prefix change, and removal'), false);
    strictEqual(aboutPageContent.includes('fa fa-github'), false);
    strictEqual(aboutPageContent.includes('fa fa-paypal'), false);
    strictEqual(aboutPageContent.includes('fa fa-circle-o'), false);
    strictEqual(aboutPageContent.includes('i.fa'), false);
    strictEqual(aboutPageContent.includes('Project Links'), false);
    strictEqual(aboutPageContent.includes('\'Homepage\''), false);
    strictEqual(fileLockContent.includes('flock($handle, LOCK_EX | LOCK_NB)'), true);
    strictEqual(fileLockContent.includes('fchmod('), false);
    strictEqual(packagePathsContent.includes('UPDATE_SCHEDULE_PATH = \'installedpackages/[__PFSENSE_CONFIG_NAME__]/update_schedule\''), true);
    strictEqual(updateManagerContent.includes('RELEASES_API = \'[__PFSENSE_UPDATE_API_URL__]\''), true);
    strictEqual(updateManagerContent.includes('DOWNLOAD_PREFIX = \'[__PFSENSE_UPDATE_DOWNLOAD_PREFIX__]\''), true);
    strictEqual(updateManagerContent.includes('64 * 1024 * 1024'), true);
    strictEqual(updateManagerContent.includes('64 * 1024'), true);
    strictEqual(updateManagerContent.includes('SSH_KEYGEN_COMMAND = \'/usr/bin/ssh-keygen\''), true);
    strictEqual(updateManagerContent.includes('private const PKG_COMMAND = \'/usr/local/sbin/pkg\''), true);
    strictEqual(updateManagerContent.indexOf('$this->verifyReleaseSignature(') < updateManagerContent.indexOf('$this->verifyPackageMetadata('), true);
    strictEqual(updateManagerContent.includes([
      '                \'add\',',
      '                \'-f\',',
    ].join('\n')), true);
    strictEqual(updateManagerContent.includes('Translator'), false);
    strictEqual(packageScriptContent.includes('case \'--check-updates\''), true);
    strictEqual(packageScriptContent.includes('case \'--self-update\''), true);
    strictEqual(packageScriptContent.includes('\'NOVA_PFSENSE_UPDATE_RELEASES_API\''), true);
    strictEqual(packageScriptContent.includes('\'NOVA_PFSENSE_UPDATE_DOWNLOAD_PREFIX\''), true);
    strictEqual(packageScriptContent.includes('SIGNING_KEYS'), false);
    strictEqual(packageScriptContent.includes('SSH_KEYGEN'), false);
    strictEqual(packageLogoContent.includes('<title>nova-logo-bg</title>'), true);
    strictEqual(releaseSigningKeyContent, [
      '# Release signing keys for pfSense-pkg-[__WORKSPACE_IDENTIFIER__].',
      '#',
      '# The publish workflow adds the public key of its release signing secret to the',
      '# package it builds, so this file normally lists no key. Installed copies only',
      '# install updates signed by a key listed in their copy of this file.',
      '#',
      '# To change keys, add the new "ssh-ed25519 ..." public key on its own line,',
      '# publish one release while the old key is still the secret, then replace the',
      '# secret with the new key.',
      '',
    ].join('\n'));
    strictEqual(makefileContent.includes('MAINTAINER?=\t[__PROJECT_AUTHOR_EMAIL__]'), true);
    strictEqual(makefileContent.includes('WWW=\t[__PROJECT_HOMEPAGE__]'), true);
    strictEqual(makefileContent.includes(`${'$'}{PREFIX}/www/[__WORKSPACE_NAME__]-about.php`), true);
    strictEqual(makefileContent.includes(`${'$'}{FILESDIR}${'$'}{DATADIR}/logo.svg`), true);
    strictEqual(makefileContent.includes(`${'$'}{FILESDIR}${'$'}{DATADIR}/release-signing.pub`), true);
    strictEqual(makefileContent.includes(`${'$'}{PREFIX}/pkg/[__WORKSPACE_NAME__]/UpdateManager.php`), true);
    strictEqual(packagePlistContent.includes('www/[__WORKSPACE_NAME__]-about.php'), true);
    strictEqual(packagePlistContent.includes('%%DATADIR%%/logo.svg'), true);
    strictEqual(packagePlistContent.includes('%%DATADIR%%/release-signing.pub'), true);
    strictEqual(packagePlistContent.includes('pkg/[__WORKSPACE_NAME__]/FileLock.php'), true);
    strictEqual(packagePlistContent.includes('pkg/[__WORKSPACE_NAME__]/PackagePaths.php'), true);
    strictEqual(packagePlistContent.includes('pkg/[__WORKSPACE_NAME__]/UpdateManager.php'), true);
    strictEqual(checkPackageContent.includes('\'port/files/usr/local/www/[__WORKSPACE_NAME__]-about.php\''), true);
    strictEqual(checkPackageContent.includes('\'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/logo.svg\''), true);
    strictEqual(checkPackageContent.includes('\'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/release-signing.pub\''), true);
    strictEqual(checkPackageContent.includes('\'tests/updates.php\''), true);
    strictEqual(checkPackageContent.includes('releaseSigningKeyPattern.test(releaseSigningKeyLine)'), true);
    strictEqual(checkPackageContent.includes('WWW=\\t[__PROJECT_HOMEPAGE__]'), true);
    strictEqual(updateTestsContent.includes('UpdateManager::stableCronSchedule([], $randomInteger)'), true);
    strictEqual(updateTestsContent.includes('->verifyReleaseSignature('), true);

    return;
  });

  return;
});
