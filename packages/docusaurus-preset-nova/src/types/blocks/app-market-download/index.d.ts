import type { CSSProperties } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - App Market Download - Blocks App Market Download.
 *
 * @since 0.15.0
 */
export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsAppStoreUrl = string | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsGooglePlayUrl = string | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsLabel = string | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsSurface = SharedSurface | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsClassName = string | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadPropsStyle = CSSProperties | undefined;

export type BlocksAppMarketDownloadBlocksAppMarketDownloadProps = {
  appStoreUrl?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsAppStoreUrl;
  googlePlayUrl?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsGooglePlayUrl;
  label?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsLabel;
  surface?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsSurface;
  className?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsClassName;
  style?: BlocksAppMarketDownloadBlocksAppMarketDownloadPropsStyle;
};

export type BlocksAppMarketDownloadAppStoreAriaLabel = string;

export type BlocksAppMarketDownloadAppStoreSubtitle = string;

export type BlocksAppMarketDownloadAppStoreTitle = string;

export type BlocksAppMarketDownloadGooglePlayAriaLabel = string;

export type BlocksAppMarketDownloadGooglePlaySubtitle = string;

export type BlocksAppMarketDownloadGooglePlayTitle = string;
