<?php

declare(strict_types=1);

use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\RestoreHealUnavailableException;
use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\UpdateManager;

require_once(__DIR__ . '/../port/files/usr/local/pkg/[__WORKSPACE_NAME__]/UpdateManager.php');

if (UpdateManager::isAvailable() === false) {
    fwrite(STDOUT, "Update checks are unavailable for this generated repository.\n");

    exit(0);
}

/** @var array<int|string, array<string, string>> Simulated pfSense notice queue. */
$updateTestNotices = [];

/** @var list<int|string> Captured closed pfSense notice identifiers and queue keys. */
$updateTestClosedNotices = [];

/** @var list<bool> Captured local-only arguments, which pfSense does not store. */
$updateTestNoticeLocalOnlyValues = [];

/** @var int Controlled replacement for time() in the pfSense notice stub. */
$updateTestNoticeTime = 1700000000;

/** @var list<array> Simulated installed pfSense packages. */
$updateTestInstalledPackages = [];

/** @var string Simulated pfSense product label. */
$updateTestProductLabel = 'pfSense';

/** @var list<string> Captured pfSense error log entries. */
$updateTestLogErrors = [];

if (function_exists('file_notice') === false) {
    /**
     * Captures one pfSense notice for update tests.
     *
     * The stub preserves notices.inc timestamp keys and stored field encoding.
     * Local-only delivery remains separate because pfSense does not persist it.
     *
     * @param string $id        - Notice identifier.
     * @param string $notice    - Notice text.
     * @param string $category  - Notice category.
     * @param string $url       - Notice link.
     * @param int    $priority  - Notice priority.
     * @param bool   $localOnly - Whether remote channels are suppressed.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    function file_notice(
        string $id,
        string $notice,
        string $category = 'General',
        string $url = '',
        int $priority = 1,
        bool $localOnly = false,
    ): void {
        global $updateTestNoticeLocalOnlyValues;
        global $updateTestNoticeTime;
        global $updateTestNotices;

        $noticeKey = $updateTestNoticeTime;

        while (array_key_exists($noticeKey, $updateTestNotices)) {
            $noticeKey++;
        }

        $updateTestNotices[$noticeKey] = [
            'id' => htmlentities($id),
            'notice' => htmlentities($notice),
            'url' => htmlentities($url),
            'category' => htmlentities($category),
            'priority' => htmlentities((string) $priority),
        ];
        $updateTestNoticeLocalOnlyValues[] = $localOnly;
    }
}

if (function_exists('get_notices') === false) {
    /**
     * Returns the simulated pfSense notice queue.
     *
     * An empty queue matches notices.inc by returning false rather than an
     * empty array so production callers exercise the real boundary.
     *
     * @return array|false
     *
     * @since UNRELEASED
     */
    function get_notices(): array|false
    {
        global $updateTestNotices;

        return count($updateTestNotices) > 0
            ? $updateTestNotices
            : false;
    }
}

if (function_exists('close_notice') === false) {
    /**
     * Closes one matching simulated pfSense notice.
     *
     * Queue keys take precedence over stored identifiers, and each call removes
     * no more than one entry just like notices.inc.
     *
     * @param mixed $id - Notice identifier or queue key.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    function close_notice(mixed $id): void
    {
        global $updateTestClosedNotices;
        global $updateTestNotices;

        $updateTestClosedNotices[] = $id;

        if ($id === 'all') {
            $updateTestNotices = [];

            return;
        }

        if (
            (is_int($id) || is_string($id))
            && array_key_exists($id, $updateTestNotices)
        ) {
            unset($updateTestNotices[$id]);

            return;
        }

        foreach ($updateTestNotices as $noticeKey => $notice) {
            if (($notice['id'] ?? null) !== $id) {
                continue;
            }

            unset($updateTestNotices[$noticeKey]);

            return;
        }
    }
}

if (function_exists('config_get_path') === false) {
    /**
     * Returns one simulated pfSense configuration path.
     *
     * Restore reassurance reads only the installed package collection; other
     * paths retain the default supplied by the caller.
     *
     * @param string $path    - Configuration path.
     * @param mixed  $default - Default value.
     *
     * @return mixed
     *
     * @since UNRELEASED
     */
    function config_get_path(string $path, mixed $default = null): mixed
    {
        global $updateTestInstalledPackages;

        if ($path === 'installedpackages/package') {
            return $updateTestInstalledPackages;
        }

        return $default;
    }
}

if (function_exists('g_get') === false) {
    /**
     * Returns one simulated pfSense global value.
     *
     * The reassurance path reads only product_label; unknown keys remain absent
     * so the stub does not invent unrelated pfSense state.
     *
     * @param string $key - Global key.
     *
     * @return mixed
     *
     * @since UNRELEASED
     */
    function g_get(string $key): mixed
    {
        global $updateTestProductLabel;

        return $key === 'product_label'
            ? $updateTestProductLabel
            : null;
    }
}

