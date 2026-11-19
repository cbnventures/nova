<?php

declare(strict_types=1);

namespace PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime;

use JsonException;
use RuntimeException;
use Throwable;

require_once(__DIR__ . '/PackagePaths.php');

/**
 * Reports a definitive absence of verifiable restore-heal release metadata.
 *
 * Exact release and checksum 404s use this type so synchronization can remove
 * stale protection without treating temporary transport failures as absence.
 *
 * @since UNRELEASED
 */
final class RestoreHealUnavailableException extends RuntimeException
{
}

/**
 * Checks GitHub releases and installs checksum-verified package updates.
 *
 * Scheduled checks, notices, and the About tab share this boundary so release
 * parsing and every verification step remain independently testable.
 *
 * @since UNRELEASED
 */
final class UpdateManager
{
    /** GitHub latest-release API endpoint. @since UNRELEASED */
    public const RELEASES_API = '[__PFSENSE_UPDATE_API_URL__]';

    /** Allowed prefix for release asset URLs returned by GitHub. @since UNRELEASED */
    public const DOWNLOAD_PREFIX = '[__PFSENSE_UPDATE_DOWNLOAD_PREFIX__]';

    /** Stable pfSense notice identifier for available releases. @since UNRELEASED */
    public const NOTICE_ID = '[__WORKSPACE_NAME__]-update-available';

    /** Stable pfSense notice identifier for restore reassurance. @since UNRELEASED */
    public const RESTORE_NOTICE_ID = '[__WORKSPACE_NAME__]-restore-reassurance';

    /** Package-specific prefix for the persistent restore-heal cron command. @since UNRELEASED */
    public const RESTORE_HEAL_COMMAND_MARKER = ': "[__WORKSPACE_NAME__]-restore-heal";';

    /** Largest command accepted by FreeBSD cron, excluding its terminating NUL. @since UNRELEASED */
    public const RESTORE_HEAL_COMMAND_LIMIT = 999;

    /** Exact shared restore-heal shell script. @since UNRELEASED */
    public const RESTORE_HEAL_SCRIPT = 'p=$1;r=$2;h=$3;v=$4;g=$5-restore-heal;d=/conf/$5/restore-heal;n=$p-$v.pkg;c=$d/$n;t=$c.tmp;L(){ /usr/bin/logger -t $g "$1 $v";};[ -e /conf/needs_package_sync ]&&{ L deferred;exit 0;};/usr/local/sbin/pkg info -e $p&&exit 0;k(){ [ "$(/sbin/sha256 -q $1 2>/dev/null)" = $h ];};if k $c;then L cache;else /bin/rm -f $t;L fetch;/bin/mkdir -p $d&&/usr/bin/fetch -q -T 30 -o $t https://github.com/$r/releases/download/v$v/$n||{ /bin/rm -f $t;L fetch-failed;exit 1;};k $t||{ /bin/rm -f $t;L checksum-failed;exit 1;};/bin/rm -f $d/*.pkg;/bin/mv -f $t $c||{ L cache-failed;exit 1;};fi;L install;/usr/local/sbin/pkg add -f $c >/dev/null 2>&1||{ L install-failed;exit 1;};L installed';

