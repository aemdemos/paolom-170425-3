/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero2)'];

  // Extracting title (mandatory)
  const sectionDiv = element.querySelector(':scope > div');
  const wrapperDiv = sectionDiv?.querySelector(':scope > div');
  const title = wrapperDiv?.querySelector('h3');

  // Extracting subheading/paragraph (optional)
  const paragraph = wrapperDiv?.querySelector('p');

  // Extracting call-to-action links (optional)
  const buttonWrapper = wrapperDiv?.querySelector(':scope > div:last-child');
  const buttons = buttonWrapper ? Array.from(buttonWrapper.querySelectorAll('a')).map((btn) => {
    const link = document.createElement('a');
    link.href = btn.href;
    link.textContent = btn.textContent;
    return link;
  }) : [];

  // Combining content into table rows
  const contentRow = [title, paragraph, ...buttons].filter(Boolean); // Filter out null/undefined values

  const tableRows = [
    headerRow,
    [contentRow]
  ];

  // Creating the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replacing the original element with the new structured table block
  element.replaceWith(blockTable);
}