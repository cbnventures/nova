import Link from '@docusaurus/Link';
import Socials from '@theme/Blog/Components/Author/Socials';
import Heading from '@theme/Heading';

import type {
  Theme_Blog_Components_Author_Index_Author_ImageUrl,
  Theme_Blog_Components_Author_Index_Author_Link,
  Theme_Blog_Components_Author_Index_Author_Name,
  Theme_Blog_Components_Author_Index_Author_Props,
  Theme_Blog_Components_Author_Index_Author_Props_Author,
  Theme_Blog_Components_Author_Index_Author_Props_Count,
  Theme_Blog_Components_Author_Index_Author_Title,
} from '../../../../types/theme/Blog/Components/Author/index.d.ts';

/**
 * Theme - Blog - Components - Author.
 *
 * Renders an author card with avatar, name, title, optional post count, and
 * social links. The avatar wraps in a `<Link>` when the author has a page
 * permalink, profile URL, or email fallback.
 *
 * @param {Theme_Blog_Components_Author_Index_Author_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Author(props: Theme_Blog_Components_Author_Index_Author_Props) {
  const author: Theme_Blog_Components_Author_Index_Author_Props_Author = props['author'];
  const count: Theme_Blog_Components_Author_Index_Author_Props_Count = props['count'];
  const name: Theme_Blog_Components_Author_Index_Author_Name = author['name'];
  const title: Theme_Blog_Components_Author_Index_Author_Title = author['title'];
  const imageURL: Theme_Blog_Components_Author_Index_Author_ImageUrl = author['imageURL'];

  let link: Theme_Blog_Components_Author_Index_Author_Link = undefined;

  if (
    author['page'] !== null
    && author['page'] !== undefined
    && author['page']['permalink'] !== undefined
  ) {
    link = author['page']['permalink'];
  } else if (author['url'] !== undefined) {
    link = author['url'];
  } else if (author['email'] !== undefined) {
    link = `mailto:${author['email']}`;
  } else {
    link = undefined;
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-blog-author ${props['className']}` : 'nova-blog-author'}
      style={props['style']}
    >
      {(
        imageURL !== undefined
        && link !== undefined
      ) && (
        <Link className="nova-blog-author-image-link" href={link}>
          <img className="nova-blog-author-image" src={imageURL} alt={name ?? ''} />
        </Link>
      )}
      {(
        imageURL !== undefined
        && link === undefined
      ) && (
        <img className="nova-blog-author-image" src={imageURL} alt={name ?? ''} />
      )}
      {(
        name !== undefined
        || title !== undefined
      ) && (
        <div className="nova-blog-author-details">
          <div className="nova-blog-author-row">
            {(
              name !== undefined
              && link !== undefined
            ) && (
              <Link className="nova-blog-author-name-link" href={link}>
                {(props['as'] !== undefined) ? (
                  <Heading as={props['as']} className="nova-blog-author-name">{name}</Heading>
                ) : (
                  <span className="nova-blog-author-name" translate="no">{name}</span>
                )}
              </Link>
            )}
            {(
              name !== undefined
              && link === undefined
            ) && (
              (props['as'] !== undefined) ? (
                <Heading as={props['as']} className="nova-blog-author-name">{name}</Heading>
              ) : (
                <span className="nova-blog-author-name" translate="no">{name}</span>
              )
            )}
            {(count !== undefined) && (
              <span className="nova-blog-author-count">{count}</span>
            )}
          </div>
          {(title !== undefined) && (
            <small className="nova-blog-author-title" title={title}>{title}</small>
          )}
          <Socials author={author} />
        </div>
      )}
    </div>
  );
}

export default Author;
