/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Hero (hero77)'];

  // Extract the titles (mandatory and optional)
  const titlesContainer = element.querySelector(':scope > section > div > div > div');
  const titleElements = titlesContainer ? Array.from(titlesContainer.querySelectorAll('h2')) : [];

  // Extract the Call-to-Actions (optional)
  const ctaContainer = element.querySelector(':scope > section > div > div > div > div:last-child');
  const ctaElements = ctaContainer ? Array.from(ctaContainer.querySelectorAll('a')) : [];

  // Build the content row
  const contentRow = [
    [
      ...titleElements,
      ...ctaElements,
    ],
  ];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}