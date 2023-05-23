import { chrome } from 'webextension-polyfill';
import './src/contentscript.mjs';
import './src/popup.mjs';

// Apply filters when the "Apply Filters" button is clicked
function applyFilters() {
  // Get the selected filters from the checkboxes and text field
  const customFilter = document.getElementById('customFilter').checked;
  const profanityFilter = document.getElementById('profanityFilter').checked;
  const controversialFilter = document.getElementById('controversialFilter').checked;
  const customWords = document.getElementById('customWords').value.split(',');

  // Store the selected filters in an object
  const filters = {
    custom: customFilter,
    profanity: profanityFilter,
    controversial: controversialFilter,
    customWords: customWords
  };

  // Send a message to the background script to apply filters
  chrome.runtime.sendMessage({ action: "applyFilters", filters });
}

// Initialize the extension
async function initializeExtension() {
  // Attach event listener for the "Apply Filters" button
  document.getElementById('applyFiltersButton').addEventListener('click', applyFilters);

  // Apply filters when the extension is initialized
  applyFilters();
}

// Initialize the extension on document load
document.addEventListener('DOMContentLoaded', initializeExtension);
