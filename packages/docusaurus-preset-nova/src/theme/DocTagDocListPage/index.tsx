import Link from '@docusaurus/Link';
import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';

import type {
  ThemeDocTagDocListPageDocTagDocListPageDoc,
  ThemeDocTagDocListPageDocTagDocListPageMetadataSpread,
  ThemeDocTagDocListPageDocTagDocListPageProps,
  ThemeDocTagDocListPageDocTagDocListPageTitle,
  ThemeDocTagDocListPageDocTagDocListPageViewAllTags,
} from '../../types/theme/DocTagDocListPage/index.d.ts';

/**
 * Theme - Doc Tag Doc List Page - Doc Tag Doc List Page.
 *
 * Renders a page listing all documents tagged with a specific tag, showing
 * a heading with the tag name, an optional description, a link back
 * to all tags, and each tagged document.
 *
 * @param {ThemeDocTagDocListPageDocTagDocListPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocTagDocListPage(props: ThemeDocTagDocListPageDocTagDocListPageProps) {
  const title: ThemeDocTagDocListPageDocTagDocListPageTitle = `${props['tag']['count']} docs tagged with "${props['tag']['label']}"`;
  const viewAllTags: ThemeDocTagDocListPageDocTagDocListPageViewAllTags = translate({
    id: 'theme.docs.tagDocListPage.viewAllTags',
    message: 'View all tags',
    description: 'The label for the link to the full doc tags list',
  });
  const metadataSpread: ThemeDocTagDocListPageDocTagDocListPageMetadataSpread = {};

  if (props['tag']['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', props['tag']['description']);
  }

  return (
    <>
      <PageMetadata title={title} {...metadataSpread} />
      <div className="nova-container">
        <main>
          <header>
            <Heading as="h1">{title}</Heading>
            {(props['tag']['description'] !== undefined) && (
              <p>{props['tag']['description']}</p>
            )}
            <Link href={props['tag']['allTagsPath']}>
              {viewAllTags}
            </Link>
          </header>
          <section>
            {
              props['tag']['items'].map((doc: ThemeDocTagDocListPageDocTagDocListPageDoc) => (
                <article key={doc['id']}>
                  <Link to={doc['permalink']}>
                    <Heading as="h2">{doc['title']}</Heading>
                  </Link>
                  {(doc['description'] !== undefined) && (
                    <p>{doc['description']}</p>
                  )}
                </article>
              ))
            }
          </section>
        </main>
      </div>
    </>
  );
}

export default DocTagDocListPage;
