import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

import { MenuBuilder } from './utils/menu-builder';

/**
 * Sidebars.
 *
 * @since 1.0.0
 */
const sidebars: SidebarsConfig = {
  ...MenuBuilder.getSidebars('docs'),
};

export default sidebars;
