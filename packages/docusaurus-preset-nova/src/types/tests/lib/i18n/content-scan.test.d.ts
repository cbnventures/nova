import type { InitializedPlugin } from '@docusaurus/types';

import type {
  Shared_I18nContentScanDescriptor,
  Shared_I18nContentScanResult,
} from '../../../shared.d.ts';

/**
 * Tests - Lib - I18n - Content Scan - ContentScanBuildDescriptors - AddsADescriptorForEachVersionedDocsDirectory.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Plugins = InitializedPlugin[];

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_AddsADescriptorForEachVersionedDocsDirectory_Descriptors = Shared_I18nContentScanDescriptor[];

/**
 * Tests - Lib - I18n - Content Scan - ContentScanBuildDescriptors - EmitsADescriptorForEveryInstanceOfAPlugin.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Plugins = InitializedPlugin[];

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_EmitsADescriptorForEveryInstanceOfAPlugin_Descriptors = Shared_I18nContentScanDescriptor[];

/**
 * Tests - Lib - I18n - Content Scan - ContentScanBuildDescriptors - FallsBackToTheDefaultSourcePathWhenPathIsUnset.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Plugins = InitializedPlugin[];

export type Tests_Lib_I18n_ContentScan_ContentScanBuildDescriptors_FallsBackToTheDefaultSourcePathWhenPathIsUnset_Descriptors = Shared_I18nContentScanDescriptor[];

/**
 * Tests - Lib - I18n - Content Scan - ContentScanCollect - CountsASourceFileWithATranslatedCopyAsPresent.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_DocsDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_FrCurrentDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_CountsASourceFileWithATranslatedCopyAsPresent_Result = Shared_I18nContentScanResult;

/**
 * Tests - Lib - I18n - Content Scan - ContentScanCollect - GivesInstancesOfTheSamePluginDistinctIds.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_DefaultDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_CommunityDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_GivesInstancesOfTheSamePluginDistinctIds_Result = Shared_I18nContentScanResult;

/**
 * Tests - Lib - I18n - Content Scan - ContentScanCollect - ResolvesPresenceUnderAVersionedDocsSegment.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_SiteDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_VersionDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_FrVersionDir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_ResolvesPresenceUnderAVersionedDocsSegment_Result = Shared_I18nContentScanResult;

/**
 * Tests - Lib - I18n - Content Scan - ContentScanCollect - SkipsADescriptorWhoseSourceDirectoryIsMissing.
 *
 * @since 0.21.0
 */
export type Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Dir = string;

export type Tests_Lib_I18n_ContentScan_ContentScanCollect_SkipsADescriptorWhoseSourceDirectoryIsMissing_Result = Shared_I18nContentScanResult;
