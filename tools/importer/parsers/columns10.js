/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table block
  const headerRow = ['Columns (columns10)'];

  // Extract buttons dynamically from the element
  const buttons = Array.from(element.querySelectorAll(':scope > button'));

  // Handle edge cases for empty elements
  if (buttons.length === 0) {
    console.warn('No buttons found in element');
  }

  // Structure the table rows with all buttons placed side-by-side in one row
  const secondRow = buttons;

  // Ensure consistent structure with each row defined as an array
  const cells = [
    headerRow,
    secondRow
  ];

  // Create the table block using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table block
  element.replaceWith(block);
}