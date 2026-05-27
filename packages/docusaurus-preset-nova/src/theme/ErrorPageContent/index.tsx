import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';

import type {
  Theme_ErrorPageContent_Index_ErrorPageContent_DocusaurusContext,
  Theme_ErrorPageContent_Index_ErrorPageContent_ErrorPages,
  Theme_ErrorPageContent_Index_ErrorPageContent_GlobalData,
  Theme_ErrorPageContent_Index_ErrorPageContent_Message,
  Theme_ErrorPageContent_Index_ErrorPageContent_Overrides,
  Theme_ErrorPageContent_Index_ErrorPageContent_Props,
  Theme_ErrorPageContent_Index_ErrorPageContent_RetryLabelOverride,
  Theme_ErrorPageContent_Index_ErrorPageContent_ThemeConfig,
  Theme_ErrorPageContent_Index_ErrorPageContent_Title,
  Theme_ErrorPageContent_Index_ErrorPageContent_TitleIndex,
  Theme_ErrorPageContent_Index_ErrorPageContent_TitleOverride,
  Theme_ErrorPageContent_Index_ErrorPageContent_TitlePool,
  Theme_ErrorPageContent_Index_ErrorPageContent_TryAgain,
} from '../../types/theme/ErrorPageContent/index.d.ts';

/**
 * Theme - Error Page Content - Error Page Content.
 *
 * Renders a per-page crash fallback with a Nova-flavored heading picked at
 * build time and read from plugin global data at render time, plus a retry
 * button and the underlying error message.
 *
 * @param {Theme_ErrorPageContent_Index_ErrorPageContent_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ErrorPageContent(props: Theme_ErrorPageContent_Index_ErrorPageContent_Props) {
  const docusaurusContext: Theme_ErrorPageContent_Index_ErrorPageContent_DocusaurusContext = useDocusaurusContext();
  const themeConfig: Theme_ErrorPageContent_Index_ErrorPageContent_ThemeConfig = docusaurusContext['siteConfig']['themeConfig'] as Theme_ErrorPageContent_Index_ErrorPageContent_ThemeConfig;
  const errorPages: Theme_ErrorPageContent_Index_ErrorPageContent_ErrorPages = themeConfig['errorPages'] as Theme_ErrorPageContent_Index_ErrorPageContent_ErrorPages;
  const overrides: Theme_ErrorPageContent_Index_ErrorPageContent_Overrides = (errorPages !== undefined && errorPages !== null) ? errorPages['errorPageContent'] as Theme_ErrorPageContent_Index_ErrorPageContent_Overrides : undefined;

  const titleOverride: Theme_ErrorPageContent_Index_ErrorPageContent_TitleOverride = (overrides !== undefined && overrides !== null) ? overrides['title'] as Theme_ErrorPageContent_Index_ErrorPageContent_TitleOverride : undefined;
  const retryLabelOverride: Theme_ErrorPageContent_Index_ErrorPageContent_RetryLabelOverride = (overrides !== undefined && overrides !== null) ? overrides['retryLabel'] as Theme_ErrorPageContent_Index_ErrorPageContent_RetryLabelOverride : undefined;

  const message: Theme_ErrorPageContent_Index_ErrorPageContent_Message = props['error']['message'];

  const titlePool: Theme_ErrorPageContent_Index_ErrorPageContent_TitlePool = [
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

  const globalData: Theme_ErrorPageContent_Index_ErrorPageContent_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_ErrorPageContent_Index_ErrorPageContent_GlobalData;
  const titleIndex: Theme_ErrorPageContent_Index_ErrorPageContent_TitleIndex = (typeof globalData['errorPageContentTitleIndex'] === 'number') ? globalData['errorPageContentTitleIndex'] : 0;

  const title: Theme_ErrorPageContent_Index_ErrorPageContent_Title = (titleOverride !== undefined && titleOverride !== '') ? titleOverride : (titlePool[titleIndex] ?? '');
  const tryAgainLabel: Theme_ErrorPageContent_Index_ErrorPageContent_TryAgain = (retryLabelOverride !== undefined && retryLabelOverride !== '') ? retryLabelOverride : translate({
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
