import type { Metadata } from 'next';
import type {
  ReactElement,
  ReactNode,
} from 'react';

/**
 * Layout.
 *
 * @since 0.0.0
 */
export type App_Lang_Layout_GenerateMetadata_Props_Params_Lang = string;

export type App_Lang_Layout_GenerateMetadata_Props_Params = {
  lang: App_Lang_Layout_GenerateMetadata_Props_Params_Lang;
};

export type App_Lang_Layout_GenerateMetadata_Props = {
  params: Promise<App_Lang_Layout_GenerateMetadata_Props_Params>;
};

export type App_Lang_Layout_GenerateMetadata_Returns = Promise<Metadata>;

export type App_Lang_Layout_GenerateMetadata_Params = App_Lang_Layout_GenerateMetadata_Props_Params;

export type App_Lang_Layout_GenerateMetadata_Dictionary = Record<string, string>;

/**
 * Layout.
 *
 * @since 0.0.0
 */
export type App_Lang_Layout_GenerateStaticParams_Returns = App_Lang_Layout_GenerateStaticParams_StaticParams;

export type App_Lang_Layout_GenerateStaticParams_StaticParam_Lang = 'en';

export type App_Lang_Layout_GenerateStaticParams_StaticParam = {
  lang: App_Lang_Layout_GenerateStaticParams_StaticParam_Lang;
};

export type App_Lang_Layout_GenerateStaticParams_StaticParams = App_Lang_Layout_GenerateStaticParams_StaticParam[];

/**
 * Layout.
 *
 * @since 0.0.0
 */
export type App_Lang_Layout_RootLayout_Props_Children = ReactNode;

export type App_Lang_Layout_RootLayout_Props_Params_Lang = string;

export type App_Lang_Layout_RootLayout_Props_Params = {
  lang: App_Lang_Layout_RootLayout_Props_Params_Lang;
};

export type App_Lang_Layout_RootLayout_Props = {
  children: App_Lang_Layout_RootLayout_Props_Children;
  params: Promise<App_Lang_Layout_RootLayout_Props_Params>;
};

export type App_Lang_Layout_RootLayout_Returns = Promise<ReactElement>;

export type App_Lang_Layout_RootLayout_Params = App_Lang_Layout_RootLayout_Props_Params;