if (function_exists('log_error') === false) {
    /**
     * Captures one simulated pfSense error log entry.
     *
     * Restore tests inspect this collection to ensure an empty notice file is a
     * normal state rather than a logged synchronization error.
     *
     * @param string $message - Error message.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    function log_error(string $message): void
    {
        global $updateTestLogErrors;

        $updateTestLogErrors[] = $message;
    }
}

/**
 * Asserts strict equality for update regression checks.
 *
 * @param mixed  $expected - Expected value.
 * @param mixed  $actual   - Actual value.
 * @param string $message  - Failure context.
 *
 * @return void
 *
 * @throws RuntimeException When values differ.
 *
 * @since UNRELEASED
 */
function assertUpdateSame(mixed $expected, mixed $actual, string $message): void
{
    if ($expected !== $actual) {
        throw new RuntimeException(sprintf(
            "%s\nExpected: %s\nActual:   %s",
            $message,
            var_export($expected, true),
            var_export($actual, true),
        ));
    }
}

/**
 * Requires one callback to throw a RuntimeException with an exact message.
 *
 * @param callable $callback - Operation expected to fail.
 * @param string   $message  - Expected exception message.
 *
 * @return void
 *
 * @throws RuntimeException When the callback does not fail as expected.
 *
 * @since UNRELEASED
 */
function assertUpdateFailure(callable $callback, string $message): void
{
    try {
        $callback();
    } catch (RuntimeException $runtimeException) {
        assertUpdateSame($message, $runtimeException->getMessage(), 'The update failure message must be actionable.');

        return;
    }

    throw new RuntimeException('The update operation was expected to fail.');
}

/**
 * Applies one resolved restore-heal action while counting configuration writes.
 *
 * False models the synchronization fast path that returns before the existing
 * cron writer runs. Null and string actions exercise its normal transformer.
 *
 * @param array             $items      - Current pfSense cron items.
 * @param string|false|null $command    - Resolved restore-heal command action.
 * @param int               $writeCount - Simulated configuration write count.
 *
 * @return array
 *
 * @since UNRELEASED
 */
function applyResolvedRestoreHealCommand(
    array $items,
    string|false|null $command,
    int &$writeCount,
): array {
    if ($command === false) {
        return $items;
    }

    $writeCount++;

    return UpdateManager::restoreHealCronItems($items, $command);
}

/**
 * Creates one private directory for update signing tests.
 *
 * The generated directory contains only test-owned files and can be removed
 * without affecting package state or another concurrent test process.
 *
 * @return string
 *
 * @throws RuntimeException When the directory cannot be created.
 *
 * @since UNRELEASED
 */
function makeUpdateTestDirectory(): string
{
    $directory = sys_get_temp_dir() . '/[__WORKSPACE_NAME__]-signing-' . bin2hex(random_bytes(16));

    if (mkdir($directory, 0700) === false) {
        throw new RuntimeException('Could not create the update signing test directory.');
    }

    return $directory;
}

/**
 * Removes files from one update signing test directory.
 *
 * Test fixtures remain in the repository while generated key files, stubs,
 * recordings, and tampered package copies are deleted after every test run.
 *
 * @param string $directory - Test-owned directory.
 *
 * @return void
 *
 * @since UNRELEASED
 */
function removeUpdateTestDirectory(string $directory): void
{
    $entries = @scandir($directory);

    foreach ((is_array($entries) ? $entries : []) as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }

        $entryPath = $directory . '/' . $entry;

        if (is_file($entryPath) || is_link($entryPath)) {
            @unlink($entryPath);
        }
    }

    @rmdir($directory);
}

/**
 * Writes one ssh-keygen stub that records arguments and standard input.
 *
 * The executable simulates both successful and failed verification without
 * requiring OpenSSH for the process-boundary regression test.
 *
 * @param string $directory - Test-owned directory.
 * @param string $name      - Stub and recording file prefix.
 * @param int    $exitCode  - Stub exit code.
 *
 * @return array{command: string, arguments: string, stdin: string}
 *
 * @throws RuntimeException When the stub cannot be written or made executable.
 *
 * @since UNRELEASED
 */
function writeUpdateSshKeygenStub(string $directory, string $name, int $exitCode): array
{
    $commandPath = $directory . '/' . $name;
    $argumentsPath = $directory . '/' . $name . '.arguments';
    $standardInputPath = $directory . '/' . $name . '.stdin';
    $stubLines = [
        '#!/bin/sh',
        'printf \'%s\\n\' "$@" > ' . escapeshellarg($argumentsPath),
        'cat > ' . escapeshellarg($standardInputPath),
        'exit ' . $exitCode,
        '',
    ];
    $stubContents = implode("\n", $stubLines);

    if (
        file_put_contents($commandPath, $stubContents) === false
        || chmod($commandPath, 0700) === false
    ) {
        throw new RuntimeException('Could not create the ssh-keygen test stub.');
    }

    return [
        'command' => $commandPath,
        'arguments' => $argumentsPath,
        'stdin' => $standardInputPath,
    ];
}

/**
 * Finds a real ssh-keygen executable for fixture verification.
 *
 * The fixed pfSense path is preferred, with PATH lookup allowing the same tests
 * to run on contributor workstations and continuous-integration hosts.
 *
 * @return string|null
 *
 * @since UNRELEASED
 */
function findUpdateSshKeygen(): ?string
{
    if (is_file('/usr/bin/ssh-keygen') && is_executable('/usr/bin/ssh-keygen')) {
        return '/usr/bin/ssh-keygen';
    }

    $path = getenv('PATH');

    foreach ((is_string($path) ? explode(PATH_SEPARATOR, $path) : []) as $directory) {
        if ($directory === '') {
            continue;
        }

        $candidate = $directory . '/ssh-keygen';

        if (is_file($candidate) && is_executable($candidate)) {
            return $candidate;
        }
    }

    return null;
}

assertUpdateSame(true, UpdateManager::isNewerVersion('2.0.1', 'v2.1.0'), 'A leading v must be ignored.');
assertUpdateSame(false, UpdateManager::isNewerVersion('v2.1.0', '2.1.0'), 'Equal normalized versions are current.');
assertUpdateSame(false, UpdateManager::isNewerVersion('2.2.0', 'v2.1.9'), 'An older release is not an update.');

$releaseJson = json_encode([
    'tag_name' => 'v2.1.0',
    'html_url' => substr(UpdateManager::DOWNLOAD_PREFIX, 0, -strlen('download/')) . 'tag/v2.1.0',
    'published_at' => '2026-11-06T12:00:00Z',
    'assets' => [
        [
            'name' => 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg',
            'browser_download_url' => UpdateManager::DOWNLOAD_PREFIX . 'v2.1.0/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg',
            'digest' => 'sha256:' . str_repeat('a', 64),
        ],
        [
            'name' => 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg.sig',
            'browser_download_url' => UpdateManager::DOWNLOAD_PREFIX . 'v2.1.0/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg.sig',
            'digest' => null,
        ],
    ],
], JSON_THROW_ON_ERROR);
$release = UpdateManager::parseReleaseJson($releaseJson);

assertUpdateSame('2.1.0', $release['version'], 'Release parsing must normalize the Git tag.');
assertUpdateSame(2, count($release['assets']), 'Release parsing must retain valid assets.');
assertUpdateSame(
    true,
    UpdateManager::isAllowedAssetUrl($release['assets'][0]['url']),
    'Repository release assets must be accepted.',
);
assertUpdateSame(
    false,
    UpdateManager::isAllowedAssetUrl('https://example.com/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg'),
    'Assets outside the configured repository must be rejected.',
);
assertUpdateSame(
    true,
    UpdateManager::isAllowedAssetUrl('http://vm.test/releases/package.pkg', 'http://vm.test/releases/'),
    'The explicit CLI test prefix must support a local VM endpoint.',
);
$apiDigestAssets = UpdateManager::selectUpdateAssets($release);

assertUpdateSame(
    'sha256:' . str_repeat('a', 64),
    $apiDigestAssets['digest'],
    'The GitHub API digest must be the preferred SHA-256 source.',
);
assertUpdateSame(null, $apiDigestAssets['checksum'], 'An API digest must not require a checksum asset.');
assertUpdateSame(
    'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg.sig',
    $apiDigestAssets['signature']['name'],
    'The matching detached signature asset must be selected.',
);

