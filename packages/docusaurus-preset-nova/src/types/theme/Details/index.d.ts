import type {
  Children, CSSProperties, Dispatch, ReactElement, ReactNode, SetStateAction,
} from 'react';

/**
 * Theme - Details.
 *
 * @since 0.15.0
 */
export type ThemeDetailsPropsSummary = ReactNode | undefined;

export type ThemeDetailsPropsChildren = ReactNode;

export type ThemeDetailsPropsOpen = boolean | undefined;

export type ThemeDetailsPropsOnToggle = ((isOpen: boolean) => void) | undefined;

export type ThemeDetailsPropsClassName = string | undefined;

export type ThemeDetailsPropsStyle = CSSProperties | undefined;

export type ThemeDetailsProps = {
  summary?: ThemeDetailsPropsSummary;
  children: ThemeDetailsPropsChildren;
  open?: ThemeDetailsPropsOpen;
  onToggle?: ThemeDetailsPropsOnToggle;
  className?: ThemeDetailsPropsClassName;
  style?: ThemeDetailsPropsStyle;
  [key: string]: unknown;
};

export type ThemeDetailsReturns = React.JSX.Element;

export type ThemeDetailsSummary = ReactNode | undefined;

export type ThemeDetailsChildren = ReactNode;

export type ThemeDetailsOpen = boolean | undefined;

export type ThemeDetailsOnToggle = ((isOpen: boolean) => void) | undefined;

export type ThemeDetailsState = [ThemeDetailsIsOpen, ThemeDetailsSetIsOpen];

export type ThemeDetailsIsOpen = boolean;

export type ThemeDetailsSetIsOpen = Dispatch<SetStateAction<ThemeDetailsIsOpen>>;

export type ThemeDetailsExtractedSummary = ReactElement | undefined;

export type ThemeDetailsFilteredChildren = ReactNode;

export type ThemeDetailsChildrenArray = ReturnType<typeof Children.toArray>;
