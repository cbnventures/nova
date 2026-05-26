import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import type {
  TestsTokenMapAdmonitionFacets,
  TestsTokenMapAdmonitionPreset,
  TestsTokenMapAdmonitionReturns,
  TestsTokenMapAdmonitionSuffixes,
  TestsTokenMapAdmonitionTypes,
  TestsTokenMapAssertTokensPresentContent,
  TestsTokenMapAssertTokensPresentFilePath,
  TestsTokenMapAssertTokensPresentMatches,
  TestsTokenMapAssertTokensPresentMessage,
  TestsTokenMapAssertTokensPresentMissing,
  TestsTokenMapAssertTokensPresentPattern,
  TestsTokenMapAssertTokensPresentRelativeFile,
  TestsTokenMapAssertTokensPresentReturns,
  TestsTokenMapAssertTokensPresentToken,
  TestsTokenMapAssertTokensPresentTokens,
  TestsTokenMapBlogDescriptionPreset,
  TestsTokenMapBlogDescriptionReturns,
  TestsTokenMapBlogPostTypographyPreset,
  TestsTokenMapBlogPostTypographyReturns,
  TestsTokenMapBlogTypographyPreset,
  TestsTokenMapBlogTypographyReturns,
  TestsTokenMapColorBgPreset,
  TestsTokenMapColorBgReturns,
  TestsTokenMapColorBgSemantics,
  TestsTokenMapColorScaleLevels,
  TestsTokenMapColorScalePreset,
  TestsTokenMapColorScaleReturns,
  TestsTokenMapColorScaleSemantics,
  TestsTokenMapColorScaleSuffixes,
  TestsTokenMapDepthPreset,
  TestsTokenMapDepthReturns,
  TestsTokenMapDepthSuffixes,
  TestsTokenMapExpectations,
  TestsTokenMapGetPackageRootCurrentFileDirectory,
  TestsTokenMapGetPackageRootCurrentFilePath,
  TestsTokenMapGetPackageRootReturns,
  TestsTokenMapGridPreset,
  TestsTokenMapGridReturns,
  TestsTokenMapGridSuffixes,
  TestsTokenMapLayoutPreset,
  TestsTokenMapLayoutReturns,
  TestsTokenMapLayoutSuffixes,
  TestsTokenMapMermaidFacets,
  TestsTokenMapMermaidPreset,
  TestsTokenMapMermaidReturns,
  TestsTokenMapRenamePreset,
  TestsTokenMapRenameReturns,
  TestsTokenMapRenameSuffixes,
  TestsTokenMapSectionGapPreset,
  TestsTokenMapSectionGapReturns,
  TestsTokenMapSkipPreset,
  TestsTokenMapSkipReturns,
  TestsTokenMapTokenMapFile,
  TestsTokenMapTokenMapTokens,
} from '../types/tests/token-map.test.d.ts';

/**
 * Tests - Token Map - Get Package Root.
 *
 * Resolves the package root directory by traversing up
 * from the current test file location to reach the
 * docusaurus-preset-nova package root.
 *
 * @since 0.18.0
 */
