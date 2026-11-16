import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react/offline';

import type {
  Blocks_BrowserFrame_Index_BlocksBrowserFrame_FaviconUrl,
  Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props,
  Blocks_BrowserFrame_Index_BlocksBrowserFrame_Returns,
} from '../../types/blocks/browser-frame/index.d.ts';

/**
 * Blocks - Browser Frame - Blocks Browser Frame.
 *
 * Wraps a web app screenshot in an unbranded Chrome-on-macOS window that scales
 * with a screenshot taken at a 1280 viewport (--nova-browser-frame-viewport sets
 * another width). A favicon starting with a slash resolves against the base URL.
 *
 * @param {Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.43.0
 */
function BlocksBrowserFrame(props: Blocks_BrowserFrame_Index_BlocksBrowserFrame_Props): Blocks_BrowserFrame_Index_BlocksBrowserFrame_Returns {
  const faviconUrl: Blocks_BrowserFrame_Index_BlocksBrowserFrame_FaviconUrl = useBaseUrl(props['favicon'] ?? '');

  return (
    <figure
      className={(props['className'] !== undefined) ? `nova-browser-frame ${props['className']}` : 'nova-browser-frame'}
      style={props['style']}
    >
      <div className="nova-browser-frame-window">
        <div className="nova-browser-frame-tabs" aria-hidden="true">
          <span className="nova-browser-frame-lights">
            <span />
            <span />
            <span />
          </span>
          <span className="nova-browser-frame-tab-search">
            <Icon icon="lucide:chevron-down" className="nova-browser-frame-tab-search-icon" />
          </span>
          <span className="nova-browser-frame-tab">
            {(props['favicon'] !== undefined) && (
              <img className="nova-browser-frame-favicon" src={faviconUrl} alt="" width={16} height={16} />
            )}
            <span className="nova-browser-frame-tab-title">{props['title']}</span>
            <Icon icon="lucide:x" className="nova-browser-frame-tab-close" />
          </span>
          <Icon icon="lucide:plus" className="nova-browser-frame-new-tab" />
        </div>
        <div className="nova-browser-frame-toolbar" aria-hidden="true">
          <Icon icon="lucide:arrow-left" className="nova-browser-frame-icon" />
          <Icon icon="lucide:arrow-right" className="nova-browser-frame-icon nova-browser-frame-icon-dim" />
          <Icon icon="lucide:rotate-cw" className="nova-browser-frame-icon nova-browser-frame-icon-reload" />
          <span className="nova-browser-frame-omnibox">
            <Icon icon="lucide:sliders-horizontal" className="nova-browser-frame-omnibox-icon" />
            <span className="nova-browser-frame-url">{props['url']}</span>
          </span>
          <Icon icon="lucide:ellipsis-vertical" className="nova-browser-frame-icon" />
        </div>
        <div className="nova-browser-frame-media">
          {props['children']}
        </div>
      </div>
    </figure>
  );
}

export default BlocksBrowserFrame;
