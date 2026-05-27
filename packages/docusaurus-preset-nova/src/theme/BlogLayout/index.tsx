import { useThemeConfig } from '@docusaurus/theme-common';
import BlogSidebar from '@theme/BlogSidebar';
import BlogSidebarMobile from '@theme/BlogSidebarMobile';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import type {
  Theme_BlogLayout_Index_BlogLayout_BlogConfig,
  Theme_BlogLayout_Index_BlogLayout,
  Theme_BlogLayout_Index_BlogLayout_HasSidebar,
  Theme_BlogLayout_Index_BlogLayout_HasToc,
  Theme_BlogLayout_Index_BlogLayout_MainClassName,
  Theme_BlogLayout_Index_BlogLayout_Props,
  Theme_BlogLayout_Index_BlogLayout_ShowHeader,
  Theme_BlogLayout_Index_BlogLayout_ThemeConfig,
  Theme_BlogLayout_Index_BlogLayout_ThemeConfigCast,
} from '../../types/theme/BlogLayout/index.d.ts';

/**
 * Theme - Blog Layout - Blog Layout.
 *
 * Replaces the default Docusaurus BlogLayout with a version that
 * renders a page-level header (opt-in via `showHeader`, content
 * overridable via `header`) above the main column.
 *
 * @param {Theme_BlogLayout_Index_BlogLayout_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlogLayout(props: Theme_BlogLayout_Index_BlogLayout_Props) {
  const themeConfig: Theme_BlogLayout_Index_BlogLayout_ThemeConfig = useThemeConfig() as Theme_BlogLayout_Index_BlogLayout_ThemeConfigCast as Theme_BlogLayout_Index_BlogLayout_ThemeConfig;
  const blogConfig: Theme_BlogLayout_Index_BlogLayout_BlogConfig = themeConfig['blog'] as Theme_BlogLayout_Index_BlogLayout_BlogConfig;
  const blogLayoutConfig: Theme_BlogLayout_Index_BlogLayout = blogConfig['layout'] as Theme_BlogLayout_Index_BlogLayout_ThemeConfigCast as Theme_BlogLayout_Index_BlogLayout;

  const hasSidebar: Theme_BlogLayout_Index_BlogLayout_HasSidebar = (
    props['sidebar'] !== undefined
    && props['sidebar']['items']['length'] > 0
  );
  const hasToc: Theme_BlogLayout_Index_BlogLayout_HasToc = props['toc'] !== undefined;
  const showHeader: Theme_BlogLayout_Index_BlogLayout_ShowHeader = props['showHeader'] === true;

  let mainClassName: Theme_BlogLayout_Index_BlogLayout_MainClassName = 'nova-col-12';

  if (hasSidebar === true) {
    mainClassName = 'nova-col-12 nova-col-lg-9';
  }

  return (
    <Layout>
      <div
        className={(props['className'] !== undefined) ? `nova-blog-root ${props['className']}` : 'nova-blog-root'}
        style={props['style']}
      >
        <div className="nova-container nova-grid">
          {(hasSidebar === true) && (
            <aside className="nova-col-12 nova-col-lg-3">
              <BlogSidebar sidebar={props['sidebar']} />
            </aside>
          )}
          <main className={mainClassName}>
            {(showHeader === true) && (
              <header className="nova-blog-header">
                {(props['header'] !== undefined) ? (
                  props['header']
                ) : (
                  <>
                    <Heading as="h1">
                      {blogLayoutConfig['heading']}
                    </Heading>
                    <p className="nova-blog-description">
                      {blogLayoutConfig['description']}
                    </p>
                  </>
                )}
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
