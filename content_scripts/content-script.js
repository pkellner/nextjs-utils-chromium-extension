document.addEventListener("jquery-version", onVersionRecieved, { once: true });
debugger;
function onVersionRecieved(event) {
    debugger;
  if (event.detail) {
    alert(`Page is using jQuery ${event.detail}`);
  } else {
    alert(`jQuery not detected`);
  }
}

const versionScript = document.createElement("script");
versionScript.src = chrome.runtime.getURL("inject-script.js");
debugger;
versionScript.onload = function autoUnload() {
  this.remove;
};
document.body.appendChild(versionScript);
