import type {
  ScriptsColorModeInitColorModeInitColorMode,
  ScriptsColorModeInitColorModeInitDefaultMode,
  ScriptsColorModeInitColorModeInitDisableSwitch,
  ScriptsColorModeInitColorModeInitInitialThemeValue,
  ScriptsColorModeInitColorModeInitIsThemeUserConfigurable,
  ScriptsColorModeInitColorModeInitLines,
  ScriptsColorModeInitColorModeInitOptions,
  ScriptsColorModeInitColorModeInitQueryStringBlock,
  ScriptsColorModeInitColorModeInitReturns,
  ScriptsColorModeInitColorModeInitStorageType,
  ScriptsColorModeInitColorModeInitThemeChoiceValue,
  ScriptsColorModeInitColorModeInitThemeStorageKey,
} from '../types/scripts/color-mode-init.d.ts';

/**
 * Scripts - Color Mode Init - Color Mode Init.
 *
 * Generates an inline JavaScript string that initializes the document color
 * mode attribute on page load by reading stored preferences, query string
 * overrides, and system color scheme settings.
 *
 * @param {ScriptsColorModeInitColorModeInitOptions} options - Options.
 *
 * @returns {ScriptsColorModeInitColorModeInitReturns}
 *
 * @since 0.15.0
 */
export function colorModeInit(options: ScriptsColorModeInitColorModeInitOptions): ScriptsColorModeInitColorModeInitReturns {
  const colorMode: ScriptsColorModeInitColorModeInitColorMode = options['themeConfig']['colorMode'] as ScriptsColorModeInitColorModeInitColorMode;

  let disableSwitch: ScriptsColorModeInitColorModeInitDisableSwitch = false;
  let defaultMode: ScriptsColorModeInitColorModeInitDefaultMode = 'system';

  if (colorMode !== undefined) {
    if (colorMode['disableSwitch'] !== undefined) {
      disableSwitch = colorMode['disableSwitch'] as ScriptsColorModeInitColorModeInitDisableSwitch;
    }

    if (colorMode['defaultMode'] !== undefined) {
      defaultMode = colorMode['defaultMode'] as ScriptsColorModeInitColorModeInitDefaultMode;
    }
  }

  const themeStorageKey: ScriptsColorModeInitColorModeInitThemeStorageKey = `theme${options['siteStorage']['namespace']}`;
  const isThemeUserConfigurable: ScriptsColorModeInitColorModeInitIsThemeUserConfigurable = disableSwitch !== true;
  const storageType: ScriptsColorModeInitColorModeInitStorageType = options['siteStorage']['type'];

  let queryStringBlock: ScriptsColorModeInitColorModeInitQueryStringBlock = '  var initialTheme;';

  if (isThemeUserConfigurable === true) {
    queryStringBlock = [
      '  function getQueryStringTheme() {',
      '    try {',
      '      return new URLSearchParams(window.location.search).get(\'docusaurus-theme\')',
      '    } catch (e) {}',
      '  }',
      '  function getStoredTheme() {',
      '    try {',
      `      return window['${storageType}'].getItem('${themeStorageKey}');`,
      '    } catch (err) {}',
      '  }',
      '  var initialTheme = getQueryStringTheme() || getStoredTheme();',
    ].join('\n');
  }

  let initialThemeValue: ScriptsColorModeInitColorModeInitInitialThemeValue = `'${defaultMode}'`;
  let themeChoiceValue: ScriptsColorModeInitColorModeInitThemeChoiceValue = `'${defaultMode}'`;

  if (defaultMode === 'system') {
    initialThemeValue = 'getSystemColorMode()';
    themeChoiceValue = '\'system\'';
  }

  const lines: ScriptsColorModeInitColorModeInitLines = [
    '(function() {',
    '  function getSystemColorMode() {',
    '    return window.matchMedia(\'(prefers-color-scheme: dark)\').matches ? \'dark\' : \'light\';',
    '  }',
    queryStringBlock,
    '  if (initialTheme === \'system\') {',
    '    document.documentElement.setAttribute(\'data-theme\', getSystemColorMode());',
    '    document.documentElement.setAttribute(\'data-theme-choice\', \'system\');',
    '  } else {',
    `    document.documentElement.setAttribute('data-theme', initialTheme || ${initialThemeValue});`,
    `    document.documentElement.setAttribute('data-theme-choice', initialTheme || ${themeChoiceValue});`,
    '  }',
    '})();',
  ];

  return lines.join('\n');
}
