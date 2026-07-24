import {
  existsSync,
  readFileSync,
} from 'node:fs';
import {
  dirname,
  join,
} from 'node:path';

import { isPlainObject } from '../lib/utility.js';

import type {
  Toolkit_NovaIdentity_Runner_Bugs,
  Toolkit_NovaIdentity_Runner_ComposeCopyright_LegalName,
  Toolkit_NovaIdentity_Runner_ComposeCopyright_Returns,
  Toolkit_NovaIdentity_Runner_ComposeCopyright_StartingYear,
  Toolkit_NovaIdentity_Runner_ComposeCopyright_YearRange,
  Toolkit_NovaIdentity_Runner_Constructor_Cwd,
  Toolkit_NovaIdentity_Runner_Constructor_Github,
  Toolkit_NovaIdentity_Runner_Constructor_Parsed,
  Toolkit_NovaIdentity_Runner_Constructor_Project,
  Toolkit_NovaIdentity_Runner_Constructor_ProjectDescription,
  Toolkit_NovaIdentity_Runner_Constructor_ProjectName,
  Toolkit_NovaIdentity_Runner_Constructor_ResolvedConfigPath,
  Toolkit_NovaIdentity_Runner_Constructor_StartDirectory,
  Toolkit_NovaIdentity_Runner_Constructor_Urls,
  Toolkit_NovaIdentity_Runner_CopyrightYearRange_CurrentYear,
  Toolkit_NovaIdentity_Runner_CopyrightYearRange_Returns,
  Toolkit_NovaIdentity_Runner_CopyrightYearRange_StartingYear,
  Toolkit_NovaIdentity_Runner_Documentation,
  Toolkit_NovaIdentity_Runner_ForDocs_Returns,
  Toolkit_NovaIdentity_Runner_FundSources,
  Toolkit_NovaIdentity_Runner_GithubUserUrl_Owner,
  Toolkit_NovaIdentity_Runner_GithubUserUrl_Returns,
  Toolkit_NovaIdentity_Runner_Homepage,
  Toolkit_NovaIdentity_Runner_LegalName,
  Toolkit_NovaIdentity_Runner_Logo,
  Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_RepositoryUrl,
  Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_Returns,
  Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_Stripped,
  Toolkit_NovaIdentity_Runner_Npm,
  Toolkit_NovaIdentity_Runner_OptionalNumber_ConfigPath,
  Toolkit_NovaIdentity_Runner_OptionalNumber_FieldPath,
  Toolkit_NovaIdentity_Runner_OptionalNumber_Returns,
  Toolkit_NovaIdentity_Runner_OptionalNumber_Value,
  Toolkit_NovaIdentity_Runner_OptionalString_ConfigPath,
  Toolkit_NovaIdentity_Runner_OptionalString_FieldPath,
  Toolkit_NovaIdentity_Runner_OptionalString_Returns,
  Toolkit_NovaIdentity_Runner_OptionalString_Value,
  Toolkit_NovaIdentity_Runner_OptionalStringArray_Returns,
  Toolkit_NovaIdentity_Runner_OptionalStringArray_Value,
  Toolkit_NovaIdentity_Runner_Owner,
  Toolkit_NovaIdentity_Runner_PrivacyPolicy,
  Toolkit_NovaIdentity_Runner_ReadConfig_ConfigPath,
  Toolkit_NovaIdentity_Runner_ReadConfig_RawFile,
  Toolkit_NovaIdentity_Runner_ReadConfig_Returns,
  Toolkit_NovaIdentity_Runner_Repository,
  Toolkit_NovaIdentity_Runner_ResolveConfigPath_CandidatePath,
  Toolkit_NovaIdentity_Runner_ResolveConfigPath_CurrentDirectory,
  Toolkit_NovaIdentity_Runner_ResolveConfigPath_ParentDirectory,
  Toolkit_NovaIdentity_Runner_ResolveConfigPath_Returns,
  Toolkit_NovaIdentity_Runner_ResolveConfigPath_StartDirectory,
  Toolkit_NovaIdentity_Runner_Section_Key,
  Toolkit_NovaIdentity_Runner_Section_Returns,
  Toolkit_NovaIdentity_Runner_Section_Root,
  Toolkit_NovaIdentity_Runner_Section_Value,
  Toolkit_NovaIdentity_Runner_Slug,
  Toolkit_NovaIdentity_Runner_StartingYear,
  Toolkit_NovaIdentity_Runner_StripTrailingSlash_Returns,
  Toolkit_NovaIdentity_Runner_StripTrailingSlash_Url,
  Toolkit_NovaIdentity_Runner_Tagline,
  Toolkit_NovaIdentity_Runner_TermsOfUse,
  Toolkit_NovaIdentity_Runner_Title,
} from '../types/toolkit/nova-identity.d.ts';

