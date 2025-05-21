/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards59)'];

  // Extract rows for the table
  const rows = Array.from(element.querySelectorAll(':scope > div')).map((card) => {
    const img = card.querySelector('img');
    const heading = card.querySelector('h1');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    // Image Cell
    const imageCell = img;

    // Text Content Cell
    const textContent = [];

    if (heading) {
      textContent.push(heading);
    }

    if (description) {
      textContent.push(description);
    }

    if (cta) {
      textContent.push(cta);
    }

    return [imageCell, textContent];
  });

  // Combine header row and extracted rows
  const tableData = [headerRow, ...rows];

  // Create table and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}