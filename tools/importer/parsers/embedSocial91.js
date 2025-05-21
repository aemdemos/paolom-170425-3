/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed (embedSocial91)';

  // Extract relevant content dynamically
  const content = Array.from(element.querySelectorAll(':scope > div, :scope > img, :scope > code, :scope > [src]'));

  // Prepare rows for the table
  const rows = [headerRow];

  content.forEach((node) => {
    if (node.tagName === 'IMG') {
      rows.push([node]);
    } else if (node.tagName === 'CODE') {
      const pre = document.createElement('pre');
      pre.textContent = node.textContent.trim();
      rows.push([pre]);
    } else if (node.hasAttribute('src')) {
      const link = document.createElement('a');
      link.href = node.getAttribute('src');
      link.textContent = link.href;
      rows.push([link]);
    } else {
      rows.push([node]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}