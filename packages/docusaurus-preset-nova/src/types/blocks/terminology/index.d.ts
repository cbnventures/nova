import type { CSSProperties, ReactNode } from 'react';

/**
 * Blocks - Terminology.
 *
 * @since 0.15.0
 */
export type BlocksTerminologyPropsChildren = ReactNode;

export type BlocksTerminologyPropsColor = boolean | undefined;

export type BlocksTerminologyPropsTitle = string;

export type BlocksTerminologyPropsTo = string | undefined;

export type BlocksTerminologyPropsClassName = string | undefined;

export type BlocksTerminologyPropsStyle = CSSProperties | undefined;

export type BlocksTerminologyProps = {
  children: BlocksTerminologyPropsChildren;
  color?: BlocksTerminologyPropsColor;
  title: BlocksTerminologyPropsTitle;
  to?: BlocksTerminologyPropsTo;
  className?: BlocksTerminologyPropsClassName;
  style?: BlocksTerminologyPropsStyle;
};

export type BlocksTerminologyClassName = string;

export type BlocksTerminologyElement = ReactNode;
