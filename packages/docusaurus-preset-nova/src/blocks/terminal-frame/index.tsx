import { Icon } from '@iconify/react/offline';

import type {
  Blocks_TerminalFrame_Index_BlocksTerminalFrame_Props,
  Blocks_TerminalFrame_Index_BlocksTerminalFrame_Returns,
} from '../../types/blocks/terminal-frame/index.d.ts';

/**
 * Blocks - Terminal Frame - Blocks Terminal Frame.
 *
 * Shows command-line output as sharp text inside a macOS Terminal window that
 * keeps a real 80-column window's proportions at any width (890pt reference,
 * set --nova-terminal-frame-width to change it). Children: text or one element per line.
 *
 * @param {Blocks_TerminalFrame_Index_BlocksTerminalFrame_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.43.0
 */
function BlocksTerminalFrame(props: Blocks_TerminalFrame_Index_BlocksTerminalFrame_Props): Blocks_TerminalFrame_Index_BlocksTerminalFrame_Returns {
  return (
    <figure
      className={(props['className'] !== undefined) ? `nova-terminal-frame ${props['className']}` : 'nova-terminal-frame'}
      style={props['style']}
    >
      <div className="nova-terminal-frame-window">
        <div className="nova-terminal-frame-bar" aria-hidden="true">
          <span className="nova-terminal-frame-lights">
            <span />
            <span />
            <span />
          </span>
          <Icon icon="lucide:folder" className="nova-terminal-frame-folder" />
          <span className="nova-terminal-frame-title">{props['title']}</span>
        </div>
        <pre className="nova-terminal-frame-body" aria-label={props['label']}>
          {props['children']}
        </pre>
      </div>
    </figure>
  );
}

export default BlocksTerminalFrame;
