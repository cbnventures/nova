import { spawnSync } from 'node:child_process';
import {
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  join,
  relative,
} from 'node:path';

/**
 * Scripts - Lib - Scaffold Versions - Catalog Source.
 *
 * Describes every authoritative source and update policy understood by the
 * repository-only scaffold version auditor.
 *
 * @typedef {(
 *   {type: 'cloudflare-date', strategy: 'coupled'}
 *   | {type: 'derived', from: string, field: 'downloadChecksum'}
 *   | {type: 'docker-hub', repository: string, strategy: 'pattern', pattern: string}
 *   | {type: 'github-release', repository: string, strategy: 'latest-major'}
 *   | {type: 'gradle-current', strategy: 'same-major'}
 *   | {type: 'manual', reason?: string}
 *   | {type: 'maven-metadata', url: string, strategy: 'latest' | 'same-major'}
 *   | {type: 'node-lts', strategy: 'active-lts'}
 *   | {type: 'npm', package: string, strategy: 'latest' | 'same-major', prefix?: string}
 * )} ScaffoldVersionCatalogSource
 *
 * @since 0.0.0
 */

/**
 * Scripts - Lib - Scaffold Versions - Catalog.
 *
 * Defines the checked-in snapshot and the metadata required to audit each
 * third-party scaffold value.
 *
 * @typedef {{
 *   value: string,
 *   placeholder: string,
 *   group: string,
 *   source: ScaffoldVersionCatalogSource,
 * }} ScaffoldVersionCatalogEntry
 * @typedef {{
 *   schemaVersion: number,
 *   entries: Record<string, ScaffoldVersionCatalogEntry>,
 * }} ScaffoldVersionCatalog
 *
 * @since 0.0.0
 */

/**
 * Scripts - Lib - Scaffold Versions - Fetch.
 *
 * Captures the small Fetch response surface used by the updater so unit tests
 * can provide source fixtures without network access.
 *
 * @typedef {{
 *   ok: boolean,
 *   status: number,
 *   json: () => Promise<unknown>,
 *   text: () => Promise<string>,
 * }} ScaffoldVersionFetchResponse
 * @typedef {(url: string, init?: {headers: Record<string, string>}) => Promise<ScaffoldVersionFetchResponse>} ScaffoldVersionFetch
 *
 * @since 0.0.0
 */

/**
 * Scripts - Lib - Scaffold Versions - Source Metadata.
 *
 * Defines the exact upstream response fragments consumed by the supported
 * npm, Docker, Node, and Gradle resolvers.
 *
 * @typedef {{versions?: Record<string, unknown>}} ScaffoldVersionNpmMetadata
 * @typedef {{next?: unknown, results?: Array<{name?: unknown}>}} ScaffoldVersionDockerMetadata
 * @typedef {{tag_name?: unknown}} ScaffoldVersionGithubReleaseMetadata
 * @typedef {{lts: string | false, end: string}} ScaffoldVersionNodeRelease
 * @typedef {Record<string, ScaffoldVersionNodeRelease>} ScaffoldVersionNodeSchedule
 * @typedef {{version: string, checksum?: unknown, broken?: unknown, final?: unknown}} ScaffoldVersionGradleMetadata
 * @typedef {{candidate: string, downloadChecksum: string | undefined}} ScaffoldVersionGradleResolution
 * @typedef {Map<string, ScaffoldVersionGradleResolution>} ScaffoldVersionResolutionMetadata
 *
 * @since 0.0.0
 */

/**
 * Scripts - Lib - Scaffold Versions - Audit.
 *
 * Describes read-only audit results and the explicit options accepted by the
 * repository maintenance command.
 *
 * @typedef {{
 *   candidate: string,
 *   current: string,
 *   group: string,
 *   key: string,
 *   sourceType: ScaffoldVersionCatalogSource['type'],
 * }} ScaffoldVersionAuditResult
 * @typedef {{
 *   manual: ScaffoldVersionAuditResult[],
 *   results: ScaffoldVersionAuditResult[],
 *   updates: ScaffoldVersionAuditResult[],
 * }} ScaffoldVersionAudit
 * @typedef {{
 *   fetchImpl?: ScaffoldVersionFetch,
 *   group?: string | undefined,
 *   now?: Date,
 * }} ScaffoldVersionAuditOptions
 *
 * @since 0.0.0
 */

