import type { CSSProperties } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Stats.
 *
 * @since 0.15.0
 */
export type Blocks_Stats_Index_BlocksStats_Item_Value = string;

export type Blocks_Stats_Index_BlocksStats_Item_Label = string;

export type Blocks_Stats_Index_BlocksStats_Item_Color = 'primary' | 'accent';

export type Blocks_Stats_Index_BlocksStats_Item = {
  value: Blocks_Stats_Index_BlocksStats_Item_Value;
  label: Blocks_Stats_Index_BlocksStats_Item_Label;
  color?: Blocks_Stats_Index_BlocksStats_Item_Color;
};

export type Blocks_Stats_Index_BlocksStats_Props_Items = Blocks_Stats_Index_BlocksStats_Item[];

export type Blocks_Stats_Index_BlocksStats_Props_Heading = string | undefined;

export type Blocks_Stats_Index_BlocksStats_Props_Description = string | undefined;

export type Blocks_Stats_Index_BlocksStats_Props_Surface = Shared_Surface | undefined;

export type Blocks_Stats_Index_BlocksStats_Props_ClassName = string | undefined;

export type Blocks_Stats_Index_BlocksStats_Props_Style = CSSProperties | undefined;

export type Blocks_Stats_Index_BlocksStats_Props = {
  heading?: Blocks_Stats_Index_BlocksStats_Props_Heading;
  description?: Blocks_Stats_Index_BlocksStats_Props_Description;
  items: Blocks_Stats_Index_BlocksStats_Props_Items;
  surface?: Blocks_Stats_Index_BlocksStats_Props_Surface;
  className?: Blocks_Stats_Index_BlocksStats_Props_ClassName;
  style?: Blocks_Stats_Index_BlocksStats_Props_Style;
};
