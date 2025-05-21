/* global WebImporter */
export default function parse(element, { document }) {
  const rows = Array.from(element.querySelectorAll('tbody > tr'));

  // Header row with the block name
  const headerRow = ['Table (striped, bordered, tableStripedBordered53)'];

  // Parse content rows, handling edge cases
  const contentRows = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll('th, td')).map((cell) => {
      const link = cell.querySelector('a[href]');
      if (link) {
        // Extract link text and href dynamically
        const href = link.getAttribute('href');
        const anchor = document.createElement('a');
        anchor.textContent = link.textContent.trim(); // Trim for clean extraction
        anchor.href = href;
        return anchor;
      }

      // Include the SVG element directly if present
      const svg = cell.querySelector('svg');
      if (svg) {
        return svg;
      }

      // Default to trimmed text content
      return cell.textContent.trim();
    });
    return cells;
  });

  const tableCells = [
    headerRow,
    ...contentRows,
  ];

  // Create and replace the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(blockTable);
}