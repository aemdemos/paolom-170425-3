/* global WebImporter */
export default function parse(element, { document }) {
  // Validate header row
  const headerRow = ['Columns (columns7)'];

  // Extract buttons and their content dynamically
  const buttons = Array.from(element.querySelectorAll(':scope > a')).map((button) => {
    const img = button.querySelector('img'); // Extract existing image element
    const link = document.createElement('a'); // Create a link element
    link.href = button.href; // Dynamically assign URL
    link.textContent = button.textContent.trim(); // Extract text content dynamically
    return [img, link];
  });

  // Check for empty or missing data
  if (buttons.length === 0) {
    throw new Error('No buttons found in the element');
  }

  // Ensure semantic meaning is preserved
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    ...buttons.map(([icon, link]) => [icon, link]),
  ], document);

  // Replace the original element
  element.replaceWith(blockTable);
}