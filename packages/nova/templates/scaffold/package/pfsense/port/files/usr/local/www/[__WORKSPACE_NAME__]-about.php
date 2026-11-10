<?php

declare(strict_types=1);

/*
 * [__WORKSPACE_TITLE__] package information.
 * SPDX-License-Identifier: MIT
 */

##|+PRIV
##|*IDENT=page-services-[__WORKSPACE_NAME__]-about
##|*NAME=Services: [__WORKSPACE_TITLE__]: About
##|*DESCR=Allow access to the [__WORKSPACE_TITLE__] package information page.
##|*MATCH=[__WORKSPACE_NAME__]-about.php*
##|-PRIV

use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\PackagePaths;
use PfSense\[__WORKSPACE_IDENTIFIER__]\Runtime\UpdateManager;

require_once('guiconfig.inc');
require_once('pfsense-utils.inc');
require_once('/usr/local/pkg/[__WORKSPACE_NAME__].inc');
require_once('/usr/local/pkg/[__WORKSPACE_NAME__]/PackagePaths.php');
require_once('/usr/local/pkg/[__WORKSPACE_NAME__]/UpdateManager.php');

$escape = static fn (string $value): string => htmlspecialchars(
    $value,
    ENT_QUOTES | ENT_SUBSTITUTE,
    'UTF-8',
);
$packageDataPath = '/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]';
$packageLogoPath = $packageDataPath . '/logo.svg';
$packageName = '[__WORKSPACE_TITLE__]';
$installedPackageVersion = UpdateManager::installedVersion();
$packageVersion = $installedPackageVersion ?? gettext('Unknown');
$updatesAvailable = UpdateManager::isAvailable();

if ($updatesAvailable && ($_GET['update_status'] ?? '') === '1') {
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');

    try {
        $statusResponse = UpdateManager::readStatusState() ?? ['state' => 'idle'];
    } catch (Throwable $throwable) {
        $statusResponse = [
            'state' => 'failed',
            'message' => $throwable->getMessage(),
        ];
    }

    echo json_encode(
        $statusResponse,
        JSON_INVALID_UTF8_SUBSTITUTE | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR,
    );
    exit;
}

$updateActionError = null;

if ($updatesAvailable && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (isset($_POST['check_updates'])) {
        $actionOutputLines = [];

        exec(PackagePaths::UPDATE_CHECK_COMMAND . ' 2>&1', $actionOutputLines, $returnCode);
        $actionOutput = implode(PHP_EOL, $actionOutputLines);

        if ($returnCode !== 0 || trim($actionOutput) === gettext('Another package operation is already running.')) {
            $updateActionError = $actionOutput !== ''
                ? $actionOutput
                : gettext('The update check could not initialize a secure GitHub request.');
        }
    } elseif (isset($_POST['self_update'])) {
        try {
            $queuedState = UpdateManager::readUpdatesState();
            $queuedVersion = $queuedState['latest_version'] ?? null;

            if (!is_string($queuedVersion) || $queuedVersion === '') {
                throw new RuntimeException(gettext('Updates have not been checked yet.'));
            }

            $currentJob = UpdateManager::readStatusState();

            if (is_array($currentJob) && ($currentJob['state'] ?? null) === 'running') {
                throw new RuntimeException((string) ($currentJob['message'] ?? gettext('The update is starting.')));
            }

            UpdateManager::queueSelfUpdate($queuedVersion);

            try {
                mwexec_bg(PackagePaths::SELF_UPDATE_COMMAND);
            } catch (Throwable $throwable) {
                UpdateManager::failQueuedSelfUpdate($throwable->getMessage());

                throw $throwable;
            }
        } catch (Throwable $throwable) {
            $updateActionError = $throwable->getMessage();
        }
    }
}

$updateState = null;
$updateStatus = null;

if ($updatesAvailable) {
    try {
        $updateState = UpdateManager::readUpdatesState();
    } catch (Throwable $throwable) {
        $updateActionError ??= $throwable->getMessage();
    }

    try {
        $updateStatus = UpdateManager::readStatusState();
    } catch (Throwable $throwable) {
        $updateActionError ??= $throwable->getMessage();
    }
}

