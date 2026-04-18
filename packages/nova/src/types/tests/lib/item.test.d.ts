import type { SharedChangelogEntryBump } from '../../shared.d.ts';

/**
 * Tests - Lib - Item - Allowed Recipes.
 *
 * @since 0.13.0
 */
export type TestsLibItemIncludesSyncIdentity = boolean;

export type TestsLibItemIncludesNormalizeDependencies = boolean;

export type TestsLibItemIncludesSyncEnvironment = boolean;

/**
 * Tests - Lib - Item - Allowed Roles And Policies.
 *
 * @since 0.13.0
 */
export type TestsLibItemIncludesProject = boolean;

export type TestsLibItemIncludesDocs = boolean;

export type TestsLibItemIncludesConfig = boolean;

export type TestsLibItemIncludesApp = boolean;

export type TestsLibItemIncludesPackage = boolean;

export type TestsLibItemIncludesTool = boolean;

export type TestsLibItemIncludesTemplate = boolean;

export type TestsLibItemUnique = Set<string>;

export type TestsLibItemPolicyRoles = string[];

export type TestsLibItemFound = string | undefined;

/**
 * Tests - Lib - Item - Changelog Constants.
 *
 * @since 0.13.0
 */
export type TestsLibItemIncludesMajor = boolean;

export type TestsLibItemIncludesMinor = boolean;

export type TestsLibItemIncludesPatch = boolean;

export type TestsLibItemIncludesAdded = boolean;

export type TestsLibItemIncludesUpdated = boolean;

export type TestsLibItemIncludesFixed = boolean;

export type TestsLibItemIncludesRemoved = boolean;

export type TestsLibItemCategory = string;

export type TestsLibItemBump = SharedChangelogEntryBump;

export type TestsLibItemIsValidBump = boolean;

/**
 * Tests - Lib - Item - package.json Key Arrays.
 *
 * @since 0.13.0
 */
export type TestsLibItemIncludesName = boolean;

export type TestsLibItemIncludesVersion = boolean;

export type TestsLibItemIncludesDescription = boolean;

export type TestsLibItemIncludesLicense = boolean;

export type TestsLibItemIncludesDependencies = boolean;

export type TestsLibItemIncludesDevDependencies = boolean;

/**
 * Tests - Lib - Item - Pretty Name Maps.
 *
 * @since 0.13.0
 */
export type TestsLibItemKey = string;

export type TestsLibItemValue = string;
