import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  ThemeErrorPageContentErrorPageContentDocusaurusContext,
  ThemeErrorPageContentErrorPageContentErrorPages,
  ThemeErrorPageContentErrorPageContentGlobalData,
  ThemeErrorPageContentErrorPageContentMessage,
  ThemeErrorPageContentErrorPageContentOverrides,
  ThemeErrorPageContentErrorPageContentProps,
  ThemeErrorPageContentErrorPageContentRetryLabelOverride,
  ThemeErrorPageContentErrorPageContentThemeConfig,
  ThemeErrorPageContentErrorPageContentTitle,
  ThemeErrorPageContentErrorPageContentTitleIndex,
  ThemeErrorPageContentErrorPageContentTitleOverride,
  ThemeErrorPageContentErrorPageContentTitlePool,
  ThemeErrorPageContentErrorPageContentTryAgain,
} from '../../types/theme/ErrorPageContent/index.d.ts';

/**
 * Theme - Error Page Content - Error Page Content.
 *
 * Renders a per-page crash fallback with a Nova-flavored heading picked at
 * build time and read from plugin global data at render time, plus a retry
 * button and the underlying error message.
 *
 * @param {ThemeErrorPageContentErrorPageContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ErrorPageContent(props: ThemeErrorPageContentErrorPageContentProps) {
  const docusaurusContext: ThemeErrorPageContentErrorPageContentDocusaurusContext = useDocusaurusContext();
  const themeConfig: ThemeErrorPageContentErrorPageContentThemeConfig = docusaurusContext['siteConfig']['themeConfig'] as ThemeErrorPageContentErrorPageContentThemeConfig;
  const errorPages: ThemeErrorPageContentErrorPageContentErrorPages = themeConfig['errorPages'] as ThemeErrorPageContentErrorPageContentErrorPages;
  const overrides: ThemeErrorPageContentErrorPageContentOverrides = (errorPages !== undefined && errorPages !== null) ? errorPages['errorPageContent'] as ThemeErrorPageContentErrorPageContentOverrides : undefined;

  const titleOverride: ThemeErrorPageContentErrorPageContentTitleOverride = (overrides !== undefined && overrides !== null) ? overrides['title'] as ThemeErrorPageContentErrorPageContentTitleOverride : undefined;
  const retryLabelOverride: ThemeErrorPageContentErrorPageContentRetryLabelOverride = (overrides !== undefined && overrides !== null) ? overrides['retryLabel'] as ThemeErrorPageContentErrorPageContentRetryLabelOverride : undefined;

  const message: ThemeErrorPageContentErrorPageContentMessage = props['error']['message'];

  const titlePool: ThemeErrorPageContentErrorPageContentTitlePool = [
    translate({
      id: 'theme.ErrorPageContent.titlePool.0',
      message: 'Something went sideways.',
      description: 'Random per-page crash title 1 of 5',
    }),
    translate({
      id: 'theme.ErrorPageContent.titlePool.1',
      message: 'This page did not load cleanly.',
      description: 'Random per-page crash title 2 of 5',
    }),
    translate({
      id: 'theme.ErrorPageContent.titlePool.2',
      message: 'We hit a snag rendering this page.',
      description: 'Random per-page crash title 3 of 5',
    }),
    translate({
      id: 'theme.ErrorPageContent.titlePool.3',
      message: 'The page errored on its way in.',
      description: 'Random per-page crash title 4 of 5',
    }),
    translate({
      id: 'theme.ErrorPageContent.titlePool.4',
      message: 'Something tripped up the page.',
      description: 'Random per-page crash title 5 of 5',
    }),
  ];

  const globalData: ThemeErrorPageContentErrorPageContentGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeErrorPageContentErrorPageContentGlobalData;
  const titleIndex: ThemeErrorPageContentErrorPageContentTitleIndex = (typeof globalData['errorPageContentTitleIndex'] === 'number') ? globalData['errorPageContentTitleIndex'] : 0;

  const title: ThemeErrorPageContentErrorPageContentTitle = (titleOverride !== undefined && titleOverride !== '') ? titleOverride : (titlePool[titleIndex] ?? '');
  const tryAgainLabel: ThemeErrorPageContentErrorPageContentTryAgain = (retryLabelOverride !== undefined && retryLabelOverride !== '') ? retryLabelOverride : translate({
    id: 'theme.ErrorPageContent.tryAgain',
    message: 'Try again',
    description: 'The label for the button that retries after a page crash',
  });

  return (
    <main
      className={(props['className'] !== undefined) ? `nova-error-surface nova-error-page-content nova-container ${props['className']}` : 'nova-error-surface nova-error-page-content nova-container'}
      style={props['style']}
    >
      <Heading as="h1">{title}</Heading>
      <div className="nova-error-page-content-actions">
        <button
          type="button"
          className="nova-error-page-content-retry"
          onClick={props['tryAgain']}
        >
          {tryAgainLabel}
        </button>
      </div>
      <hr />
      <div className="nova-error-page-content-message">
        <p dir="auto">{message}</p>
      </div>
    </main>
  );
}

export default ErrorPageContent;
