/* global WebImporter */
export default function parse(element, { document }) {
  // Validate header row against example
  const headerRow = ['Columns (columns32)'];

  // Carefully extract content from provided HTML
  const section = element.querySelector(':scope > section');
  if (!section) {
    console.warn('Missing main content section');
    return;
  }

  const title = section.querySelector('h1');
  const description = section.querySelector('p');

  if (!title || !description) {
    console.warn('Missing title or description content');
    return;
  }

  // Combine title and description into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(title);
  combinedContent.appendChild(description);

  // Prepare table rows dynamically from content
  const cells = [
    headerRow,
    [combinedContent],
  ];

  // Create the block table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}