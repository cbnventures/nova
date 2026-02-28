import type {
  ItemAllowedPoliciesByRole,
  ItemAllowedRoles,
  ItemAllowedSyncProperties,
  ItemChangelogAdjectives,
  ItemChangelogCategoryBumpMap,
  ItemChangelogNouns,
  ItemChangelogValidBumps,
  ItemChangelogValidCategories,
  ItemChangelogVerbs,
  ItemGenericProtocols,
  ItemNovaConfigEmailFields,
  ItemNovaConfigUrlFields,
  ItemPackageJsonKeysBundler,
  ItemPackageJsonKeysCorepack,
  ItemPackageJsonKeysNodeJs,
  ItemPackageJsonKeysNpm,
  ItemPackageJsonSortOrder,
  ItemPrettyNamesBrand,
  ItemPrettyNamesCategory,
  ItemPrettyNamesColumnTitle,
  ItemPrettyNamesType,
  ItemRepositoryProtocols,
  ItemSkipDirectories,
} from '@/types/lib/item.d.ts';

/**
 * Item - Allowed policies by role.
 *
 * @since 1.0.0
 */
export const itemAllowedPoliciesByRole: ItemAllowedPoliciesByRole = {
  project: ['freezable'],
  config: ['freezable', 'trackable'],
  docs: ['freezable', 'trackable'],
  app: ['trackable'],
  package: ['trackable', 'distributable'],
  tool: ['freezable', 'trackable'],
  template: ['freezable'],
};

/**
 * Item - Allowed roles.
 *
 * @since 1.0.0
 */