/**
 * Scripts - Lib - Scaffold Versions - Write Options.
 *
 * Defines the wrapper assets and repository paths used only after a maintainer
 * explicitly chooses update mode.
 *
 * @typedef {{content: Buffer, mode: number, relativePath: string}} ScaffoldVersionWrapperAsset
 * @typedef {{
 *   androidTemplateDirectory: string,
 *   audit: ScaffoldVersionAudit,
 *   catalog: ScaffoldVersionCatalog,
 *   catalogPath: string,
 * }} ScaffoldVersionWriteOptions
 *
 * @since 0.0.0
 */

/**
 * Lib - Scaffold Versions - Fetch JSON.
 *
 * Reads one authoritative JSON endpoint and reports its URL when the remote
 * service cannot provide a successful response.
 *
 * @param {string}               url       - Url.
 * @param {ScaffoldVersionFetch} fetchImpl - Fetch impl.
 *
 * @returns {Promise<unknown>}
 *
 * @since 0.0.0
 */
async function fetchJson(url, fetchImpl) {
  const headers = {
    accept: 'application/json',
  };
  const githubToken = process.env['GITHUB_TOKEN'];

  if (url.startsWith('https://api.github.com/') === true) {
    Reflect.set(headers, 'x-github-api-version', '2022-11-28');

    if (githubToken !== undefined && githubToken !== '') {
      Reflect.set(headers, 'authorization', `Bearer ${githubToken}`);
    }
  }

  const response = await fetchImpl(url, {
    headers,
  });

  if (response['ok'] !== true) {
    throw new Error(`Version source returned HTTP ${response['status']}: ${url}`);
  }

  return response.json();
}

/**
 * Lib - Scaffold Versions - Fetch Text.
 *
 * Reads one authoritative text endpoint and reports its URL when the remote
 * service cannot provide a successful response.
 *
 * @param {string}               url       - Url.
 * @param {ScaffoldVersionFetch} fetchImpl - Fetch impl.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function fetchText(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: {
      accept: 'application/xml, text/xml, text/plain',
    },
  });

  if (response['ok'] !== true) {
    throw new Error(`Version source returned HTTP ${response['status']}: ${url}`);
  }

  return response.text();
}

/**
 * Lib - Scaffold Versions - Numeric Version Parts.
 *
 * Converts a stable dotted version or image tag into comparable numeric
 * components while ignoring a Docker variant suffix.
 *
 * @param {string} version - Version.
 *
 * @returns {number[]}
 *
 * @since 0.0.0
 */
function numericVersionParts(version) {
  const numericVersion = version.split('-')[0] ?? '';

  return numericVersion.split('.').map((part) => {
    const parsed = Number.parseInt(part, 10);

    return (Number.isNaN(parsed) === true) ? 0 : parsed;
  });
}

/**
 * Lib - Scaffold Versions - Compare Versions.
 *
 * Sorts the stable numeric forms used by npm, Maven, Gradle, and the selected
 * Docker tag families.
 *
 * @param {string} left  - Left.
 * @param {string} right - Right.
 *
 * @returns {number}
 *
 * @since 0.0.0
 */
export function compareVersions(left, right) {
  const leftParts = numericVersionParts(left);
  const rightParts = numericVersionParts(right);
  const length = Math.max(leftParts.length, rightParts.length);

  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index] ?? 0;
    const rightPart = rightParts[index] ?? 0;

    if (leftPart !== rightPart) {
      return leftPart - rightPart;
    }
  }

  return left.localeCompare(right);
}

