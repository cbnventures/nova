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

import Bridge from './Bridge/index.js';
import BridgeMobileMenu from './Bridge/mobile-menu.js';
import Canopy from './Canopy/index.js';
import CanopyMobileMenu from './Canopy/mobile-menu.js';
import Compass from './Compass/index.js';
import CompassMobileMenu from './Compass/mobile-menu.js';
import Monolith from './Monolith/index.js';
import MonolithMobileMenu from './Monolith/mobile-menu.js';

import type {
  ThemeNavbarColorModeChoice,
  ThemeNavbarColorModeLabel,
  ThemeNavbarColorModeState,
  ThemeNavbarIndexAllDocsData,
  ThemeNavbarIndexCurrentScrollPosition,
  ThemeNavbarIndexGlobalData,
  ThemeNavbarIndexHamburgerLabel,
  ThemeNavbarIndexHideOnScroll,
  ThemeNavbarIndexIsMenuOpen,
  ThemeNavbarIndexIsMenuOpenState,
  ThemeNavbarIndexIsScrollingDown,
  ThemeNavbarIndexLastScrollPositionRef,
  ThemeNavbarIndexMediaQuery,
  ThemeNavbarIndexNavbarClassName,
  ThemeNavbarIndexNavbarHidden,
  ThemeNavbarIndexNavbarHiddenState,
  ThemeNavbarIndexNavbarVariant,
  ThemeNavbarIndexPluginData,
  ThemeNavbarIndexPresetLogo,
  ThemeNavbarIndexPresetLogoAlt,
  ThemeNavbarIndexPresetLogoSrc,
  ThemeNavbarIndexPresetLogoTitle,
  ThemeNavbarIndexResolvedItem,
  ThemeNavbarIndexResolvedItemAllDocs,
  ThemeNavbarIndexResolvedItemDocCandidate,
  ThemeNavbarIndexResolvedItemDocId,
  ThemeNavbarIndexResolvedItemMatchedDoc,
  ThemeNavbarIndexResolvedItemMatchedVersion,
  ThemeNavbarIndexResolvedItemPluginData,
  ThemeNavbarIndexResolvedItemPluginId,
  ThemeNavbarIndexResolvedItems,
  ThemeNavbarIndexResolvedItemSidebar,
  ThemeNavbarIndexResolvedItemSidebarId,
  ThemeNavbarIndexResolvedItemSidebarLink,
  ThemeNavbarIndexResolvedItemType,
  ThemeNavbarIndexResolvedItemVersion,
  ThemeNavbarIndexResolvedItemVersionSidebars,
  ThemeNavbarIndexResolvedItemVersionSidebarsOrUndefined,
  ThemeNavbarIndexSetIsMenuOpen,
  ThemeNavbarIndexSetNavbarHidden,
  ThemeNavbarIndexSiteLogo,
  ThemeNavbarIndexSvgFilterDefinition,
  ThemeNavbarIndexSystemColorMode,
  ThemeNavbarIndexThemeChoice,
  ThemeNavbarIndexUserLogo,
  ThemeNavbarIndexUserLogoAlt,
  ThemeNavbarIndexUserLogoHref,
  ThemeNavbarIndexUserLogoSrc,
  ThemeNavbarIndexUserLogoSrcDark,
  ThemeNavbarIndexUserLogoTitle,
  ThemeNavbarIndexUserLogoWordmark,
  ThemeNavbarIndexUserLogoWordmarkDark,
  ThemeNavbarIndexVariantProps,
  ThemeNavbarItem,
  ThemeNavbarItems,
  ThemeNavbarNavbarColorModeDarkLabel,
  ThemeNavbarNavbarColorModeLightLabel,
  ThemeNavbarNavbarColorModeSystemLabel,
  ThemeNavbarNavbarConfig,
  ThemeNavbarNavbarMenuButtonLabel,
  ThemeNavbarSetColorMode,
  ThemeNavbarSiteConfig,
  ThemeNavbarThemeConfig,
  ThemeNavbarThemeConfigCast,
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
function Navbar() {
  const themeConfig: ThemeNavbarThemeConfig = useThemeConfig() as ThemeNavbarThemeConfigCast as ThemeNavbarThemeConfig;
  const siteConfig: ThemeNavbarSiteConfig = themeConfig['site'] as ThemeNavbarSiteConfig;
  const navbarConfig: ThemeNavbarNavbarConfig = themeConfig['navbar'] as ThemeNavbarNavbarConfig;
  const colorModeState: ThemeNavbarColorModeState = useColorMode();
  const colorModeChoice: ThemeNavbarColorModeChoice = colorModeState['colorModeChoice'];
  const setColorMode: ThemeNavbarSetColorMode = colorModeState['setColorMode'];
  const novaPluginData: ThemeNavbarIndexPluginData = usePluginData('docusaurus-theme-nova') as ThemeNavbarIndexPluginData;
  const presetLogo: ThemeNavbarIndexPresetLogo = novaPluginData['presetLogo'] as ThemeNavbarIndexPresetLogo;
  const userLogo: ThemeNavbarIndexUserLogo = siteConfig['logo'] as ThemeNavbarIndexUserLogo;

  const userLogoSrc: ThemeNavbarIndexUserLogoSrc = (userLogo !== undefined) ? userLogo['src'] as ThemeNavbarIndexUserLogoSrc : undefined;
  const userLogoSrcDark: ThemeNavbarIndexUserLogoSrcDark = (userLogo !== undefined) ? userLogo['srcDark'] as ThemeNavbarIndexUserLogoSrcDark : undefined;
  const userLogoWordmark: ThemeNavbarIndexUserLogoWordmark = (userLogo !== undefined) ? userLogo['wordmark'] as ThemeNavbarIndexUserLogoWordmark : undefined;
  const userLogoWordmarkDark: ThemeNavbarIndexUserLogoWordmarkDark = (userLogo !== undefined) ? userLogo['wordmarkDark'] as ThemeNavbarIndexUserLogoWordmarkDark : undefined;
  const userLogoTitle: ThemeNavbarIndexUserLogoTitle = (userLogo !== undefined) ? userLogo['title'] as ThemeNavbarIndexUserLogoTitle : undefined;
  const userLogoAlt: ThemeNavbarIndexUserLogoAlt = (userLogo !== undefined) ? userLogo['alt'] as ThemeNavbarIndexUserLogoAlt : undefined;
  const userLogoHref: ThemeNavbarIndexUserLogoHref = (userLogo !== undefined) ? userLogo['href'] as ThemeNavbarIndexUserLogoHref : undefined;
  const presetLogoSrc: ThemeNavbarIndexPresetLogoSrc = (presetLogo !== undefined) ? presetLogo['src'] : undefined;
  const presetLogoTitle: ThemeNavbarIndexPresetLogoTitle = (presetLogo !== undefined) ? presetLogo['title'] : undefined;
  const presetLogoAlt: ThemeNavbarIndexPresetLogoAlt = (presetLogo !== undefined) ? presetLogo['alt'] : undefined;

  const siteLogo: ThemeNavbarIndexSiteLogo = {
    src: userLogoSrc ?? presetLogoSrc,
    srcDark: userLogoSrcDark,
    wordmark: userLogoWordmark,
    wordmarkDark: userLogoWordmarkDark,
    title: userLogoTitle ?? presetLogoTitle,
    alt: userLogoAlt
      ?? presetLogoAlt
      ?? '',
    href: userLogoHref,
  };
  const hideOnScrollValue: ThemeNavbarIndexHideOnScroll = (navbarConfig['hideOnScroll'] ?? false) as ThemeNavbarIndexHideOnScroll;
  const items: ThemeNavbarItems = (navbarConfig['items'] ?? []) as ThemeNavbarItems;

  // Resolve doc-type navbar items for mobile menus (desktop NavbarItem resolves its own).
  const allDocsData: ThemeNavbarIndexAllDocsData = useAllDocsData();
  const resolvedItems: ThemeNavbarIndexResolvedItems = items.map((item: ThemeNavbarItem) => {
    const itemType: ThemeNavbarIndexResolvedItemType = item['type'] as ThemeNavbarIndexResolvedItemType;

    if (itemType !== 'doc' && itemType !== 'docSidebar') {
      return item;
    }

    const pluginId: ThemeNavbarIndexResolvedItemPluginId = ((item['docsPluginId'] as ThemeNavbarIndexResolvedItemPluginId) ?? 'default');
    const pluginData: ThemeNavbarIndexResolvedItemPluginData = allDocsData[pluginId];

    if (pluginData === undefined) {
      return item;
    }

    if (itemType === 'doc') {
      const docId: ThemeNavbarIndexResolvedItemDocId = item['docId'] as ThemeNavbarIndexResolvedItemDocId;
      const allDocs: ThemeNavbarIndexResolvedItemAllDocs = pluginData['versions'].flatMap(
        (version: ThemeNavbarIndexResolvedItemVersion) => version['docs'],
      );
      const matchedDoc: ThemeNavbarIndexResolvedItemMatchedDoc = allDocs.find(
        (candidate: ThemeNavbarIndexResolvedItemDocCandidate) => candidate['id'] === docId,
      );

      if (matchedDoc !== undefined) {
        return {
          ...item,
          to: matchedDoc['path'],
        } as ThemeNavbarIndexResolvedItem;
      }
    }

    if (itemType === 'docSidebar') {
      const sidebarId: ThemeNavbarIndexResolvedItemSidebarId = item['sidebarId'] as ThemeNavbarIndexResolvedItemSidebarId;
      const matchedVersion: ThemeNavbarIndexResolvedItemMatchedVersion = pluginData['versions'].find(
        (version: ThemeNavbarIndexResolvedItemVersion) => {
          const sidebars: ThemeNavbarIndexResolvedItemVersionSidebarsOrUndefined = version['sidebars'];

          if (sidebars === undefined) {
            return false;
          }

          const sidebar: ThemeNavbarIndexResolvedItemSidebar = sidebars[sidebarId];

          return sidebar !== undefined && sidebar['link'] !== undefined;
        },
      );

      if (matchedVersion !== undefined && matchedVersion['sidebars'] !== undefined) {
        const sidebars: ThemeNavbarIndexResolvedItemVersionSidebars = matchedVersion['sidebars'] as ThemeNavbarIndexResolvedItemVersionSidebars;
        const sidebar: ThemeNavbarIndexResolvedItemSidebar = sidebars[sidebarId];

        if (sidebar !== undefined) {
          const sidebarLink: ThemeNavbarIndexResolvedItemSidebarLink = sidebar['link'];

          if (sidebarLink !== undefined) {
            return {
              ...item,
              to: sidebarLink['path'],
            } as ThemeNavbarIndexResolvedItem;
          }
        }
      }
    }

    return item;
  });

  // Read navbar variant from build-time global data (no hydration mismatch).
  const globalData: ThemeNavbarIndexGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeNavbarIndexGlobalData;
  const navbarVariant: ThemeNavbarIndexNavbarVariant = (globalData['navbarVariant'] ?? 'bridge') as ThemeNavbarIndexNavbarVariant;

  const navbarHiddenState: ThemeNavbarIndexNavbarHiddenState = useState<ThemeNavbarIndexNavbarHidden>(false);
  const navbarHidden: ThemeNavbarIndexNavbarHidden = navbarHiddenState[0];
  const setNavbarHidden: ThemeNavbarIndexSetNavbarHidden = navbarHiddenState[1];

  const lastScrollPositionRef: ThemeNavbarIndexLastScrollPositionRef = useRef<number>(0);
  const isMenuOpenState: ThemeNavbarIndexIsMenuOpenState = useState<ThemeNavbarIndexIsMenuOpen>(false);
  const isMenuOpen: ThemeNavbarIndexIsMenuOpen = isMenuOpenState[0];
  const setIsMenuOpen: ThemeNavbarIndexSetIsMenuOpen = isMenuOpenState[1];

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
      const currentScrollPosition: ThemeNavbarIndexCurrentScrollPosition = window.scrollY;
      const isScrollingDown: ThemeNavbarIndexIsScrollingDown = currentScrollPosition > lastScrollPositionRef.current;

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
    const themeChoice: ThemeNavbarIndexThemeChoice = document.documentElement.getAttribute('data-theme-choice');

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
      const systemColorMode: ThemeNavbarIndexSystemColorMode = (window.matchMedia('(prefers-color-scheme: dark)').matches === true) ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', systemColorMode);

      return undefined;
    }

    applySystemMode();

    const mediaQuery: ThemeNavbarIndexMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', applySystemMode);

    return () => {
      mediaQuery.removeEventListener('change', applySystemMode);

      return undefined;
    };
  }, [colorModeChoice]);

  // Cycle: light → dark → system (null) → light.
  let nextColorMode: ThemeNavbarColorModeChoice = 'light';

  if (colorModeChoice === 'light') {
    nextColorMode = 'dark';
  } else if (colorModeChoice === 'dark') {
    nextColorMode = null;
  }

  const colorModeSystemLabel: ThemeNavbarNavbarColorModeSystemLabel = translate({
    id: 'theme.colorMode.system',
    message: 'System',
    description: 'The screen reader label for system color mode',
  });
  const colorModeLightLabel: ThemeNavbarNavbarColorModeLightLabel = translate({
    id: 'theme.colorMode.light',
    message: 'Light',
    description: 'The screen reader label for light color mode',
  });
  const colorModeDarkLabel: ThemeNavbarNavbarColorModeDarkLabel = translate({
    id: 'theme.colorMode.dark',
    message: 'Dark',
    description: 'The screen reader label for dark color mode',
  });
  const menuButtonLabel: ThemeNavbarNavbarMenuButtonLabel = translate({
    id: 'theme.navbar.menuButtonLabel',
    message: 'Menu',
    description: 'The screen reader label for the mobile menu hamburger button',
  });

  let colorModeLabel: ThemeNavbarColorModeLabel = (
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

  const hamburgerLabel: ThemeNavbarIndexHamburgerLabel = (
    <>
      <Icon icon="lucide:menu" width="16" height="16" />
      <span className="nova-sr-only">{menuButtonLabel}</span>
    </>
  );

  const navbarClassName: ThemeNavbarIndexNavbarClassName = (navbarHidden === true) ? 'navbar nova-navbar-hidden' : 'navbar';

  const variantProps: ThemeNavbarIndexVariantProps = {
    siteLogo,
    items,
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
  };

  const svgFilterDefinition: ThemeNavbarIndexSvgFilterDefinition = (
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
          <div className={navbarClassName}>
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
          />
        </>
      );
    }

    case 'canopy': {
      return (
        <>
          {svgFilterDefinition}
          <div className={navbarClassName}>
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
          />
        </>
      );
    }

    case 'monolith': {
      return (
        <>
          {svgFilterDefinition}
          <div className={navbarClassName}>
            <Monolith {...variantProps} />
          </div>
          <MonolithMobileMenu
            isOpen={isMenuOpen}
            onClose={() => {
              setIsMenuOpen(false);

              return undefined;
            }}
            items={resolvedItems}
          />
        </>
      );
    }

    case 'compass': {
      return (
        <>
          {svgFilterDefinition}
          <div className={navbarClassName}>
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
          />
        </>
      );
    }

    default: {
      return (
        <>
          {svgFilterDefinition}
          <div className={navbarClassName}>
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
          />
        </>
      );
    }
  }
}

export default Navbar;
