import type {
  LibTranslationsApplyAnnouncementBarAnnouncementBar,
  LibTranslationsApplyAnnouncementBarMessage,
  LibTranslationsApplyAnnouncementBarReturns,
  LibTranslationsApplyAnnouncementBarTranslations,
  LibTranslationsApplyAnnouncementBarTranslationsParam,
  LibTranslationsApplyAnnouncementBarValue,
  LibTranslationsApplyBlogBlog,
  LibTranslationsApplyBlogDescriptionMessage,
  LibTranslationsApplyBlogHeadingMessage,
  LibTranslationsApplyBlogLayout,
  LibTranslationsApplyBlogReturns,
  LibTranslationsApplyBlogTranslations,
  LibTranslationsApplyBlogTranslationsParam,
  LibTranslationsApplyBlogValue,
  LibTranslationsApplyClonedThemeConfig,
  LibTranslationsApplyErrorPagesError,
  LibTranslationsApplyErrorPagesErrorPageContent,
  LibTranslationsApplyErrorPagesErrorPages,
  LibTranslationsApplyErrorPagesMessage,
  LibTranslationsApplyErrorPagesNotFound,
  LibTranslationsApplyErrorPagesReturns,
  LibTranslationsApplyErrorPagesTranslations,
  LibTranslationsApplyErrorPagesTranslationsParam,
  LibTranslationsApplyErrorPagesValue,
  LibTranslationsApplyFilesByPath,
  LibTranslationsApplyFooterCta,
  LibTranslationsApplyFooterCtaObject,
  LibTranslationsApplyFooterFooter,
  LibTranslationsApplyFooterLayout,
  LibTranslationsApplyFooterLayoutSlot,
  LibTranslationsApplyFooterMessage,
  LibTranslationsApplyFooterReturns,
  LibTranslationsApplyFooterSectionLink,
  LibTranslationsApplyFooterSectionLinks,
  LibTranslationsApplyFooterSections,
  LibTranslationsApplyFooterTranslations,
  LibTranslationsApplyFooterTranslationsParam,
  LibTranslationsApplyFooterValue,
  LibTranslationsApplyNavbarChild,
  LibTranslationsApplyNavbarChildren,
  LibTranslationsApplyNavbarItem,
  LibTranslationsApplyNavbarItems,
  LibTranslationsApplyNavbarMessage,
  LibTranslationsApplyNavbarNavbar,
  LibTranslationsApplyNavbarReturns,
  LibTranslationsApplyNavbarTranslations,
  LibTranslationsApplyNavbarTranslationsParam,
  LibTranslationsApplyNavbarValue,
  LibTranslationsApplyParams,
  LibTranslationsApplyReturns,
  LibTranslationsApplyThemeConfig,
  LibTranslationsApplyTranslationFiles,
  LibTranslationsExtractAnnouncementBarAnnouncementBar,
  LibTranslationsExtractAnnouncementBarConfig,
  LibTranslationsExtractAnnouncementBarContent,
  LibTranslationsExtractAnnouncementBarContentValue,
  LibTranslationsExtractAnnouncementBarReturns,
  LibTranslationsExtractBlogBlog,
  LibTranslationsExtractBlogConfig,
  LibTranslationsExtractBlogContent,
  LibTranslationsExtractBlogDescriptionValue,
  LibTranslationsExtractBlogFileContent,
  LibTranslationsExtractBlogHeadingValue,
  LibTranslationsExtractBlogLayout,
  LibTranslationsExtractBlogLayoutConfig,
  LibTranslationsExtractBlogReturns,
  LibTranslationsExtractErrorPagesConfig,
  LibTranslationsExtractErrorPagesContent,
  LibTranslationsExtractErrorPagesError,
  LibTranslationsExtractErrorPagesErrorConfig,
  LibTranslationsExtractErrorPagesErrorPageContent,
  LibTranslationsExtractErrorPagesErrorPageContentConfig,
  LibTranslationsExtractErrorPagesErrorPageContentRetryLabel,
  LibTranslationsExtractErrorPagesErrorPageContentTitle,
  LibTranslationsExtractErrorPagesErrorPages,
  LibTranslationsExtractErrorPagesErrorRetryLabel,
  LibTranslationsExtractErrorPagesFileContent,
  LibTranslationsExtractErrorPagesNotFound,
  LibTranslationsExtractErrorPagesNotFoundBackHomeLabel,
  LibTranslationsExtractErrorPagesNotFoundConfig,
  LibTranslationsExtractErrorPagesNotFoundDescription,
  LibTranslationsExtractErrorPagesNotFoundTitle,
  LibTranslationsExtractErrorPagesReturns,
  LibTranslationsExtractFooterConfig,
  LibTranslationsExtractFooterContent,
  LibTranslationsExtractFooterCopyrightValue,
  LibTranslationsExtractFooterCta,
  LibTranslationsExtractFooterCtaLabelValue,
  LibTranslationsExtractFooterCtaObject,
  LibTranslationsExtractFooterFileContent,
  LibTranslationsExtractFooterFooter,
  LibTranslationsExtractFooterLayout,
  LibTranslationsExtractFooterLayoutEntries,
  LibTranslationsExtractFooterLayoutSlot,
  LibTranslationsExtractFooterLayoutSlotConfig,
  LibTranslationsExtractFooterLayoutTitleValue,
  LibTranslationsExtractFooterReturns,
  LibTranslationsExtractFooterSectionEntries,
  LibTranslationsExtractFooterSectionLink,
  LibTranslationsExtractFooterSectionLinkLabelValue,
  LibTranslationsExtractFooterSectionLinks,
  LibTranslationsExtractFooterSectionName,
  LibTranslationsExtractFooterSections,
  LibTranslationsExtractNavbarChild,
  LibTranslationsExtractNavbarChildLabelValue,
  LibTranslationsExtractNavbarChildren,
  LibTranslationsExtractNavbarConfig,
  LibTranslationsExtractNavbarContent,
  LibTranslationsExtractNavbarFileContent,
  LibTranslationsExtractNavbarItem,
  LibTranslationsExtractNavbarItems,
  LibTranslationsExtractNavbarLabelValue,
  LibTranslationsExtractNavbarNavbar,
  LibTranslationsExtractNavbarReturns,
  LibTranslationsExtractParams,
  LibTranslationsExtractResult,
  LibTranslationsExtractReturns,
  LibTranslationsExtractThemeConfig,
} from '../types/lib/translations.d.ts';

