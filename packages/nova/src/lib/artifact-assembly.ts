import {
  chmod,
  copyFile,
  lstat,
  mkdir,
  mkdtemp,
  readdir,
  rename,
  rm,
} from 'node:fs/promises';
import {
  dirname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep,
} from 'node:path';

import type {
  Lib_ArtifactAssembly_Runner_Assemble_Artifact,
  Lib_ArtifactAssembly_Runner_Assemble_ArtifactRoot,
  Lib_ArtifactAssembly_Runner_Assemble_Artifacts,
  Lib_ArtifactAssembly_Runner_Assemble_BuildRoot,
  Lib_ArtifactAssembly_Runner_Assemble_CopyOperation,
  Lib_ArtifactAssembly_Runner_Assemble_CopyTemporaryDestination,
  Lib_ArtifactAssembly_Runner_Assemble_DestinationKinds,
  Lib_ArtifactAssembly_Runner_Assemble_DestinationPath,
  Lib_ArtifactAssembly_Runner_Assemble_DirectoryOperation,
  Lib_ArtifactAssembly_Runner_Assemble_DirectoryTemporaryDestination,
  Lib_ArtifactAssembly_Runner_Assemble_FinalRoot,
  Lib_ArtifactAssembly_Runner_Assemble_Names,
  Lib_ArtifactAssembly_Runner_Assemble_Operations,
  Lib_ArtifactAssembly_Runner_Assemble_Returns,
  Lib_ArtifactAssembly_Runner_Assemble_RootDirectory,
  Lib_ArtifactAssembly_Runner_Assemble_SelectedNames,
  Lib_ArtifactAssembly_Runner_Assemble_SourcePath,
  Lib_ArtifactAssembly_Runner_Assemble_TemporaryArtifactRoot,
  Lib_ArtifactAssembly_Runner_Assemble_TemporaryRoot,
  Lib_ArtifactAssembly_Runner_Assemble_TypedName,
  Lib_ArtifactAssembly_Runner_Assemble_TypedSource,
  Lib_ArtifactAssembly_Runner_Assemble_UniqueNames,
  Lib_ArtifactAssembly_Runner_CollectOperations_ArtifactRoot,
  Lib_ArtifactAssembly_Runner_CollectOperations_Destination,
  Lib_ArtifactAssembly_Runner_CollectOperations_DestinationKinds,
  Lib_ArtifactAssembly_Runner_CollectOperations_Entries,
  Lib_ArtifactAssembly_Runner_CollectOperations_EntryDestination,
  Lib_ArtifactAssembly_Runner_CollectOperations_EntrySource,
  Lib_ArtifactAssembly_Runner_CollectOperations_ExistingKind,
  Lib_ArtifactAssembly_Runner_CollectOperations_Kind,
  Lib_ArtifactAssembly_Runner_CollectOperations_Operations,
  Lib_ArtifactAssembly_Runner_CollectOperations_PortableDestination,
  Lib_ArtifactAssembly_Runner_CollectOperations_Returns,
  Lib_ArtifactAssembly_Runner_CollectOperations_Source,
  Lib_ArtifactAssembly_Runner_CollectOperations_Stats,
  Lib_ArtifactAssembly_Runner_IsWithin_Candidate,
  Lib_ArtifactAssembly_Runner_IsWithin_Parent,
  Lib_ArtifactAssembly_Runner_IsWithin_RelativePath,
  Lib_ArtifactAssembly_Runner_IsWithin_Returns,
} from '../types/lib/artifact-assembly.d.ts';

/**
 * Lib - Artifact Assembly.
 *
 * Builds explicit final-product directories beneath the repository's root
 * build folder without coupling independent workspace build outputs together.
 *
 * @since 0.38.0
 */
