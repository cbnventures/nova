import type {
  SharedChangelogEntryBump,
  SharedChangelogEntryCategory,
  SharedItemPrettyNames,
  SharedNovaConfigEntityRole,
  SharedNovaConfigWorkspacePolicy,
  SharedNovaConfigWorkspaceRecipeName,
  SharedNovaConfigWorkspaceRole,
} from '../shared.d.ts';

/**
 * Lib - Item - Allowed Policies By Role.
 *
 * @since 0.11.0
 */
export type LibItemAllowedPoliciesByRoleProject = Extract<SharedNovaConfigWorkspacePolicy, 'freezable'>[];

export type LibItemAllowedPoliciesByRoleConfig = Extract<SharedNovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type LibItemAllowedPoliciesByRoleDocs = Extract<SharedNovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type LibItemAllowedPoliciesByRoleApp = Extract<SharedNovaConfigWorkspacePolicy, 'trackable'>[];

export type LibItemAllowedPoliciesByRolePackage = Extract<SharedNovaConfigWorkspacePolicy, 'trackable' | 'distributable'>[];

export type LibItemAllowedPoliciesByRoleTool = Extract<SharedNovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type LibItemAllowedPoliciesByRoleTemplate = Extract<SharedNovaConfigWorkspacePolicy, 'freezable'>[];

export type LibItemAllowedPoliciesByRole = {
  project: LibItemAllowedPoliciesByRoleProject;
  config: LibItemAllowedPoliciesByRoleConfig;
  docs: LibItemAllowedPoliciesByRoleDocs;
  app: LibItemAllowedPoliciesByRoleApp;
  package: LibItemAllowedPoliciesByRolePackage;
  tool: LibItemAllowedPoliciesByRoleTool;
  template: LibItemAllowedPoliciesByRoleTemplate;
};

/**
 * Lib - Item - Allowed Recipes.
 *
 * @since 0.11.0
 */
export type LibItemAllowedRecipes = readonly SharedNovaConfigWorkspaceRecipeName[];

/**
 * Lib - Item - Allowed Roles.
 *
 * @since 0.11.0
 */
export type LibItemAllowedRoles = readonly [
  'project',
  'docs',
  'config',
  'app',
  'package',
  'tool',
  'template',
];

/**
 * Lib - Item - Bundler Keys.
 *
 * @since 0.11.0
 */
export type LibItemBundlerKeys = readonly [
  'types',
  'module',
  'sideEffects',
  'esnext',
];

/**
 * Lib - Item - Changelog Adjectives.
 *
 * @since 0.11.0
 */
export type LibItemChangelogAdjectives = readonly [
  'afraid',
  'bold',
  'brave',
  'bright',
  'brown',
  'calm',
  'clean',
  'cold',
  'cool',
  'dark',
  'deep',
  'dry',
  'fair',
  'fast',
  'few',
  'flat',
  'free',
  'full',
  'glad',
  'gold',
  'good',
  'great',
  'green',
  'hard',
  'hot',
  'keen',
  'kind',
  'lazy',
  'lean',
  'light',
  'long',
  'loud',
  'mean',
  'mild',
  'neat',
  'new',
  'nice',
  'odd',
  'old',
  'pale',
  'pink',
  'pure',
  'rare',
  'raw',
  'real',
  'red',
  'rich',
  'safe',
  'shy',
  'slim',
];

/**
 * Lib - Item - Changelog Category Bump Map.
 *
 * @since 0.11.0
 */
export type LibItemChangelogCategoryBumpMap = Record<SharedChangelogEntryCategory, SharedChangelogEntryBump>;

/**
 * Lib - Item - Changelog Nouns.
 *
 * @since 0.11.0
 */
export type LibItemChangelogNouns = readonly [
  'ants',
  'bags',
  'bats',
  'beds',
  'bees',
  'birds',
  'boats',
  'books',
  'bugs',
  'cats',
  'cups',
  'dogs',
  'dots',
  'ducks',
  'eggs',
  'eyes',
  'fans',
  'fish',
  'foxes',
  'frogs',
  'goats',
  'hats',
  'hens',
  'hills',
  'jars',
  'keys',
  'kids',
  'kits',
  'maps',
  'mice',
  'moons',
  'nets',
  'owls',
  'pans',
  'paws',
  'pens',
  'pigs',
  'pots',
  'rats',
  'rugs',
  'seals',
  'shoes',
  'slugs',
  'socks',
  'stars',
  'toys',
  'trees',
  'vans',
  'walls',
  'waves',
];

/**
 * Lib - Item - Changelog Ordered Categories.
 *
 * @since 0.11.0
 */
export type LibItemChangelogOrderedCategories = readonly SharedChangelogEntryCategory[];

/**
 * Lib - Item - Changelog Valid Bumps.
 *
 * @since 0.11.0
 */
export type LibItemChangelogValidBumps = readonly [
  'major',
  'minor',
  'patch',
];

/**
 * Lib - Item - Changelog Valid Categories.
 *
 * @since 0.11.0
 */
export type LibItemChangelogValidCategories = readonly [
  'added',
  'updated',
  'fixed',
  'removed',
];

/**
 * Lib - Item - Changelog Verbs.
 *
 * @since 0.11.0
 */
