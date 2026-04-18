import { useTabs } from '@docusaurus/theme-common/internal';

import type {
  ThemeTabItemTabItemAriaLabelledBy,
  ThemeTabItemTabItemHidden,
  ThemeTabItemTabItemPanelId,
  ThemeTabItemTabItemProps,
  ThemeTabItemTabItemTabs,
} from '../../types/theme/TabItem/index.d.ts';

/**
 * Theme - Tab Item - Tab Item.
 *
 * Renders a tab panel container with a role attribute and hidden
 * state determined by the Tabs context, displaying children
 * content without framework styling.
 *
 * @param {ThemeTabItemTabItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TabItem(props: ThemeTabItemTabItemProps) {
  const tabs: ThemeTabItemTabItemTabs = useTabs();
  const panelId: ThemeTabItemTabItemPanelId = `nova-tabpanel-${props['value']}`;
  const ariaLabelledBy: ThemeTabItemTabItemAriaLabelledBy = `nova-tab-${props['value']}`;
  const hidden: ThemeTabItemTabItemHidden = props['value'] !== tabs['selectedValue'];

  return (
    <div className="nova-tabs-panel" id={panelId} role="tabpanel" aria-labelledby={ariaLabelledBy} hidden={hidden} data-value={props['value']}>
      {props['children']}
    </div>
  );
}

export default TabItem;
