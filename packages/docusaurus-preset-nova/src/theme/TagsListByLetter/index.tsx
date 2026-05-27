import { listTagsByLetters } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import Tag from '@theme/Tag';

import type {
  Theme_TagsListByLetter_Index_TagsListByLetter_LetterEntry,
  Theme_TagsListByLetter_Index_TagsListByLetter_LetterList,
  Theme_TagsListByLetter_Index_TagsListByLetter_Props,
  Theme_TagsListByLetter_Index_TagsListByLetter_Tag,
} from '../../types/theme/TagsListByLetter/index.d.ts';

/**
 * Theme - Tags List By Letter - Tags List By Letter.
 *
 * Renders all tags grouped alphabetically by their first letter,
 * with a heading and list for each letter section
 * separated by horizontal rules.
 *
 * @param {Theme_TagsListByLetter_Index_TagsListByLetter_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TagsListByLetter(props: Theme_TagsListByLetter_Index_TagsListByLetter_Props) {
  const letterList: Theme_TagsListByLetter_Index_TagsListByLetter_LetterList = listTagsByLetters(props['tags']);

  return (
    <section
      className={(props['className'] !== undefined) ? `nova-tags-list-by-letter ${props['className']}` : 'nova-tags-list-by-letter'}
      style={props['style']}
    >
      {
        letterList.map((letterEntry: Theme_TagsListByLetter_Index_TagsListByLetter_LetterEntry) => (
          <article className="nova-tags-list-by-letter-group" key={letterEntry['letter']}>
            <Heading as="h2" id={letterEntry['letter']}>
              {letterEntry['letter']}
            </Heading>
            <ul className="nova-tags-list-by-letter-list">
              {
                letterEntry['tags'].map((tag: Theme_TagsListByLetter_Index_TagsListByLetter_Tag) => (
                  <li key={tag['permalink']}>
                    <Tag
                      permalink={tag['permalink']}
                      label={tag['label']}
                      count={tag['count']}
                      description={tag['description']}
                    />
                  </li>
                ))
              }
            </ul>
          </article>
        ))
      }
    </section>
  );
}

export default TagsListByLetter;
