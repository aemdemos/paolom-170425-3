/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Columns (columns51)'];

  // Extract the image
  const img = element.querySelector('img');

  // Extract the text content and structure it
  const textColumns = Array.from(element.querySelectorAll(':scope > div > div')).map((column) => {
    const header = column.querySelector('h2');
    const paragraph = column.querySelector('p');
    return [header, paragraph];
  });

  // Create rows for the table
  const rows = [
    headerRow,
    [img, textColumns[0]],
    [null, textColumns[1]],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}