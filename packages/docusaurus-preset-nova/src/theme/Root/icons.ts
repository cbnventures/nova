import logosIcons from '@iconify-json/logos/icons.json';
import lucideIcons from '@iconify-json/lucide/icons.json';
import mdiIcons from '@iconify-json/mdi/icons.json';
import openmojiIcons from '@iconify-json/openmoji/icons.json';
import riIcons from '@iconify-json/ri/icons.json';
import simpleIconsIcons from '@iconify-json/simple-icons/icons.json';
import { addCollection } from '@iconify/react/offline';

/**
 * Theme - Root - Icons.
 *
 * Pre-registers Nova's curated Iconify collection set so consumers can
 * reference any icon from these prefixes offline without their own setup:
 * `logos`, `lucide`, `mdi`, `openmoji`, `ri`, `simple-icons`.
 *
 * @since 0.15.0
 */
addCollection(logosIcons);
addCollection(lucideIcons);
addCollection(mdiIcons);
addCollection(openmojiIcons);
addCollection(riIcons);
addCollection(simpleIconsIcons);
