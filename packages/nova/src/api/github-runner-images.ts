import {
  LIB_REGEX_LINEBREAK_CRLF_OR_LF,
  LIB_REGEX_PATTERN_GITHUB_RUNNER_LABEL,
} from '../lib/regex.js';
import { Logger } from '../toolkit/index.js';

import type {
  Api_GithubRunnerImages_ReadmeUrl,
  Api_GithubRunnerImages_Runner_FetchRunnerImages_ErrorMessage,
  Api_GithubRunnerImages_Runner_FetchRunnerImages_Markdown,
  Api_GithubRunnerImages_Runner_FetchRunnerImages_ParsedImages,
  Api_GithubRunnerImages_Runner_FetchRunnerImages_Response,
  Api_GithubRunnerImages_Runner_FetchRunnerImages_Returns,
  Api_GithubRunnerImages_Runner_FindLabel_Image,
  Api_GithubRunnerImages_Runner_FindLabel_Images,
  Api_GithubRunnerImages_Runner_FindLabel_Label,
  Api_GithubRunnerImages_Runner_FindLabel_Returns,
  Api_GithubRunnerImages_Runner_Images,
  Api_GithubRunnerImages_Runner_IsLatestLabel_Label,
  Api_GithubRunnerImages_Runner_IsLatestLabel_Returns,
  Api_GithubRunnerImages_Runner_IsPaidLabel_Label,
  Api_GithubRunnerImages_Runner_IsPaidLabel_Returns,
  Api_GithubRunnerImages_Runner_IsSeparatorRow_Cells,
  Api_GithubRunnerImages_Runner_IsSeparatorRow_Returns,
  Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutColons,
  Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutDashes,
  Api_GithubRunnerImages_Runner_ParseCells_HasTrailingPipe,
  Api_GithubRunnerImages_Runner_ParseCells_Parts,
  Api_GithubRunnerImages_Runner_ParseCells_RawCells,
  Api_GithubRunnerImages_Runner_ParseCells_Returns,
  Api_GithubRunnerImages_Runner_ParseCells_Row,
  Api_GithubRunnerImages_Runner_ParseCells_WithPlaceholders,
  Api_GithubRunnerImages_Runner_ParseReadme_Architecture,
  Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureCell,
  Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureColumnIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_BadgeIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_BreakIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_CandidateRow,
  Api_GithubRunnerImages_Runner_ParseReadme_CandidateRowTrimmed,
  Api_GithubRunnerImages_Runner_ParseReadme_Cells,
  Api_GithubRunnerImages_Runner_ParseReadme_CloseIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Cursor,
  Api_GithubRunnerImages_Runner_ParseReadme_HasMacos,
  Api_GithubRunnerImages_Runner_ParseReadme_HasUbuntu,
  Api_GithubRunnerImages_Runner_ParseReadme_HasWindows,
  Api_GithubRunnerImages_Runner_ParseReadme_HeaderCells,
  Api_GithubRunnerImages_Runner_ParseReadme_HeaderRowIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_HeadingIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Image,
  Api_GithubRunnerImages_Runner_ParseReadme_ImageCell,
  Api_GithubRunnerImages_Runner_ParseReadme_ImageColumnIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Images,
  Api_GithubRunnerImages_Runner_ParseReadme_Label,
  Api_GithubRunnerImages_Runner_ParseReadme_LabelCell,
  Api_GithubRunnerImages_Runner_ParseReadme_LabelColumnIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Labels,
  Api_GithubRunnerImages_Runner_ParseReadme_Lines,
  Api_GithubRunnerImages_Runner_ParseReadme_Markdown,
  Api_GithubRunnerImages_Runner_ParseReadme_Name,
  Api_GithubRunnerImages_Runner_ParseReadme_NameEnd,
  Api_GithubRunnerImages_Runner_ParseReadme_OpenIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Returns,
  Api_GithubRunnerImages_Runner_ParseReadme_Row,
  Api_GithubRunnerImages_Runner_ParseReadme_RowIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_SeparatorCells,
  Api_GithubRunnerImages_Runner_ParseReadme_SeparatorRowIndex,
  Api_GithubRunnerImages_Runner_ParseReadme_Status,
  Api_GithubRunnerImages_Runner_Populated,
  Api_GithubRunnerImages_Runner_ResetForTesting_Returns,
  Api_GithubRunnerImages_Runner_SelectableLabels_Image,
  Api_GithubRunnerImages_Runner_SelectableLabels_Images,
  Api_GithubRunnerImages_Runner_SelectableLabels_Label,
  Api_GithubRunnerImages_Runner_SelectableLabels_Labels,
  Api_GithubRunnerImages_Runner_SelectableLabels_Returns,
  Api_GithubRunnerImages_Runner_SelectableLabels_Seen,
} from '../types/api/github-runner-images.d.ts';

