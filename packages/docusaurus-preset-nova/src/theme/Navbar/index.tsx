import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';
import { Icon } from '@iconify/react/offline';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavbarActiveItem } from '../../lib/use-navbar-active-item.js';
import Bridge from './Bridge/index.js';
import BridgeMobileMenu from './Bridge/mobile-menu.js';
import Canopy from './Canopy/index.js';
import CanopyMobileMenu from './Canopy/mobile-menu.js';
import Compass from './Compass/index.js';
import CompassMobileMenu from './Compass/mobile-menu.js';
import Monolith from './Monolith/index.js';
import MonolithMobileMenu from './Monolith/mobile-menu.js';

import type {
  Theme_Navbar_Index_ActionItemType,
  Theme_Navbar_Index_ActionItemTypes,
  Theme_Navbar_Index_AllDocsData,
  Theme_Navbar_Index_CurrentScrollPosition,
  Theme_Navbar_Index_GlobalData,
  Theme_Navbar_Index_HamburgerLabel,
  Theme_Navbar_Index_HideOnScroll,
  Theme_Navbar_Index_IsMenuOpen,
  Theme_Navbar_Index_IsMenuOpenState,
  Theme_Navbar_Index_IsScrollingDown,
  Theme_Navbar_Index_LastScrollPositionRef,
  Theme_Navbar_Index_MediaQuery,
  Theme_Navbar_Index_Navbar_ClassName,
  Theme_Navbar_Index_Navbar_ColorModeChoice,
  Theme_Navbar_Index_Navbar_ColorModeDarkLabel,
  Theme_Navbar_Index_Navbar_ColorModeLabel,
  Theme_Navbar_Index_Navbar_ColorModeLightLabel,
  Theme_Navbar_Index_Navbar_ColorModeState,
  Theme_Navbar_Index_Navbar_ColorModeSystemLabel,
  Theme_Navbar_Index_Navbar_Config,
  Theme_Navbar_Index_Navbar_Hidden,
  Theme_Navbar_Index_Navbar_HiddenState,
  Theme_Navbar_Index_Navbar_Item,
  Theme_Navbar_Index_Navbar_Items,
  Theme_Navbar_Index_Navbar_MenuButtonLabel,
  Theme_Navbar_Index_Navbar_Props,
  Theme_Navbar_Index_Navbar_SetColorMode,
  Theme_Navbar_Index_Navbar_SiteConfig,
  Theme_Navbar_Index_Navbar_ThemeConfig,
  Theme_Navbar_Index_Navbar_ThemeConfigCast,
  Theme_Navbar_Index_Navbar_Variant,
  Theme_Navbar_Index_PluginData,
  Theme_Navbar_Index_PresetLogo,
  Theme_Navbar_Index_PresetLogoAlt,
  Theme_Navbar_Index_PresetLogoSrc,
  Theme_Navbar_Index_PresetLogoTitle,
  Theme_Navbar_Index_ResolvedItem,
  Theme_Navbar_Index_ResolvedItemAllDocs,
  Theme_Navbar_Index_ResolvedItemDocCandidate,
  Theme_Navbar_Index_ResolvedItemDocId,
  Theme_Navbar_Index_ResolvedItemMatchedDoc,
  Theme_Navbar_Index_ResolvedItemMatchedVersion,
  Theme_Navbar_Index_ResolvedItemPluginData,
  Theme_Navbar_Index_ResolvedItemPluginId,
  Theme_Navbar_Index_ResolvedItems,
  Theme_Navbar_Index_ResolvedItemSidebar,
  Theme_Navbar_Index_ResolvedItemSidebarId,
  Theme_Navbar_Index_ResolvedItemSidebarLink,
  Theme_Navbar_Index_ResolvedItemType,
  Theme_Navbar_Index_ResolvedItemVersion,
  Theme_Navbar_Index_ResolvedItemVersionSidebars,
  Theme_Navbar_Index_ResolvedItemVersionSidebarsOrUndefined,
  Theme_Navbar_Index_SetIsMenuOpen,
  Theme_Navbar_Index_SetNavbarHidden,
  Theme_Navbar_Index_SiteLogo,
  Theme_Navbar_Index_SiteLogo_Src,
  Theme_Navbar_Index_SvgFilterDefinition,
  Theme_Navbar_Index_SystemColorMode,
  Theme_Navbar_Index_ThemeChoice,
  Theme_Navbar_Index_UserLogo,
  Theme_Navbar_Index_UserLogoAlt,
  Theme_Navbar_Index_UserLogoAriaLabel,
  Theme_Navbar_Index_UserLogoHref,
  Theme_Navbar_Index_UserLogoRel,
  Theme_Navbar_Index_UserLogoSrc,
  Theme_Navbar_Index_UserLogoTarget,
  Theme_Navbar_Index_UserLogoTitle,
  Theme_Navbar_Index_UserLogoWordmark,
  Theme_Navbar_Index_VariantProps,
  Theme_Navbar_Index_VariantProps_ActiveItemLabel,
} from '../../types/theme/Navbar/index.d.ts';

