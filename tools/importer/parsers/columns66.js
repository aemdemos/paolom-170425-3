/* global WebImporter */

export default function parse(element, { document }) {
  // Define header row for the table
  const headerRow = ['Columns block'];

  // Extract table rows dynamically from the table inside the source element
  const tableRows = Array.from(element.querySelectorAll(':scope > div > table > tbody > tr'));

  // Transform each row into an array of relevant content
  const tableData = tableRows.map(row => {
    return Array.from(row.querySelectorAll('td')).map(cell => {
      const heading = cell.querySelector('h2');
      const paragraph = cell.querySelector('p');
      const srcElement = cell.querySelector('[src]');

      if (heading) {
        const strippedHeading = heading.cloneNode(true);
        strippedHeading.removeAttribute('class');
        return strippedHeading;
      } else if (paragraph) {
        const strippedParagraph = paragraph.cloneNode(true);
        strippedParagraph.removeAttribute('class');
        return strippedParagraph;
      } else if (srcElement) {
        const link = document.createElement('a');
        link.href = srcElement.getAttribute('src');
        link.textContent = srcElement.tagName.toLowerCase();
        return link;
      } else {
        const textContent = cell.textContent.trim();
        return textContent || ''; // Ensure no empty cells
      }
    }).filter(content => content !== ''); // Filter out empty cells explicitly
  });

  // Combine header row and data rows into the table structure
  const rows = [headerRow, ...tableData];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}