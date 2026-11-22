import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import NavbarItem from '@theme/NavbarItem';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, vi } from 'vitest';

import { loadCommonJsModule } from '../../../../lib/module-loader.js';
import { LIB_REGEX_CSS_BLOCK_COMMENT, LIB_REGEX_WHITESPACE_RUN } from '../../../../lib/regex.js';
import { presetsIndexNames } from '../../../../presets/index.js';
import More from '../../../../theme/Navbar/More/index.js';

import type {
  Tests_Theme_Navbar_More_Index_CollectRules_BeforeOpen,
  Tests_Theme_Navbar_More_Index_CollectRules_Chunk,
  Tests_Theme_Navbar_More_Index_CollectRules_CommentPattern,
  Tests_Theme_Navbar_More_Index_CollectRules_Css,
  Tests_Theme_Navbar_More_Index_CollectRules_OpenIndex,
  Tests_Theme_Navbar_More_Index_CollectRules_Returns,
  Tests_Theme_Navbar_More_Index_CollectRules_Rules,
  Tests_Theme_Navbar_More_Index_CollectRules_Selector,
  Tests_Theme_Navbar_More_Index_CollectRules_StrippedCss,
  Tests_Theme_Navbar_More_Index_CollectRules_WhitespacePattern,
  Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFileDirectory,
  Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFilePath,
  Tests_Theme_Navbar_More_Index_GetPackageRoot_Returns,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_BarDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_BaseDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainClass,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainClasses,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ContainingBlockDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ContainingBlockProperties,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_DirectionRuleSets,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_EndAligned,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_EndWrapperClasses,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuClass,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuClasses,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuTops,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PackageRoot,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementRules,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementSelectors,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementSources,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PresetName,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_RtlPlacementRules,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_RtlProcessor,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_Scope,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ScopedDeclarations,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ScopedSelectors,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantName,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantNames,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantSource,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperClass,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperClasses,
  Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperDeclarations,
  Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_GroupLabelIdCount,
  Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items,
  Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Markup,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_DetailsCount,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Markup,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PackageRoot,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCss,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCssPath,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetName,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCss,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCssPath,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCss,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCssPath,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantClass,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantName,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantNames,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSource,
  Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSourcePath,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_ControlRinged,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkMatch,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkRing,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsBottom,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsTop,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusControls,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusFreeSelector,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusSelector,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupBottom,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupSeparator,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LastRowYield,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightMatch,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightRing,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_MouseRing,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarCssNames,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarSources,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OutlineDeclarations,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PackageRoot,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainDeclarations,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainSelectors,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetCss,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetName,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetSelectors,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingCleared,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingDeclarations,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowBottom,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowTop,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowYield,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorSources,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UniversalRing,
  Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UnringedControls,
  Tests_Theme_Navbar_More_Index_RenderLink_AriaCurrent,
  Tests_Theme_Navbar_More_Index_RenderLink_Href,
  Tests_Theme_Navbar_More_Index_RenderLink_Label,
  Tests_Theme_Navbar_More_Index_RenderLink_LinkProps,
  Tests_Theme_Navbar_More_Index_RenderLink_Returns,
  Tests_Theme_Navbar_More_Index_ResolveDeclarations_Resolved,
  Tests_Theme_Navbar_More_Index_ResolveDeclarations_Returns,
  Tests_Theme_Navbar_More_Index_ResolveDeclarations_Rules,
  Tests_Theme_Navbar_More_Index_ResolveDeclarations_Selectors,
  Tests_Theme_Navbar_More_Index_ResolveDeclarations_SeparatorIndex,
} from '../../../../types/tests/theme/Navbar/More/index.test.d.ts';

vi.mock('@docusaurus/router', () => ({
  useLocation: vi.fn(() => ({
    pathname: '/changelog/',
  })),
}));

vi.mock('@docusaurus/Translate', () => ({
  translate: vi.fn(() => 'More'),
}));

vi.mock('@iconify/react/offline', () => ({
  Icon: vi.fn(() => null),
}));

vi.mock('@theme/NavbarItem', () => ({
  default: vi.fn(() => null),
}));

/**
 * Tests - Theme - Navbar - More - Collect Rules.
 *
 * Splits a stylesheet into selector and declaration pairs, unwrapping
 * at-rule wrappers such as media queries so their inner rules are kept.
 * Whitespace runs collapse to one space, so selector lists split on ", "
 * and declarations compare as written on one line.
 *
 * @param {Tests_Theme_Navbar_More_Index_CollectRules_Css} css - Css.
 *
 * @returns {Tests_Theme_Navbar_More_Index_CollectRules_Returns}
 *
 * @since 0.50.0
 */
