document.addEventListener("DOMContentLoaded", function() {
  // Get the necessary DOM elements
  const customCheckbox = document.getElementById("customFilter");
  const profanityCheckbox = document.getElementById("profanityFilter");
  const controversialCheckbox = document.getElementById("controversialFilter");
  const customWordsInput = document.getElementById("customWords");
  const addCustomWordButton = document.getElementById("addCustomWordButton");
  const applyFiltersButton = document.getElementById("applyFiltersButton");

  // Initialize the selected filters array
  let selectedFilters = [];

  // Event listener for the "Add" button
  addCustomWordButton.addEventListener("click", function() {
    const customWords = customWordsInput.value.trim();

    if (customWords !== "") {
      selectedFilters.push(...customWords.split(","));
      customWordsInput.value = "";
    }
  });

  // Event listener for the "Apply Filters" button
  applyFiltersButton.addEventListener("click", function() {
    // Clear the selected filters array
    selectedFilters = [];

    // Add selected filters to the array
    if (customCheckbox.checked) {
      selectedFilters.push("custom");
    }
    if (profanityCheckbox.checked) {
      selectedFilters.push("profanity");
    }
    if (controversialCheckbox.checked) {
      selectedFilters.push("controversial");
    }

    // Send message to the content script with the selected filters
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (
          tab.url.includes("facebook.com") ||
          tab.url.includes("twitter.com") ||
          tab.url.includes("instagram.com")
        ) {
          chrome.tabs.sendMessage(tab.id, { filters: selectedFilters });
          chrome.tabs.reload(tab.id);
        }
      });
    });
  });
});
