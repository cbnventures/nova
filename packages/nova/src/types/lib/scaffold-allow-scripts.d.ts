/**
 * Lib - Scaffold Allow Scripts.
 *
 * @since 0.34.0
 */
export type Lib_ScaffoldAllowScripts_Catalog = Record<'core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd', boolean | 'omit'>;

export type Lib_ScaffoldAllowScripts_ProfileDefinitions = Record<'cloudflare' | 'docusaurus' | 'esbuild' | 'file-watching', Partial<Record<'core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd', boolean>>>;

/**
 * Lib - Scaffold Allow Scripts - Merge Scaffold Allow Scripts.
 *
 * @since 0.34.0
 */
export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageJson = Record<string, unknown>;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScripts = Record<string, boolean>;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Returns = boolean;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_AllowScriptEntries = [string, boolean][];

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScripts = unknown;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptEntries = [string, unknown][];

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_ExistingAllowScriptNames = Set<string>;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Changed = boolean;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_PackageName = string;

export type Lib_ScaffoldAllowScripts_MergeScaffoldAllowScripts_Decision = boolean;

/**
 * Lib - Scaffold Allow Scripts - Resolve Scaffold Allow Scripts.
 *
 * @since 0.34.0
 */
export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Profiles = ('cloudflare' | 'docusaurus' | 'esbuild' | 'file-watching')[];

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Returns = Record<string, boolean>;

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ResolvedCatalog = Record<'core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd', boolean | 'omit'>;

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_ProfileDefinition = Partial<Record<'core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd', boolean>>;

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageEntries = ['core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd', boolean | 'omit'][];

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_AllowScripts = Record<string, boolean>;

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_PackageName = 'core-js' | 'core-js-pure' | 'cpu-features' | 'es5-ext' | 'esbuild' | 'fsevents' | 'node-pty' | 'sharp' | 'ssh2' | 'unrs-resolver' | 'workerd';

export type Lib_ScaffoldAllowScripts_ResolveScaffoldAllowScripts_Decision = boolean | 'omit';
