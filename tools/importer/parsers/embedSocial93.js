/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Embed (embedSocial93)'];

    // Extract the link elements dynamically from the provided HTML
    const linksWrapper = element.querySelector(':scope > div.linksWrapper');
    const linkElements = [];
    if (linksWrapper) {
        linksWrapper.querySelectorAll(':scope > a').forEach(link => {
            if (link.href) {
                const anchor = document.createElement('a');
                anchor.href = link.href;
                anchor.textContent = link.textContent;
                linkElements.push(anchor);
            }
        });
    }

    // Handle edge cases: No links found
    if (linkElements.length === 0) {
        const errorMessage = document.createElement('span');
        errorMessage.textContent = 'No links provided.';
        linkElements.push(errorMessage);
    }

    // Build the table structure dynamically based on extracted content
    const cells = [
        headerRow,
        [linkElements] // Combine all links into one cell
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}