/**
 * Theme - Navbar.
 *
 * Orchestrator component that reads the active navbar variant from
 * build-time global data, assembles shared props, and dispatches
 * rendering to the matching variant sub-component.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Navbar(props: Theme_Navbar_Index_Navbar_Props) {
  const themeConfig: Theme_Navbar_Index_Navbar_ThemeConfig = useThemeConfig() as Theme_Navbar_Index_Navbar_ThemeConfigCast as Theme_Navbar_Index_Navbar_ThemeConfig;
  const siteConfig: Theme_Navbar_Index_Navbar_SiteConfig = themeConfig['site'] as Theme_Navbar_Index_Navbar_SiteConfig;
  const navbarConfig: Theme_Navbar_Index_Navbar_Config = themeConfig['navbar'] as Theme_Navbar_Index_Navbar_Config;
  const colorModeState: Theme_Navbar_Index_Navbar_ColorModeState = useColorMode();
  const colorModeChoice: Theme_Navbar_Index_Navbar_ColorModeChoice = colorModeState['colorModeChoice'];
  const setColorMode: Theme_Navbar_Index_Navbar_SetColorMode = colorModeState['setColorMode'];
  const novaPluginData: Theme_Navbar_Index_PluginData = usePluginData('docusaurus-theme-nova') as Theme_Navbar_Index_PluginData;
  const presetLogo: Theme_Navbar_Index_PresetLogo = novaPluginData['presetLogo'] as Theme_Navbar_Index_PresetLogo;
  const userLogo: Theme_Navbar_Index_UserLogo = siteConfig['logo'] as Theme_Navbar_Index_UserLogo;

  const userLogoSrc: Theme_Navbar_Index_UserLogoSrc = (userLogo !== undefined) ? userLogo['src'] as Theme_Navbar_Index_UserLogoSrc : undefined;
  const userLogoWordmark: Theme_Navbar_Index_UserLogoWordmark = (userLogo !== undefined) ? userLogo['wordmark'] as Theme_Navbar_Index_UserLogoWordmark : undefined;
  const userLogoTitle: Theme_Navbar_Index_UserLogoTitle = (userLogo !== undefined) ? userLogo['title'] as Theme_Navbar_Index_UserLogoTitle : undefined;
  const userLogoAlt: Theme_Navbar_Index_UserLogoAlt = (userLogo !== undefined) ? userLogo['alt'] as Theme_Navbar_Index_UserLogoAlt : undefined;
  const userLogoHref: Theme_Navbar_Index_UserLogoHref = (userLogo !== undefined) ? userLogo['href'] as Theme_Navbar_Index_UserLogoHref : undefined;
  const userLogoTarget: Theme_Navbar_Index_UserLogoTarget = (userLogo !== undefined) ? userLogo['target'] as Theme_Navbar_Index_UserLogoTarget : undefined;
  const userLogoRel: Theme_Navbar_Index_UserLogoRel = (userLogo !== undefined) ? userLogo['rel'] as Theme_Navbar_Index_UserLogoRel : undefined;
  const userLogoAriaLabel: Theme_Navbar_Index_UserLogoAriaLabel = (userLogo !== undefined) ? userLogo['ariaLabel'] as Theme_Navbar_Index_UserLogoAriaLabel : undefined;
  const presetLogoSrc: Theme_Navbar_Index_PresetLogoSrc = (presetLogo !== undefined) ? presetLogo['src'] : undefined;
  const presetLogoTitle: Theme_Navbar_Index_PresetLogoTitle = (presetLogo !== undefined) ? presetLogo['title'] : undefined;
  const presetLogoAlt: Theme_Navbar_Index_PresetLogoAlt = (presetLogo !== undefined) ? presetLogo['alt'] : undefined;

  let resolvedSiteLogoSrc: Theme_Navbar_Index_SiteLogo_Src = undefined;

  if (userLogoSrc !== undefined) {
    resolvedSiteLogoSrc = userLogoSrc;
  } else if (presetLogoSrc !== undefined) {
    resolvedSiteLogoSrc = {
      light: presetLogoSrc,
      dark: undefined,
    };
  }

  const siteLogo: Theme_Navbar_Index_SiteLogo = {
    src: resolvedSiteLogoSrc,
    wordmark: userLogoWordmark,
    title: userLogoTitle ?? presetLogoTitle,
    alt: userLogoAlt
      ?? presetLogoAlt
      ?? '',
    href: userLogoHref,
    target: userLogoTarget,
    rel: userLogoRel,
    ariaLabel: userLogoAriaLabel,
  };
  const hideOnScrollValue: Theme_Navbar_Index_HideOnScroll = (navbarConfig['hideOnScroll'] ?? false) as Theme_Navbar_Index_HideOnScroll;
  const allItems: Theme_Navbar_Index_Navbar_Items = (navbarConfig['items'] ?? []) as Theme_Navbar_Index_Navbar_Items;

  // Split items by type - utility dropdowns (locale, etc.) route to the
  // navbar `actions` slot rather than the menu-link slot.
  const actionItemTypes: Theme_Navbar_Index_ActionItemTypes = new Set(['localeDropdown']);
  const items: Theme_Navbar_Index_Navbar_Items = allItems.filter(
    (item: Theme_Navbar_Index_Navbar_Item) => actionItemTypes.has(item['type'] as Theme_Navbar_Index_ActionItemType) === false,
  );
  const actionItems: Theme_Navbar_Index_Navbar_Items = allItems.filter(
    (item: Theme_Navbar_Index_Navbar_Item) => actionItemTypes.has(item['type'] as Theme_Navbar_Index_ActionItemType),
  );

  // Resolve doc-type navbar items for mobile menus (desktop NavbarItem resolves its own).
  const allDocsData: Theme_Navbar_Index_AllDocsData = useAllDocsData();
  const resolvedItems: Theme_Navbar_Index_ResolvedItems = items.map((item: Theme_Navbar_Index_Navbar_Item) => {
    const itemType: Theme_Navbar_Index_ResolvedItemType = item['type'] as Theme_Navbar_Index_ResolvedItemType;

    if (itemType !== 'doc' && itemType !== 'docSidebar') {
      return item;
    }

    const pluginId: Theme_Navbar_Index_ResolvedItemPluginId = ((item['docsPluginId'] as Theme_Navbar_Index_ResolvedItemPluginId) ?? 'default');
    const pluginData: Theme_Navbar_Index_ResolvedItemPluginData = allDocsData[pluginId];

    if (pluginData === undefined) {
      return item;
    }

    if (itemType === 'doc') {
      const docId: Theme_Navbar_Index_ResolvedItemDocId = item['docId'] as Theme_Navbar_Index_ResolvedItemDocId;
      const allDocs: Theme_Navbar_Index_ResolvedItemAllDocs = pluginData['versions'].flatMap(
        (version: Theme_Navbar_Index_ResolvedItemVersion) => version['docs'],
      );
      const matchedDoc: Theme_Navbar_Index_ResolvedItemMatchedDoc = allDocs.find(
        (candidate: Theme_Navbar_Index_ResolvedItemDocCandidate) => candidate['id'] === docId,
      );

      if (matchedDoc !== undefined) {
        return {
          ...item,
          to: matchedDoc['path'],
          claimBase: pluginData['path'],
        } as Theme_Navbar_Index_ResolvedItem;
      }
    }

    if (itemType === 'docSidebar') {
      const sidebarId: Theme_Navbar_Index_ResolvedItemSidebarId = item['sidebarId'] as Theme_Navbar_Index_ResolvedItemSidebarId;
      const matchedVersion: Theme_Navbar_Index_ResolvedItemMatchedVersion = pluginData['versions'].find(
        (version: Theme_Navbar_Index_ResolvedItemVersion) => {
          const sidebars: Theme_Navbar_Index_ResolvedItemVersionSidebarsOrUndefined = version['sidebars'];

          if (sidebars === undefined) {
            return false;
          }

          const sidebar: Theme_Navbar_Index_ResolvedItemSidebar = sidebars[sidebarId];

          return sidebar !== undefined && sidebar['link'] !== undefined;
        },
      );

      if (matchedVersion !== undefined && matchedVersion['sidebars'] !== undefined) {
        const sidebars: Theme_Navbar_Index_ResolvedItemVersionSidebars = matchedVersion['sidebars'] as Theme_Navbar_Index_ResolvedItemVersionSidebars;
        const sidebar: Theme_Navbar_Index_ResolvedItemSidebar = sidebars[sidebarId];

        if (sidebar !== undefined) {
          const sidebarLink: Theme_Navbar_Index_ResolvedItemSidebarLink = sidebar['link'];

          if (sidebarLink !== undefined) {
            return {
              ...item,
              to: sidebarLink['path'],
            } as Theme_Navbar_Index_ResolvedItem;
          }
        }
      }
    }

    return item;
  });

  // Coordinator: pick the most-specific item that claims the current URL.
  // Most-specific is decided by claim length (regex match or prefix). Doc
  // items broaden their claim to the docs plugin base via `claimBase`, so
  // a per-section sibling with a deeper prefix always wins specificity.
  const activeItemLabel: Theme_Navbar_Index_VariantProps_ActiveItemLabel = useNavbarActiveItem(resolvedItems);

  // Read navbar variant from build-time global data (no hydration mismatch).
  const globalData: Theme_Navbar_Index_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_Navbar_Index_GlobalData;
  const navbarVariant: Theme_Navbar_Index_Navbar_Variant = (globalData['navbarVariant'] ?? 'bridge') as Theme_Navbar_Index_Navbar_Variant;

  const navbarHiddenState: Theme_Navbar_Index_Navbar_HiddenState = useState<Theme_Navbar_Index_Navbar_Hidden>(false);
  const navbarHidden: Theme_Navbar_Index_Navbar_Hidden = navbarHiddenState[0];
  const setNavbarHidden: Theme_Navbar_Index_SetNavbarHidden = navbarHiddenState[1];

  const lastScrollPositionRef: Theme_Navbar_Index_LastScrollPositionRef = useRef<number>(0);
  const isMenuOpenState: Theme_Navbar_Index_IsMenuOpenState = useState<Theme_Navbar_Index_IsMenuOpen>(false);
  const isMenuOpen: Theme_Navbar_Index_IsMenuOpen = isMenuOpenState[0];
  const setIsMenuOpen: Theme_Navbar_Index_SetIsMenuOpen = isMenuOpenState[1];

  /**
   * Theme - Navbar - Navbar.
   *
   * Registers a scroll event listener that hides the navbar when scrolling
   * down past the sixty pixel threshold and reveals it when scrolling up.
   *
   * @since 0.15.0
   */
  useEffect(() => {
    if (hideOnScrollValue === false) {
      return undefined;
    }

    /**
     * Theme - Navbar - Navbar - Handle Scroll.
     *
     * Compares the current scroll position against the last recorded position to
     * determine direction, then toggles the navbar hidden state accordingly.
     *
     * @since 0.15.0
     */
    function handleScroll() {
      const currentScrollPosition: Theme_Navbar_Index_CurrentScrollPosition = window.scrollY;
      const isScrollingDown: Theme_Navbar_Index_IsScrollingDown = currentScrollPosition > lastScrollPositionRef.current;

      if (isScrollingDown === true && currentScrollPosition > 60) {
        setNavbarHidden(true);
      } else if (isScrollingDown === false) {
        setNavbarHidden(false);
      }

      lastScrollPositionRef.current = currentScrollPosition;

      return undefined;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);

      return undefined;
    };
  }, [hideOnScrollValue]);

  /*
   * When system mode is explicitly chosen, apply the actual OS color
   * preference and listen for changes. Only activates when the DOM
   * attribute data-theme-choice is 'system' (set by the toggle or
   * the init script), preventing false triggers during hydration.
   */
  useEffect(() => {
    const themeChoice: Theme_Navbar_Index_ThemeChoice = document.documentElement.getAttribute('data-theme-choice');

    if (themeChoice !== 'system') {
      return undefined;
    }

    /**
     * Theme - Navbar - Navbar - Apply System Mode.
     *
     * Reads the operating system color scheme preference and applies
     * it to the document data-theme attribute when the user has
     * explicitly chosen system mode via the toggle.
     *
     * @since 0.15.0
     */
    function applySystemMode() {
      const systemColorMode: Theme_Navbar_Index_SystemColorMode = (window.matchMedia('(prefers-color-scheme: dark)').matches === true) ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', systemColorMode);

      return undefined;
    }

    applySystemMode();

    const mediaQuery: Theme_Navbar_Index_MediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', applySystemMode);

    return () => {
      mediaQuery.removeEventListener('change', applySystemMode);

      return undefined;
    };
  }, [colorModeChoice]);

  // Cycle: light -> dark -> system (null) -> light.
  let nextColorMode: Theme_Navbar_Index_Navbar_ColorModeChoice = 'light';

  if (colorModeChoice === 'light') {
    nextColorMode = 'dark';
  } else if (colorModeChoice === 'dark') {
    nextColorMode = null;
  }

  const colorModeSystemLabel: Theme_Navbar_Index_Navbar_ColorModeSystemLabel = translate({
    id: 'theme.colorMode.system',
    message: 'System',
    description: 'The screen reader label for system color mode',
  });
  const colorModeLightLabel: Theme_Navbar_Index_Navbar_ColorModeLightLabel = translate({
    id: 'theme.colorMode.light',
    message: 'Light',
    description: 'The screen reader label for light color mode',
  });
  const colorModeDarkLabel: Theme_Navbar_Index_Navbar_ColorModeDarkLabel = translate({
    id: 'theme.colorMode.dark',
    message: 'Dark',
    description: 'The screen reader label for dark color mode',
  });
  const menuButtonLabel: Theme_Navbar_Index_Navbar_MenuButtonLabel = translate({
    id: 'theme.navbar.menuButtonLabel',
    message: 'Menu',
    description: 'The screen reader label for the mobile menu hamburger button',
  });

  let colorModeLabel: Theme_Navbar_Index_Navbar_ColorModeLabel = (
    <>
      <Icon icon="lucide:monitor" width="16" height="16" />
      <span className="nova-sr-only">{colorModeSystemLabel}</span>
    </>
  );

  if (colorModeChoice === 'light') {
    colorModeLabel = (
      <>
        <Icon icon="lucide:sun" width="16" height="16" />
        <span className="nova-sr-only">{colorModeLightLabel}</span>
      </>
    );
  } else if (colorModeChoice === 'dark') {
    colorModeLabel = (
      <>
        <Icon icon="lucide:moon" width="16" height="16" />
        <span className="nova-sr-only">{colorModeDarkLabel}</span>
      </>
    );
  }

  const hamburgerLabel: Theme_Navbar_Index_HamburgerLabel = (
    <>
      <Icon icon="lucide:menu" width="16" height="16" />
      <span className="nova-sr-only">{menuButtonLabel}</span>
    </>
  );

  const navbarBaseClassName: Theme_Navbar_Index_Navbar_ClassName = (navbarHidden === true) ? 'navbar nova-navbar-hidden' : 'navbar';
  const navbarClassName: Theme_Navbar_Index_Navbar_ClassName = (props['className'] !== undefined) ? `${navbarBaseClassName} ${props['className']}` : navbarBaseClassName;

  const variantProps: Theme_Navbar_Index_VariantProps = {
    siteLogo,
    items,
    actionItems,
    colorModeLabel,
    onColorModeToggle: () => {
      setColorMode(nextColorMode);

      return undefined;
    },
    hamburgerLabel,
    onMenuToggle: () => {
      setIsMenuOpen(true);

      return undefined;
    },
    activeItemLabel,
  };

  const svgFilterDefinition: Theme_Navbar_Index_SvgFilterDefinition = (
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <filter id="nova-pixelate">
        <feFlood x="0" y="0" width="1" height="1" />
        <feComposite width="6" height="6" />
        <feTile result="tile" />
        <feComposite in="SourceGraphic" in2="tile" operator="in" />
        <feMorphology operator="dilate" radius="3" />
      </filter>
    </svg>
  );

  switch (navbarVariant) {
    case 'bridge': {
      return (
        <>
          {svgFilterDefinition}
          <div
            className={navbarClassName}
            style={props['style']}
          >
            <Bridge {...variantProps} />
          </div>
          <BridgeMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
            siteLogo={siteLogo}
            activeItemLabel={activeItemLabel}
          />
        </>
      );
    }

    case 'canopy': {
      return (
        <>
          {svgFilterDefinition}
          <div
            className={navbarClassName}
            style={props['style']}
          >
            <Canopy {...variantProps} />
          </div>
          <CanopyMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
            siteLogo={siteLogo}
            activeItemLabel={activeItemLabel}
          />
        </>
      );
    }

    case 'monolith': {
      return (
        <>
          {svgFilterDefinition}
          <div
            className={navbarClassName}
            style={props['style']}
          >
            <Monolith {...variantProps} />
          </div>
          <MonolithMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
            activeItemLabel={activeItemLabel}
          />
        </>
      );
    }

    case 'compass': {
      return (
        <>
          {svgFilterDefinition}
          <div
            className={navbarClassName}
            style={props['style']}
          >
            <Compass {...variantProps} />
          </div>
          <CompassMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
            siteLogo={siteLogo}
            activeItemLabel={activeItemLabel}
          />
        </>
      );
    }

    default: {
      return (
        <>
          {svgFilterDefinition}
          <div
            className={navbarClassName}
            style={props['style']}
          >
            <Bridge {...variantProps} />
          </div>
          <BridgeMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
            siteLogo={siteLogo}
            activeItemLabel={activeItemLabel}
          />
        </>
      );
    }
  }
}

export default Navbar;
