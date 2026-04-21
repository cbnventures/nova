import { promises as fs } from 'fs';
import { join, relative, sep } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import {
  libItemAllowedPoliciesByRole,
  libItemAllowedRecipes,
  libItemSyncRoles,
  libItemValidEntityRoles,
} from '../../lib/item.js';
import { LibNovaConfig } from '../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_EMAIL_SIMPLE,
  LIB_REGEX_PATTERN_SLUG_SCOPED,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
  LIB_REGEX_PATTERN_YML_EXTENSION,
} from '../../lib/regex.js';
import { discoverPathsWithFile, pathExists, resolveTemplatePath } from '../../lib/utility.js';
import { libWorkflowTemplatesMetadata } from '../../lib/workflow-templates.js';
import { Logger } from '../../toolkit/index.js';

import type {
  CliUtilityInitializeCheckPathCurrentDirectory,
  CliUtilityInitializeCheckPathGreaterThanOneMessage,
  CliUtilityInitializeCheckPathLessThanOneMessage,
  CliUtilityInitializeCheckPathLocations,
  CliUtilityInitializeCheckPathNotProjectRootDirectoryMessage,
  CliUtilityInitializeCheckPathReturns,
  CliUtilityInitializeNormalizeEmailReturns,
  CliUtilityInitializeNormalizeEmailTrimmedValue,
  CliUtilityInitializeNormalizeEmailValue,
  CliUtilityInitializeNormalizeProjectSlugReturns,
  CliUtilityInitializeNormalizeProjectSlugTrimmedValue,
  CliUtilityInitializeNormalizeProjectSlugValue,
  CliUtilityInitializeNormalizeTextArrayItems,
  CliUtilityInitializeNormalizeTextArrayMaxLengthPerItem,
  CliUtilityInitializeNormalizeTextArrayNormalizedText,
  CliUtilityInitializeNormalizeTextArrayResult,
  CliUtilityInitializeNormalizeTextArrayReturns,
  CliUtilityInitializeNormalizeTextArraySanitized,
  CliUtilityInitializeNormalizeTextArrayTrimmedValue,
  CliUtilityInitializeNormalizeTextArrayValue,
  CliUtilityInitializeNormalizeTextMaxLength,
  CliUtilityInitializeNormalizeTextReturns,
  CliUtilityInitializeNormalizeTextTrimmedValue,
  CliUtilityInitializeNormalizeTextValue,
  CliUtilityInitializeNormalizeUrlAllowed,
  CliUtilityInitializeNormalizeUrlArrayErrorMessage,
  CliUtilityInitializeNormalizeUrlArrayErrorMessages,
  CliUtilityInitializeNormalizeUrlArrayItems,
  CliUtilityInitializeNormalizeUrlArrayNormalizedUrl,
  CliUtilityInitializeNormalizeUrlArrayProtocol,
  CliUtilityInitializeNormalizeUrlArrayResult,
  CliUtilityInitializeNormalizeUrlArrayReturns,
  CliUtilityInitializeNormalizeUrlArraySanitized,
  CliUtilityInitializeNormalizeUrlArrayTrimmedValue,
  CliUtilityInitializeNormalizeUrlArrayValue,
  CliUtilityInitializeNormalizeUrlErrorMessage,
  CliUtilityInitializeNormalizeUrlProtocol,
  CliUtilityInitializeNormalizeUrlReturns,
  CliUtilityInitializeNormalizeUrlRules,
  CliUtilityInitializeNormalizeUrlTrimmedValue,
  CliUtilityInitializeNormalizeUrlUrl,
  CliUtilityInitializeNormalizeUrlValue,
  CliUtilityInitializeNormalizeWorkspaceNameBase,
  CliUtilityInitializeNormalizeWorkspaceNameDescriptor,
  CliUtilityInitializeNormalizeWorkspaceNameExpectedPrefix,
  CliUtilityInitializeNormalizeWorkspaceNameReturns,
  CliUtilityInitializeNormalizeWorkspaceNameRole,
  CliUtilityInitializeNormalizeWorkspaceNameTrimmedValue,
  CliUtilityInitializeNormalizeWorkspaceNameValue,
  CliUtilityInitializePromptEmailsConfig,
  CliUtilityInitializePromptEmailsEmails,
  CliUtilityInitializePromptEmailsEmailsBugsInput,
  CliUtilityInitializePromptEmailsExistingEmails,
  CliUtilityInitializePromptEmailsQuestionsOutput,
  CliUtilityInitializePromptEmailsQuestionsOutputKey,
  CliUtilityInitializePromptEmailsQuestionsOutputResult,
  CliUtilityInitializePromptEmailsQuestionsOutputValue,
  CliUtilityInitializePromptEmailsReturns,
  CliUtilityInitializePromptEmailsValidateValue,
  CliUtilityInitializePromptEntitiesChoices,
  CliUtilityInitializePromptEntitiesClonedEntity,
  CliUtilityInitializePromptEntitiesConfig,
  CliUtilityInitializePromptEntitiesDeleteFormConfirmOutput,
  CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey,
  CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputResult,
  CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue,
  CliUtilityInitializePromptEntitiesDeleteFormLabel,
  CliUtilityInitializePromptEntitiesDeleteFormReturns,
  CliUtilityInitializePromptEntitiesDescription,
  CliUtilityInitializePromptEntitiesDescriptionParts,
  CliUtilityInitializePromptEntitiesEntities,
  CliUtilityInitializePromptEntitiesEntity,
  CliUtilityInitializePromptEntitiesEntityEmail,
  CliUtilityInitializePromptEntitiesEntityIndex,
  CliUtilityInitializePromptEntitiesEntityLabel,
  CliUtilityInitializePromptEntitiesEntityName,
  CliUtilityInitializePromptEntitiesEntityResult,
  CliUtilityInitializePromptEntitiesEntityRoles,
  CliUtilityInitializePromptEntitiesEntityToEdit,
  CliUtilityInitializePromptEntitiesEntityToRemove,
  CliUtilityInitializePromptEntitiesFormEntity,
  CliUtilityInitializePromptEntitiesFormEntityEmailInput,
  CliUtilityInitializePromptEntitiesFormEntityNameInput,
  CliUtilityInitializePromptEntitiesFormEntityRolesInput,
  CliUtilityInitializePromptEntitiesFormEntityUrlInput,
  CliUtilityInitializePromptEntitiesFormExistingEmail,
  CliUtilityInitializePromptEntitiesFormExistingName,
  CliUtilityInitializePromptEntitiesFormExistingRoles,
  CliUtilityInitializePromptEntitiesFormExistingUrl,
  CliUtilityInitializePromptEntitiesFormMode,
  CliUtilityInitializePromptEntitiesFormQuestionsOutput,
  CliUtilityInitializePromptEntitiesFormQuestionsOutputKey,
  CliUtilityInitializePromptEntitiesFormQuestionsOutputResult,
  CliUtilityInitializePromptEntitiesFormQuestionsOutputValue,
  CliUtilityInitializePromptEntitiesFormResolvedEntity,
  CliUtilityInitializePromptEntitiesFormReturns,
  CliUtilityInitializePromptEntitiesFormValidateValue,
  CliUtilityInitializePromptEntitiesFormValidRoles,
  CliUtilityInitializePromptEntitiesJoinedRoles,
  CliUtilityInitializePromptEntitiesLabel,
  CliUtilityInitializePromptEntitiesMenuOutput,
  CliUtilityInitializePromptEntitiesMenuOutputKey,
  CliUtilityInitializePromptEntitiesMenuOutputResult,
  CliUtilityInitializePromptEntitiesMenuOutputResultValue,
  CliUtilityInitializePromptEntitiesNormalizedEntities,
  CliUtilityInitializePromptEntitiesNormalizedEntity,
  CliUtilityInitializePromptEntitiesNormalizedRoles,
  CliUtilityInitializePromptEntitiesNormalizedRolesReduce,
  CliUtilityInitializePromptEntitiesResult,
  CliUtilityInitializePromptEntitiesReturns,
  CliUtilityInitializePromptEntitiesShouldRemove,
  CliUtilityInitializePromptEntitiesSortNameA,
  CliUtilityInitializePromptEntitiesSortNameB,
  CliUtilityInitializePromptEntitiesSync,
  CliUtilityInitializePromptEntitiesSyncReturns,
  CliUtilityInitializePromptFlowCategory,
  CliUtilityInitializePromptFlowCategoryHandler,
  CliUtilityInitializePromptFlowCategoryKey,
  CliUtilityInitializePromptFlowCategoryKeys,
  CliUtilityInitializePromptFlowChoices,
  CliUtilityInitializePromptFlowConfig,
  CliUtilityInitializePromptFlowMenuOutput,
  CliUtilityInitializePromptFlowMenuOutputResult,
  CliUtilityInitializePromptFlowReturns,
  CliUtilityInitializePromptFlowSelectMenuOutputKey,
  CliUtilityInitializePromptFlowSelectMenuOutputResult,
  CliUtilityInitializePromptProjectConfig,
  CliUtilityInitializePromptProjectCurrentLabel,
  CliUtilityInitializePromptProjectCurrentSlug,
  CliUtilityInitializePromptProjectExistingProject,
  CliUtilityInitializePromptProjectExistingProjectDescription,
  CliUtilityInitializePromptProjectExistingProjectKeywords,
  CliUtilityInitializePromptProjectExistingProjectLegalName,
  CliUtilityInitializePromptProjectExistingProjectLicense,
  CliUtilityInitializePromptProjectExistingProjectName,
  CliUtilityInitializePromptProjectExistingProjectPlatforms,
  CliUtilityInitializePromptProjectExistingProjectPronouns,
  CliUtilityInitializePromptProjectExistingProjectStartingYear,
  CliUtilityInitializePromptProjectLegalNameOutput,
  CliUtilityInitializePromptProjectLegalNameOutputKey,
  CliUtilityInitializePromptProjectLegalNameOutputResult,
  CliUtilityInitializePromptProjectLicenseChoices,
  CliUtilityInitializePromptProjectLicenseInitialIndex,
  CliUtilityInitializePromptProjectLicenseOutput,
  CliUtilityInitializePromptProjectLicenseOutputKey,
  CliUtilityInitializePromptProjectLicenseOutputResult,
  CliUtilityInitializePromptProjectName2,
  CliUtilityInitializePromptProjectParsed,
  CliUtilityInitializePromptProjectPlatformChoices,
  CliUtilityInitializePromptProjectPlatformsOutput,
  CliUtilityInitializePromptProjectPlatformsOutputKey,
  CliUtilityInitializePromptProjectPlatformsOutputResult,
  CliUtilityInitializePromptProjectPreviousLabel,
  CliUtilityInitializePromptProjectPreviousSlug,
  CliUtilityInitializePromptProjectProject,
  CliUtilityInitializePromptProjectProjectDescription,
  CliUtilityInitializePromptProjectProjectDescriptionLongInput,
  CliUtilityInitializePromptProjectProjectDescriptionShortInput,
  CliUtilityInitializePromptProjectProjectKeywords,
  CliUtilityInitializePromptProjectProjectKeywordsInput,
  CliUtilityInitializePromptProjectProjectLegalNameInput,
  CliUtilityInitializePromptProjectProjectLicenseInput,
  CliUtilityInitializePromptProjectProjectName,
  CliUtilityInitializePromptProjectProjectNameSlugInput,
  CliUtilityInitializePromptProjectProjectNameTitleInput,
  CliUtilityInitializePromptProjectProjectPlatformsInput,
  CliUtilityInitializePromptProjectProjectPronounsInput,
  CliUtilityInitializePromptProjectPronounsOutput,
  CliUtilityInitializePromptProjectPronounsOutputKey,
  CliUtilityInitializePromptProjectPronounsOutputResult,
  CliUtilityInitializePromptProjectQuestionsOutput,
  CliUtilityInitializePromptProjectQuestionsOutputKey,
  CliUtilityInitializePromptProjectQuestionsOutputResult,
  CliUtilityInitializePromptProjectQuestionsOutputResultValue,
  CliUtilityInitializePromptProjectReturns,
  CliUtilityInitializePromptProjectRolesToSync,
  CliUtilityInitializePromptProjectSlugChanged,
  CliUtilityInitializePromptProjectSlugPrefix,
  CliUtilityInitializePromptProjectStartingYearOutput,
  CliUtilityInitializePromptProjectStartingYearOutputKey,
  CliUtilityInitializePromptProjectStartingYearOutputResult,
  CliUtilityInitializePromptProjectStartingYearParsed,
  CliUtilityInitializePromptProjectStartingYearRaw,
  CliUtilityInitializePromptProjectTrimmed,
  CliUtilityInitializePromptProjectValidateValue,
  CliUtilityInitializePromptUrlsConfig,
  CliUtilityInitializePromptUrlsExistingUrls,
  CliUtilityInitializePromptUrlsQuestionsOutput,
  CliUtilityInitializePromptUrlsQuestionsOutputKey,
  CliUtilityInitializePromptUrlsQuestionsOutputResult,
  CliUtilityInitializePromptUrlsQuestionsOutputValue,
  CliUtilityInitializePromptUrlsReturns,
  CliUtilityInitializePromptUrlsUrls,
  CliUtilityInitializePromptUrlsUrlsBugsInput,
  CliUtilityInitializePromptUrlsUrlsDockerInput,
  CliUtilityInitializePromptUrlsUrlsDocumentationInput,
  CliUtilityInitializePromptUrlsUrlsFundSourcesInput,
  CliUtilityInitializePromptUrlsUrlsGithubInput,
  CliUtilityInitializePromptUrlsUrlsHomepageInput,
  CliUtilityInitializePromptUrlsUrlsLicenseInput,
  CliUtilityInitializePromptUrlsUrlsLogoInput,
  CliUtilityInitializePromptUrlsUrlsNpmInput,
  CliUtilityInitializePromptUrlsUrlsPrivacyPolicyInput,
  CliUtilityInitializePromptUrlsUrlsRepositoryInput,
  CliUtilityInitializePromptUrlsUrlsTermsOfUseInput,
  CliUtilityInitializePromptUrlsValidateValue,
  CliUtilityInitializePromptWithCancelCancelled,
  CliUtilityInitializePromptWithCancelQuestions,
  CliUtilityInitializePromptWithCancelResult,
  CliUtilityInitializePromptWithCancelReturns,
  CliUtilityInitializePromptWorkflowsChoices,
  CliUtilityInitializePromptWorkflowsClonedWorkflow,
  CliUtilityInitializePromptWorkflowsConfig,
  CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutput,
  CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputKey,
  CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputResult,
  CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputValue,
  CliUtilityInitializePromptWorkflowsDeleteFormLabel,
  CliUtilityInitializePromptWorkflowsDeleteFormReturns,
  CliUtilityInitializePromptWorkflowsDescription,
  CliUtilityInitializePromptWorkflowsFormCompositeKey,
  CliUtilityInitializePromptWorkflowsFormConfig,
  CliUtilityInitializePromptWorkflowsFormDependsOnChoices,
  CliUtilityInitializePromptWorkflowsFormDependsOnOutput,
  CliUtilityInitializePromptWorkflowsFormDependsOnOutputKey,
  CliUtilityInitializePromptWorkflowsFormDependsOnOutputResult,
  CliUtilityInitializePromptWorkflowsFormDependsOnOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormEditIndex,
  CliUtilityInitializePromptWorkflowsFormExistingDependsOn,
  CliUtilityInitializePromptWorkflowsFormExistingScopes,
  CliUtilityInitializePromptWorkflowsFormExistingSuffix,
  CliUtilityInitializePromptWorkflowsFormExistingTargets,
  CliUtilityInitializePromptWorkflowsFormExistingTemplate,
  CliUtilityInitializePromptWorkflowsFormExistingTriggers,
  CliUtilityInitializePromptWorkflowsFormExtraWorkspaceKeys,
  CliUtilityInitializePromptWorkflowsFormFoundIndex,
  CliUtilityInitializePromptWorkflowsFormInitialValue,
  CliUtilityInitializePromptWorkflowsFormIsDuplicate,
  CliUtilityInitializePromptWorkflowsFormLockedPaths,
  CliUtilityInitializePromptWorkflowsFormMatchedMetadata,
  CliUtilityInitializePromptWorkflowsFormMergedVariableEntries,
  CliUtilityInitializePromptWorkflowsFormMergedVariables,
  CliUtilityInitializePromptWorkflowsFormMode,
  CliUtilityInitializePromptWorkflowsFormPromptMessage,
  CliUtilityInitializePromptWorkflowsFormResolvedWorkflow,
  CliUtilityInitializePromptWorkflowsFormReturns,
  CliUtilityInitializePromptWorkflowsFormScheduleVariants,
  CliUtilityInitializePromptWorkflowsFormScopeChoices,
  CliUtilityInitializePromptWorkflowsFormScopesOutput,
  CliUtilityInitializePromptWorkflowsFormScopesOutputKey,
  CliUtilityInitializePromptWorkflowsFormScopesOutputResult,
  CliUtilityInitializePromptWorkflowsFormScopesOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormSelectedDependsOn,
  CliUtilityInitializePromptWorkflowsFormSelectedScopes,
  CliUtilityInitializePromptWorkflowsFormSelectedSuffix,
  CliUtilityInitializePromptWorkflowsFormSelectedTargetNeeds,
  CliUtilityInitializePromptWorkflowsFormSelectedTargets,
  CliUtilityInitializePromptWorkflowsFormSelectedTargetType,
  CliUtilityInitializePromptWorkflowsFormSelectedTargetWorkingDir,
  CliUtilityInitializePromptWorkflowsFormSelectedTemplate,
  CliUtilityInitializePromptWorkflowsFormSelectedTriggers,
  CliUtilityInitializePromptWorkflowsFormSettings,
  CliUtilityInitializePromptWorkflowsFormSettingsOutput,
  CliUtilityInitializePromptWorkflowsFormSettingsOutputKey,
  CliUtilityInitializePromptWorkflowsFormSettingsOutputResult,
  CliUtilityInitializePromptWorkflowsFormSettingsOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormSettingValue,
  CliUtilityInitializePromptWorkflowsFormSuffixOutput,
  CliUtilityInitializePromptWorkflowsFormSuffixOutputKey,
  CliUtilityInitializePromptWorkflowsFormSuffixOutputResult,
  CliUtilityInitializePromptWorkflowsFormSuffixOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTargetAvailableTypes,
  CliUtilityInitializePromptWorkflowsFormTargetEditIndex,
  CliUtilityInitializePromptWorkflowsFormTargetEntry,
  CliUtilityInitializePromptWorkflowsFormTargetIsDuplicate,
  CliUtilityInitializePromptWorkflowsFormTargetMenuChoices,
  CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTarget,
  CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTargetType,
  CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTargetWorkingDir,
  CliUtilityInitializePromptWorkflowsFormTargetMenuOutput,
  CliUtilityInitializePromptWorkflowsFormTargetMenuOutputKey,
  CliUtilityInitializePromptWorkflowsFormTargetMenuOutputResult,
  CliUtilityInitializePromptWorkflowsFormTargetMenuOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTargetNeedsChoices,
  CliUtilityInitializePromptWorkflowsFormTargetNeedsOutput,
  CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputKey,
  CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputResult,
  CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTargetsMetadata,
  CliUtilityInitializePromptWorkflowsFormTargetToEdit,
  CliUtilityInitializePromptWorkflowsFormTargetToEditExistingNeeds,
  CliUtilityInitializePromptWorkflowsFormTargetToRemoveIndex,
  CliUtilityInitializePromptWorkflowsFormTargetTypeChoices,
  CliUtilityInitializePromptWorkflowsFormTargetTypeInitial,
  CliUtilityInitializePromptWorkflowsFormTargetTypeOutput,
  CliUtilityInitializePromptWorkflowsFormTargetTypeOutputKey,
  CliUtilityInitializePromptWorkflowsFormTargetTypeOutputResult,
  CliUtilityInitializePromptWorkflowsFormTargetTypeOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTargetVariableEntries,
  CliUtilityInitializePromptWorkflowsFormTargetVariableKey,
  CliUtilityInitializePromptWorkflowsFormTargetVariables,
  CliUtilityInitializePromptWorkflowsFormTargetVariableValue,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirChoices,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirInitial,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutput,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputKey,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputResult,
  CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTemplateChoices,
  CliUtilityInitializePromptWorkflowsFormTemplateInitialIndex,
  CliUtilityInitializePromptWorkflowsFormTemplateOutput,
  CliUtilityInitializePromptWorkflowsFormTemplateOutputKey,
  CliUtilityInitializePromptWorkflowsFormTemplateOutputResult,
  CliUtilityInitializePromptWorkflowsFormTemplateOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormTriggerChoices,
  CliUtilityInitializePromptWorkflowsFormTriggerName,
  CliUtilityInitializePromptWorkflowsFormTriggersDir,
  CliUtilityInitializePromptWorkflowsFormTriggersDirExists,
  CliUtilityInitializePromptWorkflowsFormTriggersFiles,
  CliUtilityInitializePromptWorkflowsFormTriggersOutput,
  CliUtilityInitializePromptWorkflowsFormTriggersOutputKey,
  CliUtilityInitializePromptWorkflowsFormTriggersOutputResult,
  CliUtilityInitializePromptWorkflowsFormTriggersOutputResultValue,
  CliUtilityInitializePromptWorkflowsFormVariableConfig,
  CliUtilityInitializePromptWorkflowsFormVariableDescriptionParts,
  CliUtilityInitializePromptWorkflowsFormVariableName,
  CliUtilityInitializePromptWorkflowsFormWorkflow,
  CliUtilityInitializePromptWorkflowsFormWorkflows,
  CliUtilityInitializePromptWorkflowsFormWorkspaceKeys,
  CliUtilityInitializePromptWorkflowsLabel,
  CliUtilityInitializePromptWorkflowsMenuOutput,
  CliUtilityInitializePromptWorkflowsMenuOutputKey,
  CliUtilityInitializePromptWorkflowsMenuOutputResult,
  CliUtilityInitializePromptWorkflowsMenuOutputResultValue,
  CliUtilityInitializePromptWorkflowsMenuSuffix,
  CliUtilityInitializePromptWorkflowsMenuTemplate,
  CliUtilityInitializePromptWorkflowsMenuTriggers,
  CliUtilityInitializePromptWorkflowsMenuWorkflow,
  CliUtilityInitializePromptWorkflowsOutputFileName,
  CliUtilityInitializePromptWorkflowsRemoveSuffix,
  CliUtilityInitializePromptWorkflowsRemoveTemplate,
  CliUtilityInitializePromptWorkflowsResult,
  CliUtilityInitializePromptWorkflowsReturns,
  CliUtilityInitializePromptWorkflowsShouldRemove,
  CliUtilityInitializePromptWorkflowsSortSuffixA,
  CliUtilityInitializePromptWorkflowsSortSuffixB,
  CliUtilityInitializePromptWorkflowsSortTemplateA,
  CliUtilityInitializePromptWorkflowsSortTemplateB,
  CliUtilityInitializePromptWorkflowsSortTemplateCompare,
  CliUtilityInitializePromptWorkflowsSync,
  CliUtilityInitializePromptWorkflowsSyncReturns,
  CliUtilityInitializePromptWorkflowsTriggersLabel,
  CliUtilityInitializePromptWorkflowsWorkflowIndex,
  CliUtilityInitializePromptWorkflowsWorkflows,
  CliUtilityInitializePromptWorkflowsWorkflowToEdit,
  CliUtilityInitializePromptWorkflowsWorkflowToRemove,
  CliUtilityInitializePromptWorkspaces,
  CliUtilityInitializePromptWorkspacesChoices,
  CliUtilityInitializePromptWorkspacesConfig,
  CliUtilityInitializePromptWorkspacesCurrentWorkingDirectory,
  CliUtilityInitializePromptWorkspacesFormAllowedPolicies,
  CliUtilityInitializePromptWorkspacesFormAllowedRoles,
  CliUtilityInitializePromptWorkspacesFormExistingPolicyIndex,
  CliUtilityInitializePromptWorkspacesFormExistingRecipes,
  CliUtilityInitializePromptWorkspacesFormExistingRoleIndex,
  CliUtilityInitializePromptWorkspacesFormExistingSettings,
  CliUtilityInitializePromptWorkspacesFormExistingTuple,
  CliUtilityInitializePromptWorkspacesFormExistingTupleRaw,
  CliUtilityInitializePromptWorkspacesFormOptions,
  CliUtilityInitializePromptWorkspacesFormPolicy,
  CliUtilityInitializePromptWorkspacesFormPolicyEntry,
  CliUtilityInitializePromptWorkspacesFormPolicyPrompt,
  CliUtilityInitializePromptWorkspacesFormPolicyPromptKey,
  CliUtilityInitializePromptWorkspacesFormPolicyPromptValue,
  CliUtilityInitializePromptWorkspacesFormRecipes,
  CliUtilityInitializePromptWorkspacesFormRecipeSelected,
  CliUtilityInitializePromptWorkspacesFormRecipeSettings,
  CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey,
  CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue,
  CliUtilityInitializePromptWorkspacesFormRecipesPrompt,
  CliUtilityInitializePromptWorkspacesFormRecipesPromptKey,
  CliUtilityInitializePromptWorkspacesFormRecipesPromptValue,
  CliUtilityInitializePromptWorkspacesFormRecipeTuple,
  CliUtilityInitializePromptWorkspacesFormResolvedName,
  CliUtilityInitializePromptWorkspacesFormResolveName,
  CliUtilityInitializePromptWorkspacesFormResolveNameBase,
  CliUtilityInitializePromptWorkspacesFormResolveNameNamePrompt,
  CliUtilityInitializePromptWorkspacesFormResolveNamePromptKey,
  CliUtilityInitializePromptWorkspacesFormResolveNamePromptValue,
  CliUtilityInitializePromptWorkspacesFormResolveNameReturns,
  CliUtilityInitializePromptWorkspacesFormResolveNameRole,
  CliUtilityInitializePromptWorkspacesFormResolveNameValidateValue,
  CliUtilityInitializePromptWorkspacesFormResult,
  CliUtilityInitializePromptWorkspacesFormReturns,
  CliUtilityInitializePromptWorkspacesFormRolePrompt,
  CliUtilityInitializePromptWorkspacesFormRolePromptKey,
  CliUtilityInitializePromptWorkspacesFormRolePromptValue,
  CliUtilityInitializePromptWorkspacesFormSelectedPolicy,
  CliUtilityInitializePromptWorkspacesFormSelectedRecipes,
  CliUtilityInitializePromptWorkspacesFormSelectedRole,
  CliUtilityInitializePromptWorkspacesFormSelectedSettings,
  CliUtilityInitializePromptWorkspacesFormSettingsPrompt,
  CliUtilityInitializePromptWorkspacesMenuOutput,
  CliUtilityInitializePromptWorkspacesMenuOutputKey,
  CliUtilityInitializePromptWorkspacesMenuOutputResult,
  CliUtilityInitializePromptWorkspacesMenuOutputValue,
  CliUtilityInitializePromptWorkspacesRawWorkspacePaths,
  CliUtilityInitializePromptWorkspacesRelativePath,
  CliUtilityInitializePromptWorkspacesReturns,
  CliUtilityInitializePromptWorkspacesSummaryParts,
  CliUtilityInitializePromptWorkspacesWorkspace,
  CliUtilityInitializePromptWorkspacesWorkspacePath,
  CliUtilityInitializePromptWorkspacesWorkspacePaths,
  CliUtilityInitializeRunCurrentDirectory,
  CliUtilityInitializeRunIsDryRun,
  CliUtilityInitializeRunIsProjectRoot,
  CliUtilityInitializeRunIsReplaceFile,
  CliUtilityInitializeRunNovaConfig,
  CliUtilityInitializeRunOptions,
  CliUtilityInitializeRunPromptFlowResult,
  CliUtilityInitializeRunReplaceFileNotice,
  CliUtilityInitializeRunReturns,
  CliUtilityInitializeRunWorkingFile,
} from '../../types/cli/utility/initialize.d.ts';

