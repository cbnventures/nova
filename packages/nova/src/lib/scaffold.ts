import { promises as fs } from 'fs';
import { join, relative, resolve } from 'path';

import prompts from 'prompts';

import { Logger } from '../toolkit/index.js';
import { LIB_REGEX_PLACEHOLDER_PROJECT_SLUG } from './regex.js';
import { discoverPathsWithFile, resolveTemplatePath, saveGeneratedFile } from './utility.js';

import type {
  Lib_Scaffold_CollectFiles_Directory,
  Lib_Scaffold_CollectFiles_Entries,
  Lib_Scaffold_CollectFiles_EntryPath,
  Lib_Scaffold_CollectFiles_Files,
  Lib_Scaffold_CollectFiles_Prefix,
  Lib_Scaffold_CollectFiles_Returns,
  Lib_Scaffold_CreateMonorepoRoot_AppsDirectory,
  Lib_Scaffold_CreateMonorepoRoot_CurrentDirectory,
  Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent,
  Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath,
  Lib_Scaffold_CreateMonorepoRoot_NovaConfigRelativePath,
  Lib_Scaffold_CreateMonorepoRoot_OutputDirectory,
  Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent,
  Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath,
  Lib_Scaffold_CreateMonorepoRoot_PackageJsonRelativePath,
  Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory,
  Lib_Scaffold_CreateMonorepoRoot_ProjectSlug,
  Lib_Scaffold_CreateMonorepoRoot_ProjectTitle,
  Lib_Scaffold_CreateMonorepoRoot_Returns,
  Lib_Scaffold_CreateWorkspaceDirectory_BasePath,
  Lib_Scaffold_CreateWorkspaceDirectory_Returns,
  Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceDirectory,
  Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName,
  Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory,
  Lib_Scaffold_DetectMonorepoContext_Locations,
  Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson,
  Lib_Scaffold_DetectMonorepoContext_Returns,
  Lib_Scaffold_LoadGenerator_AgentConventionsModule,
  Lib_Scaffold_LoadGenerator_DotenvModule,
  Lib_Scaffold_LoadGenerator_EditorconfigModule,
  Lib_Scaffold_LoadGenerator_FundingModule,
  Lib_Scaffold_LoadGenerator_GitignoreModule,
  Lib_Scaffold_LoadGenerator_IssueTemplateModule,
  Lib_Scaffold_LoadGenerator_LicenseModule,
  Lib_Scaffold_LoadGenerator_Name,
  Lib_Scaffold_LoadGenerator_ReadMeModule,
  Lib_Scaffold_LoadGenerator_Returns,
  Lib_Scaffold_LoadGenerator_WorkflowsModule,
  Lib_Scaffold_PromptPostScaffoldGenerators_Answers,
  Lib_Scaffold_PromptPostScaffoldGenerators_Cancelled,
  Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoices,
  Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorModule,
  Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorResult,
  Lib_Scaffold_PromptPostScaffoldGenerators_OriginalCwd,
  Lib_Scaffold_PromptPostScaffoldGenerators_OutputDirectory,
  Lib_Scaffold_PromptPostScaffoldGenerators_Returns,
  Lib_Scaffold_PromptPostScaffoldGenerators_Selected,
  Lib_Scaffold_PromptScaffoldOptions_Cancelled,
  Lib_Scaffold_PromptScaffoldOptions_Context,
  Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory,
  Lib_Scaffold_PromptScaffoldOptions_Defaults,
  Lib_Scaffold_PromptScaffoldOptions_DirectoryAnswers,
  Lib_Scaffold_PromptScaffoldOptions_DirectoryChoice,
  Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices,
  Lib_Scaffold_PromptScaffoldOptions_InitialAnswers,
  Lib_Scaffold_PromptScaffoldOptions_InitialPrev,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoNameValue,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoOutputValue,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoPromptsAnswers,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoQuestions,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedOutput,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_MonorepoWorkspaceNameValue,
  Lib_Scaffold_PromptScaffoldOptions_NameValue,
  Lib_Scaffold_PromptScaffoldOptions_OutputAnswers,
  Lib_Scaffold_PromptScaffoldOptions_OutputValue,
  Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers,
  Lib_Scaffold_PromptScaffoldOptions_Questions,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedName,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedOutputDirectory,
  Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput,
  Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName,
  Lib_Scaffold_PromptScaffoldOptions_Returns,
  Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue,
  Lib_Scaffold_RegisterWorkspaceInConfig_Category,
  Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath,
  Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig,
  Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces,
  Lib_Scaffold_RegisterWorkspaceInConfig_Project,
  Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName,
  Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug,
  Lib_Scaffold_RegisterWorkspaceInConfig_Raw,
  Lib_Scaffold_RegisterWorkspaceInConfig_Returns,
  Lib_Scaffold_RegisterWorkspaceInConfig_Role,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName,
  Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath,
  Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces,
  Lib_Scaffold_RunScaffold_Category,
  Lib_Scaffold_RunScaffold_Config,
  Lib_Scaffold_RunScaffold_ConfigFilePath,
  Lib_Scaffold_RunScaffold_ConfigRoot,
  Lib_Scaffold_RunScaffold_Context,
  Lib_Scaffold_RunScaffold_CurrentDirectory,
  Lib_Scaffold_RunScaffold_ImportMetaUrl,
  Lib_Scaffold_RunScaffold_IsDryRun,
  Lib_Scaffold_RunScaffold_ModePrefix,
  Lib_Scaffold_RunScaffold_Options,
  Lib_Scaffold_RunScaffold_Returns,
  Lib_Scaffold_RunScaffold_TemplateDirectory,
  Lib_Scaffold_RunScaffold_TemplateSubpath,
  Lib_Scaffold_RunScaffold_TypeName,
  Lib_Scaffold_RunScaffold_WorkspaceDirectory,
  Lib_Scaffold_WriteTemplateFiles_Content,
  Lib_Scaffold_WriteTemplateFiles_CurrentDirectory,
  Lib_Scaffold_WriteTemplateFiles_Entries,
  Lib_Scaffold_WriteTemplateFiles_Pattern,
  Lib_Scaffold_WriteTemplateFiles_RelativePath,
  Lib_Scaffold_WriteTemplateFiles_Replacements,
  Lib_Scaffold_WriteTemplateFiles_Returns,
  Lib_Scaffold_WriteTemplateFiles_SourcePath,
  Lib_Scaffold_WriteTemplateFiles_TargetDirectory,
  Lib_Scaffold_WriteTemplateFiles_TargetPath,
  Lib_Scaffold_WriteTemplateFiles_TemplateDirectory,
  Lib_Scaffold_WriteTemplateFiles_Value,
} from '../types/lib/scaffold.d.ts';

