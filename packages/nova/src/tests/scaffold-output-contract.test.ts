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
  LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
  LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
  LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
} from '../lib/regex.js';
import {
  createMonorepoRoot,
  writeTemplateFiles,
} from '../lib/scaffold.js';

import type {
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesEveryTemplateInventory_TemplateContractPromises,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_MatchesTheBaseStarterInventory_StarterContractPromise,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_PackageDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_SandboxRoot,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryDirectory,
  Tests_ScaffoldOutputContract_ScaffoldOutputContract_TemporaryPrefix,
  Tests_ScaffoldOutputContract_TemplateContracts,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_ExpectedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContents,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFilePath,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedFiles,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_InventoryMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_Returns,
  Tests_ScaffoldOutputContract_VerifyGeneratedOutput_TargetDirectory,
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
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptGroupOrder,
  Tests_ScaffoldOutputContract_VerifyScriptContract_ScriptNames,
  Tests_ScaffoldOutputContract_VerifyScriptContract_Scripts,
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
  Tests_ScaffoldOutputContract_VerifyTemplateContract_SandboxRoot,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TargetDirectory,
  Tests_ScaffoldOutputContract_VerifyTemplateContract_TemplateDirectory,
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
    name: 'docusaurus',
    templateSubpath: 'docs/docusaurus',
    expectedFiles: [
      'docs/intro.mdx',
      'docusaurus.config.ts',
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
    ]),
  },
  {
    name: 'express',
    templateSubpath: 'app/express',
    expectedFiles: [
      'package.json',
      'src/index.ts',
      'tsconfig.json',
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
    name: 'nextjs',
    templateSubpath: 'app/nextjs',
    expectedFiles: [
      'next.config.mjs',
      'package.json',
      'src/app/globals.css',
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'tsconfig.json',
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
    ]),
  },
  {
    name: 'vite',
    templateSubpath: 'app/vite',
    expectedFiles: [
      'index.html',
      'package.json',
      'src/main.ts',
      'tsconfig.json',
      'vite.config.mts',
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
    ]),
  },
  {
    name: 'workers',
    templateSubpath: 'app/workers',
    expectedFiles: [
      'package.json',
      'src/index.ts',
      'tsconfig.json',
      'wrangler.toml',
    ],
    replacements: new Map([
      [
        LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
        'contract-workers',
      ],
      [
        LIB_REGEX_PLACEHOLDER_WORKSPACE_PACKAGE_NAME,
        'contract-workers-app-worker',
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
    const expectedParentCommand: Tests_ScaffoldOutputContract_VerifyScriptContract_ExpectedParentCommand = `nova utility run-scripts --${scriptGroupModes[scriptGroup]} '${scriptGroup}:*'`;
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
    const generatedContent: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_GeneratedContent = generatedContents[index] ?? '';

    return generatedContent.includes('[__') && generatedContent.includes('__]');
  });
  const placeholderMessage: Tests_ScaffoldOutputContract_VerifyGeneratedOutput_PlaceholderMessage = [
    `Generated scaffold files retain unresolved placeholders in "${targetDirectory}":`,
    ...unresolvedFiles,
  ].join('\n');

  deepStrictEqual(unresolvedFiles, [], placeholderMessage);

  if (generatedFiles.includes('package.json') === true) {
    await verifyScriptContract(join(targetDirectory, 'package.json'));
  }

  return;
}

/**
 * Tests - Scaffold Output Contract - Verify Starter Contract.
 *
 * Generates the programmatic base starter separately because it has no template
 * directory, then applies the same inventory and placeholder assertions.
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
    'nova.config.json',
    'package.json',
    'turbo.json',
  ]);

  const generatedPackageJsonPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonPath = join(targetDirectory, 'package.json');
  const generatedPackageJsonRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJsonRaw = await readFile(generatedPackageJsonPath, 'utf-8');
  const generatedPackageJson: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson = JSON.parse(generatedPackageJsonRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedPackageJson;
  const generatedDevDependencies: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies = generatedPackageJson['devDependencies'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedDevDependencies;
  const generatedTurboJsonPath: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonPath = join(targetDirectory, 'turbo.json');
  const generatedTurboJsonRaw: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJsonRaw = await readFile(generatedTurboJsonPath, 'utf-8');
  const generatedTurboJson: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJson = JSON.parse(generatedTurboJsonRaw) as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboJson;
  const generatedTurboTasks: Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboTasks = generatedTurboJson['tasks'] as Tests_ScaffoldOutputContract_VerifyStarterContract_GeneratedTurboTasks;

  strictEqual(generatedDevDependencies['@cbnventures/nova'], novaPackageJson['version']);
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

  await writeTemplateFiles(templateDirectory, targetDirectory, contract['replacements']);

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

    await Promise.all(templateContractPromises);

    return;
  });

  return;
});
