import type { IconifyIcon } from '@iconify/react';
import type * as React from 'react';
import type { ReactNode } from 'react';

/**
 * Feature item.
 *
 * @since 1.0.0
 */
export type FeatureItemId = string;

export type FeatureItemTitle = string;

export type FeatureItemIcon = string | IconifyIcon;

export type FeatureItemDescription = ReactNode;

export type FeatureItemColor = string;

export type FeatureItem = {
  id: FeatureItemId;
  title: FeatureItemTitle;
  icon: FeatureItemIcon;
  color: FeatureItemColor;
  description: FeatureItemDescription;
};

export type FeatureItems = FeatureItem[];

/**
 * Styles.
 *
 * @since 1.0.0
 */
export type Styles = {
  [key: string]: React.CSSProperties;
};

/**
 * Term.
 *
 * @since 1.0.0
 */
export type TermPropsChildren = string;

export type TermPropsTitle = string;

export type TermPropsTo = string;

export type TermProps = {
  children: TermPropsChildren;
  title: TermPropsTitle;
  to: TermPropsTo;
};
