/* global WebImporter */
export default function parse(element, { document }) {
  // Extract images from the given element
  const images = Array.from(element.querySelectorAll(':scope > ul > li > img'));

  // Define header row based on the block name
  const headerRow = ['Columns (columns21)'];

  // Map images into a single row containing image elements
  const imageRow = images.map((img) => img);

  // Create the table structure
  const cells = [
    headerRow,
    imageRow,
  ];

  // Generate the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}