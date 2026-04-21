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
import { LIB_REGEX_PATTERN_EMAIL_SIMPLE, LIB_REGEX_PATTERN_SLUG_SCOPED, LIB_REGEX_PATTERN_SLUG_SIMPLE } from './regex.js';
import { isFileIdentical, isPlainObject, renameFileWithDate } from './utility.js';

import type {
  LibNovaConfigConfig,
  LibNovaConfigGetArrayOfHttpUrlsField,
  LibNovaConfigGetArrayOfHttpUrlsItems,
  LibNovaConfigGetArrayOfHttpUrlsReturns,
  LibNovaConfigGetArrayOfHttpUrlsTypeGuard,
  LibNovaConfigGetArrayOfHttpUrlsValue,
  LibNovaConfigGetArrayOfNonEmptyStringsItems,
  LibNovaConfigGetArrayOfNonEmptyStringsReturns,
  LibNovaConfigGetArrayOfNonEmptyStringsTypeGuard,
  LibNovaConfigGetArrayOfNonEmptyStringsValue,
  LibNovaConfigGetEmailEmail,
  LibNovaConfigGetEmailReturns,
  LibNovaConfigGetEmailValue,
  LibNovaConfigGetNonEmptyStringReturns,
  LibNovaConfigGetNonEmptyStringString,
  LibNovaConfigGetNonEmptyStringValue,
  LibNovaConfigGetUrlAllowedProtocols,
  LibNovaConfigGetUrlCandidateUrl,
  LibNovaConfigGetUrlField,
  LibNovaConfigGetUrlIsAllowed,
  LibNovaConfigGetUrlReturns,
  LibNovaConfigGetUrlUrl,
  LibNovaConfigGetUrlValue,
  LibNovaConfigIsEntityRoleTypeGuard,
  LibNovaConfigIsEntityRoleValue,
  LibNovaConfigLoadConfigFileName,
  LibNovaConfigLoadConfigPath,
  LibNovaConfigLoadCurrentDirectory,
  LibNovaConfigLoadParsedFile,
  LibNovaConfigLoadRawFile,
  LibNovaConfigLoadReturns,
  LibNovaConfigParseEmails,
  LibNovaConfigParseEmailsEmailFields,
  LibNovaConfigParseEmailsEmails,
  LibNovaConfigParseEmailsParsedEmail,
  LibNovaConfigParseEmailsReturns,
  LibNovaConfigParseEmailsValue,
  LibNovaConfigParseEntities,
  LibNovaConfigParseEntitiesEmail,
  LibNovaConfigParseEntitiesEntities,
  LibNovaConfigParseEntitiesName,
  LibNovaConfigParseEntitiesParsedEntity,
  LibNovaConfigParseEntitiesParsedRoles,
  LibNovaConfigParseEntitiesReturns,
  LibNovaConfigParseEntitiesRoles,
  LibNovaConfigParseEntitiesSortNameA,
  LibNovaConfigParseEntitiesSortNameB,
  LibNovaConfigParseEntitiesUrl,
  LibNovaConfigParseEntitiesValue,
  LibNovaConfigParseProject,
  LibNovaConfigParseProjectAllowedLicenses,
  LibNovaConfigParseProjectAllowedPlatforms,
  LibNovaConfigParseProjectDescription,
  LibNovaConfigParseProjectLicense,
  LibNovaConfigParseProjectLong,
  LibNovaConfigParseProjectName,
  LibNovaConfigParseProjectParsedPlatforms,
  LibNovaConfigParseProjectPlatform,
  LibNovaConfigParseProjectProject,
  LibNovaConfigParseProjectReturns,
  LibNovaConfigParseProjectShort,
  LibNovaConfigParseProjectSlug,
  LibNovaConfigParseProjectTitle,
  LibNovaConfigParseProjectValue,
  LibNovaConfigParseProjectValueDescription,
  LibNovaConfigParseProjectValueKeywords,
  LibNovaConfigParseProjectValueLegalName,
  LibNovaConfigParseProjectValueLicense,
  LibNovaConfigParseProjectValueName,
  LibNovaConfigParseProjectValuePlatforms,
  LibNovaConfigParseProjectValuePronouns,
  LibNovaConfigParseProjectValueStartingYear,
  LibNovaConfigParseResult,
  LibNovaConfigParseReturns,
  LibNovaConfigParseUrls,
  LibNovaConfigParseUrlsFundSources,
  LibNovaConfigParseUrlsLoopIndex,
  LibNovaConfigParseUrlsParsedUrl,
  LibNovaConfigParseUrlsReturns,
  LibNovaConfigParseUrlsUrlField,
  LibNovaConfigParseUrlsUrlFields,
  LibNovaConfigParseUrlsUrlFieldsFundSourcesIndex,
  LibNovaConfigParseUrlsUrls,
  LibNovaConfigParseUrlsValue,
  LibNovaConfigParseValue,
  LibNovaConfigParseWorkflows,
  LibNovaConfigParseWorkflowsDependsOn,
  LibNovaConfigParseWorkflowsItem,
  LibNovaConfigParseWorkflowsParsedSettings,
  LibNovaConfigParseWorkflowsRawDependsOn,
  LibNovaConfigParseWorkflowsRawScopes,
  LibNovaConfigParseWorkflowsRawTarget,
  LibNovaConfigParseWorkflowsRawTargets,
  LibNovaConfigParseWorkflowsRawTriggers,
  LibNovaConfigParseWorkflowsReturns,
  LibNovaConfigParseWorkflowsScopes,
  LibNovaConfigParseWorkflowsSettings,
  LibNovaConfigParseWorkflowsSettingsKey,
  LibNovaConfigParseWorkflowsSettingsValue,
  LibNovaConfigParseWorkflowsSortedSettingsEntries,
  LibNovaConfigParseWorkflowsSortSuffixA,
  LibNovaConfigParseWorkflowsSortSuffixB,
  LibNovaConfigParseWorkflowsSortTemplateCompare,
  LibNovaConfigParseWorkflowsSuffix,
  LibNovaConfigParseWorkflowsTarget,
  LibNovaConfigParseWorkflowsTargetNeeds,
  LibNovaConfigParseWorkflowsTargetRawNeeds,
  LibNovaConfigParseWorkflowsTargets,
  LibNovaConfigParseWorkflowsTargetType,
  LibNovaConfigParseWorkflowsTargetWorkingDir,
  LibNovaConfigParseWorkflowsTemplate,
  LibNovaConfigParseWorkflowsTriggers,
  LibNovaConfigParseWorkflowsTriggerValue,
  LibNovaConfigParseWorkflowsValue,
  LibNovaConfigParseWorkflowsWorkflow,
  LibNovaConfigParseWorkflowsWorkflows,
  LibNovaConfigParseWorkspaces,
  LibNovaConfigParseWorkspacesAllowedPolicies,
  LibNovaConfigParseWorkspacesAllowedRecipes,
  LibNovaConfigParseWorkspacesEnabled,
  LibNovaConfigParseWorkspacesIsNameAllowed,
  LibNovaConfigParseWorkspacesIsNameAllowedBase,
  LibNovaConfigParseWorkspacesIsNameAllowedDescriptor,
  LibNovaConfigParseWorkspacesIsNameAllowedName,
  LibNovaConfigParseWorkspacesIsNameAllowedReturns,
  LibNovaConfigParseWorkspacesIsNameAllowedRole,
  LibNovaConfigParseWorkspacesMatchedRecipe,
  LibNovaConfigParseWorkspacesNameCandidate,
  LibNovaConfigParseWorkspacesOptions,
  LibNovaConfigParseWorkspacesParsedSettings,
  LibNovaConfigParseWorkspacesPath,
  LibNovaConfigParseWorkspacesPolicy,
  LibNovaConfigParseWorkspacesPolicyCandidate,
  LibNovaConfigParseWorkspacesRecipeName,
  LibNovaConfigParseWorkspacesRecipes,
  LibNovaConfigParseWorkspacesRecipesCandidate,
  LibNovaConfigParseWorkspacesRecipeTuple,
  LibNovaConfigParseWorkspacesReturns,
  LibNovaConfigParseWorkspacesRole,
  LibNovaConfigParseWorkspacesRoleCandidate,
  LibNovaConfigParseWorkspacesSettingKey,
  LibNovaConfigParseWorkspacesSettings,
  LibNovaConfigParseWorkspacesSettingValue,
  LibNovaConfigParseWorkspacesSlug,
  LibNovaConfigParseWorkspacesSortedWorkspaces,
  LibNovaConfigParseWorkspacesValue,
  LibNovaConfigParseWorkspacesWorkspaceKeys,
  LibNovaConfigParseWorkspacesWorkspaces,
  LibNovaConfigSaveConfigPath,
  LibNovaConfigSaveCurrentDirectory,
  LibNovaConfigSaveReplaceFile,
  LibNovaConfigSaveReturns,
  LibNovaConfigSetConfig,
  LibNovaConfigSetReturns,
} from '../types/lib/nova-config.d.ts';

