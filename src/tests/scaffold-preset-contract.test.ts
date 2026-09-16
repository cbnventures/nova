import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsIndexNames } from '../../packages/docusaurus-preset-nova/src/presets/index.js';
import { cliScaffoldDocsDocusaurusTemplateQuestions } from '../../packages/nova/src/cli/scaffold/docs/docusaurus.js';

/**
 * Scaffold Preset Contract - Scaffold Preset Contract.
 *
 * Keeps the complete Docusaurus scaffold choice list aligned with the preset
 * package registry, including the interactive default.
 *
 * @since 0.0.0
 */
describe('scaffold preset contract', () => {
  it('offers every supported preset and defaults to foundry', () => {
    deepStrictEqual(cliScaffoldDocsDocusaurusTemplateQuestions.flatMap((question) => question['choices'].map((choice) => choice['value'])), presetsIndexNames);
    ok(cliScaffoldDocsDocusaurusTemplateQuestions.some((question) => question['choices'].some((choice, index) => index === question['initial'] && choice['value'] === 'foundry')));
    strictEqual(cliScaffoldDocsDocusaurusTemplateQuestions.length, 1);

    return;
  });

  return;
});
