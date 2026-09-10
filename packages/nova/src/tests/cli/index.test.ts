import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import type {
  Tests_Cli_Index_CliRecipeGithubSyncPoliciesJs_MockedRunner,
  Tests_Cli_Index_CliRecipeLicenseUpdateCopyrightJs_MockedRunner,
  Tests_Cli_Index_CliRecipeReadMeUpdateHeaderJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldAppExpressjsJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldAppNextjsJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldAppViteJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldAppWorkersJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldDocsDocusaurusJs_MockedRunner,
  Tests_Cli_Index_CliScaffoldStarterBaseJs_MockedRunner,
  Tests_Cli_Index_NestedRecipeOptions_OriginalArgv,
  Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions,
  Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions,
  Tests_Cli_Index_NestedRecipeOptions_PassesDryRunToADirectGitHubRecipe_ExpectedOptions,
  Tests_Cli_Index_RunnerMocks,
  Tests_Cli_Index_ScaffoldOptions_OriginalArgv,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveExpressJsAnswers_ExpectedOptions,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveNextJsAnswers_ExpectedOptions,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveViteAnswers_ExpectedOptions,
  Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveWorkersAnswers_ExpectedOptions,
} from '../../types/tests/cli/index.test.d.ts';

/**
 * Tests - CLI - Runner Mocks.
 *
 * Supplies stable recipe targets across fresh CLI module imports so each nested
 * command can be parsed without touching files or remote GitHub settings.
 *
 * @since 0.26.0
 */
const runnerMocks: Tests_Cli_Index_RunnerMocks = vi.hoisted(() => ({
  githubSyncPoliciesRun: vi.fn(),
  licenseUpdateCopyrightRun: vi.fn(),
  readMeUpdateHeaderRun: vi.fn(),
  scaffoldAppExpressjsRun: vi.fn(),
  scaffoldAppNextjsRun: vi.fn(),
  scaffoldAppViteRun: vi.fn(),
  scaffoldAppWorkersRun: vi.fn(),
  scaffoldDocsDocusaurusRun: vi.fn(),
  scaffoldStarterBaseRun: vi.fn(),
}));

