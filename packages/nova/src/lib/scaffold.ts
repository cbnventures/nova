import { promises as fs } from 'fs';
import { join, relative, resolve } from 'path';

import prompts from 'prompts';

import { Logger } from '../toolkit/index.js';
import { LIB_REGEX_PLACEHOLDER_PROJECT_SLUG } from './regex.js';
import { discoverPathsWithFile, resolveTemplatePath, saveGeneratedFile } from './utility.js';

import type {
  LibScaffoldCollectFilesDirectory,
  LibScaffoldCollectFilesEntries,
  LibScaffoldCollectFilesEntryPath,
  LibScaffoldCollectFilesFiles,
  LibScaffoldCollectFilesPrefix,
  LibScaffoldCollectFilesReturns,
  LibScaffoldCreateMonorepoRootAppsDirectory,
  LibScaffoldCreateMonorepoRootCurrentDirectory,
  LibScaffoldCreateMonorepoRootNovaConfigContent,
  LibScaffoldCreateMonorepoRootNovaConfigPath,
  LibScaffoldCreateMonorepoRootNovaConfigRelativePath,
  LibScaffoldCreateMonorepoRootOutputDirectory,
  LibScaffoldCreateMonorepoRootPackageJsonContent,
  LibScaffoldCreateMonorepoRootPackageJsonPath,
  LibScaffoldCreateMonorepoRootPackageJsonRelativePath,
  LibScaffoldCreateMonorepoRootPackagesDirectory,
  LibScaffoldCreateMonorepoRootProjectSlug,
  LibScaffoldCreateMonorepoRootProjectTitle,
  LibScaffoldCreateMonorepoRootReturns,
  LibScaffoldCreateWorkspaceDirectoryBasePath,
  LibScaffoldCreateWorkspaceDirectoryReturns,
  LibScaffoldCreateWorkspaceDirectoryWorkspaceDirectory,
  LibScaffoldCreateWorkspaceDirectoryWorkspaceName,
  LibScaffoldDetectMonorepoContextCurrentWorkingDirectory,
  LibScaffoldDetectMonorepoContextLocations,
  LibScaffoldDetectMonorepoContextParsedPackageJson,
  LibScaffoldDetectMonorepoContextReturns,
  LibScaffoldLoadGeneratorAgentConventionsModule,
  LibScaffoldLoadGeneratorDotenvModule,
  LibScaffoldLoadGeneratorEditorconfigModule,
  LibScaffoldLoadGeneratorFundingModule,
  LibScaffoldLoadGeneratorGitignoreModule,
  LibScaffoldLoadGeneratorIssueTemplateModule,
  LibScaffoldLoadGeneratorLicenseModule,
  LibScaffoldLoadGeneratorName,
  LibScaffoldLoadGeneratorReadMeModule,
  LibScaffoldLoadGeneratorReturns,
  LibScaffoldLoadGeneratorWorkflowsModule,
  LibScaffoldPromptPostScaffoldGeneratorsAnswers,
  LibScaffoldPromptPostScaffoldGeneratorsCancelled,
  LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoices,
  LibScaffoldPromptPostScaffoldGeneratorsGeneratorModule,
  LibScaffoldPromptPostScaffoldGeneratorsGeneratorResult,
  LibScaffoldPromptPostScaffoldGeneratorsOriginalCwd,
  LibScaffoldPromptPostScaffoldGeneratorsOutputDirectory,
  LibScaffoldPromptPostScaffoldGeneratorsReturns,
  LibScaffoldPromptPostScaffoldGeneratorsSelected,
  LibScaffoldPromptScaffoldOptionsCancelled,
  LibScaffoldPromptScaffoldOptionsContext,
  LibScaffoldPromptScaffoldOptionsCurrentDirectory,
  LibScaffoldPromptScaffoldOptionsDefaults,
  LibScaffoldPromptScaffoldOptionsDirectoryAnswers,
  LibScaffoldPromptScaffoldOptionsDirectoryChoice,
  LibScaffoldPromptScaffoldOptionsDirectoryChoices,
  LibScaffoldPromptScaffoldOptionsInitialAnswers,
  LibScaffoldPromptScaffoldOptionsInitialPrev,
  LibScaffoldPromptScaffoldOptionsNameValue,
  LibScaffoldPromptScaffoldOptionsOutputAnswers,
  LibScaffoldPromptScaffoldOptionsOutputValue,
  LibScaffoldPromptScaffoldOptionsPromptsAnswers,
  LibScaffoldPromptScaffoldOptionsQuestions,
  LibScaffoldPromptScaffoldOptionsResolvedInitialWorkspaceName,
  LibScaffoldPromptScaffoldOptionsResolvedName,
  LibScaffoldPromptScaffoldOptionsResolvedOutput,
  LibScaffoldPromptScaffoldOptionsResolvedOutputDirectory,
  LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName,
  LibScaffoldPromptScaffoldOptionsReturns,
  LibScaffoldPromptScaffoldOptionsWorkspaceNameValue,
  LibScaffoldRegisterWorkspaceInConfigCategory,
  LibScaffoldRegisterWorkspaceInConfigConfigFilePath,
  LibScaffoldRegisterWorkspaceInConfigConfigName,
  LibScaffoldRegisterWorkspaceInConfigParsedConfig,
  LibScaffoldRegisterWorkspaceInConfigParsedWorkspaces,
  LibScaffoldRegisterWorkspaceInConfigProject,
  LibScaffoldRegisterWorkspaceInConfigProjectName,
  LibScaffoldRegisterWorkspaceInConfigProjectSlug,
  LibScaffoldRegisterWorkspaceInConfigRaw,
  LibScaffoldRegisterWorkspaceInConfigReturns,
  LibScaffoldRegisterWorkspaceInConfigRole,
  LibScaffoldRegisterWorkspaceInConfigWorkspaceName,
  LibScaffoldRegisterWorkspaceInConfigWorkspaceRelPath,
  LibScaffoldRegisterWorkspaceInConfigWorkspaces,
  LibScaffoldRunScaffoldCategory,
  LibScaffoldRunScaffoldConfig,
  LibScaffoldRunScaffoldConfigFilePath,
  LibScaffoldRunScaffoldConfigRoot,
  LibScaffoldRunScaffoldContext,
  LibScaffoldRunScaffoldCurrentDirectory,
  LibScaffoldRunScaffoldImportMetaUrl,
  LibScaffoldRunScaffoldIsDryRun,
  LibScaffoldRunScaffoldModePrefix,
  LibScaffoldRunScaffoldOptions,
  LibScaffoldRunScaffoldReturns,
  LibScaffoldRunScaffoldTemplateDirectory,
  LibScaffoldRunScaffoldTemplateSubpath,
  LibScaffoldRunScaffoldTypeName,
  LibScaffoldRunScaffoldWorkspaceDirectory,
  LibScaffoldWriteTemplateFilesContent,
  LibScaffoldWriteTemplateFilesCurrentDirectory,
  LibScaffoldWriteTemplateFilesEntries,
  LibScaffoldWriteTemplateFilesPattern,
  LibScaffoldWriteTemplateFilesRelativePath,
  LibScaffoldWriteTemplateFilesReplacements,
  LibScaffoldWriteTemplateFilesReturns,
  LibScaffoldWriteTemplateFilesSourcePath,
  LibScaffoldWriteTemplateFilesTargetDirectory,
  LibScaffoldWriteTemplateFilesTargetPath,
  LibScaffoldWriteTemplateFilesTemplateDirectory,
  LibScaffoldWriteTemplateFilesValue,
} from '../types/lib/scaffold.d.ts';

