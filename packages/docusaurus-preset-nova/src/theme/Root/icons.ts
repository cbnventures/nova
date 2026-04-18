import icIcons from '@iconify-json/ic/icons.json';
import lucideIcons from '@iconify-json/lucide/icons.json';
import mdiIcons from '@iconify-json/mdi/icons.json';
import riIcons from '@iconify-json/ri/icons.json';
import { addCollection } from '@iconify/react/offline';

/**
 * Theme - Root - Icons.
 *
 * Pre-registers all Lucide, MDI, Remix, and IC icon sets so they
 * are bundled and available immediately without fetching from the
 * Iconify API at runtime.
 *
 * @since 0.15.0
 */
addCollection(lucideIcons);
addCollection(mdiIcons);
addCollection(riIcons);
addCollection(icIcons);
