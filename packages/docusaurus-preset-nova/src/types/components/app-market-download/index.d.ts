import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - App Market Download - Components App Market Download.
 *
 * @since 0.15.0
 */
export type ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsAppStoreUrl = string | undefined;

export type ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsGooglePlayUrl = string | undefined;

export type ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsLabel = string | undefined;

export type ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsSurface = SharedSurface | undefined;

export type ComponentsAppMarketDownloadComponentsAppMarketDownloadProps = {
  appStoreUrl?: ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsAppStoreUrl;
  googlePlayUrl?: ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsGooglePlayUrl;
  label?: ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsLabel;
  surface?: ComponentsAppMarketDownloadComponentsAppMarketDownloadPropsSurface;
};

export type ComponentsAppMarketDownloadAppStoreAriaLabel = string;

export type ComponentsAppMarketDownloadAppStoreSubtitle = string;

export type ComponentsAppMarketDownloadAppStoreTitle = string;

export type ComponentsAppMarketDownloadGooglePlayAriaLabel = string;

export type ComponentsAppMarketDownloadGooglePlaySubtitle = string;

export type ComponentsAppMarketDownloadGooglePlayTitle = string;
