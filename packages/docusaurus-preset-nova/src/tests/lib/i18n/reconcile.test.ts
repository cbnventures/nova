import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Reconcile } from '../../../lib/i18n/reconcile.js';

import type {
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_DoesNotSeedAMissingAreaKeyInANonDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_DropsARedundantAreaCopyInANonDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_EmptiesTheContentWhenEveryAreaKeyDrops_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_FlagsARemovedAreaKeyAsAnOrphan_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_KeepsAnAreaKeyOverrideThatDiffersFromTheSource_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_KeepsARedundantAreaCopyInTheDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_ProducesNoChangesWhenReRunOnReconciledContent_FirstPlan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_ProducesNoChangesWhenReRunOnReconciledContent_SecondPlan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_SeedsAMissingAreaKeyInTheDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DoesNotSeedANewSiteKeyInANonDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsARedundantSiteCopyInANonDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsARedundantThemeCopyInTheDefaultLocaleUsingTheExtractedSourceDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsAStaleThemeKeyCopyEqualToItsDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsAThemeKeyCopyEqualToTheRegistryDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_FlagsAnUnknownKeyAsAnOrphan_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_FlagsAStaleThemeKeyThatDiffersFromItsDefaultAsAnOrphan_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsARedundantSiteCopyInTheDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsASiteKeyOverrideThatDiffersFromTheDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsAThemeKeyOverrideThatDiffersFromTheRegistryDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsAThemeOverrideInTheDefaultLocaleThatDiffersFromTheExtractedSourceDefault_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_PreservesDescriptionsOnKeptAndSeededEntries_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ProducesNoChangesWhenReRunOnReconciledContent_FirstPlan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ProducesNoChangesWhenReRunOnReconciledContent_SecondPlan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ReturnsAnEmptyPlanForAnEmptyFile_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_SeedsANewSiteKeyInTheDefaultLocale_Plan,
  Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_TreatsAPluralValueThatDiffersOnlyInFormAsAnOverride_Plan,
} from '../../../types/tests/lib/i18n/reconcile.test.d.ts';

/**
 * Tests - Lib - I18n - Reconcile - Reconcile Code.
 *
 * @since 0.21.0
 */
