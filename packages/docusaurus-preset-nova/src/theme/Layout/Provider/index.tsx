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
  Theme_Layout_Provider_Index_LayoutProvider_Provider,
  Theme_Layout_Provider_Index_Props,
} from '../../../types/theme/Layout/Provider/index.d.ts';

// Composed provider stack, computed once at module scope so its identity is
// stable across renders. Composing inside the render body yields a new
// component reference per render, which makes React unmount and remount
// everything below it - stealing focus from any active input.
const Provider: Theme_Layout_Provider_Index_LayoutProvider_Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
]);

/**
 * Theme - Layout - Provider.
 *
 * Composes the Docusaurus context providers that
 * theme components depend on for color mode, scroll tracking,
 * navbar state, announcement bar, and version preferences.
 *
 * @param {Theme_Layout_Provider_Index_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LayoutProvider(props: Theme_Layout_Provider_Index_Props) {
  return <Provider>{props['children']}</Provider>;
}

export default LayoutProvider;
