import type { Document, Scalar } from 'yaml';

import type { Shared_NovaConfig_Entities, Shared_NovaConfigEntity } from '../shared.d.ts';

/**
 * Lib - GitHub Action Identity - Format GitHub Action Scalar.
 *
 * @since 0.49.0
 */
export type Lib_GithubActionIdentity_FormatGithubActionScalar_Value = string;

export type Lib_GithubActionIdentity_FormatGithubActionScalar_ScalarType = Scalar.Type | undefined;

export type Lib_GithubActionIdentity_FormatGithubActionScalar_Returns = string;

export type Lib_GithubActionIdentity_FormatGithubActionScalar_PlainCandidate = string;

/**
 * Lib - GitHub Action Identity - Replace GitHub Action Scalar.
 *
 * @since 0.49.0
 */
export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Content = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Key = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Value = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousKey = string | undefined;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Returns = string | undefined;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Document = Document.Parsed;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_DocumentContents = Document.Parsed['contents'];

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair_Key = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair_Value = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair = {
  key: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair_Key;
  value: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair_Value;
} | undefined;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PairValue = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Formatted = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair_Key = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair_Value = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair = {
  key: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair_Key;
  value: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair_Value;
} | undefined;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousValue = unknown;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertIndex = number;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_ScalarType = Scalar.Type | undefined;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_LineEnd = number;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Prefix = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_Separator = string;

export type Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertedFormatted = string;

/**
 * Lib - GitHub Action Identity - Resolve GitHub Action Author.
 *
 * @since 0.49.0
 */
export type Lib_GithubActionIdentity_ResolveGithubActionAuthor_Entities = Shared_NovaConfig_Entities | undefined;

export type Lib_GithubActionIdentity_ResolveGithubActionAuthor_Returns = string | undefined;

export type Lib_GithubActionIdentity_ResolveGithubActionAuthor_Author = Shared_NovaConfigEntity | undefined;

/**
 * Lib - GitHub Action Identity - Resolve GitHub Action Workspace Path.
 *
 * @since 0.49.0
 */
export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Content = string;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_WorkspacePaths = string[];

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Returns = string | undefined;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Document = Document.Parsed;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_RunsMain = unknown;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedMain = string;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedPath = string | undefined;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedLength = number;

export type Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedWorkspacePath = string;
