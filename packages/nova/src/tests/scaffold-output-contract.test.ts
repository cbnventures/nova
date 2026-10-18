import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdtemp,
  readFile,
  rm,
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

import { libItemSortOrderKeys } from '../lib/item.js';
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
  LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
  LIB_REGEX_PLACEHOLDER_VITE_FRAMEWORK,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
} from '../lib/regex.js';
import {
  createMonorepoRoot,
  writeTemplateFiles,
} from '../lib/scaffold.js';

import type {
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_RejectedTemplateContract,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResults,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractResultTypeGuard,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerPath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPageContent,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPagePath,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix,
  Tests_ScaffoldOutputContract_TemplateContracts,
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
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigPath,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TsconfigRaw,
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
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupModes,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupNodeEnvOptions,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfig,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedNovaConfigRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts,
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
      '.gitignore',
      'app/.gitignore',
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
      'Tests/AppTests.swift',
      'package.json',
      'project.yml',
      'scripts/run-apple.mjs',
    ],
    expectedScripts: {
      'dev:project': 'node ./scripts/run-apple.mjs generate',
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
      'src/tests/frontmatter.test.ts',
      'src/tests/link.test.ts',
      'src/tests/markdown-table.test.ts',
      'src/tests/terminology.test.ts',
      'src/tests/type-declarations.test.ts',
      'src/types/pages/index.d.ts',
      'static/images/nova.svg',
      'tsconfig.json',
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
      'src/worker/index.test.ts',
      'src/worker/index.ts',
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
      'src/index.ts',
      'src/program.ts',
      'src/status.test.ts',
      'src/status.ts',
      'src/types/api/index.d.ts',
      'src/types/api/index.test.d.ts',
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
      'port/files/usr/local/sbin/my-package',
      'port/files/usr/local/share/pfSense-pkg-MyPackage/info.xml',
      'port/pkg-descr',
      'port/pkg-plist',
      'scripts/build-package.sh',
      'scripts/check-package.mjs',
      'scripts/regex.mjs',
      'scripts/stage-package.mjs',
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
    ]),
  },
  {
    name: 'pfsense-root',
    templateSubpath: 'package/pfsense-root',
    expectedFiles: ['.github/workflows/pfsense-my-package.yml'],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'my-package',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
        'packages/my-package',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'My Package',
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
      'src/app/globals.css',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/styles/nova-launchpad.css',
      'src/types/app/layout.d.ts',
      'src/types/app/page.d.ts',
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
    clean: 'parallel',
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
    const expectedParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand = `nova utility run-scripts --${scriptGroupModes[scriptGroup]}${scriptGroupNodeEnvOptions[scriptGroup]} "${scriptGroup}:*"`;
    const expectedGroupNames: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedGroupNames = [
      scriptGroup,
      ...childScriptNames,
    ];

    strictEqual(parentIndex > previousParentIndex, true, `Generated lifecycle scripts are out of order in "${packageJsonPath}".`);
    strictEqual(scripts[scriptGroup], expectedParentCommand, `Generated parent script "${scriptGroup}" does not use the canonical Nova dispatcher in "${packageJsonPath}".`);
    strictEqual(childScriptNames.length > 0, true, `Generated parent script "${scriptGroup}" has no child steps in "${packageJsonPath}".`);
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
  }).sort();
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

  await createMonorepoRoot(targetDirectory, 'contract-starter');

  await verifyGeneratedOutput(targetDirectory, [
    '.env',
    '.env.sample',
    '.gitignore',
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
  const generatedRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes = generatedNovaConfig['recipes'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedRecipes;
  const generatedMiscellaneousRecipes: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes = generatedRecipes['miscellaneous'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedMiscellaneousRecipes;
  const generatedDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies = generatedPackageJson['dependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies;
  const generatedDevDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = generatedPackageJson['devDependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies;
  const generatedScripts: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts = generatedPackageJson['scripts'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedScripts;

  strictEqual(generatedDependencies['@cbnventures/nova'], novaPackageJson['version']);
  strictEqual(generatedDevDependencies['@cbnventures/nova'], undefined);
  strictEqual(generatedDevDependencies['turbo'], undefined);
  strictEqual(generatedScripts['dev:workspaces'], 'nova utility run-workspaces --node-env development dev');
  strictEqual(generatedScripts['prod:workspaces'], 'nova utility run-workspaces --node-env production prod');
  strictEqual(generatedScripts['check:workspaces'], 'nova utility run-workspaces --concurrency=2 check');
  strictEqual(generatedScripts['build:workspaces'], 'nova utility run-workspaces --concurrency=2 --node-env production build');
  strictEqual(generatedScripts['deploy:workspaces'], 'nova utility run-workspaces --concurrency=2 --node-env production deploy');
  strictEqual(generatedScripts['clean:workspaces'], 'nova utility run-workspaces clean');
  strictEqual(generatedScripts['changelog'], 'nova utility changelog');
  strictEqual(generatedScripts['recipes'], 'nova utility run-recipes --replace-file');
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

  it('routes the pfSense single-instance settings page directly to its native editor', async () => {
    const settingsPagePath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPagePath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__].xml');
    const settingsPageContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsPageContent = await readFile(settingsPagePath, 'utf-8');
    const settingsHandlerPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'pkg', '[__WORKSPACE_NAME__].inc');
    const settingsHandlerContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_SettingsHandlerContent = await readFile(settingsHandlerPath, 'utf-8');
    const packageScriptPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'sbin', '[__WORKSPACE_NAME__]');
    const packageScriptContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageScriptContent = await readFile(packageScriptPath, 'utf-8');
    const packageInfoPath: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoPath = join(packageDirectory, 'templates', 'scaffold', 'package', 'pfsense', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]', 'info.xml');
    const packageInfoContent: Tests_ScaffoldOutputContract_ScaffoldOutputContract_RoutesThePfSenseSingleInstanceSettingsPageDirectlyToItsNativeEditor_PackageInfoContent = await readFile(packageInfoPath, 'utf-8');

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
      packageScriptContent.includes('logger(LOG_NOTICE,'),
      true,
    );

    strictEqual(
      packageInfoContent.includes('<internal_name>[__WORKSPACE_IDENTIFIER__]</internal_name>'),
      true,
    );

    return;
  });

  return;
});
