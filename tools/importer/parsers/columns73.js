/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns73)'];

  // Dynamically extract the image elements
  const images = [...element.querySelectorAll(':scope img')];
  const picture = element.querySelector(':scope picture');

  // Dynamically extract text content
  const heading = element.querySelector('h1');
  const paragraph = element.querySelector('p');

  // Handle missing elements gracefully
  const extractedPicture = picture ? picture : images[0];
  const extractedHeading = heading ? heading : document.createElement('div');
  const extractedParagraph = paragraph ? paragraph : document.createElement('div');

  // Prepare table rows
  const rows = [];

  // Header row
  rows.push(headerRow);

  // First content row
  rows.push([
    extractedPicture,
    [extractedHeading, extractedParagraph],
  ]);

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the newly created table
  element.replaceWith(table);
}