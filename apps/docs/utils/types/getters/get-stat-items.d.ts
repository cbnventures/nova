import type { Dirent } from 'fs';

import type { PagesStatItems } from '@site/src/types/pages/index.d.ts';

/**
 * Getters - Get Stat Items - Count Files.
 *
 * @since 0.15.0
 */
export type Getters_GetStatItems_CountFiles_BasePath = string;

export type Getters_GetStatItems_CountFiles_Extensions = string[];

export type Getters_GetStatItems_CountFiles_Returns = number;

export type Getters_GetStatItems_CountFiles_Count = number;

export type Getters_GetStatItems_CountFiles_Entries = Dirent[];

export type Getters_GetStatItems_CountFiles_EntryName = string;

/**
 * Getters - Get Stat Items - Fetch Stat Items.
 *
 * @since 0.15.0
 */
export type Getters_GetStatItems_FetchStatItems_Returns = PagesStatItems;

export type Getters_GetStatItems_FetchStatItems_NovaSourcePath = string;
