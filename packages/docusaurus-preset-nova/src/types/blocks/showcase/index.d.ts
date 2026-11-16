import type {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react';

/**
 * Blocks - Showcase.
 *
 * @since 0.43.0
 */
export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Content = ReactNode;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Description = ReactNode;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Heading = string;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Label = string;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link_Label = string;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link_To = string;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link = {
  label: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link_Label;
  to: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link_To;
} | undefined;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Item = {
  content: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Content;
  description?: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Description;
  heading: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Heading;
  label: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Label;
  link?: Blocks_Showcase_Index_BlocksShowcase_Props_Item_Link;
};

export type Blocks_Showcase_Index_BlocksShowcase_Props_Items = Blocks_Showcase_Index_BlocksShowcase_Props_Item[];

export type Blocks_Showcase_Index_BlocksShowcase_Props_TabsLabel = string | undefined;

export type Blocks_Showcase_Index_BlocksShowcase_Props_ClassName = string | undefined;

export type Blocks_Showcase_Index_BlocksShowcase_Props_Style = CSSProperties | undefined;

export type Blocks_Showcase_Index_BlocksShowcase_Props = {
  items: Blocks_Showcase_Index_BlocksShowcase_Props_Items;
  tabsLabel?: Blocks_Showcase_Index_BlocksShowcase_Props_TabsLabel;
  className?: Blocks_Showcase_Index_BlocksShowcase_Props_ClassName;
  style?: Blocks_Showcase_Index_BlocksShowcase_Props_Style;
};

export type Blocks_Showcase_Index_BlocksShowcase_Returns = React.JSX.Element;

export type Blocks_Showcase_Index_BlocksShowcase_BaseId = string;

export type Blocks_Showcase_Index_BlocksShowcase_Active = number;

export type Blocks_Showcase_Index_BlocksShowcase_State = [Blocks_Showcase_Index_BlocksShowcase_Active, Blocks_Showcase_Index_BlocksShowcase_SetActive];

export type Blocks_Showcase_Index_BlocksShowcase_SetActive = Dispatch<SetStateAction<Blocks_Showcase_Index_BlocksShowcase_Active>>;

export type Blocks_Showcase_Index_BlocksShowcase_Current = Blocks_Showcase_Index_BlocksShowcase_Props_Item | undefined;
