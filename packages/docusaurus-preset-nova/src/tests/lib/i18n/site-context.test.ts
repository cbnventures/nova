import {
  deepStrictEqual,
  rejects,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  describe,
  it,
} from 'vitest';

import { Runner as SiteContext } from '../../../lib/i18n/site-context.js';

import type {
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_AreaDir,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_Dir,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_Parsed,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_RejectsAMalformedAreaBundle_AreaDir,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_RejectsAMalformedAreaBundle_Dir,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReturnsAnEmptyObjectForAMissingAreaBundle_Dir,
  Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReturnsAnEmptyObjectForAMissingAreaBundle_Parsed,
} from '../../../types/tests/lib/i18n/site-context.test.d.ts';

/**
 * Tests - Lib - I18n - Site Context - Read Area File.
 *
 * @since 0.21.0
 */
describe('SiteContext.readAreaFile', () => {
  it('rejects a malformed area bundle', async () => {
    const dir: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_RejectsAMalformedAreaBundle_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const areaDir: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_RejectsAMalformedAreaBundle_AreaDir = join(dir, 'docusaurus-theme-nova');

    await mkdir(areaDir, { recursive: true });

    // A `message`->`msg` typo and a bare-string shorthand are both JSON-parseable
    // but violate the translation shape - the reader must fail closed like code.json.
    await writeFile(join(areaDir, 'navbar.json'), JSON.stringify({
      'item.0.label': { msg: 'Accueil' },
      'item.1.label': 'Blog-FR',
    }));

    await rejects(SiteContext.readAreaFile(dir, 'navbar'));

    return;
  });

  it('reads a well-formed area bundle', async () => {
    const dir: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const areaDir: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_AreaDir = join(dir, 'docusaurus-theme-nova');

    await mkdir(areaDir, { recursive: true });

    await writeFile(join(areaDir, 'footer.json'), JSON.stringify({
      'item.0.label': {
        message: 'Accueil',
        description: 'Label of footer item 1',
      },
    }));

    const parsed: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReadsAWellFormedAreaBundle_Parsed = await SiteContext.readAreaFile(dir, 'footer');

    deepStrictEqual(parsed, {
      'item.0.label': {
        message: 'Accueil',
        description: 'Label of footer item 1',
      },
    });

    return;
  });

  it('returns an empty object for a missing area bundle', async () => {
    const dir: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReturnsAnEmptyObjectForAMissingAreaBundle_Dir = await mkdtemp(join(tmpdir(), 'theme-nova-i18n-'));
    const parsed: Tests_Lib_I18n_SiteContext_SiteContextReadAreaFile_ReturnsAnEmptyObjectForAMissingAreaBundle_Parsed = await SiteContext.readAreaFile(dir, 'navbar');

    deepStrictEqual(parsed, {});

    return;
  });

  return;
});
