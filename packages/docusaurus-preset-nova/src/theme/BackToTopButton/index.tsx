import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import {
  useEffect,
  useState,
} from 'react';

import type {
  ThemeBackToTopButtonButtonAriaLabel,
  ThemeBackToTopButtonCurrentScrollPosition,
  ThemeBackToTopButtonEnabled,
  ThemeBackToTopButtonIsVisible,
  ThemeBackToTopButtonIsVisibleState,
  ThemeBackToTopButtonProps,
  ThemeBackToTopButtonReturns,
  ThemeBackToTopButtonScrollThreshold,
  ThemeBackToTopButtonSetIsVisible,
  ThemeBackToTopButtonThemeConfig,
} from '../../types/theme/BackToTopButton/index.d.ts';

/**
 * Theme - Back To Top Button - Back To Top Button.
 *
 * Renders a fixed-position button that appears after scrolling
 * past a threshold and smoothly scrolls the page back to the
 * top when clicked.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BackToTopButton(props: ThemeBackToTopButtonProps): ThemeBackToTopButtonReturns {
  const themeConfig: ThemeBackToTopButtonThemeConfig = useThemeConfig() as ThemeBackToTopButtonThemeConfig;
  const enabled: ThemeBackToTopButtonEnabled = themeConfig['backToTopButton'] ?? true;
  const scrollThreshold: ThemeBackToTopButtonScrollThreshold = 300;
  const isVisibleState: ThemeBackToTopButtonIsVisibleState = useState<ThemeBackToTopButtonIsVisible>(false);
  const isVisible: ThemeBackToTopButtonIsVisible = isVisibleState[0];
  const setIsVisible: ThemeBackToTopButtonSetIsVisible = isVisibleState[1];

  useEffect(() => {
    /**
     * Theme - Back To Top Button - Back To Top Button - Handle Scroll.
     *
     * Toggles the button visibility based on whether the current
     * scroll position exceeds the defined threshold.
     *
     * @since 0.15.0
     */
    function handleScroll() {
      const currentScrollPosition: ThemeBackToTopButtonCurrentScrollPosition = window.scrollY;

      setIsVisible(currentScrollPosition > scrollThreshold);

      return undefined;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      return undefined;
    };
  }, [scrollThreshold]);

  if (enabled === false) {
    return null;
  }

  const buttonAriaLabel: ThemeBackToTopButtonButtonAriaLabel = translate({
    id: 'theme.BackToTopButton.buttonAriaLabel',
    message: 'Scroll back to top',
    description: 'The ARIA label for the back to top button',
  });

  return (
    <button
      className={(props['className'] !== undefined) ? `nova-back-to-top ${props['className']}` : 'nova-back-to-top'}
      style={props['style']}
      type="button"
      data-visible={(isVisible === true) ? 'true' : 'false'}
      aria-hidden={(isVisible === true) ? undefined : true}
      tabIndex={(isVisible === true) ? 0 : -1}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return undefined;
      }}
      aria-label={buttonAriaLabel}
    >
      <Icon icon="lucide:arrow-up" width="18" height="18" aria-hidden="true" />
    </button>
  );
}

export default BackToTopButton;
