import { relative } from 'node:path';

import { findOversizedFiles } from '../../lib/bundle-size.js';

import type {
  Plugins_BundleGuard_Index_BundleGuard_Context,
  Plugins_BundleGuard_Index_BundleGuard_MaxBundleFileSize,
  Plugins_BundleGuard_Index_BundleGuard_Options,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_Header,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_MaxBytes,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_Message,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_OutDir,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_OversizedFiles,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_Props,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_RelativeFiles,
  Plugins_BundleGuard_Index_BundleGuard_PostBuild_Returns,
  Plugins_BundleGuard_Index_BundleGuard_Returns,
} from '../../types/plugins/bundle-guard/index.d.ts';

const defaultMaxBundleFileSize = 3;

const bytesPerMebibyte = 1024 * 1024;

/**
 * Plugins - Bundle Guard - Bundle Guard.
 *
 * Docusaurus plugin that fails the production build if any emitted JavaScript
 * bundle file is larger than the configured limit, catching bundle-size
 * regressions long before they reach a host or hurt load performance.
 *
 * @param {Plugins_BundleGuard_Index_BundleGuard_Context} _context - _context.
 * @param {Plugins_BundleGuard_Index_BundleGuard_Options} options  - Options.
 *
 * @returns {Plugins_BundleGuard_Index_BundleGuard_Returns}
 *
 * @since 0.19.0
 */
export function bundleGuard(_context: Plugins_BundleGuard_Index_BundleGuard_Context, options: Plugins_BundleGuard_Index_BundleGuard_Options): Plugins_BundleGuard_Index_BundleGuard_Returns {
  const maxBundleFileSize: Plugins_BundleGuard_Index_BundleGuard_MaxBundleFileSize = options['maxBundleFileSize'] ?? defaultMaxBundleFileSize;

  return {
    name: '@cbnventures/docusaurus-preset-nova-bundle-guard',
    postBuild(props: Plugins_BundleGuard_Index_BundleGuard_PostBuild_Props): Plugins_BundleGuard_Index_BundleGuard_PostBuild_Returns {
      if (maxBundleFileSize === false) {
        return;
      }

      const maxBytes: Plugins_BundleGuard_Index_BundleGuard_PostBuild_MaxBytes = maxBundleFileSize * bytesPerMebibyte;
      const outDir: Plugins_BundleGuard_Index_BundleGuard_PostBuild_OutDir = props['outDir'];
      const oversizedFiles: Plugins_BundleGuard_Index_BundleGuard_PostBuild_OversizedFiles = findOversizedFiles(outDir, maxBytes);

      if (oversizedFiles.length > 0) {
        const relativeFiles: Plugins_BundleGuard_Index_BundleGuard_PostBuild_RelativeFiles = oversizedFiles.map((file) => relative(outDir, file));
        const header: Plugins_BundleGuard_Index_BundleGuard_PostBuild_Header = `Bundle size guard: ${oversizedFiles.length} JavaScript file(s) exceed the ${maxBundleFileSize} MiB limit (set via the "maxBundleFileSize" preset option, or pass false to disable). Oversized files:`;
        const message: Plugins_BundleGuard_Index_BundleGuard_PostBuild_Message = [
          header,
          ...relativeFiles,
        ].join('\n');

        throw new Error(message);
      }

      return;
    },
  };
}

export default bundleGuard;
