import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';

import {
  afterEach, describe, it, vi,
} from 'vitest';

import { Runner as ApiGithubRunnerImages } from '../../api/github-runner-images.js';

import type {
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_CallCount,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_First,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_FirstImage,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_Second,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_CallCount,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_First,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_Second,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnHTTP404_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnNetworkError_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_FirstImage,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_LastImage,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Markdown,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ParsesAvailableImages_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Markdown,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Markdown,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Markdown,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedWithoutATable_Result,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Images,
  Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Labels,
  Tests_Api_GithubRunnerImages_ReadmeFixture,
} from '../../types/tests/api/github-runner-images.test.d.ts';

/**
 * Tests - API - GitHub Runner Images - Readme Fixture.
 *
 * Trims GitHub's Available Images table to representative image families.
 * Badge URLs preserve the status markers consumed by the parser.
 *
 * @since 0.39.0
 */
const readmeFixture: Tests_Api_GithubRunnerImages_ReadmeFixture = [
  '# Runner Images',
  '',
  '## Available Images',
  '',
  '| Image | Architecture | YAML Label | Included Software |',
  '| --- | --- | --- | --- |',
  '| Ubuntu 24.04<br> [![latest](https://img.shields.io/badge/latest-blue)] | x64 | `ubuntu-latest` or `ubuntu-24.04` | link |',
  '| Ubuntu 24.04 Arm64 | arm64 | `ubuntu-24.04-arm` | link |',
  '| Xcode 27 [![preview](https://img.shields.io/badge/preview-orange)] | arm64 | `xcode-27` or `xcode-27-xlarge` | link |',
  '| macOS 26 | x64 | `macos-latest-large`, `macos-26-intel`, or `macos-26-large` | link |',
  '| macOS 14 [![deprecated](https://img.shields.io/badge/deprecated-red)] | x64 | `macos-14` | link |',
  '| Windows Server 2025 | x64 | `windows-latest`, `windows-2025`, or `windows-2025-vs2026` | link |',
  '',
  '## Software',
  '',
].join('\n');

/**
 * Tests - API - GitHub Runner Images - Parse Readme.
 *
 * @since 0.39.0
 */
describe('ApiGithubRunnerImages.parseReadme', () => {
  it('parses available images', () => {
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ParsesAvailableImages_Result = ApiGithubRunnerImages.parseReadme(readmeFixture);

    deepStrictEqual(result, [
      {
        name: 'Ubuntu 24.04',
        architecture: 'x64',
        labels: [
          'ubuntu-latest',
          'ubuntu-24.04',
        ],
        status: 'available',
      },
      {
        name: 'Ubuntu 24.04 Arm64',
        architecture: 'arm64',
        labels: ['ubuntu-24.04-arm'],
        status: 'available',
      },
      {
        name: 'Xcode 27',
        architecture: 'arm64',
        labels: [
          'xcode-27',
          'xcode-27-xlarge',
        ],
        status: 'preview',
      },
      {
        name: 'macOS 26',
        architecture: 'x64',
        labels: [
          'macos-latest-large',
          'macos-26-intel',
          'macos-26-large',
        ],
        status: 'available',
      },
      {
        name: 'macOS 14',
        architecture: 'x64',
        labels: ['macos-14'],
        status: 'deprecated',
      },
      {
        name: 'Windows Server 2025',
        architecture: 'x64',
        labels: [
          'windows-latest',
          'windows-2025',
          'windows-2025-vs2026',
        ],
        status: 'available',
      },
    ]);

    return;
  });

  it('accepts reordered columns', () => {
    const markdown: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Markdown = readmeFixture
      .replace('| Image | Architecture | YAML Label | Included Software |', '| YAML Label | Included Software | Image | Architecture |')
      .replace('| Ubuntu 24.04<br> [![latest](https://img.shields.io/badge/latest-blue)] | x64 | `ubuntu-latest` or `ubuntu-24.04` | link |', '| `ubuntu-latest` or `ubuntu-24.04` | link | Ubuntu 24.04<br> [![latest](https://img.shields.io/badge/latest-blue)] | x64 |')
      .replace('| Ubuntu 24.04 Arm64 | arm64 | `ubuntu-24.04-arm` | link |', '| `ubuntu-24.04-arm` | link | Ubuntu 24.04 Arm64 | arm64 |')
      .replace('| Xcode 27 [![preview](https://img.shields.io/badge/preview-orange)] | arm64 | `xcode-27` or `xcode-27-xlarge` | link |', '| `xcode-27` or `xcode-27-xlarge` | link | Xcode 27 [![preview](https://img.shields.io/badge/preview-orange)] | arm64 |')
      .replace('| macOS 26 | x64 | `macos-latest-large`, `macos-26-intel`, or `macos-26-large` | link |', '| `macos-latest-large`, `macos-26-intel`, or `macos-26-large` | link | macOS 26 | x64 |')
      .replace('| macOS 14 [![deprecated](https://img.shields.io/badge/deprecated-red)] | x64 | `macos-14` | link |', '| `macos-14` | link | macOS 14 [![deprecated](https://img.shields.io/badge/deprecated-red)] | x64 |')
      .replace('| Windows Server 2025 | x64 | `windows-latest`, `windows-2025`, or `windows-2025-vs2026` | link |', '| `windows-latest`, `windows-2025`, or `windows-2025-vs2026` | link | Windows Server 2025 | x64 |');
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_Result = ApiGithubRunnerImages.parseReadme(markdown);

    strictEqual(result === undefined, false);

    if (result === undefined) {
      return;
    }

    const firstImage: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_FirstImage = result.at(0);
    const lastImage: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_AcceptsReorderedColumns_LastImage = result.at(5);

    if (firstImage === undefined || lastImage === undefined) {
      return;
    }

    strictEqual(firstImage['name'], 'Ubuntu 24.04');
    deepStrictEqual(lastImage['labels'], [
      'windows-latest',
      'windows-2025',
      'windows-2025-vs2026',
    ]);

    return;
  });

  it('returns undefined for missing header', () => {
    const markdown: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Markdown = readmeFixture.replace('Architecture', 'CPU');
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForMissingHeader_Result = ApiGithubRunnerImages.parseReadme(markdown);

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined for bad architecture', () => {
    const markdown: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Markdown = readmeFixture.replace('| x64 | `ubuntu-latest`', '| riscv64 | `ubuntu-latest`');
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForBadArchitecture_Result = ApiGithubRunnerImages.parseReadme(markdown);

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined for invalid label', () => {
    const markdown: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Markdown = readmeFixture.replace('`ubuntu-24.04`', '`Ubuntu 24.04`');
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedForInvalidLabel_Result = ApiGithubRunnerImages.parseReadme(markdown);

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined without a table', () => {
    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesParseReadme_ReturnsUndefinedWithoutATable_Result = ApiGithubRunnerImages.parseReadme([
      '## Available Images',
      '',
      'No images are listed.',
    ].join('\n'));

    strictEqual(result, undefined);

    return;
  });

  return;
});

