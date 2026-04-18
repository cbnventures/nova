import {
  sanitizeTabsChildren,
  TabsProvider,
  useTabsContextValue,
} from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {
  useEffect,
  useRef,
} from 'react';

import type {
  ThemeTabsContainerRef,
  ThemeTabsEffectCleanupReturns,
  ThemeTabsHandleHashChangeReturns,
  ThemeTabsHashPanel,
  ThemeTabsHashTabValue,
  ThemeTabsHashTarget,
  ThemeTabsIsBrowser,
  ThemeTabsProps,
  ThemeTabsSanitizedChildren,
  ThemeTabsTabListAriaControls,
  ThemeTabsTabListHandleKeyDownCurrentIndex,
  ThemeTabsTabListHandleKeyDownEvent,
  ThemeTabsTabListHandleKeyDownNextIndex,
  ThemeTabsTabListHandleKeyDownNextTabValue,
  ThemeTabsTabListHandleKeyDownParentElement,
  ThemeTabsTabListHandleKeyDownReturns,
  ThemeTabsTabListHandleKeyDownTarget,
  ThemeTabsTabListIsSelected,
  ThemeTabsTabListTabId,
  ThemeTabsTabListTabsResult,
  ThemeTabsTabListTabValue,
  ThemeTabsTabsResult,
} from '../../types/theme/Tabs/index.d.ts';

/**
 * Theme - Tabs - Tab List.
 *
 * Renders an accessible tab button list with role attributes
 * and click handlers, highlighting the currently selected tab
 * without any framework-specific styling.
 *
 * @param {ThemeTabsTabListTabsResult} tabs - Tabs.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function TabList(tabs: ThemeTabsTabListTabsResult) {
  /**
   * Theme - Tabs - Tab List - Handle Key Down.
   *
   * Handles keyboard navigation for the tab list following the
   * WAI-ARIA tabs pattern with arrow keys, Home, and End support
   * for cycling through tabs and focusing the newly selected tab.
   *
   * @param {ThemeTabsTabListHandleKeyDownEvent} event - Event.
   *
   * @since 0.15.0
   */
  function handleKeyDown(event: ThemeTabsTabListHandleKeyDownEvent): ThemeTabsTabListHandleKeyDownReturns {
    const currentIndex: ThemeTabsTabListHandleKeyDownCurrentIndex = tabs['tabValues'].findIndex((tabValue: ThemeTabsTabListTabValue) => tabValue['value'] === tabs['selectedValue']);
    let nextIndex: ThemeTabsTabListHandleKeyDownNextIndex = currentIndex;

    if (event['key'] === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % tabs['tabValues']['length'];
    } else if (event['key'] === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + tabs['tabValues']['length']) % tabs['tabValues']['length'];
    } else if (event['key'] === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event['key'] === 'End') {
      event.preventDefault();
      nextIndex = tabs['tabValues']['length'] - 1;
    } else {
      return undefined;
    }

    const nextTabValue: ThemeTabsTabListHandleKeyDownNextTabValue = tabs['tabValues'][nextIndex];

    if (nextTabValue === undefined) {
      return undefined;
    }

    tabs.selectValue(nextTabValue['value']);

    const parentElement: ThemeTabsTabListHandleKeyDownParentElement = event['currentTarget']['parentElement'];

    if (parentElement === null) {
      return undefined;
    }

    const target: ThemeTabsTabListHandleKeyDownTarget = parentElement.querySelectorAll<HTMLLIElement>('.nova-tabs-tab')[nextIndex];

    if (target !== undefined) {
      target.focus();
    }

    return undefined;
  }

  return (
    <ul className="nova-tabs-list" role="tablist" aria-orientation="horizontal">
      {
        tabs['tabValues'].map((tabValue: ThemeTabsTabListTabValue) => {
          const tabId: ThemeTabsTabListTabId = `nova-tab-${tabValue['value']}`;
          const ariaControls: ThemeTabsTabListAriaControls = `nova-tabpanel-${tabValue['value']}`;
          const isSelected: ThemeTabsTabListIsSelected = tabs['selectedValue'] === tabValue['value'];

          return (
            <li
              className="nova-tabs-tab"
              id={tabId}
              key={tabValue['value']}
              role="tab"
              tabIndex={(isSelected === true) ? 0 : -1}
              aria-selected={isSelected}
              aria-controls={ariaControls}
              data-selected={isSelected}
              onClick={() => {
                tabs.selectValue(tabValue['value']);

                return undefined;
              }}
              onKeyDown={handleKeyDown}
            >
              {tabValue['label'] ?? tabValue['value']}
            </li>
          );
        })
      }
    </ul>
  );
}

/**
 * Theme - Tabs.
 *
 * Renders a tabbed interface with clickable tab buttons and content
 * panels, using Docusaurus tab state management for synchronized
 * selection without framework-specific styling.
 *
 * @param {ThemeTabsProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Tabs(props: ThemeTabsProps) {
  const isBrowser: ThemeTabsIsBrowser = useIsBrowser();
  const containerRef: ThemeTabsContainerRef = useRef<HTMLDivElement>(null);
  const tabs: ThemeTabsTabsResult = useTabsContextValue(props);
  const sanitizedChildren: ThemeTabsSanitizedChildren = sanitizeTabsChildren(props['children']);

  useEffect(() => {
    /**
     * Theme - Tabs - Tabs - Handle Hash Change.
     *
     * Checks whether the current URL hash targets an element inside
     * one of this tab group's panels and switches to that tab when
     * the target is found in a non-selected panel.
     *
     * @since 0.15.0
     */
    function handleHashChange(): ThemeTabsHandleHashChangeReturns {
      if (window.location.hash === '') {
        return undefined;
      }

      if (containerRef['current'] === null) {
        return undefined;
      }

      const hashTarget: ThemeTabsHashTarget = containerRef['current'].querySelector(window.location.hash);

      if (hashTarget === null) {
        return undefined;
      }

      const hashPanel: ThemeTabsHashPanel = hashTarget.closest('.nova-tabs-panel');

      if (hashPanel === null) {
        return undefined;
      }

      const hashTabValue: ThemeTabsHashTabValue = hashPanel.getAttribute('data-value') ?? undefined;

      if (hashTabValue !== undefined && hashTabValue !== tabs['selectedValue']) {
        tabs.selectValue(hashTabValue);
      }

      return undefined;
    }

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return (): ThemeTabsEffectCleanupReturns => {
      window.removeEventListener('hashchange', handleHashChange);

      return undefined;
    };
  }, [tabs]);

  if (isBrowser !== true) {
    return undefined;
  }

  return (
    <TabsProvider value={tabs}>
      <div className="nova-tabs" ref={containerRef}>
        <TabList
          selectedValue={tabs['selectedValue']}
          selectValue={tabs['selectValue']}
          tabValues={tabs['tabValues']}
        />
        <div className="nova-tabs-panels">
          {sanitizedChildren}
        </div>
      </div>
    </TabsProvider>
  );
}

export default Tabs;
