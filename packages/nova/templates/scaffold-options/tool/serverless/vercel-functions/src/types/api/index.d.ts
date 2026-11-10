/**
 * Index.
 *
 * @since 0.0.0
 */
export type Api_Index_Handler_Fetch_Request = Request;

export type Api_Index_Handler_Fetch_Returns = Response;

export type Api_Index_Handler_Fetch_Url = URL;

export type Api_Index_Handler_Fetch_RewrittenPath = string | null;

export type Api_Index_Handler_Fetch_Pathname = string;

/**
 * Index.
 *
 * @since 0.0.0
 */
export type Api_Index_Handler = {
  fetch(request: Api_Index_Handler_Fetch_Request): Api_Index_Handler_Fetch_Returns;
};
