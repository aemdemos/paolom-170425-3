/* global WebImporter */
export default function parse(element, { document }) {
  // Helper for extracting the immediate children of the element
  const children = Array.from(element.querySelectorAll(':scope > div'));
  const headerRow = ['Columns (columns34)'];

  // Extract Sales column
  const salesColumn = children[0].querySelector('.styled__GridItem-sc-g1lp4a-2:nth-child(1)');
  const salesContent = [
    salesColumn.querySelector('h2'),
    salesColumn.querySelector('p'),
    salesColumn.querySelector('button')
  ];

  // Extract Engineer column
  const engineerColumn = children[0].querySelector('.styled__GridItem-sc-g1lp4a-2:nth-child(2)');
  const engineerContent = [
    engineerColumn.querySelector('h2'),
    engineerColumn.querySelector('p'),
    engineerColumn.querySelector('button')
  ];

  // Combine extracted content into rows
  const cells = [
    headerRow,
    [salesContent],
    [engineerContent]
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the table
  element.replaceWith(table);
}