import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';

import type {
  ThemeAdmonitionIconName,
  ThemeAdmonitionIcons,
  ThemeAdmonitionProps,
  ThemeAdmonitionTitle,
  ThemeAdmonitionTypeLabels,
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
 * Theme - Admonition - Type Labels.
 *
 * Resolves the visible heading word for each admonition type when
 * no explicit `title` prop is provided, wrapping each label in
 * `translate({...})` so Docusaurus extracts `theme.admonition.<type>`.
 *
 * @since 0.18.0
 */
const admonitionTypeLabels: ThemeAdmonitionTypeLabels = {
  note: translate({
    id: 'theme.admonition.note',
    message: 'note',
    description: 'The default heading word for a Note admonition',
  }),
  tip: translate({
    id: 'theme.admonition.tip',
    message: 'tip',
    description: 'The default heading word for a Tip admonition',
  }),
  info: translate({
    id: 'theme.admonition.info',
    message: 'info',
    description: 'The default heading word for an Info admonition',
  }),
  warning: translate({
    id: 'theme.admonition.warning',
    message: 'warning',
    description: 'The default heading word for a Warning admonition',
  }),
  caution: translate({
    id: 'theme.admonition.caution',
    message: 'caution',
    description: 'The default heading word for a Caution admonition',
  }),
  danger: translate({
    id: 'theme.admonition.danger',
    message: 'danger',
    description: 'The default heading word for a Danger admonition',
  }),
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
  const title: ThemeAdmonitionTitle = (
    props['title']
    ?? admonitionTypeLabels[props['type']]
    ?? props['type']
  );
  const iconName: ThemeAdmonitionIconName = admonitionIcons[props['type']] ?? 'lucide:info';

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-admonition ${props['className']}` : 'nova-admonition'}
      style={props['style']}
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
