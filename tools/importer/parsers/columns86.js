/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block name for the header row
  const headerRow = ['Columns (columns86)'];

  // Retrieve all immediate child <li> elements of the <ul>
  const listItems = element.querySelectorAll(':scope > div > ul > li');

  const rows = Array.from(listItems).map((li) => {
    const img = li.querySelector('img');
    const description = li.querySelector('p');

    // Ensure semantic meaning is preserved and check for inline elements
    const descriptionContent = description ? [description.cloneNode(true)] : [];

    // Handle non-image elements with a src attribute (e.g., iframe)
    const srcElement = li.querySelector('[src]:not(img)');
    if (srcElement) {
      const link = document.createElement('a');
      link.href = srcElement.src;
      link.textContent = srcElement.getAttribute('alt') || srcElement.getAttribute('src');
      return [link, ...descriptionContent];
    }

    // If img exists and is valid, include it alongside description
    return [img, ...descriptionContent];
  });

  // Combine header row and content rows into the table structure
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with only the block table (no Section Metadata or <hr>)
  element.replaceWith(blockTable);
}