/**
 * Lib - Translations.
 *
 * Extracts translatable strings from the resolved theme configuration
 * into per-area `TranslationFile` bundles, and applies translated
 * messages back into a deep-cloned theme configuration before serving.
 *
 * @since 0.18.0
 */
export class Translations {
  /**
   * Lib - Translations - Extract.
   *
   * Walks the user-supplied theme configuration and emits one
   * `TranslationFile` per populated area (navbar, blog, announcementBar,
   * errorPages, footer) with stable message IDs and source-language defaults.
   *
   * @param {LibTranslationsExtractParams} params - Params.
   *
   * @returns {LibTranslationsExtractReturns}
   *
   * @since 0.18.0
   */
  public static extract(params: LibTranslationsExtractParams): LibTranslationsExtractReturns {
    const themeConfig: LibTranslationsExtractThemeConfig = params['themeConfig'];
    const result: LibTranslationsExtractResult = [];

    const navbarContent: LibTranslationsExtractNavbarContent = Translations.extractNavbar(themeConfig['navbar']);

    if (navbarContent !== undefined) {
      result.push({
        path: 'navbar', content: navbarContent,
      });
    }

    const blogContent: LibTranslationsExtractBlogContent = Translations.extractBlog(themeConfig['blog']);

    if (blogContent !== undefined) {
      result.push({
        path: 'blog', content: blogContent,
      });
    }

    const announcementBarContent: LibTranslationsExtractAnnouncementBarContent = Translations.extractAnnouncementBar(themeConfig['announcementBar']);

    if (announcementBarContent !== undefined) {
      result.push({
        path: 'announcementBar', content: announcementBarContent,
      });
    }

    const errorPagesContent: LibTranslationsExtractErrorPagesContent = Translations.extractErrorPages(themeConfig['errorPages']);

    if (errorPagesContent !== undefined) {
      result.push({
        path: 'errorPages', content: errorPagesContent,
      });
    }

    const footerContent: LibTranslationsExtractFooterContent = Translations.extractFooter(themeConfig['footer']);

    if (footerContent !== undefined) {
      result.push({
        path: 'footer', content: footerContent,
      });
    }

    return result;
  }