export type LibItemChangelogVerbs = readonly [
  'ask',
  'bake',
  'bite',
  'blow',
  'boil',
  'burn',
  'buzz',
  'camp',
  'clap',
  'cook',
  'cry',
  'cut',
  'dig',
  'draw',
  'drop',
  'eat',
  'fall',
  'find',
  'flow',
  'fly',
  'fold',
  'glow',
  'grab',
  'grip',
  'grow',
  'hear',
  'help',
  'hide',
  'hold',
  'hunt',
  'jump',
  'kick',
  'land',
  'lead',
  'lean',
  'lift',
  'look',
  'melt',
  'move',
  'nail',
  'nap',
  'pack',
  'pick',
  'play',
  'pour',
  'pull',
  'push',
  'read',
  'ride',
  'ring',
];

/**
 * Lib - Item - Corepack Keys.
 *
 * @since 0.11.0
 */
export type LibItemCorepackKeys = readonly [
  'packageManager',
];

/**
 * Lib - Item - Email Fields.
 *
 * @since 0.11.0
 */
export type LibItemEmailFields = readonly [
  'bugs',
];

/**
 * Lib - Item - Generic Protocols.
 *
 * @since 0.11.0
 */
export type LibItemGenericProtocols = readonly [
  'http:',
  'https:',
];

/**
 * Lib - Item - Node Js Keys.
 *
 * @since 0.11.0
 */
export type LibItemNodeJsKeys = readonly [
  'name',
  'main',
  'type',
  'exports',
  'imports',
];

/**
 * Lib - Item - npm Keys.
 *
 * @since 0.11.0
 */
export type LibItemNpmKeys = readonly [
  'name',
  'version',
  'description',
  'keywords',
  'license',
  'homepage',
  'bugs',
  'author',
  'contributors',
  'funding',
  'repository',
  'exports',
  'main',
  'browser',
  'files',
  'bin',
  'man',
  'directories',
  'private',
  'publishConfig',
  'scripts',
  'gypfile',
  'config',
  'workspaces',
  'engines',
  'os',
  'cpu',
  'libc',
  'devEngines',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'bundleDependencies',
  'bundledDependencies',
  'optionalDependencies',
  'overrides',
];

/**
 * Lib - Item - Pretty Names Abbreviation.
 *
 * @since 0.15.0
 */
export type LibItemPrettyNamesAbbreviation = SharedItemPrettyNames;

/**
 * Lib - Item - Pretty Names Brand.
 *
 * @since 0.11.0
 */
export type LibItemPrettyNamesBrand = SharedItemPrettyNames;

/**
 * Lib - Item - Pretty Names Category.
 *
 * @since 0.11.0
 */
export type LibItemPrettyNamesCategory = SharedItemPrettyNames;

/**
 * Lib - Item - Pretty Names Column Title.
 *
 * @since 0.11.0
 */
export type LibItemPrettyNamesColumnTitle = SharedItemPrettyNames;

/**
 * Lib - Item - Pretty Names Keyword.
 *
 * @since 0.15.0
 */
export type LibItemPrettyNamesKeyword = SharedItemPrettyNames;

/**
 * Lib - Item - Pretty Names Type.
 *
 * @since 0.11.0
 */
export type LibItemPrettyNamesType = SharedItemPrettyNames;

/**
 * Lib - Item - Repository Protocols.
 *
 * @since 0.11.0
 */
export type LibItemRepositoryProtocols = readonly [
  'git:',
  'git+https:',
  'git+ssh:',
  'git+http:',
  'https:',
  'http:',
];

/**
 * Lib - Item - Side Effects ESNext Roles.
 *
 * @since 0.11.0
 */
export type LibItemSideEffectsEsnextRoles = readonly SharedNovaConfigWorkspaceRole[];

/**
 * Lib - Item - Skip Directories.
 *
 * @since 0.11.0
 */
export type LibItemSkipDirectories = readonly [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
];

/**
 * Lib - Item - Sort Order Keys.
 *
 * @since 0.11.0
 */
export type LibItemSortOrderKeys = readonly [
  'name',
  'version',
  'description',
  'keywords',
  'license',
  'homepage',
  'bugs',
  'author',
  'contributors',
  'funding',
  'repository',
  'exports',
  'main',
  'type',
  'browser',
  'imports',
  'files',
  'bin',
  'man',
  'directories',
  'private',
  'publishConfig',
  'scripts',
  'gypfile',
  'config',
  'workspaces',
  'packageManager',
  'engines',
  'os',
  'cpu',
  'libc',
  'devEngines',
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'bundleDependencies',
  'optionalDependencies',
  'overrides',
  'types',
  'module',
  'sideEffects',
  'esnext',
];

/**
 * Lib - Item - Sync Roles.
 *
 * @since 0.11.0
 */
export type LibItemSyncRoles = readonly SharedNovaConfigWorkspaceRole[];

/**
 * Lib - Item - Types Module Roles.
 *
 * @since 0.11.0
 */
export type LibItemTypesModuleRoles = readonly SharedNovaConfigWorkspaceRole[];

/**
 * Lib - Item - URL Fields.
 *
 * @since 0.11.0
 */
export type LibItemUrlFields = readonly [
  'homepage',
  'repository',
  'bugs',
  'license',
  'logo',
  'documentation',
  'github',
  'npm',
  'docker',
  'privacyPolicy',
  'termsOfUse',
];

/**
 * Lib - Item - Valid Entity Roles.
 *
 * @since 0.11.0
 */
export type LibItemValidEntityRoles = readonly SharedNovaConfigEntityRole[];
