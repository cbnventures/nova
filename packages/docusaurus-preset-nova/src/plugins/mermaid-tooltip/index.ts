import type {
  Plugins_MermaidTooltip_Index_MermaidTooltip_Context,
  Plugins_MermaidTooltip_Index_MermaidTooltip_Returns,
} from '../../types/plugins/mermaid-tooltip/index.d.ts';

/**
 * Plugins - Mermaid Tooltip - Mermaid Tooltip.
 *
 * Docusaurus plugin that registers the runtime client module which
 * renders styled tooltips over pre-rendered Mermaid diagram nodes on
 * hover, replacing the unstyled native title attribute behavior.
 *
 * @param {Plugins_MermaidTooltip_Index_MermaidTooltip_Context} _context - _context.
 *
 * @returns {Plugins_MermaidTooltip_Index_MermaidTooltip_Returns}
 *
 * @since 0.21.0
 */
export function mermaidTooltip(_context: Plugins_MermaidTooltip_Index_MermaidTooltip_Context): Plugins_MermaidTooltip_Index_MermaidTooltip_Returns {
  return {
    name: '@cbnventures/docusaurus-preset-nova-mermaid-tooltip',
    getClientModules() {
      return [require.resolve('./client.js')];
    },
  };
}

export default mermaidTooltip;
