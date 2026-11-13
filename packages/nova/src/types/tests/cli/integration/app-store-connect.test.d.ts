import type { Runner as ApiAppStoreConnect } from '../../../../api/app-store-connect.js';
import type {
  Shared_AppStoreConnectIntegrationOptions,
  Shared_AppStoreConnectResource,
  Shared_AppStoreConnectTestFakeState,
} from '../../../shared.d.ts';

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_OriginalCwd = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_TemporaryBase = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_SandboxRoot = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ProjectRoot = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ScreenshotsRoot = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PrivateKey = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_Options = Shared_AppStoreConnectIntegrationOptions;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Accepts 416x496 For The Apple Watch Series 10 Target.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_Accepts416x496ForTheAppleWatchSeries10Target_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Accepts A Structurally Complete JPEG.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsAStructurallyCompleteJPEG_ValidJpeg = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsAStructurallyCompleteJPEG_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Accepts Only 416x496 For The Apple Watch Series 10 Target.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsOnly416x496ForTheAppleWatchSeries10Target_InvalidWatchImage = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsOnly416x496ForTheAppleWatchSeries10Target_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Accepts Skip Image Checks.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsSkipImageChecks_InvalidImage = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AcceptsSkipImageChecks_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Ambiguous Create Does Not Duplicate A Reservation.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AmbiguousCreateDoesNotDuplicateAReservation_Image = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AmbiguousCreateDoesNotDuplicateAReservation_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_AmbiguousCreateDoesNotDuplicateAReservation_Screenshot = Shared_AppStoreConnectResource | undefined;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Builds Final Placement Ordering From A Fresh Filtered Listing.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_BuildsFinalPlacementOrderingFromAFreshFilteredListing_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_BuildsFinalPlacementOrderingFromAFreshFilteredListing_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Creative Assets Use One Placement Slot.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_CreativeAssetsUseOnePlacementSlot_Image = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_CreativeAssetsUseOnePlacementSlot_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_CreativeAssetsUseOnePlacementSlot_CreativeImage = Shared_AppStoreConnectResource | undefined;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Duo Never Exceeds Ten Placements.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_DuoNeverExceedsTenPlacements_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_DuoNeverExceedsTenPlacements_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Fits Four New Screenshots Beside Three Old Screenshots.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FitsFourNewScreenshotsBesideThreeOldScreenshots_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FitsFourNewScreenshotsBesideThreeOldScreenshots_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Full Set Failure Loses At Most One Old Screenshot.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FullSetFailureLosesAtMostOneOldScreenshot_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FullSetFailureLosesAtMostOneOldScreenshot_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FullSetFailureLosesAtMostOneOldScreenshot_ValidateFailure = (error: unknown) => boolean;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_FullSetFailureLosesAtMostOneOldScreenshot_ValidateFailure_ReceivedError = unknown;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Honors Retry After And A Zero Remaining Budget Inside The Stateful Flow.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_HonorsRetryAfterAndAZeroRemainingBudgetInsideTheStatefulFlow_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Keeps Polling When An Upload Joins A Screenshot Set Late.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_KeepsPollingWhenAnUploadJoinsAScreenshotSetLate_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_KeepsPollingWhenAnUploadJoinsAScreenshotSetLate_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_KeepsPollingWhenAnUploadJoinsAScreenshotSetLate_FirstUpload = Promise<Shared_AppStoreConnectResource>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_KeepsPollingWhenAnUploadJoinsAScreenshotSetLate_SecondUpload = Promise<Shared_AppStoreConnectResource>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_KeepsPollingWhenAnUploadJoinsAScreenshotSetLate_Results = Shared_AppStoreConnectResource[];

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Models Failed Archived And Indefinitely Processing Asset Images.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ModelsFailedArchivedAndIndefinitelyProcessingAssetImages_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ModelsFailedArchivedAndIndefinitelyProcessingAssetImages_Client = ApiAppStoreConnect;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P1 Counts Only Completed Uploads From This Run Toward Old Screenshot Deletion.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P1CountsOnlyCompletedUploadsFromThisRunTowardOldScreenshotDeletion_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P1CountsOnlyCompletedUploadsFromThisRunTowardOldScreenshotDeletion_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P1CountsOnlyCompletedUploadsFromThisRunTowardOldScreenshotDeletion_RemainingOldCount = number;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P1CountsOnlyCompletedUploadsFromThisRunTowardOldScreenshotDeletion_CompletedUploadCount = number;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P2 Reconciles A Transport Reset After A Screenshot Reservation Is Created.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P2ReconcilesATransportResetAfterAScreenshotReservationIsCreated_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P2ReconcilesATransportResetAfterAScreenshotReservationIsCreated_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P2ReconcilesATransportResetAfterAScreenshotReservationIsCreated_RemainingStates = unknown[];

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P3 Reconciles A Transport Reset After A Duo Placement Is Created.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P3ReconcilesATransportResetAfterADuoPlacementIsCreated_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P3ReconcilesATransportResetAfterADuoPlacementIsCreated_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P4 Reconciles A Transport Reset After A Creative Placement Is Created.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P4ReconcilesATransportResetAfterACreativePlacementIsCreated_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P5 Treats A Placement With A Null Image Relationship As Old.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P5TreatsAPlacementWithANullImageRelationshipAsOld_Image = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P5TreatsAPlacementWithANullImageRelationshipAsOld_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P6 Rejects Every Shared Poll Waiter And Clears The Poll After Malformed Listing Data.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_FirstUpload = Promise<Shared_AppStoreConnectResource>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_SecondUpload = Promise<Shared_AppStoreConnectResource>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_ConcurrentResults = PromiseSettledResult<Shared_AppStoreConnectResource>[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P6RejectsEverySharedPollWaiterAndClearsThePollAfterMalformedListingData_LaterUpload = Promise<Shared_AppStoreConnectResource>;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P7 Preserves Exact Order When Local Screenshot Files Are Identical.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P7PreservesExactOrderWhenLocalScreenshotFilesAreIdentical_A = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P7PreservesExactOrderWhenLocalScreenshotFilesAreIdentical_B = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P7PreservesExactOrderWhenLocalScreenshotFilesAreIdentical_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P7PreservesExactOrderWhenLocalScreenshotFilesAreIdentical_ExpectedChecksums = string[];

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P8 Keeps A Second Duo Run Idempotent And Uses Eight Digit Checksum Names.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_ImageCount = number;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_PlacementCreateCount = number;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_PlacementIds = string[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_ReferenceName = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P8KeepsASecondDuoRunIdempotentAndUsesEightDigitChecksumNames_ChecksumMarkerIndex = number;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - P9 Deletes Only Exact Name Failed Assets During Asset Library Cleanup.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_File = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_Checksum = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_ReferenceName = string;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_Result = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_P9DeletesOnlyExactNameFailedAssetsDuringAssetLibraryCleanup_ImageIds = unknown[];

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Placement Lists Require Include For Relationship Data.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithoutInclude = Shared_AppStoreConnectResource | undefined;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithInclude = Shared_AppStoreConnectResource | undefined;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithoutIncludePlacement = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithoutIncludeRelationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithIncludePlacement = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithIncludeRelationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_PlacementListsRequireIncludeForRelationshipData_WithIncludeData = Record<string, unknown>;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Reconciles One 502 After Localization Screenshot Set And Asset Image Creates.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesOne502AfterLocalizationScreenshotSetAndAssetImageCreates_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesOne502AfterLocalizationScreenshotSetAndAssetImageCreates_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesOne502AfterLocalizationScreenshotSetAndAssetImageCreates_Localization = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesOne502AfterLocalizationScreenshotSetAndAssetImageCreates_Set = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesOne502AfterLocalizationScreenshotSetAndAssetImageCreates_Image = Shared_AppStoreConnectResource;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Reconciles Transport Failures After Localization Screenshot Set And Asset Image Creates.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesTransportFailuresAfterLocalizationScreenshotSetAndAssetImageCreates_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesTransportFailuresAfterLocalizationScreenshotSetAndAssetImageCreates_Client = ApiAppStoreConnect;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesTransportFailuresAfterLocalizationScreenshotSetAndAssetImageCreates_Localization = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesTransportFailuresAfterLocalizationScreenshotSetAndAssetImageCreates_Set = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReconcilesTransportFailuresAfterLocalizationScreenshotSetAndAssetImageCreates_Image = Shared_AppStoreConnectResource;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Rejects Invalid Images Before Any Request.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsInvalidImagesBeforeAnyRequest_WrongSizeImage = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsInvalidImagesBeforeAnyRequest_AlphaImage = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsInvalidImagesBeforeAnyRequest_Fake = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsInvalidImagesBeforeAnyRequest_ValidateFailure = (error: unknown) => boolean;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsInvalidImagesBeforeAnyRequest_ValidateFailure_ReceivedError = unknown;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Rejects JPEG Data Without A Complete End Of Image Marker Before Any Request.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsJPEGDataWithoutACompleteEndOfImageMarkerBeforeAnyRequest_TruncatedJpeg = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsJPEGDataWithoutACompleteEndOfImageMarkerBeforeAnyRequest_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Rejects Truncated PNG Data Before Any Request.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsTruncatedPNGDataBeforeAnyRequest_TruncatedPngs = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RejectsTruncatedPNGDataBeforeAnyRequest_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Reports Fresh Placement Counts After An Ordering Failure.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReportsFreshPlacementCountsAfterAnOrderingFailure_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReportsFreshPlacementCountsAfterAnOrderingFailure_Validate = (error: unknown) => boolean;

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ReportsFreshPlacementCountsAfterAnOrderingFailure_Validate_ReceivedError = unknown;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Resumes By Checksum In Exact Order.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ResumesByChecksumInExactOrder_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_ResumesByChecksumInExactOrder_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Retries The Idempotent Placement Ordering Request After One 502.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RetriesTheIdempotentPlacementOrderingRequestAfterOne502_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RetriesTheIdempotentPlacementOrderingRequestAfterOne502_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - CLI App Store Connect Screenshots - Rolls Ten New Screenshots Through A Full Set.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RollsTenNewScreenshotsThroughAFullSet_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_CliAppStoreConnectScreenshots_RollsTenNewScreenshotsThroughAFullSet_Fake = Shared_AppStoreConnectTestFakeState;

/**
 * Tests - CLI - Integration - App Store Connect - Create JPEG.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CreateJpeg_Width = number;

export type Tests_Cli_Integration_AppStoreConnect_CreateJpeg_Height = number;

export type Tests_Cli_Integration_AppStoreConnect_CreateJpeg_Returns = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CreateJpeg_Frame = Buffer;

/**
 * Tests - CLI - Integration - App Store Connect - Create Placement Resource.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CreatePlacementResource_Id = string;

export type Tests_Cli_Integration_AppStoreConnect_CreatePlacementResource_ImageId = string;

export type Tests_Cli_Integration_AppStoreConnect_CreatePlacementResource_Returns = Shared_AppStoreConnectResource;

/**
 * Tests - CLI - Integration - App Store Connect - Create PNG.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Width = number;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Height = number;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Variant = number;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_ColorType = number;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_IncludeTransparency = boolean;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Returns = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Header = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_TransparencyChunk = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CreatePng_Trailer = Buffer;

/**
 * Tests - CLI - Integration - App Store Connect - Create Screenshot Resource.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_CreateScreenshotResource_Id = string;

export type Tests_Cli_Integration_AppStoreConnect_CreateScreenshotResource_FileName = string;

export type Tests_Cli_Integration_AppStoreConnect_CreateScreenshotResource_Contents = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_CreateScreenshotResource_State = string;

export type Tests_Cli_Integration_AppStoreConnect_CreateScreenshotResource_Returns = Shared_AppStoreConnectResource;

/**
 * Tests - CLI - Integration - App Store Connect - Install App Store Connect Fake.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AmbiguousPlacementCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AmbiguousScreenshotCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AssetImageOutcomes = ('ARCHIVED' | 'FAILED' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING')[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AssetProcessingPolls = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialImages = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialLocalizations = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialScreenshotSets = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialScreenshots = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_MalformedScreenshotListing = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_OrderingFailureOnce = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_OrderingPermanentFailure = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_PlacementAppearsBeforeFinalListing = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_RateLimitOnce = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ScreenshotOutcomes = ('COMPLETE' | 'FAILED')[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ScreenshotProcessingPolls = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterAssetImageCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterLocalizationCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterScreenshotSetCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterAssetImageCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterLocalizationCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterPlacementCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterScreenshotCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterScreenshotSetCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options = {
  ambiguousPlacementCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AmbiguousPlacementCreate;
  ambiguousScreenshotCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AmbiguousScreenshotCreate;
  assetImageOutcomes?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AssetImageOutcomes;
  assetProcessingPolls?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_AssetProcessingPolls;
  initialImages?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialImages;
  initialLocalizations?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialLocalizations;
  initialPlacements?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialPlacements;
  initialScreenshotSets?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialScreenshotSets;
  initialScreenshots?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_InitialScreenshots;
  malformedScreenshotListing?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_MalformedScreenshotListing;
  orderingFailureOnce?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_OrderingFailureOnce;
  orderingPermanentFailure?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_OrderingPermanentFailure;
  placementAppearsBeforeFinalListing?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_PlacementAppearsBeforeFinalListing;
  rateLimitOnce?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_RateLimitOnce;
  screenshotOutcomes?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ScreenshotOutcomes;
  screenshotProcessingPolls?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ScreenshotProcessingPolls;
  serverFailureAfterAssetImageCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterAssetImageCreate;
  serverFailureAfterLocalizationCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterLocalizationCreate;
  serverFailureAfterScreenshotSetCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_ServerFailureAfterScreenshotSetCreate;
  transportFailureAfterAssetImageCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterAssetImageCreate;
  transportFailureAfterLocalizationCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterLocalizationCreate;
  transportFailureAfterPlacementCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterPlacementCreate;
  transportFailureAfterScreenshotCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterScreenshotCreate;
  transportFailureAfterScreenshotSetCreate?: Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Options_TransportFailureAfterScreenshotSetCreate;
};

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Returns = Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_State;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_InitialImages = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_InitialLocalizations = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_InitialPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_InitialScreenshotSets = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_InitialScreenshots = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_State = Shared_AppStoreConnectTestFakeState;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotOutcomes = ('COMPLETE' | 'FAILED')[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetImageOutcomes = ('ARCHIVED' | 'FAILED' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING')[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ImageOutcomes = Map<string, 'COMPLETE' | 'FAILED'>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetOutcomes = Map<string, 'ARCHIVED' | 'FAILED' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING'>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetPollCounts = Map<string, number>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotPollCounts = Map<string, number>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetProcessingPolls = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotProcessingPolls = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_UploadedBytes = Map<string, Buffer>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ImageBytes = Map<string, Buffer>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotIndex = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetImageIndex = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_LocalizationIndex = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementIndex = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotSetIndex = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AmbiguousScreenshotCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AmbiguousPlacementCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_TransportFailureAfterAssetImageCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_TransportFailureAfterLocalizationCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_TransportFailureAfterPlacementCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_TransportFailureAfterScreenshotCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_TransportFailureAfterScreenshotSetCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_RateLimitOnce = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ServerFailureAfterAssetImageCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ServerFailureAfterLocalizationCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ServerFailureAfterScreenshotSetCreate = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_MalformedScreenshotListing = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderingFailureOnce = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderingPermanentFailure = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementAppearsBeforeFinalListing = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Url = URL;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Method = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Path = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_UploadId = string | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_UploadBody = RequestInit['body'];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Bytes = Buffer;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_LocalizationCreateData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_LocalizationCreateAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_LocalizationLocale = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CreatedLocalization = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotSetCreateData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotSetCreateAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotDisplayType = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CreatedScreenshotSet = Shared_AppStoreConnectResource;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ListedScreenshotAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ListedDeliveryState = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ListedScreenshotId = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotOutcome = 'COMPLETE' | 'FAILED';

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotPollCount = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotReservationData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotReservationAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotFileName = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotFileSize = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ReservedScreenshotId = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ReservedScreenshot = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedScreenshotId = string | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedScreenshot = Record<string, unknown> | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotCommitData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotCommitAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotChecksum = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotBytes = Buffer | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedScreenshotAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotReorderBody = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ScreenshotReorderData = Record<string, unknown>[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderedScreenshotIds = string[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ExistingScreenshotIds = string[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_FilteredReferenceName = string | null;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_FilteredImages = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetReservationData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetReservationAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetFileName = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetFileSize = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ReservedAssetId = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ReservedAsset = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedAssetId = string | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedAsset = Record<string, unknown> | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CommittedAssetAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PolledAssetId = string | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PolledAsset = Record<string, unknown> | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PolledAssetAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetPollCount = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_AssetOutcome = 'ARCHIVED' | 'FAILED' | 'PREPARE_FOR_SUBMISSION' | 'PROCESSING';

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedRelationships = string | null;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludesImage = boolean;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_FilterPlacementGroup = string | null;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_FilterPlacementType = string | null;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_FilteredPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ListedPlacementAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_ListedPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedImageIds = string[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedPlacementRelationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedImageRelationship = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedImageData = unknown;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_IncludedImages = Shared_AppStoreConnectResource[] | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementCreateData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementCreateAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementCreateRelationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementImageRelationship = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementImageData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementImageId = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementType = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementGroup = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_MaximumPlacementCount = number;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_MatchingPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_StoredPlacementAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_CreatedPlacement = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementOrderingData = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderingPlacementAttributes = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderingPlacementGroup = string;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_PlacementOrderingRelationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderedPlacementRelationship = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderedPlacementData = Record<string, unknown>[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderedPlacementIds = string[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderingPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OtherPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_OrderedPlacements = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_Placement = Shared_AppStoreConnectResource | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_DeletedResourceId = string | undefined;

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_DeletedCollection = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_InstallAppStoreConnectFake_DeletedResourceIndex = number;

/**
 * Tests - CLI - Integration - App Store Connect - JSON Response.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_JsonResponse_Data = unknown;

export type Tests_Cli_Integration_AppStoreConnect_JsonResponse_Status = number;

export type Tests_Cli_Integration_AppStoreConnect_JsonResponse_Returns = Response;

/**
 * Tests - CLI - Integration - App Store Connect - Placement Image IDs.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_PlacementImageIds_Resources = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_PlacementImageIds_Returns = string[];

export type Tests_Cli_Integration_AppStoreConnect_PlacementImageIds_Relationships = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_PlacementImageIds_ImageRelationship = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_PlacementImageIds_Image = Record<string, unknown>;

/**
 * Tests - CLI - Integration - App Store Connect - Prepare Screenshot Files.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_PrepareScreenshotFiles_Directory = string;

export type Tests_Cli_Integration_AppStoreConnect_PrepareScreenshotFiles_Images = Buffer[];

export type Tests_Cli_Integration_AppStoreConnect_PrepareScreenshotFiles_Returns = Promise<void>;

export type Tests_Cli_Integration_AppStoreConnect_PrepareScreenshotFiles_FileName = string;

export type Tests_Cli_Integration_AppStoreConnect_PrepareScreenshotFiles_FilePath = string;

/**
 * Tests - CLI - Integration - App Store Connect - Request Data.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_RequestData_Options = RequestInit;

export type Tests_Cli_Integration_AppStoreConnect_RequestData_Returns = Record<string, unknown>;

export type Tests_Cli_Integration_AppStoreConnect_RequestData_Body = RequestInit['body'];

export type Tests_Cli_Integration_AppStoreConnect_RequestData_Parsed = Record<string, unknown>;

/**
 * Tests - CLI - Integration - App Store Connect - Run Pending Timers Until.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_RunPendingTimersUntil_Settled = () => boolean;

export type Tests_Cli_Integration_AppStoreConnect_RunPendingTimersUntil_Deadline = number;

export type Tests_Cli_Integration_AppStoreConnect_RunPendingTimersUntil_Returns = Promise<void>;

/**
 * Tests - CLI - Integration - App Store Connect - Run With Timers.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_RunWithTimers_Operation<Result> = Promise<Result>;

export type Tests_Cli_Integration_AppStoreConnect_RunWithTimers_Returns<Result> = Promise<Result>;

export type Tests_Cli_Integration_AppStoreConnect_RunWithTimers_Settled = boolean;

/**
 * Tests - CLI - Integration - App Store Connect - Screenshot Checksums.
 *
 * @since 0.39.0
 */
export type Tests_Cli_Integration_AppStoreConnect_ScreenshotChecksums_Resources = Shared_AppStoreConnectResource[];

export type Tests_Cli_Integration_AppStoreConnect_ScreenshotChecksums_Returns = string[];

export type Tests_Cli_Integration_AppStoreConnect_ScreenshotChecksums_Attributes = Record<string, unknown>;
