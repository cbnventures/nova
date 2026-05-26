/* Shared data structure types - referenced across sections. Declared before
 * any section header so they are exempt from the section ordering and
 * cross-section reference rules enforced by type-declarations.test.ts. */

export type TestsDemoCoverageDemoRecord = Record<string, unknown>;

export type TestsDemoCoverageDemoEntryName = string;

export type TestsDemoCoverageDemoEntryPath = string;

export type TestsDemoCoverageDemoEntry = {
  readonly name: TestsDemoCoverageDemoEntryName;
  readonly path: TestsDemoCoverageDemoEntryPath;
};

/**
 * Tests - Demo Coverage - Demo Coverage.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageDemoCoverageDerived = readonly string[];

export type TestsDemoCoverageDemoCoverageDerivedSet = Set<string>;

export type TestsDemoCoverageDemoCoverageRegistrySet = Set<string>;

export type TestsDemoCoverageDemoCoverageMissingInRegistry = string[];

export type TestsDemoCoverageDemoCoverageStaleInRegistry = string[];

export type TestsDemoCoverageDemoCoverageRegistryMessage = string;

export type TestsDemoCoverageDemoCoverageDemo = TestsDemoCoverageDemoEntry;

export type TestsDemoCoverageDemoCoverageDemoParam = TestsDemoCoverageDemoEntry;

export type TestsDemoCoverageDemoCoverageConfig = TestsDemoCoverageDemoRecord;

export type TestsDemoCoverageDemoCoverageMisses = string[];

export type TestsDemoCoverageDemoCoverageLeaf = string;

export type TestsDemoCoverageDemoCoverageValue = string | null;

export type TestsDemoCoverageDemoCoverageMessage = string;

/**
 * Tests - Demo Coverage - Demos.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageDemos = readonly TestsDemoCoverageDemoEntry[];

/**
 * Tests - Demo Coverage - Derive Required Leaf Paths.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageDeriveRequiredLeafPathsTypeFilePath = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsReturns = Promise<readonly string[]>;

export type TestsDemoCoverageDeriveRequiredLeafPathsFileText = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsObjectTypes = Map<string, Map<string, string>>;

export type TestsDemoCoverageDeriveRequiredLeafPathsBlockPattern = RegExp;

export type TestsDemoCoverageDeriveRequiredLeafPathsBlockMatch = RegExpExecArray | null;

export type TestsDemoCoverageDeriveRequiredLeafPathsTypeName = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsBlockBody = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsFields = Map<string, string>;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldPattern = RegExp;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldMatch = RegExpExecArray | null;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldName = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldExpression = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldTypeMatch = RegExpMatchArray | null;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldType = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsLeaves = string[];

export type TestsDemoCoverageDeriveRequiredLeafPathsWalkStack = TestsDemoCoverageDeriveRequiredLeafPathsWalkEntry[];

export type TestsDemoCoverageDeriveRequiredLeafPathsWalkEntryTypeName = string;

export type TestsDemoCoverageDeriveRequiredLeafPathsWalkEntryPath = string[];

export type TestsDemoCoverageDeriveRequiredLeafPathsWalkEntry = {
  typeName: TestsDemoCoverageDeriveRequiredLeafPathsWalkEntryTypeName;
  path: TestsDemoCoverageDeriveRequiredLeafPathsWalkEntryPath;
};

export type TestsDemoCoverageDeriveRequiredLeafPathsEntryFields = TestsDemoCoverageDeriveRequiredLeafPathsFields | undefined;

export type TestsDemoCoverageDeriveRequiredLeafPathsFieldEntry = readonly [string, string];

/**
 * Tests - Demo Coverage - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageGetPackageRootReturns = string;

export type TestsDemoCoverageGetPackageRootCurrentFilePath = string;

export type TestsDemoCoverageGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Demo Coverage - Get Repo Root.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageGetRepoRootReturns = string;

/**
 * Tests - Demo Coverage - Load Demo Config.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageLoadDemoConfigDemoPath = string;

export type TestsDemoCoverageLoadDemoConfigReturns = Promise<TestsDemoCoverageDemoRecord>;

export type TestsDemoCoverageLoadDemoConfigConfigUrl = string;

export type TestsDemoCoverageLoadDemoConfigModuleDefault = TestsDemoCoverageDemoRecord;

export type TestsDemoCoverageLoadDemoConfigModule = {
  default: TestsDemoCoverageLoadDemoConfigModuleDefault;
};

/**
 * Tests - Demo Coverage - Required Leaf Paths.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageRequiredLeafPaths = readonly string[];

/**
 * Tests - Demo Coverage - Resolve Leaf.
 *
 * @since 0.18.0
 */
export type TestsDemoCoverageResolveLeafConfig = TestsDemoCoverageDemoRecord;

export type TestsDemoCoverageResolveLeafPath = string;

export type TestsDemoCoverageResolveLeafReturns = string | null;

export type TestsDemoCoverageResolveLeafSegments = readonly string[];

export type TestsDemoCoverageResolveLeafCursor = unknown;

export type TestsDemoCoverageResolveLeafIndex = number;

export type TestsDemoCoverageResolveLeafSegment = string;
