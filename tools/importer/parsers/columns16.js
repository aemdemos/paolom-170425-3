/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting columns from the initial element
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row
  const headerRow = ['Columns (columns16)'];

  // Collecting content for each column
  const cellsRow = columns.map((column) => {
    const content = [];

    // Include headings
    const headings = column.querySelectorAll('h3');
    headings.forEach((heading) => content.push(heading));

    // Include buttons
    const buttons = column.querySelectorAll('button');
    buttons.forEach((button) => content.push(button));

    // Include inputs and their tooltips
    const inputs = column.querySelectorAll('input');
    inputs.forEach((input) => {
      const tooltip = input.parentElement.querySelector('span[data-tooltip]');
      if (tooltip) content.push(tooltip);
      content.push(input);
    });

    // Include paragraphs
    const paragraphs = column.querySelectorAll('p');
    paragraphs.forEach((paragraph) => content.push(paragraph));

    return content;
  });

  // Constructing table data
  const tableData = [headerRow, cellsRow];

  // Creating block table and replacing the original element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);

  return blockTable;
}