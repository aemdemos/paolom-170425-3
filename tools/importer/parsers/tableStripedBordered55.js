/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered55)'];

  const items = Array.from(element.querySelectorAll(':scope > div > div'));

  const rows = items.map((item) => {
    const img = item.querySelector('img');
    const heading = item.querySelector('h3');
    const paragraph = item.querySelector('p');

    return [
      [img],
      heading ? heading.textContent : '',
      paragraph ? paragraph.textContent : '',
    ];
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}