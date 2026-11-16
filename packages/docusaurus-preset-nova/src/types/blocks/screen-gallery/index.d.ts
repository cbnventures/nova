import type { CSSProperties, ReactNode } from 'react';

/**
 * Blocks - Screen Gallery.
 *
 * @since 0.43.0
 */
export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Description = ReactNode;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Heading = string;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Image = ReactNode;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link_Label = string;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link_To = string;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link = {
  label: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link_Label;
  to: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link_To;
} | undefined;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item = {
  description?: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Description;
  heading: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Heading;
  image: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Image;
  link?: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item_Link;
};

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Items = Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Item[];

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_ClassName = string | undefined;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Style = CSSProperties | undefined;

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Props = {
  items: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Items;
  className?: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_ClassName;
  style?: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props_Style;
};

export type Blocks_ScreenGallery_Index_BlocksScreenGallery_Returns = React.JSX.Element;
