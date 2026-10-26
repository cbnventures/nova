import type { vi } from 'vitest';

import type {
  Shared_AppStoreConnectIntegrationOptions,
  Shared_DiscordDeveloperPortalOptions,
  Shared_GooglePlayConsoleIntegrationOptions,
} from '../../shared.d.ts';

/**
 * Tests - CLI - Integration - Runner Mocks.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_RunnerMocks_AppStoreConnectMetadata = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_RunnerMocks_DiscordDeveloperPortalValidateToken = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_RunnerMocks_GooglePlayConsoleScreenshots = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_RunnerMocks = {
  appStoreConnectMetadata: Tests_Cli_Integration_RunnerMocks_AppStoreConnectMetadata;
  discordDeveloperPortalValidateToken: Tests_Cli_Integration_RunnerMocks_DiscordDeveloperPortalValidateToken;
  googlePlayConsoleScreenshots: Tests_Cli_Integration_RunnerMocks_GooglePlayConsoleScreenshots;
};

/**
 * Tests - CLI - Integration - CLI Integration App Store Connect JS.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_CreativeAssets = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_Metadata = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_Screenshots = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner = {
  creativeAssets: Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_CreativeAssets;
  metadata: Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_Metadata;
  screenshots: Tests_Cli_Integration_CliIntegrationAppStoreConnectJs_MockedRunner_Screenshots;
};

/**
 * Tests - CLI - Integration - CLI Integration Discord Developer Portal JS.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_CliIntegrationDiscordDeveloperPortalJs_MockedRunner_ValidateToken = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationDiscordDeveloperPortalJs_MockedRunner = {
  validateToken: Tests_Cli_Integration_CliIntegrationDiscordDeveloperPortalJs_MockedRunner_ValidateToken;
};

/**
 * Tests - CLI - Integration - CLI Integration Google Play Console JS.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_GraphicAssets = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_Metadata = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_Screenshots = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner = {
  graphicAssets: Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_GraphicAssets;
  metadata: Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_Metadata;
  screenshots: Tests_Cli_Integration_CliIntegrationGooglePlayConsoleJs_MockedRunner_Screenshots;
};

/**
 * Tests - CLI - Integration - Integration Options.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_IntegrationOptions_OriginalArgv = string[];

/**
 * Tests - CLI - Integration - Integration Options - Passes App Store Connect Options Through Aliases.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_IntegrationOptions_PassesAppStoreConnectOptionsThroughAliases_ExpectedOptions = Shared_AppStoreConnectIntegrationOptions;

/**
 * Tests - CLI - Integration - Integration Options - Passes Discord Developer Portal Options.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_IntegrationOptions_PassesDiscordDeveloperPortalOptions_ExpectedOptions = Shared_DiscordDeveloperPortalOptions;

/**
 * Tests - CLI - Integration - Integration Options - Passes Google Play Console Options Through Aliases.
 *
 * @since 0.34.0
 */
export type Tests_Cli_Integration_IntegrationOptions_PassesGooglePlayConsoleOptionsThroughAliases_ExpectedOptions = Shared_GooglePlayConsoleIntegrationOptions;
