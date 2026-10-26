import * as validationModule from '@docusaurus/utils-validation';

import type {
  Lib_DocusaurusUtilsValidation_CompatibleValidationModule,
  Lib_DocusaurusUtilsValidation_Joi,
  Lib_DocusaurusUtilsValidation_ResolvedJoi,
} from '../types/lib/docusaurus-utils-validation.d.ts';

/**
 * Lib - Docusaurus Utils Validation - Compatible Validation Module.
 *
 * Describes both the native ESM namespace and Jiti interop shapes without
 * coupling the compatibility boundary to a particular runtime or platform.
 *
 * @since 0.34.0
 */
const compatibleValidationModule: Lib_DocusaurusUtilsValidation_CompatibleValidationModule = validationModule;

/**
 * Lib - Docusaurus Utils Validation - Resolved Joi.
 *
 * Resolves Joi from either supported module shape before consumers construct
 * schemas, keeping loader-specific interop out of the validation call sites.
 *
 * @since 0.34.0
 */
/* eslint-disable @cbnventures/nova/no-optional-chaining -- The fallback intentionally models both loader-produced module shapes. */
const resolvedJoi: Lib_DocusaurusUtilsValidation_ResolvedJoi = compatibleValidationModule['Joi']
  ?? compatibleValidationModule['default']?.['Joi'];
/* eslint-enable @cbnventures/nova/no-optional-chaining */

if (resolvedJoi === undefined) {
  throw new TypeError('Unable to load Joi from "@docusaurus/utils-validation": expected the module to expose "Joi" or "default.Joi".');
}

/**
 * Lib - Docusaurus Utils Validation - Joi.
 *
 * Exposes one validated Joi instance to every preset module that defines or
 * applies a schema, independent of the loader used by the consuming project.
 *
 * @since 0.34.0
 */
export const joi: Lib_DocusaurusUtilsValidation_Joi = resolvedJoi;
