/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the cards from the given HTML element
  const cards = Array.from(element.querySelectorAll(':scope > div > div > div > div.sc-6a5bf159-2'));

  // Construct the header row for the table
  const headerRow = ['Cards (cards48)'];

  // Map each card to a structured row
  const rows = cards.map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    const content = [];

    // Add the title as heading if present
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title.textContent;
      content.push(heading);
      content.push(document.createElement('br'));
    }

    // Add the description text if present
    if (description) {
      content.push(description);
      content.push(document.createElement('br'));
    }

    // Add the CTA link if present
    if (cta) {
      content.push(cta);
    }

    return [image, content];
  });

  // Combine the header row and rows into a single table structure
  const tableData = [headerRow, ...rows];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}