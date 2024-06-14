// Listen for messages from content scripts
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
<<<<<<< HEAD
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
=======
  if (message.action === "tabUpdated" && ['twitter.com', 'www.facebook.com', 'www.reddit.com', 'www.instagram.com'].some(url => message.url.includes(url))) {
    console.log('Tab updated:', message.tabId, message.url);
    // sendResponse({ response: "Message received" }); // Uncomment if you need to send a response
  }

  if (message.action === 'applyFilters') {
    console.log('Received applyFilters message:', message.filters);
    // sendResponse({ response: "Filters applied" }); // Uncomment if you need to send a response
>>>>>>> 505a582 (Refactored js files)
  }
});

// Listen for web navigation completed events
<<<<<<< HEAD
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && (details.url.includes('https://twitter.com/') || details.url.includes('https://www.facebook.com/') || details.url.includes('https://www.reddit.com/') || details.url.includes('https://www.instagram.com/'))) {
    // Send a message to the content script indicating tab update
=======
chrome.webNavigation.onCompleted.addListener(details => {
  if (details.frameId === 0 && ['twitter.com', 'www.facebook.com', 'www.reddit.com', 'www.instagram.com'].some(url => details.url.includes(url))) {
>>>>>>> 505a582 (Refactored js files)
    chrome.tabs.sendMessage(details.tabId, {
      action: "tabUpdated",
      tabId: details.tabId,
      url: details.url
    });
  }
<<<<<<< HEAD
}, { url: [{ hostEquals: 'twitter.com' }, { hostEquals: 'www.facebook.com' }, { hostEquals: 'www.reddit.com' }, { hostEquals: 'www.instagram.com' }] }); // Specify the URL filter for onCompleted event
=======
}, { url: [{ hostEquals: 'twitter.com' }, { hostEquals: 'www.facebook.com' }, { hostEquals: 'www.reddit.com' }, { hostEquals: 'www.instagram.com' }] });
>>>>>>> 505a582 (Refactored js files)
