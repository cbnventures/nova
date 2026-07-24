import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  describe,
  it,
} from 'vitest';

import { Runner as ApplyPlan } from '../../../lib/i18n/apply-plan.js';
import { Runner as Prompt } from '../../../lib/i18n/prompt.js';

import type {
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Raw,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Result,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Confirm,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Exists,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Result,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Confirm,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Exists,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Result,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Confirm,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Parsed,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Raw,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_CodePath,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Exists,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Result,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Raw,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Dir,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Raw,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Result,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanBuild_ReconcilesCodeAndAreaFilesForALocale_Plan,
  Tests_Lib_I18n_ApplyPlan_ApplyPlanBuild_ReconcilesCodeAndAreaFilesForALocale_Scopes,
} from '../../../types/tests/lib/i18n/apply-plan.test.d.ts';

/**
 * Tests - Lib - I18n - Apply Plan - Build.
 *
 * @since 0.21.0
 */
describe('ApplyPlan.build', () => {
  it('reconciles code and area files for a locale', () => {
    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanBuild_ReconcilesCodeAndAreaFilesForALocale_Plan = ApplyPlan.build({
      siteDir: '/site',
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: '/site/i18n/en',
        isDefaultLocale: true,
        registry: {},
        areaFiles: [{
          path: 'navbar',
          content: {
            'item.0.label': { message: 'Home' },
          },
        }],
        existingCode: {},
        existingArea: new Map(),
      }],
    });

    const scopes: Tests_Lib_I18n_ApplyPlan_ApplyPlanBuild_ReconcilesCodeAndAreaFilesForALocale_Scopes = plan['locales'].flatMap((localePlan) => localePlan['files'].map((file) => file['scope']));

    strictEqual(plan['locales'].length, 1);
    deepStrictEqual(scopes, [
      'code.json',
      'docusaurus-theme-nova/navbar',
    ]);

    return;
  });

  return;
});

/**
 * Tests - Lib - I18n - Apply Plan - Apply.
 *
 * @since 0.21.0
 */
