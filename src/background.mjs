// src/background.mjs

// Handle web navigation completed events
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0 && details.url.includes('https://twitter.com/')) {
    // Send a message to the content script indicating tab update
    chrome.tabs.sendMessage(details.tabId, {
      action: "tabUpdated",
      tabId: details.tabId,
      url: details.url
    });
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "applyFilters") {
    const { filters } = message;
    // Store the selected filters in Chrome storage
    await chrome.storage.sync.set({ filters });

    // Refresh the active tabs if they match the specified domains
    const tabs = await chrome.tabs.query({});
    tabs.forEach((tab) => {
      if (tab.url.includes('facebook.com') || tab.url.includes('twitter.com') || tab.url.includes('instagram.com')) {
        chrome.tabs.sendMessage(tab.id, { filters });
        chrome.tabs.reload(tab.id);
      }
    });
  }
});
