import { Logger, MarkdownTable } from '@cbnventures/nova/toolkit';
import chalk from 'chalk';

import { Runner as ApplyPlan } from '../../lib/i18n/apply-plan.js';
import { Runner as ContentScan } from '../../lib/i18n/content-scan.js';
import { Runner as Coverage } from '../../lib/i18n/coverage.js';
import { Runner as SiteContext } from '../../lib/i18n/site-context.js';

import type {
  Cli_I18n_Coverage_Runner_DeriveLocales_CodePlan,
  Cli_I18n_Coverage_Runner_DeriveLocales_Gather,
  Cli_I18n_Coverage_Runner_DeriveLocales_PerLocale,
  Cli_I18n_Coverage_Runner_DeriveLocales_Plan,
  Cli_I18n_Coverage_Runner_DeriveLocales_Returns,
  Cli_I18n_Coverage_Runner_DeriveLocales_Translated,
  Cli_I18n_Coverage_Runner_DeriveLocales_Universe,
  Cli_I18n_Coverage_Runner_FormatPercent_Label,
  Cli_I18n_Coverage_Runner_FormatPercent_Percent,
  Cli_I18n_Coverage_Runner_FormatPercent_Returns,
  Cli_I18n_Coverage_Runner_Render_ContentCell,
  Cli_I18n_Coverage_Runner_Render_CoverageCell,
  Cli_I18n_Coverage_Runner_Render_EnglishOnly,
  Cli_I18n_Coverage_Runner_Render_LocaleLabel,
  Cli_I18n_Coverage_Runner_Render_Locales,
  Cli_I18n_Coverage_Runner_Render_Returns,
  Cli_I18n_Coverage_Runner_Render_ShowGaps,
  Cli_I18n_Coverage_Runner_Render_Sorted,
  Cli_I18n_Coverage_Runner_Render_StringsCell,
  Cli_I18n_Coverage_Runner_Render_Table,
  Cli_I18n_Coverage_Runner_Render_ToTranslate,
  Cli_I18n_Coverage_Runner_Run_Below,
  Cli_I18n_Coverage_Runner_Run_Gather,
  Cli_I18n_Coverage_Runner_Run_GatherError,
  Cli_I18n_Coverage_Runner_Run_Message,
  Cli_I18n_Coverage_Runner_Run_MinCoverage,
  Cli_I18n_Coverage_Runner_Run_MinCoverageRaw,
  Cli_I18n_Coverage_Runner_Run_NonDefault,
  Cli_I18n_Coverage_Runner_Run_Options,
  Cli_I18n_Coverage_Runner_Run_Parsed,
  Cli_I18n_Coverage_Runner_Run_Plan,
  Cli_I18n_Coverage_Runner_Run_ReportLocales,
  Cli_I18n_Coverage_Runner_Run_RequestedLocale,
  Cli_I18n_Coverage_Runner_Run_Returns,
  Cli_I18n_Coverage_Runner_Run_Scan,
  Cli_I18n_Coverage_Runner_Run_ScanError,
  Cli_I18n_Coverage_Runner_Run_ScanMessage,
  Cli_I18n_Coverage_Runner_Run_ShowGaps,
  Cli_I18n_Coverage_Runner_Run_Threshold,
  Cli_I18n_Coverage_Runner_Run_Universe,
} from '../../types/cli/i18n/coverage.d.ts';

