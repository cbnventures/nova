import type {
  ThemeNavbarItemHtmlNavbarItemInnerHtml,
  ThemeNavbarItemHtmlNavbarItemProps,
  ThemeNavbarItemHtmlNavbarItemValue,
} from '../../types/theme/NavbarItem/index.d.ts';

/**
 * Theme - Navbar Item - HTML Navbar Item - HTML Navbar Item.
 *
 * Renders raw HTML content directly into the navigation
 * bar using the dangerouslySetInnerHTML attribute on a plain
 * div element without framework styling.
 *
 * @param {ThemeNavbarItemHtmlNavbarItemProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function HtmlNavbarItem(props: ThemeNavbarItemHtmlNavbarItemProps) {
  const value: ThemeNavbarItemHtmlNavbarItemValue = props['value'];
  const innerHtml: ThemeNavbarItemHtmlNavbarItemInnerHtml = { __html: value };

  return (
    <div
      dangerouslySetInnerHTML={innerHtml}
    />
  );
}

export default HtmlNavbarItem;
