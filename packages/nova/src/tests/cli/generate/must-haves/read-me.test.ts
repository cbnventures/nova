import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  basename,
  join,
} from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_PercentEncodesDataURIProfileBadgeLogos_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_PercentEncodesDataURIProfileBadgeLogos_DataUri,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_ReturnsNoBadgesWhenTheExplicitListIsMissingOrEmpty_EmptyContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_ReturnsNoBadgesWhenTheExplicitListIsMissingOrEmpty_MissingContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_UsesOnlyExplicitBadgesInConfiguredOrder_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_FallsBackToTheDefaultProfileSupportSection_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_OmitsTheProfileSupportSectionWhenSupportIsAbsent_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_RendersCustomProfileSupportBadgesWithACustomTitleEmojiAndMessage_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_EscapesPipesInProfileLinkTableCells_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupListWhenADescriptionIsMissing_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupTableWithCustomColumns_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupTableWithDefaultColumns_Content,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_HasAnchorWrapping,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_HasPictureBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_HasHeaderBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_HasPictureBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_CliExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_LibExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_PresetExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_RootExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_WebExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_CliContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_DocsExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_LibContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_PresetContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_RootContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_TemplateExists,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_WebContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_Calls,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_ExpectedContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_FirstCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_FixtureUrl,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_GeneratedContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_Calls,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_ExpectedContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_FirstCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_GeneratedContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_Calls,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_RootCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_WorkspaceCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_HasBrokenLink,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_HasDocumentationSection,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_HasHeaderBlock,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_HasIntroductionSection,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OriginalCwd,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_LoadSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_CliContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_LibContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_LibHasStaleContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_PresetContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_StaleContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_WebContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_WebHasStaleContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SandboxRoot,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryPrefix,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ReadmeContent,
  Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ReadmePath,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfig,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfigPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJson,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJsonPath,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_ProjectDirectory,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns,
  Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot,
} from '../../../../types/tests/cli/generate/must-haves/read-me.test.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Create Role Matrix Sandbox.
 *
 * Creates the 7-workspace directory tree, writes package.json and nova.config.json
 * with the full role-matrix fixture so each fan-out test can start in 3 lines.
 *
 * @param {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot} sandboxRoot - Sandbox root.
 * @param {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name}        name        - Name.
 *
 * @returns {Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns}
 *
 * @since 0.18.0
 */
