/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with the exact text from the example
  const headerRow = ['Hero (hero12)'];

  // Extract the link and paragraph elements dynamically from the input element
  const link = element.querySelector(':scope > a');
  const paragraph = element.querySelector(':scope > p');

  // Handle edge cases for missing elements
  const combinedContent = [];
  if (link) combinedContent.push(link);
  if (paragraph) combinedContent.push(paragraph);

  // Create the second row with combined content into a single cell
  const secondRow = [combinedContent];

  // Assemble the table cells
  const cells = [
    headerRow, // Header row
    secondRow // Content row
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}