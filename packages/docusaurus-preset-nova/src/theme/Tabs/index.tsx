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
  Theme_Tabs_Index_TabList_AriaControls,
  Theme_Tabs_Index_TabList_HandleKeyDown_CurrentIndex,
  Theme_Tabs_Index_TabList_HandleKeyDown_Event,
  Theme_Tabs_Index_TabList_HandleKeyDown_NextIndex,
  Theme_Tabs_Index_TabList_HandleKeyDown_NextTabValue,
  Theme_Tabs_Index_TabList_HandleKeyDown_ParentElement,
  Theme_Tabs_Index_TabList_HandleKeyDown_Returns,
  Theme_Tabs_Index_TabList_HandleKeyDown_Target,
  Theme_Tabs_Index_TabList_IsSelected,
  Theme_Tabs_Index_TabList_TabId,
  Theme_Tabs_Index_TabList_TabsResult,
  Theme_Tabs_Index_TabList_TabValue,
  Theme_Tabs_Index_Tabs_ContainerRef,
  Theme_Tabs_Index_Tabs_EffectCleanupReturns,
  Theme_Tabs_Index_Tabs_HandleHashChange_Returns,
  Theme_Tabs_Index_Tabs_HashDecodedId,
  Theme_Tabs_Index_Tabs_HashPanel,
  Theme_Tabs_Index_Tabs_HashTabValue,
  Theme_Tabs_Index_Tabs_HashTarget,
  Theme_Tabs_Index_Tabs_IsBrowser,
  Theme_Tabs_Index_Tabs_Props,
  Theme_Tabs_Index_Tabs_Result,
  Theme_Tabs_Index_Tabs_SanitizedChildren,
} from '../../types/theme/Tabs/index.d.ts';

/**
 * Theme - Tabs - Tab List.
 *
 * Renders an accessible tab button list with role attributes
 * and click handlers, highlighting the currently selected tab
 * without any framework-specific styling.
 *
 * @param {Theme_Tabs_Index_TabList_TabsResult} tabs - Tabs.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function TabList(tabs: Theme_Tabs_Index_TabList_TabsResult) {
  /**
   * Theme - Tabs - Tab List - Handle Key Down.
   *
   * Handles keyboard navigation for the tab list following the
   * WAI-ARIA tabs pattern with arrow keys, Home, and End support
   * for cycling through tabs and focusing the newly selected tab.
   *
   * @param {Theme_Tabs_Index_TabList_HandleKeyDown_Event} event - Event.
   *
   * @since 0.15.0
   */
  function handleKeyDown(event: Theme_Tabs_Index_TabList_HandleKeyDown_Event): Theme_Tabs_Index_TabList_HandleKeyDown_Returns {
    const currentIndex: Theme_Tabs_Index_TabList_HandleKeyDown_CurrentIndex = tabs['tabValues'].findIndex((tabValue: Theme_Tabs_Index_TabList_TabValue) => tabValue['value'] === tabs['selectedValue']);
    let nextIndex: Theme_Tabs_Index_TabList_HandleKeyDown_NextIndex = currentIndex;

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

    const nextTabValue: Theme_Tabs_Index_TabList_HandleKeyDown_NextTabValue = tabs['tabValues'][nextIndex];

    if (nextTabValue === undefined) {
      return undefined;
    }

    tabs.selectValue(nextTabValue['value']);

    const parentElement: Theme_Tabs_Index_TabList_HandleKeyDown_ParentElement = event['currentTarget']['parentElement'];

    if (parentElement === null) {
      return undefined;
    }

    const target: Theme_Tabs_Index_TabList_HandleKeyDown_Target = parentElement.querySelectorAll<HTMLLIElement>('.nova-tabs-tab')[nextIndex];

    if (target !== undefined) {
      target.focus();
    }

    return undefined;
  }

  return (
    <ul className="nova-tabs-list" role="tablist" aria-orientation="horizontal">
      {
        tabs['tabValues'].map((tabValue: Theme_Tabs_Index_TabList_TabValue) => {
          const tabId: Theme_Tabs_Index_TabList_TabId = `nova-tab-${tabValue['value']}`;
          const ariaControls: Theme_Tabs_Index_TabList_AriaControls = `nova-tabpanel-${tabValue['value']}`;
          const isSelected: Theme_Tabs_Index_TabList_IsSelected = tabs['selectedValue'] === tabValue['value'];

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
 * @param {Theme_Tabs_Index_Tabs_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Tabs(props: Theme_Tabs_Index_Tabs_Props) {
  const isBrowser: Theme_Tabs_Index_Tabs_IsBrowser = useIsBrowser();
  const containerRef: Theme_Tabs_Index_Tabs_ContainerRef = useRef<HTMLDivElement>(null);
  const tabs: Theme_Tabs_Index_Tabs_Result = useTabsContextValue(props);
  const sanitizedChildren: Theme_Tabs_Index_Tabs_SanitizedChildren = sanitizeTabsChildren(props['children']);

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
    function handleHashChange(): Theme_Tabs_Index_Tabs_HandleHashChange_Returns {
      if (window.location.hash === '') {
        return undefined;
      }

      if (containerRef['current'] === null) {
        return undefined;
      }

      // Browser percent-encodes non-ASCII characters in `location.hash`
      // (e.g. Arabic-slug anchors become `#%D9%85...mermaid`). The encoded
      // form is not a valid CSS selector, so decode and re-escape before
      // querying. `decodeURIComponent` can throw on malformed input — wrap
      // defensively so a bad hash doesn't crash the page.
      let hashTarget: Theme_Tabs_Index_Tabs_HashTarget = null;

      try {
        const decodedId: Theme_Tabs_Index_Tabs_HashDecodedId = decodeURIComponent(window.location.hash.slice(1));
        hashTarget = containerRef['current'].querySelector(`#${CSS.escape(decodedId)}`);
      } catch {
        return undefined;
      }

      if (hashTarget === null) {
        return undefined;
      }

      const hashPanel: Theme_Tabs_Index_Tabs_HashPanel = hashTarget.closest('.nova-tabs-panel');

      if (hashPanel === null) {
        return undefined;
      }

      const hashTabValue: Theme_Tabs_Index_Tabs_HashTabValue = hashPanel.getAttribute('data-value') ?? undefined;

      if (hashTabValue !== undefined && hashTabValue !== tabs['selectedValue']) {
        tabs.selectValue(hashTabValue);
      }

      return undefined;
    }

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return (): Theme_Tabs_Index_Tabs_EffectCleanupReturns => {
      window.removeEventListener('hashchange', handleHashChange);

      return undefined;
    };
  }, [tabs]);

  if (isBrowser !== true) {
    return undefined;
  }

  return (
    <TabsProvider value={tabs}>
      <div
        className={(props['className'] !== undefined) ? `nova-tabs ${props['className']}` : 'nova-tabs'}
        style={props['style']}
        ref={containerRef}
      >
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
