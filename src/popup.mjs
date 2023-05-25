document.addEventListener("DOMContentLoaded", function() {
  // Get the necessary DOM elements
  const customCheckbox = document.getElementById("customFilter");
  const profanityCheckbox = document.getElementById("profanityFilter");
  const controversialCheckbox = document.getElementById("controversialFilter");
  const customWordsInput = document.getElementById("customWords");
  const addCustomWordButton = document.getElementById("addCustomWordButton");
  const applyFiltersButton = document.getElementById("applyFiltersButton");

  // Initialize the applied filters array
  let appliedFilters = [];

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
      appliedFilters.push(...customWords.split(","));

      // Save applied filters to storage
      chrome.storage.local.set({ appliedFilters: appliedFilters }, function() {
        console.log("Applied filters updated:", appliedFilters);
      });

      // Refresh the page to apply the changes
      refreshPage();
      customWordsInput.value = "";
    }
  });

  // Event listener for the "Apply Filters" button
  applyFiltersButton.addEventListener("click", function() {
    // Send message to the content script with the applied filters
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (
          tab.url.includes("facebook.com") ||
          tab.url.includes("twitter.com") ||
          tab.url.includes("instagram.com")
        ) {
          chrome.tabs.sendMessage(tab.id, { appliedFilters: appliedFilters });
          refreshPage();
        }
      });
    });
  });

  // Update the checkboxes based on the applied filters
  function updateCheckboxes() {
    customCheckbox.checked = appliedFilters.includes("custom");
    profanityCheckbox.checked = appliedFilters.includes("profanity");
    controversialCheckbox.checked = appliedFilters.includes("controversial");
  }

  // Event listener for the checkboxes
  customCheckbox.addEventListener("change", function() {
    if (customCheckbox.checked) {
      appliedFilters.push("custom");
    } else {
      const index = appliedFilters.indexOf("custom");
      if (index !== -1) {
        appliedFilters.splice(index, 1);
      }
    }
    updateCheckboxes();
  });

  profanityCheckbox.addEventListener("change", function() {
    if (profanityCheckbox.checked) {
      appliedFilters.push("profanity");
    } else {
      const index = appliedFilters.indexOf("profanity");
      if (index !== -1) {
        appliedFilters.splice(index, 1);
      }
    }
    updateCheckboxes();
  });

  controversialCheckbox.addEventListener("change", function() {
    if (controversialCheckbox.checked) {
      appliedFilters.push("controversial");
    } else {
      const index = appliedFilters.indexOf("controversial");
      if (index !== -1) {
        appliedFilters.splice(index, 1);
      }
    }
    updateCheckboxes();
  });

  // Function to refresh the page
  function refreshPage() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.tabs.reload(tab.id);
      });
    });
  }
});