describe('ApplyPlan.apply', () => {
  it('writes reconciled content with two-space indent and trailing newline', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set(['theme.foo']),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: join(dir, 'en'),
        isDefaultLocale: true,
        registry: {
          'theme.foo': 'Bar',
        },
        areaFiles: [],
        existingCode: {
          'greeting': { message: 'Hello' },
          'theme.foo': { message: 'Bar' },
        },
        existingArea: new Map(),
      }],
    });
    const result: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: false,
      confirm: Prompt['confirmBatch'],
    });
    const raw: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_WritesReconciledContentWithTwoSpaceIndentAndTrailingNewline_Raw = await readFile(join(dir, 'en', 'code.json'), 'utf8');

    strictEqual(result['written'].length, 1);
    strictEqual(raw, `${JSON.stringify({ greeting: { message: 'Hello' } }, null, 2)}\n`);

    return;
  });

  it('skips all writes on a dry run', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    await mkdir(join(dir, 'en'), { recursive: true });

    await writeFile(join(dir, 'en', 'code.json'), 'original');

    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: join(dir, 'en'),
        isDefaultLocale: true,
        registry: {},
        areaFiles: [],
        existingCode: {},
        existingArea: new Map(),
      }],
    });

    await ApplyPlan.apply(plan, {
      dryRun: true,
      deleteDefunct: false,
      interactive: false,
      confirm: Prompt['confirmBatch'],
    });

    const raw: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_SkipsAllWritesOnADryRun_Raw = await readFile(join(dir, 'en', 'code.json'), 'utf8');

    strictEqual(raw, 'original');

    return;
  });

  it('removes a file that empties out', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_CodePath = join(dir, 'es', 'code.json');

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, '{}');

    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['es'],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'es',
        localizationDir: join(dir, 'es'),
        isDefaultLocale: false,
        registry: {},
        areaFiles: [],
        existingCode: {
          greeting: { message: 'Hello' },
        },
        existingArea: new Map(),
      }],
    });
    const result: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: false,
      confirm: Prompt['confirmBatch'],
    });

    let exists: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_RemovesAFileThatEmptiesOut_Exists = true;

    try {
      await stat(codePath);
    } catch {
      exists = false;
    }

    strictEqual(result['removed'].length, 1);
    strictEqual(exists, false);

    return;
  });

  it('blocks a non-interactive orphan run and writes nothing', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_CodePath = join(dir, 'es', 'code.json');

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['es'],
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      themeDefaults: {},
      perLocale: [{
        locale: 'es',
        localizationDir: join(dir, 'es'),
        isDefaultLocale: false,
        registry: {},
        areaFiles: [],
        existingCode: {
          'old.key': { message: 'Translated' },
        },
        existingArea: new Map(),
      }],
    });
    const result: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: false,
      confirm: Prompt['confirmBatch'],
    });
    const raw: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_BlocksANonInteractiveOrphanRunAndWritesNothing_Raw = await readFile(codePath, 'utf8');

    strictEqual(result['blocked'], true);
    strictEqual(result['written'].length, 0);
    strictEqual(raw, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    return;
  });

  it('deletes orphans when delete-defunct is set', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_CodePath = join(dir, 'es', 'code.json');

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['es'],
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      themeDefaults: {},
      perLocale: [{
        locale: 'es',
        localizationDir: join(dir, 'es'),
        isDefaultLocale: false,
        registry: {},
        areaFiles: [],
        existingCode: {
          'old.key': { message: 'Translated' },
        },
        existingArea: new Map(),
      }],
    });
    const result: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansWhenDeleteDefunctIsSet_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: true,
      interactive: false,
      confirm: Prompt['confirmBatch'],
    });

    strictEqual(result['blocked'], false);
    strictEqual(result['removed'].length, 1);

    return;
  });

  it('keeps orphans on an interactive decline', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_CodePath = join(dir, 'es', 'code.json');
    const confirm: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Confirm = async () => 'decline';
    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['es'],
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      themeDefaults: {},
      perLocale: [{
        locale: 'es',
        localizationDir: join(dir, 'es'),
        isDefaultLocale: false,
        registry: {},
        areaFiles: [],
        existingCode: {
          'old.key': { message: 'Translated' },
        },
        existingArea: new Map(),
      }],
    });

    await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: true,
      confirm,
    });

    const raw: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Raw = await readFile(codePath, 'utf8');
    const parsed: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_KeepsOrphansOnAnInteractiveDecline_Parsed = JSON.parse(raw);

    deepStrictEqual(parsed, {
      'old.key': { message: 'Translated' },
    });

    return;
  });

  it('deletes orphans on an interactive confirm', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_CodePath = join(dir, 'es', 'code.json');
    const confirm: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Confirm = async () => 'confirm';

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['es'],
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set<string>(),
      siteExtract: {},
      themeDefaults: {},
      perLocale: [{
        locale: 'es',
        localizationDir: join(dir, 'es'),
        isDefaultLocale: false,
        registry: {},
        areaFiles: [],
        existingCode: {
          'old.key': { message: 'Translated' },
        },
        existingArea: new Map(),
      }],
    });

    await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: true,
      confirm,
    });

    let exists: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_DeletesOrphansOnAnInteractiveConfirm_Exists = true;

    try {
      await stat(codePath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('cancels the entire run without writing', async () => {
    const dir: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_CodePath = join(dir, 'en', 'code.json');
    const confirm: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Confirm = async () => 'cancel';
    const plan: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Plan = ApplyPlan.build({
      siteDir: dir,
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set(['fresh']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        fresh: { message: 'New' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: join(dir, 'en'),
        isDefaultLocale: true,
        registry: {},
        areaFiles: [],
        existingCode: {
          'old.key': { message: 'Translated' },
        },
        existingArea: new Map(),
      }],
    });
    const result: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Result = await ApplyPlan.apply(plan, {
      dryRun: false,
      deleteDefunct: false,
      interactive: true,
      confirm,
    });

    let exists: Tests_Lib_I18n_ApplyPlan_ApplyPlanApply_CancelsTheEntireRunWithoutWriting_Exists = true;

    try {
      await stat(codePath);
    } catch {
      exists = false;
    }

    strictEqual(result['cancelled'], true);
    strictEqual(result['written'].length, 0);
    strictEqual(exists, false);

    return;
  });

  return;
});
