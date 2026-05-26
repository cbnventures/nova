import type {
  BlocksFrameProps,
  BlocksFrameReturns,
} from '../../types/blocks/frame/index.d.ts';

/**
 * Blocks - Frame.
 *
 * Renders a figure with an optional caption that wraps a media child
 * such as a themed image, image, or video, applying preset framing
 * identity through the nova-frame class hierarchy.
 *
 * @param {BlocksFrameProps} props - Props.
 *
 * @constructor
 *
 * @since 0.18.0
 */
function BlocksFrame(props: BlocksFrameProps): BlocksFrameReturns {
  return (
    <figure
      className={(props['className'] !== undefined) ? `nova-frame ${props['className']}` : 'nova-frame'}
      style={props['style']}
    >
      <div className="nova-frame-media">
        {props['children']}
      </div>
      {(props['caption'] !== undefined) && (
        <figcaption className="nova-frame-caption">
          {props['caption']}
        </figcaption>
      )}
    </figure>
  );
}

export default BlocksFrame;
