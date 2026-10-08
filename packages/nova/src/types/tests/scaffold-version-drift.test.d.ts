/**
 * Tests - Scaffold Version Drift - Scaffold Version Drift.
 *
 * @since 0.20.0
 */
export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_Manifest = {
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PackageDirectory = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestPaths = string[];

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestPath = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestRaw = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifests = Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_Manifest[];

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestRaw = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifest = Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_Manifest;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaVersion = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestIndex = number;

/**
 * Tests - Scaffold Version Drift - Scaffold Version Drift - Nova Dependency Matches The Current Version.
 *
 * @since 0.20.0
 */
export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifestPath = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifest = Partial<Record<'dependencies' | 'devDependencies', Record<string, string>>>;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldDependencies = Record<string, string>;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_NovaDependency = string;

/**
 * Tests - Scaffold Version Drift - Scaffold Version Drift - Preset Dependency Matches The Current Version.
 *
 * @since 0.20.0
 */
export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifestPath = string;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifest = Partial<Record<'dependencies' | 'devDependencies', Record<string, string>>>;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldDependencies = Record<string, string>;

export type Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_PresetDependency = string | undefined;
