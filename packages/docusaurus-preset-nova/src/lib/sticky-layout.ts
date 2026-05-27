/**
 * Lib - Sticky Layout.
 *
 * Client module that dynamically updates --nova-layout-sticky-top
 * based on the navbar height and position type.
 *
 * @since 0.15.0
 */

import type {
  Lib_StickyLayout_Observer,
  Lib_StickyLayout_OnRouteDidUpdate_ComputedStyle,
  Lib_StickyLayout_OnRouteDidUpdate_Height,
  Lib_StickyLayout_OnRouteDidUpdate_IsSticky,
  Lib_StickyLayout_OnRouteDidUpdate_Navbar,
  Lib_StickyLayout_OnRouteDidUpdate_Returns,
  Lib_StickyLayout_ScheduleUpdate_Returns,
  Lib_StickyLayout_Update_ComputedStyle,
  Lib_StickyLayout_Update_Height,
  Lib_StickyLayout_Update_IsSticky,
  Lib_StickyLayout_Update_Navbar,
  Lib_StickyLayout_Update_Returns,
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
  function update(): Lib_StickyLayout_Update_Returns {
    const navbar: Lib_StickyLayout_Update_Navbar = document.querySelector('.navbar');

    if (navbar === null) {
      document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');

      return undefined;
    }

    const computedStyle: Lib_StickyLayout_Update_ComputedStyle = getComputedStyle(navbar);
    const isSticky: Lib_StickyLayout_Update_IsSticky = computedStyle.position === 'sticky' || computedStyle.position === 'fixed';

    if (isSticky === true) {
      const height: Lib_StickyLayout_Update_Height = navbar.getBoundingClientRect().height;

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
  function scheduleUpdate(): Lib_StickyLayout_ScheduleUpdate_Returns {
    requestAnimationFrame(() => {
      update();

      return undefined;
    });

    return undefined;
  }

  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('load', scheduleUpdate);

  const observer: Lib_StickyLayout_Observer = new MutationObserver(scheduleUpdate);

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
export function onRouteDidUpdate(): Lib_StickyLayout_OnRouteDidUpdate_Returns {
  if (typeof window !== 'undefined' && typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      const navbar: Lib_StickyLayout_OnRouteDidUpdate_Navbar = document.querySelector('.navbar');

      if (navbar === null) {
        document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');

        return undefined;
      }

      const computedStyle: Lib_StickyLayout_OnRouteDidUpdate_ComputedStyle = getComputedStyle(navbar);
      const isSticky: Lib_StickyLayout_OnRouteDidUpdate_IsSticky = computedStyle.position === 'sticky' || computedStyle.position === 'fixed';

      if (isSticky === true) {
        const height: Lib_StickyLayout_OnRouteDidUpdate_Height = navbar.getBoundingClientRect().height;

        document.documentElement.style.setProperty('--nova-layout-sticky-top', `${String(height)}px`);
      } else {
        document.documentElement.style.setProperty('--nova-layout-sticky-top', '0px');
      }

      return undefined;
    });
  }

  return undefined;
}
