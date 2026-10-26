/**
 * Lib - Package Scripts.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_CanonicalGroupOrder = readonly [
  'dev',
  'prod',
  'check',
  'build',
  'deploy',
  'clean',
];

export type Lib_PackageScripts_CanonicalSingletonOrder = readonly [
  'changelog',
  'recipes',
];

export type Lib_PackageScripts_OptionalGroupOrder = readonly ['i18n'];

export type Lib_PackageScripts_RequiredRootScriptOrder = readonly [
  'dev',
  'prod',
  'check',
  'build',
  'deploy',
  'clean',
  'changelog',
  'recipes',
];

export type Lib_PackageScripts_NpmLifecycleOrder = readonly [
  'preinstall',
  'install',
  'postinstall',
  'prepublish',
  'preprepare',
  'prepare',
  'postprepare',
  'prepack',
  'postpack',
  'prepublishOnly',
  'publish',
  'postpublish',
  'preversion',
  'version',
  'postversion',
  'dependencies',
];

export type Lib_PackageScripts_ForbiddenTopLevelScripts = readonly [
  'develop',
  'development',
  'production',
  'run',
  'serve',
  'start',
  'preview',
  'watch',
  'lint',
  'test',
  'type-check',
  'typecheck',
  'coverage',
  'bundle',
  'compile',
  'generate',
  'package',
  'transpile',
  'fix',
  'format',
  'release',
];

export type Lib_PackageScripts_ForbiddenTopLevelScript = Lib_PackageScripts_ForbiddenTopLevelScripts[number];

export type Lib_PackageScripts_ForbiddenTopLevelScriptRecommendations = Record<Lib_PackageScripts_ForbiddenTopLevelScript, string>;

export type Lib_PackageScripts_OrderedScripts = Record<string, unknown>;

export type Lib_PackageScripts_HandledScripts = Set<string>;

export type Lib_PackageScripts_Scripts = Record<string, unknown>;

export type Lib_PackageScripts_ScriptName = string;

export type Lib_PackageScripts_HookPrefixes = ('pre' | 'post')[];

export type Lib_PackageScripts_ScriptHookTarget = string;

export type Lib_PackageScripts_ScriptNames = string[];

export type Lib_PackageScripts_ScriptGroup = string;

export type Lib_PackageScripts_CustomScriptGroupRoots = string[];

export type Lib_PackageScripts_CustomScriptGroupRootSet = Set<string>;

export type Lib_PackageScripts_NpmLifecycleScript = Lib_PackageScripts_NpmLifecycleOrder[number];

export type Lib_PackageScripts_ScriptGroupRoot = string;

export type Lib_PackageScripts_Options_RequireRootScripts = boolean;

export type Lib_PackageScripts_Options_RequireI18n = boolean;

export type Lib_PackageScripts_Options = {
  requireRootScripts?: Lib_PackageScripts_Options_RequireRootScripts;
  requireI18n?: Lib_PackageScripts_Options_RequireI18n;
};

export type Lib_PackageScripts_Violations = string[];

export type Lib_PackageScripts_ActualScriptNames = string[];

export type Lib_PackageScripts_ExpectedScriptNames = string[];

export type Lib_PackageScripts_HookTarget = string | undefined;

export type Lib_PackageScripts_HasChildScript = boolean;

export type Lib_PackageScripts_IsTreeDispatcher = boolean;

/**
 * Lib - Package Scripts - Add Script.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_AddScript_Returns = void;

/**
 * Lib - Package Scripts - Add Script Group.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_AddScriptGroup_Returns = void;

/**
 * Lib - Package Scripts - Add Script With Hooks.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_AddScriptWithHooks_Returns = void;

/**
 * Lib - Package Scripts - Find Package Script Contract Violations.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_FindPackageScriptContractViolations_Returns = string[];

export type Lib_PackageScripts_FindPackageScriptContractViolations_Recommendation = string;

/**
 * Lib - Package Scripts - Get Custom Script Group Roots.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_GetCustomScriptGroupRoots_Returns = string[];

/**
 * Lib - Package Scripts - Get Hook Target.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_GetHookTarget_Returns = string | undefined;

/**
 * Lib - Package Scripts - Order Package Scripts.
 *
 * @since 0.32.0
 */
export type Lib_PackageScripts_OrderPackageScripts_Returns = Record<string, unknown>;
