import type {
  MouseEventHandler,
  ReactNode,
  RefObject,
} from 'react';

/**
 * Theme - Block Playground - Preview Modal - Block Playground Preview Modal.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_Open = boolean;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_OnClose = () => void;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_OnCanvasClickCapture = MouseEventHandler<HTMLDivElement>;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_Children = ReactNode;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props = {
  open: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_Open;
  onClose: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_OnClose;
  onCanvasClickCapture: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_OnCanvasClickCapture;
  children: Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_Props_Children;
};

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogRef = RefObject<HTMLDialogElement | null>;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_TitleLabel = string;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_CloseLabel = string;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_DialogElement = HTMLDialogElement | null;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_RootElement = HTMLElement;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_PreviousOverflow = string;

/**
 * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Backdrop Click.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Event = MouseEvent;

export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleBackdropClick_Returns = undefined;

/**
 * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Close.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleClose_Returns = undefined;

/**
 * Theme - Block Playground - Preview Modal - Block Playground Preview Modal - Handle Close Click.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_PreviewModal_BlockPlaygroundPreviewModal_HandleCloseClick_Returns = undefined;
