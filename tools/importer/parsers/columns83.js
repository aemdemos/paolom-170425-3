/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting header content
  const headerContent = element.querySelector(':scope > div:first-child');
  
  // Extracting columns for "Your use case" section
  const useCaseSection = element.querySelector(':scope > div:last-child > div:nth-of-type(1)');
  const useCaseHeading = useCaseSection.querySelector('h3');
  const useCaseButtons = Array.from(useCaseSection.querySelectorAll('button'));

  const useCaseColumn = document.createElement('div');
  if (useCaseHeading) useCaseColumn.appendChild(useCaseHeading);
  useCaseButtons.forEach((btn) => useCaseColumn.appendChild(btn));

  // Extracting columns for "Plan type" section
  const planTypeSection = element.querySelector(':scope > div:last-child > div:nth-of-type(2)');
  const planTypeHeading = planTypeSection.querySelector('h3');
  const planTypeButtons = Array.from(planTypeSection.querySelectorAll('button'));

  const planTypeColumn = document.createElement('div');
  if (planTypeHeading) planTypeColumn.appendChild(planTypeHeading);
  planTypeButtons.forEach((btn) => planTypeColumn.appendChild(btn));

  // Creating table rows
  const headerRow = ['Columns (columns83)'];
  const dataRow = [headerContent, useCaseColumn, planTypeColumn];

  // Creating table
  const cells = [headerRow, dataRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the element with the block
  element.replaceWith(block);
}