/**
 * Lib - Scaffold Versions - Select Stable Version.
 *
 * Selects the newest stable candidate, optionally preserving the current major
 * so framework migrations remain deliberate instead of arriving by surprise.
 *
 * @param {string[]} versions - Versions.
 * @param {string}   current  - Current.
 * @param {string}   strategy - Strategy.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function selectStableVersion(versions, current, strategy) {
  const currentVersion = (current.includes('@') === true) ? (current.split('@').at(-1) ?? current) : current;
  const currentMajor = numericVersionParts(currentVersion)[0] ?? 0;
  const stableVersions = versions.filter((version) => {
    if (version.includes('-') === true) {
      return false;
    }

    if (strategy === 'same-major') {
      return (numericVersionParts(version)[0] ?? 0) === currentMajor;
    }

    return true;
  }).sort(compareVersions);

  return stableVersions.at(-1) ?? currentVersion;
}

/**
 * Lib - Scaffold Versions - Maven Versions.
 *
 * Extracts every declared version from Maven metadata without introducing an
 * XML dependency into Nova's repository-only maintenance tooling.
 *
 * @param {string} metadata - Metadata.
 *
 * @returns {string[]}
 *
 * @since 0.0.0
 */
function mavenVersions(metadata) {
  return metadata.split('<version>').slice(1).map((segment) => segment.split('</version>')[0] ?? '').filter((version) => version !== '');
}

/**
 * Lib - Scaffold Versions - Resolve npm Candidate.
 *
 * Reads npm's reduced install metadata so same-major policies can choose the
 * newest compatible stable release instead of blindly following `latest`.
 *
 * @param {ScaffoldVersionCatalogEntry} entry     - Entry.
 * @param {ScaffoldVersionFetch}        fetchImpl - Fetch impl.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveNpmCandidate(entry, fetchImpl) {
  if (entry['source']['type'] !== 'npm') {
    throw new Error('npm candidate resolver requires an npm catalog source.');
  }

  const packageName = entry['source']['package'];
  const packageUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;
  const response = await fetchImpl(packageUrl, {
    headers: {
      accept: 'application/vnd.npm.install-v1+json',
    },
  });

  if (response['ok'] !== true) {
    throw new Error(`Version source returned HTTP ${response['status']}: ${packageUrl}`);
  }

  const metadata = /** @type {ScaffoldVersionNpmMetadata} */ (await response.json());
  const versions = Object.keys(metadata['versions'] ?? {});
  const prefix = entry['source']['prefix'] ?? '';
  const current = (entry['value'].startsWith(prefix) === true) ? entry['value'].slice(prefix.length) : entry['value'];
  const candidate = selectStableVersion(versions, current, entry['source']['strategy']);

  return `${prefix}${candidate}`;
}

/**
 * Lib - Scaffold Versions - Resolve Docker Candidate.
 *
 * Follows Docker Hub's paginated tag feed and selects the newest tag accepted
 * by the catalog's deliberately narrow image-family pattern.
 *
 * @param {ScaffoldVersionCatalogEntry} entry     - Entry.
 * @param {ScaffoldVersionFetch}        fetchImpl - Fetch impl.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveDockerCandidate(entry, fetchImpl) {
  if (entry['source']['type'] !== 'docker-hub') {
    throw new Error('Docker candidate resolver requires a Docker Hub catalog source.');
  }

  const pattern = new RegExp(entry['source']['pattern'], 'u');
  const tags = [];
  let nextUrl = `https://hub.docker.com/v2/repositories/${entry['source']['repository']}/tags?page_size=100`;
  let page = 0;

  while (nextUrl !== '' && page < 10) {
    const metadata = /** @type {ScaffoldVersionDockerMetadata} */ (await fetchJson(nextUrl, fetchImpl));

    for (const result of metadata['results'] ?? []) {
      if (typeof result['name'] === 'string' && pattern.test(result['name']) === true) {
        tags.push(result['name']);
      }
    }

    nextUrl = (typeof metadata['next'] === 'string') ? metadata['next'] : '';
    page += 1;
  }

  return tags.sort(compareVersions).at(-1) ?? entry['value'];
}

