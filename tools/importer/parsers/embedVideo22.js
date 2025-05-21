/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo22)'];

  // Extract iframe and src attribute dynamically from the element
  const iframe = element.querySelector('iframe');
  const videoSrc = iframe ? iframe.src : '';

  // Create a link element referencing existing src
  const link = document.createElement('a');
  link.href = videoSrc;
  link.textContent = videoSrc;

  // Build the cells array dynamically
  const cells = [
    headerRow, // Header row matches example markdown structure
    [link] // Content row containing video URL dynamically extracted
  ];

  // Create table using WebImporter helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}