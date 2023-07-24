chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
  if (command === "add-note") {
    // Send a message to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "add-note" });
    });
  }
});
