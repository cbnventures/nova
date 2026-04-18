import type { Dispatch, SetStateAction } from 'react';

/**
 * Pages - Showcase.
 *
 * @since 0.15.0
 */
export type PagesShowcaseState = [PagesShowcaseExpanded, PagesShowcaseSetExpanded];

export type PagesShowcaseExpanded = boolean | undefined;

export type PagesShowcaseSetExpanded = Dispatch<SetStateAction<PagesShowcaseExpanded>>;
