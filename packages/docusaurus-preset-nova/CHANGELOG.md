# @cbnventures/docusaurus-preset-nova

## 0.19.0 - 2026-06-21

### UPDATED
- Replaces the six bundled `@iconify-json/*` collections with a build-time scan that resolves every `prefix:name` identifier a site references against the complete Iconify dataset and bundles only the icons actually used. Any Iconify icon still works by name with no per-collection install — the difference is that the client now carries the used subset instead of every icon of every collection.
- The navbar brand text now comes from the top-level `docusaurus.config.title`. Removes the redundant `themeConfig.site.title` (which was never read), `themeConfig.site.logo.title`, and the never-read `themeConfig.navbar.title`. Migration: delete those three keys from your config; for a brand that differs from the site title, use a wordmark image (`site.logo.wordmark`).

### FIXED
- Corrects the published `./types/config` declaration for `overrides.colors`, which had drifted from the validated schema: it now exposes the six light/dark categories (`primary`, `secondary`, `text`, `border`, `warning`, `danger`) the schema actually accepts, replacing the stale `primary`/`accent`/`neutral` string shape, and drops the `shape`/`depth`/`motion` override keys that were never part of the schema. Consumers typing their config against `NovaPresetOverrides` now get accurate completions and errors.
- Fixes a horizontal-scroll / blank-space-on-the-right bug on viewports narrower than the navbar item row (e.g. mobile) for the Bridge, Compass, and Canopy variants. The hidden item-measurement clone is now wrapped in a zero-size clipped container so it can no longer stretch the document width, while still measuring correctly for the `More` overflow collapse.
- Honors four search options that were validated but previously ignored: `searchResultLimits`, `fuzzyMatchingDistance`, `searchBarShortcutKeymap`, and `highlightSearchTermsOnTargetPage` now take effect. Defaults are unchanged, so existing sites behave identically unless they set these values.
- Stops embedding entire Iconify collections (~22,900 icons) in the client entry, which had grown `main.js` past Cloudflare Pages' 25 MiB per-file limit and broke the docs deploy in 0.18.0. The generated registry now holds only referenced icons, so the icon payload is a small fraction of its former size.

### ADDED
- Adds the `iconSafelist` preset option for icon identifiers built dynamically at runtime that the build-time scan cannot discover in source — listed names are always bundled.
- Adds a build-time bundle size guard — a production build now fails if any emitted JavaScript file exceeds the `maxBundleFileSize` preset option (default 3 MiB, or `false` to disable), catching bundle-size regressions before they ship rather than at deploy time.

## 0.18.0 - 2026-06-19

### UPDATED
- Renames the `./components` subpath export to `./blocks` to make the consumption-mode axis explicit: `theme/` holds Docusaurus swizzle targets (`@theme/X`) and `blocks/` holds Nova-owned direct-import surfaces (Hero, Frame, Stats, etc.). Update consumer imports from `@cbnventures/docusaurus-preset-nova/components` to `.../blocks`.
- Renames the preset's four internal classes (the theme entry, `Color`, `CssGenerator`, and the lib utility) to the literal `Runner`, matching nova 0.18.0's convention, and migrates type aliases to the underscore form (e.g. `LibColorConstructorHsl` becomes `Lib_Color_Runner_Constructor_Hsl`). These classes are internal — Docusaurus consumes the preset through its default export by package name (plus the `./theme` and `./blocks` subpaths), so the rename is invisible to consumers; the renamed identifiers do surface in the published `./types/theme` and `./types/config` declarations.
- Reworks the bundled Iconify collections: removes `@iconify-json/ic` and adds `@iconify-json/logos`, `@iconify-json/openmoji`, and `@iconify-json/simple-icons`. Consumers referencing `ic:*` icons should migrate to `ri:*` / `lucide:*` or one of the new collections (brand marks via `logos:*` / `simple-icons:*`, expressive glyphs via `openmoji:*`).
- Gives Mermaid diagrams per-preset identity through five `preset.css` tokens (`node-radius`, `edge-stroke`, `cluster-fill`, `cluster-stroke`, `cluster-radius`, with dark-mode overrides on the color tokens): Marshal and Signal render sharp corners, the other presets rounded, and the tooltip radius tracks `--nova-mermaid-node-radius`. Diagram typography is pinned to a 14px system-sans stack (decoupled from `--nova-font-body`), and renders gate on `document.fonts.ready` so font loading can't push measurement out of sync.
- Wires the `.nova-mdx-content` class onto MDX content wrappers so the per-preset typography rhythm now applies to blog posts and standalone MDX pages, not just docs.
- Reworks `@theme/ContentVisibility/Draft` and `@theme/ContentVisibility/Unlisted` to render as caution-styled admonitions, gaining full per-preset Admonition identity (previously a bare `<div>` whose banner CSS was unreachable).
- Adds a `nova-loading-spinner` element to the `<Loading>` timeout and loading states for a visible spinner during route loads, plus `className` / `style` passthrough props for consumer customization.

