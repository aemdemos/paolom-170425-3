/* global WebImporter */

export default function parse(element, { document }) {
  // Extract relevant elements from the provided HTML
  const heading = element.querySelector('h3');
  const subheading = element.querySelector('p.styled__Paragraph-sc-165cfko-1');
  const callToAction = element.querySelector('a.styled__Button-sc-1hwml9q-0');
  const image = element.querySelector('img');

  // Ensure dynamically extracted content is referenced properly
  const headerRow = ['Hero (hero94)'];

  // Handle edge cases for missing elements
  const contentRow = [
    [
      image || '',
      heading || '',
      subheading || '',
      callToAction || ''
    ]
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}