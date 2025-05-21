/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the block
  const image = element.querySelector(':scope img');
  const title = element.querySelector(':scope h1');
  const subheading = element.querySelector(':scope p');
  const ctaWrapper = element.querySelector(':scope a');

  // Create the header row
  const headerRow = ['Hero (hero17)'];

  // Create the content row
  const contentRow = [
    [
      image, // Background Image
      title, // Heading
      subheading, // Subheading
      ctaWrapper // Call-to-Action
    ].filter(Boolean) // Filter out null or undefined elements
  ];

  // Assemble the table structure
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}