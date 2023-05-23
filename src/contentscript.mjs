import Fuse from 'fuse.js';

// Define the JSON file path
const FILTERS_FILE_PATH = "path/to/filters.json";

// Initialize selectedFilter as an empty array
let selectedFilter = [];

// Function to remove labelled elements from the page
const removeLabelled = () => {
  // Update Fuse instance with selectedFilter data
  const fuse = new Fuse(selectedFilter, {
    shouldSort: true,
    includeScore: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name'] // Update with the key(s) in your selectedFilter dataset to search against
  });

  // Loop through all <span> elements in the <main> section
  document.querySelectorAll('main span').forEach(span => {
    const spanText = span.textContent.toLowerCase();
    const results = fuse.search(spanText);

    if (results.length > 0 && results[0].score > 0.6) {
      // Hide the related article if a match is found
      const post = span.closest("article");
      if (post) {
        let divAbove = post;
        for (let i = 0; i < 3; i++) {
          if (divAbove && divAbove.tagName === "DIV") {
            if (!divAbove.getAttribute("style") || !divAbove.getAttribute("style").includes("display: none")) {
              divAbove.setAttribute("style", "display: none;");
            }
          }
          divAbove = divAbove && divAbove.previousElementSibling ? divAbove.previousElementSibling : null;
        }
      }
    } else {
      // Fallback to original function
      for (let i = 0; i < selectedFilter.length; i++) {
        if (span.textContent.toLowerCase().includes(selectedFilter[i].toLowerCase())) {
          const post = span.closest("article");
          if (post) {
            let divAbove = post;
            for (let i = 0; i < 3; i++) {
              if (divAbove && divAbove.tagName === "DIV") {
                if (!divAbove.getAttribute("style") || !divAbove.getAttribute("style").includes("display: none")) {
                  divAbove.setAttribute("style", "display: none;");
                }
              }
              divAbove = divAbove && divAbove.previousElementSibling ? divAbove.previousElementSibling : null;
            }
          }
        }
      }
    }
  });
};

// Check if the data is already in local storage
const cachedData = localStorage.getItem('selectedFilter');
if (cachedData) {
  selectedFilter = JSON.parse(cachedData);
  console.log(selectedFilter);
  removeLabelled();
} else {
  // Fetch the list of words from the background script
  chrome.runtime.sendMessage({ action: "fetchFilters" }, (response) => {
    if (response && response.data) {
      selectedFilter = response.data.map(word => word.toString());
      localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));
      removeLabelled();
    }
  });
}

// Create a MutationObserver to run removeLabelled whenever the DOM changes inside the target container
const observer = new MutationObserver(removeLabelled);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
