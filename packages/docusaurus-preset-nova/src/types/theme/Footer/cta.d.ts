import type { ReactNode } from 'react';

import type { SharedPresetFooter } from '../../shared.d.ts';

import type { ThemeFooterCtaObject } from './index.d.ts';

/**
 * Theme - Footer - Cta.
 *
 * @since 0.18.0
 */
export type ThemeFooterCtaPropsVariant = SharedPresetFooter;

export type ThemeFooterCtaPropsCta = string | ThemeFooterCtaObject | undefined;

export type ThemeFooterCtaPropsContained = boolean;

export type ThemeFooterCtaProps = {
  variant: ThemeFooterCtaPropsVariant;
  cta?: ThemeFooterCtaPropsCta;
  contained: ThemeFooterCtaPropsContained;
};

export type ThemeFooterCtaReturns = ReactNode;

export type ThemeFooterCtaVariant = ThemeFooterCtaPropsVariant;

export type ThemeFooterCtaCta = ThemeFooterCtaPropsCta;

export type ThemeFooterCtaContained = ThemeFooterCtaPropsContained;

export type ThemeFooterCtaCtaClassName = string;

export type ThemeFooterCtaWrapperClassName = string;