export const itemAllowedRoles: ItemAllowedRoles = [
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
export const itemAllowedSyncProperties: ItemAllowedSyncProperties = [
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
export const itemChangelogAdjectives: ItemChangelogAdjectives = [
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
export const itemChangelogCategoryBumpMap: ItemChangelogCategoryBumpMap = {
  added: 'minor',
  updated: 'minor',
  fixed: 'patch',
  removed: 'major',
};

/**
 * Item - Changelog nouns.
 *
 * @since 1.0.0
 */
export const itemChangelogNouns: ItemChangelogNouns = [
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
export const itemChangelogValidBumps: ItemChangelogValidBumps = [
  'major',
  'minor',
  'patch',
];

/**
 * Item - Changelog valid categories.
 *
 * @since 1.0.0
 */
export const itemChangelogValidCategories: ItemChangelogValidCategories = [
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
export const itemChangelogVerbs: ItemChangelogVerbs = [
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
export const itemGenericProtocols: ItemGenericProtocols = [
  'http:',
  'https:',
];

/**
 * Item - Nova config email fields.
 *
 * @since 1.0.0
 */
export const itemNovaConfigEmailFields: ItemNovaConfigEmailFields = [
  'bugs',
];

/**
 * Item - Nova config url fields.
 *
 * @since 1.0.0
 */
export const itemNovaConfigUrlFields: ItemNovaConfigUrlFields = [
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
export const itemPackageJsonKeysBundler: ItemPackageJsonKeysBundler = [
  // TypeScript (Microsoft).
  'types',
  // Rollup (Rich Harris).
  'module',
  // webpack (Tobias Koppers).
  'sideEffects',
  // Community (Angular APF).
  'esnext',
];

/**
 * Item - Package.json keys (Corepack).
 *
 * @since 1.0.0
 */
export const itemPackageJsonKeysCorepack: ItemPackageJsonKeysCorepack = [
  // Workspace & Tooling.
  'packageManager',
];

/**
 * Item - Package.json keys (Node.js).
 *
 * @since 1.0.0
 */
export const itemPackageJsonKeysNodeJs: ItemPackageJsonKeysNodeJs = [
  // Identity & Discovery.
  'name',
  // Runtime Entry Points.
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
export const itemPackageJsonKeysNpm: ItemPackageJsonKeysNpm = [
  // Identity & Discovery.
  'name',
  'version',
  'description',
  'keywords',
  'license',
  // Ownership & Support.
  'homepage',
  'bugs',
  'author',
  'contributors',
  'funding',
  'repository',
  // Runtime Entry Points.
  'exports',
  'main',
  'browser',
  // Executables & Artifacts.
  'files',
  'bin',
  'man',
  'directories',
  // Publishing Controls.
  'private',
  'publishConfig',
  // Workspace & Tooling.
  'scripts',
  'gypfile',
  'config',
  'workspaces',
  //  Environment Constraints.
  'engines',
  'os',
  'cpu',
  'libc',
  'devEngines',
  // Dependency Specs.
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
export const itemPackageJsonSortOrder: ItemPackageJsonSortOrder = [
  // Identity.
  'name',
  'version',
  'description',
  'keywords',
  'license',
  // Ownership.
  'homepage',
  'bugs',
  'author',
  'contributors',
  'funding',
  'repository',
  // Runtime.
  'exports',
  'main',
  'type',
  'browser',
  'imports',
  // Artifacts.
  'files',
  'bin',
  'man',
  'directories',
  // Publishing.
  'private',
  'publishConfig',
  // Tooling.
  'scripts',
  'gypfile',
  'config',
  'workspaces',
  // Corepack.
  'packageManager',
  // Environment.
  'engines',
  'os',
  'cpu',
  'libc',
  'devEngines',
  // Dependencies.
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'bundleDependencies',
  'optionalDependencies',
  'overrides',
  // Bundler (by vendor).
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
export const itemPrettyNamesBrand: ItemPrettyNamesBrand = {
  'brave': 'Brave Browser',
  'bun': 'Bun',
  'chrome': 'Google Chrome',
  'edge': 'Microsoft Edge',
  'firefox': 'Mozilla Firefox',
  'java': 'Java',
  'libreWolf': 'Mozilla LibreWolf',
  'nodeJs': 'Node.js',
  'npm': 'Node Package Manager (npm)',
  'nvmPosix': 'Node Version Manager (nvm)',
  'nvmWindows': 'NVM for Windows',
  'opera': 'Opera',
  'pnpm': 'Performant Node Package Manager (pnpm)',
  'rust': 'Rust',
  'safari': 'Apple Safari',
  'vivaldi': 'Vivaldi',
  'volta': 'Volta',
  'yarn': 'Yarn',
};

/**
 * Item - Pretty Names - Category.
 *
 * @since 1.0.0
 */
export const itemPrettyNamesCategory: ItemPrettyNamesCategory = {
  'browsers': 'Web Browsers',
  'env': 'Environment Managers',
  'interpreters': 'Interpreters / Runtimes',
  'node': 'Node.js + Tools',
  'os': 'Operating System',
};

/**
 * Item - Pretty Names - Column Title.
 *
 * @since 1.0.0
 */
export const itemPrettyNamesColumnTitle: ItemPrettyNamesColumnTitle = {
  'key-browsers': 'Browser',
  'key-env': 'Manager',
  'key-interpreters': 'Program',
  'key-node': 'Tool',
  'key-os': 'Type',
  'value-browsers': 'Version',
  'value-env': 'Version',
  'value-interpreters': 'Version',
  'value-node': 'Version',
  'value-os': 'Value',
};

/**
 * Item - Pretty Names - Type.
 *
 * @since 1.0.0
 */
export const itemPrettyNamesType: ItemPrettyNamesType = {
  'architecture': 'OS Architecture',
  'build': 'OS Build',
  'kernel': 'OS Kernel',
  'name': 'OS Name',
  'version': 'OS Version',
};

/**
 * Item - Repository protocols.
 *
 * @since 1.0.0
 */
export const itemRepositoryProtocols: ItemRepositoryProtocols = [
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
export const itemSkipDirectories: ItemSkipDirectories = [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
];
