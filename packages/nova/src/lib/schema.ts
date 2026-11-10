import { z } from 'zod';

/**
 * Lib - Schema - Docker Hub Categories.
 *
 * Validates Docker Hub's public category list.
 * Configure and sync recipes consume the parsed name and slug pairs.
 *
 * @since 0.40.0
 */
export const libSchemaDockerHubCategories = z.array(z.object({
  name: z.string(),
  slug: z.string(),
}));

/**
 * Lib - Schema - Docker Hub Credential Helper Response.
 *
 * Validates credentials returned by a Docker credential helper.
 * Requiring both fields prevents incomplete logins from reaching the API.
 *
 * @since 0.40.0
 */
export const libSchemaDockerHubCredentialHelperResponse = z.object({
  Username: z.string().min(1),
  Secret: z.string().min(1),
});

/**
 * Lib - Schema - Docker Hub Docker Config.
 *
 * Validates the credential-related fields in Docker's local config file.
 * Unrelated Docker settings are deliberately ignored by the parser.
 *
 * @since 0.40.0
 */
export const libSchemaDockerHubDockerConfig = z.object({
  auths: z.record(z.string(), z.object({
    auth: z.string().optional(),
  })).optional(),
  credHelpers: z.record(z.string(), z.string()).optional(),
  credsStore: z.string().optional(),
});

/**
 * Lib - Schema - Docker Hub Login Response.
 *
 * Validates the token returned by Docker Hub authentication.
 * Sync requests proceed only when a non-empty token is present.
 *
 * @since 0.40.0
 */
export const libSchemaDockerHubLoginResponse = z.object({
  access_token: z.string().min(1),
});

/**
 * Lib - Schema - Docker Hub Repository.
 *
 * Validates the repository fields used by Docker Hub sync recipes.
 * The recipes depend on these values for safe diffing and permission checks.
 *
 * @since 0.40.0
 */
export const libSchemaDockerHubRepository = z.object({
  description: z.string().nullish().transform((value) => value ?? ''),
  full_description: z.string().nullish().transform((value) => value ?? ''),
  is_private: z.boolean(),
  categories: libSchemaDockerHubCategories,
  immutable_tags_settings: z.object({
    enabled: z.boolean(),
    rules: z.array(z.string()),
  }),
  permissions: z.object({
    write: z.boolean(),
  }),
});

/**
 * Lib - Schema - Node Releases Schedule.
 *
 * Validates the JSON response from the Node.js release schedule API.
 * Used by ApiNodeReleases to parse the LTS and end-of-life dates for each major version.
 *
 * @since 0.13.0
 */
export const libSchemaNodeReleasesSchedule = z.record(z.string(), z.object({
  lts: z.string().optional(),
  end: z.string(),
}));

/**
 * Lib - Schema - SPDX Licenses Response.
 *
 * Validates the JSON response from the SPDX licenses API. Used by
 * ApiSpdxLicenses to extract the list of valid license identifiers.
 *
 * @since 0.13.0
 */
export const libSchemaSpdxLicensesResponse = z.object({
  licenses: z.array(z.object({
    licenseId: z.string(),
  })),
});