async function createRoleMatrixSandbox(sandboxRoot: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_SandboxRoot, name: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Name): Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_Returns {
  const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_ProjectDirectory = join(sandboxRoot, name);

  await mkdir(projectDirectory, { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'web'), { recursive: true });
  await mkdir(join(projectDirectory, 'apps', 'docs-site'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'lib-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'cli-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'preset-a'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages', 'template-a'), { recursive: true });

  const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
  const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_PackageJsonPath = join(projectDirectory, 'package.json');

  await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

  const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfig = JSON.stringify({
    project: {
      name: {
        slug: 'test',
        title: 'Test Project',
      },
    },
    workspaces: {
      './': {
        name: 'test-project',
        role: 'project',
        policy: 'freezable',
      },
      './apps/web': {
        name: 'test-app-web',
        role: 'app',
        policy: 'trackable',
      },
      './apps/docs-site': {
        name: 'test-docs',
        role: 'docs',
        policy: 'freezable',
      },
      './packages/lib-a': {
        name: 'lib-a',
        role: 'package',
        policy: 'distributable',
      },
      './packages/cli-a': {
        name: 'test-tool-cli-a',
        role: 'tool',
        policy: 'trackable',
      },
      './packages/preset-a': {
        name: 'test-config-preset-a',
        role: 'config',
        policy: 'trackable',
      },
      './packages/template-a': {
        name: 'template-a',
        role: 'template',
        policy: 'freezable',
      },
    },
  }, null, 2);

  const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CreateRoleMatrixSandbox_NovaConfigPath = join(projectDirectory, 'nova.config.json');

  await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

  return projectDirectory;
}

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Run.
 *
 * @since 0.15.0
 */
describe('CliGenerateMustHavesReadMe.run', async () => {
  const originalCwd: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('sets exit code when not at project root', async () => {
    process.exitCode = 0;

    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(false);

    await CliGenerateMustHavesReadMe.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    process.exitCode = 0;

    return;
  });

  it('does not call saveGeneratedFile during dry-run', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DoesNotCallSaveGeneratedFileDuringDryRun_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    strictEqual(saveSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('passes the correct header metadata to saveGeneratedFile', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({ project: { name: { title: 'Test Project' } } });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_Calls = saveSpy['mock']['calls'];

    const targetCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_TargetCall = calls.find((call) => typeof call[0] === 'string' && basename(call[0]) === 'README.md');

    ok(targetCall !== undefined, 'Expected saveGeneratedFile to be called for README.md');

    const headerArg: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_PassesTheCorrectHeaderMetadataToSaveGeneratedFile_HeaderArg = targetCall[3];

    ok(headerArg !== undefined, 'Expected header argument to be defined');

    strictEqual(headerArg['command'], 'nova generate must-haves read-me');
    strictEqual(headerArg['docsSlug'], 'cli/generators/must-haves/read-me');
    strictEqual(headerArg['mode'], 'strict');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('generates profile README from fixture', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        name: {
          title: 'Jacky Liang',
        },
      },
      urls: {
        fundSources: [
          'https://github.com/sponsors/mrjackyliang',
          'https://liang.nyc/paypal',
        ],
      },
      readme: {
        profile: {
          heading: 'Hello, I\'m Jacky 👋🏼',
          introduction: [
            'Welcome to my GitHub profile! I am an information technology professional with a passion for making everyday life easier through software.',
            'I build open-source tools, websites, and automation for the communities I care about.',
          ],
          badgeGroups: [
            {
              title: 'Language Palette',
              emoji: '👨🏻‍💻',
              badges: [
                {
                  label: 'TypeScript',
                  logo: 'typescript',
                  color: '3178c6',
                  link: 'https://www.typescriptlang.org',
                },
                {
                  label: 'Java',
                  logo: 'openjdk',
                  color: 'ed8b00',
                  link: 'https://www.java.com',
                },
              ],
            },
            {
              title: 'My Tools of the Trade',
              emoji: '🛠️',
              badges: [
                {
                  label: 'Claude-Code',
                  logo: 'claude',
                  color: 'd97757',
                  link: 'https://claude.ai',
                },
                {
                  label: 'Codex',
                  logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
                  color: '000000',
                  link: 'https://openai.com/codex',
                },
                {
                  label: 'WP_Engine',
                  logo: 'wpengine',
                  color: '0b5cab',
                  link: 'https://wpengine.com',
                },
                {
                  label: 'Visual Studio Code',
                  logo: 'visualstudiocode',
                  color: '007acc',
                  link: 'https://code.visualstudio.com',
                },
              ],
            },
            {
              title: 'Things I Like',
              emoji: '🤓',
              badges: [
                {
                  label: 'Android',
                  logo: 'android',
                  color: '3ddc84',
                  link: 'https://www.android.com',
                },
                {
                  label: 'Astro',
                  logo: 'astro',
                  color: 'bc52ee',
                  link: 'https://astro.build',
                },
              ],
            },
          ],
          linkGroups: [
            {
              title: 'Open-Source Projects',
              emoji: '📦',
              columns: [
                'Project',
                'Description',
              ],
              links: [
                {
                  label: 'Nova',
                  url: 'https://github.com/cbnventures/nova',
                  description: 'Scripts, templates, and project configuration',
                },
                {
                  label: 'Sinkhole',
                  url: 'https://github.com/cbnventures/sinkhole',
                  description: 'DNS blocking for pfSense',
                },
              ],
            },
            {
              title: 'Links',
              links: [
                {
                  label: 'Biography',
                  url: 'https://mrjackyliang.com/about',
                },
                {
                  label: 'Website',
                  url: 'https://mrjackyliang.github.io/mrjackyliang/',
                },
              ],
            },
          ],
          support: {
            message: [
              'If my projects save you time, please consider supporting them.',
              'Every contribution helps keep them maintained.',
            ],
          },
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);
    const fixtureUrl: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_FixtureUrl = new URL('./fixtures/profile-read-me.md', import.meta.url);
    const expectedContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_ExpectedContent = await readFile(fixtureUrl, 'utf-8');

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_Calls = saveSpy['mock']['calls'];
    const firstCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_FirstCall = calls[0];

    ok(firstCall !== undefined, 'Expected README content to be saved');

    const generatedContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_GeneratesProfileREADMEFromFixture_GeneratedContent = firstCall[1];

    strictEqual(generatedContent, expectedContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('keeps the project README in consumer workspaces in profile mode', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        name: {
          title: 'Example',
        },
        description: {
          long: 'Example project description.',
        },
      },
      readme: {
        badges: ['homebridge'],
        profile: {
          heading: 'Hello, I\'m Example 👋',
          introduction: ['Welcome to my profile.'],
        },
      },
      workspaces: {
        './': {
          name: 'example-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/website': {
          name: 'example-app-website',
          role: 'app',
          policy: 'freezable',
        },
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_Calls = saveSpy['mock']['calls'];
    const rootCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_RootCall = calls[0];
    const workspaceCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsTheProjectREADMEInConsumerWorkspacesInProfileMode_WorkspaceCall = calls[1];

    strictEqual(calls.length, 2);

    ok(rootCall !== undefined, 'Expected the root README to be saved');
    ok(workspaceCall !== undefined, 'Expected the workspace README to be saved');

    ok(rootCall[0].endsWith(join('apps', 'website', 'README.md')) === false);
    ok(rootCall[1].startsWith([
      '<!-- nova-region: header -->',
      '# Hello, I\'m Example 👋',
      '',
    ].join('\n')));
    ok(rootCall[1].includes('Welcome to my profile.'));
    ok(rootCall[1].includes('<div align="center">') === false);
    ok(rootCall[1].includes('Example project description.') === false);

    ok(workspaceCall[0].endsWith(join('apps', 'website', 'README.md')));
    ok(workspaceCall[1].startsWith([
      '<div align="center">',
      '<!-- nova-region: header -->',
      '  <h1>Example</h1>',
      '',
    ].join('\n')));
    ok(workspaceCall[1].includes('img.shields.io/badge/homebridge'));
    ok(workspaceCall[1].includes([
      '## Introduction',
      '',
      'Example project description.',
    ].join('\n')));
    ok(workspaceCall[1].includes('Welcome to my profile.') === false);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('keeps project README output unchanged without profile config', async () => {
    const isProjectRootSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);
    const loadSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        name: {
          title: 'Test Project',
        },
        description: {
          long: 'A project description.',
        },
      },
      urls: {
        documentation: 'https://example.com/docs',
      },
    });
    const saveSpy: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_SaveSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    const calls: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_Calls = saveSpy['mock']['calls'];
    const firstCall: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_FirstCall = calls[0];

    ok(firstCall !== undefined, 'Expected README content to be saved');

    const generatedContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_GeneratedContent = firstCall[1];
    const expectedContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_KeepsProjectREADMEOutputUnchangedWithoutProfileConfig_ExpectedContent = [
      '<div align="center">',
      '<!-- nova-region: header -->',
      '  <h1>Test Project</h1>',
      '<!-- nova-region-end: header -->',
      '</div>',
      '',
      '<!-- nova-region: introduction -->',
      '## Introduction',
      '',
      'A project description.',
      '<!-- nova-region-end: introduction -->',
      '',
      '<!-- nova-region: documentation -->',
      '## Documentation',
      '',
      'To get started, visit [https://example.com/docs](https://example.com/docs) to view the full documentation.',
      '<!-- nova-region-end: documentation -->',
      '',
    ].join('\n');

    strictEqual(generatedContent, expectedContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveSpy.mockRestore();

    return;
  });

  it('wraps each section in nova region anchors', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ProjectDirectory = join(sandboxRoot, 'region-anchors');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
        description: {
          long: 'A long description of the project.',
        },
      },
      github: {
        owner: 'acme',
        repo: 'widget',
      },
      urls: {
        homepage: 'https://example.com',
        logo: 'https://example.com/logo.svg',
        documentation: 'https://docs.example.com',
        fundSources: ['https://github.com/sponsors/acme'],
      },
      readme: {
        badges: [
          'github-release',
          'funding',
        ],
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_WrapsEachSectionInNovaRegionAnchors_ReadmeContent = await readFile(readmePath, 'utf-8');

    ok(readmeContent.includes('<!-- nova-region: header -->'), 'Expected the header region start anchor');
    ok(readmeContent.includes('<!-- nova-region-end: header -->'), 'Expected the header region end anchor');
    ok(readmeContent.includes('<!-- nova-region: badges -->'), 'Expected the badges region anchor');
    ok(readmeContent.includes('<!-- nova-region: introduction -->'), 'Expected the introduction region anchor');
    ok(readmeContent.includes('<!-- nova-region: documentation -->'), 'Expected the documentation region anchor');
    ok(readmeContent.includes('<!-- nova-region: credits -->'), 'Expected the credits region anchor');

    return;
  });

  it('omits the Documentation section when urls.documentation is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ProjectDirectory = join(sandboxRoot, 'no-documentation-url');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasDocumentationSection: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_HasDocumentationSection = readmeContent.includes('## Documentation');
    const hasBrokenLink: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheDocumentationSectionWhenUrlsDocumentationIsMissing_HasBrokenLink = readmeContent.includes('[](');

    strictEqual(hasDocumentationSection, false, 'Expected README.md to omit the Documentation section when urls.documentation is missing');
    strictEqual(hasBrokenLink, false, 'Expected README.md to have no broken markdown link [](...)');

    return;
  });

  it('omits the Introduction section when project.description.long is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ProjectDirectory = join(sandboxRoot, 'no-description');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasIntroductionSection: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheIntroductionSectionWhenProjectDescriptionLongIsMissing_HasIntroductionSection = readmeContent.includes('## Introduction');

    strictEqual(hasIntroductionSection, false, 'Expected README.md to omit the Introduction section when description is missing');

    return;
  });

  it('drops the picture block when urls.logo is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ProjectDirectory = join(sandboxRoot, 'no-logo');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        homepage: 'https://example.com',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasPictureBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_HasPictureBlock = readmeContent.includes('<picture>');
    const hasHeaderBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsThePictureBlockWhenUrlsLogoIsMissing_HasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasPictureBlock, false, 'Expected README.md to omit the <picture> block when urls.logo is missing');
    strictEqual(hasHeaderBlock, true, 'Expected README.md to still include the header block with title');

    return;
  });

  it('drops the anchor wrapping when urls.homepage is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ProjectDirectory = join(sandboxRoot, 'no-homepage');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_NovaConfig = JSON.stringify({
      project: {
        name: {
          title: 'Test Project',
        },
      },
      urls: {
        logo: 'https://example.com/logo.png',
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasAnchorWrapping: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_HasAnchorWrapping = readmeContent.includes('<a href=');
    const hasPictureBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DropsTheAnchorWrappingWhenUrlsHomepageIsMissing_HasPictureBlock = readmeContent.includes('<picture>');

    strictEqual(hasAnchorWrapping, false, 'Expected README.md to omit the <a> wrapping when urls.homepage is missing');
    strictEqual(hasPictureBlock, true, 'Expected README.md to still include the <picture> block with the logo');

    return;
  });

  it('omits the entire header block when project.name.title is missing', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ProjectDirectory = join(sandboxRoot, 'no-name');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_PackageJson = JSON.stringify({ name: 'test' }, null, 2);
    const packageJsonPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_NovaConfig = JSON.stringify({
      project: {
        description: {
          long: 'A test project without a title.',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    const readmePath: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ReadmePath = join(projectDirectory, 'README.md');
    const readmeContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_ReadmeContent = await readFile(readmePath, 'utf-8');
    const hasHeaderBlock: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_OmitsTheEntireHeaderBlockWhenProjectNameTitleIsMissing_HasHeaderBlock = readmeContent.includes('<div align="center">');

    strictEqual(hasHeaderBlock, false, 'Expected README.md to omit the header block when project name is missing');

    return;
  });

  it('fans out to consumer-facing roles', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'role-matrix');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({});

    // Included roles (app, package, tool, config) — README present with content.
    const rootContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_RootContent = await readFile(join(projectDirectory, 'README.md'), 'utf-8');

    strictEqual(rootContent.includes('Test Project') === true, true);

    const webContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_WebContent = await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');

    strictEqual(webContent.includes('Test Project') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_LibContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');

    strictEqual(libContent.includes('Test Project') === true, true);

    const cliContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_CliContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');

    strictEqual(cliContent.includes('Test Project') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_PresetContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');

    strictEqual(presetContent.includes('Test Project') === true, true);

    // Excluded roles (docs, template) — README absent.
    let docsExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_DocsExists = true;

    try {
      await readFile(join(projectDirectory, 'apps', 'docs-site', 'README.md'), 'utf-8');
    } catch {
      docsExists = false;
    }

    strictEqual(docsExists, false);

    let templateExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_FansOutToConsumerFacingRoles_TemplateExists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'template-a', 'README.md'), 'utf-8');
    } catch {
      templateExists = false;
    }

    strictEqual(templateExists, false);

    return;
  });

  it('dry-run skips workspace fan-out writes', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'dry-run-fan-out');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({ dryRun: true });

    // Root file must be absent.
    let rootExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_RootExists = true;

    try {
      await readFile(join(projectDirectory, 'README.md'), 'utf-8');
    } catch {
      rootExists = false;
    }

    strictEqual(rootExists, false);

    // Consumer workspace files must be absent.
    let webExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_WebExists = true;

    try {
      await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');
    } catch {
      webExists = false;
    }

    strictEqual(webExists, false);

    let libExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_LibExists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');
    } catch {
      libExists = false;
    }

    strictEqual(libExists, false);

    let cliExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_CliExists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');
    } catch {
      cliExists = false;
    }

    strictEqual(cliExists, false);

    let presetExists: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_DryRunSkipsWorkspaceFanOutWrites_PresetExists = true;

    try {
      await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');
    } catch {
      presetExists = false;
    }

    strictEqual(presetExists, false);

    return;
  });

  it('replaceFile mode overwrites existing fan-out files', async () => {
    const projectDirectory: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_ProjectDirectory = await createRoleMatrixSandbox(sandboxRoot, 'replace-fan-out');

    const staleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_StaleContent = 'STALE-CONTENT';

    await writeFile(join(projectDirectory, 'apps', 'web', 'README.md'), staleContent, 'utf-8');
    await writeFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), staleContent, 'utf-8');

    process.chdir(projectDirectory);

    await CliGenerateMustHavesReadMe.run({ replaceFile: true });

    // Pre-existing files must have been replaced.
    const webContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_WebContent = await readFile(join(projectDirectory, 'apps', 'web', 'README.md'), 'utf-8');
    const webHasStaleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_WebHasStaleContent = webContent.includes('STALE-CONTENT');

    strictEqual(webHasStaleContent, false);
    strictEqual(webContent.includes('Test Project') === true, true);

    const libContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_LibContent = await readFile(join(projectDirectory, 'packages', 'lib-a', 'README.md'), 'utf-8');
    const libHasStaleContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_LibHasStaleContent = libContent.includes('STALE-CONTENT');

    strictEqual(libHasStaleContent, false);
    strictEqual(libContent.includes('Test Project') === true, true);

    // Other consumer workspaces must also have files written.
    const cliContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_CliContent = await readFile(join(projectDirectory, 'packages', 'cli-a', 'README.md'), 'utf-8');

    strictEqual(cliContent.includes('Test Project') === true, true);

    const presetContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeRun_ReplaceFileModeOverwritesExistingFanOutFiles_PresetContent = await readFile(join(projectDirectory, 'packages', 'preset-a', 'README.md'), 'utf-8');

    strictEqual(presetContent.includes('Test Project') === true, true);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Build Badges Region Content.
 *
 * @since 0.29.0
 */
