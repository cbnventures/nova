import type {
  Shared_IntegrationAssetTarget,
  Shared_IntegrationMetadataTarget,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Integration - Integration.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_TemporaryDirectory = string;

export type Tests_Lib_Integration_Integration_TemporaryBase = string;

export type Tests_Lib_Integration_Integration_SandboxRoot = string;

/**
 * Tests - Lib - Integration - Integration - Collects Only Explicit Metadata Fields.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataDirectory = string;

export type Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataFile = string;

export type Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_Targets = Shared_IntegrationMetadataTarget[];

/**
 * Tests - Lib - Integration - Integration - Orders Positioned Assets By Filename Prefix.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_AssetDirectory = string;

export type Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_TargetDirectory = string;

export type Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_Targets = Shared_IntegrationAssetTarget[];

/**
 * Tests - Lib - Integration - Integration - Reads One Exact Dotenv Value.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_DotenvFile = string;

export type Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_Token = string | undefined;

/**
 * Tests - Lib - Integration - Integration - Rejects Non Interactive Mutation Without Confirmation.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_RejectsNonInteractiveMutationWithoutConfirmation_Confirmation = Promise<boolean>;

/**
 * Tests - Lib - Integration - Integration - Trims And Deduplicates Comma Separated Values.
 *
 * @since 0.34.0
 */
export type Tests_Lib_Integration_Integration_TrimsAndDeduplicatesCommaSeparatedValues_Result = string[] | undefined;
