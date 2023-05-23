import Fuse from 'fuse.js';
import controversialData from '/src/filters/controversial.json';
import customData from '/src/filters/custom.json';
import profanityData from '/src/filters/profanity.json';

// Define the selectedFilter array
let selectedFilter = [];

// Initialize the filter arrays
let customFilter = [];
let controversialFilter = [];
let profanityFilter = [];

// Push filter values from customData to customFilter
if (customData && Array.isArray(customData.filter)) {
  customFilter.push(...customData.filter);
}

// Push filter values from controversialData to controversialFilter
if (controversialData && Array.isArray(controversialData.filter)) {
  controversialFilter.push(...controversialData.filter);
}

// Push filter values from profanityData to profanityFilter
if (profanityData && Array.isArray(profanityData.filter)) {
  profanityFilter.push(...profanityData.filter);
}

console.log('Custom Filter:', customFilter);
console.log('Controversial Filter:', controversialFilter);
console.log('Profanity Filter:', profanityFilter);

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
const cachedCustomFilter = localStorage.getItem('customFilter');
if (cachedCustomFilter) {
  customFilter = JSON.parse(cachedCustomFilter);
}

const cachedControversialFilter = localStorage.getItem('controversialFilter');
if (cachedControversialFilter) {
  controversialFilter = JSON.parse(cachedControversialFilter);
}

const cachedProfanityFilter = localStorage.getItem('profanityFilter');
if (cachedProfanityFilter) {
  profanityFilter = JSON.parse(cachedProfanityFilter);
}

console.log('Custom Filter:', customFilter);
console.log('Controversial Filter:', controversialFilter);
console.log('Profanity Filter:', profanityFilter);

// Save filters to local storage
localStorage.setItem('customFilter', JSON.stringify(customFilter));
localStorage.setItem('controversialFilter', JSON.stringify(controversialFilter));
localStorage.setItem('profanityFilter', JSON.stringify(profanityFilter));

console.log('Custom Filter:', customFilter);
console.log('Controversial Filter:', controversialFilter);
console.log('Profanity Filter:', profanityFilter);

// Create a MutationObserver to run removeLabelled whenever the DOM changes inside the target container
const observer = new MutationObserver(removeLabelled);
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, send) => {
  if (request.filters && Array.isArray(request.filters)) {
    selectedFilter = [...customFilter, ...controversialFilter, ...profanityFilter].filter(filter =>
      request.filters.includes(filter)
    );

    // Save selected filters to local storage
    localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));

    // Update the Fuse instance with the new selected filters
    fuse.setCollection(selectedFilter);
  }
});
