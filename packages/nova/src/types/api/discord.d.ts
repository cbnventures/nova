import type { Shared_DiscordApplication } from '../shared.d.ts';

/**
 * API - Discord - API URL.
 *
 * @since 0.49.0
 */
export type Api_Discord_ApiUrl = string;

/**
 * API - Discord - Fetch Current Application.
 *
 * @since 0.49.0
 */
export type Api_Discord_Runner_FetchCurrentApplication_Token = string;

export type Api_Discord_Runner_FetchCurrentApplication_Returns = Promise<Shared_DiscordApplication>;

export type Api_Discord_Runner_FetchCurrentApplication_Response = Response;

export type Api_Discord_Runner_FetchCurrentApplication_ResponseText = string;

export type Api_Discord_Runner_FetchCurrentApplication_Data = unknown;

export type Api_Discord_Runner_FetchCurrentApplication_Application = Record<string, unknown>;