/**
 * Lib - Scaffold Versions - Resolve GitHub Release Candidate.
 *
 * Converts an action's latest stable GitHub release into its floating major
 * reference so generated workflows receive compatible patch updates directly.
 *
 * @param {ScaffoldVersionCatalogEntry} entry     - Entry.
 * @param {ScaffoldVersionFetch}        fetchImpl - Fetch impl.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveGithubReleaseCandidate(entry, fetchImpl) {
  if (entry['source']['type'] !== 'github-release') {
    throw new Error('GitHub release candidate resolver requires a GitHub release catalog source.');
  }

  const repository = entry['source']['repository'];
  const releaseUrl = `https://api.github.com/repos/${repository}/releases/latest`;
  const metadata = /** @type {ScaffoldVersionGithubReleaseMetadata} */ (await fetchJson(releaseUrl, fetchImpl));
  const tagName = metadata['tag_name'];

  if (typeof tagName !== 'string' || tagName === '') {
    throw new Error(`GitHub's latest release did not provide a tag for ${repository}.`);
  }

  const version = (tagName.startsWith('v') === true) ? tagName.slice(1) : tagName;
  const majorPart = version.split('.')[0] ?? '';
  const major = Number.parseInt(majorPart, 10);

  if (Number.isNaN(major) === true || major < 1) {
    throw new Error(`GitHub's latest release tag is not a stable semantic version for ${repository}: ${tagName}`);
  }

  return `${repository}@v${major}`;
}

/**
 * Lib - Scaffold Versions - Resolve Maven Candidate.
 *
 * Selects a stable Maven release using the same major-change policy as npm
 * packages so Android framework migrations remain reviewable.
 *
 * @param {ScaffoldVersionCatalogEntry} entry     - Entry.
 * @param {ScaffoldVersionFetch}        fetchImpl - Fetch impl.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveMavenCandidate(entry, fetchImpl) {
  if (entry['source']['type'] !== 'maven-metadata') {
    throw new Error('Maven candidate resolver requires a Maven metadata catalog source.');
  }

  const metadata = await fetchText(entry['source']['url'], fetchImpl);

  return selectStableVersion(mavenVersions(metadata), entry['value'], entry['source']['strategy']);
}

/**
 * Lib - Scaffold Versions - Resolve Node Engine Candidate.
 *
 * Converts Node's official release schedule into the union of active LTS
 * majors that Nova-generated projects support.
 *
 * @param {ScaffoldVersionFetch} fetchImpl - Fetch impl.
 * @param {Date}                 now       - Now.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveNodeEngineCandidate(fetchImpl, now) {
  const schedule = /** @type {ScaffoldVersionNodeSchedule} */ (await fetchJson('https://raw.githubusercontent.com/nodejs/Release/main/schedule.json', fetchImpl));
  const date = now.toISOString().slice(0, 10);
  const majors = Object.entries(schedule).filter((scheduleEntry) => {
    const release = scheduleEntry[1];

    return release['lts'] !== false
      && release['lts'] <= date
      && release['end'] >= date;
  }).map((scheduleEntry) => Number.parseInt(scheduleEntry[0].slice(1), 10)).filter((major) => Number.isNaN(major) === false).sort((left, right) => left - right);

  if (majors.length === 0) {
    throw new Error('Node release schedule did not contain an active LTS major.');
  }

  return majors.map((major) => `^${major}`).join(' || ');
}

/**
 * Lib - Scaffold Versions - Resolve Gradle Candidate.
 *
 * Reads Gradle's complete release feed so the newest stable release from the
 * currently tested major and its verified checksum can move together. Using
 * the full feed keeps patch updates visible after Gradle publishes a new major.
 *
 * @param {ScaffoldVersionCatalogEntry} entry     - Entry.
 * @param {ScaffoldVersionFetch}        fetchImpl - Fetch impl.
 *
 * @returns {Promise<ScaffoldVersionGradleResolution>}
 *
 * @since 0.0.0
 */
