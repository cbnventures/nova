/* Shared data structure types - referenced across sections. Declared before
 * any section header so they are exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type Tests_DemoCoverage_DemoRecord = Record<string, unknown>;

export type Tests_DemoCoverage_DemoEntryName = string;

export type Tests_DemoCoverage_DemoEntryPath = string;

export type Tests_DemoCoverage_DemoEntry = {
  readonly name: Tests_DemoCoverage_DemoEntryName;
  readonly path: Tests_DemoCoverage_DemoEntryPath;
};

/**
 * Tests - Demo Coverage - Demo Coverage.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_DemoCoverage_Derived = readonly string[];

export type Tests_DemoCoverage_DemoCoverage_DerivedSet = Set<string>;

export type Tests_DemoCoverage_DemoCoverage_RegistrySet = Set<string>;

export type Tests_DemoCoverage_DemoCoverage_MissingInRegistry = string[];

export type Tests_DemoCoverage_DemoCoverage_StaleInRegistry = string[];

export type Tests_DemoCoverage_DemoCoverage_RegistryMessage = string;

export type Tests_DemoCoverage_DemoCoverage_Demo = Tests_DemoCoverage_DemoEntry;

export type Tests_DemoCoverage_DemoCoverage_DemoParam = Tests_DemoCoverage_DemoEntry;

export type Tests_DemoCoverage_DemoCoverage_Config = Tests_DemoCoverage_DemoRecord;

export type Tests_DemoCoverage_DemoCoverage_Misses = string[];

export type Tests_DemoCoverage_DemoCoverage_Leaf = string;

export type Tests_DemoCoverage_DemoCoverage_Value = string | null;

export type Tests_DemoCoverage_DemoCoverage_Message = string;

/**
 * Tests - Demo Coverage - Demos.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_Demos = readonly Tests_DemoCoverage_DemoEntry[];

/**
 * Tests - Demo Coverage - Derive Required Leaf Paths.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeFilePath = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_Returns = Promise<readonly string[]>;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FileText = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_ObjectTypes = Map<string, Map<string, string>>;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockPattern = RegExp;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockMatch = RegExpExecArray | null;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_TypeName = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_BlockBody = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_Fields = Map<string, string>;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldPattern = RegExp;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldMatch = RegExpExecArray | null;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldName = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldExpression = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldTypeMatch = RegExpMatchArray | null;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldType = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_Leaves = string[];

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkStack = Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry[];

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry_TypeName = string;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry_Path = string[];

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry = {
  typeName: Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry_TypeName;
  path: Tests_DemoCoverage_DeriveRequiredLeafPaths_WalkEntry_Path;
};

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_EntryFields = Tests_DemoCoverage_DeriveRequiredLeafPaths_Fields | undefined;

export type Tests_DemoCoverage_DeriveRequiredLeafPaths_FieldEntry = readonly [string, string];

/**
 * Tests - Demo Coverage - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_GetPackageRoot_Returns = string;

export type Tests_DemoCoverage_GetPackageRoot_CurrentFilePath = string;

export type Tests_DemoCoverage_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Demo Coverage - Get Repo Root.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_GetRepoRoot_Returns = string;

/**
 * Tests - Demo Coverage - Load Demo Config.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_LoadDemoConfig_DemoPath = string;

export type Tests_DemoCoverage_LoadDemoConfig_Returns = Promise<Tests_DemoCoverage_DemoRecord>;

export type Tests_DemoCoverage_LoadDemoConfig_ConfigUrl = string;

export type Tests_DemoCoverage_LoadDemoConfig_Module_Default = Tests_DemoCoverage_DemoRecord;

export type Tests_DemoCoverage_LoadDemoConfig_Module = {
  default: Tests_DemoCoverage_LoadDemoConfig_Module_Default;
};

/**
 * Tests - Demo Coverage - Required Leaf Paths.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_RequiredLeafPaths = readonly string[];

/**
 * Tests - Demo Coverage - Resolve Leaf.
 *
 * @since 0.18.0
 */
export type Tests_DemoCoverage_ResolveLeaf_Config = Tests_DemoCoverage_DemoRecord;

export type Tests_DemoCoverage_ResolveLeaf_Path = string;

export type Tests_DemoCoverage_ResolveLeaf_Returns = string | null;

export type Tests_DemoCoverage_ResolveLeaf_Segments = readonly string[];

export type Tests_DemoCoverage_ResolveLeaf_Cursor = unknown;

export type Tests_DemoCoverage_ResolveLeaf_Index = number;

export type Tests_DemoCoverage_ResolveLeaf_Segment = string;
