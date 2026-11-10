<?php

declare(strict_types=1);

namespace PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime;

/**
 * Package-owned filesystem and configuration locations.
 *
 * Persistent update state lives beside the pfSense configuration in "/cf/conf"
 * so it survives reboots when "/var" is a RAM disk. Only the lock is transient.
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

    /** Single-run lock shared by scheduled, update, and WebGUI runs. @since UNRELEASED */
    public const LOCK_FILE = '/var/run/[__WORKSPACE_NAME__].lock';

    /** Package command run by cron and the WebGUI. @since UNRELEASED */
    public const COMMAND = '/usr/local/sbin/[__WORKSPACE_NAME__]';

    /** Package command used by the independent update-check cron entry. @since UNRELEASED */
    public const UPDATE_CHECK_COMMAND = self::COMMAND . ' --check-updates';

    /** Package command launched in the background by the About tab. @since UNRELEASED */
    public const SELF_UPDATE_COMMAND = self::COMMAND . ' --self-update';

    /** Stable randomized update-check schedule in the pfSense configuration. @since UNRELEASED */
    public const UPDATE_SCHEDULE_PATH = 'installedpackages/[__PFSENSE_CONFIG_NAME__]/update_schedule';
}