async function resolveGradleCandidate(entry, fetchImpl) {
  if (entry['source']['type'] !== 'gradle-current') {
    throw new Error('Gradle candidate resolver requires a Gradle catalog source.');
  }

  const releases = /** @type {ScaffoldVersionGradleMetadata[]} */ (await fetchJson('https://services.gradle.org/versions/all', fetchImpl));
  const stableReleases = releases.filter((release) => release['final'] === true && release['broken'] !== true);
  const candidate = selectStableVersion(stableReleases.map((release) => release['version']), entry['value'], entry['source']['strategy']);

  if (candidate === entry['value']) {
    return {
      candidate,
      downloadChecksum: undefined,
    };
  }

  const metadata = stableReleases.find((release) => release['version'] === candidate);

  if (
    metadata === undefined
    || typeof metadata['checksum'] !== 'string'
    || metadata['checksum'] === ''
  ) {
    throw new Error('Gradle release metadata did not provide a distribution checksum.');
  }

  return {
    candidate,
    downloadChecksum: metadata['checksum'],
  };
}

/**
 * Lib - Scaffold Versions - Resolve Catalog Entry.
 *
 * Dispatches one catalog entry to its authoritative source while leaving
 * manual policy values unchanged.
 *
 * @param {string}                            key       - Key.
 * @param {ScaffoldVersionCatalogEntry}       entry     - Entry.
 * @param {ScaffoldVersionFetch}              fetchImpl - Fetch impl.
 * @param {Date}                              now       - Now.
 * @param {ScaffoldVersionResolutionMetadata} metadata  - Metadata.
 *
 * @returns {Promise<string>}
 *
 * @since 0.0.0
 */
async function resolveCatalogEntry(key, entry, fetchImpl, now, metadata) {
  if (
    entry['source']['type'] === 'manual'
    || entry['source']['type'] === 'derived'
    || entry['source']['type'] === 'cloudflare-date'
  ) {
    return entry['value'];
  }

  if (entry['source']['type'] === 'npm') {
    return resolveNpmCandidate(entry, fetchImpl);
  }

  if (entry['source']['type'] === 'docker-hub') {
    return resolveDockerCandidate(entry, fetchImpl);
  }

  if (entry['source']['type'] === 'github-release') {
    return resolveGithubReleaseCandidate(entry, fetchImpl);
  }

  if (entry['source']['type'] === 'maven-metadata') {
    return resolveMavenCandidate(entry, fetchImpl);
  }

  if (entry['source']['type'] === 'node-lts') {
    return resolveNodeEngineCandidate(fetchImpl, now);
  }

  if (entry['source']['type'] === 'gradle-current') {
    const gradle = await resolveGradleCandidate(entry, fetchImpl);

    metadata.set(key, gradle);

    return gradle['candidate'];
  }

  throw new Error('Unsupported scaffold version source type.');
}

/**
 * Lib - Scaffold Versions - Audit Scaffold Version Catalog.
 *
 * Resolves stable upstream candidates without mutating the catalog. Coupled
 * Cloudflare and Gradle values are finalized only after their primary package
 * candidates have been evaluated.
 *
 * @param {ScaffoldVersionCatalog}      catalog - Catalog.
 * @param {ScaffoldVersionAuditOptions} options - Options.
 *
 * @returns {Promise<ScaffoldVersionAudit>}
 *
 * @since 0.0.0
 */
export async function auditScaffoldVersionCatalog(catalog, options = {}) {
  const fetchImpl = options['fetchImpl'] ?? fetch;
  const now = options['now'] ?? new Date();
  const requestedGroup = options['group'];
  const metadata = new Map();
  const results = /** @type {ScaffoldVersionAuditResult[]} */ ([]);
  const selectedEntries = Object.entries(catalog['entries']).filter((catalogEntry) => requestedGroup === undefined || catalogEntry[1]['group'] === requestedGroup);

  for (const catalogEntry of selectedEntries) {
    const key = catalogEntry[0];
    const entry = catalogEntry[1];
    const candidate = await resolveCatalogEntry(key, entry, fetchImpl, now, metadata);

    results.push({
      candidate,
      current: entry['value'],
      group: entry['group'],
      key,
      sourceType: entry['source']['type'],
    });
  }

  const cloudflareChanged = results.some((result) => (
    result['group'] === 'cloudflare'
    && result['sourceType'] !== 'cloudflare-date'
    && result['current'] !== result['candidate']
  ));

  for (const result of results) {
    if (result['sourceType'] === 'cloudflare-date' && cloudflareChanged === true) {
      result.candidate = now.toISOString().slice(0, 10);
    }

    if (result['sourceType'] === 'derived') {
      const entry = catalog['entries'][result['key']];

      if (entry === undefined || entry['source']['type'] !== 'derived') {
        throw new Error(`Derived scaffold version entry is missing or invalid: ${result['key']}`);
      }

      const sourceMetadata = metadata.get(entry['source']['from']);

      if (
        sourceMetadata !== undefined
        && sourceMetadata[entry['source']['field']] !== undefined
      ) {
        result.candidate = sourceMetadata[entry['source']['field']];
      }
    }
  }

  return {
    manual: results.filter((result) => result['sourceType'] === 'manual'),
    results,
    updates: results.filter((result) => result['current'] !== result['candidate']),
  };
}

