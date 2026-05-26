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
export type ThemeShowcaseIndexShowcasePropsLayoutDescription = string;

export type ThemeShowcaseIndexShowcasePropsDescription = string;

export type ThemeShowcaseIndexShowcasePropsChildren = ReactNode;

export type ThemeShowcaseIndexShowcasePropsClassName = string | undefined;

export type ThemeShowcaseIndexShowcasePropsStyle = CSSProperties | undefined;

export type ThemeShowcaseIndexShowcaseProps = {
  layoutDescription: ThemeShowcaseIndexShowcasePropsLayoutDescription;
  description: ThemeShowcaseIndexShowcasePropsDescription;
  children: ThemeShowcaseIndexShowcasePropsChildren;
  className?: ThemeShowcaseIndexShowcasePropsClassName;
  style?: ThemeShowcaseIndexShowcasePropsStyle;
};

export type ThemeShowcaseIndexShowcaseReturns = React.JSX.Element;

export type ThemeShowcaseIndexShowcaseLayoutDescription = string;

export type ThemeShowcaseIndexShowcaseDescription = string;

export type ThemeShowcaseIndexShowcaseChildren = ReactNode;

export type ThemeShowcaseIndexShowcaseChildrenArray = ReturnType<typeof Children.toArray>;

export type ThemeShowcaseIndexShowcaseItemElements = ThemeShowcaseIndexShowcaseItemElement[];

export type ThemeShowcaseIndexShowcaseOpenMap = Record<number, boolean>;

export type ThemeShowcaseIndexShowcaseOpenMapState = [ThemeShowcaseIndexShowcaseOpenMap, ThemeShowcaseIndexShowcaseSetOpenMap];

export type ThemeShowcaseIndexShowcaseSetOpenMap = Dispatch<SetStateAction<ThemeShowcaseIndexShowcaseOpenMap>>;

export type ThemeShowcaseIndexShowcaseAllOpen = boolean;

export type ThemeShowcaseIndexShowcaseCollapseAllLabel = string;

export type ThemeShowcaseIndexShowcaseExpandAllLabel = string;

export type ThemeShowcaseIndexShowcaseTitleLabel = string;

export type ThemeShowcaseIndexShowcaseToggleAllLabel = string;

export type ThemeShowcaseIndexShowcaseHandleToggleAllNextOpen = boolean;

export type ThemeShowcaseIndexShowcaseHandleItemToggleIndex = number;

export type ThemeShowcaseIndexShowcaseHandleItemToggleIsOpen = boolean;

export type ThemeShowcaseIndexShowcaseHandleItemTogglePrevious = ThemeShowcaseIndexShowcaseOpenMap;

export type ThemeShowcaseIndexShowcaseItemElement = ReactElement<ThemeShowcaseIndexItemProps>;

/**
 * Theme - Showcase - Item.
 *
 * @since 0.18.0
 */
export type ThemeShowcaseIndexItemPropsTitle = string;

export type ThemeShowcaseIndexItemPropsChildren = ReactNode;

export type ThemeShowcaseIndexItemProps = {
  title: ThemeShowcaseIndexItemPropsTitle;
  children: ThemeShowcaseIndexItemPropsChildren;
};

export type ThemeShowcaseIndexItemReturns = ReactElement;

export type ThemeShowcaseIndexItemUnknownCast = unknown;

export type ThemeShowcaseIndexItemTitle = string;

export type ThemeShowcaseIndexItemChildren = ReactNode;
