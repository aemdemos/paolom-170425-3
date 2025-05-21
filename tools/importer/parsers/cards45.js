/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards45)'];
  const rows = [];

  element.querySelectorAll(':scope > div.sc-f4fb0b3a-0').forEach((card) => {
    const imageContainer = card.querySelector('picture') || card.querySelector('img');
    const image = imageContainer?.querySelector('img') || imageContainer;

    const textContainer = card.querySelector('div.sc-f4fb0b3a-2');

    const heading = textContainer?.querySelector('h3');
    const link = card.querySelector('a');

    const textContent = [];

    if (heading) {
      textContent.push(heading);
    }

    if (link) {
      textContent.push(link);
    }

    if (image && textContent.length > 0) {
      rows.push([image, textContent]);
    }
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}