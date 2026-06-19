import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useState } from 'react';

import type {
  Blocks_InstallStrip_Index_BlocksInstallStrip_Copied,
  Blocks_InstallStrip_Index_BlocksInstallStrip_CopiedText,
  Blocks_InstallStrip_Index_BlocksInstallStrip_CopyAriaLabel,
  Blocks_InstallStrip_Index_BlocksInstallStrip_CopyButtonText,
  Blocks_InstallStrip_Index_BlocksInstallStrip_CopyText,
  Blocks_InstallStrip_Index_BlocksInstallStrip_HandleCopy_Returns,
  Blocks_InstallStrip_Index_BlocksInstallStrip_Icon,
  Blocks_InstallStrip_Index_BlocksInstallStrip_Props,
  Blocks_InstallStrip_Index_BlocksInstallStrip_Props_CopyTarget,
  Blocks_InstallStrip_Index_BlocksInstallStrip_SetCopied,
  Blocks_InstallStrip_Index_BlocksInstallStrip_State,
} from '../../types/blocks/install-strip/index.d.ts';

/**
 * Blocks - Install Strip - Blocks Install Strip.
 *
 * Highlighted code block displaying a package install command with
 * a monospace font and a click-to-copy button that provides visual
 * feedback on successful copy.
 *
 * @param {Blocks_InstallStrip_Index_BlocksInstallStrip_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksInstallStrip(props: Blocks_InstallStrip_Index_BlocksInstallStrip_Props) {
  const state: Blocks_InstallStrip_Index_BlocksInstallStrip_State = useState<Blocks_InstallStrip_Index_BlocksInstallStrip_Copied>(false);
  const copied: Blocks_InstallStrip_Index_BlocksInstallStrip_Copied = state[0];
  const setCopied: Blocks_InstallStrip_Index_BlocksInstallStrip_SetCopied = state[1];
  const copyTarget: Blocks_InstallStrip_Index_BlocksInstallStrip_Props_CopyTarget = props['copyTarget'] ?? 'icon';
  const icon: Blocks_InstallStrip_Index_BlocksInstallStrip_Icon = (copied === true) ? 'lucide:check' : 'lucide:copy';
  const copiedText: Blocks_InstallStrip_Index_BlocksInstallStrip_CopiedText = translate({
    id: 'theme.InstallStrip.copied',
    message: 'COPIED',
    description: 'The text shown after copying the install command',
  });
  const copyButtonText: Blocks_InstallStrip_Index_BlocksInstallStrip_CopyButtonText = translate({
    id: 'theme.InstallStrip.copy',
    message: 'COPY',
    description: 'The text shown on the copy button of the install strip',
  });
  const copyAriaLabel: Blocks_InstallStrip_Index_BlocksInstallStrip_CopyAriaLabel = translate({
    id: 'theme.InstallStrip.copyAriaLabel',
    message: 'Copy to clipboard',
    description: 'The ARIA label for the install strip copy button',
  });
  const copyText: Blocks_InstallStrip_Index_BlocksInstallStrip_CopyText = (copied === true) ? copiedText : copyButtonText;

  /**
   * Blocks - Install Strip - Blocks Install Strip - Handle Copy.
   *
   * Copies the install command text to the clipboard and shows a temporary visual confirmation
   * before reverting the icon back to the default copy state.
   *
   * @since 0.15.0
   */
  function handleCopy(): Blocks_InstallStrip_Index_BlocksInstallStrip_HandleCopy_Returns {
    void navigator.clipboard.writeText(props['command']);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);

      return undefined;
    }, 2000);

    return undefined;
  }

  return (
    <section
      className={(props['className'] !== undefined) ? `nova-install-strip ${props['className']}` : 'nova-install-strip'}
      style={props['style']}
    >
      {(props['surface'] === 'alt') ? (
        <div className="nova-surface-alt">
          <div className="nova-install-strip-inner nova-container">
            {(props['label'] !== undefined) && (
              <p className="nova-install-strip-label">
                {props['label']}
              </p>
            )}
            {(copyTarget === 'block') && (
              <button
                className="nova-install-strip-command nova-install-strip-command-block"
                type="button"
                onClick={handleCopy}
                aria-label={copyAriaLabel}
              >
                <code className="nova-install-strip-code">
                  {props['command']}
                </code>
                <span className="nova-install-strip-copy">
                  <Icon icon={icon} width="18" height="18" aria-hidden="true" />
                </span>
              </button>
            )}
            {(copyTarget === 'icon') && (
              <div className="nova-install-strip-command">
                <code className="nova-install-strip-code">
                  {props['command']}
                </code>
                <button
                  className="nova-install-strip-copy"
                  type="button"
                  onClick={handleCopy}
                  aria-label={copyAriaLabel}
                >
                  <Icon icon={icon} width="18" height="18" aria-hidden="true" />
                </button>
              </div>
            )}
            {(copyTarget === 'text') && (
              <div className="nova-install-strip-command">
                <code className="nova-install-strip-code">
                  {props['command']}
                </code>
                <button
                  className="nova-install-strip-copy nova-install-strip-copy-text"
                  type="button"
                  onClick={handleCopy}
                  aria-label={copyAriaLabel}
                >
                  {copyText}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="nova-install-strip-inner nova-container">
          {(props['label'] !== undefined) && (
            <p className="nova-install-strip-label">
              {props['label']}
            </p>
          )}
          {(copyTarget === 'block') && (
            <button
              className="nova-install-strip-command nova-install-strip-command-block"
              type="button"
              onClick={handleCopy}
              aria-label={copyAriaLabel}
            >
              <code className="nova-install-strip-code">
                {props['command']}
              </code>
              <span className="nova-install-strip-copy">
                <Icon icon={icon} width="18" height="18" aria-hidden="true" />
              </span>
            </button>
          )}
          {(copyTarget === 'icon') && (
            <div className="nova-install-strip-command">
              <code className="nova-install-strip-code">
                {props['command']}
              </code>
              <button
                className="nova-install-strip-copy"
                type="button"
                onClick={handleCopy}
                aria-label={copyAriaLabel}
              >
                <Icon icon={icon} width="18" height="18" aria-hidden="true" />
              </button>
            </div>
          )}
          {(copyTarget === 'text') && (
            <div className="nova-install-strip-command">
              <code className="nova-install-strip-code">
                {props['command']}
              </code>
              <button
                className="nova-install-strip-copy nova-install-strip-copy-text"
                type="button"
                onClick={handleCopy}
                aria-label={copyAriaLabel}
              >
                {copyText}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default BlocksInstallStrip;
