import type {
  Lib_I18n_Coverage_Runner_Combine_ContentByLocale,
  Lib_I18n_Coverage_Runner_Combine_ContentPresent,
  Lib_I18n_Coverage_Runner_Combine_ContentReport,
  Lib_I18n_Coverage_Runner_Combine_ContentTotal,
  Lib_I18n_Coverage_Runner_Combine_CoveredUnits,
  Lib_I18n_Coverage_Runner_Combine_Input,
  Lib_I18n_Coverage_Runner_Combine_JsonTotal,
  Lib_I18n_Coverage_Runner_Combine_Locales,
  Lib_I18n_Coverage_Runner_Combine_MissingContent,
  Lib_I18n_Coverage_Runner_Combine_Percent,
  Lib_I18n_Coverage_Runner_Combine_Returns,
  Lib_I18n_Coverage_Runner_Combine_TotalUnits,
  Lib_I18n_Coverage_Runner_ComputeContent_Input,
  Lib_I18n_Coverage_Runner_ComputeContent_Locales,
  Lib_I18n_Coverage_Runner_ComputeContent_Missing,
  Lib_I18n_Coverage_Runner_ComputeContent_PerLocale,
  Lib_I18n_Coverage_Runner_ComputeContent_Returns,
  Lib_I18n_Coverage_Runner_ComputeContent_Sources,
  Lib_I18n_Coverage_Runner_ComputeContent_SourceSet,
  Lib_I18n_Coverage_Runner_ComputeJson_DefiniteGaps,
  Lib_I18n_Coverage_Runner_ComputeJson_Input,
  Lib_I18n_Coverage_Runner_ComputeJson_Locales,
  Lib_I18n_Coverage_Runner_ComputeJson_PerLocale,
  Lib_I18n_Coverage_Runner_ComputeJson_Returns,
  Lib_I18n_Coverage_Runner_ComputeJson_SoftGaps,
  Lib_I18n_Coverage_Runner_ComputeJson_UnionTranslated,
  Lib_I18n_Coverage_Runner_ComputeJson_Universe,
  Lib_I18n_Coverage_Runner_Percent_Covered,
  Lib_I18n_Coverage_Runner_Percent_Returns,
  Lib_I18n_Coverage_Runner_Percent_Total,
} from '../../types/lib/i18n/coverage.d.ts';

