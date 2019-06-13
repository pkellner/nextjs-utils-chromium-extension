console.log("content_scripts...content-script.js");

// listens for button click from toolbar in background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  // if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
  document.addEventListener("jquery-version", onVersionRecieved, {
    once: true
  });

  function onVersionRecieved(event) {
    if (event.detail) {
      //alert(`content-scriptx: Return From inject-script ${event.detail}`);
      console.log(`content-scriptx: Return From inject-script ${event.detail}`);
    } else {
      //alert(`content-scriptx: Return From inject-script  no event.detail`);
      console.log(
        `content-scriptx: Return From inject-script  no event.detail`
      );
    }

    if (request.greeting == "hello")
      sendResponse({ farewell: "goodbye " + event.detail });
  }

  const versionScript = document.createElement("script");
  versionScript.src = chrome.runtime.getURL("inject-script.js");
  versionScript.onload = function autoUnload() {
    this.remove;
  };
  document.body.appendChild(versionScript);
});

// https://developer.chrome.com/extensions/content_scripts#host-page-communication
window.addEventListener(
  "message",
  function(event) {
    // We only accept messages from ourselves
    if (event.source != window) return;

    if (event.data.type && event.data.type == "FROM_PAGE") {
      console.log("Content script received: " + event.data.text);
      debugger;
      chrome.runtime.sendMessage(
        { greeting: `test from content-script:${event.data.text}` },
        function(response) {
          debugger;
          console.log(response.farewell);
        }
      );
    }
  },
  false
);

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   const nextJsText = '9876653';
//   sendResponse({ nextJsText });
// });
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(
//     sender.tab
//       ? "from a content script:" + sender.tab.url
//       : "from the extension"
//   );
//   if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
// });
//
// document.addEventListener("jquery-version", onVersionRecieved, { once: true });
// function onVersionRecieved(event) {
//   if (event.detail) {
//     alert(`Page is using jQuery ${event.detail}`);
//   } else {
//     alert(`jQuery not detected`);
//   }
// }
//
// const versionScript = document.createElement("script");
// versionScript.src = chrome.runtime.getURL("inject-script.js");
// versionScript.onload = function autoUnload() {
//   this.remove;
// };
// document.body.appendChild(versionScript);

// there are two types of nextjs data
// https://www.headspace.com/
//   <script>__NEXT_DATA__ = {"props":{"store":{"reducerManager":{"reduce ... }</script>
//
// https://www.intercom.com/customer-engagement https://www.moebel.de/   https://www.winkt.io/ https://garitma.com/ https://www.intercom.com/customer-engagement
//    <script id="__NEXT_DATA__" type="application/json">{"dataManager":"[]","props":{"pagePr....}</script>
//  https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/5fs37bqPYX0

// const nextJsElement = document.getElementById("__NEXT_DATA__");
//
// if (nextJsElement) {
//   // first thing is to see if there is the <script id="__NEXT_DATA__"  format (8.0+)
//   if (nextJsElement.innerText) {
//     nextJsText = nextJsElement.innerText;
//   }
// } else {
//   // next check for <script> tag with __NEXT_DATA__ in it
//   // (CAN'T FIGURE THIS OUT, I THINK IT MAY BE HIDDEN BECAUSE IT'S EXECUTED ON THE PAGE AND WE DON'T SEE THE EXECUTION CONTEXT)
// }
