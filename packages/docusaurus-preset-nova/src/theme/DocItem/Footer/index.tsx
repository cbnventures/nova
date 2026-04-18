import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useThemeConfig } from '@docusaurus/theme-common';
import ContentFooter from '@theme/ContentFooter';

import type {
  ThemeDocItemFooterDocItemFooterBlogShareConfig,
  ThemeDocItemFooterDocItemFooterCanDisplayEditMetaRow,
  ThemeDocItemFooterDocItemFooterCanDisplayFooter,
  ThemeDocItemFooterDocItemFooterCanDisplayTagsRow,
  ThemeDocItemFooterDocItemFooterContentFooterSpread,
  ThemeDocItemFooterDocItemFooterDoc,
  ThemeDocItemFooterDocItemFooterSharePlatforms,
  ThemeDocItemFooterDocItemFooterShareUrl,
  ThemeDocItemFooterDocItemFooterThemeConfig,
  ThemeDocItemFooterDocItemFooterThemeConfigCast,
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
function DocItemFooter() {
  const doc: ThemeDocItemFooterDocItemFooterDoc = useDoc();
  const canDisplayTagsRow: ThemeDocItemFooterDocItemFooterCanDisplayTagsRow = doc['metadata']['tags']['length'] > 0;
  const canDisplayEditMetaRow: ThemeDocItemFooterDocItemFooterCanDisplayEditMetaRow = (
    doc['metadata']['editUrl'] !== undefined
    || doc['metadata']['lastUpdatedAt'] !== undefined
    || doc['metadata']['lastUpdatedBy'] !== undefined
  );
  const themeConfig: ThemeDocItemFooterDocItemFooterThemeConfig = useThemeConfig() as ThemeDocItemFooterDocItemFooterThemeConfigCast as ThemeDocItemFooterDocItemFooterThemeConfig;
  const blogShareConfig: ThemeDocItemFooterDocItemFooterBlogShareConfig = themeConfig['blog'] as ThemeDocItemFooterDocItemFooterBlogShareConfig;
  let sharePlatforms: ThemeDocItemFooterDocItemFooterSharePlatforms = [];

  if (
    blogShareConfig !== undefined
    && blogShareConfig['share'] !== undefined
    && blogShareConfig['share']['platforms'] !== undefined
  ) {
    sharePlatforms = blogShareConfig['share']['platforms'];
  }
  const shareUrl: ThemeDocItemFooterDocItemFooterShareUrl = (typeof window !== 'undefined') ? window['location']['href'] : '';
  const canDisplayFooter: ThemeDocItemFooterDocItemFooterCanDisplayFooter = (
    canDisplayTagsRow === true
    || canDisplayEditMetaRow === true
    || sharePlatforms['length'] > 0
  );

  if (canDisplayFooter !== true) {
    return undefined;
  }

  const contentFooterSpread: ThemeDocItemFooterDocItemFooterContentFooterSpread = {};

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
    <footer className="nova-doc-footer">
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
