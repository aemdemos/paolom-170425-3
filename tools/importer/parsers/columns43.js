/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns from direct children sections
  const sections = Array.from(element.querySelectorAll(':scope > section'));

  // Header row for the block
  const headerRow = ['Columns (columns43)'];

  // Extract content for each section into a column
  const contentRow = sections.map((section) => {
    // Clone the section to avoid modifying original DOM
    const clonedSection = section.cloneNode(true);

    // Remove unnecessary attributes like classes from all elements within the section
    clonedSection.querySelectorAll('*').forEach(el => el.removeAttribute('class'));

    // Transform 'src' attributes of non-image elements into links
    clonedSection.querySelectorAll('[src]:not(img)').forEach(el => {
      const link = document.createElement('a');
      link.href = el.getAttribute('src');
      link.textContent = el.getAttribute('src');
      el.replaceWith(link);
    });

    // Handle edge cases: Check if the section has valid content, otherwise replace with placeholder
    if (!clonedSection.textContent.trim()) {
      const placeholder = document.createElement('p');
      placeholder.textContent = 'No content available';
      return placeholder;
    }

    return clonedSection;
  });

  // Create the table for the block
  const tableData = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}