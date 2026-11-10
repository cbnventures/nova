import { landingPage } from '../src/function/landing-page.js';

import type {
  Api_Index_Handler,
  Api_Index_Handler_Fetch_Pathname,
  Api_Index_Handler_Fetch_Request,
  Api_Index_Handler_Fetch_RewrittenPath,
  Api_Index_Handler_Fetch_Url,
} from '../src/types/api/index.d.ts';

/**
 * Index - Handler.
 *
 * Handles incoming requests for the tool-owned Vercel Function. Add product
 * routes here while the sibling CLI owns local management and deployment.
 *
 * @since 0.0.0
 */
const handler: Api_Index_Handler = {
  fetch(request: Api_Index_Handler_Fetch_Request) {
    const url: Api_Index_Handler_Fetch_Url = new URL(request.url);
    const rewrittenPath: Api_Index_Handler_Fetch_RewrittenPath = url.searchParams.get('path');
    const pathname: Api_Index_Handler_Fetch_Pathname = (rewrittenPath === null) ? url.pathname : `/${rewrittenPath}`;

    if (
      pathname !== '/'
      && pathname !== '/api'
      && pathname !== '/api/'
    ) {
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
