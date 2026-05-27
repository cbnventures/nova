# @cbnventures/docusaurus-preset-nova

## 0.18.0 - 2026-05-27

### UPDATED
- Adds a `nova-loading-spinner` element to the `<Loading>` timeout and loading states for a visible spinner during route loads. Also adds `className` and `style` passthrough props for consumer customization.
- Wires the `.nova-mdx-content` class onto MDX content wrappers so the per-preset typography rhythm now applies to blog posts and standalone MDX pages (manifesto, etc.) - previously only docs got it.
- Renames the `./components` subpath export to `./blocks` to make the consumption-mode axis explicit - `theme/` houses Docusaurus swizzle targets (`@theme/X` namespace) and `blocks/` houses Nova-owned direct-import surfaces (Hero, Frame, Stats, etc.). Update consumer imports from `@cbnventures/docusaurus-preset-nova/components` to `@cbnventures/docusaurus-preset-nova/blocks`.
- Mermaid diagrams now carry per-preset identity through five tokens declared in each preset's `preset.css`: `node-radius`, `edge-stroke`, `cluster-fill`, `cluster-stroke`, `cluster-radius` (with dark-mode overrides on the color-bearing three). Marshal renders sharp 2px corners on nodes and clusters; Signal renders sharp 0; Envoy / Foundry / Lantern / Sentinel render their site-wide rounded shape. The mermaid tooltip's corner radius now tracks `--nova-mermaid-node-radius` so it matches each preset's diagram corners (Marshal and Signal sharp, others rounded). Diagram typography is hard-coded to a system-ui sans stack at 14px — decoupled from `--nova-font-body` so site-wide body-font choices cannot push diagram measurement out of sync with render. Cluster titles carry 16px breathing room above and below via `flowchart.subGraphTitleMargin`, and mermaid renders are gated on `document.fonts.ready` to pin measurement to the loaded font.
- Switches Iconify imports across Footer, blocks (Features / InstallStrip / AppMarketDownload), and SearchBar from `@iconify/react` (CDN-fetched) to `@iconify/react/offline` (statically bundled). Icons now render correctly in strict-CSP or proxied environments. Consumers using `mdi:*` icons may want to migrate to `ri:*` since the bundled collections favor `ri` / `lucide`.
- Reworks the bundled Iconify collections: removes `@iconify-json/ic` and adds `@iconify-json/logos`, `@iconify-json/openmoji`, and `@iconify-json/simple-icons`. Consumers referencing `ic:*` icons should migrate to `ri:*` / `lucide:*` or one of the newly bundled collections (brand marks via `logos:*` / `simple-icons:*`, expressive glyphs via `openmoji:*`).
- Reworks `@theme/ContentVisibility/Draft` and `@theme/ContentVisibility/Unlisted` to render as caution-styled admonitions, gaining full per-preset Admonition identity (previously bare `<div>` with no class - banner CSS was unreachable).
- Renames the preset's four internal classes (`DocusaurusThemeNova`, `Color`, `CssGenerator`, and the lib-level utility class) to the literal identifier `Runner`, matching the new path-glued class naming convention shipped in `@cbnventures/nova` 0.18.0. Type aliases across the preset migrate from glued PascalCase to underscore-separated form (e.g. `LibColorConstructorHsl` becomes `Lib_Color_Runner_Constructor_Hsl`). Direct consumers of the preset entry point are unaffected — Docusaurus loads the default export by package name, not by class identifier — but any code that imported `Color`, `CssGenerator`, or the legacy class names directly must update to `import { Runner } from '@cbnventures/docusaurus-preset-nova/...'` or use an `as` alias. Type imports from `@cbnventures/docusaurus-preset-nova` need to be updated to the new underscore-separated form; the new naming is now machine-enforced by the updated nova ESLint rules.

