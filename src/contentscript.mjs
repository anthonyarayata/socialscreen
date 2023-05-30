import Fuse from 'fuse.js';
import controversialData from '/src/filters/controversial.json';
import profanityData from '/src/filters/profanity.json';

// Define the selectedFilter array
let selectedFilter = [];
let splitselectedFilter = [];

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


  // This function is designed specifically for Twitter
  function twitterFilter() {
    const spanContent = new Set();
    const spanSelector = "main span";
    const postSelector = "div[class*='css-1dbjc4n r-1igl3o0 r-qklmqi r-1adg3ll r-1ny4l3l']";
    const commentSelector = "div[class*='css-901oao r-1nao33i r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-bcqeeo r-bnwqim r-qvutc0'] span[class*='css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0']";
    const hidePost = "display: none !important;";
  
    // Collect unique text content from spans
    document.querySelectorAll(spanSelector).forEach(span => {
      const text = span.textContent.toLowerCase().split(' ');
      text.forEach(word => spanContent.add(word));
    });
  
    const fuse = new Fuse(Array.from(spanContent), options);
  
    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(' '));
  
    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        document.querySelectorAll(postSelector).forEach(post => {
          const postText = post.querySelector(spanSelector)?.textContent.toLowerCase();
          if (postText && postText.includes(result.item)) {
            const postContainer = post.closest(postSelector);
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hidePost;
              console.log(`Removed post: ${postText}\n${result.item} (${result.score})`);
            }
          }
        });
      }
    }
  
    // Remove comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        document.querySelectorAll(commentSelector).forEach(comment => {
          const commentText = comment.textContent.toLowerCase();
          if (commentText.includes(result.item)) {
            const commentContainer = comment.closest(commentSelector);
            if (commentContainer && commentContainer.style.display !== "none") {
              commentContainer.style = hidePost;
              console.log(`Removed comment: ${commentText}\n${result.item} (${result.score})`);
            }
          }
        });
      }
    }
  }
  
  
  function facebookFilter() {

    const fbTextContent = []; // Array to hold the text content of facebook which are usually in divs
    const targetTexts = document.querySelectorAll("div[class*='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']"); // This class specifically holds the text content of facebook posts (was targetDivs)
    const commentText = document.querySelectorAll("div[class='xdj266r x11i5rnm xat24cr x1mh8g0r x1vvkbs']");
    
    for (const div of targetTexts) {
      const text = div.textContent.toLowerCase().split(' ');
      const uniqueText = text.filter((item) => !fbTextContent.includes(item));
      fbTextContent.push(...uniqueText);
    }

    const fuse = new Fuse(fbTextContent, options);

    for (let i = 0; i < selectedFilter.length; i++) {
      const words = selectedFilter[i].split(" ");
      splitselectedFilter.push(...words);
    }

    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemove of targetTexts){
          if(toRemove.textContent.toLowerCase().includes(result.item)){
          const postContainer = toRemove.closest("div[class*='x9f619 x1n2onr6 x1ja2u2z x2bj2ny x1qpq9i9 xdney7k xu5ydu1 xt3gfkd xh8yej3 x6ikm8r x10wlt62 xquyuld']")
            if (postContainer && postContainer.style.display !== 'none') {
              postContainer.setAttribute('style', 'display: none !important');
              console.log(`Removed post: ${toRemove.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }

    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemoveComment of commentText){
          if(toRemoveComment.textContent.toLowerCase().includes(result.item)){
            const commentContainer = toRemoveComment.closest("div[class*='x1n2onr6']")
            if (commentContainer && commentContainer.style.display !== 'none') {
              commentContainer.setAttribute('style', 'display: none !important');
              console.log(`Removed comment: ${toRemoveComment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }

    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toRemoveComment of commentText) {
          const popupCommentContainer = toRemoveComment.closest("div[class='x1n2onr6 x4uap5 x18d9i69 x1swvt13 x1iorvi4 x78zum5 x1q0g3np x1a2a7pz'");
          if(popupCommentContainer && popupCommentContainer.style.display !== "none"){
            popupCommentContainer.setAttribute("style", "display: none !important;");
            console.log(`Removed pop-up comment: ${toRemoveComment.textContent}\n${result.item} (${result.score})`);
          }
        }
      }
    }
  }

  function instagramFilter() {
    const igTextContent = new Set();
    const targetElements = document.querySelectorAll("h1, span");
    const captionContainer = document.querySelectorAll("h1[class*='_aacl _aaco _aacu _aacx _aad7 _aade']");
    const commentContainer = document.querySelectorAll("span[class*='_aacl _aaco _aacu _aacx _aad7 _aade']");
    const popupCommentContainer = document.querySelectorAll("div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']");
    const hideStyle = "display: none !important;";
  
    // Collect unique text content from target elements
    for (const targetText of targetElements) {
      const text = targetText.textContent.toLowerCase().split(" ");
      text.forEach(word => igTextContent.add(word));
    }
  
    const fuse = new Fuse(Array.from(igTextContent), options);
  
    // Split the selectedFilter array into individual words (Fuse can only search single word strings)
    const splitselectedFilter = selectedFilter.flatMap(filter => filter.split(" "));
  
    // Remove posts
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const caption of captionContainer) {
          if (caption.textContent.toLowerCase().includes(result.item)) {
            const postContainer = caption.closest("article");
            if (postContainer && postContainer.style.display !== "none") {
              postContainer.style = hideStyle;
              console.log(`Removed post: ${caption.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const comment of commentContainer) {
          if (comment.textContent.toLowerCase().includes(result.item)) {
            const commentContainer = comment.closest("ul[class*='_a9ym']");
            if (commentContainer && commentContainer.style.display !== "none") {
              commentContainer.style = hideStyle;
              console.log(`Removed comment: ${comment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  
    // Remove popup comments
    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const popupComment of popupCommentContainer) {
          if (popupComment.textContent.toLowerCase().includes(result.item)) {
            const popupCommentContainer = popupComment.closest("div[class*='x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x12nagc x1n2onr6 x1plvlek xryxfnj x1c4vz4f x2lah0s x1q0g3np x6s0dn4 x1oa3qoh x1nhvcw1']");
            if (popupCommentContainer && popupCommentContainer.style.display !== "none") {
              popupCommentContainer.style = hideStyle;
              console.log(`Removed popup comment: ${popupComment.textContent}\n${result.item} (${result.score})`);
            }
          }
        }
      }
    }
  }
  
  function redditFilter(){
  }

  function blurTextContent(){
    const htmlTextContent = [];
    const targetElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    const blurStyle = "color: transparent; text-shadow: 0 0 8px #000;";

    for (const targetText of targetElements) {
      const text = targetText.textContent.toLowerCase().split(' ');
      const uniqueText = text.filter((item) => !htmlTextContent.includes(item));
      htmlTextContent.push(...uniqueText);
    }

    const fuse = new Fuse(htmlTextContent, options);

    for (let i = 0; i < selectedFilter.length; i++) {
      const words = selectedFilter[i].split(" ");
      splitselectedFilter.push(...words);
    }

    for (const filter of splitselectedFilter) {
      const results = fuse.search(filter);
      for (const result of results) {
        for (const toBlur of targetElements){
          if (toBlur.textContent.toLowerCase().includes(result.item)){
            if(toBlur && toBlur.style.color !== "transparent"){
              toBlur.setAttribute("style", blurStyle);
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
  } else if (window.location.hostname === 'www.instagram.com') {
    instagramFilter();
  } else if (window.location.hostname === 'www.reddit.com') {
    redditFilter();
  } else {
    blurTextContent();
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
      if(result.appliedFilters.includes("custom")){
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
  }
  // Run the script removedLabelled every 3 seconds
  setInterval(removeLabelled, 3000);
});