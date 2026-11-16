import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import type {
  Blocks_ScreenGallery_Index_BlocksScreenGallery_Props,
  Blocks_ScreenGallery_Index_BlocksScreenGallery_Returns,
} from '../../types/blocks/screen-gallery/index.d.ts';

/**
 * Blocks - Screen Gallery - Blocks Screen Gallery.
 *
 * Lays out app screens side by side, each with a heading, a short description,
 * and an optional link, and turns into a swipeable row on narrow screens.
 *
 * @param {Blocks_ScreenGallery_Index_BlocksScreenGallery_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.43.0
 */
function BlocksScreenGallery(props: Blocks_ScreenGallery_Index_BlocksScreenGallery_Props): Blocks_ScreenGallery_Index_BlocksScreenGallery_Returns {
  return (
    <div
      className={(props['className'] !== undefined) ? `nova-screen-gallery ${props['className']}` : 'nova-screen-gallery'}
      style={props['style']}
    >
      {props['items'].map((item) => (
        <div key={item['heading']} className="nova-screen-gallery-item">
          <div className="nova-screen-gallery-image">{item['image']}</div>
          <Heading as="h3" className="nova-screen-gallery-heading">{item['heading']}</Heading>
          {(item['description'] !== undefined) && (
            <p className="nova-screen-gallery-description">{item['description']}</p>
          )}
          {(item['link'] !== undefined) && (
            <p className="nova-screen-gallery-link">
              <Link to={item['link']['to']}>{item['link']['label']}</Link>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlocksScreenGallery;
