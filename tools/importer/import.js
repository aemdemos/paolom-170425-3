/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns8Parser from './parsers/columns8.js';
import columns9Parser from './parsers/columns9.js';
import cards1Parser from './parsers/cards1.js';
import cards4Parser from './parsers/cards4.js';
import columns7Parser from './parsers/columns7.js';
import columns3Parser from './parsers/columns3.js';
import hero15Parser from './parsers/hero15.js';
import cards14Parser from './parsers/cards14.js';
import hero12Parser from './parsers/hero12.js';
import columns10Parser from './parsers/columns10.js';
import tabs19Parser from './parsers/tabs19.js';
import hero13Parser from './parsers/hero13.js';
import cards18Parser from './parsers/cards18.js';
import embedVideo22Parser from './parsers/embedVideo22.js';
import hero17Parser from './parsers/hero17.js';
import hero20Parser from './parsers/hero20.js';
import search25Parser from './parsers/search25.js';
import embedSocial28Parser from './parsers/embedSocial28.js';
import hero27Parser from './parsers/hero27.js';
import columns26Parser from './parsers/columns26.js';
import columns21Parser from './parsers/columns21.js';
import columns32Parser from './parsers/columns32.js';
import hero31Parser from './parsers/hero31.js';
import cards5Parser from './parsers/cards5.js';
import columns35Parser from './parsers/columns35.js';
import hero2Parser from './parsers/hero2.js';
import embedVideo33Parser from './parsers/embedVideo33.js';
import tableStripedBordered6Parser from './parsers/tableStripedBordered6.js';
import embedSocial37Parser from './parsers/embedSocial37.js';
import hero40Parser from './parsers/hero40.js';
import columns38Parser from './parsers/columns38.js';
import cardsNoImages41Parser from './parsers/cardsNoImages41.js';
import cardsNoImages24Parser from './parsers/cardsNoImages24.js';
import cards45Parser from './parsers/cards45.js';
import tableStripedBordered44Parser from './parsers/tableStripedBordered44.js';
import hero42Parser from './parsers/hero42.js';
import columns36Parser from './parsers/columns36.js';
import columns43Parser from './parsers/columns43.js';
import columns49Parser from './parsers/columns49.js';
import columns51Parser from './parsers/columns51.js';
import cardsNoImages52Parser from './parsers/cardsNoImages52.js';
import hero50Parser from './parsers/hero50.js';
import tableStripedBordered53Parser from './parsers/tableStripedBordered53.js';
import columns54Parser from './parsers/columns54.js';
import columns34Parser from './parsers/columns34.js';
import tableStripedBordered55Parser from './parsers/tableStripedBordered55.js';
import columns39Parser from './parsers/columns39.js';
import cards48Parser from './parsers/cards48.js';
import cardsNoImages60Parser from './parsers/cardsNoImages60.js';
import cards59Parser from './parsers/cards59.js';
import columns58Parser from './parsers/columns58.js';
import columns57Parser from './parsers/columns57.js';
import embedVideo61Parser from './parsers/embedVideo61.js';
import hero65Parser from './parsers/hero65.js';
import hero62Parser from './parsers/hero62.js';
import columns47Parser from './parsers/columns47.js';
import columns63Parser from './parsers/columns63.js';
import cards67Parser from './parsers/cards67.js';
import cards70Parser from './parsers/cards70.js';
import columns68Parser from './parsers/columns68.js';
import columns72Parser from './parsers/columns72.js';
import columns73Parser from './parsers/columns73.js';
import cards74Parser from './parsers/cards74.js';
import columns16Parser from './parsers/columns16.js';
import cardsNoImages76Parser from './parsers/cardsNoImages76.js';
import embedVideo29Parser from './parsers/embedVideo29.js';
import hero77Parser from './parsers/hero77.js';
import embedVideo64Parser from './parsers/embedVideo64.js';
import columns79Parser from './parsers/columns79.js';
import columns71Parser from './parsers/columns71.js';
import hero81Parser from './parsers/hero81.js';
import embedVideo82Parser from './parsers/embedVideo82.js';
import cards80Parser from './parsers/cards80.js';
import columns83Parser from './parsers/columns83.js';
import columns84Parser from './parsers/columns84.js';
import tableNoHeader75Parser from './parsers/tableNoHeader75.js';
import embedVideo85Parser from './parsers/embedVideo85.js';
import cards89Parser from './parsers/cards89.js';
import columns78Parser from './parsers/columns78.js';
import hero88Parser from './parsers/hero88.js';
import embedSocial91Parser from './parsers/embedSocial91.js';
import columns86Parser from './parsers/columns86.js';
import cards56Parser from './parsers/cards56.js';
import hero94Parser from './parsers/hero94.js';
import tableStripedBordered92Parser from './parsers/tableStripedBordered92.js';
import hero95Parser from './parsers/hero95.js';
import hero96Parser from './parsers/hero96.js';
import columns66Parser from './parsers/columns66.js';
import hero97Parser from './parsers/hero97.js';
import hero99Parser from './parsers/hero99.js';
import columns101Parser from './parsers/columns101.js';
import hero100Parser from './parsers/hero100.js';
import cards98Parser from './parsers/cards98.js';
import columns90Parser from './parsers/columns90.js';
import embedVideo23Parser from './parsers/embedVideo23.js';
import embedSocial93Parser from './parsers/embedSocial93.js';
import cards46Parser from './parsers/cards46.js';
import columns87Parser from './parsers/columns87.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns8: columns8Parser,
  columns9: columns9Parser,
  cards1: cards1Parser,
  cards4: cards4Parser,
  columns7: columns7Parser,
  columns3: columns3Parser,
  hero15: hero15Parser,
  cards14: cards14Parser,
  hero12: hero12Parser,
  columns10: columns10Parser,
  tabs19: tabs19Parser,
  hero13: hero13Parser,
  cards18: cards18Parser,
  embedVideo22: embedVideo22Parser,
  hero17: hero17Parser,
  hero20: hero20Parser,
  search25: search25Parser,
  embedSocial28: embedSocial28Parser,
  hero27: hero27Parser,
  columns26: columns26Parser,
  columns21: columns21Parser,
  columns32: columns32Parser,
  hero31: hero31Parser,
  cards5: cards5Parser,
  columns35: columns35Parser,
  hero2: hero2Parser,
  embedVideo33: embedVideo33Parser,
  tableStripedBordered6: tableStripedBordered6Parser,
  embedSocial37: embedSocial37Parser,
  hero40: hero40Parser,
  columns38: columns38Parser,
  cardsNoImages41: cardsNoImages41Parser,
  cardsNoImages24: cardsNoImages24Parser,
  cards45: cards45Parser,
  tableStripedBordered44: tableStripedBordered44Parser,
  hero42: hero42Parser,
  columns36: columns36Parser,
  columns43: columns43Parser,
  columns49: columns49Parser,
  columns51: columns51Parser,
  cardsNoImages52: cardsNoImages52Parser,
  hero50: hero50Parser,
  tableStripedBordered53: tableStripedBordered53Parser,
  columns54: columns54Parser,
  columns34: columns34Parser,
  tableStripedBordered55: tableStripedBordered55Parser,
  columns39: columns39Parser,
  cards48: cards48Parser,
  cardsNoImages60: cardsNoImages60Parser,
  cards59: cards59Parser,
  columns58: columns58Parser,
  columns57: columns57Parser,
  embedVideo61: embedVideo61Parser,
  hero65: hero65Parser,
  hero62: hero62Parser,
  columns47: columns47Parser,
  columns63: columns63Parser,
  cards67: cards67Parser,
  cards70: cards70Parser,
  columns68: columns68Parser,
  columns72: columns72Parser,
  columns73: columns73Parser,
  cards74: cards74Parser,
  columns16: columns16Parser,
  cardsNoImages76: cardsNoImages76Parser,
  embedVideo29: embedVideo29Parser,
  hero77: hero77Parser,
  embedVideo64: embedVideo64Parser,
  columns79: columns79Parser,
  columns71: columns71Parser,
  hero81: hero81Parser,
  embedVideo82: embedVideo82Parser,
  cards80: cards80Parser,
  columns83: columns83Parser,
  columns84: columns84Parser,
  tableNoHeader75: tableNoHeader75Parser,
  embedVideo85: embedVideo85Parser,
  cards89: cards89Parser,
  columns78: columns78Parser,
  hero88: hero88Parser,
  embedSocial91: embedSocial91Parser,
  columns86: columns86Parser,
  cards56: cards56Parser,
  hero94: hero94Parser,
  tableStripedBordered92: tableStripedBordered92Parser,
  hero95: hero95Parser,
  hero96: hero96Parser,
  columns66: columns66Parser,
  hero97: hero97Parser,
  hero99: hero99Parser,
  columns101: columns101Parser,
  hero100: hero100Parser,
  cards98: cards98Parser,
  columns90: columns90Parser,
  embedVideo23: embedVideo23Parser,
  embedSocial93: embedSocial93Parser,
  cards46: cards46Parser,
  columns87: columns87Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
