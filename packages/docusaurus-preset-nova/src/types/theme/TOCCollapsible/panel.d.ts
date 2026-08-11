import type { Lib_UseOverlayPanel_Returns } from '../../lib/use-overlay-panel.d.ts';
import type { Shared_TocHeading } from '../../shared.d.ts';

/**
 * Theme - Toc Collapsible - Panel - Toc Collapsible Panel.
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsOpen = boolean;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload_TreeItems = Shared_TocHeading[];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload = {
  treeItems: Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Payload_TreeItems;
} | undefined;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayPanel = Lib_UseOverlayPanel_Returns;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_IsClosing = Lib_UseOverlayPanel_Returns['isClosing'];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_SetIsClosing = Lib_UseOverlayPanel_Returns['setIsClosing'];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_HandleClickOutsideFunction = Lib_UseOverlayPanel_Returns['handleClickOutside'];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_PanelRef = Lib_UseOverlayPanel_Returns['panelRef'];

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_TriggerLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_DialogAriaLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_CloseAriaLabel = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_OverlayClassName = string;

export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

/**
 * Theme - Toc Collapsible - Panel - Toc Collapsible Panel (TOCCollapsiblePanel).
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TOCCollapsiblePanel_Returns = React.JSX.Element | null;

/**
 * Theme - Toc Collapsible - Panel - Toc List.
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TocList_Item = Shared_TocHeading;

export type Theme_TocCollapsible_Panel_TocList_Items = Theme_TocCollapsible_Panel_TocList_Item[];

/**
 * Theme - Toc Collapsible - Panel - Toc List (TocList).
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Panel_TocList_Returns = React.JSX.Element | undefined;
