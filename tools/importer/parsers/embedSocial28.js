/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Embed (embedSocial28)'];

  // Extract external link element dynamically
  const linkElement = element.querySelector(':scope > div .sc-72930db3-3');
  const link = linkElement && linkElement.href ? linkElement.href : 'Missing external link';

  // Construct table data dynamically
  const tableData = [
    headerRow,
    [link]
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block
  element.replaceWith(block);
}