/**
 * API - GitHub Runner Images - GitHub Runner Images Readme URL.
 *
 * Points all live runner-image reads at GitHub's canonical raw README.
 * Consumers reuse it when reporting a fetch failure.
 *
 * @since 0.39.0
 */
export const GITHUB_RUNNER_IMAGES_README_URL: Api_GithubRunnerImages_ReadmeUrl = 'https://raw.githubusercontent.com/actions/runner-images/main/README.md';

/**
 * API - GitHub Runner Images.
 *
 * Reads and caches GitHub's published hosted-runner image list.
 * Parsing helpers also expose the labels Nova can safely select.
 *
 * @since 0.39.0
 */
export class Runner {
  /**
   * API - GitHub Runner Images - Images.
   *
   * Stores the parsed list after the first fetch attempt succeeds.
   * An undefined value represents a failed or unattempted read.
   *
   * @private
   *
   * @since 0.39.0
   */
  static #images: Api_GithubRunnerImages_Runner_Images;

  /**
   * API - GitHub Runner Images - Populated.
   *
   * Prevents repeated network reads after either success or failure.
   * Tests reset the flag when exercising each fetch path.
   *
   * @private
   *
   * @since 0.39.0
   */
  static #populated: Api_GithubRunnerImages_Runner_Populated;

  /**
   * API - GitHub Runner Images - Fetch Runner Images.
   *
   * Downloads and parses the runner-images README once per process.
   * HTTP, network, and parse failures are logged and cached.
   *
   * @returns {Api_GithubRunnerImages_Runner_FetchRunnerImages_Returns}
   *
   * @since 0.39.0
   */
  public static async fetchRunnerImages(): Api_GithubRunnerImages_Runner_FetchRunnerImages_Returns {
    if (Runner.#populated === true) {
      return Runner.#images;
    }

    try {
      const response: Api_GithubRunnerImages_Runner_FetchRunnerImages_Response = await fetch(GITHUB_RUNNER_IMAGES_README_URL);

      if (response.ok === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'fetch',
        }).error(`Failed to fetch GitHub runner images. HTTP status: ${response.status}`);

        Runner.#populated = true;

        return undefined;
      }

      const markdown: Api_GithubRunnerImages_Runner_FetchRunnerImages_Markdown = await response.text();
      const parsedImages: Api_GithubRunnerImages_Runner_FetchRunnerImages_ParsedImages = Runner.parseReadme(markdown);

      if (parsedImages === undefined) {
        Logger.customize({
          name: 'Runner',
          purpose: 'parse',
        }).error('Failed to parse GitHub runner images from the runner-images README.');

        Runner.#populated = true;

        return undefined;
      }

      Runner.#images = parsedImages;
      Runner.#populated = true;

