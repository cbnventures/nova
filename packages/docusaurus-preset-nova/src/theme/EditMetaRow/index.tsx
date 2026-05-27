import EditThisPage from '@theme/EditThisPage';
import LastUpdated from '@theme/LastUpdated';

import type {
  Theme_EditMetaRow_Index_EditMetaRow_LastUpdatedSpread,
  Theme_EditMetaRow_Index_EditMetaRow_Props,
} from '../../types/theme/EditMetaRow/index.d.ts';

/**
 * Theme - Edit Meta Row - Edit Meta Row.
 *
 * Renders an edit link and last-updated metadata row below doc
 * content, conditionally showing each section only when the
 * corresponding props are provided.
 *
 * @param {Theme_EditMetaRow_Index_EditMetaRow_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function EditMetaRow(props: Theme_EditMetaRow_Index_EditMetaRow_Props) {
  const lastUpdatedSpread: Theme_EditMetaRow_Index_EditMetaRow_LastUpdatedSpread = {};

  if (props['lastUpdatedAt'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedAt', props['lastUpdatedAt']);
  }

  if (props['lastUpdatedBy'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedBy', props['lastUpdatedBy']);
  }

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-edit-meta-row ${props['className']}` : 'nova-edit-meta-row'}
      style={props['style']}
    >
      {(props['editUrl'] !== undefined) && (
        <EditThisPage editUrl={props['editUrl']} />
      )}
      {(
        props['lastUpdatedAt'] !== undefined
        || props['lastUpdatedBy'] !== undefined
      ) && (
        <LastUpdated {...lastUpdatedSpread} />
      )}
    </div>
  );
}

export default EditMetaRow;
