---
package: "@cbnventures/docusaurus-preset-nova"
category: fixed
bump: patch
---

Changes the footer copyright translate() call to use a static '{copyright}' placeholder template so docusaurus write-translations auto-extracts the theme.footer.copyright key into each consumer's i18n code.json. Runtime behavior is unchanged: the placeholder interpolates the consumer's themeConfig.footer.copyright value as the source-locale fallback, and existing locale overrides continue to render verbatim.
