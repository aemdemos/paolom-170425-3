/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video link and image
  const videoLink = element.querySelector('a[href]:not([href="javascript:void(0)"])');
  const image = element.querySelector('img');

  // Fix content row by excluding irrelevant SVG and ensuring only valid image and video link
  const contentRow = [];
  if (image) contentRow.push(image);
  if (videoLink && videoLink.href) {
    const anchor = document.createElement('br');
    const linkElement = document.createElement('a');
    linkElement.href = videoLink.href;
    linkElement.textContent = videoLink.href; // Ensure proper URL text representation
    contentRow.push(anchor, linkElement);
  }

  // Fix header row, ensuring it matches the example exactly
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed (embedVideo23)';

  // Create the block table
  const tableData = [[headerRow[0]], [contentRow]];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}