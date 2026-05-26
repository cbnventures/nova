import type { CSSProperties } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Stats.
 *
 * @since 0.15.0
 */
export type BlocksStatsItemValue = string;

export type BlocksStatsItemLabel = string;

export type BlocksStatsItemColor = 'primary' | 'accent';

export type BlocksStatsItem = {
  value: BlocksStatsItemValue;
  label: BlocksStatsItemLabel;
  color?: BlocksStatsItemColor;
};

export type BlocksStatsPropsItems = BlocksStatsItem[];

export type BlocksStatsPropsHeading = string | undefined;

export type BlocksStatsPropsDescription = string | undefined;

export type BlocksStatsPropsSurface = SharedSurface | undefined;

export type BlocksStatsPropsClassName = string | undefined;

export type BlocksStatsPropsStyle = CSSProperties | undefined;

export type BlocksStatsProps = {
  heading?: BlocksStatsPropsHeading;
  description?: BlocksStatsPropsDescription;
  items: BlocksStatsPropsItems;
  surface?: BlocksStatsPropsSurface;
  className?: BlocksStatsPropsClassName;
  style?: BlocksStatsPropsStyle;
};
