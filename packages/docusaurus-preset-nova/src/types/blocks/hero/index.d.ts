import type { CSSProperties, ReactNode } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Hero.
 *
 * @since 0.15.0
 */
export type Blocks_Hero_Index_BlocksHero_Props_Eyebrow = string | undefined;

export type Blocks_Hero_Index_BlocksHero_Props_Heading = ReactNode;

export type Blocks_Hero_Index_BlocksHero_Props_Tagline = string;

export type Blocks_Hero_Index_BlocksHero_Props_CtaLabel = string;

export type Blocks_Hero_Index_BlocksHero_Props_CtaLink = string;

export type Blocks_Hero_Index_BlocksHero_Props_SecondaryCtaLabel = string | undefined;

export type Blocks_Hero_Index_BlocksHero_Props_SecondaryCtaLink = string | undefined;

export type Blocks_Hero_Index_BlocksHero_Props_Surface = Shared_Surface | undefined;

export type Blocks_Hero_Index_BlocksHero_Props_ClassName = string | undefined;

export type Blocks_Hero_Index_BlocksHero_Props_Style = CSSProperties | undefined;

export type Blocks_Hero_Index_BlocksHero_Props = {
  eyebrow?: Blocks_Hero_Index_BlocksHero_Props_Eyebrow;
  heading: Blocks_Hero_Index_BlocksHero_Props_Heading;
  tagline: Blocks_Hero_Index_BlocksHero_Props_Tagline;
  ctaLabel: Blocks_Hero_Index_BlocksHero_Props_CtaLabel;
  ctaLink: Blocks_Hero_Index_BlocksHero_Props_CtaLink;
  secondaryCtaLabel?: Blocks_Hero_Index_BlocksHero_Props_SecondaryCtaLabel;
  secondaryCtaLink?: Blocks_Hero_Index_BlocksHero_Props_SecondaryCtaLink;
  surface?: Blocks_Hero_Index_BlocksHero_Props_Surface;
  className?: Blocks_Hero_Index_BlocksHero_Props_ClassName;
  style?: Blocks_Hero_Index_BlocksHero_Props_Style;
};
