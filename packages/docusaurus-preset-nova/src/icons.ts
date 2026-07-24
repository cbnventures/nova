import { addCollection } from '@iconify/react/offline';

import type {
  Icons_RegisterIcons_Collections,
  Icons_RegisterIcons_Returns,
} from './types/icons.d.ts';

/**
 * Icons - Register Icons.
 *
 * Registers the generated icon collections from inside this package, so the
 * Iconify runtime holding them is always the same instance the theme
 * components render with.
 *
 * @param {Icons_RegisterIcons_Collections} collections - Collections.
 *
 * @returns {Icons_RegisterIcons_Returns}
 *
 * @since 0.21.0
 */
export function registerIcons(collections: Icons_RegisterIcons_Collections): Icons_RegisterIcons_Returns {
  for (const collection of collections) {
    addCollection(collection);
  }

  return;
}
