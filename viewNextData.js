$(document).ready(function() {
  const nextData = window.localStorage.getItem("nextdata");
  const obj = JSON.parse(nextData);
  document.body.innerHTML = "";
  document.body.appendChild(
    document.createTextNode(JSON.stringify(obj, null, 4))
  );
  // $("#nextdataid").html(nextData);
});

// document.body.innerHTML = "";
// document.body.appendChild(document.createTextNode(JSON.stringify(obj, null, 4)));
