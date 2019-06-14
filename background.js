chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "processNextJs1" }, function(
      response
    ) {
      // for now, nothing to do here.  just sending message and return will
      //   come frm a sendMessage in inject-script.js
    });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  const friendlySizeBytesFullString = (bytes, si) => {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    var units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + " " + units[u];
  };

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

  const badgeText =
    request && request.nextJsDataLength && request.nextJsDataLength > 10
      ? friendlySizeBytesFour(request.nextJsDataLength)
      : "n/a";

  chrome.browserAction.setBadgeText({
    text: badgeText,
    tabId: sender.tab.id
  });

  // const titleText =
  //   request && request.nextJsDataLength && request.nextJsDataLength > 10
  //     ? friendlySizeBytesFullString(request.nextJsDataLength)
  //     : "__NEXT_DATA__ Not Found so not NextJS site likely";
  //
  // chrome.browserAction.setTitle({
  //   title: titleText,
  //   tabId: sender.tab.id
  // });
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
