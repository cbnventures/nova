import type { CSSProperties, ReactNode } from 'react';

/**
 * Blocks - Frame.
 *
 * @since 0.18.0
 */
export type Blocks_Frame_Index_BlocksFrame_Props_Caption = ReactNode | undefined;

export type Blocks_Frame_Index_BlocksFrame_Props_Children = ReactNode;

export type Blocks_Frame_Index_BlocksFrame_Props_ClassName = string | undefined;

export type Blocks_Frame_Index_BlocksFrame_Props_Style = CSSProperties | undefined;

export type Blocks_Frame_Index_BlocksFrame_Props = {
  caption?: Blocks_Frame_Index_BlocksFrame_Props_Caption;
  children: Blocks_Frame_Index_BlocksFrame_Props_Children;
  className?: Blocks_Frame_Index_BlocksFrame_Props_ClassName;
  style?: Blocks_Frame_Index_BlocksFrame_Props_Style;
};

export type Blocks_Frame_Index_BlocksFrame_Returns = React.JSX.Element;
