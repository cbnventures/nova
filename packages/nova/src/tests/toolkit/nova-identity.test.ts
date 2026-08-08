import {
  ok,
  strictEqual,
  throws,
} from 'node:assert/strict';
import {
  mkdtempSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  describe,
  it,
} from 'vitest';

import { NovaIdentity } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_ComposesTheFullCopyrightLine_Copyright,
  Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_UsesAllRightsReservedForAProprietaryLicense_Copyright,
  Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_UsesTheLicenseNoticeForAnOssLicense_Copyright,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Copyright,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ProjectName,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Title,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Copyright,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_EditUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_OrganizationName,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Title,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsWhenNoConfigIsFound_StartDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsARangeForDifferentYears_Range,
  Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsASingleYearWhenEqual_CurrentYear,
  Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsASingleYearWhenEqual_Range,
  Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsANormalizedBaseUrlWithSlashes_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsARootBaseUrlForAnOriginOnlyUrl_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsUndefinedForAnInvalidDocumentationUrl_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityDocsUrl_ReturnsTheOriginOfADocumentationUrl_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityDocsUrl_ReturnsUndefinedForAnInvalidDocumentationUrl_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_BaseUrl,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_ConfigJson,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_ConfigPath,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_Identity,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_TemporaryDirectory,
  Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityGithubUserUrl_BuildsTheProfileUrl_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityNormalizeRepoUrl_StripsTheGitPrefixAndSuffix_Url,
  Tests_Toolkit_NovaIdentity_NovaIdentityStripTrailingSlash_RemovesASingleTrailingSlash_Url,
} from '../../types/tests/toolkit/nova-identity.test.d.ts';

/**
 * Tests - Toolkit - Nova Identity - Compose Copyright.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.composeCopyright', () => {
  it('composes the full copyright line', () => {
    const copyright: Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_ComposesTheFullCopyrightLine_Copyright = NovaIdentity.composeCopyright(2020, 'Acme LLC');

    ok(copyright.startsWith('Copyright © 2020-'));
    ok(copyright.endsWith('Acme LLC. All Rights Reserved.'));

    return;
  });

  it('uses the license notice for an oss license', () => {
    const copyright: Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_UsesTheLicenseNoticeForAnOssLicense_Copyright = NovaIdentity.composeCopyright(2020, 'Acme LLC', 'MIT');

    ok(copyright.startsWith('Copyright © 2020-'));
    ok(copyright.endsWith('Acme LLC. Licensed under the MIT License.'));

    return;
  });

  it('uses all rights reserved for a proprietary license', () => {
    const copyright: Tests_Toolkit_NovaIdentity_NovaIdentityComposeCopyright_UsesAllRightsReservedForAProprietaryLicense_Copyright = NovaIdentity.composeCopyright(2020, 'Acme LLC', 'Proprietary');

    ok(copyright.endsWith('Acme LLC. All Rights Reserved.'));

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Copyright Year Range.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.copyrightYearRange', () => {
  it('returns a range for different years', () => {
    const range: Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsARangeForDifferentYears_Range = NovaIdentity.copyrightYearRange(2000);

    ok(range.startsWith('2000-'));

    return;
  });

  it('returns a single year when equal', () => {
    const currentYear: Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsASingleYearWhenEqual_CurrentYear = new Date().getFullYear();
    const range: Tests_Toolkit_NovaIdentity_NovaIdentityCopyrightYearRange_ReturnsASingleYearWhenEqual_Range = NovaIdentity.copyrightYearRange(currentYear);

    strictEqual(range, String(currentYear));

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Normalize Repo URL.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.normalizeRepoUrl', () => {
  it('strips the git prefix and suffix', () => {
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityNormalizeRepoUrl_StripsTheGitPrefixAndSuffix_Url = NovaIdentity.normalizeRepoUrl('git+https://github.com/acme/widget.git');

    strictEqual(url, 'https://github.com/acme/widget');

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - GitHub User URL.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.githubUserUrl', () => {
  it('builds the profile url', () => {
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityGithubUserUrl_BuildsTheProfileUrl_Url = NovaIdentity.githubUserUrl('acme');

    strictEqual(url, 'https://github.com/acme');

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Strip Trailing Slash.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.stripTrailingSlash', () => {
  it('removes a single trailing slash', () => {
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityStripTrailingSlash_RemovesASingleTrailingSlash_Url = NovaIdentity.stripTrailingSlash('https://acme.example/');

    strictEqual(url, 'https://acme.example');

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Docs URL.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.docsUrl', () => {
  it('returns the origin of a documentation url', () => {
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityDocsUrl_ReturnsTheOriginOfADocumentationUrl_Url = NovaIdentity.docsUrl('https://acme.example/docs/');

    strictEqual(url, 'https://acme.example');

    return;
  });

  it('returns undefined for an invalid documentation url', () => {
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityDocsUrl_ReturnsUndefinedForAnInvalidDocumentationUrl_Url = NovaIdentity.docsUrl('not a url');

    strictEqual(url, undefined);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Docs Base URL.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.docsBaseUrl', () => {
  it('returns a normalized base url with slashes', () => {
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsANormalizedBaseUrlWithSlashes_BaseUrl = NovaIdentity.docsBaseUrl('https://acme.example/docs');

    strictEqual(baseUrl, '/docs/');

    return;
  });

  it('returns a root base url for an origin only url', () => {
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsARootBaseUrlForAnOriginOnlyUrl_BaseUrl = NovaIdentity.docsBaseUrl('https://acme.example');

    strictEqual(baseUrl, '/');

    return;
  });

  it('returns undefined for an invalid documentation url', () => {
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityDocsBaseUrl_ReturnsUndefinedForAnInvalidDocumentationUrl_BaseUrl = NovaIdentity.docsBaseUrl('not a url');

    strictEqual(baseUrl, undefined);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - Constructor.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.constructor', () => {
  it('resolves and projects a full config', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'Fixture',
          slug: 'fixture',
        },
        description: {
          short: 'A fixture project.',
        },
        legalName: 'Fixture LLC',
        startingYear: 2020,
        license: 'MIT',
      },
      github: {
        owner: 'acme',
      },
      urls: {
        homepage: 'https://fixture.example/',
        documentation: 'https://fixture.example/',
        logo: 'https://fixture.example/logo.svg',
        repository: 'git+https://github.com/acme/fixture.git',
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Identity = new NovaIdentity(temporaryDirectory);
    const title: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Title = identity.forDocs()['title'];
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Url = identity.forDocs()['url'];
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_BaseUrl = identity.forDocs()['baseUrl'];
    const organizationName: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_OrganizationName = identity.forDocs()['organizationName'];
    const editUrl: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_EditUrl = identity.forDocs()['editUrl'];
    const copyright: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ResolvesAndProjectsAFullConfig_Copyright = identity.forDocs()['copyright'];

    strictEqual(title, 'Fixture');
    strictEqual(url, 'https://fixture.example');
    strictEqual(baseUrl, '/');
    strictEqual(organizationName, 'acme');
    strictEqual(editUrl, 'https://github.com/acme/fixture');
    ok((copyright !== undefined) && copyright.endsWith('Fixture LLC. Licensed under the MIT License.'));

    return;
  });

  it('leaves optional links undefined when absent', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'Fixture',
          slug: 'fixture',
        },
        description: {
          short: 'A fixture project.',
        },
        legalName: 'Fixture LLC',
        startingYear: 2020,
      },
      github: {
        owner: 'acme',
      },
      urls: {
        homepage: 'https://fixture.example/',
        logo: 'https://fixture.example/logo.svg',
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesOptionalLinksUndefinedWhenAbsent_Identity = new NovaIdentity(temporaryDirectory);

    strictEqual(identity.forDocs()['editUrl'], undefined);
    strictEqual(identity.forDocs()['privacyPolicy'], undefined);
    strictEqual(identity.forDocs()['funding'].length, 0);

    return;
  });

  it('leaves missing fields undefined', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ConfigJson = JSON.stringify({
      project: {
        name: {
          slug: 'fixture',
        },
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Identity = new NovaIdentity(temporaryDirectory);
    const title: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Title = identity.forDocs()['title'];
    const projectName: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_ProjectName = identity.forDocs()['projectName'];
    const copyright: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_LeavesMissingFieldsUndefined_Copyright = identity.forDocs()['copyright'];

    strictEqual(title, undefined);
    strictEqual(projectName, 'fixture');
    strictEqual(copyright, undefined);

    return;
  });

  it('throws when no config is found', () => {
    const startDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsWhenNoConfigIsFound_StartDirectory = '/';

    throws(() => new NovaIdentity(startDirectory));

    return;
  });

  it('throws on wrong field types', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityConstructor_ThrowsOnWrongFieldTypes_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'Fixture',
          slug: 'fixture',
        },
        startingYear: 'twenty-twenty',
      },
    });

    writeFileSync(configPath, configJson);

    throws(() => new NovaIdentity(temporaryDirectory));

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Nova Identity - For Docs.
 *
 * @since 0.21.0
 */
