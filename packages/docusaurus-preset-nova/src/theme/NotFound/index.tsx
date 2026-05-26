import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';

import type {
  ThemeNotFoundNotFoundTitle,
  ThemeNotFoundProps,
} from '../../types/theme/NotFound/index.d.ts';

/**
 * Theme - Not Found - Not Found.
 *
 * Renders a full 404 page wrapped in the site layout with
 * metadata title set to "Page Not Found" and the not-found
 * content body.
 *
 * @param {ThemeNotFoundProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NotFound(props: ThemeNotFoundProps) {
  const title: ThemeNotFoundNotFoundTitle = translate({
    id: 'theme.NotFound.title',
    message: 'Page Not Found',
    description: 'The title of the 404 page',
  });

  return (
    <>
      <PageMetadata title={title} />
      <Layout
        className={(props['className'] !== undefined) ? `nova-not-found-layout ${props['className']}` : 'nova-not-found-layout'}
        style={props['style']}
      >
        <NotFoundContent />
      </Layout>
    </>
  );
}

export default NotFound;
