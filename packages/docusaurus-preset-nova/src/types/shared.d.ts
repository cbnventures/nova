import type {
  TranslationFile,
  TranslationFileContent,
} from '@docusaurus/types';

/**
 * Shared - Color Scale.
 *
 * @since 0.15.0
 */
export type Shared_ColorScaleKey = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type Shared_ColorScaleValue = string;

export type Shared_ColorScale = Record<Shared_ColorScaleKey, Shared_ColorScaleValue>;

/**
 * Shared - Hast Node.
 *
 * @since 0.15.0
 */
export type Shared_HastNode_Type = string;

export type Shared_HastNode_TagName = string | undefined;

export type Shared_HastNode_Properties = Record<string, unknown>;

export type Shared_HastNode_Value = string | undefined;

export type Shared_HastNode_Data = Record<string, unknown> | undefined;

export type Shared_HastNode = {
  type: Shared_HastNode_Type;
  tagName?: Shared_HastNode_TagName;
  properties?: Shared_HastNode_Properties;
  children?: Shared_HastNode_Children;
  value?: Shared_HastNode_Value;
  data?: Shared_HastNode_Data;
};

export type Shared_HastNode_Children = Shared_HastNode[];

/**
 * Shared - Hast Node Result.
 *
 * @since 0.15.0
 */
export type Shared_HastNodeResult_Node = Shared_HastNode;

export type Shared_HastNodeResult_Index = number;

export type Shared_HastNodeResult_Parent = Shared_HastNode;

export type Shared_HastNodeResult = {
  node: Shared_HastNodeResult_Node;
  index: Shared_HastNodeResult_Index;
  parent: Shared_HastNodeResult_Parent;
};

/**
 * Shared - Hex Color.
 *
 * @since 0.15.0
 */
export type Shared_HexColor = string;

/**
 * Shared - Hsl Color.
 *
 * @since 0.15.0
 */
export type Shared_HslColor_Hue = number;

export type Shared_HslColor_Saturation = number;

export type Shared_HslColor_Lightness = number;

export type Shared_HslColor = {
  hue: Shared_HslColor_Hue;
  saturation: Shared_HslColor_Saturation;
  lightness: Shared_HslColor_Lightness;
};

/**
 * Shared - Mermaid.
 *
 * @since 0.15.0
 */
export type Shared_MermaidRenderOutput_Svg = string;

export type Shared_MermaidRenderOutput_BindFunctions = ((element: Element) => void) | undefined;

export type Shared_MermaidRenderOutput = {
  svg: Shared_MermaidRenderOutput_Svg;
  bindFunctions?: Shared_MermaidRenderOutput_BindFunctions;
};

export type Shared_MermaidConfig_StartOnLoad = boolean;

export type Shared_MermaidConfig_Theme = string;

export type Shared_MermaidConfig_ColorMode = string;

export type Shared_MermaidConfig = {
  startOnLoad: Shared_MermaidConfig_StartOnLoad;
  theme: Shared_MermaidConfig_Theme;
  colorMode: Shared_MermaidConfig_ColorMode;
  [key: string]: unknown;
};

/**
 * Shared - Preset.
 *
 * @since 0.15.0
 */
export type Shared_PresetName = 'envoy' | 'foundry' | 'lantern' | 'marshal' | 'sentinel' | 'signal';

export type Shared_Preset_Colors_Primary_Light = Shared_HexColor;

export type Shared_Preset_Colors_Primary_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Primary = {
  light: Shared_Preset_Colors_Primary_Light;
  dark: Shared_Preset_Colors_Primary_Dark;
};

export type Shared_Preset_Colors_Accent_Light = Shared_HexColor;

export type Shared_Preset_Colors_Accent_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Accent = {
  light: Shared_Preset_Colors_Accent_Light;
  dark: Shared_Preset_Colors_Accent_Dark;
};

export type Shared_Preset_Colors_Text_Light = Shared_HexColor;

export type Shared_Preset_Colors_Text_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Text = {
  light: Shared_Preset_Colors_Text_Light;
  dark: Shared_Preset_Colors_Text_Dark;
};

export type Shared_Preset_Colors_Border_Light = Shared_HexColor;

export type Shared_Preset_Colors_Border_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Border = {
  light: Shared_Preset_Colors_Border_Light;
  dark: Shared_Preset_Colors_Border_Dark;
};