### FIXED
- Pins the @cbnventures/nova dependency to the neighboring package version so consumers install the matching CLI release.
- Escapes `<` in JSON-LD payloads to `\u003c` before inlining structured data into `<script type="application/ld+json">` tags on the `BlogListPage/StructuredData`, `BlogPostPage/StructuredData`, and `DocBreadcrumbs/StructuredData` swizzles, so an embedded `</script>` sequence in any string value cannot close the script element early or corrupt the JSON-LD payload.
- Emits one Open Graph `<meta>` tag per author URL and per blog tag (`article:author`, `article:tag`) on blog post pages, rather than collapsing each list into a single comma-joined value. Aligns the `BlogPostPage/Metadata` swizzle with the Open Graph protocol, which uses repeated properties to represent arrays.
- Registers `@theme/BlogSidebarMobile` in the swizzle config so consumers can `eject` or `wrap` the mobile blog sidebar variant. The implementation, types, and per-preset styles already shipped, but the swizzle registry only listed the parent `@theme/BlogSidebar`, leaving the mobile variant inaccessible through `npm run swizzle`.
- Reworks search to share a single provider between SearchBar (navbar dropdown) and SearchPage so dropdown and full-page results render the same hit data with identical highlighting and counts. Also fixes 4 long-standing bugs: SearchBar input losing focus on every keystroke, foundry SearchPage extraneous background, premature no-results flash plus mobile menu items disappearing while the worker was still running, and missing reverse animation on dropdown close.
- Closes the navbar More dropdown, locale dropdown, and docs-version dropdown when the user presses the Escape key while the panel is open. Previously only mouse click-outside dismissed the panels, leaving keyboard-only users (screen-reader, RSI, power-user keyboard navigation) without the standard `Esc`-to-dismiss gesture expected of disclosure-triggered menus.
- Maps `<a>` inside MDX bodies to `@docusaurus/Link` so internal links use SPA navigation and prefetching, no longer triggering full page reloads.
- Changes the footer copyright translate() call to use a static '{copyright}' placeholder template so docusaurus write-translations auto-extracts the theme.footer.copyright key into each consumer's i18n code.json. Runtime behavior is unchanged: the placeholder interpolates the consumer's themeConfig.footer.copyright value as the source-locale fallback, and existing locale overrides continue to render verbatim.
- Fixes anchor-link scroll position: `--nova-layout-sticky-top` is now defined per-preset (aliased from `--nova-{preset}-layout-sticky-top`) so hash-link navigation lands the heading flush with the navbar bottom on every preset (previously only signal was correct; envoy / foundry / lantern / marshal / sentinel under- or over-shot because the token was only defined in signal).

