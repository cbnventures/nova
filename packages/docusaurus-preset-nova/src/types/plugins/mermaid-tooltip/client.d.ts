/**
 * Plugins - Mermaid Tooltip - Client.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_TooltipEl = HTMLDivElement | null;

export type Plugins_MermaidTooltip_Client_HoveredNode = SVGGElement | null;

export type Plugins_MermaidTooltip_Client_FindClickable = (target: Plugins_MermaidTooltip_Client_FindClickable_Target) => Plugins_MermaidTooltip_Client_FindClickable_Returns;

export type Plugins_MermaidTooltip_Client_ShowFor = (node: Plugins_MermaidTooltip_Client_ShowFor_Node, x: Plugins_MermaidTooltip_Client_ShowFor_X, y: Plugins_MermaidTooltip_Client_ShowFor_Y) => Plugins_MermaidTooltip_Client_ShowFor_Returns;

export type Plugins_MermaidTooltip_Client_HideFor = (node: Plugins_MermaidTooltip_Client_HideFor_Node) => Plugins_MermaidTooltip_Client_HideFor_Returns;

export type Plugins_MermaidTooltip_Client_Pointerover = (event: Plugins_MermaidTooltip_Client_Pointerover_Event) => Plugins_MermaidTooltip_Client_Pointerover_Returns;

export type Plugins_MermaidTooltip_Client_Pointermove = (event: Plugins_MermaidTooltip_Client_Pointermove_Event) => Plugins_MermaidTooltip_Client_Pointermove_Returns;

export type Plugins_MermaidTooltip_Client_Click = (event: Plugins_MermaidTooltip_Client_Click_Event) => Plugins_MermaidTooltip_Client_Click_Returns;

/**
 * Plugins - Mermaid Tooltip - Client - Click.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_Click_Event = MouseEvent;

export type Plugins_MermaidTooltip_Client_Click_Returns = undefined;

export type Plugins_MermaidTooltip_Client_Click_Target = Element;

export type Plugins_MermaidTooltip_Client_Click_Anchor = HTMLAnchorElement | null;

export type Plugins_MermaidTooltip_Client_Click_Href = string | null;

/**
 * Plugins - Mermaid Tooltip - Client - Find Clickable.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_FindClickable_Target = EventTarget | null;

export type Plugins_MermaidTooltip_Client_FindClickable_Returns = SVGGElement | null;

export type Plugins_MermaidTooltip_Client_FindClickable_Match = Element | null;

export type Plugins_MermaidTooltip_Client_FindClickable_Unknown = unknown;

/**
 * Plugins - Mermaid Tooltip - Client - Get Or Create Tooltip.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_GetOrCreateTooltip_El = HTMLDivElement;

/**
 * Plugins - Mermaid Tooltip - Client - Hide For.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_HideFor_Node = SVGGElement;

export type Plugins_MermaidTooltip_Client_HideFor_Returns = undefined;

export type Plugins_MermaidTooltip_Client_HideFor_Stash = DOMStringMap;

export type Plugins_MermaidTooltip_Client_HideFor_Stashed = string | undefined;

/**
 * Plugins - Mermaid Tooltip - Client - Pointermove.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_Pointermove_Event = PointerEvent;

export type Plugins_MermaidTooltip_Client_Pointermove_Returns = undefined;

/**
 * Plugins - Mermaid Tooltip - Client - Pointerover.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_Pointerover_Event = PointerEvent;

export type Plugins_MermaidTooltip_Client_Pointerover_Returns = undefined;

export type Plugins_MermaidTooltip_Client_Pointerover_Node = SVGGElement | null;

/**
 * Plugins - Mermaid Tooltip - Client - Show For.
 *
 * @since 0.17.0
 */
export type Plugins_MermaidTooltip_Client_ShowFor_Node = SVGGElement;

export type Plugins_MermaidTooltip_Client_ShowFor_X = number;

export type Plugins_MermaidTooltip_Client_ShowFor_Y = number;

export type Plugins_MermaidTooltip_Client_ShowFor_Returns = undefined;

export type Plugins_MermaidTooltip_Client_ShowFor_Title = string | null;

export type Plugins_MermaidTooltip_Client_ShowFor_Stash = DOMStringMap;

export type Plugins_MermaidTooltip_Client_ShowFor_El = HTMLDivElement;