/**
 * CLI - I18n - Coverage.
 *
 * Entry point for `theme-nova i18n coverage`. Reports, per configured locale,
 * the share of translatable strings and content files that carry a translation,
 * and exits non-zero when a locale falls below an optional threshold.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * CLI - I18n - Coverage - Run.
   *
   * Gathers the whole-site plan and content scan, computes per-locale coverage
   * against the global union, renders the table, and applies the gate.
   *
   * @param {Cli_I18n_Coverage_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_I18n_Coverage_Runner_Run_Returns}
   *
   * @since 0.21.0
   */
  public static async run(options: Cli_I18n_Coverage_Runner_Run_Options): Cli_I18n_Coverage_Runner_Run_Returns {
    const requestedLocale: Cli_I18n_Coverage_Runner_Run_RequestedLocale = options['locale'];
    const showGaps: Cli_I18n_Coverage_Runner_Run_ShowGaps = options['gaps'] === true;
    const minCoverageRaw: Cli_I18n_Coverage_Runner_Run_MinCoverageRaw = options['minCoverage'];

    let minCoverage: Cli_I18n_Coverage_Runner_Run_MinCoverage = undefined;

    // A supplied threshold must be a number in the inclusive 0 to 100 range.
    if (minCoverageRaw !== undefined) {
      const parsed: Cli_I18n_Coverage_Runner_Run_Parsed = Number(minCoverageRaw);

      if (
        Number.isFinite(parsed) === false
        || parsed < 0
        || parsed > 100
      ) {
        Logger.error(`Invalid --min-coverage "${minCoverageRaw}". Provide a number between 0 and 100.`);

        process.exitCode = 2;

        return;
      }

      minCoverage = parsed;
    }

    let gather: Cli_I18n_Coverage_Runner_Run_Gather = undefined;

    // Always gather every locale so the union stays global even when the report
    // is later narrowed to a single locale. A failure means an unusable site.
    try {
      gather = await SiteContext.gather({ locale: undefined });
    } catch (error) {
      const gatherError: Cli_I18n_Coverage_Runner_Run_GatherError = error;
      const message: Cli_I18n_Coverage_Runner_Run_Message = (gatherError instanceof Error) ? gatherError.message : String(gatherError);

      Logger.error(message);

      process.exitCode = 2;

      return;
    }

    const plan: Cli_I18n_Coverage_Runner_Run_Plan = ApplyPlan.build(gather);
    const universe: Cli_I18n_Coverage_Runner_Run_Universe = gather['liveSiteKeys'];

    let scan: Cli_I18n_Coverage_Runner_Run_Scan = undefined;

    try {
      scan = await ContentScan.scan({ locale: undefined });
    } catch (error) {
      const scanError: Cli_I18n_Coverage_Runner_Run_ScanError = error;
      const scanMessage: Cli_I18n_Coverage_Runner_Run_ScanMessage = (scanError instanceof Error) ? scanError.message : String(scanError);

      Logger.error(scanMessage);

      process.exitCode = 2;

      return;
    }

    // Report every locale by default, or just the requested one - still scored
    // against the full cross-locale union computed here.
    let reportLocales: Cli_I18n_Coverage_Runner_Run_ReportLocales = Coverage.combine({
      json: Coverage.computeJson({
        universe,
        perLocale: Runner.deriveLocales(gather, plan),
      }),
      content: Coverage.computeContent({
        sources: scan['sources'],
        perLocale: scan['perLocale'],
      }),
    })['locales'];

    if (requestedLocale !== undefined) {
      reportLocales = reportLocales.filter((entry) => entry['locale'] === requestedLocale);

      if (reportLocales.length === 0) {
        Logger.error(`Unknown locale "${requestedLocale}".`);

        process.exitCode = 2;

        return;
      }
    }

    Runner.render(reportLocales, showGaps);

    const nonDefault: Cli_I18n_Coverage_Runner_Run_NonDefault = reportLocales.filter((entry) => entry['isDefaultLocale'] === false);

    // Gate on the threshold when one is supplied; otherwise the report is final.
    if (minCoverage !== undefined) {
      const threshold: Cli_I18n_Coverage_Runner_Run_Threshold = minCoverage;
      const below: Cli_I18n_Coverage_Runner_Run_Below = nonDefault.filter((entry) => entry['percent'] < threshold);

      if (below.length > 0) {
        Logger.error(`${below.length} locale(s) below ${threshold}% coverage: ${below.map((entry) => `${entry['locale']} (${entry['percent']}%)`).join(', ')}. Run "theme-nova i18n coverage --gaps" to list what is missing.`);

        process.exitCode = 1;

        return;
      }

      Logger.info(`All ${nonDefault.length} locale(s) meet the ${threshold}% coverage threshold.`);

      return;
    }

    Logger.info(`Coverage computed for ${nonDefault.length} locale(s).`);

    return;
  }

  /**
   * CLI - I18n - Coverage - Derive Locales.
   *
   * Reduces the plan to the per-locale set of translated site keys, the raw
   * material the union metric scores against.
   *
   * @param {Cli_I18n_Coverage_Runner_DeriveLocales_Gather} gather - Gather.
   * @param {Cli_I18n_Coverage_Runner_DeriveLocales_Plan}   plan   - Plan.
   *
   * @private
   *
   * @returns {Cli_I18n_Coverage_Runner_DeriveLocales_Returns}
   *
   * @since 0.21.0
   */
  private static deriveLocales(gather: Cli_I18n_Coverage_Runner_DeriveLocales_Gather, plan: Cli_I18n_Coverage_Runner_DeriveLocales_Plan): Cli_I18n_Coverage_Runner_DeriveLocales_Returns {
    const universe: Cli_I18n_Coverage_Runner_DeriveLocales_Universe = gather['liveSiteKeys'];
    const perLocale: Cli_I18n_Coverage_Runner_DeriveLocales_PerLocale = [];

    for (const localePlan of plan['locales']) {
      const codePlan: Cli_I18n_Coverage_Runner_DeriveLocales_CodePlan = localePlan['files'].find((file) => file['scope'] === 'code.json');
      const translated: Cli_I18n_Coverage_Runner_DeriveLocales_Translated = new Set();

      // Only the site keys a locale genuinely overrides count as translated;
      // inherited theme chrome is resolved from the preset and excluded.
      if (codePlan !== undefined) {
        for (const entry of codePlan['keep']) {
          if (universe.has(entry['key']) === true) {
            translated.add(entry['key']);
          }
        }
      }

      perLocale.push({
        locale: localePlan['locale'],
        isDefaultLocale: localePlan['isDefaultLocale'],
        translated,
      });
    }

    return perLocale;
  }

  /**
   * CLI - I18n - Coverage - Render.
   *
   * Prints the per-locale coverage table (worst first) and, when requested,
   * lists the definite string and content gaps each locale still carries.
   *
   * @param {Cli_I18n_Coverage_Runner_Render_Locales}  locales  - Locales.
   * @param {Cli_I18n_Coverage_Runner_Render_ShowGaps} showGaps - Show gaps.
   *
   * @private
   *
   * @returns {Cli_I18n_Coverage_Runner_Render_Returns}
   *
   * @since 0.21.0
   */
  private static render(locales: Cli_I18n_Coverage_Runner_Render_Locales, showGaps: Cli_I18n_Coverage_Runner_Render_ShowGaps): Cli_I18n_Coverage_Runner_Render_Returns {
    const table: Cli_I18n_Coverage_Runner_Render_Table = new MarkdownTable([
      'Locale',
      'Coverage',
      'Strings',
      'Content',
      'To translate',
      'English-only',
    ]);

    // Sort the source locale first, then the rest by ascending coverage so the
    // locales that need the most work surface at the top.
    const sorted: Cli_I18n_Coverage_Runner_Render_Sorted = [...locales].sort((first, second) => {
      if (first['isDefaultLocale'] !== second['isDefaultLocale']) {
        return (first['isDefaultLocale'] === true) ? -1 : 1;
      }

      return first['percent'] - second['percent'];
    });

    for (const entry of sorted) {
      const localeLabel: Cli_I18n_Coverage_Runner_Render_LocaleLabel = (entry['isDefaultLocale'] === true) ? `${entry['locale']} (source)` : entry['locale'];
      const coverageCell: Cli_I18n_Coverage_Runner_Render_CoverageCell = (entry['isDefaultLocale'] === true) ? chalk.dim('--') : Runner.formatPercent(entry['percent']);
      const stringsCell: Cli_I18n_Coverage_Runner_Render_StringsCell = `${entry['jsonTranslated']}/${entry['jsonTotal']}`;
      const contentCell: Cli_I18n_Coverage_Runner_Render_ContentCell = `${entry['contentPresent']}/${entry['contentTotal']}`;
      const toTranslate: Cli_I18n_Coverage_Runner_Render_ToTranslate = (entry['isDefaultLocale'] === true) ? '0' : String(entry['definiteGaps'].length + entry['missingContent'].length);
      const englishOnly: Cli_I18n_Coverage_Runner_Render_EnglishOnly = (entry['isDefaultLocale'] === true) ? '0' : String(entry['softGaps'].length);

      table.addRow([
        localeLabel,
        coverageCell,
        stringsCell,
        contentCell,
        toTranslate,
        englishOnly,
      ]);
    }

    process.stdout.write(`${table.render()}\n\n`);

    if (showGaps === false) {
      return;
    }

    // List the actionable gaps per locale: strings translated elsewhere and
    // content files without a translated copy.
    for (const entry of sorted) {
      if (entry['isDefaultLocale'] === true) {
        continue;
      }

      if (entry['definiteGaps'].length === 0 && entry['missingContent'].length === 0) {
        continue;
      }

      for (const key of entry['definiteGaps']) {
        Logger.customize({
          name: entry['locale'],
          purpose: 'gaps',
        }).warn(`string "${key}"`);
      }

      for (const file of entry['missingContent']) {
        Logger.customize({
          name: entry['locale'],
          purpose: 'gaps',
        }).warn(`content "${file}"`);
      }
    }

    return;
  }

  /**
   * CLI - I18n - Coverage - Format Percent.
   *
   * Colors a coverage percentage green, yellow, or red by band so the table
   * reads at a glance without changing the underlying value.
   *
   * @param {Cli_I18n_Coverage_Runner_FormatPercent_Percent} percent - Percent.
   *
   * @private
   *
   * @returns {Cli_I18n_Coverage_Runner_FormatPercent_Returns}
   *
   * @since 0.21.0
   */
  private static formatPercent(percent: Cli_I18n_Coverage_Runner_FormatPercent_Percent): Cli_I18n_Coverage_Runner_FormatPercent_Returns {
    const label: Cli_I18n_Coverage_Runner_FormatPercent_Label = `${percent}%`;

    if (percent >= 90) {
      return chalk.green(label);
    }

    if (percent >= 50) {
      return chalk.yellow(label);
    }

    return chalk.red(label);
  }
}
