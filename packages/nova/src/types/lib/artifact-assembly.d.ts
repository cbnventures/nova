import type { Dirent, Stats } from 'node:fs';

import type {
  Shared_ArtifactAssemblyOperation,
  Shared_ArtifactAssemblyOperation_Kind,
  Shared_NovaConfig_Artifacts,
  Shared_NovaConfigArtifact,
  Shared_NovaConfigArtifactSource,
} from '../shared.d.ts';

/**
 * Lib - Artifact Assembly - Assemble.
 *
 * @since 0.38.0
 */
export type Lib_ArtifactAssembly_Runner_Assemble_RootDirectory = string;

export type Lib_ArtifactAssembly_Runner_Assemble_Artifacts = Shared_NovaConfig_Artifacts;

export type Lib_ArtifactAssembly_Runner_Assemble_SelectedNames = string[] | undefined;

export type Lib_ArtifactAssembly_Runner_Assemble_Returns = Promise<string[]>;

export type Lib_ArtifactAssembly_Runner_Assemble_Names = string[];

export type Lib_ArtifactAssembly_Runner_Assemble_UniqueNames = Set<string>;

export type Lib_ArtifactAssembly_Runner_Assemble_BuildRoot = string;

export type Lib_ArtifactAssembly_Runner_Assemble_Operations = Shared_ArtifactAssemblyOperation[];

export type Lib_ArtifactAssembly_Runner_Assemble_DestinationKinds = Map<string, Shared_ArtifactAssemblyOperation_Kind>;

export type Lib_ArtifactAssembly_Runner_Assemble_TypedName = string;

export type Lib_ArtifactAssembly_Runner_Assemble_Artifact = Shared_NovaConfigArtifact | undefined;

export type Lib_ArtifactAssembly_Runner_Assemble_ArtifactRoot = string;

export type Lib_ArtifactAssembly_Runner_Assemble_TypedSource = Shared_NovaConfigArtifactSource;

export type Lib_ArtifactAssembly_Runner_Assemble_SourcePath = string;

export type Lib_ArtifactAssembly_Runner_Assemble_DestinationPath = string;

export type Lib_ArtifactAssembly_Runner_Assemble_TemporaryRoot = string;

export type Lib_ArtifactAssembly_Runner_Assemble_CopyOperation = Shared_ArtifactAssemblyOperation;

export type Lib_ArtifactAssembly_Runner_Assemble_CopyTemporaryDestination = string;

export type Lib_ArtifactAssembly_Runner_Assemble_DirectoryOperation = Shared_ArtifactAssemblyOperation;

export type Lib_ArtifactAssembly_Runner_Assemble_DirectoryTemporaryDestination = string;

export type Lib_ArtifactAssembly_Runner_Assemble_FinalRoot = string;

export type Lib_ArtifactAssembly_Runner_Assemble_TemporaryArtifactRoot = string;

/**
 * Lib - Artifact Assembly - Collect Operations.
 *
 * @since 0.38.0
 */
export type Lib_ArtifactAssembly_Runner_CollectOperations_Source = string;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Destination = string;

export type Lib_ArtifactAssembly_Runner_CollectOperations_ArtifactRoot = string;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Operations = Shared_ArtifactAssemblyOperation[];

export type Lib_ArtifactAssembly_Runner_CollectOperations_DestinationKinds = Map<string, Shared_ArtifactAssemblyOperation_Kind>;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Returns = Promise<void>;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Stats = Stats;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Kind = Shared_ArtifactAssemblyOperation_Kind;

export type Lib_ArtifactAssembly_Runner_CollectOperations_PortableDestination = string;

export type Lib_ArtifactAssembly_Runner_CollectOperations_ExistingKind = Shared_ArtifactAssemblyOperation_Kind | undefined;

export type Lib_ArtifactAssembly_Runner_CollectOperations_Entries = Dirent[];

export type Lib_ArtifactAssembly_Runner_CollectOperations_EntrySource = string;

export type Lib_ArtifactAssembly_Runner_CollectOperations_EntryDestination = string;

/**
 * Lib - Artifact Assembly - Is Within.
 *
 * @since 0.38.0
 */
export type Lib_ArtifactAssembly_Runner_IsWithin_Parent = string;

export type Lib_ArtifactAssembly_Runner_IsWithin_Candidate = string;

export type Lib_ArtifactAssembly_Runner_IsWithin_Returns = boolean;

export type Lib_ArtifactAssembly_Runner_IsWithin_RelativePath = string;
