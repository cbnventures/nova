/**
 * Index.
 *
 * @since 0.0.0
 */
export type Worker_Index_Handler_Fetch_Request = Request;

export type Worker_Index_Handler_Fetch_Returns = Promise<Response>;

export type Worker_Index_Handler_Fetch_Url = URL;

/**
 * Index.
 *
 * @since 0.0.0
 */
export type Worker_Index_Handler = {
  fetch(request: Worker_Index_Handler_Fetch_Request): Worker_Index_Handler_Fetch_Returns;
};
