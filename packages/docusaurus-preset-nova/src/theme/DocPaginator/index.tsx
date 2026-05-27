import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import type {
  Theme_DocPaginator_Index_DocPaginator_ContinueReadingAriaLabel,
  Theme_DocPaginator_Index_DocPaginator_ContinueReadingLabel,
  Theme_DocPaginator_Index_DocPaginator_GoBackAriaLabel,
  Theme_DocPaginator_Index_DocPaginator_GoBackLabel,
  Theme_DocPaginator_Index_DocPaginator_Heading,
  Theme_DocPaginator_Index_DocPaginator_NavAriaLabel,
  Theme_DocPaginator_Index_DocPaginator_Props,
} from '../../types/theme/DocPaginator/index.d.ts';

/**
 * Theme - Doc Paginator - Doc Paginator.
 *
 * Renders a "Keep reading" section at the bottom of a doc page
 * with previous and next navigation links, each showing the
 * target page title and an optional description excerpt.
 *
 * @param {Theme_DocPaginator_Index_DocPaginator_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocPaginator(props: Theme_DocPaginator_Index_DocPaginator_Props) {
  if (props['previous'] === undefined && props['next'] === undefined) {
    return null;
  }

  const navAriaLabel: Theme_DocPaginator_Index_DocPaginator_NavAriaLabel = translate({
    id: 'theme.docs.paginator.navAriaLabel',
    message: 'Docs pages',
    description: 'The ARIA label for the doc paginator navigation',
  });
  const heading: Theme_DocPaginator_Index_DocPaginator_Heading = translate({
    id: 'theme.docs.paginator.heading',
    message: 'Keep reading',
    description: 'The heading shown above the doc paginator links',
  });
  const goBackLabel: Theme_DocPaginator_Index_DocPaginator_GoBackLabel = translate({
    id: 'theme.docs.paginator.goBackLabel',
    message: 'Go back',
    description: 'The label for the previous page link in the doc paginator',
  });
  const continueReadingLabel: Theme_DocPaginator_Index_DocPaginator_ContinueReadingLabel = translate({
    id: 'theme.docs.paginator.continueReadingLabel',
    message: 'Continue reading',
    description: 'The label for the next page link in the doc paginator',
  });

  return (
    <nav
      className={(props['className'] !== undefined) ? `nova-doc-paginator ${props['className']}` : 'nova-doc-paginator'}
      style={props['style']}
      aria-label={navAriaLabel}
    >
      <div className="nova-doc-paginator-heading">{heading}</div>
      <div className="nova-doc-paginator-links">
        {(props['previous'] !== undefined) && (() => {
          const goBackAriaLabel: Theme_DocPaginator_Index_DocPaginator_GoBackAriaLabel = translate(
            {
              id: 'theme.docs.paginator.goBackAriaLabel',
              message: 'Go back: {title}',
              description: 'The ARIA label for the previous page link in the doc paginator',
            },
            { title: props['previous']['title'] },
          );

          return (
            <Link
              className="nova-doc-paginator-link"
              to={props['previous']['permalink']}
              rel="prev"
              aria-label={goBackAriaLabel}
            >
              <span className="nova-doc-paginator-label">{goBackLabel}</span>
              <span className="nova-doc-paginator-title">
                <Icon icon="lucide:arrow-left" width="16" height="16" aria-hidden="true" />
                {props['previous']['title']}
              </span>
              {(props['previous']['description'] !== undefined) && (
                <span className="nova-doc-paginator-excerpt">{props['previous']['description']}</span>
              )}
            </Link>
          );
        })()}
        {(props['next'] !== undefined) && (() => {
          const continueReadingAriaLabel: Theme_DocPaginator_Index_DocPaginator_ContinueReadingAriaLabel = translate(
            {
              id: 'theme.docs.paginator.continueReadingAriaLabel',
              message: 'Continue reading: {title}',
              description: 'The ARIA label for the next page link in the doc paginator',
            },
            { title: props['next']['title'] },
          );

          return (
            <Link
              className="nova-doc-paginator-link"
              to={props['next']['permalink']}
              rel="next"
              data-next="true"
              aria-label={continueReadingAriaLabel}
            >
              <span className="nova-doc-paginator-label">{continueReadingLabel}</span>
              <span className="nova-doc-paginator-title">
                {props['next']['title']}
                <Icon icon="lucide:arrow-right" width="16" height="16" aria-hidden="true" />
              </span>
              {(props['next']['description'] !== undefined) && (
                <span className="nova-doc-paginator-excerpt">{props['next']['description']}</span>
              )}
            </Link>
          );
        })()}
      </div>
    </nav>
  );
}

export default DocPaginator;