  /**
   * Lib - Translations - Apply.
   *
   * Returns a deep-cloned theme configuration with translated strings
   * spliced into the navbar, blog, announcement bar, error pages, and
   * footer areas. Falls back to source strings when a key is missing.
   *
   * @param {LibTranslationsApplyParams} params - Params.
   *
   * @returns {LibTranslationsApplyReturns}
   *
   * @since 0.18.0
   */
  public static apply(params: LibTranslationsApplyParams): LibTranslationsApplyReturns {
    const themeConfig: LibTranslationsApplyThemeConfig = params['themeConfig'];
    const translationFiles: LibTranslationsApplyTranslationFiles = params['translationFiles'];

    const cloned: LibTranslationsApplyClonedThemeConfig = structuredClone(themeConfig);
    const filesByPath: LibTranslationsApplyFilesByPath = new Map();

    for (const file of translationFiles) {
      filesByPath.set(file['path'], file['content']);
    }

    const navbarTranslations: LibTranslationsApplyNavbarTranslations = filesByPath.get('navbar');
    const navbarValue: LibTranslationsApplyNavbarValue = cloned['navbar'] as LibTranslationsApplyNavbarValue;

    if (
      navbarTranslations !== undefined
      && navbarValue !== undefined
    ) {
      Translations.applyNavbar(navbarValue, navbarTranslations);
    }

    const blogTranslations: LibTranslationsApplyBlogTranslations = filesByPath.get('blog');
    const blogValue: LibTranslationsApplyBlogValue = cloned['blog'] as LibTranslationsApplyBlogValue;

    if (
      blogTranslations !== undefined
      && blogValue !== undefined
    ) {
      Translations.applyBlog(blogValue, blogTranslations);
    }

    const announcementBarTranslations: LibTranslationsApplyAnnouncementBarTranslations = filesByPath.get('announcementBar');
    const announcementBarValue: LibTranslationsApplyAnnouncementBarValue = cloned['announcementBar'] as LibTranslationsApplyAnnouncementBarValue;

    if (
      announcementBarTranslations !== undefined
      && announcementBarValue !== undefined
    ) {
      Translations.applyAnnouncementBar(announcementBarValue, announcementBarTranslations);
    }

    const errorPagesTranslations: LibTranslationsApplyErrorPagesTranslations = filesByPath.get('errorPages');
    const errorPagesValue: LibTranslationsApplyErrorPagesValue = cloned['errorPages'] as LibTranslationsApplyErrorPagesValue;

    if (
      errorPagesTranslations !== undefined
      && errorPagesValue !== undefined
    ) {
      Translations.applyErrorPages(errorPagesValue, errorPagesTranslations);
    }

    const footerTranslations: LibTranslationsApplyFooterTranslations = filesByPath.get('footer');
    const footerValue: LibTranslationsApplyFooterValue = (cloned['footer'] !== false && cloned['footer'] !== undefined) ? cloned['footer'] as LibTranslationsApplyFooterValue : undefined;

    if (
      footerTranslations !== undefined
      && footerValue !== undefined
    ) {
      Translations.applyFooter(footerValue, footerTranslations);
    }

    return cloned;
  }

  /**
   * Lib - Translations - Extract Navbar.
   *
   * Emits one message per top-level navbar item label and one per
   * dropdown child label, keyed by positional index so translators
   * can map labels back even when items are reordered.
   *
   * @param {LibTranslationsExtractNavbarNavbar} navbar - Navbar.
   *
   * @private
   *
   * @returns {LibTranslationsExtractNavbarReturns}
   *
   * @since 0.18.0
   */
  private static extractNavbar(navbar: LibTranslationsExtractNavbarNavbar): LibTranslationsExtractNavbarReturns {
    if (
      navbar === undefined
      || navbar === null
      || typeof navbar !== 'object'
    ) {
      return undefined;
    }

    const config: LibTranslationsExtractNavbarConfig = navbar as LibTranslationsExtractNavbarConfig;
    const items: LibTranslationsExtractNavbarItems = config['items'];

    if (Array.isArray(items) === false) {
      return undefined;
    }

    const fileContent: LibTranslationsExtractNavbarFileContent = {};

    items.forEach((rawItem, itemIndex) => {
      if (rawItem === null || typeof rawItem !== 'object') {
        return undefined;
      }

      const item: LibTranslationsExtractNavbarItem = rawItem as LibTranslationsExtractNavbarItem;
      const labelValue: LibTranslationsExtractNavbarLabelValue = item['label'];

      if (typeof labelValue === 'string') {
        Reflect.set(fileContent, `item.${itemIndex}.label`, {
          message: labelValue,
          description: `Label of navbar item ${itemIndex + 1}`,
        });
      }

      const children: LibTranslationsExtractNavbarChildren = item['items'];

      if (Array.isArray(children) === true) {
        children.forEach((rawChild, childIndex) => {
          if (rawChild === null || typeof rawChild !== 'object') {
            return undefined;
          }

          const child: LibTranslationsExtractNavbarChild = rawChild as LibTranslationsExtractNavbarChild;
          const childLabelValue: LibTranslationsExtractNavbarChildLabelValue = child['label'];

          if (typeof childLabelValue === 'string') {
            Reflect.set(fileContent, `item.${itemIndex}.items.${childIndex}.label`, {
              message: childLabelValue,
              description: `Label of dropdown child ${childIndex + 1} under navbar item ${itemIndex + 1}`,
            });
          }

          return undefined;
        });
      }

      return undefined;
    });

    if (Object.keys(fileContent).length === 0) {
      return undefined;
    }

    return fileContent;
  }