export type Shared_Preset_Colors_Warning_Light = Shared_HexColor;

export type Shared_Preset_Colors_Warning_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Warning = {
  light: Shared_Preset_Colors_Warning_Light;
  dark: Shared_Preset_Colors_Warning_Dark;
};

export type Shared_Preset_Colors_Danger_Light = Shared_HexColor;

export type Shared_Preset_Colors_Danger_Dark = Shared_HexColor;

export type Shared_Preset_Colors_Danger = {
  light: Shared_Preset_Colors_Danger_Light;
  dark: Shared_Preset_Colors_Danger_Dark;
};

export type Shared_Preset_Colors = {
  primary: Shared_Preset_Colors_Primary;
  accent: Shared_Preset_Colors_Accent;
  text: Shared_Preset_Colors_Text;
  border: Shared_Preset_Colors_Border;
  warning: Shared_Preset_Colors_Warning;
  danger: Shared_Preset_Colors_Danger;
};

export type Shared_Preset_Fonts_Display = string;

export type Shared_Preset_Fonts_Body = string;

export type Shared_Preset_Fonts_Code = string;

export type Shared_Preset_Fonts = {
  display: Shared_Preset_Fonts_Display;
  body: Shared_Preset_Fonts_Body;
  code: Shared_Preset_Fonts_Code;
};

export type Shared_Preset_Shape_Radius = 'sharp' | 'rounded' | 'pill';

export type Shared_Preset_Shape_Density = 'compact' | 'comfortable' | 'spacious';

export type Shared_Preset_Shape = {
  radius: Shared_Preset_Shape_Radius;
  density: Shared_Preset_Shape_Density;
};

export type Shared_Preset_Depth_Cards = 'flat' | 'elevated' | 'glass';

export type Shared_Preset_Depth_CodeBlocks = 'flat' | 'bordered' | 'elevated';

export type Shared_Preset_Depth = {
  cards: Shared_Preset_Depth_Cards;
  codeBlocks: Shared_Preset_Depth_CodeBlocks;
};

export type Shared_Preset_Motion_Speed = 'none' | 'subtle' | 'normal' | 'expressive';

export type Shared_Preset_Motion_StaggeredReveals = boolean;

export type Shared_Preset_Motion_HoverEffects = boolean;

export type Shared_Preset_Motion = {
  speed: Shared_Preset_Motion_Speed;
  staggeredReveals: Shared_Preset_Motion_StaggeredReveals;
  hoverEffects: Shared_Preset_Motion_HoverEffects;
};

export type Shared_Preset_Navbar = 'bridge' | 'canopy' | 'monolith' | 'compass';

export type Shared_Preset_Footer = 'commons' | 'embassy' | 'ledger' | 'launchpad';

export type Shared_Preset_Cta_Contained = boolean;

export type Shared_Preset_Cta = {
  contained: Shared_Preset_Cta_Contained;
};

export type Shared_Preset_Logo_Alt = string;

export type Shared_Preset_Logo_Src = string;

export type Shared_Preset_Logo = {
  alt: Shared_Preset_Logo_Alt;
  src: Shared_Preset_Logo_Src;
};

export type Shared_Preset = {
  logo: Shared_Preset_Logo;
  colors: Shared_Preset_Colors;
  fonts: Shared_Preset_Fonts;
  shape: Shared_Preset_Shape;
  depth: Shared_Preset_Depth;
  motion: Shared_Preset_Motion;
  navbar: Shared_Preset_Navbar;
  footer: Shared_Preset_Footer;
  cta: Shared_Preset_Cta;
};