$unsignedRelease = $release;
$unsignedRelease['assets'] = [$release['assets'][0]];
$unsignedAssets = UpdateManager::selectUpdateAssets($unsignedRelease);

assertUpdateSame(null, $unsignedAssets['signature'], 'A release without a signature must report no signature asset.');

$outsidePrefixRelease = $release;
$outsidePrefixRelease['assets'][1]['url'] = 'https://example.com/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg.sig';

assertUpdateFailure(
    static fn (): array => UpdateManager::selectUpdateAssets($outsidePrefixRelease),
    'The release contains an asset URL outside the trusted repository path.',
);

$randomValues = [17, 4, 2, 23];
$randomCalls = 0;
$randomInteger = static function (int $minimum, int $maximum) use (&$randomValues, &$randomCalls): int {
    $value = $randomValues[$randomCalls] ?? $minimum;
    $randomCalls++;

    if ($value < $minimum || $value > $maximum) {
        throw new RuntimeException('The deterministic random value is outside the requested range.');
    }

    return $value;
};
$schedule = UpdateManager::stableCronSchedule([], $randomInteger);

assertUpdateSame(
    ['minute' => 17, 'hour' => 4, 'weekday' => 2, 'monthday' => 23],
    $schedule,
    'A complete random schedule must be generated once.',
);
assertUpdateSame(4, $randomCalls, 'Every stable schedule component must be initialized.');

$reusedSchedule = UpdateManager::stableCronSchedule(
    array_map(static fn (int $value): string => (string) $value, $schedule),
    static function (): never {
        throw new RuntimeException('A valid stored schedule must not be randomized again.');
    },
);

assertUpdateSame($schedule, $reusedSchedule, 'A valid stored schedule must stay stable.');
assertUpdateSame(['17', '4', '*', '*', '*'], UpdateManager::cronFields('daily', $schedule), 'Daily mapping must use minute and hour.');
assertUpdateSame(['17', '4', '*', '*', '2'], UpdateManager::cronFields('weekly', $schedule), 'Weekly mapping must use the weekday.');
assertUpdateSame(['17', '4', '23', '*', '*'], UpdateManager::cronFields('monthly', $schedule), 'Monthly mapping must use the month day.');
assertUpdateSame(null, UpdateManager::cronFields('never', $schedule), 'Never must remove the cron schedule.');

$noticeState = [
    'notified_version' => null,
];
$noticeState = UpdateManager::synchronizeNotice($noticeState, '2.0.1', '2.1.0', false);
$updateNoticeValues = array_values($updateTestNotices);

assertUpdateSame('2.1.0', $noticeState['notified_version'], 'The noticed version must be persisted.');
assertUpdateSame(1, count($updateTestNotices), 'A new version must create one notice.');
assertUpdateSame(
    '[__WORKSPACE_TITLE__] 2.1.0 is available.',
    $updateNoticeValues[0]['notice'],
    'The bell notice must use plain localized package and version text.',
);
assertUpdateSame('[__WORKSPACE_TITLE__]', $updateNoticeValues[0]['category'], 'The notice category must be the package name.');
assertUpdateSame(true, $updateTestNoticeLocalOnlyValues[0], 'Remote notifications must be off by default.');
assertUpdateSame(UpdateManager::ABOUT_PAGE, $updateNoticeValues[0]['url'], 'The notice must link to the About tab.');
assertUpdateSame(false, array_key_exists('localOnly', $updateNoticeValues[0]), 'pfSense must not store the local-only argument.');

$noticeState = UpdateManager::synchronizeNotice($noticeState, '2.0.1', '2.1.0', true);
assertUpdateSame(1, count($updateTestNotices), 'The same version must not create a duplicate notice.');

$noticeState = UpdateManager::synchronizeNotice($noticeState, '2.0.1', '2.2.0', true);
$updateNoticeValues = array_values($updateTestNotices);

assertUpdateSame(2, count($updateTestNotices), 'A later version must create one new notice.');
assertUpdateSame(false, $updateTestNoticeLocalOnlyValues[1], 'The opt-in must allow pfSense remote notifications.');
assertUpdateSame('[__WORKSPACE_TITLE__] 2.2.0 is available.', $updateNoticeValues[1]['notice'], 'A later version must store a second notice.');

UpdateManager::synchronizeNotice($noticeState, '2.2.0', '2.2.0', true);
assertUpdateSame(
    UpdateManager::NOTICE_ID,
    $updateTestClosedNotices[array_key_last($updateTestClosedNotices)],
    'The notice must close when the installed version is current.',
);

$restoreInstalledPackages = [
    [
        'name' => '[__WORKSPACE_TITLE__]',
        'internal_name' => '[__WORKSPACE_IDENTIFIER__]',
        'version' => '2.1.0',
    ],
];
$updateTestInstalledPackages = $restoreInstalledPackages;
$englishTranslator = static fn (string $message): string => $message;

$restoreCloseNotice = static function (mixed $noticeId): void {
    close_notice($noticeId);
};

$restoreFileNotice = static function (
    string $noticeId,
    string $notice,
    string $category,
    string $url,
    int $priority,
    bool $localOnly,
): void {
    file_notice(
        $noticeId,
        $notice,
        $category,
        $url,
        $priority,
        $localOnly,
    );
};

$updateTestNotices = [];
$updateTestClosedNotices = [];
$updateTestNoticeLocalOnlyValues = [];
$updateTestLogErrors = [];
$updateTestNoticeTime = 1700000100;

UpdateManager::reassureAfterRestore();

assertUpdateSame(false, get_notices(), 'An empty pfSense notice file must remain empty.');
assertUpdateSame([], $updateTestNoticeLocalOnlyValues, 'An empty notice file must create no reassurance.');
assertUpdateSame([], $updateTestLogErrors, 'An empty notice file must not log a synchronization error.');

$englishFalseRemovalNotice = 'Package [__WORKSPACE_TITLE__] does not exist in current pfSense version and it has been removed.';

file_notice(
    'Package reinstall',
    $englishFalseRemovalNotice,
    'Package reinstall',
);

UpdateManager::reassureAfterRestore();

file_notice(
    'Package reinstall',
    $englishFalseRemovalNotice,
    'Package reinstall',
);

UpdateManager::reassureAfterRestore();

$restoreTestNotices = get_notices();

if ($restoreTestNotices === false) {
    throw new RuntimeException('The restore reassurance notice was not filed.');
}

