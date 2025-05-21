/* global WebImporter */
export default function parse(element, { document }) {
  // Extract immediate child elements
  const items = Array.from(element.querySelectorAll(':scope > li'));

  // Prepare table rows
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns (columns68)';

  const contentRows = items.map((item) => {
    const image = item.querySelector('img');
    const text = item.querySelector('p');

    const combinedCellContent = document.createElement('div');
    combinedCellContent.appendChild(image);
    combinedCellContent.appendChild(text);

    return [combinedCellContent];
  });

  // Create table block
  const tableData = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}