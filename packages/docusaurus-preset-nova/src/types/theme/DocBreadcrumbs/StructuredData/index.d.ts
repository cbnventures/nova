import type { useBreadcrumbsStructuredData } from '@docusaurus/plugin-content-docs/client';

/**
 * Theme - Doc Breadcrumbs - Structured Data - Doc Breadcrumbs Structured Data.
 *
 * @since 0.18.0
 */
export type Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData = ReturnType<typeof useBreadcrumbsStructuredData>;

/**
 * Theme - Doc Breadcrumbs - Structured Data - Doc Breadcrumbs Structured Data Breadcrumbs.
 *
 * @since 0.18.0
 */
export type Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props_Breadcrumbs = Parameters<typeof useBreadcrumbsStructuredData>[0]['breadcrumbs'];

/**
 * Theme - Doc Breadcrumbs - Structured Data - Doc Breadcrumbs Structured Data Props.
 *
 * @since 0.18.0
 */
export type Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props = {
  breadcrumbs: Theme_DocBreadcrumbs_StructuredData_Index_DocBreadcrumbsStructuredData_Props_Breadcrumbs;
};
