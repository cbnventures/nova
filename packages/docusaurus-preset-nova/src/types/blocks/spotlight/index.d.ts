import type { CSSProperties, ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Spotlight.
 *
 * @since 0.15.0
 */
export type BlocksSpotlightPropsHeading = string;

export type BlocksSpotlightPropsChildren = ReactNode;

export type BlocksSpotlightPropsSurface = SharedSurface | undefined;

export type BlocksSpotlightPropsClassName = string | undefined;

export type BlocksSpotlightPropsStyle = CSSProperties | undefined;

export type BlocksSpotlightProps = {
  heading: BlocksSpotlightPropsHeading;
  children: BlocksSpotlightPropsChildren;
  surface?: BlocksSpotlightPropsSurface;
  className?: BlocksSpotlightPropsClassName;
  style?: BlocksSpotlightPropsStyle;
};
