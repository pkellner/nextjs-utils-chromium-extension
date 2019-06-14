console.log("content_scripts...content-script.js");

// listens for message from button click from toolbar in background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  const versionScript = document.createElement("script");
  console.log(`message:${JSON.stringify(message)}`);
  if (message.action === "updateBadgeText") {
    versionScript.src = chrome.runtime.getURL("inject-script.js");
    versionScript.onload = function autoUnload() {
      this.remove;
    };
  } else if (message.action === "showNextJsData") {
    versionScript.src = chrome.runtime.getURL("inject-script.js");
    versionScript.onload = function autoUnload() {
      this.remove;
    };
  }
  document.body.appendChild(versionScript);
});

// https://developer.chrome.com/extensions/content_scripts#host-page-communication
window.addEventListener(
  "message",
  function(event) {
    // We only accept messages from ourselves
    if (event.source != window) return;

    if (event.data.type && event.data.type == "FROM_PAGE") {
      chrome.runtime.sendMessage(
        {
          nextJsData: event.data.nextJsData,
          nextJsDataLength: event.data.nextJsData.length
        },
        function(response) {
          // for now, nothing to do here.  just sending message and return will
          //   come frm a sendMessage in inject-script.js
        }
      );
    }
  },
  false
);
