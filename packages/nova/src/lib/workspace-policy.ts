import type {
  Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Config,
  Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Messages,
  Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Returns,
  Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Targets,
  Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Config,
  Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_NpmTargets,
  Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Returns,
  Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Targets,
  Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_WorkspacePath,
} from '../types/lib/workspace-policy.d.ts';

/**
 * Lib - Workspace Policy - Resolve Distributable Policy Messages.
 *
 * Lists every "distributable" workspace that a publish workflow sends somewhere other
 * than an npm registry. Only npm packages can be distributable.
 *
 * @param {Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Config} config - Config.
 *
 * @returns {Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Returns}
 *
 * @since 0.49.0
 */
export function resolveDistributablePolicyMessages(config: Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Config): Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Returns {
  const messages: Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Messages = [];

  for (const workspaceEntry of Object.entries(config['workspaces'] ?? {})) {
    if (workspaceEntry[1]['policy'] !== 'distributable') {
      continue;
    }

    const targets: Lib_WorkspacePolicy_ResolveDistributablePolicyMessages_Targets = resolveNonNpmDeployTargets(config, workspaceEntry[0]);

    if (targets.length > 0) {
      messages.push(`Workspace "${workspaceEntry[0]}" is "distributable", but a publish workflow sends it to ${targets.map((target) => `"${target}"`).join(', ')}, not npm. Only npm packages can be distributable. Set its policy to "trackable".`);
    }
  }

  return messages;
}

/**
 * Lib - Workspace Policy - Resolve Non npm Deploy Targets.
 *
 * Lists the publish targets of one workspace that are not npm registries, such as
 * "github-action" or "pfsense", without repeats.
 *
 * @param {Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Config}        config        - Config.
 * @param {Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Returns}
 *
 * @since 0.49.0
 */
export function resolveNonNpmDeployTargets(config: Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Config, workspacePath: Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_WorkspacePath): Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Returns {
  const npmTargets: Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_NpmTargets = [
    'github-packages',
    'npm',
  ];
  const targets: Lib_WorkspacePolicy_ResolveNonNpmDeployTargets_Targets = [];

  for (const workflow of config['workflows'] ?? []) {
    for (const deployTarget of workflow['deploy'] ?? []) {
      if (
        deployTarget['path'] === workspacePath
        && npmTargets.includes(deployTarget['to']) === false
        && targets.includes(deployTarget['to']) === false
      ) {
        targets.push(deployTarget['to']);
      }
    }
  }

  return targets;
}
