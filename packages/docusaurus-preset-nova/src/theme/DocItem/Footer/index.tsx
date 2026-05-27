import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useThemeConfig } from '@docusaurus/theme-common';
import ContentFooter from '@theme/ContentFooter';

import type {
  Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayEditMetaRow,
  Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayFooter,
  Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayTagsRow,
  Theme_DocItem_Footer_Index_DocItemFooter_ContentFooterSpread,
  Theme_DocItem_Footer_Index_DocItemFooter_Doc,
  Theme_DocItem_Footer_Index_DocItemFooter_Props,
  Theme_DocItem_Footer_Index_DocItemFooter_ShareUrl,
  Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig,
  Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog,
  Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share_Platforms,
  Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfigCast,
} from '../../../types/theme/DocItem/Footer/index.d.ts';

/**
 * Theme - Doc Item - Footer - Doc Item Footer.
 *
 * Renders a document footer with optional inline tags, social
 * share buttons, and an edit metadata row, only displaying
 * when at least one section has content.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocItemFooter(props: Theme_DocItem_Footer_Index_DocItemFooter_Props) {
  const doc: Theme_DocItem_Footer_Index_DocItemFooter_Doc = useDoc();
  const canDisplayTagsRow: Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayTagsRow = doc['metadata']['tags']['length'] > 0;
  const canDisplayEditMetaRow: Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayEditMetaRow = (
    doc['metadata']['editUrl'] !== undefined
    || doc['metadata']['lastUpdatedAt'] !== undefined
    || doc['metadata']['lastUpdatedBy'] !== undefined
  );
  const themeConfig: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig = useThemeConfig() as Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfigCast as Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig;
  const blogShareConfig: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog = themeConfig['blog'] as Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog;
  let sharePlatforms: Theme_DocItem_Footer_Index_DocItemFooter_ThemeConfig_Blog_Share_Platforms = [];

  if (
    blogShareConfig !== undefined
    && blogShareConfig['share'] !== undefined
    && blogShareConfig['share']['platforms'] !== undefined
  ) {
    sharePlatforms = blogShareConfig['share']['platforms'];
  }
  const shareUrl: Theme_DocItem_Footer_Index_DocItemFooter_ShareUrl = (typeof window !== 'undefined') ? window['location']['href'] : '';
  const canDisplayFooter: Theme_DocItem_Footer_Index_DocItemFooter_CanDisplayFooter = (
    canDisplayTagsRow === true
    || canDisplayEditMetaRow === true
    || sharePlatforms['length'] > 0
  );

  if (canDisplayFooter !== true) {
    return undefined;
  }

  const contentFooterSpread: Theme_DocItem_Footer_Index_DocItemFooter_ContentFooterSpread = {};

  if (doc['metadata']['editUrl'] !== undefined && doc['metadata']['editUrl'] !== null) {
    Reflect.set(contentFooterSpread, 'editUrl', doc['metadata']['editUrl']);
  }

  if (doc['metadata']['lastUpdatedAt'] !== undefined && doc['metadata']['lastUpdatedAt'] !== null) {
    Reflect.set(contentFooterSpread, 'lastUpdatedAt', doc['metadata']['lastUpdatedAt']);
  }

  if (doc['metadata']['lastUpdatedBy'] !== undefined && doc['metadata']['lastUpdatedBy'] !== null) {
    Reflect.set(contentFooterSpread, 'lastUpdatedBy', doc['metadata']['lastUpdatedBy']);
  }

  return (
    <footer
      className={(props['className'] !== undefined) ? `nova-doc-footer ${props['className']}` : 'nova-doc-footer'}
      style={props['style']}
    >
      <ContentFooter
        tags={doc['metadata']['tags']}
        sharePlatforms={sharePlatforms}
        shareUrl={shareUrl}
        {...contentFooterSpread}
      />
    </footer>
  );
}

export default DocItemFooter;
