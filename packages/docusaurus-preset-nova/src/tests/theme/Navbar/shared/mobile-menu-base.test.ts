import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Icon } from '@iconify/react/offline';
import { SearchProvider } from '@theme/SearchBar';
import { createElement, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  afterAll,
  beforeAll,
  describe,
  it,
  vi,
} from 'vitest';

import { LIB_REGEX_CSS_BLOCK_COMMENT } from '../../../../lib/regex.js';
import { presetsIndexNames } from '../../../../presets/index.js';
import BridgeMobileMenu from '../../../../theme/Navbar/Bridge/mobile-menu.js';
import CanopyMobileMenu from '../../../../theme/Navbar/Canopy/mobile-menu.js';
import CompassMobileMenu from '../../../../theme/Navbar/Compass/mobile-menu.js';
import MonolithMobileMenu from '../../../../theme/Navbar/Monolith/mobile-menu.js';

import type {
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_BeforeOpen,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Chunk,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_CommentPattern,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Css,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_OpenIndex,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Returns,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Rules,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Selector,
  Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_StrippedCss,
  Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_CurrentFileDirectory,
  Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_CurrentFilePath,
  Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_Returns,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_ChevronClass,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Css,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_CssPath,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_HidingDeclarations,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PackageRoot,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PhysicalProperties,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Prefix,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PresetName,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PropertyName,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Rules,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Selector,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_VariantName,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_VariantNames,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_ChevronClass,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_ChevronRules,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Css,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_CssPath,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Declarations,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PackageRoot,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PhysicalProperties,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PlacesOnInlineEnd,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Prefix,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PropertyName,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Rules,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_VariantName,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_VariantNames,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_ChevronCount,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_DetailsStart,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_ExpectedSummary,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_FallsBackToAFolderIcon_IconlessItems,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_FallsBackToAFolderIcon_Markup,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Items,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Markup,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_OnClose,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Prefix,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_SiteLogo,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_SummaryStart,
  Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Variants,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_ProviderProps,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_Returns,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_IconProps,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_Returns,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_PortalChildren,
  Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_Returns,
} from '../../../../types/tests/theme/Navbar/shared/mobile-menu-base.test.d.ts';

vi.mock('@docusaurus/Link', () => ({
  default: 'a',
}));

vi.mock('@docusaurus/router', () => ({
  useLocation: vi.fn(() => ({
    pathname: '/',
  })),
}));

vi.mock('@docusaurus/Translate', () => ({
  translate: vi.fn(() => 'Menu'),
}));

vi.mock('@iconify/react/offline', () => ({
  Icon: vi.fn(() => null),
}));

vi.mock('@theme/Logo', () => ({
  default: vi.fn(() => null),
}));

vi.mock('@theme/SearchBar', () => {
  return {
    SearchInput: vi.fn(() => null),
    SearchProvider: vi.fn(() => null),
    SearchResults: vi.fn(() => null),
  };
});

vi.mock('react-dom', {
  spy: true,
});

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Collect Rules.
 *
 * Splits a stylesheet into selector and declaration pairs, unwrapping
 * at-rule wrappers such as media queries so their inner rules are kept.
 *
 * @param {Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Css} css - Css.
 *
 * @returns {Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Returns}
 *
 * @since 0.50.0
 */
function collectRules(css: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Css): Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Returns {
  const commentPattern: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_CommentPattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');
  const strippedCss: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_StrippedCss = css.replace(commentPattern, '');
  const rules: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Rules = [];

  for (const chunkEntry of strippedCss.split('}')) {
    const chunk: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Chunk = chunkEntry;
    const openIndex: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_OpenIndex = chunk.lastIndexOf('{');

    if (openIndex === -1) {
      continue;
    }

    const beforeOpen: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_BeforeOpen = chunk.slice(0, openIndex);
    const selector: Tests_Theme_Navbar_Shared_MobileMenuBase_CollectRules_Selector = beforeOpen.slice(beforeOpen.lastIndexOf('{') + 1).trim();

    rules.push({
      selector,
      declarations: chunk.slice(openIndex + 1),
    });
  }

  return rules;
}

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @returns {Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_Returns}
 *
 * @since 0.50.0
 */
