/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards89)'];

  // Extract content dynamically using proper references
  const title = element.querySelector(':scope > h2');
  const description = element.querySelector(':scope > p');

  // Handle missing elements gracefully
  const titleContent = title ? title.textContent : '';
  const descriptionContent = description ? description.textContent : '';

  // Build table structure with correct header row
  const cells = [
    headerRow, // Correct header row as per the example
    [titleContent, descriptionContent],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}