describe('NovaIdentity.forDocs', () => {
  it('splits a subpath documentation url', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'ADT Pulse',
          slug: 'homebridge-adt-pulse',
        },
      },
      urls: {
        homepage: 'https://github.com/mrjackyliang/homebridge-adt-pulse',
        documentation: 'https://mrjackyliang.github.io/homebridge-adt-pulse/',
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_Identity = new NovaIdentity(temporaryDirectory);
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_Url = identity.forDocs()['url'];
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_SplitsASubpathDocumentationUrl_BaseUrl = identity.forDocs()['baseUrl'];

    strictEqual(url, 'https://mrjackyliang.github.io');
    strictEqual(baseUrl, '/homebridge-adt-pulse/');

    return;
  });

  it('uses a root base url for root documentation', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'Nova',
          slug: 'nova',
        },
      },
      urls: {
        documentation: 'https://nova.cbnventures.io/',
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_Identity = new NovaIdentity(temporaryDirectory);
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_Url = identity.forDocs()['url'];
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_UsesARootBaseUrlForRootDocumentation_BaseUrl = identity.forDocs()['baseUrl'];

    strictEqual(url, 'https://nova.cbnventures.io');
    strictEqual(baseUrl, '/');

    return;
  });

  it('leaves the url and base url undefined without documentation', () => {
    const temporaryDirectory: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_TemporaryDirectory = mkdtempSync(join(tmpdir(), 'nova-identity-'));
    const configPath: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_ConfigPath = join(temporaryDirectory, 'nova.config.json');
    const configJson: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_ConfigJson = JSON.stringify({
      project: {
        name: {
          title: 'Fixture',
          slug: 'fixture',
        },
      },
      urls: {
        homepage: 'https://fixture.example/',
      },
    });

    writeFileSync(configPath, configJson);

    const identity: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_Identity = new NovaIdentity(temporaryDirectory);
    const url: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_Url = identity.forDocs()['url'];
    const baseUrl: Tests_Toolkit_NovaIdentity_NovaIdentityForDocs_LeavesTheUrlAndBaseUrlUndefinedWithoutDocumentation_BaseUrl = identity.forDocs()['baseUrl'];

    strictEqual(url, undefined);
    strictEqual(baseUrl, undefined);

    return;
  });

  return;
});
