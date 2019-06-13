{
  // Use a block statement to prevent modifying global scope
  let version = 987654;

  const event = new CustomEvent("jquery-version", { detail: version });
  document.dispatchEvent(event);

  debugger;
  window.postMessage(
    { type: "FROM_PAGE", text: "Hi!" + version },
    "*"
  );
}
