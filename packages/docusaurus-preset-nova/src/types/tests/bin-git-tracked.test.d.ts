/**
 * Tests - Bin Git Tracked - Bin Git Tracked.
 *
 * @since 0.22.0
 */
export type Tests_BinGitTracked_BinGitTracked_PackageRoot = string;

export type Tests_BinGitTracked_BinGitTracked_PackageJsonPath = string;

export type Tests_BinGitTracked_BinGitTracked_PackageJsonText = string;

export type Tests_BinGitTracked_BinGitTracked_PackageJson_Bin = Record<string, string>;

export type Tests_BinGitTracked_BinGitTracked_PackageJson = {
  bin?: Tests_BinGitTracked_BinGitTracked_PackageJson_Bin;
};

export type Tests_BinGitTracked_BinGitTracked_Bin = Record<string, string>;

export type Tests_BinGitTracked_BinGitTracked_BinEntry = [string, string];

export type Tests_BinGitTracked_BinGitTracked_BinEntries = Tests_BinGitTracked_BinGitTracked_BinEntry[];

export type Tests_BinGitTracked_BinGitTracked_BinName = string;

export type Tests_BinGitTracked_BinGitTracked_BinPath = string;

export type Tests_BinGitTracked_BinGitTracked_Tracked = boolean;

export type Tests_BinGitTracked_BinGitTracked_Message = string;

/**
 * Tests - Bin Git Tracked - Get Package Root.
 *
 * @since 0.22.0
 */
export type Tests_BinGitTracked_GetPackageRoot_Returns = string;

export type Tests_BinGitTracked_GetPackageRoot_CurrentFilePath = string;

export type Tests_BinGitTracked_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Bin Git Tracked - Is Tracked By Git.
 *
 * @since 0.22.0
 */
export type Tests_BinGitTracked_IsTrackedByGit_PackageRoot = string;

export type Tests_BinGitTracked_IsTrackedByGit_BinPath = string;

export type Tests_BinGitTracked_IsTrackedByGit_Returns = boolean;