      return Runner.#images;
    } catch (error) {
      const errorMessage: Api_GithubRunnerImages_Runner_FetchRunnerImages_ErrorMessage = [
        'Failed to fetch GitHub runner images.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'fetch',
      }).error(errorMessage);

      Runner.#populated = true;

      return undefined;
    }
  }

  /**
   * API - GitHub Runner Images - Parse Readme.
   *
   * Parses the Available Images table without performing I/O.
   * Malformed tables or incomplete runner families return undefined.
   *
   * @param {Api_GithubRunnerImages_Runner_ParseReadme_Markdown} markdown - Markdown.
   *
   * @returns {Api_GithubRunnerImages_Runner_ParseReadme_Returns}
   *
   * @since 0.39.0
   */
  public static parseReadme(markdown: Api_GithubRunnerImages_Runner_ParseReadme_Markdown): Api_GithubRunnerImages_Runner_ParseReadme_Returns {
    const lines: Api_GithubRunnerImages_Runner_ParseReadme_Lines = markdown.split(LIB_REGEX_LINEBREAK_CRLF_OR_LF);
    const headingIndex: Api_GithubRunnerImages_Runner_ParseReadme_HeadingIndex = lines.findIndex((line) => line.trim().toLowerCase() === '## available images');

    if (headingIndex === -1) {
      return undefined;
    }

    let headerRowIndex: Api_GithubRunnerImages_Runner_ParseReadme_HeaderRowIndex = -1;

    for (let rowIndex: Api_GithubRunnerImages_Runner_ParseReadme_RowIndex = headingIndex + 1; rowIndex < lines.length; rowIndex += 1) {
      const candidateRow: Api_GithubRunnerImages_Runner_ParseReadme_CandidateRow = lines[rowIndex] ?? '';
      const candidateRowTrimmed: Api_GithubRunnerImages_Runner_ParseReadme_CandidateRowTrimmed = candidateRow.trimStart();

      if (candidateRowTrimmed.startsWith('## ') === true) {
        return undefined;
      }

      if (candidateRowTrimmed.startsWith('|') === true) {
        headerRowIndex = rowIndex;

        break;
      }
    }

    if (headerRowIndex === -1) {
      return undefined;
    }

    const headerCells: Api_GithubRunnerImages_Runner_ParseReadme_HeaderCells = Runner.#parseCells(lines[headerRowIndex] ?? '');
    const separatorRowIndex: Api_GithubRunnerImages_Runner_ParseReadme_SeparatorRowIndex = headerRowIndex + 1;
    const separatorCells: Api_GithubRunnerImages_Runner_ParseReadme_SeparatorCells = Runner.#parseCells(lines[separatorRowIndex] ?? '');

    if (Runner.#isSeparatorRow(separatorCells) === false) {
      return undefined;
    }

    const imageColumnIndex: Api_GithubRunnerImages_Runner_ParseReadme_ImageColumnIndex = headerCells.findIndex((header) => header.toLowerCase() === 'image');
    const architectureColumnIndex: Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureColumnIndex = headerCells.findIndex((header) => header.toLowerCase() === 'architecture');
    const labelColumnIndex: Api_GithubRunnerImages_Runner_ParseReadme_LabelColumnIndex = headerCells.findIndex((header) => header.toLowerCase() === 'yaml label');

    if (
      imageColumnIndex === -1
      || architectureColumnIndex === -1
      || labelColumnIndex === -1
    ) {
      return undefined;
    }

    const images: Api_GithubRunnerImages_Runner_ParseReadme_Images = [];
    let hasUbuntu: Api_GithubRunnerImages_Runner_ParseReadme_HasUbuntu = false;
    let hasMacos: Api_GithubRunnerImages_Runner_ParseReadme_HasMacos = false;
    let hasWindows: Api_GithubRunnerImages_Runner_ParseReadme_HasWindows = false;

    for (let rowIndex: Api_GithubRunnerImages_Runner_ParseReadme_RowIndex = separatorRowIndex + 1; rowIndex < lines.length; rowIndex += 1) {
      const row: Api_GithubRunnerImages_Runner_ParseReadme_Row = lines[rowIndex] ?? '';

      if (row.trimStart().startsWith('|') === false) {
        break;
      }

      const cells: Api_GithubRunnerImages_Runner_ParseReadme_Cells = Runner.#parseCells(row);

      if (Runner.#isSeparatorRow(cells) === true) {
        continue;
      }

      const imageCell: Api_GithubRunnerImages_Runner_ParseReadme_ImageCell = cells[imageColumnIndex];
      const architectureCell: Api_GithubRunnerImages_Runner_ParseReadme_ArchitectureCell = cells[architectureColumnIndex];
      const labelCell: Api_GithubRunnerImages_Runner_ParseReadme_LabelCell = cells[labelColumnIndex];

      if (
        imageCell === undefined
        || architectureCell === undefined
        || labelCell === undefined
      ) {
        return undefined;
      }

      let nameEnd: Api_GithubRunnerImages_Runner_ParseReadme_NameEnd = imageCell.length;
      const breakIndex: Api_GithubRunnerImages_Runner_ParseReadme_BreakIndex = imageCell.toLowerCase().indexOf('<br');
      const badgeIndex: Api_GithubRunnerImages_Runner_ParseReadme_BadgeIndex = imageCell.indexOf('[![');

      if (breakIndex !== -1 && breakIndex < nameEnd) {
        nameEnd = breakIndex;
      }

      if (badgeIndex !== -1 && badgeIndex < nameEnd) {
        nameEnd = badgeIndex;
      }

      const name: Api_GithubRunnerImages_Runner_ParseReadme_Name = imageCell.slice(0, nameEnd).trim();
      const architecture: Api_GithubRunnerImages_Runner_ParseReadme_Architecture = architectureCell.trim();

      if (
        name.length === 0
        || (
          architecture !== 'x64'
          && architecture !== 'arm64'
        )
      ) {
        return undefined;
      }

      const labels: Api_GithubRunnerImages_Runner_ParseReadme_Labels = [];
      let cursor: Api_GithubRunnerImages_Runner_ParseReadme_Cursor = 0;

      while (cursor < labelCell.length) {
        const openIndex: Api_GithubRunnerImages_Runner_ParseReadme_OpenIndex = labelCell.indexOf('`', cursor);

        if (openIndex === -1) {
          break;
        }

        const closeIndex: Api_GithubRunnerImages_Runner_ParseReadme_CloseIndex = labelCell.indexOf('`', openIndex + 1);

        if (closeIndex === -1) {
          return undefined;
        }

        const label: Api_GithubRunnerImages_Runner_ParseReadme_Label = labelCell.slice(openIndex + 1, closeIndex).trim();

        if (label.length === 0 || LIB_REGEX_PATTERN_GITHUB_RUNNER_LABEL.test(label) === false) {
          return undefined;
        }

        labels.push(label);

        if (label.startsWith('ubuntu-') === true) {
          hasUbuntu = true;
        }

        if (label.startsWith('macos-') === true) {
          hasMacos = true;
        }

        if (label.startsWith('windows-') === true) {
          hasWindows = true;
        }

        cursor = closeIndex + 1;
      }

      if (labels.length === 0) {
        return undefined;
      }

      let status: Api_GithubRunnerImages_Runner_ParseReadme_Status = 'available';

      if (imageCell.includes('/badge/deprecated-') === true) {
        status = 'deprecated';
      } else if (imageCell.includes('/badge/preview-') === true) {
        status = 'preview';
      }

      const image: Api_GithubRunnerImages_Runner_ParseReadme_Image = {
        name,
        architecture,
        labels,
        status,
      };

      images.push(image);
    }

    if (
      images.length === 0
      || hasUbuntu === false
      || hasMacos === false
      || hasWindows === false
    ) {
      return undefined;
    }

    return images;
  }

  /**
   * API - GitHub Runner Images - Is Latest Label.
   *
   * Identifies GitHub's moving latest aliases wherever they appear.
   * Pinned-label consumers use this before presenting or accepting a label.
   *
   * @param {Api_GithubRunnerImages_Runner_IsLatestLabel_Label} label - Label.
   *
   * @returns {Api_GithubRunnerImages_Runner_IsLatestLabel_Returns}
   *
   * @since 0.39.0
   */
  public static isLatestLabel(label: Api_GithubRunnerImages_Runner_IsLatestLabel_Label): Api_GithubRunnerImages_Runner_IsLatestLabel_Returns {
    return label.includes('-latest');
  }

  /**
   * API - GitHub Runner Images - Is Paid Label.
   *
   * Identifies GitHub's large and extra-large paid runner labels.
   * Configure uses the result to mark billed choices clearly.
   *
   * @param {Api_GithubRunnerImages_Runner_IsPaidLabel_Label} label - Label.
   *
   * @returns {Api_GithubRunnerImages_Runner_IsPaidLabel_Returns}
   *
   * @since 0.39.0
   */
  public static isPaidLabel(label: Api_GithubRunnerImages_Runner_IsPaidLabel_Label): Api_GithubRunnerImages_Runner_IsPaidLabel_Returns {
    return label.endsWith('-large') || label.endsWith('-xlarge');
  }

  /**
   * API - GitHub Runner Images - Selectable Labels.
   *
   * Returns pinned labels for available images in table order.
   * Moving aliases and duplicate labels are omitted from the menu.
   *
   * @param {Api_GithubRunnerImages_Runner_SelectableLabels_Images} images - Images.
   *
   * @returns {Api_GithubRunnerImages_Runner_SelectableLabels_Returns}
   *
   * @since 0.39.0
   */
  public static selectableLabels(images: Api_GithubRunnerImages_Runner_SelectableLabels_Images): Api_GithubRunnerImages_Runner_SelectableLabels_Returns {
    const labels: Api_GithubRunnerImages_Runner_SelectableLabels_Labels = [];
    const seen: Api_GithubRunnerImages_Runner_SelectableLabels_Seen = new Set();

    for (const imageEntry of images) {
      const image: Api_GithubRunnerImages_Runner_SelectableLabels_Image = imageEntry;

      if (image['status'] !== 'available') {
        continue;
      }

      for (const labelEntry of image['labels']) {
        const label: Api_GithubRunnerImages_Runner_SelectableLabels_Label = labelEntry;

        if (Runner.isLatestLabel(label) === true || seen.has(label) === true) {
          continue;
        }

        seen.add(label);

        labels.push({
          label,
          architecture: image['architecture'],
          imageName: image['name'],
          paid: Runner.isPaidLabel(label),
        });
      }
    }

    return labels;
  }

  /**
   * API - GitHub Runner Images - Find Label.
   *
   * Finds a label across available, deprecated, and preview images.
   * Validation uses the image and status to explain rejected labels.
   *
   * @param {Api_GithubRunnerImages_Runner_FindLabel_Images} images - Images.
   * @param {Api_GithubRunnerImages_Runner_FindLabel_Label}  label  - Label.
   *
   * @returns {Api_GithubRunnerImages_Runner_FindLabel_Returns}
   *
   * @since 0.39.0
   */
  public static findLabel(
    images: Api_GithubRunnerImages_Runner_FindLabel_Images,
    label: Api_GithubRunnerImages_Runner_FindLabel_Label,
  ): Api_GithubRunnerImages_Runner_FindLabel_Returns {
    for (const imageEntry of images) {
      const image: Api_GithubRunnerImages_Runner_FindLabel_Image = imageEntry;

      if (image['labels'].includes(label) === true) {
        return {
          image,
          status: image['status'],
        };
      }
    }

    return undefined;
  }

  /**
   * API - GitHub Runner Images - Reset For Testing.
   *
   * Clears the cached images and populated flag.
   * This keeps fetch-path tests isolated from process-level caching.
   *
   * @returns {Api_GithubRunnerImages_Runner_ResetForTesting_Returns}
   *
   * @since 0.39.0
   */
  public static resetForTesting(): Api_GithubRunnerImages_Runner_ResetForTesting_Returns {
    Runner.#images = undefined;
    Runner.#populated = undefined;

    return;
  }

  /**
   * API - GitHub Runner Images - Parse Cells.
   *
   * Splits a Markdown table row while preserving escaped pipes.
   * The behavior matches Nova's Markdown table repair recipe.
   *
   * @param {Api_GithubRunnerImages_Runner_ParseCells_Row} row - Row.
   *
   * @private
   *
   * @returns {Api_GithubRunnerImages_Runner_ParseCells_Returns}
   *
   * @since 0.39.0
   */
  static #parseCells(row: Api_GithubRunnerImages_Runner_ParseCells_Row): Api_GithubRunnerImages_Runner_ParseCells_Returns {
    const withPlaceholders: Api_GithubRunnerImages_Runner_ParseCells_WithPlaceholders = row.replaceAll('\\|', '\x00');
    const parts: Api_GithubRunnerImages_Runner_ParseCells_Parts = withPlaceholders.split('|');
    const hasTrailingPipe: Api_GithubRunnerImages_Runner_ParseCells_HasTrailingPipe = row.trimEnd().endsWith('|') === true;
    const rawCells: Api_GithubRunnerImages_Runner_ParseCells_RawCells = (hasTrailingPipe === true) ? parts.slice(1, -1) : parts.slice(1);

    return rawCells.map((cell) => cell.trim().replaceAll('\x00', '|'));
  }

  /**
   * API - GitHub Runner Images - Is Separator Row.
   *
   * Recognizes the dash-and-colon row between table headers and data.
   * Repeated separator rows are ignored safely while parsing.
   *
   * @param {Api_GithubRunnerImages_Runner_IsSeparatorRow_Cells} cells - Cells.
   *
   * @private
   *
   * @returns {Api_GithubRunnerImages_Runner_IsSeparatorRow_Returns}
   *
   * @since 0.39.0
   */
  static #isSeparatorRow(cells: Api_GithubRunnerImages_Runner_IsSeparatorRow_Cells): Api_GithubRunnerImages_Runner_IsSeparatorRow_Returns {
    if (cells.length === 0) {
      return false;
    }

    return cells.every((cell) => {
      const withoutDashes: Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutDashes = cell.split('-').join('');
      const withoutColons: Api_GithubRunnerImages_Runner_IsSeparatorRow_WithoutColons = withoutDashes.split(':').join('').trim();

      return cell.includes('-') === true && withoutColons.length === 0;
    });
  }
}