vi.mock('../../cli/recipe/github/sync-policies.js', () => {
  const mockedRunner: Tests_Cli_Index_CliRecipeGithubSyncPoliciesJs_MockedRunner = {
    run: runnerMocks['githubSyncPoliciesRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/recipe/license/update-copyright.js', () => {
  const mockedRunner: Tests_Cli_Index_CliRecipeLicenseUpdateCopyrightJs_MockedRunner = {
    run: runnerMocks['licenseUpdateCopyrightRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/recipe/read-me/update-header.js', () => {
  const mockedRunner: Tests_Cli_Index_CliRecipeReadMeUpdateHeaderJs_MockedRunner = {
    run: runnerMocks['readMeUpdateHeaderRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/app/expressjs.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldAppExpressjsJs_MockedRunner = {
    run: runnerMocks['scaffoldAppExpressjsRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/app/nextjs.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldAppNextjsJs_MockedRunner = {
    run: runnerMocks['scaffoldAppNextjsRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/app/vite.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldAppViteJs_MockedRunner = {
    run: runnerMocks['scaffoldAppViteRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/app/workers.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldAppWorkersJs_MockedRunner = {
    run: runnerMocks['scaffoldAppWorkersRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/docs/docusaurus.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldDocsDocusaurusJs_MockedRunner = {
    run: runnerMocks['scaffoldDocsDocusaurusRun'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/scaffold/starter/base.js', () => {
  const mockedRunner: Tests_Cli_Index_CliScaffoldStarterBaseJs_MockedRunner = {
    run: runnerMocks['scaffoldStarterBaseRun'],
  };

  return { Runner: mockedRunner };
});

/**
 * Tests - CLI - Nested Recipe Options.
 *
 * Confirms direct nested recipes receive flags parsed on their parent command,
 * including the dry-run safety flag that prevents remote mutations.
 *
 * @since 0.26.0
 */
describe('nested recipe options', () => {
  const originalArgv: Tests_Cli_Index_NestedRecipeOptions_OriginalArgv = process.argv;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.resetModules();

    return;
  });

  afterEach(() => {
    process.argv = originalArgv;

    return;
  });

  it('passes dry run to a direct GitHub recipe', async () => {
    const expectedOptions: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunToADirectGitHubRecipe_ExpectedOptions = {
      dryRun: true,
    };

    process.argv = [
      'node',
      'nova',
      'recipe',
      'github',
      'sync-policies',
      '--dry-run',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['githubSyncPoliciesRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes dry run and replace file to a direct license recipe', async () => {
    const expectedOptions: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectLicenseRecipe_ExpectedOptions = {
      dryRun: true,
      replaceFile: true,
    };

    process.argv = [
      'node',
      'nova',
      'recipe',
      'license',
      'update-copyright',
      '--dry-run',
      '--replace-file',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['licenseUpdateCopyrightRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes dry run and replace file to a direct README recipe', async () => {
    const expectedOptions: Tests_Cli_Index_NestedRecipeOptions_PassesDryRunAndReplaceFileToADirectREADMERecipe_ExpectedOptions = {
      dryRun: true,
      replaceFile: true,
    };

    process.argv = [
      'node',
      'nova',
      'recipe',
      'read-me',
      'update-header',
      '--dry-run',
      '--replace-file',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['readMeUpdateHeaderRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  return;
});

/**
 * Tests - CLI - Scaffold Options.
 *
 * Confirms the explicit non-interactive contract reaches scaffold runners exactly
 * as entered, including Docusaurus-specific preset selection.
 *
 * @since 0.26.0
 */
describe('scaffold options', () => {
  const originalArgv: Tests_Cli_Index_ScaffoldOptions_OriginalArgv = process.argv;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.resetModules();

    return;
  });

  afterEach(() => {
    process.argv = originalArgv;

    return;
  });

  it('passes complete non-interactive Express.js answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveExpressJsAnswers_ExpectedOptions = {
      name: 'my-api',
      nonInteractive: true,
      output: './my-project',
      workspaceName: 'api',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'app',
      'expressjs',
      '--non-interactive',
      '--name',
      'my-api',
      '--workspace-name',
      'api',
      '--output',
      './my-project',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldAppExpressjsRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes complete non-interactive Next.js answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveNextJsAnswers_ExpectedOptions = {
      name: 'my-app',
      nonInteractive: true,
      output: './my-project',
      workspaceName: 'web',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'app',
      'nextjs',
      '--non-interactive',
      '--name',
      'my-app',
      '--workspace-name',
      'web',
      '--output',
      './my-project',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldAppNextjsRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes complete non-interactive Vite answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveViteAnswers_ExpectedOptions = {
      name: 'my-vite-app',
      nonInteractive: true,
      output: './my-project',
      workspaceName: 'web',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'app',
      'vite',
      '--non-interactive',
      '--name',
      'my-vite-app',
      '--workspace-name',
      'web',
      '--output',
      './my-project',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldAppViteRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes complete non-interactive Workers answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveWorkersAnswers_ExpectedOptions = {
      name: 'my-worker',
      nonInteractive: true,
      output: './my-project',
      workspaceName: 'worker',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'app',
      'workers',
      '--non-interactive',
      '--name',
      'my-worker',
      '--workspace-name',
      'worker',
      '--output',
      './my-project',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldAppWorkersRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes complete non-interactive Docusaurus answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveDocusaurusAnswers_ExpectedOptions = {
      name: 'my-docs',
      nonInteractive: true,
      output: './my-project',
      preset: 'signal',
      workspaceName: 'docs',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'docs',
      'docusaurus',
      '--non-interactive',
      '--name',
      'my-docs',
      '--workspace-name',
      'docs',
      '--output',
      './my-project',
      '--preset',
      'signal',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldDocsDocusaurusRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes complete non-interactive base answers', async () => {
    const expectedOptions: Tests_Cli_Index_ScaffoldOptions_PassesCompleteNonInteractiveBaseAnswers_ExpectedOptions = {
      name: 'my-project',
      nonInteractive: true,
      output: './my-project',
    };

    process.argv = [
      'node',
      'nova',
      'scaffold',
      'starter',
      'base',
      '--non-interactive',
      '--name',
      'my-project',
      '--output',
      './my-project',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['scaffoldStarterBaseRun']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  return;
});
