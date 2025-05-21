/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the key elements from the given HTML structure

  // Find the image
  const image = element.querySelector(':scope img');

  // Find the heading
  const heading = element.querySelector(':scope h1');

  // Find the paragraph
  const paragraph = element.querySelector(':scope p');

  // Find the call-to-action button
  const button = element.querySelector(':scope a');

  // Create a single cell in the content row combining all elements
  const contentCell = [image, heading, paragraph, button];

  // Create the table rows as a two-dimensional array
  const headerRow = ['Hero (hero99)'];
  const contentRow = [contentCell];

  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}