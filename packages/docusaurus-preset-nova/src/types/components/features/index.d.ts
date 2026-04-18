import type { IconifyIcon } from '@iconify/react/offline';
import type { ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Features.
 *
 * @since 0.15.0
 */
export type ComponentsFeaturesItemIcon = string | IconifyIcon;

export type ComponentsFeaturesItemTitle = string;

export type ComponentsFeaturesItemDescription = string | ReactNode;

export type ComponentsFeaturesItem = {
  icon?: ComponentsFeaturesItemIcon;
  title: ComponentsFeaturesItemTitle;
  description: ComponentsFeaturesItemDescription;
};

export type ComponentsFeaturesItems = ComponentsFeaturesItem[];

export type ComponentsFeaturesPropsItems = ComponentsFeaturesItem[];

export type ComponentsFeaturesPropsHeading = string | undefined;

export type ComponentsFeaturesPropsSurface = SharedSurface | undefined;

export type ComponentsFeaturesProps = {
  heading?: ComponentsFeaturesPropsHeading;
  items: ComponentsFeaturesPropsItems;
  surface?: ComponentsFeaturesPropsSurface;
};
