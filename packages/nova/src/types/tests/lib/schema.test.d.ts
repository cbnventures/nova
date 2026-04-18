/**
 * Tests - Lib - Schema - Node Releases Schedule.
 *
 * @since 0.13.0
 */
export type TestsLibSchemaNodeReleasesScheduleEntryLts = string | undefined;

export type TestsLibSchemaNodeReleasesScheduleEntryEnd = string;

export type TestsLibSchemaNodeReleasesScheduleEntry = {
  lts?: TestsLibSchemaNodeReleasesScheduleEntryLts;
  end: TestsLibSchemaNodeReleasesScheduleEntryEnd;
};

export type TestsLibSchemaNodeReleasesScheduleResult = Record<string, TestsLibSchemaNodeReleasesScheduleEntry>;

export type TestsLibSchemaNodeReleasesScheduleEntryOrUndefined = TestsLibSchemaNodeReleasesScheduleEntry | undefined;

/**
 * Tests - Lib - Schema - SPDX Licenses Response.
 *
 * @since 0.13.0
 */
export type TestsLibSchemaSpdxLicenseEntryLicenseId = string;

export type TestsLibSchemaSpdxLicenseEntry = {
  licenseId: TestsLibSchemaSpdxLicenseEntryLicenseId;
};

export type TestsLibSchemaSpdxLicensesResultLicenses = TestsLibSchemaSpdxLicenseEntry[];

export type TestsLibSchemaSpdxLicensesResult = {
  licenses: TestsLibSchemaSpdxLicensesResultLicenses;
};

export type TestsLibSchemaSpdxLicenseEntryOrUndefined = TestsLibSchemaSpdxLicenseEntry | undefined;
