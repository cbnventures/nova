/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Caches Result After First Fetch.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CachesResultAfterFirstFetch_CallCount = number;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Caches Undefined Result After Fetch Failure.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CachesUndefinedResultAfterFetchFailure_CallCount = number;

export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CachesUndefinedResultAfterFetchFailure_First = Set<string> | undefined;

export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CachesUndefinedResultAfterFetchFailure_Second = Set<string> | undefined;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Returns Empty Set For Empty Licenses Array.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsEmptySetForEmptyLicensesArray_Result = Set<string> | undefined;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Returns Set Of License IDs For Valid Response.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsSetOfLicenseIDsForValidResponse_Result = Set<string> | undefined;

export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsSetOfLicenseIDsForValidResponse_HasMit = boolean;

export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsSetOfLicenseIDsForValidResponse_HasApache = boolean;

export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsSetOfLicenseIDsForValidResponse_HasIsc = boolean;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Returns Undefined On HTTP 500.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsUndefinedOnHTTP500_Result = Set<string> | undefined;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Returns Undefined On Malformed JSON.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsUndefinedOnMalformedJSON_Result = Set<string> | undefined;

/**
 * Tests - API - SPDX Licenses - Fetch Licenses - Returns Undefined On Network Error.
 *
 * @since 0.13.0
 */
export type Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_ReturnsUndefinedOnNetworkError_Result = Set<string> | undefined;
