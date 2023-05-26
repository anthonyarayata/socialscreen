import Fuse from 'fuse.js';
import controversialData from '/src/filters/controversial.json';
import profanityData from '/src/filters/profanity.json';

// Define the selectedFilter array
let selectedFilter = [];

// Initialize the filter arrays
let controversialFilter = [];
let customFilter = [];
let profanityFilter = [];

// Push filter values from controversialData to controversialFilter
if (controversialData && Array.isArray(controversialData.filter)) {
  controversialFilter.push(...controversialData.filter);
}

// Push filter values from profanityData to profanityFilter
if (profanityData && Array.isArray(profanityData.filter)) {
  profanityFilter.push(...profanityData.filter);
}

// Load selected filters from local storage
const cachedSelectedFilter = localStorage.getItem('selectedFilter');
if (cachedSelectedFilter) {
  selectedFilter = JSON.parse(cachedSelectedFilter);
}

console.log('Selected Filter:', selectedFilter);

// Create a Fuse instance for the selected filters
const fuse = new Fuse(selectedFilter, {
  shouldSort: true,
  includeScore: true,
  threshold: 0.4,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['filter']
});

const removeLabelled = () => {
  document.querySelectorAll('main span').forEach(span => {
    const spanText = span.textContent.toLowerCase();

    const searchResults = fuse.search(spanText);
    if (searchResults.length > 0 && searchResults[0].score > 0.6) {
      const post = span.closest('article');
      if (post) {
        const divAbove = post.previousElementSibling;
        if (divAbove && divAbove.tagName === 'DIV') {
          if (!divAbove.style.display || divAbove.style.display !== 'none') {
            divAbove.style.display = 'none';
          }
        }
      }
    }
  });
};

// Check if the filters are already in local storage
const cachedControversialFilter = localStorage.getItem('controversialFilter');
if (cachedControversialFilter) {
  controversialFilter = JSON.parse(cachedControversialFilter);
}

const cachedProfanityFilter = localStorage.getItem('profanityFilter');
if (cachedProfanityFilter) {
  profanityFilter = JSON.parse(cachedProfanityFilter);
}

console.log('Controversial Filter (from local storage):', controversialFilter);
console.log('Profanity Filter (from local storage):', profanityFilter);

// Save filters to local storage
localStorage.setItem('controversialFilter', JSON.stringify(controversialFilter));
localStorage.setItem('profanityFilter', JSON.stringify(profanityFilter));

console.log('Controversial Filter (saved to local storage):', controversialFilter);
console.log('Profanity Filter (saved to local storage):', profanityFilter);

// Load custom filters from local storage
const cachedCustomFilters = localStorage.getItem('customFilters');
if (cachedCustomFilters) {
  customFilter = JSON.parse(cachedCustomFilters);
}

console.log('Custom Filter (from local storage):', customFilter);

// Create a MutationObserver to run removeLabelled whenever the DOM changes inside the target container
const observer = new MutationObserver(removeLabelled);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Send a message to the background script to retrieve custom filters
chrome.runtime.sendMessage({ type: 'getCustomFilters' }, response => {
  if (response.customFilters && Array.isArray(response.customFilters)) {
    // Update the customFilter array
    customFilter = [...response.customFilters];

    // Save custom filters to local storage
    localStorage.setItem('customFilters', JSON.stringify(customFilter));
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.appliedFilters && Array.isArray(request.appliedFilters)) {
    selectedFilter = [];

    if (request.appliedFilters.includes('custom')) {
      // Add custom filters to the selectedFilter array
      selectedFilter.push(...customFilter);
    }

    if (request.appliedFilters.includes('profanity')) {
      // Add profanity filters to the selectedFilter array
      selectedFilter.push(...profanityFilter);
    }

    if (request.appliedFilters.includes('controversial')) {
      // Add controversial filters to the selectedFilter array
      selectedFilter.push(...controversialFilter);
    }

    // Save selected filters to local storage
    localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));

    // Update the Fuse instance with the new selected filters
    fuse.setCollection(selectedFilter);
  }

  if (request.type === 'addCustomFilter' && request.customWords && typeof request.customWords === 'string') {
    // Add custom words to the customFilter array
    const words = request.customWords.split(',').map(word => word.trim());
    customFilter.push(...words);

    // Save custom filters to local storage
    localStorage.setItem('customFilters', JSON.stringify(customFilter));

    // Send a message to the background script to update custom filters
    chrome.runtime.sendMessage({ type: 'updateCustomFilters', customFilters: customFilter });
  }
});
