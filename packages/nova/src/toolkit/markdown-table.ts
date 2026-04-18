import { LIB_REGEX_CHARACTER_PIPE, LIB_REGEX_LINEBREAK_CRLF_OR_LF, LIB_REGEX_PATTERN_ANSI } from '../lib/regex.js';

import type {
  ToolkitMarkdownTableAddRowReturns,
  ToolkitMarkdownTableAddRowRow,
  ToolkitMarkdownTableComputeColumnWidthsColumnsLength,
  ToolkitMarkdownTableComputeColumnWidthsColumnWidth,
  ToolkitMarkdownTableComputeColumnWidthsReturns,
  ToolkitMarkdownTableComputeColumnWidthsRows,
  ToolkitMarkdownTableComputeColumnWidthsStrippedCell,
  ToolkitMarkdownTableConstructorHeaders,
  ToolkitMarkdownTableConstructorOptions,
  ToolkitMarkdownTableEscapeCellLinebreakPattern,
  ToolkitMarkdownTableEscapeCellPipePattern,
  ToolkitMarkdownTableEscapeCellReturns,
  ToolkitMarkdownTableEscapeCellValue,
  ToolkitMarkdownTableFormatDelimiterColumnCells,
  ToolkitMarkdownTableFormatDelimiterColumnWidths,
  ToolkitMarkdownTableFormatDelimiterDelimiter,
  ToolkitMarkdownTableFormatDelimiterMinimumWidth,
  ToolkitMarkdownTableFormatDelimiterReturns,
  ToolkitMarkdownTableFormatDelimiterRowBody,
  ToolkitMarkdownTableFormatDelimiterUsePaddedDelimiter,
  ToolkitMarkdownTableFormatRowCells,
  ToolkitMarkdownTableFormatRowEscapedCell,
  ToolkitMarkdownTableFormatRowEscapedCells,
  ToolkitMarkdownTableFormatRowReturns,
  ToolkitMarkdownTableFormatRowWidths,
  ToolkitMarkdownTableHeaders,
  ToolkitMarkdownTableMinimumColumnWidth,
  ToolkitMarkdownTablePadCellPadding,
  ToolkitMarkdownTablePadCellReturns,
  ToolkitMarkdownTablePadCellString,
  ToolkitMarkdownTablePadCellWidth,
  ToolkitMarkdownTablePadDelimiterRow,
  ToolkitMarkdownTableRenderBody,
  ToolkitMarkdownTableRenderColumnWidths,
  ToolkitMarkdownTableRenderDelimiter,
  ToolkitMarkdownTableRenderHeader,
  ToolkitMarkdownTableRenderReturns,
  ToolkitMarkdownTableRows,
  ToolkitMarkdownTableStripAnsiColorsPattern,
  ToolkitMarkdownTableStripAnsiColorsReturns,
  ToolkitMarkdownTableStripAnsiColorsString,
} from '../types/toolkit/markdown-table.d.ts';

/**
 * Toolkit - Markdown Table.
 *
 * Builds pipe-delimited markdown tables with automatic column alignment
 * and ANSI-aware width calculations. Used by the version command to display info.
 *
 * @since 0.11.0
 */
class ToolkitMarkdownTable {
  /**
   * Toolkit - Markdown Table - Headers.
   *
   * Stores the column header labels provided at construction time.
   * Each header defines one column in the rendered table output.
   *
   * @private
   *
   * @since 0.11.0
   */
  readonly #headers: ToolkitMarkdownTableHeaders;

  /**
   * Toolkit - Markdown Table - Minimum Column Width.
   *
   * Floor value for column widths, clamped to at least three so
   * the delimiter row always renders valid markdown syntax with enough dashes.
   *
   * @private
   *
   * @since 0.11.0
   */
  readonly #minimumColumnWidth: ToolkitMarkdownTableMinimumColumnWidth;

  /**
   * Toolkit - Markdown Table - Pad Delimiter Row.
   *
   * Controls whether the delimiter row uses spaces around pipes.
   * When false, dashes fill the gaps for a compact separator style.
   *
   * @private
   *
   * @since 0.11.0
   */
  readonly #padDelimiterRow: ToolkitMarkdownTablePadDelimiterRow;

  /**
   * Toolkit - Markdown Table - Rows.
   *
   * Accumulates data rows added via addRow calls. Each entry is a
   * string array whose length must match the headers array.
   *
   * @private
   *
   * @since 0.11.0
   */
  readonly #rows: ToolkitMarkdownTableRows;

