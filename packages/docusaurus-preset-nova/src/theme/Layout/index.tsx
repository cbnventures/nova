import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
} from '@docusaurus/theme-common';
import AnnouncementBar from '@theme/AnnouncementBar';
import BackToTopButton from '@theme/BackToTopButton';
import ErrorPageContent from '@theme/ErrorPageContent';
import Footer from '@theme/Footer';
import LayoutProvider from '@theme/Layout/Provider';
import Navbar from '@theme/Navbar';
import SkipToContent from '@theme/SkipToContent';

import { useSearchHighlight } from '../../lib/search/use-search-highlight.js';

import type {
  ThemeLayoutMetadataSpread,
  ThemeLayoutProps,
} from '../../types/theme/Layout/index.d.ts';

/**
 * Theme - Layout.
 *
 * Wraps all page content in the Docusaurus provider stack with
 * skip-to-content accessibility, navigation, and footer sections,
 * without any module CSS or framework-specific class names.
 *
 * @param {ThemeLayoutProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Layout(props: ThemeLayoutProps) {
  useSearchHighlight({ enabled: true });

  const metadataSpread: ThemeLayoutMetadataSpread = {};

  if (props['title'] !== undefined) {
    Reflect.set(metadataSpread, 'title', props['title']);
  }

  if (props['description'] !== undefined) {
    Reflect.set(metadataSpread, 'description', props['description']);
  }

  return (
    <LayoutProvider>
      <PageMetadata {...metadataSpread} />

      <SkipToContent />

      <AnnouncementBar />

      <Navbar />

      <div id={SkipToContentFallbackId}>
        <ErrorBoundary
          fallback={(params) => (
            <ErrorPageContent
              error={params['error']}
              tryAgain={params['tryAgain']}
            />
          )}
        >
          {props['children']}
        </ErrorBoundary>
      </div>

      {(props['noFooter'] !== true) && (
        <Footer />
      )}

      <BackToTopButton />
    </LayoutProvider>
  );
}

export default Layout;
