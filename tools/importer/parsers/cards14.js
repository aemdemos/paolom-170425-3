/* global WebImporter */
export default function parse(element, { document }) {
    // Ensure all cards are properly extracted
    const cards = Array.from(element.querySelectorAll(':scope > a'));

    // Start table content with proper header row
    const tableData = [
        ['Cards (cards14)'], // Header row matches example exactly
    ];

    // Iterate over each card and extract relevant data
    cards.forEach((card) => {
        const contentDiv = card.querySelector(':scope > div'); // Get the immediate div inside the card link
        const title = contentDiv.querySelector('h3'); // Extract title (heading)
        const description = contentDiv.querySelector('p'); // Extract description (paragraph)
        const link = document.createElement('a'); // Create a link element for the card
        link.href = card.href; // Dynamically set the href based on card's link
        link.textContent = "Learn More"; // Text content of the link

        // Handle cases where data might be missing
        const cellContent = [
            ...(title ? [title] : []),
            ...(description ? [description] : []),
            link, // Always include the CTA link
        ];

        // Push the cell content into the table data
        tableData.push([cellContent]);
    });

    // Create the block using the helper function
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the structured block table
    element.replaceWith(block);
}