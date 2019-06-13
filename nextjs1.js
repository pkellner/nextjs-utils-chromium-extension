console.log("content_scripts...content-script.js");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const nextJsText = '9876653';
  sendResponse({ nextJsText });
});

document.addEventListener("jquery-version", onVersionRecieved, { once: true });
function onVersionRecieved(event) {
  if (event.detail) {
    alert(`Page is using jQuery ${event.detail}`);
  } else {
    alert(`jQuery not detected`);
  }
}

const versionScript = document.createElement("script");
versionScript.src = chrome.runtime.getURL("inject-script.js");
versionScript.onload = function autoUnload() {
  this.remove;
};
document.body.appendChild(versionScript);





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
