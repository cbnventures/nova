# @cbnventures/docusaurus-preset-nova

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