/**
 * Shared - Search Worker Document.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerDocument_Path = string;

export type Shared_SearchWorkerDocument_Title = string;

export type Shared_SearchWorkerDocument_Snippet = string;

export type Shared_SearchWorkerDocument_Body = string;

export type Shared_SearchWorkerDocument = {
  path: Shared_SearchWorkerDocument_Path;
  title: Shared_SearchWorkerDocument_Title;
  snippet: Shared_SearchWorkerDocument_Snippet;
  body: Shared_SearchWorkerDocument_Body;
};

export type Shared_SearchWorkerDocuments = Shared_SearchWorkerDocument[];

/**
 * Shared - Search Worker Error Response.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerErrorResponse_Type = 'error';

export type Shared_SearchWorkerErrorResponse_Reason = string;

export type Shared_SearchWorkerErrorResponse = {
  type: Shared_SearchWorkerErrorResponse_Type;
  reason: Shared_SearchWorkerErrorResponse_Reason;
};

/**
 * Shared - Search Worker Init Message.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerInitMessage_Type = 'init';

export type Shared_SearchWorkerInitMessage_IndexUrl = string;

export type Shared_SearchWorkerInitMessage = {
  type: Shared_SearchWorkerInitMessage_Type;
  indexUrl: Shared_SearchWorkerInitMessage_IndexUrl;
};

/**
 * Shared - Search Worker Lunr Result.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerLunrResult_Ref = string;

export type Shared_SearchWorkerLunrResult_Score = number;

export type Shared_SearchWorkerLunrResult_MatchData_Metadata = Record<string, unknown>;

export type Shared_SearchWorkerLunrResult_MatchData = {
  metadata: Shared_SearchWorkerLunrResult_MatchData_Metadata;
};

export type Shared_SearchWorkerLunrResult = {
  ref: Shared_SearchWorkerLunrResult_Ref;
  score: Shared_SearchWorkerLunrResult_Score;
  matchData: Shared_SearchWorkerLunrResult_MatchData;
};

/**
 * Shared - Search Worker Message.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerMessage = Shared_SearchWorkerInitMessage | Shared_SearchWorkerSearchMessage;

/**
 * Shared - Search Worker Ready Response.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerReadyResponse_Type = 'ready';

export type Shared_SearchWorkerReadyResponse = {
  type: Shared_SearchWorkerReadyResponse_Type;
};

/**
 * Shared - Search Worker Response.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerResponse = Shared_SearchWorkerReadyResponse | Shared_SearchWorkerResultsResponse | Shared_SearchWorkerErrorResponse;

/**
 * Shared - Search Worker Search Hit.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerSearchHit_Path = string;

export type Shared_SearchWorkerSearchHit_Title = string;

export type Shared_SearchWorkerSearchHit_Snippet = string;

export type Shared_SearchWorkerSearchHit_Score = number;

export type Shared_SearchWorkerSearchHitSnippetSegment_Text = string;

export type Shared_SearchWorkerSearchHitSnippetSegment_Highlight = boolean;

export type Shared_SearchWorkerSearchHitSnippetSegment = {
  text: Shared_SearchWorkerSearchHitSnippetSegment_Text;
  highlight: Shared_SearchWorkerSearchHitSnippetSegment_Highlight;
};

export type Shared_SearchWorkerSearchHit_SnippetSegments = Shared_SearchWorkerSearchHitSnippetSegment[];

export type Shared_SearchWorkerSearchHit = {
  path: Shared_SearchWorkerSearchHit_Path;
  title: Shared_SearchWorkerSearchHit_Title;
  snippet: Shared_SearchWorkerSearchHit_Snippet;
  snippetSegments: Shared_SearchWorkerSearchHit_SnippetSegments;
  score: Shared_SearchWorkerSearchHit_Score;
};

/**
 * Shared - Search Worker Results Response.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerResultsResponse_Type = 'results';

export type Shared_SearchWorkerResultsResponse_Hits = Shared_SearchWorkerSearchHit[];

export type Shared_SearchWorkerResultsResponse = {
  type: Shared_SearchWorkerResultsResponse_Type;
  hits: Shared_SearchWorkerResultsResponse_Hits;
};

/**
 * Shared - Search Worker Search Message.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerSearchMessage_Type = 'search';

export type Shared_SearchWorkerSearchMessage_Query = string;

export type Shared_SearchWorkerSearchMessage_Limit = number;

export type Shared_SearchWorkerSearchMessage_FuzzyDistance = number;

export type Shared_SearchWorkerSearchMessage = {
  type: Shared_SearchWorkerSearchMessage_Type;
  query: Shared_SearchWorkerSearchMessage_Query;
  limit: Shared_SearchWorkerSearchMessage_Limit;
  fuzzyDistance: Shared_SearchWorkerSearchMessage_FuzzyDistance;
};

/**
 * Shared - Search Worker Test Document.
 *
 * @since 0.15.0
 */
export type Shared_SearchWorkerTestDocument_Path = string;

export type Shared_SearchWorkerTestDocument_Title = string;

