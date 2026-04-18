/**
 * Lib - Sticky Layout.
 *
 * Client module that dynamically updates --nova-layout-sticky-top
 * based on the navbar height and position type.
 *
 * @since 0.15.0
 */

import type {
  LibStickyLayoutObserver,
  LibStickyLayoutOnRouteDidUpdateComputedStyle,
  LibStickyLayoutOnRouteDidUpdateHeight,
  LibStickyLayoutOnRouteDidUpdateIsSticky,
  LibStickyLayoutOnRouteDidUpdateNavbar,
  LibStickyLayoutOnRouteDidUpdateReturns,
  LibStickyLayoutScheduleUpdateReturns,
  LibStickyLayoutUpdateComputedStyle,
  LibStickyLayoutUpdateHeight,
  LibStickyLayoutUpdateIsSticky,
  LibStickyLayoutUpdateNavbar,
  LibStickyLayoutUpdateReturns,
} from '../types/lib/sticky-layout.d.ts';

if (typeof window !== 'undefined') {
  /**
   * Lib - Sticky Layout - Update.
   *
   * Measures the navbar height, checks if it is sticky,
   * and sets the CSS variable for sticky elements.
   *
   * @since 0.15.0
   */
  function update(): LibStickyLayoutUpdateReturns {
    const navbar: LibStickyLayoutUpdateNavbar = document.querySelector('.navbar');

    if (navbar === null) {
      document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');

      return undefined;
    }

    const computedStyle: LibStickyLayoutUpdateComputedStyle = getComputedStyle(navbar);
    const isSticky: LibStickyLayoutUpdateIsSticky = computedStyle.position === 'sticky' || computedStyle.position === 'fixed';

    if (isSticky === true) {
      const height: LibStickyLayoutUpdateHeight = navbar.getBoundingClientRect().height;

      document.documentElement.style.setProperty('--nova-layout-sticky-top', `${String(height)}px`);
    } else {
      document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');
    }

    return undefined;
  }

  /**
   * Lib - Sticky Layout - Schedule Update.
   *
   * Defers update to the next animation frame to ensure
   * the DOM and CSS are fully rendered before measuring.
   *
   * @since 0.15.0
   */
  function scheduleUpdate(): LibStickyLayoutScheduleUpdateReturns {
    requestAnimationFrame(() => {
      update();

      return undefined;
    });

    return undefined;
  }

  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', scheduleUpdate);

  const observer: LibStickyLayoutObserver = new MutationObserver(scheduleUpdate);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-announcement-bar-initially-dismissed'],
  });

  scheduleUpdate();
}

/**
 * Lib - Sticky Layout - On Route Did Update.
 *
 * Docusaurus lifecycle hook that fires after client-side
 * navigation so the sticky top recalculates.
 *
 * @since 0.15.0
 */
export function onRouteDidUpdate(): LibStickyLayoutOnRouteDidUpdateReturns {
  if (typeof window !== 'undefined' && typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      const navbar: LibStickyLayoutOnRouteDidUpdateNavbar = document.querySelector('.navbar');

      if (navbar === null) {
        document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');

        return undefined;
      }

      const computedStyle: LibStickyLayoutOnRouteDidUpdateComputedStyle = getComputedStyle(navbar);
      const isSticky: LibStickyLayoutOnRouteDidUpdateIsSticky = computedStyle.position === 'sticky' || computedStyle.position === 'fixed';

      if (isSticky === true) {
        const height: LibStickyLayoutOnRouteDidUpdateHeight = navbar.getBoundingClientRect().height;

        document.documentElement.style.setProperty('--nova-layout-sticky-top', `${String(height)}px`);
      } else {
        document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');
      }

      return undefined;
    });
  }

  return undefined;
}
