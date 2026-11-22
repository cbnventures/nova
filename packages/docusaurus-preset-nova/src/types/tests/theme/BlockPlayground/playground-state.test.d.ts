import type {
  Shared_BlockPlaygroundEntry,
  Shared_BlockPlaygroundState,
  Shared_BlockPlaygroundUpdate,
} from '../../../shared.d.ts';

/**
 * Tests - Theme - Block Playground - Playground State - Render Nothing.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing_Returns = null;

export type Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing = () => Tests_Theme_BlockPlayground_PlaygroundState_RenderNothing_Returns;

/**
 * Tests - Theme - Block Playground - Playground State - Compile Playground Code - Reports A Compiled Entry For Valid Jsx.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Code = string;

export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_Updates = Shared_BlockPlaygroundUpdate[];

export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompiledEntryForValidJsx_FirstUpdate = Shared_BlockPlaygroundUpdate | undefined;

/**
 * Tests - Theme - Block Playground - Playground State - Compile Playground Code - Reports A Compile Failure For Invalid Jsx.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Code = string;

export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_Updates = Shared_BlockPlaygroundUpdate[];

export type Tests_Theme_BlockPlayground_PlaygroundState_CompilePlaygroundCode_ReportsACompileFailureForInvalidJsx_FirstUpdate = Shared_BlockPlaygroundUpdate | undefined;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State - Clears The Error On The Next Successful Compile.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_State = Shared_BlockPlaygroundState;

export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ClearsTheErrorOnTheNextSuccessfulCompile_Display = Shared_BlockPlaygroundEntry | undefined;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State - Falls Back To The Previous Render When The Candidate Fails To Render.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_State = Shared_BlockPlaygroundState;

export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_FallsBackToThePreviousRenderWhenTheCandidateFailsToRender_Display = Shared_BlockPlaygroundEntry | undefined;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State - Ignores Render Failures From Unknown Entries.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_Before = Shared_BlockPlaygroundState;

export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_IgnoresRenderFailuresFromUnknownEntries_After = Shared_BlockPlaygroundState;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State - Keeps The Last Good Render After A Compile Failure.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_State = Shared_BlockPlaygroundState;

export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_KeepsTheLastGoodRenderAfterACompileFailure_Display = Shared_BlockPlaygroundEntry | undefined;

/**
 * Tests - Theme - Block Playground - Playground State - Reduce Playground State - Shows The Newest Compiled Entry.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_State = Shared_BlockPlaygroundState;

export type Tests_Theme_BlockPlayground_PlaygroundState_ReducePlaygroundState_ShowsTheNewestCompiledEntry_Display = Shared_BlockPlaygroundEntry | undefined;
