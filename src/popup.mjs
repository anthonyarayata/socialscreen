document.addEventListener("DOMContentLoaded", function() {
  // Get the necessary DOM elements
  const customCheckbox = document.getElementById("customFilter");
  const profanityCheckbox = document.getElementById("profanityFilter");
  const controversialCheckbox = document.getElementById("controversialFilter");
  const customWordsInput = document.getElementById("customWords");
  const addCustomWordButton = document.getElementById("addCustomWordButton");
  const applyFiltersButton = document.getElementById("applyFiltersButton");

  // Initialize the applied filters array and added word array
  let appliedFilters = [];
  let addedWord = [];

  // Load applied filters from storage
  chrome.storage.local.get("appliedFilters", function(result) {
    if (result.appliedFilters && Array.isArray(result.appliedFilters)) {
      appliedFilters = result.appliedFilters;
      updateCheckboxes();
    }
  });

  // Event listener for the "Add" button
  addCustomWordButton.addEventListener("click", function() {
    const customWords = customWordsInput.value.trim();

    if (customWords !== "") {
      // Push custom words to the applied filters array
      addedWord.push(...customWords.split(","));

      // Save custom words to storage
      chrome.storage.local.set({ addedWord: addedWord }, function() {
        console.log("Custom words added:", addedWord);
      });

      // Send a message to the content script to update custom filters
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "addCustomFilter", customWords: customWords });
      });

      // Refresh the page to apply the changes
      refreshPage();
      customWordsInput.value = "";
    }
  });

  // Event listener for the "Apply Filters" button
  applyFiltersButton.addEventListener("click", function() {
    // Initialize the applied filters array
    appliedFilters = [];

    if (customCheckbox.checked) {
      // Add custom filters to the applied filters array
      appliedFilters.push("custom");
    }
    if (profanityCheckbox.checked) {
      // Add profanity filters to the applied filters array
      appliedFilters.push("profanity");
    }
    if (controversialCheckbox.checked) {
      // Add controversial filters to the applied filters array
      appliedFilters.push("controversial");
    }

    // Save applied filters to storage
    chrome.storage.local.set({ appliedFilters: appliedFilters }, function () {
      console.log("Applied filters updated:", appliedFilters);
    });

    // Send message to the content script with the applied filters
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { type: "applyFilters", appliedFilters: appliedFilters });
      refreshPage();
    });
  });

  // Update the checkboxes based on the applied filters
  function updateCheckboxes() {
    customCheckbox.checked = appliedFilters.includes("custom");
    profanityCheckbox.checked = appliedFilters.includes("profanity");
    controversialCheckbox.checked = appliedFilters.includes("controversial");
  }

  // Function to refresh the page
  // Function to refresh Facebook, Twitter, and Instagram tabs
  function refreshPage() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (isSocialMediaTab(tab.url)) {
          chrome.tabs.reload(tab.id);
        }
      });
    });
  }

  // Function to check if a URL belongs to Facebook, Twitter, or Instagram
  function isSocialMediaTab(url) {
    return (
      url.includes("facebook.com") ||
      url.includes("twitter.com") ||
      url.includes("instagram.com")
    );
  }
});