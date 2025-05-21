/* global WebImporter */
 export default function parse(element, { document }) {
  // Define the header row as specified in the example
  const headerRow = ['Cards (cards56)'];

  const rows = [];

  // Select all unordered list elements in the block
  const lists = element.querySelectorAll(':scope > div > div > ul');
  lists.forEach((list) => {
    const items = list.querySelectorAll(':scope > li');

    items.forEach((item) => {
      const img = item.querySelector('img'); // Extract image element
      const h2 = item.querySelector('h2'); // Extract title element
      const p = item.querySelector('p'); // Extract paragraph element
      const a = item.querySelector('a'); // Extract link element

      const textContent = [];
      // Add extracted elements only if they exist
      if (h2) textContent.push(h2);
      if (p) textContent.push(p);
      if (a) textContent.push(a);

      // Push image and text content as a row
      rows.push([img, textContent]);
    });
  });

  // Combine header and rows into table structure
  const tableCells = [headerRow, ...rows];

  // Create the table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the newly created table
  element.replaceWith(blockTable);
}