import type {
  Lib_SidebarMobileStore_SidebarMobileGetSnapshot_Returns,
  Lib_SidebarMobileStore_SidebarMobileListeners,
  Lib_SidebarMobileStore_SidebarMobileOpen,
  Lib_SidebarMobileStore_SidebarMobileSetOpen_Returns,
  Lib_SidebarMobileStore_SidebarMobileSetOpen_Value,
  Lib_SidebarMobileStore_SidebarMobileSubscribe_Listener,
  Lib_SidebarMobileStore_SidebarMobileSubscribe_Returns,
} from '../types/lib/sidebar-mobile-store.d.ts';

/**
 * Lib - Sidebar Mobile Store - Sidebar Mobile Open.
 *
 * Module-level open flag that survives the DocItem subtree
 * remount on every doc-to-doc navigation.
 *
 * @since 0.21.0
 */
let sidebarMobileOpen: Lib_SidebarMobileStore_SidebarMobileOpen = false;

/**
 * Lib - Sidebar Mobile Store - Sidebar Mobile Listeners.
 *
 * Registered store listeners notified whenever the open flag
 * changes so subscribed components re-render.
 *
 * @since 0.21.0
 */
const sidebarMobileListeners: Lib_SidebarMobileStore_SidebarMobileListeners = new Set();

/**
 * Lib - Sidebar Mobile Store - Sidebar Mobile Subscribe.
 *
 * Adds a store listener and returns an unsubscribe function,
 * matching the subscribe contract of `useSyncExternalStore`.
 *
 * @since 0.21.0
 */
export function sidebarMobileSubscribe(listener: Lib_SidebarMobileStore_SidebarMobileSubscribe_Listener): Lib_SidebarMobileStore_SidebarMobileSubscribe_Returns {
  sidebarMobileListeners.add(listener);

  return () => {
    sidebarMobileListeners.delete(listener);

    return undefined;
  };
}

/**
 * Lib - Sidebar Mobile Store - Sidebar Mobile Get Snapshot.
 *
 * Returns the current open flag as a stable primitive boolean
 * for `useSyncExternalStore` to read on every render.
 *
 * @since 0.21.0
 */
export function sidebarMobileGetSnapshot(): Lib_SidebarMobileStore_SidebarMobileGetSnapshot_Returns {
  return sidebarMobileOpen;
}

/**
 * Lib - Sidebar Mobile Store - Sidebar Mobile Set Open.
 *
 * Updates the module-level open flag and notifies every
 * registered listener so subscribed components re-render.
 *
 * @since 0.21.0
 */
export function sidebarMobileSetOpen(value: Lib_SidebarMobileStore_SidebarMobileSetOpen_Value): Lib_SidebarMobileStore_SidebarMobileSetOpen_Returns {
  sidebarMobileOpen = value;

  sidebarMobileListeners.forEach((listener) => {
    listener();

    return undefined;
  });

  return undefined;
}
