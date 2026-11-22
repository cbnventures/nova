import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  createProseShieldPlugin,
  proseShieldExclusion,
  shieldProseSelector,
} from '../../lib/prose-shield.js';

import type {
  Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Plugin,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Root,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Rule,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Nested,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Parent,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Plugin,
  Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Root,
  Tests_Lib_ProseShield_ShieldProseSelector_AppendsTheExclusionToTheSubjectOfAProseSelector_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_DoesNotTreatClassNamesContainingArticleAsProse_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_IgnoresCombinatorsInsideAttributeValues_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_KeepsLegacySingleColonPseudoElementsAtTheEnd_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_KeepsPseudoElementsAtTheEnd_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_LeavesSelectorsOutsideProseAlone_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_LeavesThePlaygroundStylesAlone_Result,
  Tests_Lib_ProseShield_ShieldProseSelector_ShieldsNestedSelectorsUnderAProseRule_Result,
} from '../../types/tests/lib/prose-shield.test.d.ts';

/**
 * Tests - Lib - Prose Shield - Shield Prose Selector.
 *
 * @since 0.50.0
 */
describe('shieldProseSelector', async () => {
  it('appends the exclusion to the subject of a prose selector', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_AppendsTheExclusionToTheSubjectOfAProseSelector_Result = shieldProseSelector('.nova-mdx-content p', false);

    strictEqual(result, `.nova-mdx-content p${proseShieldExclusion}`);

    return;
  });

  it('keeps pseudo-elements at the end', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_KeepsPseudoElementsAtTheEnd_Result = shieldProseSelector('article a[target="_blank"]::after', false);

    strictEqual(result, `article a[target="_blank"]${proseShieldExclusion}::after`);

    return;
  });

  it('keeps legacy single-colon pseudo-elements at the end', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_KeepsLegacySingleColonPseudoElementsAtTheEnd_Result = shieldProseSelector('.nova-mdx-content blockquote:before', false);

    strictEqual(result, `.nova-mdx-content blockquote${proseShieldExclusion}:before`);

    return;
  });

  it('ignores combinators inside attribute values', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_IgnoresCombinatorsInsideAttributeValues_Result = shieldProseSelector('.nova-mdx-content a[title="a > b"]:hover', false);

    strictEqual(result, `.nova-mdx-content a[title="a > b"]:hover${proseShieldExclusion}`);

    return;
  });

  it('leaves selectors outside prose alone', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_LeavesSelectorsOutsideProseAlone_Result = shieldProseSelector('.nova-hero a', false);

    strictEqual(result, '.nova-hero a');

    return;
  });

  it('does not treat class names containing article as prose', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_DoesNotTreatClassNamesContainingArticleAsProse_Result = shieldProseSelector('.nova-article-card p', false);

    strictEqual(result, '.nova-article-card p');

    return;
  });

  it('leaves the playground styles alone', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_LeavesThePlaygroundStylesAlone_Result = shieldProseSelector('.nova-mdx-content .nova-block-playground-canvas a', false);

    strictEqual(result, '.nova-mdx-content .nova-block-playground-canvas a');

    return;
  });

  it('shields nested selectors under a prose rule', () => {
    const result: Tests_Lib_ProseShield_ShieldProseSelector_ShieldsNestedSelectorsUnderAProseRule_Result = shieldProseSelector('&:hover', true);

    strictEqual(result, `&:hover${proseShieldExclusion}`);

    return;
  });

  return;
});

/**
 * Tests - Lib - Prose Shield - Create Prose Shield Plugin.
 *
 * @since 0.50.0
 */
describe('createProseShieldPlugin', async () => {
  it('rewrites preset styles and nested rules', () => {
    const plugin: Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Plugin = createProseShieldPlugin('/site/node_modules/preset/build/styles');
    const parent: Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Parent = {
      type: 'rule',
      selector: '.nova-mdx-content a',
      selectors: ['.nova-mdx-content a'],
    };
    const nested: Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Nested = {
      type: 'rule',
      selector: '&:hover',
      selectors: ['&:hover'],
      parent,
    };
    const root: Tests_Lib_ProseShield_CreateProseShieldPlugin_RewritesPresetStylesAndNestedRules_Root = {
      source: {
        input: {
          file: '/site/node_modules/preset/build/styles/theme/MDXContent/style.css',
        },
      },
      walkRules: (callback) => {
        callback(parent);
        callback(nested);

        return;
      },
    };

    plugin.Once(root);

    strictEqual(parent['selectors'][0], `.nova-mdx-content a${proseShieldExclusion}`);
    strictEqual(nested['selectors'][0], `&:hover${proseShieldExclusion}`);

    return;
  });

  it('leaves files outside the preset styles alone', () => {
    const plugin: Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Plugin = createProseShieldPlugin('/site/node_modules/preset/build/styles');
    const rule: Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Rule = {
      type: 'rule',
      selector: '.nova-mdx-content p',
      selectors: ['.nova-mdx-content p'],
    };
    const root: Tests_Lib_ProseShield_CreateProseShieldPlugin_LeavesFilesOutsideThePresetStylesAlone_Root = {
      source: {
        input: {
          file: '/site/src/css/custom.css',
        },
      },
      walkRules: (callback) => {
        callback(rule);

        return;
      },
    };

    plugin.Once(root);

    strictEqual(rule['selectors'][0], '.nova-mdx-content p');

    return;
  });

  return;
});
