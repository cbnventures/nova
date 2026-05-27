import type { ReactNode } from 'react';

import type { Shared_Preset_Footer } from '../../shared.d.ts';

import type { Theme_Footer_Cta_Object } from './index.d.ts';

/**
 * Theme - Footer - Cta.
 *
 * @since 0.18.0
 */
export type Theme_Footer_Cta_Props_Variant = Shared_Preset_Footer;

export type Theme_Footer_Cta_Props_Cta = string | Theme_Footer_Cta_Object | undefined;

export type Theme_Footer_Cta_Props_Contained = boolean;

export type Theme_Footer_Cta_Props = {
  variant: Theme_Footer_Cta_Props_Variant;
  cta?: Theme_Footer_Cta_Props_Cta;
  contained: Theme_Footer_Cta_Props_Contained;
};

export type Theme_Footer_Cta_Returns = ReactNode;

export type Theme_Footer_Cta_Variant = Theme_Footer_Cta_Props_Variant;

export type Theme_Footer_Cta_Cta = Theme_Footer_Cta_Props_Cta;

export type Theme_Footer_Cta_Contained = Theme_Footer_Cta_Props_Contained;

export type Theme_Footer_Cta_CtaClassName = string;

export type Theme_Footer_Cta_WrapperClassName = string;
