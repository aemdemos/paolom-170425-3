/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate child elements from the input element
  const childElements = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare the header row with exact formatting
  const headerRow = [
    (() => {
      const strong = document.createElement('strong');
      strong.textContent = 'Columns (columns57)';
      return strong;
    })()
  ];

  // Prepare the content row, creating separate cells for each link and image
  const contentRow = childElements.map((child) => {
    const link = document.createElement('a');
    link.setAttribute('href', child.href);
    link.setAttribute('target', '_blank');
    link.textContent = child.href;

    const img = child.querySelector('img');
    if (img) {
      return [img, link];
    }
    return link; // Fallback if no image is present
  });

  // Structure the table with multiple columns
  const cells = [
    headerRow,
    contentRow,
  ];

  // Use WebImporter.DOMUtils.createTable to create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}