function collectRules(css: Tests_Theme_Navbar_More_Index_CollectRules_Css): Tests_Theme_Navbar_More_Index_CollectRules_Returns {
  const commentPattern: Tests_Theme_Navbar_More_Index_CollectRules_CommentPattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');
  const whitespacePattern: Tests_Theme_Navbar_More_Index_CollectRules_WhitespacePattern = new RegExp(LIB_REGEX_WHITESPACE_RUN.source, 'g');
  const strippedCss: Tests_Theme_Navbar_More_Index_CollectRules_StrippedCss = css.replace(commentPattern, '');
  const rules: Tests_Theme_Navbar_More_Index_CollectRules_Rules = [];

  for (const chunkEntry of strippedCss.split('}')) {
    const chunk: Tests_Theme_Navbar_More_Index_CollectRules_Chunk = chunkEntry;
    const openIndex: Tests_Theme_Navbar_More_Index_CollectRules_OpenIndex = chunk.lastIndexOf('{');

    if (openIndex === -1) {
      continue;
    }

    const beforeOpen: Tests_Theme_Navbar_More_Index_CollectRules_BeforeOpen = chunk.slice(0, openIndex);
    const selector: Tests_Theme_Navbar_More_Index_CollectRules_Selector = beforeOpen.slice(beforeOpen.lastIndexOf('{') + 1).replace(whitespacePattern, ' ').trim();

    rules.push({
      selectors: selector.split(', '),
      declarations: chunk.slice(openIndex + 1).split(';').map((declaration) => declaration.replace(whitespacePattern, ' ').trim()).filter((declaration) => declaration !== ''),
    });
  }

  return rules;
}

/**
 * Tests - Theme - Navbar - More - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @returns {Tests_Theme_Navbar_More_Index_GetPackageRoot_Returns}
 *
 * @since 0.50.0
 */
function getPackageRoot(): Tests_Theme_Navbar_More_Index_GetPackageRoot_Returns {
  const currentFilePath: Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..', '..', '..', '..');
}

/**
 * Tests - Theme - Navbar - More - Render Link.
 *
 * Stands in for the NavbarItem router with a plain anchor that carries the
 * active state the More menu hands each row.
 *
 * @param {Tests_Theme_Navbar_More_Index_RenderLink_LinkProps} linkProps - Link props.
 *
 * @returns {Tests_Theme_Navbar_More_Index_RenderLink_Returns}
 *
 * @since 0.50.0
 */
function renderLink(linkProps: Tests_Theme_Navbar_More_Index_RenderLink_LinkProps): Tests_Theme_Navbar_More_Index_RenderLink_Returns {
  const href: Tests_Theme_Navbar_More_Index_RenderLink_Href = (linkProps['to'] ?? linkProps['href']) as Tests_Theme_Navbar_More_Index_RenderLink_Href;
  const ariaCurrent: Tests_Theme_Navbar_More_Index_RenderLink_AriaCurrent = (linkProps['isActiveItem'] === true) ? 'page' : undefined;
  const label: Tests_Theme_Navbar_More_Index_RenderLink_Label = linkProps['label'] as Tests_Theme_Navbar_More_Index_RenderLink_Label;

  return createElement('a', {
    href,
    'aria-current': ariaCurrent,
  }, label);
}

/**
 * Tests - Theme - Navbar - More - Resolve Declarations.
 *
 * Folds the declarations of every rule that lists one of the given
 * selectors into a property map. Rules are read in cascade order, so a
 * later declaration of the same property replaces an earlier one.
 *
 * @param {Tests_Theme_Navbar_More_Index_ResolveDeclarations_Rules}     rules     - Rules.
 * @param {Tests_Theme_Navbar_More_Index_ResolveDeclarations_Selectors} selectors - Selectors.
 *
 * @returns {Tests_Theme_Navbar_More_Index_ResolveDeclarations_Returns}
 *
 * @since 0.50.1
 */
