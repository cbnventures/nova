import { useThemeConfig } from '@docusaurus/theme-common';
import { usePluginData } from '@docusaurus/useGlobalData';

import Commons from './Commons/index.js';
import Embassy from './Embassy/index.js';
import Launchpad from './Launchpad/index.js';
import Ledger from './Ledger/index.js';

import type {
  ThemeFooterFooter,
  ThemeFooterIndexFooterVariant,
  ThemeFooterIndexGlobalData,
  ThemeFooterIndexVariantProps,
  ThemeFooterThemeConfig,
  ThemeFooterThemeConfigCast,
} from '../../types/theme/Footer/index.d.ts';

/**
 * Theme - Footer.
 *
 * Orchestrator component that reads the active footer variant from
 * build-time global data, assembles shared props, and dispatches
 * rendering to the matching variant sub-component.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Footer() {
  const themeConfig: ThemeFooterThemeConfig = useThemeConfig() as ThemeFooterThemeConfigCast as ThemeFooterThemeConfig;
  const footerConfig: ThemeFooterFooter = themeConfig['footer'] as ThemeFooterFooter;

  // Render nothing when footer config is disabled or missing.
  if (footerConfig === false || footerConfig === undefined) {
    return undefined;
  }

  // Read footer variant from build-time global data (no hydration mismatch).
  const globalData: ThemeFooterIndexGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeFooterIndexGlobalData;
  const footerVariant: ThemeFooterIndexFooterVariant = (globalData['footerVariant'] ?? 'commons') as ThemeFooterIndexFooterVariant;

  const variantProps: ThemeFooterIndexVariantProps = {
    sections: footerConfig['sections'],
    layout: footerConfig['layout'],
    socialLinks: footerConfig['socialLinks'],
    copyright: footerConfig['copyright'],
    credit: footerConfig['credit'] ?? true,
    cta: footerConfig['cta'],
  };

  switch (footerVariant) {
    case 'commons': {
      return <Commons {...variantProps} />;
    }

    case 'embassy': {
      return <Embassy {...variantProps} />;
    }

    case 'ledger': {
      return <Ledger {...variantProps} />;
    }

    case 'launchpad': {
      return <Launchpad {...variantProps} />;
    }

    default: {
      return <Commons {...variantProps} />;
    }
  }
}

export default Footer;