describe('CliGenerateMustHavesReadMe.buildBadgesRegionContent', () => {
  it('uses only explicit badges in configured order', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_UsesOnlyExplicitBadgesInConfiguredOrder_Content = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'acme',
        repo: 'widget',
      },
      urls: {
        npm: 'https://www.npmjs.com/package/@acme/widget',
      },
      readme: {
        badges: [
          'github-license',
          'npm-version',
          'github-release',
        ],
      },
    });

    ok(content.indexOf('GitHub License') < content.indexOf('npm Package'));
    ok(content.indexOf('npm Package') < content.indexOf('GitHub Releases'));
    ok(content.includes('npm Downloads') === false);
    ok(content.includes('GitHub Top Languages') === false);

    return;
  });

  it('returns no badges when the explicit list is missing or empty', () => {
    const missingContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_ReturnsNoBadgesWhenTheExplicitListIsMissingOrEmpty_MissingContent = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'acme',
        repo: 'widget',
      },
    });

    const emptyContent: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_ReturnsNoBadgesWhenTheExplicitListIsMissingOrEmpty_EmptyContent = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'acme',
        repo: 'widget',
      },
      readme: { badges: [] },
    });

    strictEqual(missingContent, '');
    strictEqual(emptyContent, '');

    return;
  });

  it('percent-encodes data URI profile badge logos', () => {
    const dataUri: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_PercentEncodesDataURIProfileBadgeLogos_DataUri = 'data:image/svg+xml;base64,PHN2Zy8+';
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildBadgesRegionContent_PercentEncodesDataURIProfileBadgeLogos_Content = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      readme: {
        profile: {
          badgeGroups: [{
            title: 'Tools',
            badges: [
              {
                label: 'Codex',
                logo: dataUri,
                color: '000000',
                link: 'https://example.com/codex',
              },
              {
                label: 'Astro',
                logo: 'astro',
                color: 'bc52ee',
                link: 'https://example.com/astro',
              },
            ],
          }],
        },
      },
    });

    strictEqual(content, [
      '## Tools',
      '',
      '[![Codex](https://img.shields.io/badge/Codex-8a2be2?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2Zy8%2B&logoColor=%23ffffff&color=%23000000)](https://example.com/codex)',
      '[![Astro](https://img.shields.io/badge/Astro-8a2be2?style=for-the-badge&logo=astro&logoColor=%23ffffff&color=%23bc52ee)](https://example.com/astro)',
    ].join('\n'));

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Build Documentation Region Content.
 *
 * @since 0.50.0
 */
