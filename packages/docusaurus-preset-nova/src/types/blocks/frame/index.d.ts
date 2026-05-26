import type { CSSProperties, ReactNode } from 'react';

/**
 * Blocks - Frame.
 *
 * @since 0.18.0
 */
export type BlocksFramePropsCaption = ReactNode | undefined;

export type BlocksFramePropsChildren = ReactNode;

export type BlocksFramePropsClassName = string | undefined;

export type BlocksFramePropsStyle = CSSProperties | undefined;

export type BlocksFrameProps = {
  caption?: BlocksFramePropsCaption;
  children: BlocksFramePropsChildren;
  className?: BlocksFramePropsClassName;
  style?: BlocksFramePropsStyle;
};

export type BlocksFrameReturns = React.JSX.Element;
