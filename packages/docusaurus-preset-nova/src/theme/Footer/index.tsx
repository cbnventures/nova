import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { usePluginData } from '@docusaurus/useGlobalData';

import Commons from './Commons/index.js';
import Embassy from './Embassy/index.js';
import Launchpad from './Launchpad/index.js';
import Ledger from './Ledger/index.js';

import type {
  Theme_Footer_Index_Footer,
  Theme_Footer_Index_Footer_Props,
  Theme_Footer_Index_Footer_ThemeConfig,
  Theme_Footer_Index_Footer_ThemeConfigCast,
  Theme_Footer_Index_Footer_Variant,
  Theme_Footer_Index_GlobalData,
  Theme_Footer_Index_LocalizedCopyright,
  Theme_Footer_Index_PresetCta,
  Theme_Footer_Index_RawCopyright,
  Theme_Footer_Index_VariantProps,
  Theme_Footer_Index_VariantProps_ClassName,
} from '../../types/theme/Footer/index.d.ts';

/**
 * Theme - Footer.
 *
 * Orchestrator component that reads the active footer variant from
 * build-time global data, assembles shared props, and dispatches
 * rendering to the matching variant sub-component.
 *
 * @param {Theme_Footer_Index_Footer_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Footer(props: Theme_Footer_Index_Footer_Props) {
  const themeConfig: Theme_Footer_Index_Footer_ThemeConfig = useThemeConfig() as Theme_Footer_Index_Footer_ThemeConfigCast as Theme_Footer_Index_Footer_ThemeConfig;
  const footerConfig: Theme_Footer_Index_Footer = themeConfig['footer'] as Theme_Footer_Index_Footer;

  // Render nothing when footer config is disabled or missing.
  if (footerConfig === false || footerConfig === undefined) {
    return undefined;
  }

  // Read footer variant from build-time global data (no hydration mismatch).
  const globalData: Theme_Footer_Index_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_Footer_Index_GlobalData;
  const footerVariant: Theme_Footer_Index_Footer_Variant = (globalData['footerVariant'] ?? 'commons') as Theme_Footer_Index_Footer_Variant;
  const presetCta: Theme_Footer_Index_PresetCta = (globalData['presetCta'] ?? { contained: false }) as Theme_Footer_Index_PresetCta;

  const rootClassName: Theme_Footer_Index_VariantProps_ClassName = (props['className'] !== undefined) ? `nova-footer ${props['className']}` : 'nova-footer';

  // Pass the raw copyright through `translate()` so per-locale overrides in
  // `i18n/<locale>/code.json` (key `theme.footer.copyright`) can localize it.
  // The `message` is a static `'{copyright}'` template (not the dynamic raw
  // value) so `docusaurus write-translations` can statically extract this id
  // into `code.json`. When no translation exists the template interpolates the
  // consumer's `themeConfig.footer.copyright` value verbatim; when a locale
  // override exists it is returned as-is (overrides typically inline their own
  // year/company text without using the `{copyright}` placeholder).
  const rawCopyright: Theme_Footer_Index_RawCopyright = footerConfig['copyright'];
  const localizedCopyright: Theme_Footer_Index_LocalizedCopyright = (typeof rawCopyright === 'string') ? translate(
    {
      id: 'theme.footer.copyright',
      message: '{copyright}',
      description: 'Footer copyright text. The {copyright} placeholder receives the consumer\'s themeConfig.footer.copyright value as the source-locale fallback; per-locale overrides in i18n code.json usually inline their own text.',
    },
    { copyright: rawCopyright },
  ) : rawCopyright;

  const variantProps: Theme_Footer_Index_VariantProps = {
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