### ADDED
- Adds `themeConfig.backToTopButton: boolean` (defaults to `true`) to disable the back-to-top button site-wide.
- Adds a Mermaid tooltip handler and click-jump guard to the bundled runtime: hovering over `click X "<href>" "<tooltip>"` nodes now surfaces a styled `div.mermaidTooltip` instead of the native browser tooltip, and clicking nodes with placeholder anchors (`xlink:href="#"`) no longer scrolls the page to the top. Real URLs in the `click` directive still navigate normally. Auto-registered via the preset; no consumer wiring needed. Renames the SVG wrapper class from `.docusaurus-mermaid-container` to `.nova-mermaid-container` for cross-component class naming consistency — sites that targeted the old class in custom CSS should update their selector.
- External anchors that open in a new tab now append a screen-reader-only "(opens in new tab)" label for assistive-tech users. Visual appearance is unchanged. Exposed as the `@theme/IconExternalLink` swizzle so consumers can override the announcement or wrapper element.
- Adds the `lantern` and `marshal` presets - Lantern is a warm-perimeter design system for Homebridge plugin docs (Bridge navbar with amber underline glow, Commons footer), and Marshal is a documentary design system for GitHub Action docs (Canopy navbar styled as a centered serif letterhead, Ledger footer styled as a colophon). Extends the `NovaPresetName` type union to include both new presets.
- Adds an optional `onToggle(isOpen)` callback to the `@theme/Details` component that fires when the user clicks the disclosure summary, allowing parent components to keep external state in sync with manual interactions. Also corrects an inverted initial-state bug that caused a brief flash of the wrong open state on first render when `open` was passed as a prop.
- Adds `themeConfig.errorPages.{notFound, errorPageContent, error}` so consumers can customize copy on the 404 / route-error / error-boundary surfaces. Each accepts optional overrides for `title`, `description`, retry/back-home labels.
- Adds Arabic and Simplified Chinese translations for the 45 remaining theme.* keys the preset emits (admonition labels, code-block buttons, content-visibility banners, sidebar and breadcrumb aria labels, last-updated formatters, and others), bringing per-locale coverage of preset-owned keys to 100%.
- Splits `@theme/ContentFooter` into per-section swizzle targets so consumers can override individual rows without re-implementing the rest of the footer: `@theme/ContentFooter/Edit` (last-updated stamp plus edit-this-page link), `@theme/ContentFooter/Tags`, `@theme/ContentFooter/Share`, and `@theme/ContentFooter/ShareButton`.
- Adds the `Frame` block at `@cbnventures/docusaurus-preset-nova/blocks` for wrapping figures with a caption. Renders `<figure>` + `<figcaption>` with per-preset framing identity (radius, border, shadow, caption typography) and `className`/`style` passthrough.
- Adds the `@theme/Logo` swizzle that consolidates wordmark, square src, and text-title rendering for the navbar and footer brand. Defaults to wordmark-first; pass `iconFirst` to flip the priority. Honors `srcDark` / `wordmarkDark` for dark-mode swaps via the standard `nova-brand-light` / `nova-brand-dark` classes.
- Adds typed swizzle implementations for `@theme/Blog/Components/Author` (author byline used in post headers and list cards), `@theme/Blog/Components/Author/Socials` (per-author social icon row sourced from `authors.yml`), `@theme/BlogPostPage/Metadata` (canonical metadata tags for the active post), `@theme/BlogPostPage/StructuredData` (per-post JSON-LD `BlogPosting` schema), and `@theme/BlogListPage/StructuredData` (JSON-LD `Blog` schema for index, tag, and author pages). All five surfaces ship as swizzle targets with full type declarations.
- Inline navbar items that no longer fit the available width now collapse into a trailing "More" dropdown on the Bridge, Canopy, and Compass navbar variants. The dropdown mirrors the locale-dropdown chrome (outside-click close, open-state parity).
- Doc pages now emit a JSON-LD `BreadcrumbList` schema in `<head>` derived from the sidebar breadcrumb trail. Enables Google to render breadcrumb chips directly in search results. Exposed as the `@theme/DocBreadcrumbs/StructuredData` swizzle for consumers that need to override the schema shape.
- Adds `showHeader` and `header` props to `<BlogLayout>` so blog pages can declare a global header (replaces the prior TOC-detection heuristic for showing the blog banner).
- Adds `themeConfig.blog.share.platforms` to render a share-buttons row under each blog post. Accepts any subset of `x`, `facebook`, `linkedin`, `reddit`, and `copy`. Buttons render in the blog content footer alongside the existing tags and edit row.
- Adds the `@theme/Showcase` theme component for block showcase pages. Use `<Showcase layoutDescription description>` with `<Showcase.Item title>` children to render a responsive intro card (column layout with the toggle below the description on mobile, side-by-side on desktop) plus a controlled-disclosure list whose Expand / Collapse All button reflects the actual open state of every item - including manual user toggles.

### REMOVED
- Removes the `@theme/DocVersionBadge` swizzle and the inline non-latest-version badge it rendered. The same "you are viewing an older version" cue is already surfaced by `@theme/DocVersionBanner` at the top of each older-version doc; consumers that swizzled `DocVersionBadge` should drop the swizzle and rely on the banner.

## 0.17.0 - 2026-04-23

No changes

## 0.16.2 - 2026-04-21

