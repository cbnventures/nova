import type {
  ComponentProps,
  Dispatch,
  MouseEvent,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import type { Editor } from 'react-live';

import type {
  Shared_BlockPlaygroundEntry,
  Shared_BlockPlaygroundState,
  Shared_BlockPlaygroundUpdate,
} from '../../shared.d.ts';

/**
 * Theme - Block Playground - Runtime.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_PlaygroundScope = Record<string, unknown>;

export type Theme_BlockPlayground_Runtime_PlaygroundEditorTheme = NonNullable<ComponentProps<typeof Editor>['theme']>;

/**
 * Theme - Block Playground - Runtime - Block Link Navigation.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockLinkNavigation_Event = MouseEvent<HTMLDivElement>;

export type Theme_BlockPlayground_Runtime_BlockLinkNavigation_Returns = undefined;

export type Theme_BlockPlayground_Runtime_BlockLinkNavigation_Target = EventTarget;

export type Theme_BlockPlayground_Runtime_BlockLinkNavigation_Link = Element | null;

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props_Code = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props = {
  code: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props_Code;
};

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PlaygroundReducer = [Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_State, Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Dispatch];

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_State = Shared_BlockPlaygroundState;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Dispatch = Dispatch<Shared_BlockPlaygroundUpdate>;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_NextIdRef = RefObject<number>;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Display = Shared_BlockPlaygroundEntry | undefined;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Rendered = ReactElement | null;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCountState = [Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount, Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetResetCount];

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount = number;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetResetCount = Dispatch<SetStateAction<Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount>>;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_LiveEditorLabel = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetLabel = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetAriaLabel = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewLabel = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewAriaLabel = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpenState = [Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen, Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetPreviewOpen];

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen = boolean;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetPreviewOpen = Dispatch<SetStateAction<Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen>>;

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Change.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_NextCode = string;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Returns = undefined;

export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Id = number;

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Close Preview.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleClosePreview_Returns = undefined;

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Open Preview.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleOpenPreview_Returns = undefined;

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Reset.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleReset_Returns = undefined;
