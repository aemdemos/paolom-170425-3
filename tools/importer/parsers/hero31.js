/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero31)'];

  // Extract relevant content
  const codeBlock = element.querySelector('pre');

  const heading = element.querySelector('h3');
  const paragraph = element.querySelector('p');

  // Extract images and ensure semantic meaning is retained
  const images = Array.from(element.querySelectorAll('img'));

  // Extract CTA link
  const ctaLink = element.querySelector('a');

  // Create the main content cells array dynamically and ensure all relevant content is included
  const contentCells = [
    codeBlock,
    heading,
    paragraph,
    ...images,
    ctaLink,
  ].filter(Boolean); // Ensure no empty elements are included

  const cells = [
    headerRow,
    [contentCells],
  ];

  // Check for section metadata in the example markdown structure
  const sectionMetadataRow = element.matches('.section-metadata') ? ['Section Metadata'] : null;
  if (sectionMetadataRow) {
    // Add <hr> before Section Metadata
    const hr = document.createElement('hr');
    element.parentNode.insertBefore(hr, element);

    const metadataCells = [sectionMetadataRow, []]; // Create an empty Section Metadata block dynamically
    const metadataBlock = WebImporter.DOMUtils.createTable(metadataCells, document);
    element.parentNode.insertBefore(metadataBlock, element);
  }

  // Create the main block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the newly structured block
  element.replaceWith(block);
}