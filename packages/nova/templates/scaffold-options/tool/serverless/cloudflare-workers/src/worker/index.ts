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

    if (url.pathname === '/') {
      return Response.json({ message: 'Welcome to [__PROJECT_SLUG__]' });
    }

    return new Response('Not Found', { status: 404 });
  },
};

export default handler;
