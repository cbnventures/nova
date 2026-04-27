/**
 * Tests - CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.22.0
 */
export type TestsCliRecipeGithubSyncFeaturesRunIsProjectRootSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunLoadSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunExecuteShellSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunLoggerWarnSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunWarnCalls = unknown[][];

export type TestsCliRecipeGithubSyncFeaturesRunHasGithubBlockWarn = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasOwnerRepoWarn = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunIsCommandExistsSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunLoggerErrorSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunErrorCalls = unknown[][];

export type TestsCliRecipeGithubSyncFeaturesRunHasGhNotInstalled = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasVersionError = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasAuthError = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasWriteError = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunEditCalls = unknown[][];

export type TestsCliRecipeGithubSyncFeaturesRunEditCall = unknown[] | undefined;

export type TestsCliRecipeGithubSyncFeaturesRunHasNoValuesWarn = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunAuthCall = unknown[] | undefined;

export type TestsCliRecipeGithubSyncFeaturesRunViewCall = unknown[] | undefined;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockDebug = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockDev = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockInfo = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockWarn = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockError = ReturnType<typeof import('vitest')['vi']['fn']>;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMock = {
  debug: TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockDebug;
  dev: TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockDev;
  info: TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockInfo;
  warn: TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockWarn;
  error: TestsCliRecipeGithubSyncFeaturesRunCustomizedLoggerMockError;
};

export type TestsCliRecipeGithubSyncFeaturesRunLoggerCustomizeSpy = ReturnType<typeof import('vitest')['vi']['spyOn']>;

export type TestsCliRecipeGithubSyncFeaturesRunLoggerCustomizeReturn = import('../../../../toolkit/logger.d.ts').ToolkitLoggerCustomizeReturns;

export type TestsCliRecipeGithubSyncFeaturesRunCustomizedErrorCalls = unknown[][];

export type TestsCliRecipeGithubSyncFeaturesRunHasRateLimitError = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasMalformedJsonError = boolean;

export type TestsCliRecipeGithubSyncFeaturesRunHasUndefinedPermissionError = boolean;
