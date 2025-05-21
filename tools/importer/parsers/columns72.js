/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Columns (columns72)'];

  // Extract content from the first column (left)
  const image = element.querySelector('picture img');
  const overline = element.querySelector('p.styled__Overline-sc-165cfko-0');
  const title = element.querySelector('h1.styled__Display-sc-165cfko-3');
  const text = element.querySelector('p.styled__Paragraph-sc-165cfko-1');
  const migrateFromRulesLink = element.querySelector('a[rel="external"][href*="migrate-from-rules-to-actions"]');
  const migrateFromHooksLink = element.querySelector('a[rel="external"][href*="migrate-from-hooks-to-actions"]');

  // Extract video element from the second column (right)
  const video = element.querySelector('video');

  // Prepare the content rows
  const firstRow = [
    [image],
    [overline, title, text, migrateFromRulesLink, migrateFromHooksLink],
  ];

  const secondRow = [
    [video],
  ];

  const cells = [headerRow, firstRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}