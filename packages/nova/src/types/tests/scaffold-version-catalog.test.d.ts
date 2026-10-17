import type {
  Shared_ScaffoldVersionCatalog,
  Shared_ScaffoldVersionCatalog_Entry,
} from '../shared.d.ts';

/**
 * Tests - Scaffold Version Catalog.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_PackageDirectory = string;

export type Tests_ScaffoldVersionCatalog_CatalogPath = string;

export type Tests_ScaffoldVersionCatalog_CatalogRaw = string;

export type Tests_ScaffoldVersionCatalog_Catalog = Shared_ScaffoldVersionCatalog;

export type Tests_ScaffoldVersionCatalog_TemplatePaths = string[];

export type Tests_ScaffoldVersionCatalog_SourcePaths = string[];

export type Tests_ScaffoldVersionCatalog_TemplateContents = string;

export type Tests_ScaffoldVersionCatalog_SourceContents = string;

export type Tests_ScaffoldVersionCatalog_WorkflowBlueprintPath = string;

export type Tests_ScaffoldVersionCatalog_WorkflowBlueprintContents = string;

export type Tests_ScaffoldVersionCatalog_Placeholders = Set<string>;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Contains Valid And Uniquely Addressable Entries.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryKey = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ContainsValidAndUniquelyAddressableEntries_EntryValue = Shared_ScaffoldVersionCatalog_Entry;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Does Not Contain Unknown Scaffold Version Placeholders.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Segments = string[];

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_TypedSegment = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_SuffixIndex = number;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_DoesNotContainUnknownScaffoldVersionPlaceholders_Placeholder = string;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Owns Every Third Party Package Manifest Pin.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestPaths = string[];

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestSections = Array<'dependencies' | 'devDependencies' | 'engines' | 'peerDependencies'>;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestPath = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestRaw = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Manifest = Partial<Record<'dependencies' | 'devDependencies' | 'engines' | 'peerDependencies', Record<string, string>>>;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_TypedManifestSection = 'dependencies' | 'devDependencies' | 'engines' | 'peerDependencies';

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_ManifestValues = Record<string, string>;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Name = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyPackageManifestPin_Value = string;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Owns Every Third Party Workflow Action Reference.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_OwnsEveryThirdPartyWorkflowActionReference_BlueprintLine = string;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Resolves Catalog Values Without Network Access.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_ResolvesCatalogValuesWithoutNetworkAccess_TypescriptEntry = Shared_ScaffoldVersionCatalog_Entry | undefined;

/**
 * Tests - Scaffold Version Catalog - Scaffold Version Catalog - Uses Every Catalog Entry In A Template Or Generated Code Path.
 *
 * @since 0.32.0
 */
export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryKey = string;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryValue = Shared_ScaffoldVersionCatalog_Entry;

export type Tests_ScaffoldVersionCatalog_ScaffoldVersionCatalog_UsesEveryCatalogEntryInATemplateOrGeneratedCodePath_EntryUsage = boolean;
