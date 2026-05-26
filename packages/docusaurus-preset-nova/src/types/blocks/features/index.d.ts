import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties, ReactNode } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Features.
 *
 * @since 0.15.0
 */
export type BlocksFeaturesItemIcon = string | IconifyIcon;

export type BlocksFeaturesItemTitle = string;

export type BlocksFeaturesItemDescription = string | ReactNode;

export type BlocksFeaturesItem = {
  icon?: BlocksFeaturesItemIcon;
  title: BlocksFeaturesItemTitle;
  description: BlocksFeaturesItemDescription;
};

export type BlocksFeaturesItems = BlocksFeaturesItem[];

export type BlocksFeaturesPropsItems = BlocksFeaturesItem[];

export type BlocksFeaturesPropsHeading = string | undefined;

export type BlocksFeaturesPropsSurface = SharedSurface | undefined;

export type BlocksFeaturesPropsClassName = string | undefined;

export type BlocksFeaturesPropsStyle = CSSProperties | undefined;

export type BlocksFeaturesProps = {
  heading?: BlocksFeaturesPropsHeading;
  items: BlocksFeaturesPropsItems;
  surface?: BlocksFeaturesPropsSurface;
  className?: BlocksFeaturesPropsClassName;
  style?: BlocksFeaturesPropsStyle;
};
