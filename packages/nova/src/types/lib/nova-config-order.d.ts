import type {
  Shared_NovaConfig_DockerHub,
  Shared_NovaConfigConfig,
} from '../shared.d.ts';

/**
 * Lib - Nova Config Order - Lib Nova Config Docker Hub Keys.
 *
 * @since 0.40.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigDockerHubKeys = readonly (keyof Shared_NovaConfig_DockerHub)[];

/**
 * Lib - Nova Config Order - Lib Nova Config Top Level Keys.
 *
 * @since 0.33.0
 */
export type Lib_NovaConfigOrder_LibNovaConfigTopLevelKeys = readonly (keyof Shared_NovaConfigConfig)[];

/**
 * Lib - Nova Config Order - Normalize Docker Hub Order.
 *
 * @since 0.40.0
 */
export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_Value = unknown;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_Returns = unknown;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_Result = Record<string, unknown>;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_OrderedKeys = Set<string>;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_Key = keyof Shared_NovaConfig_DockerHub;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_Entry = [string, unknown];

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryKey = string;

export type Lib_NovaConfigOrder_NormalizeDockerHubOrder_EntryValue = unknown;

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

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_NormalizedValue = unknown;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_TypedConfigEntry = [string, unknown];

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigKey = string;

export type Lib_NovaConfigOrder_NormalizeNovaConfigTopLevelOrder_ConfigValue = unknown;
