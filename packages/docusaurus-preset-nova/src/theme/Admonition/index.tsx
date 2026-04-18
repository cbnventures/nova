import { Icon } from '@iconify/react/offline';

import type {
  ThemeAdmonitionIconName,
  ThemeAdmonitionIcons,
  ThemeAdmonitionProps,
  ThemeAdmonitionTitle,
} from '../../types/theme/Admonition/index.d.ts';

/**
 * Theme - Admonition - Icons.
 *
 * Maps each admonition type to its corresponding Iconify icon
 * name for use as the visual indicator rendered beside
 * the admonition title.
 *
 * @since 0.15.0
 */
const admonitionIcons: ThemeAdmonitionIcons = {
  note: 'lucide:pencil',
  tip: 'lucide:lightbulb',
  info: 'lucide:info',
  warning: 'lucide:triangle-alert',
  caution: 'lucide:triangle-alert',
  danger: 'lucide:octagon-alert',
};

/**
 * Theme - Admonition.
 *
 * Renders a styled admonition block with a type-specific icon, bold
 * title, and content area, applying nova and legacy class names
 * for preset CSS compatibility.
 *
 * @param {ThemeAdmonitionProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Admonition(props: ThemeAdmonitionProps) {
  const title: ThemeAdmonitionTitle = props['title'] ?? props['type'];
  const iconName: ThemeAdmonitionIconName = admonitionIcons[props['type']] ?? 'lucide:info';

  return (
    <div
      className="nova-admonition"
      data-admonition-type={props['type']}
    >
      <p className="nova-admonition-heading">
        <Icon
          className="nova-admonition-icon"
          icon={iconName}
          width="16"
          height="16"
          aria-hidden="true"
        />
        <strong>{title}</strong>
      </p>
      <div className="nova-admonition-body">
        {props['children']}
      </div>
    </div>
  );
}

export default Admonition;
