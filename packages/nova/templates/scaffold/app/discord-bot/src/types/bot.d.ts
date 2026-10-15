import type { Client } from 'discord.js';

/**
 * Bot - Render Setup Instructions.
 *
 * @since 0.0.0
 */
export type Bot_RenderSetupInstructions_Returns = string;

export type Bot_RenderSetupInstructions_Header = string;

/**
 * Bot - Render Status.
 *
 * @since 0.0.0
 */
export type Bot_RenderStatus_Detail = string;

export type Bot_RenderStatus_Returns = string;

export type Bot_RenderStatus_State = string;

/**
 * Bot - Start Bot.
 *
 * @since 0.0.0
 */
export type Bot_StartBot_Client = Client;

export type Bot_StartBot_Header = string;

export type Bot_StartBot_Returns = Promise<Client>;

export type Bot_StartBot_Token = string;
