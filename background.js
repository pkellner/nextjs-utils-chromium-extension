// for debugging purposes, this set the local storage when the
//  extension loads up. this will come from options later.
// if (window.localStorage.getItem("pict") === null) {
//   console.log("setting pict");
//   console.log("setting pict");
//   window.localStorage.setItem("pict", "http://localhost:8000/3.jpg");
// }

// function getNextDataFromLocalStorage() {
//   var podData;
//   var localStorageKey = 'NextJSData'; // constants.NASAPOD_KEY;
//   var data = window.localStorage.getItem(localStorageKey);
//   return data;
// }

const friendlySizeBytes = bytes => {
  if (!bytes) {
    return '---';
  }

  if (bytes == 0) {
    return "0.0 B";
  } else if (bytes < 1000) {
    return `${bytes}b`;
  } else if (bytes < 1000000) {
    return `${(bytes / 1000).toFixed(0)}K`;
  } else if (bytes < 10000000) {
    return `${(bytes / 1000000).toFixed(1)}M`;
  } else if (bytes < 1000000000) {
    return `${(bytes / 1000000).toFixed(0)}M`;
  } else {
    return ">1G";
  }
  // var e = Math.floor(Math.log(bytes) / Math.log(1024));
  // const result =
  //   (bytes / Math.pow(1024, e)).toFixed(1) + " " + " KMGTP".charAt(e) + "B";
  // return result;
};

chrome.runtime.onMessage.addListener(function(message, sender) {
  if (message.nextJs === true) {
    //chrome.browserAction.setBadgeText({ text: 'Y' });

    // enabling and disabling does not seem to change anything.  hmm
    chrome.browserAction.enable(sender.tab.id);

    // const nextJsData = message.nextJsData;
    // const nextJsDataSize = message.nextJsData.length;

    chrome.browserAction.setIcon({
      path: "icons/icon-N-32x32.png"
    });
  }

  // if (nextJsDataSize > 30000) {
  //   chrome.browserAction.setIcon({
  //     path: "icons/icon-N-32x32PROBLEM.png"
  //   });
  // } else {
  //   chrome.browserAction.setIcon({
  //     path: "icons/icon-N-32x32OK.png"
  //   });
  // }
  // //window.localStorage.setItem("NextJSData", JSON.stringify(nextJsData));
  // chrome.storage.sync.set({ 'key': "thevalue" }, function(a, b, c) {
  //   debugger;
  // });
  // } else {
  //   chrome.browserAction.disable(sender.tab.id);
  //   //chrome.browserAction.setBadgeText({ text: 'N' });
  // }
});

chrome.browserAction.onClicked.addListener(() => {
  // //chrome.browserAction.setTitle({'title': 'test titlexxx'});
  // chrome.storage.local.get("NextJSDataLength",function(x,y,z) {
  //   debugger;
  //   //salert("len " + len);
  // });
  // chrome.storage.local.get(["key"], function(result) {
  //   debugger;
  //   const z = result.key;
  //   console.log(z);
  //   //salert("len " + len);
  // });

  chrome.tabs.executeScript({ file: "nextutils.js" }, function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      let tabId;
      if (tabs && tabs.length > 0) {
        tabId = tabs[0].id;
        console.log(`background.js:tabs passed in valid`);
      } else {
        // see bug fix comments below
        console.log(`background.js:tabs passed in not valid`);
        tabId = activeTabId;
      }

      chrome.tabs.sendMessage(tabId, { test: "abcd" }, function(response) {
        const nextData = response.nextJsText;
        console.log(`background.js:nextDataLength:${nextData.length}`);
        const dataLen = nextData.length.toString();
        debugger;
        var x = friendlySizeBytes(nextData.length).toString();
        debugger;
        chrome.browserAction.setBadgeText({ text: x });
        chrome.browserAction.setTitle({ title: dataLen });
      });
    });
  });
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
// bug fix for dec tools problem above