describe('CliGenerateMustHavesReadMe.buildDocumentationRegionContent', () => {
  it('renders a profile link group table with custom columns', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupTableWithCustomColumns_Content = CliGenerateMustHavesReadMe.buildDocumentationRegionContent({
      readme: {
        profile: {
          linkGroups: [{
            title: 'Projects',
            emoji: '📦',
            columns: [
              'Project',
              'Summary',
            ],
            links: [
              {
                label: 'Widget',
                url: 'https://example.com/widget',
                description: 'A small widget',
              },
              {
                label: 'Gadget',
                url: 'https://example.com/gadget',
                description: 'A longer gadget description',
              },
            ],
          }],
        },
      },
    });

    strictEqual(content, [
      '## Projects 📦',
      '',
      '| Project                              | Summary                     |',
      '|--------------------------------------|-----------------------------|',
      '| [Widget](https://example.com/widget) | A small widget              |',
      '| [Gadget](https://example.com/gadget) | A longer gadget description |',
    ].join('\n'));

    return;
  });

  it('renders a profile link group table with default columns', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupTableWithDefaultColumns_Content = CliGenerateMustHavesReadMe.buildDocumentationRegionContent({
      readme: {
        profile: {
          linkGroups: [{
            title: 'Projects',
            links: [{
              label: 'Widget',
              url: 'https://example.com/widget',
              description: 'A small widget',
            }],
          }],
        },
      },
    });

    strictEqual(content, [
      '## Projects',
      '',
      '| Link                                 | Description    |',
      '|--------------------------------------|----------------|',
      '| [Widget](https://example.com/widget) | A small widget |',
    ].join('\n'));

    return;
  });

  it('renders a profile link group list when a description is missing', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_RendersAProfileLinkGroupListWhenADescriptionIsMissing_Content = CliGenerateMustHavesReadMe.buildDocumentationRegionContent({
      readme: {
        profile: {
          linkGroups: [
            {
              title: 'Projects',
              columns: [
                'Project',
                'Summary',
              ],
              links: [
                {
                  label: 'Widget',
                  url: 'https://example.com/widget',
                  description: 'A small widget',
                },
                {
                  label: 'Gadget',
                  url: 'https://example.com/gadget',
                },
              ],
            },
            {
              title: 'Links',
              links: [{
                label: 'Website',
                url: 'https://example.com',
              }],
            },
          ],
        },
      },
    });

    strictEqual(content, [
      '## Projects',
      '',
      '- [Widget](https://example.com/widget)',
      '- [Gadget](https://example.com/gadget)',
      '',
      '## Links',
      '',
      '- [Website](https://example.com)',
    ].join('\n'));

    return;
  });

  it('escapes pipes in profile link table cells', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildDocumentationRegionContent_EscapesPipesInProfileLinkTableCells_Content = CliGenerateMustHavesReadMe.buildDocumentationRegionContent({
      readme: {
        profile: {
          linkGroups: [{
            title: 'Projects',
            links: [{
              label: 'A|B',
              url: 'https://example.com/ab',
              description: 'Fast | small',
            }],
          }],
        },
      },
    });

    strictEqual(content, [
      '## Projects',
      '',
      '| Link                           | Description   |',
      '|--------------------------------|---------------|',
      '| [A\\|B](https://example.com/ab) | Fast \\| small |',
    ].join('\n'));

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - Must Haves - Read Me - Build Credits Region Content.
 *
 * @since 0.50.0
 */
describe('CliGenerateMustHavesReadMe.buildCreditsRegionContent', () => {
  it('renders custom profile support badges with a custom title, emoji, and message', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_RendersCustomProfileSupportBadgesWithACustomTitleEmojiAndMessage_Content = CliGenerateMustHavesReadMe.buildCreditsRegionContent({
      urls: {
        fundSources: ['https://github.com/sponsors/acme'],
      },
      readme: {
        profile: {
          support: {
            title: 'Buy Me a Snack',
            emoji: '🍩',
            message: [
              'First paragraph.',
              'Second paragraph.',
            ],
            badges: [{
              label: 'Ko-fi',
              logo: 'kofi',
              color: 'ff5e5b',
              link: 'https://example.com/kofi',
            }],
          },
        },
      },
    });

    strictEqual(content, [
      '## Buy Me a Snack 🍩',
      '',
      'First paragraph.',
      '',
      'Second paragraph.',
      '',
      '[![Ko-fi](https://img.shields.io/badge/Ko--fi-8a2be2?style=for-the-badge&logo=kofi&logoColor=%23ffffff&color=%23ff5e5b)](https://example.com/kofi)',
    ].join('\n'));

    return;
  });

  it('falls back to the default profile support section', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_FallsBackToTheDefaultProfileSupportSection_Content = CliGenerateMustHavesReadMe.buildCreditsRegionContent({
      urls: {
        fundSources: ['https://github.com/sponsors/acme'],
      },
      readme: {
        profile: {
          support: {},
        },
      },
    });

    strictEqual(content, [
      '## Support My Work 🎗️',
      '',
      'If you appreciate my work and find value in my open-source projects, you can support it through one of these options.',
      '',
      '[![Sponsor](https://img.shields.io/badge/Sponsor-8a2be2?style=for-the-badge&logo=githubsponsors&logoColor=%23ffffff&color=%23eaaf41)](https://github.com/sponsors/acme)',
    ].join('\n'));

    return;
  });

  it('omits the profile support section when support is absent', () => {
    const content: Tests_Cli_Generate_MustHaves_ReadMe_CliGenerateMustHavesReadMeBuildCreditsRegionContent_OmitsTheProfileSupportSectionWhenSupportIsAbsent_Content = CliGenerateMustHavesReadMe.buildCreditsRegionContent({
      urls: {
        fundSources: ['https://github.com/sponsors/acme'],
      },
      readme: {
        profile: {},
      },
    });

    strictEqual(content, undefined);

    return;
  });

  return;
});
