/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs (tabs19)'];

  // Collect tab data
  const tabs = Array.from(element.querySelectorAll(':scope > div.sc-a8df2d96-9')).map((tabElement) => {
    const labelElem = tabElement.querySelector('p.styled__Overline-sc-165cfko-0');
    const tabLabel = labelElem ? [labelElem] : [];

    const contentElems = Array.from(tabElement.querySelectorAll('div.sc-a8df2d96-12 > *')).map((contentElem) => {
      if (contentElem.tagName === 'A' && contentElem.href) {
        const link = document.createElement('a');
        link.href = contentElem.href;
        link.textContent = contentElem.textContent;
        return link;
      }
      return contentElem;
    });

    return [tabLabel, contentElems];
  });

  const cells = [headerRow, ...tabs];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}