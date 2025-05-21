/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant child elements of the block
    const rows = [...element.querySelectorAll(':scope > div')];

    // Define the table header row dynamically as per the component name
    const headerRow = ['Columns (columns47)'];

    // Extract content from the rows and dynamically structure the table rows
    const contentRow = rows.map(row => {
        const contentElements = [...row.querySelectorAll(':scope > div, :scope > img, :scope > p, :scope > a')];
        return contentElements.map(element => {
            // If the element contains an src attribute (e.g. iframe) and is not an image
            if (element.tagName === 'IFRAME' || element.tagName === 'VIDEO') {
                const link = document.createElement('a');
                link.href = element.src;
                link.textContent = element.src;
                return link;
            } else {
                return element;
            }
        });
    });

    // Combine the header and content rows into a table
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRow], document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);

    // Do not return anything
}