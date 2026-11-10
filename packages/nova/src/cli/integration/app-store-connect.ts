import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import prompts from 'prompts';
import { parse as parseYaml } from 'yaml';

import { Runner as AppStoreConnect } from '../../api/app-store-connect.js';
import {
  collectAssetTargets,
  collectMetadataTargets,
  confirmPlan,
  parseCommaSeparated,
  reportPlan,
  requireArray,
  requireObject,
  requireString,
  resolveWorkspace,
  wait,
} from '../../lib/integration.js';
import { pathExists } from '../../lib/utility.js';
import { Logger } from '../../toolkit/index.js';

import type {
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Credentials,
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Options,
  Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Attempt,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Client,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_DelayMilliseconds,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ImageId,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_MatchingPlacement,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Placements,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Query,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ReconciliationResponse,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Response,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Client,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_App,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AppId,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibrary,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibraryId,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetsDirectory,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Buffers,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Client,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Context,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_ContextCache,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_FileName,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Image,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Lines,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlannedFile,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Targets,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_UploadedFile,
  Cli_Integration_AppStoreConnect_Runner_CreativeAssets_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffer,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index,
  Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesLocale,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesPlatform,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedLocales,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedPlatforms,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target,
  Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Buffer,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Buffer,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_HasEndOfImage,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Height,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Marker,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Offset,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_SegmentLength,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Width,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Buffer,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkLength,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkType,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ColorType,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_DataOffset,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasEndChunk,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasTransparencyChunk,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Height,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_NextOffset,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Offset,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns,
  Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Width,
  Cli_Integration_AppStoreConnect_Runner_Metadata_App,
  Cli_Integration_AppStoreConnect_Runner_Metadata_AppId,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Client,
  Cli_Integration_AppStoreConnect_Runner_Metadata_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Context,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Lines,
  Cli_Integration_AppStoreConnect_Runner_Metadata_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_Metadata_MetadataDirectory,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Options,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Returns,
  Cli_Integration_AppStoreConnect_Runner_Metadata_Targets,
  Cli_Integration_AppStoreConnect_Runner_Metadata_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Client,
  Cli_Integration_AppStoreConnect_Runner_OrderPlacements_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementIds,
  Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Returns,
  Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageData,
  Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageRelationship,
  Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Placement,
  Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Relationships,
  Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Returns,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BaseSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BundleIdentifier,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ParsedProject,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Project,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFile,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFilePath,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Settings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Target,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetBaseSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Targets,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetSettings,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetValues,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Version,
  Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Workspace,
  Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Entries,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_KeyId,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_PrefixLength,
  Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_AvailablePlacements,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_DesiredPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ExistingPlacements,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureNewPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureOldPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailurePlacements,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureResponse,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FreeSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_InitialDesiredPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacement,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementIndex,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MaximumPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PendingImageIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementImageId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Query,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_RemainingOldPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Response,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_AvailableSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_BatchImageIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Client,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CompleteReplacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DeletedOldPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredOrderedPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreeSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacements,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshQuery,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshResponse,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextCreatedPlacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextFreeSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextWindowSize,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementDeleteCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementIdsToDelete,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OrderedPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PendingImageIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PermittedOldPlacementDeleteCount,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementType,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIdsToDelete,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingPendingImageIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_SupersededPlacementIds,
  Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_WindowSize,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Attributes,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_AvailableSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_BatchFileIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Client,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompletedUploadedScreenshotCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompleteReplacementCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DeletedOldScreenshotCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredOrderedScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_File,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FileBuffers,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FreeSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_IncompleteScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextFreeSlots,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextWindowSize,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotDeleteCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotIdsForCapacity,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OrderedScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PendingFileIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PermittedOldScreenshotDeleteCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingOldScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingPendingFileIndexes,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingResources,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_ResourcesBeforeSweep,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Returns,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SetId,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_State,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SupersededScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Target,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshot,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotCount,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotId,
  Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_WindowSize,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_CachedContext,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Context,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Key,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_ApiPlatform,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_App,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Attributes,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localization,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localizations,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionId,
  Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionResource,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Answers,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_CandidateGroups,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Candidates,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Credentials,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Directories,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_PrivateKey,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedCandidate,
  Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedPath,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Attributes,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Group,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Groups,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Keys,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Query,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resource,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resources,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Response,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns,
  Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Value,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Name,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource,
  Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ActiveSet,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_App,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AppId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibrary,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibraryId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Attributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_AvailableScreenshots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Buffers,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Client,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CollectedTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteAttributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteDeliveryState,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteScreenshots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ContextCache,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredIdSet,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotCount,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DisplayType,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoContext,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ExistingScreenshots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_FileBuffers,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksum,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksums,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_FreeSlots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ImageIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Images,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteAttributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteDeliveryState,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Lines,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_LocalizationId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingAttributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingChecksum,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshot,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotIndex,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_OldScreenshotCount,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Options,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_PendingFileIndexes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_PlaceholderCount,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_PlacementGroup,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingAttributes,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingDescription,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingFileName,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingOldScreenshotIds,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingPlaceholders,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshotId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshots,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingState,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_ScreenshotsDirectory,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Set,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_SetId,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Sets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardContext,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardTargets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets,
  Cli_Integration_AppStoreConnect_Runner_Screenshots_WorkspaceContext,
  Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedDescription,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedSizes,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ActualSize,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Buffer,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_CapacityFailureLines,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_DisplayPath,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Failures,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResult,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResults,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_PreflightFailureLines,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ReadFailure,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_SkipImageChecks,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_TargetName,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_IsDuo,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Returns,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Targets,
  Cli_Integration_AppStoreConnect_Runner_ValidateTargets_UnsupportedPlatforms,
} from '../../types/cli/integration/app-store-connect.d.ts';

/**
 * CLI - Integration - App Store Connect - Metadata Fields.
 *
 * Limits patches to the localized version fields exposed by Apple's current
 * App Store Connect API instead of forwarding arbitrary local JSON keys.
 *
 * @since 0.34.0
 */
const metadataFields = [
  'description',
  'keywords',
  'marketingUrl',
  'promotionalText',
  'supportUrl',
  'whatsNew',
];

/**
 * CLI - Integration - App Store Connect - Platforms.
 *
 * Maps Nova's stable project-platform vocabulary to Apple's API enumeration
 * without exposing vendor casing throughout the command implementation.
 *
 * @since 0.34.0
 */
const platforms = new Map([
  [
    'ios',
    'IOS',
  ],
  [
    'macos',
    'MAC_OS',
  ],
  [
    'visionos',
    'VISION_OS',
  ],
]);

/**
 * CLI - Integration - App Store Connect - Screenshot Display Types.
 *
 * Associates developer-facing target folders with Apple's supported standard
 * screenshot-set names; iPhone Duo uses the asset-library placement workflow.
 *
 * @since 0.34.0
 */
const screenshotDisplayTypes = new Map([
  [
    'apple-watch',
    'APP_WATCH_SERIES_10',
  ],
  [
    'ipad',
    'APP_IPAD_PRO_3GEN_129',
  ],
  [
    'iphone',
    'APP_IPHONE_67',
  ],
  [
    'mac',
    'APP_DESKTOP',
  ],
  [
    'vision-pro',
    'APP_APPLE_VISION_PRO',
  ],
]);

/**
 * CLI - Integration - App Store Connect - Screenshot Size Specifications.
 *
 * Mirrors Apple's screenshot specifications fetched on 2026-11-05:
 * https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications
 *
 * @since 0.39.0
 */
const screenshotSizeSpecifications = new Map([
  [
    'apple-watch',
    ['416x496'],
  ],
  [
    'ipad',
    [
      '2064x2752',
      '2752x2064',
      '2048x2732',
      '2732x2048',
    ],
  ],
  [
    'iphone',
    [
      '1260x2736',
      '2736x1260',
      '1290x2796',
      '2796x1290',
      '1320x2868',
      '2868x1320',
    ],
  ],
  [
    'iphone-duo',
    [
      '1398x2034',
      '2034x1398',
      '2007x2853',
      '2853x2007',
    ],
  ],
  [
    'mac',
    [
      '1280x800',
      '1440x900',
      '2560x1600',
      '2880x1800',
    ],
  ],
  [
    'vision-pro',
    ['3840x2160'],
  ],
]);

/**
 * CLI - Integration - App Store Connect - Png Signature.
 *
 * Identifies PNG bytes before the preflight parser reads the IHDR dimensions,
 * color type, and any transparency chunk.
 *
 * @since 0.39.0
 */
const pngSignature = Buffer.from([
  137,
  80,
  78,
  71,
  13,
  10,
  26,
  10,
]);

/**
 * CLI - Integration - App Store Connect - Jpeg Start Of Frame Markers.
 *
 * Covers baseline, progressive, lossless, differential, and arithmetic JPEG
 * frames whose segment headers carry the real pixel dimensions.
 *
 * @since 0.39.0
 */
const jpegStartOfFrameMarkers = new Set([
  parseInt('C0', 16),
  parseInt('C1', 16),
  parseInt('C2', 16),
  parseInt('C3', 16),
  parseInt('C5', 16),
  parseInt('C6', 16),
  parseInt('C7', 16),
  parseInt('C9', 16),
  parseInt('CA', 16),
  parseInt('CB', 16),
  parseInt('CD', 16),
  parseInt('CE', 16),
  parseInt('CF', 16),
]);

/**
 * CLI - Integration - App Store Connect - Creative Placement Types.
 *
 * Preserves Apple's public placement vocabulary in both folder names and API
 * mutations so Nova does not invent alternative names for vendor concepts.
 *
 * @since 0.34.0
 */
const creativePlacementTypes = new Map([
  [
    'product-page-header',
    'PRODUCT_PAGE_HEADER_ASSET',
  ],
  [
    'search-results',
    'APP_STORE_SEARCH_RESULTS_ASSET',
  ],
]);

