/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns26)'];

  const cells = [headerRow];

  const contentBlock = element.querySelector(':scope > div:nth-child(1)');
  const imageBlock = element.querySelector(':scope > div:nth-child(2)');

  const contentCells = Array.from(contentBlock.querySelectorAll(':scope > div')).map((item) => {
    const title = item.querySelector('p.sc-a923d06d-4');
    const description = item.querySelector('p.sc-a923d06d-5');

    const combinedContent = document.createElement('div');
    if (title) combinedContent.appendChild(title);
    if (description) combinedContent.appendChild(description);

    return combinedContent;
  });

  const imageCells = Array.from(imageBlock.querySelectorAll('img')).map((img) => img);

  const groupedRows = contentCells.map((contentCell, index) => {
    const associatedImage = imageCells[index] || document.createTextNode('');
    return [contentCell, associatedImage];
  });

  cells.push(...groupedRows);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}