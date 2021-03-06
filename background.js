addChangeContextMenuItems();

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "updateBadgeText" }, function(
      response
    ) {
      // for now, nothing to do here.  just sending message and return will
      //   come frm a sendMessage in inject-script.js
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  const friendlySizeBytesFour = bytes => {
    if (!bytes) {
      return "---";
    }
    if (bytes == 0) {
      return "0.0 B";
    } else if (bytes < 1000) {
      // returns 7b
      return `${bytes}b`;
    } else if (bytes < 1000000) {
      // returns 70K
      return `${(bytes / 1000).toFixed(0)}K`;
    } else if (bytes < 10000000) {
      // returns 2.7M
      return `${(bytes / 1000000).toFixed(1)}M`;
    } else if (bytes < 1000000000) {
      // returns 27M
      return `${(bytes / 1000000).toFixed(0)}M`;
    } else {
      // returns >1G
      return ">1G";
    }
  };

  const setBadgeTextFunction = () => {
    const badgeText =
      request && request.nextJsDataLength && request.nextJsDataLength > 10
        ? friendlySizeBytesFour(request.nextJsDataLength)
        : "n/a";

    nextDataFullValue =
      request && request.nextJsDataLength && request.nextJsDataLength > 10
        ? request.nextJsData
        : "{}";

    chrome.browserAction.setBadgeText({
      text: badgeText,
      tabId: sender.tab.id
    });
  };

  if (request.messageType === "BADGE_TEXT") {
    setBadgeTextFunction();
  }

  if (request.messageType === "SHOW_DATA") {
    // always set badge Text first
    setBadgeTextFunction();
    window.localStorage.setItem("nextdata", request.nextJsData);
    chrome.tabs.create(
      { url: chrome.extension.getURL("viewNextData.html") },
      function(tab) {
        chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendRequest(tab.id, { greeting: "hello" }, function(
            response
          ) {
            console.log(response.farewell);
          });
        });
      }
    );
  }
});

// bug fix for dec tools problem below
// https://stackoverflow.com/questions/28786723/why-doesnt-chrome-tabs-query-return-the-tabs-url-when-called-using-requirejs
let activeTabId;

chrome.tabs.onActivated.addListener(function(activeInfo) {
  activeTabId = activeInfo.tabId;
});

function getActiveTab(callback) {
  chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    var tab = tabs[0];

    if (tab) {
      callback(tab);
    } else {
      chrome.tabs.get(activeTabId, function(tab) {
        if (tab) {
          callback(tab);
        } else {
          console.log("No active tab identified.");
        }
      });
    }
  });
}

function addChangeContextMenuItems() {
  // remove past menu items first
  if (chrome.contextMenus && chrome.contextMenus.removeAll) {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        title: "View NextJS __NEXT_DATA__",
        contexts: ["browser_action"],
        onclick: function() {
          chrome.tabs.query({ active: true, currentWindow: true,  }, function(
            tabs
          ) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { action: "showNextJsData" },
              function(response) {
                // for now, nothing to do here.  just sending message and return will
                //   come frm a sendMessage in inject-script.js
              }
            );
          });
        }
      });
    });
  }
}
