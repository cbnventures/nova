import type { DocusaurusContext } from '@docusaurus/types';
import type { ReactNode } from 'react';

/**
 * Theme - Footer - Credit.
 *
 * @since 0.15.0
 */
export type ThemeFooterCreditReturns = ReactNode;

export type ThemeFooterCreditDocusaurusContext = DocusaurusContext;

export type ThemeFooterCreditCreditUtmSource = string;

export type ThemeFooterCreditCreditNovaUrl = string;

export type ThemeFooterCreditCreditDocusaurusUrl = string;

export type ThemeFooterCreditCreditPhrases = string[];

export type ThemeFooterCreditGlobalData = {
  creditPhraseIndex?: number;
  [key: string]: unknown;
};

export type ThemeFooterCreditCreditPhraseIndex = number;

export type ThemeFooterCreditCreditSuffix = string;

export type ThemeFooterCreditCreditText = string;

export type ThemeFooterCreditCreditNovaLabel = string;

export type ThemeFooterCreditCreditDocusaurusLabel = string;