/**
 * Lib - Scaffold - Detect Monorepo Context.
 *
 * Walks backward from the current directory to find package.json files and determines
 * whether this is a monorepo root, a nested workspace, or standalone.
 *
 * @param {LibScaffoldDetectMonorepoContextCurrentWorkingDirectory} currentWorkingDirectory - Current working directory.
 *
 * @returns {LibScaffoldDetectMonorepoContextReturns}
 *
 * @since 0.15.0
 */
export async function detectMonorepoContext(currentWorkingDirectory: LibScaffoldDetectMonorepoContextCurrentWorkingDirectory): LibScaffoldDetectMonorepoContextReturns {
  const locations: LibScaffoldDetectMonorepoContextLocations = await discoverPathsWithFile('package.json', 'backward');

  // No package.json found anywhere — safe to create a new monorepo.
  if (locations.length === 0) {
    return { context: 'monorepo' };
  }

  // Current directory is inside a child workspace.
  if (
    locations.length > 1
    || (
      locations.length === 1
      && locations[0] !== currentWorkingDirectory
    )
  ) {
    return { context: 'nested' };
  }

  // Package.json is in currentWorkingDirectory — check for workspaces field.
  const parsedPackageJson: LibScaffoldDetectMonorepoContextParsedPackageJson = JSON.parse(await fs.readFile(join(currentWorkingDirectory, 'package.json'), 'utf-8'));

  if (parsedPackageJson['workspaces'] !== undefined) {
    return {
      context: 'workspace', root: currentWorkingDirectory,
    };
  }

  return { context: 'standalone' };
}

/**
 * Lib - Scaffold - Prompt Scaffold Options.
 *
 * Collects project name, workspace name, and output directory through interactive
 * prompts. Adapts the question flow based on monorepo or workspace mode.
 *
 * @param {LibScaffoldPromptScaffoldOptionsContext}  context  - Context.
 * @param {LibScaffoldPromptScaffoldOptionsDefaults} defaults - Defaults.
 *
 * @returns {LibScaffoldPromptScaffoldOptionsReturns}
 *
 * @since 0.15.0
 */
