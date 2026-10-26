import type { vi } from 'vitest';

/**
 * Tests - Lib - Use Navbar Active Item - DocusaurusRouter - Mock Module.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_DocusaurusRouter_MockModule_UseLocation = ReturnType<typeof vi['fn']>;

export type Tests_Lib_UseNavbarActiveItem_DocusaurusRouter_MockModule = Readonly<{
  useLocation: Tests_Lib_UseNavbarActiveItem_DocusaurusRouter_MockModule_UseLocation;
}>;

/**
 * Tests - Lib - Use Navbar Active Item - DocusaurusUseBaseUrl - Mock Module.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_DocusaurusUseBaseUrl_MockModule_UseBaseUrlUtils = ReturnType<typeof vi['fn']>;

export type Tests_Lib_UseNavbarActiveItem_DocusaurusUseBaseUrl_MockModule = Readonly<{
  useBaseUrlUtils: Tests_Lib_UseNavbarActiveItem_DocusaurusUseBaseUrl_MockModule_UseBaseUrlUtils;
}>;

/**
 * Tests - Lib - Use Navbar Active Item - Get Claim Length - Claims A Plain Link Under The Site Base Url.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_GetClaimLength_ClaimsAPlainLinkUnderTheSiteBaseUrl_Result = number | null;

/**
 * Tests - Lib - Use Navbar Active Item - Get Claim Length - Ignores A Plain Link On Another Route.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_GetClaimLength_IgnoresAPlainLinkOnAnotherRoute_Result = number | null;

/**
 * Tests - Lib - Use Navbar Active Item - Get Claim Length - Keeps Doc Paths That Already Carry The Base Url.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_GetClaimLength_KeepsDocPathsThatAlreadyCarryTheBaseUrl_Result = number | null;

/**
 * Tests - Lib - Use Navbar Active Item - With Repo Base Url.
 *
 * @since 0.33.0
 */
export type Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Url = string;

export type Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Returns = string;

export type Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Relative = string;
