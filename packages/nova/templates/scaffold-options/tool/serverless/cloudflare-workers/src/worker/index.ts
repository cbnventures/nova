import { landingPage } from './landing-page.js';

import type {
  Worker_Index_Handler,
  Worker_Index_Handler_Fetch_Request,
  Worker_Index_Handler_Fetch_Returns,
  Worker_Index_Handler_Fetch_Url,
} from '../types/worker/index.d.ts';

/**
 * Index - Handler.
 *
 * Handles incoming requests for the tool-owned Cloudflare Worker. Add product
 * routes here while the sibling CLI owns local management and deployment.
 *
 * @since 0.0.0
 */
const handler: Worker_Index_Handler = {
  async fetch(request: Worker_Index_Handler_Fetch_Request): Worker_Index_Handler_Fetch_Returns {
    const url: Worker_Index_Handler_Fetch_Url = new URL(request.url);

    if (url.pathname !== '/') {
      return Response.json({
        status: 'error',
        message: 'Not found',
      }, {
        status: 404,
      });
    }

    if (
      request.method !== 'GET'
      && request.method !== 'HEAD'
    ) {
      return Response.json({
        status: 'error',
        message: 'Method not allowed',
      }, {
        status: 405,
        headers: {
          Allow: 'GET, HEAD',
        },
      });
    }

    return landingPage('[__PROJECT_SLUG__]', '[__PROJECT_REPOSITORY__]', request.method === 'HEAD');
  },
};

export default handler;