### FIXED
- Code segments inside mermaid node and edge labels (written with backticks in the diagram source) now render in the site's `fonts.code` family; previously they used the body font
- Mermaid node and cluster corner radius now follows the site's `shape.radius` preset config (`sharp`, `rounded`, `pill`); previously the radius was hardcoded to 8px on nodes and 12px on clusters regardless of the active preset or user overrides
- Mermaid flowchart spacing — padding between node borders and labels, horizontal node spacing, and rank spacing — now scales with the site's `shape.density` preset config; previously every density rendered at the comfortable default
- Mermaid cluster titles (subgraph headers) now render in the site's `fonts.display` family; previously they fell back to the body font, ignoring any display font override

### ADDED
- Mermaid diagrams now center horizontally within their container when narrower than the content column; wider diagrams still scroll horizontally as before
- Mermaid diagrams now render with consistent vertical spacing above and below so they no longer butt up against adjacent paragraphs or headings

## 0.16.1 - 2026-04-21

No changes

## 0.16.0 - 2026-04-20

### FIXED
- Mermaid labels containing list markers (lines starting with `-`, `*`, or `+`) no longer render as the literal text "Unsupported markdown: list"; upgrading mermaid from 11.0.0 to 11.14.0 adopts the upstream fallback that shows the original label text instead
- Mermaid hover tooltips (used by diagrams with `click` callbacks) now render in Nova's design language with light and dark variants, and no longer add a stray invisible element to the bottom of the page that inflated scroll height
- Clickable mermaid nodes (declared via `click` directives) no longer render with a hyperlink underline and primary color; they now inherit their node styling so the diagram reads consistently, with the cursor and tooltip signaling interactivity
- Mobile table of contents now nests sub-headings under their parent headings and respects `toc_min_heading_level` / `toc_max_heading_level` front matter, matching the desktop TOC behavior shipped in 0.15.4
- Table of contents (desktop and mobile) now renders JSX and HTML inside heading values as HTML instead of literal text, so headings with inline components show the component's inner text in the TOC instead of the raw `<Component>` tags
- Details summary icon and text now render on the same row when the summary mixes an SVG with text; previously an SVG's default block display forced the text onto the next line

### ADDED
- Headings now show a `#` hash-link on hover or keyboard focus; clicking it copies a direct URL to the section, matching the familiar Docusaurus convention

## 0.15.4 - 2026-04-19

### FIXED
- Mermaid flowchart node labels were blank because the default strict security level let DOMPurify strip HTML inside foreignObject; the render config now sets securityLevel to loose, matching @docusaurus/theme-mermaid
- Table of contents rendered every heading at the top level because the flat MDX headings were never treeified; the component now builds a heading tree and filters by minHeadingLevel / maxHeadingLevel before rendering
- BlogPreview on the homepage was empty after a cold production build because the preset read docs and blog data from .docusaurus/ before those plugins had finished writing it; data is now sourced in allContentLoaded

## 0.15.3 - 2026-04-19

No changes

## 0.15.2 - 2026-04-19

### FIXED
- Preset logo assets missing from published npm package

## 0.15.1 - 2026-04-19

No changes

## 0.15.0 - 2026-04-18

### ADDED
- Mermaid diagram rendering
- RTL language support via rtlcss
- Reusable components including Hero, Features, Blog Preview, Install Strip, App Market Download, Spotlight, Stats, Terminology, and Typewriter
- Motion speed levels (none/subtle/normal/expressive) with staggered reveal animations
- SEO-optimized sitemap and Google Tag Manager plugin integration
- Layout variants for navbar (bridge/canopy/monolith/compass) and footer (commons/embassy/ledger/launchpad)
- Shape radius (sharp/rounded/pill) and density (compact/comfortable/spacious) customization
- CSS generation from design tokens
- Depth styling for cards (flat/elevated/glass) and code blocks (flat/bordered/elevated)
- Progress bar for page transitions
- Client-side full-text search with lunr indexing, Web Worker processing, and CJK support
- Internationalization support with English locale
- Shiki syntax highlighting with theme support
- Sandpack code playground for interactive examples
- Theme color schemes for Envoy, Foundry, Sentinel, and Signal
