import { promises as fs } from 'fs';
import { join } from 'path';

import {
  libItemAllowedPoliciesByRole,
  libItemAllowedRecipes,
  libItemAllowedRoles,
  libItemEmailFields,
  libItemGenericProtocols,
  libItemRepositoryProtocols,
  libItemUrlFields,
} from './item.js';
import {
  LIB_REGEX_PATTERN_EMAIL_SIMPLE,
  LIB_REGEX_PATTERN_GITHUB_OWNER,
  LIB_REGEX_PATTERN_GITHUB_REPO,
  LIB_REGEX_PATTERN_SLUG_SCOPED,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
} from './regex.js';
import { isFileIdentical, isPlainObject, renameFileWithDate } from './utility.js';

import type {
  Lib_NovaConfig_Runner_Config,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard,
  Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard,
  Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value,
  Lib_NovaConfig_Runner_GetEmail_Email,
  Lib_NovaConfig_Runner_GetEmail_Returns,
  Lib_NovaConfig_Runner_GetEmail_Value,
  Lib_NovaConfig_Runner_GetGithubFeatures_Discussions,
  Lib_NovaConfig_Runner_GetGithubFeatures_Issues,
  Lib_NovaConfig_Runner_GetGithubFeatures_Projects,
  Lib_NovaConfig_Runner_GetGithubFeatures_Result,
  Lib_NovaConfig_Runner_GetGithubFeatures_Returns,
  Lib_NovaConfig_Runner_GetGithubFeatures_Value,
  Lib_NovaConfig_Runner_GetGithubFeatures_Wiki,
  Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch,
  Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch,
  Lib_NovaConfig_Runner_GetGithubPolicies_Result,
  Lib_NovaConfig_Runner_GetGithubPolicies_Returns,
  Lib_NovaConfig_Runner_GetGithubPolicies_Value,
  Lib_NovaConfig_Runner_GetGithubPolicies_Visibility,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash,
  Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value,
  Lib_NovaConfig_Runner_GetGithubRecipes_Result,
  Lib_NovaConfig_Runner_GetGithubRecipes_Returns,
  Lib_NovaConfig_Runner_GetGithubRecipes_SyncFeatures,
  Lib_NovaConfig_Runner_GetGithubRecipes_SyncIdentity,
  Lib_NovaConfig_Runner_GetGithubRecipes_SyncPolicies,
  Lib_NovaConfig_Runner_GetGithubRecipes_Value,
  Lib_NovaConfig_Runner_GetGithubTopics_Returns,
  Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard,
  Lib_NovaConfig_Runner_GetGithubTopics_Value,
  Lib_NovaConfig_Runner_GetNonEmptyString_Returns,
  Lib_NovaConfig_Runner_GetNonEmptyString_String,
  Lib_NovaConfig_Runner_GetNonEmptyString_Value,
  Lib_NovaConfig_Runner_GetUrl_AllowedProtocols,
  Lib_NovaConfig_Runner_GetUrl_CandidateUrl,
  Lib_NovaConfig_Runner_GetUrl_Field,
  Lib_NovaConfig_Runner_GetUrl_IsAllowed,
  Lib_NovaConfig_Runner_GetUrl_Returns,
  Lib_NovaConfig_Runner_GetUrl_Url,
  Lib_NovaConfig_Runner_GetUrl_Value,
  Lib_NovaConfig_Runner_IsEntityRole_TypeGuard,
  Lib_NovaConfig_Runner_IsEntityRole_Value,
  Lib_NovaConfig_Runner_Load_ConfigFileName,
  Lib_NovaConfig_Runner_Load_ConfigPath,
  Lib_NovaConfig_Runner_Load_CurrentDirectory,
  Lib_NovaConfig_Runner_Load_ParsedFile,
  Lib_NovaConfig_Runner_Load_RawFile,
  Lib_NovaConfig_Runner_Load_Returns,
  Lib_NovaConfig_Runner_Parse_Result,
  Lib_NovaConfig_Runner_Parse_Returns,
  Lib_NovaConfig_Runner_Parse_Value,
  Lib_NovaConfig_Runner_ParseEmails,
  Lib_NovaConfig_Runner_ParseEmails_EmailFields,
  Lib_NovaConfig_Runner_ParseEmails_Emails,
  Lib_NovaConfig_Runner_ParseEmails_ParsedEmail,
  Lib_NovaConfig_Runner_ParseEmails_Returns,
  Lib_NovaConfig_Runner_ParseEmails_Value,
  Lib_NovaConfig_Runner_ParseEntities,
  Lib_NovaConfig_Runner_ParseEntities_Email,
  Lib_NovaConfig_Runner_ParseEntities_Entities,
  Lib_NovaConfig_Runner_ParseEntities_Name,
  Lib_NovaConfig_Runner_ParseEntities_ParsedEntity,
  Lib_NovaConfig_Runner_ParseEntities_ParsedRoles,
  Lib_NovaConfig_Runner_ParseEntities_Returns,
  Lib_NovaConfig_Runner_ParseEntities_Roles,
  Lib_NovaConfig_Runner_ParseEntities_SortNameA,
  Lib_NovaConfig_Runner_ParseEntities_SortNameB,
  Lib_NovaConfig_Runner_ParseEntities_Url,
  Lib_NovaConfig_Runner_ParseEntities_Value,
  Lib_NovaConfig_Runner_ParseGithub,
  Lib_NovaConfig_Runner_ParseGithub_Features,
  Lib_NovaConfig_Runner_ParseGithub_Owner,
  Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate,
  Lib_NovaConfig_Runner_ParseGithub_Policies,
  Lib_NovaConfig_Runner_ParseGithub_Recipes,
  Lib_NovaConfig_Runner_ParseGithub_Repo,
  Lib_NovaConfig_Runner_ParseGithub_RepoCandidate,
  Lib_NovaConfig_Runner_ParseGithub_Result,
  Lib_NovaConfig_Runner_ParseGithub_Returns,
  Lib_NovaConfig_Runner_ParseGithub_Topics,
  Lib_NovaConfig_Runner_ParseGithub_Value,
  Lib_NovaConfig_Runner_ParseProject,
  Lib_NovaConfig_Runner_ParseProject_AllowedLicenses,
  Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms,
  Lib_NovaConfig_Runner_ParseProject_Description,
  Lib_NovaConfig_Runner_ParseProject_License,
  Lib_NovaConfig_Runner_ParseProject_Long,
  Lib_NovaConfig_Runner_ParseProject_Name,
  Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms,
  Lib_NovaConfig_Runner_ParseProject_Platform,
  Lib_NovaConfig_Runner_ParseProject_Project,
  Lib_NovaConfig_Runner_ParseProject_Returns,
  Lib_NovaConfig_Runner_ParseProject_Short,
  Lib_NovaConfig_Runner_ParseProject_Slug,
  Lib_NovaConfig_Runner_ParseProject_Title,
  Lib_NovaConfig_Runner_ParseProject_Value,
  Lib_NovaConfig_Runner_ParseProject_ValueDescription,
  Lib_NovaConfig_Runner_ParseProject_ValueKeywords,
  Lib_NovaConfig_Runner_ParseProject_ValueLegalName,
  Lib_NovaConfig_Runner_ParseProject_ValueLicense,
  Lib_NovaConfig_Runner_ParseProject_ValueName,
  Lib_NovaConfig_Runner_ParseProject_ValuePlatforms,
  Lib_NovaConfig_Runner_ParseProject_ValuePronouns,
  Lib_NovaConfig_Runner_ParseProject_ValueStartingYear,
  Lib_NovaConfig_Runner_ParseUrls,
  Lib_NovaConfig_Runner_ParseUrls_FundSources,
  Lib_NovaConfig_Runner_ParseUrls_LoopIndex,
  Lib_NovaConfig_Runner_ParseUrls_ParsedUrl,
  Lib_NovaConfig_Runner_ParseUrls_Returns,
  Lib_NovaConfig_Runner_ParseUrls_UrlField,
  Lib_NovaConfig_Runner_ParseUrls_UrlFields,
  Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex,
  Lib_NovaConfig_Runner_ParseUrls_Urls,
  Lib_NovaConfig_Runner_ParseUrls_Value,
  Lib_NovaConfig_Runner_ParseWorkflows,
  Lib_NovaConfig_Runner_ParseWorkflows_DependsOn,
  Lib_NovaConfig_Runner_ParseWorkflows_Item,
  Lib_NovaConfig_Runner_ParseWorkflows_ParsedSettings,
  Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn,
  Lib_NovaConfig_Runner_ParseWorkflows_RawScopes,
  Lib_NovaConfig_Runner_ParseWorkflows_RawTarget,
  Lib_NovaConfig_Runner_ParseWorkflows_RawTargets,
  Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers,
  Lib_NovaConfig_Runner_ParseWorkflows_Returns,
  Lib_NovaConfig_Runner_ParseWorkflows_Scopes,
  Lib_NovaConfig_Runner_ParseWorkflows_Settings,
  Lib_NovaConfig_Runner_ParseWorkflows_SettingsKey,
  Lib_NovaConfig_Runner_ParseWorkflows_SettingsValue,
  Lib_NovaConfig_Runner_ParseWorkflows_SortedSettingsEntries,
  Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixA,
  Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixB,
  Lib_NovaConfig_Runner_ParseWorkflows_SortTemplateCompare,
  Lib_NovaConfig_Runner_ParseWorkflows_Suffix,
  Lib_NovaConfig_Runner_ParseWorkflows_Target,
  Lib_NovaConfig_Runner_ParseWorkflows_TargetNeeds,
  Lib_NovaConfig_Runner_ParseWorkflows_TargetRawNeeds,
  Lib_NovaConfig_Runner_ParseWorkflows_Targets,
  Lib_NovaConfig_Runner_ParseWorkflows_TargetType,
  Lib_NovaConfig_Runner_ParseWorkflows_TargetWorkingDir,
  Lib_NovaConfig_Runner_ParseWorkflows_Template,
  Lib_NovaConfig_Runner_ParseWorkflows_Triggers,
  Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue,
  Lib_NovaConfig_Runner_ParseWorkflows_Value,
  Lib_NovaConfig_Runner_ParseWorkflows_Workflow,
  Lib_NovaConfig_Runner_ParseWorkflows_Workflows,
  Lib_NovaConfig_Runner_ParseWorkspaces,
  Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies,
  Lib_NovaConfig_Runner_ParseWorkspaces_AllowedRecipes,
  Lib_NovaConfig_Runner_ParseWorkspaces_DisplayNameCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_Enabled,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Name,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns,
  Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Role,
  Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRecipe,
  Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_Options,
  Lib_NovaConfig_Runner_ParseWorkspaces_ParsedSettings,
  Lib_NovaConfig_Runner_ParseWorkspaces_Path,
  Lib_NovaConfig_Runner_ParseWorkspaces_Policy,
  Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_RecipeName,
  Lib_NovaConfig_Runner_ParseWorkspaces_Recipes,
  Lib_NovaConfig_Runner_ParseWorkspaces_RecipesCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_RecipeTuple,
  Lib_NovaConfig_Runner_ParseWorkspaces_Returns,
  Lib_NovaConfig_Runner_ParseWorkspaces_Role,
  Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate,
  Lib_NovaConfig_Runner_ParseWorkspaces_SettingKey,
  Lib_NovaConfig_Runner_ParseWorkspaces_Settings,
  Lib_NovaConfig_Runner_ParseWorkspaces_SettingValue,
  Lib_NovaConfig_Runner_ParseWorkspaces_Slug,
  Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces,
  Lib_NovaConfig_Runner_ParseWorkspaces_Value,
  Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys,
  Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces,
  Lib_NovaConfig_Runner_Save_ConfigPath,
  Lib_NovaConfig_Runner_Save_CurrentDirectory,
  Lib_NovaConfig_Runner_Save_ReplaceFile,
  Lib_NovaConfig_Runner_Save_Returns,
  Lib_NovaConfig_Runner_Set_Config,
  Lib_NovaConfig_Runner_Set_Returns,
} from '../types/lib/nova-config.d.ts';

