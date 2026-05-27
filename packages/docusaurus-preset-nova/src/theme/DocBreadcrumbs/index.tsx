import Link from '@docusaurus/Link';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react/offline';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

import type {
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbHref,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Breadcrumbs,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeAriaLabel,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeHref,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomePageRoute,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Index,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_IsLast,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_NavAriaLabel,
  Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props,
} from '../../types/theme/DocBreadcrumbs/index.d.ts';

/**
 * Theme - Doc Breadcrumbs - Doc Breadcrumbs.
 *
 * Renders a breadcrumb navigation trail using sidebar hierarchy and an optional
 * home link, with plain semantic markup and a house icon for the
 * home entry.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocBreadcrumbs(props: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props) {
  const breadcrumbs: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomePageRoute = useHomePageRoute();
  const homeHref: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeHref = useBaseUrl('/');

  if (breadcrumbs === null || breadcrumbs === undefined) {
    return undefined;
  }

  const navAriaLabel: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_NavAriaLabel = translate({
    id: 'theme.docs.breadcrumbs.navAriaLabel',
    message: 'Breadcrumbs',
    description: 'The ARIA label for the breadcrumbs navigation',
  });
  const homeAriaLabel: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeAriaLabel = translate({
    id: 'theme.docs.breadcrumbs.home',
    message: 'Home',
    description: 'The ARIA label for the home link in breadcrumbs',
  });

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={(props['className'] !== undefined) ? `nova-breadcrumbs ${props['className']}` : 'nova-breadcrumbs'}
        style={props['style']}
        aria-label={navAriaLabel}
      >
        <ul className="nova-breadcrumbs-list">
          {(homePageRoute !== undefined) && (
            <li className="nova-breadcrumbs-item">
              <Link className="nova-breadcrumbs-link nova-breadcrumbs-home" href={homeHref} aria-label={homeAriaLabel}>
                <Icon icon="lucide:house" width="14" height="14" aria-hidden="true" />
              </Link>
            </li>
          )}
          {
            breadcrumbs.map((item: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem, index: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Index) => {
              const isLast: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_IsLast = index === breadcrumbs['length'] - 1;
              const breadcrumbHref: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbHref = (item['type'] === 'category' && item['linkUnlisted'] === true) ? undefined : item['href'];

              if (isLast === true) {
                return (
                  <li className="nova-breadcrumbs-item" key={index}>
                    <span className="nova-breadcrumbs-current" aria-current="page">{item['label']}</span>
                  </li>
                );
              }

              if (breadcrumbHref === undefined) {
                return (
                  <li className="nova-breadcrumbs-item" key={index}>
                    <span className="nova-breadcrumbs-text">{item['label']}</span>
                  </li>
                );
              }

              return (
                <li className="nova-breadcrumbs-item" key={index}>
                  <Link className="nova-breadcrumbs-link" href={breadcrumbHref}>
                    {item['label']}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </nav>
    </>
  );
}

export default DocBreadcrumbs;
