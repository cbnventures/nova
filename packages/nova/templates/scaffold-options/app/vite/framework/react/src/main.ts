import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app.js';

/**
 * Main - Root.
 *
 * Finds the generated application mount point.
 * Rendering begins only when the expected element is present.
 *
 * @since 0.0.0
 */
const root = document.querySelector<HTMLDivElement>('#app');

if (root !== null) {
  createRoot(root).render(createElement(StrictMode, undefined, createElement(App)));
}
