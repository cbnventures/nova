import type { CommentRange, Node, SourceFile } from 'typescript';

/**
 * Tests - Since Version.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_PackageJsonRaw = string;

export type Tests_SinceVersion_PackageJson = {
  version?: string;
};

export type Tests_SinceVersion_PackageVersion = string;

export type Tests_SinceVersion_SrcDir = string;

export type Tests_SinceVersion_RawEntries = string[];

export type Tests_SinceVersion_SourceFiles = string[];

export type Tests_SinceVersion_SourceFile = string;

export type Tests_SinceVersion_FileContent = string;

export type Tests_SinceVersion_TagValues = string[];

export type Tests_SinceVersion_TagValue = string;

export type Tests_SinceVersion_Violation = string;

export type Tests_SinceVersion_MessageParts = string[];

export type Tests_SinceVersion_Message = string;

/**
 * Tests - Since Version - Compare Semver Lte.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_CompareSemverLte_A = string;

export type Tests_SinceVersion_CompareSemverLte_B = string;

export type Tests_SinceVersion_CompareSemverLte_Returns = boolean;

export type Tests_SinceVersion_CompareSemverLte_PartsA = number[];

export type Tests_SinceVersion_CompareSemverLte_PartsB = number[];

export type Tests_SinceVersion_CompareSemverLte_Length = number;

export type Tests_SinceVersion_CompareSemverLte_ValA = number;

export type Tests_SinceVersion_CompareSemverLte_ValB = number;

/**
 * Tests - Since Version - Extract Tag Values.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_ExtractTagValues_FilePath = string;

export type Tests_SinceVersion_ExtractTagValues_Content = string;

export type Tests_SinceVersion_ExtractTagValues_Returns = string[];

export type Tests_SinceVersion_ExtractTagValues_Sf = SourceFile;

export type Tests_SinceVersion_ExtractTagValues_Seen = Set<string>;

export type Tests_SinceVersion_ExtractTagValues_Values = string[];

export type Tests_SinceVersion_ExtractTagValues_TagRe = RegExp;

export type Tests_SinceVersion_ExtractTagValues_Visit_Node = Node;

export type Tests_SinceVersion_ExtractTagValues_Visit_Returns = void;

export type Tests_SinceVersion_ExtractTagValues_Visit_Ranges = CommentRange[] | undefined;

export type Tests_SinceVersion_ExtractTagValues_Visit_R = CommentRange;

export type Tests_SinceVersion_ExtractTagValues_Visit_Key = string;

export type Tests_SinceVersion_ExtractTagValues_Visit_CommentText = string;

export type Tests_SinceVersion_ExtractTagValues_Visit_TagMatch = RegExpExecArray | null;

export type Tests_SinceVersion_ExtractTagValues_Visit_TagValue = string;

/**
 * Tests - Since Version - Is Valid Tag Value.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_Value = string;

export type Tests_SinceVersion_IsValidTagValue_PackageVersion = string;

export type Tests_SinceVersion_IsValidTagValue_Returns = boolean;

export type Tests_SinceVersion_IsValidTagValue_SemverMatch = RegExpMatchArray | null;

export type Tests_SinceVersion_IsValidTagValue_PackageJsonPath = string;

export type Tests_SinceVersion_IsValidTagValue_CurrentVersion = string;

/**
 * Tests - Since Version - Is Valid Tag Value - Accepts Since 0.18.0 Past Version.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_AcceptsSince0180PastVersion_Fixture = string;

/**
 * Tests - Since Version - Is Valid Tag Value - Accepts Since Equal To The Current Package Version Boundary.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_AcceptsSinceEqualToTheCurrentPackageVersionBoundary_Fixture = string;

/**
 * Tests - Since Version - Is Valid Tag Value - Accepts Since UNRELEASED.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_AcceptsSinceUNRELEASED_Fixture = string;

/**
 * Tests - Since Version - Is Valid Tag Value - Rejects Since 0.99.0 Future Version.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_RejectsSince0990FutureVersion_Fixture = string;

/**
 * Tests - Since Version - Is Valid Tag Value - Rejects Since Banana Non Semver Non UNRELEASED.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_IsValidTagValue_RejectsSinceBananaNonSemverNonUNRELEASED_Fixture = string;

/**
 * Tests - Since Version - Since Version Scan.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_SinceVersionScan_PackageDirectory = string;

export type Tests_SinceVersion_SinceVersionScan_PackageJsonPath = string;

/**
 * Tests - Since Version - Since Version Scan - Every Since Deprecated Value Is UNRELEASED Or A Released Version.
 *
 * @since 0.20.0
 */
export type Tests_SinceVersion_SinceVersionScan_EverySinceDeprecatedValueIsUNRELEASEDOrAReleasedVersion_Violations = string[];
