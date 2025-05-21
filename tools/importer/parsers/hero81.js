/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero81)'];

  // Extract content dynamically
  const contentContainer = element.querySelector(':scope > div > section');

  // Title extraction
  const title = contentContainer?.querySelector('h1') || document.createTextNode('');

  // Subheading extraction
  const subheading = contentContainer?.querySelector('p') || document.createTextNode('');

  // Call-to-actions (CTAs)
  const ctas = Array.from(contentContainer?.querySelectorAll('a') || []);

  // Combine title, subheading, and CTAs into one cell
  const combinedContent = [
    title,
    subheading,
    ...ctas
  ];

  // Construct table structure dynamically
  const cells = [
    headerRow, // Header row
    [combinedContent], // Single cell in the second row
  ];

  // Create table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the structured table
  element.replaceWith(table);
}