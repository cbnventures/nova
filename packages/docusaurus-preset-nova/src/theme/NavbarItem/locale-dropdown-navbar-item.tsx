import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {
  ThemeNavbarItemLocaleDropdownNavbarItemAlternatePageUtils,
  ThemeNavbarItemLocaleDropdownNavbarItemContext,
  ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocale,
  ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocaleConfig,
  ThemeNavbarItemLocaleDropdownNavbarItemHref,
  ThemeNavbarItemLocaleDropdownNavbarItemItems,
  ThemeNavbarItemLocaleDropdownNavbarItemLabel,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfig,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfigs,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleItems,
  ThemeNavbarItemLocaleDropdownNavbarItemLocales,
  ThemeNavbarItemLocaleDropdownNavbarItemLocaleUrl,
  ThemeNavbarItemLocaleDropdownNavbarItemProps,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - Locale Dropdown Navbar Item - Locale Dropdown Navbar Item.
 *
 * Renders a dropdown menu listing all available site locales
 * resolved through the Docusaurus alternate page utilities hook,
 * displaying the current locale as the toggle.
 *
 * @param {ThemeNavbarItemLocaleDropdownNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LocaleDropdownNavbarItem(props: ThemeNavbarItemLocaleDropdownNavbarItemProps) {
  const alternatePageUtils: ThemeNavbarItemLocaleDropdownNavbarItemAlternatePageUtils = useAlternatePageUtils();
  const context: ThemeNavbarItemLocaleDropdownNavbarItemContext = useDocusaurusContext();
  const currentLocale: ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocale = context['i18n']['currentLocale'];
  const locales: ThemeNavbarItemLocaleDropdownNavbarItemLocales = context['i18n']['locales'];
  const localeConfigs: ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfigs = context['i18n']['localeConfigs'];
  const dropdownItemsBefore: ThemeNavbarItemLocaleDropdownNavbarItemItems = (props['dropdownItemsBefore'] ?? []) as ThemeNavbarItemLocaleDropdownNavbarItemItems;
  const dropdownItemsAfter: ThemeNavbarItemLocaleDropdownNavbarItemItems = (props['dropdownItemsAfter'] ?? []) as ThemeNavbarItemLocaleDropdownNavbarItemItems;
  const localeItems: ThemeNavbarItemLocaleDropdownNavbarItemLocaleItems = locales.map((locale) => {
    const localeConfig: ThemeNavbarItemLocaleDropdownNavbarItemLocaleConfig = localeConfigs[locale];
    const localeLabel: ThemeNavbarItemLocaleDropdownNavbarItemLabel = (localeConfig !== undefined) ? localeConfig['label'] : locale;
    const localeUrl: ThemeNavbarItemLocaleDropdownNavbarItemLocaleUrl = alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    });

    return {
      label: localeLabel,
      to: `pathname://${localeUrl}`,
    };
  });
  const items: ThemeNavbarItemLocaleDropdownNavbarItemItems = [
    ...dropdownItemsBefore,
    ...localeItems,
    ...dropdownItemsAfter,
  ];
  const currentLocaleConfig: ThemeNavbarItemLocaleDropdownNavbarItemCurrentLocaleConfig = localeConfigs[currentLocale];
  const label: ThemeNavbarItemLocaleDropdownNavbarItemLabel = (currentLocaleConfig !== undefined) ? currentLocaleConfig['label'] : currentLocale;

  return (
    <details>
      <summary>
        {label}
      </summary>
      <ul>
        {
          items.map((item) => (
            <li key={item['label']}>
              <a href={item['to'] as ThemeNavbarItemLocaleDropdownNavbarItemHref}>
                {item['label']}
              </a>
            </li>
          ))
        }
      </ul>
    </details>
  );
}

export default LocaleDropdownNavbarItem;
