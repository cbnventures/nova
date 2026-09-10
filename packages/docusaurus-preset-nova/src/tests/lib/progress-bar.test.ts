import { deepStrictEqual, ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { generateProgressBarClientModule, progressBarDefaults } from '../../lib/progress-bar.js';

/**
 * Tests - Lib - Progress Bar - Progress Bar.
 *
 * @since 0.26.0
 */
describe('progress bar', async () => {
  it('defines stable defaults for every supported setting', () => {
    deepStrictEqual(progressBarDefaults, {
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
    });

    return;
  });

  it('generates a configured Docusaurus route lifecycle module', () => {
    ok(generateProgressBarClientModule({
      config: {
        minimum: 0.2,
        showSpinner: false,
      },
      nprogressPath: '/virtual/nprogress.js',
    }).includes('import NProgressModule from "/virtual/nprogress.js";'));
    ok(generateProgressBarClientModule({
      config: {
        minimum: 0.2,
        showSpinner: false,
      },
      nprogressPath: '/virtual/nprogress.js',
    }).includes('"minimum":0.2'));
    ok(generateProgressBarClientModule({
      config: {
        minimum: 0.2,
        showSpinner: false,
      },
      nprogressPath: '/virtual/nprogress.js',
    }).includes('"trickleSpeed":800'));
    ok(generateProgressBarClientModule({
      config: {
        minimum: 0.2,
        showSpinner: false,
      },
      nprogressPath: '/virtual/nprogress.js',
    }).includes('"showSpinner":false'));
    ok(generateProgressBarClientModule({
      config: true,
      nprogressPath: '/virtual/nprogress.js',
    }).includes('NProgress.start();'));
    ok(generateProgressBarClientModule({
      config: true,
      nprogressPath: '/virtual/nprogress.js',
    }).includes('NProgress.done();'));
    ok(generateProgressBarClientModule({
      config: true,
      nprogressPath: '/virtual/nprogress.js',
    }).includes('if (previousLocation === null)'));

    return;
  });

  it('escapes template markup before embedding configuration into JavaScript', () => {
    ok(generateProgressBarClientModule({
      config: {
        template: '</script>',
      },
      nprogressPath: '/virtual/nprogress.js',
    }).includes('"template":"\\u003c/script>"'));

    return;
  });

  return;
});
