import type {
  Shared_ChangelogEntry_Bump,
  Shared_ChangelogEntry_Category,
  Shared_ItemPrettyNames,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Role,
  Shared_NovaConfigWorkspaceRecipeName,
} from '../shared.d.ts';

/**
 * Lib - Item - Allowed Policies By Role.
 *
 * @since 0.11.0
 */
export type Lib_Item_AllowedPoliciesByRole_Project = Extract<Shared_NovaConfigWorkspace_Policy, 'freezable'>[];

export type Lib_Item_AllowedPoliciesByRole_Config = Extract<Shared_NovaConfigWorkspace_Policy, 'freezable' | 'trackable'>[];

export type Lib_Item_AllowedPoliciesByRole_Docs = Extract<Shared_NovaConfigWorkspace_Policy, 'freezable' | 'trackable'>[];

export type Lib_Item_AllowedPoliciesByRole_App = Extract<Shared_NovaConfigWorkspace_Policy, 'trackable'>[];

export type Lib_Item_AllowedPoliciesByRole_Package = Extract<Shared_NovaConfigWorkspace_Policy, 'trackable' | 'distributable'>[];

export type Lib_Item_AllowedPoliciesByRole_Tool = Extract<Shared_NovaConfigWorkspace_Policy, 'freezable' | 'trackable'>[];

export type Lib_Item_AllowedPoliciesByRole_Template = Extract<Shared_NovaConfigWorkspace_Policy, 'freezable'>[];

export type Lib_Item_AllowedPoliciesByRole = {
  project: Lib_Item_AllowedPoliciesByRole_Project;
  config: Lib_Item_AllowedPoliciesByRole_Config;
  docs: Lib_Item_AllowedPoliciesByRole_Docs;
  app: Lib_Item_AllowedPoliciesByRole_App;
  package: Lib_Item_AllowedPoliciesByRole_Package;
  tool: Lib_Item_AllowedPoliciesByRole_Tool;
  template: Lib_Item_AllowedPoliciesByRole_Template;
};

/**
 * Lib - Item - Allowed Recipes.
 *
 * @since 0.11.0
 */
export type Lib_Item_AllowedRecipes = readonly Shared_NovaConfigWorkspaceRecipeName[];

/**
 * Lib - Item - Allowed Roles.
 *
 * @since 0.11.0
 */
export type Lib_Item_AllowedRoles = readonly [
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
export type Lib_Item_BundlerKeys = readonly [
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
export type Lib_Item_ChangelogAdjectives = readonly [
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
export type Lib_Item_ChangelogCategoryBumpMap = Record<Shared_ChangelogEntry_Category, Shared_ChangelogEntry_Bump>;

/**
 * Lib - Item - Changelog Nouns.
 *
 * @since 0.11.0
 */
export type Lib_Item_ChangelogNouns = readonly [
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
export type Lib_Item_ChangelogOrderedCategories = readonly Shared_ChangelogEntry_Category[];

/**
 * Lib - Item - Changelog Valid Bumps.
 *
 * @since 0.11.0
 */
export type Lib_Item_ChangelogValidBumps = readonly [
  'major',
  'minor',
  'patch',
];

/**
 * Lib - Item - Changelog Valid Categories.
 *
 * @since 0.11.0
 */
export type Lib_Item_ChangelogValidCategories = readonly [
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
export type Lib_Item_ChangelogVerbs = readonly [
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
export type Lib_Item_CorepackKeys = readonly [
  'packageManager',
];

/**
 * Lib - Item - Ecosystem Keys.
 *
 * @since 0.18.0
 */
export type Lib_Item_EcosystemKeys = readonly [
  'displayName',
];

/**
 * Lib - Item - Email Fields.
 *
 * @since 0.11.0
 */
export type Lib_Item_EmailFields = readonly [
  'bugs',
];

/**
 * Lib - Item - Generic Protocols.
 *
 * @since 0.11.0
 */
export type Lib_Item_GenericProtocols = readonly [
  'http:',
  'https:',
];

/**
 * Lib - Item - Node Js Keys.
 *
 * @since 0.11.0
 */
export type Lib_Item_NodeJsKeys = readonly [
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
export type Lib_Item_NpmKeys = readonly [
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
export type Lib_Item_PrettyNamesAbbreviation = Shared_ItemPrettyNames;

/**
 * Lib - Item - Pretty Names Brand.
 *
 * @since 0.11.0
 */
export type Lib_Item_PrettyNamesBrand = Shared_ItemPrettyNames;

/**
 * Lib - Item - Pretty Names Category.
 *
 * @since 0.11.0
 */
export type Lib_Item_PrettyNamesCategory = Shared_ItemPrettyNames;

/**
 * Lib - Item - Pretty Names Column Title.
 *
 * @since 0.11.0
 */
export type Lib_Item_PrettyNamesColumnTitle = Shared_ItemPrettyNames;

/**
 * Lib - Item - Pretty Names Keyword.
 *
 * @since 0.15.0
 */
export type Lib_Item_PrettyNamesKeyword = Shared_ItemPrettyNames;

/**
 * Lib - Item - Pretty Names Type.
 *
 * @since 0.11.0
 */
export type Lib_Item_PrettyNamesType = Shared_ItemPrettyNames;

/**
 * Lib - Item - Repository Protocols.
 *
 * @since 0.11.0
 */
export type Lib_Item_RepositoryProtocols = readonly [
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
export type Lib_Item_SideEffectsEsnextRoles = readonly Shared_NovaConfigWorkspace_Role[];

/**
 * Lib - Item - Skip Directories.
 *
 * @since 0.11.0
 */
export type Lib_Item_SkipDirectories = readonly [
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
export type Lib_Item_SortOrderKeys = readonly [
  'name',
  'displayName',
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
export type Lib_Item_SyncRoles = readonly Shared_NovaConfigWorkspace_Role[];

/**
 * Lib - Item - Types Module Roles.
 *
 * @since 0.11.0
 */
export type Lib_Item_TypesModuleRoles = readonly Shared_NovaConfigWorkspace_Role[];

/**
 * Lib - Item - URL Fields.
 *
 * @since 0.11.0
 */
export type Lib_Item_UrlFields = readonly [
  'homepage',
  'repository',
  'bugs',
  'license',
  'logo',
  'documentation',
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
export type Lib_Item_ValidEntityRoles = readonly Shared_NovaConfigEntityRole[];