/**
 * Lib - Nova Config.
 *
 * Loads, parses, and saves the nova.config.json file that drives all CLI commands. Every
 * generator, recipe, and scaffold reads config through this class.
 *
 * @since 0.11.0
 */
export class Runner {
  /**
   * Lib - Nova Config - Config.
   *
   * Holds the parsed nova.config.json object in memory between load, set,
   * and save operations so the config state persists across method calls.
   *
   * @private
   *
   * @since 0.11.0
   */
  #config: Lib_NovaConfig_Runner_Config;

  /**
   * Lib - Nova Config - Constructor.
   *
   * Initializes the config store as an empty object. Callers must follow up
   * with load or set before the config contains usable data.
   *
   * @since 0.11.0
   */
  public constructor() {
    this.#config = {};

    return;
  }

  /**
   * Lib - Nova Config - Load.
   *
   * Reads nova.config.json from the working directory and runs the salvage-first
   * parser so invalid fields are silently dropped rather than causing failures.
   *
   * @returns {Lib_NovaConfig_Runner_Load_Returns}
   *
   * @since 0.11.0
   */
  public async load(): Lib_NovaConfig_Runner_Load_Returns {
    const currentDirectory: Lib_NovaConfig_Runner_Load_CurrentDirectory = process.cwd();
    const configFileName: Lib_NovaConfig_Runner_Load_ConfigFileName = 'nova.config.json';
    const configPath: Lib_NovaConfig_Runner_Load_ConfigPath = join(currentDirectory, configFileName);

    try {
      const rawFile: Lib_NovaConfig_Runner_Load_RawFile = await fs.readFile(configPath, 'utf-8');
      const parsedFile: Lib_NovaConfig_Runner_Load_ParsedFile = JSON.parse(rawFile);

      // Salvage-first method.
      this.#config = this.parse(parsedFile);
    } catch {
      /* empty */
    }

    return this.#config;
  }

