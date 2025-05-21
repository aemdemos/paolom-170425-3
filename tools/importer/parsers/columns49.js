/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract links and text content from a column
  function extractColumnContent(column) {
    const heading = column.querySelector('h3');
    const paragraph = column.querySelector('p');
    const links = Array.from(column.querySelectorAll('a'));

    // Create content array
    const content = [];

    if (heading) {
      content.push(heading);
    }

    if (paragraph) {
      content.push(paragraph);
    }

    if (links.length > 0) {
      content.push(...links);
    }

    return content;
  }

  // Extract columns
  const columns = Array.from(element.querySelectorAll(':scope > div > div > div'));

  // Prepare table rows
  const headerRow = ['Columns']; // Corrected header row to match the example
  const contentRow = columns.map((column) => extractColumnContent(column));

  // Create table using createTable helper
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}