/**
 * CLI - Utility - Initialize.
 *
 * Interactive setup wizard for the nova.config.json file. Registered as the "nova utility
 * initialize" command and walks the user through each config category.
 *
 * @since 0.11.0
 */
export class CliUtilityInitialize {
  /**
   * CLI - Utility - Initialize - Run.
   *
   * Entry point called by the CLI action handler. Verifies the working directory, loads the
   * config, runs the prompt flow, then persists changes.
   *
   * @param {CliUtilityInitializeRunOptions} options - Options.
   *
   * @returns {CliUtilityInitializeRunReturns}
   *
   * @since 0.11.0
   */
  public static async run(options: CliUtilityInitializeRunOptions): CliUtilityInitializeRunReturns {
    const currentDirectory: CliUtilityInitializeRunCurrentDirectory = process.cwd();
    const isProjectRoot: CliUtilityInitializeRunIsProjectRoot = await CliUtilityInitialize.checkPath(currentDirectory);

    if (isProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun: CliUtilityInitializeRunIsDryRun = options['dryRun'] === true;
    const isReplaceFile: CliUtilityInitializeRunIsReplaceFile = options['replaceFile'] === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityInitialize.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice: CliUtilityInitializeRunReplaceFileNotice = (isDryRun === true) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CliUtilityInitialize.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig: CliUtilityInitializeRunNovaConfig = new LibNovaConfig();
    const workingFile: CliUtilityInitializeRunWorkingFile = await novaConfig.load();
    const promptFlowResult: CliUtilityInitializeRunPromptFlowResult = await CliUtilityInitialize.promptFlow(workingFile);

    if (promptFlowResult === 'cancel') {
      Logger.customize({
        name: 'CliUtilityInitialize.run',
        purpose: 'promptFlow',
      }).debug('Prompt flow exited without saving.');

      return;
    }

    novaConfig.set(workingFile);

    if (isDryRun === true) {
      Logger.customize({
        name: 'CliUtilityInitialize.run',
        purpose: 'promptFlow',
      }).debug('Dry run enabled. Skipping save operation.');

      return;
    }

    await novaConfig.save(isReplaceFile);

    return;
  }

  /**
   * CLI - Utility - Initialize - Prompt Flow.
   *
   * Top-level menu loop that lists configuration categories (project, entities, emails, URLs,
   * workspaces) and dispatches to each sub-prompt.
   *
   * @param {CliUtilityInitializePromptFlowConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptFlowReturns}
   *
   * @since 0.11.0
   */
  private static async promptFlow(config: CliUtilityInitializePromptFlowConfig): CliUtilityInitializePromptFlowReturns {
    const category: CliUtilityInitializePromptFlowCategory = {
      project: {
        label: 'Project',
        description: 'Configure project metadata (name, description, keywords).',
        handler: CliUtilityInitialize['promptProject'],
      },
      entities: {
        label: 'Entities',
        description: 'Manage entities, their roles, and contact information.',
        handler: CliUtilityInitialize['promptEntities'],
      },
      emails: {
        label: 'Emails',
        description: 'Configure project emails (bugs, etc.).',
        handler: CliUtilityInitialize['promptEmails'],
      },
      workflows: {
        label: 'Workflows',
        description: 'Configure workflow templates and settings.',
        handler: CliUtilityInitialize['promptWorkflows'],
      },
      urls: {
        label: 'URLs',
        description: 'Configure project URLs (homepage, repository, fund sources, etc.).',
        handler: CliUtilityInitialize['promptUrls'],
      },
      workspaces: {
        label: 'Workspaces',
        description: 'Review workspace packages, assigning roles and policies.',
        handler: CliUtilityInitialize['promptWorkspaces'],
      },
    };

    while (true) {
      const categoryKeys: CliUtilityInitializePromptFlowCategoryKeys = Object.keys(category) as CliUtilityInitializePromptFlowCategoryKeys;
      const choices: CliUtilityInitializePromptFlowChoices = categoryKeys.map((categoryKey) => ({
        title: category[categoryKey]['label'],
        description: category[categoryKey]['description'],
        value: categoryKey,
      }));

      choices.push({
        title: 'Save & Exit',
        description: 'Persist the "nova.config.json" file and exit.',
        value: 'save',
      });

      choices.push({
        title: 'Cancel',
        description: 'Exit without persisting any changes.',
        value: 'cancel',
      });

      const menuOutput: CliUtilityInitializePromptFlowMenuOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptFlowSelectMenuOutputKey, CliUtilityInitializePromptFlowSelectMenuOutputResult>({
        type: 'select',
        name: 'action',
        message: 'Select a Nova configuration category to edit.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'cancel';
      }

      const menuOutputResult: CliUtilityInitializePromptFlowMenuOutputResult = menuOutput['result'];

      if (
        menuOutputResult.action === undefined
        || menuOutputResult.action === 'cancel'
      ) {
        return 'cancel';
      }

      if (menuOutputResult.action === 'save') {
        return 'save';
      }

      const categoryKey: CliUtilityInitializePromptFlowCategoryKey = menuOutputResult.action;
      const categoryHandler: CliUtilityInitializePromptFlowCategoryHandler = category[categoryKey]['handler'];

      await categoryHandler(config);
    }
  }

  /**
   * CLI - Utility - Initialize - Prompt Project.
   *
   * Collects project-level metadata such as name, slug, descriptions, keywords, legal name,
   * pronouns, platforms, starting year, and license.
   *
   * @param {CliUtilityInitializePromptProjectConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptProjectReturns}
   *
   * @since 0.11.0
   */
  private static async promptProject(config: CliUtilityInitializePromptProjectConfig): CliUtilityInitializePromptProjectReturns {
    const existingProject: CliUtilityInitializePromptProjectExistingProject = config['project'];
    const existingProjectName: CliUtilityInitializePromptProjectExistingProjectName = (existingProject !== undefined) ? existingProject['name'] : undefined;
    const existingProjectDescription: CliUtilityInitializePromptProjectExistingProjectDescription = (existingProject !== undefined) ? existingProject['description'] : undefined;
    const existingProjectKeywords: CliUtilityInitializePromptProjectExistingProjectKeywords = (existingProject !== undefined) ? existingProject['keywords'] : undefined;
    const existingProjectLegalName: CliUtilityInitializePromptProjectExistingProjectLegalName = (existingProject !== undefined) ? existingProject['legalName'] : undefined;
    const existingProjectPronouns: CliUtilityInitializePromptProjectExistingProjectPronouns = (existingProject !== undefined) ? existingProject['pronouns'] : undefined;
    const existingProjectPlatforms: CliUtilityInitializePromptProjectExistingProjectPlatforms = (existingProject !== undefined) ? existingProject['platforms'] : undefined;
    const existingProjectStartingYear: CliUtilityInitializePromptProjectExistingProjectStartingYear = (existingProject !== undefined) ? existingProject['startingYear'] : undefined;
    const existingProjectLicense: CliUtilityInitializePromptProjectExistingProjectLicense = (existingProject !== undefined) ? existingProject['license'] : undefined;

    const project: CliUtilityInitializePromptProjectProject = (existingProject !== undefined) ? { ...existingProject } : {};
    const projectName: CliUtilityInitializePromptProjectProjectName = (existingProjectName !== undefined) ? { ...existingProjectName } : {};
    const projectDescription: CliUtilityInitializePromptProjectProjectDescription = (existingProjectDescription !== undefined) ? { ...existingProjectDescription } : {};
    const projectKeywords: CliUtilityInitializePromptProjectProjectKeywords = (existingProjectKeywords !== undefined) ? [...existingProjectKeywords] : [];

    const questionsOutput: CliUtilityInitializePromptProjectQuestionsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectQuestionsOutputKey, CliUtilityInitializePromptProjectQuestionsOutputResult>([
      {
        type: 'text',
        name: 'projectNameTitle',
        message: 'Project title (display name)',
        initial: projectName['title'] ?? '',
        validate: (value: CliUtilityInitializePromptProjectValidateValue) => CliUtilityInitialize.normalizeText(value, Infinity)['result'],
      },
      {
        type: 'text',
        name: 'projectNameSlug',
        message: 'Project slug (package name)',
        initial: projectName['slug'] ?? '',
        validate: (value: CliUtilityInitializePromptProjectValidateValue) => CliUtilityInitialize.normalizeProjectSlug(value)['result'],
      },
      {
        type: 'text',
        name: 'projectDescriptionShort',
        message: 'Short description',
        initial: projectDescription['short'] ?? '',
        validate: (value: CliUtilityInitializePromptProjectValidateValue) => CliUtilityInitialize.normalizeText(value, Infinity)['result'],
      },
      {
        type: 'text',
        name: 'projectDescriptionLong',
        message: 'Long description',
        initial: projectDescription['long'] ?? '',
        validate: (value: CliUtilityInitializePromptProjectValidateValue) => CliUtilityInitialize.normalizeText(value, Infinity)['result'],
      },
      {
        type: 'text',
        name: 'projectKeywords',
        message: 'Keywords (comma separated)',
        initial: (projectKeywords.length > 0) ? projectKeywords.join(', ') : '',
        validate: (value: CliUtilityInitializePromptProjectValidateValue) => CliUtilityInitialize.normalizeTextArray(value, 50)['result'],
      },
    ]);

    if (questionsOutput['cancelled'] === true) {
      return 'back';
    }

    const questionsOutputResult: CliUtilityInitializePromptProjectQuestionsOutputResultValue = questionsOutput['result'];

    const projectNameTitleInput: CliUtilityInitializePromptProjectProjectNameTitleInput = CliUtilityInitialize.normalizeText(questionsOutputResult.projectNameTitle, Infinity)['sanitized'];
    const projectNameSlugInput: CliUtilityInitializePromptProjectProjectNameSlugInput = CliUtilityInitialize.normalizeProjectSlug(questionsOutputResult.projectNameSlug)['sanitized'];
    const projectDescriptionShortInput: CliUtilityInitializePromptProjectProjectDescriptionShortInput = CliUtilityInitialize.normalizeText(questionsOutputResult.projectDescriptionShort, Infinity)['sanitized'];
    const projectDescriptionLongInput: CliUtilityInitializePromptProjectProjectDescriptionLongInput = CliUtilityInitialize.normalizeText(questionsOutputResult.projectDescriptionLong, Infinity)['sanitized'];
    const projectKeywordsInput: CliUtilityInitializePromptProjectProjectKeywordsInput = CliUtilityInitialize.normalizeTextArray(questionsOutputResult.projectKeywords, 50)['sanitized'];

    // Project - Name - Title.
    if (projectNameTitleInput !== undefined) {
      projectName.title = projectNameTitleInput;
    } else {
      Reflect.deleteProperty(projectName, 'title');
    }

    // Project - Name - Slug.
    if (projectNameSlugInput !== undefined) {
      projectName.slug = projectNameSlugInput;
    } else {
      Reflect.deleteProperty(projectName, 'slug');
    }

    // Project - Name.
    if (Object.keys(projectName).length > 0) {
      project.name = projectName;
    } else {
      Reflect.deleteProperty(project, 'name');
    }

    // Project - Description - Short.
    if (projectDescriptionShortInput !== undefined) {
      projectDescription.short = projectDescriptionShortInput;
    } else {
      Reflect.deleteProperty(projectDescription, 'short');
    }

    // Project - Description - Long.
    if (projectDescriptionLongInput !== undefined) {
      projectDescription.long = projectDescriptionLongInput;
    } else {
      Reflect.deleteProperty(projectDescription, 'long');
    }

    // Project - Description.
    if (Object.keys(projectDescription).length > 0) {
      project.description = projectDescription;
    } else {
      Reflect.deleteProperty(project, 'description');
    }

    // Project - Keywords.
    if (projectKeywordsInput !== undefined && projectKeywordsInput.length > 0) {
      project.keywords = projectKeywordsInput;
    } else {
      Reflect.deleteProperty(project, 'keywords');
    }

    // Project - Legal name.
    const legalNameOutput: CliUtilityInitializePromptProjectLegalNameOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectLegalNameOutputKey, CliUtilityInitializePromptProjectLegalNameOutputResult>({
      type: 'text',
      name: 'projectLegalName',
      message: 'Legal name (for licenses and copyright notices)',
      initial: (typeof existingProjectLegalName === 'string') ? existingProjectLegalName : '',
    });

    if (legalNameOutput['cancelled'] === true) {
      return 'back';
    }

    const projectLegalNameInput: CliUtilityInitializePromptProjectProjectLegalNameInput = CliUtilityInitialize.normalizeText(legalNameOutput['result'].projectLegalName, Infinity)['sanitized'];

    if (projectLegalNameInput !== undefined) {
      project.legalName = projectLegalNameInput;
    } else {
      Reflect.deleteProperty(project, 'legalName');
    }

    // Project - Pronouns.
    const pronounsOutput: CliUtilityInitializePromptProjectPronounsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectPronounsOutputKey, CliUtilityInitializePromptProjectPronounsOutputResult>({
      type: 'select',
      name: 'projectPronouns',
      message: 'Pronouns',
      choices: [
        {
          title: 'Business (we/us/our)',
          value: 'business',
        },
        {
          title: 'Personal (I/me/my)',
          value: 'personal',
        },
      ],
      initial: (existingProjectPronouns === 'personal') ? 1 : 0,
    });

    if (pronounsOutput['cancelled'] === true) {
      return 'back';
    }

    const projectPronounsInput: CliUtilityInitializePromptProjectProjectPronounsInput = pronounsOutput['result'].projectPronouns;

    if (projectPronounsInput !== undefined) {
      project.pronouns = projectPronounsInput;
    } else {
      Reflect.deleteProperty(project, 'pronouns');
    }

    // Project - Platforms.
    const platformChoices: CliUtilityInitializePromptProjectPlatformChoices = [
      {
        title: 'Node.js',
        value: 'nodejs',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('nodejs') === true,
      },
      {
        title: 'Swift',
        value: 'swift',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('swift') === true,
      },
      {
        title: 'Android',
        value: 'android',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('android') === true,
      },
      {
        title: 'Java',
        value: 'java',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('java') === true,
      },
      {
        title: 'Kotlin',
        value: 'kotlin',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('kotlin') === true,
      },
      {
        title: 'C#',
        value: 'csharp',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('csharp') === true,
      },
      {
        title: 'PHP',
        value: 'php',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('php') === true,
      },
      {
        title: 'Python',
        value: 'python',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('python') === true,
      },
      {
        title: 'macOS',
        value: 'macos',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('macos') === true,
      },
      {
        title: 'Linux',
        value: 'linux',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('linux') === true,
      },
      {
        title: 'Windows',
        value: 'windows',
        selected: existingProjectPlatforms !== undefined && existingProjectPlatforms.includes('windows') === true,
      },
    ];

    const platformsOutput: CliUtilityInitializePromptProjectPlatformsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectPlatformsOutputKey, CliUtilityInitializePromptProjectPlatformsOutputResult>({
      type: 'multiselect',
      name: 'projectPlatforms',
      message: 'Supported platforms',
      choices: platformChoices,
    });

    if (platformsOutput['cancelled'] === true) {
      return 'back';
    }

    const projectPlatformsInput: CliUtilityInitializePromptProjectProjectPlatformsInput = platformsOutput['result'].projectPlatforms;

    if (Array.isArray(projectPlatformsInput) === true && projectPlatformsInput.length > 0) {
      project.platforms = projectPlatformsInput;
    } else {
      Reflect.deleteProperty(project, 'platforms');
    }

    // Project - Starting year.
    const startingYearOutput: CliUtilityInitializePromptProjectStartingYearOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectStartingYearOutputKey, CliUtilityInitializePromptProjectStartingYearOutputResult>({
      type: 'text',
      name: 'projectStartingYear',
      message: 'Starting year (e.g. 2025)',
      initial: (existingProjectStartingYear !== undefined) ? String(existingProjectStartingYear) : '',
      validate: (value: CliUtilityInitializePromptProjectValidateValue) => {
        const trimmed: CliUtilityInitializePromptProjectTrimmed = String(value ?? '').trim();

        if (trimmed === '') {
          return true;
        }

        const parsed: CliUtilityInitializePromptProjectParsed = Number(trimmed);

        if (
          Number.isNaN(parsed) === true
          || Number.isInteger(parsed) === false
          || parsed < 1970
        ) {
          return 'Must be an integer >= 1970';
        }

        return true;
      },
    });

    if (startingYearOutput['cancelled'] === true) {
      return 'back';
    }

    const startingYearRaw: CliUtilityInitializePromptProjectStartingYearRaw = String(startingYearOutput['result'].projectStartingYear ?? '').trim();
    const startingYearParsed: CliUtilityInitializePromptProjectStartingYearParsed = (startingYearRaw !== '') ? Number(startingYearRaw) : undefined;

    if (
      startingYearParsed !== undefined
      && Number.isInteger(startingYearParsed) === true
      && startingYearParsed >= 1970
    ) {
      project.startingYear = startingYearParsed;
    } else {
      Reflect.deleteProperty(project, 'startingYear');
    }

    // Project - License.
    const licenseChoices: CliUtilityInitializePromptProjectLicenseChoices = [
      {
        title: 'MIT License',
        value: 'MIT',
      },
      {
        title: 'Apache License 2.0',
        value: 'Apache-2.0',
      },
      {
        title: 'GNU General Public License v3.0',
        value: 'GPL-3.0',
      },
      {
        title: 'GNU General Public License v2.0',
        value: 'GPL-2.0',
      },
      {
        title: 'GNU Affero General Public License v3.0',
        value: 'AGPL-3.0',
      },
      {
        title: 'GNU Lesser General Public License v2.1',
        value: 'LGPL-2.1',
      },
      {
        title: 'BSD 2-Clause "Simplified" License',
        value: 'BSD-2-Clause',
      },
      {
        title: 'BSD 3-Clause "New" or "Revised" License',
        value: 'BSD-3-Clause',
      },
      {
        title: 'Boost Software License 1.0',
        value: 'BSL-1.0',
      },
      {
        title: 'Creative Commons Zero v1.0 Universal',
        value: 'CC0-1.0',
      },
      {
        title: 'Eclipse Public License 2.0',
        value: 'EPL-2.0',
      },
      {
        title: 'Mozilla Public License 2.0',
        value: 'MPL-2.0',
      },
      {
        title: 'Proprietary (All Rights Reserved)',
        value: 'Proprietary',
      },
      {
        title: 'The Unlicense',
        value: 'Unlicense',
      },
    ];

    const licenseInitialIndex: CliUtilityInitializePromptProjectLicenseInitialIndex = licenseChoices.findIndex((choice) => choice['value'] === existingProjectLicense);

    const licenseOutput: CliUtilityInitializePromptProjectLicenseOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptProjectLicenseOutputKey, CliUtilityInitializePromptProjectLicenseOutputResult>({
      type: 'select',
      name: 'projectLicense',
      message: 'License',
      choices: licenseChoices,
      initial: (licenseInitialIndex !== -1) ? licenseInitialIndex : 0,
    });

    if (licenseOutput['cancelled'] === true) {
      return 'back';
    }

    const projectLicenseInput: CliUtilityInitializePromptProjectProjectLicenseInput = licenseOutput['result'].projectLicense;

    if (projectLicenseInput !== undefined) {
      project.license = projectLicenseInput;
    } else {
      Reflect.deleteProperty(project, 'license');
    }

    // Project.
    if (Object.keys(project).length > 0) {
      Object.assign(config, { project });
    } else {
      Reflect.deleteProperty(config, 'project');
    }

    const previousSlug: CliUtilityInitializePromptProjectPreviousSlug = (existingProjectName !== undefined) ? existingProjectName['slug'] ?? '' : '';
    const currentSlug: CliUtilityInitializePromptProjectCurrentSlug = (config['project'] !== undefined && config['project']['name'] !== undefined) ? config['project']['name']['slug'] ?? '' : '';
    const slugChanged: CliUtilityInitializePromptProjectSlugChanged = previousSlug !== currentSlug;

    // Automatically update workspace names for specific roles that use the project slug.
    if (slugChanged === true && config['workspaces'] !== undefined) {
      const rolesToSync: CliUtilityInitializePromptProjectRolesToSync = [...libItemSyncRoles];
      const slugPrefix: CliUtilityInitializePromptProjectSlugPrefix = new RegExp(`^${previousSlug}-`);

      const previousLabel: CliUtilityInitializePromptProjectPreviousLabel = (previousSlug !== '') ? previousSlug : '(unset)';
      const currentLabel: CliUtilityInitializePromptProjectCurrentLabel = (currentSlug !== '') ? currentSlug : '(unset)';

      Logger.customize({
        name: 'CliUtilityInitialize.promptProject',
        purpose: 'updated',
        padTop: 1,
      }).info(`Project slug updated from "${previousLabel}" to "${currentLabel}".`);

      for (const workspace of Object.values(config['workspaces'])) {
        if (rolesToSync.includes(workspace['role']) === false) {
          continue;
        }

        const name: CliUtilityInitializePromptProjectName2 = workspace['name'];

        // If user added a slug, removed the slug, or changed the slug.
        if (previousSlug === '' && currentSlug !== '') {
          workspace.name = `${currentSlug}-${name}`;
        } else if (previousSlug !== '' && currentSlug === '') {
          workspace.name = name.replace(slugPrefix, '');
        } else {
          workspace.name = name.replace(slugPrefix, `${currentSlug}-`);
        }

        Logger.customize({
          name: 'CliUtilityInitialize.promptProject',
          purpose: 'updated',
        }).info(`Workspace name updated from "${name}" to "${workspace['name']}".`);
      }
    }

    Logger.customize({
      name: 'CliUtilityInitialize.promptProject',
      purpose: 'updated',
      padTop: (slugChanged === true && config['workspaces'] !== undefined) ? 0 : 1,
      padBottom: 1,
    }).info('Project details updated.');

    return 'back';
  }

  /**
   * CLI - Utility - Initialize - Prompt Entities.
   *
   * CRUD menu for the entities array in
   * nova.config.json. Each entity holds a name, email,
   * URL, and role list used by sync recipes.
   *
   * @param {CliUtilityInitializePromptEntitiesConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptEntitiesReturns}
   *
   * @since 0.11.0
   */
  private static async promptEntities(config: CliUtilityInitializePromptEntitiesConfig): CliUtilityInitializePromptEntitiesReturns {
    const entities: CliUtilityInitializePromptEntitiesEntities = [];

    // Populate the entities from config.
    if (Array.isArray(config['entities']) === true) {
      for (const configEntity of config['entities']) {
        const clonedEntity: CliUtilityInitializePromptEntitiesClonedEntity = { ...configEntity };

        // Entities - Roles.
        if (Array.isArray(configEntity['roles']) === true) {
          clonedEntity.roles = [...configEntity['roles']];
        } else {
          Reflect.deleteProperty(clonedEntity, 'roles');
        }

        entities.push(clonedEntity);
      }
    }

    /**
     * CLI - Utility - Initialize - Prompt Entities - Sync.
     *
     * Flushes the local entities array back into the config object after every add, edit, or
     * remove action so partial changes are not lost.
     *
     * @returns {CliUtilityInitializePromptEntitiesSyncReturns}
     *
     * @since 0.11.0
     */
    const sync: CliUtilityInitializePromptEntitiesSync = (): CliUtilityInitializePromptEntitiesSyncReturns => {
      if (entities.length > 0) {
        // Entities.
        const normalizedEntities: CliUtilityInitializePromptEntitiesNormalizedEntities = entities.map((entity) => {
          const normalizedEntity: CliUtilityInitializePromptEntitiesNormalizedEntity = { ...entity };

          // Entities - Roles.
          if (Array.isArray(entity['roles']) === true && entity['roles'].length > 0) {
            normalizedEntity.roles = [...entity['roles']];
          } else {
            Reflect.deleteProperty(normalizedEntity, 'roles');
          }

          return normalizedEntity;
        });

        Object.assign(config, { entities: normalizedEntities });
      } else {
        Reflect.deleteProperty(config, 'entities');
      }

      return;
    };

    while (true) {
      entities.sort((a, b) => {
        const nameA: CliUtilityInitializePromptEntitiesSortNameA = (a !== undefined && a['name'] !== undefined) ? a['name'] : '';
        const nameB: CliUtilityInitializePromptEntitiesSortNameB = (b !== undefined && b['name'] !== undefined) ? b['name'] : '';

        return nameA.localeCompare(nameB);
      });

      const choices: CliUtilityInitializePromptEntitiesChoices = [];

      // Add the "EDIT" and "REMOVE" menu choices for each entity.
      for (let i = 0; i < entities.length; i += 1) {
        const entity: CliUtilityInitializePromptEntitiesEntity = entities[i];

        if (entity === undefined) {
          continue;
        }

        const entityName: CliUtilityInitializePromptEntitiesEntityName = (entity['name'] !== undefined) ? entity['name'].trim() : '';
        const entityEmail: CliUtilityInitializePromptEntitiesEntityEmail = (entity['email'] !== undefined) ? entity['email'].trim() : '';
        const entityRoles: CliUtilityInitializePromptEntitiesEntityRoles = (Array.isArray(entity['roles']) === true) ? entity['roles'].filter((role) => role.trim() !== '') : [];

        let label: CliUtilityInitializePromptEntitiesLabel = `Entity ${i + 1}`;

        if (entityName !== '') {
          label = entityName;
        } else if (entityEmail !== '') {
          label = entityEmail;
        }

        const descriptionParts: CliUtilityInitializePromptEntitiesDescriptionParts = [];

        // Add "email" to menu description for each entity.
        if (entityEmail !== '') {
          descriptionParts.push(entityEmail);
        }

        // Add "roles" to menu description for each entity.
        if (entityRoles.length > 0) {
          const normalizedRoles: CliUtilityInitializePromptEntitiesNormalizedRoles = entityRoles
            .map((entityRole) => entityRole.trim())
            .filter((entityRole) => entityRole.length > 0)
            .reduce<CliUtilityInitializePromptEntitiesNormalizedRolesReduce>((unique, entityRole) => {
              if (unique.includes(entityRole) === false) {
                unique.push(entityRole);
              }
              return unique;
            }, []);

          if (normalizedRoles.length > 0) {
            const joinedRoles: CliUtilityInitializePromptEntitiesJoinedRoles = normalizedRoles.join(', ');

            descriptionParts.push(joinedRoles);
          }
        }

        const description: CliUtilityInitializePromptEntitiesDescription = descriptionParts.join(' · ');

        choices.push({
          title: `${chalk.yellow.bold('[EDIT]')} ${label}`,
          description: (description !== '') ? description : 'Update this entity.',
          value: {
            kind: 'edit',
            index: i,
          },
        });

        choices.push({
          title: `${chalk.red.bold('[REMOVE]')} ${label}`,
          description: 'Delete this entity.',
          value: {
            kind: 'remove',
            index: i,
          },
        });
      }

      choices.push({
        title: 'Add new entity',
        description: 'Create a new entity.',
        value: {
          kind: 'add',
        },
      });

      choices.push({
        title: 'Back',
        description: 'Return to the category selection.',
        value: {
          kind: 'back',
        },
      });

      const menuOutput: CliUtilityInitializePromptEntitiesMenuOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptEntitiesMenuOutputKey, CliUtilityInitializePromptEntitiesMenuOutputResult>({
        type: 'select',
        name: 'action',
        message: (entities.length > 0) ? 'Select an entity to manage.' : 'No entities found. Choose an option.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const menuOutputResult: CliUtilityInitializePromptEntitiesMenuOutputResultValue = menuOutput['result'];

      // If user wants to go back to the main menu.
      if (
        menuOutputResult.action === undefined
        || menuOutputResult.action['kind'] === 'back'
      ) {
        // Sync changes back to config.
        sync();

        return 'back';
      }

      // If user wants to add an entity.
      if (menuOutputResult.action['kind'] === 'add') {
        const result: CliUtilityInitializePromptEntitiesResult = await CliUtilityInitialize.promptEntitiesForm(undefined, 'create');

        if (result['action'] === 'back') {
          continue;
        }

        // Add a new entity.
        entities.push(result['entity']);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptEntities',
          purpose: 'add',
          padTop: 1,
          padBottom: 1,
        }).info('Added new entity.');

        continue;
      }

      // If user wants to edit an entity.
      if (menuOutputResult.action['kind'] === 'edit') {
        const entityIndex: CliUtilityInitializePromptEntitiesEntityIndex = menuOutputResult.action['index'];

        // If entity index was out-of-bounds.
        if (entityIndex < 0 || entityIndex >= entities.length) {
          continue;
        }

        const entityToEdit: CliUtilityInitializePromptEntitiesEntityToEdit = entities[entityIndex];

        const entityResult: CliUtilityInitializePromptEntitiesEntityResult = await CliUtilityInitialize.promptEntitiesForm(entityToEdit, 'update');

        if (entityResult['action'] === 'back') {
          continue;
        }

        // Update the entity.
        Reflect.set(entities, entityIndex, entityResult['entity']);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptEntities',
          purpose: 'edit',
          padTop: 1,
          padBottom: 1,
        }).info('Updated entity.');

        continue;
      }

      // If user wants to remove an entity.
      if (menuOutputResult.action['kind'] === 'remove') {
        const entityIndex: CliUtilityInitializePromptEntitiesEntityIndex = menuOutputResult.action['index'];

        // If entity index was out-of-bounds.
        if (entityIndex < 0 || entityIndex >= entities.length) {
          continue;
        }

        const entityToRemove: CliUtilityInitializePromptEntitiesEntityToRemove = entities[entityIndex];

        // If entity to remove does not exist.
        if (entityToRemove === undefined) {
          continue;
        }

        const entityName: CliUtilityInitializePromptEntitiesEntityName = (typeof entityToRemove['name'] === 'string') ? entityToRemove['name'].trim() : '';
        const entityEmail: CliUtilityInitializePromptEntitiesEntityEmail = (typeof entityToRemove['email'] === 'string') ? entityToRemove['email'].trim() : '';
        let entityLabel: CliUtilityInitializePromptEntitiesEntityLabel = `Entity ${entityIndex + 1}`;

        if (entityName !== '') {
          entityLabel = entityName;
        } else if (entityEmail !== '') {
          entityLabel = entityEmail;
        }

        const shouldRemove: CliUtilityInitializePromptEntitiesShouldRemove = await CliUtilityInitialize.promptEntitiesDeleteForm(entityLabel);

        if (shouldRemove !== true) {
          continue;
        }

        // Delete the entity.
        entities.splice(entityIndex, 1);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptEntities',
          purpose: 'remove',
          padTop: 1,
          padBottom: 1,
        }).info('Removed entity.');
      }
    }
  }

  /**
   * CLI - Utility - Initialize - Prompt Entities Form.
   *
   * Shared form for both creating and editing an entity. Prompts for name, email, website, and
   * roles, then returns the assembled entity or back.
   *
   * @param {CliUtilityInitializePromptEntitiesFormEntity} entity - Entity.
   * @param {CliUtilityInitializePromptEntitiesFormMode}   mode   - Mode.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptEntitiesFormReturns}
   *
   * @since 0.11.0
   */
  private static async promptEntitiesForm(entity: CliUtilityInitializePromptEntitiesFormEntity, mode: CliUtilityInitializePromptEntitiesFormMode): CliUtilityInitializePromptEntitiesFormReturns {
    const validRoles: CliUtilityInitializePromptEntitiesFormValidRoles = [...libItemValidEntityRoles] as CliUtilityInitializePromptEntitiesFormValidRoles;

    const existingName: CliUtilityInitializePromptEntitiesFormExistingName = (entity !== undefined && typeof entity['name'] === 'string') ? entity['name'] : '';
    const existingEmail: CliUtilityInitializePromptEntitiesFormExistingEmail = (entity !== undefined && typeof entity['email'] === 'string') ? entity['email'] : '';
    const existingUrl: CliUtilityInitializePromptEntitiesFormExistingUrl = (entity !== undefined && typeof entity['url'] === 'string') ? entity['url'] : '';

    let existingRoles: CliUtilityInitializePromptEntitiesFormExistingRoles = [];

    // If roles exist inside the entity, add it in.
    if (entity !== undefined && Array.isArray(entity['roles']) === true) {
      existingRoles = entity['roles'].filter((role) => validRoles.includes(role));
    }

    const questionsOutput: CliUtilityInitializePromptEntitiesFormQuestionsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey, CliUtilityInitializePromptEntitiesFormQuestionsOutputValue<CliUtilityInitializePromptEntitiesFormQuestionsOutputKey>>([
      {
        type: 'text',
        name: 'entityName',
        message: 'Entity name',
        initial: existingName,
        validate: (value: CliUtilityInitializePromptEntitiesFormValidateValue) => CliUtilityInitialize.normalizeText(value, Infinity)['result'],
      },
      {
        type: 'text',
        name: 'entityEmail',
        message: 'Entity email address',
        initial: existingEmail,
        validate: (value: CliUtilityInitializePromptEntitiesFormValidateValue) => CliUtilityInitialize.normalizeEmail(value)['result'],
      },
      {
        type: 'text',
        name: 'entityUrl',
        message: 'Entity website',
        initial: existingUrl,
        validate: (value: CliUtilityInitializePromptEntitiesFormValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'multiselect',
        name: 'entityRoles',
        message: 'Entity roles',
        choices: validRoles.map((validRole) => ({
          title: `${validRole.charAt(0).toUpperCase()}${validRole.slice(1)}`,
          value: validRole,
          selected: existingRoles.includes(validRole),
        })),
      },
    ]);

    if (questionsOutput['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const questionsOutputResult: CliUtilityInitializePromptEntitiesFormQuestionsOutputResult = questionsOutput['result'];

    const entityNameInput: CliUtilityInitializePromptEntitiesFormEntityNameInput = CliUtilityInitialize.normalizeText(questionsOutputResult.entityName, Infinity)['sanitized'];
    const entityEmailInput: CliUtilityInitializePromptEntitiesFormEntityEmailInput = CliUtilityInitialize.normalizeEmail(questionsOutputResult.entityEmail)['sanitized'];
    const entityUrlInput: CliUtilityInitializePromptEntitiesFormEntityUrlInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.entityUrl, 'generic')['sanitized'];
    const entityRolesInput: CliUtilityInitializePromptEntitiesFormEntityRolesInput = (Array.isArray(questionsOutputResult.entityRoles) === true) ? [...questionsOutputResult.entityRoles] : [];

    const resolvedEntity: CliUtilityInitializePromptEntitiesFormResolvedEntity = {};

    // Entity - Name.
    if (entityNameInput !== undefined) {
      resolvedEntity.name = entityNameInput;
    }

    // Entity - Email.
    if (entityEmailInput !== undefined) {
      resolvedEntity.email = entityEmailInput;
    }

    // Entity - Url.
    if (entityUrlInput !== undefined) {
      resolvedEntity.url = entityUrlInput;
    }

    // Entity - Roles.
    if (entityRolesInput.length > 0) {
      resolvedEntity.roles = entityRolesInput;
    }

    // Prevents empty entities from being created.
    if (mode === 'create' && Object.keys(resolvedEntity).length < 1) {
      return {
        action: 'back',
      };
    }

    return {
      action: 'apply',
      entity: resolvedEntity,
    };
  }

  /**
   * CLI - Utility - Initialize - Prompt Entities Delete Form.
   *
   * Displays a yes/no confirmation before removing an entity. Called by promptEntities when
   * the user selects a REMOVE action from the entity menu.
   *
   * @param {CliUtilityInitializePromptEntitiesDeleteFormLabel} label - Label.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptEntitiesDeleteFormReturns}
   *
   * @since 0.11.0
   */
  private static async promptEntitiesDeleteForm(label: CliUtilityInitializePromptEntitiesDeleteFormLabel): CliUtilityInitializePromptEntitiesDeleteFormReturns {
    const confirmOutput: CliUtilityInitializePromptEntitiesDeleteFormConfirmOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey, CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue>({
      type: 'confirm',
      name: 'confirm',
      message: `Remove entity "${label}"?`,
      initial: false,
    });

    if (confirmOutput['cancelled'] === true) {
      return false;
    }

    const confirmOutputResult: CliUtilityInitializePromptEntitiesDeleteFormConfirmOutputResult = confirmOutput['result'];

    return confirmOutputResult.confirm;
  }

  /**
   * CLI - Utility - Initialize - Prompt Emails.
   *
   * Collects project-level email addresses such as the issue tracker email. Values are written
   * into the config emails section for sync.
   *
   * @param {CliUtilityInitializePromptEmailsConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptEmailsReturns}
   *
   * @since 0.11.0
   */
  private static async promptEmails(config: CliUtilityInitializePromptEmailsConfig): CliUtilityInitializePromptEmailsReturns {
    const existingEmails: CliUtilityInitializePromptEmailsExistingEmails = config['emails'];

    const emails: CliUtilityInitializePromptEmailsEmails = (existingEmails !== undefined) ? { ...existingEmails } : {};

    const questionsOutput: CliUtilityInitializePromptEmailsQuestionsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptEmailsQuestionsOutputKey, CliUtilityInitializePromptEmailsQuestionsOutputValue>([{
      type: 'text',
      name: 'emailsBugs',
      message: 'Issue tracker email',
      initial: emails['bugs'] ?? '',
      validate: (value: CliUtilityInitializePromptEmailsValidateValue) => CliUtilityInitialize.normalizeEmail(value)['result'],
    }]);

    if (questionsOutput['cancelled'] === true) {
      return 'back';
    }

    const questionsOutputResult: CliUtilityInitializePromptEmailsQuestionsOutputResult = questionsOutput['result'];

    const emailsBugsInput: CliUtilityInitializePromptEmailsEmailsBugsInput = CliUtilityInitialize.normalizeEmail(questionsOutputResult.emailsBugs)['sanitized'];

    // Emails - Bugs.
    if (emailsBugsInput !== undefined) {
      emails.bugs = emailsBugsInput;
    } else {
      Reflect.deleteProperty(emails, 'bugs');
    }

    // Emails.
    if (Object.keys(emails).length > 0) {
      Object.assign(config, { emails });
    } else {
      Reflect.deleteProperty(config, 'emails');
    }

    Logger.customize({
      name: 'CliUtilityInitialize.promptEmails',
      purpose: 'updated',
      padTop: 1,
      padBottom: 1,
    }).info('Email references updated.');

    return 'back';
  }

  /**
   * CLI - Utility - Initialize - Prompt URLs.
   *
   * Collects all project URLs including homepage,
   * repository, bugs, license, logo, docs, GitHub, npm,
   * Docker, funding, privacy, and terms.
   *
   * @param {CliUtilityInitializePromptUrlsConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptUrlsReturns}
   *
   * @since 0.11.0
   */
  private static async promptUrls(config: CliUtilityInitializePromptUrlsConfig): CliUtilityInitializePromptUrlsReturns {
    const existingUrls: CliUtilityInitializePromptUrlsExistingUrls = config['urls'];

    const urls: CliUtilityInitializePromptUrlsUrls = (existingUrls !== undefined) ? { ...existingUrls } : {};

    const questionsOutput: CliUtilityInitializePromptUrlsQuestionsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptUrlsQuestionsOutputKey, CliUtilityInitializePromptUrlsQuestionsOutputValue>([
      {
        type: 'text',
        name: 'urlsHomepage',
        message: 'Homepage URL',
        initial: urls['homepage'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsRepository',
        message: 'Repository URL',
        initial: urls['repository'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'repository')['result'],
      },
      {
        type: 'text',
        name: 'urlsBugs',
        message: 'Issue tracker URL',
        initial: urls['bugs'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsLicense',
        message: 'License URL',
        initial: urls['license'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsLogo',
        message: 'Logo URL',
        initial: urls['logo'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsDocumentation',
        message: 'Documentation URL',
        initial: urls['documentation'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsGithub',
        message: 'GitHub URL',
        initial: urls['github'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsNpm',
        message: 'npm package URL',
        initial: urls['npm'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsDocker',
        message: 'Docker Hub URL',
        initial: urls['docker'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsFundSources',
        message: 'Funding URLs (comma separated)',
        initial: (Array.isArray(urls['fundSources']) === true) ? urls['fundSources'].join(', ') : '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrlArray(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsPrivacyPolicy',
        message: 'Privacy policy URL',
        initial: urls['privacyPolicy'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
      {
        type: 'text',
        name: 'urlsTermsOfUse',
        message: 'Terms of use URL',
        initial: urls['termsOfUse'] ?? '',
        validate: (value: CliUtilityInitializePromptUrlsValidateValue) => CliUtilityInitialize.normalizeUrl(value, 'generic')['result'],
      },
    ]);

    if (questionsOutput['cancelled'] === true) {
      return 'back';
    }

    const questionsOutputResult: CliUtilityInitializePromptUrlsQuestionsOutputResult = questionsOutput['result'];

    const urlsHomepageInput: CliUtilityInitializePromptUrlsUrlsHomepageInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsHomepage, 'generic')['sanitized'];
    const urlsRepositoryInput: CliUtilityInitializePromptUrlsUrlsRepositoryInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsRepository, 'repository')['sanitized'];
    const urlsBugsInput: CliUtilityInitializePromptUrlsUrlsBugsInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsBugs, 'generic')['sanitized'];
    const urlsLicenseInput: CliUtilityInitializePromptUrlsUrlsLicenseInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsLicense, 'generic')['sanitized'];
    const urlsLogoInput: CliUtilityInitializePromptUrlsUrlsLogoInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsLogo, 'generic')['sanitized'];
    const urlsDocumentationInput: CliUtilityInitializePromptUrlsUrlsDocumentationInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsDocumentation, 'generic')['sanitized'];
    const urlsGithubInput: CliUtilityInitializePromptUrlsUrlsGithubInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsGithub, 'generic')['sanitized'];
    const urlsNpmInput: CliUtilityInitializePromptUrlsUrlsNpmInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsNpm, 'generic')['sanitized'];
    const urlsDockerInput: CliUtilityInitializePromptUrlsUrlsDockerInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsDocker, 'generic')['sanitized'];
    const urlsFundSourcesInput: CliUtilityInitializePromptUrlsUrlsFundSourcesInput = CliUtilityInitialize.normalizeUrlArray(questionsOutputResult.urlsFundSources, 'generic')['sanitized'];
    const urlsPrivacyPolicyInput: CliUtilityInitializePromptUrlsUrlsPrivacyPolicyInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsPrivacyPolicy, 'generic')['sanitized'];
    const urlsTermsOfUseInput: CliUtilityInitializePromptUrlsUrlsTermsOfUseInput = CliUtilityInitialize.normalizeUrl(questionsOutputResult.urlsTermsOfUse, 'generic')['sanitized'];

    // URLs - Homepage.
    if (urlsHomepageInput !== undefined) {
      urls.homepage = urlsHomepageInput;
    } else {
      Reflect.deleteProperty(urls, 'homepage');
    }

    // URLs - Repository.
    if (urlsRepositoryInput !== undefined) {
      urls.repository = urlsRepositoryInput;
    } else {
      Reflect.deleteProperty(urls, 'repository');
    }

    // URLs - Bugs.
    if (urlsBugsInput !== undefined) {
      urls.bugs = urlsBugsInput;
    } else {
      Reflect.deleteProperty(urls, 'bugs');
    }

    // URLs - License.
    if (urlsLicenseInput !== undefined) {
      urls.license = urlsLicenseInput;
    } else {
      Reflect.deleteProperty(urls, 'license');
    }

    // URLs - Logo.
    if (urlsLogoInput !== undefined) {
      urls.logo = urlsLogoInput;
    } else {
      Reflect.deleteProperty(urls, 'logo');
    }

    // URLs - Documentation.
    if (urlsDocumentationInput !== undefined) {
      urls.documentation = urlsDocumentationInput;
    } else {
      Reflect.deleteProperty(urls, 'documentation');
    }

    // URLs - Github.
    if (urlsGithubInput !== undefined) {
      urls.github = urlsGithubInput;
    } else {
      Reflect.deleteProperty(urls, 'github');
    }

    // URLs - Npm.
    if (urlsNpmInput !== undefined) {
      urls.npm = urlsNpmInput;
    } else {
      Reflect.deleteProperty(urls, 'npm');
    }

    // URLs - Docker.
    if (urlsDockerInput !== undefined) {
      urls.docker = urlsDockerInput;
    } else {
      Reflect.deleteProperty(urls, 'docker');
    }

    // URLs - Fund sources.
    if (urlsFundSourcesInput !== undefined) {
      urls.fundSources = urlsFundSourcesInput;
    } else {
      Reflect.deleteProperty(urls, 'fundSources');
    }

    // URLs - Privacy policy.
    if (urlsPrivacyPolicyInput !== undefined) {
      urls.privacyPolicy = urlsPrivacyPolicyInput;
    } else {
      Reflect.deleteProperty(urls, 'privacyPolicy');
    }

    // URLs - Terms of use.
    if (urlsTermsOfUseInput !== undefined) {
      urls.termsOfUse = urlsTermsOfUseInput;
    } else {
      Reflect.deleteProperty(urls, 'termsOfUse');
    }

    // URLs.
    if (Object.keys(urls).length > 0) {
      Object.assign(config, { urls });
    } else {
      Reflect.deleteProperty(config, 'urls');
    }

    Logger.customize({
      name: 'CliUtilityInitialize.promptUrls',
      purpose: 'updated',
      padTop: 1,
      padBottom: 1,
    }).info('URL references updated.');

    return 'back';
  }

  /**
   * CLI - Utility - Initialize - Prompt Workflows.
   *
   * Manages the workflow entries in config via an interactive
   * Add / Edit / Remove / Back menu loop. Each workflow binds
   * a template, suffix, triggers, depends-on, and settings.
   *
   * @param {CliUtilityInitializePromptWorkflowsConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWorkflowsReturns}
   *
   * @since 0.15.0
   */
  private static async promptWorkflows(config: CliUtilityInitializePromptWorkflowsConfig): CliUtilityInitializePromptWorkflowsReturns {
    const workflows: CliUtilityInitializePromptWorkflowsWorkflows = [];

    // Populate the workflows from config.
    if (Array.isArray(config['workflows']) === true) {
      for (const configWorkflow of config['workflows']) {
        const clonedWorkflow: CliUtilityInitializePromptWorkflowsClonedWorkflow = { ...configWorkflow };

        // Workflows - Triggers.
        if (Array.isArray(configWorkflow['triggers']) === true) {
          clonedWorkflow.triggers = [...configWorkflow['triggers']];
        }

        // Workflows - Settings.
        if (configWorkflow['settings'] !== undefined) {
          clonedWorkflow.settings = { ...configWorkflow['settings'] };
        } else {
          Reflect.deleteProperty(clonedWorkflow, 'settings');
        }

        workflows.push(clonedWorkflow);
      }
    }

    /**
     * CLI - Utility - Initialize - Prompt Workflows - Sync.
     *
     * Flushes the local workflows array back into the config object after every add, edit, or
     * remove action so partial changes are not lost.
     *
     * @returns {CliUtilityInitializePromptWorkflowsSyncReturns}
     *
     * @since 0.15.0
     */
    const sync: CliUtilityInitializePromptWorkflowsSync = (): CliUtilityInitializePromptWorkflowsSyncReturns => {
      if (workflows.length > 0) {
        const normalizedWorkflows: CliUtilityInitializePromptWorkflowsWorkflows = workflows.map((workflow) => {
          const normalizedWorkflow: CliUtilityInitializePromptWorkflowsClonedWorkflow = { ...workflow };

          // Workflows - Triggers.
          if (Array.isArray(workflow['triggers']) === true && workflow['triggers'].length > 0) {
            normalizedWorkflow.triggers = [...workflow['triggers']];
          }

          // Workflows - Depends On.
          if (Array.isArray(workflow['depends-on']) === true && workflow['depends-on'].length > 0) {
            Reflect.set(normalizedWorkflow, 'depends-on', [...workflow['depends-on']]);
          } else {
            Reflect.deleteProperty(normalizedWorkflow, 'depends-on');
          }

          // Workflows - Settings.
          if (workflow['settings'] !== undefined && Object.keys(workflow['settings']).length > 0) {
            normalizedWorkflow.settings = { ...workflow['settings'] };
          } else {
            Reflect.deleteProperty(normalizedWorkflow, 'settings');
          }

          return normalizedWorkflow;
        });

        Object.assign(config, { workflows: normalizedWorkflows });
      } else {
        Reflect.deleteProperty(config, 'workflows');
      }

      return;
    };

    while (true) {
      workflows.sort((a, b) => {
        const templateA: CliUtilityInitializePromptWorkflowsSortTemplateA = (a !== undefined && typeof a['template'] === 'string') ? a['template'] : '';
        const templateB: CliUtilityInitializePromptWorkflowsSortTemplateB = (b !== undefined && typeof b['template'] === 'string') ? b['template'] : '';
        const templateCompare: CliUtilityInitializePromptWorkflowsSortTemplateCompare = templateA.localeCompare(templateB);

        if (templateCompare !== 0) {
          return templateCompare;
        }

        const suffixA: CliUtilityInitializePromptWorkflowsSortSuffixA = (a !== undefined && typeof a['suffix'] === 'string') ? a['suffix'] : '';
        const suffixB: CliUtilityInitializePromptWorkflowsSortSuffixB = (b !== undefined && typeof b['suffix'] === 'string') ? b['suffix'] : '';

        return suffixA.localeCompare(suffixB);
      });

      const choices: CliUtilityInitializePromptWorkflowsChoices = [];

      // Add the "EDIT" and "REMOVE" menu choices for each workflow.
      for (let i = 0; i < workflows.length; i += 1) {
        const workflow: CliUtilityInitializePromptWorkflowsMenuWorkflow = workflows[i];

        if (workflow === undefined) {
          continue;
        }

        const template: CliUtilityInitializePromptWorkflowsMenuTemplate = (typeof workflow['template'] === 'string') ? workflow['template'].trim() : '';
        const suffix: CliUtilityInitializePromptWorkflowsMenuSuffix = (typeof workflow['suffix'] === 'string') ? workflow['suffix'].trim() : '';
        const triggers: CliUtilityInitializePromptWorkflowsMenuTriggers = (Array.isArray(workflow['triggers']) === true) ? workflow['triggers'] : [];

        let label: CliUtilityInitializePromptWorkflowsLabel = `Workflow ${i + 1}`;

        if (template !== '' && suffix !== '') {
          label = `${template}-${suffix}`;
        } else if (template !== '') {
          label = template;
        }

        const triggersLabel: CliUtilityInitializePromptWorkflowsTriggersLabel = (triggers.length > 0) ? ` [${triggers.join(', ')}]` : '';
        const outputFileName: CliUtilityInitializePromptWorkflowsOutputFileName = (suffix !== '') ? `nova-${template}-${suffix}.yml` : `nova-${template}.yml`;
        const description: CliUtilityInitializePromptWorkflowsDescription = (template !== '') ? `${outputFileName}${triggersLabel}` : 'Update this workflow.';

        choices.push({
          title: `${chalk.yellow.bold('[EDIT]')} ${label}`,
          description,
          value: {
            kind: 'edit',
            index: i,
          },
        });

        choices.push({
          title: `${chalk.red.bold('[REMOVE]')} ${label}`,
          description: 'Delete this workflow.',
          value: {
            kind: 'remove',
            index: i,
          },
        });
      }

      choices.push({
        title: 'Add new workflow',
        description: 'Create a new workflow.',
        value: {
          kind: 'add',
        },
      });

      choices.push({
        title: 'Back',
        description: 'Return to the category selection.',
        value: {
          kind: 'back',
        },
      });

      const menuOutput: CliUtilityInitializePromptWorkflowsMenuOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsMenuOutputKey, CliUtilityInitializePromptWorkflowsMenuOutputResult>({
        type: 'select',
        name: 'action',
        message: (workflows.length > 0) ? 'Select a workflow to manage.' : 'No workflows found. Choose an option.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const menuOutputResult: CliUtilityInitializePromptWorkflowsMenuOutputResultValue = menuOutput['result'];

      // If user wants to go back to the main menu.
      if (
        menuOutputResult.action === undefined
        || menuOutputResult.action['kind'] === 'back'
      ) {
        // Sync changes back to config.
        sync();

        return 'back';
      }

      // If user wants to add a workflow.
      if (menuOutputResult.action['kind'] === 'add') {
        const result: CliUtilityInitializePromptWorkflowsResult = await CliUtilityInitialize.promptWorkflowsForm(undefined, 'create', workflows, config);

        if (result['action'] === 'back') {
          continue;
        }

        // Add a new workflow.
        workflows.push(result['workflow']);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptWorkflows',
          purpose: 'add',
          padTop: 1,
          padBottom: 1,
        }).info('Added new workflow.');

        continue;
      }

      // If user wants to edit a workflow.
      if (menuOutputResult.action['kind'] === 'edit') {
        const workflowIndex: CliUtilityInitializePromptWorkflowsWorkflowIndex = menuOutputResult.action['index'];

        // If workflow index was out-of-bounds.
        if (workflowIndex < 0 || workflowIndex >= workflows.length) {
          continue;
        }

        const workflowToEdit: CliUtilityInitializePromptWorkflowsWorkflowToEdit = workflows[workflowIndex];

        const workflowResult: CliUtilityInitializePromptWorkflowsResult = await CliUtilityInitialize.promptWorkflowsForm(workflowToEdit, 'update', workflows, config);

        if (workflowResult['action'] === 'back') {
          continue;
        }

        // Update the workflow.
        Reflect.set(workflows, workflowIndex, workflowResult['workflow']);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptWorkflows',
          purpose: 'edit',
          padTop: 1,
          padBottom: 1,
        }).info('Updated workflow.');

        continue;
      }

      // If user wants to remove a workflow.
      if (menuOutputResult.action['kind'] === 'remove') {
        const workflowIndex: CliUtilityInitializePromptWorkflowsWorkflowIndex = menuOutputResult.action['index'];

        // If workflow index was out-of-bounds.
        if (workflowIndex < 0 || workflowIndex >= workflows.length) {
          continue;
        }

        const workflowToRemove: CliUtilityInitializePromptWorkflowsWorkflowToRemove = workflows[workflowIndex];

        // If workflow to remove does not exist.
        if (workflowToRemove === undefined) {
          continue;
        }

        const template: CliUtilityInitializePromptWorkflowsRemoveTemplate = (typeof workflowToRemove['template'] === 'string') ? workflowToRemove['template'].trim() : '';
        const suffix: CliUtilityInitializePromptWorkflowsRemoveSuffix = (typeof workflowToRemove['suffix'] === 'string') ? workflowToRemove['suffix'].trim() : '';
        let workflowLabel: CliUtilityInitializePromptWorkflowsLabel = `Workflow ${workflowIndex + 1}`;

        if (template !== '' && suffix !== '') {
          workflowLabel = `${template}-${suffix}`;
        } else if (template !== '') {
          workflowLabel = template;
        }

        const shouldRemove: CliUtilityInitializePromptWorkflowsShouldRemove = await CliUtilityInitialize.promptWorkflowsDeleteForm(workflowLabel);

        if (shouldRemove !== true) {
          continue;
        }

        // Delete the workflow.
        workflows.splice(workflowIndex, 1);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CliUtilityInitialize.promptWorkflows',
          purpose: 'remove',
          padTop: 1,
          padBottom: 1,
        }).info('Removed workflow.');
      }
    }
  }

  /**
   * CLI - Utility - Initialize - Prompt Workflows Form.
   *
   * Shared form for creating or editing a workflow. Prompts
   * for template, suffix, triggers, depends-on, targets, scopes,
   * and settings, then returns the assembled workflow or back.
   *
   * @param {CliUtilityInitializePromptWorkflowsFormWorkflow}  workflow  - Workflow.
   * @param {CliUtilityInitializePromptWorkflowsFormMode}      mode      - Mode.
   * @param {CliUtilityInitializePromptWorkflowsFormWorkflows} workflows - Workflows.
   * @param {CliUtilityInitializePromptWorkflowsFormConfig}    config    - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWorkflowsFormReturns}
   *
   * @since 0.15.0
   */
  private static async promptWorkflowsForm(workflow: CliUtilityInitializePromptWorkflowsFormWorkflow, mode: CliUtilityInitializePromptWorkflowsFormMode, workflows: CliUtilityInitializePromptWorkflowsFormWorkflows, config: CliUtilityInitializePromptWorkflowsFormConfig): CliUtilityInitializePromptWorkflowsFormReturns {
    const existingTemplate: CliUtilityInitializePromptWorkflowsFormExistingTemplate = (workflow !== undefined && typeof workflow['template'] === 'string') ? workflow['template'] : '';
    const existingSuffix: CliUtilityInitializePromptWorkflowsFormExistingSuffix = (workflow !== undefined && typeof workflow['suffix'] === 'string') ? workflow['suffix'] : '';
    const existingTriggers: CliUtilityInitializePromptWorkflowsFormExistingTriggers = (workflow !== undefined && Array.isArray(workflow['triggers']) === true) ? workflow['triggers'] : [];
    const existingDependsOn: CliUtilityInitializePromptWorkflowsFormExistingDependsOn = (workflow !== undefined && Array.isArray(workflow['depends-on']) === true) ? workflow['depends-on'] : [];
    const existingTargets: CliUtilityInitializePromptWorkflowsFormExistingTargets = (workflow !== undefined && Array.isArray(workflow['targets']) === true) ? workflow['targets'] : [];
    const existingScopes: CliUtilityInitializePromptWorkflowsFormExistingScopes = (workflow !== undefined && Array.isArray(workflow['scopes']) === true) ? workflow['scopes'] : [];

    // Build template choices from metadata.
    const templateChoices: CliUtilityInitializePromptWorkflowsFormTemplateChoices = libWorkflowTemplatesMetadata.map((entry) => ({
      title: entry['name'],
      description: entry['description'],
      value: entry['name'],
    }));

    // Find initial index for pre-selection when editing.
    let templateInitialIndex: CliUtilityInitializePromptWorkflowsFormTemplateInitialIndex = 0;

    if (existingTemplate !== '') {
      const foundIndex: CliUtilityInitializePromptWorkflowsFormFoundIndex = templateChoices.findIndex((choice) => choice['value'] === existingTemplate);

      if (foundIndex >= 0) {
        templateInitialIndex = foundIndex;
      }
    }

    // Prompt for template selection.
    const templateOutput: CliUtilityInitializePromptWorkflowsFormTemplateOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTemplateOutputKey, CliUtilityInitializePromptWorkflowsFormTemplateOutputResult>({
      type: 'select',
      name: 'template',
      message: 'Select a workflow template.',
      choices: templateChoices,
      initial: templateInitialIndex,
    });

    if (templateOutput['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const templateOutputResult: CliUtilityInitializePromptWorkflowsFormTemplateOutputResultValue = templateOutput['result'];
    const selectedTemplate: CliUtilityInitializePromptWorkflowsFormSelectedTemplate = templateOutputResult.template;

    // Prompt for suffix with duplicate validation.
    const suffixOutput: CliUtilityInitializePromptWorkflowsFormSuffixOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormSuffixOutputKey, CliUtilityInitializePromptWorkflowsFormSuffixOutputResult>({
      type: 'text',
      name: 'suffix',
      message: 'Workflow suffix (used in filename and workflow name)',
      initial: existingSuffix,
      validate: (value) => {
        const trimmed: CliUtilityInitializePromptWorkflowsFormSelectedSuffix = (typeof value === 'string') ? value.trim() : '';

        if (trimmed === '') {
          return 'Suffix is required.';
        }

        const compositeKey: CliUtilityInitializePromptWorkflowsFormCompositeKey = `${selectedTemplate}-${trimmed}`;
        const editIndex: CliUtilityInitializePromptWorkflowsFormEditIndex = (workflow !== undefined) ? workflows.indexOf(workflow) : -1;
        const isDuplicate: CliUtilityInitializePromptWorkflowsFormIsDuplicate = workflows.some((w, i) => {
          if (i === editIndex) {
            return false;
          }

          const existingKey: CliUtilityInitializePromptWorkflowsFormCompositeKey = `${w['template']}-${w['suffix'] ?? ''}`;

          return existingKey === compositeKey;
        });

        if (isDuplicate === true) {
          return 'A workflow with this template and suffix already exists.';
        }

        return true;
      },
    });

    if (suffixOutput['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const suffixOutputResult: CliUtilityInitializePromptWorkflowsFormSuffixOutputResultValue = suffixOutput['result'];
    const selectedSuffix: CliUtilityInitializePromptWorkflowsFormSelectedSuffix = (typeof suffixOutputResult.suffix === 'string') ? suffixOutputResult.suffix.trim() : '';

    // Discover available triggers from the template's triggers/ folder.
    const triggersDir: CliUtilityInitializePromptWorkflowsFormTriggersDir = join(resolveTemplatePath(import.meta.url, 'generators/github/workflows'), selectedTemplate, 'triggers');
    const triggersDirExists: CliUtilityInitializePromptWorkflowsFormTriggersDirExists = await pathExists(triggersDir);
    let selectedTriggers: CliUtilityInitializePromptWorkflowsFormSelectedTriggers = [];

    if (triggersDirExists === true) {
      const triggersFiles: CliUtilityInitializePromptWorkflowsFormTriggersFiles = (await fs.readdir(triggersDir)).filter((file) => file.endsWith('.yml'));

      const triggerChoices: CliUtilityInitializePromptWorkflowsFormTriggerChoices = triggersFiles.map((file) => {
        const triggerName: CliUtilityInitializePromptWorkflowsFormTriggerName = file.replace(LIB_REGEX_PATTERN_YML_EXTENSION, '');

        return {
          title: triggerName,
          value: triggerName,
          selected: existingTriggers.includes(triggerName),
        };
      });

      const triggersOutput: CliUtilityInitializePromptWorkflowsFormTriggersOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTriggersOutputKey, CliUtilityInitializePromptWorkflowsFormTriggersOutputResult>({
        type: 'multiselect',
        name: 'triggers',
        message: 'Select triggers for this workflow.',
        choices: triggerChoices,
      });

      if (triggersOutput['cancelled'] === true) {
        return {
          action: 'back',
        };
      }

      const triggersOutputResult: CliUtilityInitializePromptWorkflowsFormTriggersOutputResultValue = triggersOutput['result'];
      selectedTriggers = (Array.isArray(triggersOutputResult.triggers) === true) ? triggersOutputResult.triggers : [];

      // Validate that at most one schedule-* variant was selected.
      const scheduleVariants: CliUtilityInitializePromptWorkflowsFormScheduleVariants = selectedTriggers.filter((trigger) => trigger.startsWith('schedule-'));

      if (scheduleVariants.length > 1) {
        Logger.customize({
          name: 'CliUtilityInitialize.promptWorkflowsForm',
          purpose: 'validation',
          padTop: 1,
          padBottom: 1,
        }).error(`Only one ${chalk.cyan('schedule-*')} trigger may be selected. Please try again.`);

        return {
          action: 'back',
        };
      }
    }

    // Prompt for depends-on if any selected trigger starts with "workflow-run".
    let selectedDependsOn: CliUtilityInitializePromptWorkflowsFormSelectedDependsOn = undefined;

    if (selectedTriggers.some((trigger) => trigger.startsWith('workflow-run')) === true) {
      const dependsOnChoices: CliUtilityInitializePromptWorkflowsFormDependsOnChoices = workflows
        .filter((w) =>
          w !== workflow
          && typeof w['template'] === 'string'
          && w['template'].trim() !== '',
        )
        .map((w) => {
          const compositeKey: CliUtilityInitializePromptWorkflowsFormCompositeKey = (typeof w['suffix'] === 'string' && w['suffix'].trim() !== '') ? `${w['template']}-${w['suffix']}` : w['template'];

          return {
            title: compositeKey,
            value: compositeKey,
            selected: existingDependsOn.includes(compositeKey),
          };
        });

      if (dependsOnChoices.length > 0) {
        const dependsOnOutput: CliUtilityInitializePromptWorkflowsFormDependsOnOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormDependsOnOutputKey, CliUtilityInitializePromptWorkflowsFormDependsOnOutputResult>({
          type: 'multiselect',
          name: 'dependsOn',
          message: 'Select the workflows this depends on.',
          choices: dependsOnChoices,
        });

        if (dependsOnOutput['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const dependsOnOutputResult: CliUtilityInitializePromptWorkflowsFormDependsOnOutputResultValue = dependsOnOutput['result'];
        selectedDependsOn = (Array.isArray(dependsOnOutputResult.dependsOn) === true && dependsOnOutputResult.dependsOn.length > 0) ? dependsOnOutputResult.dependsOn : undefined;
      }
    }

    // Find the matched metadata for the selected template.
    const matchedMetadata: CliUtilityInitializePromptWorkflowsFormMatchedMetadata = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === selectedTemplate);

    // Collect available workspace keys for target and scope prompts.
    const workspaceKeys: CliUtilityInitializePromptWorkflowsFormWorkspaceKeys = Object.keys(config['workspaces'] ?? {});

    // Prompt for targets if the template supports them.
    const selectedTargets: CliUtilityInitializePromptWorkflowsFormSelectedTargets = [...existingTargets];

    if (matchedMetadata !== undefined && matchedMetadata['supportsTargets'] === true) {
      const targetsMetadata: CliUtilityInitializePromptWorkflowsFormTargetsMetadata = matchedMetadata['targets'] ?? {};
      const availableTargetTypes: CliUtilityInitializePromptWorkflowsFormTargetAvailableTypes = Object.keys(targetsMetadata);

      while (true) {
        const targetMenuChoices: CliUtilityInitializePromptWorkflowsFormTargetMenuChoices = [];

        for (let i = 0; i < selectedTargets.length; i += 1) {
          const currentTarget: CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTarget = selectedTargets[i];

          if (currentTarget === undefined) {
            continue;
          }

          const currentTargetType: CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTargetType = currentTarget['type'];
          const currentTargetWorkingDir: CliUtilityInitializePromptWorkflowsFormTargetMenuCurrentTargetWorkingDir = currentTarget['workingDir'];

          targetMenuChoices.push({
            title: `${chalk.yellow.bold('[EDIT]')} ${currentTargetType} → ${currentTargetWorkingDir}`,
            value: {
              kind: 'edit',
              index: i,
            },
          });

          targetMenuChoices.push({
            title: `${chalk.red.bold('[REMOVE]')} ${currentTargetType} → ${currentTargetWorkingDir}`,
            value: {
              kind: 'remove',
              index: i,
            },
          });
        }

        targetMenuChoices.push({
          title: 'Add target',
          value: {
            kind: 'add',
          },
        });

        targetMenuChoices.push({
          title: 'Done',
          value: {
            kind: 'done',
          },
        });

        const targetMenuOutput: CliUtilityInitializePromptWorkflowsFormTargetMenuOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTargetMenuOutputKey, CliUtilityInitializePromptWorkflowsFormTargetMenuOutputResult>({
          type: 'select',
          name: 'targetAction',
          message: (selectedTargets.length > 0) ? 'Select a target to manage.' : 'No targets added yet. Choose an option.',
          choices: targetMenuChoices,
        });

        if (targetMenuOutput['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const targetMenuOutputResult: CliUtilityInitializePromptWorkflowsFormTargetMenuOutputResultValue = targetMenuOutput['result'];
        const targetMenuAction: CliUtilityInitializePromptWorkflowsFormTargetMenuOutputResult = targetMenuOutputResult.targetAction;

        // Done: exit target loop.
        if (targetMenuAction['kind'] === 'done') {
          break;
        }

        // Remove: remove target from list.
        if (targetMenuAction['kind'] === 'remove') {
          const targetToRemoveIndex: CliUtilityInitializePromptWorkflowsFormTargetToRemoveIndex = targetMenuAction['index'];

          if (targetToRemoveIndex >= 0 && targetToRemoveIndex < selectedTargets.length) {
            selectedTargets.splice(targetToRemoveIndex, 1);
          }

          continue;
        }

        // Add or Edit: prompt for type, workingDir, and needs.
        // When editing, the prompts are prefilled with the existing values
        // and the target is replaced in place on apply.
        if (targetMenuAction['kind'] === 'add' || targetMenuAction['kind'] === 'edit') {
          const targetEditIndex: CliUtilityInitializePromptWorkflowsFormTargetEditIndex = (targetMenuAction['kind'] === 'edit') ? targetMenuAction['index'] : -1;
          const targetToEdit: CliUtilityInitializePromptWorkflowsFormTargetToEdit = (targetEditIndex >= 0) ? selectedTargets[targetEditIndex] : undefined;
          const targetTypeInitial: CliUtilityInitializePromptWorkflowsFormTargetTypeInitial = (targetToEdit !== undefined) ? availableTargetTypes.indexOf(targetToEdit['type']) : 0;
          const targetTypeChoices: CliUtilityInitializePromptWorkflowsFormTargetTypeChoices = availableTargetTypes.map((availableTargetType) => ({
            title: availableTargetType,
            value: availableTargetType,
          }));

          const targetTypeOutput: CliUtilityInitializePromptWorkflowsFormTargetTypeOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTargetTypeOutputKey, CliUtilityInitializePromptWorkflowsFormTargetTypeOutputResult>({
            type: 'select',
            name: 'targetType',
            message: 'Select a target type.',
            choices: targetTypeChoices,
            initial: (targetTypeInitial >= 0) ? targetTypeInitial : 0,
          });

          if (targetTypeOutput['cancelled'] === true) {
            continue;
          }

          const targetTypeOutputResult: CliUtilityInitializePromptWorkflowsFormTargetTypeOutputResultValue = targetTypeOutput['result'];
          const selectedTargetType: CliUtilityInitializePromptWorkflowsFormSelectedTargetType = targetTypeOutputResult.targetType;

          const targetWorkingDirInitial: CliUtilityInitializePromptWorkflowsFormTargetWorkingDirInitial = (targetToEdit !== undefined) ? workspaceKeys.indexOf(targetToEdit['workingDir']) : 0;
          const targetWorkingDirChoices: CliUtilityInitializePromptWorkflowsFormTargetWorkingDirChoices = workspaceKeys.map((workspaceKey) => ({
            title: workspaceKey,
            value: workspaceKey,
          }));

          const targetWorkingDirOutput: CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputKey, CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputResult>({
            type: 'select',
            name: 'targetWorkingDir',
            message: 'Select a working directory.',
            choices: targetWorkingDirChoices,
            initial: (targetWorkingDirInitial >= 0) ? targetWorkingDirInitial : 0,
          });

          if (targetWorkingDirOutput['cancelled'] === true) {
            continue;
          }

          const targetWorkingDirOutputResult: CliUtilityInitializePromptWorkflowsFormTargetWorkingDirOutputResultValue = targetWorkingDirOutput['result'];
          const selectedTargetWorkingDir: CliUtilityInitializePromptWorkflowsFormSelectedTargetWorkingDir = targetWorkingDirOutputResult.targetWorkingDir;

          // Validate tuple uniqueness. When editing, exclude the current entry.
          const targetIsDuplicate: CliUtilityInitializePromptWorkflowsFormTargetIsDuplicate = selectedTargets.some((selectedTarget, selectedTargetIndex) => {
            if (selectedTargetIndex === targetEditIndex) {
              return false;
            }

            return selectedTarget['type'] === selectedTargetType && selectedTarget['workingDir'] === selectedTargetWorkingDir;
          });

          if (targetIsDuplicate === true) {
            Logger.customize({
              name: 'CliUtilityInitialize.promptWorkflowsForm',
              purpose: 'validation',
              padTop: 1,
              padBottom: 1,
            }).error(`Target ${chalk.cyan(`${selectedTargetType} → ${selectedTargetWorkingDir}`)} already exists.`);

            continue;
          }

          // Prompt for needs. Offer same-type targets, excluding the one being
          // edited so a target cannot list itself as a prerequisite.
          let selectedTargetNeeds: CliUtilityInitializePromptWorkflowsFormSelectedTargetNeeds = undefined;
          const targetToEditExistingNeeds: CliUtilityInitializePromptWorkflowsFormTargetToEditExistingNeeds = (targetToEdit !== undefined && Array.isArray(targetToEdit['needs']) === true) ? targetToEdit['needs'] : [];
          const targetNeedsChoices: CliUtilityInitializePromptWorkflowsFormTargetNeedsChoices = selectedTargets
            .filter((candidate, candidateIndex) => {
              return candidate['type'] === selectedTargetType
                && candidateIndex !== targetEditIndex
                && candidate['workingDir'] !== selectedTargetWorkingDir;
            })
            .map((candidate) => ({
              title: candidate['workingDir'],
              value: candidate['workingDir'],
              selected: targetToEditExistingNeeds.includes(candidate['workingDir']),
            }));

          if (targetNeedsChoices.length > 0) {
            const targetNeedsOutput: CliUtilityInitializePromptWorkflowsFormTargetNeedsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputKey, CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputResult>({
              type: 'multiselect',
              name: 'targetNeeds',
              message: 'Select targets this must wait for before publishing (optional).',
              choices: targetNeedsChoices,
            });

            if (targetNeedsOutput['cancelled'] === true) {
              continue;
            }

            const targetNeedsOutputResult: CliUtilityInitializePromptWorkflowsFormTargetNeedsOutputResultValue = targetNeedsOutput['result'];

            selectedTargetNeeds = (Array.isArray(targetNeedsOutputResult.targetNeeds) === true && targetNeedsOutputResult.targetNeeds.length > 0) ? targetNeedsOutputResult.targetNeeds : undefined;
          }

          const newTarget: CliUtilityInitializePromptWorkflowsFormTargetEntry = {
            type: selectedTargetType,
            workingDir: selectedTargetWorkingDir,
          };

          if (selectedTargetNeeds !== undefined) {
            Reflect.set(newTarget, 'needs', selectedTargetNeeds);
          }

          if (targetEditIndex >= 0) {
            Reflect.set(selectedTargets, targetEditIndex, newTarget);
          } else {
            selectedTargets.push(newTarget);
          }

          continue;
        }
      }
    }

    // Prompt for scopes if the template supports them.
    let selectedScopes: CliUtilityInitializePromptWorkflowsFormSelectedScopes = [];

    if (matchedMetadata !== undefined && matchedMetadata['supportsScopes'] === true) {
      const lockedPaths: CliUtilityInitializePromptWorkflowsFormLockedPaths = new Set(selectedTargets.map((selectedTarget) => selectedTarget['workingDir']));
      const extraWorkspaceKeys: CliUtilityInitializePromptWorkflowsFormExtraWorkspaceKeys = workspaceKeys.filter((workspaceKey) => lockedPaths.has(workspaceKey) === false);

      // Pre-populate with the locked target workingDirs; extras get appended from the prompt.
      selectedScopes = [...lockedPaths];

      // Only prompt when there are non-target workspaces available to add.
      if (extraWorkspaceKeys.length > 0) {
        const scopeChoices: CliUtilityInitializePromptWorkflowsFormScopeChoices = extraWorkspaceKeys.map((workspaceKey) => ({
          title: workspaceKey,
          value: workspaceKey,
          selected: existingScopes.includes(workspaceKey),
        }));

        const scopesOutput: CliUtilityInitializePromptWorkflowsFormScopesOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormScopesOutputKey, CliUtilityInitializePromptWorkflowsFormScopesOutputResult>({
          type: 'multiselect',
          name: 'scopes',
          message: 'Select any EXTRA workspaces to check and build for this workflow.',
          choices: scopeChoices,
        });

        if (scopesOutput['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const scopesOutputResult: CliUtilityInitializePromptWorkflowsFormScopesOutputResultValue = scopesOutput['result'];
        const extraScopes: CliUtilityInitializePromptWorkflowsFormScopesOutputResult = (Array.isArray(scopesOutputResult.scopes) === true) ? scopesOutputResult.scopes : [];

        for (const extraScope of extraScopes) {
          if (selectedScopes.includes(extraScope) === false) {
            selectedScopes.push(extraScope);
          }
        }
      }
    }

    // Build the settings from variable prompts.
    const settings: CliUtilityInitializePromptWorkflowsFormSettings = {};

    if (matchedMetadata !== undefined) {
      // Build merged variable map: template variables + per-target variables (first-seen wins).
      const mergedVariables: CliUtilityInitializePromptWorkflowsFormMergedVariables = { ...matchedMetadata['variables'] };

      for (const selectedTarget of selectedTargets) {
        const targetType: CliUtilityInitializePromptWorkflowsFormSelectedTargetType = selectedTarget['type'];
        const targetMetadata: CliUtilityInitializePromptWorkflowsFormTargetsMetadata = matchedMetadata['targets'] ?? {};
        const targetVariables: CliUtilityInitializePromptWorkflowsFormTargetVariables = (targetMetadata[targetType] !== undefined) ? targetMetadata[targetType]['variables'] : {};

        const targetVarEntries: CliUtilityInitializePromptWorkflowsFormTargetVariableEntries = Object.entries(targetVariables);

        for (const entry of targetVarEntries) {
          const targetVarKey: CliUtilityInitializePromptWorkflowsFormTargetVariableKey = entry[0];
          const targetVarValue: CliUtilityInitializePromptWorkflowsFormTargetVariableValue = entry[1];

          if (mergedVariables[targetVarKey] === undefined) {
            Reflect.set(mergedVariables, targetVarKey, targetVarValue);
          }
        }
      }

      const variableEntries: CliUtilityInitializePromptWorkflowsFormMergedVariableEntries = Object.entries(mergedVariables);

      for (const variableEntry of variableEntries) {
        const variableName: CliUtilityInitializePromptWorkflowsFormVariableName = variableEntry[0];
        const variableConfig: CliUtilityInitializePromptWorkflowsFormVariableConfig = variableEntry[1];

        // Skip auto variables (e.g. GITHUB_TOKEN with auto: true).
        if (variableConfig['auto'] === true) {
          continue;
        }

        let promptMessage: CliUtilityInitializePromptWorkflowsFormPromptMessage = `Literal: ${variableName}`;
        let initialValue: CliUtilityInitializePromptWorkflowsFormInitialValue = '';

        if (variableConfig['format'] === 'secret') {
          promptMessage = `Secret: ${variableName}`;
          initialValue = (typeof variableConfig['default'] === 'string') ? variableConfig['default'] : '';
        } else if (variableConfig['format'] === 'var') {
          promptMessage = `Variable: ${variableName}`;
          initialValue = (typeof variableConfig['default'] === 'string') ? variableConfig['default'] : '';
        }

        // Append description and example if available.
        const parts: CliUtilityInitializePromptWorkflowsFormVariableDescriptionParts = [];

        if (typeof variableConfig['description'] === 'string') {
          parts.push(variableConfig['description']);
        }

        if (typeof variableConfig['example'] === 'string') {
          parts.push(`e.g. ${variableConfig['example']}`);
        }

        if (parts.length > 0) {
          promptMessage = `${promptMessage} (${parts.join(', ')})`;
        }

        // If editing, pre-fill from existing settings.
        if (
          workflow !== undefined
          && workflow['settings'] !== undefined
          && typeof workflow['settings'][variableName] === 'string'
        ) {
          initialValue = workflow['settings'][variableName];
        }

        const settingsOutput: CliUtilityInitializePromptWorkflowsFormSettingsOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsFormSettingsOutputKey, CliUtilityInitializePromptWorkflowsFormSettingsOutputResult>({
          type: 'text',
          name: 'settingValue',
          message: promptMessage,
          initial: initialValue,
        });

        if (settingsOutput['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const settingsOutputResult: CliUtilityInitializePromptWorkflowsFormSettingsOutputResultValue = settingsOutput['result'];
        const settingValue: CliUtilityInitializePromptWorkflowsFormSettingValue = (typeof settingsOutputResult.settingValue === 'string') ? settingsOutputResult.settingValue.trim().replaceAll('\\n', '\n') : '';

        if (settingValue !== '') {
          Reflect.set(settings, variableName, settingValue);
        }
      }
    }

    // Build the resolved workflow.
    const resolvedWorkflow: CliUtilityInitializePromptWorkflowsFormResolvedWorkflow = {
      template: selectedTemplate,
      suffix: selectedSuffix,
      triggers: selectedTriggers,
    };

    // Workflow - Depends On.
    if (selectedDependsOn !== undefined) {
      Reflect.set(resolvedWorkflow, 'depends-on', selectedDependsOn);
    }

    // Workflow - Targets.
    if (selectedTargets.length > 0) {
      Reflect.set(resolvedWorkflow, 'targets', selectedTargets);
    }

    // Workflow - Scopes.
    if (selectedScopes.length > 0) {
      Reflect.set(resolvedWorkflow, 'scopes', selectedScopes);
    }

    // Workflow - Settings.
    if (Object.keys(settings).length > 0) {
      resolvedWorkflow.settings = settings;
    }

    // Prevents empty workflows from being created.
    if (mode === 'create' && selectedTemplate.trim() === '') {
      return {
        action: 'back',
      };
    }

    return {
      action: 'apply',
      workflow: resolvedWorkflow,
    };
  }

  /**
   * CLI - Utility - Initialize - Prompt Workflows Delete Form.
   *
   * Displays a yes/no confirmation before removing a workflow. Called by promptWorkflows when
   * the user selects a REMOVE action from the workflow menu.
   *
   * @param {CliUtilityInitializePromptWorkflowsDeleteFormLabel} label - Label.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWorkflowsDeleteFormReturns}
   *
   * @since 0.15.0
   */
  private static async promptWorkflowsDeleteForm(label: CliUtilityInitializePromptWorkflowsDeleteFormLabel): CliUtilityInitializePromptWorkflowsDeleteFormReturns {
    const confirmOutput: CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputKey, CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputValue>({
      type: 'confirm',
      name: 'confirm',
      message: `Remove workflow "${label}"?`,
      initial: false,
    });

    if (confirmOutput['cancelled'] === true) {
      return false;
    }

    const confirmOutputResult: CliUtilityInitializePromptWorkflowsDeleteFormConfirmOutputResult = confirmOutput['result'];

    return confirmOutputResult.confirm;
  }

  /**
   * CLI - Utility - Initialize - Prompt Workspaces.
   *
   * Discovers all package.json paths in the monorepo and lets the user assign a role, policy,
   * name, and recipes to each workspace directory.
   *
   * @param {CliUtilityInitializePromptWorkspacesConfig} config - Config.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWorkspacesReturns}
   *
   * @since 0.11.0
   */
  private static async promptWorkspaces(config: CliUtilityInitializePromptWorkspacesConfig): CliUtilityInitializePromptWorkspacesReturns {
    const workspaces: CliUtilityInitializePromptWorkspaces = (config['workspaces'] !== undefined) ? { ...(config['workspaces']) } : {};

    // The "run" command already guarantees we run in the project root (called "checkPath"), so we can traverse forward directly.
    const rawWorkspacePaths: CliUtilityInitializePromptWorkspacesRawWorkspacePaths = await discoverPathsWithFile('package.json', 'forward');
    const workspacePaths: CliUtilityInitializePromptWorkspacesWorkspacePaths = rawWorkspacePaths.map((rawWorkspacePath) => {
      const currentWorkingDirectory: CliUtilityInitializePromptWorkspacesCurrentWorkingDirectory = process.cwd();
      const relativePath: CliUtilityInitializePromptWorkspacesRelativePath = relative(currentWorkingDirectory, rawWorkspacePath);

      if (relativePath === '') {
        return './';
      }

      return `./${relativePath.split(sep).join('/')}`;
    });

    Logger.customize({
      name: 'CliUtilityInitialize.promptWorkspaces',
      purpose: 'paths',
    }).debug(workspacePaths);

    while (true) {
      const choices: CliUtilityInitializePromptWorkspacesChoices = workspacePaths.map((workspacePath) => {
        const workspace: CliUtilityInitializePromptWorkspacesWorkspace = workspaces[workspacePath];
        const summaryParts: CliUtilityInitializePromptWorkspacesSummaryParts = [];

        if (workspace !== undefined && workspace['name'] !== undefined) {
          summaryParts.push(workspace['name']);
        }

        if (workspace !== undefined && workspace['role'] !== undefined) {
          summaryParts.push(workspace['role']);
        }

        if (workspace !== undefined && workspace['policy'] !== undefined) {
          summaryParts.push(workspace['policy']);
        }

        return {
          title: workspacePath,
          description: (summaryParts.length > 0) ? summaryParts.join(' · ') : 'Not configured yet.',
          value: workspacePath,
        };
      });

      choices.push({
        title: 'Back',
        description: 'Return to the category selection.',
        value: 'back',
      });

      const menuOutput: CliUtilityInitializePromptWorkspacesMenuOutput = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesMenuOutputKey, CliUtilityInitializePromptWorkspacesMenuOutputValue>({
        type: 'select',
        name: 'workspacePath',
        message: 'Select a workspace to configure.',
        choices,
      });

      if (menuOutput['cancelled'] === true) {
        return 'back';
      }

      const menuOutputResult: CliUtilityInitializePromptWorkspacesMenuOutputResult = menuOutput['result'];

      if (
        menuOutputResult.workspacePath === undefined
        || menuOutputResult.workspacePath === 'back'
      ) {
        return 'back';
      }

      const workspacePath: CliUtilityInitializePromptWorkspacesWorkspacePath = menuOutputResult.workspacePath;

      const formResult: CliUtilityInitializePromptWorkspacesFormResult = await CliUtilityInitialize.promptWorkspacesForm({
        workspacePath,
        existingWorkspace: workspaces[workspacePath],
        projectSlug: (config['project'] !== undefined && config['project']['name'] !== undefined) ? config['project']['name']['slug'] : undefined,
      });

      if (formResult['action'] === 'back') {
        continue;
      }

      Reflect.set(workspaces, workspacePath, formResult['workspace']);

      Object.assign(config, { workspaces });

      Logger.customize({
        name: 'CliUtilityInitialize.promptWorkspaces',
        purpose: 'updated',
        padTop: 1,
        padBottom: 1,
      }).info(`Updated workspace "${workspacePath}" → ${formResult['workspace']['name']} · ${formResult['workspace']['role']} · ${formResult['workspace']['policy']}`);
    }
  }

  /**
   * CLI - Utility - Initialize - Prompt Workspaces Form.
   *
   * Multi-step form for a single workspace. Prompts for role, policy, package name, recipe
   * selection, and per-recipe settings in sequence.
   *
   * @param {CliUtilityInitializePromptWorkspacesFormOptions} options - Options.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWorkspacesFormReturns}
   *
   * @since 0.11.0
   */
  private static async promptWorkspacesForm(options: CliUtilityInitializePromptWorkspacesFormOptions): CliUtilityInitializePromptWorkspacesFormReturns {
    const allowedRoles: CliUtilityInitializePromptWorkspacesFormAllowedRoles = [
      {
        title: 'Project Root',
        description: 'Monorepo root workspace (e.g., root package.json)',
        value: 'project',
      },
      {
        title: 'Configuration',
        description: 'Shared static config (e.g., eslint, tsconfig, prettier)',
        value: 'config',
      },
      {
        title: 'Documentation',
        description: 'Documentation workspace (e.g., Docusaurus, Docsify)',
        value: 'docs',
      },
      {
        title: 'Application',
        description: 'Deployable runtimes (e.g., web, mobile, workers, API, bots)',
        value: 'app',
      },
      {
        title: 'Package',
        description: 'Reusable modules (e.g., libraries, plugins, components)',
        value: 'package',
      },
      {
        title: 'Tool',
        description: 'Internal CLI or build tools (e.g., codegen, bundler)',
        value: 'tool',
      },
      {
        title: 'Template',
        description: 'Ready-to-copy scaffold bundles consumed by generators (e.g., starter files)',
        value: 'template',
      },
    ];
    const policy: CliUtilityInitializePromptWorkspacesFormPolicy = {
      freezable: {
        label: 'Freezable',
        description: 'Non-versioned (0.0.0) and never published (private: true)',
      },
      trackable: {
        label: 'Trackable',
        description: 'Versioned (>=0.0.1) and never published (private: true)',
      },
      distributable: {
        label: 'Distributable',
        description: 'Versioned (>=0.0.1) and published (private: false)',
      },
    };

    /**
     * CLI - Utility - Initialize - Prompt Workspaces Form - Resolve Name.
     *
     * Derives the package name from the selected role. Fixed roles like project and docs get an
     * automatic name; other roles prompt for a descriptor.
     *
     * @param {CliUtilityInitializePromptWorkspacesFormResolveNameRole} role - Role.
     *
     * @returns {CliUtilityInitializePromptWorkspacesFormResolveNameReturns}
     *
     * @since 0.11.0
     */
    const resolveName: CliUtilityInitializePromptWorkspacesFormResolveName = async (role: CliUtilityInitializePromptWorkspacesFormResolveNameRole): CliUtilityInitializePromptWorkspacesFormResolveNameReturns => {
      // "project" (Project root) and "docs" always get a fixed name.
      if (role === 'project' || role === 'docs') {
        if (options['projectSlug'] === undefined) {
          return (role === 'project') ? 'project' : 'docs';
        }

        return `${options['projectSlug']}-${role}`;
      }

      const base: CliUtilityInitializePromptWorkspacesFormResolveNameBase = (options['projectSlug'] !== undefined) ? `${options['projectSlug']}-${role}` : role;

      // If current workspace is not "project" or "docs", the workspace name would have a fixed prefix or simple slug.
      const namePrompt: CliUtilityInitializePromptWorkspacesFormResolveNameNamePrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormResolveNamePromptKey, CliUtilityInitializePromptWorkspacesFormResolveNamePromptValue>({
        type: 'text',
        name: 'workspaceName',
        message: 'Workspace package name',
        initial: (options['existingWorkspace'] !== undefined) ? options['existingWorkspace']['name'] ?? '' : '',
        validate: (value: CliUtilityInitializePromptWorkspacesFormResolveNameValidateValue) => CliUtilityInitialize.normalizeWorkspaceName(value, role, base)['result'],
      });

      if (namePrompt['cancelled'] === true) {
        return undefined;
      }

      return CliUtilityInitialize.normalizeWorkspaceName(namePrompt['result'].workspaceName, role, base)['sanitized'];
    };

    // For each workspace, the user must select a role.
    const existingRoleIndex: CliUtilityInitializePromptWorkspacesFormExistingRoleIndex = allowedRoles.findIndex((allowedRole) => options['existingWorkspace'] !== undefined && allowedRole['value'] === options['existingWorkspace']['role']);

    const rolePrompt: CliUtilityInitializePromptWorkspacesFormRolePrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRolePromptKey, CliUtilityInitializePromptWorkspacesFormRolePromptValue>({
      type: 'select',
      name: 'workspaceRole',
      message: `Select a role for "${options['workspacePath']}"`,
      choices: allowedRoles.map((allowedRole) => {
        return {
          title: allowedRole['title'],
          description: allowedRole['description'],
          value: allowedRole['value'],
        };
      }),
      initial: Math.max(0, existingRoleIndex),
    });

    if (rolePrompt['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const selectedRole: CliUtilityInitializePromptWorkspacesFormSelectedRole = rolePrompt['result'].workspaceRole;
    const allowedPolicies: CliUtilityInitializePromptWorkspacesFormAllowedPolicies = libItemAllowedPoliciesByRole[selectedRole];

    // Based on the selected role, list out allowed policy choices.
    const existingPolicyIndex: CliUtilityInitializePromptWorkspacesFormExistingPolicyIndex = allowedPolicies.findIndex((allowedPolicy) => options['existingWorkspace'] !== undefined && allowedPolicy === options['existingWorkspace']['policy']);

    const policyPrompt: CliUtilityInitializePromptWorkspacesFormPolicyPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormPolicyPromptKey, CliUtilityInitializePromptWorkspacesFormPolicyPromptValue>({
      type: 'select',
      name: 'workspacePolicy',
      message: 'Select a policy',
      choices: allowedPolicies.map((allowedPolicy) => {
        const policyEntry: CliUtilityInitializePromptWorkspacesFormPolicyEntry = Reflect.get(policy, allowedPolicy);

        return {
          title: policyEntry['label'],
          description: policyEntry['description'],
          value: allowedPolicy,
        };
      }),
      initial: Math.max(0, existingPolicyIndex),
    });

    if (policyPrompt['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const selectedPolicy: CliUtilityInitializePromptWorkspacesFormSelectedPolicy = policyPrompt['result'].workspacePolicy;
    const resolvedName: CliUtilityInitializePromptWorkspacesFormResolvedName = await resolveName(selectedRole);

    if (resolvedName === undefined) {
      return {
        action: 'back',
      };
    }

    const existingRecipes: CliUtilityInitializePromptWorkspacesFormExistingRecipes = (options['existingWorkspace'] !== undefined && options['existingWorkspace']['recipes'] !== undefined) ? options['existingWorkspace']['recipes'] : undefined;

    const recipesPrompt: CliUtilityInitializePromptWorkspacesFormRecipesPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipesPromptKey, CliUtilityInitializePromptWorkspacesFormRecipesPromptValue>({
      type: 'multiselect',
      name: 'workspaceRecipes',
      message: 'Select recipes to enable',
      choices: libItemAllowedRecipes.map((recipe) => {
        const recipeTuple: CliUtilityInitializePromptWorkspacesFormRecipeTuple = (existingRecipes !== undefined) ? Reflect.get(existingRecipes, recipe) : undefined;
        const recipeSelected: CliUtilityInitializePromptWorkspacesFormRecipeSelected = (
          Array.isArray(recipeTuple)
          && recipeTuple.length > 0
          && recipeTuple[0] === true
        );

        return {
          title: recipe,
          value: recipe,
          selected: recipeSelected,
        };
      }),
    });

    if (recipesPrompt['cancelled'] === true) {
      return {
        action: 'back',
      };
    }

    const selectedRecipes: CliUtilityInitializePromptWorkspacesFormSelectedRecipes = recipesPrompt['result'].workspaceRecipes;
    const recipes: CliUtilityInitializePromptWorkspacesFormRecipes = {};

    for (const recipe of selectedRecipes) {
      const existingTupleRaw: CliUtilityInitializePromptWorkspacesFormExistingTupleRaw = (existingRecipes !== undefined) ? Reflect.get(existingRecipes, recipe) : undefined;
      const existingTuple: CliUtilityInitializePromptWorkspacesFormExistingTuple = (Array.isArray(existingTupleRaw) === true) ? existingTupleRaw : undefined;
      const existingSettings: CliUtilityInitializePromptWorkspacesFormExistingSettings = (existingTuple !== undefined && existingTuple.length > 1) ? existingTuple[1] : undefined;

      if (recipe === 'sync-identity' && selectedPolicy === 'distributable') {
        const settingsPrompt: CliUtilityInitializePromptWorkspacesFormSettingsPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue>({
          type: 'multiselect',
          name: 'workspaceRecipeSettings',
          message: 'sync-identity: Select properties to sync',
          choices: [
            {
              title: 'description',
              value: 'description',
              selected: existingSettings !== undefined && existingSettings['description'] === true,
            },
            {
              title: 'keywords',
              value: 'keywords',
              selected: existingSettings !== undefined && existingSettings['keywords'] === true,
            },
          ],
        });

        if (settingsPrompt['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const selectedSettings: CliUtilityInitializePromptWorkspacesFormSelectedSettings = settingsPrompt['result'].workspaceRecipeSettings;

        if (selectedSettings.length > 0) {
          const settings: CliUtilityInitializePromptWorkspacesFormRecipeSettings = {};

          for (const setting of selectedSettings) {
            Reflect.set(settings, setting, true);
          }

          Reflect.set(recipes, recipe, [
            true,
            settings,
          ]);
        } else {
          Reflect.set(recipes, recipe, [true]);
        }
      } else if (recipe === 'sync-ownership' && selectedPolicy === 'distributable') {
        const settingsPrompt: CliUtilityInitializePromptWorkspacesFormSettingsPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue>({
          type: 'multiselect',
          name: 'workspaceRecipeSettings',
          message: 'sync-ownership: Select properties to sync',
          choices: [
            {
              title: 'homepage',
              value: 'homepage',
              selected: existingSettings !== undefined && existingSettings['homepage'] === true,
            },
            {
              title: 'bugs',
              value: 'bugs',
              selected: existingSettings !== undefined && existingSettings['bugs'] === true,
            },
            {
              title: 'author',
              value: 'author',
              selected: existingSettings !== undefined && existingSettings['author'] === true,
            },
            {
              title: 'contributors',
              value: 'contributors',
              selected: existingSettings !== undefined && existingSettings['contributors'] === true,
            },
            {
              title: 'funding',
              value: 'funding',
              selected: existingSettings !== undefined && existingSettings['funding'] === true,
            },
            {
              title: 'repository',
              value: 'repository',
              selected: existingSettings !== undefined && existingSettings['repository'] === true,
            },
          ],
        });

        if (settingsPrompt['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const selectedSettings: CliUtilityInitializePromptWorkspacesFormSelectedSettings = settingsPrompt['result'].workspaceRecipeSettings;

        if (selectedSettings.length > 0) {
          const settings: CliUtilityInitializePromptWorkspacesFormRecipeSettings = {};

          for (const setting of selectedSettings) {
            Reflect.set(settings, setting, true);
          }

          Reflect.set(recipes, recipe, [
            true,
            settings,
          ]);
        } else {
          Reflect.set(recipes, recipe, [true]);
        }
      } else if (recipe === 'sync-environment') {
        const settingsPrompt: CliUtilityInitializePromptWorkspacesFormSettingsPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue>({
          type: 'multiselect',
          name: 'workspaceRecipeSettings',
          message: 'sync-environment: Select settings',
          choices: [{
            title: 'trackNodeLtsVersions',
            value: 'trackNodeLtsVersions',
            selected: existingSettings !== undefined && existingSettings['trackNodeLtsVersions'] === true,
          }],
        });

        if (settingsPrompt['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const selectedSettings: CliUtilityInitializePromptWorkspacesFormSelectedSettings = settingsPrompt['result'].workspaceRecipeSettings;

        if (selectedSettings.length > 0) {
          const settings: CliUtilityInitializePromptWorkspacesFormRecipeSettings = {};

          for (const setting of selectedSettings) {
            Reflect.set(settings, setting, true);
          }

          Reflect.set(recipes, recipe, [
            true,
            settings,
          ]);
        } else {
          Reflect.set(recipes, recipe, [true]);
        }
      } else if (recipe === 'cleanup') {
        const settingsPrompt: CliUtilityInitializePromptWorkspacesFormSettingsPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue>({
          type: 'multiselect',
          name: 'workspaceRecipeSettings',
          message: 'cleanup: Select settings',
          choices: [
            {
              title: 'removeUnknownKeys',
              value: 'removeUnknownKeys',
              selected: existingSettings !== undefined && existingSettings['removeUnknownKeys'] === true,
            },
            {
              title: 'reorderKeys',
              value: 'reorderKeys',
              selected: existingSettings !== undefined && existingSettings['reorderKeys'] === true,
            },
          ],
        });

        if (settingsPrompt['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const selectedSettings: CliUtilityInitializePromptWorkspacesFormSelectedSettings = settingsPrompt['result'].workspaceRecipeSettings;

        if (selectedSettings.length > 0) {
          const settings: CliUtilityInitializePromptWorkspacesFormRecipeSettings = {};

          for (const setting of selectedSettings) {
            Reflect.set(settings, setting, true);
          }

          Reflect.set(recipes, recipe, [
            true,
            settings,
          ]);
        } else {
          Reflect.set(recipes, recipe, [true]);
        }
      } else if (recipe === 'normalize-dependencies') {
        const settingsPrompt: CliUtilityInitializePromptWorkspacesFormSettingsPrompt = await CliUtilityInitialize.promptWithCancel<CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptKey, CliUtilityInitializePromptWorkspacesFormRecipeSettingsPromptValue>({
          type: 'multiselect',
          name: 'workspaceRecipeSettings',
          message: 'normalize-dependencies: Select settings',
          choices: [
            {
              title: 'pinDependencyVersions',
              value: 'pinDependencyVersions',
              selected: existingSettings !== undefined && existingSettings['pinDependencyVersions'] === true,
            },
            {
              title: 'pinDevDependencyVersions',
              value: 'pinDevDependencyVersions',
              selected: existingSettings !== undefined && existingSettings['pinDevDependencyVersions'] === true,
            },
          ],
        });

        if (settingsPrompt['cancelled'] === true) {
          return {
            action: 'back',
          };
        }

        const selectedSettings: CliUtilityInitializePromptWorkspacesFormSelectedSettings = settingsPrompt['result'].workspaceRecipeSettings;

        if (selectedSettings.length > 0) {
          const settings: CliUtilityInitializePromptWorkspacesFormRecipeSettings = {};

          for (const setting of selectedSettings) {
            Reflect.set(settings, setting, true);
          }

          Reflect.set(recipes, recipe, [
            true,
            settings,
          ]);
        } else {
          Reflect.set(recipes, recipe, [true]);
        }
      } else {
        Reflect.set(recipes, recipe, [true]);
      }
    }

    return {
      action: 'apply',
      workspace: {
        name: resolvedName,
        role: selectedRole,
        policy: selectedPolicy,
        ...(Object.keys(recipes).length > 0) ? { recipes } : {},
      },
    };
  }

  /**
   * CLI - Utility - Initialize - Prompt With Cancel.
   *
   * Thin wrapper around the prompts library that detects user cancellation (Ctrl-C) and
   * returns a typed discriminated union of result.
   *
   * @param {CliUtilityInitializePromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CliUtilityInitializePromptWithCancelReturns}
   *
   * @since 0.11.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CliUtilityInitializePromptWithCancelQuestions<Keys>): CliUtilityInitializePromptWithCancelReturns<Keys, Result> {
    let cancelled: CliUtilityInitializePromptWithCancelCancelled = false;

    const result: CliUtilityInitializePromptWithCancelResult<Keys, Result> = await prompts<Keys>(questions, {
      onCancel: () => false,
    });

    if (Object.keys(result).length === 0) {
      cancelled = true;
    }

    if (cancelled === true) {
      return {
        cancelled: true,
      };
    }

    return {
      cancelled: false,
      result,
    };
  }

  /**
   * CLI - Utility - Initialize - Check Path.
   *
   * Guards the run method by traversing backward
   * from the working directory for package.json files.
   * Returns true only when one exists at cwd.
   *
   * @param {CliUtilityInitializeCheckPathCurrentDirectory} currentDirectory - Current directory.
   *
   * @private
   *
   * @returns {CliUtilityInitializeCheckPathReturns}
   *
   * @since 0.11.0
   */
  private static async checkPath(currentDirectory: CliUtilityInitializeCheckPathCurrentDirectory): CliUtilityInitializeCheckPathReturns {
    const locations: CliUtilityInitializeCheckPathLocations = await discoverPathsWithFile('package.json', 'backward');

    Logger.customize({
      name: 'CliUtilityInitialize.checkPath',
      purpose: 'detectedLocations',
    }).debug(locations);

    // If command was ran outside of project root directory.
    if (locations.length < 1) {
      const lessThanOneMessage: CliUtilityInitializeCheckPathLessThanOneMessage = [
        'No "package.json" files were found. Re-run this command inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n');

      Logger.customize({
        name: 'CliUtilityInitialize.checkPath',
        purpose: 'lessThanOne',
      }).error(lessThanOneMessage);

      return false;
    }

    // If command was ran inside a monorepo package.
    if (locations.length > 1) {
      const greaterThanOneMessage: CliUtilityInitializeCheckPathGreaterThanOneMessage = [
        'Multiple "package.json" files were found. Re-run this command inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n');

      Logger.customize({
        name: 'CliUtilityInitialize.checkPath',
        purpose: 'greaterThanOne',
      }).error(greaterThanOneMessage);

      return false;
    }

    // If command was ran outside the project root directory.
    if (locations.length === 1 && locations[0] !== currentDirectory) {
      const notProjectRootDirectoryMessage: CliUtilityInitializeCheckPathNotProjectRootDirectoryMessage = [
        'Must be run inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n');

      Logger.customize({
        name: 'CliUtilityInitialize.checkPath',
        purpose: 'notProjectRootDirectory',
      }).error(notProjectRootDirectoryMessage);

      return false;
    }

    return true;
  }

  /**
   * CLI - Utility - Initialize - Normalize Email.
   *
   * Validates and trims an email address using the simple email regex. Blanks are allowed and
   * return undefined so the field can be cleared.
   *
   * @param {CliUtilityInitializeNormalizeEmailValue} value - Value.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeEmailReturns}
   *
   * @since 0.11.0
   */
  private static normalizeEmail(value: CliUtilityInitializeNormalizeEmailValue): CliUtilityInitializeNormalizeEmailReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeEmailTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    if (LIB_REGEX_PATTERN_EMAIL_SIMPLE.test(trimmedValue) === false) {
      return {
        result: 'Enter a valid email address or leave blank.',
        sanitized: undefined,
      };
    }

    return {
      result: true,
      sanitized: trimmedValue,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize Project Slug.
   *
   * Validates a project slug against the simple
   * slug regex and enforces the npm 214-character limit.
   * Used as the validator for the slug prompt.
   *
   * @param {CliUtilityInitializeNormalizeProjectSlugValue} value - Value.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeProjectSlugReturns}
   *
   * @since 0.11.0
   */
  private static normalizeProjectSlug(value: CliUtilityInitializeNormalizeProjectSlugValue): CliUtilityInitializeNormalizeProjectSlugReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeProjectSlugTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    if (
      trimmedValue.length > 214
      || new RegExp(LIB_REGEX_PATTERN_SLUG_SIMPLE, 'i').test(trimmedValue) === false
    ) {
      return {
        result: 'Use only letters, numbers, hyphens, or underscores, and keep it at 214 characters or fewer.',
        sanitized: undefined,
      };
    }

    return {
      result: true,
      sanitized: trimmedValue,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize Text.
   *
   * General-purpose text validator that trims
   * whitespace and enforces a maximum character length.
   * Called by most prompts and normalizeTextArray.
   *
   * @param {CliUtilityInitializeNormalizeTextValue}     value     - Value.
   * @param {CliUtilityInitializeNormalizeTextMaxLength} maxLength - Max length.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeTextReturns}
   *
   * @since 0.11.0
   */
  private static normalizeText(value: CliUtilityInitializeNormalizeTextValue, maxLength: CliUtilityInitializeNormalizeTextMaxLength): CliUtilityInitializeNormalizeTextReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeTextTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    if (trimmedValue.length > maxLength) {
      return {
        result: `Input a value under ${maxLength} character(s) or leave blank.`,
        sanitized: undefined,
      };
    }

    return {
      result: true,
      sanitized: trimmedValue,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize Text Array.
   *
   * Splits a comma-separated string into trimmed items and validates each against a per-item
   * character limit via normalizeText. Used for keywords.
   *
   * @param {CliUtilityInitializeNormalizeTextArrayValue}            value            - Value.
   * @param {CliUtilityInitializeNormalizeTextArrayMaxLengthPerItem} maxLengthPerItem - Max length per item.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeTextArrayReturns}
   *
   * @since 0.11.0
   */
  private static normalizeTextArray(value: CliUtilityInitializeNormalizeTextArrayValue, maxLengthPerItem: CliUtilityInitializeNormalizeTextArrayMaxLengthPerItem): CliUtilityInitializeNormalizeTextArrayReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeTextArrayTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const items: CliUtilityInitializeNormalizeTextArrayItems = trimmedValue
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    for (let i = 0; i < items.length; i += 1) {
      const normalizedText: CliUtilityInitializeNormalizeTextArrayNormalizedText = CliUtilityInitialize.normalizeText(items[i], maxLengthPerItem);
      const result: CliUtilityInitializeNormalizeTextArrayResult = normalizedText['result'];
      const sanitized: CliUtilityInitializeNormalizeTextArraySanitized = normalizedText['sanitized'];

      if (result !== true) {
        return {
          result: `Invalid entry "${items[i]}": Input a value under ${maxLengthPerItem} character(s) or remove entry.`,
          sanitized: undefined,
        };
      }

      if (sanitized !== undefined) {
        Reflect.set(items, i, sanitized);
      }
    }

    return {
      result: true,
      sanitized: items,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize URL.
   *
   * Parses and validates a single URL string, checking its protocol against a whitelist
   * determined by the protocol mode (generic or repository).
   *
   * @param {CliUtilityInitializeNormalizeUrlValue}    value    - Value.
   * @param {CliUtilityInitializeNormalizeUrlProtocol} protocol - Protocol.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeUrlReturns}
   *
   * @since 0.11.0
   */
  private static normalizeUrl(value: CliUtilityInitializeNormalizeUrlValue, protocol: CliUtilityInitializeNormalizeUrlProtocol): CliUtilityInitializeNormalizeUrlReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeUrlTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const rules: CliUtilityInitializeNormalizeUrlRules = {
      generic: {
        allowed: [
          'http:',
          'https:',
        ],
        message: 'Enter a valid generic URL (e.g., https://) or leave blank.',
      },
      repository: {
        allowed: [
          'git:',
          'git+https:',
          'git+ssh:',
          'git+http:',
          'http:',
          'https:',
        ],
        message: 'Enter a valid repository URL (e.g., git+https://) or leave blank.',
      },
    };

    const allowed: CliUtilityInitializeNormalizeUrlAllowed = (protocol === 'repository') ? rules['repository']['allowed'] : rules['generic']['allowed'];
    const errorMessage: CliUtilityInitializeNormalizeUrlErrorMessage = (protocol === 'repository') ? rules['repository']['message'] : rules['generic']['message'];

    try {
      const url: CliUtilityInitializeNormalizeUrlUrl = new URL(trimmedValue);

      if (allowed.includes(url.protocol) === true) {
        return {
          result: true,
          sanitized: url.toString(),
        };
      }
    } catch {
      /* empty */
    }

    return {
      result: errorMessage,
      sanitized: undefined,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize URL Array.
   *
   * Splits a comma-separated string of URLs and validates each entry via normalizeUrl. Used
   * for multi-value fields like funding sources.
   *
   * @param {CliUtilityInitializeNormalizeUrlArrayValue}    value    - Value.
   * @param {CliUtilityInitializeNormalizeUrlArrayProtocol} protocol - Protocol.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeUrlArrayReturns}
   *
   * @since 0.11.0
   */
  private static normalizeUrlArray(value: CliUtilityInitializeNormalizeUrlArrayValue, protocol: CliUtilityInitializeNormalizeUrlArrayProtocol): CliUtilityInitializeNormalizeUrlArrayReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeUrlArrayTrimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const items: CliUtilityInitializeNormalizeUrlArrayItems = trimmedValue
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    for (let i = 0; i < items.length; i += 1) {
      const normalizedUrl: CliUtilityInitializeNormalizeUrlArrayNormalizedUrl = CliUtilityInitialize.normalizeUrl(items[i], protocol);
      const result: CliUtilityInitializeNormalizeUrlArrayResult = normalizedUrl['result'];
      const sanitized: CliUtilityInitializeNormalizeUrlArraySanitized = normalizedUrl['sanitized'];

      if (result !== true) {
        const errorMessages: CliUtilityInitializeNormalizeUrlArrayErrorMessages = {
          generic: 'Enter a valid generic URL (e.g., https://) or remove entry.',
          repository: 'Enter a valid repository URL (e.g., git+https://) or remove entry.',
        };
        const errorMessage: CliUtilityInitializeNormalizeUrlArrayErrorMessage = (protocol === 'repository') ? errorMessages['repository'] : errorMessages['generic'];

        return {
          result: `Invalid URL "${items[i]}": ${errorMessage}`,
          sanitized: undefined,
        };
      }

      if (sanitized !== undefined) {
        Reflect.set(items, i, sanitized);
      }
    }

    return {
      result: true,
      sanitized: items,
    };
  }

  /**
   * CLI - Utility - Initialize - Normalize Workspace Name.
   *
   * Enforces naming rules per workspace role.
   * Config, app, and tool roles require a prefixed slug
   * while package roles accept scoped names.
   *
   * @param {CliUtilityInitializeNormalizeWorkspaceNameValue} value - Value.
   * @param {CliUtilityInitializeNormalizeWorkspaceNameRole}  role  - Role.
   * @param {CliUtilityInitializeNormalizeWorkspaceNameBase}  base  - Base.
   *
   * @private
   *
   * @returns {CliUtilityInitializeNormalizeWorkspaceNameReturns}
   *
   * @since 0.11.0
   */
  private static normalizeWorkspaceName(value: CliUtilityInitializeNormalizeWorkspaceNameValue, role: CliUtilityInitializeNormalizeWorkspaceNameRole, base: CliUtilityInitializeNormalizeWorkspaceNameBase): CliUtilityInitializeNormalizeWorkspaceNameReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue: CliUtilityInitializeNormalizeWorkspaceNameTrimmedValue = value.trim();

    if (trimmedValue === '') {
      return {
        result: 'Enter a package name.',
        sanitized: undefined,
      };
    }

    switch (role) {
      case 'config':
      case 'app':
      case 'tool': {
        // Base for "config", "app", and "tool" is either `${projectSlug}-${role}` or just `${role}`.
        const expectedPrefix: CliUtilityInitializeNormalizeWorkspaceNameExpectedPrefix = `${base}-`;

        if (trimmedValue.startsWith(expectedPrefix) === false) {
          return {
            result: `Begin with "${expectedPrefix}" and add a descriptor slug.`,
            sanitized: undefined,
          };
        }

        const descriptor: CliUtilityInitializeNormalizeWorkspaceNameDescriptor = trimmedValue.slice(expectedPrefix.length);

        if (descriptor.length === 0) {
          return {
            result: 'Add a descriptor after the prefix.',
            sanitized: undefined,
          };
        }

        if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(descriptor) === false) {
          return {
            result: 'Descriptor must match the slug pattern (lowercase letters, numbers, hyphens, underscores).',
            sanitized: undefined,
          };
        }

        return {
          result: true,
          sanitized: trimmedValue,
        };
      }

      case 'template':
      case 'package':
      default: {
        if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(trimmedValue) === true || LIB_REGEX_PATTERN_SLUG_SCOPED.test(trimmedValue) === true) {
          return {
            result: true,
            sanitized: trimmedValue,
          };
        }

        return {
          result: 'Enter an unscoped slug or a scoped package name (e.g. @scope/name).',
          sanitized: undefined,
        };
      }
    }
  }
}
