import { strictEqual } from 'node:assert/strict';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
} from 'node:path';

import { describe, it } from 'vitest';

import {
  isProjectOwnedFile,
  normalizeDiagnosticFileName,
} from '../../lib/type-check.js';

import type {
  Tests_Lib_TypeCheck_IsProjectOwnedFile_RecognizesAProjectFile_ProjectDirectory,
  Tests_Lib_TypeCheck_IsProjectOwnedFile_RecognizesAProjectFile_ProjectFile,
  Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_DependencyFile,
  Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_ExternalFile,
  Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_ProjectDirectory,
  Tests_Lib_TypeCheck_NormalizeDiagnosticFileName_UsesPortableSeparators_Result,
} from '../../types/tests/lib/type-check.test.d.ts';

/**
 * Tests - Lib - Type Check - Is Project Owned File.
 *
 * @since 0.34.0
 */
describe('isProjectOwnedFile', () => {
  it('recognizes a project file', () => {
    const projectDirectory: Tests_Lib_TypeCheck_IsProjectOwnedFile_RecognizesAProjectFile_ProjectDirectory = join(tmpdir(), 'nova-type-check-project');
    const projectFile: Tests_Lib_TypeCheck_IsProjectOwnedFile_RecognizesAProjectFile_ProjectFile = join(projectDirectory, 'src', 'index.ts');

    strictEqual(isProjectOwnedFile(projectFile, projectDirectory), true);

    return;
  });

  it('rejects dependencies and external files', () => {
    const projectDirectory: Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_ProjectDirectory = join(tmpdir(), 'nova-type-check-project');
    const dependencyFile: Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_DependencyFile = join(projectDirectory, 'node_modules', 'example', 'index.d.ts');
    const externalFile: Tests_Lib_TypeCheck_IsProjectOwnedFile_RejectsDependenciesAndExternalFiles_ExternalFile = join(dirname(projectDirectory), 'other-project', 'index.ts');

    strictEqual(isProjectOwnedFile(dependencyFile, projectDirectory), false);
    strictEqual(isProjectOwnedFile(externalFile, projectDirectory), false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Type Check - Normalize Diagnostic File Name.
 *
 * @since 0.34.0
 */
describe('normalizeDiagnosticFileName', () => {
  it('uses portable separators', () => {
    const result: Tests_Lib_TypeCheck_NormalizeDiagnosticFileName_UsesPortableSeparators_Result = normalizeDiagnosticFileName('C:\\repo\\src\\index.ts');

    strictEqual(result, 'C:/repo/src/index.ts');

    return;
  });

  return;
});
