
chrome.action.onClicked.addListener(() => {
  const settingsUrl = "https://mail.google.com/mail/u/0/#settings/accounts";

  chrome.tabs.create({ url: settingsUrl }, (tab) => {
    const tabId = tab.id;

    function handleUpdate(updatedTabId, changeInfo, tabInfo) {
      if (
        updatedTabId === tabId &&
        changeInfo.status === "complete" &&
        tabInfo.url.startsWith(settingsUrl)
      ) {
        console.log("✅ Gmail settings page loaded (via tabs.onUpdated). Injecting script...");
        chrome.scripting.executeScript({
          target: { tabId: updatedTabId },
          files: ["content.js"]
        });
        chrome.tabs.onUpdated.removeListener(handleUpdate);
      }
    }

    chrome.tabs.onUpdated.addListener(handleUpdate);
  });
});
