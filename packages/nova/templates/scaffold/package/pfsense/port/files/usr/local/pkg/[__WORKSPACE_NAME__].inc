<?php

declare(strict_types=1);

use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\FileLock;
use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\PackagePaths;
use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\UpdateManager;

require_once('config.inc');
require_once('notices.inc');
require_once('pfsense-utils.inc');
require_once('services.inc');
require_once(__DIR__ . '/[__WORKSPACE_NAME__]/FileLock.php');
require_once(__DIR__ . '/[__WORKSPACE_NAME__]/PackagePaths.php');
require_once(__DIR__ . '/[__WORKSPACE_NAME__]/UpdateManager.php');

/**
 * Returns the package tabs shared by settings and custom pages.
 *
 * @param string $active Active tab: settings or about.
 *
 * @return list<array{0: string, 1: bool, 2: string}> Package tabs.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Tabs(string $active): array
{
    return [
        [
            gettext('Settings'),
            $active === 'settings',
            '/pkg_edit.php?xml=[__WORKSPACE_NAME__].xml&id=0',
        ],
        [
            gettext('About'),
            $active === 'about',
            '/[__WORKSPACE_NAME__]-about.php',
        ],
    ];
}

/**
 * Returns the saved package settings.
 *
 * @return array<string, mixed> Package settings.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings(): array
{
    $settings = config_get_path('installedpackages/[__PFSENSE_CONFIG_NAME__]/config/0', []);

    return is_array($settings) ? $settings : [];
}

/**
 * Maps the starter task frequency to cron fields.
 *
 * @param string $frequency Selected frequency.
 *
 * @return array{string, string, string, string, string} Cron fields.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]GetCronFields(string $frequency): array
{
    return match ($frequency) {
        'minute' => ['*', '*', '*', '*', '*'],
        'daily' => ['0', '0', '*', '*', '*'],
        'weekly' => ['0', '0', '*', '*', '0'],
        default => ['0', '*', '*', '*', '*'],
    };
}

/**
 * Returns the stable randomized schedule for GitHub release checks.
 *
 * Invalid or missing values are generated once, saved beside the package settings,
 * and reused across frequency changes, reinstalls, and resynchronization.
 *
 * @return array{minute: int, hour: int, weekday: int, monthday: int}
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]GetUpdateSchedule(): array
{
    $storedSchedule = config_get_path(PackagePaths::UPDATE_SCHEDULE_PATH, []);
    $storedSchedule = is_array($storedSchedule) ? $storedSchedule : [];
    $schedule = UpdateManager::stableCronSchedule($storedSchedule);
    $normalizedStoredSchedule = [];

    foreach (array_keys($schedule) as $key) {
        $storedValue = $storedSchedule[$key] ?? null;

        if (is_int($storedValue) || (is_string($storedValue) && ctype_digit($storedValue))) {
            $normalizedStoredSchedule[$key] = (int) $storedValue;
        }
    }

    if ($normalizedStoredSchedule !== $schedule) {
        config_set_path(PackagePaths::UPDATE_SCHEDULE_PATH, $schedule);
        write_config(gettext('Saved the stable package update-check schedule.'));
    }

    return $schedule;
}

/**
 * Synchronizes the independent GitHub release-check cron job.
 *
 * Existing entries are removed first. Selecting Never leaves manual checks enabled
 * while ensuring no scheduled outbound GitHub request remains.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]InstallUpdateCron(): void
{
    $command = PackagePaths::UPDATE_CHECK_COMMAND;

    install_cron_job($command, false);

    if (UpdateManager::isAvailable() === false) {
        return;
    }

    $settings = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings();
    $frequency = (string) ($settings['update_check_frequency'] ?? '[__PFSENSE_UPDATE_DEFAULT_FREQUENCY__]');

    if ($frequency === 'never') {
        return;
    }

    $fields = UpdateManager::cronFields(
        $frequency,
        pfsensePackage[__WORKSPACE_IDENTIFIER__]GetUpdateSchedule(),
    );

    if ($fields === null) {
        return;
    }

    [$minute, $hour, $dayOfMonth, $month, $dayOfWeek] = $fields;

    install_cron_job(
        $command,
        true,
        $minute,
        $hour,
        $dayOfMonth,
        $month,
        $dayOfWeek,
        'root',
    );
}

/**
 * Logs a restore-heal failure without interrupting package synchronization.
 *
 * @param Throwable $throwable - Failure to log.
 *
 * @return void
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]LogRestoreHealFailure(
    Throwable $throwable,
): void {
    try {
        if (function_exists('log_error')) {
            log_error('[__WORKSPACE_TITLE__] restore heal: ' . $throwable->getMessage());
        }
    } catch (Throwable) {
        // A logging failure must not interrupt package synchronization.
    }
}

/**
 * Writes the single package-owned restore-heal cron item when it changes.
 *
 * The marker-based transformer removes stale pinned releases without matching
 * another package's command, then applies pfSense's normal config and cron flow.
 *
 * @param string|null $command      - Verified current restore command, or null.
 * @param bool        $keepExisting - Whether restore or settings retention owns it.
 *
 * @return void
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]ConfigureRestoreHealCron(
    ?string $command,
    bool $keepExisting = false,
): void {
    $cronItems = config_get_path('cron/item', []);
    $cronItems = is_array($cronItems) ? $cronItems : [];
    $updatedCronItems = UpdateManager::restoreHealCronItems(
        $cronItems,
        $command,
        $keepExisting,
    );

    if ($updatedCronItems === $cronItems) {
        return;
    }

    config_set_path('cron/item', $updatedCronItems);

    write_config(gettext('Updated the [__WORKSPACE_TITLE__] configuration-restore recovery job.'));
    configure_cron();
}

/**
 * Refreshes the restore-heal cron item for the exact installed release.
 *
 * Current commands skip lookup entirely. Definite absence removes stale entries,
 * while temporary lookup failures leave every existing entry untouched.
 *
 * @param callable|null $metadataLookup - Test-only release metadata lookup.
 *
 * @return void
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]InstallRestoreHealCron(
    ?callable $metadataLookup = null,
): void {
    try {
        $cronItems = config_get_path('cron/item', []);
        $cronItems = is_array($cronItems) ? $cronItems : [];
        $installedVersion = UpdateManager::installedVersion();
        $restoreHealMetadataLookup = $metadataLookup ?? static function (string $version): ?array {
            $updateManager = new UpdateManager($version);

            return $updateManager->restoreHealMetadata();
        };
        $failureLogger = static function (Throwable $throwable): void {
            pfsensePackage[__WORKSPACE_IDENTIFIER__]LogRestoreHealFailure($throwable);
        };
        $command = UpdateManager::resolveRestoreHealCommand(
            $cronItems,
            $installedVersion,
            $restoreHealMetadataLookup,
            $failureLogger,
        );
    } catch (Throwable $throwable) {
        pfsensePackage[__WORKSPACE_IDENTIFIER__]LogRestoreHealFailure($throwable);

        return;
    }

    if ($command === false) {
        return;
    }

    try {
        pfsensePackage[__WORKSPACE_IDENTIFIER__]ConfigureRestoreHealCron($command);
    } catch (Throwable $throwable) {
        pfsensePackage[__WORKSPACE_IDENTIFIER__]LogRestoreHealFailure($throwable);
    }
}

/**
 * Synchronizes the package cron jobs with the saved WebGUI settings.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Sync(): void
{
    UpdateManager::reassureAfterRestore();

    $command = PackagePaths::COMMAND;

    install_cron_job($command, false);

    $settings = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings();

    if (($settings['enabled'] ?? '') === 'on') {
        $taskFrequency = $settings['task_frequency'] ?? 'hourly';

        if (is_array($taskFrequency)) {
            $taskFrequency = $taskFrequency[0] ?? 'hourly';
        }

        [$minute, $hour, $dayOfMonth, $month, $dayOfWeek] = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetCronFields((string) $taskFrequency);

        install_cron_job($command, true, $minute, $hour, $dayOfMonth, $month, $dayOfWeek, 'root');
    }

    pfsensePackage[__WORKSPACE_IDENTIFIER__]InstallUpdateCron();
    pfsensePackage[__WORKSPACE_IDENTIFIER__]InstallRestoreHealCron();
}

/**
 * Removes package cron jobs, package notices, and the idle lock file.
 *
 * Persistent release state is retained across pfSense's remove-and-reinstall upgrade
 * lifecycle so notice de-duplication and the last successful check survive upgrades.
 *
 * @param bool $keepSettings - Whether a deliberate removal retains package settings.
 *
 * @return void
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Remove(bool $keepSettings = false): void
{
    install_cron_job(PackagePaths::COMMAND, false);
    install_cron_job(PackagePaths::UPDATE_CHECK_COMMAND, false);

    $restoreInProgress = file_exists(PackagePaths::PACKAGE_SYNC_FLAG);
    $keepRestoreHealEntry = UpdateManager::shouldKeepRestoreHealEntry(
        $restoreInProgress,
        $keepSettings,
    );

    try {
        pfsensePackage[__WORKSPACE_IDENTIFIER__]ConfigureRestoreHealCron(
            null,
            $keepRestoreHealEntry,
        );
    } catch (Throwable $throwable) {
        pfsensePackage[__WORKSPACE_IDENTIFIER__]LogRestoreHealFailure($throwable);
    }

    UpdateManager::closePackageNotices();

    $fileLock = new FileLock(PackagePaths::LOCK_FILE);

    try {
        if ($fileLock->acquire()) {
            @unlink(PackagePaths::LOCK_FILE);
        }
    } catch (Throwable) {
        // Removal must not fail when an active run or filesystem owns the lock.
    } finally {
        $fileLock->release();
    }
}

/**
 * Validates values submitted by the package WebGUI.
 *
 * @param array<string, mixed> $post        Submitted values.
 * @param string[]             $inputErrors Validation errors.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Validate(array $post, array &$inputErrors): void
{
    $message = trim((string) ($post['message'] ?? ''));

    if ($message === '') {
        $inputErrors[] = gettext('The example log message cannot be empty.');
    }

    $validUpdateCheckFrequencies = [
        'daily',
        'weekly',
        'monthly',
        'never',
    ];
    $updateCheckFrequency = (string) ($post['update_check_frequency'] ?? '[__PFSENSE_UPDATE_DEFAULT_FREQUENCY__]');

    if (in_array($updateCheckFrequency, $validUpdateCheckFrequencies, true) === false) {
        $inputErrors[] = gettext('Select Daily, Weekly, Monthly, or Never for update checks.');
    } elseif (UpdateManager::isAvailable() === false && $updateCheckFrequency !== 'never') {
        $inputErrors[] = gettext('Update checks are unavailable because the project repository URL is not a github.com repository.');
    }
}
