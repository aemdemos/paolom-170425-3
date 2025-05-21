/* global WebImporter */
export default function parse(element, { document }) {

  // Set the table header row
  const headerRow = ['Cards (cards46)'];

  // Initialize the table cells array with the header
  const cells = [headerRow];

  // Extract card elements from the immediate children of the element
  const cardElements = element.querySelectorAll(':scope > div, :scope > span');

  cardElements.forEach((cardElement) => {
    // Extract image element if available
    const image = cardElement.querySelector('img');

    // Extract title (heading or strong element)
    const title = cardElement.querySelector('h2') || cardElement.querySelector('strong');

    // Extract description (paragraph element)
    const description = cardElement.querySelector('p');

    // Extract links (anchor elements)
    const links = [...cardElement.querySelectorAll('a')];

    // Prepare content for the table cell
    const cardContent = [];

    // Push extracted elements into the cardContent array
    if (title) cardContent.push(title);
    if (description) cardContent.push(description);
    if (links.length) cardContent.push(...links);

    // Add the row with image and card content
    cells.push([image || '', cardContent]);
  });

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);

  // Return the table for further processing
  return table;
}