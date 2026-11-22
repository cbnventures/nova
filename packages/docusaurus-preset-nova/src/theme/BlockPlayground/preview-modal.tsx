import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import { useEffect, useRef } from 'react';

import type {
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_CloseLabel,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogElement,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogRef,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Event,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Returns,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleClose_Returns,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleCloseClick_Returns,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_PreviousOverflow,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_RootElement,
  Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_TitleLabel,
} from '../../types/theme/BlockPlayground/preview-modal.d.ts';

/**
 * Theme - Block Playground - Preview Modal - Block Playground Preview Modal.
 *
 * Native modal dialog that shows the current example at real size. The
 * browser traps focus, closes on Escape, and returns focus to the opener,
 * while the page behind it stops scrolling until the dialog closes.
 *
 * @param {Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.50.0
 */
function BlockPlaygroundPreviewModal(props: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props) {
  const dialogRef: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogRef = useRef<HTMLDialogElement | null>(null);
  const titleLabel: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_TitleLabel = translate({
    id: 'theme.BlockPlayground.previewTitle',
    message: 'Full-size preview',
    description: 'The title of the dialog that shows a block playground example at real size',
  });
  const closeLabel: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_CloseLabel = translate({
    id: 'theme.BlockPlayground.closePreview',
    message: 'Close preview',
    description: 'The ARIA label for the button that closes the full-size block playground preview',
  });

  useEffect(() => {
    const dialogElement: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogElement = dialogRef.current;

    if (dialogElement === null) {
      return undefined;
    }

    if (props['open'] === true && dialogElement.open === false) {
      dialogElement.showModal();
    }

    if (props['open'] === false && dialogElement.open === true) {
      dialogElement.close();
    }

    return undefined;
  }, [props['open']]);

  useEffect(() => {
    if (props['open'] === false) {
      return undefined;
    }

    const rootElement: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_RootElement = document.documentElement;
    const previousOverflow: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_PreviousOverflow = rootElement.style.overflow;

    rootElement.style.overflow = 'hidden';

    return () => {
      rootElement.style.overflow = previousOverflow;

      return undefined;
    };
  }, [props['open']]);

  useEffect(() => {
    const dialogElement: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogElement = dialogRef.current;

    if (dialogElement === null) {
      return undefined;
    }

    /**
     * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Close.
     *
     * Reports every way the dialog closes, including the Escape key, so the
     * playground's open state stays in step with the native dialog.
     *
     * @returns {Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleClose_Returns}
     *
     * @since 0.50.0
     */
    function handleClose(): Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleClose_Returns {
      props.onClose();

      return undefined;
    }

    /**
     * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Backdrop Click.
     *
     * Closes the dialog when a click lands on the dialog element itself,
     * which only happens on the backdrop around the panel.
     *
     * @param {Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Event} event - Event.
     *
     * @returns {Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Returns}
     *
     * @since 0.50.0
     */
    function handleBackdropClick(event: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Event): Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Returns {
      if (event.target === dialogElement && dialogElement !== null) {
        dialogElement.close();
      }

      return undefined;
    }

    dialogElement.addEventListener('close', handleClose);
    dialogElement.addEventListener('click', handleBackdropClick);

    return () => {
      dialogElement.removeEventListener('close', handleClose);
      dialogElement.removeEventListener('click', handleBackdropClick);

      return undefined;
    };
  }, [props['onClose']]);

  /**
   * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Close Click.
   *
   * Closes the dialog from its close button; the native close event then
   * updates the playground's open state.
   *
   * @returns {Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleCloseClick_Returns}
   *
   * @since 0.50.0
   */
  function handleCloseClick(): Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleCloseClick_Returns {
    if (dialogRef.current !== null) {
      dialogRef.current.close();
    }

    return undefined;
  }

  return (
    <dialog
      ref={dialogRef}
      className="nova-block-playground-modal"
      aria-label={titleLabel}
    >
      <div className="nova-block-playground-modal-panel">
        <div className="nova-block-playground-modal-header">
          <span className="nova-block-playground-modal-title">{titleLabel}</span>
          <button
            type="button"
            className="nova-block-playground-modal-close"
            onClick={handleCloseClick}
            aria-label={closeLabel}
          >
            <Icon icon="lucide:x" width="18" height="18" aria-hidden="true" />
          </button>
        </div>
        <div className="nova-block-playground-canvas nova-block-playground-modal-canvas" onClickCapture={props['onCanvasClickCapture']}>
          {(props['open'] === true) ? props['children'] : null}
        </div>
      </div>
    </dialog>
  );
}

export default BlockPlaygroundPreviewModal;
