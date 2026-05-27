import type { Lib_Constants_DocsBaseUrl, Lib_Constants_GhMinVersion } from '../types/lib/constants.d.ts';

/**
 * Lib - Constants - Docs Base URL.
 *
 * Canonical origin of the Nova documentation site. Imported anywhere
 * generated content or user-facing strings need to point at the docs.
 *
 * @since 0.16.3
 */
export const LIB_CONSTANTS_DOCS_BASE_URL: Lib_Constants_DocsBaseUrl = 'https://nova.cbnventures.io';

/**
 * Lib - Constants - Lib Gh Min Version.
 *
 * Minimum supported version of the gh CLI for github recipes. 2.40.0 is the
 * lowest version where every flag the recipes use is available — `--enable-discussions`
 * was added in gh 2.40 (late 2023). All other flags have been stable since 2.0.x.
 *
 * @since 0.18.0
 */
export const LIB_GH_MIN_VERSION: Lib_Constants_GhMinVersion = '2.40.0';
