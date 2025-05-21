/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero62)']; // Ensure header matches the example exactly

  // Safely extract relevant content dynamically
  const contentBlock = element.querySelector(':scope > div');
  if (!contentBlock) {
    console.error('Content block not found');
    return;
  }
  const logo = contentBlock.querySelector(':scope > div img');
  const heading = contentBlock.querySelector(':scope > div h1');
  const subheading = contentBlock.querySelector(':scope > div p');
  const ctaButton = contentBlock.querySelector(':scope > div button');

  const backgroundBlock = element.querySelector(':scope > div:nth-child(2)');
  const backgroundImage = backgroundBlock ? backgroundBlock.querySelector('picture img') : null;

  // Handle edge cases: Missing or empty elements
  const contentCell = document.createElement('div');

  if (logo) {
    contentCell.appendChild(logo);
  }
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent;
    contentCell.appendChild(headingElement);
  }
  if (subheading) {
    const subheadingElement = document.createElement('p');
    subheadingElement.textContent = subheading.textContent;
    contentCell.appendChild(subheadingElement);
  }
  if (ctaButton) {
    const ctaElement = document.createElement('a');
    ctaElement.href = '#'; // Replace # with actual href if available
    ctaElement.textContent = ctaButton.textContent;
    contentCell.appendChild(ctaElement);
  }

  // Combine the background image with text into one cell
  const secondCellContent = document.createElement('div');
  if (backgroundImage) {
    secondCellContent.appendChild(backgroundImage);
  }

  const cells = [
    headerRow,
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}