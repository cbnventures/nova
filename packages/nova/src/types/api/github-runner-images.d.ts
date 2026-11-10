import type {
  Shared_GithubRunnerImage,
  Shared_GithubRunnerImage_Architecture,
  Shared_GithubRunnerImage_Status,
  Shared_GithubRunnerImages,
  Shared_GithubRunnerLabelInfo,
  Shared_GithubRunnerSelectableLabels,
} from '../shared.d.ts';

/**
 * API - GitHub Runner Images - README URL.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_ReadmeUrl = string;

/**
 * API - GitHub Runner Images - Runner.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_Images = Shared_GithubRunnerImages | undefined;

export type Api_GithubRunnerImages_Runner_Populated = boolean | undefined;

/**
 * API - GitHub Runner Images - Runner - Fetch Runner Images.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_FetchRunnerImages_Returns = Promise<Shared_GithubRunnerImages | undefined>;

export type Api_GithubRunnerImages_Runner_FetchRunnerImages_Response = Response;

export type Api_GithubRunnerImages_Runner_FetchRunnerImages_Markdown = string;

export type Api_GithubRunnerImages_Runner_FetchRunnerImages_ParsedImages = Shared_GithubRunnerImages | undefined;

export type Api_GithubRunnerImages_Runner_FetchRunnerImages_ErrorMessage = string;

/**
 * API - GitHub Runner Images - Runner - Find Label.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_FindLabel_Images = Shared_GithubRunnerImages;

export type Api_GithubRunnerImages_Runner_FindLabel_Label = string;

export type Api_GithubRunnerImages_Runner_FindLabel_Returns = Shared_GithubRunnerLabelInfo | undefined;

export type Api_GithubRunnerImages_Runner_FindLabel_Image = Shared_GithubRunnerImage;

/**
 * API - GitHub Runner Images - Runner - Is Latest Label.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_IsLatestLabel_Label = string;

export type Api_GithubRunnerImages_Runner_IsLatestLabel_Returns = boolean;

/**
 * API - GitHub Runner Images - Runner - Is Paid Label.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_IsPaidLabel_Label = string;

export type Api_GithubRunnerImages_Runner_IsPaidLabel_Returns = boolean;

/**
 * API - GitHub Runner Images - Runner - Is Separator Row.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_IsSeparatorRow_Cells = string[];

export type Api_GithubRunnerImages_Runner_IsSeparatorRow_Returns = boolean;

export type Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutDashes = string;

export type Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutColons = string;

/**
 * API - GitHub Runner Images - Runner - Parse Cells.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_ParseCells_Row = string;

export type Api_GithubRunnerImages_Runner_ParseCells_Returns = string[];

export type Api_GithubRunnerImages_Runner_ParseCells_WithPlaceholders = string;

export type Api_GithubRunnerImages_Runner_ParseCells_Parts = string[];

export type Api_GithubRunnerImages_Runner_ParseCells_HasTrailingPipe = boolean;

export type Api_GithubRunnerImages_Runner_ParseCells_RawCells = string[];

/**
 * API - GitHub Runner Images - Runner - Parse README.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_ParseReadme_Markdown = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_Returns = Shared_GithubRunnerImages | undefined;

export type Api_GithubRunnerImages_Runner_ParseReadme_Lines = string[];

export type Api_GithubRunnerImages_Runner_ParseReadme_HeadingIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_HeaderRowIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_RowIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_CandidateRow = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_CandidateRowTrimmed = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_HeaderCells = string[];

export type Api_GithubRunnerImages_Runner_ParseReadme_SeparatorRowIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_SeparatorCells = string[];

export type Api_GithubRunnerImages_Runner_ParseReadme_ImageColumnIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureColumnIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_LabelColumnIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_Images = Shared_GithubRunnerImages;

export type Api_GithubRunnerImages_Runner_ParseReadme_HasUbuntu = boolean;

export type Api_GithubRunnerImages_Runner_ParseReadme_HasMacos = boolean;

export type Api_GithubRunnerImages_Runner_ParseReadme_HasWindows = boolean;

export type Api_GithubRunnerImages_Runner_ParseReadme_Row = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_Cells = string[];

export type Api_GithubRunnerImages_Runner_ParseReadme_ImageCell = string | undefined;

export type Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureCell = string | undefined;

export type Api_GithubRunnerImages_Runner_ParseReadme_LabelCell = string | undefined;

export type Api_GithubRunnerImages_Runner_ParseReadme_NameEnd = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_BreakIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_BadgeIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_Name = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_Architecture = Shared_GithubRunnerImage_Architecture | string;

export type Api_GithubRunnerImages_Runner_ParseReadme_Labels = string[];

export type Api_GithubRunnerImages_Runner_ParseReadme_Cursor = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_OpenIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_CloseIndex = number;

export type Api_GithubRunnerImages_Runner_ParseReadme_Label = string;

export type Api_GithubRunnerImages_Runner_ParseReadme_Status = Shared_GithubRunnerImage_Status;

export type Api_GithubRunnerImages_Runner_ParseReadme_Image = Shared_GithubRunnerImage;

/**
 * API - GitHub Runner Images - Runner - Reset For Testing.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_ResetForTesting_Returns = void;

/**
 * API - GitHub Runner Images - Runner - Selectable Labels.
 *
 * @since 0.39.0
 */
export type Api_GithubRunnerImages_Runner_SelectableLabels_Images = Shared_GithubRunnerImages;

export type Api_GithubRunnerImages_Runner_SelectableLabels_Returns = Shared_GithubRunnerSelectableLabels;

export type Api_GithubRunnerImages_Runner_SelectableLabels_Labels = Shared_GithubRunnerSelectableLabels;

export type Api_GithubRunnerImages_Runner_SelectableLabels_Seen = Set<string>;

export type Api_GithubRunnerImages_Runner_SelectableLabels_Image = Shared_GithubRunnerImage;

export type Api_GithubRunnerImages_Runner_SelectableLabels_Label = string;
