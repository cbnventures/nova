<?php

declare(strict_types=1);

namespace PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime;

/**
 * Package-owned filesystem and configuration locations.
 *
 * Persistent update state lives beside the pfSense configuration in "/cf/conf"
 * so it survives reboots when "/var" is a RAM disk. Only the locks are transient.
 *
 * @since UNRELEASED
 */
final class PackagePaths
{
    /** Persistent package data directory. @since UNRELEASED */
    public const DATA_DIRECTORY = '/cf/conf/[__WORKSPACE_NAME__]';

    /** Latest-release metadata from GitHub. @since UNRELEASED */
    public const UPDATES_FILE = self::DATA_DIRECTORY . '/updates.json';

    /** Background self-update progress shown on the About tab. @since UNRELEASED */
    public const UPDATE_STATUS_FILE = self::DATA_DIRECTORY . '/update-status.json';

    /** Single-run lock for the package's replaceable background task. @since UNRELEASED */
    public const LOCK_FILE = '/var/run/[__WORKSPACE_NAME__].lock';

    /** Single-run lock shared by release checks and installs. @since UNRELEASED */
    public const RELEASE_LOCK_FILE = '/var/run/[__WORKSPACE_NAME__]-release.lock';

    /** Package command run by cron and the WebGUI. @since UNRELEASED */
    public const COMMAND = '/usr/local/sbin/[__WORKSPACE_NAME__]';

    /** Package command used by the independent update-check cron entry. @since UNRELEASED */
    public const UPDATE_CHECK_COMMAND = self::COMMAND . ' --check-updates';

    /** Package command used by the About tab's notice-free update check. @since UNRELEASED */
    public const MANUAL_UPDATE_CHECK_COMMAND = self::UPDATE_CHECK_COMMAND . ' --no-notice';

    /** Package command launched in the background by the About tab. @since UNRELEASED */
    public const SELF_UPDATE_COMMAND = self::COMMAND . ' --self-update';

    /** Stable randomized update-check schedule in the pfSense configuration. @since UNRELEASED */
    public const UPDATE_SCHEDULE_PATH = 'installedpackages/[__PFSENSE_CONFIG_NAME__]/update_schedule';

    /** Restore-heal local package directory retained with the firewall configuration. @since UNRELEASED */
    public const RESTORE_HEAL_DIRECTORY = '/conf/[__WORKSPACE_NAME__]/restore-heal';

    /** Stock pfSense flag present while restored packages are being reconciled. @since UNRELEASED */
    public const PACKAGE_SYNC_FLAG = '/conf/needs_package_sync';
}
