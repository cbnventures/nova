/**
 * Lib - File Discovery - Discover Content Files.
 *
 * @since 0.20.0
 */
export type Lib_FileDiscovery_DiscoverContentFiles_Options_RootDir = string;

export type Lib_FileDiscovery_DiscoverContentFiles_Options_ContentDir = string;

export type Lib_FileDiscovery_DiscoverContentFiles_Options_ContentDirs = Lib_FileDiscovery_DiscoverContentFiles_Options_ContentDir[];

export type Lib_FileDiscovery_DiscoverContentFiles_Options_FileExtension = string;

export type Lib_FileDiscovery_DiscoverContentFiles_Options_FileExtensions = Lib_FileDiscovery_DiscoverContentFiles_Options_FileExtension[];

export type Lib_FileDiscovery_DiscoverContentFiles_Options = {
  rootDir?: Lib_FileDiscovery_DiscoverContentFiles_Options_RootDir;
  contentDirs?: Lib_FileDiscovery_DiscoverContentFiles_Options_ContentDirs;
  fileExtensions?: Lib_FileDiscovery_DiscoverContentFiles_Options_FileExtensions;
};

export type Lib_FileDiscovery_DiscoverContentFiles_Returns = Promise<Lib_FileDiscovery_DiscoverContentFiles_MdFiles>;

export type Lib_FileDiscovery_DiscoverContentFiles_RootDir = string;

export type Lib_FileDiscovery_DiscoverContentFiles_ContentDirs = string[];

export type Lib_FileDiscovery_DiscoverContentFiles_FileExtensions = string[];

export type Lib_FileDiscovery_DiscoverContentFiles_MdFile = string;

export type Lib_FileDiscovery_DiscoverContentFiles_MdFiles = Lib_FileDiscovery_DiscoverContentFiles_MdFile[];

export type Lib_FileDiscovery_DiscoverContentFiles_ContentPath = string;

export type Lib_FileDiscovery_DiscoverContentFiles_Entry = string;

export type Lib_FileDiscovery_DiscoverContentFiles_Entries = Lib_FileDiscovery_DiscoverContentFiles_Entry[];

export type Lib_FileDiscovery_DiscoverContentFiles_Ext = string;
