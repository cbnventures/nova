import type {
  Lib_Item_AllowedPoliciesByRole,
  Lib_Item_AllowedRecipes,
  Lib_Item_AllowedRoles,
  Lib_Item_BundlerKeys,
  Lib_Item_ChangelogAdjectives,
  Lib_Item_ChangelogCategoryBumpMap,
  Lib_Item_ChangelogNouns,
  Lib_Item_ChangelogOrderedCategories,
  Lib_Item_ChangelogValidBumps,
  Lib_Item_ChangelogValidCategories,
  Lib_Item_ChangelogVerbs,
  Lib_Item_CorepackKeys,
  Lib_Item_EcosystemKeys,
  Lib_Item_EmailFields,
  Lib_Item_GenericProtocols,
  Lib_Item_NodeJsKeys,
  Lib_Item_NpmKeys,
  Lib_Item_PrettyNamesAbbreviation,
  Lib_Item_PrettyNamesBrand,
  Lib_Item_PrettyNamesCategory,
  Lib_Item_PrettyNamesColumnTitle,
  Lib_Item_PrettyNamesKeyword,
  Lib_Item_PrettyNamesType,
  Lib_Item_RepositoryProtocols,
  Lib_Item_SideEffectsEsnextRoles,
  Lib_Item_SkipDirectories,
  Lib_Item_SortOrderKeys,
  Lib_Item_SyncRoles,
  Lib_Item_TypesModuleRoles,
  Lib_Item_UrlFields,
  Lib_Item_ValidEntityRoles,
} from '../types/lib/item.d.ts';

/**
 * Lib - Item - Allowed Policies By Role.
 *
 * Maps each workspace role to the lifecycle policies it supports. Used by nova-config
 * parsing and the initialize prompt to constrain selection.
 *
 * @since 0.11.0
 */
export const libItemAllowedPoliciesByRole: Lib_Item_AllowedPoliciesByRole = {
  project: ['freezable'],
  config: [
    'freezable',
    'trackable',
  ],
  docs: [
    'freezable',
    'trackable',
  ],
  app: ['trackable'],
  package: [
    'trackable',
    'distributable',
  ],
  tool: [
    'freezable',
    'trackable',
  ],
  template: ['freezable'],
};

/**
 * Lib - Item - Allowed Recipes.
 *
 * Canonical list of package-json recipe names that the CLI accepts. Nova-config
 * validates workspace recipes against this set during parsing.
 *
 * @since 0.11.0
 */
export const libItemAllowedRecipes: Lib_Item_AllowedRecipes = [
  'cleanup',
  'normalize-artifacts',
  'normalize-bundler',
  'normalize-dependencies',
  'normalize-modules',
  'normalize-tooling',
  'sync-environment',
  'sync-identity',
  'sync-ownership',
];

/**
 * Lib - Item - Allowed Roles.
 *
 * Every valid workspace role in the monorepo. Used by nova-config to validate
 * role candidates and by the initialize prompt to populate role choices.
 *
 * @since 0.11.0
 */
export const libItemAllowedRoles: Lib_Item_AllowedRoles = [
  'project',
  'docs',
  'config',
  'app',
  'package',
  'tool',
  'template',
];

/**
 * Lib - Item - Changelog Adjectives.
 *
 * Word pool for random changelog file name generation. Combined with a noun and verb
 * to produce names like "bold-cats-jump".
 *
 * @since 0.11.0
 */
