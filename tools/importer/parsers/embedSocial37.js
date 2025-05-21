/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header dynamically
  const headerRow = ['Embed (embedSocial37)'];

  // Process all relevant embedded content dynamically
  const embedContentRows = [];
  element.querySelectorAll(':scope [src], :scope a').forEach((el) => {
    let cellContent;
    if (el.tagName.toLowerCase() === 'iframe' || el.tagName.toLowerCase() === 'a') {
      // Convert iframes and links with href/src attributes to proper links
      const link = document.createElement('a');
      link.href = el.src || el.href;
      link.textContent = el.src || el.href;
      cellContent = link;
    } else if (el.tagName.toLowerCase() === 'img') {
      // Keep images as-is
      cellContent = el;
    }
    if (cellContent) {
      embedContentRows.push([cellContent]);
    }
  });

  // Ensure we handle empty content gracefully
  if (embedContentRows.length === 0) {
    console.error('No embed content found within the element');
    return;
  }

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable([headerRow, ...embedContentRows], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}