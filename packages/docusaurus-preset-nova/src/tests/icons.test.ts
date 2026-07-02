import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { describe, it } from 'vitest';

import { iconBaseSet } from '../plugins/icons/base-set.js';
import { generateIconModule } from '../plugins/icons/generate.js';

import type {
  Tests_Icons_CreateFixtureSite_Directory,
  Tests_Icons_CreateFixtureSite_FilePath,
  Tests_Icons_CreateFixtureSite_Files,
  Tests_Icons_CreateFixtureSite_Returns,
  Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Registered,
  Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_SiteDir,
  Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Source,
  Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Registered,
  Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_SiteDir,
  Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Source,
  Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Registered,
  Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_SiteDir,
  Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Source,
  Tests_Icons_ParseRegisteredIdentifiers_AddCollectionPrefix,
  Tests_Icons_ParseRegisteredIdentifiers_AddCollectionSuffix,
  Tests_Icons_ParseRegisteredIdentifiers_Aliases,
  Tests_Icons_ParseRegisteredIdentifiers_AliasNames,
  Tests_Icons_ParseRegisteredIdentifiers_Collection,
  Tests_Icons_ParseRegisteredIdentifiers_IconNames,
  Tests_Icons_ParseRegisteredIdentifiers_Identifiers,
  Tests_Icons_ParseRegisteredIdentifiers_Json,
  Tests_Icons_ParseRegisteredIdentifiers_Lines,
  Tests_Icons_ParseRegisteredIdentifiers_Prefix,
  Tests_Icons_ParseRegisteredIdentifiers_Returns,
  Tests_Icons_ParseRegisteredIdentifiers_Source,
} from '../types/tests/icons.test.d.ts';

/**
 * Tests - Icons - Create Fixture Site.
 *
 * Builds a throwaway site directory on disk seeded with the given files so the
 * icon scan can be exercised against real content.
 *
 * @param {Tests_Icons_CreateFixtureSite_Files} files - Files.
 *
 * @returns {Tests_Icons_CreateFixtureSite_Returns}
 *
 * @since 0.19.0
 */
function createFixtureSite(files: Tests_Icons_CreateFixtureSite_Files): Tests_Icons_CreateFixtureSite_Returns {
  const directory: Tests_Icons_CreateFixtureSite_Directory = mkdtempSync(join(tmpdir(), 'nova-icons-'));

  for (const file of files) {
    const filePath: Tests_Icons_CreateFixtureSite_FilePath = join(directory, file['path']);

    mkdirSync(dirname(filePath), { recursive: true });

    writeFileSync(filePath, file['content'], 'utf-8');
  }

  return directory;
}

/**
 * Tests - Icons - Parse Registered Identifiers.
 *
 * Parses the generated module source and returns every `prefix:name`
 * identifier it registers, covering both direct icons and aliases.
 *
 * @param {Tests_Icons_ParseRegisteredIdentifiers_Source} source - Source.
 *
 * @returns {Tests_Icons_ParseRegisteredIdentifiers_Returns}
 *
 * @since 0.19.0
 */
function parseRegisteredIdentifiers(source: Tests_Icons_ParseRegisteredIdentifiers_Source): Tests_Icons_ParseRegisteredIdentifiers_Returns {
  const addCollectionPrefix: Tests_Icons_ParseRegisteredIdentifiers_AddCollectionPrefix = 'addCollection(';
  const addCollectionSuffix: Tests_Icons_ParseRegisteredIdentifiers_AddCollectionSuffix = ');';
  const identifiers: Tests_Icons_ParseRegisteredIdentifiers_Identifiers = [];
  const lines: Tests_Icons_ParseRegisteredIdentifiers_Lines = source.split('\n');

  for (const line of lines) {
    if (line.startsWith(addCollectionPrefix) === false) {
      continue;
    }

    const json: Tests_Icons_ParseRegisteredIdentifiers_Json = line.slice(addCollectionPrefix.length, line.length - addCollectionSuffix.length);
    const collection: Tests_Icons_ParseRegisteredIdentifiers_Collection = JSON.parse(json) as Tests_Icons_ParseRegisteredIdentifiers_Collection;
    const prefix: Tests_Icons_ParseRegisteredIdentifiers_Prefix = collection['prefix'];
    const iconNames: Tests_Icons_ParseRegisteredIdentifiers_IconNames = Object.keys(collection['icons']);

    for (const name of iconNames) {
      identifiers.push(`${prefix}:${name}`);
    }

    const aliases: Tests_Icons_ParseRegisteredIdentifiers_Aliases = collection['aliases'];

    if (aliases !== undefined) {
      const aliasNames: Tests_Icons_ParseRegisteredIdentifiers_AliasNames = Object.keys(aliases);

      for (const name of aliasNames) {
        identifiers.push(`${prefix}:${name}`);
      }
    }
  }

  return identifiers;
}

/**
 * Tests - Icons - Generate Icon Module.
 *
 * @since 0.19.0
 */
describe('generateIconModule', async () => {
  it('registers the entire preset base set', () => {
    const siteDir: Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_SiteDir = createFixtureSite([]);
    const source: Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Source = generateIconModule({
      siteDir,
      themeConfig: {},
      safelist: [],
    });
    const registered: Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Registered = parseRegisteredIdentifiers(source);

    for (const identifier of iconBaseSet) {
      ok(registered.includes(identifier), `expected base icon ${identifier} to be registered`);
    }

    rmSync(siteDir, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('discovers icons from content, theme config, and the safelist', () => {
    const siteDir: Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_SiteDir = createFixtureSite([{
      path: 'docs/sample.mdx',
      content: '<Icon icon="mdi:rocket-launch" />',
    }]);
    const source: Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Source = generateIconModule({
      siteDir,
      themeConfig: {
        navbar: {
          items: [{
            icon: 'logos:react',
          }],
        },
      },
      safelist: ['openmoji:rocket'],
    });
    const registered: Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Registered = parseRegisteredIdentifiers(source);

    ok(registered.includes('mdi:rocket-launch'), 'expected content icon to be registered');
    ok(registered.includes('logos:react'), 'expected theme config icon to be registered');
    ok(registered.includes('openmoji:rocket'), 'expected safelist icon to be registered');

    rmSync(siteDir, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('skips unresolved names and ignores non-collection prefixes', () => {
    const siteDir: Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_SiteDir = createFixtureSite([{
      path: 'docs/sample.mdx',
      content: 'valid mdi:home and bogus mdi:zzfakeiconzz plus node:fs and og:image',
    }]);
    const source: Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Source = generateIconModule({
      siteDir,
      themeConfig: {},
      safelist: [],
    });
    const registered: Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Registered = parseRegisteredIdentifiers(source);

    ok(registered.includes('mdi:home'), 'expected the valid icon to be registered');
    strictEqual(registered.includes('mdi:zzfakeiconzz'), false);
    strictEqual(registered.includes('node:fs'), false);
    strictEqual(registered.includes('og:image'), false);

    rmSync(siteDir, {
      recursive: true,
      force: true,
    });

    return;
  });

  return;
});
