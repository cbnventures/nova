import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';

import type {
  Theme_NotFound_Index_NotFound_Title,
  Theme_NotFound_Index_NotFound_Props,
} from '../../types/theme/NotFound/index.d.ts';

/**
 * Theme - Not Found - Not Found.
 *
 * Renders a full 404 page wrapped in the site layout with
 * metadata title set to "Page Not Found" and the not-found
 * content body.
 *
 * @param {Theme_NotFound_Index_NotFound_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function NotFound(props: Theme_NotFound_Index_NotFound_Props) {
  const title: Theme_NotFound_Index_NotFound_Title = translate({
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
