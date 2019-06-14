// var bg = chrome.extension.getBackgroundPage();
//
// //
// //
// // // A $( document ).ready() block.
// $( document ).ready(function() {
//   debugger;
//   const testData = bg.testData;
//   const nextData = bg.nextDataFullValue;
//   $("#nextdataid").html(nextData);
//   console.log( "ready!",bg.nextDataFullValue );
// });
//
// let source = null;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(`viewNextData.js listener`);
  console.log(`testValue: ${testValue}`);
  if (request.messageType === "SHOW_JSON_IN_POPUP") {
    $("#nextdataid").html("abcde");
  }

  // sent from another content script, intended for saving source
  // if(request.action === 'putSource') {
  //   source = request.source;
  //   chrome.tabs.create({ url: 'newtab.html' });
  // }
  // // sent from newtab-contentscript, to get the source
  // if(request.action === 'getSource') {
  //   sendResponse({ source: source });
  // }
});