  /**
   * Lib - Translations - Extract Blog.
   *
   * Emits the blog list page heading and description from
   * `themeConfig.blog.layout`, skipping the area entirely when
   * neither field is configured.
   *
   * @param {LibTranslationsExtractBlogBlog} blog - Blog.
   *
   * @private
   *
   * @returns {LibTranslationsExtractBlogReturns}
   *
   * @since 0.18.0
   */
  private static extractBlog(blog: LibTranslationsExtractBlogBlog): LibTranslationsExtractBlogReturns {
    if (
      blog === undefined
      || blog === null
      || typeof blog !== 'object'
    ) {
      return undefined;
    }

    const config: LibTranslationsExtractBlogConfig = blog as LibTranslationsExtractBlogConfig;
    const layout: LibTranslationsExtractBlogLayout = config['layout'];

    if (
      layout === undefined
      || layout === null
      || typeof layout !== 'object'
    ) {
      return undefined;
    }

    const layoutConfig: LibTranslationsExtractBlogLayoutConfig = layout as LibTranslationsExtractBlogLayoutConfig;
    const fileContent: LibTranslationsExtractBlogFileContent = {};

    const headingValue: LibTranslationsExtractBlogHeadingValue = layoutConfig['heading'];

    if (typeof headingValue === 'string') {
      Reflect.set(fileContent, 'layout.heading', {
        message: headingValue,
        description: 'The blog list page heading',
      });
    }

    const descriptionValue: LibTranslationsExtractBlogDescriptionValue = layoutConfig['description'];

    if (typeof descriptionValue === 'string') {
      Reflect.set(fileContent, 'layout.description', {
        message: descriptionValue,
        description: 'The blog list page description below the heading',
      });
    }

    if (Object.keys(fileContent).length === 0) {
      return undefined;
    }

    return fileContent;
  }

  /**
   * Lib - Translations - Extract Announcement Bar.
   *
   * Emits a single `content` message that may contain HTML, since the
   * announcement bar renders its content via `dangerouslySetInnerHTML`
   * in the theme component.
   *
   * @param {LibTranslationsExtractAnnouncementBarAnnouncementBar} announcementBar - Announcement bar.
   *
   * @private
   *
   * @returns {LibTranslationsExtractAnnouncementBarReturns}
   *
   * @since 0.18.0
   */
  private static extractAnnouncementBar(announcementBar: LibTranslationsExtractAnnouncementBarAnnouncementBar): LibTranslationsExtractAnnouncementBarReturns {
    if (
      announcementBar === undefined
      || announcementBar === null
      || typeof announcementBar !== 'object'
    ) {
      return undefined;
    }

    const config: LibTranslationsExtractAnnouncementBarConfig = announcementBar as LibTranslationsExtractAnnouncementBarConfig;
    const contentValue: LibTranslationsExtractAnnouncementBarContentValue = config['content'];

    if (typeof contentValue !== 'string') {
      return undefined;
    }

    return {
      content: {
        message: contentValue,
        description: 'The announcement bar content (may contain HTML)',
      },
    };
  }

