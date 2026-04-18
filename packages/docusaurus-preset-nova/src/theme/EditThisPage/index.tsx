import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

import type {
  ThemeEditThisPageEditThisPageLinkLabel,
  ThemeEditThisPageEditThisPageProps,
} from '../../types/theme/EditThisPage/index.d.ts';

/**
 * Theme - Edit This Page - Edit This Page.
 *
 * Renders a plain link to the source editing URL without any SVG
 * edit icon or framework-specific visual styling.
 *
 * @param {ThemeEditThisPageEditThisPageProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function EditThisPage(props: ThemeEditThisPageEditThisPageProps) {
  const linkLabel: ThemeEditThisPageEditThisPageLinkLabel = translate({
    id: 'theme.common.editThisPage',
    message: 'Edit this page',
    description: 'The link label to edit the current page',
  });

  return (
    <Link className="nova-edit-this-page" to={props['editUrl']}>
      {linkLabel}
    </Link>
  );
}

export default EditThisPage;