export async function promptScaffoldOptions(context: LibScaffoldPromptScaffoldOptionsContext, defaults: LibScaffoldPromptScaffoldOptionsDefaults): LibScaffoldPromptScaffoldOptionsReturns {
  const currentDirectory: LibScaffoldPromptScaffoldOptionsCurrentDirectory = process.cwd();

  let cancelled: LibScaffoldPromptScaffoldOptionsCancelled = false;

  if (context['context'] === 'monorepo') {
    // Monorepo mode — prompt for project name, workspace name, and output directory.
    const nameValue: LibScaffoldPromptScaffoldOptionsNameValue = defaults['name'] ?? undefined;
    const outputValue: LibScaffoldPromptScaffoldOptionsOutputValue = defaults['output'] ?? undefined;
    const workspaceNameValue: LibScaffoldPromptScaffoldOptionsWorkspaceNameValue = defaults['workspaceName'] ?? undefined;

    const questions: LibScaffoldPromptScaffoldOptionsQuestions = [];

    if (nameValue === undefined) {
      questions.push({
        type: 'text' as const,
        name: 'name',
        message: 'Project name (slug):',
        initial: defaults['typeName'],
      });
    }

    if (workspaceNameValue === undefined) {
      questions.push({
        type: 'text' as const,
        name: 'workspaceName',
        message: 'Workspace name (slug):',
        initial: defaults['typeName'],
      });
    }

    const answers: LibScaffoldPromptScaffoldOptionsPromptsAnswers = await prompts(questions, {
      onCancel: () => false,
    });

    if (nameValue === undefined && answers['name'] === undefined) {
      cancelled = true;
    }

    if (workspaceNameValue === undefined && answers['workspaceName'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const resolvedName: LibScaffoldPromptScaffoldOptionsResolvedName = (nameValue ?? answers['name']) as LibScaffoldPromptScaffoldOptionsResolvedName;
    const resolvedWorkspaceName: LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName = (workspaceNameValue ?? answers['workspaceName']) as LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName;

    // Early return if --output is provided.
    if (outputValue !== undefined) {
      const resolvedOutputDirectory: LibScaffoldPromptScaffoldOptionsResolvedOutputDirectory = resolve(currentDirectory, outputValue);

      return {
        mode: 'monorepo',
        name: resolvedName,
        workspaceName: resolvedWorkspaceName,
        outputDirectory: resolvedOutputDirectory,
      };
    }

    // Prompt for directory choice.
    const directoryChoices: LibScaffoldPromptScaffoldOptionsDirectoryChoices = [
      {
        title: 'Create a new directory',
        value: 'new-directory',
      },
      {
        title: 'Build in current working directory',
        value: 'current-directory',
      },
    ];

    const directoryAnswers: LibScaffoldPromptScaffoldOptionsDirectoryAnswers = await prompts({
      type: 'select',
      name: 'directoryChoice',
      message: 'Where should the project be created?',
      choices: directoryChoices,
      initial: 0,
    }, {
      onCancel: () => false,
    });

    if (directoryAnswers['directoryChoice'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const directoryChoice: LibScaffoldPromptScaffoldOptionsDirectoryChoice = directoryAnswers['directoryChoice'] as LibScaffoldPromptScaffoldOptionsDirectoryChoice;

    if (directoryChoice === 'current-directory') {
      return {
        mode: 'monorepo',
        name: resolvedName,
        workspaceName: resolvedWorkspaceName,
        outputDirectory: process.cwd(),
      };
    }

    // Prompt for output directory path.
    const outputAnswers: LibScaffoldPromptScaffoldOptionsOutputAnswers = await prompts({
      type: 'text',
      name: 'output',
      message: 'Output directory:',
      initial: `./${resolvedName}`,
    }, {
      onCancel: () => false,
    });

    if (outputAnswers['output'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const resolvedOutput: LibScaffoldPromptScaffoldOptionsResolvedOutput = outputAnswers['output'] as LibScaffoldPromptScaffoldOptionsResolvedOutput;

    return {
      mode: 'monorepo',
      name: resolvedName,
      workspaceName: resolvedWorkspaceName,
      outputDirectory: resolve(currentDirectory, resolvedOutput),
    };
  }

  // Workspace mode — prompt for package name, workspace name, and output directory.
  const nameValue: LibScaffoldPromptScaffoldOptionsNameValue = defaults['name'] ?? undefined;
  const outputValue: LibScaffoldPromptScaffoldOptionsOutputValue = defaults['output'] ?? undefined;
  const workspaceNameValue: LibScaffoldPromptScaffoldOptionsWorkspaceNameValue = defaults['workspaceName'] ?? undefined;

  const questions: LibScaffoldPromptScaffoldOptionsQuestions = [];

  if (nameValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'name',
      message: 'Package name (slug):',
      initial: defaults['typeName'],
    });
  }

  if (workspaceNameValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'workspaceName',
      message: 'Workspace name (slug):',
      initial: defaults['typeName'],
    });
  }

  if (outputValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'output',
      message: 'Output directory:',
      initial: (_prev: LibScaffoldPromptScaffoldOptionsInitialPrev, answers: LibScaffoldPromptScaffoldOptionsInitialAnswers) => {
        const resolvedInitialWorkspaceName: LibScaffoldPromptScaffoldOptionsResolvedInitialWorkspaceName = (workspaceNameValue ?? answers['workspaceName']) as LibScaffoldPromptScaffoldOptionsResolvedInitialWorkspaceName;

        return `./apps/${resolvedInitialWorkspaceName}`;
      },
    });
  }

  const answers: LibScaffoldPromptScaffoldOptionsPromptsAnswers = await prompts(questions, {
    onCancel: () => false,
  });

  if (nameValue === undefined && answers['name'] === undefined) {
    cancelled = true;
  }

  if (workspaceNameValue === undefined && answers['workspaceName'] === undefined) {
    cancelled = true;
  }

  if (outputValue === undefined && answers['output'] === undefined) {
    cancelled = true;
  }

  if (cancelled === true) {
    return undefined;
  }

  const resolvedName: LibScaffoldPromptScaffoldOptionsResolvedName = (nameValue ?? answers['name']) as LibScaffoldPromptScaffoldOptionsResolvedName;
  const resolvedWorkspaceName: LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName = (workspaceNameValue ?? answers['workspaceName']) as LibScaffoldPromptScaffoldOptionsResolvedWorkspaceName;
  const resolvedOutput: LibScaffoldPromptScaffoldOptionsResolvedOutput = (outputValue ?? answers['output']) as LibScaffoldPromptScaffoldOptionsResolvedOutput;

  return {
    mode: 'workspace',
    name: resolvedName,
    workspaceName: resolvedWorkspaceName,
    outputDirectory: resolve(currentDirectory, resolvedOutput),
  };
}