function getPackageRoot(): Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_Returns {
  const currentFilePath: Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_Theme_Navbar_Shared_MobileMenuBase_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..', '..', '..', '..');
}

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Render Children.
 *
 * Stands in for the search provider by rendering its children in place.
 *
 * @param {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_ProviderProps} providerProps - Provider props.
 *
 * @returns {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_Returns}
 *
 * @since 0.50.0
 */
function renderChildren(providerProps: Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_ProviderProps): Tests_Theme_Navbar_Shared_MobileMenuBase_RenderChildren_Returns {
  return createElement(Fragment, null, providerProps['children']);
}

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Render Icon.
 *
 * Stands in for the Iconify icon with a bare svg that carries the class,
 * icon name, and hidden state the mobile menu hands it.
 *
 * @param {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_IconProps} iconProps - Icon props.
 *
 * @returns {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_Returns}
 *
 * @since 0.50.0
 */
function renderIcon(iconProps: Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_IconProps): Tests_Theme_Navbar_Shared_MobileMenuBase_RenderIcon_Returns {
  return createElement('svg', {
    'className': iconProps['className'],
    'data-icon': iconProps['icon'],
    'aria-hidden': iconProps['aria-hidden'],
  });
}

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Render Portal.
 *
 * Returns the portal children in place so static rendering can read them.
 *
 * @param {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_PortalChildren} portalChildren - Portal children.
 *
 * @returns {Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_Returns}
 *
 * @since 0.50.0
 */
function renderPortal(portalChildren: Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_PortalChildren): Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_Returns {
  return portalChildren as Tests_Theme_Navbar_Shared_MobileMenuBase_RenderPortal_Returns;
}

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Dropdown Row.
 *
 * Renders every navbar variant's mobile menu with a dropdown item and checks
 * the expandable row keeps its leading icon, ends with a chevron, and stays a
 * native disclosure that exposes its open state.
 *
 * @since 0.50.0
 */