  /**
   * Lib - Translations - Extract Error Pages.
   *
   * Emits consumer-set override strings for the 404, per-page crash, and
   * top-level error surfaces - skipping fields the consumer did not set.
   *
   * @param {LibTranslationsExtractErrorPagesErrorPages} errorPages - Error pages.
   *
   * @private
   *
   * @returns {LibTranslationsExtractErrorPagesReturns}
   *
   * @since 0.18.0
   */
  private static extractErrorPages(errorPages: LibTranslationsExtractErrorPagesErrorPages): LibTranslationsExtractErrorPagesReturns {
    if (
      errorPages === undefined
      || errorPages === null
      || typeof errorPages !== 'object'
    ) {
      return undefined;
    }

    const config: LibTranslationsExtractErrorPagesConfig = errorPages as LibTranslationsExtractErrorPagesConfig;
    const fileContent: LibTranslationsExtractErrorPagesFileContent = {};

    const notFound: LibTranslationsExtractErrorPagesNotFound = config['notFound'];

    if (
      notFound !== undefined
      && notFound !== null
      && typeof notFound === 'object'
    ) {
      const notFoundConfig: LibTranslationsExtractErrorPagesNotFoundConfig = notFound as LibTranslationsExtractErrorPagesNotFoundConfig;
      const titleValue: LibTranslationsExtractErrorPagesNotFoundTitle = notFoundConfig['title'];

      if (typeof titleValue === 'string') {
        Reflect.set(fileContent, 'notFound.title', {
          message: titleValue,
          description: 'The 404 page heading set by the consumer in themeConfig.errorPages.notFound.title',
        });
      }

      const descriptionValue: LibTranslationsExtractErrorPagesNotFoundDescription = notFoundConfig['description'];

      if (typeof descriptionValue === 'string') {
        Reflect.set(fileContent, 'notFound.description', {
          message: descriptionValue,
          description: 'The 404 page description set by the consumer in themeConfig.errorPages.notFound.description',
        });
      }

      const backHomeLabelValue: LibTranslationsExtractErrorPagesNotFoundBackHomeLabel = notFoundConfig['backHomeLabel'];

      if (typeof backHomeLabelValue === 'string') {
        Reflect.set(fileContent, 'notFound.backHomeLabel', {
          message: backHomeLabelValue,
          description: 'The 404 page "Back to home" CTA label set by the consumer in themeConfig.errorPages.notFound.backHomeLabel',
        });
      }
    }

    const errorPageContent: LibTranslationsExtractErrorPagesErrorPageContent = config['errorPageContent'];

    if (
      errorPageContent !== undefined
      && errorPageContent !== null
      && typeof errorPageContent === 'object'
    ) {
      const errorPageContentConfig: LibTranslationsExtractErrorPagesErrorPageContentConfig = errorPageContent as LibTranslationsExtractErrorPagesErrorPageContentConfig;
      const titleValue: LibTranslationsExtractErrorPagesErrorPageContentTitle = errorPageContentConfig['title'];

      if (typeof titleValue === 'string') {
        Reflect.set(fileContent, 'errorPageContent.title', {
          message: titleValue,
          description: 'The per-page crash heading set by the consumer in themeConfig.errorPages.errorPageContent.title',
        });
      }

      const retryLabelValue: LibTranslationsExtractErrorPagesErrorPageContentRetryLabel = errorPageContentConfig['retryLabel'];

      if (typeof retryLabelValue === 'string') {
        Reflect.set(fileContent, 'errorPageContent.retryLabel', {
          message: retryLabelValue,
          description: 'The per-page crash retry button label set by the consumer in themeConfig.errorPages.errorPageContent.retryLabel',
        });
      }
    }

    const error: LibTranslationsExtractErrorPagesError = config['error'];

    if (
      error !== undefined
      && error !== null
      && typeof error === 'object'
    ) {
      const errorConfig: LibTranslationsExtractErrorPagesErrorConfig = error as LibTranslationsExtractErrorPagesErrorConfig;
      const retryLabelValue: LibTranslationsExtractErrorPagesErrorRetryLabel = errorConfig['retryLabel'];

      if (typeof retryLabelValue === 'string') {
        Reflect.set(fileContent, 'error.retryLabel', {
          message: retryLabelValue,
          description: 'The top-level error boundary retry button label set by the consumer in themeConfig.errorPages.error.retryLabel',
        });
      }
    }

    if (Object.keys(fileContent).length === 0) {
      return undefined;
    }

    return fileContent;
  }

