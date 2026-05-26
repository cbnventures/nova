import type { LoadContext, Plugin } from '@docusaurus/types';

export function mermaidTooltip(_context: LoadContext): Plugin {
  return {
    name: '@cbnventures/docusaurus-preset-nova-mermaid-tooltip',
    getClientModules() {
      return [require.resolve('./client.js')];
    },
  };
}

export default mermaidTooltip;
