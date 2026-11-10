import type {
  Shared_GithubRunnerImage,
  Shared_GithubRunnerImages,
  Shared_GithubRunnerSelectableLabels,
} from '../../shared.d.ts';

/**
 * Tests - API - GitHub Runner Images.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ReadmeFixture = string;

/**
 * Tests - API - GitHub Runner Images - Fetch Runner Images - Caches Result After First Fetch.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_CallCount = number;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_First = Shared_GithubRunnerImages | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_Second = Shared_GithubRunnerImages | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_FirstImage = Shared_GithubRunnerImage | undefined;

/**
 * Tests - API - GitHub Runner Images - Fetch Runner Images - Caches Undefined After Failure.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_CallCount = number;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_First = Shared_GithubRunnerImages | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_Second = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Fetch Runner Images - Returns Undefined On HTTP 404.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnHTTP404_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Fetch Runner Images - Returns Undefined On Network Error.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnNetworkError_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Accepts Reordered Columns.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Markdown = string;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Result = Shared_GithubRunnerImages | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_FirstImage = Shared_GithubRunnerImage | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_LastImage = Shared_GithubRunnerImage | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Parses Available Images.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ParsesAvailableImages_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Returns Undefined For Bad Architecture.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Markdown = string;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Returns Undefined For Invalid Label.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Markdown = string;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Returns Undefined For Missing Header.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Markdown = string;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Parse Readme - Returns Undefined Without A Table.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedWithoutATable_Result = Shared_GithubRunnerImages | undefined;

/**
 * Tests - API - GitHub Runner Images - Selectable Labels - Filters And Marks Labels.
 *
 * @since 0.39.0
 */
export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Images = Shared_GithubRunnerImages | undefined;

export type Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Labels = Shared_GithubRunnerSelectableLabels;