$updateState ??= [
    'checked_at' => null,
    'latest_version' => null,
    'release_url' => null,
    'last_error' => null,
];
$settings = pfsensePackage[__WORKSPACE_IDENTIFIER__]GetSettings();
$updateCheckFrequency = (string) ($settings['update_check_frequency'] ?? '[__PFSENSE_UPDATE_DEFAULT_FREQUENCY__]');
$latestVersion = $updateState['latest_version'] ?? null;
$checkedAt = $updateState['checked_at'] ?? null;
$checkedAtDisplay = null;

if (is_string($checkedAt) && $checkedAt !== '') {
    $checkedTimestamp = strtotime($checkedAt);
    $checkedAtDisplay = $checkedTimestamp === false
        ? $checkedAt
        : date('Y-m-d H:i:s T', $checkedTimestamp);
}

$releaseUrl = $updateState['release_url'] ?? null;
$releaseUrl = is_string($releaseUrl) && UpdateManager::isAllowedReleaseUrl($releaseUrl)
    ? $releaseUrl
    : null;
$updateAvailable = is_string($installedPackageVersion)
    && is_string($latestVersion)
    && UpdateManager::isNewerVersion($installedPackageVersion, $latestVersion);
$updateError = $updateActionError ?? ($updateState['last_error'] ?? null);
$updateJobState = is_array($updateStatus) ? ($updateStatus['state'] ?? null) : null;
$updateJobMessage = is_array($updateStatus) ? ($updateStatus['message'] ?? null) : null;
$updateJobRunning = $updateJobState === 'running';
$updateBarTone = match (true) {
    $updateJobState === 'failed', is_string($updateError) && $updateError !== '' => 'is-error',
    $updateJobState === 'succeeded', $updateAvailable => 'is-success',
    $updateJobRunning => 'is-running',
    default => 'is-muted',
};

$packageLogoData = null;

if (is_readable($packageLogoPath)) {
    $packageLogo = file_get_contents($packageLogoPath);

    if (is_string($packageLogo)) {
        $packageLogoData = 'data:image/svg+xml;base64,' . base64_encode($packageLogo);
    }
}

$projectDescription = '[__PROJECT_DESCRIPTION__]';
$projectDocumentation = '[__PROJECT_DOCUMENTATION__]';
$projectRepository = '[__PROJECT_REPOSITORY__]';
$projectBugs = '[__PROJECT_BUGS__]';
$projectLicense = '[__PROJECT_LICENSE__]';
$projectReleaseNotes = ($projectRepository === '') ? '' : rtrim($projectRepository, '/') . '/releases';
$fundSources = [__PROJECT_FUND_SOURCES__];

$productLabel = g_get('product_label');
$productVersion = g_get('product_version');
$currentEdition = is_string($productLabel) && stripos($productLabel, 'Plus') !== false ? 'Plus' : 'CE';
$currentVersion = is_string($productVersion) ? trim($productVersion) : '';
$normalizedVersion = preg_replace('/-RELEASE(?:-p[0-9]+)?$/i', '', $currentVersion);

if (is_string($normalizedVersion)) {
    $currentVersion = $normalizedVersion;
}

$normalizedVersion = preg_replace('/-p[0-9]+$/i', '', $currentVersion);

if (is_string($normalizedVersion)) {
    $currentVersion = $normalizedVersion;
}

if ($currentVersion === '') {
    $currentVersion = gettext('Unknown');
}

$freeBsdRelease = php_uname('r');
$currentFreeBsd = gettext('Unknown');

if (preg_match('/^([0-9]+\.[0-9]+)/', $freeBsdRelease, $freeBsdReleaseMatches) === 1) {
    $currentFreeBsd = $freeBsdReleaseMatches[1];
}

$testedReleases = [
    // List each pfSense release here after testing the package on it.
];
$currentReleaseTested = false;

foreach ($testedReleases as $testedRelease) {
    if (
        $testedRelease['edition'] === $currentEdition
        && $testedRelease['version'] === $currentVersion
    ) {
        $currentReleaseTested = true;
        break;
    }
}

$supportLicenseLabel = gettext('MIT License');
$supportLicenseLabelEscaped = $escape($supportLicenseLabel);
$supportLicenseLinkHtml = $supportLicenseLabelEscaped;

