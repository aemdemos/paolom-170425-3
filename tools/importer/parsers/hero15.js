/* global WebImporter */
export default function parse(element, { document }) {
  // Identify relevant content inside the element
  const contentWrapper = element.querySelector(':scope > div > div.styled__Content-sc-vosx1t-1');

  if (!contentWrapper) {
    return;
  }

  const titleBlock = contentWrapper.querySelector(':scope > div.styled__GridItem-sc-vosx1t-2 .styled__TitleWrapper-sc-yasz6-0');

  const titleElement = titleBlock.querySelector('h2.styled__Display-sc-165cfko-3');
  const subtitleElement = titleBlock.querySelector('p.styled__Paragraph-sc-165cfko-1');

  // Extract relevant elements
  const title = titleElement ? titleElement.cloneNode(true) : null;
  const subtitle = subtitleElement ? subtitleElement.cloneNode(true) : null;

  // Create the table structure
  const headerRow = ['Hero (hero15)'];
  const contentRow = [
    title && subtitle ? [title, subtitle] : title || subtitle, // Combine title and subtitle into one row
  ];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow].filter(Boolean), document);

  // Replace the original element with the table
  element.replaceWith(table);
}