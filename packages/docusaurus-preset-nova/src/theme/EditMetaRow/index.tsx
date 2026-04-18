import EditThisPage from '@theme/EditThisPage';
import LastUpdated from '@theme/LastUpdated';

import type {
  ThemeEditMetaRowEditMetaRowLastUpdatedSpread,
  ThemeEditMetaRowEditMetaRowProps,
} from '../../types/theme/EditMetaRow/index.d.ts';

/**
 * Theme - Edit Meta Row - Edit Meta Row.
 *
 * Renders an edit link and last-updated metadata row below doc
 * content, conditionally showing each section only when the
 * corresponding props are provided.
 *
 * @param {ThemeEditMetaRowEditMetaRowProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function EditMetaRow(props: ThemeEditMetaRowEditMetaRowProps) {
  const lastUpdatedSpread: ThemeEditMetaRowEditMetaRowLastUpdatedSpread = {};

  if (props['lastUpdatedAt'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedAt', props['lastUpdatedAt']);
  }

  if (props['lastUpdatedBy'] !== undefined) {
    Reflect.set(lastUpdatedSpread, 'lastUpdatedBy', props['lastUpdatedBy']);
  }

  return (
    <div className="nova-edit-meta-row">
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