export type Shared_SearchWorkerTestDocument_Snippet = string;

export type Shared_SearchWorkerTestDocument_Body = string;

export type Shared_SearchWorkerTestDocument = {
  path: Shared_SearchWorkerTestDocument_Path;
  title: Shared_SearchWorkerTestDocument_Title;
  snippet: Shared_SearchWorkerTestDocument_Snippet;
  body: Shared_SearchWorkerTestDocument_Body;
};

/**
 * Shared - Shade Level.
 *
 * @since 0.15.0
 */
export type Shared_ShadeLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/**
 * Shared - Surface.
 *
 * @since 0.15.0
 */
export type Shared_Surface = 'alt';

/**
 * Shared - Toc Heading.
 *
 * @since 0.15.0
 */
export type Shared_TocHeading_Value = string;

export type Shared_TocHeading_Id = string;

export type Shared_TocHeading_Level = number;

export type Shared_TocHeading_Children = Array<Shared_TocHeading>;

export type Shared_TocHeading = {
  value: Shared_TocHeading_Value;
  id: Shared_TocHeading_Id;
  level: Shared_TocHeading_Level;
  children: Shared_TocHeading_Children;
};

/**
 * Shared - Toc Overlay Payload.
 *
 * @since 0.21.0
 */
export type Shared_TocOverlayPayload_TreeItems = Shared_TocHeading[];

export type Shared_TocOverlayPayload = {
  treeItems: Shared_TocOverlayPayload_TreeItems;
} | undefined;

/**
 * Shared - Iconify Icon Entry.
 *
 * @since 0.19.0
 */
export type Shared_IconifyIconEntry = Record<string, unknown>;

/**
 * Shared - Iconify Alias Entry.
 *
 * @since 0.19.0
 */
export type Shared_IconifyAliasEntry_Parent = string;

export type Shared_IconifyAliasEntry = {
  parent: Shared_IconifyAliasEntry_Parent;
  [key: string]: unknown;
};

/**
 * Shared - Iconify Collection.
 *
 * @since 0.19.0
 */
export type Shared_IconifyCollection_Prefix = string;

export type Shared_IconifyCollection_Icons = Record<string, Shared_IconifyIconEntry>;

export type Shared_IconifyCollection_Aliases = Record<string, Shared_IconifyAliasEntry>;

export type Shared_IconifyCollection_Width = number;

export type Shared_IconifyCollection_Height = number;

export type Shared_IconifyCollection = {
  prefix: Shared_IconifyCollection_Prefix;
  icons: Shared_IconifyCollection_Icons;
  aliases?: Shared_IconifyCollection_Aliases;
  width?: Shared_IconifyCollection_Width;
  height?: Shared_IconifyCollection_Height;
  [key: string]: unknown;
};

/**
 * Shared - Iconify Collections Index.
 *
 * @since 0.19.0
 */
export type Shared_IconifyCollectionsIndex = Record<string, unknown>;

/**
 * Shared - Icon Slice.
 *
 * @since 0.19.0
 */
export type Shared_IconSlice_Icons = Set<string>;

export type Shared_IconSlice_Aliases = Set<string>;

export type Shared_IconSlice = {
  icons: Shared_IconSlice_Icons;
  aliases: Shared_IconSlice_Aliases;
};

/**
 * Shared - Icon Slices.
 *
 * @since 0.19.0
 */
export type Shared_IconSlices = Map<string, Shared_IconSlice>;

/**
 * Shared - Icon Loaded Collections.
 *
 * @since 0.19.0
 */
export type Shared_IconLoadedCollections = Map<string, Shared_IconifyCollection | undefined>;

/**
 * Shared - Icon Sliced Collection.
 *
 * @since 0.19.0
 */
export type Shared_IconSlicedCollection = Record<string, unknown>;

/**
 * Shared - I18n Classification.
 *
 * @since 0.21.0
 */
export type Shared_I18nClassification = 'keep' | 'redundant-live' | 'redundant-stale' | 'orphan' | 'seed';

/**
 * Shared - I18n Action.
 *
 * @since 0.21.0
 */
export type Shared_I18nAction = 'keep' | 'drop' | 'seed' | 'gate';

/**
 * Shared - I18n Plan Entry.
 *
 * @since 0.21.0
 */
export type Shared_I18nPlanEntry_Key = string;

