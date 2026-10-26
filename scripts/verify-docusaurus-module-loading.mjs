import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

/**
 * Verify Docusaurus Module Loading - Validate.
 *
 * Runs a value through a Joi schema using the same callback contract exposed
 * by Docusaurus to plugin validation functions.
 *
 * @param {import('joi').Schema}    schema  - Schema.
 * @param {Record<string, unknown>} options - Options.
 *
 * @returns {Record<string, unknown>}
 *
 * @since 0.0.0
 */
function validate(schema, options) {
  const result = schema.validate(options);

  if (result['error'] !== undefined) {
    throw result['error'];
  }

  return result['value'];
}

/**
 * Verify Docusaurus Module Loading - Run.
 *
 * Exercises native ESM for both Joi consumers, then resolves the package as a
 * preset and loads its theme through Docusaurus' own Jiti-backed loader. The
 * package build runs this after transpilation against fresh build output.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function run() {
  const packageUrl = new URL('../packages/docusaurus-preset-nova/', import.meta.url);
  const buildUrl = new URL('build/src/', packageUrl);
  const optionsUrl = new URL('options.js', buildUrl);
  const siteContextUrl = new URL('lib/i18n/site-context.js', buildUrl);
  const themeUrl = new URL('index.js', buildUrl);

  const nativeModules = await Promise.all([
    import(optionsUrl.href),
    import(siteContextUrl.href),
  ]);
  const optionsModule = nativeModules[0];
  const siteContextModule = nativeModules[1];

  if (typeof optionsModule['validateOptions'] !== 'function') {
    throw new TypeError('The native ESM loader did not load validateOptions.');
  }

  if (typeof siteContextModule['Runner'] !== 'function') {
    throw new TypeError('The native ESM loader did not load the site-context Runner.');
  }

  const nativeOptions = optionsModule.validateOptions({
    validate,
    options: {
      preset: 'foundry',
    },
  });

  if (nativeOptions['preset'] !== 'foundry' || nativeOptions['persistentCache'] !== false) {
    throw new TypeError('The native ESM loader did not expose a working Joi options schema.');
  }

  const packageRequire = createRequire(new URL('package.json', packageUrl));
  const docusaurusCorePackagePath = packageRequire.resolve('@docusaurus/core/package.json');
  const docusaurusRequire = createRequire(docusaurusCorePackagePath);
  const docusaurusUtilsPackagePath = packageRequire.resolve('@docusaurus/utils/package.json');
  const docusaurusUtilsRequire = createRequire(docusaurusUtilsPackagePath);
  const jitiPackage = docusaurusUtilsRequire('jiti/package.json');

  if (jitiPackage['version'] !== '1.21.7') {
    throw new TypeError(`Expected Docusaurus' nested Jiti 1.21.7, received ${String(jitiPackage['version'])}.`);
  }

  const pluginConfigs = docusaurusRequire('@docusaurus/core/lib/server/plugins/configs.js');
  const loadPluginConfigs = pluginConfigs['loadPluginConfigs'];

  if (typeof loadPluginConfigs !== 'function') {
    throw new TypeError('Docusaurus did not expose its plugin configuration loader.');
  }

  const loadedPluginConfigs = await loadPluginConfigs({
    siteConfigPath: fileURLToPath(new URL('package.json', packageUrl)),
    siteConfig: {
      plugins: [],
      presets: [[
        '@cbnventures/docusaurus-preset-nova',
        {
          preset: 'foundry',
          plugins: {
            blog: false,
            pages: false,
            sitemap: false,
          },
        },
      ]],
      themes: [],
    },
  });
  const themePath = fileURLToPath(themeUrl);
  let themeConfig = undefined;

  for (const pluginConfig of loadedPluginConfigs) {
    if (pluginConfig['entryPath'] === themePath) {
      themeConfig = pluginConfig;

      break;
    }
  }

  let themeModule = undefined;

  if (themeConfig !== undefined && themeConfig['pluginModule'] !== undefined) {
    themeModule = themeConfig['pluginModule']['module'];
  }

  let themeValidateOptions = undefined;

  if (themeModule !== undefined) {
    const defaultModule = themeModule['default'];

    if (defaultModule !== undefined && defaultModule !== null) {
      themeValidateOptions = defaultModule['validateOptions'];
    }

    themeValidateOptions ??= themeModule['validateOptions'];
  }

  if (
    themeConfig === undefined
    || typeof themeConfig['plugin'] !== 'function'
    || typeof themeValidateOptions !== 'function'
  ) {
    throw new TypeError('Docusaurus did not load the preset theme and its validation exports through Jiti.');
  }

  const jitiOptions = themeValidateOptions({
    validate,
    options: {
      preset: 'foundry',
    },
  });

  if (jitiOptions['preset'] !== 'foundry' || jitiOptions['persistentCache'] !== false) {
    throw new TypeError('Docusaurus Jiti did not expose a working Joi options schema.');
  }

  return;
}

await run();
