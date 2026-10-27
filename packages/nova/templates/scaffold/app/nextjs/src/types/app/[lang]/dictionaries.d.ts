/**
 * Dictionaries.
 *
 * @since 0.0.0
 */
export type App_Lang_Dictionaries_Dictionaries_Dictionary = Record<string, string>;

export type App_Lang_Dictionaries_Dictionaries_Loader_Returns = Promise<App_Lang_Dictionaries_Dictionaries_Dictionary>;

export type App_Lang_Dictionaries_Dictionaries_Loader = () => App_Lang_Dictionaries_Dictionaries_Loader_Returns;

export type App_Lang_Dictionaries_Dictionaries = Record<'en', App_Lang_Dictionaries_Dictionaries_Loader>;

/**
 * Dictionaries.
 *
 * @since 0.0.0
 */
export type App_Lang_Dictionaries_GetDictionary_Locale = keyof App_Lang_Dictionaries_Dictionaries;

export type App_Lang_Dictionaries_GetDictionary_Returns = Promise<App_Lang_Dictionaries_Dictionaries_Dictionary>;
