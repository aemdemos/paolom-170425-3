/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns39)'];

    // Extract all logo images and their alt text for semantic meaning
    const logoContainer = element.querySelector(':scope > .sc-4c94143a-3');
    const logoImages = logoContainer ? Array.from(logoContainer.querySelectorAll(':scope > div img')) : [];

    // Combine all images and their alt text into a single cell
    const logoCell = logoImages.map((image) => {
        const wrapper = document.createElement('div');
        wrapper.append(image);
        if (image.alt) {
            const altText = document.createElement('p');
            altText.textContent = image.alt;
            wrapper.append(altText);
        }
        return wrapper;
    });

    // Extract call-to-action links and separate them into distinct cells
    const ctaContainer = element.querySelector(':scope > .sc-4c94143a-2');
    const ctaButton = ctaContainer ? ctaContainer.querySelector('a') : null;
    const ctaLink = element.querySelector(':scope > a.styled__Link-sc-bubr9x-0');

    const ctaCells = [ctaButton, ctaLink].filter(item => item !== null);

    // Create rows for the table
    const rows = [
        headerRow,
        [logoCell],
        ctaCells
    ];

    const table = WebImporter.DOMUtils.createTable(rows, document);

    element.replaceWith(table);
}