function resolveDeclarations(rules: Tests_Theme_Navbar_More_Index_ResolveDeclarations_Rules, selectors: Tests_Theme_Navbar_More_Index_ResolveDeclarations_Selectors): Tests_Theme_Navbar_More_Index_ResolveDeclarations_Returns {
  const resolved: Tests_Theme_Navbar_More_Index_ResolveDeclarations_Resolved = {};

  for (const rule of rules) {
    if (rule['selectors'].some((selector) => selectors.includes(selector)) === false) {
      continue;
    }

    for (const declaration of rule['declarations']) {
      const separatorIndex: Tests_Theme_Navbar_More_Index_ResolveDeclarations_SeparatorIndex = declaration.indexOf(': ');

      if (separatorIndex === -1) {
        continue;
      }

      Reflect.set(resolved, declaration.slice(0, separatorIndex), declaration.slice(separatorIndex + 2));
    }
  }

  return resolved;
}

/**
 * Tests - Theme - Navbar - More - More.
 *
 * @since 0.50.0
 */
describe('More', async () => {
  vi.mocked(NavbarItem).mockImplementation(renderLink);

  it('lists a dropdown item as a group of links', () => {
    const items: Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items = [
      {
        label: 'Showcase Demo',
        to: '/showcase/',
      },
      {
        label: 'Resources',
        type: 'dropdown',
        items: [
          {
            label: 'Changelog',
            to: '/changelog/',
          },
          {
            label: 'Report an Issue',
            href: 'https://www.example.com/issues',
          },
        ],
      },
    ];
    const markup: Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Markup = renderToStaticMarkup(createElement(More, {
      items,
      activeItemLabel: 'Resources',
    }));
    const groupLabelIdCount: Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_GroupLabelIdCount = markup.split('aria-labelledby="').length - 1;

    strictEqual(markup.includes('<a href="/showcase/">Showcase Demo</a>'), true, 'Expected the plain overflow item to stay a single row.');
    strictEqual(markup.includes('class="nova-navbar-more-group nova-navbar-more-group--active"'), true, 'Expected the group to reflect its active child.');
    strictEqual(markup.includes('class="nova-navbar-more-group-label">Resources</span>'), true, 'Expected the dropdown label as the group heading.');
    strictEqual(markup.includes('<li class="nova-navbar-more-item"><a href="/changelog/" aria-current="page">Changelog</a></li>'), true, 'Expected the active child as a highlighted row.');
    strictEqual(markup.includes('<li class="nova-navbar-more-item"><a href="https://www.example.com/issues">Report an Issue</a></li>'), true, 'Expected the other child as a plain row.');
    strictEqual(markup.includes('nova-dropdown'), false, 'Expected no nested dropdown inside the More menu.');
    strictEqual(groupLabelIdCount, 1);

    return;
  });

  return;
});

/**
 * Tests - Theme - Navbar - More - More Across Presets And Variants.
 *
 * Walks every preset with every navbar variant. Variants that overflow into
 * More must list a dropdown's links as reachable grouped rows (no nested
 * disclosure) and the preset must style those rows and the group heading.
 * Variants without More must not render inline items that could overflow.
 *
 * @since 0.50.0
 */
