/**
 * Regex - Dsm Version Pattern.
 *
 * Matches a DSM version with major, minor, and build components.
 * Validation interprets those captures against the DSM 7 minimum build.
 *
 * @since UNRELEASED
 */
export const dsmVersionPattern = /^(\d+)\.(\d+)-(\d+)$/;

/**
 * Regex - Info Line Pattern.
 *
 * Matches one key="value" INFO assignment, including escaped characters.
 * Anchoring rejects comments and trailing data that DSM would misinterpret.
 *
 * @since UNRELEASED
 */
export const infoLinePattern = /^([a-z_]+)="((?:[^"\\]|\\.)*)"$/;

/**
 * Regex - Wizard File Pattern.
 *
 * Matches the JSON wizard files DSM reads from WIZARD_UIFILES, including an
 * optional three-letter DSM language suffix such as "_cht".
 *
 * @since UNRELEASED
 */
export const wizardFilePattern = /^(?:install|upgrade|uninstall)_uifile(?:_[a-z]{3})?$/;

/**
 * Regex - Wizard Script Pattern.
 *
 * Matches the shell generators DSM runs to write a wizard file at install,
 * upgrade, or uninstall time.
 *
 * @since UNRELEASED
 */
export const wizardScriptPattern = /^(?:install|upgrade|uninstall)_uifile(?:_[a-z]{3})?\.sh$/;