$storedRestoreNoticeId = htmlentities(UpdateManager::RESTORE_NOTICE_ID);
$storedEnglishFalseRemovalNotice = htmlentities($englishFalseRemovalNotice);
$restoreReassuranceNotices = array_filter(
    $restoreTestNotices,
    static fn (array $restoreTestNotice): bool => ($restoreTestNotice['id'] ?? null) === $storedRestoreNoticeId,
);
$remainingFalseRemovalNotices = array_filter(
    $restoreTestNotices,
    static fn (array $restoreTestNotice): bool => ($restoreTestNotice['notice'] ?? null) === $storedEnglishFalseRemovalNotice,
);

assertUpdateSame(1, count($restoreReassuranceNotices), 'Two restores in a row must leave exactly one reassurance.');
assertUpdateSame(0, count($remainingFalseRemovalNotices), 'Every matching false-removal notice must close.');
assertUpdateSame(
    [
        1700000100,
        1700000101,
    ],
    $updateTestClosedNotices,
    'Each restore must close its false-removal notice by queue key.',
);
assertUpdateSame(
    [
        false,
        true,
        false,
    ],
    $updateTestNoticeLocalOnlyValues,
    'A second restore must not file another local-only reassurance.',
);

$restoreReassuranceNotice = array_values($restoreReassuranceNotices)[0];

assertUpdateSame(
    htmlentities('[__WORKSPACE_TITLE__] is still installed and its settings are unchanged. pfSense reported it as removed after the configuration restore only because it isn\'t installed from Netgate\'s package repository. No action is needed.'),
    $restoreReassuranceNotice['notice'],
    'The stored reassurance must match pfSense htmlentities encoding.',
);
assertUpdateSame(
    htmlentities(UpdateManager::ABOUT_PAGE),
    $restoreReassuranceNotice['url'],
    'The restore reassurance must link to the About page.',
);
assertUpdateSame(
    htmlentities('[__WORKSPACE_TITLE__]'),
    $restoreReassuranceNotice['category'],
    'The restore reassurance must use the package notice category.',
);
assertUpdateSame(
    false,
    array_key_exists(UpdateManager::RESTORE_NOTICE_ID, $restoreTestNotices),
    'pfSense must store the reassurance under a timestamp rather than its identifier.',
);

$updateTestNotices = [];
$updateTestClosedNotices = [];
$updateTestNoticeTime = 1700000190;

file_notice(UpdateManager::RESTORE_NOTICE_ID, 'Duplicate reassurance one.');
file_notice(UpdateManager::RESTORE_NOTICE_ID, 'Duplicate reassurance two.');

close_notice(UpdateManager::RESTORE_NOTICE_ID);

$singleCloseNotices = get_notices();

if ($singleCloseNotices === false) {
    throw new RuntimeException('One close_notice call removed more than one matching entry.');
}

assertUpdateSame(1, count($singleCloseNotices), 'One close_notice call must remove only one matching entry.');

close_notice('all');

assertUpdateSame(false, get_notices(), 'The all identifier must clear the simulated notice queue.');

$updateTestNotices = [];
$updateTestClosedNotices = [];
$updateTestNoticeLocalOnlyValues = [];
$updateTestNoticeTime = 1700000200;

file_notice(UpdateManager::RESTORE_NOTICE_ID, 'Stale reassurance one.');
file_notice(UpdateManager::RESTORE_NOTICE_ID, 'Stale reassurance two.');
file_notice(UpdateManager::NOTICE_ID, 'Stale update one.');
file_notice(UpdateManager::NOTICE_ID, 'Stale update two.');
file_notice('unrelated', 'An unrelated notice.');

UpdateManager::closePackageNotices();

$remainingPackageNotices = get_notices();

if ($remainingPackageNotices === false) {
    throw new RuntimeException('Package notice cleanup removed an unrelated notice.');
}

assertUpdateSame(
    [
        1700000200,
        1700000201,
        1700000202,
        1700000203,
    ],
    $updateTestClosedNotices,
    'Uninstall must close every stale reassurance and update notice by queue key.',
);
assertUpdateSame(1, count($remainingPackageNotices), 'Uninstall must preserve unrelated notices.');
assertUpdateSame(
    htmlentities('unrelated'),
    array_values($remainingPackageNotices)[0]['id'],
    'Uninstall must leave the unrelated notice open.',
);

$frenchFalseNoticeTemplate = 'Le paquet %s n\'existe pas dans la version actuelle de %s et a été supprimé.';
$frenchReassuranceTemplate = '%s est toujours installé et ses paramètres sont inchangés. pfSense a signalé sa suppression après la restauration uniquement parce qu\'il ne provient pas du dépôt de paquets Netgate. Aucune action n\'est nécessaire.';
$frenchTranslator = static function (string $message) use (
    $frenchFalseNoticeTemplate,
    $frenchReassuranceTemplate,
): string {
    return match ($message) {
        'Package %s does not exist in current %s version and it has been removed.' => $frenchFalseNoticeTemplate,
        '%s is still installed and its settings are unchanged. pfSense reported it as removed after the configuration restore only because it isn\'t installed from Netgate\'s package repository. No action is needed.' => $frenchReassuranceTemplate,
        '[__WORKSPACE_TITLE__]' => 'Paquet Exemple',
        default => $message,
    };
};
$frenchFalseRemovalNotice = sprintf(
    $frenchFalseNoticeTemplate,
    '[__WORKSPACE_TITLE__] ([__WORKSPACE_IDENTIFIER__])',
    'pfSense FR',
);
$updateTestNotices = [];
$updateTestClosedNotices = [];
$updateTestNoticeLocalOnlyValues = [];
$updateTestNoticeTime = 1700000300;

file_notice(
    'Réinstallation du paquet',
    $frenchFalseRemovalNotice,
    'Réinstallation du paquet',
);

$restoreTestNotices = get_notices();

if ($restoreTestNotices === false) {
    throw new RuntimeException('The localized false-removal notice was not filed.');
}

UpdateManager::reconcileRestoreNotices(
    $restoreTestNotices,
    $restoreInstalledPackages,
    'pfSense FR',
    $frenchTranslator,
    $restoreCloseNotice,
    $restoreFileNotice,
);

$restoreTestNotices = get_notices();

if ($restoreTestNotices === false) {
    throw new RuntimeException('The localized reassurance notice was not filed.');
}

$localizedReassuranceNotice = array_values($restoreTestNotices)[0];

