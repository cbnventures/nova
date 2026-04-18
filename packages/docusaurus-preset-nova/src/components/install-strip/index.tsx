import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useState } from 'react';

import type {
  ComponentsInstallStripCopied,
  ComponentsInstallStripCopiedText,
  ComponentsInstallStripCopyAriaLabel,
  ComponentsInstallStripCopyButtonText,
  ComponentsInstallStripCopyText,
  ComponentsInstallStripIcon,
  ComponentsInstallStripProps,
  ComponentsInstallStripPropsCopyTarget,
  ComponentsInstallStripSetCopied,
  ComponentsInstallStripState,
} from '../../types/components/install-strip/index.d.ts';

/**
 * Components - Install Strip - Components Install Strip.
 *
 * Highlighted code block displaying a package install command with
 * a monospace font and a click-to-copy button that provides visual
 * feedback on successful copy.
 *
 * @param {ComponentsInstallStripProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsInstallStrip(props: ComponentsInstallStripProps) {
  const state: ComponentsInstallStripState = useState<ComponentsInstallStripCopied>(false);
  const copied: ComponentsInstallStripCopied = state[0];
  const setCopied: ComponentsInstallStripSetCopied = state[1];
  const copyTarget: ComponentsInstallStripPropsCopyTarget = props['copyTarget'] ?? 'icon';
  const icon: ComponentsInstallStripIcon = (copied === true) ? 'lucide:check' : 'lucide:copy';
  const copiedText: ComponentsInstallStripCopiedText = translate({
    id: 'theme.InstallStrip.copied',
    message: 'COPIED',
    description: 'The text shown after copying the install command',
  });
  const copyButtonText: ComponentsInstallStripCopyButtonText = translate({
    id: 'theme.InstallStrip.copy',
    message: 'COPY',
    description: 'The text shown on the copy button of the install strip',
  });
  const copyAriaLabel: ComponentsInstallStripCopyAriaLabel = translate({
    id: 'theme.InstallStrip.copyAriaLabel',
    message: 'Copy to clipboard',
    description: 'The ARIA label for the install strip copy button',
  });
  const copyText: ComponentsInstallStripCopyText = (copied === true) ? copiedText : copyButtonText;

  /**
   * Components - Install Strip - Components Install Strip - Handle Copy.
   *
   * Copies the install command text to the clipboard and shows a temporary visual confirmation
   * before reverting the icon back to the default copy state.
   *
   * @since 0.15.0
   */
  function handleCopy() {
    void navigator.clipboard.writeText(props['command']);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);

      return undefined;
    }, 2000);

    return undefined;
  }

  return (
    <section className="nova-install-strip">
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

export default ComponentsInstallStrip;
