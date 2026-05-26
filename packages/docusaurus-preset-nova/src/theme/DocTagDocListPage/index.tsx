import Link from '@docusaurus/Link';
import { PageMetadata, usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import Heading from '@theme/Heading';

import type {
  ThemeDocTagDocListPageDocTagDocListPageDoc,
  ThemeDocTagDocListPageDocTagDocListPageDocsTaggedPlural,
  ThemeDocTagDocListPageDocTagDocListPageItemSectionLabel,
  ThemeDocTagDocListPageDocTagDocListPageMetadataSpread,
  ThemeDocTagDocListPageDocTagDocListPageNDocsTagged,
  ThemeDocTagDocListPageDocTagDocListPageProps,
  ThemeDocTagDocListPageDocTagDocListPageReadDocLabel,
  ThemeDocTagDocListPageDocTagDocListPageTitle,
  ThemeDocTagDocListPageDocTagDocListPageViewAllTags,
  ThemeDocTagDocListPageFormatDocSectionDocId,
  ThemeDocTagDocListPageFormatDocSectionFormatted,
  ThemeDocTagDocListPageFormatDocSectionParentParts,
  ThemeDocTagDocListPageFormatDocSectionParts,
  ThemeDocTagDocListPageFormatDocSectionReturns,
  ThemeDocTagDocListPageFormatDocSectionSegment,
  ThemeDocTagDocListPageFormatDocSectionTitled,
  ThemeDocTagDocListPageFormatDocSectionWord,
  ThemeDocTagDocListPageFormatDocSectionWords,
  ThemeDocTagDocListPageUseDocsTaggedPluralCount,
  ThemeDocTagDocListPageUseDocsTaggedPluralPluralForm,
  ThemeDocTagDocListPageUseDocsTaggedPluralSelectMessage,
  ThemeDocTagDocListPageUseDocsTaggedPluralTranslated,
} from '../../types/theme/DocTagDocListPage/index.d.ts';

/**
 * Theme - Doc Tag Doc List Page - Format Doc Section.
 *
 * Derives a human-readable section breadcrumb from a doc id, used as
 * kicker text above each card title to show where the doc lives.
 *
 * @param {ThemeDocTagDocListPageFormatDocSectionDocId} docId - Doc id.
 *
 * @returns {ThemeDocTagDocListPageFormatDocSectionReturns}
 *
 * @since 0.18.0
 */
function formatDocSection(docId: ThemeDocTagDocListPageFormatDocSectionDocId): ThemeDocTagDocListPageFormatDocSectionReturns {
  const parts: ThemeDocTagDocListPageFormatDocSectionParts = docId.split('/');
  const parentParts: ThemeDocTagDocListPageFormatDocSectionParentParts = parts.slice(0, -1);
  const formatted: ThemeDocTagDocListPageFormatDocSectionFormatted = parentParts.map((segment: ThemeDocTagDocListPageFormatDocSectionSegment) => {
    const words: ThemeDocTagDocListPageFormatDocSectionWords = segment.split('-');
    const titled: ThemeDocTagDocListPageFormatDocSectionTitled = words.map((word: ThemeDocTagDocListPageFormatDocSectionWord) => word.charAt(0).toUpperCase() + word.slice(1));

    return titled.join(' ');
  });

  return formatted.join(' / ');
}

/**
 * Theme - Doc Tag Doc List Page - Use Docs Tagged Plural.
 *
 * Returns a function that pluralizes the docs-tagged count for the page
 * heading and metadata title, used as the variable portion of the
 * `'{nDocsTagged} with "{tagName}"'` title format.
 *
 * @returns {ThemeDocTagDocListPageUseDocsTaggedPluralSelectMessage}
 *
 * @since 0.18.0
 */
function useDocsTaggedPlural(): ThemeDocTagDocListPageUseDocsTaggedPluralSelectMessage {
  const pluralForm: ThemeDocTagDocListPageUseDocsTaggedPluralPluralForm = usePluralForm();

  return (count: ThemeDocTagDocListPageUseDocsTaggedPluralCount) => {
    const translated: ThemeDocTagDocListPageUseDocsTaggedPluralTranslated = translate(
      {
        message: 'One doc tagged|{count} docs tagged',
        id: 'theme.docs.tagDocListPageTitle.nDocsTagged',
        description: 'Pluralized label for "{count} docs tagged". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
      },
      { count },
    );

    return pluralForm.selectMessage(count, translated);
  };
}

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
  const docsTaggedPlural: ThemeDocTagDocListPageDocTagDocListPageDocsTaggedPlural = useDocsTaggedPlural();
  const nDocsTagged: ThemeDocTagDocListPageDocTagDocListPageNDocsTagged = docsTaggedPlural(props['tag']['count']);
  const title: ThemeDocTagDocListPageDocTagDocListPageTitle = translate(
    {
      message: '{nDocsTagged} with "{tagName}"',
      id: 'theme.docs.tagDocListPageTitle',
      description: 'The title of the page for a docs tag',
    },
    {
      nDocsTagged,
      tagName: props['tag']['label'],
    },
  );
  const viewAllTags: ThemeDocTagDocListPageDocTagDocListPageViewAllTags = translate({
    id: 'theme.docs.tagDocListPage.viewAllTags',
    message: 'View all tags',
    description: 'The label for the link to the full doc tags list',
  });
  const readDocLabel: ThemeDocTagDocListPageDocTagDocListPageReadDocLabel = translate({
    id: 'theme.docs.tagDocListPage.readDoc',
    message: 'Read article',
    description: 'The label on a tagged-doc card linking to the full doc',
  });
  const metadataSpread: ThemeDocTagDocListPageDocTagDocListPageMetadataSpread = {};

  if (props['tag']['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', props['tag']['description']);
  }

  return (
    <>
      <PageMetadata title={title} {...metadataSpread} />
      <div
        className={(props['className'] !== undefined) ? `nova-container ${props['className']}` : 'nova-container'}
        style={props['style']}
      >
        <main className="nova-doc-tag-doc-list-page">
          <header className="nova-doc-tag-doc-list-page-header">
            <Heading as="h1">{title}</Heading>
            {(props['tag']['description'] !== undefined) && (
              <p className="nova-doc-tag-doc-list-page-description">
                {props['tag']['description']}
              </p>
            )}
            <Link
              className="nova-doc-tag-doc-list-page-all-link"
              href={props['tag']['allTagsPath']}
            >
              {viewAllTags}
            </Link>
          </header>
          <section className="nova-grid nova-doc-tag-doc-list-page-items">
            {
              props['tag']['items'].map((doc: ThemeDocTagDocListPageDocTagDocListPageDoc) => {
                const sectionLabel: ThemeDocTagDocListPageDocTagDocListPageItemSectionLabel = formatDocSection(doc['id']);

                return (
                  <article className="nova-col-12" key={doc['id']}>
                    <Link to={doc['permalink']}>
                      {(sectionLabel !== '') && (
                        <p className="nova-doc-tag-doc-list-page-item-section">
                          {sectionLabel}
                        </p>
                      )}
                      <Heading as="h2">
                        <Icon
                          icon="lucide:file-text"
                          width="20"
                          height="20"
                          aria-hidden="true"
                        />
                        {doc['title']}
                      </Heading>
                      {(doc['description'] !== undefined) && (
                        <p>{doc['description']}</p>
                      )}
                      <span className="nova-doc-tag-doc-list-page-item-read">
                        {readDocLabel}
                        <span aria-hidden="true"> →</span>
                      </span>
                    </Link>
                  </article>
                );
              })
            }
          </section>
        </main>
      </div>
    </>
  );
}

export default DocTagDocListPage;
