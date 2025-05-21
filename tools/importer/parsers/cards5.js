/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (cards5)'];

    // Collect all card elements
    const cards = Array.from(element.querySelectorAll(':scope > div.sc-42ef8a1-2'));

    const rows = cards.map(card => {
        const image = card.querySelector(':scope img');
        const titleParagraphs = Array.from(card.querySelectorAll(':scope > div > div > p'));
        const description = card.querySelector(':scope .sc-42ef8a1-6 span');
        const links = Array.from(card.querySelectorAll(':scope .sc-42ef8a1-7 a'));

        // First cell: Image
        const imageCell = image;

        // Second cell: Title, Description & Links
        const contentElements = [];

        // Add title paragraphs
        titleParagraphs.forEach(p => contentElements.push(p));

        // Add description paragraph
        if (description) {
            Array.from(description.children).forEach(child => contentElements.push(child));
        }

        // Add links
        links.forEach(link => contentElements.push(link));

        return [imageCell, contentElements];
    });

    // Build the table
    const cells = [
        headerRow,
        ...rows
    ];

    // Fix for createTable issue: Pass the document object explicitly
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(blockTable);
}