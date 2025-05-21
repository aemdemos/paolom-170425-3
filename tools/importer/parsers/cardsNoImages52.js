/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages52)'];

  // Extracting all immediate child elements of the block
  const cardElements = element.querySelectorAll(':scope > div.ctUigP');

  const rows = [headerRow];

  cardElements.forEach((card) => {
    const heading = card.querySelector('h3');
    const paragraphs = card.querySelectorAll('p.styled__Paragraph-sc-165cfko-1');

    const content = [];
    if (heading) {
      content.push(heading);
    }

    paragraphs.forEach((paragraph) => {
      content.push(paragraph);
    });

    rows.push([content]);
  });

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(blockTable);
}