export class Runner {
  /**
   * Lib - Artifact Assembly - Assemble.
   *
   * Validates selected sources before writing and stages every copy in a temporary directory.
   * Completed artifacts then replace their stable root build locations as one operation.
   *
   * @param {Lib_ArtifactAssembly_Runner_Assemble_RootDirectory} rootDirectory - Root directory.
   * @param {Lib_ArtifactAssembly_Runner_Assemble_Artifacts}     artifacts     - Artifacts.
   * @param {Lib_ArtifactAssembly_Runner_Assemble_SelectedNames} selectedNames - Selected names.
   *
   * @returns {Lib_ArtifactAssembly_Runner_Assemble_Returns}
   *
   * @since 0.38.0
   */
  public static async assemble(rootDirectory: Lib_ArtifactAssembly_Runner_Assemble_RootDirectory, artifacts: Lib_ArtifactAssembly_Runner_Assemble_Artifacts, selectedNames: Lib_ArtifactAssembly_Runner_Assemble_SelectedNames = undefined): Lib_ArtifactAssembly_Runner_Assemble_Returns {
    const names: Lib_ArtifactAssembly_Runner_Assemble_Names = (selectedNames === undefined) ? Object.keys(artifacts).sort((left, right) => left.localeCompare(right)) : selectedNames;
    const uniqueNames: Lib_ArtifactAssembly_Runner_Assemble_UniqueNames = new Set(names);

    if (uniqueNames.size !== names.length) {
      throw new Error('Artifact selections must not contain duplicate names.');
    }

    const buildRoot: Lib_ArtifactAssembly_Runner_Assemble_BuildRoot = resolve(rootDirectory, 'build');
    const operations: Lib_ArtifactAssembly_Runner_Assemble_Operations = [];
    const destinationKinds: Lib_ArtifactAssembly_Runner_Assemble_DestinationKinds = new Map();

    for (const name of names) {
      const typedName: Lib_ArtifactAssembly_Runner_Assemble_TypedName = name;
      const artifact: Lib_ArtifactAssembly_Runner_Assemble_Artifact = artifacts[typedName];

      if (artifact === undefined) {
        throw new Error(`Unknown artifact "${typedName}".`);
      }

      const artifactRoot: Lib_ArtifactAssembly_Runner_Assemble_ArtifactRoot = resolve(buildRoot, typedName);

      for (const source of artifact['sources']) {
        const typedSource: Lib_ArtifactAssembly_Runner_Assemble_TypedSource = source;
        const sourcePath: Lib_ArtifactAssembly_Runner_Assemble_SourcePath = resolve(rootDirectory, typedSource['from']);
        const destinationPath: Lib_ArtifactAssembly_Runner_Assemble_DestinationPath = resolve(artifactRoot, typedSource['to']);

        if (
          Runner.isWithin(rootDirectory, sourcePath) === false
          || Runner.isWithin(buildRoot, sourcePath) === true
          || Runner.isWithin(sourcePath, buildRoot) === true
        ) {
          throw new Error(`Artifact "${typedName}" source "${typedSource['from']}" must stay inside the project and outside the root build folder.`);
        }

        if (Runner.isWithin(artifactRoot, destinationPath) === false) {
          throw new Error(`Artifact "${typedName}" destination "${typedSource['to']}" escapes its output folder.`);
        }

        await Runner.collectOperations(sourcePath, destinationPath, artifactRoot, operations, destinationKinds);
      }
    }

    await mkdir(buildRoot, { recursive: true });

    const temporaryRoot: Lib_ArtifactAssembly_Runner_Assemble_TemporaryRoot = await mkdtemp(join(buildRoot, '.nova-artifacts-'));

    try {
      for (const operation of operations) {
        const copyOperation: Lib_ArtifactAssembly_Runner_Assemble_CopyOperation = operation;
        const copyTemporaryDestination: Lib_ArtifactAssembly_Runner_Assemble_CopyTemporaryDestination = join(temporaryRoot, relative(buildRoot, copyOperation['destination']));

        if (copyOperation['kind'] === 'directory') {
          await mkdir(copyTemporaryDestination, { recursive: true });

          continue;
        }

        await mkdir(dirname(copyTemporaryDestination), { recursive: true });
        await copyFile(copyOperation['source'], copyTemporaryDestination);
        await chmod(copyTemporaryDestination, copyOperation['mode']);
      }

      for (const operation of [...operations].reverse()) {
        const directoryOperation: Lib_ArtifactAssembly_Runner_Assemble_DirectoryOperation = operation;

        if (directoryOperation['kind'] !== 'directory') {
          continue;
        }

        const directoryTemporaryDestination: Lib_ArtifactAssembly_Runner_Assemble_DirectoryTemporaryDestination = join(temporaryRoot, relative(buildRoot, directoryOperation['destination']));

        await chmod(directoryTemporaryDestination, directoryOperation['mode']);
      }

      for (const name of names) {
        const finalRoot: Lib_ArtifactAssembly_Runner_Assemble_FinalRoot = join(buildRoot, name);
        const temporaryArtifactRoot: Lib_ArtifactAssembly_Runner_Assemble_TemporaryArtifactRoot = join(temporaryRoot, name);

        await rm(finalRoot, {
          force: true,
          recursive: true,
        });
        await rename(temporaryArtifactRoot, finalRoot);
      }
    } finally {
      await rm(temporaryRoot, {
        force: true,
        recursive: true,
      });
    }

    return names.map((name) => join(buildRoot, name));
  }

