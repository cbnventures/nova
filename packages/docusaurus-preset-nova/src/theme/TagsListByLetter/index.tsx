import { listTagsByLetters } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import Tag from '@theme/Tag';

import type {
  ThemeTagsListByLetterTagsListByLetterLetterEntry,
  ThemeTagsListByLetterTagsListByLetterLetterList,
  ThemeTagsListByLetterTagsListByLetterProps,
  ThemeTagsListByLetterTagsListByLetterTag,
} from '../../types/theme/TagsListByLetter/index.d.ts';

/**
 * Theme - Tags List By Letter - Tags List By Letter.
 *
 * Renders all tags grouped alphabetically by their first letter,
 * with a heading and list for each letter section
 * separated by horizontal rules.
 *
 * @param {ThemeTagsListByLetterTagsListByLetterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TagsListByLetter(props: ThemeTagsListByLetterTagsListByLetterProps) {
  const letterList: ThemeTagsListByLetterTagsListByLetterLetterList = listTagsByLetters(props['tags']);

  return (
    <section className="nova-tags-list-by-letter">
      {
        letterList.map((letterEntry: ThemeTagsListByLetterTagsListByLetterLetterEntry) => (
          <article className="nova-tags-list-by-letter-group" key={letterEntry['letter']}>
            <Heading as="h2" id={letterEntry['letter']}>
              {letterEntry['letter']}
            </Heading>
            <ul className="nova-tags-list-by-letter-list">
              {
                letterEntry['tags'].map((tag: ThemeTagsListByLetterTagsListByLetterTag) => (
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
            <hr />
          </article>
        ))
      }
    </section>
  );
}

export default TagsListByLetter;
