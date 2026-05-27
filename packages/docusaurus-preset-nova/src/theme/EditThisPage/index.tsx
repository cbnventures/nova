import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

import type {
  Theme_EditThisPage_Index_EditThisPage_LinkLabel,
  Theme_EditThisPage_Index_EditThisPage_Props,
} from '../../types/theme/EditThisPage/index.d.ts';

/**
 * Theme - Edit This Page - Edit This Page.
 *
 * Renders a plain link to the source editing URL without any SVG
 * edit icon or framework-specific visual styling.
 *
 * @param {Theme_EditThisPage_Index_EditThisPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function EditThisPage(props: Theme_EditThisPage_Index_EditThisPage_Props) {
  const linkLabel: Theme_EditThisPage_Index_EditThisPage_LinkLabel = translate({
    id: 'theme.common.editThisPage',
    message: 'Edit this page',
    description: 'The link label to edit the current page',
  });

  return (
    <Link
      className={(props['className'] !== undefined) ? `nova-edit-this-page ${props['className']}` : 'nova-edit-this-page'}
      {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
      to={props['editUrl']}
    >
      {linkLabel}
    </Link>
  );
}

export default EditThisPage;
