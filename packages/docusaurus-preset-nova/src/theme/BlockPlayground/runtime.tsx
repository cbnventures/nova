import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Editor } from 'react-live';

import {
  AppMarketDownload,
  BlogPreview,
  BrowserFrame,
  Canvas,
  Features,
  Frame,
  Hero,
  InstallStrip,
  ScreenGallery,
  Showcase,
  Spotlight,
  Stats,
  TerminalFrame,
  Terminology,
  Typewriter,
  WorkflowRunFrame,
} from '../../blocks/index.js';

import {
  compilePlaygroundCode,
  createPlaygroundState,
  getPlaygroundDisplay,
  reducePlaygroundState,
} from './playground-state.js';
import BlockPlaygroundPreviewModal from './preview-modal.js';
import BlockPlaygroundScaledPreview from './scaled-preview.js';

import type {
  Theme_BlockPlayground_Runtime_BlockLinkNavigation_Event,
  Theme_BlockPlayground_Runtime_BlockLinkNavigation_Link,
  Theme_BlockPlayground_Runtime_BlockLinkNavigation_Returns,
  Theme_BlockPlayground_Runtime_BlockLinkNavigation_Target,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Dispatch,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Display,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Id,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_NextCode,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Returns,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleClosePreview_Returns,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleOpenPreview_Returns,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleReset_Returns,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_LiveEditorLabel,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_NextIdRef,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewAriaLabel,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewLabel,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PlaygroundReducer,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpenState,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Rendered,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetAriaLabel,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCountState,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetLabel,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetPreviewOpen,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetResetCount,
  Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_State,
  Theme_BlockPlayground_Runtime_PlaygroundEditorTheme,
  Theme_BlockPlayground_Runtime_PlaygroundScope,
} from '../../types/theme/BlockPlayground/runtime.d.ts';

/**
 * Theme - Block Playground - Runtime - Playground Scope.
 *
 * Every export of the blocks barrel plus React, injected as free variables so
 * playground code needs no imports and renders inside the docs page with the
 * same Docusaurus context the blocks rely on.
 *
 * @since 0.50.0
 */
const playgroundScope: Theme_BlockPlayground_Runtime_PlaygroundScope = {
  React,
  AppMarketDownload,
  BlogPreview,
  BrowserFrame,
  Canvas,
  Features,
  Frame,
  Hero,
  InstallStrip,
  ScreenGallery,
  Showcase,
  Spotlight,
  Stats,
  TerminalFrame,
  Terminology,
  Typewriter,
  WorkflowRunFrame,
};

/**
 * Theme - Block Playground - Runtime - Playground Editor Theme.
 *
 * Syntax colors expressed as CSS variables so the editor follows the active
 * preset's palette in light and dark mode without a second theme object.
 *
 * @since 0.50.0
 */
const playgroundEditorTheme: Theme_BlockPlayground_Runtime_PlaygroundEditorTheme = {
  plain: {
    color: 'var(--nova-block-playground-token-plain)',
  },
  styles: [
    {
      types: [
        'comment',
        'prolog',
        'doctype',
        'cdata',
      ],
      style: {
        color: 'var(--nova-block-playground-token-comment)',
        fontStyle: 'italic',
      },
    },
    {
      types: [
        'punctuation',
        'operator',
      ],
      style: {
        color: 'var(--nova-block-playground-token-punctuation)',
      },
    },
    {
      types: [
        'tag',
        'class-name',
        'function',
      ],
      style: {
        color: 'var(--nova-block-playground-token-tag)',
      },
    },
    {
      types: [
        'attr-name',
        'property',
      ],
      style: {
        color: 'var(--nova-block-playground-token-attribute)',
      },
    },
    {
      types: [
        'string',
        'attr-value',
        'char',
        'template-string',
        'regex',
      ],
      style: {
        color: 'var(--nova-block-playground-token-string)',
      },
    },
    {
      types: [
        'keyword',
        'boolean',
        'number',
        'constant',
      ],
      style: {
        color: 'var(--nova-block-playground-token-keyword)',
      },
    },
  ],
};

/**
 * Theme - Block Playground - Runtime - Block Link Navigation.
 *
 * Cancels clicks on links inside the preview during the capture phase, so the
 * example's links stay inert while buttons and tabs keep working.
 *
 * @param {Theme_BlockPlayground_Runtime_BlockLinkNavigation_Event} event - Event.
 *
 * @returns {Theme_BlockPlayground_Runtime_BlockLinkNavigation_Returns}
 *
 * @since 0.50.0
 */
function blockLinkNavigation(event: Theme_BlockPlayground_Runtime_BlockLinkNavigation_Event): Theme_BlockPlayground_Runtime_BlockLinkNavigation_Returns {
  const target: Theme_BlockPlayground_Runtime_BlockLinkNavigation_Target = event.target;

  if (!(target instanceof Element)) {
    return undefined;
  }

  const link: Theme_BlockPlayground_Runtime_BlockLinkNavigation_Link = target.closest('a');

  if (link !== null) {
    event.preventDefault();
  }

  return undefined;
}

/**
 * Theme - Block Playground - Runtime - Block Playground Runtime.
 *
 * Client-only editor and preview pair loaded lazily by the block playground.
 * Each edit recompiles the code, the error shows under the editor, and the
 * preview keeps the last good render until the code works again.
 *
 * @param {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.50.0
 */