  /**
   * Lib - Nova Config - Set.
   *
   * Replaces the in-memory config with a parsed copy of the given object. Called by
   * the initialize command after the user completes the prompt flow.
   *
   * @param {Lib_NovaConfig_Runner_Set_Config} config - Config.
   *
   * @returns {Lib_NovaConfig_Runner_Set_Returns}
   *
   * @since 0.11.0
   */
  public set(config: Lib_NovaConfig_Runner_Set_Config): Lib_NovaConfig_Runner_Set_Returns {
    this.#config = this.parse(config);

    return;
  }

  /**
   * Lib - Nova Config - Save.
   *
   * Writes the parsed config to nova.config.json in the working directory. Skips
   * the write when the file already matches the in-memory state.
   *
   * @param {Lib_NovaConfig_Runner_Save_ReplaceFile} replaceFile - Replace file.
   *
   * @returns {Lib_NovaConfig_Runner_Save_Returns}
   *
   * @since 0.11.0
   */
  public async save(replaceFile: Lib_NovaConfig_Runner_Save_ReplaceFile): Lib_NovaConfig_Runner_Save_Returns {
    this.#config = this.parse(this.#config);

    const currentDirectory: Lib_NovaConfig_Runner_Save_CurrentDirectory = process.cwd();
    const configPath: Lib_NovaConfig_Runner_Save_ConfigPath = join(currentDirectory, 'nova.config.json');

    // No changes detected, skip touching the filesystem.
    if (await isFileIdentical(configPath, this.#config) === true) {
      return;
    }

    // Rename existing file if user chooses not to replace file.
    if (replaceFile === false) {
      await renameFileWithDate(configPath);
    }

    await fs.writeFile(
      configPath,
      `${JSON.stringify(this.#config, null, 2)}\n`,
      'utf-8',
    );

    return;
  }

  /**
   * Lib - Nova Config - Parse.
   *
   * Orchestrates section-level parsers for project, entities, emails, urls, and
   * workspaces. Uses a salvage-first strategy to keep valid fields.
   *
   * @param {Lib_NovaConfig_Runner_Parse_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_Parse_Returns}
   *
   * @since 0.11.0
   */
  private parse(value: Lib_NovaConfig_Runner_Parse_Value): Lib_NovaConfig_Runner_Parse_Returns {
    const result: Lib_NovaConfig_Runner_Parse_Result = {};

    if (isPlainObject(value) === false) {
      return result;
    }

    const project: Lib_NovaConfig_Runner_ParseProject = this.parseProject(value['project']);
    const entities: Lib_NovaConfig_Runner_ParseEntities = this.parseEntities(value['entities']);
    const emails: Lib_NovaConfig_Runner_ParseEmails = this.parseEmails(value['emails']);
    const github: Lib_NovaConfig_Runner_ParseGithub = this.parseGithub(value['github']);
    const workflows: Lib_NovaConfig_Runner_ParseWorkflows = this.parseWorkflows(value['workflows']);
    const urls: Lib_NovaConfig_Runner_ParseUrls = this.parseUrls(value['urls']);
    const workspaces: Lib_NovaConfig_Runner_ParseWorkspaces = this.parseWorkspaces(
      value['workspaces'],
      (project !== undefined && project['name'] !== undefined) ? project['name']['slug'] : undefined,
    );

    if (project !== undefined) {
      result.project = project;
    }

    if (entities !== undefined) {
      result.entities = entities;
    }

    if (emails !== undefined) {
      result.emails = emails;
    }

    if (github !== undefined) {
      result.github = github;
    }

    if (workflows !== undefined) {
      result.workflows = workflows;
    }

    if (urls !== undefined) {
      result.urls = urls;
    }

    if (workspaces !== undefined) {
      result.workspaces = workspaces;
    }

    return result;
  }

  /**
   * Lib - Nova Config - Parse Project.
   *
   * Extracts name, description, keywords, license, platforms, and other identity
   * fields. Downstream commands use these to populate package manifests.
   *
   * @param {Lib_NovaConfig_Runner_ParseProject_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseProject_Returns}
   *
   * @since 0.11.0
   */
  private parseProject(value: Lib_NovaConfig_Runner_ParseProject_Value): Lib_NovaConfig_Runner_ParseProject_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const project: Lib_NovaConfig_Runner_ParseProject_Project = {};

    const valueName: Lib_NovaConfig_Runner_ParseProject_ValueName = value['name'];
    const valueDescription: Lib_NovaConfig_Runner_ParseProject_ValueDescription = value['description'];
    const valueKeywords: Lib_NovaConfig_Runner_ParseProject_ValueKeywords = this.getArrayOfNonEmptyStrings(value['keywords']);

    if (isPlainObject(valueName) === true) {
      const name: Lib_NovaConfig_Runner_ParseProject_Name = {};

      const slug: Lib_NovaConfig_Runner_ParseProject_Slug = this.getNonEmptyString(valueName['slug']);
      const title: Lib_NovaConfig_Runner_ParseProject_Title = this.getNonEmptyString(valueName['title']);

      if (title !== undefined) {
        name.title = title;
      }

      if (slug !== undefined) {
        name.slug = slug;
      }

      if (Object.keys(name).length > 0) {
        project.name = name;
      }
    }

    if (isPlainObject(valueDescription) === true) {
      const description: Lib_NovaConfig_Runner_ParseProject_Description = {};

      const short: Lib_NovaConfig_Runner_ParseProject_Short = this.getNonEmptyString(valueDescription['short']);
      const long: Lib_NovaConfig_Runner_ParseProject_Long = this.getNonEmptyString(valueDescription['long']);

      if (short !== undefined) {
        description.short = short;
      }

      if (long !== undefined) {
        description.long = long;
      }

      if (Object.keys(description).length > 0) {
        project.description = description;
      }
    }

    if (valueKeywords !== undefined) {
      project.keywords = valueKeywords;
    }

    const valueLegalName: Lib_NovaConfig_Runner_ParseProject_ValueLegalName = this.getNonEmptyString(value['legalName']);

    if (valueLegalName !== undefined) {
      project.legalName = valueLegalName;
    }

    const valuePronouns: Lib_NovaConfig_Runner_ParseProject_ValuePronouns = this.getNonEmptyString(value['pronouns']);

    if (valuePronouns === 'personal' || valuePronouns === 'business') {
      project.pronouns = valuePronouns;
    }

    const valuePlatforms: Lib_NovaConfig_Runner_ParseProject_ValuePlatforms = value['platforms'];

    if (Array.isArray(valuePlatforms) === true) {
      const allowedPlatforms: Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms = new Set([
        'nodejs',
        'swift',
        'android',
        'java',
        'kotlin',
        'csharp',
        'php',
        'python',
        'macos',
        'linux',
        'windows',
      ]);
      const parsedPlatforms: Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms = valuePlatforms
        .filter((item): item is Lib_NovaConfig_Runner_ParseProject_Platform => typeof item === 'string' && allowedPlatforms.has(item));

      if (parsedPlatforms.length > 0) {
        project.platforms = parsedPlatforms;
      }
    }

    const valueStartingYear: Lib_NovaConfig_Runner_ParseProject_ValueStartingYear = value['startingYear'];

    if (
      typeof valueStartingYear === 'number'
      && Number.isInteger(valueStartingYear) === true
      && valueStartingYear >= 1970
    ) {
      project.startingYear = valueStartingYear;
    }

    const valueLicense: Lib_NovaConfig_Runner_ParseProject_ValueLicense = this.getNonEmptyString(value['license']);
    const allowedLicenses: Lib_NovaConfig_Runner_ParseProject_AllowedLicenses = new Set([
      'AGPL-3.0',
      'Apache-2.0',
      'BSD-2-Clause',
      'BSD-3-Clause',
      'BSL-1.0',
      'CC0-1.0',
      'EPL-2.0',
      'GPL-2.0',
      'GPL-3.0',
      'LGPL-2.1',
      'MIT',
      'MPL-2.0',
      'Proprietary',
      'Unlicense',
    ]);

    if (valueLicense !== undefined && allowedLicenses.has(valueLicense) === true) {
      project.license = valueLicense as Lib_NovaConfig_Runner_ParseProject_License;
    }

    return (Object.keys(project).length > 0) ? project : undefined;
  }

