/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example exactly
  const headerRow = ['Columns (columns71)'];

  // Extract the immediate section where rows are defined
  const textSection = element.querySelector('.sc-8d793176-2');
  const imageSections = element.querySelectorAll('.sc-8d793176-11 img');

  const rows = [headerRow];

  // Extract and organize text content
  const textCellContent = [];
  if (textSection) {
    const firstParagraph = textSection.querySelector('p.sc-8d793176-3');
    const heading = textSection.querySelector('h1.sc-8d793176-4');
    const secondParagraph = textSection.querySelector('p.sc-8d793176-5');
    const buttons = textSection.querySelectorAll('a.sc-8d793176-8');

    if (firstParagraph) textCellContent.push(firstParagraph);
    if (heading) textCellContent.push(heading);
    if (secondParagraph) textCellContent.push(secondParagraph);
    buttons.forEach((button) => textCellContent.push(button));
  }

  // Extract and organize image content
  const imageCellContent = Array.from(imageSections);

  // Add row with extracted text and image content
  rows.push([textCellContent, imageCellContent]);

  // Create the table using WebImporter and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}