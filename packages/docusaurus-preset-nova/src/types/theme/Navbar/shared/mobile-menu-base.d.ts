import type { Theme_Navbar_Index_Navbar_Item } from '../index.d.ts';

/**
 * Theme - Navbar - Shared - Mobile Menu Base.
 *
 * @since 0.23.0
 */
export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton = React.ReactNode;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing = () => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps = {
  closeButton: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_CloseButton;
  startClosing: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps_StartClosing;
};

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_VariantPrefix = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_RenderHeader = (props: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps) => React.ReactNode;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_IsOpen = boolean;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_OnClose = () => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props = {
  variantPrefix: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_VariantPrefix;
  renderHeader: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_RenderHeader;
  isOpen: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_IsOpen;
  onClose: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_OnClose;
  items: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_Items;
  activeItemLabel: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Props_ActiveItemLabel;
};

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Returns = React.JSX.Element | null;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_VariantPrefix = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeader = (props: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_RenderHeaderProps) => React.ReactNode;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsOpen = boolean;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OnClose = () => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ActiveItemLabel = string | null;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_Pathname = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_PanelRef = React.RefObject<HTMLDivElement | null>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing = boolean;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosingState = [Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing, Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_SetIsClosing];

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_SetIsClosing = React.Dispatch<React.SetStateAction<Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_IsClosing>>;

/**
 * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base - Handle Escape.
 *
 * @since 0.23.0
 */
export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeFunction = (event: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeKeyboardEvent) => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleEscapeKeyboardEvent = KeyboardEvent;

/**
 * Theme - Navbar - Shared - Mobile Menu Base - Mobile Menu Base - Handle Click Outside.
 *
 * @since 0.23.0
 */
export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideFunction = (event: Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseEvent) => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseEvent = React.MouseEvent<HTMLDivElement>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_HandleClickOutsideMouseTarget = EventTarget | null;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusSelector = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_FocusTarget = HTMLButtonElement | null;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AriaLabel = string;

export type Theme_Navbar_Shared_MobileMenuBase_CloseMenuAriaLabel = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_OverlayClassName = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_StartClosing_Callback = () => void;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_CloseButton = React.JSX.Element;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_AnimationEvent = React.AnimationEvent<HTMLDivElement>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIndex = number;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemType = string | undefined;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_NavItemChildren = Record<string, unknown>[] | undefined;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemStyle = React.CSSProperties;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIcon = string | undefined;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildItem = Record<string, unknown>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkProps = Record<string, string>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildTo = string | undefined;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildIsActive = boolean;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildKey = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_LinkSpread = Record<string, string>;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ChildLabel = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_DefaultIcon = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemTo = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemHref = string;

export type Theme_Navbar_Shared_MobileMenuBase_MobileMenuBase_ItemIsActive = boolean;
