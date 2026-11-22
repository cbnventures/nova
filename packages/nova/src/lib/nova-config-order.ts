import { isPlainObject } from './utility.js';

import type {
  Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileBadgeGroupKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileBadgeKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileLinkGroupKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileLinkKeys,
  Lib_NovaConfigOrder_LibNovaConfigReadMeProfileSupportKeys,
  Lib_NovaConfigOrder_LibNovaConfigRecipesKeys,
  Lib_NovaConfigOrder_LibNovaConfigSettingsKeys,
  Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Key,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_OrderedKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Result,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_SectionKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Value,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroup,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroups,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroupsValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Badges,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgesValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroup,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroups,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroupsValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Links,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_LinksValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_NormalizedProfile,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Profile,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_ProfileValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_ReadMe,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Returns,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Support,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportBadges,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportBadgesValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportValue,
  Lib_NovaConfigOrder_NormalizeReadMeOrder_Value,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Entry,
  Lib_NovaConfigOrder_NormalizeSectionOrder_EntryKey,
  Lib_NovaConfigOrder_NormalizeSectionOrder_EntryValue,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Key,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Keys,
  Lib_NovaConfigOrder_NormalizeSectionOrder_OrderedKeys,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Result,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Returns,
  Lib_NovaConfigOrder_NormalizeSectionOrder_Value,
} from '../types/lib/nova-config-order.d.ts';

/**
 * Lib - Nova Config Order - Lib Nova Config Docker Hub Keys.
 *
 * Defines the canonical Docker Hub field sequence used by the normalization
 * recipe while preserving unrecognized fields after it.
 *
 * @since 0.40.0
 */
