/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Gather immediate child div elements
  const childDivs = element.querySelectorAll(':scope > div');

  // Step 2: Create the header row matching example structure
  const headerRow = ['Columns (columns101)'];

  // Step 3: Map each child div into a content row
  const contentRows = Array.from(childDivs).map((div) => {
    const img = div.querySelector('img'); // Extract image
    const text = div.querySelector('p'); // Extract text

    if (!img || !text) {
      // Handle edge cases for missing image or text
      console.warn('Missing image or text content in one of the divs');
      return ['']; // Empty cell to retain structure
    }

    return [
      img, // Reference the existing image
      text // Reference the existing paragraph element
    ];
  });

  // Step 4: Combine header row and content rows
  const tableData = [headerRow, ...contentRows];

  // Step 5: Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(block);
}