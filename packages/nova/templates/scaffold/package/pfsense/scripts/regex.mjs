/**
 * Regex - Release Signing Key Pattern.
 *
 * Matches the OpenSSH Ed25519 public-key grammar accepted by release checks.
 * Both package validation and signing use this format for trusted key lines.
 *
 * @since UNRELEASED
 */
export const releaseSigningKeyPattern = /^ssh-ed25519\s+AAAAC3NzaC1lZDI1NTE5AAAAI[A-Za-z0-9+/]{43}(?:\s.*)?$/;

/**
 * Regex - Semantic Version Pattern.
 *
 * Matches the release versions supported by the generated pfSense package.
 * Keeping the pattern shared prevents validation logic from mixing with I/O.
 *
 * @since 0.0.0
 */
export const semanticVersionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
