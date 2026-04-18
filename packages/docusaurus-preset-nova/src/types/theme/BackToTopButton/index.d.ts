import type { Dispatch, SetStateAction } from 'react';

/**
 * Theme - Back To Top Button - Back To Top Button.
 *
 * @since 0.15.0
 */
export type ThemeBackToTopButtonReturns = React.JSX.Element | null;

export type ThemeBackToTopButtonThemeConfig = {
  backToTopButton?: ThemeBackToTopButtonEnabled;
  [key: string]: unknown;
};

export type ThemeBackToTopButtonEnabled = boolean;

export type ThemeBackToTopButtonScrollThreshold = number;

export type ThemeBackToTopButtonIsVisibleState = [ThemeBackToTopButtonIsVisible, ThemeBackToTopButtonSetIsVisible];

export type ThemeBackToTopButtonIsVisible = boolean;

export type ThemeBackToTopButtonSetIsVisible = Dispatch<SetStateAction<ThemeBackToTopButtonIsVisible>>;

/**
 * Theme - Back To Top Button - Back To Top Button - Handle Scroll.
 *
 * @since 0.15.0
 */
export type ThemeBackToTopButtonCurrentScrollPosition = number;

export type ThemeBackToTopButtonButtonAriaLabel = string;
