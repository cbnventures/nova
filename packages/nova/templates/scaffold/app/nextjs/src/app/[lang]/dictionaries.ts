import type {
  App_Lang_Dictionaries_Dictionaries,
  App_Lang_Dictionaries_GetDictionary_Locale,
  App_Lang_Dictionaries_GetDictionary_Returns,
} from '../../types/app/[lang]/dictionaries.d.ts';

/**
 * Dictionaries - Dictionaries.
 *
 * Lazily loads only the dictionary required by the active locale route.
 * Add another loader when the application gains another locale.
 *
 * @since 0.0.0
 */
const dictionaries: App_Lang_Dictionaries_Dictionaries = {
  en: async () => (await import('./dictionaries/en.json')).default,
};

/**
 * Dictionaries - Get Dictionary.
 *
 * Loads the server-side message catalog for a supported locale.
 * Keeps dictionary loading on the server and out of the client bundle.
 *
 * @param {App_Lang_Dictionaries_GetDictionary_Locale} locale - Locale.
 *
 * @returns {App_Lang_Dictionaries_GetDictionary_Returns}
 *
 * @since 0.0.0
 */
export function getDictionary(locale: App_Lang_Dictionaries_GetDictionary_Locale): App_Lang_Dictionaries_GetDictionary_Returns {
  return dictionaries[locale]();
}
