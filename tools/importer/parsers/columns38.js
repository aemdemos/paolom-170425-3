/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns38)'];

  const articles = Array.from(element.querySelectorAll(':scope > div > article'));

  const contentCells = articles.map((article) => {
    const heading = article.querySelector('h4');
    const paragraph = article.querySelector('p');

    // Combine heading and paragraph content into a single cell with proper formatting
    const cellContent = [];
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent;
      cellContent.push(headingElement);
    }
    if (paragraph) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph.textContent;
      cellContent.push(paragraphElement);
    }

    // Handle edge cases where heading or paragraph might be missing
    return [cellContent.length > 0 ? cellContent : document.createTextNode('')];
  });

  const tableData = [headerRow, ...contentCells];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}