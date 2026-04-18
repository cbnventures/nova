import './icons.js';

import type { ThemeRootProps } from '../../types/theme/Root/index.d.ts';

/**
 * Theme - Root.
 *
 * Wraps the entire Docusaurus application tree as a top-level
 * component, rendering its children without any additional
 * markup or framework-specific styling.
 *
 * @param {ThemeRootProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Root(props: ThemeRootProps) {
  return (
    <>{props['children']}</>
  );
}

export default Root;
