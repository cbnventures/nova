/**
 * Tests - Lib - Schema - Node Releases Schedule - Accepts Empty Schedule.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry_Lts = string | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry_End = string;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry = {
  lts?: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry_Lts;
  end: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry_End;
};

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result = Record<string, Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsEmptySchedule_Result_Entry>;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Accepts Schedule With Multiple Entries.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry_Lts = string | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry_End = string;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry = {
  lts?: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry_Lts;
  end: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry_End;
};

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result = Record<string, Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry>;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V18 = Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V19 = Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_V20 = Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsScheduleWithMultipleEntries_Result_Entry | undefined;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Accepts Single Entry.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry_Lts = string | undefined;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry_End = string;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry = {
  lts?: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry_Lts;
  end: Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry_End;
};

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result = Record<string, Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry>;

export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_V22 = Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_AcceptsSingleEntry_Result_Entry | undefined;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Rejects Array.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsArray_Input = unknown[];

/**
 * Tests - Lib - Schema - Node Releases Schedule - Rejects Null.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsNull_Input = null;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Rejects Schedule With Invalid Entry Value.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithInvalidEntryValue_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Rejects Schedule With Null Entry Value.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithNullEntryValue_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - Node Releases Schedule - Rejects Schedule With String Entry Value.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaNodeReleasesSchedule_RejectsScheduleWithStringEntryValue_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Accepts Response With Empty Licenses Array.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_LicenseId = string;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_License = {
  licenseId: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_LicenseId;
};

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_Licenses = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_License[];

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result = Readonly<{
  licenses: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithEmptyLicensesArray_Result_Licenses;
}>;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Accepts Response With Multiple Licenses.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_LicenseId = string;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_License = {
  licenseId: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_LicenseId;
};

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_Licenses = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_License[];

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result = Readonly<{
  licenses: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_Licenses;
}>;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License0 = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_License | undefined;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License1 = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_License | undefined;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_License2 = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithMultipleLicenses_Result_License | undefined;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Accepts Response With Single License.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_LicenseId = string;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_License = {
  licenseId: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_LicenseId;
};

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_Licenses = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_License[];

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result = Readonly<{
  licenses: Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_Licenses;
}>;

export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_License0 = Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_AcceptsResponseWithSingleLicense_Result_License | undefined;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Non Object Value.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNonObjectValue_Input = number;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Null.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsNull_Input = null;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Response Missing Licenses.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseMissingLicenses_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Response With Invalid License Entry.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithInvalidLicenseEntry_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Response With Mixed Valid And Invalid Entries.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithMixedValidAndInvalidEntries_Input = Record<string, unknown>;

/**
 * Tests - Lib - Schema - SPDX Licenses Response - Rejects Response With Non Array Licenses.
 *
 * @since 0.13.0
 */
export type Tests_Lib_Schema_LibSchemaSpdxLicensesResponse_RejectsResponseWithNonArrayLicenses_Input = Record<string, unknown>;
