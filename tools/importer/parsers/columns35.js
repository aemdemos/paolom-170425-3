/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns35)'];

  const columns = Array.from(element.querySelectorAll(':scope > div')).map((column) => {
    const content = [];

    // Get heading
    const heading = column.querySelector('h1');
    if (heading) content.push(heading);

    // Get pricing information
    const pricing = column.querySelector('.sc-16a63c73-0');
    if (pricing) content.push(pricing);

    // Get description
    const description = column.querySelector('p');
    if (description) content.push(description);

    // Get button
    const button = column.querySelector('a');
    if (button) content.push(button);

    // Get features list
    const featureList = column.querySelectorAll('ul');
    featureList.forEach((list) => content.push(list));

    return content;
  });

  const cells = [headerRow, ...columns.map((col) => [col])];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}