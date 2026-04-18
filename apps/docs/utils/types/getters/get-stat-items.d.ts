import type { Dirent } from 'fs';

import type { PagesStatItems } from '@site/src/types/pages/index.d.ts';

/**
 * Getters - Get Stat Items - Count Files.
 *
 * @since 0.15.0
 */
export type GettersGetStatItemsCountFilesBasePath = string;

export type GettersGetStatItemsCountFilesExtensions = string[];

export type GettersGetStatItemsCountFilesReturns = number;

export type GettersGetStatItemsCountFilesCount = number;

export type GettersGetStatItemsCountFilesEntries = Dirent[];

export type GettersGetStatItemsCountFilesEntryName = string;

/**
 * Getters - Get Stat Items - Fetch Stat Items.
 *
 * @since 0.15.0
 */
export type GettersGetStatItemsFetchStatItemsReturns = PagesStatItems;

export type GettersGetStatItemsFetchStatItemsNovaSourcePath = string;
