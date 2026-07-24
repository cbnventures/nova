import { strictEqual } from 'node:assert/strict';

import { afterEach, describe, it } from 'vitest';

import {
  sidebarMobileGetSnapshot,
  sidebarMobileSetOpen,
  sidebarMobileSubscribe,
} from '../../lib/sidebar-mobile-store.js';

import type {
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_ClosesWhenSetOpenIsCalledWithFalse_Snapshot,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesASubscribedListenerWhenTheOpenFlagChanges_Notified,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesASubscribedListenerWhenTheOpenFlagChanges_Unsubscribe,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_First,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_Second,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_UnsubscribeFirst,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_UnsubscribeSecond,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_OpensWhenSetOpenIsCalledWithTrue_Snapshot,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_StartsClosed_Snapshot,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Count,
  Tests_Lib_SidebarMobileStore_SidebarMobileStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Unsubscribe,
} from '../../types/tests/lib/sidebar-mobile-store.test.d.ts';

/**
 * Tests - Lib - Sidebar Mobile Store - Sidebar Mobile Store.
 *
 * @since 0.21.0
 */
describe('sidebar mobile store', () => {
  afterEach(() => {
    sidebarMobileSetOpen(false);

    return;
  });

  it('starts closed', () => {
    const snapshot: Tests_Lib_SidebarMobileStore_SidebarMobileStore_StartsClosed_Snapshot = sidebarMobileGetSnapshot();

    strictEqual(snapshot, false);

    return;
  });

  it('opens when set open is called with true', () => {
    sidebarMobileSetOpen(true);

    const snapshot: Tests_Lib_SidebarMobileStore_SidebarMobileStore_OpensWhenSetOpenIsCalledWithTrue_Snapshot = sidebarMobileGetSnapshot();

    strictEqual(snapshot, true);

    return;
  });

  it('closes when set open is called with false', () => {
    sidebarMobileSetOpen(true);
    sidebarMobileSetOpen(false);

    const snapshot: Tests_Lib_SidebarMobileStore_SidebarMobileStore_ClosesWhenSetOpenIsCalledWithFalse_Snapshot = sidebarMobileGetSnapshot();

    strictEqual(snapshot, false);

    return;
  });

  it('notifies a subscribed listener when the open flag changes', () => {
    let notified: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesASubscribedListenerWhenTheOpenFlagChanges_Notified = false;

    const unsubscribe: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesASubscribedListenerWhenTheOpenFlagChanges_Unsubscribe = sidebarMobileSubscribe(() => {
      notified = true;

      return;
    });

    sidebarMobileSetOpen(true);
    unsubscribe();

    strictEqual(notified, true);

    return;
  });

  it('stops notifying after the unsubscribe function is called', () => {
    let count: Tests_Lib_SidebarMobileStore_SidebarMobileStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Count = 0;

    const unsubscribe: Tests_Lib_SidebarMobileStore_SidebarMobileStore_StopsNotifyingAfterTheUnsubscribeFunctionIsCalled_Unsubscribe = sidebarMobileSubscribe(() => {
      count += 1;

      return;
    });

    unsubscribe();
    sidebarMobileSetOpen(true);

    strictEqual(count, 0);

    return;
  });

  it('notifies every subscribed listener', () => {
    let first: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_First = false;
    let second: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_Second = false;

    const unsubscribeFirst: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_UnsubscribeFirst = sidebarMobileSubscribe(() => {
      first = true;

      return;
    });
    const unsubscribeSecond: Tests_Lib_SidebarMobileStore_SidebarMobileStore_NotifiesEverySubscribedListener_UnsubscribeSecond = sidebarMobileSubscribe(() => {
      second = true;

      return;
    });

    sidebarMobileSetOpen(true);
    unsubscribeFirst();
    unsubscribeSecond();

    strictEqual(first, true);
    strictEqual(second, true);

    return;
  });

  return;
});
