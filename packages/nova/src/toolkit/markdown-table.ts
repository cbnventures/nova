import { LIB_REGEX_CHARACTER_PIPE, LIB_REGEX_LINEBREAK_CRLF_OR_LF, LIB_REGEX_PATTERN_ANSI } from '../lib/regex.js';

import type {
  Toolkit_MarkdownTable_AddRow_Returns,
  Toolkit_MarkdownTable_AddRow_Row,
  Toolkit_MarkdownTable_ComputeColumnWidths_ColumnsLength,
  Toolkit_MarkdownTable_ComputeColumnWidths_ColumnWidth,
  Toolkit_MarkdownTable_ComputeColumnWidths_Returns,
  Toolkit_MarkdownTable_ComputeColumnWidths_Rows,
  Toolkit_MarkdownTable_ComputeColumnWidths_StrippedCell,
  Toolkit_MarkdownTable_Constructor_Headers,
  Toolkit_MarkdownTable_Constructor_Options,
  Toolkit_MarkdownTable_EscapeCell_LinebreakPattern,
  Toolkit_MarkdownTable_EscapeCell_PipePattern,
  Toolkit_MarkdownTable_EscapeCell_Returns,
  Toolkit_MarkdownTable_EscapeCell_Value,
  Toolkit_MarkdownTable_FormatDelimiter_ColumnCells,
  Toolkit_MarkdownTable_FormatDelimiter_ColumnWidths,
  Toolkit_MarkdownTable_FormatDelimiter_Delimiter,
  Toolkit_MarkdownTable_FormatDelimiter_MinimumWidth,
  Toolkit_MarkdownTable_FormatDelimiter_Returns,
  Toolkit_MarkdownTable_FormatDelimiter_RowBody,
  Toolkit_MarkdownTable_FormatDelimiter_UsePaddedDelimiter,
  Toolkit_MarkdownTable_FormatRow_Cells,
  Toolkit_MarkdownTable_FormatRow_EscapedCell,
  Toolkit_MarkdownTable_FormatRow_EscapedCells,
  Toolkit_MarkdownTable_FormatRow_Returns,
  Toolkit_MarkdownTable_FormatRow_Widths,
  Toolkit_MarkdownTable_Headers,
  Toolkit_MarkdownTable_MinimumColumnWidth,
  Toolkit_MarkdownTable_PadCell_Padding,
  Toolkit_MarkdownTable_PadCell_Returns,
  Toolkit_MarkdownTable_PadCell_String,
  Toolkit_MarkdownTable_PadCell_Width,
  Toolkit_MarkdownTable_PadDelimiterRow,
  Toolkit_MarkdownTable_Render_Body,
  Toolkit_MarkdownTable_Render_ColumnWidths,
  Toolkit_MarkdownTable_Render_Delimiter,
  Toolkit_MarkdownTable_Render_Header,
  Toolkit_MarkdownTable_Render_Returns,
  Toolkit_MarkdownTable_Rows,
  Toolkit_MarkdownTable_StripAnsiColors_Pattern,
  Toolkit_MarkdownTable_StripAnsiColors_Returns,
  Toolkit_MarkdownTable_StripAnsiColors_String,
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
  readonly #headers: Toolkit_MarkdownTable_Headers;

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
  readonly #minimumColumnWidth: Toolkit_MarkdownTable_MinimumColumnWidth;

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
  readonly #padDelimiterRow: Toolkit_MarkdownTable_PadDelimiterRow;

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
  readonly #rows: Toolkit_MarkdownTable_Rows;

  /**
   * Toolkit - Markdown Table - Constructor.
   *
   * Validates headers and stores rendering options. Throws if
   * headers is empty since a table without columns cannot produce valid markdown output.
   *
   * @param {Toolkit_MarkdownTable_Constructor_Headers} headers   - Headers.
   * @param {Toolkit_MarkdownTable_Constructor_Options} [options] - Options.
   *
   * @since 0.11.0
   */
  public constructor(headers: Toolkit_MarkdownTable_Constructor_Headers, options?: Toolkit_MarkdownTable_Constructor_Options) {
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
   * @param {Toolkit_MarkdownTable_AddRow_Row} row - Row.
   *
   * @returns {Toolkit_MarkdownTable_AddRow_Returns}
   *
   * @since 0.11.0
   */
  public addRow(row: Toolkit_MarkdownTable_AddRow_Row): Toolkit_MarkdownTable_AddRow_Returns {
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
   * @returns {Toolkit_MarkdownTable_Render_Returns}
   *
   * @since 0.11.0
   */
  public render(): Toolkit_MarkdownTable_Render_Returns {
    const columnWidths: Toolkit_MarkdownTable_Render_ColumnWidths = this.computeColumnWidths();

    const header: Toolkit_MarkdownTable_Render_Header = this.formatRow(this.#headers, columnWidths);
    const delimiter: Toolkit_MarkdownTable_Render_Delimiter = this.formatDelimiter(columnWidths);
    const body: Toolkit_MarkdownTable_Render_Body = this.#rows.map((row) => this.formatRow(row, columnWidths)).join('\n');

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
   * @param {Toolkit_MarkdownTable_EscapeCell_Value} value - Value.
   *
   * @private
   *
   * @returns {Toolkit_MarkdownTable_EscapeCell_Returns}
   *
   * @since 0.11.0
   */
  private escapeCell(value: Toolkit_MarkdownTable_EscapeCell_Value): Toolkit_MarkdownTable_EscapeCell_Returns {
    const pipePattern: Toolkit_MarkdownTable_EscapeCell_PipePattern = new RegExp(LIB_REGEX_CHARACTER_PIPE, 'g');
    const linebreakPattern: Toolkit_MarkdownTable_EscapeCell_LinebreakPattern = new RegExp(LIB_REGEX_LINEBREAK_CRLF_OR_LF, 'g');

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
   * @returns {Toolkit_MarkdownTable_ComputeColumnWidths_Returns}
   *
   * @since 0.11.0
   */
  private computeColumnWidths(): Toolkit_MarkdownTable_ComputeColumnWidths_Returns {
    const columnsLength: Toolkit_MarkdownTable_ComputeColumnWidths_ColumnsLength = this.#headers.length;
    const rows: Toolkit_MarkdownTable_ComputeColumnWidths_Rows = [
      this.#headers,
      ...this.#rows,
    ];
    const widths: Toolkit_MarkdownTable_ComputeColumnWidths_Returns = [];

    for (let columnIndex = 0; columnIndex < columnsLength; columnIndex += 1) {
      // Return the column width that is the largest.
      const columnWidth: Toolkit_MarkdownTable_ComputeColumnWidths_ColumnWidth = Math.max(this.#minimumColumnWidth, ...rows.map((row) => {
        const strippedCell: Toolkit_MarkdownTable_ComputeColumnWidths_StrippedCell = this.stripAnsiColors(row[columnIndex] ?? '');

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
   * @param {Toolkit_MarkdownTable_PadCell_String} string - String.
   * @param {Toolkit_MarkdownTable_PadCell_Width}  width  - Width.
   *
   * @private
   *
   * @returns {Toolkit_MarkdownTable_PadCell_Returns}
   *
   * @since 0.11.0
   */
  private padCell(string: Toolkit_MarkdownTable_PadCell_String, width: Toolkit_MarkdownTable_PadCell_Width): Toolkit_MarkdownTable_PadCell_Returns {
    const padding: Toolkit_MarkdownTable_PadCell_Padding = Math.max(0, width - this.stripAnsiColors(string).length);

    return `${string}${' '.repeat(padding)}`;
  }

  /**
   * Toolkit - Markdown Table - Format Row.
   *
   * Escapes and pads each cell then joins them with pipe
   * separators. Called for both the header row and each data row during render.
   *
   * @param {Toolkit_MarkdownTable_FormatRow_Cells}  cells  - Cells.
   * @param {Toolkit_MarkdownTable_FormatRow_Widths} widths - Widths.
   *
   * @private
   *
   * @returns {Toolkit_MarkdownTable_FormatRow_Returns}
   *
   * @since 0.11.0
   */
  private formatRow(cells: Toolkit_MarkdownTable_FormatRow_Cells, widths: Toolkit_MarkdownTable_FormatRow_Widths): Toolkit_MarkdownTable_FormatRow_Returns {
    const escapedCells: Toolkit_MarkdownTable_FormatRow_EscapedCells = cells.map((cell, cellIndex) => {
      const escapedCell: Toolkit_MarkdownTable_FormatRow_EscapedCell = this.escapeCell(cell);

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
   * @param {Toolkit_MarkdownTable_FormatDelimiter_ColumnWidths} columnWidths - Column widths.
   *
   * @private
   *
   * @returns {Toolkit_MarkdownTable_FormatDelimiter_Returns}
   *
   * @since 0.11.0
   */
  private formatDelimiter(columnWidths: Toolkit_MarkdownTable_FormatDelimiter_ColumnWidths): Toolkit_MarkdownTable_FormatDelimiter_Returns {
    const minimumWidth: Toolkit_MarkdownTable_FormatDelimiter_MinimumWidth = this.#minimumColumnWidth;
    const usePaddedDelimiter: Toolkit_MarkdownTable_FormatDelimiter_UsePaddedDelimiter = this.#padDelimiterRow;

    const columnCells: Toolkit_MarkdownTable_FormatDelimiter_ColumnCells = columnWidths.map((columnWidth) => {
      return '-'.repeat(columnWidth > minimumWidth ? columnWidth : minimumWidth);
    });

    const delimiter: Toolkit_MarkdownTable_FormatDelimiter_Delimiter = (usePaddedDelimiter === true) ? ' | ' : '-|-';
    const rowBody: Toolkit_MarkdownTable_FormatDelimiter_RowBody = columnCells.join(delimiter);

    return (usePaddedDelimiter === true) ? `| ${rowBody} |` : `|-${rowBody}-|`;
  }

  /**
   * Toolkit - Markdown Table - Strip ANSI Colors.
   *
   * Removes ANSI escape sequences from a string so visible character
   * length can be measured accurately for column width and padding calculations.
   *
   * @param {Toolkit_MarkdownTable_StripAnsiColors_String} string - String.
   *
   * @private
   *
   * @returns {Toolkit_MarkdownTable_StripAnsiColors_Returns}
   *
   * @since 0.11.0
   */
  private stripAnsiColors(string: Toolkit_MarkdownTable_StripAnsiColors_String): Toolkit_MarkdownTable_StripAnsiColors_Returns {
    const pattern: Toolkit_MarkdownTable_StripAnsiColors_Pattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '');
  }
}

export default ToolkitMarkdownTable;
