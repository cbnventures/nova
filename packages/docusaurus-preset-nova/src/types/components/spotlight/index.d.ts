import type { ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Spotlight.
 *
 * @since 0.15.0
 */
export type ComponentsSpotlightPropsHeading = string;

export type ComponentsSpotlightPropsChildren = ReactNode;

export type ComponentsSpotlightPropsSurface = SharedSurface | undefined;

export type ComponentsSpotlightProps = {
  heading: ComponentsSpotlightPropsHeading;
  children: ComponentsSpotlightPropsChildren;
  surface?: ComponentsSpotlightPropsSurface;
};
