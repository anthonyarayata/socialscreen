// Listen for messages from content scripts
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.action === "tabUpdated" && (message.url.includes('https://twitter.com/') || message.url.includes('https://www.facebook.com/') || message.url.includes('https://www.reddit.com/') || message.url.includes('https://www.instagram.com/'))) {
    // Execute your logic or call a function here
    console.log('Tab updated:', message.tabId, message.url);
    // You can send a response back to the content script if needed
    // sendResponse({ response: "Message received" });
  }

  if (message.action === 'applyFilters') {
    // Perform logic for applying filters here
    console.log('Received applyFilters message:', message.filters);
    // You can send a response back to the sender if needed
    // sendResponse({ response: "Filters applied" });
  }

  if (message.type === "addCustomFilter") {
    const customWords = message.customWords.trim();

    if (customWords !== "") {
      let customFilter = [];
      chrome.storage.local.get("customFilter", function(result) {
        if (result.customFilter && Array.isArray(result.customFilter)) {
          customFilter = result.customFilter;
        }
        customFilter.push(...customWords.split(","));
        chrome.storage.local.set({ customFilter: customFilter });
      });
    }
  }
});

// Listen for web navigation completed events
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && (details.url.includes('https://twitter.com/') || details.url.includes('https://www.facebook.com/') || details.url.includes('https://www.reddit.com/') || details.url.includes('https://www.instagram.com/'))) {
    // Send a message to the content script indicating tab update
    chrome.tabs.sendMessage(details.tabId, {
      action: "tabUpdated",
      tabId: details.tabId,
      url: details.url
    });
  }
}, { url: [{ hostEquals: 'twitter.com' }, { hostEquals: 'www.facebook.com' }, { hostEquals: 'www.reddit.com' }, { hostEquals: 'www.instagram.com' }] }); // Specify the URL filter for onCompleted event