describe('More across presets and variants', async () => {
  const packageRoot: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PackageRoot = getPackageRoot();
  const variantNames: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantNames = [
    'Bridge',
    'Canopy',
    'Compass',
    'Monolith',
  ];
  const items: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items = [
    {
      label: 'Showcase Demo',
      to: '/showcase/',
    },
    {
      label: 'Resources',
      type: 'dropdown',
      items: [
        {
          label: 'Changelog',
          to: '/changelog/',
        },
        {
          label: 'Report an Issue',
          href: 'https://www.example.com/issues',
        },
      ],
    },
  ];

  vi.mocked(NavbarItem).mockImplementation(renderLink);

  for (const presetNameEntry of presetsIndexNames) {
    for (const variantNameEntry of variantNames) {
      const presetName: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetName = presetNameEntry;
      const variantName: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantName = variantNameEntry;

      it(`'${presetName}' preset with the '${variantName}' navbar keeps overflowing dropdown links reachable`, async () => {
        const variantSourcePath: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSourcePath = resolve(packageRoot, 'src', 'theme', 'Navbar', variantName, 'index.tsx');
        const variantSource: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSource = await readFile(variantSourcePath, 'utf-8');

        // Variants without More keep every item in the hamburger overlay.
        if (variantSource.includes('<More ') === false) {
          strictEqual(variantSource.includes('useNavbarOverflow'), false, `Expected the '${variantName}' navbar to have no overflow measuring without More.`);
          strictEqual(variantSource.includes('visibleItems'), false, `Expected the '${variantName}' navbar to render no inline items that could overflow.`);

          return;
        }

        const variantClass: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantClass = `nova-navbar-${variantName.toLowerCase()}-items`;
        const presetNavbarCssPath: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCssPath = resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', 'style.css');
        const presetMoreCssPath: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCssPath = resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', 'More', 'style.css');
        const presetVariantCssPath: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCssPath = resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', variantName, 'style.css');
        const presetNavbarCss: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCss = await readFile(presetNavbarCssPath, 'utf-8');
        const presetMoreCss: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCss = await readFile(presetMoreCssPath, 'utf-8');
        const presetVariantCss: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCss = await readFile(presetVariantCssPath, 'utf-8');
        const markup: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Markup = renderToStaticMarkup(createElement(More, {
          items,
          activeItemLabel: 'Resources',
        }));
        const detailsCount: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_DetailsCount = markup.split('<details').length - 1;

        // Grouped rows render as direct links inside the one More disclosure.
        strictEqual(variantSource.includes(`'${variantClass}'`), true, `Expected the '${variantName}' navbar to render More inside its items cluster.`);
        strictEqual(detailsCount, 1, 'Expected the dropdown links outside any nested disclosure.');
        strictEqual(markup.includes('class="nova-navbar-more-group-label">Resources</span>'), true);
        strictEqual(markup.includes('<li class="nova-navbar-more-item"><a href="/changelog/" aria-current="page">Changelog</a></li>'), true);
        strictEqual(markup.includes('<li class="nova-navbar-more-item"><a href="https://www.example.com/issues">Report an Issue</a></li>'), true);

        // Grouped rows reuse the preset's More row styling in both modes.
        strictEqual(presetNavbarCss.includes('.nova-navbar-more-menu .nova-navbar-more-item a {'), true, `Expected '${presetName}' to style More rows.`);
        strictEqual(presetNavbarCss.includes('.nova-navbar-more-menu .nova-navbar-more-item a:not(.navbar__link--active):not([aria-current="page"]):focus-visible'), true, `Expected '${presetName}' to style More row hover and focus.`);
        strictEqual(presetNavbarCss.includes('.nova-navbar-more-menu .nova-navbar-more-item a[aria-current="page"]'), true, `Expected '${presetName}' to style the active More row.`);
        strictEqual(presetNavbarCss.includes('[data-theme="dark"] .nova-navbar-more-menu .nova-navbar-more-item a[aria-current="page"]'), true, `Expected '${presetName}' to style the active More row in dark mode.`);

        // Group heading carries preset identity; the variant leaves it alone.
        strictEqual(presetMoreCss.includes('.nova-navbar-more-group-label {'), true, `Expected '${presetName}' to style the More group heading.`);
        strictEqual(presetVariantCss.includes('nova-navbar-more-group'), false, `Expected the '${presetName}' '${variantName}' overlay not to restyle More groups.`);

        return;
      });
    }
  }

  return;
});

/**
 * Tests - Theme - Navbar - More - More Chrome Across Presets.
 *
 * Judges each preset's navbar focus rings and More group separators from
 * its CSS. Every navbar control, the More trigger included, must ring on
 * `:focus-visible` with the preset's own color tokens (never the browser
 * default, never on mouse focus), and a group must sit one line away from
 * its neighbouring rows.
 *
 * @since 0.50.0
 */
