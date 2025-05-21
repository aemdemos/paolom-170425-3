/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns9)'];

  // Extract child elements from the given section
  const items = Array.from(element.querySelectorAll(':scope > div > ul > li'));

  const rows = items.map(item => {
    const img = item.querySelector('img');
    const h3 = item.querySelector('h3');
    const p = item.querySelector('p');

    // Ensure all elements are dynamically extracted and properly grouped
    const cellContent = [img, h3, p].filter(el => el); // Filter out null elements
    return cellContent.length > 0 ? [cellContent] : [];
  }).filter(row => row.length > 0); // Filter out empty rows

  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}