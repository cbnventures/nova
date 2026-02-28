import { promises as fs } from 'fs';
import { join } from 'path';

import {
  itemAllowedPoliciesByRole,
  itemAllowedRoles,
  itemAllowedSyncProperties,
  itemGenericProtocols,
  itemNovaConfigEmailFields,
  itemNovaConfigUrlFields,
  itemRepositoryProtocols,
} from '@/lib/item.js';
import { PATTERN_EMAIL_SIMPLE, PATTERN_SLUG_SCOPED, PATTERN_SLUG_SIMPLE } from '@/lib/regex.js';
import { isFileIdentical, isPlainObject, renameFileWithDate } from '@/lib/utility.js';

import type {
  NovaConfigConfig,
  NovaConfigGetArrayOfHttpUrlsField,
  NovaConfigGetArrayOfHttpUrlsReturns,
  NovaConfigGetArrayOfHttpUrlsValue,
  NovaConfigGetArrayOfNonEmptyStringsReturns,
  NovaConfigGetArrayOfNonEmptyStringsValue,
  NovaConfigGetEmailReturns,
  NovaConfigGetEmailValue,
  NovaConfigGetNonEmptyStringReturns,
  NovaConfigGetNonEmptyStringValue,
  NovaConfigGetUrlField,
  NovaConfigGetUrlReturns,
  NovaConfigGetUrlValue,
  NovaConfigIsEntityRoleTypeGuard,
  NovaConfigIsEntityRoleValue,
  NovaConfigLoadParsedFile,
  NovaConfigLoadReturns,
  NovaConfigParseEmailsEmails,
  NovaConfigParseEmailsReturns,
  NovaConfigParseEmailsValue,
  NovaConfigParseEntitiesParsedEntity,
  NovaConfigParseEntitiesReturns,
  NovaConfigParseEntitiesValue,
  NovaConfigParseProjectDescription,
  NovaConfigParseProjectName,
  NovaConfigParseProjectProject,
  NovaConfigParseProjectReturns,
  NovaConfigParseProjectValue,
  NovaConfigParseResult,
  NovaConfigParseReturns,
  NovaConfigParseUrlsReturns,
  NovaConfigParseUrlsUrls,
  NovaConfigParseUrlsValue,
  NovaConfigParseValue,
  NovaConfigParseWorkspacesIsNameAllowedName,
  NovaConfigParseWorkspacesIsNameAllowedReturns,
  NovaConfigParseWorkspacesIsNameAllowedRole,
  NovaConfigParseWorkspacesAllowedSyncProperties,
  NovaConfigParseWorkspacesReturns,
  NovaConfigParseWorkspacesSlug,
  NovaConfigParseWorkspacesSyncProperties,
  NovaConfigParseWorkspacesSyncPropertiesTypeGuard,
  NovaConfigParseWorkspacesValue,
  NovaConfigParseWorkspacesWorkspaces,
  NovaConfigSaveReplaceFile,
  NovaConfigSaveReturns,
  NovaConfigSetReturns,
  NovaConfigSetValue,
} from '@/types/lib/nova-config.d.ts';

/**
 * Nova Config.
 *
 * @since 1.0.0
 */
export class NovaConfig {
  /**
   * Nova Config - Config.
   *
   * @private
   *
   * @since 1.0.0
   */
  #config: NovaConfigConfig;

  /**
   * Nova Config - Constructor.
   *
   * @since 1.0.0
   */
  public constructor() {
    this.#config = {};
  }

  /**
   * Nova Config - Load.
   *
   * @returns {NovaConfigLoadReturns}
   *
   * @since 1.0.0
   */
  public async load(): NovaConfigLoadReturns {
    const currentDirectory = process.cwd();
    const configFileName = 'nova.config.json';
    const configPath = join(currentDirectory, configFileName);

    try {
      const rawFile = await fs.readFile(configPath, 'utf-8');
      const parsedFile: NovaConfigLoadParsedFile = JSON.parse(rawFile);

      // Salvage-first method.
      this.#config = this.parse(parsedFile);
    } catch {
      /* empty */
    }

    return this.#config;
  }

  /**
   * Nova Config - Set.
   *
   * @param {NovaConfigSetValue} config - Config.
   *
   * @returns {NovaConfigSetReturns}
   *
   * @since 1.0.0
   */
  public set(config: NovaConfigSetValue): NovaConfigSetReturns {
    this.#config = this.parse(config);
  }