assertUpdateSame(
    [1700000300],
    $updateTestClosedNotices,
    'The localized name-and-internal-name false notice must close.',
);
assertUpdateSame(1, count($restoreTestNotices), 'A localized false notice must create one localized reassurance.');
assertUpdateSame(
    htmlentities(sprintf($frenchReassuranceTemplate, 'Paquet Exemple')),
    $localizedReassuranceNotice['notice'],
    'The reassurance must match an htmlentities-encoded non-English template.',
);
assertUpdateSame(
    htmlentities('Paquet Exemple'),
    $localizedReassuranceNotice['category'],
    'The localized reassurance must keep the translated package category.',
);
assertUpdateSame(
    htmlentities(UpdateManager::RESTORE_NOTICE_ID),
    $localizedReassuranceNotice['id'],
    'The localized reassurance must retain its stored identifier.',
);

$updateTestNotices = [];
$updateTestClosedNotices = [];
$updateTestNoticeLocalOnlyValues = [];
$updateTestNoticeTime = 1700000400;

file_notice('unrelated', 'An unrelated notice.', 'System');

$restoreTestNotices = get_notices();

if ($restoreTestNotices === false) {
    throw new RuntimeException('The unrelated notice was not filed.');
}

UpdateManager::reconcileRestoreNotices(
    $restoreTestNotices,
    $restoreInstalledPackages,
    'pfSense',
    $englishTranslator,
    $restoreCloseNotice,
    $restoreFileNotice,
);

assertUpdateSame([], $updateTestClosedNotices, 'An unrelated notice must stay open.');
assertUpdateSame(1, count($updateTestNotices), 'No false-removal notice must produce no reassurance.');

$digestPath = tempnam(sys_get_temp_dir(), '[__WORKSPACE_NAME__]-digest-');

if ($digestPath === false) {
    throw new RuntimeException('Could not create the digest test file.');
}

file_put_contents($digestPath, 'package payload');
$digest = 'sha256:' . hash_file('sha256', $digestPath);

assertUpdateSame(true, UpdateManager::verifyDigest($digestPath, $digest), 'A matching SHA-256 digest must pass.');
assertUpdateSame(
    false,
    UpdateManager::verifyDigest($digestPath, 'sha256:' . str_repeat('0', 64)),
    'A package with a mismatched SHA-256 digest must be refused.',
);
$checksumAssetName = 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg.sha256';
$checksumRelease = [
    'version' => '2.1.0',
    'assets' => [
        [
            'name' => 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg',
            'url' => UpdateManager::DOWNLOAD_PREFIX . 'v2.1.0/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg',
            'digest' => null,
        ],
        [
            'name' => $checksumAssetName,
            'url' => UpdateManager::DOWNLOAD_PREFIX . 'v2.1.0/' . $checksumAssetName,
            'digest' => null,
        ],
    ],
];
$checksumAssets = UpdateManager::selectUpdateAssets($checksumRelease);
$checksumHash = hash_file('sha256', $digestPath);

assertUpdateSame(null, $checksumAssets['digest'], 'A release without an API digest must use the checksum fallback.');
assertUpdateSame(
    $checksumAssetName,
    $checksumAssets['checksum']['name'],
    'The fallback must select the same-release package checksum asset.',
);
assertUpdateSame(
    'sha256:' . $checksumHash,
    UpdateManager::checksumDigest($checksumHash . PHP_EOL),
    'A hash-only .sha256 file must produce the expected digest.',
);
assertUpdateSame(
    true,
    UpdateManager::verifyDigest($digestPath, (string) UpdateManager::checksumDigest($checksumHash . PHP_EOL)),
    'The .sha256 fallback digest must verify the package.',
);
assertUpdateSame(
    null,
    UpdateManager::checksumDigest($checksumHash . '  package.pkg'),
    'A checksum file with extra fields must fail closed.',
);

assertUpdateSame(
    'https://api.github.com/repos/example/contract-pfsense/releases/tags/v2.1.0',
    UpdateManager::releaseApiForVersion(UpdateManager::RELEASES_API, '2.1.0'),
    'Restore metadata must query the exact installed release instead of latest.',
);

$restoreHealMetadata = UpdateManager::createRestoreHealMetadata($release, '2.1.0');

assertUpdateSame(true, is_array($restoreHealMetadata), 'An API digest must create restore-heal metadata.');
assertUpdateSame('2.1.0', $restoreHealMetadata['version'], 'Restore metadata must pin the installed version.');
assertUpdateSame(str_repeat('a', 64), $restoreHealMetadata['sha256'], 'Restore metadata must pin the API SHA-256 digest.');

$restoreHealCommand = UpdateManager::buildRestoreHealCommand($restoreHealMetadata);

assertUpdateSame(true, is_string($restoreHealCommand), 'Verified metadata must create one restore-heal command.');
assertUpdateSame(
    true,
    str_starts_with($restoreHealCommand, UpdateManager::RESTORE_HEAL_COMMAND_MARKER),
    'The restore-heal command must start with its package marker.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, '/conf/needs_package_sync'),
    'The restore-heal command must wait for the stock package reinstaller.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, 'pkg info -e'),
    'The restore-heal command must exit when the package is already installed.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, UpdateManager::DOWNLOAD_PREFIX . 'v2.1.0/'),
    'The restore-heal command must contain a versioned release URL.',
);
assertUpdateSame(
    false,
    str_contains(strtolower($restoreHealCommand), '/latest/'),
    'The restore-heal command must never use a latest-release URL.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, '/conf/[__WORKSPACE_NAME__]/restore-heal/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.1.0.pkg'),
    'The restore-heal command must check the exact local package path.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, str_repeat('a', 64)),
    'The restore-heal command must contain the pinned SHA-256 digest.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, 'pkg add -f'),
    'The restore-heal command must reinstall through pkg add -f.',
);
assertUpdateSame(
    true,
    strlen($restoreHealCommand) <= UpdateManager::RESTORE_HEAL_COMMAND_LIMIT,
    'The restore-heal command must fit FreeBSD cron\'s command buffer.',
);
assertUpdateSame(
    true,
    str_contains($restoreHealCommand, '/usr/sbin/daemon -f /bin/sh -c'),
    'The restore-heal command must detach from cron.',
);

$restoreShellTestDirectory = makeUpdateTestDirectory();
$restoreShellTestPath = $restoreShellTestDirectory . '/restore-heal.sh';

try {
    file_put_contents($restoreShellTestPath, $restoreHealCommand . PHP_EOL);
    $restoreShellCheckOutput = [];

    exec('/bin/sh -n ' . escapeshellarg($restoreShellTestPath), $restoreShellCheckOutput, $restoreShellCheckExitCode);

    assertUpdateSame(0, $restoreShellCheckExitCode, 'The generated restore-heal cron command must pass sh -n.');
} finally {
    removeUpdateTestDirectory($restoreShellTestDirectory);
}

