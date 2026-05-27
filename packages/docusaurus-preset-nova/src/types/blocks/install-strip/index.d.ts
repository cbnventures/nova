import type { CSSProperties, Dispatch, SetStateAction } from 'react';

import type { Shared_Surface } from '../../shared.d.ts';

/**
 * Blocks - Install Strip.
 *
 * @since 0.15.0
 */
export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Command = string;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Label = string | undefined;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Surface = Shared_Surface | undefined;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_ClassName = string | undefined;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Style = CSSProperties | undefined;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props = {
  command: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Command;
  label?: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Label;
  copyTarget?: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_CopyTarget;
  surface?: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Surface;
  className?: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_ClassName;
  style?: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_Style;
};

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Copied = boolean;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_State = [Blocks_InstallStrip_Index_BlocksInstallStrip_Copied, Blocks_InstallStrip_Index_BlocksInstallStrip_SetCopied];

export type Blocks_InstallStrip_Index_BlocksInstallStrip_SetCopied = Dispatch<SetStateAction<Blocks_InstallStrip_Index_BlocksInstallStrip_Copied>>;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Props_CopyTarget = 'block' | 'icon' | 'text';

export type Blocks_InstallStrip_Index_BlocksInstallStrip_Icon = string;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_CopiedText = string;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_CopyButtonText = string;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_CopyAriaLabel = string;

export type Blocks_InstallStrip_Index_BlocksInstallStrip_CopyText = string;

/**
 * Blocks - Install Strip - Blocks Install Strip - Handle Copy.
 *
 * @since 0.15.0
 */
