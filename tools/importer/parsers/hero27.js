/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the given element
  const heading = element.querySelector(':scope > div > h2');
  const paragraph = element.querySelector(':scope > p');

  // Ensure the Call-to-Action (CTA) link is part of the paragraph
  const link = paragraph?.querySelector('a');
  if (link) {
    paragraph.append(link);
  }

  // Compose the header row
  const headerRow = ['Hero (hero27)'];

  // Compose the content row
  const contentRow = [
    [heading, paragraph].filter(Boolean) // Consolidate heading and paragraph including CTA into a single cell
  ];

  // Create the final table
  const tableData = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}