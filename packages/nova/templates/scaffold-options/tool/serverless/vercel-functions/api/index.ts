import type {
  Api_Index_Get_Request,
  Api_Index_Get_Returns,
} from '../src/types/api/index.d.ts';

/**
 * Index - Get.
 *
 * Handles the starter Vercel Function route through the web-standard Request
 * and Response APIs. Add product routes beside this file as the tool grows.
 *
 * @param {Api_Index_Get_Request} _request - Request.
 *
 * @returns {Api_Index_Get_Returns}
 *
 * @since 0.0.0
 */
export function GET(_request: Api_Index_Get_Request): Api_Index_Get_Returns {
  return Response.json({ message: 'Welcome to [__PROJECT_SLUG__]' });
}
