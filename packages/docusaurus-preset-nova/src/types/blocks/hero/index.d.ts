import type { CSSProperties, ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Hero.
 *
 * @since 0.15.0
 */
export type BlocksHeroPropsEyebrow = string | undefined;

export type BlocksHeroPropsHeading = ReactNode;

export type BlocksHeroPropsTagline = string;

export type BlocksHeroPropsCtaLabel = string;

export type BlocksHeroPropsCtaLink = string;

export type BlocksHeroPropsSecondaryCtaLabel = string | undefined;

export type BlocksHeroPropsSecondaryCtaLink = string | undefined;

export type BlocksHeroPropsSurface = SharedSurface | undefined;

export type BlocksHeroPropsClassName = string | undefined;

export type BlocksHeroPropsStyle = CSSProperties | undefined;

export type BlocksHeroProps = {
  eyebrow?: BlocksHeroPropsEyebrow;
  heading: BlocksHeroPropsHeading;
  tagline: BlocksHeroPropsTagline;
  ctaLabel: BlocksHeroPropsCtaLabel;
  ctaLink: BlocksHeroPropsCtaLink;
  secondaryCtaLabel?: BlocksHeroPropsSecondaryCtaLabel;
  secondaryCtaLink?: BlocksHeroPropsSecondaryCtaLink;
  surface?: BlocksHeroPropsSurface;
  className?: BlocksHeroPropsClassName;
  style?: BlocksHeroPropsStyle;
};