  /**
   * Lib - Translations - Extract Footer.
   *
   * Emits per-slot layout titles, per-section link labels, copyright,
   * and the call-to-action label or text - handling the dual-shape cta
   * which can be either a bare string or a `{ label, href }` object.
   *
   * @param {LibTranslationsExtractFooterFooter} footer - Footer.
   *
   * @private
   *
   * @returns {LibTranslationsExtractFooterReturns}
   *
   * @since 0.18.0
   */
  private static extractFooter(footer: LibTranslationsExtractFooterFooter): LibTranslationsExtractFooterReturns {
    if (
      footer === undefined
      || footer === null
      || footer === false
      || typeof footer !== 'object'
    ) {
      return undefined;
    }

    const config: LibTranslationsExtractFooterConfig = footer as LibTranslationsExtractFooterConfig;
    const fileContent: LibTranslationsExtractFooterFileContent = {};

    const layout: LibTranslationsExtractFooterLayout = config['layout'];

    if (
      layout !== undefined
      && layout !== null
      && typeof layout === 'object'
    ) {
      const layoutEntries: LibTranslationsExtractFooterLayoutEntries = Object.entries(layout) as LibTranslationsExtractFooterLayoutEntries;

      for (const layoutEntry of layoutEntries) {
        const slotName: LibTranslationsExtractFooterLayoutSlot = layoutEntry[0];
        const slotConfig: LibTranslationsExtractFooterLayoutSlotConfig = layoutEntry[1];

        if (slotConfig === null || typeof slotConfig !== 'object') {
          continue;
        }

        const titleValue: LibTranslationsExtractFooterLayoutTitleValue = slotConfig['title'];

        if (typeof titleValue === 'string') {
          Reflect.set(fileContent, `layout.${slotName}.title`, {
            message: titleValue,
            description: `Title of footer column "${slotName}"`,
          });
        }
      }
    }

    const sections: LibTranslationsExtractFooterSections = config['sections'];

    if (
      sections !== undefined
      && sections !== null
      && typeof sections === 'object'
    ) {
      const sectionEntries: LibTranslationsExtractFooterSectionEntries = Object.entries(sections) as LibTranslationsExtractFooterSectionEntries;

      for (const sectionEntry of sectionEntries) {
        const sectionName: LibTranslationsExtractFooterSectionName = sectionEntry[0];
        const sectionLinks: LibTranslationsExtractFooterSectionLinks = sectionEntry[1];

        if (Array.isArray(sectionLinks) === false) {
          continue;
        }

        sectionLinks.forEach((rawLink, linkIndex) => {
          if (rawLink === null || typeof rawLink !== 'object') {
            return undefined;
          }

          const link: LibTranslationsExtractFooterSectionLink = rawLink as LibTranslationsExtractFooterSectionLink;
          const labelValue: LibTranslationsExtractFooterSectionLinkLabelValue = link['label'];

          if (typeof labelValue === 'string') {
            Reflect.set(fileContent, `sections.${sectionName}.${linkIndex}.label`, {
              message: labelValue,
              description: `Label of link ${linkIndex + 1} in footer section "${sectionName}"`,
            });
          }

          return undefined;
        });
      }
    }

    const cta: LibTranslationsExtractFooterCta = config['cta'];

    if (typeof cta === 'string') {
      Reflect.set(fileContent, 'cta', {
        message: cta,
        description: 'The footer call-to-action text',
      });
    } else if (
      cta !== undefined
      && cta !== null
      && typeof cta === 'object'
    ) {
      const ctaObject: LibTranslationsExtractFooterCtaObject = cta as LibTranslationsExtractFooterCtaObject;
      const ctaLabelValue: LibTranslationsExtractFooterCtaLabelValue = ctaObject['label'];

      if (typeof ctaLabelValue === 'string') {
        Reflect.set(fileContent, 'cta.label', {
          message: ctaLabelValue,
          description: 'The footer call-to-action link label',
        });
      }
    }

    const copyrightValue: LibTranslationsExtractFooterCopyrightValue = config['copyright'];

    if (typeof copyrightValue === 'string') {
      Reflect.set(fileContent, 'copyright', {
        message: copyrightValue,
        description: 'The footer copyright text',
      });
    }

    if (Object.keys(fileContent).length === 0) {
      return undefined;
    }

    return fileContent;
  }

  /**
   * Lib - Translations - Apply Navbar.
   *
   * Walks the cloned navbar items and overwrites each `label` field
   * in place with the matching translated message, recursing into
   * dropdown children when present.
   *
   * @param {LibTranslationsApplyNavbarNavbar}            navbar       - Navbar.
   * @param {LibTranslationsApplyNavbarTranslationsParam} translations - Translations.
   *
   * @private
   *
   * @returns {LibTranslationsApplyNavbarReturns}
   *
   * @since 0.18.0
   */
  private static applyNavbar(navbar: LibTranslationsApplyNavbarNavbar, translations: LibTranslationsApplyNavbarTranslationsParam): LibTranslationsApplyNavbarReturns {
    const items: LibTranslationsApplyNavbarItems = navbar['items'] as LibTranslationsApplyNavbarItems;

    if (items === undefined || Array.isArray(items) === false) {
      return undefined;
    }

    items.forEach((rawItem, itemIndex) => {
      if (rawItem === null || typeof rawItem !== 'object') {
        return undefined;
      }

      const item: LibTranslationsApplyNavbarItem = rawItem;
      const labelMessage: LibTranslationsApplyNavbarMessage = translations[`item.${itemIndex}.label`];

      if (labelMessage !== undefined) {
        Reflect.set(item, 'label', labelMessage['message']);
      }

      const children: LibTranslationsApplyNavbarChildren = item['items'] as LibTranslationsApplyNavbarChildren;

      if (children !== undefined && Array.isArray(children) === true) {
        children.forEach((rawChild, childIndex) => {
          if (rawChild === null || typeof rawChild !== 'object') {
            return undefined;
          }

          const child: LibTranslationsApplyNavbarChild = rawChild;
          const childMessage: LibTranslationsApplyNavbarMessage = translations[`item.${itemIndex}.items.${childIndex}.label`];

          if (childMessage !== undefined) {
            Reflect.set(child, 'label', childMessage['message']);
          }

          return undefined;
        });
      }

      return undefined;
    });

    return undefined;
  }

