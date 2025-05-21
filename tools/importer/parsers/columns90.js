/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements
  const title = element.querySelector(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > h1');
  const description = element.querySelector(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > p');
  const links = Array.from(element.querySelectorAll(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > .sc-d861898d-10 > a'));
  const videos = Array.from(element.querySelectorAll(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > .sc-d861898d-3, .sc-d861898d-4')).map(video => {
    const src = video.querySelector('source')?.src;
    if (src) {
      const link = document.createElement('a');
      link.href = src;
      link.textContent = 'Watch Video';
      return link;
    }
    return video;
  });
  const image = element.querySelector(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > .sc-d861898d-5 > picture > img');
  const integrationText = element.querySelector(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > .sc-d861898d-6');
  const logos = Array.from(element.querySelectorAll(':scope > .sc-d861898d-0 > .sc-96dedae7-0 > .sc-d861898d-7 > li > img'));

  // Header row
  const headerRow = ['Columns (columns90)'];

  // First content row
  const firstRow = [
    [title, description, ...links],
    videos
  ];

  // Second content row
  const secondRow = [
    [image, integrationText],
    logos
  ];

  // Create table
  const cells = [headerRow, firstRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(block);
}