export type Shared_I18nPlanEntry_Classification = Shared_I18nClassification;

export type Shared_I18nPlanEntry_Action = Shared_I18nAction;

export type Shared_I18nPlanEntry_Message = string;

export type Shared_I18nPlanEntry_Description = string | undefined;

export type Shared_I18nPlanEntry = {
  key: Shared_I18nPlanEntry_Key;
  classification: Shared_I18nPlanEntry_Classification;
  action: Shared_I18nPlanEntry_Action;
  message: Shared_I18nPlanEntry_Message;
  description: Shared_I18nPlanEntry_Description;
};

/**
 * Shared - I18n File Plan.
 *
 * @since 0.21.0
 */
export type Shared_I18nFilePlan_Scope = string;

export type Shared_I18nFilePlan_Keep = Shared_I18nPlanEntry[];

export type Shared_I18nFilePlan_Add = Shared_I18nPlanEntry[];

export type Shared_I18nFilePlan_DropRedundant = Shared_I18nPlanEntry[];

export type Shared_I18nFilePlan_Orphan = Shared_I18nPlanEntry[];

export type Shared_I18nFilePlan_Content = TranslationFileContent;

export type Shared_I18nFilePlan = {
  scope: Shared_I18nFilePlan_Scope;
  keep: Shared_I18nFilePlan_Keep;
  add: Shared_I18nFilePlan_Add;
  dropRedundant: Shared_I18nFilePlan_DropRedundant;
  orphan: Shared_I18nFilePlan_Orphan;
  content: Shared_I18nFilePlan_Content;
};

/**
 * Shared - I18n Gather Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nGatherLocale_Locale = string;

export type Shared_I18nGatherLocale_LocalizationDir = string;

export type Shared_I18nGatherLocale_IsDefaultLocale = boolean;

export type Shared_I18nGatherLocale_Registry = Record<string, string>;

export type Shared_I18nGatherLocale_AreaFiles = TranslationFile[];

export type Shared_I18nGatherLocale_ExistingCode = TranslationFileContent;

export type Shared_I18nGatherLocale_ExistingArea = Map<string, TranslationFileContent>;

export type Shared_I18nGatherLocale = {
  locale: Shared_I18nGatherLocale_Locale;
  localizationDir: Shared_I18nGatherLocale_LocalizationDir;
  isDefaultLocale: Shared_I18nGatherLocale_IsDefaultLocale;
  registry: Shared_I18nGatherLocale_Registry;
  areaFiles: Shared_I18nGatherLocale_AreaFiles;
  existingCode: Shared_I18nGatherLocale_ExistingCode;
  existingArea: Shared_I18nGatherLocale_ExistingArea;
};

/**
 * Shared - I18n Gather Result.
 *
 * @since 0.21.0
 */
export type Shared_I18nGatherResult_SiteDir = string;

export type Shared_I18nGatherResult_DefaultLocale = string;

export type Shared_I18nGatherResult_Locales = string[];

export type Shared_I18nGatherResult_LiveSiteKeys = Set<string>;

export type Shared_I18nGatherResult_ThemeLiveKeys = Set<string>;

export type Shared_I18nGatherResult_SiteExtract = TranslationFileContent;

export type Shared_I18nGatherResult_ThemeDefaults = Record<string, string>;

export type Shared_I18nGatherResult_PerLocale = Shared_I18nGatherLocale[];

export type Shared_I18nGatherResult = {
  siteDir: Shared_I18nGatherResult_SiteDir;
  defaultLocale: Shared_I18nGatherResult_DefaultLocale;
  locales: Shared_I18nGatherResult_Locales;
  liveSiteKeys: Shared_I18nGatherResult_LiveSiteKeys;
  themeLiveKeys: Shared_I18nGatherResult_ThemeLiveKeys;
  siteExtract: Shared_I18nGatherResult_SiteExtract;
  themeDefaults: Shared_I18nGatherResult_ThemeDefaults;
  perLocale: Shared_I18nGatherResult_PerLocale;
};

/**
 * Shared - I18n Locale Plan.
 *
 * @since 0.21.0
 */
export type Shared_I18nLocalePlan_Locale = string;

export type Shared_I18nLocalePlan_LocalizationDir = string;

export type Shared_I18nLocalePlan_IsDefaultLocale = boolean;

export type Shared_I18nLocalePlan_Files = Shared_I18nFilePlan[];

