import Link from '@docusaurus/Link';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react/offline';

import type {
  ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbHref,
  ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItem,
  ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbs,
  ThemeDocBreadcrumbsDocBreadcrumbsHomeAriaLabel,
  ThemeDocBreadcrumbsDocBreadcrumbsHomeHref,
  ThemeDocBreadcrumbsDocBreadcrumbsHomePageRoute,
  ThemeDocBreadcrumbsDocBreadcrumbsIndex,
  ThemeDocBreadcrumbsDocBreadcrumbsIsLast,
  ThemeDocBreadcrumbsDocBreadcrumbsNavAriaLabel,
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
function DocBreadcrumbs() {
  const breadcrumbs: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute: ThemeDocBreadcrumbsDocBreadcrumbsHomePageRoute = useHomePageRoute();
  const homeHref: ThemeDocBreadcrumbsDocBreadcrumbsHomeHref = useBaseUrl('/');

  if (breadcrumbs === null || breadcrumbs === undefined) {
    return undefined;
  }

  const navAriaLabel: ThemeDocBreadcrumbsDocBreadcrumbsNavAriaLabel = translate({
    id: 'theme.docs.breadcrumbs.navAriaLabel',
    message: 'Breadcrumbs',
    description: 'The ARIA label for the breadcrumbs navigation',
  });
  const homeAriaLabel: ThemeDocBreadcrumbsDocBreadcrumbsHomeAriaLabel = translate({
    id: 'theme.docs.breadcrumbs.home',
    message: 'Home',
    description: 'The ARIA label for the home link in breadcrumbs',
  });

  return (
    <nav className="nova-breadcrumbs" aria-label={navAriaLabel}>
      <ul className="nova-breadcrumbs-list">
        {(homePageRoute !== undefined) && (
          <li className="nova-breadcrumbs-item">
            <Link className="nova-breadcrumbs-link nova-breadcrumbs-home" href={homeHref} aria-label={homeAriaLabel}>
              <Icon icon="lucide:house" width="14" height="14" aria-hidden="true" />
            </Link>
          </li>
        )}
        {
          breadcrumbs.map((item: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItem, index: ThemeDocBreadcrumbsDocBreadcrumbsIndex) => {
            const isLast: ThemeDocBreadcrumbsDocBreadcrumbsIsLast = index === breadcrumbs['length'] - 1;
            const breadcrumbHref: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbHref = (item['type'] === 'category' && item['linkUnlisted'] === true) ? undefined : item['href'];

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
  );
}

export default DocBreadcrumbs;
