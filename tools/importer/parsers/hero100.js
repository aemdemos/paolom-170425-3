/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example block name
  const headerRow = ['Hero (hero100)'];

  // Extract content dynamically from the provided element
  const heading = element.querySelector(':scope > p');
  const button = element.querySelector(':scope > a');

  // Handle edge cases for missing content
  const extractedHeading = heading ? heading : document.createTextNode('');
  const extractedButton = button ? button : document.createTextNode('');

  // Combine content into a single semantic block (second row)
  const combinedContent = document.createElement('div');
  if (heading) combinedContent.appendChild(heading);
  if (button) combinedContent.appendChild(button);

  // Prepare table cells
  const contentRow = [combinedContent];

  // Create table block
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with the newly created block
  element.replaceWith(block);
}