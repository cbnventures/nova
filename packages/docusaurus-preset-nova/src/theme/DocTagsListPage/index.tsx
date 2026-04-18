import { PageMetadata, translateTagsPageTitle } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import TagsListByLetter from '@theme/TagsListByLetter';

import type {
  ThemeDocTagsListPageDocTagsListPageProps,
  ThemeDocTagsListPageDocTagsListPageTitle,
} from '../../types/theme/DocTagsListPage/index.d.ts';

/**
 * Theme - Doc Tags List Page - Doc Tags List Page.
 *
 * Renders a page listing all documentation tags grouped alphabetically
 * by letter, with a translated heading and page metadata
 * for search engine discovery.
 *
 * @param {ThemeDocTagsListPageDocTagsListPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocTagsListPage(props: ThemeDocTagsListPageDocTagsListPageProps) {
  const title: ThemeDocTagsListPageDocTagsListPageTitle = translateTagsPageTitle();

  return (
    <>
      <PageMetadata title={title} />
      <div className="nova-container">
        <main>
          <Heading as="h1">{title}</Heading>
          <TagsListByLetter tags={props['tags']} />
        </main>
      </div>
    </>
  );
}

export default DocTagsListPage;
