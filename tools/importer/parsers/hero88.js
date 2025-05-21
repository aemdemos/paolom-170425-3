/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row correctly
  const headerRow = ['Hero (hero88)'];

  // Extract main block content dynamically
  const mainBlock = element.querySelector(':scope > div.sc-86bb0e5d-0');
  const title = mainBlock?.querySelector('h1');
  const subtitle = mainBlock?.querySelector('h2');
  const description = mainBlock?.querySelector('p');
  const heroImage = mainBlock?.querySelector('img');

  // Extract CTA section dynamically
  const ctaSection = element.querySelector(':scope > section.sc-86bb0e5d-6');
  const ctaText = ctaSection?.querySelector('p');
  const ctaLink = ctaSection?.querySelector('a');
  const ctaImage = ctaSection?.querySelector('img');

  // Combine all extracted elements into one column for clarity
  const combinedContent = document.createElement('div');
  if (title) combinedContent.appendChild(title);
  if (subtitle) combinedContent.appendChild(subtitle);
  if (description) combinedContent.appendChild(description);
  if (heroImage) combinedContent.appendChild(heroImage);
  if (ctaText) combinedContent.appendChild(ctaText);
  if (ctaLink) combinedContent.appendChild(ctaLink);
  if (ctaImage) combinedContent.appendChild(ctaImage);

  // Constructing the second row to match the example
  const secondRow = [[combinedContent]];

  const tableData = [headerRow, ...secondRow];

  // Generate block table and replace the element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}