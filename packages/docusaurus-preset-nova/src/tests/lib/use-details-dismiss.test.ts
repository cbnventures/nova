import { strictEqual } from 'node:assert/strict';

import { describe, it, vi } from 'vitest';

import { closeOnEscape } from '../../lib/use-details-dismiss.js';

import type {
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_ActiveElement,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_Details,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_FakeDetails,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_RemoveAttribute,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_SummaryFocus,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_ActiveElement,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_Details,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_FakeDetails,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_RemoveAttribute,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_SummaryFocus,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_ActiveElement,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_Details,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_FakeDetails,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_RemoveAttribute,
  Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_SummaryFocus,
} from '../../types/tests/lib/use-details-dismiss.test.d.ts';

/**
 * Tests - Lib - Use Details Dismiss - Close On Escape.
 *
 * Each case hands `closeOnEscape` a stand-in `<details>` whose `contains()`
 * reports whether keyboard focus sits inside it, with a spied summary so
 * the focus hand-back can be asserted without a DOM.
 *
 * @since 0.50.0
 */
describe('closeOnEscape', async () => {
  it('returns focus to the summary when focus was inside the menu', () => {
    const summaryFocus: Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_SummaryFocus = vi.fn();
    const removeAttribute: Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_RemoveAttribute = vi.fn();
    const fakeDetails: Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_FakeDetails = {
      open: true,
      contains: () => true,
      removeAttribute,
      querySelector: () => ({
        focus: summaryFocus,
      }),
    };
    const details: Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_Details = fakeDetails as Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_Details;
    const activeElement: Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_ActiveElement = {} as Tests_Lib_UseDetailsDismiss_CloseOnEscape_ReturnsFocusToTheSummaryWhenFocusWasInsideTheMenu_ActiveElement;

    closeOnEscape(details, activeElement);

    strictEqual(JSON.stringify(removeAttribute.mock.calls), '[["open"]]');
    strictEqual(summaryFocus.mock.calls.length, 1, 'Expected Escape to move focus back to the summary.');
    strictEqual(JSON.stringify(summaryFocus.mock.calls), '[[{"focusVisible":true}]]', 'Expected the returned focus to show the keyboard ring.');

    return;
  });

  it('leaves focus alone when it was outside the menu', () => {
    const summaryFocus: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_SummaryFocus = vi.fn();
    const removeAttribute: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_RemoveAttribute = vi.fn();
    const fakeDetails: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_FakeDetails = {
      open: true,
      contains: () => false,
      removeAttribute,
      querySelector: () => ({
        focus: summaryFocus,
      }),
    };
    const details: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_Details = fakeDetails as Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_Details;
    const activeElement: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_ActiveElement = {} as Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesFocusAloneWhenItWasOutsideTheMenu_ActiveElement;

    closeOnEscape(details, activeElement);

    strictEqual(JSON.stringify(removeAttribute.mock.calls), '[["open"]]');
    strictEqual(summaryFocus.mock.calls.length, 0);

    return;
  });

  it('leaves a closed menu alone', () => {
    const summaryFocus: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_SummaryFocus = vi.fn();
    const removeAttribute: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_RemoveAttribute = vi.fn();
    const fakeDetails: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_FakeDetails = {
      open: false,
      contains: () => true,
      removeAttribute,
      querySelector: () => ({
        focus: summaryFocus,
      }),
    };
    const details: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_Details = fakeDetails as Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_Details;
    const activeElement: Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_ActiveElement = {} as Tests_Lib_UseDetailsDismiss_CloseOnEscape_LeavesAClosedMenuAlone_ActiveElement;

    closeOnEscape(details, activeElement);

    strictEqual(removeAttribute.mock.calls.length, 0);
    strictEqual(summaryFocus.mock.calls.length, 0);

    return;
  });

  return;
});
