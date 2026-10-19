import type { Shared_NovaConfigConfig } from '../shared.d.ts';

/**
 * Lib - Nova Config Order - Lib Nova Config Top Level Keys.
 *
 * @since 0.33.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys = readonly (keyof Shared_NovaConfigConfig)[];

/**
 * Lib - Nova Config Order - Normalize Nova Config Top Level Order.
 *
 * @since 0.33.0
 */
export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Config = Record<string, unknown>;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Returns = Record<string, unknown>;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Result = Record<string, unknown>;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_OrderedKeys = Set<string>;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Key = keyof Shared_NovaConfigConfig;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_Value = unknown;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry = [string, unknown];

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey = string;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue = unknown;
