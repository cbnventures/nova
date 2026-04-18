import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Stats.
 *
 * @since 0.15.0
 */
export type ComponentsStatsItemValue = string;

export type ComponentsStatsItemLabel = string;

export type ComponentsStatsItemColor = 'primary' | 'accent';

export type ComponentsStatsItem = {
  value: ComponentsStatsItemValue;
  label: ComponentsStatsItemLabel;
  color?: ComponentsStatsItemColor;
};

export type ComponentsStatsPropsItems = ComponentsStatsItem[];

export type ComponentsStatsPropsHeading = string | undefined;

export type ComponentsStatsPropsDescription = string | undefined;

export type ComponentsStatsPropsSurface = SharedSurface | undefined;

export type ComponentsStatsProps = {
  heading?: ComponentsStatsPropsHeading;
  description?: ComponentsStatsPropsDescription;
  items: ComponentsStatsPropsItems;
  surface?: ComponentsStatsPropsSurface;
};
