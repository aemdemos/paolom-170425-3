/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Cards (cardsNoImages24)'];
  cells.push(headerRow);

  // Process each card within the element
  element.querySelectorAll(':scope > div.sc-77561d41-3').forEach((cardContainer) => {
    const contentContainer = cardContainer.querySelector(':scope > div.sc-77561d41-4 > div.sc-77561d41-2');
    const testimonialContainer = cardContainer.querySelector(':scope > div.sc-77561d41-4 > div.sc-77561d41-1');

    const cardContent = [];

    // Extract heading if present
    const heading = contentContainer.querySelector('h2');
    if (heading) {
      cardContent.push(heading);
    }

    // Extract paragraphs
    contentContainer.querySelectorAll('p').forEach((paragraph) => {
      cardContent.push(paragraph);
    });

    // Extract testimonial quote and details
    if (testimonialContainer) {
      const quote = testimonialContainer.querySelector('p');
      if (quote) {
        cardContent.push(quote);
      }

      const imageContainer = testimonialContainer.querySelector('picture');
      if (imageContainer) {
        cardContent.push(imageContainer);
      }

      const nameContainer = testimonialContainer.querySelector(':scope > div');
      if (nameContainer) {
        cardContent.push(nameContainer);
      }
    }

    // If cardContent contains valid elements, add to cells
    if (cardContent.length > 0) {
      cells.push([cardContent]);
    }
  });

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(blockTable);
}