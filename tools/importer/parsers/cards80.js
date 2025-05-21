/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards80)'];

  // Extract immediate child cards from the element
  const cards = [...element.querySelectorAll(':scope > a')];

  const rows = cards.map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('p[type="Heading"], p.sc-d5b97ae3-4');
    const description = card.querySelector('p.sc-d5b97ae3-10, p.styled__Paragraph-sc-165cfko-1');

    const contentCell = document.createElement('div');

    if (title && description && title.textContent !== description.textContent) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent;
      contentCell.appendChild(titleElement);

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      contentCell.appendChild(descriptionElement);
    } else if (title || description) {
      const singleElement = document.createElement('p');
      singleElement.textContent = title ? title.textContent : description.textContent;
      contentCell.appendChild(singleElement);
    }

    let imageCell = null;
    if (image) {
      imageCell = image.cloneNode(true);
    } else {
      imageCell = document.createElement('span');
      imageCell.textContent = 'Image not available';
    }

    return [imageCell, contentCell];
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}