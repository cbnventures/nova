import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';

import type {
  ThemeErrorPageContentErrorPageContentMessage,
  ThemeErrorPageContentErrorPageContentProps,
  ThemeErrorPageContentErrorPageContentTitle,
  ThemeErrorPageContentErrorPageContentTryAgain,
} from '../../types/theme/ErrorPageContent/index.d.ts';

/**
 * Theme - Error Page Content - Error Page Content.
 *
 * Renders a plain error page with a heading, a retry button, and the
 * error message, providing a fallback view when a page
 * crashes during rendering.
 *
 * @param {ThemeErrorPageContentErrorPageContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ErrorPageContent(props: ThemeErrorPageContentErrorPageContentProps) {
  const message: ThemeErrorPageContentErrorPageContentMessage = props['error']['message'];
  const title: ThemeErrorPageContentErrorPageContentTitle = translate({
    id: 'theme.ErrorPageContent.title',
    message: 'This page crashed.',
    description: 'The title of the error page content',
  });
  const tryAgainLabel: ThemeErrorPageContentErrorPageContentTryAgain = translate({
    id: 'theme.ErrorPageContent.tryAgain',
    message: 'Try again',
    description: 'The label for the button that retries after a page crash',
  });

  return (
    <main className="nova-container">
      <Heading as="h1">{title}</Heading>
      <div>
        <button type="button" onClick={props['tryAgain']}>
          {tryAgainLabel}
        </button>
      </div>
      <hr />
      <div>
        <p>{message}</p>
      </div>
    </main>
  );
}

export default ErrorPageContent;
