import type {
  Lib_CoverageBadge_ResolveCoverageBadge_Config,
  Lib_CoverageBadge_ResolveCoverageBadge_DocsPath,
  Lib_CoverageBadge_ResolveCoverageBadge_Documentation,
  Lib_CoverageBadge_ResolveCoverageBadge_Minimum,
  Lib_CoverageBadge_ResolveCoverageBadge_Returns,
  Lib_CoverageBadge_ResolveCoverageBadge_Workspaces,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Badge,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Config,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Documentation,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_DocumentationBase,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Github,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Owner,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Repo,
  Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Returns,
} from '../types/lib/coverage-badge.d.ts';

/**
 * Lib - Coverage Badge - Resolve Coverage Badge.
 *
 * Returns the coverage badge plan when "settings.coverage.minimum" is set.
 * A docs workspace with a "urls.documentation" site serves it, so "docsPath" names it.
 * Otherwise the badge goes to the "badges" branch.
 *
 * @param {Lib_CoverageBadge_ResolveCoverageBadge_Config} config - Config.
 *
 * @returns {Lib_CoverageBadge_ResolveCoverageBadge_Returns}
 *
 * @since 0.49.0
 */
export function resolveCoverageBadge(config: Lib_CoverageBadge_ResolveCoverageBadge_Config): Lib_CoverageBadge_ResolveCoverageBadge_Returns {
  const minimum: Lib_CoverageBadge_ResolveCoverageBadge_Minimum = (config['settings'] !== undefined && config['settings']['coverage'] !== undefined) ? config['settings']['coverage']['minimum'] : undefined;

  if (minimum === undefined) {
    return undefined;
  }

  const documentation: Lib_CoverageBadge_ResolveCoverageBadge_Documentation = (config['urls'] !== undefined) ? (config['urls']['documentation'] ?? '') : '';
  const workspaces: Lib_CoverageBadge_ResolveCoverageBadge_Workspaces = config['workspaces'] ?? {};
  const docsPath: Lib_CoverageBadge_ResolveCoverageBadge_DocsPath = Object.keys(workspaces)
    .sort()
    .find((workspacePath) => workspaces[workspacePath] !== undefined && workspaces[workspacePath]['role'] === 'docs');

  if (documentation === '' || docsPath === undefined) {
    return {
      minimum,
    };
  }

  return {
    minimum,
    docsPath,
  };
}

/**
 * Lib - Coverage Badge - Resolve Coverage Badge Endpoint URL.
 *
 * Returns the URL of the shields.io endpoint JSON the publish workflow writes: the docs
 * site's "badges/coverage.json", or the "badges" branch file on raw.githubusercontent.com.
 * Returns undefined when coverage is off or no URL can be built.
 *
 * @param {Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Config} config - Config.
 *
 * @returns {Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Returns}
 *
 * @since 0.49.0
 */
export function resolveCoverageBadgeEndpointUrl(config: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Config): Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Returns {
  const badge: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Badge = resolveCoverageBadge(config);

  if (badge === undefined) {
    return undefined;
  }

  if (badge['docsPath'] !== undefined) {
    const documentation: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Documentation = (config['urls'] !== undefined) ? (config['urls']['documentation'] ?? '') : '';
    const documentationBase: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_DocumentationBase = (documentation.endsWith('/') === true) ? documentation.slice(0, -1) : documentation;

    return `${documentationBase}/badges/coverage.json`;
  }

  const github: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Github = config['github'];
  const owner: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Owner = (github !== undefined) ? (github['owner'] ?? '') : '';
  const repo: Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Repo = (github !== undefined) ? (github['repo'] ?? '') : '';

  if (owner === '' || repo === '') {
    return undefined;
  }

  return `https://raw.githubusercontent.com/${owner}/${repo}/badges/coverage.json`;
}
