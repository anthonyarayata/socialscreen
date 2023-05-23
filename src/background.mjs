import { chrome } from 'webextension-polyfill';

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "tabUpdated" && message.url.includes('https://twitter.com/')) {
    // Execute your logic or call a function here
    console.log('Tab updated:', message.tabId, message.url);
    // You can send a response back to the content script if needed
    // sendResponse({ response: "Message received" });
  }
});

// Event listener for runtime messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'applyFilters') {
    // Perform logic for applying filters here
    console.log('Received applyFilters message:', message.filters);
    // You can send a response back to the sender if needed
    // sendResponse({ response: "Filters applied" });
  }
});

// Listen for web navigation completed events
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && details.url.includes('https://twitter.com/')) {
    // Send a message to the content script indicating tab update
    chrome.tabs.sendMessage(details.tabId, {
      action: "tabUpdated",
      tabId: details.tabId,
      url: details.url
    });
  }
}, { url: [{ hostEquals: 'twitter.com' }] }); // Specify the URL filter for onCompleted event
