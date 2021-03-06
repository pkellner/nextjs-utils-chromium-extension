// listens for message from button click from toolbar in background.js
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  const versionScript = document.createElement("script");
  if (message.action === "updateBadgeText") {
    versionScript.src = chrome.runtime.getURL("inject-script-badgetext.js");
    versionScript.onload = function autoUnload() {
      this.remove;
    };
  } else if (message.action === "showNextJsData") {
    versionScript.src = chrome.runtime.getURL("inject-script-showdata.js");
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

    if (event.data.type && event.data.type == "BADGE_TEXT") {
      chrome.runtime.sendMessage(
        {
          messageType: event.data.type,
          nextJsData: event.data.nextJsData,
          nextJsDataLength: event.data.nextJsData.length
        },
        function(response) {
          // for now, nothing to do here.  just sending message and return will
          //   come frm a sendMessage in inject-script.js
        }
      );
    }

    if (event.data.type && event.data.type == "SHOW_DATA") {
      chrome.runtime.sendMessage(
        {
          messageType: event.data.type,
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
