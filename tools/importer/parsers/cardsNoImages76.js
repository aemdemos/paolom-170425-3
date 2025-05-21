/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages76)'];

  // Select all card containers within the provided element
  const cardContainers = element.querySelectorAll(':scope > div > div > div');

  const rows = Array.from(cardContainers).map((card) => {
    const title = card.querySelector('h3');
    const description = card.querySelector('div > span > p');
    const cta = card.querySelector('a');

    const cellContent = [];

    if (title) {
      cellContent.push(title);
    }

    if (description) {
      cellContent.push(description);
    }

    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.textContent;
      cellContent.push(link);
    }

    return [cellContent];
  });

  // Combine header and rows into a single array
  const tableData = [headerRow, ...rows];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}