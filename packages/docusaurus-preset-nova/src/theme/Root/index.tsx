import './icons.js';

import type { Theme_Root_Index_Root_Props } from '../../types/theme/Root/index.d.ts';

/**
 * Theme - Root.
 *
 * Wraps the entire Docusaurus application tree as a top-level
 * component, rendering its children without any additional
 * markup or framework-specific styling.
 *
 * @param {Theme_Root_Index_Root_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Root(props: Theme_Root_Index_Root_Props) {
  return (
    <>{props['children']}</>
  );
}

export default Root;