/**
 * Lib - Nova Config.
 *
 * Loads, parses, and saves the nova.config.json file that drives all CLI commands. Every
 * generator, recipe, and scaffold reads config through this class.
 *
 * @since 0.11.0
 */
export class LibNovaConfig {
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
  #config: LibNovaConfigConfig;

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
   * @returns {LibNovaConfigLoadReturns}
   *
   * @since 0.11.0
   */
  public async load(): LibNovaConfigLoadReturns {
    const currentDirectory: LibNovaConfigLoadCurrentDirectory = process.cwd();
    const configFileName: LibNovaConfigLoadConfigFileName = 'nova.config.json';
    const configPath: LibNovaConfigLoadConfigPath = join(currentDirectory, configFileName);

    try {
      const rawFile: LibNovaConfigLoadRawFile = await fs.readFile(configPath, 'utf-8');
      const parsedFile: LibNovaConfigLoadParsedFile = JSON.parse(rawFile);

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
   * @param {LibNovaConfigSetConfig} config - Config.
   *
   * @returns {LibNovaConfigSetReturns}
   *
   * @since 0.11.0
   */
  public set(config: LibNovaConfigSetConfig): LibNovaConfigSetReturns {
    this.#config = this.parse(config);

    return;
  }

  /**
   * Lib - Nova Config - Save.
   *
   * Writes the parsed config to nova.config.json in the working directory. Skips
   * the write when the file already matches the in-memory state.
   *
   * @param {LibNovaConfigSaveReplaceFile} replaceFile - Replace file.
   *
   * @returns {LibNovaConfigSaveReturns}
   *
   * @since 0.11.0
   */
  public async save(replaceFile: LibNovaConfigSaveReplaceFile): LibNovaConfigSaveReturns {
    this.#config = this.parse(this.#config);

    const currentDirectory: LibNovaConfigSaveCurrentDirectory = process.cwd();
    const configPath: LibNovaConfigSaveConfigPath = join(currentDirectory, 'nova.config.json');

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
   * @param {LibNovaConfigParseValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseReturns}
   *
   * @since 0.11.0
   */
  private parse(value: LibNovaConfigParseValue): LibNovaConfigParseReturns {
    const result: LibNovaConfigParseResult = {};

    if (isPlainObject(value) === false) {
      return result;
    }

    const project: LibNovaConfigParseProject = this.parseProject(value['project']);
    const entities: LibNovaConfigParseEntities = this.parseEntities(value['entities']);
    const emails: LibNovaConfigParseEmails = this.parseEmails(value['emails']);
    const workflows: LibNovaConfigParseWorkflows = this.parseWorkflows(value['workflows']);
    const urls: LibNovaConfigParseUrls = this.parseUrls(value['urls']);
    const workspaces: LibNovaConfigParseWorkspaces = this.parseWorkspaces(
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
   * @param {LibNovaConfigParseProjectValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseProjectReturns}
   *
   * @since 0.11.0
   */
  private parseProject(value: LibNovaConfigParseProjectValue): LibNovaConfigParseProjectReturns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const project: LibNovaConfigParseProjectProject = {};

    const valueName: LibNovaConfigParseProjectValueName = value['name'];
    const valueDescription: LibNovaConfigParseProjectValueDescription = value['description'];
    const valueKeywords: LibNovaConfigParseProjectValueKeywords = this.getArrayOfNonEmptyStrings(value['keywords']);

    if (isPlainObject(valueName) === true) {
      const name: LibNovaConfigParseProjectName = {};

      const slug: LibNovaConfigParseProjectSlug = this.getNonEmptyString(valueName['slug']);
      const title: LibNovaConfigParseProjectTitle = this.getNonEmptyString(valueName['title']);

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
      const description: LibNovaConfigParseProjectDescription = {};

      const short: LibNovaConfigParseProjectShort = this.getNonEmptyString(valueDescription['short']);
      const long: LibNovaConfigParseProjectLong = this.getNonEmptyString(valueDescription['long']);

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

    const valueLegalName: LibNovaConfigParseProjectValueLegalName = this.getNonEmptyString(value['legalName']);

    if (valueLegalName !== undefined) {
      project.legalName = valueLegalName;
    }

    const valuePronouns: LibNovaConfigParseProjectValuePronouns = this.getNonEmptyString(value['pronouns']);

    if (valuePronouns === 'personal' || valuePronouns === 'business') {
      project.pronouns = valuePronouns;
    }

    const valuePlatforms: LibNovaConfigParseProjectValuePlatforms = value['platforms'];

    if (Array.isArray(valuePlatforms) === true) {
      const allowedPlatforms: LibNovaConfigParseProjectAllowedPlatforms = new Set([
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
      const parsedPlatforms: LibNovaConfigParseProjectParsedPlatforms = valuePlatforms
        .filter((item): item is LibNovaConfigParseProjectPlatform => typeof item === 'string' && allowedPlatforms.has(item));

      if (parsedPlatforms.length > 0) {
        project.platforms = parsedPlatforms;
      }
    }

    const valueStartingYear: LibNovaConfigParseProjectValueStartingYear = value['startingYear'];

    if (
      typeof valueStartingYear === 'number'
      && Number.isInteger(valueStartingYear) === true
      && valueStartingYear >= 1970
    ) {
      project.startingYear = valueStartingYear;
    }

    const valueLicense: LibNovaConfigParseProjectValueLicense = this.getNonEmptyString(value['license']);
    const allowedLicenses: LibNovaConfigParseProjectAllowedLicenses = new Set([
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
      project.license = valueLicense as LibNovaConfigParseProjectLicense;
    }

    return (Object.keys(project).length > 0) ? project : undefined;
  }

  /**
   * Lib - Nova Config - Parse Entities.
   *
   * Validates each entity object for name, email, url, and roles. The sync-ownership
   * recipe consumes entities to populate package.json author fields.
   *
   * @param {LibNovaConfigParseEntitiesValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseEntitiesReturns}
   *
   * @since 0.11.0
   */
  private parseEntities(value: LibNovaConfigParseEntitiesValue): LibNovaConfigParseEntitiesReturns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const entities: LibNovaConfigParseEntitiesEntities = value
      .filter(isPlainObject)
      .map((entity) => {
        const parsedEntity: LibNovaConfigParseEntitiesParsedEntity = {};

        const name: LibNovaConfigParseEntitiesName = this.getNonEmptyString(entity['name']);
        const email: LibNovaConfigParseEntitiesEmail = this.getEmail(entity['email']);
        const url: LibNovaConfigParseEntitiesUrl = this.getUrl(entity['url']);
        const roles: LibNovaConfigParseEntitiesRoles = entity['roles'];

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
          const parsedRoles: LibNovaConfigParseEntitiesParsedRoles = roles.filter(this['isEntityRole']);

          if (parsedRoles.length > 0) {
            parsedEntity.roles = parsedRoles;
          }
        }

        return (Object.keys(parsedEntity).length > 0) ? parsedEntity : null;
      })
      .filter((entity): entity is LibNovaConfigParseEntitiesParsedEntity => entity !== null);

    if (entities.length === 0) {
      return undefined;
    }

    entities.sort((a, b) => {
      const nameA: LibNovaConfigParseEntitiesSortNameA = a['name'] ?? '';
      const nameB: LibNovaConfigParseEntitiesSortNameB = b['name'] ?? '';

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
   * @param {LibNovaConfigParseEmailsValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseEmailsReturns}
   *
   * @since 0.11.0
   */
  private parseEmails(value: LibNovaConfigParseEmailsValue): LibNovaConfigParseEmailsReturns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const emails: LibNovaConfigParseEmailsEmails = {};
    const emailFields: LibNovaConfigParseEmailsEmailFields = libItemEmailFields;

    for (const emailField of emailFields) {
      const parsedEmail: LibNovaConfigParseEmailsParsedEmail = this.getEmail(value[emailField]);

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
   * @param {LibNovaConfigParseUrlsValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseUrlsReturns}
   *
   * @since 0.11.0
   */
  private parseUrls(value: LibNovaConfigParseUrlsValue): LibNovaConfigParseUrlsReturns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const urls: LibNovaConfigParseUrlsUrls = {};
    const urlFields: LibNovaConfigParseUrlsUrlFields = libItemUrlFields;
    const urlFieldsFundSourcesIndex: LibNovaConfigParseUrlsUrlFieldsFundSourcesIndex = urlFields.indexOf('privacyPolicy');

    for (let i: LibNovaConfigParseUrlsLoopIndex = 0; i < urlFields.length; i += 1) {
      // Insert fundSources before privacyPolicy to match prompt order.
      if (i === urlFieldsFundSourcesIndex) {
        const fundSources: LibNovaConfigParseUrlsFundSources = this.getArrayOfHttpUrls(value['fundSources']);

        if (fundSources !== undefined) {
          urls.fundSources = fundSources;
        }
      }

      const urlField: LibNovaConfigParseUrlsUrlField = urlFields[i]!;
      const parsedUrl: LibNovaConfigParseUrlsParsedUrl = this.getUrl(value[urlField], (urlField === 'repository') ? 'repository' : 'generic');

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
   * @param {LibNovaConfigParseWorkspacesValue} value - Value.
   * @param {LibNovaConfigParseWorkspacesSlug}  slug  - Slug.
   *
   * @private
   *
   * @returns {LibNovaConfigParseWorkspacesReturns}
   *
   * @since 0.11.0
   */
  private parseWorkspaces(value: LibNovaConfigParseWorkspacesValue, slug: LibNovaConfigParseWorkspacesSlug): LibNovaConfigParseWorkspacesReturns {
    if (isPlainObject(value) === false) {
      return undefined;
    }

    const workspaces: LibNovaConfigParseWorkspacesWorkspaces = {};

    /**
     * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
     *
     * Checks that a workspace name follows the naming pattern required by its role.
     * Singular roles need exact matches while others need a suffix.
     *
     * @param {LibNovaConfigParseWorkspacesIsNameAllowedRole} role - Role.
     * @param {LibNovaConfigParseWorkspacesIsNameAllowedName} name - Name.
     *
     * @private
     *
     * @returns {LibNovaConfigParseWorkspacesIsNameAllowedReturns}
     *
     * @since 0.11.0
     */
    const isNameAllowed: LibNovaConfigParseWorkspacesIsNameAllowed = (role: LibNovaConfigParseWorkspacesIsNameAllowedRole, name: LibNovaConfigParseWorkspacesIsNameAllowedName): LibNovaConfigParseWorkspacesIsNameAllowedReturns => {
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
          const base: LibNovaConfigParseWorkspacesIsNameAllowedBase = (slug !== undefined) ? `${slug}-${role}` : role;

          if (name.startsWith(`${base}-`) === false) {
            return false;
          }

          const descriptor: LibNovaConfigParseWorkspacesIsNameAllowedDescriptor = name.slice(base.length + 1);

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
      const path: LibNovaConfigParseWorkspacesPath = valueEntry[0];
      const options: LibNovaConfigParseWorkspacesOptions = valueEntry[1];

      if (isPlainObject(options) === false) {
        continue;
      }

      const nameCandidate: LibNovaConfigParseWorkspacesNameCandidate = this.getNonEmptyString(options['name']);
      const roleCandidate: LibNovaConfigParseWorkspacesRoleCandidate = this.getNonEmptyString(options['role']);
      const policyCandidate: LibNovaConfigParseWorkspacesPolicyCandidate = this.getNonEmptyString(options['policy']);

      if (nameCandidate === undefined) {
        continue;
      }

      const role: LibNovaConfigParseWorkspacesRole = libItemAllowedRoles.find((itemAllowedRole) => itemAllowedRole === roleCandidate);

      if (role === undefined) {
        continue;
      }

      const allowedPolicies: LibNovaConfigParseWorkspacesAllowedPolicies = libItemAllowedPoliciesByRole[role];
      const policy: LibNovaConfigParseWorkspacesPolicy = allowedPolicies.find((allowedPolicy) => allowedPolicy === policyCandidate);

      if (policy === undefined) {
        continue;
      }

      if (isNameAllowed(role, nameCandidate) === false) {
        continue;
      }

      let recipes: LibNovaConfigParseWorkspacesRecipes = undefined;

      const recipesCandidate: LibNovaConfigParseWorkspacesRecipesCandidate = options['recipes'];

      if (isPlainObject(recipesCandidate) === true) {
        const allowedRecipes: LibNovaConfigParseWorkspacesAllowedRecipes = new Set(libItemAllowedRecipes);
        const parsedRecipes: LibNovaConfigParseWorkspacesRecipes = {};

        for (const recipesCandidateEntry of Object.entries(recipesCandidate)) {
          const recipeName: LibNovaConfigParseWorkspacesRecipeName = recipesCandidateEntry[0];
          const recipeTuple: LibNovaConfigParseWorkspacesRecipeTuple = recipesCandidateEntry[1];

          const matchedRecipe: LibNovaConfigParseWorkspacesMatchedRecipe = [...allowedRecipes].find(
            (allowedRecipe) => allowedRecipe === recipeName,
          );

          if (matchedRecipe === undefined) {
            continue;
          }

          if (Array.isArray(recipeTuple) === false || recipeTuple.length === 0) {
            continue;
          }

          const enabled: LibNovaConfigParseWorkspacesEnabled = recipeTuple[0];

          if (typeof enabled !== 'boolean') {
            continue;
          }

          const settings: LibNovaConfigParseWorkspacesSettings = recipeTuple[1];

          if (settings !== undefined && isPlainObject(settings) === true) {
            const parsedSettings: LibNovaConfigParseWorkspacesParsedSettings = {};

            for (const settingsEntry of Object.entries(settings)) {
              const settingKey: LibNovaConfigParseWorkspacesSettingKey = settingsEntry[0];
              const settingValue: LibNovaConfigParseWorkspacesSettingValue = settingsEntry[1];

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
        ...(recipes !== undefined) ? { recipes } : {},
      });
    }

    const workspaceKeys: LibNovaConfigParseWorkspacesWorkspaceKeys = Object.keys(workspaces);

    if (workspaceKeys.length === 0) {
      return undefined;
    }

    const sortedWorkspaces: LibNovaConfigParseWorkspacesSortedWorkspaces = {};

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
   * @param {LibNovaConfigParseWorkflowsValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigParseWorkflowsReturns}
   *
   * @since 0.20.0
   */
  private parseWorkflows(value: LibNovaConfigParseWorkflowsValue): LibNovaConfigParseWorkflowsReturns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const workflows: LibNovaConfigParseWorkflowsWorkflows = [];

    for (const item of value) {
      const castItem: LibNovaConfigParseWorkflowsItem = item;

      if (isPlainObject(castItem) === false) {
        continue;
      }

      const template: LibNovaConfigParseWorkflowsTemplate = this.getNonEmptyString(castItem['template']);

      if (template === undefined) {
        continue;
      }

      const suffix: LibNovaConfigParseWorkflowsSuffix = this.getNonEmptyString(castItem['suffix']);

      if (suffix === undefined) {
        continue;
      }

      const rawTriggers: LibNovaConfigParseWorkflowsRawTriggers = castItem['triggers'];

      if (Array.isArray(rawTriggers) === false) {
        continue;
      }

      const triggers: LibNovaConfigParseWorkflowsTriggers = [];

      for (const trigger of rawTriggers) {
        const triggerValue: LibNovaConfigParseWorkflowsTriggerValue = this.getNonEmptyString(trigger);

        if (triggerValue !== undefined) {
          triggers.push(triggerValue);
        }
      }

      const rawDependsOn: LibNovaConfigParseWorkflowsRawDependsOn = castItem['depends-on'];
      const dependsOn: LibNovaConfigParseWorkflowsDependsOn = (Array.isArray(rawDependsOn) === true) ? rawDependsOn.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as LibNovaConfigParseWorkflowsDependsOn : [];
      const rawScopes: LibNovaConfigParseWorkflowsRawScopes = castItem['scopes'];
      const scopes: LibNovaConfigParseWorkflowsScopes = (Array.isArray(rawScopes) === true) ? rawScopes.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as LibNovaConfigParseWorkflowsScopes : [];
      const rawTargets: LibNovaConfigParseWorkflowsRawTargets = castItem['targets'];
      const targets: LibNovaConfigParseWorkflowsTargets = [];

      if (Array.isArray(rawTargets) === true) {
        for (const rawTarget of rawTargets) {
          const rawTargetValue: LibNovaConfigParseWorkflowsRawTarget = rawTarget;

          if (isPlainObject(rawTargetValue) === false) {
            continue;
          }

          const targetType: LibNovaConfigParseWorkflowsTargetType = this.getNonEmptyString(rawTargetValue['type']);
          const targetWorkingDir: LibNovaConfigParseWorkflowsTargetWorkingDir = this.getNonEmptyString(rawTargetValue['workingDir']);

          if (targetType === undefined || targetWorkingDir === undefined) {
            continue;
          }

          const rawTargetNeeds: LibNovaConfigParseWorkflowsTargetRawNeeds = rawTargetValue['needs'];
          const targetNeeds: LibNovaConfigParseWorkflowsTargetNeeds = (Array.isArray(rawTargetNeeds) === true) ? rawTargetNeeds.filter((entry) => typeof entry === 'string' && entry.trim() !== '') as LibNovaConfigParseWorkflowsTargetNeeds : [];

          const target: LibNovaConfigParseWorkflowsTarget = {
            type: targetType,
            workingDir: targetWorkingDir,
          };

          if (targetNeeds.length > 0) {
            Reflect.set(target, 'needs', targetNeeds);
          }

          targets.push(target);
        }
      }

      const settings: LibNovaConfigParseWorkflowsSettings = castItem['settings'];

      // Build workflow object with properties in type-definition order: template, suffix, triggers, depends-on, scopes, targets, settings.
      const workflow: LibNovaConfigParseWorkflowsWorkflow = {
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
        const parsedSettings: LibNovaConfigParseWorkflowsParsedSettings = {};
        const sortedSettingsEntries: LibNovaConfigParseWorkflowsSortedSettingsEntries = Object.entries(settings).sort(
          (a, b) => a[0].localeCompare(b[0]),
        );

        for (const settingsEntry of sortedSettingsEntries) {
          const settingsKey: LibNovaConfigParseWorkflowsSettingsKey = settingsEntry[0];
          const settingsValue: LibNovaConfigParseWorkflowsSettingsValue = settingsEntry[1];

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
      const templateCompare: LibNovaConfigParseWorkflowsSortTemplateCompare = a['template'].localeCompare(b['template']);

      if (templateCompare !== 0) {
        return templateCompare;
      }

      const suffixA: LibNovaConfigParseWorkflowsSortSuffixA = a['suffix'] ?? '';
      const suffixB: LibNovaConfigParseWorkflowsSortSuffixB = b['suffix'] ?? '';

      return suffixA.localeCompare(suffixB);
    });

    return workflows;
  }

  /**
   * Lib - Nova Config - Is Entity Role.
   *
   * Type guard that narrows a value to one of the three allowed entity roles: author,
   * contributor, or supporter. Used by parseEntities as a filter.
   *
   * @param {LibNovaConfigIsEntityRoleValue} value - Value.
   *
   * @private
   *
   * @returns {boolean}
   *
   * @since 0.11.0
   */
  private isEntityRole(value: LibNovaConfigIsEntityRoleValue): value is LibNovaConfigIsEntityRoleTypeGuard {
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
   * @param {LibNovaConfigGetArrayOfNonEmptyStringsValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigGetArrayOfNonEmptyStringsReturns}
   *
   * @since 0.11.0
   */
  private getArrayOfNonEmptyStrings(value: LibNovaConfigGetArrayOfNonEmptyStringsValue): LibNovaConfigGetArrayOfNonEmptyStringsReturns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: LibNovaConfigGetArrayOfNonEmptyStringsItems = value
      .map((item) => this.getNonEmptyString(item))
      .filter((item): item is LibNovaConfigGetArrayOfNonEmptyStringsTypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Array Of HTTP URLs.
   *
   * Validates each array entry as a URL through getUrl and discards invalid ones. Used by
   * parseUrls to parse the fundSources list for Sponsors.
   *
   * @param {LibNovaConfigGetArrayOfHttpUrlsValue} value   - Value.
   * @param {LibNovaConfigGetArrayOfHttpUrlsField} [field] - Field.
   *
   * @private
   *
   * @returns {LibNovaConfigGetArrayOfHttpUrlsReturns}
   *
   * @since 0.11.0
   */
  private getArrayOfHttpUrls(value: LibNovaConfigGetArrayOfHttpUrlsValue, field?: LibNovaConfigGetArrayOfHttpUrlsField): LibNovaConfigGetArrayOfHttpUrlsReturns {
    if (Array.isArray(value) === false) {
      return undefined;
    }

    const items: LibNovaConfigGetArrayOfHttpUrlsItems = value
      .map((item) => this.getUrl(item, field))
      .filter((item): item is LibNovaConfigGetArrayOfHttpUrlsTypeGuard => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Lib - Nova Config - Get Email.
   *
   * Returns the trimmed value only when it passes the simple email regex check. Called by
   * parseEmails for config fields and parseEntities for people.
   *
   * @param {LibNovaConfigGetEmailValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigGetEmailReturns}
   *
   * @since 0.11.0
   */
  private getEmail(value: LibNovaConfigGetEmailValue): LibNovaConfigGetEmailReturns {
    const email: LibNovaConfigGetEmailEmail = this.getNonEmptyString(value);

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
   * @param {LibNovaConfigGetUrlValue} value   - Value.
   * @param {LibNovaConfigGetUrlField} [field] - Field.
   *
   * @private
   *
   * @returns {LibNovaConfigGetUrlReturns}
   *
   * @since 0.11.0
   */
  private getUrl(value: LibNovaConfigGetUrlValue, field?: LibNovaConfigGetUrlField): LibNovaConfigGetUrlReturns {
    const candidateUrl: LibNovaConfigGetUrlCandidateUrl = this.getNonEmptyString(value);

    if (candidateUrl === undefined) {
      return undefined;
    }

    try {
      const url: LibNovaConfigGetUrlUrl = new URL(candidateUrl);

      const allowedProtocols: LibNovaConfigGetUrlAllowedProtocols = (field === 'repository') ? libItemRepositoryProtocols : libItemGenericProtocols;
      const isAllowed: LibNovaConfigGetUrlIsAllowed = allowedProtocols.some(
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
   * @param {LibNovaConfigGetNonEmptyStringValue} value - Value.
   *
   * @private
   *
   * @returns {LibNovaConfigGetNonEmptyStringReturns}
   *
   * @since 0.11.0
   */
  private getNonEmptyString(value: LibNovaConfigGetNonEmptyStringValue): LibNovaConfigGetNonEmptyStringReturns {
    if (typeof value !== 'string') {
      return undefined;
    }

    const string: LibNovaConfigGetNonEmptyStringString = value.trim();

    return (string.length > 0) ? string : undefined;
  }
}
