/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards98)'];
    const rows = Array.from(element.querySelectorAll(':scope > a')).map((card) => {
        const image = card.querySelector('img');
        const imageElement = image.cloneNode(true);

        const title = card.querySelector('h2');
        const titleElement = title ? document.createElement('div') : null;
        if (titleElement) {
            titleElement.appendChild(title.cloneNode(true));
        }

        const description = card.querySelector('p');
        const descriptionElement = description ? document.createElement('div') : null;
        if (descriptionElement) {
            descriptionElement.appendChild(description.cloneNode(true));
        }

        const link = card.querySelector('[role="link"]');
        const linkElement = link ? document.createElement('div') : null;
        if (linkElement) {
            const anchor = document.createElement('a');
            anchor.href = card.href;
            anchor.appendChild(link.cloneNode(true));
            linkElement.appendChild(anchor);
        }

        const textCell = document.createElement('div');
        if (titleElement) textCell.appendChild(titleElement);
        if (descriptionElement) textCell.appendChild(descriptionElement);
        if (linkElement) textCell.appendChild(linkElement);

        return [imageElement, textCell];
    });

    const cells = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}