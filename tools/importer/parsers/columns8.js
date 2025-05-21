/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns8)'];

  const rows = [];

  // Collect immediate children of the element
  const sections = Array.from(element.querySelectorAll(':scope > div'));

  // Process first section: Use Case Buttons
  const useCaseSection = sections[0];
  const useCaseHeadings = Array.from(useCaseSection.querySelectorAll('h3')).map(heading => heading.cloneNode(true));
  const useCaseButtons = Array.from(useCaseSection.querySelectorAll('button')).map(button => button.cloneNode(true));

  rows.push([useCaseHeadings, useCaseButtons]);

  // Process pricing section
  const pricingSections = sections.slice(1);
  const pricingRows = pricingSections.map(section => {
    const paragraph = section.querySelector('p');
    const link = section.querySelector('a');
    return [paragraph.cloneNode(true), link.cloneNode(true)];
  });

  rows.push(...pricingRows);

  // Create block table
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}