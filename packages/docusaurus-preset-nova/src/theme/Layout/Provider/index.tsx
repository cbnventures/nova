import { DocsPreferredVersionContextProvider } from '@docusaurus/plugin-content-docs/client';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';

import type {
  ThemeLayoutProviderLayoutProviderProvider,
  ThemeLayoutProviderProps,
} from '../../../types/theme/Layout/Provider/index.d.ts';

/**
 * Theme - Layout - Provider.
 *
 * Composes the Docusaurus context providers that
 * theme components depend on for color mode, scroll tracking,
 * navbar state, announcement bar, and version preferences.
 *
 * @param {ThemeLayoutProviderProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LayoutProvider(props: ThemeLayoutProviderProps) {
  const Provider: ThemeLayoutProviderLayoutProviderProvider = composeProviders([
    ColorModeProvider,
    AnnouncementBarProvider,
    ScrollControllerProvider,
    DocsPreferredVersionContextProvider,
    PluginHtmlClassNameProvider,
    NavbarProvider,
  ]);

  return <Provider>{props['children']}</Provider>;
}

export default LayoutProvider;