function BlockPlaygroundRuntime(props: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Props) {
  const playgroundReducer: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PlaygroundReducer = useReducer(reducePlaygroundState, undefined, createPlaygroundState);
  const state: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_State = playgroundReducer[0];
  const dispatch: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Dispatch = playgroundReducer[1];
  const nextIdRef: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_NextIdRef = useRef<number>(0);
  const display: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Display = getPlaygroundDisplay(state);
  const rendered: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_Rendered = (display !== undefined) ? React.createElement(display['component'], { key: display['id'] }) : null;
  const resetCountState: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCountState = useState<Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount>(0);
  const resetCount: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetCount = resetCountState[0];
  const setResetCount: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetResetCount = resetCountState[1];
  const liveEditorLabel: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_LiveEditorLabel = translate({
    id: 'theme.BlockPlayground.liveEditor',
    message: 'Live editor',
    description: 'The label above the editable code in a block playground',
  });
  const resetLabel: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetLabel = translate({
    id: 'theme.BlockPlayground.reset',
    message: 'Reset',
    description: 'The button text that restores the original code in a block playground',
  });
  const resetAriaLabel: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_ResetAriaLabel = translate({
    id: 'theme.BlockPlayground.resetAriaLabel',
    message: 'Reset the example code',
    description: 'The ARIA label for the reset button in a block playground',
  });
  const openPreviewLabel: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewLabel = translate({
    id: 'theme.BlockPlayground.openPreview',
    message: 'Open preview',
    description: 'The button text that opens a block playground example at full size',
  });
  const openPreviewAriaLabel: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_OpenPreviewAriaLabel = translate({
    id: 'theme.BlockPlayground.openPreviewAriaLabel',
    message: 'Open the preview at full size',
    description: 'The ARIA label for the button that opens a block playground example at full size',
  });
  const previewOpenState: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpenState = useState<Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen>(false);
  const previewOpen: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_PreviewOpen = previewOpenState[0];
  const setPreviewOpen: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_SetPreviewOpen = previewOpenState[1];

  /**
   * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Change.
   *
   * Tags the code with a fresh entry id and compiles it, so a render failure
   * reported later is matched to the edit that caused it.
   *
   * @param {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_NextCode} nextCode - Next code.
   *
   * @returns {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Returns}
   *
   * @since 0.50.0
   */
  function handleChange(nextCode: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_NextCode): Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Returns {
    const id: Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleChange_Id = nextIdRef.current + 1;

    nextIdRef.current = id;

    compilePlaygroundCode(nextCode, playgroundScope, id, dispatch);

    return undefined;
  }

  useEffect(() => {
    handleChange(props['code']);

    return undefined;
  }, [props['code']]);

  /**
   * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Reset.
   *
   * Restores the seeded example by remounting the editor with the original
   * code and compiling it again, so the preview matches the editor.
   *
   * @returns {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleReset_Returns}
   *
   * @since 0.50.0
   */
  function handleReset(): Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleReset_Returns {
    setResetCount((previous) => previous + 1);

    handleChange(props['code']);

    return undefined;
  }

  /**
   * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Open Preview.
   *
   * Opens the full-size preview dialog, which renders the current editor
   * state at real size instead of the zoomed-out column preview.
   *
   * @returns {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleOpenPreview_Returns}
   *
   * @since 0.50.0
   */
  function handleOpenPreview(): Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleOpenPreview_Returns {
    setPreviewOpen(true);

    return undefined;
  }

  /**
   * Theme - Block Playground - Runtime - Block Playground Runtime - Handle Close Preview.
   *
   * Marks the full-size preview dialog as closed after the native dialog
   * closes, whether by Escape, the close button, or a backdrop click.
   *
   * @returns {Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleClosePreview_Returns}
   *
   * @since 0.50.0
   */
  function handleClosePreview(): Theme_BlockPlayground_Runtime_BlockPlaygroundRuntime_HandleClosePreview_Returns {
    setPreviewOpen(false);

    return undefined;
  }

  return (
    <div className="nova-block-playground-unit">
      <div className="nova-block-playground-canvas" onClickCapture={blockLinkNavigation}>
        <BlockPlaygroundScaledPreview>{rendered}</BlockPlaygroundScaledPreview>
      </div>
      <div className="nova-block-playground-toolbar">
        <span className="nova-block-playground-lang">jsx</span>
        <span className="nova-block-playground-hint">
          <Icon icon="lucide:pencil" width="14" height="14" aria-hidden="true" />
          <span className="nova-block-playground-label">{liveEditorLabel}</span>
        </span>
        <button
          type="button"
          className="nova-block-playground-button"
          onClick={handleOpenPreview}
          aria-label={openPreviewAriaLabel}
          title={openPreviewLabel}
          aria-haspopup="dialog"
        >
          <Icon icon="lucide:maximize-2" width="14" height="14" aria-hidden="true" />
          <span className="nova-block-playground-label">{openPreviewLabel}</span>
        </button>
        <button
          type="button"
          className="nova-block-playground-button"
          onClick={handleReset}
          aria-label={resetAriaLabel}
          title={resetLabel}
        >
          <Icon icon="lucide:rotate-cw" width="14" height="14" aria-hidden="true" />
          <span className="nova-block-playground-label">{resetLabel}</span>
        </button>
      </div>
      <Editor
        key={resetCount}
        className="nova-block-playground-code"
        code={props['code']}
        language="jsx"
        theme={playgroundEditorTheme}
        onChange={handleChange}
      />
      {(state['error'] !== undefined) && (
        <pre className="nova-block-playground-error" role="alert">
          {state['error']}
        </pre>
      )}
      <BlockPlaygroundPreviewModal
        open={previewOpen}
        onClose={handleClosePreview}
        onCanvasClickCapture={blockLinkNavigation}
      >
        {rendered}
      </BlockPlaygroundPreviewModal>
    </div>
  );
}

export default BlockPlaygroundRuntime;
