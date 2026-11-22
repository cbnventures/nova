import type { Toolkit_VitestReporters_Runner_Options_Returns } from '../types/toolkit/vitest-reporters.d.ts';

/**
 * Toolkit - Vitest Reporters.
 *
 * Builds the Vitest reporter options scaffolded workspaces use in every run.
 * The shared configuration keeps CI output consistent across workspaces.
 *
 * @since 0.50.0
 */
class Runner {
  /**
   * Toolkit - Vitest Reporters - Options.
   *
   * Keeps the default terminal reporter and GitHub failure annotations while
   * disabling Vitest's per-run GitHub Actions job summary.
   *
   * @returns {Toolkit_VitestReporters_Runner_Options_Returns}
   *
   * @since 0.50.0
   */
  public static options(): Toolkit_VitestReporters_Runner_Options_Returns {
    return [
      'default',
      [
        'github-actions',
        {
          jobSummary: {
            enabled: false,
          },
        },
      ],
    ];
  }
}

export default Runner;