/**
 * Toolkit - Nova Identity.
 *
 * Resolves project identity from the nearest nova.config.json,
 * exposing it as typed projections plus the pure transforms used to derive it,
 * so identity has one definition across configs, recipes, and generators.
 *
 * @since 0.21.0
 */
class Runner {
  /**
   * Toolkit - Nova Identity - Title.
   *
   * The human-facing project title from "project.name.title", used as the site
   * title and the base of the blog feed title.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #title: Toolkit_NovaIdentity_Runner_Title;

  /**
   * Toolkit - Nova Identity - Slug.
   *
   * The url-safe project slug from "project.name.slug", used as the Docusaurus
   * project name.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #slug: Toolkit_NovaIdentity_Runner_Slug;

  /**
   * Toolkit - Nova Identity - Tagline.
   *
   * The short project description reused as the site tagline and the SEO meta
   * description.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #tagline: Toolkit_NovaIdentity_Runner_Tagline;

  /**
   * Toolkit - Nova Identity - Legal Name.
   *
   * The legal entity name from "project.legalName", used to compose the
   * copyright line.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #legalName: Toolkit_NovaIdentity_Runner_LegalName;

  /**
   * Toolkit - Nova Identity - Starting Year.
   *
   * The project starting year from "project.startingYear", used for the
   * copyright year range.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #startingYear: Toolkit_NovaIdentity_Runner_StartingYear;

  /**
   * Toolkit - Nova Identity - Owner.
   *
   * The github owner handle from "github.owner", used for the organization name
   * and the social link.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #owner: Toolkit_NovaIdentity_Runner_Owner;

  /**
   * Toolkit - Nova Identity - Homepage.
   *
   * The canonical homepage url from "urls.homepage", before trailing-slash
   * normalization.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #homepage: Toolkit_NovaIdentity_Runner_Homepage;

  /**
   * Toolkit - Nova Identity - Logo.
   *
   * The absolute logo url from "urls.logo", consumed by the site theme header
   * and metadata.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #logo: Toolkit_NovaIdentity_Runner_Logo;

  /**
   * Toolkit - Nova Identity - Repository.
   *
   * The optional package repository url from "urls.repository", before the
   * git-url normalization.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #repository: Toolkit_NovaIdentity_Runner_Repository;

  /**
   * Toolkit - Nova Identity - Npm.
   *
   * The optional npm package url from "urls.npm", surfaced in the footer
   * links.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #npm: Toolkit_NovaIdentity_Runner_Npm;

  /**
   * Toolkit - Nova Identity - Bugs.
   *
   * The optional issue tracker url from "urls.bugs", surfaced in the footer
   * links.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #bugs: Toolkit_NovaIdentity_Runner_Bugs;

  /**
   * Toolkit - Nova Identity - Documentation.
   *
   * The optional documentation url from "urls.documentation", surfaced in the
   * footer links.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #documentation: Toolkit_NovaIdentity_Runner_Documentation;

  /**
   * Toolkit - Nova Identity - Privacy Policy.
   *
   * The optional privacy policy url from "urls.privacyPolicy", surfaced in the
   * footer legal links.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #privacyPolicy: Toolkit_NovaIdentity_Runner_PrivacyPolicy;

  /**
   * Toolkit - Nova Identity - Terms Of Use.
   *
   * The optional terms of use url from "urls.termsOfUse", surfaced in the
   * footer legal links.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #termsOfUse: Toolkit_NovaIdentity_Runner_TermsOfUse;

  /**
   * Toolkit - Nova Identity - Fund Sources.
   *
   * The list of funding urls from "urls.fundSources", empty when none are
   * configured.
   *
   * @private
   *
   * @since 0.21.0
   */
  readonly #fundSources: Toolkit_NovaIdentity_Runner_FundSources;

