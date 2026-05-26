# ar Translations

This folder holds **demo-specific** translations only. Shared Nova chrome
strings (`theme.*`) live in the preset bundle and are inherited at runtime.

## Layer split

| File / Folder                                                                             | What it translates                                                                                | Source of truth |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|-----------------|
| `code.json`                                                                               | Source-code `<Translate>` calls in this demo                                                      | Demo            |
| `docusaurus-theme-nova/{navbar,footer,blog,announcementBar,errorPages}.json`              | Demo-config strings (navbar items, footer columns, blog title, etc.)                              | Demo            |
| `docusaurus-plugin-content-{docs,blog}/...`                                               | MDX frontmatter + sidebar labels                                                                  | Demo            |
| (preset bundle) `packages/docusaurus-preset-nova/translations/locales/ar/theme-nova.json` | Nova chrome (`theme.SearchBar.*`, `theme.navbar.moreLabel`, `theme.footer.creditNovaLabel`, etc.) | Preset          |
| (upstream) `@docusaurus/theme-translations/locales/ar/theme-common.json`                  | Docusaurus built-in chrome                                                                        | Docusaurus      |

## Why `code.json` is empty

Docusaurus merges code translations in this order: theme-common ->
preset `theme-nova.json` -> this `code.json`. Every `theme.*` key the
preset's components reference is already translated in the preset bundle,
so this file has nothing to add. Adding a `theme.*` override here would
fork this demo's wording from every other Nova consumer's wording, which
is exactly what the preset is supposed to prevent.

If you find a missing or wrong `theme.*` translation, edit the preset
bundle, not this file.
