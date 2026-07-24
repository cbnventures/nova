import type {
  Lib_I18n_Reconcile_Runner_Assemble_Add,
  Lib_I18n_Reconcile_Runner_Assemble_Content,
  Lib_I18n_Reconcile_Runner_Assemble_DropRedundant,
  Lib_I18n_Reconcile_Runner_Assemble_Entries,
  Lib_I18n_Reconcile_Runner_Assemble_EntryDescription,
  Lib_I18n_Reconcile_Runner_Assemble_Keep,
  Lib_I18n_Reconcile_Runner_Assemble_MessageEntry,
  Lib_I18n_Reconcile_Runner_Assemble_Orphan,
  Lib_I18n_Reconcile_Runner_Assemble_Returns,
  Lib_I18n_Reconcile_Runner_Assemble_Scope,
  Lib_I18n_Reconcile_Runner_ReconcileArea_DefaultMessage,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Entries,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Existing,
  Lib_I18n_Reconcile_Runner_ReconcileArea_ExistingKeys,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Input,
  Lib_I18n_Reconcile_Runner_ReconcileArea_IsDefaultLocale,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Live,
  Lib_I18n_Reconcile_Runner_ReconcileArea_LiveEntry,
  Lib_I18n_Reconcile_Runner_ReconcileArea_LiveKeys,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Path,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Returns,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Scope,
  Lib_I18n_Reconcile_Runner_ReconcileArea_SeedEntry,
  Lib_I18n_Reconcile_Runner_ReconcileArea_Value,
  Lib_I18n_Reconcile_Runner_ReconcileCode_DefaultMessage,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Entries,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Existing,
  Lib_I18n_Reconcile_Runner_ReconcileCode_ExistingKeys,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Input,
  Lib_I18n_Reconcile_Runner_ReconcileCode_IsDefaultLocale,
  Lib_I18n_Reconcile_Runner_ReconcileCode_IsSite,
  Lib_I18n_Reconcile_Runner_ReconcileCode_LiveSiteKeys,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Matches,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Registry,
  Lib_I18n_Reconcile_Runner_ReconcileCode_RegistryMessage,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Returns,
  Lib_I18n_Reconcile_Runner_ReconcileCode_SeedEntry,
  Lib_I18n_Reconcile_Runner_ReconcileCode_SiteEntry,
  Lib_I18n_Reconcile_Runner_ReconcileCode_SiteExtract,
  Lib_I18n_Reconcile_Runner_ReconcileCode_SiteMessage,
  Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaultMessage,
  Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaults,
  Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeLiveKeys,
  Lib_I18n_Reconcile_Runner_ReconcileCode_Value,
} from '../../types/lib/i18n/reconcile.d.ts';

