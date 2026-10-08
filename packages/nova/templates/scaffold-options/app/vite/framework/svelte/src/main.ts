import { mount } from 'svelte';

import App from './app.svelte';

/**
 * Main - Root.
 *
 * Finds the generated application mount point.
 * Rendering begins only when the expected element is present.
 *
 * @since 0.0.0
 */
const root = document.querySelector('#app');

if (root !== null) {
  mount(App, {
    target: root,
  });
}
