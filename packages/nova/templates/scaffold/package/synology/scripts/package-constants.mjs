/**
 * Package Constants - Lifecycle Scripts.
 *
 * Lists the seven control scripts required by DSM package archives.
 * Build and validation helpers share this inventory to prevent drift.
 *
 * @since UNRELEASED
 */
export const lifecycleScripts = [
  'preinst',
  'postinst',
  'preuninst',
  'postuninst',
  'preupgrade',
  'postupgrade',
  'start-stop-status',
];

/**
 * Package Constants - Required Info Keys.
 *
 * Lists the INFO values DSM 7 requires before installation.
 * Optional Package Center metadata is validated separately where relevant.
 *
 * @since UNRELEASED
 */
export const requiredInfoKeys = [
  'package',
  'version',
  'os_min_ver',
  'description',
  'arch',
  'maintainer',
];

/**
 * Package Constants - Desktop Icon Sizes.
 *
 * Lists every size DSM substitutes for "{0}" in a ui/config icon path.
 * The checker requires one square PNG per size so no menu view shows a gap.
 *
 * @since UNRELEASED
 */
export const desktopIconSizes = [
  16,
  24,
  32,
  48,
  64,
  72,
  256,
];

/**
 * Package Constants - Uses Usr Local Link.
 *
 * Records whether the scaffold option generated conf/resource.
 * Validation requires the linker declaration only for opted-in workspaces.
 *
 * @since UNRELEASED
 */
export const usesUsrLocalLink = Boolean([__SYNOLOGY_USR_LOCAL_LINK__]);
