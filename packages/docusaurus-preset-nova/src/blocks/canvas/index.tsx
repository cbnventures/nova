import type {
  Blocks_Canvas_Index_BlocksCanvas_InnerContent,
  Blocks_Canvas_Index_BlocksCanvas_Props,
} from '../../types/blocks/canvas/index.d.ts';

/**
 * Blocks - Canvas.
 *
 * Freeform container block that accepts arbitrary JSX children.
 * Renders a section with configurable container width and surface variant.
 *
 * @param props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.24.0
 */
function BlocksCanvas(props: Blocks_Canvas_Index_BlocksCanvas_Props) {
  const innerContent: Blocks_Canvas_Index_BlocksCanvas_InnerContent = (
    <div className={(props['container'] === 'full') ? 'nova-canvas-inner' : 'nova-canvas-inner nova-container'}>
      {props['children']}
    </div>
  );

  return (
    <section
      className={(props['className'] !== undefined) ? `nova-canvas ${props['className']}` : 'nova-canvas'}
      style={props['style']}
    >
      {(props['surface'] === 'alt')
        ? <div className="nova-surface-alt">{innerContent}</div>
        : innerContent}
    </section>
  );
}

export default BlocksCanvas;