$unrelatedCronItem = [
    'minute' => '5',
    'hour' => '*',
    'mday' => '*',
    'month' => '*',
    'wday' => '*',
    'who' => 'root',
    'command' => '/usr/local/sbin/unrelated-task',
];
$writtenRestoreCronItems = UpdateManager::restoreHealCronItems(
    [$unrelatedCronItem],
    $restoreHealCommand,
);
$writtenRestoreCronItem = $writtenRestoreCronItems[1];

assertUpdateSame(2, count($writtenRestoreCronItems), 'Writing restore heal must preserve another package cron item.');
assertUpdateSame('*/15', $writtenRestoreCronItem['minute'], 'Restore heal must run every 15 minutes.');
assertUpdateSame('root', $writtenRestoreCronItem['who'], 'Restore heal must run as root.');
assertUpdateSame($restoreHealCommand, $writtenRestoreCronItem['command'], 'Restore heal must write the verified command.');

$currentRestoreCronItems = [
    $unrelatedCronItem,
    $writtenRestoreCronItem,
];
$currentRestoreLookupCount = 0;
$currentRestoreMetadataLookup = static function (string $version) use (
    &$currentRestoreLookupCount,
    $restoreHealMetadata,
): ?array {
    $currentRestoreLookupCount++;

    return $restoreHealMetadata;
};
$currentRestoreCommand = UpdateManager::resolveRestoreHealCommand(
    $currentRestoreCronItems,
    '2.1.0',
    $currentRestoreMetadataLookup,
);
$currentRestoreWriteCount = 0;
$unchangedCurrentRestoreCronItems = applyResolvedRestoreHealCommand(
    $currentRestoreCronItems,
    $currentRestoreCommand,
    $currentRestoreWriteCount,
);

assertUpdateSame(false, $currentRestoreCommand, 'A current restore-heal command must require no cron action.');
assertUpdateSame(0, $currentRestoreLookupCount, 'A current restore-heal command must skip release lookup.');
assertUpdateSame(0, $currentRestoreWriteCount, 'A current restore-heal command must skip the configuration write.');
assertUpdateSame(
    $currentRestoreCronItems,
    $unchangedCurrentRestoreCronItems,
    'A current restore-heal command must remain byte-for-byte unchanged.',
);

$staleRestoreCronItem = $writtenRestoreCronItem;
$staleRestoreCronItem['command'] = UpdateManager::RESTORE_HEAL_COMMAND_MARKER . ' /usr/sbin/daemon -f /bin/sh -c old';
$existingStaleRestoreCronItems = [
    $staleRestoreCronItem,
    $unrelatedCronItem,
];
$transientRestoreLookupCount = 0;
$transientRestoreLogCount = 0;
$transientRestoreMetadataLookup = static function (string $version) use (&$transientRestoreLookupCount): ?array {
    $transientRestoreLookupCount++;

    throw new RuntimeException('Temporary restore-heal lookup failure.');
};
$transientRestoreFailureLogger = static function (Throwable $throwable) use (&$transientRestoreLogCount): void {
    $transientRestoreLogCount++;
};
$transientRestoreCommand = UpdateManager::resolveRestoreHealCommand(
    $existingStaleRestoreCronItems,
    '2.1.0',
    $transientRestoreMetadataLookup,
    $transientRestoreFailureLogger,
);
$transientRestoreWriteCount = 0;
$unchangedTransientRestoreCronItems = applyResolvedRestoreHealCommand(
    $existingStaleRestoreCronItems,
    $transientRestoreCommand,
    $transientRestoreWriteCount,
);

assertUpdateSame(false, $transientRestoreCommand, 'A transient lookup failure must require no cron action.');
assertUpdateSame(1, $transientRestoreLookupCount, 'A stale restore-heal command must attempt one release lookup.');
assertUpdateSame(1, $transientRestoreLogCount, 'A transient lookup failure must log exactly once.');
assertUpdateSame(0, $transientRestoreWriteCount, 'A transient lookup failure must skip the configuration write.');
assertUpdateSame(
    $existingStaleRestoreCronItems,
    $unchangedTransientRestoreCronItems,
    'A transient lookup failure must leave every existing cron item unchanged.',
);

$definitiveRestoreLogCount = 0;
$definitiveRestoreMetadataLookup = static function (string $version): ?array {
    throw new RestoreHealUnavailableException('The installed release returned HTTP 404.');
};
$definitiveRestoreFailureLogger = static function (Throwable $throwable) use (&$definitiveRestoreLogCount): void {
    $definitiveRestoreLogCount++;
};
$definitiveRestoreCommand = UpdateManager::resolveRestoreHealCommand(
    $existingStaleRestoreCronItems,
    '2.1.0',
    $definitiveRestoreMetadataLookup,
    $definitiveRestoreFailureLogger,
);
$definitiveRestoreWriteCount = 0;
$removedDefinitiveRestoreCronItems = applyResolvedRestoreHealCommand(
    $existingStaleRestoreCronItems,
    $definitiveRestoreCommand,
    $definitiveRestoreWriteCount,
);

assertUpdateSame(null, $definitiveRestoreCommand, 'A definite HTTP 404 must remove stale restore heal.');
assertUpdateSame(0, $definitiveRestoreLogCount, 'A definite HTTP 404 must not use the transient failure logger.');
assertUpdateSame(1, $definitiveRestoreWriteCount, 'A definite HTTP 404 removal must write the changed cron list.');
assertUpdateSame(
    [$unrelatedCronItem],
    $removedDefinitiveRestoreCronItems,
    'A definite HTTP 404 must remove only the package-owned restore entry.',
);

$newRestoreHealMetadata = [
    'version' => '2.2.0',
    'url' => UpdateManager::DOWNLOAD_PREFIX . 'v2.2.0/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.2.0.pkg',
    'sha256' => str_repeat('b', 64),
    'file_name' => 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]-2.2.0.pkg',
];
$newRestoreHealCommand = UpdateManager::buildRestoreHealCommand($newRestoreHealMetadata);
$successfulRestoreLookupCount = 0;
$successfulRestoreMetadataLookup = static function (string $version) use (
    &$successfulRestoreLookupCount,
    $newRestoreHealMetadata,
): ?array {
    $successfulRestoreLookupCount++;

    return $newRestoreHealMetadata;
};
$replacementRestoreCommand = UpdateManager::resolveRestoreHealCommand(
    $existingStaleRestoreCronItems,
    '2.2.0',
    $successfulRestoreMetadataLookup,
);
$replacementRestoreWriteCount = 0;
$replacedRestoreCronItems = applyResolvedRestoreHealCommand(
    $existingStaleRestoreCronItems,
    $replacementRestoreCommand,
    $replacementRestoreWriteCount,
);

