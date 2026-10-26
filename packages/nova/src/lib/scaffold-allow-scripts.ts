import type {
  Lib_ScaffoldAllowScripts_Catalog,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScriptEntries,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScripts,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Changed,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Decision,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptEntries,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptNames,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScripts,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageJson,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageName,
  Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Returns,
  Lib_ScaffoldAllowScripts_ProfileDefinitions,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_AllowScripts,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Decision,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageEntries,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageName,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ProfileDefinition,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Profiles,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ResolvedCatalog,
  Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Returns,
} from '../types/lib/scaffold-allow-scripts.d.ts';

/**
 * Lib - Scaffold Allow Scripts - Catalog.
 *
 * Keeps every reviewed lifecycle-script package neutral until a scaffold
 * explicitly selects a profile that needs it.
 *
 * @since 0.34.0
 */
const catalog: Lib_ScaffoldAllowScripts_Catalog = {
  'core-js': 'omit',
  'core-js-pure': 'omit',
  'cpu-features': 'omit',
  'es5-ext': 'omit',
  'esbuild': 'omit',
  'fsevents': 'omit',
  'node-pty': 'omit',
  'sharp': 'omit',
  'ssh2': 'omit',
  'unrs-resolver': 'omit',
  'workerd': 'omit',
};

/**
 * Lib - Scaffold Allow Scripts - Profile Definitions.
 *
 * Maps scaffold capabilities to the lifecycle scripts required by their
 * generated dependency trees. A false value is an intentional block, while an
 * omitted package remains outside the generated policy entirely.
 *
 * @since 0.34.0
 */
const profileDefinitions: Lib_ScaffoldAllowScripts_ProfileDefinitions = {
  'cloudflare': {
    workerd: true,
  },
  'docusaurus': {
    'core-js': true,
    'es5-ext': false,
  },
  'esbuild': {
    esbuild: true,
  },
  'file-watching': {
    fsevents: true,
  },
};

/**
 * Lib - Scaffold Allow Scripts - Merge Scaffold Allow Scripts.
 *
 * Adds missing scaffold decisions to an existing root package.json without
 * overriding decisions the consumer already made.
 *
 * @param {Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageJson}  packageJson  - Package json.
 * @param {Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScripts} allowScripts - Allow scripts.
 *
 * @returns {Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Returns}
 *
 * @since 0.34.0
 */
export function mergeScaffoldAllowScripts(packageJson: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageJson, allowScripts: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScripts): Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Returns {
  const allowScriptEntries: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScriptEntries = Object.entries(allowScripts);

  if (allowScriptEntries.length === 0) {
    return false;
  }

  const existingAllowScripts: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScripts = packageJson['allowScripts'];

  if (existingAllowScripts === undefined) {
    Reflect.set(packageJson, 'allowScripts', { ...allowScripts });

    return true;
  }

  if (
    typeof existingAllowScripts !== 'object'
    || existingAllowScripts === null
    || Array.isArray(existingAllowScripts) === true
  ) {
    return false;
  }

  const existingAllowScriptEntries: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptEntries = Object.entries(existingAllowScripts);
  const existingAllowScriptNames: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptNames = new Set(existingAllowScriptEntries.map((entry) => entry[0]));
  let changed: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Changed = false;

  for (const allowScriptEntry of allowScriptEntries) {
    const packageName: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageName = allowScriptEntry[0];
    const decision: Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Decision = allowScriptEntry[1];

    if (existingAllowScriptNames.has(packageName) === true) {
      continue;
    }

    Reflect.set(existingAllowScripts, packageName, decision);
    changed = true;
  }

  return changed;
}

/**
 * Lib - Scaffold Allow Scripts - Resolve Scaffold Allow Scripts.
 *
 * Applies the selected profiles to the neutral catalog and removes every
 * package that remains omitted.
 *
 * @param {Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Profiles} profiles - Profiles.
 *
 * @returns {Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Returns}
 *
 * @since 0.34.0
 */
export function resolveScaffoldAllowScripts(profiles: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Profiles): Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Returns {
  const resolvedCatalog: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ResolvedCatalog = { ...catalog };

  for (const profile of profiles) {
    const profileDefinition: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ProfileDefinition = profileDefinitions[profile];

    Object.assign(resolvedCatalog, profileDefinition);
  }

  const packageEntries: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageEntries = Object.entries(resolvedCatalog) as Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageEntries;
  const allowScripts: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_AllowScripts = {};

  for (const packageEntry of packageEntries) {
    const packageName: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageName = packageEntry[0];
    const decision: Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Decision = packageEntry[1];

    if (decision === 'omit') {
      continue;
    }

    Reflect.set(allowScripts, packageName, decision);
  }

  return allowScripts;
}
