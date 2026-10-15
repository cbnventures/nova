import { readFile } from 'node:fs/promises';

import {
  describe,
  expect,
  it,
} from 'vitest';

import packageJson from '../package.json' with { type: 'json' };

import type { Project_WebGUIContract_IncludesNativeGuidanceAndTaskSections_PackageGui } from './types/project.test.d.ts';

/**
 * Project - Workspace Identity.
 *
 * Confirms the generated workspace keeps its registered package identity.
 *
 * @since 0.0.0
 */
describe('Workspace identity', () => {
  it('uses the generated package name', () => {
    expect(packageJson['name']).toBe('[__WORKSPACE_PACKAGE_NAME__]');

    return;
  });

  return;
});

/**
 * Project - WebGUI Contract.
 *
 * Confirms the generated package presents its starter through pfSense's native
 * XML field system instead of introducing a separate frontend framework.
 *
 * @since 0.0.0
 */
describe('WebGUI contract', () => {
  it('includes native guidance and task sections', async () => {
    const packageGui: Project_WebGUIContract_IncludesNativeGuidanceAndTaskSections_PackageGui = await readFile(new URL('../port/files/usr/local/pkg/[__WORKSPACE_NAME__].xml', import.meta.url), 'utf-8');

    expect(packageGui).toContain('<type>info</type>');

    expect(packageGui).toContain('<name>Getting Started</name>');

    expect(packageGui).toContain('<name>Starter Configuration</name>');

    expect(packageGui).toContain('<addedit_string>[__WORKSPACE_TITLE__]: saved settings</addedit_string>');

    expect(packageGui).toContain('<option><name>Every minute</name><value>minute</value></option>');

    return;
  });

  return;
});
