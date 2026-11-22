import type { ComponentType, Dispatch } from 'react';

import type {
  Shared_BlockPlaygroundEntry,
  Shared_BlockPlaygroundState,
  Shared_BlockPlaygroundUpdate,
} from '../../shared.d.ts';

/**
 * Theme - Block Playground - Playground State - Compile Playground Code.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Code = string;

export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Scope = Record<string, unknown>;

export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Id = number;

export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Dispatch = Dispatch<Shared_BlockPlaygroundUpdate>;

export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Returns = undefined;

export type Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Component = ComponentType;

/**
 * Theme - Block Playground - Playground State - Create Playground State.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PlaygroundState_CreatePlaygroundState_Returns = Shared_BlockPlaygroundState;

/**
 * Theme - Block Playground - Playground State - Get Playground Display.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_State = Shared_BlockPlaygroundState;

export type Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_Returns = Shared_BlockPlaygroundEntry | undefined;

/**
 * Theme - Block Playground - Playground State - Reduce Playground State.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_State = Shared_BlockPlaygroundState;

export type Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Update = Shared_BlockPlaygroundUpdate;

export type Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Returns = Shared_BlockPlaygroundState;
