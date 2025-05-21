/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content from the element
  const section = element.querySelector(':scope > section');
  const div = section?.querySelector(':scope > div > div');
  const innerSection = div?.querySelector(':scope > section');

  // Extract the call-to-action and paragraph elements
  const ctaLink = innerSection?.querySelector('a');
  const paragraph = innerSection?.querySelector('p');

  // Define the header row for the block table
  const headerRow = ['Hero (hero65)'];

  // Define the content row for the block table
  const contentRow = [
    [ctaLink, paragraph] // Combining the call-to-action link and paragraph into a single cell
  ];

  // Create the block table using the WebImporter helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}