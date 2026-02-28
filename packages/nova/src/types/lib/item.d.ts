import type {
  ChangelogEntryBump,
  ChangelogEntryCategory,
  ItemPrettyNames,
  NovaConfigWorkspacePolicy,
} from '@/types/shared.d.ts';

/**
 * Item - Allowed policies by role.
 *
 * @since 1.0.0
 */
export type ItemAllowedPoliciesByRoleProject = Extract<NovaConfigWorkspacePolicy, 'freezable'>[];

export type ItemAllowedPoliciesByRoleConfig = Extract<NovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type ItemAllowedPoliciesByRoleDocs = Extract<NovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type ItemAllowedPoliciesByRoleApp = Extract<NovaConfigWorkspacePolicy, 'trackable'>[];

export type ItemAllowedPoliciesByRolePackage = Extract<NovaConfigWorkspacePolicy, 'trackable' | 'distributable'>[];

export type ItemAllowedPoliciesByRoleTool = Extract<NovaConfigWorkspacePolicy, 'freezable' | 'trackable'>[];

export type ItemAllowedPoliciesByRoleTemplate = Extract<NovaConfigWorkspacePolicy, 'freezable'>[];

export type ItemAllowedPoliciesByRole = {
  project: ItemAllowedPoliciesByRoleProject;
  config: ItemAllowedPoliciesByRoleConfig;
  docs: ItemAllowedPoliciesByRoleDocs;
  app: ItemAllowedPoliciesByRoleApp;
  package: ItemAllowedPoliciesByRolePackage;
  tool: ItemAllowedPoliciesByRoleTool;
  template: ItemAllowedPoliciesByRoleTemplate;
};

/**
 * Item - Allowed roles.
 *
 * @since 1.0.0
 */
export type ItemAllowedRoles = readonly [
  'project',
  'docs',
  'config',
  'app',
  'package',
  'tool',
  'template',
];

/**
 * Item - Allowed sync properties.
 *
 * @since 1.0.0
 */
export type ItemAllowedSyncProperties = readonly [
  'description',
  'keywords',
  'author',
  'contributors',
  'funding',
  'homepage',
  'repository',
  'bugs',
];

/**
 * Item - Changelog adjectives.
 *
 * @since 1.0.0
 */
export type ItemChangelogAdjectives = readonly [
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
 * Item - Changelog category bump map.
 *
 * @since 1.0.0
 */
export type ItemChangelogCategoryBumpMap = Record<ChangelogEntryCategory, ChangelogEntryBump>;

/**
 * Item - Changelog nouns.
 *
 * @since 1.0.0
 */
export type ItemChangelogNouns = readonly [
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
 * Item - Changelog valid bumps.
 *
 * @since 1.0.0
 */
export type ItemChangelogValidBumps = readonly [
  'major',
  'minor',
  'patch',
];

/**
 * Item - Changelog valid categories.
 *
 * @since 1.0.0
 */
export type ItemChangelogValidCategories = readonly [
  'added',
  'updated',
  'fixed',
  'removed',
];

/**
 * Item - Changelog verbs.
 *
 * @since 1.0.0
 */
export type ItemChangelogVerbs = readonly [
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
 * Item - Generic protocols.
 *
 * @since 1.0.0
 */
export type ItemGenericProtocols = readonly [
  'http:',
  'https:',
];

/**
 * Item - Nova config email fields.
 *
 * @since 1.0.0
 */
export type ItemNovaConfigEmailFields = readonly [
  'bugs',
];

/**
 * Item - Nova config url fields.
 *
 * @since 1.0.0
 */
export type ItemNovaConfigUrlFields = readonly [
  'homepage',
  'repository',
  'bugs',
  'license',
  'logo',
  'documentation',
  'github',
  'npm',
];

/**
 * Item - Package.json keys (Bundler).
 *
 * @since 1.0.0
 */
export type ItemPackageJsonKeysBundler = readonly [
  'types',
  'module',
  'sideEffects',
  'esnext',
];

/**
 * Item - Package.json keys (Corepack).
 *
 * @since 1.0.0
 */
export type ItemPackageJsonKeysCorepack = readonly [
  'packageManager',
];

/**
 * Item - Package.json keys (Node.js).
 *
 * @since 1.0.0
 */
export type ItemPackageJsonKeysNodeJs = readonly [
  'name',
  'main',
  'type',
  'exports',
  'imports',
];

/**
 * Item - Package.json keys (npm).
 *
 * @since 1.0.0
 */
export type ItemPackageJsonKeysNpm = readonly [
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
 * Item - Package.json keys sort order.
 *
 * @since 1.0.0
 */
export type ItemPackageJsonSortOrder = readonly [
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
 * Item - Pretty Names - Brand.
 *
 * @since 1.0.0
 */
export type ItemPrettyNamesBrand = ItemPrettyNames;

/**
 * Item - Pretty Names - Category.
 *
 * @since 1.0.0
 */
export type ItemPrettyNamesCategory = ItemPrettyNames;

/**
 * Item - Pretty Names - Column Title.
 *
 * @since 1.0.0
 */
export type ItemPrettyNamesColumnTitle = ItemPrettyNames;

/**
 * Item - Pretty Names - Type.
 *
 * @since 1.0.0
 */
export type ItemPrettyNamesType = ItemPrettyNames;

/**
 * Item - Repository protocols.
 *
 * @since 1.0.0
 */
export type ItemRepositoryProtocols = readonly [
  'git:',
  'git+https:',
  'git+ssh:',
  'git+http:',
  'https:',
  'http:',
];

/**
 * Item - Skip directories.
 *
 * @since 1.0.0
 */
export type ItemSkipDirectories = readonly [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
];
