import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsIndexNames } from '../packages/docusaurus-preset-nova/src/presets/index.js';
import { cliScaffoldDocsDocusaurusTemplateQuestions } from '../packages/nova/src/cli/scaffold/docs/docusaurus.js';

/**
 * Docusaurus Preset Selection - Docusaurus Preset Selection.
 *
 * Keeps the complete Docusaurus scaffold choice list aligned with the preset
 * package registry, including the interactive default.
 *
 * @since 0.0.0
 */
describe('Docusaurus preset selection', () => {
  it('offers every supported preset and defaults to foundry', () => {
    deepStrictEqual(cliScaffoldDocsDocusaurusTemplateQuestions.filter((question) => question['name'] === 'preset').flatMap((question) => question['choices'].map((choice) => choice['value'])), presetsIndexNames);
    ok(cliScaffoldDocsDocusaurusTemplateQuestions.some((question) => question['name'] === 'preset' && question['choices'].some((choice, index) => index === question['initial'] && choice['value'] === 'foundry')));
    strictEqual(cliScaffoldDocsDocusaurusTemplateQuestions.filter((question) => question['name'] === 'preset').length, 1);

    return;
  });

  return;
});
