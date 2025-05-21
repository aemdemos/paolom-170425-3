/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns63)'];

  // Extract and organize column elements dynamically
  const columns = Array.from(element.querySelectorAll(':scope > div > div > div > div.sc-310745e5-1'));

  const contentRow = columns.map((column) => {
    const content = [];

    // Extract heading and subheading dynamically
    const heading = column.querySelector('h1');
    const subheading = column.querySelector('span');

    if (heading) {
      content.push(heading);
    }

    if (subheading) {
      content.push(subheading);
    }

    return content;
  });

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}