  /**
   * Lib - Nova Config - Parse Entities.
   *
   * Validates each entity object for name, email, url, and roles. The sync-ownership
   * recipe consumes entities to populate package.json author fields.
   *
   * @param {Lib_NovaConfig_Runner_ParseEntities_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEntities_Returns}
   *
   * @since 0.11.0
   */
  private parseEntities(value: Lib_NovaConfig_Runner_ParseEntities_Value): Lib_NovaConfig_Runner_ParseEntities_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const entities: Lib_NovaConfig_Runner_ParseEntities_Entities = value
      .filter(isPlainObject)
      .map((entity) => {
        const parsedEntity: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = {};

        const name: Lib_NovaConfig_Runner_ParseEntities_Name = this.getNonEmptyString(entity['name']);
        const email: Lib_NovaConfig_Runner_ParseEntities_Email = this.getEmail(entity['email']);
        const url: Lib_NovaConfig_Runner_ParseEntities_Url = this.getUrl(entity['url']);
        const roles: Lib_NovaConfig_Runner_ParseEntities_Roles = entity['roles'];

        if (name !== undefined) {
          parsedEntity.name = name;
        }

        if (email !== undefined) {
          parsedEntity.email = email;
        }

        if (url !== undefined) {
          parsedEntity.url = url;
        }

        if (Array.isArray(roles) === true) {
          const parsedRoles: Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = roles.filter(this['isEntityRole']);

          if (parsedRoles.length > 0) {
            parsedEntity.roles = parsedRoles;
          }
        }

        return (Object.keys(parsedEntity).length > 0) ? parsedEntity : null;
      })
      .filter((entity): entity is Lib_NovaConfig_Runner_ParseEntities_ParsedEntity => entity !== null);

    if (entities.length === 0) {
      return undefined;
    }

    entities.sort((a, b) => {
      const nameA: Lib_NovaConfig_Runner_ParseEntities_SortNameA = a['name'] ?? '';
      const nameB: Lib_NovaConfig_Runner_ParseEntities_SortNameB = b['name'] ?? '';

      return nameA.localeCompare(nameB);
    });

