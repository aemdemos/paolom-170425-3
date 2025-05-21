/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards74)'];

  const rows = Array.from(element.querySelectorAll(':scope > div > div > ul > li')).map((listItem) => {
    const image = listItem.querySelector('img');
    const heading = listItem.querySelector('h2');
    const description = listItem.querySelector('p');
    const link = listItem.querySelector('a');

    const imageElement = image || document.createElement('div');
    const textContent = [];

    if (heading) {
      textContent.push(heading);
    }

    if (description) {
      textContent.push(description);
    }

    if (link) {
      textContent.push(link);
    }

    return [imageElement, textContent];
  });

  const tableData = [headerRow, ...rows];
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(tableBlock);
}