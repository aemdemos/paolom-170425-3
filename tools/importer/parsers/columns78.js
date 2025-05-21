/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header row based on example
  const headerRow = ['Columns (columns78)'];

  // Dynamically fetch the columns (blocks of content)
  const columns = Array.from(element.querySelectorAll(':scope > div > div > div'));

  // Map each column to its contents (header and list)
  const rows = columns.map((column) => {
    const header = column.querySelector('h1');
    const list = column.querySelector('ul');

    const cellContent = [];

    // Add header if it exists
    if (header) {
      cellContent.push(header);
    }

    // Add list if it exists
    if (list) {
      cellContent.push(list);
    }

    return [cellContent]; // Ensure each column is a single cell
  });

  // Combine header row and content rows to form table data
  const tableData = [headerRow, ...rows];

  // Create the block table using the provided utility
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}