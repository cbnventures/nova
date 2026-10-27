import type { ReactElement } from 'react';

/**
 * Page.
 *
 * @since 0.0.0
 */
export type App_Lang_Page_Home_Props_Params_Lang = string;

export type App_Lang_Page_Home_Props_Params = {
  lang: App_Lang_Page_Home_Props_Params_Lang;
};

export type App_Lang_Page_Home_Props = {
  params: Promise<App_Lang_Page_Home_Props_Params>;
};

export type App_Lang_Page_Home_Returns = Promise<ReactElement>;

export type App_Lang_Page_Home_Params = App_Lang_Page_Home_Props_Params;

export type App_Lang_Page_Home_Dictionary = Record<string, string>;