/**
 * CLI - Integration - App Store Connect - Maximum Placement Counts.
 *
 * Records Apple's documented per-group limits so replacement stages new
 * placements first only when both generations can coexist safely.
 *
 * @since 0.39.0
 */
const maximumPlacementCounts = new Map([
  [
    'APP_SCREENSHOT',
    10,
  ],
  [
    'APP_STORE_SEARCH_RESULTS_ASSET',
    1,
  ],
  [
    'PRODUCT_PAGE_HEADER_ASSET',
    1,
  ],
]);

/**
 * CLI - Integration - App Store Connect - Maximum Screenshot Count.
 *
 * Apple documents this limit on its product-page guidance:
 * https://developer.apple.com/app-store/product-page/
 *
 * @since 0.39.0
 */
const maximumScreenshotCount = 10;

/**
 * CLI - Integration - App Store Connect.
 *
 * Publishes developer-owned metadata and images from deterministic local asset
 * folders through Apple's official API and credential discovery conventions.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * CLI - Integration - App Store Connect - Metadata.
   *
   * Validates localized metadata, presents the complete patch plan, and updates
   * only fields explicitly supplied in each local JSON file.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Metadata_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_Metadata_Returns}
   *
   * @since 0.39.0
   */
  public static async metadata(options: Cli_Integration_AppStoreConnect_Runner_Metadata_Options): Cli_Integration_AppStoreConnect_Runner_Metadata_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_Metadata_WorkspaceContext = await Runner.prepareWorkspace(options);
    const metadataDirectory: Cli_Integration_AppStoreConnect_Runner_Metadata_MetadataDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'metadata');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_Metadata_CollectedTargets = await collectMetadataTargets(metadataDirectory, metadataFields);
    const targets: Cli_Integration_AppStoreConnect_Runner_Metadata_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_Metadata_Lines = targets.map((target) => `${target['platform']}/${target['locale']}: ${Object.keys(target['attributes']).join(', ')}`);

    Runner.validateTargets(targets);

    reportPlan(`Update App Store Connect metadata for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_Metadata_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_Metadata_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_Metadata_AppId = Runner.resourceId(app, 'App');

    await AppStoreConnect.runOperations(targets, async (target) => {
      const context: Cli_Integration_AppStoreConnect_Runner_Metadata_Context = await Runner.resolveContext(client, app, workspaceContext['version'], target['platform'], target['locale']);
      const localizationId: Cli_Integration_AppStoreConnect_Runner_Metadata_LocalizationId = Runner.resourceId(context['localization'], `${target['locale']} localization`);

      await client.updateLocalization(localizationId, target['attributes']);

      return;
    });

    Logger.info(`Updated ${targets.length} App Store Connect metadata target(s) for app ${appId}.`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Screenshots.
   *
   * Replaces only locally supplied screenshot targets, preserving deterministic
   * filename order and Apple's separate iPhone Duo placement workflow.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Screenshots_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns}
   *
   * @since 0.39.0
   */
  public static async screenshots(options: Cli_Integration_AppStoreConnect_Runner_Screenshots_Options): Cli_Integration_AppStoreConnect_Runner_Screenshots_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_WorkspaceContext = await Runner.prepareWorkspace(options);
    const screenshotsDirectory: Cli_Integration_AppStoreConnect_Runner_Screenshots_ScreenshotsDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'screenshots');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_CollectedTargets = await collectAssetTargets(screenshotsDirectory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: true,
    });
    const targets: Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_Screenshots_Lines = targets.map((target) => `${target['relativePath']}: ${target['files'].length} ordered image(s)`);

    Runner.validateTargets(targets);

    Runner.validateScreenshotTargets(targets);

    await Runner.validateScreenshotImages(targets, options['skipImageChecks'] === true);

    reportPlan(`Replace App Store Connect screenshots for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_Screenshots_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_Screenshots_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_Screenshots_AppId = Runner.resourceId(app, 'App');
    const contextCache: Cli_Integration_AppStoreConnect_Runner_Screenshots_ContextCache = new Map();
    const duoTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoTargets = targets.filter((target) => target['target'] === 'iphone-duo');
    const standardTargets: Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardTargets = targets.filter((target) => target['target'] !== 'iphone-duo');

    await AppStoreConnect.runOperations(standardTargets, async (target) => {
      const standardContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_StandardContext = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
      const localizationId: Cli_Integration_AppStoreConnect_Runner_Screenshots_LocalizationId = Runner.resourceId(standardContext['localization'], `${target['locale']} localization`);
      const displayType: Cli_Integration_AppStoreConnect_Runner_Screenshots_DisplayType = screenshotDisplayTypes.get(target['target']);

      if (displayType === undefined) {
        throw new Error(`Unsupported App Store screenshot target: ${target['target']}.`);
      }

      const sets: Cli_Integration_AppStoreConnect_Runner_Screenshots_Sets = await client.listScreenshotSets(localizationId);
      const set: Cli_Integration_AppStoreConnect_Runner_Screenshots_Set = sets.find((candidate) => {
        const attributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_Attributes = requireObject(candidate['attributes'], 'Screenshot set attributes');

        return attributes['screenshotDisplayType'] === displayType;
      });

      const activeSet: Cli_Integration_AppStoreConnect_Runner_Screenshots_ActiveSet = (set === undefined) ? await client.createScreenshotSet(localizationId, displayType) : set;
      const setId: Cli_Integration_AppStoreConnect_Runner_Screenshots_SetId = Runner.resourceId(activeSet, `${displayType} screenshot set`);
      const existingScreenshots: Cli_Integration_AppStoreConnect_Runner_Screenshots_ExistingScreenshots = (set === undefined) ? [] : await client.listScreenshots(setId);
      const incompleteScreenshots: Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshots = existingScreenshots.filter((screenshot) => {
        const incompleteAttributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteAttributes = requireObject(screenshot['attributes'], 'Existing screenshot attributes');
        const incompleteDeliveryState: Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteDeliveryState = requireObject(incompleteAttributes['assetDeliveryState'], 'Existing screenshot delivery state');

        return incompleteDeliveryState['state'] !== 'COMPLETE';
      });
      const incompleteScreenshotIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_IncompleteScreenshotIds = incompleteScreenshots.map((incompleteScreenshot) => Runner.resourceId(incompleteScreenshot, 'Incomplete screenshot'));

      if (incompleteScreenshotIds.length > 0) {
        try {
          await AppStoreConnect.runOperations(incompleteScreenshotIds, (incompleteScreenshotId) => client.deleteResource('appScreenshots', incompleteScreenshotId));
        } catch (error) {
          throw new Error(`Unable to clean incomplete screenshots for ${target['relativePath']}. Existing complete screenshots were left in place.`, { cause: error });
        }

        Logger.info(`Cleaned ${incompleteScreenshotIds.length} incomplete screenshot reservation(s) before replacing ${target['relativePath']}.`);
      }

      const completeScreenshots: Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteScreenshots = existingScreenshots.filter((screenshot) => {
        const completeAttributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteAttributes = requireObject(screenshot['attributes'], 'Existing screenshot attributes');
        const completeDeliveryState: Cli_Integration_AppStoreConnect_Runner_Screenshots_CompleteDeliveryState = requireObject(completeAttributes['assetDeliveryState'], 'Existing screenshot delivery state');

        return completeDeliveryState['state'] === 'COMPLETE';
      });

      if (completeScreenshots.length > maximumScreenshotCount) {
        throw new Error(`${target['relativePath']} contains ${completeScreenshots.length} complete screenshots, exceeding Apple's ${maximumScreenshotCount}-screenshot limit.`);
      }

      const fileBuffers: Cli_Integration_AppStoreConnect_Runner_Screenshots_FileBuffers = await Runner.readFiles(target);
      const fileChecksums: Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksums = fileBuffers.map((fileBuffer) => createHash('md5').update(fileBuffer).digest('hex'));
      const availableScreenshots: Cli_Integration_AppStoreConnect_Runner_Screenshots_AvailableScreenshots = [...completeScreenshots];
      const desiredScreenshotIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotIds = target['files'].map(() => undefined);
      const pendingFileIndexes: Cli_Integration_AppStoreConnect_Runner_Screenshots_PendingFileIndexes = [];

      for (let fileIndex = 0; fileIndex < fileChecksums.length; fileIndex += 1) {
        const fileChecksum: Cli_Integration_AppStoreConnect_Runner_Screenshots_FileChecksum = fileChecksums[fileIndex];

        if (fileChecksum === undefined) {
          throw new Error(`Unable to calculate a checksum for local screenshot index ${fileIndex} in ${target['relativePath']}.`);
        }

        const matchingScreenshotIndex: Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotIndex = availableScreenshots.findIndex((availableScreenshot) => {
          const matchingAttributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingAttributes = requireObject(availableScreenshot['attributes'], 'Existing screenshot attributes');
          const matchingChecksum: Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingChecksum = matchingAttributes['sourceFileChecksum'];

          return typeof matchingChecksum === 'string' && matchingChecksum.toLowerCase() === fileChecksum;
        });

        if (matchingScreenshotIndex === -1) {
          pendingFileIndexes.push(fileIndex);

          continue;
        }

        const matchingScreenshot: Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshot = availableScreenshots[matchingScreenshotIndex];

        if (matchingScreenshot === undefined) {
          throw new Error(`Unable to reuse local screenshot index ${fileIndex} in ${target['relativePath']}.`);
        }

        const matchingScreenshotId: Cli_Integration_AppStoreConnect_Runner_Screenshots_MatchingScreenshotId = Runner.resourceId(matchingScreenshot, 'Matching screenshot');

        Reflect.set(desiredScreenshotIds, fileIndex, matchingScreenshotId);

        availableScreenshots.splice(matchingScreenshotIndex, 1);
      }

      const remainingOldScreenshotIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingOldScreenshotIds = new Set(availableScreenshots.map((availableScreenshot) => Runner.resourceId(availableScreenshot, 'Existing screenshot')));
      const freeSlots: Cli_Integration_AppStoreConnect_Runner_Screenshots_FreeSlots = maximumScreenshotCount - completeScreenshots.length;

      try {
        await Runner.replaceScreenshotBatch(client, setId, target, fileBuffers, pendingFileIndexes, desiredScreenshotIds, remainingOldScreenshotIds, freeSlots);
      } catch (error) {
        let oldScreenshotCount: Cli_Integration_AppStoreConnect_Runner_Screenshots_OldScreenshotCount = remainingOldScreenshotIds.size;
        let desiredScreenshotCount: Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredScreenshotCount = desiredScreenshotIds.filter((desiredScreenshotId) => desiredScreenshotId !== undefined).length;
        let placeholderCount: Cli_Integration_AppStoreConnect_Runner_Screenshots_PlaceholderCount = 0;
        let remainingDescription: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingDescription = '';

        try {
          const remainingScreenshots: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshots = await client.listScreenshots(setId);
          const desiredIdSet: Cli_Integration_AppStoreConnect_Runner_Screenshots_DesiredIdSet = new Set(desiredScreenshotIds.filter((desiredScreenshotId) => desiredScreenshotId !== undefined));
          const remainingPlaceholders: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingPlaceholders = [];

          oldScreenshotCount = 0;
          desiredScreenshotCount = 0;

          for (const remainingScreenshot of remainingScreenshots) {
            const remainingScreenshotId: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingScreenshotId = Runner.resourceId(remainingScreenshot, 'Remaining screenshot');
            const remainingAttributes: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingAttributes = requireObject(remainingScreenshot['attributes'], 'Remaining screenshot attributes');
            const remainingState: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingState = requireObject(remainingAttributes['assetDeliveryState'], 'Remaining screenshot delivery state');

            if (remainingState['state'] !== 'COMPLETE') {
              const remainingFileName: Cli_Integration_AppStoreConnect_Runner_Screenshots_RemainingFileName = (typeof remainingAttributes['fileName'] === 'string') ? remainingAttributes['fileName'] : remainingScreenshotId;

              remainingPlaceholders.push(`${remainingFileName}:${String(remainingState['state'] ?? 'UNKNOWN')}`);

              continue;
            }

            if (desiredIdSet.has(remainingScreenshotId) === true) {
              desiredScreenshotCount += 1;
            } else {
              oldScreenshotCount += 1;
            }
          }

          placeholderCount = remainingPlaceholders.length;
          remainingDescription = (placeholderCount === 0) ? 'none' : remainingPlaceholders.join(', ');
        } catch (stateError) {
          remainingDescription = `unavailable (${String(stateError)})`;
        }

        throw new Error(`Replacing ${target['relativePath']} stopped after an App Store Connect failure. Remaining set: ${oldScreenshotCount} old COMPLETE screenshot(s), ${desiredScreenshotCount} replacement COMPLETE screenshot(s), and ${placeholderCount} non-COMPLETE placeholder(s) (${remainingDescription}).`, { cause: error });
      }

      return;
    });

    if (duoTargets.length > 0) {
      const assetLibrary: Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibrary = await client.findAssetLibrary(appId);
      const assetLibraryId: Cli_Integration_AppStoreConnect_Runner_Screenshots_AssetLibraryId = Runner.resourceId(assetLibrary, 'App asset library');
      const placementGroup: Cli_Integration_AppStoreConnect_Runner_Screenshots_PlacementGroup = await Runner.resolveDuoPlacementGroup(client);

      await AppStoreConnect.runOperations(duoTargets, async (target) => {
        const duoContext: Cli_Integration_AppStoreConnect_Runner_Screenshots_DuoContext = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
        const buffers: Cli_Integration_AppStoreConnect_Runner_Screenshots_Buffers = await Runner.readFiles(target);
        const images: Cli_Integration_AppStoreConnect_Runner_Screenshots_Images = await AppStoreConnect.runOperations(target['files'], (file, index) => client.uploadAssetLibraryImage(assetLibraryId, 'APP_SCREENSHOTS_AND_PREVIEWS', `${workspaceContext['workspace']['name']} ${target['platform']} ${target['locale']} iPhone Duo ${file['position']}`, file['fileName'], Runner.fileBuffer(buffers, index, file['fileName'])));
        const imageIds: Cli_Integration_AppStoreConnect_Runner_Screenshots_ImageIds = images.map((image) => Runner.resourceId(image, 'Uploaded iPhone Duo screenshot'));

        await Runner.replacePlacement(client, duoContext, 'APP_SCREENSHOT', placementGroup, imageIds);

        return;
      });
    }

    Logger.info(`Updated ${targets.length} App Store Connect screenshot target(s).`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Creative Assets.
   *
   * Replaces explicitly supplied product-page header and search-result assets
   * through Apple's placement-based App Asset Library API.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options} options - Options.
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns}
   *
   * @since 0.39.0
   */
  public static async creativeAssets(options: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Options): Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Returns {
    const workspaceContext: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_WorkspaceContext = await Runner.prepareWorkspace(options);
    const assetsDirectory: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetsDirectory = join(process.cwd(), 'assets', 'app-store-connect', workspaceContext['workspace']['name'], 'creative-assets');
    const collectedTargets: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_CollectedTargets = await collectAssetTargets(assetsDirectory, {
      extensions: [
        '.jpeg',
        '.jpg',
        '.png',
      ],
      positioned: false,
    });
    const targets: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Targets = Runner.filterTargets(collectedTargets, options);
    const lines: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Lines = targets.map((target) => {
      const plannedFile: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlannedFile = target['files'][0];
      const fileName: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_FileName = (plannedFile === undefined) ? 'missing' : plannedFile['fileName'];

      return `${target['relativePath']}: ${fileName}`;
    });

    Runner.validateTargets(targets);

    Runner.validateCreativeTargets(targets);

    reportPlan(`Replace App Store Connect creative assets for ${workspaceContext['bundleIdentifier']} ${workspaceContext['version']}:`, lines);

    if (await confirmPlan(options['dryRun'] === true, options['nonInteractive'] === true, options['yes'] === true) === false || options['dryRun'] === true) {
      return;
    }

    const client: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Client = await Runner.createClient(options);
    const app: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_App = await client.findApp(workspaceContext['bundleIdentifier']);
    const appId: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AppId = Runner.resourceId(app, 'App');
    const assetLibrary: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibrary = await client.findAssetLibrary(appId);
    const assetLibraryId: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_AssetLibraryId = Runner.resourceId(assetLibrary, 'App asset library');
    const contextCache: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_ContextCache = new Map();

    await AppStoreConnect.runOperations(targets, async (target) => {
      const context: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Context = await Runner.resolveCachedContext(contextCache, client, app, workspaceContext['version'], target['platform'], target['locale']);
      const placementType: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_PlacementType = creativePlacementTypes.get(target['target']);

      if (placementType === undefined) {
        throw new Error(`Unsupported App Store creative asset target: ${target['target']}.`);
      }

      const uploadedFile: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_UploadedFile = target['files'][0];

      if (uploadedFile === undefined) {
        throw new Error(`Creative asset target is empty: ${target['relativePath']}.`);
      }

      const buffers: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Buffers = await Runner.readFiles(target);
      const image: Cli_Integration_AppStoreConnect_Runner_CreativeAssets_Image = await client.uploadAssetLibraryImage(assetLibraryId, 'CREATIVE_ASSETS', `${workspaceContext['workspace']['name']} ${target['platform']} ${target['locale']} ${target['target']}`, uploadedFile['fileName'], Runner.fileBuffer(buffers, 0, uploadedFile['fileName']));

      await Runner.replacePlacement(client, context, placementType, 'DEFAULT_PROFILE', [Runner.resourceId(image, 'Uploaded creative asset')]);

      return;
    });

    Logger.info(`Updated ${targets.length} App Store Connect creative asset target(s).`);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Create Placement.
   *
   * Reconciles an ambiguous placement create by listing included images and
   * reusing the placement for the requested image before any retry.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Client}         client         - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_LocalizationId} localizationId - Localization id.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementType}  placementType  - Placement type.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementGroup} placementGroup - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ImageId}        imageId        - Image id.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Attempt}        attempt        - Attempt.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Returns}
   *
   * @since 0.39.0
   */
  private static async createPlacement(client: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Client, localizationId: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_LocalizationId, placementType: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementType, placementGroup: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_PlacementGroup, imageId: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ImageId, attempt: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Attempt = 1): Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Returns {
    let response: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Response = undefined;

    try {
      response = await client.request('/v1/appAssetLibraryPlacements', {
        body: {
          data: {
            attributes: {
              placementGroup,
              placementType,
            },
            relationships: {
              appStoreVersionLocalization: {
                data: {
                  id: localizationId,
                  type: 'appStoreVersionLocalizations',
                },
              },
              image: {
                data: {
                  id: imageId,
                  type: 'appAssetLibraryImages',
                },
              },
            },
            type: 'appAssetLibraryPlacements',
          },
        },
        expectedStatuses: [201],
        method: 'POST',
      });
    } catch (error) {
      if (AppStoreConnect.isAmbiguousCreateError(error) === false) {
        throw error;
      }

      const query: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Query = new URLSearchParams({
        'fields[appAssetLibraryImages]': 'referenceName',
        'fields[appAssetLibraryPlacements]': 'image,placementGroup,placementType',
        'filter[placementGroup]': placementGroup,
        'filter[placementType]': placementType,
        'include': 'image',
        'limit': '50',
      });
      const reconciliationResponse: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_ReconciliationResponse = await client.request(`/v1/appStoreVersionLocalizations/${localizationId}/placements?${query.toString()}`);
      const placements: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_Placements = (reconciliationResponse === undefined) ? [] : requireArray(reconciliationResponse['data'], 'Reconciled asset placements').map((placement) => requireObject(placement, 'Reconciled asset placement'));
      const matchingPlacement: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_MatchingPlacement = placements.find((placement) => Runner.placementImageId(placement) === imageId);

      if (matchingPlacement !== undefined) {
        return Runner.resourceId(matchingPlacement, 'Reconciled asset placement');
      }

      if (attempt >= 5) {
        throw error;
      }

      const delayMilliseconds: Cli_Integration_AppStoreConnect_Runner_CreatePlacement_DelayMilliseconds = Math.min(1000 * Math.pow(2, attempt - 1), 15 * 1000);

      await wait(delayMilliseconds);

      return Runner.createPlacement(client, localizationId, placementType, placementGroup, imageId, attempt + 1);
    }

    if (response === undefined) {
      throw new Error('Creating an App Asset Library placement returned no resource.');
    }

    return Runner.resourceId(requireObject(response['data'], 'Created asset placement'), 'Created asset placement');
  }

  /**
   * CLI - Integration - App Store Connect - Create Placements.
   *
   * Creates one bounded placement batch in source order and returns only the
   * resource identifiers needed for ordering and cleanup.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Client}         client         - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_LocalizationId} localizationId - Localization id.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementType}  placementType  - Placement type.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementGroup} placementGroup - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_ImageIds}       imageIds       - Image ids.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Returns}
   *
   * @since 0.39.0
   */
  private static async createPlacements(client: Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Client, localizationId: Cli_Integration_AppStoreConnect_Runner_CreatePlacements_LocalizationId, placementType: Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementType, placementGroup: Cli_Integration_AppStoreConnect_Runner_CreatePlacements_PlacementGroup, imageIds: Cli_Integration_AppStoreConnect_Runner_CreatePlacements_ImageIds): Cli_Integration_AppStoreConnect_Runner_CreatePlacements_Returns {
    return AppStoreConnect.runOperations(imageIds, (imageId) => Runner.createPlacement(client, localizationId, placementType, placementGroup, imageId));
  }

  /**
   * CLI - Integration - App Store Connect - Order Placements.
   *
   * Applies one complete group order after replacement placements are ready and
   * skips the vendor request when only one placement exists.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Client}         client         - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_OrderPlacements_LocalizationId} localizationId - Localization id.
   * @param {Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementGroup} placementGroup - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementIds}   placementIds   - Placement ids.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Returns}
   *
   * @since 0.39.0
   */
  private static async orderPlacements(client: Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Client, localizationId: Cli_Integration_AppStoreConnect_Runner_OrderPlacements_LocalizationId, placementGroup: Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementGroup, placementIds: Cli_Integration_AppStoreConnect_Runner_OrderPlacements_PlacementIds): Cli_Integration_AppStoreConnect_Runner_OrderPlacements_Returns {
    if (placementIds.length <= 1) {
      return;
    }

    await client.request('/v1/appAssetLibraryPlacementOrderingRequests', {
      body: {
        data: {
          attributes: {
            placementGroup,
          },
          relationships: {
            appStoreVersionLocalization: {
              data: {
                id: localizationId,
                type: 'appStoreVersionLocalizations',
              },
            },
            orderedPlacements: {
              data: placementIds.map((placementId) => ({
                id: placementId,
                type: 'appAssetLibraryPlacements',
              })),
            },
          },
          type: 'appAssetLibraryPlacementOrderingRequests',
        },
      },
      expectedStatuses: [201],
      idempotent: true,
      method: 'POST',
    });

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Prepare Workspace.
   *
   * Resolves one Apple workspace and derives its bundle identifier and marketing
   * version from XcodeGen unless the developer supplied explicit overrides.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns}
   *
   * @since 0.34.0
   */
  private static async prepareWorkspace(options: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Options): Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Returns {
    const workspace: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Workspace = await resolveWorkspace(options, ['project.yml']);
    let bundleIdentifier: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BundleIdentifier = options['bundleId'];
    let version: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Version = options['version'];

    if (bundleIdentifier === undefined || version === undefined) {
      const projectFilePath: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFilePath = join(workspace['absolutePath'], 'project.yml');
      const projectFile: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ProjectFile = await fs.readFile(projectFilePath, 'utf-8');
      const parsedProject: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_ParsedProject = parseYaml(projectFile);
      const project: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Project = requireObject(parsedProject, 'Apple project.yml');
      const settings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Settings = requireObject(project['settings'], 'Apple project settings');
      const baseSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_BaseSettings = requireObject(settings['base'], 'Apple project base settings');
      const targets: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Targets = requireObject(project['targets'], 'Apple project targets');
      const targetValues: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetValues = Object.values(targets);

      version ??= (typeof baseSettings['MARKETING_VERSION'] === 'string') ? baseSettings['MARKETING_VERSION'] : undefined;

      for (const targetValue of targetValues) {
        const target: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_Target = requireObject(targetValue, 'Apple project target');

        if (target['type'] !== 'application') {
          continue;
        }

        const targetSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetSettings = requireObject(target['settings'], 'Apple application target settings');
        const targetBaseSettings: Cli_Integration_AppStoreConnect_Runner_PrepareWorkspace_TargetBaseSettings = requireObject(targetSettings['base'], 'Apple application base settings');

        bundleIdentifier ??= (typeof targetBaseSettings['PRODUCT_BUNDLE_IDENTIFIER'] === 'string') ? targetBaseSettings['PRODUCT_BUNDLE_IDENTIFIER'] : undefined;

        break;
      }
    }

    if (bundleIdentifier === undefined || bundleIdentifier === '') {
      throw new Error('Unable to derive the App Store bundle identifier. Pass --bundle-id explicitly.');
    }

    if (version === undefined || version === '') {
      throw new Error('Unable to derive the App Store marketing version. Pass --version explicitly.');
    }

    return {
      bundleIdentifier,
      version,
      workspace,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Filter Targets.
   *
   * Applies optional platform and locale selections after validating the whole
   * local asset structure, then rejects filters that select nothing.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets<Target>} targets - Targets.
   * @param {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options}         options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns<Target>}
   *
   * @since 0.34.0
   */
  private static filterTargets<Target extends Cli_Integration_AppStoreConnect_Runner_FilterTargets_Target>(targets: Cli_Integration_AppStoreConnect_Runner_FilterTargets_Targets<Target>, options: Cli_Integration_AppStoreConnect_Runner_FilterTargets_Options): Cli_Integration_AppStoreConnect_Runner_FilterTargets_Returns<Target> {
    const selectedPlatforms: Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedPlatforms = parseCommaSeparated(options['platforms']);
    const selectedLocales: Cli_Integration_AppStoreConnect_Runner_FilterTargets_SelectedLocales = parseCommaSeparated(options['locales']);

    return targets.filter((target) => {
      const matchesPlatform: Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesPlatform = selectedPlatforms === undefined || selectedPlatforms.includes(target['platform']);
      const matchesLocale: Cli_Integration_AppStoreConnect_Runner_FilterTargets_MatchesLocale = selectedLocales === undefined || selectedLocales.includes(target['locale']);

      return matchesPlatform && matchesLocale;
    });
  }

  /**
   * CLI - Integration - App Store Connect - Validate Targets.
   *
   * Rejects empty filtered plans and platform folders Nova cannot translate to
   * App Store Connect, keeping validation ahead of authentication and writes.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_Metadata_Targets | Cli_Integration_AppStoreConnect_Runner_Screenshots_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateTargets_Returns {
    if (targets.length === 0) {
      throw new Error('The selected App Store Connect filters matched no local targets.');
    }

    const unsupportedPlatforms: Cli_Integration_AppStoreConnect_Runner_ValidateTargets_UnsupportedPlatforms = [...new Set(targets.map((target) => target['platform']).filter((platform) => platforms.has(platform) === false))];

    if (unsupportedPlatforms.length > 0) {
      throw new Error(`Unsupported App Store platform folder(s): ${unsupportedPlatforms.join(', ')}.`);
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Validate Screenshot Images.
   *
   * Reads every selected image before authentication and reports all format,
   * transparency, dimension, and per-set capacity failures in one error.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Targets}         targets         - Targets.
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_SkipImageChecks} skipImageChecks - Skip image checks.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Returns}
   *
   * @since 0.39.0
   */
  private static async validateScreenshotImages(targets: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Targets, skipImageChecks: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_SkipImageChecks): Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Returns {
    const failures: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Failures = [];

    for (const target of targets) {
      if (target['files'].length < 1 || target['files'].length > maximumScreenshotCount) {
        failures.push(`${target['relativePath']}: ${target['files'].length} file(s); accepted 1-${maximumScreenshotCount} files per set.`);
      }
    }

    if (skipImageChecks === true) {
      if (failures.length > 0) {
        const capacityFailureLines: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_CapacityFailureLines = [
          'Screenshot preflight failed:',
          ...failures.map((failure) => `- ${failure}`),
        ];

        throw new Error(capacityFailureLines.join('\n'));
      }

      return;
    }

    const fileEntries: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntries = targets.flatMap((target) => target['files'].map((file) => ({
      file,
      target,
    })));
    const fileResults: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResults = await Promise.allSettled(fileEntries.map((fileEntry) => fs.readFile(fileEntry['file']['filePath'])));

    for (let fileIndex = 0; fileIndex < fileEntries.length; fileIndex += 1) {
      const fileEntry: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileEntry = fileEntries[fileIndex];
      const fileResult: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_FileResult = fileResults[fileIndex];

      if (fileEntry === undefined) {
        failures.push(`Selected screenshot index ${fileIndex}: actual missing local file entry; accepted a readable opaque PNG or JPEG.`);

        continue;
      }

      const targetName: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_TargetName = fileEntry['target']['target'];
      const acceptedSizes: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedSizes = screenshotSizeSpecifications.get(targetName) ?? [];
      const acceptedDescription: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_AcceptedDescription = acceptedSizes.join(', ');
      const displayPath: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_DisplayPath = `${fileEntry['target']['relativePath']}/${fileEntry['file']['fileName']}`;

      if (fileResult === undefined || fileResult.status === 'rejected') {
        const readFailure: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ReadFailure = (fileResult === undefined) ? 'missing read result' : String(fileResult.reason);

        failures.push(`${displayPath}: actual unreadable file (${readFailure}); accepted opaque PNG or JPEG at ${acceptedDescription}.`);

        continue;
      }

      const buffer: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Buffer = fileResult.value;
      let image: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_Image = undefined;

      try {
        image = Runner.inspectScreenshotImage(buffer);
      } catch (error) {
        failures.push(`${displayPath}: actual ${String(error)}; accepted opaque PNG or JPEG at ${acceptedDescription}.`);

        continue;
      }

      const actualSize: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_ActualSize = `${image['width']}x${image['height']}`;

      if (acceptedSizes.includes(actualSize) === false) {
        failures.push(`${displayPath}: actual ${actualSize} ${image['format']}; accepted ${acceptedDescription}.`);
      }

      if (image['hasAlpha'] === true) {
        failures.push(`${displayPath}: actual ${actualSize} PNG with alpha; accepted opaque PNG or JPEG at ${acceptedDescription}.`);
      }
    }

    if (failures.length > 0) {
      const preflightFailureLines: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotImages_PreflightFailureLines = [
        'Screenshot preflight failed before any App Store Connect request:',
        ...failures.map((failure) => `- ${failure}`),
      ];

      throw new Error(preflightFailureLines.join('\n'));
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Inspect Screenshot Image.
   *
   * Selects the PNG or JPEG header parser from the file signature instead of
   * trusting a filename extension supplied by the local asset directory.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Buffer} buffer - Buffer.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns}
   *
   * @since 0.39.0
   */
  private static inspectScreenshotImage(buffer: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Buffer): Cli_Integration_AppStoreConnect_Runner_InspectScreenshotImage_Returns {
    if (buffer.length >= pngSignature.length && buffer.subarray(0, pngSignature.length).equals(pngSignature) === true) {
      return Runner.inspectScreenshotPng(buffer);
    }

    if (
      buffer.length >= 2
      && buffer[0] === parseInt('FF', 16)
      && buffer[1] === parseInt('D8', 16)
    ) {
      return Runner.inspectScreenshotJpeg(buffer);
    }

    throw new Error('unrecognized image header');
  }

  /**
   * CLI - Integration - App Store Connect - Inspect Screenshot Jpeg.
   *
   * Walks JPEG segments until a supported start-of-frame marker supplies the
   * encoded width and height without decoding compressed image pixels.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Buffer} buffer - Buffer.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns}
   *
   * @since 0.39.0
   */
  private static inspectScreenshotJpeg(buffer: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Buffer): Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Returns {
    let offset: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Offset = 2;
    let width: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Width = undefined;
    let height: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Height = undefined;
    let hasEndOfImage: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_HasEndOfImage = false;

    while (offset < buffer.length) {
      while (offset < buffer.length && buffer[offset] !== parseInt('FF', 16)) {
        offset += 1;
      }

      while (offset < buffer.length && buffer[offset] === parseInt('FF', 16)) {
        offset += 1;
      }

      if (offset >= buffer.length) {
        break;
      }

      const marker: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_Marker = buffer[offset];

      offset += 1;

      if (marker === undefined) {
        break;
      }

      if (marker === parseInt('00', 16)) {
        continue;
      }

      if (marker === parseInt('D9', 16)) {
        hasEndOfImage = true;

        break;
      }

      if (
        marker === parseInt('01', 16)
        || marker === parseInt('D8', 16)
        || (
          marker >= parseInt('D0', 16)
          && marker <= parseInt('D7', 16)
        )
      ) {
        continue;
      }

      if (offset + 2 > buffer.length) {
        throw new Error('truncated JPEG segment length');
      }

      const segmentLength: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotJpeg_SegmentLength = buffer.readUInt16BE(offset);

      if (segmentLength < 2 || offset + segmentLength > buffer.length) {
        throw new Error('invalid JPEG segment length');
      }

      if (jpegStartOfFrameMarkers.has(marker) === true) {
        if (segmentLength < 7) {
          throw new Error('truncated JPEG start-of-frame segment');
        }

        height = buffer.readUInt16BE(offset + 3);
        width = buffer.readUInt16BE(offset + 5);
      }

      offset += segmentLength;
    }

    if (width === undefined || height === undefined) {
      throw new Error('JPEG has no supported start-of-frame segment');
    }

    if (hasEndOfImage === false) {
      throw new Error('JPEG has no complete end-of-image marker');
    }

    return {
      format: 'JPEG',
      hasAlpha: false,
      height,
      width,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Inspect Screenshot Png.
   *
   * Reads IHDR dimensions and rejects alpha-bearing color types or a tRNS chunk
   * while checking every chunk boundary before advancing through the file.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Buffer} buffer - Buffer.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns}
   *
   * @since 0.39.0
   */
  private static inspectScreenshotPng(buffer: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Buffer): Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Returns {
    let offset: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Offset = pngSignature.length;
    let width: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Width = undefined;
    let height: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_Height = undefined;
    let colorType: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ColorType = undefined;
    let hasTransparencyChunk: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasTransparencyChunk = false;
    let hasEndChunk: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_HasEndChunk = false;

    while (offset + 12 <= buffer.length) {
      const chunkLength: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkLength = buffer.readUInt32BE(offset);
      const chunkType: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_ChunkType = buffer.subarray(offset + 4, offset + 8).toString('ascii');
      const dataOffset: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_DataOffset = offset + 8;
      const nextOffset: Cli_Integration_AppStoreConnect_Runner_InspectScreenshotPng_NextOffset = dataOffset + chunkLength + 4;

      if (nextOffset > buffer.length) {
        throw new Error(`truncated PNG ${chunkType || 'unknown'} chunk`);
      }

      if (offset === pngSignature.length && chunkType !== 'IHDR') {
        throw new Error('PNG has no complete leading IHDR chunk');
      }

      if (chunkType === 'IHDR') {
        if (offset !== pngSignature.length || chunkLength !== 13) {
          throw new Error('invalid PNG IHDR length');
        }

        width = buffer.readUInt32BE(dataOffset);
        height = buffer.readUInt32BE(dataOffset + 4);
        colorType = buffer[dataOffset + 9];
      }

      if (chunkType === 'tRNS') {
        hasTransparencyChunk = true;
      }

      offset = nextOffset;

      if (chunkType === 'IEND') {
        if (chunkLength !== 0) {
          throw new Error('invalid PNG IEND length');
        }

        if (nextOffset !== buffer.length) {
          throw new Error('PNG contains data after its IEND chunk');
        }

        hasEndChunk = true;

        break;
      }
    }

    if (
      width === undefined
      || height === undefined
      || colorType === undefined
    ) {
      throw new Error('PNG has no complete IHDR chunk');
    }

    if (hasEndChunk === false) {
      throw new Error('PNG has no complete IEND chunk');
    }

    return {
      format: 'PNG',
      hasAlpha: (
        colorType === 4
        || colorType === 6
        || hasTransparencyChunk === true
      ),
      height,
      width,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Validate Screenshot Targets.
   *
   * Accepts Apple's standard screenshot folders plus the placement-based iPhone
   * Duo target and rejects mismatched platform and device combinations.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateScreenshotTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_Returns {
    for (const target of targets) {
      const isDuo: Cli_Integration_AppStoreConnect_Runner_ValidateScreenshotTargets_IsDuo = target['target'] === 'iphone-duo';

      if (isDuo === false && screenshotDisplayTypes.has(target['target']) === false) {
        throw new Error(`Unsupported App Store screenshot target: ${target['target']}.`);
      }

      if (target['platform'] === 'macos' && target['target'] !== 'mac') {
        throw new Error(`macos screenshots must use the mac target: ${target['relativePath']}.`);
      }

      if (target['platform'] !== 'macos' && target['target'] === 'mac') {
        throw new Error(`The mac screenshot target belongs under macos: ${target['relativePath']}.`);
      }
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Validate Creative Targets.
   *
   * Requires one image per official creative placement so replacement semantics
   * remain deterministic and do not depend on directory enumeration order.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets} targets - Targets.
   *
   * @private
   *
   * @returns {void}
   *
   * @since 0.34.0
   */
  private static validateCreativeTargets(targets: Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Targets): Cli_Integration_AppStoreConnect_Runner_ValidateCreativeTargets_Returns {
    for (const target of targets) {
      if (creativePlacementTypes.has(target['target']) === false) {
        throw new Error(`Unsupported App Store creative asset target: ${target['target']}.`);
      }

      if (target['files'].length !== 1) {
        throw new Error(`App Store creative asset targets require exactly one image: ${target['relativePath']}.`);
      }
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Create Client.
   *
   * Delays private-key discovery until after plan confirmation, ensuring dry runs
   * never require or read credentials from the developer's machine.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_CreateClient_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns}
   *
   * @since 0.34.0
   */
  private static async createClient(options: Cli_Integration_AppStoreConnect_Runner_CreateClient_Options): Cli_Integration_AppStoreConnect_Runner_CreateClient_Returns {
    const credentials: Cli_Integration_AppStoreConnect_Runner_CreateClient_Credentials = await Runner.resolveCredentials(options);

    return new AppStoreConnect(credentials);
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Credentials.
   *
   * Discovers Apple private keys only in the official Transporter locations and
   * keeps key material out of Nova configuration, environment variables, and logs.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options} options - Options.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveCredentials(options: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Options): Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Returns {
    const directories: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Directories = [
      join(process.cwd(), 'private_keys'),
      join(homedir(), 'private_keys'),
      join(homedir(), '.private_keys'),
      join(homedir(), '.appstoreconnect', 'private_keys'),
    ];
    const candidateGroups: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_CandidateGroups = await Promise.all(directories.map((directory) => Runner.readKeyDirectory(directory)));
    let candidates: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Candidates = candidateGroups.flat();

    if (options['keyId'] !== undefined) {
      candidates = candidates.filter((candidate) => candidate['keyId'] === options['keyId']);
    }

    if (candidates.length === 0) {
      throw new Error('No matching App Store Connect .p8 key was found in Apple\'s official private-key search paths.');
    }

    let selectedCandidate: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedCandidate = candidates[0];

    if (candidates.length > 1 && options['keyId'] === undefined) {
      if (options['nonInteractive'] === true) {
        throw new Error('Multiple App Store Connect keys were found. Pass --key-id in non-interactive mode.');
      }

      const answers: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Answers = await prompts({
        type: 'select',
        name: 'path',
        message: 'App Store Connect API key:',
        choices: candidates.map((candidate) => ({
          title: `${candidate['keyId']} (${candidate['path']})`,
          value: candidate['path'],
        })),
      }, {
        onCancel: () => false,
      });
      const selectedPath: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_SelectedPath = answers['path'];

      selectedCandidate = candidates.find((candidate) => candidate['path'] === selectedPath);
    }

    if (selectedCandidate === undefined) {
      throw new Error('App Store Connect key selection was cancelled.');
    }

    const privateKey: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_PrivateKey = await fs.readFile(selectedCandidate['path'], 'utf-8');
    const credentials: Cli_Integration_AppStoreConnect_Runner_ResolveCredentials_Credentials = {
      keyId: selectedCandidate['keyId'],
      privateKey,
    };

    if (options['issuerId'] !== undefined) {
      Reflect.set(credentials, 'issuerId', options['issuerId']);
    }

    return credentials;
  }

  /**
   * CLI - Integration - App Store Connect - Read Key Directory.
   *
   * Converts recognized AuthKey and ApiKey filenames into safe key candidates
   * while ignoring unrelated files in Apple's credential search directories.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory} directory - Directory.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns}
   *
   * @since 0.34.0
   */
  private static async readKeyDirectory(directory: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Directory): Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Returns {
    if (await pathExists(directory) === false) {
      return [];
    }

    const entries: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_Entries = await fs.readdir(directory, { withFileTypes: true });

    return entries.filter((entry) => (
      entry.isFile()
      && entry.name.endsWith('.p8') === true
      && (
        entry.name.startsWith('AuthKey_') === true
        || entry.name.startsWith('ApiKey_') === true
      )
    )).map((entry) => {
      const prefixLength: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_PrefixLength = (entry.name.startsWith('AuthKey_') === true) ? 'AuthKey_'.length : 'ApiKey_'.length;
      const keyId: Cli_Integration_AppStoreConnect_Runner_ReadKeyDirectory_KeyId = entry.name.slice(prefixLength, -'.p8'.length);

      return {
        keyId,
        path: join(directory, entry.name),
      };
    }).filter((candidate) => candidate['keyId'] !== '');
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Cached Context.
   *
   * Shares one in-flight platform and locale lookup across concurrent asset
   * targets so a missing localization is created exactly once.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache}    cache    - Cache.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client}   client   - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App}      app      - App.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version}  version  - Version.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform} platform - Platform.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale}   locale   - Locale.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns}
   *
   * @since 0.34.0
   */
  private static resolveCachedContext(cache: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Cache, client: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Client, app: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_App, version: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Version, platform: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Platform, locale: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Locale): Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Returns {
    const key: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Key = `${platform}:${locale}`;
    const cachedContext: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_CachedContext = cache.get(key);

    if (cachedContext !== undefined) {
      return cachedContext;
    }

    const context: Cli_Integration_AppStoreConnect_Runner_ResolveCachedContext_Context = Runner.resolveContext(client, app, version, platform, locale);

    cache.set(key, context);

    return context;
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Context.
   *
   * Resolves an editable platform version and its locale, creating only the
   * missing localization explicitly represented by a local target.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client}   client   - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_App}      app      - App.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version}  version  - Version.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform} platform - Platform.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale}   locale   - Locale.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveContext(client: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Client, app: Cli_Integration_AppStoreConnect_Runner_ResolveContext_App, version: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Version, platform: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Platform, locale: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Locale): Cli_Integration_AppStoreConnect_Runner_ResolveContext_Returns {
    const apiPlatform: Cli_Integration_AppStoreConnect_Runner_ResolveContext_ApiPlatform = platforms.get(platform);

    if (apiPlatform === undefined) {
      throw new Error(`Unsupported App Store platform: ${platform}.`);
    }

    const versionResource: Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionResource = await client.findVersion(Runner.resourceId(app, 'App'), version, apiPlatform);
    const versionId: Cli_Integration_AppStoreConnect_Runner_ResolveContext_VersionId = Runner.resourceId(versionResource, `${platform} version`);
    const localizations: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localizations = await client.listLocalizations(versionId);
    let localization: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Localization = localizations.find((candidate) => {
      const attributes: Cli_Integration_AppStoreConnect_Runner_ResolveContext_Attributes = requireObject(candidate['attributes'], 'Localization attributes');

      return attributes['locale'] === locale;
    });

    localization ??= await client.createLocalization(versionId, locale);

    return {
      localization,
      version: versionResource,
    };
  }

  /**
   * CLI - Integration - App Store Connect - Resolve Duo Placement Group.
   *
   * Reads Apple's live reference data instead of hard-coding a private placement
   * profile identifier for the iPhone Duo screenshot class.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client} client - Client.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns}
   *
   * @since 0.34.0
   */
  private static async resolveDuoPlacementGroup(client: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Client): Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Returns {
    const query: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Query = new URLSearchParams({
      'fields[appAssetLibraryRefData]': 'placementProfileGroups',
    });
    const response: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Response = await client.request(`/v1/appAssetLibraryRefData?${query.toString()}`);

    if (response === undefined) {
      throw new Error('App Asset Library reference data was empty.');
    }

    const resources: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resources = requireArray(response['data'], 'App Asset Library reference data').map((resource) => requireObject(resource, 'Reference data resource'));

    if (resources.length !== 1) {
      throw new Error(`Expected one App Asset Library reference resource; found ${resources.length}.`);
    }

    const resource: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Resource = resources[0];

    if (resource === undefined) {
      throw new Error('App Asset Library reference data did not include its expected resource.');
    }

    const attributes: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Attributes = requireObject(resource['attributes'], 'Reference data attributes');
    const groups: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Groups = requireArray(attributes['placementProfileGroups'], 'Reference placement profile groups');
    const group: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Group = groups.map((candidate) => requireObject(candidate, 'Placement profile group')).find((candidate) => candidate['platform'] === 'IPHONE_APP_STORE' && candidate['displayClassId'] === 'IPHONE_DUO');

    if (group === undefined) {
      throw new Error('Apple reference data does not advertise an iPhone Duo placement group.');
    }

    const keys: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Keys = [
      'placementProfileGroupId',
      'placementProfileGroup',
      'placementGroup',
      'groupId',
      'id',
    ];

    for (const key of keys) {
      const value: Cli_Integration_AppStoreConnect_Runner_ResolveDuoPlacementGroup_Value = group[key];

      if (typeof value === 'string' && value !== '') {
        return value;
      }
    }

    throw new Error('Unable to read the iPhone Duo placement-group identifier from Apple reference data.');
  }

  /**
   * CLI - Integration - App Store Connect - Replace Screenshot Batch.
   *
   * Fills current capacity, frees only the old slots needed by the next batch,
   * and recurses until the exact local screenshot order can become authoritative.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Client}                    client                    - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SetId}                     setId                     - Set id.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Target}                    target                    - Target.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FileBuffers}               fileBuffers               - File buffers.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PendingFileIndexes}        pendingFileIndexes        - Pending file indexes.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredScreenshotIds}      desiredScreenshotIds      - Desired screenshot ids.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingOldScreenshotIds} remainingOldScreenshotIds - Remaining old screenshot ids.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FreeSlots}                 freeSlots                 - Free slots.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_WindowSize}                windowSize                - Window size.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotDeleteCount}  oldScreenshotDeleteCount  - Old screenshot delete count.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotCount}   uploadedScreenshotCount   - Uploaded screenshot count.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Returns}
   *
   * @since 0.39.0
   */
  private static async replaceScreenshotBatch(client: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Client, setId: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SetId, target: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Target, fileBuffers: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FileBuffers, pendingFileIndexes: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PendingFileIndexes, desiredScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredScreenshotIds, remainingOldScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingOldScreenshotIds, freeSlots: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_FreeSlots, windowSize: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_WindowSize = 1, oldScreenshotDeleteCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotDeleteCount = 0, uploadedScreenshotCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotCount = 0): Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Returns {
    let availableSlots: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_AvailableSlots = freeSlots;
    let deletedOldScreenshotCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DeletedOldScreenshotCount = oldScreenshotDeleteCount;

    if (availableSlots === 0 && pendingFileIndexes.length > 0) {
      const completeReplacementCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompleteReplacementCount = uploadedScreenshotCount;
      const permittedOldScreenshotDeleteCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_PermittedOldScreenshotDeleteCount = Math.max(0, completeReplacementCount + 1 - deletedOldScreenshotCount);
      const oldScreenshotIdsForCapacity: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OldScreenshotIdsForCapacity = [...remainingOldScreenshotIds].slice(0, Math.min(windowSize, pendingFileIndexes.length, permittedOldScreenshotDeleteCount));

      if (oldScreenshotIdsForCapacity.length === 0) {
        throw new Error(`Unable to free screenshot capacity for ${target['relativePath']} without exceeding the completed-replacement safety window.`);
      }

      await AppStoreConnect.runOperations(oldScreenshotIdsForCapacity, async (oldScreenshotId) => {
        await client.deleteResource('appScreenshots', oldScreenshotId);

        remainingOldScreenshotIds.delete(oldScreenshotId);

        return;
      });

      availableSlots += oldScreenshotIdsForCapacity.length;
      deletedOldScreenshotCount += oldScreenshotIdsForCapacity.length;
    }

    const batchFileIndexes: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_BatchFileIndexes = pendingFileIndexes.slice(0, Math.min(windowSize, availableSlots));

    if (batchFileIndexes.length > 0) {
      await AppStoreConnect.runOperations(batchFileIndexes, async (fileIndex) => {
        const file: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_File = target['files'][fileIndex];

        if (file === undefined) {
          throw new Error(`Unable to find local screenshot index ${fileIndex} for ${target['relativePath']}.`);
        }

        const uploadedScreenshot: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshot = await client.uploadScreenshot(setId, file['fileName'], Runner.fileBuffer(fileBuffers, fileIndex, file['fileName']));
        const uploadedScreenshotId: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_UploadedScreenshotId = Runner.resourceId(uploadedScreenshot, 'Uploaded screenshot');

        Reflect.set(desiredScreenshotIds, fileIndex, uploadedScreenshotId);

        return;
      });
    }

    const remainingPendingFileIndexes: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingPendingFileIndexes = pendingFileIndexes.slice(batchFileIndexes.length);
    const completedUploadedScreenshotCount: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_CompletedUploadedScreenshotCount = uploadedScreenshotCount + batchFileIndexes.length;

    if (remainingPendingFileIndexes.length === 0) {
      const resourcesBeforeSweep: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_ResourcesBeforeSweep = await client.listScreenshots(setId);
      const incompleteScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_IncompleteScreenshotIds = resourcesBeforeSweep.filter((resource) => {
        const attributes: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_Attributes = requireObject(resource['attributes'], 'Screenshot attributes before final ordering');
        const state: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_State = requireObject(attributes['assetDeliveryState'], 'Screenshot delivery state before final ordering');

        return state['state'] !== 'COMPLETE';
      }).map((resource) => Runner.resourceId(resource, 'Incomplete screenshot before final ordering'));

      await AppStoreConnect.runOperations(incompleteScreenshotIds, (incompleteScreenshotId) => client.deleteResource('appScreenshots', incompleteScreenshotId));

      const remainingResources: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingResources = (incompleteScreenshotIds.length === 0) ? resourcesBeforeSweep : await client.listScreenshots(setId);
      const desiredOrderedScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_DesiredOrderedScreenshotIds = desiredScreenshotIds.map((desiredScreenshotId) => {
        if (desiredScreenshotId === undefined) {
          throw new Error(`Screenshot replacement for ${target['relativePath']} ended without every local screenshot.`);
        }

        return desiredScreenshotId;
      });
      const remainingScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_RemainingScreenshotIds = remainingResources.map((remainingResource) => Runner.resourceId(remainingResource, 'Screenshot before final ordering'));

      for (const desiredOrderedScreenshotId of desiredOrderedScreenshotIds) {
        if (remainingScreenshotIds.includes(desiredOrderedScreenshotId) === false) {
          throw new Error(`Screenshot replacement for ${target['relativePath']} is missing completed resource ${desiredOrderedScreenshotId}.`);
        }
      }

      const supersededScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_SupersededScreenshotIds = remainingScreenshotIds.filter((remainingScreenshotId) => desiredOrderedScreenshotIds.includes(remainingScreenshotId) === false);
      const orderedScreenshotIds: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_OrderedScreenshotIds = [
        ...desiredOrderedScreenshotIds,
        ...supersededScreenshotIds,
      ];

      await client.reorderScreenshots(setId, orderedScreenshotIds);

      await AppStoreConnect.runOperations(supersededScreenshotIds, async (oldScreenshotId) => {
        await client.deleteResource('appScreenshots', oldScreenshotId);

        remainingOldScreenshotIds.delete(oldScreenshotId);

        return;
      });

      return;
    }

    const nextFreeSlots: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextFreeSlots = availableSlots - batchFileIndexes.length;
    const nextWindowSize: Cli_Integration_AppStoreConnect_Runner_ReplaceScreenshotBatch_NextWindowSize = (nextFreeSlots === 0) ? 1 : Math.min(windowSize * 2, maximumScreenshotCount);

    await Runner.replaceScreenshotBatch(client, setId, target, fileBuffers, remainingPendingFileIndexes, desiredScreenshotIds, remainingOldScreenshotIds, nextFreeSlots, nextWindowSize, deletedOldScreenshotCount, completedUploadedScreenshotCount);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Placement Image ID.
   *
   * Reads the placement's image relationship without guessing from JSON:API's
   * de-duplicated, unordered included resources.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Placement} placement - Placement.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Returns}
   *
   * @since 0.39.0
   */
  private static placementImageId(placement: Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Placement): Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Returns {
    const relationships: Cli_Integration_AppStoreConnect_Runner_PlacementImageId_Relationships = placement['relationships'];

    if (
      typeof relationships === 'object'
      && relationships !== null
      && 'image' in relationships
    ) {
      const imageRelationship: Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageRelationship = relationships['image'];

      if (
        typeof imageRelationship === 'object'
        && imageRelationship !== null
        && 'data' in imageRelationship
      ) {
        const imageData: Cli_Integration_AppStoreConnect_Runner_PlacementImageId_ImageData = imageRelationship['data'];

        if (
          typeof imageData === 'object'
          && imageData !== null
          && 'id' in imageData
          && typeof imageData['id'] === 'string'
          && imageData['id'] !== ''
        ) {
          return imageData['id'];
        }
      }
    }

    return undefined;
  }

  /**
   * CLI - Integration - App Store Connect - Replace Placement.
   *
   * Stages and orders replacement placements before removing the prior set when
   * Apple's per-group maximum permits both generations to coexist.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client}         client         - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context}        context        - Context.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType}  placementType  - Placement type.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup} placementGroup - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds}       imageIds       - Image ids.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns}
   *
   * @since 0.39.0
   */
  private static async replacePlacement(client: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Client, context: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Context, placementType: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementType, placementGroup: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementGroup, imageIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageIds): Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Returns {
    const localizationId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_LocalizationId = Runner.resourceId(context['localization'], 'App Store localization');
    const query: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Query = new URLSearchParams({
      'fields[appAssetLibraryImages]': 'referenceName',
      'fields[appAssetLibraryPlacements]': 'image,placementGroup,placementType',
      'filter[placementGroup]': placementGroup,
      'filter[placementType]': placementType,
      'include': 'image',
      'limit': '50',
    });
    const response: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_Response = await client.request(`/v1/appStoreVersionLocalizations/${localizationId}/placements?${query.toString()}`);
    const existingPlacements: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ExistingPlacements = (response === undefined) ? [] : requireArray(response['data'], 'Existing asset placements').map((placement) => requireObject(placement, 'Asset placement'));
    const maximumPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MaximumPlacementCount = maximumPlacementCounts.get(placementType) ?? 1;
    const availablePlacements: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_AvailablePlacements = [...existingPlacements];
    const desiredPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_DesiredPlacementIds = imageIds.map(() => undefined);
    const pendingImageIndexes: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PendingImageIndexes = [];

    if (existingPlacements.length > maximumPlacementCount) {
      throw new Error(`${placementType}/${placementGroup} contains ${existingPlacements.length} placements, exceeding Apple's ${maximumPlacementCount}-placement limit.`);
    }

    for (let imageIndex = 0; imageIndex < imageIds.length; imageIndex += 1) {
      const imageId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_ImageId = imageIds[imageIndex];

      if (imageId === undefined) {
        throw new Error(`Unable to resolve replacement image index ${imageIndex} for ${placementType}/${placementGroup}.`);
      }

      const matchingPlacementIndex: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementIndex = availablePlacements.findIndex((availablePlacement) => Runner.placementImageId(availablePlacement) === imageId);

      if (matchingPlacementIndex === -1) {
        pendingImageIndexes.push(imageIndex);

        continue;
      }

      const matchingPlacement: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacement = availablePlacements[matchingPlacementIndex];

      if (matchingPlacement === undefined) {
        throw new Error(`Unable to reuse replacement image index ${imageIndex} for ${placementType}/${placementGroup}.`);
      }

      const matchingPlacementId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_MatchingPlacementId = Runner.resourceId(matchingPlacement, 'Matching asset placement');

      Reflect.set(desiredPlacementIds, imageIndex, matchingPlacementId);

      availablePlacements.splice(matchingPlacementIndex, 1);
    }

    const remainingOldPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_RemainingOldPlacementIds = new Set(availablePlacements.map((availablePlacement) => Runner.resourceId(availablePlacement, 'Existing asset placement')));
    const freeSlots: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FreeSlots = maximumPlacementCount - existingPlacements.length;

    try {
      const initialDesiredPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_InitialDesiredPlacementCount = desiredPlacementIds.filter((desiredPlacementId) => desiredPlacementId !== undefined).length;

      if (
        maximumPlacementCount === 1
        && pendingImageIndexes.length > freeSlots
        && initialDesiredPlacementCount === 0
      ) {
        Logger.warn(`Apple limits ${placementType}/${placementGroup} to one placement, so the old and replacement placements cannot coexist. The old placement will be removed only after the replacement asset finishes processing.`);
      }

      await Runner.replacePlacementBatch(client, localizationId, placementType, placementGroup, imageIds, pendingImageIndexes, desiredPlacementIds, remainingOldPlacementIds, freeSlots);
    } catch (error) {
      const failureResponse: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureResponse = await client.request(`/v1/appStoreVersionLocalizations/${localizationId}/placements?${query.toString()}`);
      const failurePlacements: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailurePlacements = (failureResponse === undefined) ? [] : requireArray(failureResponse['data'], 'Asset placements after failure').map((placement) => requireObject(placement, 'Asset placement after failure'));
      const failureNewPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureNewPlacementCount = failurePlacements.filter((placement) => {
        const placementImageId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_PlacementImageId = Runner.placementImageId(placement);

        return placementImageId !== undefined && imageIds.includes(placementImageId);
      }).length;
      const failureOldPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacement_FailureOldPlacementCount = failurePlacements.length - failureNewPlacementCount;

      throw new Error(`Replacing ${placementType}/${placementGroup} stopped after an App Store Connect failure. ${failureOldPlacementCount} old placement(s) and ${failureNewPlacementCount} new placement(s) remain; processed assets stay reusable in the App Asset Library.`, { cause: error });
    }

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Replace Placement Batch.
   *
   * Reuses matching image placements and rolls new placements through the
   * group's remaining capacity without accumulating retry leftovers.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Client}                   client                   - Client.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_LocalizationId}           localizationId           - Localization id.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementType}            placementType            - Placement type.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementGroup}           placementGroup           - Placement group.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageIds}                 imageIds                 - Image ids.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PendingImageIndexes}      pendingImageIndexes      - Pending image indexes.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredPlacementIds}      desiredPlacementIds      - Desired placement ids.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIds} remainingOldPlacementIds - Remaining old placement ids.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreeSlots}                freeSlots                - Free slots.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_WindowSize}               windowSize               - Window size.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementDeleteCount}  oldPlacementDeleteCount  - Old placement delete count.
   * @param {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementCount}    createdPlacementCount    - Created placement count.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Returns}
   *
   * @since 0.39.0
   */
  private static async replacePlacementBatch(client: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Client, localizationId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_LocalizationId, placementType: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementType, placementGroup: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PlacementGroup, imageIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageIds, pendingImageIndexes: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PendingImageIndexes, desiredPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredPlacementIds, remainingOldPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIds, freeSlots: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreeSlots, windowSize: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_WindowSize = 1, oldPlacementDeleteCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementDeleteCount = 0, createdPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementCount = 0): Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_Returns {
    let availableSlots: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_AvailableSlots = freeSlots;
    let deletedOldPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DeletedOldPlacementCount = oldPlacementDeleteCount;

    if (availableSlots === 0 && pendingImageIndexes.length > 0) {
      const completeReplacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CompleteReplacementCount = createdPlacementCount;
      const permittedOldPlacementDeleteCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_PermittedOldPlacementDeleteCount = Math.max(0, completeReplacementCount + 1 - deletedOldPlacementCount);
      const oldPlacementIdsToDelete: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OldPlacementIdsToDelete = [...remainingOldPlacementIds].slice(0, Math.min(windowSize, pendingImageIndexes.length, permittedOldPlacementDeleteCount));

      if (oldPlacementIdsToDelete.length === 0) {
        throw new Error(`Unable to free placement capacity for ${placementType}/${placementGroup} without exceeding the completed-replacement safety window.`);
      }

      await AppStoreConnect.runOperations(oldPlacementIdsToDelete, async (oldPlacementId) => {
        await client.deleteResource('appAssetLibraryPlacements', oldPlacementId);

        remainingOldPlacementIds.delete(oldPlacementId);

        return;
      });

      availableSlots += oldPlacementIdsToDelete.length;
      deletedOldPlacementCount += oldPlacementIdsToDelete.length;
    }

    const batchImageIndexes: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_BatchImageIndexes = pendingImageIndexes.slice(0, Math.min(windowSize, availableSlots));

    if (batchImageIndexes.length > 0) {
      await AppStoreConnect.runOperations(batchImageIndexes, async (imageIndex) => {
        const imageId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_ImageId = imageIds[imageIndex];

        if (imageId === undefined) {
          throw new Error(`Unable to find replacement image index ${imageIndex} for ${placementType}/${placementGroup}.`);
        }

        const createdPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementIds = await Runner.createPlacements(client, localizationId, placementType, placementGroup, [imageId]);
        const createdPlacementId: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_CreatedPlacementId = createdPlacementIds[0];

        if (createdPlacementId === undefined) {
          throw new Error(`Creating replacement image index ${imageIndex} returned no placement.`);
        }

        Reflect.set(desiredPlacementIds, imageIndex, createdPlacementId);

        return;
      });
    }

    const remainingPendingImageIndexes: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingPendingImageIndexes = pendingImageIndexes.slice(batchImageIndexes.length);
    const nextCreatedPlacementCount: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextCreatedPlacementCount = createdPlacementCount + batchImageIndexes.length;

    if (remainingPendingImageIndexes.length === 0) {
      const desiredOrderedPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_DesiredOrderedPlacementIds = desiredPlacementIds.map((desiredPlacementId) => {
        if (desiredPlacementId === undefined) {
          throw new Error(`Placement replacement for ${placementType}/${placementGroup} ended without every replacement image.`);
        }

        return desiredPlacementId;
      });
      const freshQuery: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshQuery = new URLSearchParams({
        'fields[appAssetLibraryPlacements]': 'image,placementGroup,placementType',
        'filter[placementGroup]': placementGroup,
        'filter[placementType]': placementType,
        'limit': '50',
      });
      const freshResponse: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshResponse = await client.request(`/v1/appStoreVersionLocalizations/${localizationId}/placements?${freshQuery.toString()}`);
      const freshPlacements: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacements = (freshResponse === undefined) ? [] : requireArray(freshResponse['data'], 'Placements before final ordering').map((placement) => requireObject(placement, 'Placement before final ordering'));
      const freshPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_FreshPlacementIds = freshPlacements.map((placement) => Runner.resourceId(placement, 'Placement before final ordering'));

      for (const desiredOrderedPlacementId of desiredOrderedPlacementIds) {
        if (freshPlacementIds.includes(desiredOrderedPlacementId) === false) {
          throw new Error(`Placement replacement for ${placementType}/${placementGroup} is missing completed resource ${desiredOrderedPlacementId}.`);
        }
      }

      const supersededPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_SupersededPlacementIds = freshPlacementIds.filter((freshPlacementId) => desiredOrderedPlacementIds.includes(freshPlacementId) === false);
      const orderedPlacementIds: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_OrderedPlacementIds = [
        ...desiredOrderedPlacementIds,
        ...supersededPlacementIds,
      ];

      await Runner.orderPlacements(client, localizationId, placementGroup, orderedPlacementIds);

      const remainingOldPlacementIdsToDelete: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_RemainingOldPlacementIdsToDelete = supersededPlacementIds;

      await AppStoreConnect.runOperations(remainingOldPlacementIdsToDelete, async (oldPlacementId) => {
        await client.deleteResource('appAssetLibraryPlacements', oldPlacementId);

        remainingOldPlacementIds.delete(oldPlacementId);

        return;
      });

      return;
    }

    const nextFreeSlots: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextFreeSlots = availableSlots - batchImageIndexes.length;
    const nextWindowSize: Cli_Integration_AppStoreConnect_Runner_ReplacePlacementBatch_NextWindowSize = (nextFreeSlots === 0) ? 1 : Math.min(windowSize * 2, maximumPlacementCounts.get(placementType) ?? 1);

    await Runner.replacePlacementBatch(client, localizationId, placementType, placementGroup, imageIds, remainingPendingImageIndexes, desiredPlacementIds, remainingOldPlacementIds, nextFreeSlots, nextWindowSize, deletedOldPlacementCount, nextCreatedPlacementCount);

    return;
  }

  /**
   * CLI - Integration - App Store Connect - Resource ID.
   *
   * Extracts one required JSON API resource identifier with a contextual error
   * before that value is inserted into another request path or relationship.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource} resource - Resource.
   * @param {Cli_Integration_AppStoreConnect_Runner_ResourceId_Name}     name     - Name.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns}
   *
   * @since 0.34.0
   */
  private static resourceId(resource: Cli_Integration_AppStoreConnect_Runner_ResourceId_Resource, name: Cli_Integration_AppStoreConnect_Runner_ResourceId_Name): Cli_Integration_AppStoreConnect_Runner_ResourceId_Returns {
    return requireString(resource['id'], `${name} ID`);
  }

  /**
   * CLI - Integration - App Store Connect - File Buffer.
   *
   * Pairs a validated local asset with its loaded bytes and refuses to replace
   * an impossible missing buffer with an empty upload.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers}  buffers  - Buffers.
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index}    index    - Index.
   * @param {Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName} fileName - File name.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns}
   *
   * @since 0.34.0
   */
  private static fileBuffer(buffers: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffers, index: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Index, fileName: Cli_Integration_AppStoreConnect_Runner_FileBuffer_FileName): Cli_Integration_AppStoreConnect_Runner_FileBuffer_Returns {
    const buffer: Cli_Integration_AppStoreConnect_Runner_FileBuffer_Buffer = buffers[index];

    if (buffer === undefined) {
      throw new Error(`Unable to read local asset bytes: ${fileName}`);
    }

    return buffer;
  }

  /**
   * CLI - Integration - App Store Connect - Read Files.
   *
   * Reads a validated target in deterministic order immediately before upload,
   * keeping local planning separate from credential access and remote mutation.
   *
   * @param {Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target} target - Target.
   *
   * @private
   *
   * @returns {Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns}
   *
   * @since 0.34.0
   */
  private static async readFiles(target: Cli_Integration_AppStoreConnect_Runner_ReadFiles_Target): Cli_Integration_AppStoreConnect_Runner_ReadFiles_Returns {
    return Promise.all(target['files'].map((file) => fs.readFile(file['filePath'])));
  }
}
