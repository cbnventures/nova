import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  describe,
  it,
} from 'vitest';

import type {
  Tests_HomebridgeCustomUi_EslintConfig,
  Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_EslintPreset,
  Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_Html,
  Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_Script,
  Tests_HomebridgeCustomUi_PackageDirectory,
  Tests_HomebridgeCustomUi_TemplateDirectory,
} from '../types/tests/homebridge-custom-ui.test.d.ts';

const packageDirectory: Tests_HomebridgeCustomUi_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
const templateDirectory: Tests_HomebridgeCustomUi_TemplateDirectory = join(packageDirectory, 'templates', 'scaffold-options', 'package', 'homebridge', 'custom-ui', 'homebridge-ui', 'public');

/**
 * Tests - Homebridge Custom UI - Homebridge Custom UI Template.
 *
 * Protects the generated example gallery inside Nova so consumers can freely
 * customize their scaffold without inheriting tests for starter presentation.
 *
 * @since 0.31.0
 */
describe('Homebridge custom UI template', () => {
  it('uses the host interface and demonstrates practical controls', async () => {
    const eslintConfig: Tests_HomebridgeCustomUi_EslintConfig = await readFile(join(packageDirectory, 'templates', 'scaffold', 'package', 'homebridge', 'eslint.config.mts'), 'utf-8');
    const eslintPreset: Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_EslintPreset = await readFile(join(packageDirectory, 'templates', 'scaffold-options', 'package', 'homebridge', 'custom-ui', 'config', 'eslint-custom-ui.ts'), 'utf-8');
    const html: Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_Html = await readFile(join(templateDirectory, 'index.html'), 'utf-8');
    const script: Tests_HomebridgeCustomUi_HomebridgeCustomUITemplate_UsesTheHostInterfaceAndDemonstratesPracticalControls_Script = await readFile(join(templateDirectory, 'index.js'), 'utf-8');

    strictEqual(eslintConfig.lastIndexOf('...novaRules') < eslintConfig.lastIndexOf('...customUiPreset'), true);
    strictEqual(eslintPreset.includes('\'@cbnventures/nova/no-inline-type-annotation\': \'off\''), true);
    strictEqual(html.includes('<!doctype'), false);
    strictEqual(html.includes('<html'), false);
    strictEqual(html.includes('<head'), false);
    strictEqual(html.includes('<body'), false);
    strictEqual(html.includes('styles.css'), false);
    strictEqual(html.includes('role="tablist"'), true);
    strictEqual(html.includes('data-nova-tab="about"'), true);
    strictEqual(html.includes('data-nova-tab="inputs"'), true);
    strictEqual(html.includes('data-nova-tab="choices"'), true);
    strictEqual(html.includes('data-nova-tab="components"'), true);
    strictEqual(html.includes('data-nova-tab="configuration"'), false);
    strictEqual(html.includes('data-nova-custom-interface'), true);
    strictEqual(html.includes('data-nova-native-configuration'), true);
    strictEqual(html.includes('data-nova-open-configuration'), true);
    strictEqual(html.includes('data-nova-close-configuration'), true);
    strictEqual(html.includes('under Configuration'), false);
    strictEqual(html.includes('class="row g-3"'), false);
    strictEqual(html.includes('class="row g-4"'), false);
    strictEqual(html.includes('class="row g-3 mx-0"'), true);
    strictEqual(html.includes('class="row g-4 mx-0"'), true);
    strictEqual(html.includes('type="text"'), true);
    strictEqual(html.includes('type="password"'), true);
    strictEqual(html.includes('type="email"'), true);
    strictEqual(html.includes('type="url"'), true);
    strictEqual(html.includes('type="number"'), true);
    strictEqual(html.includes('type="date"'), true);
    strictEqual(html.includes('type="color"'), true);
    strictEqual(html.includes('type="file"'), true);
    strictEqual(html.includes('type="range"'), true);
    strictEqual(html.includes('<textarea'), true);
    strictEqual(html.includes('<select'), true);
    strictEqual(html.includes('multiple size="3"'), true);
    strictEqual(html.includes('type="checkbox"'), true);
    strictEqual(html.includes('type="radio"'), true);
    strictEqual(html.includes('role="switch"'), true);
    strictEqual(html.includes('class="dropdown-menu"'), true);
    strictEqual(html.includes('class="accordion"'), true);
    strictEqual(script.includes('window.homebridge.plugin'), true);
    strictEqual(script.includes('window.homebridge.hideSchemaForm()'), true);
    strictEqual(script.includes('window.homebridge.showSchemaForm()'), true);
    strictEqual(script.includes('window.homebridge.fixScrollHeight()'), true);
    strictEqual(script.includes('window.homebridge.toast.info'), true);
    strictEqual(script.includes('customInterface.setAttribute(\'hidden\', \'\')'), true);
    strictEqual(script.includes('nativeConfiguration.setAttribute(\'hidden\', \'\')'), true);
    strictEqual(script.includes('activateTab(activeTabName)'), true);

    return;
  });

  return;
});
