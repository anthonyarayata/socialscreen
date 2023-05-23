import './src/contentscript.mjs';
import './src/background.mjs';
import './src/popup.mjs';

// Handle the "Apply Filters" button click in the popup.html
document.getElementById('applyFiltersButton').addEventListener('click', applyFilters);

// Apply filters when the "Apply Filters" button is clicked
function applyFilters() {
  // Get the selected filters from the checkboxes and text field
  const customFilter = document.getElementById('customFilter').checked;
  const profanityFilter = document.getElementById('profanityFilter').checked;
  const controversialFilter = document.getElementById('controversialFilter').checked;
  const customWords = document.getElementById('customWords').value.split(',');

  // Store the selected filters in Chrome storage
  const filters = {
    custom: customFilter,
    profanity: profanityFilter,
    controversial: controversialFilter,
    customWords: customWords
  };
  chrome.storage.sync.set({ filters }, () => {
    // Refresh the active tabs if they match the specified domains
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.url.includes('facebook.com') || tab.url.includes('twitter.com') || tab.url.includes('instagram.com')) {
          chrome.tabs.sendMessage(tab.id, { filters });
          chrome.tabs.reload(tab.id);
        }
      });
    });
  });
}

// Initialize the extension
function initializeExtension() {
  // Get the stored filters from Chrome storage
  chrome.storage.sync.get(['filters'], (result) => {
    const filters = result.filters || {};
    const { custom, profanity, controversial, customWords } = filters;

    // Set the checkbox values based on the stored filters
    document.getElementById('customFilter').checked = custom || false;
    document.getElementById('profanityFilter').checked = profanity || false;
    document.getElementById('controversialFilter').checked = controversial || false;
    document.getElementById('customWords').value = customWords ? customWords.join(',') : '';

    // Apply filters when the extension is initialized
    applyFilters();
  });
}

// Initialize the extension on document load
document.addEventListener('DOMContentLoaded', initializeExtension);
