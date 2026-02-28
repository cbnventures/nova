import { relative, sep } from 'path';

import chalk from 'chalk';
import prompts from 'prompts';

import { itemAllowedPoliciesByRole, itemAllowedSyncProperties } from '@/lib/item.js';
import { NovaConfig } from '@/lib/nova-config.js';
import { PATTERN_EMAIL_SIMPLE, PATTERN_SLUG_SCOPED, PATTERN_SLUG_SIMPLE } from '@/lib/regex.js';
import { discoverPathsWithFile } from '@/lib/utility.js';
import { Logger } from '@/toolkit/index.js';

import type {
  CLIUtilityInitializeCheckPathCurrentDirectory,
  CLIUtilityInitializeCheckPathReturns,
  CLIUtilityInitializeNormalizeEmailReturns,
  CLIUtilityInitializeNormalizeEmailValue,
  CLIUtilityInitializeNormalizeProjectSlugReturns,
  CLIUtilityInitializeNormalizeProjectSlugValue,
  CLIUtilityInitializeNormalizeTextArrayMaxLengthPerItem,
  CLIUtilityInitializeNormalizeTextArrayReturns,
  CLIUtilityInitializeNormalizeTextArrayValue,
  CLIUtilityInitializeNormalizeTextMaxLength,
  CLIUtilityInitializeNormalizeTextReturns,
  CLIUtilityInitializeNormalizeTextValue,
  CLIUtilityInitializeNormalizeUrlArrayProtocol,
  CLIUtilityInitializeNormalizeUrlArrayReturns,
  CLIUtilityInitializeNormalizeUrlArrayValue,
  CLIUtilityInitializeNormalizeUrlProtocol,
  CLIUtilityInitializeNormalizeUrlReturns,
  CLIUtilityInitializeNormalizeUrlValue,
  CLIUtilityInitializeNormalizeWorkspaceNameBase,
  CLIUtilityInitializeNormalizeWorkspaceNameReturns,
  CLIUtilityInitializeNormalizeWorkspaceNameRole,
  CLIUtilityInitializeNormalizeWorkspaceNameValue,
  CLIUtilityInitializePromptEmailsConfig,
  CLIUtilityInitializePromptEmailsQuestionsOutputKey,
  CLIUtilityInitializePromptEmailsQuestionsOutputValue,
  CLIUtilityInitializePromptEmailsReturns,
  CLIUtilityInitializePromptEntitiesChoices,
  CLIUtilityInitializePromptEntitiesConfig,
  CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey,
  CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue,
  CLIUtilityInitializePromptEntitiesDeleteFormLabel,
  CLIUtilityInitializePromptEntitiesDeleteFormReturns,
  CLIUtilityInitializePromptEntitiesDescriptionParts,
  CLIUtilityInitializePromptEntitiesEntities,
  CLIUtilityInitializePromptEntitiesFormEntity,
  CLIUtilityInitializePromptEntitiesFormExistingRoles,
  CLIUtilityInitializePromptEntitiesFormMode,
  CLIUtilityInitializePromptEntitiesFormQuestionsOutputKey,
  CLIUtilityInitializePromptEntitiesFormQuestionsOutputValue,
  CLIUtilityInitializePromptEntitiesFormResolvedEntity,
  CLIUtilityInitializePromptEntitiesFormReturns,
  CLIUtilityInitializePromptEntitiesFormValidRoles,
  CLIUtilityInitializePromptEntitiesMenuOutputKeys,
  CLIUtilityInitializePromptEntitiesMenuOutputResult,
  CLIUtilityInitializePromptEntitiesNormalizedRolesReduce,
  CLIUtilityInitializePromptEntitiesReturns,
  CLIUtilityInitializePromptEntitiesSyncReturns,
  CLIUtilityInitializePromptFlowCategory,
  CLIUtilityInitializePromptFlowChoices,
  CLIUtilityInitializePromptFlowConfig,
  CLIUtilityInitializePromptFlowReturns,
  CLIUtilityInitializePromptFlowSelectMenuOutputKeys,
  CLIUtilityInitializePromptFlowSelectMenuOutputResult,
  CLIUtilityInitializePromptProjectConfig,
  CLIUtilityInitializePromptProjectQuestionsOutputKeys,
  CLIUtilityInitializePromptProjectQuestionsOutputResult,
  CLIUtilityInitializePromptProjectReturns,
  CLIUtilityInitializePromptProjectRolesToSync,
  CLIUtilityInitializePromptUrlsConfig,
  CLIUtilityInitializePromptUrlsQuestionsOutputKey,
  CLIUtilityInitializePromptUrlsQuestionsOutputValue,
  CLIUtilityInitializePromptUrlsReturns,
  CLIUtilityInitializePromptWithCancelQuestions,
  CLIUtilityInitializePromptWithCancelReturns,
  CLIUtilityInitializePromptWorkspaces,
  CLIUtilityInitializePromptWorkspacesConfig,
  CLIUtilityInitializePromptWorkspacesFormAllowedRoles,
  CLIUtilityInitializePromptWorkspacesFormOptions,
  CLIUtilityInitializePromptWorkspacesFormPolicy,
  CLIUtilityInitializePromptWorkspacesFormPolicyPromptKey,
  CLIUtilityInitializePromptWorkspacesFormPolicyPromptValue,
  CLIUtilityInitializePromptWorkspacesFormResolveNameReturns,
  CLIUtilityInitializePromptWorkspacesFormResolveNameRole,
  CLIUtilityInitializePromptWorkspacesFormReturns,
  CLIUtilityInitializePromptWorkspacesFormRolePromptKey,
  CLIUtilityInitializePromptWorkspacesFormRolePromptValue,
  CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptKey,
  CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptValue,
  CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptKey,
  CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptValue,
  CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptKey,
  CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptValue,
  CLIUtilityInitializePromptWorkspacesMenuOutputKey,
  CLIUtilityInitializePromptWorkspacesMenuOutputValue,
  CLIUtilityInitializePromptWorkspacesReturns,
  CLIUtilityInitializePromptWorkspacesSummaryParts,
  CLIUtilityInitializeRunOptions,
  CLIUtilityInitializeRunReturns,
} from '@/types/cli/utility/initialize.d.ts';

