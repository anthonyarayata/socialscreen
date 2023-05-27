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

// Load selected filters from Chrome storage
chrome.storage.local.get('selectedFilter', data => {
  selectedFilter = data.selectedFilter || [];
  console.log('Selected Filter:', selectedFilter);
});

function removeLabelled() {
  const options = {
    includeScore: true,
    threshold: 0.1
  };

  function twitterFilter() {
    const spanContent = [];

    for (const span of document.querySelectorAll('main span')) {
      const text = span.textContent.toLowerCase().split(' ');
      spanContent.push(...text);
    }

    const fuse = new Fuse(spanContent, options);

    for (const filter of selectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemove of document.querySelectorAll('main span')) {
          if (toRemove.textContent.toLowerCase().includes(result.item)) {
            const post = toRemove.closest('article');
            if (post && post.style.display !== 'none') {
              const thirdParentDiv = post.parentElement?.parentElement?.parentElement;
              if (thirdParentDiv) {
                thirdParentDiv.setAttribute('style', 'display: none !important');
                console.log(`Removed post: ${toRemove.textContent}\n${result.item} (${result.score})`);
              }
            }
          }
        }
      }
    }
  }

  function facebookFilter() {
    const divContent = [];

    for (const div of document.querySelectorAll('span div')) {
      const text = div.textContent.toLowerCase().split(' ');
      const computedStyle = window.getComputedStyle(div);
      const textAlign = computedStyle.getPropertyValue('text-align');

      if (textAlign === 'start') {
        const uniqueText = text.filter((item) => !divContent.includes(item));
        divContent.push(...uniqueText);
      }
    }

    console.log(divContent);

    const fuse = new Fuse(divContent, options);

    for (const filter of selectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemove of document.querySelectorAll('span div')) {
          if (toRemove.textContent.toLowerCase().includes(result.item)) {
            const textContainer = toRemove.closest('span');
            if (textContainer && textContainer.style.display !== 'none') {
              const post = textContainer.parentNode; // need a way to find the parent of the parent of the parent
              if (post) {
                post.setAttribute('style', 'display: none !important');
                console.log(`Removed post: ${toRemove.textContent}\n${result.item} (${result.score})`);
              }
            }
          }
        }
      }
    }
  }

  if (window.location.hostname === 'twitter.com') {
    twitterFilter();
  } else if (window.location.hostname === 'www.facebook.com') {
    facebookFilter();
  }
}

removeLabelled();

// Check if the filters are already in Chrome storage
chrome.storage.local.get(['controversialFilter', 'profanityFilter'], data => {
  controversialFilter = data.controversialFilter || [];
  profanityFilter = data.profanityFilter || [];
  console.log('Controversial Filter (from Chrome storage):', controversialFilter);
  console.log('Profanity Filter (from Chrome storage):', profanityFilter);
});

// Save filters to Chrome storage
chrome.storage.local.set({
  controversialFilter: controversialFilter,
  profanityFilter: profanityFilter
}, () => {
  console.log('Controversial Filter (saved to Chrome storage):', controversialFilter);
  console.log('Profanity Filter (saved to Chrome storage):', profanityFilter);
});

// Load custom filters from Chrome storage
chrome.storage.local.get('customFilters', data => {
  customFilter = data.customFilters || [];
  console.log('Custom Filter (from Chrome storage):', customFilter);
});

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

    // Save custom filters to Chrome storage
    chrome.storage.local.set({ customFilters: customFilter });

    console.log('Custom Filter (updated from background script):', customFilter);
  }
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.appliedFilters && Array.isArray(request.appliedFilters)) {
    chrome.storage.local.set({ selectedFilter: []})
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

    // Save selected filters to Chrome storage
    chrome.storage.local.set({ selectedFilter: selectedFilter });

    console.log('Selected Filter (updated from popup):', selectedFilter);

    // Run removeLabelled to apply the updated filters immediately
    removeLabelled();
  }
  // Update the selectedFilter array if the 'custom' filter is applied
  if (request.type === 'addCustomFilter' && request.customWords && typeof request.customWords === 'string') {
    // Add custom words to the customFilter array
    const words = request.customWords.split(',').map(word => word.trim());
    customFilter.push(...words);

    // Check if appliedFilters contains 'custom' 
    chrome.storage.local.get("appliedFilters", function(result){
      if(result.appliedFilters.includes('custom')){
        // Add custom filters to the selectedFilter array
        selectedFilter.push(...words);
        chrome.storage.local.set({ selectedFilter: selectedFilter });
      }
    });

    // Save custom filters to Chrome storage
    chrome.storage.local.set({ customFilters: customFilter });

    console.log('Custom Filter (updated with new words):', customFilter);

    // Send a message to the background script to update custom filters
    chrome.runtime.sendMessage({ type: 'updateCustomFilters', customFilters: customFilter });

    // Send a message to the content script with the updated selected filters
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "applyFilters", appliedFilters: selectedFilter });
    });
  }
  // Update the selectedFilter array when removeCustomWordFilter is called
  
});