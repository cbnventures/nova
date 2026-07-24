import type {
  Lib_TocCollapsibleStore_TocCollapsibleGetOpenSnapshot_Returns,
  Lib_TocCollapsibleStore_TocCollapsibleGetPayloadSnapshot_Returns,
  Lib_TocCollapsibleStore_TocCollapsibleListeners,
  Lib_TocCollapsibleStore_TocCollapsibleOpen,
  Lib_TocCollapsibleStore_TocCollapsiblePayload,
  Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Returns,
  Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Value,
  Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Returns,
  Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Value,
  Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Listener,
  Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Returns,
} from '../types/lib/toc-collapsible-store.d.ts';

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Open.
 *
 * Module-level open flag that survives the DocItem subtree
 * remount on every doc-to-doc navigation.
 *
 * @since 0.21.0
 */
let tocCollapsibleOpen: Lib_TocCollapsibleStore_TocCollapsibleOpen = false;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Payload.
 *
 * Module-level table-of-contents payload published by the trigger
 * for the current page so the persistent panel host can render the
 * active page's headings across navigation.
 *
 * @since 0.21.0
 */
let tocCollapsiblePayload: Lib_TocCollapsibleStore_TocCollapsiblePayload = undefined;

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Listeners.
 *
 * Registered store listeners notified whenever the open flag
 * or payload changes so subscribed components re-render.
 *
 * @since 0.21.0
 */
const tocCollapsibleListeners: Lib_TocCollapsibleStore_TocCollapsibleListeners = new Set();

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Subscribe.
 *
 * Adds a store listener and returns an unsubscribe function,
 * matching the subscribe contract of `useSyncExternalStore`.
 *
 * @since 0.21.0
 */
export function tocCollapsibleSubscribe(listener: Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Listener): Lib_TocCollapsibleStore_TocCollapsibleSubscribe_Returns {
  tocCollapsibleListeners.add(listener);

  return () => {
    tocCollapsibleListeners.delete(listener);

    return undefined;
  };
}

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Get Open Snapshot.
 *
 * Returns the current open flag as a stable primitive boolean
 * for `useSyncExternalStore` to read on every render.
 *
 * @since 0.21.0
 */
export function tocCollapsibleGetOpenSnapshot(): Lib_TocCollapsibleStore_TocCollapsibleGetOpenSnapshot_Returns {
  return tocCollapsibleOpen;
}

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Get Payload Snapshot.
 *
 * Returns the current payload as a stable object reference for
 * `useSyncExternalStore` to read on every render.
 *
 * @since 0.21.0
 */
export function tocCollapsibleGetPayloadSnapshot(): Lib_TocCollapsibleStore_TocCollapsibleGetPayloadSnapshot_Returns {
  return tocCollapsiblePayload;
}

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Set Open.
 *
 * Updates the module-level open flag and notifies every
 * registered listener so subscribed components re-render.
 *
 * @since 0.21.0
 */
export function tocCollapsibleSetOpen(value: Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Value): Lib_TocCollapsibleStore_TocCollapsibleSetOpen_Returns {
  tocCollapsibleOpen = value;

  tocCollapsibleListeners.forEach((listener) => {
    listener();

    return undefined;
  });

  return undefined;
}

/**
 * Lib - Toc Collapsible Store - Toc Collapsible Set Payload.
 *
 * Replaces the module-level payload with the current page's
 * headings and notifies every registered listener so the
 * persistent panel host renders the active page's headings.
 *
 * @since 0.21.0
 */
export function tocCollapsibleSetPayload(value: Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Value): Lib_TocCollapsibleStore_TocCollapsibleSetPayload_Returns {
  tocCollapsiblePayload = value;

  tocCollapsibleListeners.forEach((listener) => {
    listener();

    return undefined;
  });

  return undefined;
}
