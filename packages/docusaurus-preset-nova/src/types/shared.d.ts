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

export type Shared_Preset_Logo_Title = string;

export type Shared_Preset_Logo_Alt = string;

export type Shared_Preset_Logo_Src = string;

export type Shared_Preset_Logo = {
  title: Shared_Preset_Logo_Title;
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

export type Shared_SearchWorkerSearchMessage = {
  type: Shared_SearchWorkerSearchMessage_Type;
  query: Shared_SearchWorkerSearchMessage_Query;
  limit: Shared_SearchWorkerSearchMessage_Limit;
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
