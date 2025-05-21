/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the necessary content from the element
  const image = element.querySelector('img[src]'); // Extract the image element

  // Convert non-image src attributes to links
  const iframeOrOtherSrcElements = Array.from(element.querySelectorAll('[src]:not(img)'));
  const srcLinks = iframeOrOtherSrcElements.map((el) => {
    const link = document.createElement('a');
    link.href = el.src;
    link.textContent = el.src;
    return link;
  });

  // Retain semantic structuring of headings
  const headings = Array.from(element.querySelectorAll('article h1')).map((heading) => {
    const headingDiv = document.createElement('div');
    headingDiv.appendChild(heading.cloneNode(true)); // Clone the original element to retain formatting
    return headingDiv;
  });

  const form = element.querySelector('form'); // Extract the form element if present

  // Ensure all elements exist to handle edge cases
  const extractedElements = [];
  if (image) extractedElements.push(image);
  if (srcLinks.length) extractedElements.push(...srcLinks);
  if (headings.length) extractedElements.push(...headings);
  if (form) extractedElements.push(form);

  // Create the header row dynamically based on the block name
  const headerRow = ['Hero (hero42)'];

  // Create the content row with the dynamically extracted elements
  const contentRow = [
    extractedElements.length ? extractedElements : [''] // Handle empty data gracefully
  ];

  // Create the table using the WebImporter helper function
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}