if ($projectLicense !== '') {
    $projectLicenseEscaped = $escape($projectLicense);
    $supportLicenseLinkHtml = sprintf(
        '<a href="%s" target="_blank" rel="noopener noreferrer">%s</a>',
        $projectLicenseEscaped,
        $supportLicenseLabelEscaped,
    );
}

$supportMessageTemplate = gettext(
    '%1$s is free and open source under the %2$s. If it saves you time, you can support its development.',
);
$supportMessageTemplateEscaped = $escape($supportMessageTemplate);
$packageNameEscaped = $escape($packageName);
$supportMessage = sprintf(
    $supportMessageTemplateEscaped,
    $packageNameEscaped,
    $supportLicenseLinkHtml,
);

$pgtitle = [
    gettext('Services'),
    $packageName,
    gettext('About'),
];
$pglinks = [
    '',
    '/pkg_edit.php?xml=[__WORKSPACE_NAME__].xml&id=0',
    '@self',
];

include('head.inc');

display_top_tabs(pfsensePackage[__WORKSPACE_IDENTIFIER__]Tabs('about'));
?>
<style>
.pkg-about .panel-body.pkg-about-pad { padding: 15px; }
.pkg-about-hero { display: flex; align-items: center; gap: 24px; padding: 24px; }
.pkg-about-logo { flex: none; width: 96px; height: 96px; border-radius: 22px; box-shadow: 0 2px 6px rgba(0, 0, 0, .18); }
.pkg-about-hero-text { flex: 1; min-width: 0; }
.pkg-about-name { margin: 0; font-size: 26px; font-weight: 500; line-height: 1.25; }
.pkg-about-name .label { position: relative; top: -3px; margin-left: 8px; font-size: 12px; font-weight: 500; letter-spacing: .3px; vertical-align: middle; }
.pkg-about-tagline { margin: 6px 0 16px; font-size: 15px; opacity: .8; }
.pkg-about-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.pkg-about .btn i { font-size: 14px; margin-right: 6px; }
.pkg-about-update { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: 16px; padding: 10px 12px; border: 1px solid rgba(127, 127, 127, .3); border-radius: 4px; background: rgba(127, 127, 127, .07); }
.pkg-about-update.is-success { border-color: rgba(46, 125, 50, .38); background: rgba(46, 125, 50, .09); }
.pkg-about-update.is-error { border-color: rgba(198, 40, 40, .38); background: rgba(198, 40, 40, .08); }
.pkg-about-update.is-running { border-color: rgba(21, 101, 192, .38); background: rgba(21, 101, 192, .08); }
.pkg-about-update-text { min-width: 0; }
.pkg-about-update-text i { margin-right: 8px; font-size: 16px; }
.pkg-about-update.is-success .pkg-about-update-text i { color: #2e7d32; }
.pkg-about-update.is-error .pkg-about-update-text i { color: #c62828; }
.pkg-about-update.is-running .pkg-about-update-text i { color: #1565c0; }
.pkg-about-update-detail { margin-left: 4px; opacity: .75; }
.pkg-about-update-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.pkg-about-update-actions form { display: inline; margin: 0; }
.pkg-about-table > tbody > tr > td, .pkg-about-table > thead > tr > th { padding: 9px 15px !important; vertical-align: middle; }
.pkg-about-table i { font-size: 15px; margin-right: 8px; }
.pkg-about-table .label { margin-left: 8px; font-weight: 500; }
.pkg-about-muted { opacity: .7; }
.pkg-about-support p { margin: 0 0 14px; }
.pkg-about-footnote { margin: 0; padding: 9px 15px; font-size: 12px; opacity: .75; border-top: 1px solid rgba(127, 127, 127, .25); }
@media (max-width: 600px) {
  .pkg-about-hero { flex-direction: column; align-items: flex-start; gap: 16px; padding: 18px; }
  .pkg-about-logo { width: 72px; height: 72px; border-radius: 16px; }
}
.pkg-about-untested td { opacity: .75; }
.pkg-about-untested i { opacity: .6; }
.pkg-about-note { margin-left: 8px; font-size: 12px; font-style: italic; }
</style>
<div class="pkg-about">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="pkg-about-hero">
<?php if ($packageLogoData !== null): ?>
				<img class="pkg-about-logo" src="<?=$escape($packageLogoData)?>" width="96" height="96" alt="">
<?php endif; ?>
				<div class="pkg-about-hero-text">
					<h2 class="pkg-about-name"><?=$escape($packageName)?><span class="label label-primary"><?=$escape($packageVersion)?></span></h2>
					<p class="pkg-about-tagline"><?=$escape($projectDescription)?></p>
					<div class="pkg-about-actions">
<?php if ($projectDocumentation !== ''): ?>
						<a class="btn btn-sm btn-primary" href="<?=$escape($projectDocumentation)?>" target="_blank" rel="noopener noreferrer"><i class="fa fa-book"></i><?=$escape(gettext('Documentation'))?></a>
<?php endif; ?>
<?php if ($projectRepository !== ''): ?>
						<a class="btn btn-sm btn-default" href="<?=$escape($projectRepository)?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i><?=$escape(gettext('Source Code'))?></a>
<?php endif; ?>
<?php if ($projectBugs !== ''): ?>
						<a class="btn btn-sm btn-default" href="<?=$escape($projectBugs)?>" target="_blank" rel="noopener noreferrer"><i class="fa fa-bug"></i><?=$escape(gettext('Report an Issue'))?></a>
<?php endif; ?>
<?php if ($projectReleaseNotes !== ''): ?>
						<a class="btn btn-sm btn-default" href="<?=$escape($projectReleaseNotes)?>" target="_blank" rel="noopener noreferrer"><i class="fa fa-tag"></i><?=$escape(gettext('Release Notes'))?></a>
<?php endif; ?>
					</div>
<?php if ($updatesAvailable): ?>
					<div class="pkg-about-update <?=$escape($updateBarTone)?>">
						<span class="pkg-about-update-text" id="pkg-about-update-status">
<?php if (is_string($updateJobMessage) && $updateJobMessage !== ''): ?>
							<i class="fa fa-solid <?=$escape($updateJobRunning ? 'fa-spinner fa-spin' : ($updateJobState === 'succeeded' ? 'fa-check-circle' : 'fa-exclamation-circle'))?>"></i><strong><?=$escape($updateJobMessage)?></strong>
<?php elseif (is_string($updateError) && $updateError !== ''): ?>
							<i class="fa fa-solid fa-exclamation-circle"></i><span><?=$escape(sprintf(gettext('The last update check failed: %1$s'), $updateError))?></span>
<?php elseif ($updateAvailable && is_string($latestVersion)): ?>
							<i class="fa fa-solid fa-arrow-circle-up"></i><strong><?=$escape(sprintf(gettext('Version %1$s is available.'), $latestVersion))?></strong><?php if (is_string($checkedAtDisplay)): ?><span class="pkg-about-update-detail"><?=$escape(sprintf(gettext('Checked %1$s.'), $checkedAtDisplay))?></span><?php endif; ?>
<?php elseif ($updateCheckFrequency === 'never'): ?>
							<i class="fa fa-solid fa-pause-circle"></i><span><?=$escape(gettext('Update checks are off.'))?></span>
<?php elseif (is_string($checkedAtDisplay)): ?>
							<i class="fa fa-solid fa-check-circle"></i><span><?=$escape(sprintf(gettext('Up to date. Checked %1$s.'), $checkedAtDisplay))?></span>
<?php else: ?>
							<i class="fa fa-solid fa-info-circle"></i><span><?=$escape(gettext('Updates have not been checked yet.'))?></span>
<?php endif; ?>
						</span>
						<div class="pkg-about-update-actions">
<?php if ($updateAvailable && is_string($latestVersion) && !$updateJobRunning && $updateJobState !== 'succeeded'): ?>
							<form method="post"><button class="btn btn-sm btn-success" type="submit" name="self_update" value="1"><i class="fa fa-solid fa-download"></i><?=$escape(sprintf(gettext('Update to %1$s'), $latestVersion))?></button></form>
<?php if (is_string($releaseUrl)): ?>
							<a class="btn btn-sm btn-default" href="<?=$escape($releaseUrl)?>" target="_blank" rel="noopener noreferrer"><i class="fa fa-solid fa-tag"></i><?=$escape(gettext("What's New"))?></a>
<?php endif; ?>
<?php elseif (!$updateJobRunning): ?>
							<form method="post"><button class="btn btn-xs btn-default" type="submit" name="check_updates" value="1"><i class="fa fa-solid fa-refresh"></i><?=$escape(gettext('Check Now'))?></button></form>
<?php endif; ?>
						</div>
					</div>
<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
<?php if ($testedReleases !== []): ?>
		<div class="col-md-7">
			<div class="panel panel-default">
				<div class="panel-heading"><h2 class="panel-title"><?=$escape(gettext('Tested pfSense Releases'))?></h2></div>
				<div class="panel-body">
					<div class="table-responsive">
						<table class="table table-striped table-hover pkg-about-table">
							<thead><tr><th><?=$escape(gettext('Release'))?></th><th>FreeBSD</th></tr></thead>
							<tbody>
<?php foreach ($testedReleases as $testedRelease): ?>
								<tr><td><i class="fa fa-check-circle text-success"></i><?=$escape(sprintf('pfSense %s %s', $testedRelease['edition'], $testedRelease['version']))?><?php if ($testedRelease['edition'] === $currentEdition && $testedRelease['version'] === $currentVersion): ?><span class="label label-info"><?=$escape(gettext('This firewall'))?></span><?php endif; ?></td><td><?=$escape($testedRelease['freebsd'])?></td></tr>
<?php endforeach; ?>
<?php if ($currentReleaseTested === false): ?>
								<tr class="pkg-about-untested"><td><i class="far fa-circle"></i><?=$escape(sprintf('pfSense %s %s', $currentEdition, $currentVersion))?><span class="label label-info"><?=$escape(gettext('This firewall'))?></span><span class="pkg-about-note"><?=$escape(gettext('Not tested'))?></span></td><td><?=$escape($currentFreeBsd)?></td></tr>
<?php endif; ?>
							</tbody>
						</table>
					</div>
					<p class="pkg-about-footnote"><?=$escape(gettext('Each tested release passed install, upgrade, a representative package operation, and removal.'))?></p>
				</div>
			</div>
		</div>
<?php endif; ?>
		<div class="<?=$escape($testedReleases === [] ? 'col-md-12' : 'col-md-5')?>">
			<div class="panel panel-default">
				<div class="panel-heading"><h2 class="panel-title"><?=$escape(gettext('Support the Project'))?></h2></div>
				<div class="panel-body pkg-about-pad pkg-about-support">
					<p><?=$supportMessage?></p>
<?php if ($fundSources !== []): ?>
					<div class="pkg-about-actions">
<?php foreach ($fundSources as $fundSourceIndex => $fundSource): ?>
<?php
    $fundSourceLabel = sprintf(gettext('Support %d'), $fundSourceIndex + 1);
    $fundSourceIconClass = 'fa fa-heart';

    if (stripos($fundSource, 'github.com/sponsors/') !== false) {
        $fundSourceLabel = 'GitHub Sponsors';
    } elseif (stripos($fundSource, 'paypal') !== false) {
        $fundSourceLabel = 'PayPal';
        $fundSourceIconClass = 'fab fa-paypal';
    }
?>
						<a class="btn btn-sm <?=$escape($fundSourceIndex === 0 ? 'btn-success' : 'btn-default')?>" href="<?=$escape($fundSource)?>" target="_blank" rel="noopener noreferrer"><i class="<?=$escape($fundSourceIconClass)?>"></i><?=$escape($fundSourceLabel)?></a>
<?php endforeach; ?>
					</div>
<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
</div>
<?php if ($updatesAvailable && $updateJobRunning): ?>
<script>
(function () {
	'use strict';

	var statusLine = document.getElementById('pkg-about-update-status');
	var messageNode = statusLine ? statusLine.querySelector('strong') : null;

	window.setInterval(function () {
		window.fetch('[__WORKSPACE_NAME__]-about.php?update_status=1', {
			credentials: 'same-origin',
			cache: 'no-store'
		}).then(function (response) {
			if (!response.ok) {
				throw new Error('status');
			}

			return response.json();
		}).then(function (status) {
			if (status.state !== 'running') {
				window.location.reload();

				return;
			}

			if (messageNode && typeof status.message === 'string') {
				messageNode.textContent = status.message;
			}
		}).catch(function () {
			// A later poll can recover from a transient WebGUI or network failure.
		});
	}, 3000);
}());
</script>
<?php endif; ?>
<?php

include('foot.inc');