### FIXED
- Pins the `@cbnventures/nova` dependency to the neighboring package version so consumers install the matching CLI release.
- Reworks search to share one provider between SearchBar (navbar dropdown) and SearchPage, so dropdown and full-page results render the same hits with identical highlighting and counts. Also fixes four long-standing bugs: SearchBar losing input focus on every keystroke, a stray foundry SearchPage background, a premature no-results flash (with mobile menu items vanishing while the worker was still running), and a missing reverse animation on dropdown close.
- Strips `baseUrl` from each route when resolving search-index HTML paths, so non-default locales (e.g. `/ja/`) no longer double-prefix the locale and miss every HTML file while indexing.
- Pre-loads the `lunr-languages/tinyseg` module for Japanese (`ja` / `jp`) before the language loader runs, fixing the `TypeError: lunr.TinySegmenter is not a constructor` crash when building a Japanese search index.
- Resolves the lunr multi-language and per-language plugins from `lunr` instead of the Builder instance, fixing the `Cannot read properties of undefined (reading 'apply')` crash when indexing non-English locales.
- Closes the navbar More, locale, and docs-version dropdowns on `Esc` while open; previously only an outside click dismissed them, leaving keyboard-only users without the standard dismiss gesture.
- Registers `@theme/BlogSidebarMobile` in the swizzle config so consumers can `eject` or `wrap` the mobile blog sidebar — the implementation, types, and styles already shipped, but only the parent `@theme/BlogSidebar` was registered, leaving the mobile variant unreachable via `npm run swizzle`.
- Maps `<a>` inside MDX bodies to `@docusaurus/Link` so internal links use SPA navigation and prefetching instead of full page reloads.
- Changes the footer copyright `translate()` call to a static `'{copyright}'` placeholder so `docusaurus write-translations` extracts the `theme.footer.copyright` key into each consumer's `code.json`. Runtime is unchanged: the placeholder interpolates the consumer's `themeConfig.footer.copyright` as the source-locale fallback, and locale overrides still render verbatim.
- Fixes anchor-link scroll position so the target heading lands flush below the navbar on every preset. `--nova-layout-sticky-top` is now defined per-preset (aliased from `--nova-{preset}-layout-sticky-top`) so the offset is correct at first paint; previously it was resolved only at runtime, so SSR / first-paint hash navigation under- or over-shot.

