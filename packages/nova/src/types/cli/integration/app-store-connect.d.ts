import type {
  Dirent,
  Stats,
} from 'node:fs';

import type { Runner as ApiAppStoreConnect } from '../../../api/app-store-connect.js';
import type {
  Shared_AppStoreConnectContextCache,
  Shared_AppStoreConnectCredentials,
  Shared_AppStoreConnectIntegrationOptions,
  Shared_AppStoreConnectKeyCandidate,
  Shared_AppStoreConnectPlanContext,
  Shared_AppStoreConnectPlanOrderEntry,
  Shared_AppStoreConnectRemoteContext,
  Shared_AppStoreConnectResource,
  Shared_AppStoreConnectWorkspaceContext,
  Shared_IntegrationAssetFile,
  Shared_IntegrationAssetTarget,
  Shared_IntegrationMetadataTarget,
  Shared_IntegrationWorkspace,
} from '../../shared.d.ts';

export type Cli_Integration_AppStoreConnect_Runner_CreateClient_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns = Promise<ApiAppStoreConnect>;

export type Cli_Integration_AppStoreConnect_Runner_CreateClient_Credentials = Shared_AppStoreConnectCredentials;

/**
 * CLI - Integration - App Store Connect - Create Placement.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementType = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ImageId = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Attempt = number;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Returns = Promise<string>;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Response = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Query = URLSearchParams;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ReconciliationResponse = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Placements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_MatchingPlacement = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacement_DelayMilliseconds = number;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementType = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_ImageIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Returns = Promise<string[]>;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetsDirectory = string;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_CollectedTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Lines = string[];

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlannedFile = Shared_IntegrationAssetTarget['files'][number] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_FileName = string;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Totals = string;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AppId = string;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibrary = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibraryId = string;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_ContextCache = Shared_AppStoreConnectContextCache;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Context = Shared_AppStoreConnectRemoteContext;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlacementType = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_UploadedFile = Shared_IntegrationAssetTarget['files'][number] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Buffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Image = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_Returns = Promise<string>;

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_Files = Shared_IntegrationAssetTarget['files'];

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_FileStats = Stats[];

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_ByteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_DescribeAssetTotals_LocaleCount = number;

export type Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index = number;

export type Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName = string;

export type Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns = Buffer;

export type Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffer = Buffer | undefined;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target = Shared_IntegrationAssetTarget | Shared_IntegrationMetadataTarget;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets<Target extends Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target> = Target[];

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns<Target extends Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target> = Target[];

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedPlatforms = string[] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedLocales = string[] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedTargets = string[] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesPlatform = boolean;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesLocale = boolean;

export type Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesTarget = boolean;

export type Cli_Integration_AppStoreConnect_Runner_FormatByteCount_ByteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_FormatByteCount_Returns = string;

export type Cli_Integration_AppStoreConnect_Runner_FormatByteCount_Units = string[];

export type Cli_Integration_AppStoreConnect_Runner_FormatByteCount_Value = number;

/**
 * CLI - Integration - App Store Connect - Format Plan Value.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_FormatPlanValue_Value = unknown;

export type Cli_Integration_AppStoreConnect_Runner_FormatPlanValue_Returns = string;

/**
 * CLI - Integration - App Store Connect - Format Replacement Plan.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_RelativePath = string;

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_DeleteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_Order = Shared_AppStoreConnectPlanOrderEntry[];

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_Returns = string;

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_UploadCount = number;

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_KeepCount = number;

export type Cli_Integration_AppStoreConnect_Runner_FormatReplacementPlan_OrderDescription = string;

export type Cli_Integration_AppStoreConnect_Runner_FormatByteCount_Unit = string;

/**
 * CLI - Integration - App Store Connect - Inspect Screenshot Image.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Buffer = Buffer;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Format = 'JPEG' | 'PNG';

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_HasAlpha = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Height = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Width = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns = {
  format: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Format;
  hasAlpha: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_HasAlpha;
  height: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Height;
  width: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns_Width;
};

/**
 * CLI - Integration - App Store Connect - Inspect Screenshot JPEG.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Buffer = Buffer;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Format = 'JPEG' | 'PNG';

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_HasAlpha = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Height = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Width = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns = {
  format: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Format;
  hasAlpha: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_HasAlpha;
  height: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Height;
  width: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns_Width;
};

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Offset = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Width = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Height = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_HasEndOfImage = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Marker = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_SegmentLength = number;

/**
 * CLI - Integration - App Store Connect - Inspect Screenshot PNG.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Buffer = Buffer;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Format = 'JPEG' | 'PNG';

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_HasAlpha = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Height = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Width = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns = {
  format: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Format;
  hasAlpha: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_HasAlpha;
  height: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Height;
  width: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns_Width;
};

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Offset = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Width = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Height = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ColorType = number | undefined;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasTransparencyChunk = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasEndChunk = boolean;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkLength = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkType = string;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_DataOffset = number;

export type Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_NextOffset = number;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_MetadataDirectory = string;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_CollectedTargets = Shared_IntegrationMetadataTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Targets = Shared_IntegrationMetadataTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Lines = string[];

export type Cli_Integration_AppStoreConnect_Runner_Metadata_PlatformCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_LocaleCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_UpdatedCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_UnchangedCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_AppId = string;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_Context = Shared_AppStoreConnectRemoteContext;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_RemoteAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_ChangedAttributes = Record<string, string>;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_ChangedFields = string[];

export type Cli_Integration_AppStoreConnect_Runner_Metadata_UpdatedLocalization = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_UpdatedAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Metadata_MismatchedFields = string[];

export type Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_OrderPlacements_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Returns = Promise<void>;

/**
 * CLI - Integration - App Store Connect - Placement Image ID.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Placement = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Returns = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Relationships = unknown;

export type Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageRelationship = unknown;

export type Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageData = unknown;

/**
 * CLI - Integration - App Store Connect - Plan Creative Assets.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_AssetLibrary = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_AssetLibraryId = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Lines = string[];

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_PlacementType = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_PlannedFile = Shared_IntegrationAssetFile | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Context = Shared_AppStoreConnectPlanContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Buffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_Image = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanCreativeAssets_ImageId = string | undefined;

/**
 * CLI - Integration - App Store Connect - Plan Metadata.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Targets = Shared_IntegrationMetadataTarget[];

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_TargetLines = string[][];

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Context = Shared_AppStoreConnectPlanContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_RemoteAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_ChangedEntries = [string, unknown][];

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_Label = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanMetadata_ChangedTargetCount = number;

/**
 * CLI - Integration - App Store Connect - Plan Placement.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Context = Shared_AppStoreConnectPlanContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_PlacementType = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_ImageIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Returns = Promise<string>;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_ExistingPlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Query = URLSearchParams;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Response = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_AvailablePlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_Order = Shared_AppStoreConnectPlanOrderEntry[];

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_ImageId = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanPlacement_MatchingPlacementIndex = number;

/**
 * CLI - Integration - App Store Connect - Plan Screenshots.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_AppId = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_DuoTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_StandardTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Lines = string[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Context = Shared_AppStoreConnectPlanContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_DisplayType = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_ExistingScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Sets = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Set = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_CompleteScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_CompleteAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_FileBuffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_AvailableScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Order = Shared_AppStoreConnectPlanOrderEntry[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_FileChecksum = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_MatchingScreenshotIndex = number;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_MatchingChecksum = unknown;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_AssetLibrary = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_AssetLibraryId = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_DuoLines = string[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_DuoContext = Shared_AppStoreConnectPlanContext;

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Buffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_Images = (Shared_AppStoreConnectResource | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_PlanScreenshots_ImageIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns = Promise<Shared_AppStoreConnectWorkspaceContext>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Workspace = Shared_IntegrationWorkspace;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BundleIdentifier = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Version = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFilePath = string;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFile = string;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ParsedProject = unknown;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Project = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Settings = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BaseSettings = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Targets = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetValues = unknown[];

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Target = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetSettings = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetBaseSettings = Record<string, unknown>;

/**
 * CLI - Integration - App Store Connect - Read Context.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Version = string;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Platform = string;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Locale = string;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Returns = Promise<Shared_AppStoreConnectPlanContext>;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_ApiPlatform = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_VersionResource = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Localizations = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReadContext_Localization = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns = Promise<Buffer[]>;

export type Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory = string;

export type Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns = Promise<Shared_AppStoreConnectKeyCandidate[]>;

export type Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Entries = Dirent[];

export type Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_PrefixLength = number;

export type Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_KeyId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context = Shared_AppStoreConnectRemoteContext;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Query = URLSearchParams;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Response = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ExistingPlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MaximumPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_AvailablePlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_DesiredPlacementIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PendingImageIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageId = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementIndex = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacement = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_RemainingOldPlacementIds = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_InitialDesiredPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureResponse = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailurePlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureNewPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementImageId = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureOldPlacementCount = number;

/**
 * CLI - Integration - App Store Connect - Replace Placement Batch.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementType = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PendingImageIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredPlacementIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIds = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_WindowSize = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementDeleteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_AvailableSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DeletedOldPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CompleteReplacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PermittedOldPlacementDeleteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementIdsToDelete = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_BatchImageIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageId = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementId = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingPendingImageIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextCreatedPlacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredOrderedPlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshQuery = URLSearchParams;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshResponse = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacements = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_SupersededPlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OrderedPlacementIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIdsToDelete = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextFreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextWindowSize = number;

/**
 * CLI - Integration - App Store Connect - Replace Screenshot Batch.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SetId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FileBuffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PendingFileIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredScreenshotIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingOldScreenshotIds = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_WindowSize = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotDeleteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_AvailableSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DeletedOldScreenshotCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompleteReplacementCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PermittedOldScreenshotDeleteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotIdsForCapacity = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_BatchFileIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_File = Shared_IntegrationAssetTarget['files'][number] | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshot = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotId = string;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingPendingFileIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompletedUploadedScreenshotCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_ResourcesBeforeSweep = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_IncompleteScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Attributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_State = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingResources = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredOrderedScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SupersededScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OrderedScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextFreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextWindowSize = number;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache = Shared_AppStoreConnectContextCache;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns = Promise<Shared_AppStoreConnectRemoteContext>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Key = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_CachedContext = Promise<Shared_AppStoreConnectRemoteContext> | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Context = Promise<Shared_AppStoreConnectRemoteContext>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns = Promise<Shared_AppStoreConnectRemoteContext>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_ApiPlatform = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionResource = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionId = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localizations = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localization = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveContext_Attributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns = Promise<Shared_AppStoreConnectCredentials>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Directories = string[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_CandidateGroups = Shared_AppStoreConnectKeyCandidate[][];

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Candidates = Shared_AppStoreConnectKeyCandidate[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedCandidate = Shared_AppStoreConnectKeyCandidate | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Answers = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedPath = unknown;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_PrivateKey = string;

export type Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Credentials = Shared_AppStoreConnectCredentials;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns = Promise<string>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Query = URLSearchParams;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Response = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resources = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resource = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Attributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Groups = unknown[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Group = Record<string, unknown> | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Keys = string[];

export type Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Value = unknown;

export type Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_ResourceId_Name = string;

export type Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Options = Shared_AppStoreConnectIntegrationOptions;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_WorkspaceContext = Shared_AppStoreConnectWorkspaceContext;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_ScreenshotsDirectory = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_CollectedTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Lines = string[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Totals = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Client = ApiAppStoreConnect;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_App = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_AppId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_ContextCache = Shared_AppStoreConnectContextCache;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardTargets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardContext = Shared_AppStoreConnectRemoteContext;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_LocalizationId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DisplayType = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Sets = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Set = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Attributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_ActiveSet = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_SetId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_ExistingScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteDeliveryState = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshotIds = string[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteDeliveryState = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_FileBuffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksums = string[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_AvailableScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotIds = (string | undefined)[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_PendingFileIndexes = number[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksum = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotIndex = number;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingChecksum = unknown;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshot = Shared_AppStoreConnectResource | undefined;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingOldScreenshotIds = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_FreeSlots = number;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_OldScreenshotCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_PlaceholderCount = number;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingDescription = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshots = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredIdSet = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingPlaceholders = string[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshotId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingAttributes = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingState = Record<string, unknown>;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingFileName = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibrary = Shared_AppStoreConnectResource;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibraryId = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_PlacementGroup = string;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoContext = Shared_AppStoreConnectRemoteContext;

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Buffers = Buffer[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_Images = Shared_AppStoreConnectResource[];

export type Cli_Integration_AppStoreConnect_Runner_Screenshots_ImageIds = string[];

/**
 * CLI - Integration - App Store Connect - Validate Creative Images.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_SkipImageChecks = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Failures = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntries_File = Shared_IntegrationAssetTarget['files'][number];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntries_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntries = {
  file: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntries_File;
  target: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntries_Target;
}[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileResults = PromiseSettledResult<Buffer>[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntry_File = Shared_IntegrationAssetTarget['files'][number];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntry_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntry = {
  file: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntry_File;
  target: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileEntry_Target;
} | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FileResult = PromiseSettledResult<Buffer> | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_DisplayPath = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_AspectHeight = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_AspectWidth = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_Formats = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MaximumHeight = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MaximumWidth = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MinimumHeight = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MinimumWidth = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_SizeDescription = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification = {
  aspectHeight: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_AspectHeight;
  aspectWidth: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_AspectWidth;
  formats: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_Formats;
  maximumHeight: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MaximumHeight;
  maximumWidth: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MaximumWidth;
  minimumHeight: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MinimumHeight;
  minimumWidth: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_MinimumWidth;
  sizeDescription: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Specification_SizeDescription;
} | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_AcceptedDescription = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_ReadFailure = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Format = 'JPEG' | 'PNG';

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_HasAlpha = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Height = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Width = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image = {
  format: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Format;
  hasAlpha: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_HasAlpha;
  height: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Height;
  width: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_Image_Width;
} | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_ActualSize = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_FitsSize = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeImages_PreflightFailureLines = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Returns = void;

/**
 * CLI - Integration - App Store Connect - Validate Metadata Targets.
 *
 * @since 0.49.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Targets = Shared_IntegrationMetadataTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Returns = void;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Failures = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_DisplayPath = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Field = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_CharacterLimit = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Value = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_CharacterCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_Keywords = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_KeywordByteCount = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_KeywordEntries = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_SeenKeywords = Set<string>;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_NormalizedKeyword = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_UrlValue = string | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_ParsedUrl = URL | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateMetadataTargets_FailureLines = string[];

/**
 * CLI - Integration - App Store Connect - Validate Screenshot Images.
 *
 * @since 0.39.0
 */
export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_SkipImageChecks = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Returns = Promise<void>;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Failures = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_CapacityFailureLines = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries_File = Shared_IntegrationAssetTarget['files'][number];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries = {
  file: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries_File;
  target: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries_Target;
}[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResults = PromiseSettledResult<Buffer>[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry_File = Shared_IntegrationAssetTarget['files'][number];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry_Target = Shared_IntegrationAssetTarget;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry = {
  file: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry_File;
  target: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry_Target;
} | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResult = PromiseSettledResult<Buffer> | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_TargetName = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedSizes = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedDescription = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_DisplayPath = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ReadFailure = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Buffer = Buffer;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Format = 'JPEG' | 'PNG';

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_HasAlpha = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Height = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Width = number;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image = {
  format: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Format;
  hasAlpha: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_HasAlpha;
  height: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Height;
  width: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image_Width;
} | undefined;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ActualSize = string;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_PreflightFailureLines = string[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets = Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Returns = void;

export type Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_IsDuo = boolean;

export type Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Targets = Shared_IntegrationMetadataTarget[] | Shared_IntegrationAssetTarget[];

export type Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Returns = void;

export type Cli_Integration_AppStoreConnect_Runner_ValidateTargets_UnsupportedPlatforms = string[];