/**
 * Lib - Scaffold - Create Workspace Directory.
 *
 * Creates the target directory for a new workspace under the given base path using
 * the workspace name as the folder name.
 *
 * @param {LibScaffoldCreateWorkspaceDirectoryBasePath}      basePath      - Base path.
 * @param {LibScaffoldCreateWorkspaceDirectoryWorkspaceName} workspaceName - Workspace name.
 *
 * @returns {LibScaffoldCreateWorkspaceDirectoryReturns}
 *
 * @since 0.15.0
 */
export async function createWorkspaceDirectory(basePath: LibScaffoldCreateWorkspaceDirectoryBasePath, workspaceName: LibScaffoldCreateWorkspaceDirectoryWorkspaceName): LibScaffoldCreateWorkspaceDirectoryReturns {
  const workspaceDirectory: LibScaffoldCreateWorkspaceDirectoryWorkspaceDirectory = join(basePath, workspaceName);

  await fs.mkdir(workspaceDirectory, { recursive: true });

  Logger.customize({
    name: 'createWorkspaceDirectory',
    purpose: 'created',
  }).info(`Created directory "${workspaceDirectory}".`);

  return workspaceDirectory;
}

/**
 * Lib - Scaffold - Write Template Files.
 *
 * Reads every file from the template directory, applies placeholder replacements,
 * and writes the results into the target directory using saveGeneratedFile.
 *
 * @param {LibScaffoldWriteTemplateFilesTemplateDirectory} templateDirectory - Template directory.
 * @param {LibScaffoldWriteTemplateFilesTargetDirectory}   targetDirectory   - Target directory.
 * @param {LibScaffoldWriteTemplateFilesReplacements}      replacements      - Replacements.
 *
 * @returns {LibScaffoldWriteTemplateFilesReturns}
 *
 * @since 0.15.0
 */
export async function writeTemplateFiles(templateDirectory: LibScaffoldWriteTemplateFilesTemplateDirectory, targetDirectory: LibScaffoldWriteTemplateFilesTargetDirectory, replacements: LibScaffoldWriteTemplateFilesReplacements): LibScaffoldWriteTemplateFilesReturns {
  const currentDirectory: LibScaffoldWriteTemplateFilesCurrentDirectory = process.cwd();
  const entries: LibScaffoldWriteTemplateFilesEntries = await collectFiles(templateDirectory, '');

  for (const entry of entries) {
    const sourcePath: LibScaffoldWriteTemplateFilesSourcePath = join(templateDirectory, entry);
    const targetPath: LibScaffoldWriteTemplateFilesTargetPath = join(targetDirectory, entry);

    let content: LibScaffoldWriteTemplateFilesContent = await fs.readFile(sourcePath, 'utf-8');

    // Apply placeholder replacements.
    for (const replacement of replacements) {
      const pattern: LibScaffoldWriteTemplateFilesPattern = replacement[0];
      const value: LibScaffoldWriteTemplateFilesValue = replacement[1];

      content = content.replace(new RegExp(pattern.source, 'g'), value);
    }

    await saveGeneratedFile(targetPath, content, true);

    const relativePath: LibScaffoldWriteTemplateFilesRelativePath = relative(currentDirectory, targetPath);

    Logger.customize({
      name: 'writeTemplateFiles',
      purpose: 'written',
    }).info(`Created "${relativePath}".`);
  }

  return;
}

