/* global WebImporter */
export default function parse(element, { document }) {
  // Create a header row with the block name
  const headerRow = ['Table (striped, bordered, tableStripedBordered92)'];

  // Find the first set of list items within the provided element
  const listItems = element.querySelectorAll(':scope > div:first-of-type ul > li');

  // Map each list item to a table row (ensure no duplication)
  const rows = Array.from(listItems).map((item) => {
    const image = item.querySelector('img'); // Fetch the image within the list item
    const link = item.querySelector('a'); // Fetch the link within the list item

    return [image, link]; // Return an array with image and link as table cells
  });

  // Combine the header row and data rows
  const tableData = [headerRow, ...rows];

  // Create the table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}