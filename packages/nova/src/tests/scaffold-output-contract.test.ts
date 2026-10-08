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

import {
  LIB_REGEX_PLACEHOLDER_DOCKER_IMAGE,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_CONTENT,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_SEARCH,
  LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI,
  LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
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
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix,
  Tests_ScaffoldOutputContract_TemplateContracts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintBaseline,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_EslintConfigIndex,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineGeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExtraFinalNewlineMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderGeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage,
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
  Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedGroupNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand,
  Tests_ScaffoldOutputContract_VerifyScriptContract_HasParent,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonRaw,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ParentIndex,
  Tests_ScaffoldOutputContract_VerifyScriptContract_PreviousParentIndex,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Returns,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupModes,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupNodeEnvOptions,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJson,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonPath,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonRaw,
  Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboTasks,
  Tests_ScaffoldOutputContract_VerifyStarterContract_Returns,
  Tests_ScaffoldOutputContract_VerifyStarterContract_SandboxRoot,
  Tests_ScaffoldOutputContract_VerifyStarterContract_TargetDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_Contract,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_PackageDirectory,
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
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'scripts/run-gradle.mjs',
      'tests/project.test.ts',
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
    ]),
  },
  {
    name: 'apple',
    templateSubpath: 'app/apple',
    expectedFiles: [
      'Sources/App.swift',
      'Sources/ContentView.swift',
      'Tests/AppTests.swift',
      'package.json',
      'project.yml',
    ],
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
    templateOptionSubpaths: ['scaffold-options/app/astro/static'],
    expectedFiles: [
      'astro.config.mjs',
      'eslint.config.mts',
      'package.json',
      'src/pages/index.astro',
      'tests/project.test.ts',
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
      '.env.sample',
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'tests/project.test.ts',
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
      'docs/intro.mdx',
      'docusaurus.config.ts',
      'eslint.config.mts',
      'package.json',
      'sidebars.ts',
      'src/pages/index.mdx',
      'src/tests/frontmatter.test.ts',
      'src/tests/link.test.ts',
      'src/tests/markdown-table.test.ts',
      'src/tests/terminology.test.ts',
      'src/tests/type-declarations.test.ts',
      'static/.gitkeep',
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
      [
        LIB_REGEX_PLACEHOLDER_DOCUSAURUS_SEARCH,
        'false',
      ],
    ]),
  },
  {
    name: 'docker-image',
    templateSubpath: 'app/docker-image',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'tests/project.test.ts',
      'tsconfig.config.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-docker-image',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-docker-image-app-service',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Service',
      ],
    ]),
  },
  {
    name: 'express',
    templateSubpath: 'app/express',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'tests/project.test.ts',
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
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-action',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'my-action',
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
    expectedFiles: [
      'config.schema.json',
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'src/platform.ts',
      'src/types/index.d.ts',
      'src/types/platform.d.ts',
      'tests/project.test.ts',
      'tsconfig.config.json',
      'tsconfig.source.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
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
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Sample',
      ],
      [
        LIB_REGEX_PLACEHOLDER_HOMEBRIDGE_CUSTOM_UI,
        'false',
      ],
    ]),
  },
  {
    name: 'node-cli',
    templateSubpath: 'package/node-cli',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/index.test.ts',
      'src/index.ts',
      'src/program.ts',
      'tsconfig.config.json',
      'tsconfig.source.json',
      'tsconfig.tests.json',
      'vitest.config.mts',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-node-cli',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'my-node-cli',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'my-node-cli',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'My Node CLI',
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
      'port/files/usr/local/pkg/scheduler.inc',
      'port/files/usr/local/pkg/scheduler.xml',
      'port/files/usr/local/sbin/scheduler',
      'port/files/usr/local/share/pfSense-pkg-Scheduler/info.xml',
      'port/pkg-descr',
      'port/pkg-plist',
      'scripts/build-package.sh',
      'scripts/check-package.mjs',
      'scripts/regex.mjs',
      'scripts/stage-package.mjs',
      'tests/project.test.ts',
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
        'pfsense-pkg-scheduler',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_IDENTIFIER,
        'Scheduler',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'scheduler',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Scheduler',
      ],
    ]),
  },
  {
    name: 'pfsense-root',
    templateSubpath: 'package/pfsense-root',
    expectedFiles: ['.github/workflows/pfsense-scheduler.yml'],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_NAME,
        'scheduler',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_RELATIVE_PATH,
        'packages/scheduler',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_TITLE,
        'Scheduler',
      ],
    ]),
  },
  {
    name: 'nextjs',
    templateSubpath: 'app/nextjs',
    expectedFiles: [
      'eslint.config.mts',
      'next.config.mjs',
      'package.json',
      'src/app/globals.css',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/types/app/layout.d.ts',
      'src/types/app/page.d.ts',
      'tests/project.test.ts',
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
      'scaffold-options/app/vite/framework/vanilla',
      'scaffold-options/app/vite/pwa/disabled',
    ],
    expectedFiles: [
      'config/eslint-framework.mts',
      'config/framework-plugins.ts',
      'config/pwa-plugins.ts',
      'eslint.config.mts',
      'index.html',
      'package.json',
      'src/main.ts',
      'tests/project.test.ts',
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
    ]),
  },
  {
    name: 'cloudflare-workers',
    templateSubpath: 'app/cloudflare-workers',
    expectedFiles: [
      'eslint.config.mts',
      'package.json',
      'src/index.ts',
      'src/types/index.d.ts',
      'tests/project.test.ts',
      'tsconfig.config.json',
      'tsconfig.tests.json',
      'tsconfig.worker.json',
      'vitest.config.mts',
      'wrangler.toml',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-cloudflare-workers',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-cloudflare-workers-app-worker',
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
 * @param {Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath} packageJsonPath - Package json path.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyScriptContract_Returns}
 *
 * @since 0.27.0
 */
async function verifyScriptContract(packageJsonPath: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonPath): Tests_ScaffoldOutputContract_VerifyScriptContract_Returns {
  const packageJsonRaw: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJsonRaw = await readFile(packageJsonPath, 'utf-8');
  const packageJson: Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson = JSON.parse(packageJsonRaw) as Tests_ScaffoldOutputContract_VerifyScriptContract_PackageJson;
  const scripts: Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts = packageJson['scripts'] as Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts;
  const scriptNames: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames = Object.keys(scripts);
  const scriptGroupOrder: Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder = [
    'dev',
    'prod',
    'check',
    'build',
    'deploy',
    'clean',
    'i18n',
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
  let previousParentIndex: Tests_ScaffoldOutputContract_VerifyScriptContract_PreviousParentIndex = -1;

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
    const expectedParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand = `nova utility run-scripts --${scriptGroupModes[scriptGroup]}${scriptGroupNodeEnvOptions[scriptGroup]} '${scriptGroup}:*'`;
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
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory} targetDirectory - Target directory.
 * @param {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles}   expectedFiles   - Expected files.
 *
 * @returns {Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns}
 *
 * @since 0.26.0
 */
async function verifyGeneratedOutput(targetDirectory: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory, expectedFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles): Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns {
  const generatedFiles: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles = globSync('**/*', {
    cwd: targetDirectory,
    dot: true,
    nodir: true,
  }).sort();
  const inventoryMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage = `Generated scaffold inventory drifted in "${targetDirectory}".`;

  deepStrictEqual(generatedFiles, expectedFiles, inventoryMessage);

  const generatedContents: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents = await Promise.all(generatedFiles.map((generatedFile) => {
    const generatedFilePath: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath = join(targetDirectory, generatedFile);

    return readFile(generatedFilePath, 'utf-8');
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
    strictEqual(eslintConfigContent.includes('...novaRules,'), true, `Generated ESLint config must enable Nova custom rules in "${targetDirectory}".`);
    strictEqual(generatedFiles.includes('vitest.config.mts'), true, `Generated JavaScript or TypeScript tooling must include a Vitest config in "${targetDirectory}".`);
    strictEqual(generatedFiles.some((generatedFile) => generatedFile.endsWith('.test.ts')), true, `Generated JavaScript or TypeScript tooling must include a Vitest suite in "${targetDirectory}".`);
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
  }

  if (generatedFiles.includes('package.json') === true) {
    await verifyScriptContract(join(targetDirectory, 'package.json'));
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
    'eslint.config.mts',
    'nova.config.json',
    'package.json',
    'tests/project.test.ts',
    'tsconfig.config.json',
    'tsconfig.tests.json',
    'turbo.json',
    'vitest.config.mts',
  ]);

  const generatedPackageJsonPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath = join(targetDirectory, 'package.json');
  const generatedPackageJsonRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw = await readFile(generatedPackageJsonPath, 'utf-8');
  const generatedPackageJson: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson = JSON.parse(generatedPackageJsonRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson;
  const generatedDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies = generatedPackageJson['dependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDependencies;
  const generatedDevDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = generatedPackageJson['devDependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies;
  const generatedTurboJsonPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonPath = join(targetDirectory, 'turbo.json');
  const generatedTurboJsonRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonRaw = await readFile(generatedTurboJsonPath, 'utf-8');
  const generatedTurboJson: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJson = JSON.parse(generatedTurboJsonRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJson;
  const generatedTurboTasks: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboTasks = generatedTurboJson['tasks'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboTasks;

  strictEqual(generatedDependencies['@cbnventures/nova'], novaPackageJson['version']);
  strictEqual(generatedDevDependencies['@cbnventures/nova'], undefined);
  strictEqual(generatedDevDependencies['turbo'], novaPackageJson['devDependencies']['turbo']);
  deepStrictEqual(Object.keys(generatedTurboTasks), [
    'dev',
    'prod',
    'check',
    'build',
    'deploy',
    'clean',
  ]);

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

  await verifyGeneratedOutput(targetDirectory, contract['expectedFiles']);

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
    const rejectedTemplateContract: Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_RejectedTemplateContract = templateContractResults.find((templateContractResult): templateContractResult is PromiseRejectedResult => templateContractResult.status === 'rejected');

    if (rejectedTemplateContract !== undefined) {
      throw rejectedTemplateContract.reason;
    }

    return;
  });

  return;
});
