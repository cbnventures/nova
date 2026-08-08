import { libEnvNamespace } from './env-namespace.js';
import { libItemReservedDotenvKeys } from './item.js';

import type {
  Lib_EnvStatus_DeclaredDefaults,
  Lib_EnvStatus_InSecrets,
  Lib_EnvStatus_InVariables,
  Lib_EnvStatus_LibEnvStatus,
  Lib_EnvStatus_ManagedNames,
  Lib_EnvStatus_Name,
  Lib_EnvStatus_OrphanDeclared,
  Lib_EnvStatus_OrphanFilledKeys,
  Lib_EnvStatus_OrphanResults,
  Lib_EnvStatus_OrphanSeen,
  Lib_EnvStatus_OrphanWorkspace,
  Lib_EnvStatus_OrphanWorkspacePath,
  Lib_EnvStatus_OrphanWorkspaces,
  Lib_EnvStatus_Prefixes,
  Lib_EnvStatus_Project,
  Lib_EnvStatus_Results,
  Lib_EnvStatus_Secrets,
  Lib_EnvStatus_State,
  Lib_EnvStatus_UnderPrefix,
  Lib_EnvStatus_Value,
  Lib_EnvStatus_Variables,
  Lib_EnvStatus_VariableValues,
  Lib_EnvStatus_WorkflowEnvironments,
  Lib_EnvStatus_Workspace,
  Lib_EnvStatus_Workspaces,
} from '../types/lib/env-status.d.ts';

/**
 * Lib - Env Status - Lib Env Status.
 *
 * Classifies each managed and observed GitHub name against the computed managed
 * set, sorting each into declared, missing, optional-absent, type-mismatch, stub-unreplaced,
 * stale, or unmanaged; an optional credential absent by design is never treated as missing.
 *
 * @since 0.22.0
 */
export const libEnvStatus: Lib_EnvStatus_LibEnvStatus = {
  classify: (managedSet, githubState, environment) => {
    const results: Lib_EnvStatus_Results = [];
    const variables: Lib_EnvStatus_Variables = githubState['variables'] ?? [];
    const secrets: Lib_EnvStatus_Secrets = githubState['secrets'] ?? [];
    const variableValues: Lib_EnvStatus_VariableValues = githubState['variableValues'];
    const managedNames: Lib_EnvStatus_ManagedNames = new Set(managedSet.map((entry) => entry['name']));
    const project: Lib_EnvStatus_Project = environment['project'];
    const workspaces: Lib_EnvStatus_Workspaces = environment['workspaces'] ?? {};
    const workflowEnvironments: Lib_EnvStatus_WorkflowEnvironments = environment['workflows'] ?? {};
    const prefixes: Lib_EnvStatus_Prefixes = [];
    const declaredDefaults: Lib_EnvStatus_DeclaredDefaults = new Set();

    // Collect every Nova prefix, used later for stale-name detection, and every managed name
    // that carries a non-empty default value into declaredDefaults.
    if (project !== undefined) {
      prefixes.push(project['prefix']);

      for (const projectVariable of project['variables'] ?? []) {
        if (
          'defaultValue' in projectVariable
          && projectVariable['defaultValue'] !== undefined
          && projectVariable['defaultValue'] !== ''
        ) {
          declaredDefaults.add(libEnvNamespace.githubName(project['prefix'], projectVariable['key']));
        }
      }
    }

    for (const workspaceEntry of Object.entries(workspaces)) {
      const workspace: Lib_EnvStatus_Workspace = workspaceEntry[1];

      prefixes.push(workspace['prefix']);

      for (const workspaceVariable of workspace['variables'] ?? []) {
        if (
          'defaultValue' in workspaceVariable
          && workspaceVariable['defaultValue'] !== undefined
          && workspaceVariable['defaultValue'] !== ''
        ) {
          declaredDefaults.add(libEnvNamespace.githubName(workspace['prefix'], workspaceVariable['key']));
        }
      }
    }

    for (const workflowEntry of Object.entries(workflowEnvironments)) {
      prefixes.push(workflowEntry[1]['prefix']);
    }

    // Classify each managed key against what GitHub actually holds.
    for (const managed of managedSet) {
      const name: Lib_EnvStatus_Name = managed['name'];
      const inVariables: Lib_EnvStatus_InVariables = variables.includes(name);
      const inSecrets: Lib_EnvStatus_InSecrets = secrets.includes(name);

      if (inVariables === false && inSecrets === false) {
        // An optional credential (an OIDC repo's NPM_TOKEN) may be legitimately absent, so an
        // absent optional key is healthy rather than missing and is never auto-created.
        results.push({
          name,
          state: (managed['optional'] === true) ? 'optional-absent' : 'missing',
        });

        continue;
      }

      if (managed['secret'] === true) {
        results.push({
          name,
          state: (inSecrets === true) ? 'declared' : 'type-mismatch',
        });

        continue;
      }

      if (inVariables === true) {
        let state: Lib_EnvStatus_State = 'declared';

        if (variableValues !== undefined) {
          const value: Lib_EnvStatus_Value = variableValues[name];

          if (value === 'NOVA_PLACEHOLDER') {
            state = 'stub-unreplaced';
          }
        }

        results.push({
          name,
          state,
        });

        continue;
      }

      results.push({
        name,
        state: 'type-mismatch',
      });
    }

    // Classify each observed GitHub name Nova does not manage: stale under a Nova prefix,
    // unmanaged otherwise.
    for (const existingName of [
      ...variables,
      ...secrets,
    ]) {
      if (managedNames.has(existingName) === true) {
        continue;
      }

      const underPrefix: Lib_EnvStatus_UnderPrefix = prefixes.some((prefix) => libEnvNamespace.startsWithPrefix(existingName, prefix));

      results.push({
        name: existingName,
        state: (underPrefix === true) ? 'stale' : 'unmanaged',
      });
    }

    return results;
  },
  localOrphans: (environment, localEnv) => {
    const orphanResults: Lib_EnvStatus_OrphanResults = [];
    const orphanWorkspaces: Lib_EnvStatus_OrphanWorkspaces = environment['workspaces'] ?? {};
    const orphanSeen: Lib_EnvStatus_OrphanSeen = new Set();

    // A filled local ".env" line no longer declared is an orphan the user can drop; the reserved
    // scaffold defaults (NODE_ENV / LOG_LEVEL / LOG_TIME) are exempt and never flagged (spec 5.6).
    for (const orphanWorkspaceEntry of Object.entries(orphanWorkspaces)) {
      const orphanWorkspacePath: Lib_EnvStatus_OrphanWorkspacePath = orphanWorkspaceEntry[0];
      const orphanWorkspace: Lib_EnvStatus_OrphanWorkspace = orphanWorkspaceEntry[1];
      const orphanDeclared: Lib_EnvStatus_OrphanDeclared = new Set((orphanWorkspace['variables'] ?? []).map((variable) => variable['key']));
      const orphanFilledKeys: Lib_EnvStatus_OrphanFilledKeys = localEnv[orphanWorkspacePath] ?? [];

      for (const orphanFilledKey of orphanFilledKeys) {
        if (
          orphanDeclared.has(orphanFilledKey) === true
          || libItemReservedDotenvKeys.some((reservedKey) => reservedKey === orphanFilledKey) === true
          || orphanSeen.has(orphanFilledKey) === true
        ) {
          continue;
        }

        orphanSeen.add(orphanFilledKey);

        orphanResults.push({
          name: orphanFilledKey,
          state: 'local-orphan',
        });
      }
    }

    return orphanResults;
  },
};
