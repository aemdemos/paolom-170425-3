/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the block name
  const headerRow = ['Hero (hero50)'];

  // Extract content from the element
  const contentBlock = element.querySelectorAll(':scope > div');

  // Find the heading from the nested div structure
  const heading = contentBlock[0]?.querySelector('h3');

  // Ensure the heading exists and is properly handled
  const headingContent = heading ? heading : document.createTextNode('');

  // Find call-to-action buttons
  const buttonsContainer = contentBlock[0]?.querySelector('div[lang="en"]');
  const buttons = buttonsContainer ? [...buttonsContainer.querySelectorAll('button')] : [];

  // Combine heading and buttons into a single cell for the content row
  const combinedContent = document.createElement('div');
  if (headingContent) combinedContent.appendChild(headingContent);
  buttons.forEach(button => combinedContent.appendChild(button));

  // Create the cells array for the table
  const cells = [
    headerRow, // Header row
    [combinedContent] // Content row as a single cell
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new table
  element.replaceWith(blockTable);
}