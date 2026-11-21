import { isPlainObject } from './utility.js';

import type {
  Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys,
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
 * Lib - Nova Config Order - Normalize Nova Config Top Level Order.
 *
 * Reorders recognized top-level sections and the fields inside "dockerHub",
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

    const normalizedValue: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue = (sectionKeys === undefined) ? value : normalizeSectionOrder(value, sectionKeys);

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
