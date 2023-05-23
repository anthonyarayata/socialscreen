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
  // Get the stored filters from Chrome storage
  const { filters } = await chrome.storage.sync.get(['filters']);

  // Set the checkbox values based on the stored filters
  document.getElementById('customFilter').checked = filters?.custom || false;
  document.getElementById('profanityFilter').checked = filters?.profanity || false;
  document.getElementById('controversialFilter').checked = filters?.controversial || false;
  document.getElementById('customWords').value = filters?.customWords ? filters.customWords.join(',') : '';

  // Attach event listener for the "Apply Filters" button
  document.getElementById('applyFiltersButton').addEventListener('click', applyFilters);

  // Apply filters when the extension is initialized
  applyFilters();
}

// Initialize the extension on document load
document.addEventListener('DOMContentLoaded', initializeExtension);
