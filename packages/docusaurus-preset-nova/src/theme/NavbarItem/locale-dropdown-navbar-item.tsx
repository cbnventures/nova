import Link from '@docusaurus/Link';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react/offline';
import { useRef } from 'react';

import { useDetailsDismiss } from '../../lib/use-details-dismiss.js';

import type {
  ThemeNavbarItemLocaleDropdownNavbarItemActiveLocale,
  ThemeNavbarItemLocaleDropdownNavbarItemAlternatePageUtils,
  ThemeNavbarItemLocaleDropdownNavbarItemContext,
  ThemeNavbarItemLocaleDropdownNavbarItemDetailsRef,
  ThemeNavbarItemLocaleDropdownNavbarItemHref,
  ThemeNavbarItemLocaleDropdownNavbarItemItemClassName,
  ThemeNavbarItemLocaleDropdownNavbarItemItems,
  ThemeNavbarItemLocaleDropdownNavbarItemLabel,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfig,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfigs,
  ThemeNavbarItemLocaleDropdownNavbarItemLocales,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleUrl,
  ThemeNavbarItemLocaleDropdownNavbarItemProps,
  ThemeNavbarItemLocaleDropdownNavbarItemShortLabel,
  ThemeNavbarItemLocaleDropdownNavbarItemShortLabelMap,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Locale Dropdown Navbar Item - Locale Dropdown Navbar Item.
 *
 * Renders a dropdown of all configured site locales. Active locale comes from
 * `i18n.currentLocale` and each item URL is built via `useAlternatePageUtils`
 * so locale-prefixed `baseUrl` values (e.g. `/zh-Hans/`) are handled correctly.
 *
 * @param {ThemeNavbarItemLocaleDropdownNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LocaleDropdownNavbarItem(props: ThemeNavbarItemLocaleDropdownNavbarItemProps) {
  const context: ThemeNavbarItemLocaleDropdownNavbarItemContext = useDocusaurusContext();
  const locales: ThemeNavbarItemLocaleDropdownNavbarItemLocales = context['i18n']['locales'];
  const localeConfigs: ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfigs = context['i18n']['localeConfigs'];
  const activeLocale: ThemeNavbarItemLocaleDropdownNavbarItemActiveLocale = context['i18n']['currentLocale'];
  const alternatePageUtils: ThemeNavbarItemLocaleDropdownNavbarItemAlternatePageUtils = useAlternatePageUtils();
  const dropdownItemsBefore: ThemeNavbarItemLocaleDropdownNavbarItemItems = (props['dropdownItemsBefore'] ?? []) as ThemeNavbarItemLocaleDropdownNavbarItemItems;
  const dropdownItemsAfter: ThemeNavbarItemLocaleDropdownNavbarItemItems = (props['dropdownItemsAfter'] ?? []) as ThemeNavbarItemLocaleDropdownNavbarItemItems;

  const detailsRef: ThemeNavbarItemLocaleDropdownNavbarItemDetailsRef = useRef<HTMLDetailsElement | null>(null);

  useDetailsDismiss(detailsRef);

  // Built-in short labels for the 19 locales aligned with the Vylos app's
  // localization set. Falls back to title-cased first two characters of the
  // locale code for any unmapped locale (e.g., "pt" -> "Pt").
  const shortLabelMap: ThemeNavbarItemLocaleDropdownNavbarItemShortLabelMap = {
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
  const fallbackShortLabel: ThemeNavbarItemLocaleDropdownNavbarItemShortLabel = activeLocale.slice(0, 1).toUpperCase()
    + activeLocale.slice(1, 2).toLowerCase();
  const shortLabel: ThemeNavbarItemLocaleDropdownNavbarItemShortLabel = shortLabelMap[activeLocale]
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
              <Link className="nova-locale-dropdown-item-link" to={item['to'] as ThemeNavbarItemLocaleDropdownNavbarItemHref}>
                {item['label']}
              </Link>
            </li>
          ))
        }
        {
          locales.map((locale) => {
            const localeConfig: ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfig = localeConfigs[locale];
            const localeLabel: ThemeNavbarItemLocaleDropdownNavbarItemLabel = (localeConfig !== undefined) ? localeConfig['label'] : locale;
            const localeUrl: ThemeNavbarItemLocaleDropdownNavbarItemLocaleUrl = alternatePageUtils.createUrl({
              locale,
              fullyQualified: false,
            });
            const itemClassName: ThemeNavbarItemLocaleDropdownNavbarItemItemClassName = (locale === activeLocale) ? 'nova-locale-dropdown-item nova-locale-dropdown-item--active' : 'nova-locale-dropdown-item';

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
              <Link className="nova-locale-dropdown-item-link" to={item['to'] as ThemeNavbarItemLocaleDropdownNavbarItemHref}>
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
