import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  Theme_NotFound_Content_Index_NotFoundContent_ActiveBundle,
  Theme_NotFound_Content_Index_NotFoundContent_BackHomeHref,
  Theme_NotFound_Content_Index_NotFoundContent_BackHomeHrefOverride,
  Theme_NotFound_Content_Index_NotFoundContent_BackHomeLabel,
  Theme_NotFound_Content_Index_NotFoundContent_BackHomeLabelOverride,
  Theme_NotFound_Content_Index_NotFoundContent_BaseUrl,
  Theme_NotFound_Content_Index_NotFoundContent_BundleIndex,
  Theme_NotFound_Content_Index_NotFoundContent_Bundles,
  Theme_NotFound_Content_Index_NotFoundContent_Description,
  Theme_NotFound_Content_Index_NotFoundContent_DescriptionOverride,
  Theme_NotFound_Content_Index_NotFoundContent_DocusaurusContext,
  Theme_NotFound_Content_Index_NotFoundContent_ErrorPages,
  Theme_NotFound_Content_Index_NotFoundContent_GlobalData,
  Theme_NotFound_Content_Index_NotFoundContent_NotFoundOverrides,
  Theme_NotFound_Content_Index_NotFoundContent_ThemeConfig,
  Theme_NotFound_Content_Index_NotFoundContent_Title,
  Theme_NotFound_Content_Index_NotFoundContent_TitleOverride,
  Theme_NotFound_Content_Index_Props,
} from '../../../types/theme/NotFound/Content/index.d.ts';

