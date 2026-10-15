import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

/**
 * Android Environment - Configured Android Home.
 *
 * Preserves either supported SDK environment variable when the developer has
 * already selected an Android SDK installation explicitly.
 *
 * @since 0.0.0
 */
const configuredAndroidHome = [
  process.env['ANDROID_HOME'],
  process.env['ANDROID_SDK_ROOT'],
].find((location) => typeof location === 'string' && location.length > 0);

/**
 * Android Environment - Default Android SDK Locations.
 *
 * Covers the standard Android Studio SDK directories on macOS, Linux, and
 * Windows without persisting a developer-specific path in generated source.
 *
 * @since 0.0.0
 */
const defaultAndroidSdkLocations = [
  join(homedir(), 'Library', 'Android', 'sdk'),
  join(homedir(), 'Android', 'Sdk'),
  join(homedir(), 'AppData', 'Local', 'Android', 'Sdk'),
];

/**
 * Android Environment - Discovered Android Home.
 *
 * Selects the first conventional Android SDK directory that exists locally.
 * An explicit environment variable always takes precedence over this value.
 *
 * @since 0.0.0
 */
const discoveredAndroidHome = defaultAndroidSdkLocations.find((location) => existsSync(location));

/**
 * Android Environment - Android Home.
 *
 * Resolves the SDK exposed to Android tooling while leaving unresolved
 * environments untouched so each tool can return its native diagnostic.
 *
 * @since 0.0.0
 */
export const androidHome = (configuredAndroidHome === undefined) ? discoveredAndroidHome : configuredAndroidHome;

/**
 * Android Environment - Android Environment.
 *
 * Copies the current environment and supplies the resolved SDK path only when
 * Nova found one, preserving every explicit developer setting.
 *
 * @since 0.0.0
 */
export const androidEnvironment = { ...process.env };

if (androidHome !== undefined) {
  Reflect.set(androidEnvironment, 'ANDROID_HOME', androidHome);
}

/**
 * Android Environment - Is Windows.
 *
 * Identifies whether generated helper commands need Windows shell behavior so
 * package scripts remain portable across supported development platforms.
 *
 * @since 0.0.0
 */
export const isWindows = process.platform === 'win32';
