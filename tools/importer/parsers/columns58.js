/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['<strong>Columns (columns58)</strong>'];

  const columnItems = Array.from(element.querySelectorAll(':scope > div > div > div > div'));

  const rows = columnItems.map((columnItem) => {
    const image = columnItem.querySelector('img');
    const heading = columnItem.querySelector('h3');
    const paragraph = columnItem.querySelector('p');
    const link = columnItem.querySelector('a');

    // Preserve semantic meaning by maintaining the flow of content
    const cellContent = [
      heading,
      paragraph,
      image,
      link,
    ].filter(Boolean); // Remove any null or undefined elements

    return [cellContent];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}