assertUpdateSame(1, $successfulRestoreLookupCount, 'A new installed version must perform one release lookup.');
assertUpdateSame($newRestoreHealCommand, $replacementRestoreCommand, 'A successful lookup must resolve the new pinned command.');
assertUpdateSame(1, $replacementRestoreWriteCount, 'A successful lookup must write the replacement cron list.');
assertUpdateSame(2, count($replacedRestoreCronItems), 'A successful lookup must preserve unrelated cron work.');
assertUpdateSame($unrelatedCronItem, $replacedRestoreCronItems[0], 'A successful lookup must preserve the unrelated cron item.');
assertUpdateSame($newRestoreHealCommand, $replacedRestoreCronItems[1]['command'], 'A successful lookup must replace the stale pinned command.');

$refreshedRestoreCronItems = UpdateManager::restoreHealCronItems(
    $existingStaleRestoreCronItems,
    $restoreHealCommand,
);

assertUpdateSame(
    [
        $unrelatedCronItem,
        $writtenRestoreCronItem,
    ],
    $refreshedRestoreCronItems,
    'Refreshing restore heal must replace only the stale package-owned command.',
);
assertUpdateSame(
    [$unrelatedCronItem],
    UpdateManager::restoreHealCronItems($refreshedRestoreCronItems, null),
    'A deliberate deinstall must remove only the package-owned restore entry.',
);
assertUpdateSame(
    [
        $staleRestoreCronItem,
        $unrelatedCronItem,
    ],
    UpdateManager::restoreHealCronItems(
        [
            $staleRestoreCronItem,
            $unrelatedCronItem,
        ],
        null,
        true,
    ),
    'A retained deinstall must leave the restore entry unchanged.',
);
assertUpdateSame(
    false,
    UpdateManager::shouldKeepRestoreHealEntry(false, false),
    'A deliberate uninstall without Keep Settings must remove restore heal.',
);
assertUpdateSame(
    true,
    UpdateManager::shouldKeepRestoreHealEntry(true, false),
    'A restore-driven removal must keep restore heal.',
);
assertUpdateSame(
    true,
    UpdateManager::shouldKeepRestoreHealEntry(false, true),
    'Keep Settings must keep restore heal.',
);

$checksumRestoreHealMetadata = UpdateManager::createRestoreHealMetadata(
    $checksumRelease,
    '2.1.0',
    $checksumHash . PHP_EOL,
);

assertUpdateSame(
    $checksumHash,
    $checksumRestoreHealMetadata['sha256'],
    'Restore heal must use the updater checksum-asset fallback.',
);

$unverifiableRelease = $release;
$unverifiableRelease['assets'][0]['digest'] = null;
$unverifiableRestoreHealMetadata = UpdateManager::createRestoreHealMetadata(
    $unverifiableRelease,
    '2.1.0',
);

assertUpdateSame(null, $unverifiableRestoreHealMetadata, 'A release without a verifiable hash must create no metadata.');
assertUpdateSame(
    [],
    UpdateManager::restoreHealCronItems([$staleRestoreCronItem], null),
    'A release without a verifiable hash must remove a stale restore entry.',
);


$keyA = 'AAAAC3NzaC1lZDI1NTE5AAAAIEcEuM8O7kQQkKHAgao93cat1D9++Xd8gX4JXKEza6HH';
$keyB = 'AAAAC3NzaC1lZDI1NTE5AAAAIMNV3G6CQ4eHbujtIxgdDPgCOnbMkK9YIYmRI35AWzQx';
$signingTestDirectory = makeUpdateTestDirectory();
$packageFixturePath = $signingTestDirectory . '/' . UpdateManager::PACKAGE_NAME . '-9.9.9.pkg';
$signatureFixturePath = $packageFixturePath . '.sig';