const libNovaConfigDockerHubKeys: Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys = [
  'namespace',
  'repository',
  'visibility',
  'categories',
  'immutableTags',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Keys.
 *
 * Defines canonical README and profile content field sequences for normalization
 * while preserving unknown entries after the recognized keys.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeKeys = [
  'badges',
  'profile',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Keys.
 *
 * Defines the direct profile field sequence used by config normalization
 * before any unrecognized profile fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileKeys = [
  'heading',
  'introduction',
  'badgeGroups',
  'linkGroups',
  'support',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Support Keys.
 *
 * Defines the field sequence for the profile support section
 * before any unrecognized support fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileSupportKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileSupportKeys = [
  'title',
  'emoji',
  'message',
  'badges',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Badge Group Keys.
 *
 * Defines the field sequence for every ordered profile badge group
 * before any unrecognized group fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileBadgeGroupKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileBadgeGroupKeys = [
  'title',
  'emoji',
  'badges',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Badge Keys.
 *
 * Defines the field sequence for every profile badge object
 * before any unrecognized badge fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileBadgeKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileBadgeKeys = [
  'label',
  'logo',
  'color',
  'link',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Link Group Keys.
 *
 * Defines the field sequence for every ordered profile link group
 * before any unrecognized group fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileLinkGroupKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileLinkGroupKeys = [
  'title',
  'emoji',
  'columns',
  'links',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Read Me Profile Link Keys.
 *
 * Defines the field sequence for every link inside a profile link group
 * before any unrecognized link fields are appended.
 *
 * @since 0.50.0
 */
const libNovaConfigReadMeProfileLinkKeys: Lib_NovaConfigOrder_LibNovaConfigReadMeProfileLinkKeys = [
  'label',
  'url',
  'description',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Recipes Keys.
 *
 * Defines the canonical recipe-group sequence. Groups are alphabetical, with the
 * per-workspace "package-json" group last.
 *
 * @since 0.49.0
 */
const libNovaConfigRecipesKeys: Lib_NovaConfigOrder_LibNovaConfigRecipesKeys = [
  'docker',
  'docker-hub',
  'github',
  'github-action',
  'license',
  'miscellaneous',
  'nova-config',
  'pfsense',
  'read-me',
  'tsconfig',
  'package-json',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Settings Keys.
 *
 * Defines the canonical alphabetical sequence of the project-wide settings.
 * Unknown settings keep their place after the recognized ones.
 *
 * @since 0.49.0
 */
const libNovaConfigSettingsKeys: Lib_NovaConfigOrder_LibNovaConfigSettingsKeys = [
  'changelog',
  'coverage',
  'lockStepVersioning',
  'runWorkspaces',
  'versionStrategy',
];

/**
 * Lib - Nova Config Order - Lib Nova Config Top Level Keys.
 *
 * Defines the canonical top-level sequence used by configure, scaffolding, and
 * the normalization recipe while leaving every nested value untouched.
 *
 * @since 0.33.0
 */
const libNovaConfigTopLevelKeys: Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys = [
  'project',
  'entities',
  'emails',
  'github',
  'dockerHub',
  'workflows',
  'urls',
  'readme',
  'workspaces',
  'artifacts',
  'ignoreFiles',
  'attributeFiles',
  'agents',
  'recipes',
  'environment',
  'settings',
];

/**
 * Lib - Nova Config Order - Normalize Section Order.
 *
 * Reorders the recognized fields of one section and then appends unknown fields
 * in their original relative order. A value that is not an object is returned as is.
 *
 * @param {Lib_NovaConfigOrder_NormalizeSectionOrder_Value} value - Value.
 * @param {Lib_NovaConfigOrder_NormalizeSectionOrder_Keys}  keys  - Keys.
 *
 * @returns {Lib_NovaConfigOrder_NormalizeSectionOrder_Returns}
 *
 * @since 0.49.0
 */
function normalizeSectionOrder(value: Lib_NovaConfigOrder_NormalizeSectionOrder_Value, keys: Lib_NovaConfigOrder_NormalizeSectionOrder_Keys): Lib_NovaConfigOrder_NormalizeSectionOrder_Returns {
  if (isPlainObject(value) === false) {
    return value;
  }

  const result: Lib_NovaConfigOrder_NormalizeSectionOrder_Result = {};
  const orderedKeys: Lib_NovaConfigOrder_NormalizeSectionOrder_OrderedKeys = new Set(keys);

  for (const orderedKey of keys) {
    const key: Lib_NovaConfigOrder_NormalizeSectionOrder_Key = orderedKey;

    if (Object.prototype.hasOwnProperty.call(value, key) === false) {
      continue;
    }

    Reflect.set(result, key, value[key]);
  }

  for (const valueEntry of Object.entries(value)) {
    const entry: Lib_NovaConfigOrder_NormalizeSectionOrder_Entry = valueEntry;
    const entryKey: Lib_NovaConfigOrder_NormalizeSectionOrder_EntryKey = entry[0];
    const entryValue: Lib_NovaConfigOrder_NormalizeSectionOrder_EntryValue = entry[1];

    if (orderedKeys.has(entryKey) === true) {
      continue;
    }

    Reflect.set(result, entryKey, entryValue);
  }

  return result;
}

/**
 * Lib - Nova Config Order - Normalize Read Me Order.
 *
 * Reorders the README section, its profile object, and each ordered profile array
 * entry while retaining unknown fields after the recognized keys.
 *
 * @param {Lib_NovaConfigOrder_NormalizeReadMeOrder_Value} value - Value.
 *
 * @returns {Lib_NovaConfigOrder_NormalizeReadMeOrder_Returns}
 *
 * @since 0.50.0
 */
function normalizeReadMeOrder(value: Lib_NovaConfigOrder_NormalizeReadMeOrder_Value): Lib_NovaConfigOrder_NormalizeReadMeOrder_Returns {
  if (isPlainObject(value) === false) {
    return value;
  }

  const readMe: Lib_NovaConfigOrder_NormalizeReadMeOrder_ReadMe = { ...value };
  const profileValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_ProfileValue = readMe['profile'];

  if (isPlainObject(profileValue) === true) {
    const profile: Lib_NovaConfigOrder_NormalizeReadMeOrder_Profile = { ...profileValue };
    const badgeGroupsValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroupsValue = profile['badgeGroups'];

    if (Array.isArray(badgeGroupsValue) === true) {
      const badgeGroups: Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroups = badgeGroupsValue.map((badgeGroupValue) => {
        if (isPlainObject(badgeGroupValue) === false) {
          return badgeGroupValue;
        }

        const badgeGroup: Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgeGroup = { ...badgeGroupValue };
        const badgesValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_BadgesValue = badgeGroup['badges'];

        if (Array.isArray(badgesValue) === true) {
          const badges: Lib_NovaConfigOrder_NormalizeReadMeOrder_Badges = badgesValue.map((badgeValue) => normalizeSectionOrder(badgeValue, libNovaConfigReadMeProfileBadgeKeys));

          Reflect.set(badgeGroup, 'badges', badges);
        }

        return normalizeSectionOrder(badgeGroup, libNovaConfigReadMeProfileBadgeGroupKeys);
      });

      Reflect.set(profile, 'badgeGroups', badgeGroups);
    }

    const linkGroupsValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroupsValue = profile['linkGroups'];

    if (Array.isArray(linkGroupsValue) === true) {
      const linkGroups: Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroups = linkGroupsValue.map((linkGroupValue) => {
        if (isPlainObject(linkGroupValue) === false) {
          return linkGroupValue;
        }

        const linkGroup: Lib_NovaConfigOrder_NormalizeReadMeOrder_LinkGroup = { ...linkGroupValue };
        const linksValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_LinksValue = linkGroup['links'];

        if (Array.isArray(linksValue) === true) {
          const links: Lib_NovaConfigOrder_NormalizeReadMeOrder_Links = linksValue.map((linkValue) => normalizeSectionOrder(linkValue, libNovaConfigReadMeProfileLinkKeys));

          Reflect.set(linkGroup, 'links', links);
        }

        return normalizeSectionOrder(linkGroup, libNovaConfigReadMeProfileLinkGroupKeys);
      });

      Reflect.set(profile, 'linkGroups', linkGroups);
    }

    const supportValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportValue = profile['support'];

    if (isPlainObject(supportValue) === true) {
      const support: Lib_NovaConfigOrder_NormalizeReadMeOrder_Support = { ...supportValue };
      const supportBadgesValue: Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportBadgesValue = support['badges'];

      if (Array.isArray(supportBadgesValue) === true) {
        const supportBadges: Lib_NovaConfigOrder_NormalizeReadMeOrder_SupportBadges = supportBadgesValue.map((badgeValue) => normalizeSectionOrder(badgeValue, libNovaConfigReadMeProfileBadgeKeys));

        Reflect.set(support, 'badges', supportBadges);
      }

      Reflect.set(profile, 'support', normalizeSectionOrder(support, libNovaConfigReadMeProfileSupportKeys));
    }

    const normalizedProfile: Lib_NovaConfigOrder_NormalizeReadMeOrder_NormalizedProfile = normalizeSectionOrder(profile, libNovaConfigReadMeProfileKeys);

    Reflect.set(readMe, 'profile', normalizedProfile);
  }

  return normalizeSectionOrder(readMe, libNovaConfigReadMeKeys);
}

/**
 * Lib - Nova Config Order - Normalize Nova Config Top Level Order.
 *
 * Reorders recognized top-level sections and the fields inside "dockerHub", "readme",
 * "recipes" and "settings", then appends unrecognized keys in their original relative
 * order so formatting never discards project data.
 *
 * @param {Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config} config - Config.
 *
 * @returns {Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns}
 *
 * @since 0.33.0
 */
export function normalizeNovaConfigTopLevelOrder(config: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config): Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns {
  const result: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Result = {};
  const orderedKeys: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_OrderedKeys = new Set(libNovaConfigTopLevelKeys);

  for (const orderedKey of libNovaConfigTopLevelKeys) {
    const key: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Key = orderedKey;

    if (Object.prototype.hasOwnProperty.call(config, key) === false) {
      continue;
    }

    const value: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Value = config[key];
    let sectionKeys: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_SectionKeys = undefined;

    if (key === 'dockerHub') {
      sectionKeys = libNovaConfigDockerHubKeys;
    } else if (key === 'recipes') {
      sectionKeys = libNovaConfigRecipesKeys;
    } else if (key === 'settings') {
      sectionKeys = libNovaConfigSettingsKeys;
    }

    let normalizedValue: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue = (sectionKeys === undefined) ? value : normalizeSectionOrder(value, sectionKeys);

    if (key === 'readme') {
      normalizedValue = normalizeReadMeOrder(value);
    }

    Reflect.set(result, key, normalizedValue);
  }

  for (const configEntry of Object.entries(config)) {
    const typedConfigEntry: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry = configEntry;
    const configKey: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey = typedConfigEntry[0];
    const configValue: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue = typedConfigEntry[1];

    if (orderedKeys.has(configKey) === true) {
      continue;
    }

    Reflect.set(result, configKey, configValue);
  }

  return result;
}
