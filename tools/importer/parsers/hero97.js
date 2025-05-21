/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure dynamic extraction of all relevant content
  const title = element.querySelector('h1');
  const subheading = element.querySelector('p');

  // Extract Call-to-Action (CTA) buttons dynamically
  const buttons = Array.from(element.querySelectorAll('a')).map((button) => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.textContent.trim();
    return link;
  });

  // Construct table rows
  const headerRow = ['Hero (hero97)'];

  // Single content cell ensuring semantic meaning is preserved
  const contentRow = [
    [title, subheading, ...buttons],
  ];

  const cells = [
    headerRow,
    contentRow,
  ];

  // Create table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}