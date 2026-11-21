import type {
  Shared_NovaConfig_DockerHub,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Settings,
  Shared_NovaConfigConfig,
} from '../shared.d.ts';

/**
 * Lib - Nova Config Order - Lib Nova Config Docker Hub Keys.
 *
 * @since 0.40.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys = readonly (keyof Shared_NovaConfig_DockerHub)[];

/**
 * Lib - Nova Config Order - Lib Nova Config Recipes Keys.
 *
 * @since 0.49.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigRecipesKeys = readonly (keyof Shared_NovaConfig_Recipes)[];

/**
 * Lib - Nova Config Order - Lib Nova Config Settings Keys.
 *
 * @since 0.49.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigSettingsKeys = readonly (keyof Shared_NovaConfig_Settings)[];

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

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_SectionKeys = readonly string[] | undefined;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue = unknown;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry = [string, unknown];

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey = string;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue = unknown;

/**
 * Lib - Nova Config Order - Normalize Section Order.
 *
 * @since 0.49.0
 */
export type Lib_NovaConfigOrder_NormalizeSectionOrder_Value = unknown;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_Keys = readonly string[];

export type Lib_NovaConfigOrder_NormalizeSectionOrder_Returns = unknown;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_Result = Record<string, unknown>;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_OrderedKeys = Set<string>;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_Key = string;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_Entry = [string, unknown];

export type Lib_NovaConfigOrder_NormalizeSectionOrder_EntryKey = string;

export type Lib_NovaConfigOrder_NormalizeSectionOrder_EntryValue = unknown;
