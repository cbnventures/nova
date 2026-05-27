import type {
  Children, CSSProperties, Dispatch, ReactElement, ReactNode, SetStateAction,
} from 'react';

/**
 * Theme - Details.
 *
 * @since 0.15.0
 */
export type Theme_Details_Index_Details_Props_Summary = ReactNode | undefined;

export type Theme_Details_Index_Details_Props_Children = ReactNode;

export type Theme_Details_Index_Details_Props_Open = boolean | undefined;

export type Theme_Details_Index_Details_Props_OnToggle = ((isOpen: boolean) => void) | undefined;

export type Theme_Details_Index_Details_Props_ClassName = string | undefined;

export type Theme_Details_Index_Details_Props_Style = CSSProperties | undefined;

export type Theme_Details_Index_Details_Props = {
  summary?: Theme_Details_Index_Details_Props_Summary;
  children: Theme_Details_Index_Details_Props_Children;
  open?: Theme_Details_Index_Details_Props_Open;
  onToggle?: Theme_Details_Index_Details_Props_OnToggle;
  className?: Theme_Details_Index_Details_Props_ClassName;
  style?: Theme_Details_Index_Details_Props_Style;
  [key: string]: unknown;
};

export type Theme_Details_Index_Details_Returns = React.JSX.Element;

export type Theme_Details_Index_Details_Summary = ReactNode | undefined;

export type Theme_Details_Index_Details_Children = ReactNode;

export type Theme_Details_Index_Details_Open = boolean | undefined;

export type Theme_Details_Index_Details_OnToggle = ((isOpen: boolean) => void) | undefined;

export type Theme_Details_Index_Details_State = [Theme_Details_Index_Details_IsOpen, Theme_Details_Index_Details_SetIsOpen];

export type Theme_Details_Index_Details_IsOpen = boolean;

export type Theme_Details_Index_Details_SetIsOpen = Dispatch<SetStateAction<Theme_Details_Index_Details_IsOpen>>;

export type Theme_Details_Index_Details_ExtractedSummary = ReactElement | undefined;

export type Theme_Details_Index_Details_FilteredChildren = ReactNode;

export type Theme_Details_Index_Details_ChildrenArray = ReturnType<typeof Children.toArray>;