describe('More chrome across presets', async () => {
  const packageRoot: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PackageRoot = getPackageRoot();
  const navbarCssNames: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarCssNames = [
    'style.css',
    'More/style.css',
    'Bridge/style.css',
    'Canopy/style.css',
    'Compass/style.css',
    'Monolith/style.css',
  ];
  const focusControls: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusControls = [
    '.nova-navbar-more-summary',
    '.nova-navbar-more-item a',
    '.nova-dropdown-summary',
    '.nova-dropdown-item a',
    '.nova-version-dropdown-summary',
    '.nova-version-dropdown-item-link',
    '.nova-locale-dropdown-summary',
    '.nova-locale-dropdown-item-link',
    '.nova-color-mode-toggle',
    '.nova-hamburger-toggle',
    '.nova-navbar-bridge-brand a',
    '.nova-navbar-bridge-items a',
    '.nova-navbar-bridge-menu-brand a',
    '.nova-navbar-bridge-menu-close',
    '.nova-navbar-bridge-menu-item',
    '.nova-navbar-bridge-menu-dropdown-summary',
    '.nova-navbar-canopy-brand a',
    '.nova-navbar-canopy-items a',
    '.nova-navbar-canopy-menu-brand a',
    '.nova-navbar-canopy-menu-close',
    '.nova-navbar-canopy-menu-item',
    '.nova-navbar-canopy-menu-dropdown-summary',
    '.nova-navbar-compass-brand a',
    '.nova-navbar-compass-items a',
    '.nova-navbar-compass-menu-brand a',
    '.nova-navbar-compass-menu-close',
    '.nova-navbar-compass-menu-item',
    '.nova-navbar-compass-menu-dropdown-summary',
    '.nova-navbar-monolith-brand a',
    '.nova-navbar-monolith-menu-close',
    '.nova-navbar-monolith-menu-item',
    '.nova-navbar-monolith-menu-dropdown-summary',
  ];

  for (const presetNameEntry of presetsIndexNames) {
    const presetName: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetName = presetNameEntry;

    it(`'${presetName}' preset rings its navbar controls with its own focus style`, async () => {
      const presetCss: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetCss = await readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'preset.css'), 'utf-8');
      const navbarSources: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarSources = await Promise.all(navbarCssNames.map((navbarCssName) => readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', navbarCssName), 'utf-8')));
      const presetRules: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules = collectRules(presetCss);
      const navbarRules: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules = navbarSources.flatMap((navbarSource) => collectRules(navbarSource));

      const unringedControls: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UnringedControls = [];

      let universalRing: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UniversalRing = false;
      let mouseRing: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_MouseRing = false;

      // A universal ring in the preset's own tokens covers every control.
      for (const presetRule of presetRules) {
        const presetSelectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetSelectors = presetRule['selectors'];
        const outlineDeclarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OutlineDeclarations = presetRule['declarations']
          .filter((declaration) => declaration.startsWith('outline: ') === true)
          .filter((declaration) => declaration.includes('var(--nova-color-') === true);

        if (
          presetSelectors.includes(':focus-visible') === true
          || presetSelectors.includes('*:focus-visible') === true
        ) {
          if (outlineDeclarations.length > 0) {
            universalRing = true;
          }
        }
      }

      // Mouse focus never rings a navbar control.
      for (const navbarRule of navbarRules) {
        for (const selector of navbarRule['selectors']) {
          const focusFreeSelector: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusFreeSelector = selector.replaceAll(':focus-visible', '').replaceAll(':focus-within', '');

          if (focusFreeSelector.includes(':focus') === true) {
            mouseRing = true;
          }
        }
      }

      // Without a universal ring, every control drops the browser outline and draws its own ring in both modes.
      if (universalRing === false) {
        for (const focusControl of focusControls) {
          const focusSelector: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusSelector = `${focusControl}:focus-visible`;

          let lightRing: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightRing = false;
          let darkRing: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkRing = false;
          let ringCleared: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingCleared = false;

          for (const navbarRule of navbarRules) {
            const lightMatch: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightMatch = navbarRule['selectors'].some((selector) => selector.startsWith('[data-theme="dark"] ') === false && selector.endsWith(focusSelector) === true);
            const darkMatch: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkMatch = navbarRule['selectors'].some((selector) => selector.startsWith('[data-theme="dark"] ') === true && selector.endsWith(focusSelector) === true);
            const ringDeclarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingDeclarations = navbarRule['declarations']
              .filter((declaration) => declaration.startsWith('outline: ') === true || declaration.startsWith('box-shadow: ') === true)
              .filter((declaration) => declaration.includes('var(--nova-color-') === true);

            if (lightMatch === true) {
              if (ringDeclarations.length > 0) {
                lightRing = true;
              }

              if (navbarRule['declarations'].includes('outline: none') === true) {
                ringCleared = true;
              }
            }

            if (
              darkMatch === true
              && ringDeclarations.length > 0
            ) {
              darkRing = true;
            }
          }

          const controlRinged: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_ControlRinged = lightRing && darkRing;

          if (
            controlRinged === false
            || ringCleared === false
          ) {
            unringedControls.push(focusControl);
          }
        }
      }

      strictEqual(JSON.stringify(unringedControls), '[]', `Expected '${presetName}' to ring these navbar controls with its own focus tokens instead of the browser default.`);
      strictEqual(mouseRing, false, `Expected '${presetName}' to ring navbar controls on keyboard focus only.`);

      return;
    });

    it(`'${presetName}' preset draws one line between a More row and a group`, async () => {
      const separatorSources: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorSources = await Promise.all([
        readFile(resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', 'More', 'style.css'), 'utf-8'),
        ...navbarCssNames.map((navbarCssName) => readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', navbarCssName), 'utf-8')),
      ]);
      const separatorRules: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules = separatorSources.flatMap((separatorSource) => collectRules(separatorSource));

      let groupSeparator: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupSeparator = false;
      let rowBottom: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowBottom = false;
      let rowTop: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowTop = false;
      let groupBottom: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupBottom = false;
      let rowYield: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowYield = false;
      let lastRowYield: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LastRowYield = false;

      for (const separatorRule of separatorRules) {
        // Dark-mode and menu-scoped copies of a selector judge as the plain selector.
        const plainSelectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainSelectors = separatorRule['selectors'].map((selector) => selector.replace('[data-theme="dark"] ', '').replace('.nova-navbar-more-menu ', ''));
        const plainDeclarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainDeclarations = separatorRule['declarations'];
        const drawsTop: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsTop = plainDeclarations
          .filter((declaration) => declaration.startsWith('border-top: ') === true || declaration.startsWith('border: ') === true)
          .some((declaration) => declaration.endsWith(': none') === false);
        const drawsBottom: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsBottom = plainDeclarations
          .filter((declaration) => declaration.startsWith('border-bottom: ') === true || declaration.startsWith('border: ') === true)
          .some((declaration) => declaration.endsWith(': none') === false);

        // The shared group separator on the group's top edge and the row after it.
        if (
          plainSelectors.includes('.nova-navbar-more-group:not(:first-child)') === true
          && plainSelectors.includes('.nova-navbar-more-group + .nova-navbar-more-item') === true
        ) {
          if (drawsTop === true) {
            groupSeparator = true;
          }
        }

        // Lines the preset draws on plain rows and on the group itself.
        if (plainSelectors.includes('.nova-navbar-more-item') === true) {
          if (drawsBottom === true) {
            rowBottom = true;
          }

          if (drawsTop === true) {
            rowTop = true;
          }
        }

        if (
          plainSelectors.includes('.nova-navbar-more-group') === true
          && drawsBottom === true
        ) {
          groupBottom = true;
        }

        // Rows yield their own line wherever the group separator already draws one.
        if (plainDeclarations.includes('border-bottom: none') === true) {
          if (plainSelectors.includes('.nova-navbar-more-item:has(+ .nova-navbar-more-group)') === true) {
            rowYield = true;
          }

          if (plainSelectors.includes('.nova-navbar-more-item:last-child') === true) {
            lastRowYield = true;
          }
        }
      }

      strictEqual(groupSeparator, true, 'Expected the shared group separator above a group and the row after it.');
      strictEqual(rowTop, false, `Expected '${presetName}' rows to leave their top edge to the group separator.`);
      strictEqual(groupBottom, false, `Expected '${presetName}' groups to draw no bottom line of their own.`);
      strictEqual(rowYield, rowBottom, `Expected '${presetName}' to drop the row line above a group only when its rows draw one.`);

      if (rowBottom === true) {
        strictEqual(lastRowYield, true, `Expected '${presetName}' to drop the last group row's line so the row after the group shows one line.`);
      }

      return;
    });
  }

  return;
});

/**
 * Tests - Theme - Navbar - More - Menu Placement Across Presets And Variants.
 *
 * Walks every preset with every navbar variant and resolves, from the
 * shared and preset stylesheets, where each navbar popover (dropdown,
 * docs version, locale, and More) opens. Variants with inline dropdowns
 * must open every menu the same shared gap below the bar: the trigger
 * wrappers leave the positioning chain, nothing between them and the bar
 * becomes a positioning context (except the Canopy top row, which
 * stretches to the row height), and the menus anchor on the inline axis
 * through their static position - inline-start for dropdown and version,
 * inline-end for locale and More - in both page directions. Variants
 * without inline dropdowns keep the trigger-relative placement.
 *
 * @since 0.50.1
 */
describe('Menu placement across presets and variants', async () => {
  const packageRoot: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PackageRoot = getPackageRoot();
  const variantNames: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantNames = [
    'Bridge',
    'Canopy',
    'Compass',
    'Monolith',
  ];
  const menuClasses: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuClasses = [
    '.nova-dropdown-menu',
    '.nova-version-dropdown-menu',
    '.nova-locale-dropdown-menu',
    '.nova-navbar-more-menu',
  ];
  const wrapperClasses: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperClasses = [
    '.nova-dropdown',
    '.nova-version-dropdown',
    '.nova-locale-dropdown',
    '.nova-navbar-more',
  ];
  const endWrapperClasses: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_EndWrapperClasses = [
    '.nova-locale-dropdown',
    '.nova-navbar-more',
  ];
  const containingBlockProperties: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ContainingBlockProperties = [
    'transform',
    'translate',
    'rotate',
    'scale',
    'perspective',
    'filter',
    'backdrop-filter',
    '-webkit-backdrop-filter',
    'contain',
    'container-type',
    'will-change',
  ];

  for (const presetNameEntry of presetsIndexNames) {
    for (const variantNameEntry of variantNames) {
      const presetName: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PresetName = presetNameEntry;
      const variantName: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantName = variantNameEntry;

      it(`'${presetName}' preset with the '${variantName}' navbar opens every navbar menu below the bar`, async () => {
        const variantSource: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_VariantSource = await readFile(resolve(packageRoot, 'src', 'theme', 'Navbar', variantName, 'index.tsx'), 'utf-8');
        const scope: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_Scope = `.nova-navbar-${variantName.toLowerCase()}`;
        const placementSources: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementSources = await Promise.all([
          readFile(resolve(packageRoot, 'src', 'styles', 'grid.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'theme', 'NavbarItem', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', 'More', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', variantName, 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'NavbarItem', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', 'More', 'style.css'), 'utf-8'),
          readFile(resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', variantName, 'style.css'), 'utf-8'),
        ]);
        const placementRules: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementRules = placementSources.flatMap((placementSource) => collectRules(placementSource));
        const rtlProcessor: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_RtlProcessor = loadCommonJsModule('rtlcss') as Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_RtlProcessor;

        // Right-to-left builds run every stylesheet through `rtlcss`, so the direction rules must survive it.
        const rtlPlacementRules: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_RtlPlacementRules = placementSources.flatMap((placementSource) => collectRules(rtlProcessor.process(placementSource)));
        const directionRuleSets: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_DirectionRuleSets = [
          placementRules,
          rtlPlacementRules,
        ];
        const placementSelectors: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_PlacementSelectors = placementRules.flatMap((placementRule) => placementRule['selectors']);

        // Variants without inline dropdowns keep every menu below its own trigger.
        if (variantSource.includes('<More ') === false) {
          const scopedSelectors: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ScopedSelectors = placementSelectors
            .filter((selector) => selector.includes(`${scope} `) === true)
            .filter((selector) => [
              ...menuClasses,
              ...wrapperClasses,
            ].some((placementClass) => selector.endsWith(placementClass) === true || selector.endsWith(`${placementClass} > *`) === true));

          strictEqual(JSON.stringify(scopedSelectors), '[]', `Expected the '${variantName}' navbar to keep trigger-relative menus.`);

          return;
        }

        const barDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_BarDeclarations = resolveDeclarations(placementRules, ['.navbar']);

        // The bar (the `.navbar` wrapper around the variant's `<nav>`) is the positioning context and owns the shared gap.
        strictEqual([
          'relative',
          'sticky',
        ].includes(barDeclarations['position'] ?? ''), true, `Expected the '${presetName}' '${variantName}' bar to be a positioning context.`);
        strictEqual(barDeclarations['--nova-navbar-menu-offset'] !== undefined, true, 'Expected the bar to declare the shared menu gap.');

        // Every trigger wrapper leaves the positioning chain.
        for (const wrapperClassEntry of wrapperClasses) {
          const wrapperClass: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperClass = wrapperClassEntry;
          const wrapperDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_WrapperDeclarations = {
            ...resolveDeclarations(placementRules, [wrapperClass]),
            ...resolveDeclarations(placementRules, [`${scope} ${wrapperClass}`]),
          };
          const endAligned: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_EndAligned = endWrapperClasses.includes(wrapperClass);

          strictEqual(wrapperDeclarations['position'], 'static', `Expected '${presetName}' to take '${wrapperClass}' out of the positioning chain in the '${variantName}' navbar.`);

          if (endAligned === true) {
            for (const directionRules of directionRuleSets) {
              strictEqual(resolveDeclarations(directionRules, [`${scope} ${wrapperClass}`])['direction'], 'rtl', `Expected '${wrapperClass}' to anchor its menu to the trigger's inline-end edge.`);
              strictEqual(resolveDeclarations(directionRules, [`${scope} ${wrapperClass} > *`])['direction'], 'ltr', `Expected '${wrapperClass}' to restore the page direction on its children.`);
              strictEqual(resolveDeclarations(directionRules, [`[dir="rtl"] ${scope} ${wrapperClass}`])['direction'], 'ltr', `Expected '${wrapperClass}' to anchor its menu to the trigger's inline-end edge in right-to-left.`);
              strictEqual(resolveDeclarations(directionRules, [`[dir="rtl"] ${scope} ${wrapperClass} > *`])['direction'], 'rtl', `Expected '${wrapperClass}' to restore the page direction on its children in right-to-left.`);
            }
          } else {
            strictEqual(wrapperDeclarations['direction'], undefined, `Expected '${wrapperClass}' to anchor its menu to the trigger's inline-start edge.`);
          }
        }

        const menuTops: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuTops = [];

        // Every menu opens the shared gap below the bar, anchored with logical insets.
        for (const menuClassEntry of menuClasses) {
          const menuClass: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuClass = menuClassEntry;
          const baseDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_BaseDeclarations = resolveDeclarations(placementRules, [menuClass]);
          const scopedDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ScopedDeclarations = resolveDeclarations(placementRules, [`${scope} ${menuClass}`]);
          const menuDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_MenuDeclarations = {
            ...baseDeclarations,
            ...scopedDeclarations,
          };

          menuTops.push(menuDeclarations['top'] ?? '');

          strictEqual(menuDeclarations['position'], 'absolute', `Expected '${menuClass}' to be an absolute popover.`);
          strictEqual(menuDeclarations['top'], 'calc(100% + var(--nova-navbar-menu-offset))', `Expected '${presetName}' to open '${menuClass}' the shared gap below the '${variantName}' bar.`);
          strictEqual(scopedDeclarations['inset-inline'], 'auto', `Expected '${menuClass}' to take its inline position from its trigger.`);
          strictEqual(scopedDeclarations['inset-inline-start'] === undefined && scopedDeclarations['inset-inline-end'] === undefined, true, `Expected '${menuClass}' to leave both inline insets to its trigger.`);
          strictEqual(menuDeclarations['left'] === undefined && menuDeclarations['right'] === undefined, true, `Expected '${menuClass}' to anchor with logical properties so it flips in right-to-left.`);
        }

        strictEqual(new Set(menuTops).size, 1, `Expected '${presetName}' to open every '${variantName}' navbar menu the same distance below the bar.`);

        const chainClasses: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainClasses = [
          scope,
          '.nova-container',
          `${scope} > .nova-container`,
          '.nova-navbar-item',
          `${scope}-items`,
          `${scope}-actions`,
        ];

        // Nothing between a trigger wrapper and the bar becomes a positioning context.
        for (const chainClassEntry of chainClasses) {
          const chainClass: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainClass = chainClassEntry;
          const chainDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ChainDeclarations = resolveDeclarations(placementRules, [chainClass]);
          const containingBlockDeclarations: Tests_Theme_Navbar_More_Index_MenuPlacementAcrossPresetsAndVariants_ContainingBlockDeclarations = containingBlockProperties
            .filter((containingBlockProperty) => chainDeclarations[containingBlockProperty] !== undefined)
            .filter((containingBlockProperty) => [
              'none',
              'normal',
              'auto',
            ].includes(chainDeclarations[containingBlockProperty] ?? '') === false)
            .map((containingBlockProperty) => `${containingBlockProperty}: ${chainDeclarations[containingBlockProperty] ?? ''}`);

          // A transform, filter, containment, or similar would capture the menus as well.
          strictEqual(JSON.stringify(containingBlockDeclarations), '[]', `Expected '${presetName}' to keep '${chainClass}' from becoming a containing block in the '${variantName}' navbar.`);

          // The Canopy top row places the locale menu under that row.
          if (chainClass === '.nova-navbar-canopy-actions') {
            strictEqual(chainDeclarations['position'], 'relative', `Expected '${presetName}' to make the Canopy top row the locale menu's positioning context.`);
            strictEqual(chainDeclarations['align-self'], 'stretch', `Expected '${presetName}' to stretch the Canopy actions to the top row's height.`);

            continue;
          }

          strictEqual([
            'static',
            '',
          ].includes(chainDeclarations['position'] ?? ''), true, `Expected '${presetName}' to keep '${chainClass}' out of the positioning chain in the '${variantName}' navbar.`);
        }

        return;
      });
    }
  }

  return;
});
