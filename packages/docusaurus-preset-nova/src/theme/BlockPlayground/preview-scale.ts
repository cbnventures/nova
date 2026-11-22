import type {
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ColumnWidth,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ContentHeight,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_FitScale,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Height,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MaxWidth,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MinScale,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Returns,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Scale,
  Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Width,
  Theme_BlockPlayground_PreviewScale_IsSameLayout_Next,
  Theme_BlockPlayground_PreviewScale_IsSameLayout_Previous,
  Theme_BlockPlayground_PreviewScale_IsSameLayout_Returns,
} from '../../types/theme/BlockPlayground/preview-scale.d.ts';

/**
 * Theme - Block Playground - Preview Scale - Is Same Layout.
 *
 * Treats two preview layouts as equal when they differ by less than a pixel,
 * so sub-pixel measuring noise never makes the preview jump or keeps the
 * first render from settling.
 *
 * @param {Theme_BlockPlayground_PreviewScale_IsSameLayout_Previous} previous - Previous.
 * @param {Theme_BlockPlayground_PreviewScale_IsSameLayout_Next}     next     - Next.
 *
 * @returns {Theme_BlockPlayground_PreviewScale_IsSameLayout_Returns}
 *
 * @since 0.50.0
 */
export function isSameLayout(previous: Theme_BlockPlayground_PreviewScale_IsSameLayout_Previous, next: Theme_BlockPlayground_PreviewScale_IsSameLayout_Next): Theme_BlockPlayground_PreviewScale_IsSameLayout_Returns {
  return (
    Math.abs(previous['size']['scale'] - next['size']['scale']) < 0.001
    && Math.abs(previous['size']['width'] - next['size']['width']) < 1
    && Math.abs(previous['size']['height'] - next['size']['height']) < 1
    && Math.abs(previous['crop']['offset'] - next['crop']['offset']) < 1
  );
}

/**
 * Theme - Block Playground - Preview Scale - Compute Preview Scale.
 *
 * Works out how far a preview shrinks to fit the docs column. Blocks lay out
 * at up to the desktop width, but the zoom never drops below the minimum, so
 * the layout width narrows instead and small blocks stay readable.
 *
 * @param {Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ColumnWidth}   columnWidth   - Column width.
 * @param {Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ContentHeight} contentHeight - Content height.
 * @param {Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MaxWidth}      maxWidth      - Max width.
 * @param {Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MinScale}      minScale      - Min scale.
 *
 * @returns {Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Returns}
 *
 * @since 0.50.0
 */
export function computePreviewScale(columnWidth: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ColumnWidth, contentHeight: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ContentHeight, maxWidth: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MaxWidth, minScale: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_MinScale): Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Returns {
  if (columnWidth <= 0 || maxWidth <= 0) {
    return {
      scale: 1,
      width: maxWidth,
      height: Math.ceil(Math.max(0, contentHeight)),
    };
  }

  const fitScale: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_FitScale = columnWidth / maxWidth;
  const scale: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Scale = Math.min(1, Math.max(minScale, fitScale));
  const width: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Width = Math.min(maxWidth, columnWidth / scale);
  const height: Theme_BlockPlayground_PreviewScale_ComputePreviewScale_Height = Math.ceil(Math.max(0, contentHeight) * scale);

  return {
    scale,
    width,
    height,
  };
}
