/**
 * Index - Handler - Fetch.
 *
 * @since 0.0.0
 */
export type Index_Handler_Fetch_Request = Request;

export type Index_Handler_Fetch_Returns = Promise<Response>;

export type Index_Handler_Fetch_Url = URL;

/**
 * Index - Handler.
 *
 * @since 0.0.0
 */
export type Index_Handler = {
  fetch(request: Index_Handler_Fetch_Request): Index_Handler_Fetch_Returns;
};
