/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Embed (embedVideo29)'];
  cells.push(headerRow);

  // Content row
  const contentRow = [];

  // Extract image
  const imageElement = element.querySelector('img');
  if (imageElement) {
    contentRow.push(imageElement);
  }

  // Extract video link
  const videoIframe = element.querySelector('iframe');
  if (videoIframe) {
    const videoLink = document.createElement('a');
    videoLink.href = videoIframe.src;
    videoLink.textContent = videoIframe.src;
    contentRow.push(videoLink);
  }

  cells.push([contentRow]);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}