import * as validationModule from '@docusaurus/utils-validation';

import type {
  Lib_DocusaurusUtilsValidation_CompatibleValidationModule,
  Lib_DocusaurusUtilsValidation_Joi,
  Lib_DocusaurusUtilsValidation_NormalizePluginOptions,
  Lib_DocusaurusUtilsValidation_NormalizeThemeConfig,
  Lib_DocusaurusUtilsValidation_ResolvedJoi,
  Lib_DocusaurusUtilsValidation_ResolvedNormalizePluginOptions,
  Lib_DocusaurusUtilsValidation_ResolvedNormalizeThemeConfig,
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

/**
 * Lib - Docusaurus Utils Validation - Resolved Normalize Plugin Options.
 *
 * Resolves the plugin normalizer beside Joi so schemas never cross module
 * instances when Nova is linked into a consumer with another Joi version.
 *
 * @since 0.37.0
 */
const resolvedNormalizePluginOptions: Lib_DocusaurusUtilsValidation_ResolvedNormalizePluginOptions = compatibleValidationModule['normalizePluginOptions']
  ?? compatibleValidationModule['default']?.['normalizePluginOptions'];

/**
 * Lib - Docusaurus Utils Validation - Resolved Normalize Theme Config.
 *
 * Resolves the theme normalizer beside Joi so every schema operation uses
 * one validation module across native ESM and Jiti module shapes.
 *
 * @since 0.37.0
 */
const resolvedNormalizeThemeConfig: Lib_DocusaurusUtilsValidation_ResolvedNormalizeThemeConfig = compatibleValidationModule['normalizeThemeConfig']
  ?? compatibleValidationModule['default']?.['normalizeThemeConfig'];
/* eslint-enable @cbnventures/nova/no-optional-chaining */

if (
  resolvedJoi === undefined
  || resolvedNormalizePluginOptions === undefined
  || resolvedNormalizeThemeConfig === undefined
) {
  throw new TypeError('Unable to load validation exports from "@docusaurus/utils-validation": expected the module to expose Joi and both normalizers.');
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

/**
 * Lib - Docusaurus Utils Validation - Normalize Plugin Options.
 *
 * Exposes the plugin normalizer that owns the Joi instance used by Nova's
 * schemas, preventing linked consumers from combining foreign schemas.
 *
 * @since 0.37.0
 */
export const normalizePluginOptions: Lib_DocusaurusUtilsValidation_NormalizePluginOptions = resolvedNormalizePluginOptions;

/**
 * Lib - Docusaurus Utils Validation - Normalize Theme Config.
 *
 * Exposes the theme normalizer from the same module instance as Nova's Joi
 * schemas so loader boundaries cannot change validation ownership.
 *
 * @since 0.37.0
 */
export const normalizeThemeConfig: Lib_DocusaurusUtilsValidation_NormalizeThemeConfig = resolvedNormalizeThemeConfig;