/**
 * Lib - Scaffold - Collect Files.
 *
 * Recursively lists all files in a template directory while skipping the .novaignore
 * marker used by workspace discovery.
 *
 * @param {LibScaffoldCollectFilesDirectory} directory - Directory.
 * @param {LibScaffoldCollectFilesPrefix}    prefix    - Prefix.
 *
 * @private
 *
 * @returns {LibScaffoldCollectFilesReturns}
 *
 * @since 0.15.0
 */
async function collectFiles(directory: LibScaffoldCollectFilesDirectory, prefix: LibScaffoldCollectFilesPrefix): LibScaffoldCollectFilesReturns {
  const entries: LibScaffoldCollectFilesEntries = await fs.readdir(directory, { withFileTypes: true });
  const files: LibScaffoldCollectFilesFiles = [];

  for (const entry of entries) {
    // Skip the ignore marker used by workspace discovery.
    if (entry.isFile() === true && entry.name === '.novaignore') {
      continue;
    }

    const entryPath: LibScaffoldCollectFilesEntryPath = (prefix === '') ? entry.name : `${prefix}/${entry.name}`;

    if (entry.isDirectory() === true) {
      files.push(...await collectFiles(join(directory, entry.name), entryPath));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

/**
 * Lib - Scaffold - Create Monorepo Root.
 *
 * Generates the top-level monorepo structure with apps and packages directories, a root
 * package.json with workspaces, and a baseline nova.config.json for the project.
 *
 * @param {LibScaffoldCreateMonorepoRootOutputDirectory} outputDirectory - Output directory.
 * @param {LibScaffoldCreateMonorepoRootProjectSlug}     projectSlug     - Project slug.
 *
 * @returns {LibScaffoldCreateMonorepoRootReturns}
 *
 * @since 0.15.0
 */
export async function createMonorepoRoot(outputDirectory: LibScaffoldCreateMonorepoRootOutputDirectory, projectSlug: LibScaffoldCreateMonorepoRootProjectSlug): LibScaffoldCreateMonorepoRootReturns {
  const currentDirectory: LibScaffoldCreateMonorepoRootCurrentDirectory = process.cwd();

  await fs.mkdir(outputDirectory, { recursive: true });

  const appsDirectory: LibScaffoldCreateMonorepoRootAppsDirectory = join(outputDirectory, 'apps');

  await fs.mkdir(appsDirectory, { recursive: true });

  const packagesDirectory: LibScaffoldCreateMonorepoRootPackagesDirectory = join(outputDirectory, 'packages');

  await fs.mkdir(packagesDirectory, { recursive: true });

  // Create root package.json.
  const packageJsonContent: LibScaffoldCreateMonorepoRootPackageJsonContent = {
    name: `${projectSlug}-project`,
    version: '0.0.0',
    private: true,
    workspaces: [
      'apps/*',
      'packages/*',
    ],
    devDependencies: {
      '@cbnventures/nova': 'latest',
    },
    engines: {
      node: '>=18.0.0',
    },
  };

  const packageJsonPath: LibScaffoldCreateMonorepoRootPackageJsonPath = join(outputDirectory, 'package.json');

  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJsonContent, null, 2)}\n`, 'utf-8');

  const packageJsonRelativePath: LibScaffoldCreateMonorepoRootPackageJsonRelativePath = relative(currentDirectory, packageJsonPath);

  Logger.customize({
    name: 'createMonorepoRoot',
    purpose: 'written',
  }).info(`Created "${packageJsonRelativePath}".`);

  // Create baseline nova.config.json.
  const projectTitle: LibScaffoldCreateMonorepoRootProjectTitle = projectSlug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

  const novaConfigContent: LibScaffoldCreateMonorepoRootNovaConfigContent = {
    project: {
      name: {
        slug: projectSlug,
        title: projectTitle,
      },
    },
    workspaces: {
      './': {
        name: `${projectSlug}-project`,
        role: 'project',
        policy: 'freezable',
      },
    },
  };

  const novaConfigPath: LibScaffoldCreateMonorepoRootNovaConfigPath = join(outputDirectory, 'nova.config.json');

  await fs.writeFile(novaConfigPath, `${JSON.stringify(novaConfigContent, null, 2)}\n`, 'utf-8');

  const novaConfigRelativePath: LibScaffoldCreateMonorepoRootNovaConfigRelativePath = relative(currentDirectory, novaConfigPath);

  Logger.customize({
    name: 'createMonorepoRoot',
    purpose: 'written',
  }).info(`Created "${novaConfigRelativePath}".`);

  return;
}

/**
 * Lib - Scaffold - Prompt Post Scaffold Generators.
 *
 * Presents a multi-select prompt after scaffolding completes so the user can run
 * generators like editorconfig, gitignore, license, and workflows.
 *
 * @param {LibScaffoldPromptPostScaffoldGeneratorsOutputDirectory} outputDirectory - Output directory.
 *
 * @returns {LibScaffoldPromptPostScaffoldGeneratorsReturns}
 *
 * @since 0.15.0
 */
export async function promptPostScaffoldGenerators(outputDirectory: LibScaffoldPromptPostScaffoldGeneratorsOutputDirectory): LibScaffoldPromptPostScaffoldGeneratorsReturns {
  let cancelled: LibScaffoldPromptPostScaffoldGeneratorsCancelled = false;

  const generatorChoices: LibScaffoldPromptPostScaffoldGeneratorsGeneratorChoices = [
    {
      title: 'editorconfig', description: 'Consistent coding styles across editors', value: 'editorconfig',
    },
    {
      title: 'gitignore', description: 'Exclude build artifacts and dependencies from Git', value: 'gitignore',
    },
    {
      title: 'dotenv', description: 'Environment variable templates for local development', value: 'dotenv',
    },
    {
      title: 'license', description: 'Open source license file for your project', value: 'license',
    },
    {
      title: 'read-me', description: 'Project README with badges and documentation links', value: 'read-me',
    },
    {
      title: 'agent-conventions', description: 'Coding agent rules and conventions', value: 'agent-conventions',
    },
    {
      title: 'funding', description: 'GitHub sponsor and funding links', value: 'funding',
    },
    {
      title: 'issue-template', description: 'GitHub issue forms for bugs, features, and support', value: 'issue-template',
    },
    {
      title: 'workflows', description: 'GitHub Actions CI/CD automation', value: 'workflows',
    },
  ];

  const answers: LibScaffoldPromptPostScaffoldGeneratorsAnswers = await prompts({
    type: 'multiselect',
    name: 'generators',
    message: 'Run generators? (space to select, enter to confirm)',
    choices: generatorChoices,
    hint: '- Space to select. Return to submit',
  }, {
    onCancel: () => false,
  });

  if (answers['generators'] === undefined) {
    cancelled = true;
  }

  if (cancelled === true) {
    return;
  }

  const selected: LibScaffoldPromptPostScaffoldGeneratorsSelected = answers['generators'] as LibScaffoldPromptPostScaffoldGeneratorsSelected;

  if (selected.length === 0) {
    Logger.customize({
      name: 'promptPostScaffoldGenerators',
      purpose: 'skip',
    }).info('No generators selected. Skipping.');

    return;
  }

  // Change to the scaffolded directory and run selected generators.
  const originalCwd: LibScaffoldPromptPostScaffoldGeneratorsOriginalCwd = process.cwd();

  process.chdir(outputDirectory);

  for (const generatorName of selected) {
    Logger.customize({
      name: 'promptPostScaffoldGenerators',
      purpose: 'running',
    }).info(`Running generator "${generatorName}" ...`);

    try {
      const generatorModule: LibScaffoldPromptPostScaffoldGeneratorsGeneratorModule = await loadGenerator(generatorName);

      if (generatorModule !== undefined) {
        const generatorResult: LibScaffoldPromptPostScaffoldGeneratorsGeneratorResult = await generatorModule({ replaceFile: true });

        if (generatorResult === 'cancelled') {
          Logger.customize({
            name: 'promptPostScaffoldGenerators',
            purpose: 'cancelled',
          }).info('Generator cancelled. Skipping remaining generators.');

          break;
        }
      }
    } catch (error) {
      Logger.customize({
        name: 'promptPostScaffoldGenerators',
        purpose: 'error',
      }).error(`Failed to run generator "${generatorName}".`);

      Logger.customize({
        name: 'promptPostScaffoldGenerators',
        purpose: 'errorDetail',
      }).debug(error);
    }
  }

  process.chdir(originalCwd);

  return;
}

/**
 * Lib - Scaffold - Load Generator.
 *
 * Dynamically imports a generator module by name and returns a callback
 * that invokes its run method. Called by promptPostScaffoldGenerators.
 *
 * @param {LibScaffoldLoadGeneratorName} name - Name.
 *
 * @private
 *
 * @returns {LibScaffoldLoadGeneratorReturns}
 *
 * @since 0.15.0
 */
async function loadGenerator(name: LibScaffoldLoadGeneratorName): LibScaffoldLoadGeneratorReturns {
  switch (name) {
    case 'editorconfig': {
      const editorconfigModule: LibScaffoldLoadGeneratorEditorconfigModule = await import('../cli/generate/must-haves/editorconfig.js');

      return (options) => editorconfigModule['CliGenerateMustHavesEditorconfig'].run(options);
    }

    case 'gitignore': {
      const gitignoreModule: LibScaffoldLoadGeneratorGitignoreModule = await import('../cli/generate/must-haves/gitignore.js');

      return (options) => gitignoreModule['CliGenerateMustHavesGitignore'].run(options);
    }

    case 'dotenv': {
      const dotenvModule: LibScaffoldLoadGeneratorDotenvModule = await import('../cli/generate/must-haves/dotenv.js');

      return (options) => dotenvModule['CliGenerateMustHavesDotenv'].run(options);
    }

    case 'license': {
      const licenseModule: LibScaffoldLoadGeneratorLicenseModule = await import('../cli/generate/must-haves/license.js');

      return (options) => licenseModule['CliGenerateMustHavesLicense'].run(options);
    }

    case 'read-me': {
      const readMeModule: LibScaffoldLoadGeneratorReadMeModule = await import('../cli/generate/must-haves/read-me.js');

      return (options) => readMeModule['CliGenerateMustHavesReadMe'].run(options);
    }

    case 'agent-conventions': {
      const agentConventionsModule: LibScaffoldLoadGeneratorAgentConventionsModule = await import('../cli/generate/must-haves/agent-conventions.js');

      return (options) => agentConventionsModule['CliGenerateMustHavesAgentConventions'].run(options);
    }

    case 'funding': {
      const fundingModule: LibScaffoldLoadGeneratorFundingModule = await import('../cli/generate/github/funding.js');

      return (options) => fundingModule['CliGenerateGithubFunding'].run(options);
    }

    case 'issue-template': {
      const issueTemplateModule: LibScaffoldLoadGeneratorIssueTemplateModule = await import('../cli/generate/github/issue-template.js');

      return (options) => issueTemplateModule['CliGenerateGithubIssueTemplate'].run(options);
    }

    case 'workflows': {
      const workflowsModule: LibScaffoldLoadGeneratorWorkflowsModule = await import('../cli/generate/github/workflows.js');

      return (options) => workflowsModule['CliGenerateGithubWorkflows'].run(options);
    }

    default: {
      Logger.customize({
        name: 'loadGenerator',
        purpose: 'unknown',
      }).warn(`Unknown generator "${name}". Skipping.`);

      return undefined;
    }
  }
}

/**
 * Lib - Scaffold - Register Workspace In Config.
 *
 * Adds a workspace entry to nova.config.json so the CLI recognizes the new workspace for
 * recipes, generators, and other project-wide operations.
 *
 * @param {LibScaffoldRegisterWorkspaceInConfigConfigFilePath}   configFilePath   - Config file path.
 * @param {LibScaffoldRegisterWorkspaceInConfigWorkspaceRelPath} workspaceRelPath - Workspace rel path.
 * @param {LibScaffoldRegisterWorkspaceInConfigWorkspaceName}    workspaceName    - Workspace name.
 * @param {LibScaffoldRegisterWorkspaceInConfigCategory}         category         - Category.
 *
 * @returns {LibScaffoldRegisterWorkspaceInConfigReturns}
 *
 * @since 0.15.0
 */
export async function registerWorkspaceInConfig(configFilePath: LibScaffoldRegisterWorkspaceInConfigConfigFilePath, workspaceRelPath: LibScaffoldRegisterWorkspaceInConfigWorkspaceRelPath, workspaceName: LibScaffoldRegisterWorkspaceInConfigWorkspaceName, category: LibScaffoldRegisterWorkspaceInConfigCategory): LibScaffoldRegisterWorkspaceInConfigReturns {
  let parsedConfig: LibScaffoldRegisterWorkspaceInConfigParsedConfig = undefined;

  try {
    const raw: LibScaffoldRegisterWorkspaceInConfigRaw = await fs.readFile(configFilePath, 'utf-8');

    parsedConfig = JSON.parse(raw) as LibScaffoldRegisterWorkspaceInConfigParsedConfig;
  } catch {
    Logger.customize({
      name: 'registerWorkspaceInConfig',
      purpose: 'skip',
    }).warn('No nova.config.json found. Skipping workspace registration.');

    return;
  }

  if (parsedConfig === undefined) {
    return;
  }

  // Get project slug from config.
  const project: LibScaffoldRegisterWorkspaceInConfigProject = parsedConfig['project'] as LibScaffoldRegisterWorkspaceInConfigProject;
  const projectName: LibScaffoldRegisterWorkspaceInConfigProjectName = (project !== undefined) ? project['name'] as LibScaffoldRegisterWorkspaceInConfigProjectName : undefined;
  const projectSlug: LibScaffoldRegisterWorkspaceInConfigProjectSlug = (projectName !== undefined) ? projectName['slug'] as LibScaffoldRegisterWorkspaceInConfigProjectSlug : undefined;

  if (projectSlug === undefined) {
    Logger.customize({
      name: 'registerWorkspaceInConfig',
      purpose: 'skip',
    }).warn('No project slug found in nova.config.json. Skipping workspace registration.');

    return;
  }

  // Determine role and config name based on category.
  const role: LibScaffoldRegisterWorkspaceInConfigRole = (category === 'docs') ? 'docs' : 'app';
  const configName: LibScaffoldRegisterWorkspaceInConfigConfigName = (role === 'docs') ? `${projectSlug}-docs` : `${projectSlug}-app-${workspaceName}`;

  // Add workspace entry.
  const workspaces: LibScaffoldRegisterWorkspaceInConfigWorkspaces = (parsedConfig['workspaces'] as LibScaffoldRegisterWorkspaceInConfigParsedWorkspaces) ?? {};

  Reflect.set(workspaces, workspaceRelPath, {
    name: configName,
    role,
    policy: 'freezable',
  });

  Reflect.set(parsedConfig, 'workspaces', workspaces);

  // Write back.
  await fs.writeFile(configFilePath, `${JSON.stringify(parsedConfig, null, 2)}\n`, 'utf-8');

  Logger.customize({
    name: 'registerWorkspaceInConfig',
    purpose: 'written',
  }).info(`Registered workspace "${configName}" in nova.config.json.`);

  return;
}

/**
 * Lib - Scaffold - Run Scaffold.
 *
 * Orchestrates the full scaffold workflow: detects context, prompts for options,
 * writes template files, registers the workspace, and runs generators.
 *
 * @param {LibScaffoldRunScaffoldOptions}         options         - Options.
 * @param {LibScaffoldRunScaffoldCategory}        category        - Category.
 * @param {LibScaffoldRunScaffoldTypeName}        typeName        - Type name.
 * @param {LibScaffoldRunScaffoldTemplateSubpath} templateSubpath - Template subpath.
 * @param {LibScaffoldRunScaffoldImportMetaUrl}   importMetaUrl   - Import meta url.
 *
 * @returns {LibScaffoldRunScaffoldReturns}
 *
 * @since 0.15.0
 */
export async function runScaffold(options: LibScaffoldRunScaffoldOptions, category: LibScaffoldRunScaffoldCategory, typeName: LibScaffoldRunScaffoldTypeName, templateSubpath: LibScaffoldRunScaffoldTemplateSubpath, importMetaUrl: LibScaffoldRunScaffoldImportMetaUrl): LibScaffoldRunScaffoldReturns {
  const currentDirectory: LibScaffoldRunScaffoldCurrentDirectory = process.cwd();
  const isDryRun: LibScaffoldRunScaffoldIsDryRun = options['dryRun'] === true;

  if (isDryRun === true) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'options',
    }).warn('Dry run enabled. File changes will not be made in this session.');
  }

  // Detect Monorepo Context.
  const context: LibScaffoldRunScaffoldContext = await detectMonorepoContext(currentDirectory);

  if (context['context'] === 'nested') {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'context',
    }).error('Re-run this command from the monorepo root directory.');

    process.exitCode = 1;

    return;
  }

  if (context['context'] === 'standalone') {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'context',
    }).error('Found a standalone project. Run from an empty directory to create a new monorepo, or add a "workspaces" field to use workspace mode.');

    process.exitCode = 1;

    return;
  }

  Logger.customize({
    name: 'CliScaffold.run',
    purpose: 'context',
  }).info(`Detected mode: ${context['context']}.`);

  // Prompt for scaffold configuration.
  const config: LibScaffoldRunScaffoldConfig = await promptScaffoldOptions(context, {
    name: options['name'],
    output: options['output'],
    typeName,
    workspaceName: options['workspaceName'],
  });

  if (config === undefined) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'cancelled',
    }).warn('Scaffold cancelled.');

    return;
  }

  Logger.customize({
    name: 'CliScaffold.run',
    purpose: 'config',
  }).info(`Scaffolding ${category} ${typeName} "${config['name']}" in "${config['outputDirectory']}".`);

  if (isDryRun === true) {
    const modePrefix: LibScaffoldRunScaffoldModePrefix = (config['mode'] === 'monorepo') ? 'monorepo root + ' : '';

    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'dryRun',
    }).info(`Would create ${modePrefix}workspace at "${config['outputDirectory']}".`);

    return;
  }

  // Create monorepo root structure if needed.
  if (config['mode'] === 'monorepo') {
    await createMonorepoRoot(config['outputDirectory'], config['name']);
  }

  // Determine workspace output directory.
  const workspaceDirectory: LibScaffoldRunScaffoldWorkspaceDirectory = (config['mode'] === 'monorepo') ? join(config['outputDirectory'], 'apps', config['workspaceName']) : config['outputDirectory'];

  await fs.mkdir(workspaceDirectory, { recursive: true });

  // Resolve template path and write files.
  const templateDirectory: LibScaffoldRunScaffoldTemplateDirectory = resolveTemplatePath(importMetaUrl, templateSubpath);

  await writeTemplateFiles(templateDirectory, workspaceDirectory, new Map([[
    LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
    config['name'],
  ]]));

  // Register workspace in nova.config.json.
  const configRoot: LibScaffoldRunScaffoldConfigRoot = (config['mode'] === 'monorepo') ? config['outputDirectory'] : currentDirectory;
  const configFilePath: LibScaffoldRunScaffoldConfigFilePath = join(configRoot, 'nova.config.json');

  await registerWorkspaceInConfig(configFilePath, `./${relative(configRoot, workspaceDirectory)}`, config['workspaceName'], category);

  Logger.customize({
    name: 'CliScaffold.run',
    purpose: 'complete',
  }).info(`Scaffold complete for ${category} ${typeName}.`);

  // Post-scaffold generators (monorepo mode only).
  if (config['mode'] === 'monorepo') {
    await promptPostScaffoldGenerators(config['outputDirectory']);
  }

  return;
}