export type Shared_I18nLocalePlan = {
  locale: Shared_I18nLocalePlan_Locale;
  localizationDir: Shared_I18nLocalePlan_LocalizationDir;
  isDefaultLocale: Shared_I18nLocalePlan_IsDefaultLocale;
  files: Shared_I18nLocalePlan_Files;
};

/**
 * Shared - I18n Plan.
 *
 * @since 0.21.0
 */
export type Shared_I18nPlan_SiteDir = string;

export type Shared_I18nPlan_Locales = Shared_I18nLocalePlan[];

export type Shared_I18nPlan = {
  siteDir: Shared_I18nPlan_SiteDir;
  locales: Shared_I18nPlan_Locales;
};

/**
 * Shared - I18n Decision.
 *
 * @since 0.21.0
 */
export type Shared_I18nDecision = 'confirm' | 'decline' | 'cancel';

/**
 * Shared - I18n Confirm.
 *
 * @since 0.21.0
 */
export type Shared_I18nConfirm_Locale = string;

export type Shared_I18nConfirm_Scope = string;

export type Shared_I18nConfirm_Entries = Shared_I18nPlanEntry[];

export type Shared_I18nConfirm = (locale: Shared_I18nConfirm_Locale, scope: Shared_I18nConfirm_Scope, entries: Shared_I18nConfirm_Entries) => Promise<Shared_I18nDecision>;

/**
 * Shared - I18n Apply Result.
 *
 * @since 0.21.0
 */
export type Shared_I18nApplyResult_Written = string[];

export type Shared_I18nApplyResult_Removed = string[];

export type Shared_I18nApplyResult_Blocked = boolean;

export type Shared_I18nApplyResult_Cancelled = boolean;

export type Shared_I18nApplyResult = {
  written: Shared_I18nApplyResult_Written;
  removed: Shared_I18nApplyResult_Removed;
  blocked: Shared_I18nApplyResult_Blocked;
  cancelled: Shared_I18nApplyResult_Cancelled;
};

/**
 * Shared - I18n Content Scan Descriptor.
 *
 * @since 0.21.0
 */
export type Shared_I18nContentScanDescriptor_PluginName = string;

export type Shared_I18nContentScanDescriptor_PluginId = string;

export type Shared_I18nContentScanDescriptor_Short = string;

export type Shared_I18nContentScanDescriptor_SourceDir = string;

export type Shared_I18nContentScanDescriptor_VersionSegment = string | null;

export type Shared_I18nContentScanDescriptor = {
  pluginName: Shared_I18nContentScanDescriptor_PluginName;
  pluginId: Shared_I18nContentScanDescriptor_PluginId;
  short: Shared_I18nContentScanDescriptor_Short;
  sourceDir: Shared_I18nContentScanDescriptor_SourceDir;
  versionSegment: Shared_I18nContentScanDescriptor_VersionSegment;
};

/**
 * Shared - I18n Content Scan Result Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nContentScanResultLocale_Locale = string;

export type Shared_I18nContentScanResultLocale_IsDefaultLocale = boolean;

export type Shared_I18nContentScanResultLocale_Present = Set<string>;

export type Shared_I18nContentScanResultLocale = {
  locale: Shared_I18nContentScanResultLocale_Locale;
  isDefaultLocale: Shared_I18nContentScanResultLocale_IsDefaultLocale;
  present: Shared_I18nContentScanResultLocale_Present;
};

/**
 * Shared - I18n Content Scan Result.
 *
 * @since 0.21.0
 */
export type Shared_I18nContentScanResult_Sources = string[];

export type Shared_I18nContentScanResult_PerLocale = Shared_I18nContentScanResultLocale[];

export type Shared_I18nContentScanResult = {
  sources: Shared_I18nContentScanResult_Sources;
  perLocale: Shared_I18nContentScanResult_PerLocale;
};

