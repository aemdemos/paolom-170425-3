/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Corrected header row to match example exactly
  const headerRow = ['Table (striped, bordered)'];
  rows.push(headerRow);

  // Extract rows from the table
  const table = element.querySelector(':scope > div > div > table');
  const tableRows = table.querySelectorAll('tr');

  tableRows.forEach((tableRow) => {
    const cells = Array.from(tableRow.querySelectorAll('td')).map((cell) => {
      const content = [];
      Array.from(cell.childNodes).forEach((node) => {
        if (node.nodeType === 1) { // Node.ELEMENT_NODE
          content.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) { // Node.TEXT_NODE
          const text = document.createTextNode(node.textContent.trim());
          content.push(text);
        }
      });
      return content.length === 1 ? content[0] : content;
    });
    rows.push(cells);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}