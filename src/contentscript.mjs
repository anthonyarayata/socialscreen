import Fuse from 'fuse.js';
import controversialData from '/src/filters/controversial.json';
import profanityData from '/src/filters/profanity.json';
import sexualData from '/src/filters/sexual.json';

// Define constants for selectors used in the filtering process
const SELECTORS = {
  TWITTER: {
    SPAN: "div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0']",
    POST: "div[class*='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']",
    COMMENT: "div[class*='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0'] span[class*='css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0']",
    TRENDING: "div[class*='css-1dbjc4n r-1adg3ll r-1ny4l3l']",
    TRENDING_TEXT: "div[class='css-901oao r-1nao33i r-37j5jr r-a023e6 r-b88u0q r-rjixqe r-1bymd8e r-bcqeeo r-qvutc0']"
  },
  FACEBOOK: {
    TEXT: "div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']",
    POST_CONTAINER: "div[class*='x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z']",
    COMMENT_CONTAINER: "div[class*='x1n2onr6']"
  },
  INSTAGRAM: {
    ELEMENTS: "h1, span",
    CAPTION: "h1[class*='_aacl _aaco _aacu _aacx _aad7 _aade']",
    COMMENT: "span[class*='_aacl _aaco _aacu _aacx _aad7 _aade']",
    POPUP_COMMENT: "div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']"
  },
  REDDIT: {
    POST_TEXT: "div[class='_2FCtq-QzlfuN-SwVMUZMM3 _3wiKjmhpIpoTE2r5KCm2o6 t3_13vurf1']",
    CAROUSEL: "div[class='_3GfG_jvS9X-90Q_8zU4uCu _3Y1KnhioRYkYGb93uAKhBZ']",
    TARGET_ELEMENTS: "h3[class*='eYtD2XCVieq6emjKBH3m'], p[class='_1qeIAgB0cPwnLhDF9XSiJM'], h2[class='_10WwrR6QeKoqfxT3UBj0Qq'], div[class='_2Jjv0TAohMSydVpAgyhjhA']",
    POST_THREAD: "shreddit-comment[class='pt-md px-md xs:px-0']",
    RIGHT_RAIL: "reddit-pdp-right-rail-post"
  },
  GENERAL: {
    TEXT_ELEMENTS: "p, h1, h2, h3, h4, h5, h6"
  }
};

const hideStyle = "display: none !important;";
const blurStyle = "color: transparent; text-shadow: 0 0 8px #000;";

// Initialize filter arrays
let selectedFilter = [];
let controversialFilter = [];
let profanityFilter = [];
let sexualFilter = [];
let customFilter = [];
let appliedFilters = [];

// Load filter data from JSON files
async function loadFilters() {
  if (controversialData && Array.isArray(controversialData.filter)) {
    controversialFilter.push(...controversialData.filter);
  }
  if (profanityData && Array.isArray(profanityData.filter)) {
    profanityFilter.push(...profanityData.filter);
  }
  if (sexualData && Array.isArray(sexualData.filter)) {
    sexualFilter.push(...sexualData.filter);
  }
}

// Load filters from Chrome storage
async function loadStoredFilters() {
  selectedFilter = (await chrome.storage.local.get('selectedFilter')).selectedFilter || [];
  const storedFilters = await chrome.storage.local.get(['controversialFilter', 'profanityFilter', 'sexualFilter', 'customFilters']);
  controversialFilter = storedFilters.controversialFilter || [];
  profanityFilter = storedFilters.profanityFilter || [];
  sexualFilter = storedFilters.sexualFilter || [];
  customFilter = storedFilters.customFilters || [];
}

// Save filters to Chrome storage
async function saveFilters() {
  await chrome.storage.local.set({
    controversialFilter,
    profanityFilter,
    sexualFilter,
    customFilters: customFilter
  });
}

// Create a Fuse.js instance for searching
function createFuseInstance(content) {
  return new Fuse(Array.from(content), {
    includeScore: true,
    threshold: 0.1,
    distance: "levenshtein"
  });
}

