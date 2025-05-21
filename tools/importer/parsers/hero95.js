/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the element
  const content = element.querySelector(':scope > div.styled__Content-sc-vosx1t-1');
  const titleWrapper = content ? content.querySelector(':scope > div > div.styled__TitleWrapper-sc-yasz6-0') : null;
  const heading = titleWrapper ? titleWrapper.querySelector('h2') : null;

  // Check for missing content or unexpected structure
  if (!heading) {
    console.warn('Heading element is missing or not found in the expected structure');
    return;
  }

  // Ensure the semantic meaning is preserved
  const headerRow = ['Hero (hero95)'];

  // Create the content row referencing the existing elements
  const contentRow = [heading];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}