  /**
   * Toolkit - Markdown Table - Constructor.
   *
   * Validates headers and stores rendering options. Throws if
   * headers is empty since a table without columns cannot produce valid markdown output.
   *
   * @param {ToolkitMarkdownTableConstructorHeaders} headers   - Headers.
   * @param {ToolkitMarkdownTableConstructorOptions} [options] - Options.
   *
   * @since 0.11.0
   */
  public constructor(headers: ToolkitMarkdownTableConstructorHeaders, options?: ToolkitMarkdownTableConstructorOptions) {
    if (Array.isArray(headers) === false || headers.length === 0) {
      throw new Error('"headers" must be a non-empty array');
    }

    // In case you need to think about it, each array is panned out like a row.
    this.#headers = headers;
    this.#minimumColumnWidth = (options !== undefined) ? Math.max(3, options['minimumColumnWidth']) : 3;
    this.#padDelimiterRow = (options !== undefined) ? options['padDelimiterRow'] : false;
    this.#rows = [];

    return;
  }

  /**
   * Toolkit - Markdown Table - Add Row.
   *
   * Appends a data row and returns the instance for chaining.
   * Throws if the row length does not match the number of headers.
   *
   * @param {ToolkitMarkdownTableAddRowRow} row - Row.
   *
   * @returns {ToolkitMarkdownTableAddRowReturns}
   *
   * @since 0.11.0
   */
  public addRow(row: ToolkitMarkdownTableAddRowRow): ToolkitMarkdownTableAddRowReturns {
    if (this.#headers.length !== row.length) {
      throw new Error('Length of "rows" must equal length of "headers"');
    }

    this.#rows.push(row);

    // Allows the "addRow" method to be continuously chained.
    return this;
  }

  /**
   * Toolkit - Markdown Table - Render.
   *
   * Computes column widths, then assembles the header row,
   * delimiter row, and body rows into a single pipe-delimited markdown string.
   *
   * @returns {ToolkitMarkdownTableRenderReturns}
   *
   * @since 0.11.0
   */
  public render(): ToolkitMarkdownTableRenderReturns {
    const columnWidths: ToolkitMarkdownTableRenderColumnWidths = this.computeColumnWidths();

    const header: ToolkitMarkdownTableRenderHeader = this.formatRow(this.#headers, columnWidths);
    const delimiter: ToolkitMarkdownTableRenderDelimiter = this.formatDelimiter(columnWidths);
    const body: ToolkitMarkdownTableRenderBody = this.#rows.map((row) => this.formatRow(row, columnWidths)).join('\n');

    return [
      header,
      delimiter,
      body,
    ].join('\n');
  }

  /**
   * Toolkit - Markdown Table - Escape Cell.
   *
   * Replaces pipe characters with backslash-escaped pipes and
   * collapses linebreaks into spaces so cell content never breaks markdown table syntax.
   *
   * @param {ToolkitMarkdownTableEscapeCellValue} value - Value.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTableEscapeCellReturns}
   *
   * @since 0.11.0
   */
  private escapeCell(value: ToolkitMarkdownTableEscapeCellValue): ToolkitMarkdownTableEscapeCellReturns {
    const pipePattern: ToolkitMarkdownTableEscapeCellPipePattern = new RegExp(LIB_REGEX_CHARACTER_PIPE, 'g');
    const linebreakPattern: ToolkitMarkdownTableEscapeCellLinebreakPattern = new RegExp(LIB_REGEX_LINEBREAK_CRLF_OR_LF, 'g');

    return value
      .replace(pipePattern, '\\|')
      .replace(linebreakPattern, ' ');
  }

  /**
   * Toolkit - Markdown Table - Compute Column Widths.
   *
   * Scans all headers and data rows to find the widest escaped cell
   * in each column, respecting the minimum column width and stripping ANSI codes first.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTableComputeColumnWidthsReturns}
   *
   * @since 0.11.0
   */
  private computeColumnWidths(): ToolkitMarkdownTableComputeColumnWidthsReturns {
    const columnsLength: ToolkitMarkdownTableComputeColumnWidthsColumnsLength = this.#headers.length;
    const rows: ToolkitMarkdownTableComputeColumnWidthsRows = [
      this.#headers,
      ...this.#rows,
    ];
    const widths: ToolkitMarkdownTableComputeColumnWidthsReturns = [];

    for (let columnIndex = 0; columnIndex < columnsLength; columnIndex += 1) {
      // Return the column width that is the largest.
      const columnWidth: ToolkitMarkdownTableComputeColumnWidthsColumnWidth = Math.max(this.#minimumColumnWidth, ...rows.map((row) => {
        const strippedCell: ToolkitMarkdownTableComputeColumnWidthsStrippedCell = this.stripAnsiColors(row[columnIndex] ?? '');

        return this.escapeCell(strippedCell).length;
      }));

      widths.push(columnWidth);
    }

