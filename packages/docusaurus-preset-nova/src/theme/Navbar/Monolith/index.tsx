import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

import type {
  ThemeNavbarMonolithIndexMonolithColorModeLabel,
  ThemeNavbarMonolithIndexMonolithHamburgerLabel,
  ThemeNavbarMonolithIndexMonolithNavbarClassName,
  ThemeNavbarMonolithIndexMonolithOnColorModeToggle,
  ThemeNavbarMonolithIndexMonolithOnMenuToggle,
  ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel,
  ThemeNavbarMonolithIndexMonolithProps,
  ThemeNavbarMonolithIndexMonolithReturns,
  ThemeNavbarMonolithIndexMonolithSiteLogo,
  ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel,
} from '../../../types/theme/Navbar/Monolith/index.d.ts';

/**
 * Theme - Navbar - Monolith.
 *
 * Minimal navigation layout with the site brand centered and only utility
 * action icons visible, omitting traditional navigation items
 * for a focused single-purpose interface.
 *
 * @param {ThemeNavbarMonolithIndexMonolithProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Monolith(props: ThemeNavbarMonolithIndexMonolithProps): ThemeNavbarMonolithIndexMonolithReturns {
  const siteLogo: ThemeNavbarMonolithIndexMonolithSiteLogo = props['siteLogo'];
  const colorModeLabel: ThemeNavbarMonolithIndexMonolithColorModeLabel = props['colorModeLabel'];
  const onColorModeToggle: ThemeNavbarMonolithIndexMonolithOnColorModeToggle = props['onColorModeToggle'];
  const hamburgerLabel: ThemeNavbarMonolithIndexMonolithHamburgerLabel = props['hamburgerLabel'];
  const onMenuToggle: ThemeNavbarMonolithIndexMonolithOnMenuToggle = props['onMenuToggle'];
  const navbarClassName: ThemeNavbarMonolithIndexMonolithNavbarClassName = 'nova-navbar-monolith';

  const openMenuAriaLabel: ThemeNavbarMonolithIndexMonolithOpenMenuAriaLabel = translate({
    id: 'theme.navbar.openMenuAriaLabel',
    message: 'Open menu',
    description: 'The ARIA label for the button that opens the mobile navigation menu',
  });
  const toggleColorModeAriaLabel: ThemeNavbarMonolithIndexMonolithToggleColorModeAriaLabel = translate({
    id: 'theme.colorMode.toggleAriaLabel',
    message: 'Toggle color mode',
    description: 'The ARIA label for the button that cycles through color modes',
  });

  return (
    <nav className={navbarClassName}>
      <div className="nova-navbar-monolith nova-container">
        <div className="nova-navbar-monolith-brand">
          <Link to={siteLogo['href'] ?? '/'}>
            {(siteLogo['wordmark'] !== undefined) && (
              <img
                className={(siteLogo['wordmarkDark'] !== undefined) ? 'nova-brand-light' : undefined}
                src={siteLogo['wordmark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] !== undefined
              && siteLogo['wordmarkDark'] !== undefined
            ) && (
              <img
                className="nova-brand-dark"
                src={siteLogo['wordmarkDark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['src'] !== undefined
            ) && (
              <img
                className={(siteLogo['srcDark'] !== undefined) ? 'nova-brand-light' : undefined}
                src={siteLogo['src']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['src'] !== undefined
              && siteLogo['srcDark'] !== undefined
            ) && (
              <img
                className="nova-brand-dark"
                src={siteLogo['srcDark']}
                alt={siteLogo['alt']}
              />
            )}
            {(
              siteLogo['wordmark'] === undefined
              && siteLogo['title'] !== undefined
            ) && (
              <span>{siteLogo['title']}</span>
            )}
          </Link>
        </div>
        <div className="nova-navbar-monolith-actions">
          <button
            className="nova-hamburger-toggle"
            type="button"
            onClick={onMenuToggle}
            aria-label={openMenuAriaLabel}
          >
            {hamburgerLabel}
          </button>
          <button
            className="nova-color-mode-toggle"
            type="button"
            onClick={onColorModeToggle}
            aria-label={toggleColorModeAriaLabel}
          >
            {colorModeLabel}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Monolith;
