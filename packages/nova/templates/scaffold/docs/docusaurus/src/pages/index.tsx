import {
  BlogPreview,
  Features,
  Hero,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import Layout from '@theme/Layout';

import type {
  Pages_Index_Home_BlogEnabled,
  Pages_Index_Home_Returns,
} from '../types/pages/index.d.ts';

/**
 * Index - Blog Enabled.
 *
 * Keeps the preset-native blog preview aligned with the content model selected
 * when Nova generated this documentation workspace.
 *
 * @since 0.0.0
 */
const blogEnabled: Pages_Index_Home_BlogEnabled = Boolean([__DOCUSAURUS_CONTENT__]);

/**
 * Index - Home.
 *
 * Composes a preset-native documentation landing page without the article and
 * table-of-contents frame used by ordinary MDX pages.
 *
 * @returns {Pages_Index_Home_Returns}
 *
 * @since 0.0.0
 */
function Home(): Pages_Index_Home_Returns {
  return (
    <Layout>
      <Hero
        eyebrow="Nova × Docusaurus"
        heading="Docusaurus starts here."
        tagline="A documentation workspace with a cohesive Nova preset, strict checks, local search, and room to grow."
        ctaLabel="Read the introduction"
        ctaLink="/docs/intro"
        secondaryCtaLabel="Read Nova Docs"
        secondaryCtaLink="https://nova.cbnventures.io/docs/quickstart/"
      />
      <main id="components">
        <Stats
          heading="Ready from the first build"
          description="The generated workspace demonstrates the preset instead of leaving its most useful surfaces empty."
          surface="alt"
          items={[
            {
              value: '6',
              label: 'Visual presets',
              color: 'primary',
            },
            {
              value: '1',
              label: 'Local search index',
              color: 'accent',
            },
            {
              value: '0',
              label: 'Swizzles required',
              color: 'primary',
            },
            {
              value: '100%',
              label: 'TypeScript configured',
              color: 'accent',
            },
          ]}
        />
        <Features
          heading="A complete documentation starting point"
          items={[
            {
              icon: 'lucide:pencil',
              title: 'Write',
              description: 'Start with the sample guides and grow the sidebar around the way your readers think.',
            },
            {
              icon: 'lucide:compass',
              title: 'Navigate',
              description: 'Use the populated navbar, footer, search, and sidebar as a real information architecture.',
            },
            {
              icon: 'lucide:rocket',
              title: 'Publish',
              description: 'Build the same optimized and searchable documentation site Nova validates locally and in automation.',
            },
          ]}
        />
        {(blogEnabled === true) && (
          <BlogPreview
            heading="From the starter blog"
            description="The most recent posts appear automatically when the docs-and-blog content model is selected."
            auto={true}
            limit={3}
            sort="newest"
            surface="alt"
          />
        )}
      </main>
    </Layout>
  );
}

export default Home;
