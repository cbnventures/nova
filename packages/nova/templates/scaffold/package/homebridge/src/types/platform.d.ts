import type {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
} from 'homebridge';

/**
 * Platform.
 *
 * @since 0.0.0
 */
export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Plugin = DynamicPlatformPlugin;

export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Accessories = PlatformAccessory[];

export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Log = Logger;

/**
 * Platform - Constructor.
 *
 * @since 0.0.0
 */
export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Constructor_Log = Logger;

export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Constructor_Config = PlatformConfig;

export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_Constructor_Api = API;

/**
 * Platform - Configure Accessory.
 *
 * @since 0.0.0
 */
export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_ConfigureAccessory_Accessory = PlatformAccessory;

export type Platform_[__WORKSPACE_IDENTIFIER__]Platform_ConfigureAccessory_Returns = void;
