import Link from '@docusaurus/Link';
import Socials from '@theme/Blog/Components/Author/Socials';
import Heading from '@theme/Heading';

import type {
  ThemeBlogComponentsAuthorAuthor,
  ThemeBlogComponentsAuthorAuthorImageUrl,
  ThemeBlogComponentsAuthorAuthorName,
  ThemeBlogComponentsAuthorAuthorTitle,
  ThemeBlogComponentsAuthorCount,
  ThemeBlogComponentsAuthorLink,
  ThemeBlogComponentsAuthorProps,
} from '../../../../types/theme/Blog/Components/Author/index.d.ts';

/**
 * Theme - Blog - Components - Author.
 *
 * Renders an author card with avatar, name, title, optional post count, and
 * social links. The avatar wraps in a `<Link>` when the author has a page
 * permalink, profile URL, or email fallback.
 *
 * @param {ThemeBlogComponentsAuthorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Author(props: ThemeBlogComponentsAuthorProps) {
  const author: ThemeBlogComponentsAuthorAuthor = props['author'];
  const count: ThemeBlogComponentsAuthorCount = props['count'];
  const name: ThemeBlogComponentsAuthorAuthorName = author['name'];
  const title: ThemeBlogComponentsAuthorAuthorTitle = author['title'];
  const imageURL: ThemeBlogComponentsAuthorAuthorImageUrl = author['imageURL'];

  let link: ThemeBlogComponentsAuthorLink = undefined;

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
