import { [__WORKSPACE_IDENTIFIER__]Platform } from './platform.js';

import type {
  Index_Initialize_Api,
  Index_Initialize_Returns,
} from './types/index.d.ts';

/**
 * Index - Initialize.
 *
 * Registers the generated dynamic platform when Homebridge loads the plugin.
 * This function is the package entry point referenced by Homebridge.
 *
 * @param {Index_Initialize_Api} api - Api.
 *
 * @returns {Index_Initialize_Returns}
 *
 * @since 0.0.0
 */
function initialize(api: Index_Initialize_Api): Index_Initialize_Returns {
  api.registerPlatform('[__WORKSPACE_IDENTIFIER__]', [__WORKSPACE_IDENTIFIER__]Platform);

  return;
}

export default initialize;
