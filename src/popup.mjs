document.addEventListener("DOMContentLoaded", function() {
  // Get the necessary DOM elements
  const customCheckbox = document.getElementById("customFilter");
  const profanityCheckbox = document.getElementById("profanityFilter");
  const controversialCheckbox = document.getElementById("controversialFilter");
  const customWordsInput = document.getElementById("customWords");
  const addCustomWordButton = document.getElementById("addCustomWordButton");
  const applyFiltersButton = document.getElementById("applyFiltersButton");
  const showCustomFilterButton = document.getElementById("showCustomFilterButton"); // Added button
  const customFilterContainer = document.getElementById("customFilterContainer"); // Container for displaying custom filter

  // Initialize the applied filters array and added word array
  let appliedFilters = [];
  let addedWords = [];
  let popupCustomFilter = [];

  // Load custom filters from storage
  chrome.storage.local.get("customFilters", function(result) {
    if (result.customFilters && Array.isArray(result.customFilters)) {
      popupCustomFilter = result.customFilters;
    }
  });

  // Load applied filters from storage
  chrome.storage.local.get("appliedFilters", function(result) {
    if (result.appliedFilters && Array.isArray(result.appliedFilters)) {
      appliedFilters = result.appliedFilters;
      updateCheckboxes();
    }
  });

  // Load added words from storage
  chrome.storage.local.get("addedWords", function(result) {
    if (result.addedWords && Array.isArray(result.addedWords)) {
      addedWords = result.addedWords;
    }
  });

  // Event listener for the "Add" button
  addCustomWordButton.addEventListener("click", function() {
    const customWords = customWordsInput.value.trim();

    if (customWords !== "") {
      // Push custom words to the added words array
      addedWords.push(...customWords.split(","));

      // Save added words to storage
      chrome.storage.local.set({ addedWords: addedWords }, function() {
        console.log("Added words:", addedWords);
      });

      // Send a message to the content script to update custom filters
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "addCustomFilter", customWords: customWords });
      });
      customWordsInput.value = "";
      delayedRefresh();
    }
  });

  // Event listener for the "Apply Filters" button
  applyFiltersButton.addEventListener("click", function() {
    // Initialize the applied filters array
    appliedFilters = [];

    // Empty selectedFilter array in chrome storage
    chrome.storage.local.set({ selectedFilter: [] });

    if (customCheckbox.checked) {
      // Add custom filters to the applied filters arrays
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
      delayedRefresh();
    });
  });

  // Event listener for the "Show Custom Filter" button
  showCustomFilterButton.addEventListener("click", function() {
    if (customFilterContainer.style.display === "none") {
      // Display the added words as the custom filter
      displayCustomFilter(popupCustomFilter);
      customFilterContainer.style.display = "block"; // Show the custom filter container
    } else {
      customFilterContainer.style.display = "none"; // Hide the custom filter container
    }
  });

  // Update the checkboxes based on the applied filters
  function updateCheckboxes() {
    customCheckbox.checked = appliedFilters.includes("custom");
    profanityCheckbox.checked = appliedFilters.includes("profanity");
    controversialCheckbox.checked = appliedFilters.includes("controversial");
  }

// Display the custom filter in the popup
function displayCustomFilter(popupCustomFilter) {
  let html = "<h2>Custom Filter List</h2>";
  if (popupCustomFilter.length > 0) {
    html += "<ul>";
    popupCustomFilter.forEach(function(word) {
      html += "<li>" + word + " <button class='removeWordButton' data-word='" + word + "'>x</button></li>";
    });
    html += "</ul>";
  } else {
    html += "<p>No custom filter selected.</p>";
  }
  customFilterContainer.innerHTML = html;
  customFilterContainer.style.display = "block"; // Show the custom filter container

  // Function to remove a word from the custom filter
  function removeCustomFilterWord(word) {
    const index = popupCustomFilter.indexOf(word);
    if (index !== -1) {
      popupCustomFilter.splice(index, 1);
      // Save updated custom filter to storage
      chrome.storage.local.set({ customFilters: popupCustomFilter }, function() {
        console.log("Custom filter updated:", popupCustomFilter);
      });
      if(customCheckbox.checked) {
         chrome.storage.local.set({ selectedFilter: popupCustomFilter });
      }
      // Refresh the displayed custom filter
      displayCustomFilter(popupCustomFilter);
    }
  }
  // Add event listeners to the remove word buttons
  const removeWordButtons = document.getElementsByClassName("removeWordButton");
  for (let i = 0; i < removeWordButtons.length; i++) {
    removeWordButtons[i].addEventListener("click", function(event) {
      const word = event.target.dataset.word;
      removeCustomFilterWord(word);
    });
  }
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

  function delayedRefresh() {
    setTimeout(refreshPage, 1000);
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
