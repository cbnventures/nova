import { strictEqual } from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import type {
  Tests_TranslationPlurals_ReadMessageBundle_FilePath,
  Tests_TranslationPlurals_ReadMessageBundle_Raw,
  Tests_TranslationPlurals_ReadMessageBundle_Returns,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CommonMessages,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CommonPath,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CurrentFileDirectory,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Entry,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_FormCount,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_LocaleEntries,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Locales,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_LocalesRoot,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MaximumForms,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MergedMessages,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Message,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MessageKey,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_NovaMessages,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_NovaPath,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_PackageDirectory,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_UpstreamLocale,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_UpstreamLocalesRoot,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Violations,
  Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_ViolationsMessage,
} from '../types/tests/translation-plurals.test.d.ts';

/**
 * Tests - Translation Plurals - Read Message Bundle.
 *
 * Reads a Docusaurus translation JSON file as a flat message map.
 *
 * @since 0.27.0
 */
function readMessageBundle(filePath: Tests_TranslationPlurals_ReadMessageBundle_FilePath): Tests_TranslationPlurals_ReadMessageBundle_Returns {
  const raw: Tests_TranslationPlurals_ReadMessageBundle_Raw = readFileSync(filePath, 'utf-8');

  return JSON.parse(raw) as Tests_TranslationPlurals_ReadMessageBundle_Returns;
}

/**
 * Tests - Translation Plurals - Translation Plurals.
 *
 * Verifies every plural message after Nova's translation bundle overrides the
 * Docusaurus common bundle. Docusaurus logs a runtime warning when a message
 * supplies more pipe-delimited forms than `Intl.PluralRules` supports.
 *
 * @since 0.27.0
 */
describe('translation plurals', () => {
  it('every merged plural message fits its locale', () => {
    const currentFileDirectory: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CurrentFileDirectory = dirname(fileURLToPath(import.meta.url));
    const packageDirectory: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_PackageDirectory = resolve(currentFileDirectory, '../..');
    const localesRoot: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_LocalesRoot = resolve(packageDirectory, 'translations/locales');
    const upstreamLocalesRoot: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_UpstreamLocalesRoot = resolve(packageDirectory, '../../node_modules/@docusaurus/theme-translations/locales');
    const localeEntries: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_LocaleEntries = readdirSync(localesRoot, { withFileTypes: true });
    const locales: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Locales = localeEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    const violations: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Violations = [];

    for (const locale of locales) {
      const upstreamLocale: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_UpstreamLocale = (locale === 'en') ? 'base' : locale;
      const commonPath: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CommonPath = resolve(upstreamLocalesRoot, upstreamLocale, 'theme-common.json');
      const novaPath: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_NovaPath = resolve(localesRoot, locale, 'theme-nova.json');
      const commonMessages: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_CommonMessages = readMessageBundle(commonPath);
      const novaMessages: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_NovaMessages = readMessageBundle(novaPath);
      const mergedMessages: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MergedMessages = {
        ...commonMessages,
        ...novaMessages,
      };
      const maximumForms: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MaximumForms = new Intl.PluralRules(locale).resolvedOptions().pluralCategories.length;

      for (const messageEntry of Object.entries(mergedMessages)) {
        const entry: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Entry = messageEntry;
        const messageKey: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_MessageKey = entry[0];
        const message: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_Message = entry[1];

        if (messageKey.endsWith('.plurals') === false) {
          continue;
        }

        const formCount: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_FormCount = message.split('|').length;

        if (formCount > maximumForms) {
          violations.push(`${locale}: ${messageKey} has ${formCount} forms; expected at most ${maximumForms}`);
        }
      }
    }

    const violationsMessage: Tests_TranslationPlurals_TranslationPlurals_EveryMergedPluralMessageFitsItsLocale_ViolationsMessage = [
      'Plural translation form mismatches:',
      ...violations,
    ].join('\n');

    strictEqual(violations.length, 0, violationsMessage);

    return;
  });

  return;
});
