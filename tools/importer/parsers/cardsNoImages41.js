/* global WebImporter */
export default function parse(element, { document }) {
    // Create the header row
    const headerRow = ['Cards (cardsNoImages41)'];

    // Select all card elements within the given element
    const cards = element.querySelectorAll(':scope > a');

    // Process each card and extract the content into rows
    const rows = Array.from(cards).map((card) => {
        // Extract optional overline (type of content)
        const overline = card.querySelector('p'); 
        const heading = card.querySelector('h2'); // Card title
        
        // Create the CTA link dynamically
        const link = document.createElement('a'); 
        link.href = card.href;
        link.textContent = card.href; // Use actual href value as the link text for precision

        // Gather all elements into a single cell
        const cellContent = [];
        if (overline) cellContent.push(overline);
        if (heading) cellContent.push(heading);
        cellContent.push(link);

        return [cellContent];
    });

    // Combine header and rows into table structure
    const tableData = [headerRow, ...rows];

    // Create the table element
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}