try {
    // Execute content script once the tab completes loading.
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      if (changeInfo.status == 'complete') {
        chrome.tabs.executeScript(tabId, {
          file: 'dist/bundle.js'
        }, function () {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
  }
  