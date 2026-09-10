import type {
  Lib_ProgressBar_GenerateProgressBarClientModule_Config,
  Lib_ProgressBar_GenerateProgressBarClientModule_Lines,
  Lib_ProgressBar_GenerateProgressBarClientModule_NormalizedConfig,
  Lib_ProgressBar_GenerateProgressBarClientModule_Options,
  Lib_ProgressBar_GenerateProgressBarClientModule_Returns,
  Lib_ProgressBar_GenerateProgressBarClientModule_SerializedConfig,
  Lib_ProgressBar_GenerateProgressBarClientModule_SerializedNprogressPath,
  Lib_ProgressBar_ProgressBarDefaults,
} from '../types/lib/progress-bar.d.ts';

/**
 * Lib - Progress Bar - Progress Bar Defaults.
 *
 * Defines Nova's stable route progress defaults instead of relying on
 * implicit values inside the bundled progress implementation.
 *
 * @since 0.26.0
 */
export const progressBarDefaults: Lib_ProgressBar_ProgressBarDefaults = {
  minimum: 0.08,
  easing: 'ease',
  positionUsing: '',
  speed: 200,
  trickle: true,
  trickleRate: 0.02,
  trickleSpeed: 800,
  showSpinner: true,
  barSelector: '[role="bar"]',
  spinnerSelector: '[role="spinner"]',
  parent: 'body',
  template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
};

/**
 * Lib - Progress Bar - Generate Progress Bar Client Module.
 *
 * Generates the Docusaurus client lifecycle module that configures the
 * bundled progress implementation, starts it before route preloading, and
 * completes it when Docusaurus finishes the pending navigation.
 *
 * @param {Lib_ProgressBar_GenerateProgressBarClientModule_Options} options - Options.
 *
 * @returns {Lib_ProgressBar_GenerateProgressBarClientModule_Returns}
 *
 * @since 0.26.0
 */
export function generateProgressBarClientModule(options: Lib_ProgressBar_GenerateProgressBarClientModule_Options): Lib_ProgressBar_GenerateProgressBarClientModule_Returns {
  const config: Lib_ProgressBar_GenerateProgressBarClientModule_Config = (options['config'] === true) ? {} : options['config'];
  const normalizedConfig: Lib_ProgressBar_GenerateProgressBarClientModule_NormalizedConfig = {
    ...progressBarDefaults,
    ...config,
    minimum: config['minimum'] ?? progressBarDefaults['minimum'],
    easing: config['easing'] ?? progressBarDefaults['easing'],
    positionUsing: config['positionUsing'] ?? progressBarDefaults['positionUsing'],
    speed: config['speed'] ?? progressBarDefaults['speed'],
    trickle: config['trickle'] ?? progressBarDefaults['trickle'],
    trickleRate: config['trickleRate'] ?? progressBarDefaults['trickleRate'],
    trickleSpeed: config['trickleSpeed'] ?? progressBarDefaults['trickleSpeed'],
    showSpinner: config['showSpinner'] ?? progressBarDefaults['showSpinner'],
    barSelector: config['barSelector'] ?? progressBarDefaults['barSelector'],
    spinnerSelector: config['spinnerSelector'] ?? progressBarDefaults['spinnerSelector'],
    parent: config['parent'] ?? progressBarDefaults['parent'],
    template: config['template'] ?? progressBarDefaults['template'],
  };
  const serializedConfig: Lib_ProgressBar_GenerateProgressBarClientModule_SerializedConfig = JSON.stringify(normalizedConfig).replaceAll('<', '\\u003c');
  const serializedNprogressPath: Lib_ProgressBar_GenerateProgressBarClientModule_SerializedNprogressPath = JSON.stringify(options['nprogressPath']);
  const lines: Lib_ProgressBar_GenerateProgressBarClientModule_Lines = [
    `import NProgressModule from ${serializedNprogressPath};`,
    '',
    'const NProgress = NProgressModule.default ?? NProgressModule;',
    `NProgress.configure(${serializedConfig});`,
    '',
    'export function onRouteUpdate({ previousLocation }) {',
    '  if (previousLocation === null) {',
    '    return undefined;',
    '  }',
    '',
    '  NProgress.start();',
    '',
    '  return function completeRouteUpdate() {',
    '    NProgress.done();',
    '  };',
    '}',
    '',
  ];

  return lines.join('\n');
}
