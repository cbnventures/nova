import type { CSSProperties, ReactNode } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Spotlight.
 *
 * @since 0.15.0
 */
export type Blocks_Spotlight_Index_BlocksSpotlight_Props_Heading = string;

export type Blocks_Spotlight_Index_BlocksSpotlight_Props_Children = ReactNode;

export type Blocks_Spotlight_Index_BlocksSpotlight_Props_Surface = Shared_Surface | undefined;

export type Blocks_Spotlight_Index_BlocksSpotlight_Props_ClassName = string | undefined;

export type Blocks_Spotlight_Index_BlocksSpotlight_Props_Style = CSSProperties | undefined;

export type Blocks_Spotlight_Index_BlocksSpotlight_Props = {
  heading: Blocks_Spotlight_Index_BlocksSpotlight_Props_Heading;
  children: Blocks_Spotlight_Index_BlocksSpotlight_Props_Children;
  surface?: Blocks_Spotlight_Index_BlocksSpotlight_Props_Surface;
  className?: Blocks_Spotlight_Index_BlocksSpotlight_Props_ClassName;
  style?: Blocks_Spotlight_Index_BlocksSpotlight_Props_Style;
};
