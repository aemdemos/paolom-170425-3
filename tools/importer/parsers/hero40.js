/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero40)'];

  // Extract the image
  const img = element.querySelector(':scope img');

  // Extract the title
  const title = element.querySelector(':scope h1');

  // Extract the paragraph
  const paragraph = element.querySelector(':scope p');

  // Extract the link/button
  const button = element.querySelector(':scope a[role="button"]');

  const cells = [
    headerRow, // Header row
    [
      [img, title, paragraph, button], // Content row
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}