import { isPlainObject } from './utility.js';

import type {
  Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys,
  Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_Entry,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryKey,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryValue,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_Key,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_OrderedKeys,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_Result,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_Returns,
  Lib_NovaConfigOrder_NormalizeDockerHubOrder_Value,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Key,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_OrderedKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Result,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Value,
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
  'agents',
  'recipes',
  'environment',
  'settings',
];

/**
 * Lib - Nova Config Order - Normalize Docker Hub Order.
 *
 * Reorders recognized Docker Hub fields and then appends unknown fields in
 * their original relative order.
 *
 * @param {Lib_NovaConfigOrder_NormalizeDockerHubOrder_Value} value - Value.
 *
 * @returns {Lib_NovaConfigOrder_NormalizeDockerHubOrder_Returns}
 *
 * @since 0.40.0
 */
function normalizeDockerHubOrder(value: Lib_NovaConfigOrder_NormalizeDockerHubOrder_Value): Lib_NovaConfigOrder_NormalizeDockerHubOrder_Returns {
  if (isPlainObject(value) === false) {
    return value;
  }

  const result: Lib_NovaConfigOrder_NormalizeDockerHubOrder_Result = {};
  const orderedKeys: Lib_NovaConfigOrder_NormalizeDockerHubOrder_OrderedKeys = new Set(libNovaConfigDockerHubKeys);

  for (const orderedKey of libNovaConfigDockerHubKeys) {
    const key: Lib_NovaConfigOrder_NormalizeDockerHubOrder_Key = orderedKey;

    if (Object.prototype.hasOwnProperty.call(value, key) === false) {
      continue;
    }

    Reflect.set(result, key, value[key]);
  }

  for (const valueEntry of Object.entries(value)) {
    const entry: Lib_NovaConfigOrder_NormalizeDockerHubOrder_Entry = valueEntry;
    const entryKey: Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryKey = entry[0];
    const entryValue: Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryValue = entry[1];

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
 * Reorders recognized top-level sections and then appends unrecognized keys in
 * their original relative order so formatting never discards project data.
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
    const normalizedValue: Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue = (key === 'dockerHub') ? normalizeDockerHubOrder(value) : value;

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
