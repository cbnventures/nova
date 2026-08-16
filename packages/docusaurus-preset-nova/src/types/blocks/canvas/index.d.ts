import type { CSSProperties, ReactNode } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Canvas.
 *
 * @since 0.24.0
 */
export type Blocks_Canvas_Index_BlocksCanvas_Props_Children = ReactNode;

export type Blocks_Canvas_Index_BlocksCanvas_Props_Container = 'contained' | 'full' | undefined;

export type Blocks_Canvas_Index_BlocksCanvas_Props_Surface = 'default' | Shared_Surface | undefined;

export type Blocks_Canvas_Index_BlocksCanvas_Props_ClassName = string | undefined;

export type Blocks_Canvas_Index_BlocksCanvas_Props_Style = CSSProperties | undefined;

export type Blocks_Canvas_Index_BlocksCanvas_Props = {
  children: Blocks_Canvas_Index_BlocksCanvas_Props_Children;
  container?: Blocks_Canvas_Index_BlocksCanvas_Props_Container;
  surface?: Blocks_Canvas_Index_BlocksCanvas_Props_Surface;
  className?: Blocks_Canvas_Index_BlocksCanvas_Props_ClassName;
  style?: Blocks_Canvas_Index_BlocksCanvas_Props_Style;
};

export type Blocks_Canvas_Index_BlocksCanvas_InnerContent = React.JSX.Element;