describe('Mobile menu dropdown row', async () => {
  const items: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Items = [
    {
      label: 'Showcase Demo',
      to: '/showcase/',
    },
    {
      label: 'Resources',
      type: 'dropdown',
      icon: 'lucide:book-open',
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
  const siteLogo: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_SiteLogo = {
    alt: 'Example',
    src: undefined,
    wordmark: undefined,
    title: 'Example',
    href: '/',
    target: undefined,
    rel: undefined,
    ariaLabel: undefined,
  };
  const onClose: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_OnClose = () => undefined;
  const variants: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Variants = [
    {
      name: 'Bridge',
      prefix: 'nova-navbar-bridge-menu',
      render: () => createElement(BridgeMobileMenu, {
        isOpen: true,
        onClose,
        items,
        siteLogo,
        activeItemLabel: null,
      }),
    },
    {
      name: 'Canopy',
      prefix: 'nova-navbar-canopy-menu',
      render: () => createElement(CanopyMobileMenu, {
        isOpen: true,
        onClose,
        items,
        siteLogo,
        activeItemLabel: null,
      }),
    },
    {
      name: 'Compass',
      prefix: 'nova-navbar-compass-menu',
      render: () => createElement(CompassMobileMenu, {
        isOpen: true,
        onClose,
        items,
        siteLogo,
        activeItemLabel: null,
      }),
    },
    {
      name: 'Monolith',
      prefix: 'nova-navbar-monolith-menu',
      render: () => createElement(MonolithMobileMenu, {
        isOpen: true,
        onClose,
        items,
        activeItemLabel: null,
      }),
    },
  ];

  beforeAll(() => {
    vi.mocked(Icon).mockImplementation(renderIcon);

    vi.mocked(SearchProvider).mockImplementation(renderChildren);

    vi.mocked(createPortal).mockImplementation(renderPortal);

    vi.stubGlobal('document', {
      body: {},
    });

    return;
  });

  afterAll(() => {
    vi.unstubAllGlobals();

    return;
  });

  for (const variant of variants) {
    it(`'${variant['name']}' mobile menu ends the dropdown row with a chevron`, () => {
      const prefix: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Prefix = variant['prefix'];
      const markup: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_Markup = renderToStaticMarkup(variant.render());
      const expectedSummary: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_ExpectedSummary = [
        `<summary class="${prefix}-dropdown-summary">`,
        `<svg class="${prefix}-dropdown-icon" data-icon="lucide:book-open" aria-hidden="true"></svg>`,
        '<span>Resources</span>',
        `<svg class="${prefix}-dropdown-chevron" data-icon="lucide:chevron-down" aria-hidden="true"></svg>`,
        '</summary>',
      ].join('');
      const detailsStart: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_DetailsStart = markup.indexOf(`<details class="${prefix}-dropdown"`);
      const summaryStart: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_SummaryStart = markup.indexOf(expectedSummary);
      const chevronCount: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_ChevronCount = markup.split(`${prefix}-dropdown-chevron`).length - 1;

      // Leading icon, label, then the chevron as the last thing in the row.
      strictEqual(summaryStart > -1, true, `Expected the '${variant['name']}' dropdown row to keep its icon and end with a chevron.`);

      // A native details/summary pair exposes the expanded state to assistive tech.
      strictEqual(detailsStart > -1, true, `Expected the '${variant['name']}' dropdown row to be a native disclosure.`);
      strictEqual(detailsStart < summaryStart, true, 'Expected the summary inside the details element.');
      strictEqual(markup.includes('aria-expanded'), false, 'Expected no hand-rolled aria-expanded alongside the native disclosure.');
      strictEqual(chevronCount, 1, 'Expected only the dropdown row to carry a chevron.');

      return;
    });
  }

  it('falls back to a folder icon', () => {
    const iconlessItems: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_FallsBackToAFolderIcon_IconlessItems = [{
      label: 'Resources',
      type: 'dropdown',
      items: [{
        label: 'Changelog',
        to: '/changelog/',
      }],
    }];
    const markup: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuDropdownRow_FallsBackToAFolderIcon_Markup = renderToStaticMarkup(createElement(MonolithMobileMenu, {
      isOpen: true,
      onClose,
      items: iconlessItems,
      activeItemLabel: null,
    }));

    // A chevron as the leading icon would double up with the trailing one.
    strictEqual(markup.includes('<svg class="nova-navbar-monolith-menu-dropdown-icon" data-icon="lucide:folder" aria-hidden="true"></svg>'), true);
    strictEqual(markup.split('data-icon="lucide:chevron-down"').length - 1, 1);

    return;
  });

  return;
});

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Chevron Base Styles.
 *
 * Each navbar variant's base stylesheet must place the chevron at the inline
 * end with logical properties (so it flips in right-to-left languages), keep
 * it on the row colour, rotate it when open, and drop the motion when the
 * reader prefers reduced motion.
 *
 * @since 0.50.0
 */
describe('Mobile menu chevron base styles', async () => {
  const packageRoot: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PackageRoot = getPackageRoot();
  const variantNames: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_VariantNames = [
    'Bridge',
    'Canopy',
    'Compass',
    'Monolith',
  ];
  const physicalProperties: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PhysicalProperties = [
    'left',
    'right',
    'margin-left',
    'margin-right',
    'padding-left',
    'padding-right',
  ];

  for (const variantNameEntry of variantNames) {
    const variantName: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_VariantName = variantNameEntry;

    it(`'${variantName}' base styles place the chevron on the inline end`, async () => {
      const prefix: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Prefix = `nova-navbar-${variantName.toLowerCase()}-menu`;
      const chevronClass: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_ChevronClass = `.${prefix}-dropdown-chevron`;
      const cssPath: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_CssPath = resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', variantName, 'style.css');
      const css: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Css = await readFile(cssPath, 'utf-8');
      const rules: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Rules = collectRules(css);
      const chevronRules: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_ChevronRules = [];

      let declarations: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_Declarations = '';

      for (const rule of rules) {
        if (rule['selector'].includes(chevronClass) === true) {
          chevronRules.push(rule);

          declarations += `${rule['declarations']};`;
        }
      }

      const placesOnInlineEnd: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PlacesOnInlineEnd = (
        declarations.includes('margin-inline-start: auto')
        || declarations.includes('inset-inline-end:')
      );

      strictEqual(chevronRules.length > 0, true, `Expected the '${variantName}' base styles to style the chevron.`);
      strictEqual(placesOnInlineEnd, true, `Expected the '${variantName}' chevron to sit on the inline end with logical properties.`);
      strictEqual(declarations.includes('color: currentColor'), true, `Expected the '${variantName}' chevron to follow the row colour.`);
      strictEqual(declarations.includes('transform: rotate(180deg)'), true, `Expected the '${variantName}' chevron to flip when the row is open.`);
      strictEqual(css.includes(`[open] > .${prefix}-dropdown-summary ${chevronClass}`), true, 'Expected the flip keyed to the open disclosure.');
      strictEqual(css.includes('@media (prefers-reduced-motion: reduce)'), true, `Expected the '${variantName}' chevron transition to respect reduced motion.`);
      strictEqual(css.includes(`.${prefix}-dropdown-summary svg`), false, 'Expected no rule that turns every summary icon, the leading one included.');

      // Physical left and right would pin the chevron to the wrong side in RTL.
      for (const rule of chevronRules) {
        for (const declaration of rule['declarations'].split(';')) {
          const propertyName: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronBaseStyles_PropertyName = (declaration.split(':')[0] ?? '').trim();

          strictEqual(physicalProperties.includes(propertyName), false, `Expected '${rule['selector']}' to avoid the physical '${propertyName}' property.`);
        }
      }

      return;
    });
  }

  return;
});

/**
 * Tests - Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Chevron Across Presets.
 *
 * Walks every preset with every navbar variant. No preset may hide, recolour,
 * or physically reposition the mobile menu chevron, and none may clip the row
 * or unanchor the Canopy tile that holds it.
 *
 * @since 0.50.0
 */
describe('Mobile menu chevron across presets', async () => {
  const packageRoot: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PackageRoot = getPackageRoot();
  const variantNames: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_VariantNames = [
    'Bridge',
    'Canopy',
    'Compass',
    'Monolith',
  ];
  const physicalProperties: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PhysicalProperties = [
    'left',
    'right',
    'margin-left',
    'margin-right',
    'padding-left',
    'padding-right',
  ];
  const hidingDeclarations: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_HidingDeclarations = [
    'display: none',
    'visibility: hidden',
    'opacity: 0',
    'transform: none',
    'color:',
  ];

  for (const presetNameEntry of presetsIndexNames) {
    for (const variantNameEntry of variantNames) {
      const presetName: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PresetName = presetNameEntry;
      const variantName: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_VariantName = variantNameEntry;

      it(`'${presetName}' preset with the '${variantName}' navbar leaves the mobile menu chevron alone`, async () => {
        const prefix: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Prefix = `nova-navbar-${variantName.toLowerCase()}-menu`;
        const chevronClass: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_ChevronClass = `${prefix}-dropdown-chevron`;
        const cssPath: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_CssPath = resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', variantName, 'style.css');
        const css: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Css = await readFile(cssPath, 'utf-8');
        const rules: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Rules = collectRules(css);

        for (const rule of rules) {
          const selector: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_Selector = rule['selector'];

          // Bare svg selectors in the summary would recolour or hide the chevron too.
          strictEqual(selector.includes(`${prefix}-dropdown-summary svg`), false, `Expected '${presetName}' to target the leading icon class, not every summary svg, in '${selector}'.`);

          if (selector.includes(chevronClass) === true) {
            for (const hidingDeclaration of hidingDeclarations) {
              strictEqual(rule['declarations'].includes(hidingDeclaration), false, `Expected '${presetName}' not to set '${hidingDeclaration}' on the chevron.`);
            }

            for (const declaration of rule['declarations'].split(';')) {
              const propertyName: Tests_Theme_Navbar_Shared_MobileMenuBase_MobileMenuChevronAcrossPresets_PropertyName = (declaration.split(':')[0] ?? '').trim();

              strictEqual(physicalProperties.includes(propertyName), false, `Expected '${presetName}' to avoid the physical '${propertyName}' property on the chevron.`);
            }
          }

          if (selector === `.${prefix}-dropdown-summary`) {
            // Clipping the row would cut the chevron off.
            strictEqual(rule['declarations'].includes('overflow: hidden'), false, `Expected '${presetName}' not to clip the '${variantName}' dropdown row.`);

            // The Canopy tile anchors the corner chevron, so it must stay positioned.
            strictEqual(rule['declarations'].includes('position: static'), false, `Expected '${presetName}' to keep the '${variantName}' dropdown row positioned for its chevron.`);
          }
        }

        return;
      });
    }
  }

  return;
});
