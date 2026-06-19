import type {
  Plugins_MermaidTooltip_Index_MermaidTooltip_Context,
  Plugins_MermaidTooltip_Index_MermaidTooltip_Returns,
} from '../../types/plugins/mermaid-tooltip/index.d.ts';

export function mermaidTooltip(_context: Plugins_MermaidTooltip_Index_MermaidTooltip_Context): Plugins_MermaidTooltip_Index_MermaidTooltip_Returns {
  return {
    name: '@cbnventures/docusaurus-preset-nova-mermaid-tooltip',
    getClientModules() {
      return [require.resolve('./client.js')];
    },
  };
}

export default mermaidTooltip;