/**
 * Lib - Scaffold Versions - Apply Scaffold Version Audit.
 *
 * Returns a new catalog containing the audited candidates while preserving all
 * source metadata and ordering from the checked-in snapshot.
 *
 * @param {ScaffoldVersionCatalog} catalog - Catalog.
 * @param {ScaffoldVersionAudit}   audit   - Audit.
 *
 * @returns {ScaffoldVersionCatalog}
 *
 * @since 0.0.0
 */
export function applyScaffoldVersionAudit(catalog, audit) {
  const updatedCatalog = structuredClone(catalog);

  for (const update of audit['updates']) {
    const entry = updatedCatalog['entries'][update['key']];

    if (entry === undefined) {
      throw new Error(`Scaffold version audit referenced an unknown catalog key: ${update['key']}`);
    }

    entry.value = update['candidate'];
  }

  return updatedCatalog;
}

/**
 * Lib - Scaffold Versions - Read Scaffold Version Catalog.
 *
 * Reads and validates the repository's bundled scaffold version snapshot. The
 * validation stops malformed maintenance input before any upstream requests.
 *
 * @param {string} catalogPath - Catalog path.
 *
 * @returns {Promise<ScaffoldVersionCatalog>}
 *
 * @since 0.0.0
 */
export async function readScaffoldVersionCatalog(catalogPath) {
  const raw = await readFile(catalogPath, 'utf-8');
  const catalog = /** @type {ScaffoldVersionCatalog} */ (JSON.parse(raw));

  if (
    catalog['schemaVersion'] !== 1
    || typeof catalog['entries'] !== 'object'
    || catalog['entries'] === null
  ) {
    throw new Error('Scaffold version catalog must use schemaVersion 1 and contain an entries object.');
  }

  return catalog;
}

/**
 * Lib - Scaffold Versions - Copy Directory.
 *
 * Copies the Android template into an isolated project without relying on the
 * newer experimental recursive-copy API in Nova's earliest Node 22 runtime.
 *
 * @param {string} source      - Source.
 * @param {string} destination - Destination.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function copyDirectory(source, destination) {
  await mkdir(destination, { recursive: true });

  const entries = await readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    if (entry.isDirectory() === true) {
      await copyDirectory(sourcePath, destinationPath);

      continue;
    }

    await copyFile(sourcePath, destinationPath);
  }

  return;
}

/**
 * Lib - Scaffold Versions - Render Directory.
 *
 * Replaces catalog placeholders inside a temporary Gradle project while
 * preserving binary wrapper assets.
 *
 * @param {string}                 directory - Directory.
 * @param {ScaffoldVersionCatalog} catalog   - Catalog.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function renderDirectory(directory, catalog) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory() === true) {
      await renderDirectory(entryPath, catalog);

      continue;
    }

    if (entry.name.endsWith('.jar') === true) {
      continue;
    }

    let content = await readFile(entryPath, 'utf-8');

    for (const catalogEntry of Object.values(catalog['entries'])) {
      content = content.replaceAll(catalogEntry['placeholder'], catalogEntry['value']);
    }

    await writeFile(entryPath, content, 'utf-8');
  }

  return;
}

/**
 * Lib - Scaffold Versions - Regenerate Gradle Wrapper.
 *
 * Uses Gradle's official wrapper task twice in an isolated rendered project,
 * then returns the scripts and JAR that must accompany a Gradle catalog update.
 *
 * @param {string}                 templateDirectory - Template directory.
 * @param {ScaffoldVersionCatalog} catalog           - Catalog.
 *
 * @returns {Promise<ScaffoldVersionWrapperAsset[]>}
 *
 * @since 0.0.0
 */
