import type {
  Shared_ChangelogEntry_Bump,
  Shared_NovaConfigWorkspace_Policy,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Version Contract.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_CalverDate = Date;

export type Tests_Lib_VersionContract_InitialCase = [Shared_NovaConfigWorkspace_Policy, string];

export type Tests_Lib_VersionContract_SemverInitialCases = Tests_Lib_VersionContract_InitialCase[];

export type Tests_Lib_VersionContract_CalverInitialCases = Tests_Lib_VersionContract_InitialCase[];

export type Tests_Lib_VersionContract_SemverNextCase = [string, Shared_ChangelogEntry_Bump, string];

export type Tests_Lib_VersionContract_SemverNextCases = Tests_Lib_VersionContract_SemverNextCase[];

export type Tests_Lib_VersionContract_CalverNextCase = [string, boolean, string];

export type Tests_Lib_VersionContract_CalverNextCases = Tests_Lib_VersionContract_CalverNextCase[];

export type Tests_Lib_VersionContract_InvalidCase = () => void;

export type Tests_Lib_VersionContract_InvalidCases = Tests_Lib_VersionContract_InvalidCase[];

export type Tests_Lib_VersionContract_UtcBoundaryDate = Date;

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_VersionContractBehaviorMatrix_Returns = void;

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix - Advances Releases According To Strategy And Release History.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_VersionContractBehaviorMatrix_AdvancesReleasesAccordingToStrategyAndReleaseHistory_Returns = void;

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix - Rejects Sentinel Misuse Strategy Mismatches Future CalVer And Overflow.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_VersionContractBehaviorMatrix_RejectsSentinelMisuseStrategyMismatchesFutureCalVerAndOverflow_Returns = void;

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix - Resolves Policy-aware Initial Versions For Both Strategies.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_VersionContractBehaviorMatrix_ResolvesPolicyAwareInitialVersionsForBothStrategies_Returns = void;

/**
 * Tests - Lib - Version Contract - Version Contract Behavior Matrix - Uses UTC Rather Than The Host Timezone At A Month Boundary.
 *
 * @since 0.34.0
 */
export type Tests_Lib_VersionContract_VersionContractBehaviorMatrix_UsesUTCRatherThanTheHostTimezoneAtAMonthBoundary_Returns = void;
