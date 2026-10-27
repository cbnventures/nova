import {
  BlogPreview,
  Features,
  Hero,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import type {
  Pages_Index_Home_BlogEnabled,
  Pages_Index_Home_Returns,
} from '../types/pages/index.d.ts';

/**
 * Pages - Blog Enabled.
 *
 * Keeps the preset-native blog preview aligned with the content model selected
 * when Nova generated this documentation workspace.
 *
 * @since 0.0.0
 */
const blogEnabled: Pages_Index_Home_BlogEnabled = Boolean([__DOCUSAURUS_CONTENT__]);

/**
 * Pages - Home.
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
        eyebrow={translate({
          id: 'homepage.hero.eyebrow',
          message: 'Nova × Docusaurus',
        })}
        heading={translate({
          id: 'homepage.hero.heading',
          message: 'Docusaurus starts here.',
        })}
        tagline={translate({
          id: 'homepage.hero.tagline',
          message: 'A documentation workspace with a cohesive Nova preset, strict checks, local search, and room to grow.',
        })}
        ctaLabel={translate({
          id: 'homepage.hero.ctaLabel',
          message: 'Read the introduction',
        })}
        ctaLink="/docs/intro"
        secondaryCtaLabel={translate({
          id: 'homepage.hero.secondaryCtaLabel',
          message: 'Read Nova Docs',
        })}
        secondaryCtaLink="https://nova.cbnventures.io/docs/quickstart/"
      />
      <main id="components">
        <Stats
          heading={translate({
            id: 'homepage.stats.heading',
            message: 'Ready from the first build',
          })}
          description={translate({
            id: 'homepage.stats.description',
            message: 'The generated workspace demonstrates the preset instead of leaving its most useful surfaces empty.',
          })}
          surface="alt"
          items={[
            {
              value: '6',
              label: translate({
                id: 'homepage.stats.visualPresets',
                message: 'Visual presets',
              }),
              color: 'primary',
            },
            {
              value: '1',
              label: translate({
                id: 'homepage.stats.localSearchIndex',
                message: 'Local search index',
              }),
              color: 'accent',
            },
            {
              value: '0',
              label: translate({
                id: 'homepage.stats.swizzlesRequired',
                message: 'Swizzles required',
              }),
              color: 'primary',
            },
            {
              value: '100%',
              label: translate({
                id: 'homepage.stats.typescriptConfigured',
                message: 'TypeScript configured',
              }),
              color: 'accent',
            },
          ]}
        />
        <Features
          heading={translate({
            id: 'homepage.features.heading',
            message: 'A complete documentation starting point',
          })}
          items={[
            {
              icon: 'lucide:pencil',
              title: translate({
                id: 'homepage.features.write.title',
                message: 'Write',
              }),
              description: translate({
                id: 'homepage.features.write.description',
                message: 'Start with the sample guides and grow the sidebar around the way your readers think.',
              }),
            },
            {
              icon: 'lucide:compass',
              title: translate({
                id: 'homepage.features.navigate.title',
                message: 'Navigate',
              }),
              description: translate({
                id: 'homepage.features.navigate.description',
                message: 'Use the populated navbar, footer, search, and sidebar as a real information architecture.',
              }),
            },
            {
              icon: 'lucide:rocket',
              title: translate({
                id: 'homepage.features.publish.title',
                message: 'Publish',
              }),
              description: translate({
                id: 'homepage.features.publish.description',
                message: 'Build the same optimized and searchable documentation site Nova validates locally and in automation.',
              }),
            },
          ]}
        />
        {(blogEnabled === true) && (
          <BlogPreview
            heading={translate({
              id: 'homepage.blog.heading',
              message: 'From the starter blog',
            })}
            description={translate({
              id: 'homepage.blog.description',
              message: 'The most recent posts appear automatically when the docs-and-blog content model is selected.',
            })}
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
