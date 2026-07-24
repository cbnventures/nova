import type { Shared_TocHeading, Shared_TocOverlayPayload } from '../shared.d.ts';

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Open.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleOpen = boolean;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Payload.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsiblePayload_TreeItems = Shared_TocHeading[];

export type Lib_TocCollapsibleStore_TocCollapsiblePayload = {
  treeItems: Lib_TocCollapsibleStore_TocCollapsiblePayload_TreeItems;
} | undefined;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Listeners.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleListeners = Set<() => void>;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Get Open Snapshot.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleGetOpenSnapshot_Returns = boolean;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Get Payload Snapshot.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleGetPayloadSnapshot_Returns = Shared_TocOverlayPayload;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Set Open.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Value = boolean;

export type Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Returns = void;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Set Payload.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Value = Shared_TocOverlayPayload;

export type Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Returns = void;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Subscribe.
 *
 * @since 0.21.0
 */
export type Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Listener = () => void;

export type Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Returns = () => void;