  /**
   * Toolkit - Nova Identity - Constructor.
   *
   * Walks up from the working directory to the nearest nova.config.json and
   * stores the optional identity subset, throwing only on file or type problems.
   *
   * @param {Toolkit_NovaIdentity_Runner_Constructor_Cwd} [cwd] - Cwd.
   *
   * @since 0.21.0
   */
  public constructor(cwd?: Toolkit_NovaIdentity_Runner_Constructor_Cwd) {
    const startDirectory: Toolkit_NovaIdentity_Runner_Constructor_StartDirectory = (cwd !== undefined) ? cwd : process.cwd();
    const resolvedConfigPath: Toolkit_NovaIdentity_Runner_Constructor_ResolvedConfigPath = Runner.resolveConfigPath(startDirectory);
    const parsed: Toolkit_NovaIdentity_Runner_Constructor_Parsed = Runner.readConfig(resolvedConfigPath);
    const project: Toolkit_NovaIdentity_Runner_Constructor_Project = Runner.section(parsed, 'project');
    const projectName: Toolkit_NovaIdentity_Runner_Constructor_ProjectName = Runner.section(project, 'name');
    const projectDescription: Toolkit_NovaIdentity_Runner_Constructor_ProjectDescription = Runner.section(project, 'description');
    const github: Toolkit_NovaIdentity_Runner_Constructor_Github = Runner.section(parsed, 'github');
    const urls: Toolkit_NovaIdentity_Runner_Constructor_Urls = Runner.section(parsed, 'urls');

    this.#title = Runner.optionalString(projectName['title'], 'project.name.title', resolvedConfigPath);
    this.#slug = Runner.optionalString(projectName['slug'], 'project.name.slug', resolvedConfigPath);
    this.#tagline = Runner.optionalString(projectDescription['short'], 'project.description.short', resolvedConfigPath);
    this.#legalName = Runner.optionalString(project['legalName'], 'project.legalName', resolvedConfigPath);
    this.#startingYear = Runner.optionalNumber(project['startingYear'], 'project.startingYear', resolvedConfigPath);
    this.#owner = Runner.optionalString(github['owner'], 'github.owner', resolvedConfigPath);
    this.#homepage = Runner.optionalString(urls['homepage'], 'urls.homepage', resolvedConfigPath);
    this.#logo = Runner.optionalString(urls['logo'], 'urls.logo', resolvedConfigPath);
    this.#repository = Runner.optionalString(urls['repository'], 'urls.repository', resolvedConfigPath);
    this.#npm = Runner.optionalString(urls['npm'], 'urls.npm', resolvedConfigPath);
    this.#bugs = Runner.optionalString(urls['bugs'], 'urls.bugs', resolvedConfigPath);
    this.#documentation = Runner.optionalString(urls['documentation'], 'urls.documentation', resolvedConfigPath);
    this.#privacyPolicy = Runner.optionalString(urls['privacyPolicy'], 'urls.privacyPolicy', resolvedConfigPath);
    this.#termsOfUse = Runner.optionalString(urls['termsOfUse'], 'urls.termsOfUse', resolvedConfigPath);
    this.#fundSources = Runner.optionalStringArray(urls['fundSources']);

    return;
  }

