import { strictEqual } from 'node:assert/strict';

import { afterEach, describe, it } from 'vitest';

import {
  tocCollapsibleGetOpenSnapshot,
  tocCollapsibleGetPayloadSnapshot,
  tocCollapsibleSetOpen,
  tocCollapsibleSetPayload,
  tocCollapsibleSubscribe,
} from '../../lib/toc-collapsible-store.js';

import type {
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ClearsThePayloadWhenSetWithUndefined_IsCleared,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_NotifiesASubscribedListenerOnOpenAndOnPayloadChanges_Count,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_NotifiesASubscribedListenerOnOpenAndOnPayloadChanges_Unsubscribe,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ReflectsTheOpenFlagAfterSetOpen_Open,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ReturnsTheStoredPayload_WasStored,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StartsWithAnUndefinedPayload_IsUndefined,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StartsWithTheOverlayClosed_Open,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Count,
  Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Unsubscribe,
} from '../../types/tests/lib/toc-collapsible-store.test.d.ts';

/**
 * Tests - Lib - Toc Collapsible Store - Toc Collapsible Store.
 *
 * @since 0.21.0
 */
describe('toc collapsible store', () => {
  afterEach(() => {
    tocCollapsibleSetOpen(false);
    tocCollapsibleSetPayload(undefined);

    return;
  });

  it('starts with the overlay closed', () => {
    const open: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StartsWithTheOverlayClosed_Open = tocCollapsibleGetOpenSnapshot();

    strictEqual(open, false);

    return;
  });

  it('starts with an undefined payload', () => {
    const isUndefined: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StartsWithAnUndefinedPayload_IsUndefined = tocCollapsibleGetPayloadSnapshot() === undefined;

    strictEqual(isUndefined, true);

    return;
  });

  it('reflects the open flag after set open', () => {
    tocCollapsibleSetOpen(true);

    const open: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ReflectsTheOpenFlagAfterSetOpen_Open = tocCollapsibleGetOpenSnapshot();

    strictEqual(open, true);

    return;
  });

  it('returns the stored payload', () => {
    tocCollapsibleSetPayload({ treeItems: [] });

    const wasStored: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ReturnsTheStoredPayload_WasStored = tocCollapsibleGetPayloadSnapshot() !== undefined;

    strictEqual(wasStored, true);

    return;
  });

  it('clears the payload when set with undefined', () => {
    tocCollapsibleSetPayload({ treeItems: [] });
    tocCollapsibleSetPayload(undefined);

    const isCleared: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_ClearsThePayloadWhenSetWithUndefined_IsCleared = tocCollapsibleGetPayloadSnapshot() === undefined;

    strictEqual(isCleared, true);

    return;
  });

  it('notifies a subscribed listener on open and on payload changes', () => {
    let count: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_NotifiesASubscribedListenerOnOpenAndOnPayloadChanges_Count = 0;

    const unsubscribe: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_NotifiesASubscribedListenerOnOpenAndOnPayloadChanges_Unsubscribe = tocCollapsibleSubscribe(() => {
      count += 1;

      return;
    });

    tocCollapsibleSetOpen(true);
    tocCollapsibleSetPayload({ treeItems: [] });
    unsubscribe();

    strictEqual(count, 2);

    return;
  });

  it('stops notifying after the unsubscribe function is called', () => {
    let count: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Count = 0;

    const unsubscribe: Tests_Lib_TocCollapsibleStore_TocCollapsibleStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Unsubscribe = tocCollapsibleSubscribe(() => {
      count += 1;

      return;
    });

    unsubscribe();
    tocCollapsibleSetOpen(true);

    strictEqual(count, 0);

    return;
  });

  return;
});
