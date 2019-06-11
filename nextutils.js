chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let nextJsText = 'null';

  // there are two types of nextjs data
  // https://www.headspace.com/
  //   <script>__NEXT_DATA__ = {"props":{"store":{"reducerManager":{"reduce ... }</script>
  //
  // https://www.intercom.com/customer-engagement https://www.moebel.de/   https://www.winkt.io/ https://garitma.com/ https://www.intercom.com/customer-engagement
  //    <script id="__NEXT_DATA__" type="application/json">{"dataManager":"[]","props":{"pagePr....}</script>
  //  https://groups.google.com/a/chromium.org/forum/#!topic/chromium-extensions/5fs37bqPYX0


  const nextJsElement = document.getElementById("__NEXT_DATA__");

  if (nextJsElement) {
    // first thing is to see if there is the <script id="__NEXT_DATA__"  format (8.0+)
    if (nextJsElement.innerText) {
      nextJsText = nextJsElement.innerText;
    }
  } else {
    // next check for <script> tag with __NEXT_DATA__ in it
    // (CAN'T FIGURE THIS OUT, I THINK IT MAY BE HIDDEN BECAUSE IT'S EXECUTED ON THE PAGE AND WE DON'T SEE THE EXECUTION CONTEXT)
  }
  sendResponse({ nextJsText });
});

// console.log(
//   sender.tab
//     ? "from a content script:" + sender.tab.url
//     : "from the extension"
// );

// const z = JSON.stringify(window.__NEXT_DATA__);
// console.log("JSON.stringify(window.__NEXT_DATA__).length:");
// console.log(JSON.stringify(window.__NEXT_DATA__).length);
// console.log(JSON.stringify(window.__NEXT_DATA__));


/*$(document).ready(function() {
  console.log("ready from nextjsmessagehandler!");
});*/

// if (firstTime === true) {
//   firstTime = false;
//   var styles = `
//     body.imagecover::before {
//     content: "";
//     background-image: url("${request.url}");
//     background-size: contain;
//     background-repeat: no-repeat;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     z-index: 9999;
//     display: inline;
//   }
//   `;
//
//   var styleSheet = document.createElement("style");
//   styleSheet.type = "text/css";
//   styleSheet.innerText = styles;
//   document.head.appendChild(styleSheet);
//}

// if ($("body").hasClass("imagecover")){
//   $("body").removeClass("imagecover");
// } else {
//   $("body").addClass("imagecover fade");
//   //document.body.className = "imagecover fade";
//   setTimeout(() => {
//     //document.body.className = "imagecover";
//     $("body").removeClass("fade");
//   }, 100); // make 0
// }