  /**
   * Toolkit - Nova Identity - For Docs.
   *
   * Projects the resolved identity into the shape a Docusaurus config consumes,
   * leaving each field undefined when its source is absent for the site to fill.
   *
   * @returns {Toolkit_NovaIdentity_Runner_ForDocs_Returns}
   *
   * @since 0.21.0
   */
  public forDocs(): Toolkit_NovaIdentity_Runner_ForDocs_Returns {
    return {
      title: this.#title,
      projectName: this.#slug,
      organizationName: this.#owner,
      tagline: this.#tagline,
      url: (this.#homepage !== undefined) ? Runner.stripTrailingSlash(this.#homepage) : undefined,
      logo: this.#logo,
      metaDescription: this.#tagline,
      copyright: (this.#startingYear !== undefined && this.#legalName !== undefined) ? Runner.composeCopyright(this.#startingYear, this.#legalName) : undefined,
      editUrl: (this.#repository !== undefined) ? Runner.normalizeRepoUrl(this.#repository) : undefined,
      repository: (this.#repository !== undefined) ? Runner.normalizeRepoUrl(this.#repository) : undefined,
      github: (this.#owner !== undefined) ? Runner.githubUserUrl(this.#owner) : undefined,
      npm: this.#npm,
      bugs: this.#bugs,
      documentation: this.#documentation,
      privacyPolicy: this.#privacyPolicy,
      termsOfUse: this.#termsOfUse,
      funding: this.#fundSources,
    };
  }

  /**
   * Toolkit - Nova Identity - Compose Copyright.
   *
   * Builds the full copyright line from the project starting year and legal
   * name. Delegates the year range so both consumers share one format.
   *
   * @param {Toolkit_NovaIdentity_Runner_ComposeCopyright_StartingYear} startingYear - Starting year.
   * @param {Toolkit_NovaIdentity_Runner_ComposeCopyright_LegalName}    legalName    - Legal name.
   *
   * @returns {Toolkit_NovaIdentity_Runner_ComposeCopyright_Returns}
   *
   * @since 0.21.0
   */
  public static composeCopyright(startingYear: Toolkit_NovaIdentity_Runner_ComposeCopyright_StartingYear, legalName: Toolkit_NovaIdentity_Runner_ComposeCopyright_LegalName): Toolkit_NovaIdentity_Runner_ComposeCopyright_Returns {
    const yearRange: Toolkit_NovaIdentity_Runner_ComposeCopyright_YearRange = Runner.copyrightYearRange(startingYear);

    return `Copyright © ${yearRange} ${legalName}. All Rights Reserved.`;
  }

  /**
   * Toolkit - Nova Identity - Copyright Year Range.
   *
   * Returns a single year when the starting year equals the current year, or a
   * "start-current" range otherwise, computing the current year at call time.
   *
   * @param {Toolkit_NovaIdentity_Runner_CopyrightYearRange_StartingYear} startingYear - Starting year.
   *
   * @returns {Toolkit_NovaIdentity_Runner_CopyrightYearRange_Returns}
   *
   * @since 0.21.0
   */
  public static copyrightYearRange(startingYear: Toolkit_NovaIdentity_Runner_CopyrightYearRange_StartingYear): Toolkit_NovaIdentity_Runner_CopyrightYearRange_Returns {
    const currentYear: Toolkit_NovaIdentity_Runner_CopyrightYearRange_CurrentYear = new Date().getFullYear();

    return (startingYear === currentYear) ? String(currentYear) : `${startingYear}-${currentYear}`;
  }

  /**
   * Toolkit - Nova Identity - GitHub User URL.
   *
   * Builds the canonical github profile url for an owner handle, used for the
   * footer social link.
   *
   * @param {Toolkit_NovaIdentity_Runner_GithubUserUrl_Owner} owner - Owner.
   *
   * @returns {Toolkit_NovaIdentity_Runner_GithubUserUrl_Returns}
   *
   * @since 0.21.0
   */
  public static githubUserUrl(owner: Toolkit_NovaIdentity_Runner_GithubUserUrl_Owner): Toolkit_NovaIdentity_Runner_GithubUserUrl_Returns {
    return `https://github.com/${owner}`;
  }

  /**
   * Toolkit - Nova Identity - Normalize Repo URL.
   *
   * Strips a leading "git+" prefix and a trailing ".git" suffix so a package
   * repository url becomes a browsable https url.
   *
   * @param {Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_RepositoryUrl} repositoryUrl - Repository url.
   *
   * @returns {Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_Returns}
   *
   * @since 0.21.0
   */
  public static normalizeRepoUrl(repositoryUrl: Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_RepositoryUrl): Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_Returns {
    let stripped: Toolkit_NovaIdentity_Runner_NormalizeRepoUrl_Stripped = repositoryUrl;

    if (stripped.startsWith('git+') === true) {
      stripped = stripped.slice(4);
    }

    if (stripped.endsWith('.git') === true) {
      stripped = stripped.slice(0, -4);
    }

    return stripped;
  }

  /**
   * Toolkit - Nova Identity - Strip Trailing Slash.
   *
   * Removes a single trailing slash from a url so the Docusaurus "url" field
   * never carries one.
   *
   * @param {Toolkit_NovaIdentity_Runner_StripTrailingSlash_Url} url - Url.
   *
   * @returns {Toolkit_NovaIdentity_Runner_StripTrailingSlash_Returns}
   *
   * @since 0.21.0
   */
  public static stripTrailingSlash(url: Toolkit_NovaIdentity_Runner_StripTrailingSlash_Url): Toolkit_NovaIdentity_Runner_StripTrailingSlash_Returns {
    return (url.endsWith('/') === true) ? url.slice(0, -1) : url;
  }

  /**
   * Toolkit - Nova Identity - Resolve Config Path.
   *
   * Ascends from the start directory until a directory holds a nova.config.json
   * file, throwing a clear error when the filesystem root is reached.
   *
   * @param {Toolkit_NovaIdentity_Runner_ResolveConfigPath_StartDirectory} startDirectory - Start directory.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_ResolveConfigPath_Returns}
   *
   * @since 0.21.0
   */
  private static resolveConfigPath(startDirectory: Toolkit_NovaIdentity_Runner_ResolveConfigPath_StartDirectory): Toolkit_NovaIdentity_Runner_ResolveConfigPath_Returns {
    let currentDirectory: Toolkit_NovaIdentity_Runner_ResolveConfigPath_CurrentDirectory = startDirectory;

    while (true) {
      const candidatePath: Toolkit_NovaIdentity_Runner_ResolveConfigPath_CandidatePath = join(currentDirectory, 'nova.config.json');

      if (existsSync(candidatePath) === true) {
        return candidatePath;
      }

      const parentDirectory: Toolkit_NovaIdentity_Runner_ResolveConfigPath_ParentDirectory = dirname(currentDirectory);

      if (parentDirectory === currentDirectory) {
        throw new Error(`NovaIdentity: no "nova.config.json" found (searched from "${startDirectory}" up to the filesystem root). Is this a nova project?`);
      }

      currentDirectory = parentDirectory;
    }
  }

  /**
   * Toolkit - Nova Identity - Read Config.
   *
   * Reads and JSON-parses the resolved config file, throwing a clear error when
   * the file cannot be read or is not valid JSON.
   *
   * @param {Toolkit_NovaIdentity_Runner_ReadConfig_ConfigPath} configPath - Config path.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_ReadConfig_Returns}
   *
   * @since 0.21.0
   */
  private static readConfig(configPath: Toolkit_NovaIdentity_Runner_ReadConfig_ConfigPath): Toolkit_NovaIdentity_Runner_ReadConfig_Returns {
    try {
      const rawFile: Toolkit_NovaIdentity_Runner_ReadConfig_RawFile = readFileSync(configPath, 'utf-8');

      return JSON.parse(rawFile);
    } catch (error) {
      throw new Error(`NovaIdentity: could not read or parse "${configPath}": ${String(error)}`);
    }
  }

  /**
   * Toolkit - Nova Identity - Section.
   *
   * Returns the nested object at a key when it is a plain object, otherwise an
   * empty object, so callers read leaf fields without null checks.
   *
   * @param {Toolkit_NovaIdentity_Runner_Section_Root} root - Root.
   * @param {Toolkit_NovaIdentity_Runner_Section_Key}  key  - Key.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_Section_Returns}
   *
   * @since 0.21.0
   */
  private static section(root: Toolkit_NovaIdentity_Runner_Section_Root, key: Toolkit_NovaIdentity_Runner_Section_Key): Toolkit_NovaIdentity_Runner_Section_Returns {
    const value: Toolkit_NovaIdentity_Runner_Section_Value = root[key];

    return (isPlainObject(value) === true) ? value : {};
  }

  /**
   * Toolkit - Nova Identity - Optional Number.
   *
   * Returns a present finite number and undefined when absent, throwing a
   * field-specific error when the value is present but not a finite number.
   *
   * @param {Toolkit_NovaIdentity_Runner_OptionalNumber_Value}      value      - Value.
   * @param {Toolkit_NovaIdentity_Runner_OptionalNumber_FieldPath}  fieldPath  - Field path.
   * @param {Toolkit_NovaIdentity_Runner_OptionalNumber_ConfigPath} configPath - Config path.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_OptionalNumber_Returns}
   *
   * @since 0.21.0
   */
  private static optionalNumber(value: Toolkit_NovaIdentity_Runner_OptionalNumber_Value, fieldPath: Toolkit_NovaIdentity_Runner_OptionalNumber_FieldPath, configPath: Toolkit_NovaIdentity_Runner_OptionalNumber_ConfigPath): Toolkit_NovaIdentity_Runner_OptionalNumber_Returns {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (typeof value !== 'number' || Number.isFinite(value) === false) {
      throw new Error(`NovaIdentity: field "${fieldPath}" must be a number in "${configPath}".`);
    }

    return value;
  }

  /**
   * Toolkit - Nova Identity - Optional String.
   *
   * Returns a present non-empty string and undefined when absent or blank,
   * throwing a field-specific error when the value is present but not a string.
   *
   * @param {Toolkit_NovaIdentity_Runner_OptionalString_Value}      value      - Value.
   * @param {Toolkit_NovaIdentity_Runner_OptionalString_FieldPath}  fieldPath  - Field path.
   * @param {Toolkit_NovaIdentity_Runner_OptionalString_ConfigPath} configPath - Config path.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_OptionalString_Returns}
   *
   * @since 0.21.0
   */
  private static optionalString(value: Toolkit_NovaIdentity_Runner_OptionalString_Value, fieldPath: Toolkit_NovaIdentity_Runner_OptionalString_FieldPath, configPath: Toolkit_NovaIdentity_Runner_OptionalString_ConfigPath): Toolkit_NovaIdentity_Runner_OptionalString_Returns {
    if (value === undefined || value === null) {
      return undefined;
    }

    if (typeof value !== 'string') {
      throw new Error(`NovaIdentity: field "${fieldPath}" must be a string in "${configPath}".`);
    }

    return (value.length > 0) ? value : undefined;
  }

  /**
   * Toolkit - Nova Identity - Optional String Array.
   *
   * Returns an array of the string values when present, dropping non-strings,
   * and an empty array otherwise, for optional list identity fields.
   *
   * @param {Toolkit_NovaIdentity_Runner_OptionalStringArray_Value} value - Value.
   *
   * @private
   *
   * @returns {Toolkit_NovaIdentity_Runner_OptionalStringArray_Returns}
   *
   * @since 0.21.0
   */
  private static optionalStringArray(value: Toolkit_NovaIdentity_Runner_OptionalStringArray_Value): Toolkit_NovaIdentity_Runner_OptionalStringArray_Returns {
    return (Array.isArray(value) === true) ? value.filter((entry) => typeof entry === 'string') : [];
  }
}

export default Runner;