### ADDED
- Adds the `lantern` and `marshal` presets — Lantern is a warm-perimeter design system for Homebridge plugin docs (Bridge navbar with an amber underline glow, Commons footer), and Marshal is a documentary design system for GitHub Action docs (Canopy navbar as a centered serif letterhead, Ledger footer as a colophon). Extends the `NovaPresetName` union with both.
- Adds typed blog-authoring and SEO swizzles: `@theme/Blog/Components/Author` and `.../Author/Socials` (author byline and per-author social row from `authors.yml`); `@theme/BlogPostPage/Metadata` (canonical tags plus one Open Graph `<meta>` per author URL and per tag, rather than a single comma-joined value); and `@theme/BlogPostPage/StructuredData` + `@theme/BlogListPage/StructuredData` (per-post `BlogPosting` and index/tag/author `Blog` JSON-LD). All StructuredData payloads unicode-escape `<` so an embedded `</script>` in any value can't close the script tag early.
- Adds the `@theme/DocBreadcrumbs/StructuredData` swizzle, emitting a JSON-LD `BreadcrumbList` derived from the sidebar trail so Google can render breadcrumb chips in search results (consumers can override the schema shape).
- Adds the `@theme/Logo` swizzle consolidating wordmark, square src, and text-title rendering for the navbar and footer brand. Defaults to wordmark-first; pass `iconFirst` to flip the priority. Honors `srcDark` / `wordmarkDark` for dark-mode swaps via the standard `nova-brand-light` / `nova-brand-dark` classes.
- Adds the `@theme/Showcase` component for block showcase pages: `<Showcase layoutDescription description>` with `<Showcase.Item title>` children renders a responsive intro card plus a controlled-disclosure list whose Expand / Collapse All button reflects the actual open state of every item, including manual toggles.
- Adds the `Frame` block at `@cbnventures/docusaurus-preset-nova/blocks` for wrapping figures with a caption: renders `<figure>` + `<figcaption>` with per-preset framing identity (radius, border, shadow, caption typography) and `className` / `style` passthrough.
- Splits `@theme/ContentFooter` into per-section swizzle targets so consumers can override individual rows: `@theme/ContentFooter/Edit` (last-updated stamp plus edit-this-page link), `.../Tags`, `.../Share`, and `.../ShareButton`.
- Adds `themeConfig.blog.share.platforms` to render a share-buttons row under each blog post, accepting any subset of `x`, `facebook`, `linkedin`, `reddit`, and `copy`.
- Adds `showHeader` and `header` props to `<BlogLayout>` so blog pages can declare a global header (replacing the prior TOC-detection heuristic for the blog banner).
- Adds a Mermaid tooltip handler and click-jump guard to the bundled runtime: hovering a `click X "<href>" "<tooltip>"` node surfaces a styled `div.mermaidTooltip` instead of the native browser tooltip, and clicking a placeholder anchor (`xlink:href="#"`) no longer jumps to the top; real URLs still navigate. Auto-registered by the preset. Renames the SVG wrapper class from `.docusaurus-mermaid-container` to `.nova-mermaid-container` — update any custom CSS that targeted the old class.
- Collapses inline navbar items that no longer fit into a trailing "More" dropdown on the Bridge, Canopy, and Compass variants, mirroring the locale-dropdown chrome (outside-click close, open-state parity).
- Appends a screen-reader-only "(opens in new tab)" label to external anchors that open in a new tab; visual appearance is unchanged. Exposed as the `@theme/IconExternalLink` swizzle.
- Adds an optional `onToggle(isOpen)` callback to `@theme/Details` that fires when the user clicks the disclosure summary, and corrects an inverted initial-state bug that briefly flashed the wrong open state on first render.
- Adds `themeConfig.errorPages.{notFound, errorPageContent, error}` so consumers can customize the 404 / route-error / error-boundary copy (each accepts optional `title`, `description`, and retry/back-home labels).
- Adds `themeConfig.backToTopButton: boolean` (default `true`) to disable the back-to-top button site-wide.
- Adds Arabic and Simplified Chinese translations for all 168 `theme.*` keys the preset emits (admonition labels, code-block buttons, content-visibility banners, sidebar and breadcrumb aria labels, last-updated formatters, and the rest), bringing both locales to full coverage of preset-owned keys.

### REMOVED
- Removes the `@theme/DocVersionBadge` swizzle and its inline non-latest-version badge; the same "you are viewing an older version" cue is already shown by `@theme/DocVersionBanner` at the top of older-version docs, so consumers that swizzled `DocVersionBadge` should drop it and rely on the banner.

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