/**
 * Theme - Not Found - Content - Not Found Content.
 *
 * Renders a 404 page body with a Nova-flavored title + description + CTA label
 * picked as a thematic bundle at build time and read from plugin global data
 * at render time, so SSR HTML and client hydration match (no flash).
 *
 * @param {Theme_NotFound_Content_Index_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NotFoundContent(props: Theme_NotFound_Content_Index_Props) {
  const docusaurusContext: Theme_NotFound_Content_Index_NotFoundContent_DocusaurusContext = useDocusaurusContext();
  const baseUrl: Theme_NotFound_Content_Index_NotFoundContent_BaseUrl = docusaurusContext['siteConfig']['baseUrl'];
  const themeConfig: Theme_NotFound_Content_Index_NotFoundContent_ThemeConfig = docusaurusContext['siteConfig']['themeConfig'] as Theme_NotFound_Content_Index_NotFoundContent_ThemeConfig;
  const errorPages: Theme_NotFound_Content_Index_NotFoundContent_ErrorPages = themeConfig['errorPages'] as Theme_NotFound_Content_Index_NotFoundContent_ErrorPages;
  const notFoundOverrides: Theme_NotFound_Content_Index_NotFoundContent_NotFoundOverrides = (errorPages !== undefined && errorPages !== null) ? errorPages['notFound'] as Theme_NotFound_Content_Index_NotFoundContent_NotFoundOverrides : undefined;

  const titleOverride: Theme_NotFound_Content_Index_NotFoundContent_TitleOverride = (notFoundOverrides !== undefined && notFoundOverrides !== null) ? notFoundOverrides['title'] as Theme_NotFound_Content_Index_NotFoundContent_TitleOverride : undefined;
  const descriptionOverride: Theme_NotFound_Content_Index_NotFoundContent_DescriptionOverride = (notFoundOverrides !== undefined && notFoundOverrides !== null) ? notFoundOverrides['description'] as Theme_NotFound_Content_Index_NotFoundContent_DescriptionOverride : undefined;
  const backHomeLabelOverride: Theme_NotFound_Content_Index_NotFoundContent_BackHomeLabelOverride = (notFoundOverrides !== undefined && notFoundOverrides !== null) ? notFoundOverrides['backHomeLabel'] as Theme_NotFound_Content_Index_NotFoundContent_BackHomeLabelOverride : undefined;
  const backHomeHrefOverride: Theme_NotFound_Content_Index_NotFoundContent_BackHomeHrefOverride = (notFoundOverrides !== undefined && notFoundOverrides !== null) ? notFoundOverrides['backHomeHref'] as Theme_NotFound_Content_Index_NotFoundContent_BackHomeHrefOverride : undefined;

  const bundles: Theme_NotFound_Content_Index_NotFoundContent_Bundles = [
    {
      title: translate({
        id: 'theme.NotFound.bundles.0.title',
        message: 'This page took a wrong turn.',
        description: 'Random 404 bundle 1 of 5 — title (wrong-turn voice)',
      }),
      description: translate({
        id: 'theme.NotFound.bundles.0.description',
        message: 'Let us get you back on the right path.',
        description: 'Random 404 bundle 1 of 5 — description (wrong-turn voice)',
      }),
      backHomeLabel: translate({
        id: 'theme.NotFound.bundles.0.backHomeLabel',
        message: 'Back on track',
        description: 'Random 404 bundle 1 of 5 — CTA label (wrong-turn voice)',
      }),
    },
    {
      title: translate({
        id: 'theme.NotFound.bundles.1.title',
        message: 'This URL is not on our map.',
        description: 'Random 404 bundle 2 of 5 — title (cartographic voice)',
      }),
      description: translate({
        id: 'theme.NotFound.bundles.1.description',
        message: 'It might have moved, or perhaps it never existed at all.',
        description: 'Random 404 bundle 2 of 5 — description (cartographic voice)',
      }),
      backHomeLabel: translate({
        id: 'theme.NotFound.bundles.1.backHomeLabel',
        message: 'Back to charted ground',
        description: 'Random 404 bundle 2 of 5 — CTA label (cartographic voice)',
      }),
    },
    {
      title: translate({
        id: 'theme.NotFound.bundles.2.title',
        message: 'Looks like we lost the trail.',
        description: 'Random 404 bundle 3 of 5 — title (lost-traveler voice)',
      }),
      description: translate({
        id: 'theme.NotFound.bundles.2.description',
        message: 'Try heading back to camp or use the search to find your way.',
        description: 'Random 404 bundle 3 of 5 — description (lost-traveler voice)',
      }),
      backHomeLabel: translate({
        id: 'theme.NotFound.bundles.2.backHomeLabel',
        message: 'Back to camp',
        description: 'Random 404 bundle 3 of 5 — CTA label (lost-traveler voice)',
      }),
    },
    {
      title: translate({
        id: 'theme.NotFound.bundles.3.title',
        message: 'Nothing lives at this address.',
        description: 'Random 404 bundle 4 of 5 — title (vacant-address voice)',
      }),
      description: translate({
        id: 'theme.NotFound.bundles.3.description',
        message: 'If something brought you here, the link is probably out of date.',
        description: 'Random 404 bundle 4 of 5 — description (vacant-address voice)',
      }),
      backHomeLabel: translate({
        id: 'theme.NotFound.bundles.3.backHomeLabel',
        message: 'Back to the lobby',
        description: 'Random 404 bundle 4 of 5 — CTA label (vacant-address voice)',
      }),
    },
    {
      title: translate({
        id: 'theme.NotFound.bundles.4.title',
        message: 'We could not find what you were looking for.',
        description: 'Random 404 bundle 5 of 5 — title (apologetic voice)',
      }),
      description: translate({
        id: 'theme.NotFound.bundles.4.description',
        message: 'Double-check the URL for typos, or head back to start fresh.',
        description: 'Random 404 bundle 5 of 5 — description (apologetic voice)',
      }),
      backHomeLabel: translate({
        id: 'theme.NotFound.bundles.4.backHomeLabel',
        message: 'Back to home',
        description: 'Random 404 bundle 5 of 5 — CTA label (apologetic voice)',
      }),
    },
  ];

  const globalData: Theme_NotFound_Content_Index_NotFoundContent_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_NotFound_Content_Index_NotFoundContent_GlobalData;
  const bundleIndex: Theme_NotFound_Content_Index_NotFoundContent_BundleIndex = (typeof globalData['notFoundBundleIndex'] === 'number') ? globalData['notFoundBundleIndex'] : 0;
  const activeBundle: Theme_NotFound_Content_Index_NotFoundContent_ActiveBundle = bundles[bundleIndex] ?? bundles[0] as Theme_NotFound_Content_Index_NotFoundContent_ActiveBundle;

  const title: Theme_NotFound_Content_Index_NotFoundContent_Title = (titleOverride !== undefined && titleOverride !== '') ? titleOverride : activeBundle['title'];
  const description: Theme_NotFound_Content_Index_NotFoundContent_Description = (descriptionOverride !== undefined && descriptionOverride !== '') ? descriptionOverride : activeBundle['description'];
  const backHomeLabel: Theme_NotFound_Content_Index_NotFoundContent_BackHomeLabel = (backHomeLabelOverride !== undefined && backHomeLabelOverride !== '') ? backHomeLabelOverride : activeBundle['backHomeLabel'];
  const backHomeHref: Theme_NotFound_Content_Index_NotFoundContent_BackHomeHref = (backHomeHrefOverride !== undefined && backHomeHrefOverride !== '') ? backHomeHrefOverride : baseUrl;

  return (
    <main
      className={(props['className'] !== undefined) ? `nova-error-surface nova-not-found nova-container ${props['className']}` : 'nova-error-surface nova-not-found nova-container'}
      style={props['style']}
    >
      <Heading as="h1">
        {title}
      </Heading>
      <p>{description}</p>
      <div className="nova-not-found-actions">
        <Link to={backHomeHref} className="nova-not-found-back-home">
          {backHomeLabel}
        </Link>
      </div>
    </main>
  );
}

export default NotFoundContent;
