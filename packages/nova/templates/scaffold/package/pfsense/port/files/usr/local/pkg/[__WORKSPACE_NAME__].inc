<?php

declare(strict_types=1);

require_once('config.inc');
require_once('pfsense-utils.inc');
require_once('services.inc');

/**
 * Returns the saved package settings.
 *
 * @return array<string, mixed> Package settings.
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings(): array
{
    $settings = config_get_path('installedpackages/[__WORKSPACE_NAME__]/config/0', []);

    return is_array($settings) ? $settings : [];
}

/**
 * Maps the WebGUI schedule value to cron fields.
 *
 * @param string $schedule Selected schedule.
 *
 * @return array{string, string, string, string, string} Cron fields.
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSchedule(string $schedule): array
{
    return match ($schedule) {
        'daily' => ['0', '0', '*', '*', '*'],
        'weekly' => ['0', '0', '*', '*', '0'],
        default => ['0', '*', '*', '*', '*'],
    };
}

/**
 * Synchronizes the package cron job with the saved WebGUI settings.
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Sync(): void
{
    $command = '/usr/local/sbin/[__WORKSPACE_NAME__]';

    install_cron_job($command, false);

    $settings = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings();

    if (($settings['enabled'] ?? '') !== 'on') {
        return;
    }

    [$minute, $hour, $dayOfMonth, $month, $dayOfWeek] = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSchedule((string) ($settings['schedule'] ?? 'hourly'));

    install_cron_job($command, true, $minute, $hour, $dayOfMonth, $month, $dayOfWeek, 'root');
}

/**
 * Removes the package cron job.
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Remove(): void
{
    install_cron_job('/usr/local/sbin/[__WORKSPACE_NAME__]', false);
}

/**
 * Validates values submitted by the package WebGUI.
 *
 * @param array<string, mixed> $post        Submitted values.
 * @param string[]             $inputErrors Validation errors.
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Validate(array $post, array &$inputErrors): void
{
    $message = trim((string) ($post['message'] ?? ''));

    if ($message === '') {
        $inputErrors[] = 'The task message cannot be empty.';
    }
}
