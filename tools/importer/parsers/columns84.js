/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns84)'];

  // Extract content from the left column
  const leftColumn = document.createElement('div');
  const title = element.querySelector(':scope > div > div > div > h1');
  const paragraph = element.querySelector(':scope > div > div > div > p');
  const button = element.querySelector(':scope > div > div > div > a[role="button"]');

  if (title) leftColumn.appendChild(title);
  if (paragraph) leftColumn.appendChild(paragraph);
  if (button) leftColumn.appendChild(button);

  // Extract content from the right column
  const rightColumn = document.createElement('div');
  const image = element.querySelector(':scope img');

  if (image) rightColumn.appendChild(image);

  const tableData = [
    headerRow,
    [leftColumn, rightColumn]
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}