try {
    file_put_contents($packageFixturePath, 'signed package fixture');
    file_put_contents($signatureFixturePath, 'detached signature fixture');

    assertUpdateSame(
        [],
        UpdateManager::readSigningKeys($signingTestDirectory . '/missing.pub'),
        'A missing release signing key file must keep unsigned updates compatible.',
    );

    $commentOnlyPath = $signingTestDirectory . '/comments.pub';

    file_put_contents($commentOnlyPath, "# Comment\n\n  # Indented comment\n");

    assertUpdateSame(
        [],
        UpdateManager::readSigningKeys($commentOnlyPath),
        'A comment-only release signing key file must contain no trusted keys.',
    );

    $twoKeysPath = $signingTestDirectory . '/two-keys.pub';
    $twoKeysContents = "# First key\r\n\r\n"
        . "ssh-ed25519 $keyA first key\r\n"
        . "  # Between keys\r\n"
        . "ssh-ed25519 $keyB second key\r\n";

    file_put_contents($twoKeysPath, $twoKeysContents);

    assertUpdateSame(
        [$keyA, $keyB],
        UpdateManager::readSigningKeys($twoKeysPath),
        'CRLF, comments, and two valid release signing keys must be accepted.',
    );

    $malformedKeyPath = $signingTestDirectory . '/malformed.pub';

    file_put_contents($malformedKeyPath, 'ssh-rsa invalid' . PHP_EOL);

    assertUpdateFailure(
        static fn (): array => UpdateManager::readSigningKeys($malformedKeyPath),
        'The installed release signing key file is unreadable or malformed, so the update was not installed.',
    );

    $expectedAllowedSigners = UpdateManager::PACKAGE_NAME
        . ' namespaces="'
        . UpdateManager::PACKAGE_NAME
        . '" ssh-ed25519 '
        . $keyA
        . "\n"
        . UpdateManager::PACKAGE_NAME
        . ' namespaces="'
        . UpdateManager::PACKAGE_NAME
        . '" ssh-ed25519 '
        . $keyB
        . "\n";

    assertUpdateSame(
        $expectedAllowedSigners,
        UpdateManager::allowedSignersContent([$keyA, $keyB]),
        'Allowed signers content must restrict every key to the package namespace.',
    );

    $successfulStub = writeUpdateSshKeygenStub($signingTestDirectory, 'ssh-keygen-success', 0);
    $stubManager = new UpdateManager(
        installedVersion: '9.9.8',
        signingKeysFile: $twoKeysPath,
        sshKeygenCommand: $successfulStub['command'],
    );

    $stubManager->verifyReleaseSignature(
        $packageFixturePath,
        $signatureFixturePath,
        [$keyA],
        $signingTestDirectory,
    );

    $expectedStubArguments = implode(PHP_EOL, [
        '-Y',
        'verify',
        '-f',
        $signingTestDirectory . '/allowed_signers',
        '-I',
        UpdateManager::PACKAGE_NAME,
        '-n',
        UpdateManager::PACKAGE_NAME,
        '-s',
        $signatureFixturePath,
    ]) . PHP_EOL;

    assertUpdateSame(
        $expectedStubArguments,
        file_get_contents($successfulStub['arguments']),
        'Signature verification must pass the exact ssh-keygen argument vector.',
    );
    assertUpdateSame(
        file_get_contents($packageFixturePath),
        file_get_contents($successfulStub['stdin']),
        'Signature verification must stream the downloaded package bytes to ssh-keygen.',
    );
    assertUpdateSame(
        0600,
        fileperms($signingTestDirectory . '/allowed_signers') & 0777,
        'The generated allowed-signers file must use private permissions.',
    );

    $failingStub = writeUpdateSshKeygenStub($signingTestDirectory, 'ssh-keygen-failure', 1);
    $failingStubManager = new UpdateManager(
        installedVersion: '9.9.8',
        signingKeysFile: $twoKeysPath,
        sshKeygenCommand: $failingStub['command'],
    );

    assertUpdateFailure(
        static function () use (
            $failingStubManager,
            $packageFixturePath,
            $signatureFixturePath,
            $keyA,
            $signingTestDirectory,
        ): void {
            $failingStubManager->verifyReleaseSignature(
                $packageFixturePath,
                $signatureFixturePath,
                [$keyA],
                $signingTestDirectory,
            );
        },
        'The release signature does not match this package\'s signing key, so the update was not installed.',
    );

    $missingToolManager = new UpdateManager(
        installedVersion: '9.9.8',
        signingKeysFile: $twoKeysPath,
        sshKeygenCommand: $signingTestDirectory . '/missing-ssh-keygen',
    );

    assertUpdateFailure(
        static function () use (
            $missingToolManager,
            $packageFixturePath,
            $signatureFixturePath,
            $keyA,
            $signingTestDirectory,
        ): void {
            $missingToolManager->verifyReleaseSignature(
                $packageFixturePath,
                $signatureFixturePath,
                [$keyA],
                $signingTestDirectory,
            );
        },
        'The required ssh-keygen signature verification tool is unavailable, so the update was not installed.',
    );

    $realSshKeygen = findUpdateSshKeygen();

    if ($realSshKeygen === null) {
        fwrite(STDOUT, "SKIP: ssh-keygen is unavailable; a real release signature was not verified.\n");
    } else {
        $privateKeyPath = $signingTestDirectory . '/release-key';
        $generateCommand = sprintf(
            '%s -q -t ed25519 -N %s -f %s',
            escapeshellarg($realSshKeygen),
            escapeshellarg(''),
            escapeshellarg($privateKeyPath),
        );

        exec($generateCommand, $generateOutput, $generateExitCode);

        if ($generateExitCode !== 0) {
            throw new RuntimeException('Could not generate the release signing test key.');
        }

        $generatedKeys = UpdateManager::readSigningKeys($privateKeyPath . '.pub');
        $generatedKey = $generatedKeys[0] ?? null;

        if (!is_string($generatedKey)) {
            throw new RuntimeException('The generated release signing test key is invalid.');
        }

        $signCommand = sprintf(
            '%s -Y sign -f %s -n %s %s',
            escapeshellarg($realSshKeygen),
            escapeshellarg($privateKeyPath),
            escapeshellarg(UpdateManager::PACKAGE_NAME),
            escapeshellarg($packageFixturePath),
        );

        @unlink($signatureFixturePath);
        exec($signCommand, $signOutput, $signExitCode);

        if ($signExitCode !== 0) {
            throw new RuntimeException('Could not sign the release package fixture.');
        }

        $realSignatureManager = new UpdateManager(
            installedVersion: '9.9.8',
            signingKeysFile: $privateKeyPath . '.pub',
            sshKeygenCommand: $realSshKeygen,
        );

        $realSignatureManager->verifyReleaseSignature(
            $packageFixturePath,
            $signatureFixturePath,
            [$generatedKey],
            $signingTestDirectory,
        );

        $tamperedPackagePath = $signingTestDirectory . '/tampered.pkg';

        file_put_contents(
            $tamperedPackagePath,
            (string) file_get_contents($packageFixturePath) . 'tampered',
        );

        assertUpdateFailure(
            static function () use (
                $realSignatureManager,
                $tamperedPackagePath,
                $signatureFixturePath,
                $generatedKey,
                $signingTestDirectory,
            ): void {
                $realSignatureManager->verifyReleaseSignature(
                    $tamperedPackagePath,
                    $signatureFixturePath,
                    [$generatedKey],
                    $signingTestDirectory,
                );
            },
            'The release signature does not match this package\'s signing key, so the update was not installed.',
        );
    }
} finally {
    removeUpdateTestDirectory($signingTestDirectory);
}

$missingChecksumRelease = $checksumRelease;
$missingChecksumRelease['assets'] = [$checksumRelease['assets'][0]];

assertUpdateFailure(
    static fn (): array => UpdateManager::selectUpdateAssets($missingChecksumRelease),
    'The release provides neither a GitHub SHA-256 digest nor the required checksum asset '
        . $checksumAssetName
        . '. The installed version was kept.',
);

@unlink($digestPath);

$statusTestDirectory = makeUpdateTestDirectory();
$statusTestPath = $statusTestDirectory . '/update-status.json';

try {
    UpdateManager::queueSelfUpdate('2.1.0', $statusTestPath);

    $runningStatus = UpdateManager::readStatusState($statusTestPath, '2.0.1');

    assertUpdateSame('running', $runningStatus['state'] ?? null, 'An install must stay running until pfSense reports the new version.');

    $settledStatus = UpdateManager::readStatusState($statusTestPath, 'v2.1.0');

    assertUpdateSame('succeeded', $settledStatus['state'] ?? null, 'A running install must settle once pfSense reports its version.');
    assertUpdateSame('2.1.0', $settledStatus['version'] ?? null, 'The settled status must keep the installed version.');
    assertUpdateSame(true, is_string($settledStatus['finished_at'] ?? null), 'The settled status must record when it finished.');

    $savedStatus = UpdateManager::readStatusState($statusTestPath, '2.0.1');

    assertUpdateSame('succeeded', $savedStatus['state'] ?? null, 'The settled status must be saved for later reads.');
} finally {
    removeUpdateTestDirectory($statusTestDirectory);
}

fwrite(STDOUT, "Update checks, restore recovery, notices, schedules, checksums, and signatures passed.\n");

exit(0);
