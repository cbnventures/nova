import type {
  Theme_NavbarItem_HtmlNavbarItem_InnerHtml,
  Theme_NavbarItem_HtmlNavbarItem_Props,
  Theme_NavbarItem_HtmlNavbarItem_Value,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - HTML Navbar Item - HTML Navbar Item.
 *
 * Renders raw HTML content directly into the navigation
 * bar using the dangerouslySetInnerHTML attribute on a plain
 * div element without framework styling.
 *
 * @param {Theme_NavbarItem_HtmlNavbarItem_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function HtmlNavbarItem(props: Theme_NavbarItem_HtmlNavbarItem_Props) {
  const value: Theme_NavbarItem_HtmlNavbarItem_Value = props['value'];
  const innerHtml: Theme_NavbarItem_HtmlNavbarItem_InnerHtml = { __html: value };

  return (
    <div
      dangerouslySetInnerHTML={innerHtml}
    />
  );
}

export default HtmlNavbarItem;
