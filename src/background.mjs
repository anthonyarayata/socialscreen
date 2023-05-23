try {
  // Execute content script once the tab completes loading.
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        files: ['dist/bundle.js'],
        target: { tabId: tabId }
      }, function() {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        }
      });
    }
  });
} catch (e) {
  console.log(e);
}
