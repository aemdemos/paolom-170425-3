/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo61)'];

  const rows = Array.from(element.querySelectorAll(':scope > a')).map((link) => {
    // Extract the image element from each link
    const imageElement = link.querySelector('img');

    // Dynamically create the link element with its corresponding href
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.href;

    return [imageElement, linkElement];
  });

  // Construct the table based on extracted data
  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  
  // Replace the original element with the newly created block
  element.replaceWith(block);
}