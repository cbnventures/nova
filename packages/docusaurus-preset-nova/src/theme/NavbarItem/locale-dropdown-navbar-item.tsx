import Link from '@docusaurus/Link';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react/offline';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../lib/use-details-dismiss.js';

import type {
  Theme_NavbarItem_LocaleDropdownNavbarItem_ActiveLocale,
  Theme_NavbarItem_LocaleDropdownNavbarItem_AlternatePageUtils,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Context,
  Theme_NavbarItem_LocaleDropdownNavbarItem_DetailsRef,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Href,
  Theme_NavbarItem_LocaleDropdownNavbarItem_ItemClassName,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Items,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Label,
  Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfig,
  Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfigs,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Locales,
  Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleUrl,
  Theme_NavbarItem_LocaleDropdownNavbarItem_Props,
  Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabel,
  Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabelMap,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Locale Dropdown Navbar Item - Locale Dropdown Navbar Item.
 *
 * Renders a dropdown of all configured site locales. Active locale comes from
 * `i18n.currentLocale` and each item URL is built via `useAlternatePageUtils`
 * so locale-prefixed `baseUrl` values (e.g. `/zh-Hans/`) are handled correctly.
 *
 * @param {Theme_NavbarItem_LocaleDropdownNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LocaleDropdownNavbarItem(props: Theme_NavbarItem_LocaleDropdownNavbarItem_Props) {
  const context: Theme_NavbarItem_LocaleDropdownNavbarItem_Context = useDocusaurusContext();
  const locales: Theme_NavbarItem_LocaleDropdownNavbarItem_Locales = context['i18n']['locales'];
  const localeConfigs: Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfigs = context['i18n']['localeConfigs'];
  const activeLocale: Theme_NavbarItem_LocaleDropdownNavbarItem_ActiveLocale = context['i18n']['currentLocale'];
  const alternatePageUtils: Theme_NavbarItem_LocaleDropdownNavbarItem_AlternatePageUtils = useAlternatePageUtils();
  const dropdownItemsBefore: Theme_NavbarItem_LocaleDropdownNavbarItem_Items = (props['dropdownItemsBefore'] ?? []) as Theme_NavbarItem_LocaleDropdownNavbarItem_Items;
  const dropdownItemsAfter: Theme_NavbarItem_LocaleDropdownNavbarItem_Items = (props['dropdownItemsAfter'] ?? []) as Theme_NavbarItem_LocaleDropdownNavbarItem_Items;

  const detailsRef: Theme_NavbarItem_LocaleDropdownNavbarItem_DetailsRef = useRef<HTMLDetailsElement | null>(null);

  useDetailsDismiss(detailsRef);

  // Built-in short labels for the 19 locales aligned with the Vylos app's
  // localization set. Falls back to title-cased first two characters of the
  // locale code for any unmapped locale (e.g., "pt" -> "Pt").
  const shortLabelMap: Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabelMap = {
    'ar': 'Ar',
    'ca': 'Ca',
    'de': 'De',
    'en': 'En',
    'es': 'Es',
    'fi': 'Fi',
    'fr': 'Fr',
    'hi': 'हि',
    'hr': 'Hr',
    'id': 'Id',
    'it': 'It',
    'ja': '日',
    'ko': '한',
    'pl': 'Pl',
    'ro': 'Ro',
    'ru': 'Ru',
    'tr': 'Tr',
    'zh-Hans': '简',
    'zh-Hant': '繁',
  };
  const fallbackShortLabel: Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabel = activeLocale.slice(0, 1).toUpperCase()
    + activeLocale.slice(1, 2).toLowerCase();
  const shortLabel: Theme_NavbarItem_LocaleDropdownNavbarItem_ShortLabel = shortLabelMap[activeLocale]
    ?? fallbackShortLabel;

  return (
    <details ref={detailsRef} className="nova-locale-dropdown">
      <summary className="nova-locale-dropdown-summary">
        <Icon icon="lucide:globe" width="14" height="14" aria-hidden="true" />
        {' '}
        {shortLabel}
      </summary>
      <ul className="nova-locale-dropdown-menu">
        {
          dropdownItemsBefore.map((item) => (
            <li key={item['label']} className="nova-locale-dropdown-item">
              <Link className="nova-locale-dropdown-item-link" to={item['to'] as Theme_NavbarItem_LocaleDropdownNavbarItem_Href}>
                {item['label']}
              </Link>
            </li>
          ))
        }
        {
          locales.map((locale) => {
            const localeConfig: Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleConfig = localeConfigs[locale];
            const localeLabel: Theme_NavbarItem_LocaleDropdownNavbarItem_Label = (localeConfig !== undefined) ? localeConfig['label'] : locale;
            const localeUrl: Theme_NavbarItem_LocaleDropdownNavbarItem_LocaleUrl = alternatePageUtils.createUrl({
              locale,
              fullyQualified: false,
            });
            const itemClassName: Theme_NavbarItem_LocaleDropdownNavbarItem_ItemClassName = (locale === activeLocale) ? 'nova-locale-dropdown-item nova-locale-dropdown-item--active' : 'nova-locale-dropdown-item';

            return (
              <li key={locale} className={itemClassName}>
                <Link
                  className="nova-locale-dropdown-item-link"
                  to={`pathname://${localeUrl}`}
                  target="_self"
                  autoAddBaseUrl={false}
                >
                  {localeLabel}
                </Link>
              </li>
            );
          })
        }
        {
          dropdownItemsAfter.map((item) => (
            <li key={item['label']} className="nova-locale-dropdown-item">
              <Link className="nova-locale-dropdown-item-link" to={item['to'] as Theme_NavbarItem_LocaleDropdownNavbarItem_Href}>
                {item['label']}
              </Link>
            </li>
          ))
        }
      </ul>
    </details>
  );
}

export default LocaleDropdownNavbarItem;
