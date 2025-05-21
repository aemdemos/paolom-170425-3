/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements
  const children = Array.from(element.querySelectorAll(':scope > div'));
  
  const headerRow = ['Hero (hero20)'];

  const content = [];

  children.forEach((child) => {
    const title = child.querySelector('h2');
    const subheading = child.querySelector('h3');
    const button = child.querySelector('a');

    if (title) content.push(title);
    if (subheading) content.push(subheading);
    if (button) {
      const link = document.createElement('a');
      link.href = button.href;
      link.textContent = button.textContent;
      content.push(link);
    }
  });

  const cells = [headerRow, [content]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}