  /**
   * Lib - Artifact Assembly - Collect Operations.
   *
   * Walks one explicit source without following symbolic links and records its
   * portable destination map before any artifact output is modified.
   *
   * @param {Lib_ArtifactAssembly_Runner_CollectOperations_Source}           source           - Source.
   * @param {Lib_ArtifactAssembly_Runner_CollectOperations_Destination}      destination      - Destination.
   * @param {Lib_ArtifactAssembly_Runner_CollectOperations_ArtifactRoot}     artifactRoot     - Artifact root.
   * @param {Lib_ArtifactAssembly_Runner_CollectOperations_Operations}       operations       - Operations.
   * @param {Lib_ArtifactAssembly_Runner_CollectOperations_DestinationKinds} destinationKinds - Destination kinds.
   *
   * @private
   *
   * @returns {Lib_ArtifactAssembly_Runner_CollectOperations_Returns}
   *
   * @since 0.38.0
   */
  private static async collectOperations(source: Lib_ArtifactAssembly_Runner_CollectOperations_Source, destination: Lib_ArtifactAssembly_Runner_CollectOperations_Destination, artifactRoot: Lib_ArtifactAssembly_Runner_CollectOperations_ArtifactRoot, operations: Lib_ArtifactAssembly_Runner_CollectOperations_Operations, destinationKinds: Lib_ArtifactAssembly_Runner_CollectOperations_DestinationKinds): Lib_ArtifactAssembly_Runner_CollectOperations_Returns {
    const stats: Lib_ArtifactAssembly_Runner_CollectOperations_Stats = await lstat(source);

    if (stats.isSymbolicLink() === true) {
      throw new Error(`Artifact source "${source}" is a symbolic link. Nova does not follow artifact symlinks.`);
    }

    if (stats.isDirectory() === false && stats.isFile() === false) {
      throw new Error(`Artifact source "${source}" is not a regular file or directory.`);
    }

    const kind: Lib_ArtifactAssembly_Runner_CollectOperations_Kind = (stats.isDirectory() === true) ? 'directory' : 'file';

    if (kind === 'file' && destination === artifactRoot) {
      throw new Error(`Artifact file source "${source}" must name a file destination instead of "./".`);
    }

    const portableDestination: Lib_ArtifactAssembly_Runner_CollectOperations_PortableDestination = destination.toLowerCase();
    const existingKind: Lib_ArtifactAssembly_Runner_CollectOperations_ExistingKind = destinationKinds.get(portableDestination);

    if (
      existingKind !== undefined
      && (
        existingKind === 'file'
        || kind === 'file'
      )
    ) {
      throw new Error(`Artifact sources collide at "${relative(artifactRoot, destination)}".`);
    }

    if (existingKind === undefined) {
      destinationKinds.set(portableDestination, kind);

      operations.push({
        kind,
        source,
        destination,
        mode: stats.mode % 512,
      });
    }

    if (kind === 'file') {
      return;
    }

    const entries: Lib_ArtifactAssembly_Runner_CollectOperations_Entries = await readdir(source, { withFileTypes: true });

    entries.sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const entrySource: Lib_ArtifactAssembly_Runner_CollectOperations_EntrySource = join(source, entry.name);
      const entryDestination: Lib_ArtifactAssembly_Runner_CollectOperations_EntryDestination = join(destination, entry.name);

      await Runner.collectOperations(entrySource, entryDestination, artifactRoot, operations, destinationKinds);
    }

    return;
  }

  /**
   * Lib - Artifact Assembly - Is Within.
   *
   * Determines whether a resolved candidate is the parent itself or a child of
   * it without relying on platform-specific path separators.
   *
   * @param {Lib_ArtifactAssembly_Runner_IsWithin_Parent}    parent    - Parent.
   * @param {Lib_ArtifactAssembly_Runner_IsWithin_Candidate} candidate - Candidate.
   *
   * @private
   *
   * @returns {Lib_ArtifactAssembly_Runner_IsWithin_Returns}
   *
   * @since 0.38.0
   */
  private static isWithin(parent: Lib_ArtifactAssembly_Runner_IsWithin_Parent, candidate: Lib_ArtifactAssembly_Runner_IsWithin_Candidate): Lib_ArtifactAssembly_Runner_IsWithin_Returns {
    const relativePath: Lib_ArtifactAssembly_Runner_IsWithin_RelativePath = relative(parent, candidate);

    return relativePath === '' || (
      relativePath !== '..'
      && relativePath.startsWith(`..${sep}`) === false
      && isAbsolute(relativePath) === false
    );
  }
}
