<?php

declare(strict_types=1);

require_once('config.inc');
require_once('pfsense-utils.inc');
require_once('services.inc');

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
 * Maps the WebGUI task frequency to cron fields.
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
 * Synchronizes the package cron job with the saved WebGUI settings.
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Sync(): void
{
    $command = '/usr/local/sbin/[__WORKSPACE_NAME__]';

    install_cron_job($command, false);

    $settings = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings();

    if (($settings['enabled'] ?? '') !== 'on') {
        return;
    }

    $taskFrequency = $settings['task_frequency'] ?? 'hourly';

    if (is_array($taskFrequency)) {
        $taskFrequency = $taskFrequency[0] ?? 'hourly';
    }

    [$minute, $hour, $dayOfMonth, $month, $dayOfWeek] = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetCronFields((string) $taskFrequency);

    install_cron_job($command, true, $minute, $hour, $dayOfMonth, $month, $dayOfWeek, 'root');
}

/**
 * Removes the package cron job.
 *
 * @since UNRELEASED
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
 *
 * @since UNRELEASED
 */
function pfsensePackage[__WORKSPACE_IDENTIFIER__]Validate(array $post, array &$inputErrors): void
{
    $message = trim((string) ($post['message'] ?? ''));

    if ($message === '') {
        $inputErrors[] = 'The example log message cannot be empty.';
    }
}
