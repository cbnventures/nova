import type { Theme_Navbar_Index_Navbar_Item } from '../index.d.ts';

/**
 * Theme - Navbar - Monolith - Mobile Menu.
 *
 * @since 0.15.0
 */
export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_IsOpen = boolean;

export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_OnClose = () => void;

export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_Items = Theme_Navbar_Index_Navbar_Item[];

export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props = {
  isOpen: Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_IsOpen;
  onClose: Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_OnClose;
  items: Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_Items;
  activeItemLabel: Theme_Navbar_Monolith_MobileMenu_MobileMenu_Props_ActiveItemLabel;
};

export type Theme_Navbar_Monolith_MobileMenu_MobileMenu_Returns = React.JSX.Element | null;
