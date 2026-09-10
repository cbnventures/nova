import { LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET } from '../../../lib/regex.js';
import { runScaffold } from '../../../lib/scaffold.js';

import type {
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options,
  Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns,
  Cli_Scaffold_Docs_Docusaurus_TemplateQuestions,
} from '../../../types/cli/scaffold/docs/docusaurus.d.ts';

/**
 * CLI - Scaffold - Docs - Docusaurus - Template Questions.
 *
 * Declares the Docusaurus-specific choices resolved by the shared scaffold
 * pipeline. Foundry remains the default shown by the interactive wizard.
 *
 * @since 0.26.0
 */
export const cliScaffoldDocsDocusaurusTemplateQuestions: Cli_Scaffold_Docs_Docusaurus_TemplateQuestions = [{
  choices: [
    {
      title: 'Envoy',
      description: 'Purple and cyan with rounded, elevated surfaces',
      value: 'envoy',
    },
    {
      title: 'Foundry (default)',
      description: 'Warm orange and amber with rounded, elevated surfaces',
      value: 'foundry',
    },
    {
      title: 'Lantern',
      description: 'Warm amber and indigo with tactile paper-like surfaces',
      value: 'lantern',
    },
    {
      title: 'Marshal',
      description: 'Documentary green and red with compact, flat surfaces',
      value: 'marshal',
    },
    {
      title: 'Sentinel',
      description: 'Teal and indigo with rounded, flat surfaces',
      value: 'sentinel',
    },
    {
      title: 'Signal',
      description: 'Red and amber with sharp, compact surfaces',
      value: 'signal',
    },
  ],
  flag: '--preset',
  initial: 1,
  message: 'Select a Nova visual preset:',
  name: 'preset',
  placeholder: LIB_REGEX_PLACEHOLDER_DOCUSAURUS_PRESET,
}];

/**
 * CLI - Scaffold - Docs - Docusaurus.
 *
 * Scaffolds a Docusaurus documentation site as a
 * workspace inside an existing or new monorepo using
 * the shared runScaffold pipeline.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * CLI - Scaffold - Docs - Docusaurus - Run.
   *
   * Entry point invoked by the CLI nova scaffold docs docusaurus command. Delegates to
   * runScaffold with the Docusaurus template subpath.
   *
   * @param {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns}
   *
   * @since 0.15.0
   */
  public static async run(options: Cli_Scaffold_Docs_Docusaurus_Runner_Run_Options): Cli_Scaffold_Docs_Docusaurus_Runner_Run_Returns {
    await runScaffold(options, 'docs', 'docusaurus', 'scaffold/docs/docusaurus', import.meta.url, cliScaffoldDocsDocusaurusTemplateQuestions);

    return;
  }
}
