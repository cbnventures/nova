import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';

import type {
  ThemeNotFoundContentNotFoundContentParagraph1,
  ThemeNotFoundContentNotFoundContentParagraph2,
  ThemeNotFoundContentNotFoundContentTitle,
} from '../../../types/theme/NotFound/Content/index.d.ts';

/**
 * Theme - Not Found - Content - Not Found Content.
 *
 * Renders a plain 404 page body with a heading and descriptive
 * paragraphs explaining that the requested page could not
 * be found.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NotFoundContent() {
  const title: ThemeNotFoundContentNotFoundContentTitle = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
    description: 'The title of the 404 page',
  });
  const paragraph1: ThemeNotFoundContentNotFoundContentParagraph1 = translate({
    id: 'theme.NotFound.p1',
    message: 'We could not find what you were looking for.',
    description: 'The first paragraph of the 404 page',
  });
  const paragraph2: ThemeNotFoundContentNotFoundContentParagraph2 = translate({
    id: 'theme.NotFound.p2',
    message: 'Please contact the owner of the site that linked you to the original URL and let them know their link is broken.',
    description: 'The second paragraph of the 404 page',
  });

  return (
    <main className="nova-container">
      <Heading as="h1">
        {title}
      </Heading>
      <p>{paragraph1}</p>
      <p>{paragraph2}</p>
    </main>
  );
}

export default NotFoundContent;
