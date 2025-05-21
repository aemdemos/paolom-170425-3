/* global WebImporter */
export default function parse(element, { document }) {
  // Extract immediate children of the element
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Extract relevant content from the first child block
  const logoBlock = children[0];
  const logo = logoBlock.querySelector('img');
  const link = logoBlock.querySelector('a');

  // Extract convenience, privacy, and security sections
  const sections = Array.from(children[1].querySelectorAll(':scope > div'));
  const sectionTexts = sections.map((section) => section.querySelector('p'));

  // Table structure
  const headerRow = ['Columns (columns79)'];
  const contentRow = [
    [logo, link],
    sectionTexts
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}