    return entities;
  }

  /**
   * Lib - Nova Config - Parse Emails.
   *
   * Iterates over the allowed email field names from libItemEmailFields and validates
   * each address. Currently only the bugs email field is supported.
   *
   * @param {Lib_NovaConfig_Runner_ParseEmails_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseEmails_Returns}
   *
   * @since 0.11.0
   */
  private parseEmails(value: Lib_NovaConfig_Runner_ParseEmails_Value): Lib_NovaConfig_Runner_ParseEmails_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const emails: Lib_NovaConfig_Runner_ParseEmails_Emails = {};
    const emailFields: Lib_NovaConfig_Runner_ParseEmails_EmailFields = libItemEmailFields;

    for (const emailField of emailFields) {
      const parsedEmail: Lib_NovaConfig_Runner_ParseEmails_ParsedEmail = this.getEmail(value[emailField]);

      if (parsedEmail !== undefined) {
        Reflect.set(emails, emailField, parsedEmail);
      }
    }

    return (Object.keys(emails).length > 0) ? emails : undefined;
  }

  /**
   * Lib - Nova Config - Parse URLs.
   *
   * Validates url fields like homepage, repository, bugs, license, and logo. Also
   * parses the fundSources array used by the funding generator.
   *
   * @param {Lib_NovaConfig_Runner_ParseUrls_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseUrls_Returns}
   *
   * @since 0.11.0
   */
  private parseUrls(value: Lib_NovaConfig_Runner_ParseUrls_Value): Lib_NovaConfig_Runner_ParseUrls_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const urls: Lib_NovaConfig_Runner_ParseUrls_Urls = {};
    const urlFields: Lib_NovaConfig_Runner_ParseUrls_UrlFields = libItemUrlFields;
    const urlFieldsFundSourcesIndex: Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex = urlFields.indexOf('privacyPolicy');

    for (let i: Lib_NovaConfig_Runner_ParseUrls_LoopIndex = 0; i < urlFields.length; i += 1) {
      // Insert fundSources before privacyPolicy to match prompt order.
      if (i === urlFieldsFundSourcesIndex) {
        const fundSources: Lib_NovaConfig_Runner_ParseUrls_FundSources = this.getArrayOfHttpUrls(value['fundSources']);

        if (fundSources !== undefined) {
          urls.fundSources = fundSources;
        }
      }

      const urlField: Lib_NovaConfig_Runner_ParseUrls_UrlField = urlFields[i]!;
      const parsedUrl: Lib_NovaConfig_Runner_ParseUrls_ParsedUrl = this.getUrl(value[urlField], (urlField === 'repository') ? 'repository' : 'generic');

      if (parsedUrl !== undefined) {
        Reflect.set(urls, urlField, parsedUrl);
      }
    }

    return (Object.keys(urls).length > 0) ? urls : undefined;
  }

  /**
   * Lib - Nova Config - Parse Workspaces.
   *
   * Maps workspace paths to their name, role, policy, and recipe settings. Enforces
   * naming conventions that depend on the project slug.
   *
   * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Value} value - Value.
   * @param {Lib_NovaConfig_Runner_ParseWorkspaces_Slug}  slug  - Slug.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseWorkspaces_Returns}
   *
   * @since 0.11.0
   */
  private parseWorkspaces(value: Lib_NovaConfig_Runner_ParseWorkspaces_Value, slug: Lib_NovaConfig_Runner_ParseWorkspaces_Slug): Lib_NovaConfig_Runner_ParseWorkspaces_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const workspaces: Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces = {};

    /**
     * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
     *
     * Checks that a workspace name follows the naming pattern required by its role.
     * Singular roles need exact matches while others need a suffix.
     *
     * @param {Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Role} role - Role.
     * @param {Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Name} name - Name.
     *
     * @private
     *
     * @returns {Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns}
     *
     * @since 0.11.0
     */
    const isNameAllowed: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed = (role: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Role, name: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Name): Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns => {
      switch (role) {
        case 'project': {
          if (slug !== undefined) {
            return name === `${slug}-project`;
          }

          return name === 'project';
        }

        case 'docs': {
          if (slug !== undefined) {
            return name === `${slug}-docs`;
          }

          return name === 'docs';
        }

        case 'tool':
        case 'config':
        case 'app': {
          const base: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base = (slug !== undefined) ? `${slug}-${role}` : role;

          if (name.startsWith(`${base}-`) === false) {
            return false;
          }

          const descriptor: Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor = name.slice(base.length + 1);

          return descriptor.length > 0 && LIB_REGEX_PATTERN_SLUG_SIMPLE.test(descriptor);
        }

        case 'template':
        case 'package': {
          return LIB_REGEX_PATTERN_SLUG_SIMPLE.test(name) || LIB_REGEX_PATTERN_SLUG_SCOPED.test(name);
        }

        default: {
          return false;
        }
      }
    };

    for (const valueEntry of Object.entries(value)) {
      const path: Lib_NovaConfig_Runner_ParseWorkspaces_Path = valueEntry[0];
      const options: Lib_NovaConfig_Runner_ParseWorkspaces_Options = valueEntry[1];

      if (isPlainObject(options) === false) {
        continue;
      }

      const nameCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate = this.getNonEmptyString(options['name']);
      const displayNameCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_DisplayNameCandidate = this.getNonEmptyString(options['displayName']);
      const roleCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = this.getNonEmptyString(options['role']);
      const policyCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = this.getNonEmptyString(options['policy']);

      if (nameCandidate === undefined) {
        continue;
      }

      const role: Lib_NovaConfig_Runner_ParseWorkspaces_Role = libItemAllowedRoles.find((itemAllowedRole) => itemAllowedRole === roleCandidate);

      if (role === undefined) {
        continue;
      }

      const allowedPolicies: Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = libItemAllowedPoliciesByRole[role];
      const policy: Lib_NovaConfig_Runner_ParseWorkspaces_Policy = allowedPolicies.find((allowedPolicy) => allowedPolicy === policyCandidate);

      if (policy === undefined) {
        continue;
      }

      if (isNameAllowed(role, nameCandidate) === false) {
        continue;
      }

      let recipes: Lib_NovaConfig_Runner_ParseWorkspaces_Recipes = undefined;

      const recipesCandidate: Lib_NovaConfig_Runner_ParseWorkspaces_RecipesCandidate = options['recipes'];

      if (isPlainObject(recipesCandidate) === true) {
        const allowedRecipes: Lib_NovaConfig_Runner_ParseWorkspaces_AllowedRecipes = new Set(libItemAllowedRecipes);
        const parsedRecipes: Lib_NovaConfig_Runner_ParseWorkspaces_Recipes = {};

        for (const recipesCandidateEntry of Object.entries(recipesCandidate)) {
          const recipeName: Lib_NovaConfig_Runner_ParseWorkspaces_RecipeName = recipesCandidateEntry[0];
          const recipeTuple: Lib_NovaConfig_Runner_ParseWorkspaces_RecipeTuple = recipesCandidateEntry[1];

          const matchedRecipe: Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRecipe = [...allowedRecipes].find(
            (allowedRecipe) => allowedRecipe === recipeName,
          );

          if (matchedRecipe === undefined) {
            continue;
          }

          if (Array.isArray(recipeTuple) === false || recipeTuple.length === 0) {
            continue;
          }

          const enabled: Lib_NovaConfig_Runner_ParseWorkspaces_Enabled = recipeTuple[0];

          if (typeof enabled !== 'boolean') {
            continue;
          }

          const settings: Lib_NovaConfig_Runner_ParseWorkspaces_Settings = recipeTuple[1];

          if (settings !== undefined && isPlainObject(settings) === true) {
            const parsedSettings: Lib_NovaConfig_Runner_ParseWorkspaces_ParsedSettings = {};

            for (const settingsEntry of Object.entries(settings)) {
              const settingKey: Lib_NovaConfig_Runner_ParseWorkspaces_SettingKey = settingsEntry[0];
              const settingValue: Lib_NovaConfig_Runner_ParseWorkspaces_SettingValue = settingsEntry[1];

              if (typeof settingValue === 'boolean') {
                Reflect.set(parsedSettings, settingKey, settingValue);
              }
            }

            if (Object.keys(parsedSettings).length > 0) {
              Reflect.set(parsedRecipes, matchedRecipe, [
                enabled,
                parsedSettings,
              ]);
            } else {
              Reflect.set(parsedRecipes, matchedRecipe, [enabled]);
            }
          } else {
            Reflect.set(parsedRecipes, matchedRecipe, [enabled]);
          }
        }

        if (Object.keys(parsedRecipes).length > 0) {
          recipes = parsedRecipes;
        }
      }

      Reflect.set(workspaces, path, {
        role,
        policy,
        name: nameCandidate,
        ...(displayNameCandidate !== undefined) ? { displayName: displayNameCandidate } : {},
        ...(recipes !== undefined) ? { recipes } : {},
      });
    }

    const workspaceKeys: Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys = Object.keys(workspaces);

    if (workspaceKeys.length === 0) {
      return undefined;
    }

    const sortedWorkspaces: Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces = {};

    workspaceKeys.sort((a, b) => a.localeCompare(b));

    for (const key of workspaceKeys) {
      Reflect.set(sortedWorkspaces, key, Reflect.get(workspaces, key));
    }

    return sortedWorkspaces;
  }

  /**
   * Lib - Nova Config - Parse Workflows.
   *
   * Validates each workflow object for template, optional suffix, triggers,
   * optional depends-on, and optional settings. Settings values must be strings;
   * non-string values are dropped.
   *
   * @param {Lib_NovaConfig_Runner_ParseWorkflows_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseWorkflows_Returns}
   *
   * @since 0.20.0
   */
  private parseWorkflows(value: Lib_NovaConfig_Runner_ParseWorkflows_Value): Lib_NovaConfig_Runner_ParseWorkflows_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const workflows: Lib_NovaConfig_Runner_ParseWorkflows_Workflows = [];

    for (const item of value) {
      const castItem: Lib_NovaConfig_Runner_ParseWorkflows_Item = item;

      if (isPlainObject(castItem) === false) {
        continue;
      }

      const template: Lib_NovaConfig_Runner_ParseWorkflows_Template = this.getNonEmptyString(castItem['template']);

      if (template === undefined) {
        continue;
      }

      const suffix: Lib_NovaConfig_Runner_ParseWorkflows_Suffix = this.getNonEmptyString(castItem['suffix']);

      if (suffix === undefined) {
        continue;
      }

      const rawTriggers: Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = castItem['triggers'];

      if (Array.isArray(rawTriggers) === false) {
        continue;
      }

      const triggers: Lib_NovaConfig_Runner_ParseWorkflows_Triggers = [];

      for (const trigger of rawTriggers) {
        const triggerValue: Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = this.getNonEmptyString(trigger);

        if (triggerValue !== undefined) {
          triggers.push(triggerValue);
        }
      }

      const rawDependsOn: Lib_NovaConfig_Runner_ParseWorkflows_RawDependsOn = castItem['depends-on'];
      const dependsOn: Lib_NovaConfig_Runner_ParseWorkflows_DependsOn = (Array.isArray(rawDependsOn) === true) ? rawDependsOn.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_DependsOn : [];
      const rawScopes: Lib_NovaConfig_Runner_ParseWorkflows_RawScopes = castItem['scopes'];
      const scopes: Lib_NovaConfig_Runner_ParseWorkflows_Scopes = (Array.isArray(rawScopes) === true) ? rawScopes.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_Scopes : [];
      const rawTargets: Lib_NovaConfig_Runner_ParseWorkflows_RawTargets = castItem['targets'];
      const targets: Lib_NovaConfig_Runner_ParseWorkflows_Targets = [];

      if (Array.isArray(rawTargets) === true) {
        for (const rawTarget of rawTargets) {
          const rawTargetValue: Lib_NovaConfig_Runner_ParseWorkflows_RawTarget = rawTarget;

          if (isPlainObject(rawTargetValue) === false) {
            continue;
          }

          const targetType: Lib_NovaConfig_Runner_ParseWorkflows_TargetType = this.getNonEmptyString(rawTargetValue['type']);
          const targetWorkingDir: Lib_NovaConfig_Runner_ParseWorkflows_TargetWorkingDir = this.getNonEmptyString(rawTargetValue['workingDir']);

          if (targetType === undefined || targetWorkingDir === undefined) {
            continue;
          }

          const rawTargetNeeds: Lib_NovaConfig_Runner_ParseWorkflows_TargetRawNeeds = rawTargetValue['needs'];
          const targetNeeds: Lib_NovaConfig_Runner_ParseWorkflows_TargetNeeds = (Array.isArray(rawTargetNeeds) === true) ? rawTargetNeeds.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as Lib_NovaConfig_Runner_ParseWorkflows_TargetNeeds : [];

          const target: Lib_NovaConfig_Runner_ParseWorkflows_Target = {
            type: targetType,
            workingDir: targetWorkingDir,
          };

          if (targetNeeds.length > 0) {
            Reflect.set(target, 'needs', targetNeeds);
          }

          targets.push(target);
        }
      }

      const settings: Lib_NovaConfig_Runner_ParseWorkflows_Settings = castItem['settings'];

      // Build workflow object with properties in type-definition order: template, suffix, triggers, depends-on, scopes, targets, settings.
      const workflow: Lib_NovaConfig_Runner_ParseWorkflows_Workflow = {
        template,
        suffix,
        triggers,
      };

      if (dependsOn.length > 0) {
        Reflect.set(workflow, 'depends-on', dependsOn);
      }

      if (scopes.length > 0) {
        Reflect.set(workflow, 'scopes', scopes);
      }

      if (targets.length > 0) {
        Reflect.set(workflow, 'targets', targets);
      }

      if (isPlainObject(settings) === true) {
        const parsedSettings: Lib_NovaConfig_Runner_ParseWorkflows_ParsedSettings = {};
        const sortedSettingsEntries: Lib_NovaConfig_Runner_ParseWorkflows_SortedSettingsEntries = Object.entries(settings).sort(
          (a, b) => a[0].localeCompare(b[0]),
        );

        for (const settingsEntry of sortedSettingsEntries) {
          const settingsKey: Lib_NovaConfig_Runner_ParseWorkflows_SettingsKey = settingsEntry[0];
          const settingsValue: Lib_NovaConfig_Runner_ParseWorkflows_SettingsValue = settingsEntry[1];

          if (typeof settingsValue === 'string') {
            Reflect.set(parsedSettings, settingsKey, settingsValue);
          }
        }

        if (Object.keys(parsedSettings).length > 0) {
          workflow.settings = parsedSettings;
        }
      }

      workflows.push(workflow);
    }

    if (workflows.length === 0) {
      return undefined;
    }

    // Sort workflows by template, then by suffix.
    workflows.sort((a, b) => {
      const templateCompare: Lib_NovaConfig_Runner_ParseWorkflows_SortTemplateCompare = a['template'].localeCompare(b['template']);

      if (templateCompare !== 0) {
        return templateCompare;
      }

      const suffixA: Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixA = a['suffix'] ?? '';
      const suffixB: Lib_NovaConfig_Runner_ParseWorkflows_SortSuffixB = b['suffix'] ?? '';

      return suffixA.localeCompare(suffixB);
    });

    return workflows;
  }

  /**
   * Lib - Nova Config - Parse GitHub.
   *
   * Parses the github block from the config, extracting owner, repo, recipes,
   * topics, features, and policies. Returns undefined when the block is absent or
   * not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_ParseGithub_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_ParseGithub_Returns}
   *
   * @since 0.22.0
   */
  private parseGithub(value: Lib_NovaConfig_Runner_ParseGithub_Value): Lib_NovaConfig_Runner_ParseGithub_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_ParseGithub_Result = {};

    const ownerCandidate: Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = this.getNonEmptyString(value['owner']);
    const owner: Lib_NovaConfig_Runner_ParseGithub_Owner = (ownerCandidate !== undefined && LIB_REGEX_PATTERN_GITHUB_OWNER.test(ownerCandidate) === true) ? ownerCandidate : undefined;

    if (owner !== undefined) {
      result.owner = owner;
    }

    const repoCandidate: Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = this.getNonEmptyString(value['repo']);
    const repo: Lib_NovaConfig_Runner_ParseGithub_Repo = (repoCandidate !== undefined && LIB_REGEX_PATTERN_GITHUB_REPO.test(repoCandidate) === true) ? repoCandidate : undefined;

    if (repo !== undefined) {
      result.repo = repo;
    }

    const recipes: Lib_NovaConfig_Runner_ParseGithub_Recipes = this.getGithubRecipes(value['recipes']);

    if (recipes !== undefined) {
      result.recipes = recipes;
    }

    const topics: Lib_NovaConfig_Runner_ParseGithub_Topics = this.getGithubTopics(value['topics']);

    if (topics !== undefined) {
      result.topics = topics;
    }

    const features: Lib_NovaConfig_Runner_ParseGithub_Features = this.getGithubFeatures(value['features']);

    if (features !== undefined) {
      result.features = features;
    }

    const policies: Lib_NovaConfig_Runner_ParseGithub_Policies = this.getGithubPolicies(value['policies']);

    if (policies !== undefined) {
      result.policies = policies;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Features.
   *
   * Parses the github.features block for boolean feature flags: issues, wiki,
   * projects, and discussions. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubFeatures_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubFeatures_Returns}
   *
   * @since 0.22.0
   */
  private getGithubFeatures(value: Lib_NovaConfig_Runner_GetGithubFeatures_Value): Lib_NovaConfig_Runner_GetGithubFeatures_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubFeatures_Result = {};

    const issues: Lib_NovaConfig_Runner_GetGithubFeatures_Issues = (typeof value['issues'] === 'boolean') ? value['issues'] : undefined;

    if (issues !== undefined) {
      result.issues = issues;
    }

    const wiki: Lib_NovaConfig_Runner_GetGithubFeatures_Wiki = (typeof value['wiki'] === 'boolean') ? value['wiki'] : undefined;

    if (wiki !== undefined) {
      result.wiki = wiki;
    }

    const projects: Lib_NovaConfig_Runner_GetGithubFeatures_Projects = (typeof value['projects'] === 'boolean') ? value['projects'] : undefined;

    if (projects !== undefined) {
      result.projects = projects;
    }

    const discussions: Lib_NovaConfig_Runner_GetGithubFeatures_Discussions = (typeof value['discussions'] === 'boolean') ? value['discussions'] : undefined;

    if (discussions !== undefined) {
      result.discussions = discussions;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Policies.
   *
   * Parses the github.policies block for visibility, defaultBranch, mergeMethods,
   * and autoDeleteHeadBranch. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubPolicies_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubPolicies_Returns}
   *
   * @since 0.22.0
   */
  private getGithubPolicies(value: Lib_NovaConfig_Runner_GetGithubPolicies_Value): Lib_NovaConfig_Runner_GetGithubPolicies_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubPolicies_Result = {};

    let visibility: Lib_NovaConfig_Runner_GetGithubPolicies_Visibility = undefined;

    if (
      value['visibility'] === 'public'
      || value['visibility'] === 'private'
      || value['visibility'] === 'internal'
    ) {
      visibility = value['visibility'];
    }

    if (visibility !== undefined) {
      result.visibility = visibility;
    }

    const defaultBranch: Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch = this.getNonEmptyString(value['defaultBranch']);

    if (defaultBranch !== undefined) {
      result.defaultBranch = defaultBranch;
    }

    const mergeMethods: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods = this.getGithubPoliciesMergeMethods(value['mergeMethods']);

    if (mergeMethods !== undefined) {
      result.mergeMethods = mergeMethods;
    }

    const autoDeleteHeadBranch: Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch = (typeof value['autoDeleteHeadBranch'] === 'boolean') ? value['autoDeleteHeadBranch'] : undefined;

    if (autoDeleteHeadBranch !== undefined) {
      result.autoDeleteHeadBranch = autoDeleteHeadBranch;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Policies Merge Methods.
   *
   * Parses the github.policies.mergeMethods block for merge, squash, and rebase
   * boolean flags. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns}
   *
   * @since 0.22.0
   */
  private getGithubPoliciesMergeMethods(value: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value): Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result = {};

    const merge: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = (typeof value['merge'] === 'boolean') ? value['merge'] : undefined;

    if (merge !== undefined) {
      result.merge = merge;
    }

    const squash: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = (typeof value['squash'] === 'boolean') ? value['squash'] : undefined;

    if (squash !== undefined) {
      result.squash = squash;
    }

    const rebase: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = (typeof value['rebase'] === 'boolean') ? value['rebase'] : undefined;

    if (rebase !== undefined) {
      result.rebase = rebase;
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Recipes.
   *
   * Parses the github.recipes block for sync-identity, sync-features, and
   * sync-policies boolean flags. Returns undefined when the input is not a plain object.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubRecipes_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubRecipes_Returns}
   *
   * @since 0.22.0
   */
  private getGithubRecipes(value: Lib_NovaConfig_Runner_GetGithubRecipes_Value): Lib_NovaConfig_Runner_GetGithubRecipes_Returns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const result: Lib_NovaConfig_Runner_GetGithubRecipes_Result = {};

    const syncIdentity: Lib_NovaConfig_Runner_GetGithubRecipes_SyncIdentity = (typeof value['sync-identity'] === 'boolean') ? value['sync-identity'] : undefined;

    if (syncIdentity !== undefined) {
      Reflect.set(result, 'sync-identity', syncIdentity);
    }

    const syncFeatures: Lib_NovaConfig_Runner_GetGithubRecipes_SyncFeatures = (typeof value['sync-features'] === 'boolean') ? value['sync-features'] : undefined;

    if (syncFeatures !== undefined) {
      Reflect.set(result, 'sync-features', syncFeatures);
    }

    const syncPolicies: Lib_NovaConfig_Runner_GetGithubRecipes_SyncPolicies = (typeof value['sync-policies'] === 'boolean') ? value['sync-policies'] : undefined;

    if (syncPolicies !== undefined) {
      Reflect.set(result, 'sync-policies', syncPolicies);
    }

    return (Object.keys(result).length > 0) ? result : undefined;
  }

  /**
   * Lib - Nova Config - Get GitHub Topics.
   *
   * Filters an array down to string-only entries for the github.topics field.
   * Returns undefined when the input is not an array; returns the filtered array
   * even when empty because an empty topics list is meaningful.
   *
   * @param {Lib_NovaConfig_Runner_GetGithubTopics_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetGithubTopics_Returns}
   *
   * @since 0.22.0
   */
  private getGithubTopics(value: Lib_NovaConfig_Runner_GetGithubTopics_Value): Lib_NovaConfig_Runner_GetGithubTopics_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    return value.filter((item): item is Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard => typeof item === 'string');
  }

  /**
   * Lib - Nova Config - Is Entity Role.
   *
   * Type guard that narrows a value to one of the three allowed entity roles: author,
   * contributor, or supporter. Used by parseEntities as a filter.
   *
   * @param {Lib_NovaConfig_Runner_IsEntityRole_Value} value - Value.
   *
   * @private
   *
   * @returns {boolean}
   *
   * @since 0.11.0
   */
  private isEntityRole(value: Lib_NovaConfig_Runner_IsEntityRole_Value): value is Lib_NovaConfig_Runner_IsEntityRole_TypeGuard {
    return (
      value === 'author'
      || value === 'contributor'
      || value === 'supporter'
    );
  }

  /**
   * Lib - Nova Config - Get Array Of Non Empty Strings.
   *
   * Filters an array down to trimmed non-empty string entries. Used by parseProject
   * to validate the keywords list in the project section.
   *
   * @param {Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns}
   *
   * @since 0.11.0
   */
  private getArrayOfNonEmptyStrings(value: Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value): Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items = value
      .map((item) => this.getNonEmptyString(item))
      .filter((item): item is Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Array Of HTTP URLs.
   *
   * Validates each array entry as a URL through getUrl and discards invalid ones. Used by
   * parseUrls to parse the fundSources list for Sponsors.
   *
   * @param {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value} value   - Value.
   * @param {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field} [field] - Field.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns}
   *
   * @since 0.11.0
   */
  private getArrayOfHttpUrls(value: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value, field?: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field): Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items = value
      .map((item) => this.getUrl(item, field))
      .filter((item): item is Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Email.
   *
   * Returns the trimmed value only when it passes the simple email regex check. Called by
   * parseEmails for config fields and parseEntities for people.
   *
   * @param {Lib_NovaConfig_Runner_GetEmail_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetEmail_Returns}
   *
   * @since 0.11.0
   */
  private getEmail(value: Lib_NovaConfig_Runner_GetEmail_Value): Lib_NovaConfig_Runner_GetEmail_Returns {
    const email: Lib_NovaConfig_Runner_GetEmail_Email = this.getNonEmptyString(value);

    if (email === undefined) {
      return undefined;
    }

    if (LIB_REGEX_PATTERN_EMAIL_SIMPLE.test(email) === false) {
      return undefined;
    }

    return email;
  }

  /**
   * Lib - Nova Config - Get URL.
   *
   * Parses the value as a URL and checks its protocol against the allowed list.
   * Repository fields allow git protocols while others only allow http.
   *
   * @param {Lib_NovaConfig_Runner_GetUrl_Value} value   - Value.
   * @param {Lib_NovaConfig_Runner_GetUrl_Field} [field] - Field.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetUrl_Returns}
   *
   * @since 0.11.0
   */
  private getUrl(value: Lib_NovaConfig_Runner_GetUrl_Value, field?: Lib_NovaConfig_Runner_GetUrl_Field): Lib_NovaConfig_Runner_GetUrl_Returns {
    const candidateUrl: Lib_NovaConfig_Runner_GetUrl_CandidateUrl = this.getNonEmptyString(value);

    if (candidateUrl === undefined) {
      return undefined;
    }

    try {
      const url: Lib_NovaConfig_Runner_GetUrl_Url = new URL(candidateUrl);

      const allowedProtocols: Lib_NovaConfig_Runner_GetUrl_AllowedProtocols = (field === 'repository') ? libItemRepositoryProtocols : libItemGenericProtocols;
      const isAllowed: Lib_NovaConfig_Runner_GetUrl_IsAllowed = allowedProtocols.some(
        (allowedProtocol) => allowedProtocol === url.protocol,
      );

      return (isAllowed === true) ? candidateUrl : undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Lib - Nova Config - Get Non Empty String.
   *
   * Trims and returns a string only when the result is non-empty. Serves as the
   * base validator for nearly every scalar field in the config file.
   *
   * @param {Lib_NovaConfig_Runner_GetNonEmptyString_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_NovaConfig_Runner_GetNonEmptyString_Returns}
   *
   * @since 0.11.0
   */
  private getNonEmptyString(value: Lib_NovaConfig_Runner_GetNonEmptyString_Value): Lib_NovaConfig_Runner_GetNonEmptyString_Returns {
    if (typeof value !== 'string') {
      return undefined;
    }

    const string: Lib_NovaConfig_Runner_GetNonEmptyString_String = value.trim();

    return (string.length > 0) ? string : undefined;
  }
}
