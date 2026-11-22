import type { JSX } from 'react';
import type { vi } from 'vitest';

/**
 * Tests - Theme - Navbar - More - Collect Rules.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_CollectRules_Css = string;

export type Tests_Theme_Navbar_More_Index_CollectRules_Rule_Selectors = string[];

export type Tests_Theme_Navbar_More_Index_CollectRules_Rule_Declarations = string[];

export type Tests_Theme_Navbar_More_Index_CollectRules_Rule = {
  selectors: Tests_Theme_Navbar_More_Index_CollectRules_Rule_Selectors;
  declarations: Tests_Theme_Navbar_More_Index_CollectRules_Rule_Declarations;
};

export type Tests_Theme_Navbar_More_Index_CollectRules_Returns = Tests_Theme_Navbar_More_Index_CollectRules_Rule[];

export type Tests_Theme_Navbar_More_Index_CollectRules_CommentPattern = RegExp;

export type Tests_Theme_Navbar_More_Index_CollectRules_WhitespacePattern = RegExp;

export type Tests_Theme_Navbar_More_Index_CollectRules_StrippedCss = string;

export type Tests_Theme_Navbar_More_Index_CollectRules_Rules = Tests_Theme_Navbar_More_Index_CollectRules_Rule[];

export type Tests_Theme_Navbar_More_Index_CollectRules_Chunk = string;

export type Tests_Theme_Navbar_More_Index_CollectRules_OpenIndex = number;

export type Tests_Theme_Navbar_More_Index_CollectRules_BeforeOpen = string;

export type Tests_Theme_Navbar_More_Index_CollectRules_Selector = string;

/**
 * Tests - Theme - Navbar - More - Docusaurus Router - Mock Module.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_DocusaurusRouter_MockModule_UseLocation = ReturnType<typeof vi['fn']>;

export type Tests_Theme_Navbar_More_Index_DocusaurusRouter_MockModule = Readonly<{
  useLocation: Tests_Theme_Navbar_More_Index_DocusaurusRouter_MockModule_UseLocation;
}>;

/**
 * Tests - Theme - Navbar - More - Docusaurus Translate - Mock Module.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_DocusaurusTranslate_MockModule_Translate = ReturnType<typeof vi['fn']>;

export type Tests_Theme_Navbar_More_Index_DocusaurusTranslate_MockModule = Readonly<{
  translate: Tests_Theme_Navbar_More_Index_DocusaurusTranslate_MockModule_Translate;
}>;

/**
 * Tests - Theme - Navbar - More - Get Package Root.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_GetPackageRoot_Returns = string;

export type Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFilePath = string;

export type Tests_Theme_Navbar_More_Index_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Theme - Navbar - More - Iconify React Offline - Mock Module.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_IconifyReactOffline_MockModule_Icon = ReturnType<typeof vi['fn']>;

export type Tests_Theme_Navbar_More_Index_IconifyReactOffline_MockModule = Readonly<{
  Icon: Tests_Theme_Navbar_More_Index_IconifyReactOffline_MockModule_Icon;
}>;

/**
 * Tests - Theme - Navbar - More - More - Lists A Dropdown Item As A Group Of Links.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items_Item_Label = string;

export type Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items_Item = {
  label: Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items_Item_Label;
  [key: string]: unknown;
};

export type Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items = Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Items_Item[];

export type Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_Markup = string;

export type Tests_Theme_Navbar_More_Index_More_ListsADropdownItemAsAGroupOfLinks_GroupLabelIdCount = number;

/**
 * Tests - Theme - Navbar - More - More Across Presets And Variants.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PackageRoot = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantNames = readonly string[];

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items_Item_Label = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items_Item = {
  label: Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items_Item_Label;
  [key: string]: unknown;
};

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items = Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Items_Item[];

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetName = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantName = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSourcePath = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantSource = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_VariantClass = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCssPath = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCssPath = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCssPath = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetNavbarCss = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetMoreCss = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_PresetVariantCss = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_Markup = string;

export type Tests_Theme_Navbar_More_Index_MoreAcrossPresetsAndVariants_DetailsCount = number;

/**
 * Tests - Theme - Navbar - More - More Chrome Across Presets.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PackageRoot = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarCssNames = readonly string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusControls = readonly string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_BlockProperties = readonly string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetProperties = readonly string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetName = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetCss = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarSources = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule_Selectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule_Declarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule = {
  selectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule_Selectors;
  declarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule_Declarations;
};

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules = Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetRules_Rule[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule_Selectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule_Declarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule = {
  selectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule_Selectors;
  declarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule_Declarations;
};

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules = Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_NavbarRules_Rule[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UnringedControls = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_UniversalRing = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_MouseRing = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PresetSelectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OutlineDeclarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusFreeSelector = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_FocusSelector = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightRing = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkRing = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingCleared = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LightMatch = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DarkMatch = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RingDeclarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_ControlRinged = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorSources = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule_Selectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule_Declarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule = {
  selectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule_Selectors;
  declarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule_Declarations;
};

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules = Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorRules_Rule[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupSeparator = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowBottom = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowTop = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_GroupBottom = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_RowYield = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_LastRowYield = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainSelectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_PlainDeclarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsTop = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DrawsBottom = boolean;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetSources = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule_Selectors = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule_Declarations = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule = {
  selectors: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule_Selectors;
  declarations: Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule_Declarations;
};

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules = Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DropdownOffset = Record<string, string>;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_MoreOffset = Record<string, string>;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRule = Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_OffsetRules_Rule;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_Declaration = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_SeparatorIndex = number;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_Property = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_Value = string;

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_DropdownBlockOffset = string[];

export type Tests_Theme_Navbar_More_Index_MoreChromeAcrossPresets_MoreBlockOffset = string[];

/**
 * Tests - Theme - Navbar - More - Render Link.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_RenderLink_LinkProps = Record<string, unknown>;

export type Tests_Theme_Navbar_More_Index_RenderLink_Returns = JSX.Element;

export type Tests_Theme_Navbar_More_Index_RenderLink_Href = string | undefined;

export type Tests_Theme_Navbar_More_Index_RenderLink_AriaCurrent = 'page' | undefined;

export type Tests_Theme_Navbar_More_Index_RenderLink_Label = string;

/**
 * Tests - Theme - Navbar - More - Theme Navbar Item - Mock Module.
 *
 * @since 0.50.0
 */
export type Tests_Theme_Navbar_More_Index_ThemeNavbarItem_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Theme_Navbar_More_Index_ThemeNavbarItem_MockModule = Readonly<{
  default: Tests_Theme_Navbar_More_Index_ThemeNavbarItem_MockModule_Default;
}>;
