{
  // Use a block statement to prevent modifying global scope
  // let version = -1;
  // if ($ && $.fn && $.fn.jquery) {
  //   version = $.fn.jquery;
  // }
  debugger;
  var version = -99;

  const length = __NEXT_DATA__ ? JSON.stringify(__NEXT_DATA__).length : 0;

  const event = new CustomEvent("jquery-version", {
    detail: version + " length:" + length,
    nextdata: __NEXT_DATA__ ? __NEXT_DATA__ : "{}"
  });
  document.dispatchEvent(event);
}
