import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  compilePlaygroundCode,
  createPlaygroundState,
  getPlaygroundDisplay,
  reducePlaygroundState,
} from '../../../theme/BlockPlayground/playground-state.js';

import type {
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Code,
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_FirstUpdate,
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Updates,
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Code,
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_FirstUpdate,
  Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Updates,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_Display,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_State,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_Display,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_State,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_After,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_Before,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_Display,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_State,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_Display,
  Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_State,
  Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing,
} from '../../../types/tests/theme/BlockPlayground/playground-state.test.d.ts';

/**
 * Tests - Theme - Block Playground - Playground State - Render Nothing.
 *
 * Stand-in component for compiled entries, since the reducer only cares
 * about entry ids and never renders the component itself.
 *
 * @returns {Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing_Returns}
 *
 * @since 0.50.0
 */
const renderNothing: Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing = () => null;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State.
 *
 * @since 0.50.0
 */
describe('reducePlaygroundState', async () => {
  it('shows the newest compiled entry', () => {
    let state: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_State = createPlaygroundState();

    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 1,
        component: renderNothing,
      },
    });
    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 2,
        component: renderNothing,
      },
    });

    const display: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_Display = getPlaygroundDisplay(state);

    strictEqual((display !== undefined) ? display['id'] : undefined, 2);
    strictEqual((state['lastGood'] !== undefined) ? state['lastGood']['id'] : undefined, 1);
    strictEqual(state['error'], undefined);

    return;
  });

  it('keeps the last good render after a compile failure', () => {
    let state: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_State = createPlaygroundState();

    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 1,
        component: renderNothing,
      },
    });
    state = reducePlaygroundState(state, {
      type: 'compileFailed',
      message: 'SyntaxError: Unexpected token',
    });

    const display: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_Display = getPlaygroundDisplay(state);

    strictEqual((display !== undefined) ? display['id'] : undefined, 1);
    strictEqual(state['candidate'], undefined);
    strictEqual(state['error'], 'SyntaxError: Unexpected token');

    return;
  });

  it('falls back to the previous render when the candidate fails to render', () => {
    let state: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_State = createPlaygroundState();

    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 1,
        component: renderNothing,
      },
    });
    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 2,
        component: renderNothing,
      },
    });
    state = reducePlaygroundState(state, {
      type: 'renderFailed',
      id: 2,
      message: 'TypeError: items is undefined',
    });

    const display: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_Display = getPlaygroundDisplay(state);

    strictEqual((display !== undefined) ? display['id'] : undefined, 1);
    strictEqual(state['error'], 'TypeError: items is undefined');

    return;
  });

  it('clears the error on the next successful compile', () => {
    let state: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_State = createPlaygroundState();

    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 1,
        component: renderNothing,
      },
    });
    state = reducePlaygroundState(state, {
      type: 'compileFailed',
      message: 'SyntaxError: Unexpected token',
    });
    state = reducePlaygroundState(state, {
      type: 'compiled',
      entry: {
        id: 3,
        component: renderNothing,
      },
    });

    const display: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_Display = getPlaygroundDisplay(state);

    strictEqual((display !== undefined) ? display['id'] : undefined, 3);
    strictEqual((state['lastGood'] !== undefined) ? state['lastGood']['id'] : undefined, 1);
    strictEqual(state['error'], undefined);

    return;
  });

  it('ignores render failures from unknown entries', () => {
    const before: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_Before = reducePlaygroundState(createPlaygroundState(), {
      type: 'compiled',
      entry: {
        id: 4,
        component: renderNothing,
      },
    });
    const after: Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_After = reducePlaygroundState(before, {
      type: 'renderFailed',
      id: 99,
      message: 'Error: stale',
    });

    strictEqual(after, before);

    return;
  });

  return;
});

/**
 * Tests - Theme - Block Playground - Playground State - Compile Playground Code.
 *
 * @since 0.50.0
 */
describe('compilePlaygroundCode', async () => {
  it('reports a compiled entry for valid jsx', () => {
    const code: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Code = '<div>Hello</div>';
    const updates: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Updates = [];

    compilePlaygroundCode(code, {}, 7, (update) => {
      updates.push(update);

      return undefined;
    });

    const firstUpdate: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_FirstUpdate = updates[0];

    strictEqual(updates.length, 1);
    strictEqual((firstUpdate !== undefined && firstUpdate['type'] === 'compiled') ? firstUpdate['entry']['id'] : undefined, 7);

    return;
  });

  it('reports a compile failure for invalid jsx', () => {
    const code: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Code = '<div>Hello';
    const updates: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Updates = [];

    compilePlaygroundCode(code, {}, 8, (update) => {
      updates.push(update);

      return undefined;
    });

    const firstUpdate: Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_FirstUpdate = updates[0];

    strictEqual(updates.length, 1);
    strictEqual((firstUpdate !== undefined) ? firstUpdate['type'] : undefined, 'compileFailed');

    return;
  });

  return;
});
