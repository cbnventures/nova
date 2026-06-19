import type {
  Lib_Translations_Runner_Apply_AnnouncementBarTranslations,
  Lib_Translations_Runner_Apply_AnnouncementBarValue,
  Lib_Translations_Runner_Apply_BlogTranslations,
  Lib_Translations_Runner_Apply_BlogValue,
  Lib_Translations_Runner_Apply_Cloned,
  Lib_Translations_Runner_Apply_ErrorPagesTranslations,
  Lib_Translations_Runner_Apply_ErrorPagesValue,
  Lib_Translations_Runner_Apply_FilesByPath,
  Lib_Translations_Runner_Apply_FooterTranslations,
  Lib_Translations_Runner_Apply_FooterValue,
  Lib_Translations_Runner_Apply_NavbarTranslations,
  Lib_Translations_Runner_Apply_NavbarValue,
  Lib_Translations_Runner_Apply_Params,
  Lib_Translations_Runner_Apply_Returns,
  Lib_Translations_Runner_Apply_ThemeConfig,
  Lib_Translations_Runner_Apply_TranslationFiles,
  Lib_Translations_Runner_ApplyAnnouncementBar_AnnouncementBar,
  Lib_Translations_Runner_ApplyAnnouncementBar_Message,
  Lib_Translations_Runner_ApplyAnnouncementBar_Returns,
  Lib_Translations_Runner_ApplyAnnouncementBar_Translations,
  Lib_Translations_Runner_ApplyBlog_Blog,
  Lib_Translations_Runner_ApplyBlog_DescriptionMessage,
  Lib_Translations_Runner_ApplyBlog_HeadingMessage,
  Lib_Translations_Runner_ApplyBlog_Layout,
  Lib_Translations_Runner_ApplyBlog_Returns,
  Lib_Translations_Runner_ApplyBlog_Translations,
  Lib_Translations_Runner_ApplyErrorPages_BackHomeLabelMessage,
  Lib_Translations_Runner_ApplyErrorPages_DescriptionMessage,
  Lib_Translations_Runner_ApplyErrorPages_Error,
  Lib_Translations_Runner_ApplyErrorPages_ErrorPageContent,
  Lib_Translations_Runner_ApplyErrorPages_ErrorPages,
  Lib_Translations_Runner_ApplyErrorPages_ErrorPageTitleMessage,
  Lib_Translations_Runner_ApplyErrorPages_ErrorRetryLabelMessage,
  Lib_Translations_Runner_ApplyErrorPages_NotFound,
  Lib_Translations_Runner_ApplyErrorPages_RetryLabelMessage,
  Lib_Translations_Runner_ApplyErrorPages_Returns,
  Lib_Translations_Runner_ApplyErrorPages_TitleMessage,
  Lib_Translations_Runner_ApplyErrorPages_Translations,
  Lib_Translations_Runner_ApplyFooter_CopyrightMessage,
  Lib_Translations_Runner_ApplyFooter_Cta,
  Lib_Translations_Runner_ApplyFooter_CtaLabelMessage,
  Lib_Translations_Runner_ApplyFooter_CtaMessage,
  Lib_Translations_Runner_ApplyFooter_CtaObject,
  Lib_Translations_Runner_ApplyFooter_Footer,
  Lib_Translations_Runner_ApplyFooter_LabelMessage,
  Lib_Translations_Runner_ApplyFooter_Layout,
  Lib_Translations_Runner_ApplyFooter_Link,
  Lib_Translations_Runner_ApplyFooter_Returns,
  Lib_Translations_Runner_ApplyFooter_SectionLinks,
  Lib_Translations_Runner_ApplyFooter_Sections,
  Lib_Translations_Runner_ApplyFooter_SlotConfig,
  Lib_Translations_Runner_ApplyFooter_TitleMessage,
  Lib_Translations_Runner_ApplyFooter_Translations,
  Lib_Translations_Runner_ApplyNavbar_Child,
  Lib_Translations_Runner_ApplyNavbar_ChildMessage,
  Lib_Translations_Runner_ApplyNavbar_Children,
  Lib_Translations_Runner_ApplyNavbar_Item,
  Lib_Translations_Runner_ApplyNavbar_Items,
  Lib_Translations_Runner_ApplyNavbar_LabelMessage,
  Lib_Translations_Runner_ApplyNavbar_Navbar,
  Lib_Translations_Runner_ApplyNavbar_Returns,
  Lib_Translations_Runner_ApplyNavbar_Translations,
  Lib_Translations_Runner_Extract_AnnouncementBarContent,
  Lib_Translations_Runner_Extract_BlogContent,
  Lib_Translations_Runner_Extract_ErrorPagesContent,
  Lib_Translations_Runner_Extract_FooterContent,
  Lib_Translations_Runner_Extract_NavbarContent,
  Lib_Translations_Runner_Extract_Params,
  Lib_Translations_Runner_Extract_Result,
  Lib_Translations_Runner_Extract_Returns,
  Lib_Translations_Runner_Extract_ThemeConfig,
  Lib_Translations_Runner_ExtractAnnouncementBar_AnnouncementBar,
  Lib_Translations_Runner_ExtractAnnouncementBar_Config,
  Lib_Translations_Runner_ExtractAnnouncementBar_ContentValue,
  Lib_Translations_Runner_ExtractAnnouncementBar_Returns,
  Lib_Translations_Runner_ExtractBlog_Blog,
  Lib_Translations_Runner_ExtractBlog_Config,
  Lib_Translations_Runner_ExtractBlog_DescriptionValue,
  Lib_Translations_Runner_ExtractBlog_FileContent,
  Lib_Translations_Runner_ExtractBlog_HeadingValue,
  Lib_Translations_Runner_ExtractBlog_Layout,
  Lib_Translations_Runner_ExtractBlog_LayoutConfig,
  Lib_Translations_Runner_ExtractBlog_Returns,
  Lib_Translations_Runner_ExtractErrorPages_BackHomeLabelValue,
  Lib_Translations_Runner_ExtractErrorPages_Config,
  Lib_Translations_Runner_ExtractErrorPages_DescriptionValue,
  Lib_Translations_Runner_ExtractErrorPages_Error,
  Lib_Translations_Runner_ExtractErrorPages_ErrorConfig,
  Lib_Translations_Runner_ExtractErrorPages_ErrorPageContent,
  Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentConfig,
  Lib_Translations_Runner_ExtractErrorPages_ErrorPages,
  Lib_Translations_Runner_ExtractErrorPages_ErrorPageTitleValue,
  Lib_Translations_Runner_ExtractErrorPages_ErrorRetryLabelValue,
  Lib_Translations_Runner_ExtractErrorPages_FileContent,
  Lib_Translations_Runner_ExtractErrorPages_NotFound,
  Lib_Translations_Runner_ExtractErrorPages_NotFoundConfig,
  Lib_Translations_Runner_ExtractErrorPages_RetryLabelValue,
  Lib_Translations_Runner_ExtractErrorPages_Returns,
  Lib_Translations_Runner_ExtractErrorPages_TitleValue,
  Lib_Translations_Runner_ExtractFooter_Config,
  Lib_Translations_Runner_ExtractFooter_CopyrightValue,
  Lib_Translations_Runner_ExtractFooter_Cta,
  Lib_Translations_Runner_ExtractFooter_CtaLabelValue,
  Lib_Translations_Runner_ExtractFooter_CtaObject,
  Lib_Translations_Runner_ExtractFooter_FileContent,
  Lib_Translations_Runner_ExtractFooter_Footer,
  Lib_Translations_Runner_ExtractFooter_LabelValue,
  Lib_Translations_Runner_ExtractFooter_Layout,
  Lib_Translations_Runner_ExtractFooter_LayoutEntries,
  Lib_Translations_Runner_ExtractFooter_Link,
  Lib_Translations_Runner_ExtractFooter_Returns,
  Lib_Translations_Runner_ExtractFooter_SectionEntries,
  Lib_Translations_Runner_ExtractFooter_SectionLinks,
  Lib_Translations_Runner_ExtractFooter_SectionName,
  Lib_Translations_Runner_ExtractFooter_Sections,
  Lib_Translations_Runner_ExtractFooter_SlotConfig,
  Lib_Translations_Runner_ExtractFooter_SlotName,
  Lib_Translations_Runner_ExtractFooter_TitleValue,
  Lib_Translations_Runner_ExtractNavbar_Child,
  Lib_Translations_Runner_ExtractNavbar_ChildLabelValue,
  Lib_Translations_Runner_ExtractNavbar_Children,
  Lib_Translations_Runner_ExtractNavbar_Config,
  Lib_Translations_Runner_ExtractNavbar_FileContent,
  Lib_Translations_Runner_ExtractNavbar_Item,
  Lib_Translations_Runner_ExtractNavbar_Items,
  Lib_Translations_Runner_ExtractNavbar_LabelValue,
  Lib_Translations_Runner_ExtractNavbar_Navbar,
  Lib_Translations_Runner_ExtractNavbar_Returns,
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
export class Runner {
  /**
   * Lib - Translations - Extract.
   *
   * Walks the user-supplied theme configuration and emits one
   * `TranslationFile` per populated area (navbar, blog, announcementBar,
   * errorPages, footer) with stable message IDs and source-language defaults.
   *
   * @param {Lib_Translations_Runner_Extract_Params} params - Params.
   *
   * @returns {Lib_Translations_Runner_Extract_Returns}
   *
   * @since 0.18.0
   */
  public static extract(params: Lib_Translations_Runner_Extract_Params): Lib_Translations_Runner_Extract_Returns {
    const themeConfig: Lib_Translations_Runner_Extract_ThemeConfig = params['themeConfig'];
    const result: Lib_Translations_Runner_Extract_Result = [];

    const navbarContent: Lib_Translations_Runner_Extract_NavbarContent = Runner.extractNavbar(themeConfig['navbar']);

    if (navbarContent !== undefined) {
      result.push({
        path: 'navbar', content: navbarContent,
      });
    }

    const blogContent: Lib_Translations_Runner_Extract_BlogContent = Runner.extractBlog(themeConfig['blog']);

    if (blogContent !== undefined) {
      result.push({
        path: 'blog', content: blogContent,
      });
    }

    const announcementBarContent: Lib_Translations_Runner_Extract_AnnouncementBarContent = Runner.extractAnnouncementBar(themeConfig['announcementBar']);

    if (announcementBarContent !== undefined) {
      result.push({
        path: 'announcementBar', content: announcementBarContent,
      });
    }

    const errorPagesContent: Lib_Translations_Runner_Extract_ErrorPagesContent = Runner.extractErrorPages(themeConfig['errorPages']);

    if (errorPagesContent !== undefined) {
      result.push({
        path: 'errorPages', content: errorPagesContent,
      });
    }

    const footerContent: Lib_Translations_Runner_Extract_FooterContent = Runner.extractFooter(themeConfig['footer']);

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
   * @param {Lib_Translations_Runner_Apply_Params} params - Params.
   *
   * @returns {Lib_Translations_Runner_Apply_Returns}
   *
   * @since 0.18.0
   */
  public static apply(params: Lib_Translations_Runner_Apply_Params): Lib_Translations_Runner_Apply_Returns {
    const themeConfig: Lib_Translations_Runner_Apply_ThemeConfig = params['themeConfig'];
    const translationFiles: Lib_Translations_Runner_Apply_TranslationFiles = params['translationFiles'];

    const cloned: Lib_Translations_Runner_Apply_Cloned = structuredClone(themeConfig);
    const filesByPath: Lib_Translations_Runner_Apply_FilesByPath = new Map();

    for (const file of translationFiles) {
      filesByPath.set(file['path'], file['content']);
    }

    const navbarTranslations: Lib_Translations_Runner_Apply_NavbarTranslations = filesByPath.get('navbar');
    const navbarValue: Lib_Translations_Runner_Apply_NavbarValue = cloned['navbar'] as Lib_Translations_Runner_Apply_NavbarValue;

    if (
      navbarTranslations !== undefined
      && navbarValue !== undefined
    ) {
      Runner.applyNavbar(navbarValue, navbarTranslations);
    }

    const blogTranslations: Lib_Translations_Runner_Apply_BlogTranslations = filesByPath.get('blog');
    const blogValue: Lib_Translations_Runner_Apply_BlogValue = cloned['blog'] as Lib_Translations_Runner_Apply_BlogValue;

    if (
      blogTranslations !== undefined
      && blogValue !== undefined
    ) {
      Runner.applyBlog(blogValue, blogTranslations);
    }

    const announcementBarTranslations: Lib_Translations_Runner_Apply_AnnouncementBarTranslations = filesByPath.get('announcementBar');
    const announcementBarValue: Lib_Translations_Runner_Apply_AnnouncementBarValue = cloned['announcementBar'] as Lib_Translations_Runner_Apply_AnnouncementBarValue;

    if (
      announcementBarTranslations !== undefined
      && announcementBarValue !== undefined
    ) {
      Runner.applyAnnouncementBar(announcementBarValue, announcementBarTranslations);
    }

    const errorPagesTranslations: Lib_Translations_Runner_Apply_ErrorPagesTranslations = filesByPath.get('errorPages');
    const errorPagesValue: Lib_Translations_Runner_Apply_ErrorPagesValue = cloned['errorPages'] as Lib_Translations_Runner_Apply_ErrorPagesValue;

    if (
      errorPagesTranslations !== undefined
      && errorPagesValue !== undefined
    ) {
      Runner.applyErrorPages(errorPagesValue, errorPagesTranslations);
    }

    const footerTranslations: Lib_Translations_Runner_Apply_FooterTranslations = filesByPath.get('footer');
    const footerValue: Lib_Translations_Runner_Apply_FooterValue = (cloned['footer'] !== false && cloned['footer'] !== undefined) ? cloned['footer'] as Lib_Translations_Runner_Apply_FooterValue : undefined;

    if (
      footerTranslations !== undefined
      && footerValue !== undefined
    ) {
      Runner.applyFooter(footerValue, footerTranslations);
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
   * @param {Lib_Translations_Runner_ExtractNavbar_Navbar} navbar - Navbar.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ExtractNavbar_Returns}
   *
   * @since 0.18.0
   */
  private static extractNavbar(navbar: Lib_Translations_Runner_ExtractNavbar_Navbar): Lib_Translations_Runner_ExtractNavbar_Returns {
    if (
      navbar === undefined
      || navbar === null
      || typeof navbar !== 'object'
    ) {
      return undefined;
    }

    const config: Lib_Translations_Runner_ExtractNavbar_Config = navbar as Lib_Translations_Runner_ExtractNavbar_Config;
    const items: Lib_Translations_Runner_ExtractNavbar_Items = config['items'];

    if (Array.isArray(items) === false) {
      return undefined;
    }

    const fileContent: Lib_Translations_Runner_ExtractNavbar_FileContent = {};

    items.forEach((rawItem, itemIndex) => {
      if (rawItem === null || typeof rawItem !== 'object') {
        return undefined;
      }

      const item: Lib_Translations_Runner_ExtractNavbar_Item = rawItem as Lib_Translations_Runner_ExtractNavbar_Item;
      const labelValue: Lib_Translations_Runner_ExtractNavbar_LabelValue = item['label'];

      if (typeof labelValue === 'string') {
        Reflect.set(fileContent, `item.${itemIndex}.label`, {
          message: labelValue,
          description: `Label of navbar item ${itemIndex + 1}`,
        });
      }

      const children: Lib_Translations_Runner_ExtractNavbar_Children = item['items'];

      if (Array.isArray(children) === true) {
        children.forEach((rawChild, childIndex) => {
          if (rawChild === null || typeof rawChild !== 'object') {
            return undefined;
          }

          const child: Lib_Translations_Runner_ExtractNavbar_Child = rawChild as Lib_Translations_Runner_ExtractNavbar_Child;
          const childLabelValue: Lib_Translations_Runner_ExtractNavbar_ChildLabelValue = child['label'];

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
   * @param {Lib_Translations_Runner_ExtractBlog_Blog} blog - Blog.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ExtractBlog_Returns}
   *
   * @since 0.18.0
   */
  private static extractBlog(blog: Lib_Translations_Runner_ExtractBlog_Blog): Lib_Translations_Runner_ExtractBlog_Returns {
    if (
      blog === undefined
      || blog === null
      || typeof blog !== 'object'
    ) {
      return undefined;
    }

    const config: Lib_Translations_Runner_ExtractBlog_Config = blog as Lib_Translations_Runner_ExtractBlog_Config;
    const layout: Lib_Translations_Runner_ExtractBlog_Layout = config['layout'];

    if (
      layout === undefined
      || layout === null
      || typeof layout !== 'object'
    ) {
      return undefined;
    }

    const layoutConfig: Lib_Translations_Runner_ExtractBlog_LayoutConfig = layout as Lib_Translations_Runner_ExtractBlog_LayoutConfig;
    const fileContent: Lib_Translations_Runner_ExtractBlog_FileContent = {};

    const headingValue: Lib_Translations_Runner_ExtractBlog_HeadingValue = layoutConfig['heading'];

    if (typeof headingValue === 'string') {
      Reflect.set(fileContent, 'layout.heading', {
        message: headingValue,
        description: 'The blog list page heading',
      });
    }

    const descriptionValue: Lib_Translations_Runner_ExtractBlog_DescriptionValue = layoutConfig['description'];

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
   * @param {Lib_Translations_Runner_ExtractAnnouncementBar_AnnouncementBar} announcementBar - Announcement bar.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ExtractAnnouncementBar_Returns}
   *
   * @since 0.18.0
   */
  private static extractAnnouncementBar(announcementBar: Lib_Translations_Runner_ExtractAnnouncementBar_AnnouncementBar): Lib_Translations_Runner_ExtractAnnouncementBar_Returns {
    if (
      announcementBar === undefined
      || announcementBar === null
      || typeof announcementBar !== 'object'
    ) {
      return undefined;
    }

    const config: Lib_Translations_Runner_ExtractAnnouncementBar_Config = announcementBar as Lib_Translations_Runner_ExtractAnnouncementBar_Config;
    const contentValue: Lib_Translations_Runner_ExtractAnnouncementBar_ContentValue = config['content'];

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
   * @param {Lib_Translations_Runner_ExtractErrorPages_ErrorPages} errorPages - Error pages.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ExtractErrorPages_Returns}
   *
   * @since 0.18.0
   */
  private static extractErrorPages(errorPages: Lib_Translations_Runner_ExtractErrorPages_ErrorPages): Lib_Translations_Runner_ExtractErrorPages_Returns {
    if (
      errorPages === undefined
      || errorPages === null
      || typeof errorPages !== 'object'
    ) {
      return undefined;
    }

    const config: Lib_Translations_Runner_ExtractErrorPages_Config = errorPages as Lib_Translations_Runner_ExtractErrorPages_Config;
    const fileContent: Lib_Translations_Runner_ExtractErrorPages_FileContent = {};

    const notFound: Lib_Translations_Runner_ExtractErrorPages_NotFound = config['notFound'];

    if (
      notFound !== undefined
      && notFound !== null
      && typeof notFound === 'object'
    ) {
      const notFoundConfig: Lib_Translations_Runner_ExtractErrorPages_NotFoundConfig = notFound as Lib_Translations_Runner_ExtractErrorPages_NotFoundConfig;
      const titleValue: Lib_Translations_Runner_ExtractErrorPages_TitleValue = notFoundConfig['title'];

      if (typeof titleValue === 'string') {
        Reflect.set(fileContent, 'notFound.title', {
          message: titleValue,
          description: 'The 404 page heading set by the consumer in themeConfig.errorPages.notFound.title',
        });
      }

      const descriptionValue: Lib_Translations_Runner_ExtractErrorPages_DescriptionValue = notFoundConfig['description'];

      if (typeof descriptionValue === 'string') {
        Reflect.set(fileContent, 'notFound.description', {
          message: descriptionValue,
          description: 'The 404 page description set by the consumer in themeConfig.errorPages.notFound.description',
        });
      }

      const backHomeLabelValue: Lib_Translations_Runner_ExtractErrorPages_BackHomeLabelValue = notFoundConfig['backHomeLabel'];

      if (typeof backHomeLabelValue === 'string') {
        Reflect.set(fileContent, 'notFound.backHomeLabel', {
          message: backHomeLabelValue,
          description: 'The 404 page "Back to home" CTA label set by the consumer in themeConfig.errorPages.notFound.backHomeLabel',
        });
      }
    }

    const errorPageContent: Lib_Translations_Runner_ExtractErrorPages_ErrorPageContent = config['errorPageContent'];

    if (
      errorPageContent !== undefined
      && errorPageContent !== null
      && typeof errorPageContent === 'object'
    ) {
      const errorPageContentConfig: Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentConfig = errorPageContent as Lib_Translations_Runner_ExtractErrorPages_ErrorPageContentConfig;
      const errorPageTitleValue: Lib_Translations_Runner_ExtractErrorPages_ErrorPageTitleValue = errorPageContentConfig['title'];

      if (typeof errorPageTitleValue === 'string') {
        Reflect.set(fileContent, 'errorPageContent.title', {
          message: errorPageTitleValue,
          description: 'The per-page crash heading set by the consumer in themeConfig.errorPages.errorPageContent.title',
        });
      }

      const retryLabelValue: Lib_Translations_Runner_ExtractErrorPages_RetryLabelValue = errorPageContentConfig['retryLabel'];

      if (typeof retryLabelValue === 'string') {
        Reflect.set(fileContent, 'errorPageContent.retryLabel', {
          message: retryLabelValue,
          description: 'The per-page crash retry button label set by the consumer in themeConfig.errorPages.errorPageContent.retryLabel',
        });
      }
    }

    const error: Lib_Translations_Runner_ExtractErrorPages_Error = config['error'];

    if (
      error !== undefined
      && error !== null
      && typeof error === 'object'
    ) {
      const errorConfig: Lib_Translations_Runner_ExtractErrorPages_ErrorConfig = error as Lib_Translations_Runner_ExtractErrorPages_ErrorConfig;
      const errorRetryLabelValue: Lib_Translations_Runner_ExtractErrorPages_ErrorRetryLabelValue = errorConfig['retryLabel'];

      if (typeof errorRetryLabelValue === 'string') {
        Reflect.set(fileContent, 'error.retryLabel', {
          message: errorRetryLabelValue,
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
   * @param {Lib_Translations_Runner_ExtractFooter_Footer} footer - Footer.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ExtractFooter_Returns}
   *
   * @since 0.18.0
   */
  private static extractFooter(footer: Lib_Translations_Runner_ExtractFooter_Footer): Lib_Translations_Runner_ExtractFooter_Returns {
    if (
      footer === undefined
      || footer === null
      || footer === false
      || typeof footer !== 'object'
    ) {
      return undefined;
    }

    const config: Lib_Translations_Runner_ExtractFooter_Config = footer as Lib_Translations_Runner_ExtractFooter_Config;
    const fileContent: Lib_Translations_Runner_ExtractFooter_FileContent = {};

    const layout: Lib_Translations_Runner_ExtractFooter_Layout = config['layout'];

    if (
      layout !== undefined
      && layout !== null
      && typeof layout === 'object'
    ) {
      const layoutEntries: Lib_Translations_Runner_ExtractFooter_LayoutEntries = Object.entries(layout) as Lib_Translations_Runner_ExtractFooter_LayoutEntries;

      for (const layoutEntry of layoutEntries) {
        const slotName: Lib_Translations_Runner_ExtractFooter_SlotName = layoutEntry[0];
        const slotConfig: Lib_Translations_Runner_ExtractFooter_SlotConfig = layoutEntry[1];

        if (slotConfig === null || typeof slotConfig !== 'object') {
          continue;
        }

        const titleValue: Lib_Translations_Runner_ExtractFooter_TitleValue = slotConfig['title'];

        if (typeof titleValue === 'string') {
          Reflect.set(fileContent, `layout.${slotName}.title`, {
            message: titleValue,
            description: `Title of footer column "${slotName}"`,
          });
        }
      }
    }

    const sections: Lib_Translations_Runner_ExtractFooter_Sections = config['sections'];

    if (
      sections !== undefined
      && sections !== null
      && typeof sections === 'object'
    ) {
      const sectionEntries: Lib_Translations_Runner_ExtractFooter_SectionEntries = Object.entries(sections) as Lib_Translations_Runner_ExtractFooter_SectionEntries;

      for (const sectionEntry of sectionEntries) {
        const sectionName: Lib_Translations_Runner_ExtractFooter_SectionName = sectionEntry[0];
        const sectionLinks: Lib_Translations_Runner_ExtractFooter_SectionLinks = sectionEntry[1];

        if (Array.isArray(sectionLinks) === false) {
          continue;
        }

        sectionLinks.forEach((rawLink, linkIndex) => {
          if (rawLink === null || typeof rawLink !== 'object') {
            return undefined;
          }

          const link: Lib_Translations_Runner_ExtractFooter_Link = rawLink as Lib_Translations_Runner_ExtractFooter_Link;
          const labelValue: Lib_Translations_Runner_ExtractFooter_LabelValue = link['label'];

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

    const cta: Lib_Translations_Runner_ExtractFooter_Cta = config['cta'];

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
      const ctaObject: Lib_Translations_Runner_ExtractFooter_CtaObject = cta as Lib_Translations_Runner_ExtractFooter_CtaObject;
      const ctaLabelValue: Lib_Translations_Runner_ExtractFooter_CtaLabelValue = ctaObject['label'];

      if (typeof ctaLabelValue === 'string') {
        Reflect.set(fileContent, 'cta.label', {
          message: ctaLabelValue,
          description: 'The footer call-to-action link label',
        });
      }
    }

    const copyrightValue: Lib_Translations_Runner_ExtractFooter_CopyrightValue = config['copyright'];

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
   * @param {Lib_Translations_Runner_ApplyNavbar_Navbar}       navbar       - Navbar.
   * @param {Lib_Translations_Runner_ApplyNavbar_Translations} translations - Translations.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ApplyNavbar_Returns}
   *
   * @since 0.18.0
   */
  private static applyNavbar(navbar: Lib_Translations_Runner_ApplyNavbar_Navbar, translations: Lib_Translations_Runner_ApplyNavbar_Translations): Lib_Translations_Runner_ApplyNavbar_Returns {
    const items: Lib_Translations_Runner_ApplyNavbar_Items = navbar['items'] as Lib_Translations_Runner_ApplyNavbar_Items;

    if (items === undefined || Array.isArray(items) === false) {
      return undefined;
    }

    items.forEach((rawItem, itemIndex) => {
      if (rawItem === null || typeof rawItem !== 'object') {
        return undefined;
      }

      const item: Lib_Translations_Runner_ApplyNavbar_Item = rawItem;
      const labelMessage: Lib_Translations_Runner_ApplyNavbar_LabelMessage = translations[`item.${itemIndex}.label`];

      if (labelMessage !== undefined) {
        Reflect.set(item, 'label', labelMessage['message']);
      }

      const children: Lib_Translations_Runner_ApplyNavbar_Children = item['items'] as Lib_Translations_Runner_ApplyNavbar_Children;

      if (children !== undefined && Array.isArray(children) === true) {
        children.forEach((rawChild, childIndex) => {
          if (rawChild === null || typeof rawChild !== 'object') {
            return undefined;
          }

          const child: Lib_Translations_Runner_ApplyNavbar_Child = rawChild;
          const childMessage: Lib_Translations_Runner_ApplyNavbar_ChildMessage = translations[`item.${itemIndex}.items.${childIndex}.label`];

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
   * @param {Lib_Translations_Runner_ApplyBlog_Blog}         blog         - Blog.
   * @param {Lib_Translations_Runner_ApplyBlog_Translations} translations - Translations.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ApplyBlog_Returns}
   *
   * @since 0.18.0
   */
  private static applyBlog(blog: Lib_Translations_Runner_ApplyBlog_Blog, translations: Lib_Translations_Runner_ApplyBlog_Translations): Lib_Translations_Runner_ApplyBlog_Returns {
    const layout: Lib_Translations_Runner_ApplyBlog_Layout = blog['layout'] as Lib_Translations_Runner_ApplyBlog_Layout;

    if (
      layout === undefined
      || layout === null
      || typeof layout !== 'object'
    ) {
      return undefined;
    }

    const headingMessage: Lib_Translations_Runner_ApplyBlog_HeadingMessage = translations['layout.heading'];

    if (headingMessage !== undefined) {
      Reflect.set(layout, 'heading', headingMessage['message']);
    }

    const descriptionMessage: Lib_Translations_Runner_ApplyBlog_DescriptionMessage = translations['layout.description'];

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
   * @param {Lib_Translations_Runner_ApplyAnnouncementBar_AnnouncementBar} announcementBar - Announcement bar.
   * @param {Lib_Translations_Runner_ApplyAnnouncementBar_Translations}    translations    - Translations.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ApplyAnnouncementBar_Returns}
   *
   * @since 0.18.0
   */
  private static applyAnnouncementBar(announcementBar: Lib_Translations_Runner_ApplyAnnouncementBar_AnnouncementBar, translations: Lib_Translations_Runner_ApplyAnnouncementBar_Translations): Lib_Translations_Runner_ApplyAnnouncementBar_Returns {
    const message: Lib_Translations_Runner_ApplyAnnouncementBar_Message = translations['content'];

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
   * @param {Lib_Translations_Runner_ApplyErrorPages_ErrorPages}   errorPages   - Error pages.
   * @param {Lib_Translations_Runner_ApplyErrorPages_Translations} translations - Translations.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ApplyErrorPages_Returns}
   *
   * @since 0.18.0
   */
  private static applyErrorPages(errorPages: Lib_Translations_Runner_ApplyErrorPages_ErrorPages, translations: Lib_Translations_Runner_ApplyErrorPages_Translations): Lib_Translations_Runner_ApplyErrorPages_Returns {
    const notFound: Lib_Translations_Runner_ApplyErrorPages_NotFound = errorPages['notFound'] as Lib_Translations_Runner_ApplyErrorPages_NotFound;

    if (
      notFound !== undefined
      && notFound !== null
      && typeof notFound === 'object'
    ) {
      const titleMessage: Lib_Translations_Runner_ApplyErrorPages_TitleMessage = translations['notFound.title'];

      if (titleMessage !== undefined) {
        Reflect.set(notFound, 'title', titleMessage['message']);
      }

      const descriptionMessage: Lib_Translations_Runner_ApplyErrorPages_DescriptionMessage = translations['notFound.description'];

      if (descriptionMessage !== undefined) {
        Reflect.set(notFound, 'description', descriptionMessage['message']);
      }

      const backHomeLabelMessage: Lib_Translations_Runner_ApplyErrorPages_BackHomeLabelMessage = translations['notFound.backHomeLabel'];

      if (backHomeLabelMessage !== undefined) {
        Reflect.set(notFound, 'backHomeLabel', backHomeLabelMessage['message']);
      }
    }

    const errorPageContent: Lib_Translations_Runner_ApplyErrorPages_ErrorPageContent = errorPages['errorPageContent'] as Lib_Translations_Runner_ApplyErrorPages_ErrorPageContent;

    if (
      errorPageContent !== undefined
      && errorPageContent !== null
      && typeof errorPageContent === 'object'
    ) {
      const errorPageTitleMessage: Lib_Translations_Runner_ApplyErrorPages_ErrorPageTitleMessage = translations['errorPageContent.title'];

      if (errorPageTitleMessage !== undefined) {
        Reflect.set(errorPageContent, 'title', errorPageTitleMessage['message']);
      }

      const retryLabelMessage: Lib_Translations_Runner_ApplyErrorPages_RetryLabelMessage = translations['errorPageContent.retryLabel'];

      if (retryLabelMessage !== undefined) {
        Reflect.set(errorPageContent, 'retryLabel', retryLabelMessage['message']);
      }
    }

    const error: Lib_Translations_Runner_ApplyErrorPages_Error = errorPages['error'] as Lib_Translations_Runner_ApplyErrorPages_Error;

    if (
      error !== undefined
      && error !== null
      && typeof error === 'object'
    ) {
      const errorRetryLabelMessage: Lib_Translations_Runner_ApplyErrorPages_ErrorRetryLabelMessage = translations['error.retryLabel'];

      if (errorRetryLabelMessage !== undefined) {
        Reflect.set(error, 'retryLabel', errorRetryLabelMessage['message']);
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
   * @param {Lib_Translations_Runner_ApplyFooter_Footer}       footer       - Footer.
   * @param {Lib_Translations_Runner_ApplyFooter_Translations} translations - Translations.
   *
   * @private
   *
   * @returns {Lib_Translations_Runner_ApplyFooter_Returns}
   *
   * @since 0.18.0
   */
  private static applyFooter(footer: Lib_Translations_Runner_ApplyFooter_Footer, translations: Lib_Translations_Runner_ApplyFooter_Translations): Lib_Translations_Runner_ApplyFooter_Returns {
    const layout: Lib_Translations_Runner_ApplyFooter_Layout = footer['layout'] as Lib_Translations_Runner_ApplyFooter_Layout;

    if (
      layout !== undefined
      && layout !== null
      && typeof layout === 'object'
    ) {
      for (const slotName of Object.keys(layout)) {
        const slotConfig: Lib_Translations_Runner_ApplyFooter_SlotConfig = layout[slotName] as Lib_Translations_Runner_ApplyFooter_SlotConfig;

        if (slotConfig === null || typeof slotConfig !== 'object') {
          continue;
        }

        const titleMessage: Lib_Translations_Runner_ApplyFooter_TitleMessage = translations[`layout.${slotName}.title`];

        if (titleMessage !== undefined) {
          Reflect.set(slotConfig, 'title', titleMessage['message']);
        }
      }
    }

    const sections: Lib_Translations_Runner_ApplyFooter_Sections = footer['sections'] as Lib_Translations_Runner_ApplyFooter_Sections;

    if (
      sections !== undefined
      && sections !== null
      && typeof sections === 'object'
    ) {
      for (const sectionName of Object.keys(sections)) {
        const sectionLinks: Lib_Translations_Runner_ApplyFooter_SectionLinks = sections[sectionName] as Lib_Translations_Runner_ApplyFooter_SectionLinks;

        if (Array.isArray(sectionLinks) === false) {
          continue;
        }

        sectionLinks.forEach((rawLink, linkIndex) => {
          if (rawLink === null || typeof rawLink !== 'object') {
            return undefined;
          }

          const link: Lib_Translations_Runner_ApplyFooter_Link = rawLink;
          const labelMessage: Lib_Translations_Runner_ApplyFooter_LabelMessage = translations[`sections.${sectionName}.${linkIndex}.label`];

          if (labelMessage !== undefined) {
            Reflect.set(link, 'label', labelMessage['message']);
          }

          return undefined;
        });
      }
    }

    const cta: Lib_Translations_Runner_ApplyFooter_Cta = footer['cta'];

    if (typeof cta === 'string') {
      const ctaMessage: Lib_Translations_Runner_ApplyFooter_CtaMessage = translations['cta'];

      if (ctaMessage !== undefined) {
        Reflect.set(footer, 'cta', ctaMessage['message']);
      }
    } else if (
      cta !== undefined
      && cta !== null
      && typeof cta === 'object'
    ) {
      const ctaObject: Lib_Translations_Runner_ApplyFooter_CtaObject = cta as Lib_Translations_Runner_ApplyFooter_CtaObject;
      const ctaLabelMessage: Lib_Translations_Runner_ApplyFooter_CtaLabelMessage = translations['cta.label'];

      if (ctaLabelMessage !== undefined) {
        Reflect.set(ctaObject, 'label', ctaLabelMessage['message']);
      }
    }

    const copyrightMessage: Lib_Translations_Runner_ApplyFooter_CopyrightMessage = translations['copyright'];

    if (copyrightMessage !== undefined) {
      Reflect.set(footer, 'copyright', copyrightMessage['message']);
    }

    return undefined;
  }
}
