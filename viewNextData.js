window.addEventListener("load", () => {
  const nextData = window.localStorage.getItem("nextdata");
  const obj = JSON.parse(nextData);
  document.body.innerHTML = "";
  document.body.appendChild(
    document.createTextNode(JSON.stringify(obj, null, 4))
  );
});
