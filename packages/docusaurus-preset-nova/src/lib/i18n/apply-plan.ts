import { promises as fs } from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';

import { Runner as Reconcile } from './reconcile.js';

import type {
  Lib_I18n_ApplyPlan_Runner_Apply_Confirm,
  Lib_I18n_ApplyPlan_Runner_Apply_Decision,
  Lib_I18n_ApplyPlan_Runner_Apply_DeleteDefunct,
  Lib_I18n_ApplyPlan_Runner_Apply_DryRun,
  Lib_I18n_ApplyPlan_Runner_Apply_Exists,
  Lib_I18n_ApplyPlan_Runner_Apply_FilePath,
  Lib_I18n_ApplyPlan_Runner_Apply_FinalContent,
  Lib_I18n_ApplyPlan_Runner_Apply_HasOrphans,
  Lib_I18n_ApplyPlan_Runner_Apply_Interactive,
  Lib_I18n_ApplyPlan_Runner_Apply_KeepOrphans,
  Lib_I18n_ApplyPlan_Runner_Apply_Keys,
  Lib_I18n_ApplyPlan_Runner_Apply_Locales,
  Lib_I18n_ApplyPlan_Runner_Apply_Options,
  Lib_I18n_ApplyPlan_Runner_Apply_Plan,
  Lib_I18n_ApplyPlan_Runner_Apply_Removed,
  Lib_I18n_ApplyPlan_Runner_Apply_Returns,
  Lib_I18n_ApplyPlan_Runner_Apply_Written,
  Lib_I18n_ApplyPlan_Runner_Build_AreaPlan,
  Lib_I18n_ApplyPlan_Runner_Build_CodePlan,
  Lib_I18n_ApplyPlan_Runner_Build_ExistingArea,
  Lib_I18n_ApplyPlan_Runner_Build_Files,
  Lib_I18n_ApplyPlan_Runner_Build_Gather,
  Lib_I18n_ApplyPlan_Runner_Build_Locales,
  Lib_I18n_ApplyPlan_Runner_Build_Returns,
  Lib_I18n_ApplyPlan_Runner_BuildContent_Content,
  Lib_I18n_ApplyPlan_Runner_BuildContent_File,
  Lib_I18n_ApplyPlan_Runner_BuildContent_KeepOrphans,
  Lib_I18n_ApplyPlan_Runner_BuildContent_MessageEntry,
  Lib_I18n_ApplyPlan_Runner_BuildContent_Ordered,
  Lib_I18n_ApplyPlan_Runner_BuildContent_Returns,
  Lib_I18n_ApplyPlan_Runner_FileExists_FilePath,
  Lib_I18n_ApplyPlan_Runner_FileExists_Returns,
  Lib_I18n_ApplyPlan_Runner_HasDrift_Locales,
  Lib_I18n_ApplyPlan_Runner_HasDrift_Plan,
  Lib_I18n_ApplyPlan_Runner_HasDrift_Returns,
  Lib_I18n_ApplyPlan_Runner_ResolvePath_LocalizationDir,
  Lib_I18n_ApplyPlan_Runner_ResolvePath_Returns,
  Lib_I18n_ApplyPlan_Runner_ResolvePath_Scope,
} from '../../types/lib/i18n/apply-plan.d.ts';