  /**
   * Nova Config - Save.
   *
   * @param {NovaConfigSaveReplaceFile} replaceFile - Replace file.
   *
   * @returns {NovaConfigSaveReturns}
   *
   * @since 1.0.0
   */
  public async save(replaceFile: NovaConfigSaveReplaceFile): NovaConfigSaveReturns {
    this.#config = this.parse(this.#config);

    const currentDirectory = process.cwd();
    const configPath = join(currentDirectory, 'nova.config.json');

    // No changes detected, skip touching the filesystem.
    if (await isFileIdentical(configPath, this.#config)) {
      return;
    }

    // Rename existing file if user chooses not to replace file.
    if (replaceFile === false) {
      await renameFileWithDate(configPath, 'nova.config', 'json');
    }

    const configJson = JSON.stringify(this.#config, null, 2);
    const configContents = `${configJson}\n`;

    await fs.writeFile(
      configPath,
      configContents,
      'utf-8',
    );
  }

  /**
   * Nova Config - Parse.
   *
   * @param {NovaConfigParseValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigParseReturns}
   *
   * @since 1.0.0
   */
  private parse(value: NovaConfigParseValue): NovaConfigParseReturns {
    const result: NovaConfigParseResult = {};

    if (!isPlainObject(value)) {
      return result;
    }

    const project = this.parseProject(value['project']);
    const entities = this.parseEntities(value['entities']);
    const emails = this.parseEmails(value['emails']);
    const urls = this.parseUrls(value['urls']);
    const projectSlug = (project !== undefined && project.name !== undefined) ? project.name.slug : undefined;
    const workspaces = this.parseWorkspaces(value['workspaces'], projectSlug);

    if (project !== undefined) {
      result.project = project;
    }

    if (entities !== undefined) {
      result.entities = entities;
    }

    if (emails !== undefined) {
      result.emails = emails;
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
   * Nova Config - Parse project.
   *
   * @param {NovaConfigParseProjectValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigParseProjectReturns}
   *
   * @since 1.0.0
   */
  private parseProject(value: NovaConfigParseProjectValue): NovaConfigParseProjectReturns {
    if (!isPlainObject(value)) {
      return undefined;
    }

    const project: NovaConfigParseProjectProject = {};

    const valueName = value['name'];
    const valueDescription = value['description'];
    const valueKeywords = this.getArrayOfNonEmptyStrings(value['keywords']);

    if (isPlainObject(valueName)) {
      const name: NovaConfigParseProjectName = {};

      const slug = this.getNonEmptyString(valueName['slug']);
      const title = this.getNonEmptyString(valueName['title']);

      if (slug !== undefined) {
        name.slug = slug;
      }

      if (title !== undefined) {
        name.title = title;
      }

      if (Object.keys(name).length > 0) {
        project.name = name;
      }
    }

    if (isPlainObject(valueDescription)) {
      const description: NovaConfigParseProjectDescription = {};

      const short = this.getNonEmptyString(valueDescription['short']);
      const long = this.getNonEmptyString(valueDescription['long']);

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

    return (Object.keys(project).length > 0) ? project : undefined;
  }

  /**
   * Nova Config - Parse entities.
   *
   * @param {NovaConfigParseEntitiesValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigParseEntitiesReturns}
   *
   * @since 1.0.0
   */
  private parseEntities(value: NovaConfigParseEntitiesValue): NovaConfigParseEntitiesReturns {
    if (!Array.isArray(value)) {
      return undefined;
    }

    const entities = value
      .filter(isPlainObject)
      .map((entity) => {
        const parsedEntity: NovaConfigParseEntitiesParsedEntity = {};

        const name = this.getNonEmptyString(entity['name']);
        const email = this.getEmail(entity['email']);
        const url = this.getUrl(entity['url']);
        const roles = entity['roles'];

        if (name !== undefined) {
          parsedEntity.name = name;
        }

        if (email !== undefined) {
          parsedEntity.email = email;
        }

        if (url !== undefined) {
          parsedEntity.url = url;
        }

        if (Array.isArray(roles)) {
          const parsedRoles = roles.filter(this.isEntityRole);

          if (parsedRoles.length > 0) {
            parsedEntity.roles = parsedRoles;
          }
        }

        return (Object.keys(parsedEntity).length > 0) ? parsedEntity : null;
      })
      .filter((entity): entity is NovaConfigParseEntitiesParsedEntity => entity !== null);

    return (entities.length > 0) ? entities : undefined;
  }

  /**
   * Nova Config - Parse emails.
   *
   * @param {NovaConfigParseEmailsValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigParseEmailsReturns}
   *
   * @since 1.0.0
   */
  private parseEmails(value: NovaConfigParseEmailsValue): NovaConfigParseEmailsReturns {
    if (!isPlainObject(value)) {
      return undefined;
    }

    const emails: NovaConfigParseEmailsEmails = {};
    const emailFields = itemNovaConfigEmailFields;

    for (const emailField of emailFields) {
      const parsedEmail = this.getEmail(value[emailField]);

      if (parsedEmail !== undefined) {
        emails[emailField] = parsedEmail;
      }
    }

    return (Object.keys(emails).length > 0) ? emails : undefined;
  }

  /**
   * Nova Config - Parse urls.
   *
   * @param {NovaConfigParseUrlsValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigParseUrlsReturns}
   *
   * @since 1.0.0
   */
  private parseUrls(value: NovaConfigParseUrlsValue): NovaConfigParseUrlsReturns {
    if (!isPlainObject(value)) {
      return undefined;
    }

    const urls: NovaConfigParseUrlsUrls = {};
    const urlFields = itemNovaConfigUrlFields;

    for (const urlField of urlFields) {
      const parsedUrl = this.getUrl(value[urlField], (urlField === 'repository') ? 'repository' : 'generic');

      if (parsedUrl !== undefined) {
        urls[urlField] = parsedUrl;
      }
    }

    const fundSources = this.getArrayOfHttpUrls(value['fundSources']);

    if (fundSources !== undefined) {
      urls.fundSources = fundSources;
    }

    return (Object.keys(urls).length > 0) ? urls : undefined;
  }

  /**
   * Nova Config - Parse workspaces.
   *
   * @param {NovaConfigParseWorkspacesValue} value - Value.
   * @param {NovaConfigParseWorkspacesSlug}  slug  - Slug.
   *
   * @private
   *
   * @returns {NovaConfigParseWorkspacesReturns}
   *
   * @since 1.0.0
   */
  private parseWorkspaces(value: NovaConfigParseWorkspacesValue, slug: NovaConfigParseWorkspacesSlug): NovaConfigParseWorkspacesReturns {
    if (!isPlainObject(value)) {
      return undefined;
    }

    const workspaces: NovaConfigParseWorkspacesWorkspaces = {};
    const configSlug = this.getNonEmptyString(slug);

    /**
     * Nova Config - Parse workspaces - Is name allowed.
     *
     * @param {NovaConfigParseWorkspacesIsNameAllowedRole} role - Role.
     * @param {NovaConfigParseWorkspacesIsNameAllowedName} name - Name.
     *
     * @private
     *
     * @returns {NovaConfigParseWorkspacesIsNameAllowedReturns}
     *
     * @since 1.0.0
     */
    const isNameAllowed = (role: NovaConfigParseWorkspacesIsNameAllowedRole, name: NovaConfigParseWorkspacesIsNameAllowedName): NovaConfigParseWorkspacesIsNameAllowedReturns => {
      switch (role) {
        case 'project': {
          if (configSlug !== undefined) {
            return name === `${configSlug}-project`;
          }

          return name === 'project';
        }
        case 'docs': {
          if (configSlug !== undefined) {
            return name === `${configSlug}-docs`;
          }

          return name === 'docs';
        }
        case 'tool':
        case 'config':
        case 'app': {
          const base = (configSlug !== undefined) ? `${configSlug}-${role}` : role;

          if (!name.startsWith(`${base}-`)) {
            return false;
          }

          const descriptor = name.slice(base.length + 1);

          return descriptor.length > 0 && PATTERN_SLUG_SIMPLE.test(descriptor);
        }
        case 'template':
        case 'package': {
          return PATTERN_SLUG_SIMPLE.test(name) || PATTERN_SLUG_SCOPED.test(name);
        }
        default: {
          return false;
        }
      }
    };

    for (const [path, options] of Object.entries(value)) {
      if (!isPlainObject(options)) {
        continue;
      }

      const nameCandidate = this.getNonEmptyString(options['name']);
      const roleCandidate = this.getNonEmptyString(options['role']);
      const policyCandidate = this.getNonEmptyString(options['policy']);
      const syncPropertiesCandidate = this.getArrayOfNonEmptyStrings(options['syncProperties']);

      if (nameCandidate === undefined) {
        continue;
      }

      const role = itemAllowedRoles.find((itemAllowedRole) => itemAllowedRole === roleCandidate);

      if (role === undefined) {
        continue;
      }

      const allowedPolicies = itemAllowedPoliciesByRole[role];
      const policy = allowedPolicies.find((allowedPolicy) => allowedPolicy === policyCandidate);

      if (policy === undefined) {
        continue;
      }

      if (!isNameAllowed(role, nameCandidate)) {
        continue;
      }

      let syncProperties: NovaConfigParseWorkspacesSyncProperties;

      if (policy === 'distributable' && syncPropertiesCandidate !== undefined) {
        const allowedSyncProperties: NovaConfigParseWorkspacesAllowedSyncProperties = new Set(itemAllowedSyncProperties);

        syncProperties = syncPropertiesCandidate.filter((value): value is NovaConfigParseWorkspacesSyncPropertiesTypeGuard => allowedSyncProperties.has(value));

        if (syncProperties.length === 0) {
          syncProperties = undefined;
        }
      }

      const pinVersionsCandidate = options['pinVersions'];
      const pinVersions = (pinVersionsCandidate === true) ? true : undefined;

      const syncLtsEnginesCandidate = options['syncLtsEngines'];
      const syncLtsEngines = (syncLtsEnginesCandidate === true) ? true : undefined;

      workspaces[path] = {
        name: nameCandidate,
        role,
        policy,
        ...(syncProperties !== undefined) ? { syncProperties } : {},
        ...(pinVersions !== undefined) ? { pinVersions } : {},
        ...(syncLtsEngines !== undefined) ? { syncLtsEngines } : {},
      };
    }

    return (Object.keys(workspaces).length > 0) ? workspaces : undefined;
  }

  /**
   * Nova Config - Is entity role.
   *
   * @param {NovaConfigIsEntityRoleValue} value - Value.
   *
   * @private
   *
   * @returns {boolean}
   *
   * @since 1.0.0
   */
  private isEntityRole(value: NovaConfigIsEntityRoleValue): value is NovaConfigIsEntityRoleTypeGuard {
    return (
      value === 'author'
      || value === 'contributor'
      || value === 'supporter'
    );
  }

  /**
   * Nova Config - Get array of non-empty strings.
   *
   * @param {NovaConfigGetArrayOfNonEmptyStringsValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigGetArrayOfNonEmptyStringsReturns}
   *
   * @since 1.0.0
   */
  private getArrayOfNonEmptyStrings(value: NovaConfigGetArrayOfNonEmptyStringsValue): NovaConfigGetArrayOfNonEmptyStringsReturns {
    if (!Array.isArray(value)) {
      return undefined;
    }

    const items = value
      .map((item) => this.getNonEmptyString(item))
      .filter((item): item is string => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Nova Config - Get array of http urls.
   *
   * @param {NovaConfigGetArrayOfHttpUrlsValue} value   - Value.
   * @param {NovaConfigGetArrayOfHttpUrlsField} [field] - Field.
   *
   * @private
   *
   * @returns {NovaConfigGetArrayOfHttpUrlsReturns}
   *
   * @since 1.0.0
   */
  private getArrayOfHttpUrls(value: NovaConfigGetArrayOfHttpUrlsValue, field?: NovaConfigGetArrayOfHttpUrlsField): NovaConfigGetArrayOfHttpUrlsReturns {
    if (!Array.isArray(value)) {
      return undefined;
    }

    const items = value
      .map((item) => this.getUrl(item, field))
      .filter((item): item is string => item !== undefined);

    return (items.length > 0) ? items : undefined;
  }

  /**
   * Nova Config - Get email.
   *
   * @param {NovaConfigGetEmailValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigGetEmailReturns}
   *
   * @since 1.0.0
   */
  private getEmail(value: NovaConfigGetEmailValue): NovaConfigGetEmailReturns {
    const email = this.getNonEmptyString(value);

    if (email === undefined) {
      return undefined;
    }

    if (!PATTERN_EMAIL_SIMPLE.test(email)) {
      return undefined;
    }

    return email;
  }

  /**
   * Nova Config - Get url.
   *
   * @param {NovaConfigGetUrlValue} value   - Value.
   * @param {NovaConfigGetUrlField} [field] - Field.
   *
   * @private
   *
   * @returns {NovaConfigGetUrlReturns}
   *
   * @since 1.0.0
   */
  private getUrl(value: NovaConfigGetUrlValue, field?: NovaConfigGetUrlField): NovaConfigGetUrlReturns {
    const candidateUrl = this.getNonEmptyString(value);

    if (candidateUrl === undefined) {
      return undefined;
    }

    try {
      const url = new URL(candidateUrl);

      const allowedProtocols = (field === 'repository') ? itemRepositoryProtocols : itemGenericProtocols;
      const isAllowed = allowedProtocols.some(
        (allowedProtocol) => allowedProtocol === url.protocol,
      );

      return (isAllowed === true) ? candidateUrl : undefined;
    } catch {
      return undefined;
    }
  }

  /**
   * Nova Config - Get non-empty string.
   *
   * @param {NovaConfigGetNonEmptyStringValue} value - Value.
   *
   * @private
   *
   * @returns {NovaConfigGetNonEmptyStringReturns}
   *
   * @since 1.0.0
   */
  private getNonEmptyString(value: NovaConfigGetNonEmptyStringValue): NovaConfigGetNonEmptyStringReturns {
    if (typeof value !== 'string') {
      return undefined;
    }

    const string = value.trim();

    return (string.length > 0) ? string : undefined;
  }
}
