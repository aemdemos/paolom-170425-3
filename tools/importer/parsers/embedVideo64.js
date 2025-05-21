/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Embed (embedVideo64)'];

    // Extract heading, buttons, and text content dynamically
    const blockContent = [];

    // Extract heading
    const heading = element.querySelector(':scope > div > div > div > h3');
    if (heading) {
        blockContent.push(heading);
    }

    // Extract buttons
    const buttons = element.querySelectorAll(':scope > div > div > div > div > button');
    buttons.forEach((button) => {
        blockContent.push(button);
    });

    // Create table structure
    const cells = [
        headerRow,
        [blockContent],
    ];

    // Generate the table and replace the original element
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}