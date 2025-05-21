/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as per the example structure
  const headerRow = ['Columns (columns3)'];

  // Extract the two primary columns based on the structure
  const columns = element.querySelectorAll(':scope > div > div > div');

  // Check if there are exactly two columns, as expected
  if (columns.length !== 2) {
    throw new Error('Unexpected HTML structure: Expected exactly 2 columns.');
  }

  const column1 = columns[0];
  const column2 = columns[1];

  // Extract the image from the first column
  const image = column1.querySelector('img');

  // Extract content from the second column
  const subtitle = column2.querySelector('p:nth-of-type(1)');
  const title = column2.querySelector('h1');
  const description = column2.querySelector('p:nth-of-type(2)');

  // Ensure all extracted elements exist
  if (!image || !title || !subtitle || !description) {
    throw new Error('Missing expected content in one of the columns.');
  }

  // Create the table array with dynamic content extracted from the HTML
  const cells = [
    headerRow,
    [
      [subtitle, title, description],
      image
    ]
  ];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}