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
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as Sync } from '../../../cli/i18n/sync.js';
import { Runner as SiteContext } from '../../../lib/i18n/site-context.js';

import type {
  Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_CodePath,
  Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Dir,
  Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Exists,
  Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_CodePath,
  Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Dir,
  Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Raw,
  Tests_Cli_I18n_Sync_SyncRun_ExitsWithCodeTwoWhenTheSiteCannotBeLoaded_Message,
  Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Dir,
  Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Raw,
  Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Dir,
  Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Parsed,
  Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Raw,
} from '../../../types/tests/cli/i18n/sync.test.d.ts';

vi.mock('../../../lib/i18n/site-context.js', () => {
  return {
    Runner: {
      gather: vi.fn(),
    },
  };
});

/**
 * Tests - CLI - I18n - Sync - Run.
 *
 * @since 0.21.0
 */
describe('Sync.run', () => {
  beforeEach(() => {
    vi.mocked(SiteContext['gather']).mockReset();

    return;
  });

  it('writes the reconciled tree and exits zero', async () => {
    const dir: Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    vi.mocked(SiteContext['gather']).mockResolvedValue({
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

    await Sync.run({});

    const raw: Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Raw = await readFile(join(dir, 'en', 'code.json'), 'utf8');
    const parsed: Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Parsed = JSON.parse(raw);

    deepStrictEqual(parsed, {
      greeting: { message: 'Hello' },
    });
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('writes nothing during a dry run', async () => {
    const dir: Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));

    await mkdir(join(dir, 'en'), { recursive: true });

    await writeFile(join(dir, 'en', 'code.json'), 'original');

    vi.mocked(SiteContext['gather']).mockResolvedValue({
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

    await Sync.run({ dryRun: true });

    const raw: Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Raw = await readFile(join(dir, 'en', 'code.json'), 'utf8');

    strictEqual(raw, 'original');

    return;
  });

  it('exits non-zero and writes nothing when orphans block a non-interactive run', async () => {
    const dir: Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_CodePath = join(dir, 'es', 'code.json');

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    vi.mocked(SiteContext['gather']).mockResolvedValue({
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

    await Sync.run({});

    const raw: Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Raw = await readFile(codePath, 'utf8');

    strictEqual(process.exitCode, 1);
    strictEqual(raw, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    return;
  });

  it('deletes orphans when delete-defunct is set', async () => {
    const dir: Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const codePath: Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_CodePath = join(dir, 'es', 'code.json');

    await mkdir(join(dir, 'es'), { recursive: true });

    await writeFile(codePath, `${JSON.stringify({ 'old.key': { message: 'Translated' } }, null, 2)}\n`);

    vi.mocked(SiteContext['gather']).mockResolvedValue({
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

    await Sync.run({ deleteDefunct: true });

    let exists: Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Exists = true;

    try {
      await stat(codePath);
    } catch {
      exists = false;
    }

    strictEqual(process.exitCode, undefined);
    strictEqual(exists, false);

    return;
  });

  it('exits with code two when the site cannot be loaded', async () => {
    const message: Tests_Cli_I18n_Sync_SyncRun_ExitsWithCodeTwoWhenTheSiteCannotBeLoaded_Message = 'Not a Docusaurus site root.';

    vi.mocked(SiteContext['gather']).mockRejectedValue(new Error(message));

    await Sync.run({});

    strictEqual(process.exitCode, 2);

    return;
  });

  return;
});
