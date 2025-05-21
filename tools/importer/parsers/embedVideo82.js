/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Embed (embedVideo82)'];

    // Extract button
    const button = element.querySelector('a');

    // Ensure button exists
    if (!button) {
        console.error('Button element not found within the provided HTML element.');
        return;
    }

    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.href;

    const cells = [
        headerRow,
        [link],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}