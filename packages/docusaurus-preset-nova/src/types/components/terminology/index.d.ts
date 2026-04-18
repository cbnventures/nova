import type { ReactNode } from 'react';

/**
 * Components - Terminology.
 *
 * @since 0.15.0
 */
export type ComponentsTerminologyPropsChildren = ReactNode;

export type ComponentsTerminologyPropsColor = boolean | undefined;

export type ComponentsTerminologyPropsTitle = string;

export type ComponentsTerminologyPropsTo = string | undefined;

export type ComponentsTerminologyProps = {
  children: ComponentsTerminologyPropsChildren;
  color?: ComponentsTerminologyPropsColor;
  title: ComponentsTerminologyPropsTitle;
  to?: ComponentsTerminologyPropsTo;
};

export type ComponentsTerminologyClassName = string;

export type ComponentsTerminologyElement = ReactNode;
