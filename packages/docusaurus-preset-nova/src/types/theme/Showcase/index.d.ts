import type {
  Children,
  CSSProperties,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

/**
 * Theme - Showcase.
 *
 * @since 0.18.0
 */
export type Theme_Showcase_Index_Showcase_Props_LayoutDescription = string;

export type Theme_Showcase_Index_Showcase_Props_Description = string;

export type Theme_Showcase_Index_Showcase_Props_Children = ReactNode;

export type Theme_Showcase_Index_Showcase_Props_ClassName = string | undefined;

export type Theme_Showcase_Index_Showcase_Props_Style = CSSProperties | undefined;

export type Theme_Showcase_Index_Showcase_Props = {
  layoutDescription: Theme_Showcase_Index_Showcase_Props_LayoutDescription;
  description: Theme_Showcase_Index_Showcase_Props_Description;
  children: Theme_Showcase_Index_Showcase_Props_Children;
  className?: Theme_Showcase_Index_Showcase_Props_ClassName;
  style?: Theme_Showcase_Index_Showcase_Props_Style;
};

export type Theme_Showcase_Index_Showcase_Returns = React.JSX.Element;

export type Theme_Showcase_Index_Showcase_LayoutDescription = string;

export type Theme_Showcase_Index_Showcase_Description = string;

export type Theme_Showcase_Index_Showcase_Children = ReactNode;

export type Theme_Showcase_Index_Showcase_ChildrenArray = ReturnType<typeof Children.toArray>;

export type Theme_Showcase_Index_ShowcaseItem_Element = ReactElement<Theme_Showcase_Index_ItemProps>;

export type Theme_Showcase_Index_ShowcaseItem_Elements = Theme_Showcase_Index_ShowcaseItem_Element[];

export type Theme_Showcase_Index_Showcase_OpenMap = Record<number, boolean>;

export type Theme_Showcase_Index_Showcase_OpenMapState = [Theme_Showcase_Index_Showcase_OpenMap, Theme_Showcase_Index_Showcase_SetOpenMap];

export type Theme_Showcase_Index_Showcase_SetOpenMap = Dispatch<SetStateAction<Theme_Showcase_Index_Showcase_OpenMap>>;

export type Theme_Showcase_Index_Showcase_AllOpen = boolean;

export type Theme_Showcase_Index_Showcase_CollapseAllLabel = string;

export type Theme_Showcase_Index_Showcase_ExpandAllLabel = string;

export type Theme_Showcase_Index_Showcase_TitleLabel = string;

export type Theme_Showcase_Index_Showcase_ToggleAllLabel = string;

export type Theme_Showcase_Index_Showcase_HandleToggleAll_NextOpen = boolean;

export type Theme_Showcase_Index_Showcase_HandleItemToggle_Index = number;

export type Theme_Showcase_Index_Showcase_HandleItemToggle_IsOpen = boolean;

export type Theme_Showcase_Index_Showcase_HandleItemToggle_Previous = Theme_Showcase_Index_Showcase_OpenMap;

/**
 * Theme - Showcase - Item.
 *
 * @since 0.18.0
 */
export type Theme_Showcase_Index_ItemProps_Title = string;

export type Theme_Showcase_Index_ItemProps_Children = ReactNode;

export type Theme_Showcase_Index_ItemProps = {
  title: Theme_Showcase_Index_ItemProps_Title;
  children: Theme_Showcase_Index_ItemProps_Children;
};

export type Theme_Showcase_Index_ItemReturns = ReactElement;

export type Theme_Showcase_Index_ItemUnknownCast = unknown;

export type Theme_Showcase_Index_ItemTitle = string;

export type Theme_Showcase_Index_ItemChildren = ReactNode;
