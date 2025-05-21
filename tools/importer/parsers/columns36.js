/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns block'];

  // Extracting columns content (assuming direct child articles represent columns)
  const articles = Array.from(element.querySelectorAll(':scope > div > article'));

  // Mapping the extracted articles into table rows with separate columns
  const rows = articles.map((article) => {
    const content = Array.from(article.querySelectorAll(':scope > div'));
    return content.map((item) => {
      return Array.from(item.childNodes);
    });
  });

  // Constructing the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element with the generated block table
  element.replaceWith(block);
}