import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';

import Commons from './Commons/index.js';
import Embassy from './Embassy/index.js';
import Launchpad from './Launchpad/index.js';
import Ledger from './Ledger/index.js';

import type {
  ThemeFooterFooter,
  ThemeFooterIndexFooterVariant,
  ThemeFooterIndexGlobalData,
  ThemeFooterIndexLocalizedCopyright,
  ThemeFooterIndexPresetCta,
  ThemeFooterIndexRawCopyright,
  ThemeFooterIndexVariantProps,
  ThemeFooterIndexVariantPropsClassName,
  ThemeFooterProps,
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
 * @param {ThemeFooterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Footer(props: ThemeFooterProps) {
  const themeConfig: ThemeFooterThemeConfig = useThemeConfig() as ThemeFooterThemeConfigCast as ThemeFooterThemeConfig;
  const footerConfig: ThemeFooterFooter = themeConfig['footer'] as ThemeFooterFooter;

  // Render nothing when footer config is disabled or missing.
  if (footerConfig === false || footerConfig === undefined) {
    return undefined;
  }

  // Read footer variant from build-time global data (no hydration mismatch).
  const globalData: ThemeFooterIndexGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeFooterIndexGlobalData;
  const footerVariant: ThemeFooterIndexFooterVariant = (globalData['footerVariant'] ?? 'commons') as ThemeFooterIndexFooterVariant;
  const presetCta: ThemeFooterIndexPresetCta = (globalData['presetCta'] ?? { contained: false }) as ThemeFooterIndexPresetCta;

  const rootClassName: ThemeFooterIndexVariantPropsClassName = (props['className'] !== undefined) ? `nova-footer ${props['className']}` : 'nova-footer';

  // Pass the raw copyright through `translate()` so per-locale overrides in
  // `i18n/<locale>/code.json` (key `theme.footer.copyright`) can localize it.
  // The `message` is a static `'{copyright}'` template (not the dynamic raw
  // value) so `docusaurus write-translations` can statically extract this id
  // into `code.json`. When no translation exists the template interpolates the
  // consumer's `themeConfig.footer.copyright` value verbatim; when a locale
  // override exists it is returned as-is (overrides typically inline their own
  // year/company text without using the `{copyright}` placeholder).
  const rawCopyright: ThemeFooterIndexRawCopyright = footerConfig['copyright'];
  const localizedCopyright: ThemeFooterIndexLocalizedCopyright = (typeof rawCopyright === 'string') ? translate(
    {
      id: 'theme.footer.copyright',
      message: '{copyright}',
      description: 'Footer copyright text. The {copyright} placeholder receives the consumer\'s themeConfig.footer.copyright value as the source-locale fallback; per-locale overrides in i18n code.json usually inline their own text.',
    },
    { copyright: rawCopyright },
  ) : rawCopyright;

  const variantProps: ThemeFooterIndexVariantProps = {
    sections: footerConfig['sections'],
    layout: footerConfig['layout'],
    socialLinks: footerConfig['socialLinks'],
    copyright: localizedCopyright,
    credit: footerConfig['credit'] ?? true,
    cta: footerConfig['cta'],
    ctaContained: presetCta['contained'],
    className: rootClassName,
    style: props['style'],
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
