import { PageMetadata } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Author from '@theme/Blog/Components/Author';
import BlogLayout from '@theme/BlogLayout';
import Heading from '@theme/Heading';

import type {
  Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Author,
  Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorCount,
  Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Heading,
  Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props,
} from '../../../../types/theme/Blog/Pages/BlogAuthorsListPage/index.d.ts';

/**
 * Theme - Blog - Pages - Blog Authors List Page - Blog Authors List Page.
 *
 * Renders the `/blog/authors/` index page listing every author declared in
 * the blog's `authors.yml`. Each author renders via `<Author/>` with avatar,
 * name, title, post count, and social links.
 *
 * @param {Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlogAuthorsListPage(props: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props) {
  const heading: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Heading = translate({
    id: 'theme.blog.authorsList.pageTitle',
    message: 'Authors',
    description: 'The heading of the blog authors list page',
  });

  return (
    <BlogLayout
      sidebar={props['sidebar']}
      showHeader
      header={<Heading as="h1">{heading}</Heading>}
    >
      <PageMetadata title={heading} />
      <ul
        className={(props['className'] !== undefined) ? `nova-blog-authors-list ${props['className']}` : 'nova-blog-authors-list'}
        style={props['style']}
      >
        {props['authors'].map((author: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Author) => (
          <li key={author['key']} className="nova-blog-authors-list-item">
            <Author as="h2" author={author} count={author['count'] as Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorCount} />
          </li>
        ))}
      </ul>
    </BlogLayout>
  );
}

export default BlogAuthorsListPage;
