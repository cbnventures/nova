import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import TagsListByLetter from '@theme/TagsListByLetter';

import type {
  Theme_DocTagsListPage_Index_DocTagsListPage_Props,
  Theme_DocTagsListPage_Index_DocTagsListPage_Title,
} from '../../types/theme/DocTagsListPage/index.d.ts';

/**
 * Theme - Doc Tags List Page - Doc Tags List Page.
 *
 * Renders a page listing all documentation tags grouped alphabetically
 * by letter, with a translated heading and page metadata
 * for search engine discovery.
 *
 * @param {Theme_DocTagsListPage_Index_DocTagsListPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocTagsListPage(props: Theme_DocTagsListPage_Index_DocTagsListPage_Props) {
  const title: Theme_DocTagsListPage_Index_DocTagsListPage_Title = translateTagsPageTitle();

  return (
    <>
      <PageMetadata title={title} />
      <div
        className={(props['className'] !== undefined) ? `nova-container ${props['className']}` : 'nova-container'}
        style={props['style']}
      >
        <main className="nova-doc-tags-list-page">
          <Heading as="h1">{title}</Heading>
          <TagsListByLetter tags={props['tags']} />
        </main>
      </div>
    </>
  );
}

export default DocTagsListPage;
