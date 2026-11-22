import type { vi } from 'vitest';

import type {
  Cli_Utility_Version_Runner_Print_List,
  Cli_Utility_Version_Runner_Print_Returns,
} from '../../../cli/utility/version.d.ts';

/**
 * Tests - CLI - Utility - Version - Run.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Version_CliUtilityVersionRun_OriginalCwd = string;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryDirectory = string;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_TemporaryPrefix = string;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_SandboxRoot = string;

/**
 * Tests - CLI - Utility - Version - Run - Prints Every Category For The All Flag.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Options_All = true;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Options = Readonly<{
  all: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Options_All;
}>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_Runner = unknown;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintTarget_Print = (list: Cli_Utility_Version_Runner_Print_List) => Cli_Utility_Version_Runner_Print_Returns;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintTarget = {
  print: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintTarget_Print;
};

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryForTheAllFlag_PrintedList = Record<string, Record<string, string>>;

/**
 * Tests - CLI - Utility - Version - Run - Prints Every Category When No Flag Is Set.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Options = Readonly<Record<string, never>>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_Runner = unknown;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintTarget_Print = (list: Cli_Utility_Version_Runner_Print_List) => Cli_Utility_Version_Runner_Print_Returns;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintTarget = {
  print: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintTarget_Print;
};

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsEveryCategoryWhenNoFlagIsSet_PrintedList = Record<string, Record<string, string>>;

/**
 * Tests - CLI - Utility - Version - Run - Prints Only The Node Category For The Node Flag.
 *
 * @since 0.14.0
 */
export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Options_Node = true;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Options = Readonly<{
  node: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Options_Node;
}>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_Runner = unknown;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintTarget_Print = (list: Cli_Utility_Version_Runner_Print_List) => Cli_Utility_Version_Runner_Print_Returns;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintTarget = {
  print: Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintTarget_Print;
};

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Utility_Version_CliUtilityVersionRun_PrintsOnlyTheNodeCategoryForTheNodeFlag_PrintedList = Record<string, Record<string, string>>;
