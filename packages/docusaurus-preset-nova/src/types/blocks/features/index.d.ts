import type { IconifyIcon } from '@iconify/react/offline';
import type { CSSProperties, ReactNode } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Features.
 *
 * @since 0.15.0
 */
export type Blocks_Features_Index_BlocksFeatures_Item_Icon = string | IconifyIcon;

export type Blocks_Features_Index_BlocksFeatures_Item_Title = string;

export type Blocks_Features_Index_BlocksFeatures_Item_Description = string | ReactNode;

export type Blocks_Features_Index_BlocksFeatures_Item = {
  icon?: Blocks_Features_Index_BlocksFeatures_Item_Icon;
  title: Blocks_Features_Index_BlocksFeatures_Item_Title;
  description: Blocks_Features_Index_BlocksFeatures_Item_Description;
};

export type Blocks_Features_Index_BlocksFeatures_Items = Blocks_Features_Index_BlocksFeatures_Item[];

export type Blocks_Features_Index_BlocksFeatures_Props_Items = Blocks_Features_Index_BlocksFeatures_Item[];

export type Blocks_Features_Index_BlocksFeatures_Props_Heading = string | undefined;

export type Blocks_Features_Index_BlocksFeatures_Props_Surface = Shared_Surface | undefined;

export type Blocks_Features_Index_BlocksFeatures_Props_ClassName = string | undefined;

export type Blocks_Features_Index_BlocksFeatures_Props_Style = CSSProperties | undefined;

export type Blocks_Features_Index_BlocksFeatures_Props = {
  heading?: Blocks_Features_Index_BlocksFeatures_Props_Heading;
  items: Blocks_Features_Index_BlocksFeatures_Props_Items;
  surface?: Blocks_Features_Index_BlocksFeatures_Props_Surface;
  className?: Blocks_Features_Index_BlocksFeatures_Props_ClassName;
  style?: Blocks_Features_Index_BlocksFeatures_Props_Style;
};
