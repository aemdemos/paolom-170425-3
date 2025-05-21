/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];

  const rows = Array.from(element.querySelectorAll(':scope > a')).map((card) => {
    const content = [];

    const type = card.querySelector('p:nth-child(1)');
    const title = card.querySelector('p:nth-child(2)');
    const description = card.querySelector('p:nth-child(3)');
    const link = document.createElement('a');
    link.href = card.href;
    link.textContent = 'Learn more';

    if (type) {
      content.push(type.cloneNode(true));
    }
    if (title) {
      content.push(title.cloneNode(true));
    }
    if (description) {
      content.push(description.cloneNode(true));
    }
    content.push(link);

    return [content];
  });

  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}