    return widths;
  }

  /**
   * Toolkit - Markdown Table - Pad Cell.
   *
   * Right-pads a cell string with spaces to reach the target column
   * width. Uses ANSI-stripped length so colored text aligns correctly in the output.
   *
   * @param {ToolkitMarkdownTablePadCellString} string - String.
   * @param {ToolkitMarkdownTablePadCellWidth}  width  - Width.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTablePadCellReturns}
   *
   * @since 0.11.0
   */
  private padCell(string: ToolkitMarkdownTablePadCellString, width: ToolkitMarkdownTablePadCellWidth): ToolkitMarkdownTablePadCellReturns {
    const padding: ToolkitMarkdownTablePadCellPadding = Math.max(0, width - this.stripAnsiColors(string).length);

    return `${string}${' '.repeat(padding)}`;
  }

  /**
   * Toolkit - Markdown Table - Format Row.
   *
   * Escapes and pads each cell then joins them with pipe
   * separators. Called for both the header row and each data row during render.
   *
   * @param {ToolkitMarkdownTableFormatRowCells}  cells  - Cells.
   * @param {ToolkitMarkdownTableFormatRowWidths} widths - Widths.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTableFormatRowReturns}
   *
   * @since 0.11.0
   */
  private formatRow(cells: ToolkitMarkdownTableFormatRowCells, widths: ToolkitMarkdownTableFormatRowWidths): ToolkitMarkdownTableFormatRowReturns {
    const escapedCells: ToolkitMarkdownTableFormatRowEscapedCells = cells.map((cell, cellIndex) => {
      const escapedCell: ToolkitMarkdownTableFormatRowEscapedCell = this.escapeCell(cell);

      return this.padCell(escapedCell, widths[cellIndex] ?? 0);
    });

    return `| ${escapedCells.join(' | ')} |`;
  }

  /**
   * Toolkit - Markdown Table - Format Delimiter.
   *
   * Builds the separator row between the header and body. Uses
   * dashes sized to each column width and toggles padded or compact pipe style.
   *
   * @param {ToolkitMarkdownTableFormatDelimiterColumnWidths} columnWidths - Column widths.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTableFormatDelimiterReturns}
   *
   * @since 0.11.0
   */
  private formatDelimiter(columnWidths: ToolkitMarkdownTableFormatDelimiterColumnWidths): ToolkitMarkdownTableFormatDelimiterReturns {
    const minimumWidth: ToolkitMarkdownTableFormatDelimiterMinimumWidth = this.#minimumColumnWidth;
    const usePaddedDelimiter: ToolkitMarkdownTableFormatDelimiterUsePaddedDelimiter = this.#padDelimiterRow;

    const columnCells: ToolkitMarkdownTableFormatDelimiterColumnCells = columnWidths.map((columnWidth) => {
      return '-'.repeat(columnWidth > minimumWidth ? columnWidth : minimumWidth);
    });

    const delimiter: ToolkitMarkdownTableFormatDelimiterDelimiter = (usePaddedDelimiter === true) ? ' | ' : '-|-';
    const rowBody: ToolkitMarkdownTableFormatDelimiterRowBody = columnCells.join(delimiter);

    return (usePaddedDelimiter === true) ? `| ${rowBody} |` : `|-${rowBody}-|`;
  }

  /**
   * Toolkit - Markdown Table - Strip ANSI Colors.
   *
   * Removes ANSI escape sequences from a string so visible character
   * length can be measured accurately for column width and padding calculations.
   *
   * @param {ToolkitMarkdownTableStripAnsiColorsString} string - String.
   *
   * @private
   *
   * @returns {ToolkitMarkdownTableStripAnsiColorsReturns}
   *
   * @since 0.11.0
   */
  private stripAnsiColors(string: ToolkitMarkdownTableStripAnsiColorsString): ToolkitMarkdownTableStripAnsiColorsReturns {
    const pattern: ToolkitMarkdownTableStripAnsiColorsPattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '');
  }
}

export default ToolkitMarkdownTable;
