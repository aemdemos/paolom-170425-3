/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search (search25)'];

  // Create link element for the query index URL
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = queryIndexUrl;
  link.innerHTML = queryIndexUrl;

  const contentRow = [link];

  // Create table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}