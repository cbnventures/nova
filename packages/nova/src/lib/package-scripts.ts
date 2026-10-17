import type {
  Lib_PackageScripts_ActualScriptNames,
  Lib_PackageScripts_AddScript_Returns,
  Lib_PackageScripts_AddScriptGroup_Returns,
  Lib_PackageScripts_AddScriptWithHooks_Returns,
  Lib_PackageScripts_CanonicalGroupOrder,
  Lib_PackageScripts_CanonicalSingletonOrder,
  Lib_PackageScripts_CustomScriptGroupRoots,
  Lib_PackageScripts_CustomScriptGroupRootSet,
  Lib_PackageScripts_ExpectedScriptNames,
  Lib_PackageScripts_FindPackageScriptContractViolations_Recommendation,
  Lib_PackageScripts_FindPackageScriptContractViolations_Returns,
  Lib_PackageScripts_ForbiddenTopLevelScriptRecommendations,
  Lib_PackageScripts_ForbiddenTopLevelScripts,
  Lib_PackageScripts_GetCustomScriptGroupRoots_Returns,
  Lib_PackageScripts_GetHookTarget_Returns,
  Lib_PackageScripts_HandledScripts,
  Lib_PackageScripts_HasChildScript,
  Lib_PackageScripts_HookPrefixes,
  Lib_PackageScripts_HookTarget,
  Lib_PackageScripts_NpmLifecycleOrder,
  Lib_PackageScripts_NpmLifecycleScript,
  Lib_PackageScripts_OptionalGroupOrder,
  Lib_PackageScripts_Options,
  Lib_PackageScripts_OrderedScripts,
  Lib_PackageScripts_OrderPackageScripts_Returns,
  Lib_PackageScripts_RequiredRootScriptOrder,
  Lib_PackageScripts_ScriptGroup,
  Lib_PackageScripts_ScriptGroupRoot,
  Lib_PackageScripts_ScriptHookTarget,
  Lib_PackageScripts_ScriptName,
  Lib_PackageScripts_ScriptNames,
  Lib_PackageScripts_Scripts,
  Lib_PackageScripts_Violations,
} from '../types/lib/package-scripts.d.ts';

/**
 * Lib - Package Scripts - Package Script Canonical Group Order.
 *
 * Defines Nova's required development-first command families. Child commands
 * retain their authored order inside each family.
 *
 * @since UNRELEASED
 */
export const packageScriptCanonicalGroupOrder: Lib_PackageScripts_CanonicalGroupOrder = [
  'dev',
  'prod',
  'check',
  'build',
  'deploy',
  'clean',
];

/**
 * Lib - Package Scripts - Package Script Canonical Singleton Order.
 *
 * Keeps changelog and recipe maintenance immediately after the six standard
 * lifecycle families because neither command dispatches a child namespace.
 *
 * @since UNRELEASED
 */
export const packageScriptCanonicalSingletonOrder: Lib_PackageScripts_CanonicalSingletonOrder = [
  'changelog',
  'recipes',
];

/**
 * Lib - Package Scripts - Package Script Optional Group Order.
 *
 * Places framework-specific families after the universal repository commands
 * while keeping them ahead of project-specific utilities.
 *
 * @since UNRELEASED
 */
export const packageScriptOptionalGroupOrder: Lib_PackageScripts_OptionalGroupOrder = ['i18n'];

/**
 * Lib - Package Scripts - Package Script Required Root Order.
 *
 * Lists the repository-level commands every Nova project root exposes so checks
 * can distinguish root coordination from optional workspace phases.
 *
 * @since UNRELEASED
 */
export const packageScriptRequiredRootOrder: Lib_PackageScripts_RequiredRootScriptOrder = [
  'dev',
  'prod',
  'check',
  'build',
  'deploy',
  'clean',
  'changelog',
  'recipes',
];

/**
 * Lib - Package Scripts - Package Script npm Lifecycle Order.
 *
 * Keeps npm-owned installation, preparation, packaging, publishing, versioning,
 * and dependency hooks at the end of the scripts object without changing how npm
 * invokes them.
 *
 * @since UNRELEASED
 */
