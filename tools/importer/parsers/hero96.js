/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero96)'];

  // Extract heading
  const heading = element.querySelector('h2');

  // Extract call-to-action form
  const form = element.querySelector('form');

  const cells = [
    headerRow,
    [
      heading,
      form
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}