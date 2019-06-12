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
