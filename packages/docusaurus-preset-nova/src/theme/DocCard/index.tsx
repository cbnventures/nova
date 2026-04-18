import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  useDocById,
} from '@docusaurus/plugin-content-docs/client';
import { usePluralForm } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import Heading from '@theme/Heading';

import type {
  ThemeDocCardCardCategoryHref,
  ThemeDocCardCardCategoryProps,
  ThemeDocCardCardLayoutProps,
  ThemeDocCardCardLinkProps,
  ThemeDocCardDocCardProps,
  ThemeDocCardDocDescription,
  ThemeDocCardDocResult,
  ThemeDocCardLayoutDescription,
  ThemeDocCardLayoutIcon,
  ThemeDocCardUseCategoryItemsPluralCount,
  ThemeDocCardUseCategoryItemsPluralPluralForm,
  ThemeDocCardUseCategoryItemsPluralSelectMessage,
  ThemeDocCardUseCategoryItemsPluralTranslated,
} from '../../types/theme/DocCard/index.d.ts';

/**
 * Theme - Doc Card - Use Category Items Plural.
 *
 * Returns a function that pluralizes the item count description
 * for category cards, used as the fallback description when no
 * custom description is set.
 *
 * @returns {ThemeDocCardUseCategoryItemsPluralSelectMessage}
 *
 * @since 0.15.0
 */
function useCategoryItemsPlural(): ThemeDocCardUseCategoryItemsPluralSelectMessage {
  const pluralForm: ThemeDocCardUseCategoryItemsPluralPluralForm = usePluralForm();

  return (count: ThemeDocCardUseCategoryItemsPluralCount) => {
    const translated: ThemeDocCardUseCategoryItemsPluralTranslated = translate(
      {
        message: '1 item|{count} items',
        id: 'theme.docs.DocCard.categoryDescription.plurals',
        description: 'The default description for a category card in the generated index about how many items this category includes',
      },
      { count },
    );

    return pluralForm.selectMessage(count, translated);
  };
}

/**
 * Theme - Doc Card - Card Layout.
 *
 * Renders a single doc card with an Iconify icon, title, and
 * optional description inside a linked card container with hover
 * lift animation.
 *
 * @param {ThemeDocCardCardLayoutProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CardLayout(props: ThemeDocCardCardLayoutProps) {
  return (
    <Link href={props['href']}>
      <Heading
        as="h2"
        title={props['title']}
      >
        <Icon
          icon={props['icon']}
          width="20"
          height="20"
          aria-hidden="true"
        />
        {props['title']}
      </Heading>
      {(props['description'] !== undefined) && (
        <p title={props['description']}>
          {props['description']}
        </p>
      )}
    </Link>
  );
}

/**
 * Theme - Doc Card - Card Category.
 *
 * Renders a category doc card with a folder icon, the category label, and either a custom
 * description or a pluralized item count.
 *
 * @param {ThemeDocCardCardCategoryProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CardCategory(props: ThemeDocCardCardCategoryProps) {
  const href: ThemeDocCardCardCategoryHref = findFirstSidebarItemLink(props['item']);
  const categoryItemsPlural: ThemeDocCardUseCategoryItemsPluralSelectMessage = useCategoryItemsPlural();

  if (href === undefined) {
    return undefined;
  }

  const description: ThemeDocCardLayoutDescription = props['item']['description'] ?? categoryItemsPlural(props['item']['items']['length']);

  return (
    <CardLayout
      className={props['item']['className']}
      href={href}
      icon="lucide:folder"
      title={props['item']['label']}
      description={description}
    />
  );
}

/**
 * Theme - Doc Card - Card Link.
 *
 * Renders a doc link card with a document or external link icon,
 * the item label, and either a custom description or the
 * auto-generated description from doc metadata.
 *
 * @param {ThemeDocCardCardLinkProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CardLink(props: ThemeDocCardCardLinkProps) {
  const icon: ThemeDocCardLayoutIcon = (isInternalUrl(props['item']['href']) === true) ? 'lucide:file-text' : 'lucide:external-link';
  const doc: ThemeDocCardDocResult = useDocById(props['item']['docId'] ?? undefined);
  const docDescription: ThemeDocCardDocDescription = (doc !== undefined) ? doc['description'] : undefined;
  const description: ThemeDocCardLayoutDescription = props['item']['description'] ?? docDescription;

  return (
    <CardLayout
      className={props['item']['className']}
      href={props['item']['href']}
      icon={icon}
      title={props['item']['label']}
      description={description}
    />
  );
}

/**
 * Theme - Doc Card - Doc Card.
 *
 * Replaces the default Docusaurus DocCard component with a version
 * that uses Iconify icons and custom card styling with hover lift
 * animations and shadow depth.
 *
 * @param {ThemeDocCardDocCardProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocCard(props: ThemeDocCardDocCardProps) {
  switch (props['item']['type']) {
    case 'link': {
      return <CardLink item={props['item']} />;
    }

    case 'category': {
      return <CardCategory item={props['item']} />;
    }

    default: {
      throw new Error(`unknown item type ${JSON.stringify(props['item'])}`);
    }
  }
}

export default DocCard;
