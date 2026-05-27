import { useTabs } from '@docusaurus/theme-common/internal';

import type {
  Theme_TabItem_Index_TabItem_AriaLabelledBy,
  Theme_TabItem_Index_TabItem_Hidden,
  Theme_TabItem_Index_TabItem_PanelId,
  Theme_TabItem_Index_TabItem_Props,
  Theme_TabItem_Index_TabItem_Tabs,
} from '../../types/theme/TabItem/index.d.ts';

/**
 * Theme - Tab Item - Tab Item.
 *
 * Renders a tab panel container with a role attribute and hidden
 * state determined by the Tabs context, displaying children
 * content without framework styling.
 *
 * @param {Theme_TabItem_Index_TabItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TabItem(props: Theme_TabItem_Index_TabItem_Props) {
  const tabs: Theme_TabItem_Index_TabItem_Tabs = useTabs();
  const panelId: Theme_TabItem_Index_TabItem_PanelId = `nova-tabpanel-${props['value']}`;
  const ariaLabelledBy: Theme_TabItem_Index_TabItem_AriaLabelledBy = `nova-tab-${props['value']}`;
  const hidden: Theme_TabItem_Index_TabItem_Hidden = props['value'] !== tabs['selectedValue'];

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-tabs-panel ${props['className']}` : 'nova-tabs-panel'}
      style={props['style']}
      id={panelId}
      role="tabpanel"
      aria-labelledby={ariaLabelledBy}
      hidden={hidden}
      data-value={props['value']}
    >
      {props['children']}
    </div>
  );
}

export default TabItem;
