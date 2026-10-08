import type {
  Index_Handler,
  Index_Handler_Fetch_Request,
  Index_Handler_Fetch_Returns,
  Index_Handler_Fetch_Url,
} from './types/index.d.ts';

/**
 * Index - Handler.
 *
 * Handles incoming Cloudflare Worker requests for the generated project.
 * The starter response provides a healthful base for adding real routes.
 *
 * @since 0.0.0
 */
const handler: Index_Handler = {
  async fetch(request: Index_Handler_Fetch_Request): Index_Handler_Fetch_Returns {
    const url: Index_Handler_Fetch_Url = new URL(request.url);

    if (url.pathname === '/') {
      return new Response(JSON.stringify({ message: 'Welcome to [__PROJECT_SLUG__]' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

export default handler;