// Filter content based on the provided filters and hide matching elements
function filterContent(filterArray, content, fuseInstance, elementSelectors, containerSelector) {
  const splitselectedFilter = filterArray.flatMap(filter => filter.split(' '));

  for (const filter of splitselectedFilter) {
    const results = fuseInstance.search(filter);
    for (const result of results) {
      document.querySelectorAll(elementSelectors).forEach(element => {
        const textContent = element.textContent.toLowerCase();
        if (textContent.includes(result.item)) {
          const container = element.closest(containerSelector);
          if (container && container.style.display !== "none") {
            container.style = hideStyle;
          }
        }
      });
    }
  }
}

// Apply filter to a specific platform
function applyPlatformFilter(platform) {
  const textContent = new Set();
  document.querySelectorAll(platform.ELEMENTS).forEach(element => {
    element.textContent.toLowerCase().split(' ').forEach(word => textContent.add(word));
  });

  const fuse = createFuseInstance(textContent);

  filterContent(selectedFilter, textContent, fuse, platform.POST, platform.POST_CONTAINER);
  filterContent(selectedFilter, textContent, fuse, platform.COMMENT, platform.COMMENT_CONTAINER);
  filterContent(selectedFilter, textContent, fuse, platform.TRENDING_TEXT, platform.TRENDING);
}

// Remove labeled content based on the platform
async function removeLabelled() {
  if (window.location.hostname === 'twitter.com') {
    applyPlatformFilter(SELECTORS.TWITTER);
  } else if (window.location.hostname === 'www.facebook.com') {
    applyPlatformFilter(SELECTORS.FACEBOOK);
  } else if (window.location.hostname === 'www.instagram.com') {
    applyPlatformFilter(SELECTORS.INSTAGRAM);
  } else if (window.location.hostname === 'www.reddit.com') {
    applyPlatformFilter(SELECTORS.REDDIT);
  } else {
    blurTextContent();
  }
}

// Blur text content for non-specific platforms
function blurTextContent() {
  const htmlTextContent = new Set();
  document.querySelectorAll(SELECTORS.GENERAL.TEXT_ELEMENTS).forEach(targetText => {
    targetText.textContent.toLowerCase().split(" ").forEach(word => htmlTextContent.add(word));
  });

  const fuse = createFuseInstance(htmlTextContent);
  filterContent(selectedFilter, htmlTextContent, fuse, SELECTORS.GENERAL.TEXT_ELEMENTS, blurStyle);
}

// Initialize the content script by loading filters and setting up event listeners
async function initializeContentScript() {
  await loadFilters();
  await loadStoredFilters();

  await saveFilters();

  chrome.storage.local.get('customFilters', data => {
    customFilter = data.customFilters || [];
  });

  const observer = new MutationObserver(() => removeLabelled());
  observer.observe(document.body, { childList: true, subtree: true });

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.appliedFilters && Array.isArray(request.appliedFilters)) {
      selectedFilter = [];

      if (request.appliedFilters.includes('controversial')) {
        selectedFilter.push(...controversialFilter);
      }

      if (request.appliedFilters.includes('profanity')) {
        selectedFilter.push(...profanityFilter);
      }

      if (request.appliedFilters.includes('sexual')) {
        selectedFilter.push(...sexualFilter);
      }

      if (request.appliedFilters.includes('custom')) {
        selectedFilter.push(...customFilter);
      }

      await chrome.storage.local.set({ selectedFilter });
      await removeLabelled();
    }

    if (request.type === 'addCustomFilter' && request.customWords && typeof request.customWords === 'string') {
      const words = request.customWords.split(',').map(word => word.trim());
      customFilter.push(...words);

      await chrome.storage.local.set({ customFilters: customFilter });

      if (appliedFilters.includes('custom')) {
        selectedFilter.push(...customFilter);
        await removeLabelled();
      }

      chrome.runtime.sendMessage({ type: 'updateCustomFilters', customFilters: customFilter });
    }

    if (request.type === 'removeCustomFilter' && Array.isArray(request.customFilters)) {
      customFilter = request.customFilters;

      await chrome.storage.local.set({ customFilters: customFilter });
    }
  });

  await removeLabelled();
}

// Run the initialization function
initializeContentScript();
