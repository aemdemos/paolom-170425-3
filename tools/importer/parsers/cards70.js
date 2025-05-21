/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all the immediate child <li> elements
  const items = element.querySelectorAll(':scope > li');

  // Create the header row
  const headerRow = ['Cards (cards70)'];

  // Process each item into table rows
  const rows = Array.from(items).map((item) => {
    const img = item.querySelector('img');
    const text = item.querySelector('p');

    // Return the row with image and text content
    return [img, text];
  });

  // Combine header and rows
  const cells = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}