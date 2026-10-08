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
  root.textContent = '[__WORKSPACE_TITLE__]';
}
