import type { Shared_NovaConfigEnvironmentDeployProfile } from '../shared.d.ts';

/**
 * Lib - Env Namespace - Lib Env Namespace.
 *
 * @since 0.21.0
 */
export type Lib_EnvNamespace_LibEnvNamespace_GithubName = (prefix: string, key: string) => string;

export type Lib_EnvNamespace_LibEnvNamespace_GithubProfileName = (prefix: string, profile: Shared_NovaConfigEnvironmentDeployProfile, key: string) => string;

export type Lib_EnvNamespace_LibEnvNamespace_IsGithubLegalName = (name: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_IsReservedPrefix = (prefix: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_PrefixesOverlap = (a: string, b: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_StartsWithPrefix = (key: string, prefix: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace = {
  githubName: Lib_EnvNamespace_LibEnvNamespace_GithubName;
  githubProfileName: Lib_EnvNamespace_LibEnvNamespace_GithubProfileName;
  isGithubLegalName: Lib_EnvNamespace_LibEnvNamespace_IsGithubLegalName;
  isReservedPrefix: Lib_EnvNamespace_LibEnvNamespace_IsReservedPrefix;
  prefixesOverlap: Lib_EnvNamespace_LibEnvNamespace_PrefixesOverlap;
  startsWithPrefix: Lib_EnvNamespace_LibEnvNamespace_StartsWithPrefix;
};
