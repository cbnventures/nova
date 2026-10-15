import { runtimeBrowser } from '@cbnventures/nova/presets/eslint';

export default [
  ...runtimeBrowser.map((config) => ({
    ...config,
    files: ['homebridge-ui/public/**/*.js'],
    name: 'custom-ui-browser',
  })),
  {
    files: ['homebridge-ui/public/**/*.js'],
    name: 'custom-ui-browser-overrides',
    rules: {
      // Browser fragments are plain JavaScript because Homebridge loads them
      // directly. The rule requires TypeScript annotations from .d.ts files,
      // which an uncompiled browser script cannot consume.
      '@cbnventures/nova/no-inline-type-annotation': 'off',
    },
  },
];
