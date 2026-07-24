import { libEnvNamespace } from './env-namespace.js';
import { libWorkflowTemplatesMetadata } from './workflow-templates.js';

import type {
  Lib_EnvManagedSet_App,
  Lib_EnvManagedSet_AppPath,
  Lib_EnvManagedSet_Apps,
  Lib_EnvManagedSet_CandidateName,
  Lib_EnvManagedSet_Candidates,
  Lib_EnvManagedSet_CredApp,
  Lib_EnvManagedSet_CredMeta,
  Lib_EnvManagedSet_CredName,
  Lib_EnvManagedSet_CredPrefix,
  Lib_EnvManagedSet_Environment,
  Lib_EnvManagedSet_Global,
  Lib_EnvManagedSet_LibEnvManagedSet,
  Lib_EnvManagedSet_ManagedCred,
  Lib_EnvManagedSet_ResolvedCred,
  Lib_EnvManagedSet_ResolvedVariable,
  Lib_EnvManagedSet_Results,
  Lib_EnvManagedSet_Seen,
  Lib_EnvManagedSet_TargetMeta,
  Lib_EnvManagedSet_TemplateMeta,
  Lib_EnvManagedSet_TemplateTargets,
  Lib_EnvManagedSet_VariableMeta,
  Lib_EnvManagedSet_VariableName,
  Lib_EnvManagedSet_WorkflowEnvironment,
  Lib_EnvManagedSet_WorkflowEnvironments,
  Lib_EnvManagedSet_WorkflowPrefix,
  Lib_EnvManagedSet_Workflows,
} from '../types/lib/env-managed-set.d.ts';

/**
 * Lib - Env Managed Set - Lib Env Managed Set.
 *
 * Computes every GitHub Variable and Secret name Nova manages for a config: app and
 * global values plus workflow-config and deploy-credential keys from the template and
 * target metadata, each derived as prefix + key, minus the automatic GITHUB_TOKEN.
 *
 * @since 0.21.0
 */
export const libEnvManagedSet: Lib_EnvManagedSet_LibEnvManagedSet = {
  compute: (config) => {
    const candidates: Lib_EnvManagedSet_Candidates = [];
    const environment: Lib_EnvManagedSet_Environment = config['environment'] ?? {};
    const global: Lib_EnvManagedSet_Global = environment['global'];
    const apps: Lib_EnvManagedSet_Apps = environment['apps'] ?? {};

    // Global managed keys carry the global prefix.
    if (global !== undefined) {
      for (const globalVariable of global['variables'] ?? []) {
        candidates.push({
          name: libEnvNamespace.githubName(global['prefix'], globalVariable['key']),
          secret: globalVariable['secret'],
          kind: 'global',
        });
      }
    }

    // App managed keys carry each app's prefix, regardless of buildOnly.
    for (const appEntry of Object.entries(apps)) {
      const app: Lib_EnvManagedSet_App = appEntry[1];

      for (const appVariable of app['variables'] ?? []) {
        candidates.push({
          name: libEnvNamespace.githubName(app['prefix'], appVariable['key']),
          secret: appVariable['secret'],
          kind: 'app',
        });
      }
    }

    // Workflow config keys carry the workflow prefix; deploy creds carry the global
    // prefix for account scope or the deploying app's prefix for app scope.
    const workflows: Lib_EnvManagedSet_Workflows = config['workflows'] ?? [];
    const workflowEnvironments: Lib_EnvManagedSet_WorkflowEnvironments = environment['workflows'] ?? {};

    for (const workflow of workflows) {
      const templateMeta: Lib_EnvManagedSet_TemplateMeta = libWorkflowTemplatesMetadata.find((entry) => entry['name'] === workflow['template']);

      if (templateMeta === undefined) {
        continue;
      }

      const workflowEnvironment: Lib_EnvManagedSet_WorkflowEnvironment = workflowEnvironments[workflow['suffix']];
      const workflowPrefix: Lib_EnvManagedSet_WorkflowPrefix = (workflowEnvironment !== undefined) ? workflowEnvironment['prefix'] : undefined;

      for (const variableEntry of Object.entries(templateMeta['variables'])) {
        const variableName: Lib_EnvManagedSet_VariableName = variableEntry[0];
        const variableMeta: Lib_EnvManagedSet_VariableMeta = variableEntry[1];

        if (variableMeta['auto'] === true || variableMeta['format'] === 'literal') {
          continue;
        }

        const resolvedVariable: Lib_EnvManagedSet_ResolvedVariable = (workflowPrefix !== undefined && workflowPrefix !== '') ? libEnvNamespace.githubName(workflowPrefix, variableName) : (variableMeta['default'] ?? variableName);

        candidates.push({
          name: resolvedVariable,
          secret: variableMeta['format'] === 'secret',
          kind: 'workflow',
        });
      }

      const templateTargets: Lib_EnvManagedSet_TemplateTargets = templateMeta['targets'];

      if (templateTargets === undefined) {
        continue;
      }

      for (const workflowTarget of workflow['targets'] ?? []) {
        const targetMeta: Lib_EnvManagedSet_TargetMeta = templateTargets[workflowTarget['type']];

        if (targetMeta === undefined) {
          continue;
        }

        const appPath: Lib_EnvManagedSet_AppPath = workflowTarget['workingDir'];

        for (const credEntry of Object.entries(targetMeta['variables'])) {
          const credName: Lib_EnvManagedSet_CredName = credEntry[0];
          const credMeta: Lib_EnvManagedSet_CredMeta = credEntry[1];

          if (credMeta['auto'] === true || credMeta['format'] === 'literal') {
            continue;
          }

          const credApp: Lib_EnvManagedSet_CredApp = apps[appPath];
          let credPrefix: Lib_EnvManagedSet_CredPrefix = undefined;

          if (credMeta['scope'] === 'account' && global !== undefined) {
            credPrefix = global['prefix'];
          } else if (credMeta['scope'] === 'app' && credApp !== undefined) {
            credPrefix = credApp['prefix'];
          }

          const resolvedCred: Lib_EnvManagedSet_ResolvedCred = (credPrefix !== undefined && credPrefix !== '') ? libEnvNamespace.githubName(credPrefix, credName) : (credMeta['default'] ?? credName);

          // A template credential can be legitimately absent (an OIDC repo's NPM_TOKEN), so carry
          // its optional flag onto the managed entry only when set, letting status treat an absent
          // optional key as healthy instead of missing.
          const managedCred: Lib_EnvManagedSet_ManagedCred = {
            name: resolvedCred,
            secret: credMeta['format'] === 'secret',
            kind: 'deploy-cred',
          };

          if (credMeta['optional'] === true) {
            Reflect.set(managedCred, 'optional', true);
          }

          candidates.push(managedCred);
        }
      }
    }

    // Deduplicate by GitHub name and drop the automatic GITHUB_TOKEN.
    const seen: Lib_EnvManagedSet_Seen = new Set();
    const results: Lib_EnvManagedSet_Results = [];

    for (const candidate of candidates) {
      const candidateName: Lib_EnvManagedSet_CandidateName = candidate['name'];

      if (
        candidateName === ''
        || candidateName === 'GITHUB_TOKEN'
        || seen.has(candidateName) === true
      ) {
        continue;
      }

      seen.add(candidateName);

      results.push(candidate);
    }

    return results;
  },
};
