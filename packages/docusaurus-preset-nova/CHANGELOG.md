# @cbnventures/docusaurus-preset-nova

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