  /**
   * Lib - Translations - Apply Blog.
   *
   * Overwrites the blog list page heading and description in place
   * when matching translations are present, leaving sidebar and
   * other blog config untouched.
   *
   * @param {LibTranslationsApplyBlogBlog}              blog         - Blog.
   * @param {LibTranslationsApplyBlogTranslationsParam} translations - Translations.
   *
   * @private
   *
   * @returns {LibTranslationsApplyBlogReturns}
   *
   * @since 0.18.0
   */
  private static applyBlog(blog: LibTranslationsApplyBlogBlog, translations: LibTranslationsApplyBlogTranslationsParam): LibTranslationsApplyBlogReturns {
    const layout: LibTranslationsApplyBlogLayout = blog['layout'] as LibTranslationsApplyBlogLayout;

    if (
      layout === undefined
      || layout === null
      || typeof layout !== 'object'
    ) {
      return undefined;
    }

    const headingMessage: LibTranslationsApplyBlogHeadingMessage = translations['layout.heading'];

    if (headingMessage !== undefined) {
      Reflect.set(layout, 'heading', headingMessage['message']);
    }

    const descriptionMessage: LibTranslationsApplyBlogDescriptionMessage = translations['layout.description'];

    if (descriptionMessage !== undefined) {
      Reflect.set(layout, 'description', descriptionMessage['message']);
    }

    return undefined;
  }

  /**
   * Lib - Translations - Apply Announcement Bar.
   *
   * Overwrites the announcement bar `content` field in place with
   * the translated message, leaving id and dismiss settings intact.
   *
   * @param {LibTranslationsApplyAnnouncementBarAnnouncementBar}   announcementBar - Announcement bar.
   * @param {LibTranslationsApplyAnnouncementBarTranslationsParam} translations    - Translations.
   *
   * @private
   *
   * @returns {LibTranslationsApplyAnnouncementBarReturns}
   *
   * @since 0.18.0
   */
  private static applyAnnouncementBar(announcementBar: LibTranslationsApplyAnnouncementBarAnnouncementBar, translations: LibTranslationsApplyAnnouncementBarTranslationsParam): LibTranslationsApplyAnnouncementBarReturns {
    const message: LibTranslationsApplyAnnouncementBarMessage = translations['content'];

    if (message !== undefined) {
      Reflect.set(announcementBar, 'content', message['message']);
    }

    return undefined;
  }

  /**
   * Lib - Translations - Apply Error Pages.
   *
   * Overwrites consumer-supplied override strings on the cloned errorPages
   * config with translated values, leaving any non-string field (e.g.
   * notFound.backHomeHref) untouched.
   *
   * @param {LibTranslationsApplyErrorPagesErrorPages}            errorPages   - Error pages.
   * @param {LibTranslationsApplyErrorPagesTranslationsParam}     translations - Translations.
   *
   * @private
   *
   * @returns {LibTranslationsApplyErrorPagesReturns}
   *
   * @since 0.18.0
   */
  private static applyErrorPages(errorPages: LibTranslationsApplyErrorPagesErrorPages, translations: LibTranslationsApplyErrorPagesTranslationsParam): LibTranslationsApplyErrorPagesReturns {
    const notFound: LibTranslationsApplyErrorPagesNotFound = errorPages['notFound'] as LibTranslationsApplyErrorPagesNotFound;

    if (
      notFound !== undefined
      && notFound !== null
      && typeof notFound === 'object'
    ) {
      const titleMessage: LibTranslationsApplyErrorPagesMessage = translations['notFound.title'];

      if (titleMessage !== undefined) {
        Reflect.set(notFound, 'title', titleMessage['message']);
      }

      const descriptionMessage: LibTranslationsApplyErrorPagesMessage = translations['notFound.description'];

      if (descriptionMessage !== undefined) {
        Reflect.set(notFound, 'description', descriptionMessage['message']);
      }

      const backHomeLabelMessage: LibTranslationsApplyErrorPagesMessage = translations['notFound.backHomeLabel'];

      if (backHomeLabelMessage !== undefined) {
        Reflect.set(notFound, 'backHomeLabel', backHomeLabelMessage['message']);
      }
    }

    const errorPageContent: LibTranslationsApplyErrorPagesErrorPageContent = errorPages['errorPageContent'] as LibTranslationsApplyErrorPagesErrorPageContent;

    if (
      errorPageContent !== undefined
      && errorPageContent !== null
      && typeof errorPageContent === 'object'
    ) {
      const titleMessage: LibTranslationsApplyErrorPagesMessage = translations['errorPageContent.title'];

      if (titleMessage !== undefined) {
        Reflect.set(errorPageContent, 'title', titleMessage['message']);
      }

      const retryLabelMessage: LibTranslationsApplyErrorPagesMessage = translations['errorPageContent.retryLabel'];

      if (retryLabelMessage !== undefined) {
        Reflect.set(errorPageContent, 'retryLabel', retryLabelMessage['message']);
      }
    }

    const error: LibTranslationsApplyErrorPagesError = errorPages['error'] as LibTranslationsApplyErrorPagesError;

    if (
      error !== undefined
      && error !== null
      && typeof error === 'object'
    ) {
      const retryLabelMessage: LibTranslationsApplyErrorPagesMessage = translations['error.retryLabel'];

      if (retryLabelMessage !== undefined) {
        Reflect.set(error, 'retryLabel', retryLabelMessage['message']);
      }
    }

    return undefined;
  }

