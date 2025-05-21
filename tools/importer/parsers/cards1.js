/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards1)'];

  const rows = [];

  element.querySelectorAll(':scope > div > div > div > div').forEach((card) => {
    const image = card.querySelector('img');
    const heading = card.querySelector('h3');
    const description = card.querySelector('p');
    const cta = card.querySelector('span');

    const imageElement = image ? image : '';

    const textContent = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent;
      textContent.appendChild(headingElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      textContent.appendChild(descriptionElement);
    }
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.textContent = cta.textContent;
      ctaElement.href = card.querySelector('a').href;
      textContent.appendChild(ctaElement);
    }

    rows.push([imageElement, textContent]);
  });

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}