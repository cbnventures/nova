import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import type {
  Tests_OverlayDismissal_GetPackageRoot_CurrentFileDirectory,
  Tests_OverlayDismissal_GetPackageRoot_CurrentFilePath,
  Tests_OverlayDismissal_GetPackageRoot_Returns,
  Tests_OverlayDismissal_OverlayDismissal_CloseOnNavigationContract,
  Tests_OverlayDismissal_OverlayDismissal_DocSidebarClosesOnNavigation_HasContract,
  Tests_OverlayDismissal_OverlayDismissal_DocSidebarClosesOnNavigation_Source,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasNavigationContract,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasRecursiveSelectionHandler,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasSelectionCloseHandler,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasSelectionHandler,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_SelectionCloseContract,
  Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_Source,
  Tests_OverlayDismissal_ReadPanel_PanelPath,
  Tests_OverlayDismissal_ReadPanel_RelativePath,
  Tests_OverlayDismissal_ReadPanel_Returns,
} from '../types/tests/overlay-dismissal.test.d.ts';

/**
 * Tests - Overlay Dismissal - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @returns {Tests_OverlayDismissal_GetPackageRoot_Returns}
 *
 * @since 0.27.0
 */
function getPackageRoot(): Tests_OverlayDismissal_GetPackageRoot_Returns {
  const currentFilePath: Tests_OverlayDismissal_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_OverlayDismissal_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Overlay Dismissal - Read Panel.
 *
 * @param {Tests_OverlayDismissal_ReadPanel_RelativePath} relativePath - Relative path.
 *
 * @returns {Tests_OverlayDismissal_ReadPanel_Returns}
 *
 * @since 0.27.0
 */
async function readPanel(relativePath: Tests_OverlayDismissal_ReadPanel_RelativePath): Tests_OverlayDismissal_ReadPanel_Returns {
  const panelPath: Tests_OverlayDismissal_ReadPanel_PanelPath = resolve(getPackageRoot(), 'src', 'theme', relativePath);

  return readFile(panelPath, 'utf-8');
}

/**
 * Tests - Overlay Dismissal - Overlay Dismissal.
 *
 * Protects the mobile navigation policy independently from persistent
 * overlay mounting: docs navigation changes and TOC heading selections
 * must start the shared closing animation.
 *
 * @since 0.27.0
 */
describe('overlay dismissal', () => {
  const closeOnNavigationContract: Tests_OverlayDismissal_OverlayDismissal_CloseOnNavigationContract = [
    '  // Close overlay on navigation.',
    '  useEffect(() => {',
    '    if (isOpen === true) {',
    '      setIsClosing(true);',
    '    }',
    '',
    '    return undefined;',
    '  }, [pathname]);',
  ].join('\n');

  it('doc sidebar closes on navigation', async () => {
    const source: Tests_OverlayDismissal_OverlayDismissal_DocSidebarClosesOnNavigation_Source = await readPanel('DocSidebarMobile/panel.tsx');
    const hasContract: Tests_OverlayDismissal_OverlayDismissal_DocSidebarClosesOnNavigation_HasContract = source.includes(closeOnNavigationContract);

    strictEqual(hasContract, true, 'Expected the mobile docs sidebar panel to start closing when its pathname changes.');

    return;
  });

  it('TOC closes on navigation and heading selection', async () => {
    const source: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_Source = await readPanel('TOCCollapsible/panel.tsx');
    const selectionCloseContract: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_SelectionCloseContract = [
      '          {TocList(payload[\'treeItems\'], () => {',
      '            setIsClosing(true);',
      '',
      '            return undefined;',
      '          })}',
    ].join('\n');
    const hasNavigationContract: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasNavigationContract = source.includes(closeOnNavigationContract);
    const hasSelectionHandler: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasSelectionHandler = source.includes('onClick={onLinkClick}');
    const hasRecursiveSelectionHandler: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasRecursiveSelectionHandler = source.includes('TocList(item[\'children\'], onLinkClick)');
    const hasSelectionCloseHandler: Tests_OverlayDismissal_OverlayDismissal_TOCClosesOnNavigationAndHeadingSelection_HasSelectionCloseHandler = source.includes(selectionCloseContract);

    strictEqual(hasNavigationContract, true, 'Expected the mobile TOC panel to start closing when its pathname changes.');
    strictEqual(hasSelectionHandler, true, 'Expected every mobile TOC heading link to receive the selection handler.');
    strictEqual(hasRecursiveSelectionHandler, true, 'Expected nested mobile TOC heading links to retain the selection handler.');
    strictEqual(hasSelectionCloseHandler, true, 'Expected mobile TOC heading selection to start the shared closing animation.');

    return;
  });

  return;
});