/**
 * Lib - I18n - Apply Plan.
 *
 * Assembles a multi-locale reconciliation plan from a `GatherResult` and
 * executes it against the file system: writing kept and seeded content,
 * removing files that empty out, and gating orphan deletion.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Apply Plan - Build.
   *
   * Runs the pure reconcile engine for every locale and file (code.json plus
   * each live area bundle) and collects the results into a single plan.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_Build_Gather} gather - Gather.
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_Build_Returns}
   *
   * @since 0.21.0
   */
  public static build(gather: Lib_I18n_ApplyPlan_Runner_Build_Gather): Lib_I18n_ApplyPlan_Runner_Build_Returns {
    const locales: Lib_I18n_ApplyPlan_Runner_Build_Locales = [];

    // Reconcile every gathered locale into a locale plan.
    for (const localeState of gather['perLocale']) {
      const codePlan: Lib_I18n_ApplyPlan_Runner_Build_CodePlan = Reconcile.reconcileCode({
        existing: localeState['existingCode'],
        liveSiteKeys: gather['liveSiteKeys'],
        themeLiveKeys: gather['themeLiveKeys'],
        siteExtract: gather['siteExtract'],
        registry: localeState['registry'],
        themeDefaults: gather['themeDefaults'],
        isDefaultLocale: localeState['isDefaultLocale'],
      });
      const files: Lib_I18n_ApplyPlan_Runner_Build_Files = [codePlan];

      // Reconcile each live area bundle against its on-disk copy.
      for (const areaFile of localeState['areaFiles']) {
        const existingArea: Lib_I18n_ApplyPlan_Runner_Build_ExistingArea = localeState['existingArea'].get(areaFile['path']);
        const areaPlan: Lib_I18n_ApplyPlan_Runner_Build_AreaPlan = Reconcile.reconcileArea({
          existing: (existingArea !== undefined) ? existingArea : {},
          live: areaFile['content'],
          isDefaultLocale: localeState['isDefaultLocale'],
          path: areaFile['path'],
        });

        files.push(areaPlan);
      }

      locales.push({
        locale: localeState['locale'],
        localizationDir: localeState['localizationDir'],
        isDefaultLocale: localeState['isDefaultLocale'],
        files,
      });
    }

    return {
      siteDir: gather['siteDir'],
      locales,
    };
  }

  /**
   * Lib - I18n - Apply Plan - Has Drift.
   *
   * Returns true when any file in the plan has keys to seed, redundant copies to
   * drop, or orphans - the signal that a `check` run should fail.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_HasDrift_Plan} plan - Plan.
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_HasDrift_Returns}
   *
   * @since 0.21.0
   */
  public static hasDrift(plan: Lib_I18n_ApplyPlan_Runner_HasDrift_Plan): Lib_I18n_ApplyPlan_Runner_HasDrift_Returns {
    const locales: Lib_I18n_ApplyPlan_Runner_HasDrift_Locales = plan['locales'];

    // Any add, redundant drop, or orphan across any file counts as drift.
    for (const localePlan of locales) {
      for (const file of localePlan['files']) {
        if (
          file['add'].length > 0
          || file['dropRedundant'].length > 0
          || file['orphan'].length > 0
        ) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Lib - I18n - Apply Plan - Apply.
   *
   * Flushes the plan to disk. On a dry run it writes nothing. Orphans are gated:
   * interactive prompts decide per file, otherwise `deleteDefunct` is required or
   * the run blocks without touching any file.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_Apply_Plan}    plan    - Plan.
   * @param {Lib_I18n_ApplyPlan_Runner_Apply_Options} options - Options.
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_Apply_Returns}
   *
   * @since 0.21.0
   */
  public static async apply(plan: Lib_I18n_ApplyPlan_Runner_Apply_Plan, options: Lib_I18n_ApplyPlan_Runner_Apply_Options): Lib_I18n_ApplyPlan_Runner_Apply_Returns {
    const dryRun: Lib_I18n_ApplyPlan_Runner_Apply_DryRun = options['dryRun'];
    const deleteDefunct: Lib_I18n_ApplyPlan_Runner_Apply_DeleteDefunct = options['deleteDefunct'];
    const interactive: Lib_I18n_ApplyPlan_Runner_Apply_Interactive = options['interactive'];
    const confirm: Lib_I18n_ApplyPlan_Runner_Apply_Confirm = options['confirm'];
    const locales: Lib_I18n_ApplyPlan_Runner_Apply_Locales = plan['locales'];
    const written: Lib_I18n_ApplyPlan_Runner_Apply_Written = [];
    const removed: Lib_I18n_ApplyPlan_Runner_Apply_Removed = [];

    // A dry run computes the plan but never writes.
    if (dryRun === true) {
      return {
        written,
        removed,
        blocked: false,
        cancelled: false,
      };
    }

    const keepOrphans: Lib_I18n_ApplyPlan_Runner_Apply_KeepOrphans = new Set();

    let hasOrphans: Lib_I18n_ApplyPlan_Runner_Apply_HasOrphans = false;

    // Detect whether any file carries orphans before deciding on writes.
    for (const localePlan of locales) {
      for (const file of localePlan['files']) {
        if (file['orphan'].length > 0) {
          hasOrphans = true;
        }
      }
    }

    if (hasOrphans === true) {
      if (interactive === true) {
        // Prompt per file with orphans; a cancel aborts the entire run.
        for (const localePlan of locales) {
          for (const file of localePlan['files']) {
            if (file['orphan'].length > 0) {
              const decision: Lib_I18n_ApplyPlan_Runner_Apply_Decision = await confirm(localePlan['locale'], file['scope'], file['orphan']);

              if (decision === 'cancel') {
                return {
                  written,
                  removed,
                  blocked: false,
                  cancelled: true,
                };
              }

              if (decision === 'decline') {
                keepOrphans.add(file);
              }
            }
          }
        }
      } else if (deleteDefunct !== true) {
        // Non-interactive without opt-in: block and write nothing at all.
        return {
          written,
          removed,
          blocked: true,
          cancelled: false,
        };
      }
    }

    // Flush every file: write non-empty content, remove files that empty out.
    for (const localePlan of locales) {
      for (const file of localePlan['files']) {
        const finalContent: Lib_I18n_ApplyPlan_Runner_Apply_FinalContent = Runner.buildContent(file, keepOrphans.has(file));
        const filePath: Lib_I18n_ApplyPlan_Runner_Apply_FilePath = Runner.resolvePath(localePlan['localizationDir'], file['scope']);
        const keys: Lib_I18n_ApplyPlan_Runner_Apply_Keys = Object.keys(finalContent);

        if (keys.length === 0) {
          const exists: Lib_I18n_ApplyPlan_Runner_Apply_Exists = await Runner.fileExists(filePath);

          if (exists === true) {
            await fs.rm(filePath);

            removed.push(filePath);
          }

          continue;
        }

        await fs.mkdir(dirname(filePath), { recursive: true });

        await fs.writeFile(filePath, `${JSON.stringify(finalContent, null, 2)}\n`);

        written.push(filePath);
      }
    }

    return {
      written,
      removed,
      blocked: false,
      cancelled: false,
    };
  }

  /**
   * Lib - I18n - Apply Plan - Build Content.
   *
   * Rebuilds a file's content from its kept and seeded entries (and its orphans
   * when they are being preserved), retaining each entry's message payload.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_BuildContent_File}        file        - File.
   * @param {Lib_I18n_ApplyPlan_Runner_BuildContent_KeepOrphans} keepOrphans - Keep orphans.
   *
   * @private
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_BuildContent_Returns}
   *
   * @since 0.21.0
   */
  private static buildContent(file: Lib_I18n_ApplyPlan_Runner_BuildContent_File, keepOrphans: Lib_I18n_ApplyPlan_Runner_BuildContent_KeepOrphans): Lib_I18n_ApplyPlan_Runner_BuildContent_Returns {
    const content: Lib_I18n_ApplyPlan_Runner_BuildContent_Content = {};
    const ordered: Lib_I18n_ApplyPlan_Runner_BuildContent_Ordered = (keepOrphans === true) ? [
      ...file['keep'],
      ...file['orphan'],
      ...file['add'],
    ] : [
      ...file['keep'],
      ...file['add'],
    ];

    // Preserve each entry's message and optional description verbatim.
    for (const entry of ordered) {
      const messageEntry: Lib_I18n_ApplyPlan_Runner_BuildContent_MessageEntry = {
        message: entry['message'],
      };

      if (entry['description'] !== undefined) {
        Reflect.set(messageEntry, 'description', entry['description']);
      }

      Reflect.set(content, entry['key'], messageEntry);
    }

    return content;
  }

  /**
   * Lib - I18n - Apply Plan - Resolve Path.
   *
   * Maps a file-plan scope to its absolute path: `code.json` sits at the locale
   * root, and `docusaurus-theme-nova/<area>` maps to that bundle's JSON file.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_ResolvePath_LocalizationDir} localizationDir - Localization dir.
   * @param {Lib_I18n_ApplyPlan_Runner_ResolvePath_Scope}           scope           - Scope.
   *
   * @private
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_ResolvePath_Returns}
   *
   * @since 0.21.0
   */
  private static resolvePath(localizationDir: Lib_I18n_ApplyPlan_Runner_ResolvePath_LocalizationDir, scope: Lib_I18n_ApplyPlan_Runner_ResolvePath_Scope): Lib_I18n_ApplyPlan_Runner_ResolvePath_Returns {
    if (scope === 'code.json') {
      return join(localizationDir, 'code.json');
    }

    return join(localizationDir, `${scope}.json`);
  }

  /**
   * Lib - I18n - Apply Plan - File Exists.
   *
   * Wraps `fs.access` in a boolean check so the flush step only removes files
   * that are actually present on disk.
   *
   * @param {Lib_I18n_ApplyPlan_Runner_FileExists_FilePath} filePath - File path.
   *
   * @private
   *
   * @returns {Lib_I18n_ApplyPlan_Runner_FileExists_Returns}
   *
   * @since 0.21.0
   */
  private static async fileExists(filePath: Lib_I18n_ApplyPlan_Runner_FileExists_FilePath): Lib_I18n_ApplyPlan_Runner_FileExists_Returns {
    try {
      await fs.access(filePath);

      return true;
    } catch {
      return false;
    }
  }
}