/**
 * CLI Utility - Initialize.
 *
 * @since 1.0.0
 */
export class CLIUtilityInitialize {
  /**
   * CLI Utility - Initialize - Run.
   *
   * @param {CLIUtilityInitializeRunOptions} options - Options.
   *
   * @returns {CLIUtilityInitializeRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityInitializeRunOptions): CLIUtilityInitializeRunReturns {
    const currentDirectory = process.cwd();
    const isProjectRoot = await CLIUtilityInitialize.checkPath(currentDirectory);

    if (isProjectRoot !== true) {
      process.exitCode = 1;

      return;
    }

    const isDryRun = options.dryRun === true;
    const isReplaceFile = options.replaceFile === true;

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIUtilityInitialize.run',
        purpose: 'options',
      }).warn('Dry run enabled. File changes will not be made in this session.');
    }

    if (isReplaceFile === true) {
      const replaceFileNotice = (isDryRun) ? 'This option has no effect during a dry run session.' : 'Backup file will not be created.';

      Logger.customize({
        name: 'CLIUtilityInitialize.run',
        purpose: 'options',
      }).warn(`Replace file enabled. ${replaceFileNotice}`);
    }

    const novaConfig = new NovaConfig();
    const workingFile = await novaConfig.load();
    const promptFlowResult = await CLIUtilityInitialize.promptFlow(workingFile);

    if (promptFlowResult === 'cancel') {
      Logger.customize({
        name: 'CLIUtilityInitialize.run',
        purpose: 'promptFlow',
      }).debug('Prompt flow exited without saving.');

      return;
    }

    novaConfig.set(workingFile);

    if (isDryRun === true) {
      Logger.customize({
        name: 'CLIUtilityInitialize.run',
        purpose: 'promptFlow',
      }).debug('Dry run enabled. Skipping save operation.');

      return;
    }

    await novaConfig.save(isReplaceFile);
  }

  /**
   * CLI Utility - Initialize - Prompt flow.
   *
   * @param {CLIUtilityInitializePromptFlowConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptFlowReturns}
   *
   * @since 1.0.0
   */
  private static async promptFlow(config: CLIUtilityInitializePromptFlowConfig): CLIUtilityInitializePromptFlowReturns {
    const category: CLIUtilityInitializePromptFlowCategory = {
      project: {
        label: 'Project',
        description: 'Configure project metadata (name, description, keywords).',
        handler: CLIUtilityInitialize.promptProject,
      },
      entities: {
        label: 'Entities',
        description: 'Manage entities, their roles, and contact information.',
        handler: CLIUtilityInitialize.promptEntities,
      },
      emails: {
        label: 'Emails',
        description: 'Configure project emails (bugs, etc.).',
        handler: CLIUtilityInitialize.promptEmails,
      },
      urls: {
        label: 'URLs',
        description: 'Configure project URLs (homepage, repository, fund sources, etc.).',
        handler: CLIUtilityInitialize.promptUrls,
      },
      workspaces: {
        label: 'Workspaces',
        description: 'Review workspace packages, assigning roles and policies.',
        handler: CLIUtilityInitialize.promptWorkspaces,
      },
    };

    while (true) {
      const categoryKeys = Object.keys(category) as (keyof typeof category)[];
      const choices: CLIUtilityInitializePromptFlowChoices = categoryKeys.map((categoryKey) => ({
        title: category[categoryKey].label,
        description: category[categoryKey].description,
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

      const menuOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptFlowSelectMenuOutputKeys, CLIUtilityInitializePromptFlowSelectMenuOutputResult>({
        type: 'select',
        name: 'action',
        message: 'Select a Nova configuration category to edit.',
        choices,
      });

      if (menuOutput.cancelled) {
        return 'cancel';
      }

      const menuOutputResult = menuOutput.result;

      if (
        menuOutputResult.action === undefined
        || menuOutputResult.action === 'cancel'
      ) {
        return 'cancel';
      }

      if (menuOutputResult.action === 'save') {
        return 'save';
      }

      const categoryKey = menuOutputResult.action;
      const categoryHandler = category[categoryKey].handler;

      await categoryHandler(config);
    }
  }

  /**
   * CLI Utility - Initialize - Prompt project.
   *
   * @param {CLIUtilityInitializePromptProjectConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptProjectReturns}
   *
   * @since 1.0.0
   */
  private static async promptProject(config: CLIUtilityInitializePromptProjectConfig): CLIUtilityInitializePromptProjectReturns {
    const existingProject = config.project;
    const existingProjectName = (existingProject !== undefined) ? existingProject.name : undefined;
    const existingProjectDescription = (existingProject !== undefined) ? existingProject.description : undefined;
    const existingProjectKeywords = (existingProject !== undefined) ? existingProject.keywords : undefined;

    const project = (existingProject !== undefined) ? { ...existingProject } : {};
    const projectName = (existingProjectName !== undefined) ? { ...existingProjectName } : {};
    const projectDescription = (existingProjectDescription !== undefined) ? { ...existingProjectDescription } : {};
    const projectKeywords = (existingProjectKeywords !== undefined) ? [...existingProjectKeywords] : [];

    const questionsOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptProjectQuestionsOutputKeys, CLIUtilityInitializePromptProjectQuestionsOutputResult>([
      {
        type: 'text',
        name: 'projectNameTitle',
        message: 'Project title (display name)',
        initial: projectName.title ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeText(value, Infinity).result,
      },
      {
        type: 'text',
        name: 'projectNameSlug',
        message: 'Project slug (package name)',
        initial: projectName.slug ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeProjectSlug(value).result,
      },
      {
        type: 'text',
        name: 'projectDescriptionShort',
        message: 'Short description',
        initial: projectDescription.short ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeText(value, Infinity).result,
      },
      {
        type: 'text',
        name: 'projectDescriptionLong',
        message: 'Long description',
        initial: projectDescription.long ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeText(value, Infinity).result,
      },
      {
        type: 'text',
        name: 'projectKeywords',
        message: 'Keywords (comma separated)',
        initial: (projectKeywords.length > 0) ? projectKeywords.join(', ') : '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeTextArray(value, 50).result,
      },
    ]);

    if (questionsOutput.cancelled) {
      return 'back';
    }

    const questionsOutputResult = questionsOutput.result;

    const projectNameTitleInput = CLIUtilityInitialize.normalizeText(questionsOutputResult.projectNameTitle, Infinity).sanitized;
    const projectNameSlugInput = CLIUtilityInitialize.normalizeProjectSlug(questionsOutputResult.projectNameSlug).sanitized;
    const projectDescriptionShortInput = CLIUtilityInitialize.normalizeText(questionsOutputResult.projectDescriptionShort, Infinity).sanitized;
    const projectDescriptionLongInput = CLIUtilityInitialize.normalizeText(questionsOutputResult.projectDescriptionLong, Infinity).sanitized;
    const projectKeywordsInput = CLIUtilityInitialize.normalizeTextArray(questionsOutputResult.projectKeywords, 50).sanitized;

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

    // Project.
    if (Object.keys(project).length > 0) {
      Object.assign(config, { project });
    } else {
      Reflect.deleteProperty(config, 'project');
    }

    const previousSlug = (existingProjectName !== undefined) ? existingProjectName.slug ?? '' : '';
    const currentSlug = (config.project !== undefined && config.project.name !== undefined) ? config.project.name.slug ?? '' : '';
    const slugChanged = previousSlug !== currentSlug;

    // Automatically update workspace names for specific roles that use the project slug.
    if (slugChanged && config.workspaces !== undefined) {
      const rolesToSync: CLIUtilityInitializePromptProjectRolesToSync = ['project', 'docs', 'config', 'app', 'tool'];
      const slugPrefix = new RegExp(`^${previousSlug}-`);

      Logger.customize({
        name: 'CLIUtilityInitialize.promptProject',
        purpose: 'updated',
        padTop: 1,
      }).info(`Project slug updated from "${previousSlug || '(unset)'}" to "${currentSlug || '(unset)'}".`);

      for (const workspace of Object.values(config.workspaces)) {
        if (!rolesToSync.includes(workspace.role)) {
          continue;
        }

        const { name } = workspace;

        // If user added a slug, removed the slug, or changed the slug.
        if (previousSlug === '' && currentSlug !== '') {
          workspace.name = `${currentSlug}-${name}`;
        } else if (previousSlug !== '' && currentSlug === '') {
          workspace.name = name.replace(slugPrefix, '');
        } else {
          workspace.name = name.replace(slugPrefix, `${currentSlug}-`);
        }

        Logger.customize({
          name: 'CLIUtilityInitialize.promptProject',
          purpose: 'updated',
        }).info(`Workspace name updated from "${name}" to "${workspace.name}".`);
      }
    }

    Logger.customize({
      name: 'CLIUtilityInitialize.promptProject',
      purpose: 'updated',
      padTop: (slugChanged && config.workspaces !== undefined) ? 0 : 1,
      padBottom: 1,
    }).info('Project details updated.');

    return 'back';
  }

  /**
   * CLI Utility - Initialize - Prompt entities.
   *
   * @param {CLIUtilityInitializePromptEntitiesConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptEntitiesReturns}
   *
   * @since 1.0.0
   */
  private static async promptEntities(config: CLIUtilityInitializePromptEntitiesConfig): CLIUtilityInitializePromptEntitiesReturns {
    const entities: CLIUtilityInitializePromptEntitiesEntities = [];

    // Populate the entities from config.
    if (Array.isArray(config.entities)) {
      for (const configEntity of config.entities) {
        const clonedEntity = { ...configEntity };

        // Entities - Roles.
        if (Array.isArray(configEntity.roles)) {
          clonedEntity.roles = [...configEntity.roles];
        } else {
          Reflect.deleteProperty(clonedEntity, 'roles');
        }

        entities.push(clonedEntity);
      }
    }

    /**
     * CLI Utility - Initialize - Prompt entities - Sync.
     *
     * @returns {CLIUtilityInitializePromptEntitiesSyncReturns}
     *
     * @since 1.0.0
     */
    const sync = (): CLIUtilityInitializePromptEntitiesSyncReturns => {
      if (entities.length > 0) {
        // Entities.
        const normalizedEntities = entities.map((entity) => {
          const normalizedEntity = { ...entity };

          // Entities - Roles.
          if (Array.isArray(entity.roles) && entity.roles.length > 0) {
            normalizedEntity.roles = [...entity.roles];
          } else {
            Reflect.deleteProperty(normalizedEntity, 'roles');
          }

          return normalizedEntity;
        });

        Object.assign(config, { entities: normalizedEntities });
      } else {
        Reflect.deleteProperty(config, 'entities');
      }
    };

    while (true) {
      const choices: CLIUtilityInitializePromptEntitiesChoices = [];

      // Add the "EDIT" and "REMOVE" menu choices for each entity.
      entities.forEach((entity, index) => {
        const entityName = (entity.name !== undefined) ? entity.name.trim() : '';
        const entityEmail = (entity.email !== undefined) ? entity.email.trim() : '';
        const entityRoles = (Array.isArray(entity.roles)) ? entity.roles.filter((role) => role.trim() !== '') : [];

        const label = entityName || entityEmail || `Entity ${index + 1}`;
        const descriptionParts: CLIUtilityInitializePromptEntitiesDescriptionParts = [];

        // Add "email" to menu description for each entity.
        if (entityEmail !== '') {
          descriptionParts.push(entityEmail);
        }

        // Add "roles" to menu description for each entity.
        if (entityRoles.length > 0) {
          const normalizedRoles = entityRoles
            .map((entityRole) => entityRole.trim())
            .filter((entityRole) => entityRole.length > 0)
            .reduce<CLIUtilityInitializePromptEntitiesNormalizedRolesReduce>((unique, entityRole) => {
              if (!unique.includes(entityRole)) {
                unique.push(entityRole);
              }
              return unique;
            }, []);

          if (normalizedRoles.length > 0) {
            descriptionParts.push(normalizedRoles.join(', '));
          }
        }

        const description = descriptionParts.join(' · ');

        choices.push({
          title: `${chalk.yellow.bold('[EDIT]')} ${label}`,
          description: (description !== '') ? description : 'Update this entity.',
          value: {
            kind: 'edit',
            index,
          },
        });

        choices.push({
          title: `${chalk.red.bold('[REMOVE]')} ${label}`,
          description: 'Delete this entity.',
          value: {
            kind: 'remove',
            index,
          },
        });
      });

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

      const menuOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptEntitiesMenuOutputKeys, CLIUtilityInitializePromptEntitiesMenuOutputResult>({
        type: 'select',
        name: 'action',
        message: (entities.length > 0) ? 'Select an entity to manage.' : 'No entities found. Choose an option.',
        choices,
      });

      if (menuOutput.cancelled) {
        return 'back';
      }

      const menuOutputResult = menuOutput.result;

      // If user wants to go back to the main menu.
      if (
        menuOutputResult.action === undefined
        || menuOutputResult.action.kind === 'back'
      ) {
        // Sync changes back to config.
        sync();

        return 'back';
      }

      // If user wants to add an entity.
      if (menuOutputResult.action.kind === 'add') {
        const result = await CLIUtilityInitialize.promptEntitiesForm(undefined, 'create');

        if (result.action === 'back') {
          continue;
        }

        // Add a new entity.
        entities.push(result.entity);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CLIUtilityInitialize.promptEntities',
          purpose: 'add',
          padTop: 1,
          padBottom: 1,
        }).info('Added new entity.');

        continue;
      }

      // If user wants to edit an entity.
      if (menuOutputResult.action.kind === 'edit') {
        const entityIndex = menuOutputResult.action.index;

        // If entity index was out-of-bounds.
        if (entityIndex < 0 || entityIndex >= entities.length) {
          continue;
        }

        const entityToEdit = entities[entityIndex];
        const entityResult = await CLIUtilityInitialize.promptEntitiesForm(entityToEdit, 'update');

        if (entityResult.action === 'back') {
          continue;
        }

        // Update the entity.
        entities[entityIndex] = entityResult.entity;

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CLIUtilityInitialize.promptEntities',
          purpose: 'edit',
          padTop: 1,
          padBottom: 1,
        }).info('Updated entity.');

        continue;
      }

      // If user wants to remove an entity.
      if (menuOutputResult.action.kind === 'remove') {
        const entityIndex = menuOutputResult.action.index;

        // If entity index was out-of-bounds.
        if (entityIndex < 0 || entityIndex >= entities.length) {
          continue;
        }

        const entityToRemove = entities[entityIndex];

        // If entity to remove does not exist.
        if (entityToRemove === undefined) {
          continue;
        }

        const entityName = (typeof entityToRemove.name === 'string') ? entityToRemove.name.trim() : '';
        const entityEmail = (typeof entityToRemove.email === 'string') ? entityToRemove.email.trim() : '';
        const entityLabel = entityName || entityEmail || `Entity ${entityIndex + 1}`;

        const shouldRemove = await CLIUtilityInitialize.promptEntitiesDeleteForm(entityLabel);

        if (shouldRemove !== true) {
          continue;
        }

        // Delete the entity.
        entities.splice(entityIndex, 1);

        // Sync changes back to config.
        sync();

        Logger.customize({
          name: 'CLIUtilityInitialize.promptEntities',
          purpose: 'remove',
          padTop: 1,
          padBottom: 1,
        }).info('Removed entity.');
      }
    }
  }

  /**
   * CLI Utility - Initialize - Prompt entities form.
   *
   * @param {CLIUtilityInitializePromptEntitiesFormEntity} entity - Entity.
   * @param {CLIUtilityInitializePromptEntitiesFormMode}   mode   - Mode.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptEntitiesFormReturns}
   *
   * @since 1.0.0
   */
  private static async promptEntitiesForm(entity: CLIUtilityInitializePromptEntitiesFormEntity, mode: CLIUtilityInitializePromptEntitiesFormMode): CLIUtilityInitializePromptEntitiesFormReturns {
    const validRoles = ['author', 'contributor', 'supporter'] as CLIUtilityInitializePromptEntitiesFormValidRoles;

    const existingName = (entity !== undefined && typeof entity.name === 'string') ? entity.name : '';
    const existingEmail = (entity !== undefined && typeof entity.email === 'string') ? entity.email : '';
    const existingUrl = (entity !== undefined && typeof entity.url === 'string') ? entity.url : '';

    let existingRoles: CLIUtilityInitializePromptEntitiesFormExistingRoles = [];

    // If roles exist inside the entity, add it in.
    if (entity !== undefined && Array.isArray(entity.roles)) {
      existingRoles = entity.roles.filter((role) => validRoles.includes(role));
    }

    const questionsOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptEntitiesFormQuestionsOutputKey, CLIUtilityInitializePromptEntitiesFormQuestionsOutputValue<CLIUtilityInitializePromptEntitiesFormQuestionsOutputKey>>([
      {
        type: 'text',
        name: 'entityName',
        message: 'Entity name',
        initial: existingName,
        validate: (value: unknown) => CLIUtilityInitialize.normalizeText(value, Infinity).result,
      },
      {
        type: 'text',
        name: 'entityEmail',
        message: 'Entity email address',
        initial: existingEmail,
        validate: (value: unknown) => CLIUtilityInitialize.normalizeEmail(value).result,
      },
      {
        type: 'text',
        name: 'entityUrl',
        message: 'Entity website',
        initial: existingUrl,
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
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

    if (questionsOutput.cancelled) {
      return {
        action: 'back',
      };
    }

    const questionsOutputResult = questionsOutput.result;

    const entityNameInput = CLIUtilityInitialize.normalizeText(questionsOutputResult.entityName, Infinity).sanitized;
    const entityEmailInput = CLIUtilityInitialize.normalizeEmail(questionsOutputResult.entityEmail).sanitized;
    const entityUrlInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.entityUrl, 'generic').sanitized;
    const entityRolesInput = Array.isArray(questionsOutputResult.entityRoles) ? [...questionsOutputResult.entityRoles] : [];

    const resolvedEntity: CLIUtilityInitializePromptEntitiesFormResolvedEntity = {};

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
   * CLI Utility - Initialize - Prompt entities delete form.
   *
   * @param {CLIUtilityInitializePromptEntitiesDeleteFormLabel} label - Label.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptEntitiesDeleteFormReturns}
   *
   * @since 1.0.0
   */
  private static async promptEntitiesDeleteForm(label: CLIUtilityInitializePromptEntitiesDeleteFormLabel): CLIUtilityInitializePromptEntitiesDeleteFormReturns {
    const confirmOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputKey, CLIUtilityInitializePromptEntitiesDeleteFormConfirmOutputValue>({
      type: 'confirm',
      name: 'confirm',
      message: `Remove entity "${label}"?`,
      initial: false,
    });

    if (confirmOutput.cancelled) {
      return false;
    }

    const confirmOutputResult = confirmOutput.result;

    return confirmOutputResult.confirm;
  }

  /**
   * CLI Utility - Initialize - Prompt emails.
   *
   * @param {CLIUtilityInitializePromptEmailsConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptEmailsReturns}
   *
   * @since 1.0.0
   */
  private static async promptEmails(config: CLIUtilityInitializePromptEmailsConfig): CLIUtilityInitializePromptEmailsReturns {
    const existingEmails = config.emails;

    const emails = (existingEmails !== undefined) ? { ...existingEmails } : {};

    const questionsOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptEmailsQuestionsOutputKey, CLIUtilityInitializePromptEmailsQuestionsOutputValue>([
      {
        type: 'text',
        name: 'emailsBugs',
        message: 'Issue tracker email',
        initial: emails.bugs ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeEmail(value).result,
      },
    ]);

    if (questionsOutput.cancelled) {
      return 'back';
    }

    const questionsOutputResult = questionsOutput.result;

    const emailsBugsInput = CLIUtilityInitialize.normalizeEmail(questionsOutputResult.emailsBugs).sanitized;

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
      name: 'CLIUtilityInitialize.promptEmails',
      purpose: 'updated',
      padTop: 1,
      padBottom: 1,
    }).info('Email references updated.');

    return 'back';
  }

  /**
   * CLI Utility - Initialize - Prompt urls.
   *
   * @param {CLIUtilityInitializePromptUrlsConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptUrlsReturns}
   *
   * @since 1.0.0
   */
  private static async promptUrls(config: CLIUtilityInitializePromptUrlsConfig): CLIUtilityInitializePromptUrlsReturns {
    const existingUrls = config.urls;

    const urls = (existingUrls !== undefined) ? { ...existingUrls } : {};

    const questionsOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptUrlsQuestionsOutputKey, CLIUtilityInitializePromptUrlsQuestionsOutputValue>([
      {
        type: 'text',
        name: 'urlsHomepage',
        message: 'Homepage URL',
        initial: urls.homepage ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsRepository',
        message: 'Repository URL',
        initial: urls.repository ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'repository').result,
      },
      {
        type: 'text',
        name: 'urlsBugs',
        message: 'Issue tracker URL',
        initial: urls.bugs ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsLicense',
        message: 'License URL',
        initial: urls.license ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsLogo',
        message: 'Logo URL',
        initial: urls.logo ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsDocumentation',
        message: 'Documentation URL',
        initial: urls.documentation ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsGithub',
        message: 'GitHub URL',
        initial: urls.github ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsNpm',
        message: 'npm package URL',
        initial: urls.npm ?? '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrl(value, 'generic').result,
      },
      {
        type: 'text',
        name: 'urlsFundSources',
        message: 'Funding URLs (comma separated)',
        initial: (Array.isArray(urls.fundSources)) ? urls.fundSources.join(', ') : '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeUrlArray(value, 'generic').result,
      },
    ]);

    if (questionsOutput.cancelled) {
      return 'back';
    }

    const questionsOutputResult = questionsOutput.result;

    const urlsHomepageInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsHomepage, 'generic').sanitized;
    const urlsRepositoryInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsRepository, 'repository').sanitized;
    const urlsBugsInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsBugs, 'generic').sanitized;
    const urlsLicenseInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsLicense, 'generic').sanitized;
    const urlsLogoInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsLogo, 'generic').sanitized;
    const urlsDocumentationInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsDocumentation, 'generic').sanitized;
    const urlsGithubInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsGithub, 'generic').sanitized;
    const urlsNpmInput = CLIUtilityInitialize.normalizeUrl(questionsOutputResult.urlsNpm, 'generic').sanitized;
    const urlsFundSourcesInput = CLIUtilityInitialize.normalizeUrlArray(questionsOutputResult.urlsFundSources, 'generic').sanitized;

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

    // URLs - Fund sources.
    if (urlsFundSourcesInput !== undefined) {
      urls.fundSources = urlsFundSourcesInput;
    } else {
      Reflect.deleteProperty(urls, 'fundSources');
    }

    // URLs.
    if (Object.keys(urls).length > 0) {
      Object.assign(config, { urls });
    } else {
      Reflect.deleteProperty(config, 'urls');
    }

    Logger.customize({
      name: 'CLIUtilityInitialize.promptUrls',
      purpose: 'updated',
      padTop: 1,
      padBottom: 1,
    }).info('URL references updated.');

    return 'back';
  }

  /**
   * CLI Utility - Initialize - Prompt workspaces.
   *
   * @param {CLIUtilityInitializePromptWorkspacesConfig} config - Config.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptWorkspacesReturns}
   *
   * @since 1.0.0
   */
  private static async promptWorkspaces(config: CLIUtilityInitializePromptWorkspacesConfig): CLIUtilityInitializePromptWorkspacesReturns {
    const workspaces: CLIUtilityInitializePromptWorkspaces = (config.workspaces) ? { ...(config.workspaces) } : {};

    // The "run" command already guarantees we run in the project root (called "checkPath"), so we can traverse forward directly.
    const rawWorkspacePaths = await discoverPathsWithFile('package.json', 'forward');
    const workspacePaths = rawWorkspacePaths.map((rawWorkspacePath) => {
      const relativePath = relative(process.cwd(), rawWorkspacePath);

      if (relativePath === '') {
        return './';
      }

      return `./${relativePath.split(sep).join('/')}`;
    });

    Logger.customize({
      name: 'CLIUtilityInitialize.promptWorkspaces',
      purpose: 'paths',
    }).debug(workspacePaths);

    while (true) {
      const choices = workspacePaths.map((workspacePath) => {
        const workspace = workspaces[workspacePath];
        const summaryParts: CLIUtilityInitializePromptWorkspacesSummaryParts = [];

        if (workspace !== undefined && workspace.name !== undefined) {
          summaryParts.push(workspace.name);
        }

        if (workspace !== undefined && workspace.role !== undefined) {
          summaryParts.push(workspace.role);
        }

        if (workspace !== undefined && workspace.policy !== undefined) {
          summaryParts.push(workspace.policy);
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

      const menuOutput = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesMenuOutputKey, CLIUtilityInitializePromptWorkspacesMenuOutputValue>({
        type: 'select',
        name: 'workspacePath',
        message: 'Select a workspace to configure.',
        choices,
      });

      if (menuOutput.cancelled) {
        return 'back';
      }

      const menuOutputResult = menuOutput.result;

      if (
        menuOutputResult.workspacePath === undefined
        || menuOutputResult.workspacePath === 'back'
      ) {
        return 'back';
      }

      const workspacePath = menuOutputResult.workspacePath;
      const formResult = await CLIUtilityInitialize.promptWorkspacesForm({
        workspacePath,
        existingWorkspace: workspaces[workspacePath],
        projectSlug: (config.project !== undefined && config.project.name !== undefined) ? config.project.name.slug : undefined,
      });

      if (formResult.action === 'back') {
        continue;
      }

      Reflect.set(workspaces, workspacePath, formResult.workspace);

      Object.assign(config, { workspaces });

      Logger.customize({
        name: 'CLIUtilityInitialize.promptWorkspaces',
        purpose: 'updated',
        padTop: 1,
        padBottom: 1,
      }).info(`Updated workspace "${workspacePath}" → ${formResult.workspace.name} · ${formResult.workspace.role} · ${formResult.workspace.policy}`);
    }
  }

  /**
   * CLI Utility - Initialize - Prompt workspaces form.
   *
   * @param {CLIUtilityInitializePromptWorkspacesFormOptions} options - Options.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptWorkspacesFormReturns}
   *
   * @since 1.0.0
   */
  private static async promptWorkspacesForm(options: CLIUtilityInitializePromptWorkspacesFormOptions): CLIUtilityInitializePromptWorkspacesFormReturns {
    const allowedRoles: CLIUtilityInitializePromptWorkspacesFormAllowedRoles = [
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
    const policy: CLIUtilityInitializePromptWorkspacesFormPolicy = {
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
     * CLI Utility - Initialize - Prompt workspaces form - Resolve name.
     *
     * @param {CLIUtilityInitializePromptWorkspacesFormResolveNameRole} role - Role.
     *
     * @returns {CLIUtilityInitializePromptWorkspacesFormResolveNameReturns}
     *
     * @since 1.0.0
     */
    const resolveName = async (role: CLIUtilityInitializePromptWorkspacesFormResolveNameRole): CLIUtilityInitializePromptWorkspacesFormResolveNameReturns => {
      // "project" (Project root) and "docs" always get a fixed name.
      if (role === 'project' || role === 'docs') {
        if (options.projectSlug === undefined) {
          return (role === 'project') ? 'project' : 'docs';
        }

        return `${options.projectSlug}-${role}`;
      }

      const base = (options.projectSlug !== undefined) ? `${options.projectSlug}-${role}` : role;

      // If current workspace is not "project" or "docs", the workspace name would have a fixed prefix or simple slug.
      const namePrompt = await CLIUtilityInitialize.promptWithCancel<'workspaceName', string>({
        type: 'text',
        name: 'workspaceName',
        message: 'Workspace package name',
        initial: (options.existingWorkspace !== undefined) ? options.existingWorkspace.name ?? '' : '',
        validate: (value: unknown) => CLIUtilityInitialize.normalizeWorkspaceName(value, role, base).result,
      });

      if (namePrompt.cancelled) {
        return undefined;
      }

      return CLIUtilityInitialize.normalizeWorkspaceName(namePrompt.result.workspaceName, role, base).sanitized;
    };

    // For each workspace, the user must select a role.
    const rolePrompt = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesFormRolePromptKey, CLIUtilityInitializePromptWorkspacesFormRolePromptValue>({
      type: 'select',
      name: 'workspaceRole',
      message: `Select a role for "${options.workspacePath}"`,
      choices: allowedRoles.map((role) => ({
        title: role.title,
        description: role.description,
        value: role.value,
      })),
      initial: Math.max(0, allowedRoles.findIndex((role) => options.existingWorkspace !== undefined && role.value === options.existingWorkspace.role)),
    });

    if (rolePrompt.cancelled) {
      return {
        action: 'back',
      };
    }

    const selectedRole = rolePrompt.result.workspaceRole;
    const allowedPolicies = itemAllowedPoliciesByRole[selectedRole];

    // Based on the selected role, list out allowed policy choices.
    const policyPrompt = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesFormPolicyPromptKey, CLIUtilityInitializePromptWorkspacesFormPolicyPromptValue>({
      type: 'select',
      name: 'workspacePolicy',
      message: 'Select a policy',
      choices: allowedPolicies.map((allowedPolicy) => ({
        title: policy[allowedPolicy].label,
        description: policy[allowedPolicy].description,
        value: allowedPolicy,
      })),
      initial: Math.max(0, allowedPolicies.findIndex((policy) => options.existingWorkspace !== undefined && policy === options.existingWorkspace.policy)),
    });

    if (policyPrompt.cancelled) {
      return {
        action: 'back',
      };
    }

    const selectedPolicy = policyPrompt.result.workspacePolicy;
    const resolvedName = await resolveName(selectedRole);

    if (resolvedName === undefined) {
      return {
        action: 'back',
      };
    }

    let syncProperties;

    // "syncProperties" is only for workspaces with a "distributable" policy.
    if (selectedPolicy === 'distributable') {
      const syncPropertiesPrompt = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptKey, CLIUtilityInitializePromptWorkspacesFormSyncPropertiesPromptValue>({
        type: 'multiselect',
        name: 'workspaceSyncProperties',
        message: 'Select metadata properties to sync',
        choices: itemAllowedSyncProperties.map((property) => ({
          title: property,
          value: property,
          selected: (options.existingWorkspace !== undefined && options.existingWorkspace.syncProperties !== undefined) ? options.existingWorkspace.syncProperties.includes(property) : false,
        })),
      });

      if (syncPropertiesPrompt.cancelled) {
        return {
          action: 'back',
        };
      }

      const selectedSyncProperties = syncPropertiesPrompt.result.workspaceSyncProperties;

      if (selectedSyncProperties.length > 0) {
        syncProperties = selectedSyncProperties;
      }
    }

    const pinVersionsPrompt = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptKey, CLIUtilityInitializePromptWorkspacesFormPinVersionsPromptValue>({
      type: 'confirm',
      name: 'workspacePinVersions',
      message: 'Pin dependency versions?',
      initial: options.existingWorkspace !== undefined && options.existingWorkspace.pinVersions === true,
    });

    if (pinVersionsPrompt.cancelled) {
      return {
        action: 'back',
      };
    }

    const selectedPinVersions = pinVersionsPrompt.result.workspacePinVersions;

    const syncLtsEnginesPrompt = await CLIUtilityInitialize.promptWithCancel<CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptKey, CLIUtilityInitializePromptWorkspacesFormSyncLtsEnginesPromptValue>({
      type: 'confirm',
      name: 'workspaceSyncLtsEngines',
      message: 'Sync Node.js LTS engine constraint?',
      initial: options.existingWorkspace !== undefined && options.existingWorkspace.syncLtsEngines === true,
    });

    if (syncLtsEnginesPrompt.cancelled) {
      return {
        action: 'back',
      };
    }

    const selectedSyncLtsEngines = syncLtsEnginesPrompt.result.workspaceSyncLtsEngines;

    return {
      action: 'apply',
      workspace: {
        name: resolvedName,
        role: selectedRole,
        policy: selectedPolicy,
        ...(syncProperties !== undefined) ? { syncProperties } : {},
        ...(selectedPinVersions === true) ? { pinVersions: selectedPinVersions } : {},
        ...(selectedSyncLtsEngines === true) ? { syncLtsEngines: selectedSyncLtsEngines } : {},
      },
    };
  }

  /**
   * CLI Utility - Initialize - Prompt with cancel.
   *
   * @param {CLIUtilityInitializePromptWithCancelQuestions} questions - Questions.
   *
   * @private
   *
   * @returns {CLIUtilityInitializePromptWithCancelReturns}
   *
   * @since 1.0.0
   */
  private static async promptWithCancel<Keys extends string, Result>(questions: CLIUtilityInitializePromptWithCancelQuestions<Keys>): CLIUtilityInitializePromptWithCancelReturns<Keys, Result> {
    let cancelled = false;

    const result = await prompts<Keys>(questions, {
      onCancel: () => {
        cancelled = true;

        return false;
      },
    });

    if (cancelled) {
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
   * CLI Utility - Initialize - Check path.
   *
   * @param {CLIUtilityInitializeCheckPathCurrentDirectory} currentDirectory - Current directory.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeCheckPathReturns}
   *
   * @since 1.0.0
   */
  private static async checkPath(currentDirectory: CLIUtilityInitializeCheckPathCurrentDirectory): CLIUtilityInitializeCheckPathReturns {
    const locations = await discoverPathsWithFile('package.json', 'backward');

    Logger.customize({
      name: 'CLIUtilityInitialize.checkPath',
      purpose: 'detectedLocations',
    }).debug(locations);

    // If command was ran outside of project root directory.
    if (locations.length < 1) {
      Logger.customize({
        name: 'CLIUtilityInitialize.checkPath',
        purpose: 'lessThanOne',
      }).error([
        'No "package.json" files were found. Re-run this command inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n'));

      return false;
    }

    // If command was ran inside a monorepo package.
    if (locations.length > 1) {
      Logger.customize({
        name: 'CLIUtilityInitialize.checkPath',
        purpose: 'greaterThanOne',
      }).error([
        'Multiple "package.json" files were found. Re-run this command inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n'));

      return false;
    }

    // If command was ran outside the project root directory.
    if (locations.length === 1 && locations[0] !== currentDirectory) {
      Logger.customize({
        name: 'CLIUtilityInitialize.checkPath',
        purpose: 'notProjectRootDir',
      }).error([
        'Must be run inside the project root directory.',
        `Current directory is "${currentDirectory}"`,
      ].join('\n'));

      return false;
    }

    return true;
  }

  /**
   * CLI Utility - Initialize - Normalize email.
   *
   * @param {CLIUtilityInitializeNormalizeEmailValue} value - Value.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeEmailReturns}
   *
   * @since 1.0.0
   */
  private static normalizeEmail(value: CLIUtilityInitializeNormalizeEmailValue): CLIUtilityInitializeNormalizeEmailReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    if (!PATTERN_EMAIL_SIMPLE.test(trimmedValue)) {
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
   * CLI Utility - Initialize - Normalize project slug.
   *
   * @param {CLIUtilityInitializeNormalizeProjectSlugValue} value - Value.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeProjectSlugReturns}
   *
   * @since 1.0.0
   */
  private static normalizeProjectSlug(value: CLIUtilityInitializeNormalizeProjectSlugValue): CLIUtilityInitializeNormalizeProjectSlugReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    if (
      trimmedValue.length > 214
      || !new RegExp(PATTERN_SLUG_SIMPLE, 'i').test(trimmedValue)
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
   * CLI Utility - Initialize - Normalize text.
   *
   * @param {CLIUtilityInitializeNormalizeTextValue}     value     - Value.
   * @param {CLIUtilityInitializeNormalizeTextMaxLength} maxLength - Max length.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeTextReturns}
   *
   * @since 1.0.0
   */
  private static normalizeText(value: CLIUtilityInitializeNormalizeTextValue, maxLength: CLIUtilityInitializeNormalizeTextMaxLength): CLIUtilityInitializeNormalizeTextReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

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
   * CLI Utility - Initialize - Normalize text array.
   *
   * @param {CLIUtilityInitializeNormalizeTextArrayValue}            value            - Value.
   * @param {CLIUtilityInitializeNormalizeTextArrayMaxLengthPerItem} maxLengthPerItem - Max length per item.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeTextArrayReturns}
   *
   * @since 1.0.0
   */
  private static normalizeTextArray(value: CLIUtilityInitializeNormalizeTextArrayValue, maxLengthPerItem: CLIUtilityInitializeNormalizeTextArrayMaxLengthPerItem): CLIUtilityInitializeNormalizeTextArrayReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const items = trimmedValue
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    for (let i = 0; i < items.length; i += 1) {
      const { result, sanitized } = CLIUtilityInitialize.normalizeText(items[i], maxLengthPerItem);

      if (result !== true) {
        return {
          result: `Invalid entry "${items[i]}": Input a value under ${maxLengthPerItem} character(s) or remove entry.`,
          sanitized: undefined,
        };
      }

      if (sanitized !== undefined) {
        items[i] = sanitized;
      }
    }

    return {
      result: true,
      sanitized: items,
    };
  }

  /**
   * CLI Utility - Initialize - Normalize url.
   *
   * @param {CLIUtilityInitializeNormalizeUrlValue}    value    - Value.
   * @param {CLIUtilityInitializeNormalizeUrlProtocol} protocol - Protocol.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeUrlReturns}
   *
   * @since 1.0.0
   */
  private static normalizeUrl(value: CLIUtilityInitializeNormalizeUrlValue, protocol: CLIUtilityInitializeNormalizeUrlProtocol): CLIUtilityInitializeNormalizeUrlReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const rules = {
      generic: {
        allowed: ['http:', 'https:'],
        message: 'Enter a valid generic URL (e.g., https://) or leave blank.',
      },
      repository: {
        allowed: ['git:', 'git+https:', 'git+ssh:', 'git+http:', 'http:', 'https:'],
        message: 'Enter a valid repository URL (e.g., git+https://) or leave blank.',
      },
    };

    const allowed = (protocol === 'repository') ? rules.repository.allowed : rules.generic.allowed;
    const errorMessage = (protocol === 'repository') ? rules.repository.message : rules.generic.message;

    try {
      const url = new URL(trimmedValue);

      if (allowed.includes(url.protocol)) {
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
   * CLI Utility - Initialize - Normalize url array.
   *
   * @param {CLIUtilityInitializeNormalizeUrlArrayValue}    value    - Value.
   * @param {CLIUtilityInitializeNormalizeUrlArrayProtocol} protocol - Protocol.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeUrlArrayReturns}
   *
   * @since 1.0.0
   */
  private static normalizeUrlArray(value: CLIUtilityInitializeNormalizeUrlArrayValue, protocol: CLIUtilityInitializeNormalizeUrlArrayProtocol): CLIUtilityInitializeNormalizeUrlArrayReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

    // Allow blanks.
    if (trimmedValue === '') {
      return {
        result: true,
        sanitized: undefined,
      };
    }

    const items = trimmedValue
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    for (let i = 0; i < items.length; i += 1) {
      const { result, sanitized } = CLIUtilityInitialize.normalizeUrl(items[i], protocol);

      if (result !== true) {
        const errorMessages = {
          generic: 'Enter a valid generic URL (e.g., https://) or remove entry.',
          repository: 'Enter a valid repository URL (e.g., git+https://) or remove entry.',
        };
        const errorMessage = (protocol === 'repository') ? errorMessages.repository : errorMessages.generic;

        return {
          result: `Invalid URL "${items[i]}": ${errorMessage}`,
          sanitized: undefined,
        };
      }

      if (sanitized !== undefined) {
        items[i] = sanitized;
      }
    }

    return {
      result: true,
      sanitized: items,
    };
  }

  /**
   * CLI Utility - Initialize - Normalize workspace name.
   *
   * @param {CLIUtilityInitializeNormalizeWorkspaceNameValue} value - Value.
   * @param {CLIUtilityInitializeNormalizeWorkspaceNameRole}  role  - Role.
   * @param {CLIUtilityInitializeNormalizeWorkspaceNameBase}  base  - Base.
   *
   * @private
   *
   * @returns {CLIUtilityInitializeNormalizeWorkspaceNameReturns}
   *
   * @since 1.0.0
   */
  private static normalizeWorkspaceName(value: CLIUtilityInitializeNormalizeWorkspaceNameValue, role: CLIUtilityInitializeNormalizeWorkspaceNameRole, base: CLIUtilityInitializeNormalizeWorkspaceNameBase): CLIUtilityInitializeNormalizeWorkspaceNameReturns {
    if (typeof value !== 'string') {
      return {
        result: `Unexpected type error. Expect type to be "string", got "${typeof value}".`,
        sanitized: undefined,
      };
    }

    const trimmedValue = value.trim();

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
        const expectedPrefix = `${base}-`;

        if (!trimmedValue.startsWith(expectedPrefix)) {
          return {
            result: `Begin with "${expectedPrefix}" and add a descriptor slug.`,
            sanitized: undefined,
          };
        }

        const descriptor = trimmedValue.slice(expectedPrefix.length);

        if (descriptor.length === 0) {
          return {
            result: 'Add a descriptor after the prefix.',
            sanitized: undefined,
          };
        }

        if (!PATTERN_SLUG_SIMPLE.test(descriptor)) {
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
        if (PATTERN_SLUG_SIMPLE.test(trimmedValue) || PATTERN_SLUG_SCOPED.test(trimmedValue)) {
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