    /** Package name recorded in the FreeBSD package manifest. @since UNRELEASED */
    public const PACKAGE_NAME = 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]';

    /** Package display name recorded in pfSense configuration. @since UNRELEASED */
    public const REGISTERED_NAME = '[__WORKSPACE_TITLE__]';

    /** Package internal name recorded in pfSense configuration. @since UNRELEASED */
    public const REGISTERED_INTERNAL_NAME = '[__WORKSPACE_IDENTIFIER__]';

    /** Package data directory containing the fallback version metadata. @since UNRELEASED */
    public const PACKAGE_DATA_DIRECTORY = '/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]';

    /** Installed OpenSSH public keys trusted for release updates. @since UNRELEASED */
    public const SIGNING_KEYS_FILE = self::PACKAGE_DATA_DIRECTORY . '/release-signing.pub';

    /** Fixed OpenSSH tool used for release signature verification. @since UNRELEASED */
    public const SSH_KEYGEN_COMMAND = '/usr/bin/ssh-keygen';

    /** About page linked by the pfSense bell notice. @since UNRELEASED */
    public const ABOUT_PAGE = '/[__WORKSPACE_NAME__]-about.php';

    /** User agent sent with every GitHub request. @since UNRELEASED */
    private const USER_AGENT = 'pfSense-pkg-[__WORKSPACE_IDENTIFIER__]';

    /** Largest accepted package release asset in bytes. @since UNRELEASED */
    private const PACKAGE_DOWNLOAD_LIMIT = 64 * 1024 * 1024;

    /** Largest accepted checksum or signature release asset in bytes. @since UNRELEASED */
    private const AUXILIARY_DOWNLOAD_LIMIT = 64 * 1024;

    /** Fixed package executable used for metadata checks and installation. @since UNRELEASED */
    private const PKG_COMMAND = '/usr/local/sbin/pkg';

    /** Fixed FreeBSD daemon executable used by the restore-heal cron entry. @since UNRELEASED */
    private const DAEMON_COMMAND = '/usr/sbin/daemon';

    /** Fixed base shell used by the restore-heal cron entry. @since UNRELEASED */
    private const SHELL_COMMAND = '/bin/sh';

    /** Exact stock pfSense false-removal notice template. @since UNRELEASED */
    private const FALSE_REMOVAL_NOTICE = 'Package %s does not exist in current %s version and it has been removed.';

    /** Package reassurance filed after a false restore-removal notice. @since UNRELEASED */
    private const RESTORE_REASSURANCE_NOTICE = '%s is still installed and its settings are unchanged. pfSense reported it as removed after the configuration restore only because it isn\'t installed from Netgate\'s package repository. No action is needed.';

    /**
     * Creates an update coordinator with production or test-only CLI endpoints.
     *
     * The WebGUI never constructs endpoint overrides. Only the CLI reads the
     * documented test environment variables and passes their values here.
     *
     * @param string $installedVersion     - Installed package version.
     * @param string $releasesApi          - Latest-release API endpoint.
     * @param string $downloadPrefix       - Allowed release asset URL prefix.
     * @param string $updatesFile          - Persistent update metadata path.
     * @param string $statusFile           - Background update status path.
     * @param string $signingKeysFile      - Test-only release signing key path.
     * @param string $sshKeygenCommand     - Test-only OpenSSH executable path.
     * @param string $restoreHealDirectory - Persistent verified package directory.
     *
     * @since UNRELEASED
     */
    public function __construct(
        private readonly string $installedVersion,
        private readonly string $releasesApi = self::RELEASES_API,
        private readonly string $downloadPrefix = self::DOWNLOAD_PREFIX,
        private readonly string $updatesFile = PackagePaths::UPDATES_FILE,
        private readonly string $statusFile = PackagePaths::UPDATE_STATUS_FILE,
        private readonly string $signingKeysFile = self::SIGNING_KEYS_FILE,
        private readonly string $sshKeygenCommand = self::SSH_KEYGEN_COMMAND,
        private readonly string $restoreHealDirectory = PackagePaths::RESTORE_HEAL_DIRECTORY,
    ) {
    }

    /**
     * Reports whether this generated package has a supported GitHub repository.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function isAvailable(): bool
    {
        return self::RELEASES_API !== '' && self::DOWNLOAD_PREFIX !== '';
    }

    /**
     * Confirms the pfSense APIs needed by update operations are available.
     *
     * Fixed system includes provide configuration, proxy, notice, and logging
     * functions without loading the prefix-mutation adapter.
     *
     * @return void
     *
     * @throws RuntimeException When the runtime is not a supported pfSense host.
     *
     * @since UNRELEASED
     */
    public static function assertEnvironment(): void
    {
        if (self::isAvailable() === false) {
            throw new RuntimeException(self::translate('Update checks are unavailable because this package was generated without a github.com repository.'));
        }

        if (PHP_OS_FAMILY !== 'BSD' || file_exists('/etc/version') === false) {
            throw new RuntimeException(self::translate('[__WORKSPACE_TITLE__] must run on a supported pfSense system.'));
        }

        $requiredFiles = [
            '/etc/inc/config.inc',
            '/etc/inc/notices.inc',
            '/etc/inc/pfsense-utils.inc',
        ];

        foreach ($requiredFiles as $requiredFile) {
            if (is_readable($requiredFile) === false) {
                throw new RuntimeException(self::translate('Required pfSense dependency "%1$s" is unavailable.', [$requiredFile]));
            }

            require_once($requiredFile);
        }

        $requiredFunctions = [
            'close_notice',
            'config_get_path',
            'file_notice',
            'log_error',
            'set_curlproxy',
        ];

        foreach ($requiredFunctions as $requiredFunction) {
            if (function_exists($requiredFunction) === false) {
                throw new RuntimeException(self::translate('Required pfSense dependency "%1$s" is unavailable.', [$requiredFunction]));
            }
        }

        if (function_exists('curl_init') === false) {
            throw new RuntimeException(self::translate('The required cURL support is unavailable.'));
        }
    }

    /**
     * Replaces pfSense's false restore-removal notice with package reassurance.
     *
     * The synchronization hook calls this after the stock package reinstaller.
     * Every dependency and callback stays inside the failure boundary so boot
     * continues.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function reassureAfterRestore(): void
    {
        try {
            $requiredFunctions = [
                'close_notice',
                'config_get_path',
                'file_notice',
                'g_get',
                'get_notices',
            ];

            foreach ($requiredFunctions as $requiredFunction) {
                if (function_exists($requiredFunction) === false) {
                    return;
                }
            }

            $notices = \get_notices();

            if ($notices === false) {
                return;
            }

            $installedPackages = \config_get_path('installedpackages/package', []);
            $productLabel = \g_get('product_label');

            if (
                !is_array($notices)
                || !is_array($installedPackages)
                || !is_string($productLabel)
                || $productLabel === ''
            ) {
                return;
            }

            $translator = static fn (string $message): string => function_exists('gettext')
                ? (string) \gettext($message)
                : $message;
            $closeNotice = static function (mixed $noticeId): void {
                \close_notice($noticeId);
            };
            $fileNotice = static function (
                string $noticeId,
                string $notice,
                string $category,
                string $url,
                int $priority,
                bool $localOnly,
            ): void {
                \file_notice(
                    $noticeId,
                    $notice,
                    $category,
                    $url,
                    $priority,
                    $localOnly,
                );
            };

            self::reconcileRestoreNotices(
                $notices,
                $installedPackages,
                $productLabel,
                $translator,
                $closeNotice,
                $fileNotice,
            );
        } catch (Throwable $throwable) {
            self::logRestoreFailure($throwable);
        }
    }

    /**
     * Closes every package-owned notice by its pfSense queue key.
     *
     * Uninstall uses the live queue because close_notice() removes only one
     * matching entry per call and pfSense stores notices under timestamp keys.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function closePackageNotices(): void
    {
        if (
            function_exists('close_notice') === false
            || function_exists('get_notices') === false
        ) {
            return;
        }

        $notices = \get_notices();

        if ($notices === false || !is_array($notices)) {
            return;
        }

        $noticeIds = [
            self::NOTICE_ID,
            self::RESTORE_NOTICE_ID,
        ];
        $storedNoticeIds = array_map(
            static fn (string $noticeId): string => htmlentities($noticeId),
            $noticeIds,
        );

        foreach ($notices as $noticeKey => $notice) {
            $noticeId = is_array($notice)
                ? ($notice['id'] ?? null)
                : null;

            if (
                in_array($noticeKey, $noticeIds, true) === false
                && (
                    !is_string($noticeId)
                    || in_array($noticeId, $storedNoticeIds, true) === false
                )
            ) {
                continue;
            }

            \close_notice($noticeKey);
        }
    }

    /**
     * Reconciles one snapshot of pfSense notices after a configuration restore.
     *
     * Tests provide localized translators and notice stubs. Production passes the
     * matching pfSense functions after reading the live package and notice arrays.
     *
     * @param array    $notices           - Current pfSense notices.
     * @param array    $installedPackages - Registered pfSense packages.
     * @param string   $productLabel      - Localized pfSense product label.
     * @param callable $translator        - Package message translator.
     * @param callable $closeNotice       - Notice close callback.
     * @param callable $fileNotice        - Notice creation callback.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function reconcileRestoreNotices(
        array $notices,
        array $installedPackages,
        string $productLabel,
        callable $translator,
        callable $closeNotice,
        callable $fileNotice,
    ): void {
        $installedPackage = self::findInstalledPackage($installedPackages);

        if ($installedPackage === null) {
            return;
        }

        $packageName = $installedPackage['name'] ?? null;
        $packageInternalName = $installedPackage['internal_name'] ?? null;

        if (!is_string($packageName) || $packageName === '') {
            return;
        }

        $noticePackageNames = [
            $packageName,
        ];

        if (is_string($packageInternalName) && $packageInternalName !== '') {
            $noticePackageNames[] = sprintf('%s (%s)', $packageName, $packageInternalName);
        }

        $falseNoticeTemplate = (string) $translator(self::FALSE_REMOVAL_NOTICE);
        $plainFalseNoticeTexts = array_map(
            static fn (string $noticePackageName): string => sprintf(
                $falseNoticeTemplate,
                $noticePackageName,
                $productLabel,
            ),
            $noticePackageNames,
        );
        $storedFalseNoticeTexts = array_map(
            static fn (string $falseNoticeText): string => htmlentities($falseNoticeText),
            $plainFalseNoticeTexts,
        );
        $falseNoticeTexts = array_values(array_unique([
            ...$plainFalseNoticeTexts,
            ...$storedFalseNoticeTexts,
        ]));
        $matchedNoticeKeys = [];
        $reassuranceNoticeExists = false;
        $storedRestoreNoticeId = htmlentities(self::RESTORE_NOTICE_ID);

        foreach ($notices as $noticeKey => $notice) {
            if (!is_array($notice)) {
                continue;
            }

            $noticeId = $notice['id'] ?? null;
            $noticeText = $notice['notice'] ?? null;

            if ($noticeId === $storedRestoreNoticeId || $noticeKey === self::RESTORE_NOTICE_ID) {
                $reassuranceNoticeExists = true;
            }

            if (
                is_string($noticeText)
                && in_array($noticeText, $falseNoticeTexts, true)
                && in_array($noticeKey, $matchedNoticeKeys, true) === false
            ) {
                $matchedNoticeKeys[] = $noticeKey;
            }
        }

        if (count($matchedNoticeKeys) === 0) {
            return;
        }

        foreach ($matchedNoticeKeys as $matchedNoticeKey) {
            $closeNotice($matchedNoticeKey);
        }

        if ($reassuranceNoticeExists === true) {
            return;
        }

        $translatedPackageName = (string) $translator($packageName);
        $reassuranceTemplate = (string) $translator(self::RESTORE_REASSURANCE_NOTICE);
        $reassuranceNotice = sprintf($reassuranceTemplate, $translatedPackageName);

        $fileNotice(
            self::RESTORE_NOTICE_ID,
            $reassuranceNotice,
            $translatedPackageName,
            self::ABOUT_PAGE,
            1,
            true,
        );
    }

    /**
     * Checks the latest release, saves metadata, and synchronizes the notice.
     *
     * A failed request preserves the last valid release fields while recording a
     * localized error and attempt timestamp for the About tab.
     *
     * @param bool $remoteNotifications - Whether pfSense may notify remote channels.
     * @param bool $fileNotice          - Whether the check may file a pfSense notice.
     *
     * @return array
     *
     * @throws Throwable When GitHub or local state cannot be read or written.
     *
     * @since UNRELEASED
     */
    public function check(bool $remoteNotifications, bool $fileNotice): array
    {
        $this->clearStatus();

        $state = self::readUpdatesState($this->updatesFile);
        $checkedAt = gmdate(DATE_ATOM);

        try {
            $release = $this->fetchLatestRelease();

            // GitHub publishes the release before its build attaches the package. A newer
            // release that can't be installed yet stays unseen until its files are there.
            if (
                self::isNewerVersion($this->installedVersion, $release['version'])
                && $this->releaseInstallable($release) === false
            ) {
                $state['checked_at'] = $checkedAt;
                $state['last_error'] = null;

                self::writeJsonAtomically($this->updatesFile, $state);

                return $state;
            }

            $state = [
                'checked_at' => $checkedAt,
                'latest_version' => $release['version'],
                'tag' => $release['tag'],
                'release_url' => $release['release_url'],
                'published_at' => $release['published_at'],
                'notified_version' => $state['notified_version'],
                'last_error' => null,
            ];
            $state = self::synchronizeNotice(
                $state,
                $this->installedVersion,
                $release['version'],
                $remoteNotifications,
                $fileNotice,
            );

            self::writeJsonAtomically($this->updatesFile, $state);

            return $state;
        } catch (Throwable $throwable) {
            $state['checked_at'] = $checkedAt;
            $state['last_error'] = $throwable->getMessage();

            self::writeJsonAtomically($this->updatesFile, $state);
            $this->logFailure($throwable);

            throw $throwable;
        }
    }

    /**
     * Applies the self-update's own asset and signature rules.
     *
     * A release is offered only once its package, checksum, and required
     * signature are attached, so Update never fails while a build is running.
     *
     * @param array $release - Parsed release.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public function releaseInstallable(array $release): bool
    {
        try {
            $assets = self::selectUpdateAssets($release, $this->downloadPrefix);
            $signingKeys = self::readSigningKeys($this->signingKeysFile);
        } catch (Throwable) {
            return false;
        }

        return count($signingKeys) === 0 || is_array($assets['signature']);
    }

    /**
     * Maps one update frequency to fixed cron fields.
     *
     * The random components are generated once and reused whenever an administrator
     * changes between daily, weekly, and monthly checks.
     *
     * @param string $frequency - Daily, weekly, monthly, or never.
     * @param array  $schedule  - Stable random schedule values.
     *
     * @return array{string, string, string, string, string}|null
     *
     * @since UNRELEASED
     */
    public static function cronFields(string $frequency, array $schedule): ?array
    {
        $minute = (string) $schedule['minute'];
        $hour = (string) $schedule['hour'];

        return match ($frequency) {
            'daily' => [$minute, $hour, '*', '*', '*'],
            'weekly' => [$minute, $hour, '*', '*', (string) $schedule['weekday']],
            'monthly' => [$minute, $hour, (string) $schedule['monthday'], '*', '*'],
            'never' => null,
            default => [$minute, $hour, '*', '*', (string) $schedule['weekday']],
        };
    }

    /**
     * Returns the installed version using the About tab's two metadata sources.
     *
     * The pfSense installed-package record is authoritative, with the shipped
     * "info.xml" used while that record is unavailable during package lifecycle work.
     *
     * @return string|null
     *
     * @since UNRELEASED
     */
    public static function installedVersion(): ?string
    {
        if (function_exists('config_get_path')) {
            $installedPackages = config_get_path('installedpackages/package', []);

            if (is_array($installedPackages)) {
                $installedPackage = self::findInstalledPackage($installedPackages);
                $installedPackageVersion = is_array($installedPackage)
                    ? ($installedPackage['version'] ?? null)
                    : null;

                if (is_string($installedPackageVersion) && $installedPackageVersion !== '') {
                    return $installedPackageVersion;
                }
            }
        }

        $packageInfoPath = self::PACKAGE_DATA_DIRECTORY . '/info.xml';

        if (is_readable($packageInfoPath) === false) {
            return null;
        }

        if (function_exists('parse_xml_config_pkg') === false) {
            $xmlParserPath = '/etc/inc/xmlparse.inc';

            if (is_readable($xmlParserPath) === false) {
                return null;
            }

            require_once($xmlParserPath);
        }

        $packageInfo = parse_xml_config_pkg($packageInfoPath, 'pfsensepkgs');
        $packageInfoPackage = is_array($packageInfo) ? ($packageInfo['package'] ?? null) : null;

        if (!is_array($packageInfoPackage)) {
            return null;
        }

        $packageInfoVersion = $packageInfoPackage['version'] ?? null;

        if (!is_string($packageInfoVersion)) {
            $packageInfoPackageFirst = $packageInfoPackage[0] ?? null;
            $packageInfoVersion = is_array($packageInfoPackageFirst)
                ? ($packageInfoPackageFirst['version'] ?? null)
                : null;
        }

        return (is_string($packageInfoVersion) && $packageInfoVersion !== '')
            ? $packageInfoVersion
            : null;
    }

    /**
     * Validates a release asset URL against the configured repository prefix.
     *
     * Tests may pass a VM endpoint prefix, while production accepts only the fixed
     * GitHub repository download path.
     *
     * @param string $url            - Asset URL.
     * @param string $downloadPrefix - Allowed prefix.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function isAllowedAssetUrl(string $url, string $downloadPrefix = self::DOWNLOAD_PREFIX): bool
    {
        return $downloadPrefix !== '' && str_starts_with($url, $downloadPrefix);
    }

    /**
     * Validates a release page before the About tab renders it as a link.
     *
     * Only this repository's HTTPS release pages are accepted from persistent state.
     *
     * @param string $url - Release page URL.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function isAllowedReleaseUrl(string $url): bool
    {
        if (!str_ends_with(self::DOWNLOAD_PREFIX, 'download/')) {
            return false;
        }

        $releasePagePrefix = substr(self::DOWNLOAD_PREFIX, 0, -strlen('download/'));

        return $releasePagePrefix !== '' && str_starts_with($url, $releasePagePrefix);
    }

    /**
     * Compares installed and remote versions after removing one leading "v".
     *
     * GitHub tags use a leading letter while the package manifest stores the semantic
     * version alone, so both inputs are normalized before comparison.
     *
     * @param string $installedVersion - Installed version.
     * @param string $latestVersion    - Latest release version or tag.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function isNewerVersion(string $installedVersion, string $latestVersion): bool
    {
        $normalizedInstalledVersion = self::normalizeVersion($installedVersion);
        $normalizedLatestVersion = self::normalizeVersion($latestVersion);

        return version_compare($normalizedLatestVersion, $normalizedInstalledVersion, '>');
    }

    /**
     * Returns the exact-version GitHub API endpoint for one installed release.
     *
     * Restore metadata must describe the version that wrote the cron entry rather
     * than whichever release happens to be latest when a later boot synchronizes.
     *
     * @param string $releasesApi - Latest-release API endpoint.
     * @param string $version     - Installed package version.
     *
     * @return string|null
     *
     * @since UNRELEASED
     */
    public static function releaseApiForVersion(string $releasesApi, string $version): ?string
    {
        $latestSuffix = '/releases/latest';
        $normalizedVersion = self::normalizeVersion($version);

        if (
            str_ends_with($releasesApi, $latestSuffix) === false
            || preg_match('/^[0-9]+(?:\.[0-9]+){1,3}(?:[-+][0-9A-Za-z.-]+)?$/', $normalizedVersion) !== 1
        ) {
            return null;
        }

        $releasesBase = substr($releasesApi, 0, -strlen($latestSuffix));
        $releaseTag = rawurlencode('v' . $normalizedVersion);

        return $releasesBase . '/releases/tags/' . $releaseTag;
    }

    /**
     * Resolves the restore-heal command action for one package synchronization.
     *
     * False preserves the current cron list without a write, null definitively
     * removes stale entries, and a string replaces them with verified metadata.
     *
     * @param array         $items            - Current pfSense cron items.
     * @param string|null   $installedVersion - Installed package version.
     * @param callable      $metadataLookup   - Installed release metadata lookup.
     * @param callable|null $failureLogger    - Transient lookup failure logger.
     *
     * @return string|false|null
     *
     * @since UNRELEASED
     */
    public static function resolveRestoreHealCommand(
        array $items,
        ?string $installedVersion,
        callable $metadataLookup,
        ?callable $failureLogger = null,
    ): string|false|null {
        if ($installedVersion === null) {
            $throwable = new RuntimeException(self::translate('The installed package version could not be determined.'));

            if ($failureLogger !== null) {
                $failureLogger($throwable);
            }

            return false;
        }

        $currentCommand = self::findCurrentRestoreHealCommand(
            $items,
            $installedVersion,
        );

        if (is_string($currentCommand)) {
            return false;
        }

        if (
            self::isAvailable() === false
            || self::releaseApiForVersion(self::RELEASES_API, $installedVersion) === null
        ) {
            return null;
        }

        try {
            $metadata = $metadataLookup($installedVersion);
        } catch (RestoreHealUnavailableException) {
            return null;
        } catch (Throwable $throwable) {
            if ($failureLogger !== null) {
                $failureLogger($throwable);
            }

            return false;
        }

        if ($metadata === null) {
            return null;
        }

        if (!is_array($metadata)) {
            $throwable = new RuntimeException(self::translate('The restore-heal lookup returned invalid release metadata.'));

            if ($failureLogger !== null) {
                $failureLogger($throwable);
            }

            return false;
        }

        return self::buildRestoreHealCommand($metadata);
    }

    /**
     * Resolves the current installed release into pinned restore-heal metadata.
     *
     * GitHub's API digest wins. When only a checksum asset exists, this method
     * downloads that small file and applies the updater's strict hash-only parser.
     *
     * @return array{version: string, url: string, sha256: string, file_name: string}|null
     *
     * @throws RestoreHealUnavailableException When an exact release or checksum asset returns HTTP 404.
     * @throws Throwable When release metadata or checksum transport fails transiently.
     *
     * @since UNRELEASED
     */
    public function restoreHealMetadata(): ?array
    {
        $release = $this->fetchReleaseForVersion($this->installedVersion);

        try {
            $assets = self::selectUpdateAssets($release, $this->downloadPrefix);
        } catch (RuntimeException) {
            return null;
        }

        $temporaryDirectory = null;
        $checksumContents = null;

        try {
            if (is_array($assets['checksum'])) {
                $temporaryDirectory = $this->createTemporaryDirectory();
                $checksumPath = $temporaryDirectory . '/' . $assets['checksum']['name'];

                $this->downloadFile(
                    $assets['checksum']['url'],
                    $checksumPath,
                    self::AUXILIARY_DOWNLOAD_LIMIT,
                    notFoundIsDefinitive: true,
                );

                $downloadedChecksum = @file_get_contents($checksumPath);
                $checksumContents = is_string($downloadedChecksum)
                    ? $downloadedChecksum
                    : null;
            }

            return self::createRestoreHealMetadata(
                $release,
                $this->installedVersion,
                $checksumContents,
                $this->downloadPrefix,
            );
        } finally {
            if (is_string($temporaryDirectory)) {
                $this->removeTemporaryDirectory($temporaryDirectory);
            }
        }
    }

    /**
     * Creates verified restore-heal metadata from one parsed GitHub release.
     *
     * A missing API digest requires downloaded checksum contents. Invalid, stale,
     * or unverifiable releases return null so callers remove any older cron entry.
     *
     * @param array       $release          - Parsed GitHub release.
     * @param string      $installedVersion - Installed package version.
     * @param string|null $checksumContents - Downloaded hash-only checksum.
     * @param string      $downloadPrefix   - Allowed asset URL prefix.
     *
     * @return array{version: string, url: string, sha256: string, file_name: string}|null
     *
     * @since UNRELEASED
     */
    public static function createRestoreHealMetadata(
        array $release,
        string $installedVersion,
        ?string $checksumContents = null,
        string $downloadPrefix = self::DOWNLOAD_PREFIX,
    ): ?array {
        $releaseVersion = $release['version'] ?? null;
        $normalizedInstalledVersion = self::normalizeVersion($installedVersion);

        if (
            !is_string($releaseVersion)
            || self::normalizeVersion($releaseVersion) !== $normalizedInstalledVersion
        ) {
            return null;
        }

        try {
            $assets = self::selectUpdateAssets($release, $downloadPrefix);
        } catch (RuntimeException) {
            return null;
        }

        $digest = $assets['digest'];

        if (!is_string($digest) && is_string($checksumContents)) {
            $digest = self::checksumDigest($checksumContents);
        }

        $packageAssetName = $assets['package']['name'] ?? null;
        $packageAssetUrl = $assets['package']['url'] ?? null;
        $expectedPackageAssetName = self::PACKAGE_NAME . '-' . $normalizedInstalledVersion . '.pkg';

        if (
            !is_string($digest)
            || preg_match('/^sha256:([a-fA-F0-9]{64})$/', $digest, $digestMatches) !== 1
            || $packageAssetName !== $expectedPackageAssetName
            || !is_string($packageAssetUrl)
            || self::isAllowedAssetUrl($packageAssetUrl, $downloadPrefix) === false
        ) {
            return null;
        }

        return [
            'version' => $normalizedInstalledVersion,
            'url' => $packageAssetUrl,
            'sha256' => strtolower($digestMatches[1]),
            'file_name' => $packageAssetName,
        ];
    }

    /**
     * Builds the detached, self-contained restore-heal cron command.
     *
     * Every runtime value is pinned and shell-quoted before being saved in
     * "config.xml". The command needs only pfSense and FreeBSD base utilities.
     *
     * @param array $metadata - Verified restore-heal release metadata.
     *
     * @return string|null
     *
     * @since UNRELEASED
     */
    public static function buildRestoreHealCommand(array $metadata): ?string
    {
        $version = $metadata['version'] ?? null;
        $url = $metadata['url'] ?? null;
        $sha256 = $metadata['sha256'] ?? null;
        $fileName = $metadata['file_name'] ?? null;
        $name = '[__WORKSPACE_NAME__]';
        $repository = self::restoreHealRepository();
        $expectedFileName = is_string($version)
            ? self::PACKAGE_NAME . '-' . $version . '.pkg'
            : null;
        $expectedUrl = is_string($repository) && is_string($version) && is_string($expectedFileName)
            ? 'https://github.com/' . $repository . '/releases/download/v' . $version . '/' . $expectedFileName
            : null;

        if (
            !is_string($version)
            || preg_match('/^[0-9]+(?:\.[0-9]+){1,3}(?:[-+][0-9A-Za-z.-]+)?$/', $version) !== 1
            || !is_string($repository)
            || preg_match('/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/', $repository) !== 1
            || preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $name) !== 1
            || preg_match('/^pfSense-pkg-[A-Za-z0-9][A-Za-z0-9._-]*$/', self::PACKAGE_NAME) !== 1
            || !is_string($url)
            || $url !== $expectedUrl
            || self::isAllowedAssetUrl($url) === false
            || !is_string($sha256)
            || preg_match('/^[a-fA-F0-9]{64}$/', $sha256) !== 1
            || !is_string($fileName)
            || $fileName !== $expectedFileName
        ) {
            return null;
        }

        $pidFile = '/var/run/' . $name . '-restore-heal.pid';
        $commandArguments = [
            self::PACKAGE_NAME,
            $repository,
            strtolower($sha256),
            $version,
            $name,
        ];
        $escapedCommandArguments = array_map(
            static fn (string $commandArgument): string => escapeshellarg($commandArgument),
            $commandArguments,
        );
        $command = self::RESTORE_HEAL_COMMAND_MARKER
            . ' '
            . self::DAEMON_COMMAND
            . ' -f -p '
            . $pidFile
            . ' '
            . self::SHELL_COMMAND
            . ' -c '
            . escapeshellarg(self::RESTORE_HEAL_SCRIPT)
            . ' rh '
            . implode(' ', $escapedCommandArguments);

        $cronCommand = str_replace('%', '\\%', $command);

        if (strlen($cronCommand) > self::RESTORE_HEAL_COMMAND_LIMIT) {
            self::logRestoreHealFailure(new RuntimeException(self::translate(
                'The restore-heal cron command exceeds the %1$d-byte limit.',
                [self::RESTORE_HEAL_COMMAND_LIMIT],
            )));

            return null;
        }

        return $cronCommand;
    }

    /**
     * Copies one verified package into the persistent restore-heal cache.
     *
     * Self-update calls this only after package verification and installation.
     * The private replacement keeps the last verified release available offline.
     *
     * @param string $packagePath - Verified downloaded package path.
     * @param string $version     - Verified package version.
     * @param string $directory   - Persistent restore-heal cache directory.
     *
     * @return void
     *
     * @throws RuntimeException When the verified package cannot be cached privately.
     *
     * @since UNRELEASED
     */
    public static function cacheRestoreHealPackage(
        string $packagePath,
        string $version,
        string $directory = PackagePaths::RESTORE_HEAL_DIRECTORY,
    ): void {
        $fileName = self::restoreHealFileName($version);

        if (
            $fileName === null
            || is_file($packagePath) === false
            || is_readable($packagePath) === false
            || self::isSafeRestoreHealDirectory($directory) === false
        ) {
            throw new RuntimeException(self::translate('The verified package could not be saved for configuration-restore recovery.'));
        }

        if (
            is_dir($directory) === false
            && @mkdir($directory, 0700, true) === false
            && is_dir($directory) === false
        ) {
            throw new RuntimeException(self::translate('The verified package could not be saved for configuration-restore recovery.'));
        }

        if (@chmod($directory, 0700) === false) {
            throw new RuntimeException(self::translate('The verified package could not be saved for configuration-restore recovery.'));
        }

        $cachedPackagePath = $directory . '/' . $fileName;
        $temporaryPackagePath = $cachedPackagePath . '.tmp';

        @unlink($temporaryPackagePath);

        if (
            @copy($packagePath, $temporaryPackagePath) === false
            || @chmod($temporaryPackagePath, 0600) === false
            || @rename($temporaryPackagePath, $cachedPackagePath) === false
        ) {
            @unlink($temporaryPackagePath);

            throw new RuntimeException(self::translate('The verified package could not be saved for configuration-restore recovery.'));
        }

        self::pruneRestoreHealCache($version, $directory);
    }

    /**
     * Removes cached files that do not belong to one verified release pin.
     *
     * Synchronization calls this only after the matching cron command is written.
     * The current package remains available while stale packages and temp files go.
     *
     * @param string $version   - Current verified package version.
     * @param string $directory - Persistent restore-heal cache directory.
     *
     * @return void
     *
     * @throws RuntimeException When stale cache files cannot be inspected or removed.
     *
     * @since UNRELEASED
     */
    public static function pruneRestoreHealCache(
        string $version,
        string $directory = PackagePaths::RESTORE_HEAL_DIRECTORY,
    ): void {
        $fileName = self::restoreHealFileName($version);

        if ($fileName === null || self::isSafeRestoreHealDirectory($directory) === false) {
            throw new RuntimeException(self::translate('The restore-heal package cache could not be pruned.'));
        }

        if (is_dir($directory) === false) {
            return;
        }

        $entries = @scandir($directory);

        if (!is_array($entries)) {
            throw new RuntimeException(self::translate('The restore-heal package cache could not be pruned.'));
        }

        foreach ($entries as $entry) {
            if ($entry === '.' || $entry === '..' || $entry === $fileName) {
                continue;
            }

            $entryPath = $directory . '/' . $entry;

            if (
                (is_file($entryPath) || is_link($entryPath))
                && @unlink($entryPath) === false
            ) {
                throw new RuntimeException(self::translate('The restore-heal package cache could not be pruned.'));
            }
        }
    }

    /**
     * Removes the complete persistent restore-heal cache directory.
     *
     * Deliberate uninstall calls this regardless of settings retention. Restore-
     * driven removal skips it so the verified package remains available.
     *
     * @param string $directory - Persistent restore-heal cache directory.
     *
     * @return void
     *
     * @throws RuntimeException When the cache directory cannot be removed.
     *
     * @since UNRELEASED
     */
    public static function removeRestoreHealCache(
        string $directory = PackagePaths::RESTORE_HEAL_DIRECTORY,
    ): void {
        if (self::isSafeRestoreHealDirectory($directory) === false) {
            throw new RuntimeException(self::translate('The restore-heal package cache could not be removed.'));
        }

        if (file_exists($directory) === false && is_link($directory) === false) {
            return;
        }

        self::removeRestoreHealDirectory($directory);
    }

    /**
     * Removes the legacy unversioned restore-heal cache file during synchronization.
     *
     * The shared job reads only versioned package filenames, so the former
     * "package.pkg" name can be discarded without affecting a retained pin.
     *
     * @param string $directory - Persistent restore-heal cache directory.
     *
     * @return void
     *
     * @throws RuntimeException When the legacy file cannot be removed.
     *
     * @since UNRELEASED
     */
    public static function removeLegacyRestoreHealCacheFile(
        string $directory = PackagePaths::RESTORE_HEAL_DIRECTORY,
    ): void {
        if (self::isSafeRestoreHealDirectory($directory) === false) {
            throw new RuntimeException(self::translate('The legacy restore-heal package cache could not be removed.'));
        }

        $legacyPackagePath = $directory . '/package.pkg';

        if (
            (file_exists($legacyPackagePath) || is_link($legacyPackagePath))
            && @unlink($legacyPackagePath) === false
        ) {
            throw new RuntimeException(self::translate('The legacy restore-heal package cache could not be removed.'));
        }
    }

    /**
     * Replaces every package-owned restore cron entry with at most one current item.
     *
     * Prefix matching removes stale pinned commands without touching another
     * package's cron work. Restore-driven removal returns the original list unchanged.
     *
     * @param array       $items        - Current pfSense cron items.
     * @param string|null $command      - Current verified command, or null to remove.
     * @param bool        $keepExisting - Whether a configuration restore owns it.
     *
     * @return array
     *
     * @throws RuntimeException When a non-package command is supplied.
     *
     * @since UNRELEASED
     */
    public static function restoreHealCronItems(
        array $items,
        ?string $command,
        bool $keepExisting = false,
    ): array {
        if ($keepExisting === true) {
            return $items;
        }

        if (
            is_string($command)
            && str_starts_with($command, self::RESTORE_HEAL_COMMAND_MARKER) === false
        ) {
            throw new RuntimeException(self::translate('The restore-heal cron command is invalid.'));
        }

        $updatedItems = [];

        foreach ($items as $item) {
            $itemCommand = is_array($item) ? ($item['command'] ?? null) : null;

            if (
                is_string($itemCommand)
                && str_starts_with($itemCommand, self::RESTORE_HEAL_COMMAND_MARKER) === true
            ) {
                continue;
            }

            $updatedItems[] = $item;
        }

        if (is_string($command)) {
            $updatedItems[] = [
                'minute' => '*/15',
                'hour' => '*',
                'mday' => '*',
                'month' => '*',
                'wday' => '*',
                'who' => 'root',
                'command' => $command,
            ];
        }

        return $updatedItems;
    }

    /**
     * Reports whether deinstall must preserve the restore-heal cron entry.
     *
     * Only restore-driven removal retains the recovery state. Keep Settings affects
     * package configuration without turning a deliberate uninstall into a reinstall.
     *
     * @param bool $restoreInProgress - Whether pfSense is reconciling a restore.
     * @param bool $keepSettings      - Whether the framework retains package settings.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function shouldKeepRestoreHealEntry(
        bool $restoreInProgress,
        bool $keepSettings,
    ): bool {
        return $restoreInProgress === true;
    }

    /**
     * Parses and validates GitHub's latest-release response.
     *
     * The normalized result contains only fields needed by checks and installation;
     * malformed external data fails closed before it reaches persistent state.
     *
     * @param string $json - Release JSON.
     *
     * @return array
     *
     * @throws RuntimeException When required release fields are missing or invalid.
     *
     * @since UNRELEASED
     */
    public static function parseReleaseJson(string $json): array
    {
        try {
            $releaseData = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $jsonException) {
            throw new RuntimeException(self::translate('GitHub returned release metadata that is missing required fields or is not valid JSON.'), 0, $jsonException);
        }

        if (!is_array($releaseData)) {
            throw new RuntimeException(self::translate('GitHub returned release metadata that is missing required fields or is not valid JSON.'));
        }

        $tag = $releaseData['tag_name'] ?? null;
        $releaseUrl = $releaseData['html_url'] ?? null;
        $publishedAt = $releaseData['published_at'] ?? null;
        $releaseAssets = $releaseData['assets'] ?? null;

        if (
            !is_string($tag)
            || $tag === ''
            || !is_string($releaseUrl)
            || self::isAllowedReleaseUrl($releaseUrl) === false
            || !is_string($publishedAt)
            || $publishedAt === ''
            || !is_array($releaseAssets)
        ) {
            throw new RuntimeException(self::translate('GitHub returned release metadata that is missing required fields or is not valid JSON.'));
        }

        $version = self::normalizeVersion($tag);

        if (preg_match('/^[0-9]+(?:\.[0-9]+){1,3}(?:[-+][0-9A-Za-z.-]+)?$/', $version) !== 1) {
            throw new RuntimeException(self::translate('The latest GitHub release tag is not a supported package version.'));
        }

        $assets = [];

        foreach ($releaseAssets as $releaseAsset) {
            if (!is_array($releaseAsset)) {
                continue;
            }

            $releaseAssetName = $releaseAsset['name'] ?? null;
            $releaseAssetUrl = $releaseAsset['browser_download_url'] ?? null;
            $releaseAssetDigest = $releaseAsset['digest'] ?? null;

            if (!is_string($releaseAssetName) || !is_string($releaseAssetUrl)) {
                continue;
            }

            $assets[] = [
                'name' => $releaseAssetName,
                'url' => $releaseAssetUrl,
                'digest' => is_string($releaseAssetDigest) ? $releaseAssetDigest : null,
            ];
        }

        return [
            'tag' => $tag,
            'version' => $version,
            'release_url' => $releaseUrl,
            'published_at' => $publishedAt,
            'assets' => $assets,
        ];
    }

    /**
     * Writes a queued state before the WebGUI starts the detached process.
     *
     * This closes the small launch race so the About tab begins polling immediately,
     * even before the background CLI has loaded its runtime classes.
     *
     * @param string|null $version - Version expected from the last check.
     * @param string      $path    - Status file path.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function queueSelfUpdate(
        ?string $version,
        string $path = PackagePaths::UPDATE_STATUS_FILE,
    ): void {
        $timestamp = gmdate(DATE_ATOM);

        self::writeJsonAtomically($path, [
            'state' => 'running',
            'message' => self::translate('The update is starting.'),
            'version' => $version,
            'started_at' => $timestamp,
            'updated_at' => $timestamp,
            'finished_at' => null,
        ]);
    }

    /**
     * Marks a queued install as waiting for the package task lock.
     *
     * The detached CLI writes this state before its bounded wait so the About
     * tab explains why an otherwise healthy update has not started downloading.
     *
     * @param string $path - Status file path.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function markQueuedSelfUpdateWaitingForTask(
        string $path = PackagePaths::UPDATE_STATUS_FILE,
    ): void {
        $timestamp = gmdate(DATE_ATOM);
        $queuedState = null;

        try {
            $queuedState = self::readStatusState($path);
        } catch (Throwable) {
            // A fresh waiting state safely replaces malformed queued state.
        }

        self::writeJsonAtomically($path, [
            'state' => 'running',
            'message' => self::translate('Waiting for the package\'s running task to finish.'),
            'version' => is_array($queuedState) ? ($queuedState['version'] ?? null) : null,
            'started_at' => is_array($queuedState)
                ? ($queuedState['started_at'] ?? $timestamp)
                : $timestamp,
            'updated_at' => $timestamp,
            'finished_at' => null,
        ]);
    }

    /**
     * Replaces a queued state when the detached CLI cannot begin the update.
     *
     * Environment and lock failures happen before selfUpdate() can write its normal
     * progress states, so the WebGUI needs this terminal state to stop polling.
     *
     * @param string $message - Localized full-sentence failure.
     * @param string $path    - Status file path.
     *
     * @return void
     *
     * @since UNRELEASED
     */
    public static function failQueuedSelfUpdate(
        string $message,
        string $path = PackagePaths::UPDATE_STATUS_FILE,
    ): void {
        $timestamp = gmdate(DATE_ATOM);
        $queuedState = null;

        try {
            $queuedState = self::readStatusState($path);
        } catch (Throwable) {
            // A fresh failure state safely replaces malformed queued state.
        }

        self::writeJsonAtomically($path, [
            'state' => 'failed',
            'message' => $message,
            'version' => is_array($queuedState) ? ($queuedState['version'] ?? null) : null,
            'started_at' => is_array($queuedState)
                ? ($queuedState['started_at'] ?? $timestamp)
                : $timestamp,
            'updated_at' => $timestamp,
            'finished_at' => $timestamp,
        ]);
    }

    /**
     * Reads background update status for the About tab and polling request.
     *
     * A running install whose version pfSense now reports as installed is
     * settled as succeeded, because pkg add -f can replace the package before
     * the detached update writes its own final state.
     *
     * @param string      $path             - Status file path.
     * @param string|null $installedVersion - Installed version, or null to read it from pfSense.
     *
     * @return array|null
     *
     * @throws RuntimeException When the status file is malformed.
     *
     * @since UNRELEASED
     */
    public static function readStatusState(
        string $path = PackagePaths::UPDATE_STATUS_FILE,
        ?string $installedVersion = null,
    ): ?array {
        if (is_readable($path) === false) {
            return null;
        }

        $status = self::readJsonObject($path, self::translate('The saved self-update status is unreadable.'));

        return self::settleInstalledSelfUpdate($status, $path, $installedVersion);
    }

    /**
     * Reads normalized release-check state for CLI and WebGUI callers.
     *
     * @param string $path - Updates file path.
     *
     * @return array
     *
     * @throws RuntimeException When the updates file is malformed.
     *
     * @since UNRELEASED
     */
    public static function readUpdatesState(string $path = PackagePaths::UPDATES_FILE): array
    {
        $state = [
            'checked_at' => null,
            'latest_version' => null,
            'tag' => null,
            'release_url' => null,
            'published_at' => null,
            'notified_version' => null,
            'last_error' => null,
        ];

        if (is_readable($path) === false) {
            return $state;
        }

        $storedState = self::readJsonObject($path, self::translate('The saved update-check state is unreadable.'));

        foreach (array_keys($state) as $key) {
            $storedValue = $storedState[$key] ?? null;
            $state[$key] = is_string($storedValue) && $storedValue !== '' ? $storedValue : null;
        }

        return $state;
    }

    /**
     * Reads the installed OpenSSH Ed25519 release signing keys.
     *
     * A missing or comment-only file keeps unsigned updates compatible. Any
     * malformed content in an existing file fails closed before an asset download.
     *
     * @param string $path - Release signing key file path.
     *
     * @return list<string>
     *
     * @throws RuntimeException When an existing key file is unreadable or malformed.
     *
     * @since UNRELEASED
     */
    public static function readSigningKeys(string $path): array
    {
        if (file_exists($path) === false) {
            return [];
        }

        if (is_readable($path) === false) {
            throw new RuntimeException(self::translate('The installed release signing key file is unreadable or malformed, so the update was not installed.'));
        }

        $contents = @file_get_contents($path);

        if (!is_string($contents)) {
            throw new RuntimeException(self::translate('The installed release signing key file is unreadable or malformed, so the update was not installed.'));
        }

        $keys = [];

        foreach (explode("\n", $contents) as $line) {
            $line = trim(str_replace("\r", '', $line));

            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            if (
                preg_match(
                    '/^ssh-ed25519\s+(AAAAC3NzaC1lZDI1NTE5AAAAI[A-Za-z0-9+\/]{43})(?:\s.*)?$/',
                    $line,
                    $matches,
                ) !== 1
            ) {
                throw new RuntimeException(self::translate('The installed release signing key file is unreadable or malformed, so the update was not installed.'));
            }

            $key = $matches[1];
            $decodedKey = base64_decode($key, true);

            if (!is_string($decodedKey) || strlen($decodedKey) !== 51) {
                throw new RuntimeException(self::translate('The installed release signing key file is unreadable or malformed, so the update was not installed.'));
            }

            $keys[] = $key;
        }

        return $keys;
    }

    /**
     * Builds the OpenSSH allowed-signers file for trusted release keys.
     *
     * Every key is restricted to the package identity and signature namespace so
     * signatures created for another product or purpose cannot authorize an update.
     *
     * @param list<string> $keys - Base64 Ed25519 public key data.
     *
     * @return string
     *
     * @since UNRELEASED
     */
    public static function allowedSignersContent(array $keys): string
    {
        $content = '';

        foreach ($keys as $key) {
            $content .= self::PACKAGE_NAME
                . ' namespaces="'
                . self::PACKAGE_NAME
                . '" ssh-ed25519 '
                . $key
                . "\n";
        }

        return $content;
    }

    /**
     * Selects the versioned package, signature, and trusted SHA-256 source.
     *
     * GitHub's API digest is preferred. A same-release checksum asset is required as
     * the fallback, and every selected URL must remain under the configured prefix.
     *
     * @param array  $release        - Parsed release.
     * @param string $downloadPrefix - Allowed asset URL prefix.
     *
     * @return array{package: array, digest: string|null, checksum: array|null, signature: array|null}
     *
     * @throws RuntimeException When required assets or their URLs are invalid.
     *
     * @since UNRELEASED
     */
    public static function selectUpdateAssets(
        array $release,
        string $downloadPrefix = self::DOWNLOAD_PREFIX,
    ): array {
        $version = (string) ($release['version'] ?? '');
        $packageAssetName = self::PACKAGE_NAME . '-' . $version . '.pkg';
        $checksumAssetName = $packageAssetName . '.sha256';
        $signatureAssetName = $packageAssetName . '.sig';
        $packageAsset = null;
        $checksumAsset = null;
        $signatureAsset = null;

        foreach ((is_array($release['assets'] ?? null) ? $release['assets'] : []) as $asset) {
            if (!is_array($asset)) {
                continue;
            }

            $assetName = $asset['name'] ?? null;

            if ($assetName === $packageAssetName) {
                $packageAsset = $asset;
            } elseif ($assetName === $checksumAssetName) {
                $checksumAsset = $asset;
            } elseif ($assetName === $signatureAssetName) {
                $signatureAsset = $asset;
            }
        }

        if (!is_array($packageAsset)) {
            throw new RuntimeException(self::translate('The release does not contain the required package asset %1$s.', [$packageAssetName]));
        }

        $packageAssetUrl = $packageAsset['url'] ?? null;

        if (
            !is_string($packageAssetUrl)
            || self::isAllowedAssetUrl($packageAssetUrl, $downloadPrefix) === false
        ) {
            throw new RuntimeException(self::translate('The release contains an asset URL outside the trusted repository path.'));
        }

        if (is_array($signatureAsset)) {
            $signatureAssetUrl = $signatureAsset['url'] ?? null;

            if (
                !is_string($signatureAssetUrl)
                || self::isAllowedAssetUrl($signatureAssetUrl, $downloadPrefix) === false
            ) {
                throw new RuntimeException(self::translate('The release contains an asset URL outside the trusted repository path.'));
            }
        }

        $packageDigest = $packageAsset['digest'] ?? null;

        if (is_string($packageDigest) && preg_match('/^sha256:[a-fA-F0-9]{64}$/', $packageDigest) === 1) {
            return [
                'package' => $packageAsset,
                'digest' => $packageDigest,
                'checksum' => null,
                'signature' => $signatureAsset,
            ];
        }

        if (!is_array($checksumAsset)) {
            throw new RuntimeException(self::translate('The release provides neither a GitHub SHA-256 digest nor the required checksum asset %1$s. The installed version was kept.', [$checksumAssetName]));
        }

        $checksumAssetUrl = $checksumAsset['url'] ?? null;

        if (
            !is_string($checksumAssetUrl)
            || self::isAllowedAssetUrl($checksumAssetUrl, $downloadPrefix) === false
        ) {
            throw new RuntimeException(self::translate('The release contains an asset URL outside the trusted repository path.'));
        }

        return [
            'package' => $packageAsset,
            'digest' => null,
            'checksum' => $checksumAsset,
            'signature' => $signatureAsset,
        ];
    }

    /**
     * Verifies one downloaded package against its detached OpenSSH signature.
     *
     * Tests inject a private stub executable, while production always uses the
     * fixed system ssh-keygen path and package identity for both signer and namespace.
     *
     * @param string       $packagePath   - Downloaded package path.
     * @param string       $signaturePath - Downloaded detached signature path.
     * @param list<string> $keys          - Trusted base64 Ed25519 key data.
     * @param string       $directory     - Private directory for allowed signers.
     *
     * @return void
     *
     * @throws RuntimeException When the tool is unavailable or verification fails.
     *
     * @since UNRELEASED
     */
    public function verifyReleaseSignature(
        string $packagePath,
        string $signaturePath,
        array $keys,
        string $directory,
    ): void {
        if (
            is_file($this->sshKeygenCommand) === false
            || is_executable($this->sshKeygenCommand) === false
        ) {
            throw new RuntimeException(self::translate('The required ssh-keygen signature verification tool is unavailable, so the update was not installed.'));
        }

        $allowedSignersPath = $directory . '/allowed_signers';
        $allowedSignersContent = self::allowedSignersContent($keys);
        $allowedSignersBytes = @file_put_contents(
            $allowedSignersPath,
            $allowedSignersContent,
            LOCK_EX,
        );

        if (
            $allowedSignersBytes !== strlen($allowedSignersContent)
            || @chmod($allowedSignersPath, 0600) === false
        ) {
            throw new RuntimeException(self::translate('A required package command could not be started.'));
        }

        $verificationResult = $this->runCommand([
            $this->sshKeygenCommand,
            '-Y',
            'verify',
            '-f',
            $allowedSignersPath,
            '-I',
            self::PACKAGE_NAME,
            '-n',
            self::PACKAGE_NAME,
            '-s',
            $signaturePath,
        ], $packagePath);

        if ($verificationResult['exit_code'] !== 0) {
            throw new RuntimeException(self::translate('The release signature does not match this package\'s signing key, so the update was not installed.'));
        }
    }

    /**
     * Installs the latest release after checksum, signature, and metadata checks pass.
     *
     * The caller owns the package FileLock. This method records progress, invokes
     * "pkg add -f" only after verification, and cleans its private directory.
     *
     * @param bool $remoteNotifications - Whether later notices may reach remote channels.
     *
     * @return array
     *
     * @throws Throwable When any download, verification, metadata, or install step fails.
     *
     * @since UNRELEASED
     */
    public function selfUpdate(bool $remoteNotifications): array
    {
        $temporaryDirectory = null;
        $startedAt = gmdate(DATE_ATOM);

        $this->writeStatus(
            'running',
            self::translate('Checking the latest release.'),
            null,
            $startedAt,
            null,
        );

        try {
            $signingKeys = self::readSigningKeys($this->signingKeysFile);
            $release = $this->fetchLatestRelease();
            $version = $release['version'];

            if (self::isNewerVersion($this->installedVersion, $version) === false) {
                $state = $this->saveReleaseState($release, $version, $remoteNotifications);

                $this->writeStatus(
                    'succeeded',
                    self::translate('Version %1$s is already installed.', [$version]),
                    $version,
                    $startedAt,
                    gmdate(DATE_ATOM),
                );

                return $state;
            }

            $assets = self::selectUpdateAssets($release, $this->downloadPrefix);

            if (count($signingKeys) > 0 && !is_array($assets['signature'])) {
                $signatureAssetName = $assets['package']['name'] . '.sig';

                throw new RuntimeException(self::translate(
                    'Release asset %1$s is missing, so the update was not installed.',
                    [$signatureAssetName],
                ));
            }

            $temporaryDirectory = $this->createTemporaryDirectory();
            $packagePath = $temporaryDirectory . '/' . $assets['package']['name'];

            $this->writeStatus(
                'running',
                self::translate('Downloading version %1$s and its checksum data.', [$version]),
                $version,
                $startedAt,
                null,
            );

            $this->downloadFile(
                $assets['package']['url'],
                $packagePath,
                self::PACKAGE_DOWNLOAD_LIMIT,
            );

            $expectedDigest = $assets['digest'];

            if (is_array($assets['checksum'])) {
                $checksumPath = $temporaryDirectory . '/' . $assets['checksum']['name'];

                $this->downloadFile(
                    $assets['checksum']['url'],
                    $checksumPath,
                    self::AUXILIARY_DOWNLOAD_LIMIT,
                );

                $checksumContents = @file_get_contents($checksumPath);
                $expectedDigest = is_string($checksumContents)
                    ? self::checksumDigest($checksumContents)
                    : null;
            }

            $this->writeStatus(
                'running',
                self::translate('Verifying the SHA-256 checksum and package metadata for version %1$s.', [$version]),
                $version,
                $startedAt,
                null,
            );

            if (
                !is_string($expectedDigest)
                || self::verifyDigest($packagePath, $expectedDigest) === false
            ) {
                throw new RuntimeException(self::translate('The downloaded package does not match the SHA-256 digest published by GitHub.'));
            }

            if (count($signingKeys) > 0 && is_array($assets['signature'])) {
                $signaturePath = $temporaryDirectory . '/' . $assets['signature']['name'];

                $this->downloadFile(
                    $assets['signature']['url'],
                    $signaturePath,
                    self::AUXILIARY_DOWNLOAD_LIMIT,
                );

                $this->verifyReleaseSignature(
                    $packagePath,
                    $signaturePath,
                    $signingKeys,
                    $temporaryDirectory,
                );
            }

            $this->verifyPackageMetadata($packagePath, $version);

            $this->writeStatus(
                'running',
                self::translate('Installing version %1$s with pkg add -f.', [$version]),
                $version,
                $startedAt,
                null,
            );

            $installResult = $this->runCommand([
                self::PKG_COMMAND,
                'add',
                '-f',
                $packagePath,
            ]);

            if ($installResult['exit_code'] !== 0) {
                throw new RuntimeException(self::translate('pkg add -f failed with exit code %1$d. The installed version was not changed successfully.', [$installResult['exit_code']]));
            }

            try {
                self::cacheRestoreHealPackage(
                    $packagePath,
                    $version,
                    $this->restoreHealDirectory,
                );
            } catch (Throwable $cacheThrowable) {
                self::logRestoreHealFailure($cacheThrowable);
            }

            $state = $this->saveReleaseState($release, $version, $remoteNotifications);

            $this->writeStatus(
                'succeeded',
                self::translate('Version %1$s was installed successfully.', [$version]),
                $version,
                $startedAt,
                gmdate(DATE_ATOM),
            );

            return $state;
        } catch (Throwable $throwable) {
            $this->writeStatus(
                'failed',
                $throwable->getMessage(),
                isset($version) && is_string($version) ? $version : null,
                $startedAt,
                gmdate(DATE_ATOM),
            );
            $this->logFailure($throwable);

            throw $throwable;
        } finally {
            if (is_string($temporaryDirectory)) {
                $this->removeTemporaryDirectory($temporaryDirectory);
            }
        }
    }

    /**
     * Returns a complete stable randomized cron schedule.
     *
     * Existing valid values win without invoking the random source. Tests inject a
     * deterministic callback; production uses cryptographically secure random_int().
     *
     * @param array         $storedSchedule - Previously stored schedule.
     * @param callable|null $randomInteger  - Optional integer generator.
     *
     * @return array{minute: int, hour: int, weekday: int, monthday: int}
     *
     * @since UNRELEASED
     */
    public static function stableCronSchedule(array $storedSchedule, ?callable $randomInteger = null): array
    {
        $ranges = [
            'minute' => [0, 59],
            'hour' => [0, 23],
            'weekday' => [0, 6],
            'monthday' => [1, 28],
        ];
        $schedule = [];
        $randomInteger ??= static fn (int $minimum, int $maximum): int => random_int($minimum, $maximum);

        foreach ($ranges as $key => $range) {
            $storedValue = $storedSchedule[$key] ?? null;
            $minimum = $range[0];
            $maximum = $range[1];

            if (
                (is_int($storedValue) || (is_string($storedValue) && ctype_digit($storedValue)))
                && (int) $storedValue >= $minimum
                && (int) $storedValue <= $maximum
            ) {
                $schedule[$key] = (int) $storedValue;
                continue;
            }

            $schedule[$key] = $randomInteger($minimum, $maximum);
        }

        return $schedule;
    }

    /**
     * Creates or closes the single update notice and records de-duplication state.
     *
     * A release can create only one bell notice. Manual checks record the release
     * as seen without filing one, while scheduled checks follow the remote setting.
     *
     * @param array  $state               - Update state.
     * @param string $installedVersion    - Installed version.
     * @param string $latestVersion       - Latest version.
     * @param bool   $remoteNotifications - Whether remote delivery is enabled.
     * @param bool   $fileNotice           - Whether a notice may be filed.
     *
     * @return array
     *
     * @since UNRELEASED
     */
    public static function synchronizeNotice(
        array $state,
        string $installedVersion,
        string $latestVersion,
        bool $remoteNotifications,
        bool $fileNotice,
    ): array {
        if (self::isNewerVersion($installedVersion, $latestVersion) === false) {
            if (function_exists('close_notice')) {
                \close_notice(self::NOTICE_ID);
            }

            return $state;
        }

        if (($state['notified_version'] ?? null) === $latestVersion) {
            return $state;
        }

        if ($fileNotice === false) {
            $state['notified_version'] = $latestVersion;

            return $state;
        }

        $message = self::translate('%1$s %2$s is available.', [
            self::translate('[__WORKSPACE_TITLE__]'),
            $latestVersion,
        ]);

        \file_notice(
            self::NOTICE_ID,
            $message,
            self::translate('[__WORKSPACE_TITLE__]'),
            self::ABOUT_PAGE,
            1,
            $remoteNotifications === false,
        );

        $state['notified_version'] = $latestVersion;

        return $state;
    }

    /**
     * Converts one checksum-file value into GitHub's digest format.
     *
     * Release checksum assets contain only the hexadecimal hash. Whitespace around
     * that value is accepted, while filenames and other formats fail closed.
     *
     * @param string $checksum - Downloaded checksum-file contents.
     *
     * @return string|null
     *
     * @since UNRELEASED
     */
    public static function checksumDigest(string $checksum): ?string
    {
        $normalizedChecksum = trim($checksum);

        if (preg_match('/^[a-fA-F0-9]{64}$/', $normalizedChecksum) !== 1) {
            return null;
        }

        return 'sha256:' . strtolower($normalizedChecksum);
    }

    /**
     * Checks a package file against an expected SHA-256 digest.
     *
     * @param string $packagePath - Downloaded package path.
     * @param string $digest      - Expected digest with sha256 prefix.
     *
     * @return bool
     *
     * @since UNRELEASED
     */
    public static function verifyDigest(string $packagePath, string $digest): bool
    {
        if (preg_match('/^sha256:([a-fA-F0-9]{64})$/', $digest, $matches) !== 1) {
            return false;
        }

        $actualDigest = hash_file('sha256', $packagePath);

        return is_string($actualDigest) && hash_equals(strtolower($matches[1]), strtolower($actualDigest));
    }

    /**
     * Removes a completed background status before a standalone check.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private function clearStatus(): void
    {
        if (file_exists($this->statusFile)) {
            @unlink($this->statusFile);
        }
    }

    /**
     * Creates a private temporary directory for release assets.
     *
     * @return string
     *
     * @throws RuntimeException When a private directory cannot be created.
     *
     * @since UNRELEASED
     * @private
     */
    private function createTemporaryDirectory(): string
    {
        try {
            $suffix = bin2hex(random_bytes(16));
        } catch (Throwable $throwable) {
            throw new RuntimeException(self::translate('A private temporary directory for the update could not be created.'), 0, $throwable);
        }

        $temporaryDirectory = sys_get_temp_dir() . '/[__WORKSPACE_NAME__]-' . $suffix;

        if (mkdir($temporaryDirectory, 0700) === false) {
            throw new RuntimeException(self::translate('A private temporary directory for the update could not be created.'));
        }

        return $temporaryDirectory;
    }

    /**
     * Downloads one release asset with pfSense proxy and TLS settings.
     *
     * @param string $url                  - Validated asset URL.
     * @param string $path                 - Private destination path.
     * @param int    $byteLimit            - Maximum accepted download size.
     * @param bool   $notFoundIsDefinitive - Whether HTTP 404 proves absence.
     *
     * @return void
     *
     * @throws RestoreHealUnavailableException When a definitive checksum lookup returns HTTP 404.
     * @throws RuntimeException When transport or HTTP validation fails.
     *
     * @since UNRELEASED
     * @private
     */
    private function downloadFile(
        string $url,
        string $path,
        int $byteLimit,
        bool $notFoundIsDefinitive = false,
    ): void {
        $fileHandle = fopen($path, 'wb');

        if ($fileHandle === false || chmod($path, 0600) === false) {
            if (is_resource($fileHandle)) {
                fclose($fileHandle);
            }

            throw new RuntimeException(self::translate('The release asset could not be downloaded to a private temporary file.'));
        }

        $curlHandle = curl_init($url);

        if ($curlHandle === false) {
            fclose($fileHandle);

            throw new RuntimeException(self::translate('The release asset could not be downloaded to a private temporary file.'));
        }

        $downloadTooLarge = false;
        $progressCallback = static function (
            mixed $unusedHandle,
            float $downloadTotal,
            float $downloadedCount,
            float $uploadTotal,
            float $uploadedCount,
        ) use (&$downloadTooLarge, $byteLimit): int {
            if ($downloadedCount > $byteLimit) {
                $downloadTooLarge = true;

                return 1;
            }

            return 0;
        };

        $this->configureCurl($curlHandle, $url, [
            CURLOPT_FILE => $fileHandle,
            CURLOPT_HTTPHEADER => [
                'Accept: application/octet-stream',
            ],
            CURLOPT_MAXFILESIZE_LARGE => $byteLimit,
            CURLOPT_NOPROGRESS => false,
            CURLOPT_XFERINFOFUNCTION => $progressCallback,
        ]);

        $result = curl_exec($curlHandle);
        $statusCode = (int) curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);
        $curlErrorCode = curl_errno($curlHandle);
        $curlError = curl_error($curlHandle);

        curl_close($curlHandle);
        fclose($fileHandle);

        if ($downloadTooLarge || $curlErrorCode === CURLE_FILESIZE_EXCEEDED) {
            @unlink($path);

            throw new RuntimeException(self::translate('The release asset exceeds the allowed download size, so the update was not installed.'));
        }

        if (
            $result === true
            && $statusCode === 404
            && $notFoundIsDefinitive === true
        ) {
            @unlink($path);

            throw new RestoreHealUnavailableException(self::translate('The installed release checksum asset does not exist.'));
        }

        if ($result !== true || $statusCode < 200 || $statusCode >= 300) {
            @unlink($path);
            $detail = $curlError !== '' ? $curlError : (string) $statusCode;

            throw new RuntimeException(self::translate('The release asset download failed: %1$s', [$detail]));
        }
    }

    /**
     * Fetches and parses the latest GitHub release.
     *
     * @return array
     *
     * @throws RuntimeException When GitHub rejects or rate-limits the request.
     *
     * @since UNRELEASED
     * @private
     */
    private function fetchLatestRelease(): array
    {
        return $this->fetchRelease($this->releasesApi);
    }

    /**
     * Fetches the GitHub release that exactly matches one installed version.
     *
     * @param string $version - Installed package version.
     *
     * @return array
     *
     * @throws RestoreHealUnavailableException When the version or exact release definitively does not exist.
     * @throws RuntimeException When the release lookup fails transiently.
     *
     * @since UNRELEASED
     * @private
     */
    private function fetchReleaseForVersion(string $version): array
    {
        $releaseApi = self::releaseApiForVersion($this->releasesApi, $version);

        if ($releaseApi === null) {
            throw new RestoreHealUnavailableException(self::translate('The installed package version does not have a verifiable GitHub release.'));
        }

        return $this->fetchRelease(
            $releaseApi,
            notFoundIsDefinitive: true,
        );
    }

    /**
     * Fetches and parses one GitHub release API endpoint.
     *
     * @param string $releaseApi           - Exact GitHub release API endpoint.
     * @param bool   $notFoundIsDefinitive - Whether HTTP 404 proves absence.
     *
     * @return array
     *
     * @throws RestoreHealUnavailableException When a definitive release lookup returns HTTP 404.
     * @throws RuntimeException When GitHub rejects or rate-limits the request.
     *
     * @since UNRELEASED
     * @private
     */
    private function fetchRelease(
        string $releaseApi,
        bool $notFoundIsDefinitive = false,
    ): array {
        $responseHeaders = [];
        $curlHandle = curl_init($releaseApi);

        if ($curlHandle === false) {
            throw new RuntimeException(self::translate('The update check could not initialize a secure GitHub request.'));
        }

        $headerCallback = static function (mixed $unusedHandle, string $headerLine) use (&$responseHeaders): int {
            $separatorPosition = strpos($headerLine, ':');

            if ($separatorPosition !== false) {
                $headerName = strtolower(trim(substr($headerLine, 0, $separatorPosition)));
                $headerValue = trim(substr($headerLine, $separatorPosition + 1));
                $responseHeaders[$headerName] = $headerValue;
            }

            return strlen($headerLine);
        };

        $this->configureCurl($curlHandle, $releaseApi, [
            CURLOPT_HEADERFUNCTION => $headerCallback,
            CURLOPT_HTTPHEADER => [
                'Accept: application/vnd.github+json',
                'X-GitHub-Api-Version: 2022-11-28',
            ],
            CURLOPT_RETURNTRANSFER => true,
        ]);

        $response = curl_exec($curlHandle);
        $statusCode = (int) curl_getinfo($curlHandle, CURLINFO_RESPONSE_CODE);
        $curlError = curl_error($curlHandle);

        curl_close($curlHandle);

        if ($response === false) {
            throw new RuntimeException(self::translate('The update check could not connect to GitHub: %1$s', [$curlError]));
        }

        if ($statusCode === 404 && $notFoundIsDefinitive === true) {
            throw new RestoreHealUnavailableException(self::translate('The installed package release does not exist on GitHub.'));
        }

        if ($statusCode === 403 || $statusCode === 429) {
            throw new RuntimeException(self::translate('GitHub rate limited the update check. Try again later.'));
        }

        if ($statusCode < 200 || $statusCode >= 300) {
            throw new RuntimeException(self::translate('GitHub returned HTTP status %1$d for the update check.', [$statusCode]));
        }

        if (!is_string($response)) {
            throw new RuntimeException(self::translate('GitHub returned release metadata that is missing required fields or is not valid JSON.'));
        }

        return self::parseReleaseJson($response);
    }

    /**
     * Applies shared cURL safety, timeout, redirect, and proxy options.
     *
     * @param mixed  $curlHandle - cURL handle.
     * @param string $url        - Initial request URL.
     * @param array  $options    - Operation-specific cURL options.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private function configureCurl(mixed $curlHandle, string $url, array $options): void
    {
        $scheme = parse_url($url, PHP_URL_SCHEME);
        $allowedProtocols = $scheme === 'http'
            ? CURLPROTO_HTTP | CURLPROTO_HTTPS
            : CURLPROTO_HTTPS;
        $sharedOptions = [
            CURLOPT_CONNECTTIMEOUT => 5,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_MAXREDIRS => 3,
            CURLOPT_PROTOCOLS => $allowedProtocols,
            CURLOPT_REDIR_PROTOCOLS => $allowedProtocols,
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_TIMEOUT => 20,
            CURLOPT_USERAGENT => self::USER_AGENT,
        ];

        if (curl_setopt_array($curlHandle, $options + $sharedOptions) === false) {
            throw new RuntimeException(self::translate('The update check could not initialize a secure GitHub request.'));
        }

        \set_curlproxy($curlHandle);
    }

    /**
     * Finds an exact builder-produced command for the installed version.
     *
     * Parsing recovers the pinned values, while rebuilding rejects marker-only
     * lookalikes and commands whose executable script or arguments were changed.
     *
     * @param array  $items            - Current pfSense cron items.
     * @param string $installedVersion - Installed package version.
     *
     * @return string|null
     *
     * @since UNRELEASED
     * @private
     */
    private static function findCurrentRestoreHealCommand(
        array $items,
        string $installedVersion,
    ): ?string {
        $normalizedInstalledVersion = self::normalizeVersion($installedVersion);

        foreach ($items as $item) {
            $command = is_array($item) ? ($item['command'] ?? null) : null;

            if (
                !is_string($command)
                || str_starts_with($command, self::RESTORE_HEAL_COMMAND_MARKER) === false
            ) {
                continue;
            }

            $metadata = self::parseRestoreHealCommand($command);
            $metadataVersion = is_array($metadata) ? ($metadata['version'] ?? null) : null;

            if (
                is_string($metadataVersion)
                && self::normalizeVersion($metadataVersion) === $normalizedInstalledVersion
            ) {
                return $command;
            }
        }

        return null;
    }

    /**
     * Finds this package's live registration in pfSense configuration.
     *
     * @param array $installedPackages - Registered pfSense packages.
     *
     * @return array|null
     *
     * @since UNRELEASED
     * @private
     */
    private static function findInstalledPackage(array $installedPackages): ?array
    {
        foreach ($installedPackages as $installedPackage) {
            if (!is_array($installedPackage)) {
                continue;
            }

            $installedPackageName = $installedPackage['name'] ?? null;
            $installedPackageInternalName = $installedPackage['internal_name'] ?? null;

            if (
                $installedPackageName === self::REGISTERED_NAME
                || $installedPackageInternalName === self::REGISTERED_INTERNAL_NAME
            ) {
                return $installedPackage;
            }
        }

        return null;
    }

    /**
     * Logs one safe update failure through pfSense.
     *
     * @param Throwable $throwable - Failure to log.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private function logFailure(Throwable $throwable): void
    {
        if (function_exists('log_error')) {
            \log_error('[__WORKSPACE_TITLE__]: ' . $throwable->getMessage());
        }
    }

    /**
     * Logs a restore-heal construction failure without interrupting synchronization.
     *
     * Command-length validation runs inside the static builder, so it uses this
     * guarded logger instead of depending on the package lifecycle include.
     *
     * @param Throwable $throwable - Failure to log.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private static function logRestoreHealFailure(Throwable $throwable): void
    {
        try {
            if (function_exists('log_error')) {
                \log_error('[__WORKSPACE_TITLE__] restore heal: ' . $throwable->getMessage());
            }
        } catch (Throwable) {
            // A logging failure must not interrupt package synchronization.
        }
    }

    /**
     * Logs a restore-reassurance failure without interrupting package startup.
     *
     * @param Throwable $throwable - Failure to log.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private static function logRestoreFailure(Throwable $throwable): void
    {
        try {
            if (function_exists('log_error')) {
                \log_error('[__WORKSPACE_TITLE__] restore notice: ' . $throwable->getMessage());
            }
        } catch (Throwable) {
            // A logging failure must not interrupt package startup.
        }
    }

    /**
     * Normalizes a package version or Git tag for version_compare().
     *
     * @param string $version - Package version or tag.
     *
     * @return string
     *
     * @since UNRELEASED
     * @private
     */
    private static function normalizeVersion(string $version): string
    {
        return preg_replace('/^[vV]/', '', trim($version), 1) ?? trim($version);
    }

    /**
     * Returns the exact cache filename for one validated package version.
     *
     * Cache writers and pruners share this validation so no untrusted version can
     * select a path outside the package-owned restore-heal directory.
     *
     * @param string $version - Package version.
     *
     * @return string|null
     *
     * @since UNRELEASED
     * @private
     */
    private static function restoreHealFileName(string $version): ?string
    {
        if (preg_match('/^[0-9]+(?:\.[0-9]+){1,3}(?:[-+][0-9A-Za-z.-]+)?$/', $version) !== 1) {
            return null;
        }

        return self::PACKAGE_NAME . '-' . $version . '.pkg';
    }

    /**
     * Extracts the generated GitHub owner and repository from the trusted prefix.
     *
     * The restore job accepts only the repository already used by update downloads,
     * keeping its constructed release URL inside the existing trust boundary.
     *
     * @return string|null
     *
     * @since UNRELEASED
     * @private
     */
    private static function restoreHealRepository(): ?string
    {
        $pattern = '~\Ahttps://github\.com/([A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)/releases/download/\z~';

        if (preg_match($pattern, self::DOWNLOAD_PREFIX, $matches) !== 1) {
            return null;
        }

        return $matches[1];
    }

    /**
     * Parses pinned metadata from one exact builder-produced cron command.
     *
     * The final fixed arguments expose the repository, SHA-256, and version.
     * Rebuilding verifies the script, pidfile, package identity, and every argument.
     *
     * @param string $command - Tagged restore-heal cron command.
     *
     * @return array{version: string, url: string, sha256: string, file_name: string}|null
     *
     * @since UNRELEASED
     * @private
     */
    private static function parseRestoreHealCommand(string $command): ?array
    {
        $packageNamePattern = preg_quote(self::PACKAGE_NAME, '~');
        $namePattern = preg_quote('[__WORKSPACE_NAME__]', '~');
        $pattern = "~ rh '$packageNamePattern' '([^']+)' '([a-f0-9]{64})' '([^']+)' '$namePattern'\\z~";

        if (preg_match($pattern, $command, $matches) !== 1) {
            return null;
        }

        $repository = $matches[1];
        $version = $matches[3];
        $fileName = self::PACKAGE_NAME . '-' . $version . '.pkg';
        $metadata = [
            'version' => $version,
            'url' => 'https://github.com/' . $repository . '/releases/download/v' . $version . '/' . $fileName,
            'sha256' => $matches[2],
            'file_name' => $fileName,
        ];
        $rebuiltCommand = self::buildRestoreHealCommand($metadata);

        return $rebuiltCommand === $command
            ? $metadata
            : null;
    }

    /**
     * Reads one JSON object from a package-owned file.
     *
     * @param string $path         - JSON file path.
     * @param string $errorMessage - Localized malformed-file message.
     *
     * @return array
     *
     * @throws RuntimeException When the file cannot be decoded as an object.
     *
     * @since UNRELEASED
     * @private
     */
    private static function readJsonObject(string $path, string $errorMessage): array
    {
        $contents = @file_get_contents($path);

        if (!is_string($contents)) {
            throw new RuntimeException($errorMessage);
        }

        try {
            $decoded = json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $jsonException) {
            throw new RuntimeException($errorMessage, 0, $jsonException);
        }

        if (!is_array($decoded) || array_is_list($decoded)) {
            throw new RuntimeException($errorMessage);
        }

        return $decoded;
    }

    /**
     * Reports whether a restore-heal directory is a non-root absolute path.
     *
     * Cache cleanup accepts a test directory override, so destructive operations
     * reject empty, relative, and filesystem-root targets before inspecting files.
     *
     * @param string $directory - Restore-heal cache directory.
     *
     * @return bool
     *
     * @since UNRELEASED
     * @private
     */
    private static function isSafeRestoreHealDirectory(string $directory): bool
    {
        return $directory !== ''
            && $directory !== '/'
            && str_starts_with($directory, '/');
    }

    /**
     * Recursively removes one validated restore-heal cache path.
     *
     * Symlinks are unlinked without following them. Real directories are walked so
     * a deliberate uninstall removes temporary or unexpected nested cache content.
     *
     * @param string $directory - Validated restore-heal cache path.
     *
     * @return void
     *
     * @throws RuntimeException When any cache entry cannot be removed.
     *
     * @since UNRELEASED
     * @private
     */
    private static function removeRestoreHealDirectory(string $directory): void
    {
        if (is_link($directory) || is_dir($directory) === false) {
            if (@unlink($directory) === false) {
                throw new RuntimeException(self::translate('The restore-heal package cache could not be removed.'));
            }

            return;
        }

        $entries = @scandir($directory);

        if (!is_array($entries)) {
            throw new RuntimeException(self::translate('The restore-heal package cache could not be removed.'));
        }

        foreach ($entries as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }

            $entryPath = $directory . '/' . $entry;

            if (is_dir($entryPath) && is_link($entryPath) === false) {
                self::removeRestoreHealDirectory($entryPath);

                continue;
            }

            if (@unlink($entryPath) === false) {
                throw new RuntimeException(self::translate('The restore-heal package cache could not be removed.'));
            }
        }

        if (@rmdir($directory) === false) {
            throw new RuntimeException(self::translate('The restore-heal package cache could not be removed.'));
        }
    }

    /**
     * Removes files from the private update directory and then the directory.
     *
     * @param string $temporaryDirectory - Exact generated temporary directory.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private function removeTemporaryDirectory(string $temporaryDirectory): void
    {
        $entries = @scandir($temporaryDirectory);

        foreach ((is_array($entries) ? $entries : []) as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }

            $entryPath = $temporaryDirectory . '/' . $entry;

            if (is_file($entryPath) || is_link($entryPath)) {
                @unlink($entryPath);
            }
        }

        @rmdir($temporaryDirectory);
    }

    /**
     * Runs one fixed executable with separated arguments and captured output.
     *
     * @param list<string> $command   - Executable and arguments.
     * @param string|null  $stdinPath - Optional file opened as standard input.
     *
     * @return array{exit_code: int, stdout: string, stderr: string}
     *
     * @throws RuntimeException When the process cannot be started.
     *
     * @since UNRELEASED
     * @private
     */
    private function runCommand(array $command, ?string $stdinPath = null): array
    {
        $descriptorSpecification = [
            0 => is_string($stdinPath) ? ['file', $stdinPath, 'r'] : ['pipe', 'r'],
            1 => ['pipe', 'w'],
            2 => ['pipe', 'w'],
        ];
        $pipes = [];
        $process = proc_open($command, $descriptorSpecification, $pipes);

        if (!is_resource($process)) {
            throw new RuntimeException(self::translate('A required package command could not be started.'));
        }

        if ($stdinPath === null) {
            fclose($pipes[0]);
        }

        $standardOutput = stream_get_contents($pipes[1]);
        $standardError = stream_get_contents($pipes[2]);

        fclose($pipes[1]);
        fclose($pipes[2]);

        $exitCode = proc_close($process);

        return [
            'exit_code' => $exitCode,
            'stdout' => is_string($standardOutput) ? $standardOutput : '',
            'stderr' => is_string($standardError) ? $standardError : '',
        ];
    }

    /**
     * Saves freshly fetched release metadata after a successful install or no-op.
     *
     * @param array  $release             - Parsed release.
     * @param string $effectiveVersion    - Version treated as installed.
     * @param bool   $remoteNotifications - Whether remote notices are enabled.
     *
     * @return array
     *
     * @since UNRELEASED
     * @private
     */
    private function saveReleaseState(
        array $release,
        string $effectiveVersion,
        bool $remoteNotifications,
    ): array {
        $previousState = self::readUpdatesState($this->updatesFile);
        $state = [
            'checked_at' => gmdate(DATE_ATOM),
            'latest_version' => $release['version'],
            'tag' => $release['tag'],
            'release_url' => $release['release_url'],
            'published_at' => $release['published_at'],
            'notified_version' => $previousState['notified_version'],
            'last_error' => null,
        ];
        $state = self::synchronizeNotice(
            $state,
            $effectiveVersion,
            $release['version'],
            $remoteNotifications,
            true,
        );

        self::writeJsonAtomically($this->updatesFile, $state);

        return $state;
    }

    /**
     * Marks a running install as succeeded once pfSense reports its version.
     *
     * @param array       $status           - Saved status.
     * @param string      $path             - Status file path.
     * @param string|null $installedVersion - Installed version, or null to read it from pfSense.
     *
     * @return array
     *
     * @since UNRELEASED
     * @private
     */
    private static function settleInstalledSelfUpdate(array $status, string $path, ?string $installedVersion): array
    {
        $statusVersion = $status['version'] ?? null;

        if (($status['state'] ?? null) !== 'running' || !is_string($statusVersion) || $statusVersion === '') {
            return $status;
        }

        $installedVersion ??= self::installedVersion();

        if (
            !is_string($installedVersion)
            || self::normalizeVersion($installedVersion) !== self::normalizeVersion($statusVersion)
        ) {
            return $status;
        }

        $timestamp = gmdate(DATE_ATOM);
        $settledStatus = [
            'state' => 'succeeded',
            'message' => self::translate('Version %1$s was installed successfully.', [$statusVersion]),
            'version' => $statusVersion,
            'started_at' => $status['started_at'] ?? $timestamp,
            'updated_at' => $timestamp,
            'finished_at' => $timestamp,
        ];

        try {
            self::writeJsonAtomically($path, $settledStatus);
        } catch (Throwable) {
            // The settled state is still returned when the status file can't be rewritten.
        }

        return $settledStatus;
    }

    /**
     * Verifies the downloaded archive's package name and version.
     *
     * @param string $packagePath - Downloaded package path.
     * @param string $version     - Expected release version.
     *
     * @return void
     *
     * @throws RuntimeException When pkg reports unexpected metadata.
     *
     * @since UNRELEASED
     * @private
     */
    private function verifyPackageMetadata(string $packagePath, string $version): void
    {
        $queryResult = $this->runCommand([
            self::PKG_COMMAND,
            'query',
            '-F',
            $packagePath,
            '%n %v',
        ]);
        $expectedMetadata = self::PACKAGE_NAME . ' ' . $version;
        $actualMetadata = trim($queryResult['stdout']);

        if ($queryResult['exit_code'] !== 0 || $actualMetadata !== $expectedMetadata) {
            throw new RuntimeException(self::translate('The downloaded archive does not contain the expected package name and version.'));
        }
    }

    /**
     * Writes one progress snapshot for the polling About tab.
     *
     * @param string      $state      - Running, succeeded, or failed.
     * @param string      $message    - Localized full-sentence status.
     * @param string|null $version    - Release version when known.
     * @param string      $startedAt  - Job start timestamp.
     * @param string|null $finishedAt - Job finish timestamp.
     *
     * @return void
     *
     * @since UNRELEASED
     * @private
     */
    private function writeStatus(
        string $state,
        string $message,
        ?string $version,
        string $startedAt,
        ?string $finishedAt,
    ): void {
        self::writeJsonAtomically($this->statusFile, [
            'state' => $state,
            'message' => $message,
            'version' => $version,
            'started_at' => $startedAt,
            'updated_at' => gmdate(DATE_ATOM),
            'finished_at' => $finishedAt,
        ]);
    }

    /**
     * Replaces one JSON file atomically with private permissions.
     *
     * @param string $path - Destination path.
     * @param array  $data - JSON object.
     *
     * @return void
     *
     * @throws RuntimeException When the directory or file cannot be written.
     *
     * @since UNRELEASED
     * @private
     */
    private static function writeJsonAtomically(string $path, array $data): void
    {
        $directory = dirname($path);

        if (!is_dir($directory) && mkdir($directory, 0700, true) === false) {
            throw new RuntimeException(self::translate('The update state could not be saved atomically.'));
        }

        @chmod($directory, 0700);

        $temporaryPath = tempnam($directory, '.update-');

        if ($temporaryPath === false || chmod($temporaryPath, 0600) === false) {
            throw new RuntimeException(self::translate('The update state could not be saved atomically.'));
        }

        try {
            $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR);
        } catch (JsonException $jsonException) {
            @unlink($temporaryPath);

            throw new RuntimeException(self::translate('The update state could not be saved atomically.'), 0, $jsonException);
        }

        if (file_put_contents($temporaryPath, $encoded . PHP_EOL, LOCK_EX) === false) {
            @unlink($temporaryPath);

            throw new RuntimeException(self::translate('The update state could not be saved atomically.'));
        }

        if (rename($temporaryPath, $path) === false) {
            @unlink($temporaryPath);

            throw new RuntimeException(self::translate('The update state could not be saved atomically.'));
        }

        @chmod($path, 0600);
    }
    /**
     * Translates one operator-visible message through pfSense gettext.
     *
     * @param string              $message   - English source message.
     * @param array<int, scalar> $arguments - Positional sprintf arguments.
     *
     * @return string
     *
     * @since UNRELEASED
     * @private
     */
    private static function translate(string $message, array $arguments = []): string
    {
        $translated = function_exists('gettext') ? \gettext($message) : $message;

        return $arguments === [] ? $translated : vsprintf($translated, $arguments);
    }
}
