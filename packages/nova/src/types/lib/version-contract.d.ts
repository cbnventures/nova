import type {
  Shared_ChangelogEntry_Bump,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkspace_Policy,
} from '../shared.d.ts';

/**
 * Lib - Version Contract - Get Initial Version.
 *
 * @since 0.34.0
 */
export type Lib_VersionContract_Runner_GetInitialVersion_Policy = Shared_NovaConfigWorkspace_Policy;

export type Lib_VersionContract_Runner_GetInitialVersion_Strategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionContract_Runner_GetInitialVersion_Date = Date;

export type Lib_VersionContract_Runner_GetInitialVersion_Returns = string;

export type Lib_VersionContract_Runner_GetInitialVersion_Year = number;

export type Lib_VersionContract_Runner_GetInitialVersion_Month = number;

/**
 * Lib - Version Contract - Get Next Version.
 *
 * @since 0.34.0
 */
export type Lib_VersionContract_Runner_GetNextVersion_CurrentVersion = string;

export type Lib_VersionContract_Runner_GetNextVersion_Strategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionContract_Runner_GetNextVersion_Bump = Shared_ChangelogEntry_Bump;

export type Lib_VersionContract_Runner_GetNextVersion_HasReleaseHistory = boolean;

export type Lib_VersionContract_Runner_GetNextVersion_Date = Date;

export type Lib_VersionContract_Runner_GetNextVersion_Returns = string;

export type Lib_VersionContract_Runner_GetNextVersion_Parts = number[];

export type Lib_VersionContract_Runner_GetNextVersion_Year = number;

export type Lib_VersionContract_Runner_GetNextVersion_Month = number;

export type Lib_VersionContract_Runner_GetNextVersion_NextMicro = number;

export type Lib_VersionContract_Runner_GetNextVersion_NextMajor = number;

export type Lib_VersionContract_Runner_GetNextVersion_NextMinor = number;

export type Lib_VersionContract_Runner_GetNextVersion_NextPatch = number;

/**
 * Lib - Version Contract - Validate.
 *
 * @since 0.34.0
 */
export type Lib_VersionContract_Runner_Validate_Version = string;

export type Lib_VersionContract_Runner_Validate_Policy = Shared_NovaConfigWorkspace_Policy;

export type Lib_VersionContract_Runner_Validate_Strategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_VersionContract_Runner_Validate_Source = string;

export type Lib_VersionContract_Runner_Validate_Date = Date;

export type Lib_VersionContract_Runner_Validate_Returns = void;

export type Lib_VersionContract_Runner_Validate_IsZero = boolean;

export type Lib_VersionContract_Runner_Validate_SemverParts = number[];

export type Lib_VersionContract_Runner_Validate_CalverParts = number[];

export type Lib_VersionContract_Runner_Validate_Year = number;

export type Lib_VersionContract_Runner_Validate_Month = number;

export type Lib_VersionContract_Runner_Validate_VersionYear = number;

export type Lib_VersionContract_Runner_Validate_VersionMonth = number;