  /**
   * Lib - Translations - Apply Footer.
   *
   * Overwrites layout slot titles, section link labels, copyright,
   * and cta text or label in place - picking the right cta path based
   * on whether `cta` is a bare string or a `{ label, href }` object.
   *
   * @param {LibTranslationsApplyFooterFooter}            footer       - Footer.
   * @param {LibTranslationsApplyFooterTranslationsParam} translations - Translations.
   *
   * @private
   *
   * @returns {LibTranslationsApplyFooterReturns}
   *
   * @since 0.18.0
   */
  private static applyFooter(footer: LibTranslationsApplyFooterFooter, translations: LibTranslationsApplyFooterTranslationsParam): LibTranslationsApplyFooterReturns {
    const layout: LibTranslationsApplyFooterLayout = footer['layout'] as LibTranslationsApplyFooterLayout;

    if (
      layout !== undefined
      && layout !== null
      && typeof layout === 'object'
    ) {
      for (const slotName of Object.keys(layout)) {
        const slotConfig: LibTranslationsApplyFooterLayoutSlot = layout[slotName] as LibTranslationsApplyFooterLayoutSlot;

        if (slotConfig === null || typeof slotConfig !== 'object') {
          continue;
        }

        const titleMessage: LibTranslationsApplyFooterMessage = translations[`layout.${slotName}.title`];

        if (titleMessage !== undefined) {
          Reflect.set(slotConfig, 'title', titleMessage['message']);
        }
      }
    }

    const sections: LibTranslationsApplyFooterSections = footer['sections'] as LibTranslationsApplyFooterSections;

    if (
      sections !== undefined
      && sections !== null
      && typeof sections === 'object'
    ) {
      for (const sectionName of Object.keys(sections)) {
        const sectionLinks: LibTranslationsApplyFooterSectionLinks = sections[sectionName] as LibTranslationsApplyFooterSectionLinks;

        if (Array.isArray(sectionLinks) === false) {
          continue;
        }

        sectionLinks.forEach((rawLink, linkIndex) => {
          if (rawLink === null || typeof rawLink !== 'object') {
            return undefined;
          }

          const link: LibTranslationsApplyFooterSectionLink = rawLink;
          const labelMessage: LibTranslationsApplyFooterMessage = translations[`sections.${sectionName}.${linkIndex}.label`];

          if (labelMessage !== undefined) {
            Reflect.set(link, 'label', labelMessage['message']);
          }

          return undefined;
        });
      }
    }

    const cta: LibTranslationsApplyFooterCta = footer['cta'];

    if (typeof cta === 'string') {
      const ctaMessage: LibTranslationsApplyFooterMessage = translations['cta'];

      if (ctaMessage !== undefined) {
        Reflect.set(footer, 'cta', ctaMessage['message']);
      }
    } else if (
      cta !== undefined
      && cta !== null
      && typeof cta === 'object'
    ) {
      const ctaObject: LibTranslationsApplyFooterCtaObject = cta as LibTranslationsApplyFooterCtaObject;
      const ctaLabelMessage: LibTranslationsApplyFooterMessage = translations['cta.label'];

      if (ctaLabelMessage !== undefined) {
        Reflect.set(ctaObject, 'label', ctaLabelMessage['message']);
      }
    }

    const copyrightMessage: LibTranslationsApplyFooterMessage = translations['copyright'];

    if (copyrightMessage !== undefined) {
      Reflect.set(footer, 'copyright', copyrightMessage['message']);
    }

    return undefined;
  }
}
