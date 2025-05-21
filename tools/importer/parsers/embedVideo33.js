/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo33)'];

  const contentDivs = element.querySelectorAll(':scope > div.sc-ab57643d-6, :scope > div.sc-ab57643d-8');

  const rows = Array.from(contentDivs).flatMap(div => {
    const sections = div.querySelectorAll(':scope > div > div.sc-ab57643d-11');

    return Array.from(sections).map(section => {
      const img = section.querySelector('img');
      const text = section.querySelector('div.sc-ab57643d-10');

      // Combine image and text into one element inside the same cell
      const combinedContent = document.createElement('div');
      if (img) combinedContent.appendChild(img);
      if (text) combinedContent.appendChild(text);

      return [combinedContent]; // Ensure all content is merged in one cell
    });
  });

  const cells = [
    headerRow,
    ...rows
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}