/**
 * Lib - I18n - Reconcile.
 *
 * Classifies on-disk translation entries against the live key set and their
 * resolved defaults, producing a prune plan with no file-system side effects.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Lib - I18n - Reconcile - Reconcile Code.
   *
   * Reconciles a locale `code.json` by classifying each existing entry against
   * the live site keys and theme registry, seeding new source keys when default.
   *
   * @param {Lib_I18n_Reconcile_Runner_ReconcileCode_Input} input - Input.
   *
   * @returns {Lib_I18n_Reconcile_Runner_ReconcileCode_Returns}
   *
   * @since 0.21.0
   */
  public static reconcileCode(input: Lib_I18n_Reconcile_Runner_ReconcileCode_Input): Lib_I18n_Reconcile_Runner_ReconcileCode_Returns {
    const existing: Lib_I18n_Reconcile_Runner_ReconcileCode_Existing = input['existing'];
    const liveSiteKeys: Lib_I18n_Reconcile_Runner_ReconcileCode_LiveSiteKeys = input['liveSiteKeys'];
    const themeLiveKeys: Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeLiveKeys = input['themeLiveKeys'];
    const siteExtract: Lib_I18n_Reconcile_Runner_ReconcileCode_SiteExtract = input['siteExtract'];
    const registry: Lib_I18n_Reconcile_Runner_ReconcileCode_Registry = input['registry'];
    const themeDefaults: Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaults = input['themeDefaults'];
    const isDefaultLocale: Lib_I18n_Reconcile_Runner_ReconcileCode_IsDefaultLocale = input['isDefaultLocale'];
    const existingKeys: Lib_I18n_Reconcile_Runner_ReconcileCode_ExistingKeys = new Set(Object.keys(existing));
    const entries: Lib_I18n_Reconcile_Runner_ReconcileCode_Entries = [];

    // Classify every entry already present on disk.
    for (const key of existingKeys) {
      const value: Lib_I18n_Reconcile_Runner_ReconcileCode_Value = existing[key];

      if (value === undefined) {
        continue;
      }

      const isSite: Lib_I18n_Reconcile_Runner_ReconcileCode_IsSite = liveSiteKeys.has(key);
      const siteEntry: Lib_I18n_Reconcile_Runner_ReconcileCode_SiteEntry = siteExtract[key];
      const registryMessage: Lib_I18n_Reconcile_Runner_ReconcileCode_RegistryMessage = registry[key];
      const themeDefaultMessage: Lib_I18n_Reconcile_Runner_ReconcileCode_ThemeDefaultMessage = themeDefaults[key];
      const siteMessage: Lib_I18n_Reconcile_Runner_ReconcileCode_SiteMessage = (siteEntry !== undefined) ? siteEntry['message'] : undefined;

      // Theme keys default to the localized registry message, falling back to the
      // extracted English source so the default locale (no registry) still resolves.
      const defaultMessage: Lib_I18n_Reconcile_Runner_ReconcileCode_DefaultMessage = (isSite === true) ? siteMessage : (registryMessage ?? themeDefaultMessage);
      const matches: Lib_I18n_Reconcile_Runner_ReconcileCode_Matches = defaultMessage !== undefined && value['message'] === defaultMessage;

      // A key is live when it is a source key or a theme id the theme still emits.
      if (isSite === true || themeLiveKeys.has(key) === true) {
        if (matches === false) {
          entries.push({
            key,
            classification: 'keep',
            action: 'keep',
            message: value['message'],
            description: value['description'],
          });
        } else if (isSite === true && isDefaultLocale === true) {
          entries.push({
            key,
            classification: 'redundant-live',
            action: 'keep',
            message: value['message'],
            description: value['description'],
          });
        } else {
          entries.push({
            key,
            classification: 'redundant-live',
            action: 'drop',
            message: value['message'],
            description: value['description'],
          });
        }
      } else if (matches === true) {
        entries.push({
          key,
          classification: 'redundant-stale',
          action: 'drop',
          message: value['message'],
          description: value['description'],
        });
      } else {
        entries.push({
          key,
          classification: 'orphan',
          action: 'gate',
          message: value['message'],
          description: value['description'],
        });
      }
    }

    // Seed the source message for new live site keys in the default locale only.
    if (isDefaultLocale === true) {
      for (const key of liveSiteKeys) {
        if (existingKeys.has(key) === true) {
          continue;
        }

        const seedEntry: Lib_I18n_Reconcile_Runner_ReconcileCode_SeedEntry = siteExtract[key];

        if (seedEntry === undefined) {
          continue;
        }

        entries.push({
          key,
          classification: 'seed',
          action: 'seed',
          message: seedEntry['message'],
          description: seedEntry['description'],
        });
      }
    }

    return Runner.assemble('code.json', entries);
  }

  /**
   * Lib - I18n - Reconcile - Reconcile Area.
   *
   * Reconciles a theme-nova area bundle by comparing each existing entry to the
   * extracted source message, seeding missing keys only in the default locale.
   *
   * @param {Lib_I18n_Reconcile_Runner_ReconcileArea_Input} input - Input.
   *
   * @returns {Lib_I18n_Reconcile_Runner_ReconcileArea_Returns}
   *
   * @since 0.21.0
   */
  public static reconcileArea(input: Lib_I18n_Reconcile_Runner_ReconcileArea_Input): Lib_I18n_Reconcile_Runner_ReconcileArea_Returns {
    const existing: Lib_I18n_Reconcile_Runner_ReconcileArea_Existing = input['existing'];
    const live: Lib_I18n_Reconcile_Runner_ReconcileArea_Live = input['live'];
    const isDefaultLocale: Lib_I18n_Reconcile_Runner_ReconcileArea_IsDefaultLocale = input['isDefaultLocale'];
    const path: Lib_I18n_Reconcile_Runner_ReconcileArea_Path = input['path'];
    const scope: Lib_I18n_Reconcile_Runner_ReconcileArea_Scope = `docusaurus-theme-nova/${path}`;
    const liveKeys: Lib_I18n_Reconcile_Runner_ReconcileArea_LiveKeys = new Set(Object.keys(live));
    const existingKeys: Lib_I18n_Reconcile_Runner_ReconcileArea_ExistingKeys = new Set(Object.keys(existing));
    const entries: Lib_I18n_Reconcile_Runner_ReconcileArea_Entries = [];

    // Classify every entry already present in the area bundle on disk.
    for (const key of existingKeys) {
      const value: Lib_I18n_Reconcile_Runner_ReconcileArea_Value = existing[key];

      if (value === undefined) {
        continue;
      }

      const liveEntry: Lib_I18n_Reconcile_Runner_ReconcileArea_LiveEntry = live[key];
      const defaultMessage: Lib_I18n_Reconcile_Runner_ReconcileArea_DefaultMessage = (liveEntry !== undefined) ? liveEntry['message'] : undefined;

      if (liveKeys.has(key) === true) {
        if (defaultMessage !== undefined && value['message'] === defaultMessage) {
          if (isDefaultLocale === true) {
            entries.push({
              key,
              classification: 'redundant-live',
              action: 'keep',
              message: value['message'],
              description: value['description'],
            });
          } else {
            entries.push({
              key,
              classification: 'redundant-live',
              action: 'drop',
              message: value['message'],
              description: value['description'],
            });
          }
        } else {
          entries.push({
            key,
            classification: 'keep',
            action: 'keep',
            message: value['message'],
            description: value['description'],
          });
        }
      } else {
        entries.push({
          key,
          classification: 'orphan',
          action: 'gate',
          message: value['message'],
          description: value['description'],
        });
      }
    }

    // Seed the source message for missing area keys in the default locale only.
    if (isDefaultLocale === true) {
      for (const key of liveKeys) {
        if (existingKeys.has(key) === true) {
          continue;
        }

        const seedEntry: Lib_I18n_Reconcile_Runner_ReconcileArea_SeedEntry = live[key];

        if (seedEntry === undefined) {
          continue;
        }

        entries.push({
          key,
          classification: 'seed',
          action: 'seed',
          message: seedEntry['message'],
          description: seedEntry['description'],
        });
      }
    }

    return Runner.assemble(scope, entries);
  }

  /**
   * Lib - I18n - Reconcile - Assemble.
   *
   * Buckets classified entries by disposition and rebuilds the reconciled file
   * content from the kept and seeded entries, preserving their message payloads.
   *
   * @param {Lib_I18n_Reconcile_Runner_Assemble_Scope}   scope   - Scope.
   * @param {Lib_I18n_Reconcile_Runner_Assemble_Entries} entries - Entries.
   *
   * @private
   *
   * @returns {Lib_I18n_Reconcile_Runner_Assemble_Returns}
   *
   * @since 0.21.0
   */
  private static assemble(scope: Lib_I18n_Reconcile_Runner_Assemble_Scope, entries: Lib_I18n_Reconcile_Runner_Assemble_Entries): Lib_I18n_Reconcile_Runner_Assemble_Returns {
    const keep: Lib_I18n_Reconcile_Runner_Assemble_Keep = entries.filter((entry) => entry['action'] === 'keep');
    const add: Lib_I18n_Reconcile_Runner_Assemble_Add = entries.filter((entry) => entry['action'] === 'seed');
    const dropRedundant: Lib_I18n_Reconcile_Runner_Assemble_DropRedundant = entries.filter((entry) => entry['action'] === 'drop');
    const orphan: Lib_I18n_Reconcile_Runner_Assemble_Orphan = entries.filter((entry) => entry['action'] === 'gate');
    const content: Lib_I18n_Reconcile_Runner_Assemble_Content = {};

    // Rebuild the reconciled content from the retained and seeded entries.
    for (const entry of entries) {
      if (entry['action'] === 'keep' || entry['action'] === 'seed') {
        const messageEntry: Lib_I18n_Reconcile_Runner_Assemble_MessageEntry = {
          message: entry['message'],
        };
        const entryDescription: Lib_I18n_Reconcile_Runner_Assemble_EntryDescription = entry['description'];

        if (entryDescription !== undefined) {
          Reflect.set(messageEntry, 'description', entryDescription);
        }

        Reflect.set(content, entry['key'], messageEntry);
      }
    }

    return {
      scope,
      keep,
      add,
      dropRedundant,
      orphan,
      content,
    };
  }
}
