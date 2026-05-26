import type { CSSProperties, Dispatch, SetStateAction } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Blocks - Install Strip.
 *
 * @since 0.15.0
 */
export type BlocksInstallStripPropsCommand = string;

export type BlocksInstallStripPropsLabel = string | undefined;

export type BlocksInstallStripPropsSurface = SharedSurface | undefined;

export type BlocksInstallStripPropsClassName = string | undefined;

export type BlocksInstallStripPropsStyle = CSSProperties | undefined;

export type BlocksInstallStripProps = {
  command: BlocksInstallStripPropsCommand;
  label?: BlocksInstallStripPropsLabel;
  copyTarget?: BlocksInstallStripPropsCopyTarget;
  surface?: BlocksInstallStripPropsSurface;
  className?: BlocksInstallStripPropsClassName;
  style?: BlocksInstallStripPropsStyle;
};

export type BlocksInstallStripCopied = boolean;

export type BlocksInstallStripState = [BlocksInstallStripCopied, BlocksInstallStripSetCopied];

export type BlocksInstallStripSetCopied = Dispatch<SetStateAction<BlocksInstallStripCopied>>;

export type BlocksInstallStripPropsCopyTarget = 'block' | 'icon' | 'text';

export type BlocksInstallStripIcon = string;

export type BlocksInstallStripCopiedText = string;

export type BlocksInstallStripCopyButtonText = string;

export type BlocksInstallStripCopyAriaLabel = string;

export type BlocksInstallStripCopyText = string;

/**
 * Blocks - Install Strip - Blocks Install Strip - Handle Copy.
 *
 * @since 0.15.0
 */
