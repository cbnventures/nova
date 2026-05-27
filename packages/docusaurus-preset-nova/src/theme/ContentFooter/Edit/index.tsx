import { translate } from '@docusaurus/Translate';
import EditThisPage from '@theme/EditThisPage';
import LastUpdated from '@theme/LastUpdated';

import type {
  Theme_ContentFooter_Edit_Index_Edit_Label,
  Theme_ContentFooter_Edit_Index_Edit_LastUpdatedSpread,
  Theme_ContentFooter_Edit_Index_Edit_Props,
} from '../../../types/theme/ContentFooter/Edit/index.d.ts';

/**
 * Theme - Content Footer - Edit.
 *
 * Renders the contribute section of a content footer - a labeled
 * row containing the last-updated stamp and an edit-this-page link
 * for collaborators.
 *
 * @param {Theme_ContentFooter_Edit_Index_Edit_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function Edit(props: Theme_ContentFooter_Edit_Index_Edit_Props) {
  if (
    props['editUrl'] === undefined
    && props['lastUpdatedAt'] === undefined
    && props['lastUpdatedBy'] === undefined
  ) {
    return undefined;
  }

  const editLabel: Theme_ContentFooter_Edit_Index_Edit_Label = translate({
    id: 'theme.contentFooter.editLabel',
    message: 'Contribute',
    description: 'The label for the contribute section in a content footer',
  });
  const lastUpdatedSpread: Theme_ContentFooter_Edit_Index_Edit_LastUpdatedSpread = {};

  if (props['lastUpdatedAt'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedAt', props['lastUpdatedAt']);
  }

  if (props['lastUpdatedBy'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedBy', props['lastUpdatedBy']);
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-content-footer-section ${props['className']}` : 'nova-content-footer-section'}
      style={props['style']}
    >
      <span className="nova-content-footer-section-label">{editLabel}</span>
      <div className="nova-content-footer-edit">
        {(
          props['lastUpdatedAt'] !== undefined
          || props['lastUpdatedBy'] !== undefined
        ) && (
          <LastUpdated {...lastUpdatedSpread} />
        )}
        {(props['editUrl'] !== undefined) && (
          <EditThisPage editUrl={props['editUrl']} />
        )}
      </div>
    </div>
  );
}

export default Edit;