describe('Reconcile.reconcileCode', () => {
  it('keeps a site key override that differs from the default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsASiteKeyOverrideThatDiffersFromTheDefault_Plan = Reconcile.reconcileCode({
      existing: {
        greeting: { message: 'Hola' },
      },
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'greeting',
      classification: 'keep',
      action: 'keep',
      message: 'Hola',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['add'], []);
    deepStrictEqual(plan['content'], {
      greeting: { message: 'Hola' },
    });

    return;
  });

  it('drops a redundant site copy in a non-default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsARedundantSiteCopyInANonDefaultLocale_Plan = Reconcile.reconcileCode({
      existing: {
        greeting: { message: 'Hello' },
      },
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: false,
    });

    strictEqual(plan['dropRedundant'].length, 1);
    deepStrictEqual(plan['dropRedundant'], [{
      key: 'greeting',
      classification: 'redundant-live',
      action: 'drop',
      message: 'Hello',
      description: undefined,
    }]);
    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('keeps a redundant site copy in the default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsARedundantSiteCopyInTheDefaultLocale_Plan = Reconcile.reconcileCode({
      existing: {
        greeting: { message: 'Hello' },
      },
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'greeting',
      classification: 'redundant-live',
      action: 'keep',
      message: 'Hello',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['content'], {
      greeting: { message: 'Hello' },
    });

    return;
  });

  it('seeds a new site key in the default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_SeedsANewSiteKeyInTheDefaultLocale_Plan = Reconcile.reconcileCode({
      existing: {},
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: {
          message: 'Hello',
          description: 'A greeting',
        },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['add'], [{
      key: 'greeting',
      classification: 'seed',
      action: 'seed',
      message: 'Hello',
      description: 'A greeting',
    }]);
    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['content'], {
      greeting: {
        message: 'Hello',
        description: 'A greeting',
      },
    });

    return;
  });

  it('does not seed a new site key in a non-default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DoesNotSeedANewSiteKeyInANonDefaultLocale_Plan = Reconcile.reconcileCode({
      existing: {},
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: false,
    });

    deepStrictEqual(plan['add'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('drops a theme key copy equal to the registry default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsAThemeKeyCopyEqualToTheRegistryDefault_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.foo': { message: 'Bar' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set(['theme.foo']),
      siteExtract: {},
      registry: {
        'theme.foo': 'Bar',
      },
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['dropRedundant'], [{
      key: 'theme.foo',
      classification: 'redundant-live',
      action: 'drop',
      message: 'Bar',
      description: undefined,
    }]);
    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('keeps a theme key override that differs from the registry default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsAThemeKeyOverrideThatDiffersFromTheRegistryDefault_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.foo': { message: 'Custom' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set(['theme.foo']),
      siteExtract: {},
      registry: {
        'theme.foo': 'Bar',
      },
      themeDefaults: {},
      isDefaultLocale: false,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'theme.foo',
      classification: 'keep',
      action: 'keep',
      message: 'Custom',
      description: undefined,
    }]);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['content'], {
      'theme.foo': { message: 'Custom' },
    });

    return;
  });

  it('drops a stale theme key copy equal to its default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsAStaleThemeKeyCopyEqualToItsDefault_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.stale': { message: 'Old' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      registry: {
        'theme.stale': 'Old',
      },
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['dropRedundant'], [{
      key: 'theme.stale',
      classification: 'redundant-stale',
      action: 'drop',
      message: 'Old',
      description: undefined,
    }]);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('flags a stale theme key that differs from its default as an orphan', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_FlagsAStaleThemeKeyThatDiffersFromItsDefaultAsAnOrphan_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.stale': { message: 'Translated' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      registry: {
        'theme.stale': 'Original',
      },
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['orphan'], [{
      key: 'theme.stale',
      classification: 'orphan',
      action: 'gate',
      message: 'Translated',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('flags an unknown key as an orphan', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_FlagsAnUnknownKeyAsAnOrphan_Plan = Reconcile.reconcileCode({
      existing: {
        'random.key': { message: 'Whatever' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      registry: {},
      themeDefaults: {},
      isDefaultLocale: false,
    });

    deepStrictEqual(plan['orphan'], [{
      key: 'random.key',
      classification: 'orphan',
      action: 'gate',
      message: 'Whatever',
      description: undefined,
    }]);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('preserves descriptions on kept and seeded entries', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_PreservesDescriptionsOnKeptAndSeededEntries_Plan = Reconcile.reconcileCode({
      existing: {
        over: {
          message: 'Custom',
          description: 'kept desc',
        },
      },
      liveSiteKeys: new Set([
        'over',
        'fresh',
      ]),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        over: {
          message: 'Source',
          description: 'over desc',
        },
        fresh: {
          message: 'Fresh',
          description: 'fresh desc',
        },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'over',
      classification: 'keep',
      action: 'keep',
      message: 'Custom',
      description: 'kept desc',
    }]);
    deepStrictEqual(plan['add'], [{
      key: 'fresh',
      classification: 'seed',
      action: 'seed',
      message: 'Fresh',
      description: 'fresh desc',
    }]);
    deepStrictEqual(plan['content'], {
      over: {
        message: 'Custom',
        description: 'kept desc',
      },
      fresh: {
        message: 'Fresh',
        description: 'fresh desc',
      },
    });

    return;
  });

  it('treats a plural value that differs only in form as an override', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_TreatsAPluralValueThatDiffersOnlyInFormAsAnOverride_Plan = Reconcile.reconcileCode({
      existing: {
        count: { message: '{count, plural, one {# item} few {# items} other {# items}}' },
      },
      liveSiteKeys: new Set(['count']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        count: { message: '{count, plural, one {# item} other {# items}}' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'count',
      classification: 'keep',
      action: 'keep',
      message: '{count, plural, one {# item} few {# items} other {# items}}',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);

    return;
  });

  it('returns an empty plan for an empty file', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ReturnsAnEmptyPlanForAnEmptyFile_Plan = Reconcile.reconcileCode({
      existing: {},
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hi' },
      },
      registry: {},
      themeDefaults: {},
      isDefaultLocale: false,
    });

    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['add'], []);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('produces no changes when re-run on reconciled content', () => {
    const firstPlan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ProducesNoChangesWhenReRunOnReconciledContent_FirstPlan = Reconcile.reconcileCode({
      existing: {
        'over': { message: 'Custom' },
        'redun': { message: 'Same' },
        'theme.x': { message: 'DefVal' },
      },
      liveSiteKeys: new Set([
        'over',
        'redun',
        'fresh',
      ]),
      themeLiveKeys: new Set(['theme.x']),
      siteExtract: {
        over: { message: 'Src' },
        redun: { message: 'Same' },
        fresh: { message: 'New' },
      },
      registry: {
        'theme.x': 'DefVal',
      },
      themeDefaults: {},
      isDefaultLocale: true,
    });

    const secondPlan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_ProducesNoChangesWhenReRunOnReconciledContent_SecondPlan = Reconcile.reconcileCode({
      existing: firstPlan['content'],
      liveSiteKeys: new Set([
        'over',
        'redun',
        'fresh',
      ]),
      themeLiveKeys: new Set(['theme.x']),
      siteExtract: {
        over: { message: 'Src' },
        redun: { message: 'Same' },
        fresh: { message: 'New' },
      },
      registry: {
        'theme.x': 'DefVal',
      },
      themeDefaults: {},
      isDefaultLocale: true,
    });

    deepStrictEqual(secondPlan['dropRedundant'], []);
    deepStrictEqual(secondPlan['add'], []);
    deepStrictEqual(secondPlan['orphan'], []);
    deepStrictEqual(secondPlan['content'], firstPlan['content']);

    return;
  });

  it('drops a redundant theme copy in the default locale using the extracted source default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_DropsARedundantThemeCopyInTheDefaultLocaleUsingTheExtractedSourceDefault_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.common.skipToMainContent': { message: 'Skip to main content' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set(['theme.common.skipToMainContent']),
      siteExtract: {},
      registry: {},
      themeDefaults: {
        'theme.common.skipToMainContent': 'Skip to main content',
      },
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['dropRedundant'], [{
      key: 'theme.common.skipToMainContent',
      classification: 'redundant-live',
      action: 'drop',
      message: 'Skip to main content',
      description: undefined,
    }]);
    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('keeps a theme override in the default locale that differs from the extracted source default', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileCode_KeepsAThemeOverrideInTheDefaultLocaleThatDiffersFromTheExtractedSourceDefault_Plan = Reconcile.reconcileCode({
      existing: {
        'theme.common.skipToMainContent': { message: 'Skip to content' },
      },
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set(['theme.common.skipToMainContent']),
      siteExtract: {},
      registry: {},
      themeDefaults: {
        'theme.common.skipToMainContent': 'Skip to main content',
      },
      isDefaultLocale: true,
    });

    deepStrictEqual(plan['keep'], [{
      key: 'theme.common.skipToMainContent',
      classification: 'keep',
      action: 'keep',
      message: 'Skip to content',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['orphan'], []);
    deepStrictEqual(plan['content'], {
      'theme.common.skipToMainContent': { message: 'Skip to content' },
    });

    return;
  });

  return;
});

/**
 * Tests - Lib - I18n - Reconcile - Reconcile Area.
 *
 * @since 0.21.0
 */
describe('Reconcile.reconcileArea', () => {
  it('keeps an area key override that differs from the source', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_KeepsAnAreaKeyOverrideThatDiffersFromTheSource_Plan = Reconcile.reconcileArea({
      existing: {
        'item.0.label': { message: 'Inicio' },
      },
      live: {
        'item.0.label': { message: 'Home' },
      },
      isDefaultLocale: false,
      path: 'navbar',
    });

    strictEqual(plan['scope'], 'docusaurus-theme-nova/navbar');
    deepStrictEqual(plan['keep'], [{
      key: 'item.0.label',
      classification: 'keep',
      action: 'keep',
      message: 'Inicio',
      description: undefined,
    }]);
    deepStrictEqual(plan['content'], {
      'item.0.label': { message: 'Inicio' },
    });

    return;
  });

  it('drops a redundant area copy in a non-default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_DropsARedundantAreaCopyInANonDefaultLocale_Plan = Reconcile.reconcileArea({
      existing: {
        'item.0.label': { message: 'Home' },
      },
      live: {
        'item.0.label': { message: 'Home' },
      },
      isDefaultLocale: false,
      path: 'navbar',
    });

    deepStrictEqual(plan['dropRedundant'], [{
      key: 'item.0.label',
      classification: 'redundant-live',
      action: 'drop',
      message: 'Home',
      description: undefined,
    }]);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('keeps a redundant area copy in the default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_KeepsARedundantAreaCopyInTheDefaultLocale_Plan = Reconcile.reconcileArea({
      existing: {
        'item.0.label': { message: 'Home' },
      },
      live: {
        'item.0.label': { message: 'Home' },
      },
      isDefaultLocale: true,
      path: 'navbar',
    });

    deepStrictEqual(plan['keep'], [{
      key: 'item.0.label',
      classification: 'redundant-live',
      action: 'keep',
      message: 'Home',
      description: undefined,
    }]);
    deepStrictEqual(plan['dropRedundant'], []);
    deepStrictEqual(plan['content'], {
      'item.0.label': { message: 'Home' },
    });

    return;
  });

  it('seeds a missing area key in the default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_SeedsAMissingAreaKeyInTheDefaultLocale_Plan = Reconcile.reconcileArea({
      existing: {},
      live: {
        'item.0.label': {
          message: 'Home',
          description: 'Label of navbar item 1',
        },
      },
      isDefaultLocale: true,
      path: 'navbar',
    });

    deepStrictEqual(plan['add'], [{
      key: 'item.0.label',
      classification: 'seed',
      action: 'seed',
      message: 'Home',
      description: 'Label of navbar item 1',
    }]);
    deepStrictEqual(plan['content'], {
      'item.0.label': {
        message: 'Home',
        description: 'Label of navbar item 1',
      },
    });

    return;
  });

  it('does not seed a missing area key in a non-default locale', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_DoesNotSeedAMissingAreaKeyInANonDefaultLocale_Plan = Reconcile.reconcileArea({
      existing: {},
      live: {
        'item.0.label': { message: 'Home' },
      },
      isDefaultLocale: false,
      path: 'navbar',
    });

    deepStrictEqual(plan['add'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('flags a removed area key as an orphan', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_FlagsARemovedAreaKeyAsAnOrphan_Plan = Reconcile.reconcileArea({
      existing: {
        'item.5.label': { message: 'Translated' },
      },
      live: {
        'item.0.label': { message: 'Home' },
      },
      isDefaultLocale: false,
      path: 'navbar',
    });

    deepStrictEqual(plan['orphan'], [{
      key: 'item.5.label',
      classification: 'orphan',
      action: 'gate',
      message: 'Translated',
      description: undefined,
    }]);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('empties the content when every area key drops', () => {
    const plan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_EmptiesTheContentWhenEveryAreaKeyDrops_Plan = Reconcile.reconcileArea({
      existing: {
        'item.0.label': { message: 'Home' },
        'item.1.label': { message: 'Blog' },
      },
      live: {
        'item.0.label': { message: 'Home' },
        'item.1.label': { message: 'Blog' },
      },
      isDefaultLocale: false,
      path: 'footer',
    });

    strictEqual(plan['dropRedundant'].length, 2);
    deepStrictEqual(plan['keep'], []);
    deepStrictEqual(plan['content'], {});

    return;
  });

  it('produces no changes when re-run on reconciled content', () => {
    const firstPlan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_ProducesNoChangesWhenReRunOnReconciledContent_FirstPlan = Reconcile.reconcileArea({
      existing: {
        'item.0.label': { message: 'Inicio' },
        'item.1.label': { message: 'Blog' },
      },
      live: {
        'item.0.label': { message: 'Home' },
        'item.1.label': { message: 'Blog' },
        'item.2.label': {
          message: 'Docs',
          description: 'Label of navbar item 3',
        },
      },
      isDefaultLocale: true,
      path: 'navbar',
    });

    const secondPlan: Tests_Lib_I18n_Reconcile_ReconcileReconcileArea_ProducesNoChangesWhenReRunOnReconciledContent_SecondPlan = Reconcile.reconcileArea({
      existing: firstPlan['content'],
      live: {
        'item.0.label': { message: 'Home' },
        'item.1.label': { message: 'Blog' },
        'item.2.label': {
          message: 'Docs',
          description: 'Label of navbar item 3',
        },
      },
      isDefaultLocale: true,
      path: 'navbar',
    });

    deepStrictEqual(secondPlan['dropRedundant'], []);
    deepStrictEqual(secondPlan['add'], []);
    deepStrictEqual(secondPlan['orphan'], []);
    deepStrictEqual(secondPlan['content'], firstPlan['content']);

    return;
  });

  return;
});
