/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed (embedVideo85)'];

  // Creating a single array to hold all images
  const imagesAndLinks = [];

  // Extracting all child list items
  const listItems = element.querySelectorAll(':scope > li');

  listItems.forEach((item) => {
    const img = item.querySelector('img');

    // Ensure the image exists
    if (img) {
      imagesAndLinks.push(img);
    }

    const picture = item.querySelector('picture');
    if (picture) {
      const imgInPicture = picture.querySelector('img');
      if (imgInPicture) {
        imagesAndLinks.push(imgInPicture);
      }
    }
  });

  // Create the table structure
  const cells = [
    headerRow, // Header row
    [imagesAndLinks] // Content row with a single column combining all images
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}