import type {
  Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Key,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_OrderedKeys,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Result,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry,
  Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Value,
} from '../types/lib/nova-config-order.d.ts';

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
  'workflows',
  'urls',
  'readme',
  'workspaces',
  'ignoreFiles',
  'agents',
  'recipes',
  'environment',
  'settings',
];

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

    Reflect.set(result, key, value);
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
