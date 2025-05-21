/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row with the block name matching the example
  const headerRow = ['Columns (columns54)'];
  cells.push(headerRow);

  // Extract child a elements directly inside the element
  const childLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Map child links to table rows
  const row = childLinks.map((link) => {
    const content = [];

    // Extract relevant content inside each link
    const overline = link.querySelector('p.styled__Overline-sc-165cfko-0');
    if (overline) content.push(overline);

    const heading = link.querySelector('h3.styled__Heading-sc-165cfko-2');
    if (heading) content.push(heading);

    const paragraph = link.querySelector('p.styled__Paragraph-sc-165cfko-1');
    if (paragraph) content.push(paragraph);

    const button = link.querySelector('button');
    if (button) content.push(button);

    // Add link itself using semantic description (e.g., 'Live' or 'Learn more')
    const href = link.getAttribute('href');
    const linkText = button ? button.textContent.trim() : 'Link';
    if (href) {
      const linkElement = document.createElement('a');
      linkElement.href = href;
      linkElement.textContent = linkText;
      content.push(linkElement);
    }

    return content;
  });

  cells.push(row);

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}