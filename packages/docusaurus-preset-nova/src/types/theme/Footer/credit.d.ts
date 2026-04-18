import type { DocusaurusContext } from '@docusaurus/types';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

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

export type ThemeFooterCreditCreditPhraseIndexState = [ThemeFooterCreditCreditPhraseIndex, ThemeFooterCreditSetCreditPhraseIndex];

export type ThemeFooterCreditCreditPhraseIndex = number;

export type ThemeFooterCreditSetCreditPhraseIndex = Dispatch<SetStateAction<ThemeFooterCreditCreditPhraseIndex>>;

export type ThemeFooterCreditCreditSuffix = string;

export type ThemeFooterCreditCreditText = string;

export type ThemeFooterCreditCreditNovaLabel = string;

export type ThemeFooterCreditCreditDocusaurusLabel = string;
