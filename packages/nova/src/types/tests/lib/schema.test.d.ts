/**
 * Tests - Lib - Schema - Node Releases Schedule.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry_Lts = string | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry_End = string;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry = {
  lts?: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry_Lts;
  end: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry_End;
};

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Result = Record<string, Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry>;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_EntryOrUndefined = Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_Entry | undefined;

/**
 * Tests - Lib - Schema - SPDX Licenses Response.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_SpdxLicenseEntry_LicenseId = string;

export type Tests_Lib_Schema_SpdxLicenseEntry = {
  licenseId: Tests_Lib_Schema_SpdxLicenseEntry_LicenseId;
};

export type Tests_Lib_Schema_SpdxLicensesResult_Licenses = Tests_Lib_Schema_SpdxLicenseEntry[];

export type Tests_Lib_Schema_SpdxLicensesResult = {
  licenses: Tests_Lib_Schema_SpdxLicensesResult_Licenses;
};

export type Tests_Lib_Schema_SpdxLicenseEntryOrUndefined = Tests_Lib_Schema_SpdxLicenseEntry | undefined;
