import { useThemeConfig } from '@docusaurus/theme-common';
import BlogSidebar from '@theme/BlogSidebar';
import BlogSidebarMobile from '@theme/BlogSidebarMobile';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import type {
  ThemeBlogLayoutBlogConfig,
  ThemeBlogLayoutBlogLayout,
  ThemeBlogLayoutHasSidebar,
  ThemeBlogLayoutHasToc,
  ThemeBlogLayoutMainClassName,
  ThemeBlogLayoutProps,
  ThemeBlogLayoutThemeConfig,
  ThemeBlogLayoutThemeConfigCast,
} from '../../types/theme/BlogLayout/index.d.ts';

/**
 * Theme - Blog Layout - Blog Layout.
 *
 * Replaces the default Docusaurus BlogLayout with a version that
 * adds a prominent display heading and description above the blog
 * post list with responsive container spacing.
 *
 * @param {ThemeBlogLayoutProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogLayout(props: ThemeBlogLayoutProps) {
  const themeConfig: ThemeBlogLayoutThemeConfig = useThemeConfig() as ThemeBlogLayoutThemeConfigCast as ThemeBlogLayoutThemeConfig;
  const blogConfig: ThemeBlogLayoutBlogConfig = themeConfig['blog'] as ThemeBlogLayoutBlogConfig;
  const blogLayoutConfig: ThemeBlogLayoutBlogLayout = blogConfig['layout'] as ThemeBlogLayoutThemeConfigCast as ThemeBlogLayoutBlogLayout;

  const hasSidebar: ThemeBlogLayoutHasSidebar = (
    props['sidebar'] !== undefined
    && props['sidebar']['items']['length'] > 0
  );
  const hasToc: ThemeBlogLayoutHasToc = props['toc'] !== undefined;

  let mainClassName: ThemeBlogLayoutMainClassName = 'nova-col-12';

  if (hasSidebar === true) {
    mainClassName = 'nova-col-12 nova-col-lg-9';
  }

  return (
    <Layout>
      <div className="nova-blog-root">
        <div className="nova-container nova-grid">
          {(hasSidebar === true) && (
            <aside className="nova-col-12 nova-col-lg-3">
              <BlogSidebar sidebar={props['sidebar']} />
            </aside>
          )}
          <main className={mainClassName}>
            {(hasToc === false) && (
              <header className="nova-blog-header">
                <Heading as="h1">
                  {blogLayoutConfig['heading']}
                </Heading>
                <p className="nova-blog-description">
                  {blogLayoutConfig['description']}
                </p>
              </header>
            )}
            <BlogSidebarMobile sidebar={props['sidebar']} />
            {(hasToc === true) && (
              <div className="nova-grid">
                <div className="nova-col-12 nova-col-lg-9">
                  {props['children']}
                </div>
                <div className="nova-blog-toc-column nova-col-12 nova-col-lg-3">
                  {props['toc']}
                </div>
              </div>
            )}
            {(hasToc === false) && (
              props['children']
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default BlogLayout;
