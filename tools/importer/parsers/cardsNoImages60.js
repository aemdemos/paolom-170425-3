/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages60)'];
  const rows = [headerRow];

  const cardElements = element.querySelectorAll(':scope > div > div > div');

  cardElements.forEach((card) => {
    const heading = card.querySelector('h2');
    const paragraph = card.querySelector('p');
    const link = card.querySelector('a');

    const cellContent = [];

    if (heading) {
      cellContent.push(heading);
    }
    if (paragraph) {
      cellContent.push(paragraph);
    }
    if (link) {
      cellContent.push(link);
    }

    rows.push([cellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}