/**
 * Shared - I18n Coverage Content Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageContentLocale_Locale = string;

export type Shared_I18nCoverageContentLocale_IsDefaultLocale = boolean;

export type Shared_I18nCoverageContentLocale_Present = number;

export type Shared_I18nCoverageContentLocale_Missing = string[];

export type Shared_I18nCoverageContentLocale = {
  locale: Shared_I18nCoverageContentLocale_Locale;
  isDefaultLocale: Shared_I18nCoverageContentLocale_IsDefaultLocale;
  present: Shared_I18nCoverageContentLocale_Present;
  missing: Shared_I18nCoverageContentLocale_Missing;
};

/**
 * Shared - I18n Coverage Content Report.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageContentReport_Total = number;

export type Shared_I18nCoverageContentReport_Locales = Shared_I18nCoverageContentLocale[];

export type Shared_I18nCoverageContentReport = {
  total: Shared_I18nCoverageContentReport_Total;
  locales: Shared_I18nCoverageContentReport_Locales;
};

/**
 * Shared - I18n Coverage Input Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageInputLocale_Locale = string;

export type Shared_I18nCoverageInputLocale_IsDefaultLocale = boolean;

export type Shared_I18nCoverageInputLocale_Translated = Set<string>;

export type Shared_I18nCoverageInputLocale = {
  locale: Shared_I18nCoverageInputLocale_Locale;
  isDefaultLocale: Shared_I18nCoverageInputLocale_IsDefaultLocale;
  translated: Shared_I18nCoverageInputLocale_Translated;
};

/**
 * Shared - I18n Coverage Json Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageJsonLocale_Locale = string;

export type Shared_I18nCoverageJsonLocale_IsDefaultLocale = boolean;

export type Shared_I18nCoverageJsonLocale_Translated = number;

export type Shared_I18nCoverageJsonLocale_DefiniteGaps = string[];

export type Shared_I18nCoverageJsonLocale_SoftGaps = string[];

export type Shared_I18nCoverageJsonLocale = {
  locale: Shared_I18nCoverageJsonLocale_Locale;
  isDefaultLocale: Shared_I18nCoverageJsonLocale_IsDefaultLocale;
  translated: Shared_I18nCoverageJsonLocale_Translated;
  definiteGaps: Shared_I18nCoverageJsonLocale_DefiniteGaps;
  softGaps: Shared_I18nCoverageJsonLocale_SoftGaps;
};

/**
 * Shared - I18n Coverage Json Report.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageJsonReport_UniverseSize = number;

export type Shared_I18nCoverageJsonReport_UnionSize = number;

export type Shared_I18nCoverageJsonReport_Locales = Shared_I18nCoverageJsonLocale[];

export type Shared_I18nCoverageJsonReport = {
  universeSize: Shared_I18nCoverageJsonReport_UniverseSize;
  unionSize: Shared_I18nCoverageJsonReport_UnionSize;
  locales: Shared_I18nCoverageJsonReport_Locales;
};

/**
 * Shared - I18n Coverage Locale.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageLocale_Locale = string;

export type Shared_I18nCoverageLocale_IsDefaultLocale = boolean;

export type Shared_I18nCoverageLocale_Percent = number;

export type Shared_I18nCoverageLocale_JsonTranslated = number;

export type Shared_I18nCoverageLocale_JsonTotal = number;

export type Shared_I18nCoverageLocale_ContentPresent = number;

export type Shared_I18nCoverageLocale_ContentTotal = number;

export type Shared_I18nCoverageLocale_DefiniteGaps = string[];

export type Shared_I18nCoverageLocale_SoftGaps = string[];

export type Shared_I18nCoverageLocale_MissingContent = string[];

export type Shared_I18nCoverageLocale = {
  locale: Shared_I18nCoverageLocale_Locale;
  isDefaultLocale: Shared_I18nCoverageLocale_IsDefaultLocale;
  percent: Shared_I18nCoverageLocale_Percent;
  jsonTranslated: Shared_I18nCoverageLocale_JsonTranslated;
  jsonTotal: Shared_I18nCoverageLocale_JsonTotal;
  contentPresent: Shared_I18nCoverageLocale_ContentPresent;
  contentTotal: Shared_I18nCoverageLocale_ContentTotal;
  definiteGaps: Shared_I18nCoverageLocale_DefiniteGaps;
  softGaps: Shared_I18nCoverageLocale_SoftGaps;
  missingContent: Shared_I18nCoverageLocale_MissingContent;
};

/**
 * Shared - I18n Coverage Report.
 *
 * @since 0.21.0
 */
export type Shared_I18nCoverageReport_Locales = Shared_I18nCoverageLocale[];

export type Shared_I18nCoverageReport = {
  locales: Shared_I18nCoverageReport_Locales;
};
