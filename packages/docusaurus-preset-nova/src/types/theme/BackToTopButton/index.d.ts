import type { CSSProperties, Dispatch, SetStateAction } from 'react';

/**
 * Theme - Back To Top Button - Back To Top Button.
 *
 * @since 0.15.0
 */
export type Theme_BackToTopButton_Index_BackToTopButton_Props_ClassName = string | undefined;

export type Theme_BackToTopButton_Index_BackToTopButton_Props_Style = CSSProperties | undefined;

export type Theme_BackToTopButton_Index_BackToTopButton_Props = {
  className?: Theme_BackToTopButton_Index_BackToTopButton_Props_ClassName;
  style?: Theme_BackToTopButton_Index_BackToTopButton_Props_Style;
};

export type Theme_BackToTopButton_Index_BackToTopButton_Returns = React.JSX.Element | null;

export type Theme_BackToTopButton_Index_BackToTopButton_ThemeConfig = {
  backToTopButton?: Theme_BackToTopButton_Index_BackToTopButton_ThemeConfig_BackToTopButton;
  [key: string]: unknown;
};

export type Theme_BackToTopButton_Index_BackToTopButton_ThemeConfig_BackToTopButton = boolean;

export type Theme_BackToTopButton_Index_BackToTopButton_ScrollThreshold = number;

export type Theme_BackToTopButton_Index_BackToTopButton_IsVisibleState = [Theme_BackToTopButton_Index_BackToTopButton_IsVisible, Theme_BackToTopButton_Index_BackToTopButton_SetIsVisible];

export type Theme_BackToTopButton_Index_BackToTopButton_IsVisible = boolean;

export type Theme_BackToTopButton_Index_BackToTopButton_SetIsVisible = Dispatch<SetStateAction<Theme_BackToTopButton_Index_BackToTopButton_IsVisible>>;

/**
 * Theme - Back To Top Button - Back To Top Button - Handle Scroll.
 *
 * @since 0.15.0
 */
export type Theme_BackToTopButton_Index_BackToTopButton_HandleScroll_CurrentScrollPosition = number;

export type Theme_BackToTopButton_Index_BackToTopButton_ButtonAriaLabel = string;
