/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];

  // Extract card elements, assuming immediate divs within the container represent cards
  const cards = element.querySelectorAll(':scope > div > div');

  const rows = Array.from(cards).map((card) => {
    const content = [];

    // Extract content from the card
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const link = card.querySelector('a');

    if (title) {
      content.push(title);
    }

    if (description) {
      content.push(description);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      content.push(linkElement);
    }

    return [content];
  });

  const tableData = [headerRow, ...rows];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}