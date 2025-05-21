/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Hero (hero13)'];

  // Safely extract the main content
  const contentContainer = element.querySelector(':scope > div > div > div.styled__Content-sc-vosx1t-1');
  const heading = contentContainer ? contentContainer.querySelector('h1') : null;
  const paragraph = contentContainer ? contentContainer.querySelector('p') : null;
  const buttons = contentContainer ? Array.from(contentContainer.querySelectorAll('a[role="button"]')) : [];

  // Safely extract the image
  const imageContainer = element.querySelector(':scope > div > div > div.styled__GridItem-sc-vosx1t-2:last-child');
  const image = imageContainer ? imageContainer.querySelector('img') : null;

  // Combine all content into a single cell
  const combinedContent = [
    heading,
    paragraph,
    ...buttons,
    image,
  ].filter(Boolean); // Filter out null values

  // Create the content row with a single cell
  const contentRow = [[combinedContent]];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([headerRow, ...contentRow], document);

  // Replace the original element
  element.replaceWith(block);
}