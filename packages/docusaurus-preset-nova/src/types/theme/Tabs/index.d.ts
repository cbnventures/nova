import type { TabsProps, TabValue } from '@docusaurus/theme-common/internal';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Tabs.
 *
 * @since 0.15.0
 */
export type Theme_Tabs_Index_Tabs_PropsClassName = string | undefined;

export type Theme_Tabs_Index_Tabs_PropsStyle = CSSProperties | undefined;

export type Theme_Tabs_Index_Tabs_Props = TabsProps & {
  className?: Theme_Tabs_Index_Tabs_PropsClassName;
  style?: Theme_Tabs_Index_Tabs_PropsStyle;
};

export type Theme_Tabs_Index_Tabs_IsBrowser = boolean;

export type Theme_Tabs_Index_Tabs_ContainerRef = React.RefObject<HTMLDivElement | null>;

export type Theme_Tabs_Index_Tabs_Result_SelectedValue = string;

export type Theme_Tabs_Index_Tabs_Result_SelectValue = (value: string) => void;

export type Theme_Tabs_Index_Tabs_Result_TabValues = readonly TabValue[];

export type Theme_Tabs_Index_Tabs_Result_Lazy = boolean;

export type Theme_Tabs_Index_Tabs_Result_Block = boolean;

export type Theme_Tabs_Index_Tabs_Result = {
  selectedValue: Theme_Tabs_Index_Tabs_Result_SelectedValue;
  selectValue: Theme_Tabs_Index_Tabs_Result_SelectValue;
  tabValues: Theme_Tabs_Index_Tabs_Result_TabValues;
  lazy: Theme_Tabs_Index_Tabs_Result_Lazy;
  block: Theme_Tabs_Index_Tabs_Result_Block;
};

export type Theme_Tabs_Index_Tabs_SanitizedChildren = ReactNode;

/**
 * Theme - Tabs - Tab List.
 *
 * @since 0.15.0
 */
export type Theme_Tabs_Index_TabList_TabsResult_SelectedValue = string;

export type Theme_Tabs_Index_TabList_TabsResult_SelectValue = (value: string) => void;

export type Theme_Tabs_Index_TabList_TabsResult_TabValues = readonly TabValue[];

export type Theme_Tabs_Index_TabList_TabsResult = {
  selectedValue: Theme_Tabs_Index_TabList_TabsResult_SelectedValue;
  selectValue: Theme_Tabs_Index_TabList_TabsResult_SelectValue;
  tabValues: Theme_Tabs_Index_TabList_TabsResult_TabValues;
};

export type Theme_Tabs_Index_TabList_TabValue = TabValue;

export type Theme_Tabs_Index_TabList_TabId = string;

export type Theme_Tabs_Index_TabList_AriaControls = string;

export type Theme_Tabs_Index_TabList_IsSelected = boolean;

/**
 * Theme - Tabs - Tab List - Handle Key Down.
 *
 * @since 0.15.0
 */
export type Theme_Tabs_Index_TabList_HandleKeyDown_Event = React.KeyboardEvent<HTMLLIElement>;

export type Theme_Tabs_Index_TabList_HandleKeyDown_Returns = undefined;

export type Theme_Tabs_Index_TabList_HandleKeyDown_CurrentIndex = number;

export type Theme_Tabs_Index_TabList_HandleKeyDown_NextIndex = number;

export type Theme_Tabs_Index_TabList_HandleKeyDown_NextTabValue = TabValue | undefined;

export type Theme_Tabs_Index_TabList_HandleKeyDown_ParentElement = HTMLElement | null;

export type Theme_Tabs_Index_TabList_HandleKeyDown_Target = HTMLLIElement | undefined;

/**
 * Theme - Tabs - Tabs - Handle Hash Change.
 *
 * @since 0.15.0
 */
export type Theme_Tabs_Index_Tabs_HandleHashChange_Returns = undefined;

export type Theme_Tabs_Index_Tabs_HashTarget = Element | null;

export type Theme_Tabs_Index_Tabs_HashDecodedId = string;

export type Theme_Tabs_Index_Tabs_HashPanel = Element | null;

export type Theme_Tabs_Index_Tabs_HashTabValue = string | undefined;

export type Theme_Tabs_Index_Tabs_EffectCleanupReturns = undefined;
