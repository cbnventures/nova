import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import type {
  Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner,
  Tests_Cli_Integration_CliIntegrationDiscordDeveloperPortalJs_MockedRunner,
  Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner,
  Tests_Cli_Integration_IntegrationOptions_OriginalArgv,
  Tests_Cli_Integration_IntegrationOptions_PassesAppStoreConnectOptionsThroughAliases_ExpectedOptions,
  Tests_Cli_Integration_IntegrationOptions_PassesDiscordDeveloperPortalOptions_ExpectedOptions,
  Tests_Cli_Integration_IntegrationOptions_PassesGooglePlayConsoleOptionsThroughAliases_ExpectedOptions,
  Tests_Cli_Integration_RunnerMocks,
} from '../../types/tests/cli/integration.test.d.ts';

/**
 * Tests - CLI - Integration - Runner Mocks.
 *
 * Captures leaf-command options without authenticating to external services so
 * the CLI parsing contract remains deterministic and offline.
 *
 * @since 0.34.0
 */
const runnerMocks: Tests_Cli_Integration_RunnerMocks = vi.hoisted(() => ({
  appStoreConnectMetadata: vi.fn(),
  discordDeveloperPortalValidateToken: vi.fn(),
  googlePlayConsoleScreenshots: vi.fn(),
}));

vi.mock('../../cli/integration/app-store-connect.js', () => {
  const mockedRunner: Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner = {
    creativeAssets: vi.fn(),
    metadata: runnerMocks['appStoreConnectMetadata'],
    screenshots: vi.fn(),
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/integration/discord-developer-portal.js', () => {
  const mockedRunner: Tests_Cli_Integration_CliIntegrationDiscordDeveloperPortalJs_MockedRunner = {
    validateToken: runnerMocks['discordDeveloperPortalValidateToken'],
  };

  return { Runner: mockedRunner };
});

vi.mock('../../cli/integration/google-play-console.js', () => {
  const mockedRunner: Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner = {
    graphicAssets: vi.fn(),
    metadata: vi.fn(),
    screenshots: runnerMocks['googlePlayConsoleScreenshots'],
  };

  return { Runner: mockedRunner };
});

/**
 * Tests - CLI - Integration - Integration Options.
 *
 * Verifies full names and aliases pass every developer-facing option to the
 * selected integration operation without changing its shape.
 *
 * @since 0.34.0
 */
describe('integration options', () => {
  const originalArgv: Tests_Cli_Integration_IntegrationOptions_OriginalArgv = process.argv;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.resetModules();

    return;
  });

  afterEach(() => {
    process.argv = originalArgv;

    return;
  });

  it('passes App Store Connect options through aliases', async () => {
    const expectedOptions: Tests_Cli_Integration_IntegrationOptions_PassesAppStoreConnectOptionsThroughAliases_ExpectedOptions = {
      bundleId: 'io.cbnventures.example',
      dryRun: true,
      issuerId: 'issuer-id',
      keyId: 'KEYID123',
      locales: 'en-US,zh-Hans',
      nonInteractive: true,
      platforms: 'ios,macos',
      version: '1.2.3',
      workspace: 'apple',
      yes: true,
    };

    process.argv = [
      'node',
      'nova',
      'int',
      'asc',
      'metadata',
      '--bundle-id',
      'io.cbnventures.example',
      '--dry-run',
      '--issuer-id',
      'issuer-id',
      '--key-id',
      'KEYID123',
      '--locales',
      'en-US,zh-Hans',
      '--non-interactive',
      '--platforms',
      'ios,macos',
      '--version',
      '1.2.3',
      '--workspace',
      'apple',
      '--yes',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['appStoreConnectMetadata']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes Discord Developer Portal options', async () => {
    const expectedOptions: Tests_Cli_Integration_IntegrationOptions_PassesDiscordDeveloperPortalOptions_ExpectedOptions = {
      token: 'discord-token',
      workspace: 'bot',
    };

    process.argv = [
      'node',
      'nova',
      'integration',
      'discord-developer-portal',
      'validate-token',
      '--token',
      'discord-token',
      '--workspace',
      'bot',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['discordDeveloperPortalValidateToken']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  it('passes Google Play Console options through aliases', async () => {
    const expectedOptions: Tests_Cli_Integration_IntegrationOptions_PassesGooglePlayConsoleOptionsThroughAliases_ExpectedOptions = {
      dryRun: true,
      locales: 'en-US,fr-FR',
      nonInteractive: true,
      packageName: 'io.cbnventures.example',
      workspace: 'android',
      yes: true,
    };

    process.argv = [
      'node',
      'nova',
      'int',
      'gpc',
      'screenshots',
      '--dry-run',
      '--locales',
      'en-US,fr-FR',
      '--non-interactive',
      '--package-name',
      'io.cbnventures.example',
      '--workspace',
      'android',
      '--yes',
    ];

    await import('../../cli/index.js');

    await vi.waitFor(() => {
      expect(runnerMocks['googlePlayConsoleScreenshots']).toHaveBeenCalledWith(expectedOptions);

      return;
    });

    return;
  });

  return;
});
