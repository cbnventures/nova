/**
 * Lib - Env Namespace - Lib Env Namespace.
 *
 * @since 0.21.0
 */
export type Lib_EnvNamespace_LibEnvNamespace_GithubName = (prefix: string, key: string) => string;

export type Lib_EnvNamespace_LibEnvNamespace_IsGithubLegalName = (name: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_IsReservedPrefix = (prefix: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_PrefixesOverlap = (a: string, b: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace_StartsWithPrefix = (key: string, prefix: string) => boolean;

export type Lib_EnvNamespace_LibEnvNamespace = {
  githubName: Lib_EnvNamespace_LibEnvNamespace_GithubName;
  isGithubLegalName: Lib_EnvNamespace_LibEnvNamespace_IsGithubLegalName;
  isReservedPrefix: Lib_EnvNamespace_LibEnvNamespace_IsReservedPrefix;
  prefixesOverlap: Lib_EnvNamespace_LibEnvNamespace_PrefixesOverlap;
  startsWithPrefix: Lib_EnvNamespace_LibEnvNamespace_StartsWithPrefix;
};