/**
 * Lib - Scaffold - Detect Monorepo Context.
 *
 * Walks backward from the current directory to find package.json files and determines
 * whether this is a monorepo root, a nested workspace, or standalone.
 *
 * @param {Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory} currentWorkingDirectory - Current working directory.
 *
 * @returns {Lib_Scaffold_DetectMonorepoContext_Returns}
 *
 * @since 0.15.0
 */
export async function detectMonorepoContext(currentWorkingDirectory: Lib_Scaffold_DetectMonorepoContext_CurrentWorkingDirectory): Lib_Scaffold_DetectMonorepoContext_Returns {
  const locations: Lib_Scaffold_DetectMonorepoContext_Locations = await discoverPathsWithFile('package.json', 'backward');

  // No package.json found anywhere - safe to create a new monorepo.
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

  // Package.json is in currentWorkingDirectory - check for workspaces field.
  const parsedPackageJson: Lib_Scaffold_DetectMonorepoContext_ParsedPackageJson = JSON.parse(await fs.readFile(join(currentWorkingDirectory, 'package.json'), 'utf-8'));

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
 * @param {Lib_Scaffold_PromptScaffoldOptions_Context}  context  - Context.
 * @param {Lib_Scaffold_PromptScaffoldOptions_Defaults} defaults - Defaults.
 *
 * @returns {Lib_Scaffold_PromptScaffoldOptions_Returns}
 *
 * @since 0.15.0
 */
export async function promptScaffoldOptions(context: Lib_Scaffold_PromptScaffoldOptions_Context, defaults: Lib_Scaffold_PromptScaffoldOptions_Defaults): Lib_Scaffold_PromptScaffoldOptions_Returns {
  const currentDirectory: Lib_Scaffold_PromptScaffoldOptions_CurrentDirectory = process.cwd();

  let cancelled: Lib_Scaffold_PromptScaffoldOptions_Cancelled = false;

  if (context['context'] === 'monorepo') {
    // Monorepo mode - prompt for project name, workspace name, and output directory.
    const monorepoNameValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoNameValue = defaults['name'] ?? undefined;
    const monorepoOutputValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoOutputValue = defaults['output'] ?? undefined;
    const monorepoWorkspaceNameValue: Lib_Scaffold_PromptScaffoldOptions_MonorepoWorkspaceNameValue = defaults['workspaceName'] ?? undefined;

    const monorepoQuestions: Lib_Scaffold_PromptScaffoldOptions_MonorepoQuestions = [];

    if (monorepoNameValue === undefined) {
      monorepoQuestions.push({
        type: 'text' as const,
        name: 'name',
        message: 'Project name (slug):',
        initial: defaults['typeName'],
      });
    }

    if (monorepoWorkspaceNameValue === undefined) {
      monorepoQuestions.push({
        type: 'text' as const,
        name: 'workspaceName',
        message: 'Workspace name (slug):',
        initial: defaults['typeName'],
      });
    }

    const monorepoPromptsAnswers: Lib_Scaffold_PromptScaffoldOptions_MonorepoPromptsAnswers = await prompts(monorepoQuestions, {
      onCancel: () => false,
    });

    if (monorepoNameValue === undefined && monorepoPromptsAnswers['name'] === undefined) {
      cancelled = true;
    }

    if (monorepoWorkspaceNameValue === undefined && monorepoPromptsAnswers['workspaceName'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const monorepoResolvedName: Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName = (monorepoNameValue ?? monorepoPromptsAnswers['name']) as Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedName;
    const monorepoResolvedWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName = (monorepoWorkspaceNameValue ?? monorepoPromptsAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedWorkspaceName;

    // Early return if --output is provided.
    if (monorepoOutputValue !== undefined) {
      const resolvedOutputDirectory: Lib_Scaffold_PromptScaffoldOptions_ResolvedOutputDirectory = resolve(currentDirectory, monorepoOutputValue);

      return {
        mode: 'monorepo',
        name: monorepoResolvedName,
        workspaceName: monorepoResolvedWorkspaceName,
        outputDirectory: resolvedOutputDirectory,
      };
    }

    // Prompt for directory choice.
    const directoryChoices: Lib_Scaffold_PromptScaffoldOptions_DirectoryChoices = [
      {
        title: 'Create a new directory',
        value: 'new-directory',
      },
      {
        title: 'Build in current working directory',
        value: 'current-directory',
      },
    ];

    const directoryAnswers: Lib_Scaffold_PromptScaffoldOptions_DirectoryAnswers = await prompts({
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

    const directoryChoice: Lib_Scaffold_PromptScaffoldOptions_DirectoryChoice = directoryAnswers['directoryChoice'] as Lib_Scaffold_PromptScaffoldOptions_DirectoryChoice;

    if (directoryChoice === 'current-directory') {
      return {
        mode: 'monorepo',
        name: monorepoResolvedName,
        workspaceName: monorepoResolvedWorkspaceName,
        outputDirectory: process.cwd(),
      };
    }

    // Prompt for output directory path.
    const outputAnswers: Lib_Scaffold_PromptScaffoldOptions_OutputAnswers = await prompts({
      type: 'text',
      name: 'output',
      message: 'Output directory:',
      initial: `./${monorepoResolvedName}`,
    }, {
      onCancel: () => false,
    });

    if (outputAnswers['output'] === undefined) {
      cancelled = true;
    }

    if (cancelled === true) {
      return undefined;
    }

    const monorepoResolvedOutput: Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedOutput = outputAnswers['output'] as Lib_Scaffold_PromptScaffoldOptions_MonorepoResolvedOutput;

    return {
      mode: 'monorepo',
      name: monorepoResolvedName,
      workspaceName: monorepoResolvedWorkspaceName,
      outputDirectory: resolve(currentDirectory, monorepoResolvedOutput),
    };
  }

  // Workspace mode - prompt for package name, workspace name, and output directory.
  const nameValue: Lib_Scaffold_PromptScaffoldOptions_NameValue = defaults['name'] ?? undefined;
  const outputValue: Lib_Scaffold_PromptScaffoldOptions_OutputValue = defaults['output'] ?? undefined;
  const workspaceNameValue: Lib_Scaffold_PromptScaffoldOptions_WorkspaceNameValue = defaults['workspaceName'] ?? undefined;

  const questions: Lib_Scaffold_PromptScaffoldOptions_Questions = [];

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

  const resolveInitialOutput: Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput = (_initialPrev: Lib_Scaffold_PromptScaffoldOptions_InitialPrev, initialAnswers: Lib_Scaffold_PromptScaffoldOptions_InitialAnswers) => {
    const resolvedInitialWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName = (workspaceNameValue ?? initialAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_ResolveInitialOutput_ResolvedInitialWorkspaceName;

    return `./apps/${resolvedInitialWorkspaceName}`;
  };

  if (outputValue === undefined) {
    questions.push({
      type: 'text' as const,
      name: 'output',
      message: 'Output directory:',
      initial: resolveInitialOutput,
    });
  }

  const promptsAnswers: Lib_Scaffold_PromptScaffoldOptions_PromptsAnswers = await prompts(questions, {
    onCancel: () => false,
  });

  if (nameValue === undefined && promptsAnswers['name'] === undefined) {
    cancelled = true;
  }

  if (workspaceNameValue === undefined && promptsAnswers['workspaceName'] === undefined) {
    cancelled = true;
  }

  if (outputValue === undefined && promptsAnswers['output'] === undefined) {
    cancelled = true;
  }

  if (cancelled === true) {
    return undefined;
  }

  const resolvedName: Lib_Scaffold_PromptScaffoldOptions_ResolvedName = (nameValue ?? promptsAnswers['name']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedName;
  const resolvedWorkspaceName: Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName = (workspaceNameValue ?? promptsAnswers['workspaceName']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedWorkspaceName;
  const resolvedOutput: Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput = (outputValue ?? promptsAnswers['output']) as Lib_Scaffold_PromptScaffoldOptions_ResolvedOutput;

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
 * @param {Lib_Scaffold_CreateWorkspaceDirectory_BasePath}      basePath      - Base path.
 * @param {Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName} workspaceName - Workspace name.
 *
 * @returns {Lib_Scaffold_CreateWorkspaceDirectory_Returns}
 *
 * @since 0.15.0
 */
export async function createWorkspaceDirectory(basePath: Lib_Scaffold_CreateWorkspaceDirectory_BasePath, workspaceName: Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceName): Lib_Scaffold_CreateWorkspaceDirectory_Returns {
  const workspaceDirectory: Lib_Scaffold_CreateWorkspaceDirectory_WorkspaceDirectory = join(basePath, workspaceName);

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
 * @param {Lib_Scaffold_WriteTemplateFiles_TemplateDirectory} templateDirectory - Template directory.
 * @param {Lib_Scaffold_WriteTemplateFiles_TargetDirectory}   targetDirectory   - Target directory.
 * @param {Lib_Scaffold_WriteTemplateFiles_Replacements}      replacements      - Replacements.
 *
 * @returns {Lib_Scaffold_WriteTemplateFiles_Returns}
 *
 * @since 0.15.0
 */
export async function writeTemplateFiles(templateDirectory: Lib_Scaffold_WriteTemplateFiles_TemplateDirectory, targetDirectory: Lib_Scaffold_WriteTemplateFiles_TargetDirectory, replacements: Lib_Scaffold_WriteTemplateFiles_Replacements): Lib_Scaffold_WriteTemplateFiles_Returns {
  const currentDirectory: Lib_Scaffold_WriteTemplateFiles_CurrentDirectory = process.cwd();
  const entries: Lib_Scaffold_WriteTemplateFiles_Entries = await collectFiles(templateDirectory, '');

  for (const entry of entries) {
    const sourcePath: Lib_Scaffold_WriteTemplateFiles_SourcePath = join(templateDirectory, entry);
    const targetPath: Lib_Scaffold_WriteTemplateFiles_TargetPath = join(targetDirectory, entry);

    let content: Lib_Scaffold_WriteTemplateFiles_Content = await fs.readFile(sourcePath, 'utf-8');

    // Apply placeholder replacements.
    for (const replacement of replacements) {
      const pattern: Lib_Scaffold_WriteTemplateFiles_Pattern = replacement[0];
      const value: Lib_Scaffold_WriteTemplateFiles_Value = replacement[1];

      content = content.replace(new RegExp(pattern.source, 'g'), value);
    }

    await saveGeneratedFile(targetPath, content, true);

    const relativePath: Lib_Scaffold_WriteTemplateFiles_RelativePath = relative(currentDirectory, targetPath);

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
 * @param {Lib_Scaffold_CollectFiles_Directory} directory - Directory.
 * @param {Lib_Scaffold_CollectFiles_Prefix}    prefix    - Prefix.
 *
 * @private
 *
 * @returns {Lib_Scaffold_CollectFiles_Returns}
 *
 * @since 0.15.0
 */
async function collectFiles(directory: Lib_Scaffold_CollectFiles_Directory, prefix: Lib_Scaffold_CollectFiles_Prefix): Lib_Scaffold_CollectFiles_Returns {
  const entries: Lib_Scaffold_CollectFiles_Entries = await fs.readdir(directory, { withFileTypes: true });
  const files: Lib_Scaffold_CollectFiles_Files = [];

  for (const entry of entries) {
    // Skip the ignore marker used by workspace discovery.
    if (entry.isFile() === true && entry.name === '.novaignore') {
      continue;
    }

    const entryPath: Lib_Scaffold_CollectFiles_EntryPath = (prefix === '') ? entry.name : `${prefix}/${entry.name}`;

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
 * @param {Lib_Scaffold_CreateMonorepoRoot_OutputDirectory} outputDirectory - Output directory.
 * @param {Lib_Scaffold_CreateMonorepoRoot_ProjectSlug}     projectSlug     - Project slug.
 *
 * @returns {Lib_Scaffold_CreateMonorepoRoot_Returns}
 *
 * @since 0.15.0
 */
export async function createMonorepoRoot(outputDirectory: Lib_Scaffold_CreateMonorepoRoot_OutputDirectory, projectSlug: Lib_Scaffold_CreateMonorepoRoot_ProjectSlug): Lib_Scaffold_CreateMonorepoRoot_Returns {
  const currentDirectory: Lib_Scaffold_CreateMonorepoRoot_CurrentDirectory = process.cwd();

  await fs.mkdir(outputDirectory, { recursive: true });

  const appsDirectory: Lib_Scaffold_CreateMonorepoRoot_AppsDirectory = join(outputDirectory, 'apps');

  await fs.mkdir(appsDirectory, { recursive: true });

  const packagesDirectory: Lib_Scaffold_CreateMonorepoRoot_PackagesDirectory = join(outputDirectory, 'packages');

  await fs.mkdir(packagesDirectory, { recursive: true });

  // Create root package.json.
  const packageJsonContent: Lib_Scaffold_CreateMonorepoRoot_PackageJsonContent = {
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

  const packageJsonPath: Lib_Scaffold_CreateMonorepoRoot_PackageJsonPath = join(outputDirectory, 'package.json');

  await fs.writeFile(packageJsonPath, `${JSON.stringify(packageJsonContent, null, 2)}\n`, 'utf-8');

  const packageJsonRelativePath: Lib_Scaffold_CreateMonorepoRoot_PackageJsonRelativePath = relative(currentDirectory, packageJsonPath);

  Logger.customize({
    name: 'createMonorepoRoot',
    purpose: 'written',
  }).info(`Created "${packageJsonRelativePath}".`);

  // Create baseline nova.config.json.
  const projectTitle: Lib_Scaffold_CreateMonorepoRoot_ProjectTitle = projectSlug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

  const novaConfigContent: Lib_Scaffold_CreateMonorepoRoot_NovaConfigContent = {
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

  const novaConfigPath: Lib_Scaffold_CreateMonorepoRoot_NovaConfigPath = join(outputDirectory, 'nova.config.json');

  await fs.writeFile(novaConfigPath, `${JSON.stringify(novaConfigContent, null, 2)}\n`, 'utf-8');

  const novaConfigRelativePath: Lib_Scaffold_CreateMonorepoRoot_NovaConfigRelativePath = relative(currentDirectory, novaConfigPath);

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
 * @param {Lib_Scaffold_PromptPostScaffoldGenerators_OutputDirectory} outputDirectory - Output directory.
 *
 * @returns {Lib_Scaffold_PromptPostScaffoldGenerators_Returns}
 *
 * @since 0.15.0
 */
export async function promptPostScaffoldGenerators(outputDirectory: Lib_Scaffold_PromptPostScaffoldGenerators_OutputDirectory): Lib_Scaffold_PromptPostScaffoldGenerators_Returns {
  let cancelled: Lib_Scaffold_PromptPostScaffoldGenerators_Cancelled = false;

  const generatorChoices: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorChoices = [
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

  const answers: Lib_Scaffold_PromptPostScaffoldGenerators_Answers = await prompts({
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

  const selected: Lib_Scaffold_PromptPostScaffoldGenerators_Selected = answers['generators'] as Lib_Scaffold_PromptPostScaffoldGenerators_Selected;

  if (selected.length === 0) {
    Logger.customize({
      name: 'promptPostScaffoldGenerators',
      purpose: 'skip',
    }).info('No generators selected. Skipping.');

    return;
  }

  // Change to the scaffolded directory and run selected generators.
  const originalCwd: Lib_Scaffold_PromptPostScaffoldGenerators_OriginalCwd = process.cwd();

  process.chdir(outputDirectory);

  for (const generatorName of selected) {
    Logger.customize({
      name: 'promptPostScaffoldGenerators',
      purpose: 'running',
    }).info(`Running generator "${generatorName}" ...`);

    try {
      const generatorModule: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorModule = await loadGenerator(generatorName);

      if (generatorModule !== undefined) {
        const generatorResult: Lib_Scaffold_PromptPostScaffoldGenerators_GeneratorResult = await generatorModule({ replaceFile: true });

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
 * @param {Lib_Scaffold_LoadGenerator_Name} name - Name.
 *
 * @private
 *
 * @returns {Lib_Scaffold_LoadGenerator_Returns}
 *
 * @since 0.15.0
 */
async function loadGenerator(name: Lib_Scaffold_LoadGenerator_Name): Lib_Scaffold_LoadGenerator_Returns {
  switch (name) {
    case 'editorconfig': {
      const editorconfigModule: Lib_Scaffold_LoadGenerator_EditorconfigModule = await import('../cli/generate/must-haves/editorconfig.js');

      return (options) => editorconfigModule['Runner'].run(options);
    }

    case 'gitignore': {
      const gitignoreModule: Lib_Scaffold_LoadGenerator_GitignoreModule = await import('../cli/generate/must-haves/gitignore.js');

      return (options) => gitignoreModule['Runner'].run(options);
    }

    case 'dotenv': {
      const dotenvModule: Lib_Scaffold_LoadGenerator_DotenvModule = await import('../cli/generate/must-haves/dotenv.js');

      return (options) => dotenvModule['Runner'].run(options);
    }

    case 'license': {
      const licenseModule: Lib_Scaffold_LoadGenerator_LicenseModule = await import('../cli/generate/must-haves/license.js');

      return (options) => licenseModule['Runner'].run(options);
    }

    case 'read-me': {
      const readMeModule: Lib_Scaffold_LoadGenerator_ReadMeModule = await import('../cli/generate/must-haves/read-me.js');

      return (options) => readMeModule['Runner'].run(options);
    }

    case 'agent-conventions': {
      const agentConventionsModule: Lib_Scaffold_LoadGenerator_AgentConventionsModule = await import('../cli/generate/must-haves/agent-conventions.js');

      return (options) => agentConventionsModule['Runner'].run(options);
    }

    case 'funding': {
      const fundingModule: Lib_Scaffold_LoadGenerator_FundingModule = await import('../cli/generate/github/funding.js');

      return (options) => fundingModule['Runner'].run(options);
    }

    case 'issue-template': {
      const issueTemplateModule: Lib_Scaffold_LoadGenerator_IssueTemplateModule = await import('../cli/generate/github/issue-template.js');

      return (options) => issueTemplateModule['Runner'].run(options);
    }

    case 'workflows': {
      const workflowsModule: Lib_Scaffold_LoadGenerator_WorkflowsModule = await import('../cli/generate/github/workflows.js');

      return (options) => workflowsModule['Runner'].run(options);
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
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath}   configFilePath   - Config file path.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath} workspaceRelPath - Workspace rel path.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName}    workspaceName    - Workspace name.
 * @param {Lib_Scaffold_RegisterWorkspaceInConfig_Category}         category         - Category.
 *
 * @returns {Lib_Scaffold_RegisterWorkspaceInConfig_Returns}
 *
 * @since 0.15.0
 */
export async function registerWorkspaceInConfig(configFilePath: Lib_Scaffold_RegisterWorkspaceInConfig_ConfigFilePath, workspaceRelPath: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceRelPath, workspaceName: Lib_Scaffold_RegisterWorkspaceInConfig_WorkspaceName, category: Lib_Scaffold_RegisterWorkspaceInConfig_Category): Lib_Scaffold_RegisterWorkspaceInConfig_Returns {
  let parsedConfig: Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig = undefined;

  try {
    const raw: Lib_Scaffold_RegisterWorkspaceInConfig_Raw = await fs.readFile(configFilePath, 'utf-8');

    parsedConfig = JSON.parse(raw) as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedConfig;
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
  const project: Lib_Scaffold_RegisterWorkspaceInConfig_Project = parsedConfig['project'] as Lib_Scaffold_RegisterWorkspaceInConfig_Project;
  const projectName: Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName = (project !== undefined) ? project['name'] as Lib_Scaffold_RegisterWorkspaceInConfig_ProjectName : undefined;
  const projectSlug: Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug = (projectName !== undefined) ? projectName['slug'] as Lib_Scaffold_RegisterWorkspaceInConfig_ProjectSlug : undefined;

  if (projectSlug === undefined) {
    Logger.customize({
      name: 'registerWorkspaceInConfig',
      purpose: 'skip',
    }).warn('No project slug found in nova.config.json. Skipping workspace registration.');

    return;
  }

  // Determine role and config name based on category.
  const role: Lib_Scaffold_RegisterWorkspaceInConfig_Role = (category === 'docs') ? 'docs' : 'app';
  const configName: Lib_Scaffold_RegisterWorkspaceInConfig_ConfigName = (role === 'docs') ? `${projectSlug}-docs` : `${projectSlug}-app-${workspaceName}`;

  // Add workspace entry.
  const workspaces: Lib_Scaffold_RegisterWorkspaceInConfig_Workspaces = (parsedConfig['workspaces'] as Lib_Scaffold_RegisterWorkspaceInConfig_ParsedWorkspaces) ?? {};

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
 * @param {Lib_Scaffold_RunScaffold_Options}         options         - Options.
 * @param {Lib_Scaffold_RunScaffold_Category}        category        - Category.
 * @param {Lib_Scaffold_RunScaffold_TypeName}        typeName        - Type name.
 * @param {Lib_Scaffold_RunScaffold_TemplateSubpath} templateSubpath - Template subpath.
 * @param {Lib_Scaffold_RunScaffold_ImportMetaUrl}   importMetaUrl   - Import meta url.
 *
 * @returns {Lib_Scaffold_RunScaffold_Returns}
 *
 * @since 0.15.0
 */
export async function runScaffold(options: Lib_Scaffold_RunScaffold_Options, category: Lib_Scaffold_RunScaffold_Category, typeName: Lib_Scaffold_RunScaffold_TypeName, templateSubpath: Lib_Scaffold_RunScaffold_TemplateSubpath, importMetaUrl: Lib_Scaffold_RunScaffold_ImportMetaUrl): Lib_Scaffold_RunScaffold_Returns {
  const currentDirectory: Lib_Scaffold_RunScaffold_CurrentDirectory = process.cwd();
  const isDryRun: Lib_Scaffold_RunScaffold_IsDryRun = options['dryRun'] === true;

  if (isDryRun === true) {
    Logger.customize({
      name: 'CliScaffold.run',
      purpose: 'options',
    }).warn('Dry run enabled. File changes will not be made in this session.');
  }

  // Detect Monorepo Context.
  const context: Lib_Scaffold_RunScaffold_Context = await detectMonorepoContext(currentDirectory);

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
  const config: Lib_Scaffold_RunScaffold_Config = await promptScaffoldOptions(context, {
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
    const modePrefix: Lib_Scaffold_RunScaffold_ModePrefix = (config['mode'] === 'monorepo') ? 'monorepo root + ' : '';

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
  const workspaceDirectory: Lib_Scaffold_RunScaffold_WorkspaceDirectory = (config['mode'] === 'monorepo') ? join(config['outputDirectory'], 'apps', config['workspaceName']) : config['outputDirectory'];

  await fs.mkdir(workspaceDirectory, { recursive: true });

  // Resolve template path and write files.
  const templateDirectory: Lib_Scaffold_RunScaffold_TemplateDirectory = resolveTemplatePath(importMetaUrl, templateSubpath);

  await writeTemplateFiles(templateDirectory, workspaceDirectory, new Map([[
    LIB_REGEX_PLACEHOLDER_PROJECT_SLUG,
    config['name'],
  ]]));

  // Register workspace in nova.config.json.
  const configRoot: Lib_Scaffold_RunScaffold_ConfigRoot = (config['mode'] === 'monorepo') ? config['outputDirectory'] : currentDirectory;
  const configFilePath: Lib_Scaffold_RunScaffold_ConfigFilePath = join(configRoot, 'nova.config.json');

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