function getPackageRoot(): TestsTokenMapGetPackageRootReturns {
  const currentFilePath: TestsTokenMapGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsTokenMapGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Token Map - Assert Tokens Present.
 *
 * Reads a CSS file and verifies that every token in the
 * given list appears as a custom-property declaration at
 * least once. Light/dark parity is a separate convention
 * enforced by 9C tests.
 *
 * @since 0.18.0
 */
async function assertTokensPresent(relativeFile: TestsTokenMapAssertTokensPresentRelativeFile, tokens: TestsTokenMapAssertTokensPresentTokens): TestsTokenMapAssertTokensPresentReturns {
  const filePath: TestsTokenMapAssertTokensPresentFilePath = resolve(getPackageRoot(), relativeFile);
  const content: TestsTokenMapAssertTokensPresentContent = await readFile(filePath, 'utf-8');
  const missing: TestsTokenMapAssertTokensPresentMissing = [];

  for (const token of tokens) {
    const tokenName: TestsTokenMapAssertTokensPresentToken = token;
    const pattern: TestsTokenMapAssertTokensPresentPattern = new RegExp(`--${tokenName}\\s*:`, 'g');
    const matches: TestsTokenMapAssertTokensPresentMatches = content.match(pattern);

    if (matches === null) {
      missing.push(tokenName);
    }
  }

  const message: TestsTokenMapAssertTokensPresentMessage = [
    `Tokens missing from ${relativeFile} (must be declared at least once):`,
    missing.join('\n'),
  ].join('\n');

  strictEqual(missing.length, 0, message);

  return;
}

/**
 * Tests - Token Map - Rename.
 *
 * Foundation helper. For each suffix, emits two token
 * names: the preset-prefixed owner and the canonical
 * (non-prefixed) alias. Encodes the strict rename+alias
 * contract from Phase 4 - every preset.css declaration
 * either is preset-prefixed, or aliases a preset-prefixed
 * owner with a matching suffix.
 *
 * @since 0.18.0
 */
function rename(preset: TestsTokenMapRenamePreset, suffixes: TestsTokenMapRenameSuffixes): TestsTokenMapRenameReturns {
  return [
    ...suffixes.map((s) => `nova-${preset}-${s}`),
    ...suffixes.map((s) => `nova-${s}`),
  ];
}

/**
 * Tests - Token Map - Skip.
 *
 * Skip-to-content link tokens - uniform 4-facet contract
 * (bg, color, border, shadow) across every preset.
 *
 * @since 0.18.0
 */
function skip(preset: TestsTokenMapSkipPreset): TestsTokenMapSkipReturns {
  return rename(preset, [
    'skip-bg',
    'skip-color',
    'skip-border',
    'skip-shadow',
  ]);
}

/**
 * Tests - Token Map - Blog Description.
 *
 * Blog description-color token - single facet, declared
 * by every preset that overrides blog description ink.
 *
 * @since 0.18.0
 */
function blogDescription(preset: TestsTokenMapBlogDescriptionPreset): TestsTokenMapBlogDescriptionReturns {
  return rename(preset, ['blog-description-color']);
}

/**
 * Tests - Token Map - Blog Typography.
 *
 * Blog listing-page typography tokens - 5 facets covering
 * heading size (mobile + md), heading-to-description
 * spacing, description size, and description line-height.
 * Declared in each preset's `theme/BlogLayout/style.css`
 * overlay so each preset can express its identity through
 * editorial rhythm.
 *
 * @since 0.18.0
 */
function blogTypography(preset: TestsTokenMapBlogTypographyPreset): TestsTokenMapBlogTypographyReturns {
  return rename(preset, [
    'blog-header-heading-size',
    'blog-header-heading-size-md',
    'blog-header-heading-spacing',
    'blog-description-size',
    'blog-description-line-height',
  ]);
}

/**
 * Tests - Token Map - Blog Post Typography.
 *
 * Blog post-page typography tokens - 10 facets covering
 * post title (mobile + md), card title (mobile + md), date
 * eyebrow size, content size + line-height, author size,
 * read-more size, and footer spacing-top. Declared in each
 * preset's `theme/BlogPostItem/style.css` overlay so each
 * preset can express its identity through editorial
 * post-detail rhythm.
 *
 * @since 0.18.0
 */
function blogPostTypography(preset: TestsTokenMapBlogPostTypographyPreset): TestsTokenMapBlogPostTypographyReturns {
  return rename(preset, [
    'blog-post-title-size',
    'blog-post-title-size-md',
    'blog-card-title-size',
    'blog-card-title-size-md',
    'blog-date-size',
    'blog-content-size',
    'blog-content-line-height',
    'blog-author-size',
    'blog-read-more-size',
    'blog-footer-spacing-top',
  ]);
}

/**
 * Tests - Token Map - Section Gap.
 *
 * Section-gap token - single facet, declared by every
 * preset for the canonical section spacing rhythm.
 *
 * @since 0.18.0
 */
function sectionGap(preset: TestsTokenMapSectionGapPreset): TestsTokenMapSectionGapReturns {
  return rename(preset, ['section-gap']);
}

/**
 * Tests - Token Map - Mermaid.
 *
 * Mermaid identity tokens - currently uniform across all
 * presets (cluster-fill, cluster-radius, cluster-stroke,
 * edge-stroke, node-radius). Facet list is a parameter so
 * a preset can opt into additional tokens if its mermaid
 * overlay grows.
 *
 * @since 0.18.0
 */
function mermaid(preset: TestsTokenMapMermaidPreset, facets: TestsTokenMapMermaidFacets): TestsTokenMapMermaidReturns {
  return rename(preset, facets.map((f) => `mermaid-${f}`));
}

/**
 * Tests - Token Map - Admonition.
 *
 * Admonition per-type tokens - types x facets matrix.
 * Each (type, facet) pair becomes a preset-prefixed
 * owner + canonical alias. Types are admonition variants
 * (note, tip, info, warning, danger); facets are visual
 * facets (rail, fill, ink).
 *
 * @since 0.18.0
 */
function admonition(preset: TestsTokenMapAdmonitionPreset, types: TestsTokenMapAdmonitionTypes, facets: TestsTokenMapAdmonitionFacets): TestsTokenMapAdmonitionReturns {
  const suffixes: TestsTokenMapAdmonitionSuffixes = types.flatMap((t) => facets.map((f) => `admonition-${t}-${f}`));

  return rename(preset, suffixes);
}

/**
 * Tests - Token Map - Color Bg.
 *
 * Semantic color background tokens (info-bg, warning-bg,
 * danger-bg) - soft tinted fills used by admonition and
 * other surface variants. Not all presets define all
 * semantics.
 *
 * @since 0.18.0
 */
function colorBg(preset: TestsTokenMapColorBgPreset, semantics: TestsTokenMapColorBgSemantics): TestsTokenMapColorBgReturns {
  return rename(preset, semantics.map((s) => `color-${s}-bg`));
}

/**
 * Tests - Token Map - Color Scale.
 *
 * Semantic color scale overrides - semantics x levels
 * matrix. Each (semantic, level) pair becomes a
 * preset-prefixed owner + canonical alias.
 *
 * @since 0.18.0
 */
function colorScale(preset: TestsTokenMapColorScalePreset, semantics: TestsTokenMapColorScaleSemantics, levels: TestsTokenMapColorScaleLevels): TestsTokenMapColorScaleReturns {
  const suffixes: TestsTokenMapColorScaleSuffixes = semantics.flatMap((s) => levels.map((l) => `color-${s}-${l}`));

  return rename(preset, suffixes);
}

/**
 * Tests - Token Map - Depth.
 *
 * Depth-tier overrides (e.g., card-border, code-border,
 * card-shadow). Suffix list varies per preset.
 *
 * @since 0.18.0
 */
function depth(preset: TestsTokenMapDepthPreset, suffixes: TestsTokenMapDepthSuffixes): TestsTokenMapDepthReturns {
  return rename(preset, suffixes.map((s) => `depth-${s}`));
}

/**
 * Tests - Token Map - Grid.
 *
 * Grid-tier overrides (padding, gutter). Suffix list
 * varies per preset.
 *
 * @since 0.18.0
 */
function grid(preset: TestsTokenMapGridPreset, suffixes: TestsTokenMapGridSuffixes): TestsTokenMapGridReturns {
  return rename(preset, suffixes.map((s) => `grid-${s}`));
}

/**
 * Tests - Token Map - Layout.
 *
 * Layout-tier overrides (docs-max, blog-max, footer-max,
 * navbar-max, sticky-top). Suffix list varies per preset.
 *
 * @since 0.18.0
 */
function layout(preset: TestsTokenMapLayoutPreset, suffixes: TestsTokenMapLayoutSuffixes): TestsTokenMapLayoutReturns {
  return rename(preset, suffixes.map((s) => `layout-${s}`));
}

/**
 * Tests - Token Map - Expectations.
 *
 * Canonical token list per file, mirroring the approved
 * 9A.3 token map. The sample scaffold holds 9 placeholder
 * surface tokens that get renamed to the preset's name on
 * copy. Each preset's preset.css composes its full
 * contract via the helpers above so that adding a token
 * to one logical group propagates to every preset that
 * opts into that group, and so that owner+alias drift is
 * impossible.
 *
 * @since 0.18.0
 */
const expectations: TestsTokenMapExpectations = [
  {
    file: 'src/styles/presets/sample/preset.css',
    tokens: [
      'nova-sample-bg',
      'nova-sample-border',
      'nova-sample-border-subtle',
      'nova-sample-surface',
      'nova-sample-surface-overlay',
      'nova-sample-surface-raised',
      'nova-sample-text',
      'nova-sample-text-muted',
      'nova-sample-text-soft',
      'nova-sample-layout-sticky-top',
      'nova-layout-sticky-top',
    ],
  },
  {
    file: 'src/styles/presets/envoy/preset.css',
    tokens: [
      ...skip('envoy'),
      ...blogDescription('envoy'),
      ...mermaid('envoy', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...colorBg('envoy', [
        'warning',
        'danger',
      ]),
      ...depth('envoy', [
        'card-border',
        'code-border',
      ]),
      ...grid('envoy', [
        'padding',
        'gutter',
      ]),
      ...sectionGap('envoy'),
      ...colorScale('envoy', [
        'warning',
        'danger',
      ], [
        '500',
        '400',
      ]),
      ...admonition('envoy', [
        'tip',
        'info',
        'warning',
        'danger',
      ], [
        'rail',
        'fill',
      ]),
      ...rename('envoy', ['footer-filter-duration']),
      ...layout('envoy', ['sticky-top']),
    ],
  },
  {
    file: 'src/styles/presets/foundry/preset.css',
    tokens: [
      ...skip('foundry'),
      ...blogDescription('foundry'),
      ...mermaid('foundry', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...colorBg('foundry', [
        'warning',
        'danger',
      ]),
      ...depth('foundry', [
        'card-border',
        'code-border',
      ]),
      ...grid('foundry', [
        'padding',
        'gutter',
      ]),
      ...sectionGap('foundry'),
      ...colorScale('foundry', [
        'warning',
        'danger',
      ], [
        '500',
        '400',
      ]),
      ...admonition('foundry', [
        'note',
        'tip',
        'info',
        'warning',
        'danger',
      ], [
        'rail',
        'fill',
      ]),
      ...rename('foundry', ['footer-filter-duration']),
      ...rename('foundry', [
        'disclosure-bg',
        'disclosure-bg-hover',
        'disclosure-bg-strong',
      ]),
      ...layout('foundry', ['sticky-top']),
    ],
  },
  {
    file: 'src/styles/presets/lantern/preset.css',
    tokens: [
      ...skip('lantern'),
      ...blogDescription('lantern'),
      ...mermaid('lantern', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...sectionGap('lantern'),
      ...admonition('lantern', [
        'tip',
        'info',
        'danger',
      ], [
        'rail',
        'fill',
        'ink',
      ]),
      ...layout('lantern', ['sticky-top']),
    ],
  },
  {
    file: 'src/styles/presets/marshal/preset.css',
    tokens: [
      ...skip('marshal'),
      ...blogDescription('marshal'),
      ...mermaid('marshal', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...colorBg('marshal', [
        'warning',
        'danger',
      ]),
      ...sectionGap('marshal'),
      ...colorScale('marshal', [
        'warning',
        'danger',
      ], [
        '500',
        '400',
      ]),
      ...admonition('marshal', ['note'], [
        'rail',
        'ink',
      ]),
      ...admonition('marshal', [
        'tip',
        'info',
        'warning',
        'danger',
      ], [
        'rail',
        'fill',
        'ink',
      ]),
      ...layout('marshal', ['sticky-top']),
    ],
  },
  {
    file: 'src/styles/presets/sentinel/preset.css',
    tokens: [
      ...skip('sentinel'),
      ...blogDescription('sentinel'),
      ...mermaid('sentinel', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...colorBg('sentinel', [
        'info',
        'warning',
        'danger',
      ]),
      ...grid('sentinel', [
        'padding',
        'gutter',
      ]),
      ...sectionGap('sentinel'),
      ...layout('sentinel', [
        'docs-max',
        'blog-max',
        'sticky-top',
      ]),
      ...depth('sentinel', [
        'card-border',
        'code-border',
      ]),
      ...colorScale('sentinel', [
        'warning',
        'danger',
      ], ['500']),
      ...admonition('sentinel', ['note'], ['rail']),
      ...admonition('sentinel', [
        'tip',
        'info',
        'warning',
        'danger',
      ], [
        'rail',
        'fill',
      ]),
      ...rename('sentinel', ['footer-filter-duration']),
    ],
  },
  {
    file: 'src/styles/presets/signal/preset.css',
    tokens: [
      ...skip('signal'),
      ...blogDescription('signal'),
      ...mermaid('signal', [
        'cluster-fill',
        'cluster-radius',
        'cluster-stroke',
        'edge-stroke',
        'node-radius',
      ]),
      ...grid('signal', [
        'padding',
        'gutter',
      ]),
      ...sectionGap('signal'),
      ...depth('signal', [
        'card-border',
        'code-border',
      ]),
      ...admonition('signal', [
        'tip',
        'info',
        'warning',
        'danger',
      ], ['rail']),
      ...layout('signal', ['sticky-top']),
    ],
  },
  {
    file: 'src/styles/presets/envoy/theme/BlogLayout/style.css',
    tokens: [...blogTypography('envoy')],
  },
  {
    file: 'src/styles/presets/envoy/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('envoy')],
  },
  {
    file: 'src/styles/presets/foundry/theme/BlogLayout/style.css',
    tokens: [...blogTypography('foundry')],
  },
  {
    file: 'src/styles/presets/foundry/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('foundry')],
  },
  {
    file: 'src/styles/presets/lantern/theme/BlogLayout/style.css',
    tokens: [...blogTypography('lantern')],
  },
  {
    file: 'src/styles/presets/lantern/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('lantern')],
  },
  {
    file: 'src/styles/presets/marshal/theme/BlogLayout/style.css',
    tokens: [...blogTypography('marshal')],
  },
  {
    file: 'src/styles/presets/marshal/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('marshal')],
  },
  {
    file: 'src/styles/presets/sentinel/theme/BlogLayout/style.css',
    tokens: [...blogTypography('sentinel')],
  },
  {
    file: 'src/styles/presets/sentinel/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('sentinel')],
  },
  {
    file: 'src/styles/presets/signal/theme/BlogLayout/style.css',
    tokens: [...blogTypography('signal')],
  },
  {
    file: 'src/styles/presets/signal/theme/BlogPostItem/style.css',
    tokens: [...blogPostTypography('signal')],
  },
  {
    file: 'src/styles/theme/Admonition/style.css',
    tokens: [
      'nova-admonition-note-fill',
      'nova-admonition-note-ink',
      'nova-admonition-note-rail',
      'nova-admonition-tip-fill',
      'nova-admonition-tip-ink',
      'nova-admonition-tip-rail',
      'nova-admonition-info-fill',
      'nova-admonition-info-ink',
      'nova-admonition-info-rail',
      'nova-admonition-warning-fill',
      'nova-admonition-warning-ink',
      'nova-admonition-warning-rail',
      'nova-admonition-danger-fill',
      'nova-admonition-danger-ink',
      'nova-admonition-danger-rail',
    ],
  },
  {
    file: 'src/styles/theme/Details/style.css',
    tokens: [
      'nova-disclosure-bg',
      'nova-disclosure-bg-hover',
      'nova-disclosure-bg-strong',
    ],
  },
  {
    file: 'src/styles/theme/Footer/style.css',
    tokens: ['nova-footer-filter-duration'],
  },
];

/**
 * Tests - Token Map - Token Map.
 *
 * Verifies that every token in the canonical 9A.3 map is
 * declared in its expected file. Establishes the locked
 * shape so future drift away from the map fails CI.
 *
 * @since 0.18.0
 */
describe('token map', () => {
  for (const expectation of expectations) {
    const file: TestsTokenMapTokenMapFile = expectation['file'];
    const tokens: TestsTokenMapTokenMapTokens = expectation['tokens'];

    it(`${file} declares all expected tokens`, async () => {
      await assertTokensPresent(file, tokens);

      return;
    });
  }

  return;
});