export const libItemChangelogAdjectives: Lib_Item_ChangelogAdjectives = [
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
 * Maps each changelog category to its default semver bump level. The changelog record
 * command uses this to pre-select the bump when chosen.
 *
 * @since 0.11.0
 */
export const libItemChangelogCategoryBumpMap: Lib_Item_ChangelogCategoryBumpMap = {
  added: 'minor',
  updated: 'minor',
  fixed: 'patch',
  removed: 'major',
};

/**
 * Lib - Item - Changelog Nouns.
 *
 * Word pool for random changelog file name generation. Combined with an adjective and
 * verb to produce names like "bold-cats-jump".
 *
 * @since 0.11.0
 */
export const libItemChangelogNouns: Lib_Item_ChangelogNouns = [
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
 * Controls the section ordering when writing the changelog markdown. Sections
 * appear as UPDATED, FIXED, ADDED, then REMOVED in the output file.
 *
 * @since 0.11.0
 */
export const libItemChangelogOrderedCategories: Lib_Item_ChangelogOrderedCategories = [
  'updated',
  'fixed',
  'added',
  'removed',
];

/**
 * Lib - Item - Changelog Valid Bumps.
 *
 * Accepted semver bump levels for changelog entries. The changelog record command
 * validates user input and parses existing entries.
 *
 * @since 0.11.0
 */
export const libItemChangelogValidBumps: Lib_Item_ChangelogValidBumps = [
  'major',
  'minor',
  'patch',
];

/**
 * Lib - Item - Changelog Valid Categories.
 *
 * Accepted changelog entry categories. The changelog record command validates
 * user input and parses existing entries against this list.
 *
 * @since 0.11.0
 */
export const libItemChangelogValidCategories: Lib_Item_ChangelogValidCategories = [
  'added',
  'updated',
  'fixed',
  'removed',
];

/**
 * Lib - Item - Changelog Verbs.
 *
 * Word pool for random changelog file name generation. Combined with an adjective and
 * noun to produce names like "bold-cats-jump".
 *
 * @since 0.11.0
 */
export const libItemChangelogVerbs: Lib_Item_ChangelogVerbs = [
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
 * Lib - Item - Generic Protocols.
 *
 * Allowed URL schemes for non-repository fields in nova-config. The getUrl validator
 * selects this list for homepage, bugs, and documentation.
 *
 * @since 0.11.0
 */
export const libItemGenericProtocols: Lib_Item_GenericProtocols = [
  'http:',
  'https:',
];

/**
 * Lib - Item - Sync Roles.
 *
 * Workspace roles whose names are prefixed with the project slug. When the slug changes,
 * the initialize command renames these workspaces automatically.
 *
 * @since 0.11.0
 */
export const libItemSyncRoles: Lib_Item_SyncRoles = [
  'project',
  'docs',
  'config',
  'app',
  'tool',
];

/**
 * Lib - Item - Valid Entity Roles.
 *
 * Accepted roles for people entries in nova-config. The initialize prompt uses this
 * list to populate the role multi-select.
 *
 * @since 0.11.0
 */
export const libItemValidEntityRoles: Lib_Item_ValidEntityRoles = [
  'author',
  'contributor',
  'supporter',
];

/**
 * Lib - Item - Side Effects ESNext Roles.
 *
 * Workspace roles that may declare sideEffects and esnext fields in package.json. The
 * normalize-bundler recipe strips these fields from all other roles.
 *
 * @since 0.11.0
 */
export const libItemSideEffectsEsnextRoles: Lib_Item_SideEffectsEsnextRoles = ['package'];

/**
 * Lib - Item - Types Module Roles.
 *
 * Workspace roles that may declare types and module fields in package.json. The
 * normalize-bundler recipe strips these fields from all other roles.
 *
 * @since 0.11.0
 */
export const libItemTypesModuleRoles: Lib_Item_TypesModuleRoles = [
  'config',
  'package',
  'tool',
];

/**
 * Lib - Item - Email Fields.
 *
 * Nova-config field names whose values are validated as email addresses. The parseEmails
 * method iterates this list to extract and verify each address.
 *
 * @since 0.11.0
 */
export const libItemEmailFields: Lib_Item_EmailFields = ['bugs'];

/**
 * Lib - Item - URL Fields.
 *
 * Nova-config field names whose values are validated as URLs. The parseUrls method
 * iterates this list and applies protocol checks per field.
 *
 * @since 0.11.0
 */
export const libItemUrlFields: Lib_Item_UrlFields = [
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
 * Lib - Item - Bundler Keys.
 *
 * Package.json fields read by bundler tooling such as TypeScript, Rollup, and webpack.
 * The cleanup recipe includes these in the allowed-keys set.
 *
 * @since 0.11.0
 */
export const libItemBundlerKeys: Lib_Item_BundlerKeys = [

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
 * Lib - Item - Corepack Keys.
 *
 * Package.json fields read by Node.js Corepack.
 * The cleanup recipe includes these in the allowed-keys set.
 *
 * @since 0.11.0
 */
export const libItemCorepackKeys: Lib_Item_CorepackKeys = ['packageManager'];

/**
 * Lib - Item - Ecosystem Keys.
 *
 * Package.json fields adopted by ecosystems outside the npm specification, such as
 * Homebridge plugins and VS Code extensions. The cleanup recipe includes these in the
 * allowed-keys set.
 *
 * @since 0.18.0
 */
export const libItemEcosystemKeys: Lib_Item_EcosystemKeys = ['displayName'];

/**
 * Lib - Item - Node Js Keys.
 *
 * Package.json fields read by the Node.js runtime for module resolution and entry points.
 * The cleanup recipe includes these in the allowed-keys set.
 *
 * @since 0.11.0
 */
export const libItemNodeJsKeys: Lib_Item_NodeJsKeys = [

  // Identity & Discovery.
  'name',

  // Runtime Entry Points.
  'main',
  'type',
  'exports',
  'imports',
];

/**
 * Lib - Item - npm Keys.
 *
 * Package.json fields defined by the npm registry specification. The cleanup recipe
 * combines these with bundler, Corepack, ecosystem, and Node.js keys.
 *
 * @since 0.11.0
 */
export const libItemNpmKeys: Lib_Item_NpmKeys = [

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
 * Lib - Item - Sort Order Keys.
 *
 * Canonical key ordering for package.json files. The cleanup recipe reorders every
 * workspace manifest to match this sequence, appending unknown keys last.
 *
 * @since 0.11.0
 */
export const libItemSortOrderKeys: Lib_Item_SortOrderKeys = [

  // Identity (part 1).
  'name',

  // Ecosystem.
  'displayName',

  // Identity (part 2).
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
 * Lib - Item - Pretty Names Abbreviation.
 *
 * Maps lowercase abbreviations to their uppercase form. The require-jsdoc-hierarchy
 * ESLint rule uses this to capitalize segments in JSDoc summary lines.
 *
 * @since 0.15.0
 */
export const libItemPrettyNamesAbbreviation: Lib_Item_PrettyNamesAbbreviation = {
  'ai': 'AI',
  'ansi': 'ANSI',
  'api': 'API',
  'aws': 'AWS',
  'cli': 'CLI',
  'crlf': 'CRLF',
  'css': 'CSS',
  'dns': 'DNS',
  'dom': 'DOM',
  'dx': 'DX',
  'fw': 'FW',
  'html': 'HTML',
  'http': 'HTTP',
  'https': 'HTTPS',
  'id': 'ID',
  'io': 'IO',
  'ip': 'IP',
  'json': 'JSON',
  'jsx': 'JSX',
  'ld': 'LD',
  'lf': 'LF',
  'lts': 'LTS',
  'mdx': 'MDX',
  'os': 'OS',
  'sdk': 'SDK',
  'spdx': 'SPDX',
  'sql': 'SQL',
  'ssh': 'SSH',
  'ssl': 'SSL',
  'tcp': 'TCP',
  'tls': 'TLS',
  'tsx': 'TSX',
  'udp': 'UDP',
  'ui': 'UI',
  'uri': 'URI',
  'url': 'URL',
  'urls': 'URLs',
  'xml': 'XML',
};

/**
 * Lib - Item - Pretty Names Brand.
 *
 * Maps camelCase brand keys to their display names. The version command uses this to
 * label rows in the environment table printed to the terminal.
 *
 * @since 0.11.0
 */
export const libItemPrettyNamesBrand: Lib_Item_PrettyNamesBrand = {
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
 * Lib - Item - Pretty Names Category.
 *
 * Maps category keys to their display headings. The version command prints these as
 * section titles above each environment table group.
 *
 * @since 0.11.0
 */
export const libItemPrettyNamesCategory: Lib_Item_PrettyNamesCategory = {
  'browsers': 'Web Browsers',
  'env': 'Environment Managers',
  'interpreters': 'Interpreters / Runtimes',
  'node': 'Node.js + Tools',
  'os': 'Operating System',
};

/**
 * Lib - Item - Pretty Names Column Title.
 *
 * Maps composite keys like "key-browsers" to column headers for the markdown tables
 * built by the version command's environment output.
 *
 * @since 0.11.0
 */
export const libItemPrettyNamesColumnTitle: Lib_Item_PrettyNamesColumnTitle = {
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
 * Lib - Item - Pretty Names Keyword.
 *
 * Maps lowercase keywords to their branded display form. The require-jsdoc-hierarchy
 * ESLint rule uses this alongside abbreviations for segment casing.
 *
 * @since 0.15.0
 */
export const libItemPrettyNamesKeyword: Lib_Item_PrettyNamesKeyword = {
  'eslint': 'ESLint',
  'esnext': 'ESNext',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'github': 'GitHub',
  'javascript': 'JavaScript',
  'jsdoc': 'JSDoc',
  'kofi': 'Ko-fi',
  'nextjs': 'Next.js',
  'npm': 'npm',
  'package-json': 'package.json',
  'paypal': 'PayPal',
  'typescript': 'TypeScript',
};

/**
 * Lib - Item - Pretty Names Type.
 *
 * Maps OS-related keys to their display labels. The version command falls back to this
 * map when a row key has no matching brand name.
 *
 * @since 0.11.0
 */
export const libItemPrettyNamesType: Lib_Item_PrettyNamesType = {
  'architecture': 'OS Architecture',
  'build': 'OS Build',
  'kernel': 'OS Kernel',
  'name': 'OS Name',
  'version': 'OS Version',
};

/**
 * Lib - Item - Repository Protocols.
 *
 * Allowed URL schemes for the repository field in nova-config. Includes git-specific
 * protocols that are invalid for generic URL fields.
 *
 * @since 0.11.0
 */
export const libItemRepositoryProtocols: Lib_Item_RepositoryProtocols = [
  'git:',
  'git+https:',
  'git+ssh:',
  'git+http:',
  'https:',
  'http:',
];

/**
 * Lib - Item - Skip Directories.
 *
 * Directory names excluded during workspace discovery. The discoverPathsWithFile
 * utility skips these to avoid scanning build artifacts.
 *
 * @since 0.11.0
 */
export const libItemSkipDirectories: Lib_Item_SkipDirectories = [
  'node_modules',
  'dist',
  'build',
  'out',
  'coverage',
];
