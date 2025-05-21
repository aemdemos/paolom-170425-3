/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards67)'];

  const rows = Array.from(element.querySelectorAll(':scope > div > ul > li')).map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    const content = [];
    if (title) content.push(title);
    if (description) content.push(description);
    if (cta) content.push(cta);

    return [image, content];
  });

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}