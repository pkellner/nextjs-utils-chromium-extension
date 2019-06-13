{
  // Use a block statement to prevent modifying global scope
  let version = 987653;

  const z = JSON.stringify(window.__NEXT_DATA__);

  window.postMessage(
    { type: "FROM_PAGE", text: `Hi!! ${version}:${z.length}` },
    "*"
  );
}
