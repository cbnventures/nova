import type { Dispatch, SetStateAction } from 'react';

import type { SharedSurface } from '../../shared.d.ts';

/**
 * Components - Install Strip.
 *
 * @since 0.15.0
 */
export type ComponentsInstallStripPropsCommand = string;

export type ComponentsInstallStripPropsLabel = string | undefined;

export type ComponentsInstallStripPropsSurface = SharedSurface | undefined;

export type ComponentsInstallStripProps = {
  command: ComponentsInstallStripPropsCommand;
  label?: ComponentsInstallStripPropsLabel;
  copyTarget?: ComponentsInstallStripPropsCopyTarget;
  surface?: ComponentsInstallStripPropsSurface;
};

export type ComponentsInstallStripCopied = boolean;

export type ComponentsInstallStripState = [ComponentsInstallStripCopied, ComponentsInstallStripSetCopied];

export type ComponentsInstallStripSetCopied = Dispatch<SetStateAction<ComponentsInstallStripCopied>>;

export type ComponentsInstallStripPropsCopyTarget = 'block' | 'icon' | 'text';

export type ComponentsInstallStripIcon = string;

export type ComponentsInstallStripCopiedText = string;

export type ComponentsInstallStripCopyButtonText = string;

export type ComponentsInstallStripCopyAriaLabel = string;

export type ComponentsInstallStripCopyText = string;

/**
 * Components - Install Strip - Components Install Strip - Handle Copy.
 *
 * @since 0.15.0
 */