/**
 * Tests - API - GitHub Runner Images - Selectable Labels.
 *
 * @since 0.39.0
 */
describe('ApiGithubRunnerImages.selectableLabels', () => {
  it('filters and marks labels', () => {
    const images: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Images = ApiGithubRunnerImages.parseReadme(readmeFixture);

    strictEqual(images === undefined, false);

    const labels: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesSelectableLabels_FiltersAndMarksLabels_Labels = ApiGithubRunnerImages.selectableLabels(images ?? []);

    deepStrictEqual(labels, [
      {
        label: 'ubuntu-24.04',
        architecture: 'x64',
        imageName: 'Ubuntu 24.04',
        paid: false,
      },
      {
        label: 'ubuntu-24.04-arm',
        architecture: 'arm64',
        imageName: 'Ubuntu 24.04 Arm64',
        paid: false,
      },
      {
        label: 'macos-26-intel',
        architecture: 'x64',
        imageName: 'macOS 26',
        paid: false,
      },
      {
        label: 'macos-26-large',
        architecture: 'x64',
        imageName: 'macOS 26',
        paid: true,
      },
      {
        label: 'windows-2025',
        architecture: 'x64',
        imageName: 'Windows Server 2025',
        paid: false,
      },
      {
        label: 'windows-2025-vs2026',
        architecture: 'x64',
        imageName: 'Windows Server 2025',
        paid: false,
      },
    ]);

    strictEqual(ApiGithubRunnerImages.isLatestLabel('macos-latest-large'), true);
    strictEqual(ApiGithubRunnerImages.isPaidLabel('xcode-27-xlarge'), true);

    return;
  });

  return;
});

/**
 * Tests - API - GitHub Runner Images - Fetch Runner Images.
 *
 * @since 0.39.0
 */
describe('ApiGithubRunnerImages.fetchRunnerImages', () => {
  afterEach(() => {
    ApiGithubRunnerImages.resetForTesting();

    vi.restoreAllMocks();

    return;
  });

  it('caches result after first fetch', async () => {
    let callCount: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(readmeFixture));
    });

    const first: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_First = await ApiGithubRunnerImages.fetchRunnerImages();
    const second: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_Second = await ApiGithubRunnerImages.fetchRunnerImages();

    strictEqual(first === undefined, false);

    if (first === undefined) {
      return;
    }

    const firstImage: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesResultAfterFirstFetch_FirstImage = first.at(0);

    if (firstImage === undefined) {
      return;
    }

    strictEqual(firstImage['name'], 'Ubuntu 24.04');
    strictEqual(second, first);
    strictEqual(callCount, 1);

    return;
  });

  it('returns undefined on HTTP 404', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response(null, { status: 404 }));

    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnHTTP404_Result = await ApiGithubRunnerImages.fetchRunnerImages();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on network error', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('network error'));

    const result: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_ReturnsUndefinedOnNetworkError_Result = await ApiGithubRunnerImages.fetchRunnerImages();

    strictEqual(result, undefined);

    return;
  });

  it('caches undefined after failure', async () => {
    let callCount: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(null, { status: 500 }));
    });

    const first: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_First = await ApiGithubRunnerImages.fetchRunnerImages();
    const second: Tests_Api_GithubRunnerImages_ApiGithubRunnerImagesFetchRunnerImages_CachesUndefinedAfterFailure_Second = await ApiGithubRunnerImages.fetchRunnerImages();

    strictEqual(first, undefined);
    strictEqual(second, undefined);
    strictEqual(callCount, 1);

    return;
  });

  return;
});
