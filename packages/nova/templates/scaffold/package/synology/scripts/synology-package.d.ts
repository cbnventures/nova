/**
 * Synology Package.
 *
 * Defines the shared archive, metadata, and PNG structures used by the package
 * builder and checker.
 *
 * @since UNRELEASED
 */
type SynologyPackage_TarEntry = {
  name: string;
  mode: number;
  type: string;
  data: Buffer;
};

type SynologyPackage_TarEntries = SynologyPackage_TarEntry[];

type SynologyPackage_ListedTarEntry = SynologyPackage_TarEntry & {
  size: number;
};

type SynologyPackage_ListedTarEntries = SynologyPackage_ListedTarEntry[];

type SynologyPackage_InfoFields = Map<string, string>;

type SynologyPackage_PngDimensions = {
  width: number;
  height: number;
};