export const packageScriptNpmLifecycleOrder: Lib_PackageScripts_NpmLifecycleOrder = [
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

/**
 * Lib - Package Scripts - Package Script Forbidden Top Level Scripts.
 *
 * Prevents phase-less aliases from bypassing Nova's development, production,
 * check, build, recipe, and deployment command families. Exact project-specific
 * commands remain valid when they describe a distinct capability.
 *
 * @since UNRELEASED
 */
export const packageScriptForbiddenTopLevelScripts: Lib_PackageScripts_ForbiddenTopLevelScripts = [
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

/**
 * Lib - Package Scripts - Package Script Forbidden Top Level Script Recommendations.
 *
 * Explains why each phase-less alias is ambiguous and names the explicit Nova
 * family or project capability that should replace it.
 *
 * @since UNRELEASED
 */
export const packageScriptForbiddenTopLevelScriptRecommendations: Lib_PackageScripts_ForbiddenTopLevelScriptRecommendations = {
  'develop': 'Development execution belongs to the "dev" family; use "dev" or a descriptive "dev:*" child.',
  'development': 'Development execution belongs to the "dev" family; use "dev" or a descriptive "dev:*" child.',
  'production': 'Compiled production execution belongs to the "prod" family; use "prod" or a descriptive "prod:*" child.',
  'run': 'The command does not identify what runs; use a distinct project capability or scope it under "dev:*" or "prod:*".',
  'serve': 'Serving must identify source or compiled output; use "dev:serve" or "prod:serve".',
  'start': 'Starting must identify source or compiled output; use "dev:start" or "prod:start".',
  'preview': 'A preview serves compiled output; use "prod:preview".',
  'watch': 'Watch mode operates on source; use "dev:watch".',
  'lint': 'Linting is a quality gate; use "check:lint".',
  'test': 'Tests are quality gates; use "check:test".',
  'type-check': 'Type validation is a quality gate; use "check:types".',
  'typecheck': 'Type validation is a quality gate; use "check:types".',
  'coverage': 'Coverage is a verification report; use "check:coverage" or a specific family such as "i18n:coverage".',
  'bundle': 'Bundling creates an artifact; use "build:bundle".',
  'compile': 'Compilation creates an artifact; use "build:compile".',
  'generate': 'Generation must name its owner; use a command such as "dev:project", "build:generate", "check:generate-types", "i18n:sync", or "recipes:*".',
  'package': 'Packaging creates an artifact; use "build:package".',
  'transpile': 'Transpilation creates an artifact; use "build:transpile".',
  'fix': 'A mutating fix belongs to "recipes:*"; a verification-only form belongs to "check:*".',
  'format': 'Mutating formatting belongs to "recipes:format"; verification-only formatting belongs to "check:format".',
  'release': 'Version preparation belongs to "changelog", while publication belongs to "deploy:*".',
};

/**
 * Lib - Package Scripts - Add Script.
 *
 * Adds one existing script once while preserving its original command value.
 * The handled set prevents hooks and grouped children from being emitted twice.
 *
 * @param {Lib_PackageScripts_OrderedScripts}  orderedScripts - Ordered scripts.
 * @param {Lib_PackageScripts_HandledScripts}  handledScripts - Handled scripts.
 * @param {Lib_PackageScripts_Scripts}         scripts        - Scripts.
 * @param {Lib_PackageScripts_ScriptName}      scriptName     - Script name.
 *
 * @private
 *
 * @returns {Lib_PackageScripts_AddScript_Returns}
 *
 * @since UNRELEASED
 */
function addScript(orderedScripts: Lib_PackageScripts_OrderedScripts, handledScripts: Lib_PackageScripts_HandledScripts, scripts: Lib_PackageScripts_Scripts, scriptName: Lib_PackageScripts_ScriptName): Lib_PackageScripts_AddScript_Returns {
  if (
    handledScripts.has(scriptName) === true
    || Reflect.has(scripts, scriptName) === false
  ) {
    return;
  }

  Reflect.set(orderedScripts, scriptName, scripts[scriptName]);

  handledScripts.add(scriptName);

  return;
}

/**
 * Lib - Package Scripts - Get Hook Target.
 *
 * Recognizes a `pre` or `post` script only when its target script exists. This
 * keeps ordinary names such as `preview` from being mistaken for lifecycle hooks.
 *
 * @param {Lib_PackageScripts_ScriptName} scriptName - Script name.
 * @param {Lib_PackageScripts_Scripts}    scripts    - Scripts.
 *
 * @private
 *
 * @returns {Lib_PackageScripts_GetHookTarget_Returns}
 *
 * @since UNRELEASED
 */
function getHookTarget(scriptName: Lib_PackageScripts_ScriptName, scripts: Lib_PackageScripts_Scripts): Lib_PackageScripts_GetHookTarget_Returns {
  const hookPrefixes: Lib_PackageScripts_HookPrefixes = [
    'pre',
    'post',
  ];

  for (const hookPrefix of hookPrefixes) {
    if (scriptName.startsWith(hookPrefix) === false) {
      continue;
    }

    const scriptHookTarget: Lib_PackageScripts_ScriptHookTarget = scriptName.slice(hookPrefix.length);

    if (
      scriptHookTarget.length > 0
      && Reflect.has(scripts, scriptHookTarget) === true
    ) {
      return scriptHookTarget;
    }
  }

  return undefined;
}

/**
 * Lib - Package Scripts - Add Script With Hooks.
 *
 * Keeps npm's implicit pre/base/post execution sequence visible in the manifest
 * without running any hook directly from Nova's dispatcher.
 *
 * @param {Lib_PackageScripts_OrderedScripts} orderedScripts - Ordered scripts.
 * @param {Lib_PackageScripts_HandledScripts} handledScripts - Handled scripts.
 * @param {Lib_PackageScripts_Scripts}        scripts        - Scripts.
 * @param {Lib_PackageScripts_ScriptName}     scriptName     - Script name.
 *
 * @private
 *
 * @returns {Lib_PackageScripts_AddScriptWithHooks_Returns}
 *
 * @since UNRELEASED
 */
function addScriptWithHooks(orderedScripts: Lib_PackageScripts_OrderedScripts, handledScripts: Lib_PackageScripts_HandledScripts, scripts: Lib_PackageScripts_Scripts, scriptName: Lib_PackageScripts_ScriptName): Lib_PackageScripts_AddScriptWithHooks_Returns {
  addScript(orderedScripts, handledScripts, scripts, `pre${scriptName}`);
  addScript(orderedScripts, handledScripts, scripts, scriptName);
  addScript(orderedScripts, handledScripts, scripts, `post${scriptName}`);

  return;
}

/**
 * Lib - Package Scripts - Add Script Group.
 *
 * Emits the parent command and every authored child command as complete
 * pre/base/post triplets.
 *
 * @param {Lib_PackageScripts_OrderedScripts} orderedScripts - Ordered scripts.
 * @param {Lib_PackageScripts_HandledScripts} handledScripts - Handled scripts.
 * @param {Lib_PackageScripts_Scripts}        scripts        - Scripts.
 * @param {Lib_PackageScripts_ScriptNames}    scriptNames    - Script names.
 * @param {Lib_PackageScripts_ScriptGroup}    scriptGroup    - Script group.
 *
 * @private
 *
 * @returns {Lib_PackageScripts_AddScriptGroup_Returns}
 *
 * @since UNRELEASED
 */
function addScriptGroup(orderedScripts: Lib_PackageScripts_OrderedScripts, handledScripts: Lib_PackageScripts_HandledScripts, scripts: Lib_PackageScripts_Scripts, scriptNames: Lib_PackageScripts_ScriptNames, scriptGroup: Lib_PackageScripts_ScriptGroup): Lib_PackageScripts_AddScriptGroup_Returns {
  addScript(orderedScripts, handledScripts, scripts, `pre${scriptGroup}`);
  addScript(orderedScripts, handledScripts, scripts, scriptGroup);

  for (const scriptName of scriptNames) {
    if (scriptName.startsWith(`${scriptGroup}:`) === true) {
      addScriptWithHooks(orderedScripts, handledScripts, scripts, scriptName);
    }
  }

  addScript(orderedScripts, handledScripts, scripts, `post${scriptGroup}`);

  return;
}

/**
 * Lib - Package Scripts - Get Custom Script Group Roots.
 *
 * Discovers noncanonical command namespaces in authored order after removing
 * known lifecycle entries and hooks that belong to another command.
 *
 * @param {Lib_PackageScripts_Scripts}        scripts        - Scripts.
 * @param {Lib_PackageScripts_ScriptNames}    scriptNames    - Script names.
 * @param {Lib_PackageScripts_HandledScripts} handledScripts - Handled scripts.
 *
 * @private
 *
 * @returns {Lib_PackageScripts_GetCustomScriptGroupRoots_Returns}
 *
 * @since UNRELEASED
 */
function getCustomScriptGroupRoots(scripts: Lib_PackageScripts_Scripts, scriptNames: Lib_PackageScripts_ScriptNames, handledScripts: Lib_PackageScripts_HandledScripts): Lib_PackageScripts_GetCustomScriptGroupRoots_Returns {
  const customScriptGroupRoots: Lib_PackageScripts_CustomScriptGroupRoots = [];
  const customScriptGroupRootSet: Lib_PackageScripts_CustomScriptGroupRootSet = new Set();

  for (const scriptName of scriptNames) {
    if (
      handledScripts.has(scriptName) === true
      || packageScriptNpmLifecycleOrder.includes(scriptName as Lib_PackageScripts_NpmLifecycleScript) === true
      || getHookTarget(scriptName, scripts) !== undefined
    ) {
      continue;
    }

    const scriptGroupRoot: Lib_PackageScripts_ScriptGroupRoot = scriptName.split(':')[0] ?? scriptName;

    if (customScriptGroupRootSet.has(scriptGroupRoot) === true) {
      continue;
    }

    customScriptGroupRootSet.add(scriptGroupRoot);

    customScriptGroupRoots.push(scriptGroupRoot);
  }

  return customScriptGroupRoots;
}

/**
 * Lib - Package Scripts - Order Package Scripts.
 *
 * Orders universal phases before optional and custom command families.
 * Preserves every command value while keeping matching hooks immediately around
 * their command and moving npm lifecycle hooks to the final section.
 *
 * @param {Lib_PackageScripts_Scripts} scripts - Scripts.
 *
 * @returns {Lib_PackageScripts_OrderPackageScripts_Returns}
 *
 * @since UNRELEASED
 */
export function orderPackageScripts(scripts: Lib_PackageScripts_Scripts): Lib_PackageScripts_OrderPackageScripts_Returns {
  const scriptNames: Lib_PackageScripts_ScriptNames = Object.keys(scripts);
  const orderedScripts: Lib_PackageScripts_OrderedScripts = {};
  const handledScripts: Lib_PackageScripts_HandledScripts = new Set();

  for (const scriptGroup of packageScriptCanonicalGroupOrder) {
    addScriptGroup(orderedScripts, handledScripts, scripts, scriptNames, scriptGroup);
  }

  for (const scriptName of packageScriptCanonicalSingletonOrder) {
    addScriptWithHooks(orderedScripts, handledScripts, scripts, scriptName);
  }

  for (const scriptGroup of packageScriptOptionalGroupOrder) {
    addScriptGroup(orderedScripts, handledScripts, scripts, scriptNames, scriptGroup);
  }

  const customScriptGroupRoots: Lib_PackageScripts_CustomScriptGroupRoots = getCustomScriptGroupRoots(scripts, scriptNames, handledScripts);

  for (const customScriptGroupRoot of customScriptGroupRoots) {
    addScriptGroup(orderedScripts, handledScripts, scripts, scriptNames, customScriptGroupRoot);
  }

  for (const scriptName of packageScriptNpmLifecycleOrder) {
    addScript(orderedScripts, handledScripts, scripts, scriptName);
  }

  for (const scriptName of scriptNames) {
    addScript(orderedScripts, handledScripts, scripts, scriptName);
  }

  return orderedScripts;
}

/**
 * Lib - Package Scripts - Find Package Script Contract Violations.
 *
 * Reports organization drift, ambiguous unscoped commands, missing group
 * dispatchers, recursive hooks, and optional root or Docusaurus requirements.
 *
 * @param {Lib_PackageScripts_Scripts} scripts - Scripts.
 * @param {Lib_PackageScripts_Options} options - Options.
 *
 * @returns {Lib_PackageScripts_FindPackageScriptContractViolations_Returns}
 *
 * @since UNRELEASED
 */
export function findPackageScriptContractViolations(scripts: Lib_PackageScripts_Scripts, options: Lib_PackageScripts_Options = {}): Lib_PackageScripts_FindPackageScriptContractViolations_Returns {
  const violations: Lib_PackageScripts_Violations = [];
  const actualScriptNames: Lib_PackageScripts_ActualScriptNames = Object.keys(scripts);
  const expectedScriptNames: Lib_PackageScripts_ExpectedScriptNames = Object.keys(orderPackageScripts(scripts));

  if (actualScriptNames.some((scriptName, scriptIndex) => scriptName !== expectedScriptNames[scriptIndex]) === true) {
    violations.push(`Scripts must follow Nova's canonical order: ${expectedScriptNames.join(', ')}.`);
  }

  for (const forbiddenScriptName of packageScriptForbiddenTopLevelScripts) {
    if (Reflect.has(scripts, forbiddenScriptName) === true) {
      const recommendation: Lib_PackageScripts_FindPackageScriptContractViolations_Recommendation = packageScriptForbiddenTopLevelScriptRecommendations[forbiddenScriptName];

      violations.push(`Top-level script "${forbiddenScriptName}" is ambiguous. ${recommendation}`);
    }
  }

  for (const scriptName of actualScriptNames) {
    const hookTarget: Lib_PackageScripts_HookTarget = getHookTarget(scriptName, scripts);

    if (
      hookTarget !== undefined
      && getHookTarget(hookTarget, scripts) !== undefined
    ) {
      violations.push(`Script "${scriptName}" recursively wraps lifecycle hook "${hookTarget}".`);
    }

    if (
      scriptName.includes(':') === false
      || hookTarget !== undefined
    ) {
      continue;
    }

    const scriptGroupRoot: Lib_PackageScripts_ScriptGroupRoot = scriptName.split(':')[0] ?? scriptName;

    if (Reflect.has(scripts, scriptGroupRoot) === false) {
      violations.push(`Child script "${scriptName}" requires parent dispatcher "${scriptGroupRoot}".`);
    }
  }

  for (const scriptGroup of [
    ...packageScriptCanonicalGroupOrder,
    ...packageScriptOptionalGroupOrder,
  ]) {
    if (Reflect.has(scripts, scriptGroup) === false) {
      continue;
    }

    const hasChildScript: Lib_PackageScripts_HasChildScript = actualScriptNames.some((scriptName) => scriptName.startsWith(`${scriptGroup}:`));

    if (hasChildScript === false) {
      violations.push(`Parent dispatcher "${scriptGroup}" requires at least one child script.`);
    }
  }

  if (options['requireRootScripts'] === true) {
    for (const requiredRootScript of packageScriptRequiredRootOrder) {
      if (Reflect.has(scripts, requiredRootScript) === false) {
        violations.push(`Project root requires script "${requiredRootScript}".`);
      }
    }
  }

  if (
    options['requireI18n'] === true
    && Reflect.has(scripts, 'i18n') === false
  ) {
    violations.push('Docusaurus workspaces require script "i18n".');
  }

  return violations;
}