async function regenerateGradleWrapper(templateDirectory, catalog) {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'nova-gradle-wrapper-'));
  const projectDirectory = join(temporaryDirectory, 'project');

  try {
    await copyDirectory(templateDirectory, projectDirectory);
    await renderDirectory(projectDirectory, catalog);

    const gradlewPath = join(projectDirectory, 'gradlew');
    const gradleEntry = catalog['entries']['gradle'];
    const gradleChecksumEntry = catalog['entries']['gradleSha256'];

    if (gradleEntry === undefined || gradleChecksumEntry === undefined) {
      throw new Error('Gradle wrapper regeneration requires gradle and gradleSha256 catalog entries.');
    }

    const gradleVersion = gradleEntry['value'];
    const gradleChecksum = gradleChecksumEntry['value'];

    await chmod(gradlewPath, Number.parseInt('755', 8));

    for (let pass = 0; pass < 2; pass += 1) {
      const result = spawnSync(gradlewPath, [
        'wrapper',
        '--gradle-version',
        gradleVersion,
        '--distribution-type',
        'bin',
        '--gradle-distribution-sha256-sum',
        gradleChecksum,
      ], {
        cwd: projectDirectory,
        stdio: 'inherit',
      });

      if (result.status !== 0) {
        throw new Error(`Gradle wrapper regeneration failed during pass ${pass + 1}.`);
      }
    }

    const relativePaths = [
      'gradlew',
      'gradlew.bat',
      'gradle/wrapper/gradle-wrapper.jar',
    ];
    const assets = /** @type {ScaffoldVersionWrapperAsset[]} */ ([]);

    for (const relativePath of relativePaths) {
      const assetPath = join(projectDirectory, relativePath);
      const assetStats = await stat(assetPath);

      assets.push({
        content: await readFile(assetPath),
        mode: assetStats.mode,
        relativePath,
      });
    }

    return assets;
  } finally {
    await rm(temporaryDirectory, {
      force: true,
      recursive: true,
    });
  }
}

/**
 * Lib - Scaffold Versions - Write Scaffold Version Catalog.
 *
 * Writes an audited catalog and, when Gradle changed, regenerates its official
 * wrapper assets before modifying any checked-in file.
 *
 * @param {ScaffoldVersionWriteOptions} options - Options.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
export async function writeScaffoldVersionCatalog(options) {
  const gradleChanged = options['audit']['updates'].some((update) => update['key'] === 'gradle');
  let wrapperAssets = /** @type {ScaffoldVersionWrapperAsset[]} */ ([]);

  if (gradleChanged === true) {
    wrapperAssets = await regenerateGradleWrapper(options['androidTemplateDirectory'], options['catalog']);
  }

  await writeFile(options['catalogPath'], `${JSON.stringify(options['catalog'], null, 2)}\n`, 'utf-8');

  for (const wrapperAsset of wrapperAssets) {
    const destinationPath = join(options['androidTemplateDirectory'], wrapperAsset['relativePath']);

    await writeFile(destinationPath, wrapperAsset['content']);
    await chmod(destinationPath, wrapperAsset['mode']);
  }

  return;
}

/**
 * Lib - Scaffold Versions - Relative Catalog Path.
 *
 * Formats catalog paths in diagnostics without exposing a machine-specific
 * absolute checkout path.
 *
 * @param {string} root        - Root.
 * @param {string} catalogPath - Catalog path.
 *
 * @returns {string}
 *
 * @since 0.0.0
 */
export function relativeCatalogPath(root, catalogPath) {
  return relative(root, catalogPath);
}
