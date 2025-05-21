/* global WebImporter */
export default function parse(element, { document }) {
  // Extract title from the table header
  const titleElement = element.querySelector(':scope > thead > tr > td > span.styled__Heading-sc-165cfko-2');
  const title = titleElement ? titleElement.textContent.trim() : 'Unknown Title';

  // Extract rows of data from the table body
  const rows = Array.from(element.querySelectorAll(':scope > tbody > tr'));

  // Parse rows into a two-dimensional array for the table
  const tableData = rows.map(row => {
    const cells = Array.from(row.querySelectorAll(':scope > th, :scope > td'));
    return cells.map(cell => {
      const link = cell.querySelector('a[href]');
      if (link) {
        return link;
      }

      const svg = cell.querySelector('svg');
      if (svg) {
        return svg;
      }

      return cell.textContent.trim();
    });
  });

  // Add block name as the header row, ensuring it matches the example exactly
  const headerRow = ['Table (striped, bordered, tableStripedBordered6)'];
  const cells = [headerRow, ...tableData];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}