/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header, tableNoHeader75)'];

  // Extract rows from the original table
  const rows = Array.from(element.querySelectorAll(':scope table tbody tr'));

  // Map each row into an array of cells
  const mappedRows = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll(':scope td'));
    return cells.map((cell) => {
      const content = Array.from(cell.childNodes);
      return content.filter((node) => {
        // Include elements or text nodes with meaningful content
        return node.nodeType === 1 || (node.nodeType === 3 && node.nodeValue.trim());
      });
    });
  });

  // Combine headerRow and mappedRows into table data
  const tableData = [headerRow, ...mappedRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the created block table
  element.replaceWith(block);
}