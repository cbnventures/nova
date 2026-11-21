import { readPackageJsonFile } from './package-files.js';

import type {
  Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Input,
  Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Output,
  Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Returns,
  Lib_ScaffoldVersions_Entries,
  Lib_ScaffoldVersions_GetScaffoldVersion_Entry,
  Lib_ScaffoldVersions_GetScaffoldVersion_Key,
  Lib_ScaffoldVersions_GetScaffoldVersion_Returns,
  Lib_ScaffoldVersions_ScaffoldVersionCatalog,
} from '../types/lib/scaffold-versions.d.ts';

/**
 * Lib - Scaffold Versions - Scaffold Version Catalog.
 *
 * Reads the checked-in "scaffold-versions.json" snapshot from the package root, which
 * npm publishes next to the build output.
 *
 * @since 0.49.0
 */
const scaffoldVersionCatalog: Lib_ScaffoldVersions_ScaffoldVersionCatalog = readPackageJsonFile('scaffold-versions.json') as Lib_ScaffoldVersions_ScaffoldVersionCatalog;

/**
 * Lib - Scaffold Versions - Entries.
 *
 * Provides the typed view of the checked-in JSON snapshot used by both
 * scaffold templates and programmatically assembled generated files.
 *
 * @since 0.32.0
 */
const entries: Lib_ScaffoldVersions_Entries = scaffoldVersionCatalog['entries'];

/**
 * Lib - Scaffold Versions - Apply Scaffold Version Replacements.
 *
 * Resolves Nova's tested dependency and platform snapshot inside scaffold and
 * generator templates without making network requests during generation.
 *
 * @param {Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Input} input - Input.
 *
 * @returns {Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Returns}
 *
 * @since 0.32.0
 */
export function applyScaffoldVersionReplacements(input: Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Input): Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Returns {
  let output: Lib_ScaffoldVersions_ApplyScaffoldVersionReplacements_Output = input;

  for (const entry of Object.values(entries)) {
    output = output.replaceAll(entry['placeholder'], entry['value']);
  }

  return output;
}

/**
 * Lib - Scaffold Versions - Get Scaffold Version.
 *
 * Reads one value from the bundled, tested scaffold snapshot for generated
 * content that is assembled in code instead of copied from a template.
 *
 * @param {Lib_ScaffoldVersions_GetScaffoldVersion_Key} key - Key.
 *
 * @returns {Lib_ScaffoldVersions_GetScaffoldVersion_Returns}
 *
 * @since 0.32.0
 */
export function getScaffoldVersion(key: Lib_ScaffoldVersions_GetScaffoldVersion_Key): Lib_ScaffoldVersions_GetScaffoldVersion_Returns {
  const entry: Lib_ScaffoldVersions_GetScaffoldVersion_Entry = entries[key];

  if (entry === undefined) {
    throw new Error(`Unknown scaffold version catalog key: ${key}`);
  }

  return entry['value'];
}
