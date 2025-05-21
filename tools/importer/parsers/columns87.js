/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns87)'];

  const rows = [];

  rows.push(headerRow);

  const contentBlocks = element.querySelectorAll(':scope > div');

  if (contentBlocks.length >= 2) {
    const firstColumnContent = document.createElement('div');
    firstColumnContent.append(contentBlocks[0]);

    const secondColumnContent = document.createElement('div');
    secondColumnContent.append(contentBlocks[1]);

    rows.push([firstColumnContent, secondColumnContent]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}