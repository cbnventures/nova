import type { ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Hero.
 *
 * @since 0.15.0
 */
export type ComponentsHeroPropsEyebrow = string | undefined;

export type ComponentsHeroPropsHeading = ReactNode;

export type ComponentsHeroPropsTagline = string;

export type ComponentsHeroPropsCtaLabel = string;

export type ComponentsHeroPropsCtaLink = string;

export type ComponentsHeroPropsSecondaryCtaLabel = string | undefined;

export type ComponentsHeroPropsSecondaryCtaLink = string | undefined;

export type ComponentsHeroPropsSurface = SharedSurface | undefined;

export type ComponentsHeroProps = {
  eyebrow?: ComponentsHeroPropsEyebrow;
  heading: ComponentsHeroPropsHeading;
  tagline: ComponentsHeroPropsTagline;
  ctaLabel: ComponentsHeroPropsCtaLabel;
  ctaLink: ComponentsHeroPropsCtaLink;
  secondaryCtaLabel?: ComponentsHeroPropsSecondaryCtaLabel;
  secondaryCtaLink?: ComponentsHeroPropsSecondaryCtaLink;
  surface?: ComponentsHeroPropsSurface;
};
