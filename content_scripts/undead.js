window.onload = function() {
  //document.write("Hello world");
  //alert("undead.js:hi");

  const nextJsElement = document.getElementById("__NEXT_DATA__");
  let message = {
    nextJs: false
  };
  if (nextJsElement) {
    message.nextJs = true;
    message.nextJsData = nextJsElement.innerText;
  }
  chrome.runtime.sendMessage(message);
};