/**
 * Lib - I18n - Coverage.
 *
 * Turns a reconciliation plan and a content scan into per-locale translation
 * coverage: the share of translatable strings each locale overrides, with gaps
 * split into definite (translated elsewhere) and soft (English everywhere).
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Coverage - Compute JSON.
   *
   * Scores each locale against the union of keys that any locale translates, so
   * tokens left English in every locale never count against coverage.
   *
   * @param {Lib_I18n_Coverage_Runner_ComputeJson_Input} input - Input.
   *
   * @returns {Lib_I18n_Coverage_Runner_ComputeJson_Returns}
   *
   * @since 0.21.0
   */
  public static computeJson(input: Lib_I18n_Coverage_Runner_ComputeJson_Input): Lib_I18n_Coverage_Runner_ComputeJson_Returns {
    const universe: Lib_I18n_Coverage_Runner_ComputeJson_Universe = input['universe'];
    const perLocale: Lib_I18n_Coverage_Runner_ComputeJson_PerLocale = input['perLocale'];
    const unionTranslated: Lib_I18n_Coverage_Runner_ComputeJson_UnionTranslated = new Set();

    // The translatable set is every key at least one non-default locale
    // overrides; a key equal to English everywhere is presumed intentional.
    for (const entry of perLocale) {
      if (entry['isDefaultLocale'] === true) {
        continue;
      }

      for (const key of entry['translated']) {
        unionTranslated.add(key);
      }
    }

    const locales: Lib_I18n_Coverage_Runner_ComputeJson_Locales = [];

    for (const entry of perLocale) {
      // The default locale is the source of truth, so it is fully covered by
      // definition and carries no gaps to translate.
      if (entry['isDefaultLocale'] === true) {
        locales.push({
          locale: entry['locale'],
          isDefaultLocale: true,
          translated: universe.size,
          definiteGaps: [],
          softGaps: [],
        });

        continue;
      }

      // Definite gaps are translated somewhere but fall back to English here;
      // soft gaps are English in every locale (brand or technical tokens).
      const definiteGaps: Lib_I18n_Coverage_Runner_ComputeJson_DefiniteGaps = [...unionTranslated].filter((key) => entry['translated'].has(key) === false).sort();
      const softGaps: Lib_I18n_Coverage_Runner_ComputeJson_SoftGaps = [...universe].filter((key) => unionTranslated.has(key) === false && entry['translated'].has(key) === false).sort();

      locales.push({
        locale: entry['locale'],
        isDefaultLocale: false,
        translated: entry['translated'].size,
        definiteGaps,
        softGaps,
      });
    }

    return {
      universeSize: universe.size,
      unionSize: unionTranslated.size,
      locales,
    };
  }

  /**
   * Lib - I18n - Coverage - Compute Content.
   *
   * Scores each locale by how many source content files carry a translated copy,
   * treating the default locale as fully present since it is the source.
   *
   * @param {Lib_I18n_Coverage_Runner_ComputeContent_Input} input - Input.
   *
   * @returns {Lib_I18n_Coverage_Runner_ComputeContent_Returns}
   *
   * @since 0.21.0
   */
  public static computeContent(input: Lib_I18n_Coverage_Runner_ComputeContent_Input): Lib_I18n_Coverage_Runner_ComputeContent_Returns {
    const sources: Lib_I18n_Coverage_Runner_ComputeContent_Sources = input['sources'];
    const perLocale: Lib_I18n_Coverage_Runner_ComputeContent_PerLocale = input['perLocale'];
    const sourceSet: Lib_I18n_Coverage_Runner_ComputeContent_SourceSet = new Set(sources);
    const locales: Lib_I18n_Coverage_Runner_ComputeContent_Locales = [];

    for (const entry of perLocale) {
      // The default locale is the content source, so every file is present.
      if (entry['isDefaultLocale'] === true) {
        locales.push({
          locale: entry['locale'],
          isDefaultLocale: true,
          present: sources.length,
          missing: [],
        });

        continue;
      }

      // A source file is missing when the locale carries no translated copy.
      const missing: Lib_I18n_Coverage_Runner_ComputeContent_Missing = sources.filter((source) => entry['present'].has(source) === false).sort();

      locales.push({
        locale: entry['locale'],
        isDefaultLocale: false,
        present: sources.length - missing.length,
        missing,
      });
    }

    return {
      total: sourceSet.size,
      locales,
    };
  }

  /**
   * Lib - I18n - Coverage - Combine.
   *
   * Merges the JSON and content scores per locale into a single headline
   * percentage over both string keys and content files.
   *
   * @param {Lib_I18n_Coverage_Runner_Combine_Input} input - Input.
   *
   * @returns {Lib_I18n_Coverage_Runner_Combine_Returns}
   *
   * @since 0.21.0
   */
  public static combine(input: Lib_I18n_Coverage_Runner_Combine_Input): Lib_I18n_Coverage_Runner_Combine_Returns {
    const jsonTotal: Lib_I18n_Coverage_Runner_Combine_JsonTotal = input['json']['universeSize'];
    const contentTotal: Lib_I18n_Coverage_Runner_Combine_ContentTotal = input['content']['total'];
    const contentByLocale: Lib_I18n_Coverage_Runner_Combine_ContentByLocale = new Map();

    for (const contentReport of input['content']['locales']) {
      contentByLocale.set(contentReport['locale'], contentReport);
    }

    const locales: Lib_I18n_Coverage_Runner_Combine_Locales = [];

    for (const jsonReport of input['json']['locales']) {
      const contentReport: Lib_I18n_Coverage_Runner_Combine_ContentReport = contentByLocale.get(jsonReport['locale']);
      const contentPresent: Lib_I18n_Coverage_Runner_Combine_ContentPresent = (contentReport !== undefined) ? contentReport['present'] : 0;
      const missingContent: Lib_I18n_Coverage_Runner_Combine_MissingContent = (contentReport !== undefined) ? contentReport['missing'] : [];
      const coveredUnits: Lib_I18n_Coverage_Runner_Combine_CoveredUnits = jsonReport['translated'] + contentPresent;
      const totalUnits: Lib_I18n_Coverage_Runner_Combine_TotalUnits = jsonTotal + contentTotal;
      const percent: Lib_I18n_Coverage_Runner_Combine_Percent = Runner.percent(coveredUnits, totalUnits);

      locales.push({
        locale: jsonReport['locale'],
        isDefaultLocale: jsonReport['isDefaultLocale'],
        percent,
        jsonTranslated: jsonReport['translated'],
        jsonTotal,
        contentPresent,
        contentTotal,
        definiteGaps: jsonReport['definiteGaps'],
        softGaps: jsonReport['softGaps'],
        missingContent,
      });
    }

    return {
      locales,
    };
  }

  /**
   * Lib - I18n - Coverage - Percent.
   *
   * Returns the covered share as a whole-number percentage, treating an empty
   * universe as fully covered so a site with nothing to translate reads 100.
   *
   * @param {Lib_I18n_Coverage_Runner_Percent_Covered} covered - Covered.
   * @param {Lib_I18n_Coverage_Runner_Percent_Total}   total   - Total.
   *
   * @private
   *
   * @returns {Lib_I18n_Coverage_Runner_Percent_Returns}
   *
   * @since 0.21.0
   */
  private static percent(covered: Lib_I18n_Coverage_Runner_Percent_Covered, total: Lib_I18n_Coverage_Runner_Percent_Total): Lib_I18n_Coverage_Runner_Percent_Returns {
    if (total === 0) {
      return 100;
    }

    return Math.round((covered / total) * 100);
  }
}
