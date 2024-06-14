import { chrome } from 'webextension-polyfill';
import './src/contentscript.mjs';
import './src/popup.mjs';

<<<<<<< HEAD
// Apply filters when the "Apply Filters" button is clicked
function applyFilters() {
  // Get the selected filters from the checkboxes and text field 
  const controversialFilter = document.getElementById('controversialFilter').checked;
  const profanityFilter = document.getElementById('profanityFilter').checked;
  const sexualFilter = document.getElementById('sexualFilter').checked;
  const customFilter = document.getElementById('customFilter').checked;
  const customWords = document.getElementById('customWords').value.split(',');

  // Store the selected filters in an object
  const filters = {
    controversial: controversialFilter,
    profanity: profanityFilter,
    sexualFilter: sexualFilter,
    custom: customFilter,
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
=======
function getFilters() {
  return {
    controversial: document.getElementById('controversialFilter').checked,
    profanity: document.getElementById('profanityFilter').checked,
    sexual: document.getElementById('sexualFilter').checked,
    custom: document.getElementById('customFilter').checked,
    customWords: document.getElementById('customWords').value.split(',')
  };
}

function applyFilters() {
  const filters = getFilters();
  chrome.runtime.sendMessage({ action: "applyFilters", filters });
}

function attachEventListeners() {
  const applyFiltersButton = document.getElementById('applyFiltersButton');
  if (applyFiltersButton) {
    applyFiltersButton.addEventListener('click', applyFilters);
  } else {
    console.error('Apply Filters button not found');
  }
}

async function initializeExtension() {
  attachEventListeners();
  applyFilters();
}

>>>>>>> 505a582 (Refactored js files)
document.addEventListener('DOMContentLoaded', initializeExtension);
