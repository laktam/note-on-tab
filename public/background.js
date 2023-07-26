chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === "add-note") {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "add-note" });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getNoteKey") {
    // Get the current domain using chrome.tabs.query
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        const site = new URL(tabs[0].url).hostname;
        const title = tabs[0].title;
        let noteKey = title + " " + "[" + site + "]";
        noteKey = noteKey.replace(/ /g, "");

        console.log(noteKey);
        // Send the current domain back to the popup
        sendResponse({ noteKey });
      }
    });
    // Return true to indicate that we want to send a response asynchronously
    return true;
  }
});
