import type {
  Scripts_ColorModeInit_ColorModeInit_ColorMode,
  Scripts_ColorModeInit_ColorModeInit_DefaultMode,
  Scripts_ColorModeInit_ColorModeInit_DisableSwitch,
  Scripts_ColorModeInit_ColorModeInit_InitialThemeValue,
  Scripts_ColorModeInit_ColorModeInit_IsThemeUserConfigurable,
  Scripts_ColorModeInit_ColorModeInit_Lines,
  Scripts_ColorModeInit_ColorModeInit_Options,
  Scripts_ColorModeInit_ColorModeInit_QueryStringBlock,
  Scripts_ColorModeInit_ColorModeInit_Returns,
  Scripts_ColorModeInit_ColorModeInit_StorageType,
  Scripts_ColorModeInit_ColorModeInit_ThemeChoiceValue,
  Scripts_ColorModeInit_ColorModeInit_ThemeStorageKey,
} from '../types/scripts/color-mode-init.d.ts';

/**
 * Scripts - Color Mode Init - Color Mode Init.
 *
 * Generates an inline JavaScript string that initializes the document color
 * mode attribute on page load by reading stored preferences, query string
 * overrides, and system color scheme settings.
 *
 * @param {Scripts_ColorModeInit_ColorModeInit_Options} options - Options.
 *
 * @returns {Scripts_ColorModeInit_ColorModeInit_Returns}
 *
 * @since 0.15.0
 */
export function colorModeInit(options: Scripts_ColorModeInit_ColorModeInit_Options): Scripts_ColorModeInit_ColorModeInit_Returns {
  const colorMode: Scripts_ColorModeInit_ColorModeInit_ColorMode = options['themeConfig']['colorMode'] as Scripts_ColorModeInit_ColorModeInit_ColorMode;

  let disableSwitch: Scripts_ColorModeInit_ColorModeInit_DisableSwitch = false;
  let defaultMode: Scripts_ColorModeInit_ColorModeInit_DefaultMode = 'system';

  if (colorMode !== undefined) {
    if (colorMode['disableSwitch'] !== undefined) {
      disableSwitch = colorMode['disableSwitch'] as Scripts_ColorModeInit_ColorModeInit_DisableSwitch;
    }

    if (colorMode['defaultMode'] !== undefined) {
      defaultMode = colorMode['defaultMode'] as Scripts_ColorModeInit_ColorModeInit_DefaultMode;
    }
  }

  const themeStorageKey: Scripts_ColorModeInit_ColorModeInit_ThemeStorageKey = `theme${options['siteStorage']['namespace']}`;
  const isThemeUserConfigurable: Scripts_ColorModeInit_ColorModeInit_IsThemeUserConfigurable = disableSwitch !== true;
  const storageType: Scripts_ColorModeInit_ColorModeInit_StorageType = options['siteStorage']['type'];

  let queryStringBlock: Scripts_ColorModeInit_ColorModeInit_QueryStringBlock = '  var initialTheme;';

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

  let initialThemeValue: Scripts_ColorModeInit_ColorModeInit_InitialThemeValue = `'${defaultMode}'`;
  let themeChoiceValue: Scripts_ColorModeInit_ColorModeInit_ThemeChoiceValue = `'${defaultMode}'`;

  if (defaultMode === 'system') {
    initialThemeValue = 'getSystemColorMode()';
    themeChoiceValue = '\'system\'';
  }

  const lines: Scripts_ColorModeInit_ColorModeInit_Lines = [
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
