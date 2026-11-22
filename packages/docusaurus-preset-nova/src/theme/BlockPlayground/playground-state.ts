import { generateElement } from 'react-live';

import type {
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Code,
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Component,
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Dispatch,
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Id,
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Returns,
  Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Scope,
  Theme_BlockPlayground_PlaygroundState_CreatePlaygroundState_Returns,
  Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_Returns,
  Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_State,
  Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Returns,
  Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_State,
  Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Update,
} from '../../types/theme/BlockPlayground/playground-state.d.ts';

/**
 * Theme - Block Playground - Playground State - Create Playground State.
 *
 * Builds the empty playground state used before the first compile so the
 * preview starts blank and no error is shown until the seeded code runs.
 *
 * @returns {Theme_BlockPlayground_PlaygroundState_CreatePlaygroundState_Returns}
 *
 * @since 0.50.0
 */
export function createPlaygroundState(): Theme_BlockPlayground_PlaygroundState_CreatePlaygroundState_Returns {
  return {
    candidate: undefined,
    lastGood: undefined,
    error: undefined,
  };
}

/**
 * Theme - Block Playground - Playground State - Reduce Playground State.
 *
 * Applies one compile or render outcome to the playground state. A candidate
 * that survives until the next outcome is promoted to the last good render,
 * so a failing edit falls back to the most recent output that worked.
 *
 * @param {Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_State}  state  - State.
 * @param {Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Update} update - Update.
 *
 * @returns {Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Returns}
 *
 * @since 0.50.0
 */
export function reducePlaygroundState(state: Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_State, update: Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Update): Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_Returns {
  switch (update['type']) {
    case 'compiled': {
      return {
        candidate: update['entry'],
        lastGood: state['candidate'] ?? state['lastGood'],
        error: undefined,
      };
    }

    case 'compileFailed': {
      return {
        candidate: undefined,
        lastGood: state['candidate'] ?? state['lastGood'],
        error: update['message'],
      };
    }

    case 'renderFailed': {
      if (state['candidate'] !== undefined && state['candidate']['id'] === update['id']) {
        return {
          candidate: undefined,
          lastGood: state['lastGood'],
          error: update['message'],
        };
      }

      if (state['lastGood'] !== undefined && state['lastGood']['id'] === update['id']) {
        return {
          candidate: state['candidate'],
          lastGood: undefined,
          error: update['message'],
        };
      }

      return state;
    }

    default: {
      return state;
    }
  }
}

/**
 * Theme - Block Playground - Playground State - Get Playground Display.
 *
 * Picks the entry the preview should render. The newest candidate wins, and
 * the last good render stays on screen while the current code is broken.
 *
 * @param {Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_State} state - State.
 *
 * @returns {Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_Returns}
 *
 * @since 0.50.0
 */
export function getPlaygroundDisplay(state: Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_State): Theme_BlockPlayground_PlaygroundState_GetPlaygroundDisplay_Returns {
  return state['candidate'] ?? state['lastGood'];
}

/**
 * Theme - Block Playground - Playground State - Compile Playground Code.
 *
 * Transpiles the editor's JSX against the block scope and reports the result.
 * Syntax errors arrive as compile failures, while errors thrown during render
 * arrive later as render failures tagged with the entry they belong to.
 *
 * @param {Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Code}     code     - Code.
 * @param {Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Scope}    scope    - Scope.
 * @param {Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Id}       id       - Id.
 * @param {Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Dispatch} dispatch - Dispatch.
 *
 * @returns {Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Returns}
 *
 * @since 0.50.0
 */
export function compilePlaygroundCode(code: Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Code, scope: Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Scope, id: Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Id, dispatch: Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Dispatch): Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Returns {
  try {
    const component: Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_Component = generateElement({
      code,
      scope,
      enableTypeScript: false,
    }, (error) => {
      dispatch({
        type: 'renderFailed',
        id,
        message: String(error),
      });

      return undefined;
    });

    dispatch({
      type: 'compiled',
      entry: {
        id,
        component,
      },
    });
  } catch (error) {
    dispatch({
      type: 'compileFailed',
      message: String(error),
    });
  }

  return undefined;
}
