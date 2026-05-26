import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Components - Author - Socials.
 *
 * @since 0.18.0
 */
export type ThemeBlogComponentsAuthorSocialsAuthor = {
  socials?: Readonly<Record<string, string>>;
  [key: string]: unknown;
};

export type ThemeBlogComponentsAuthorSocialsPropsClassName = string | undefined;

export type ThemeBlogComponentsAuthorSocialsPropsStyle = CSSProperties | undefined;

export type ThemeBlogComponentsAuthorSocialsProps = {
  author: ThemeBlogComponentsAuthorSocialsAuthor;
  className?: ThemeBlogComponentsAuthorSocialsPropsClassName;
  style?: ThemeBlogComponentsAuthorSocialsPropsStyle;
};

export type ThemeBlogComponentsAuthorSocialsSocials = Readonly<Record<string, string>>;

export type ThemeBlogComponentsAuthorSocialsEntries = Array<[ThemeBlogComponentsAuthorSocialsPlatform, ThemeBlogComponentsAuthorSocialsLink]>;

export type ThemeBlogComponentsAuthorSocialsPlatform = string;

export type ThemeBlogComponentsAuthorSocialsLink = string;

export type ThemeBlogComponentsAuthorSocialsIconConfig = {
  icon: string;
  label: string;
};

/**
 * Theme - Blog - Components - Author - Socials - Social Icon Configs.
 *
 * @since 0.18.0
 */
export type ThemeBlogComponentsAuthorSocialsIconConfigMap = Readonly<Record<string, ThemeBlogComponentsAuthorSocialsIconConfig>>;
