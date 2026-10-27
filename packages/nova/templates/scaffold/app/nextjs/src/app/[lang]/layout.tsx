import { notFound } from 'next/navigation';

import {
  hasLocale,
  locales,
} from '../../i18n/config';
import '../../styles/nova-launchpad.css';
import '../globals.css';
import { getDictionary } from './dictionaries';

import type {
  App_Lang_Layout_GenerateMetadata_Dictionary,
  App_Lang_Layout_GenerateMetadata_Params,
  App_Lang_Layout_GenerateMetadata_Props,
  App_Lang_Layout_GenerateMetadata_Returns,
  App_Lang_Layout_GenerateStaticParams_Returns,
  App_Lang_Layout_RootLayout_Params,
  App_Lang_Layout_RootLayout_Props,
  App_Lang_Layout_RootLayout_Returns,
} from '../../types/app/[lang]/layout.d.ts';

/**
 * Layout - Generate Metadata.
 *
 * Uses the active locale dictionary for page title and description metadata.
 * Keeps translated document metadata aligned with the rendered locale route.
 *
 * @param {App_Lang_Layout_GenerateMetadata_Props} props - Props.
 *
 * @returns {App_Lang_Layout_GenerateMetadata_Returns}
 *
 * @since 0.0.0
 */
export async function generateMetadata(props: App_Lang_Layout_GenerateMetadata_Props): App_Lang_Layout_GenerateMetadata_Returns {
  const params: App_Lang_Layout_GenerateMetadata_Params = await props['params'];

  if (hasLocale(params['lang']) === false) {
    notFound();
  }

  const dictionary: App_Lang_Layout_GenerateMetadata_Dictionary = await getDictionary(params['lang']);

  return {
    title: dictionary['metadataTitle'],
    description: dictionary['metadataDescription'],
    icons: {
      icon: '/favicon.svg',
    },
  };
}

/**
 * Layout - Generate Static Params.
 *
 * Prepares one statically renderable route for every configured locale.
 * English remains the only generated route until consumers add more locales.
 *
 * @returns {App_Lang_Layout_GenerateStaticParams_Returns}
 *
 * @since 0.0.0
 */
export function generateStaticParams(): App_Lang_Layout_GenerateStaticParams_Returns {
  return locales.map((lang) => ({ lang }));
}

/**
 * Layout - Root Layout.
 *
 * Wraps every localized application route in the shared HTML document.
 * Unsupported locale segments resolve through Next.js's not-found boundary.
 *
 * @param {App_Lang_Layout_RootLayout_Props} props - Props.
 *
 * @returns {App_Lang_Layout_RootLayout_Returns}
 *
 * @since 0.0.0
 */
async function RootLayout(props: App_Lang_Layout_RootLayout_Props): App_Lang_Layout_RootLayout_Returns {
  const params: App_Lang_Layout_RootLayout_Params = await props['params'];

  if (hasLocale(params['lang']) === false) {
    notFound();
  }

  return (
    <html lang={params['lang']}>
      <body>{props['children']}</body>
    </html>
  );
}

export default RootLayout;
