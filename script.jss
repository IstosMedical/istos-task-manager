document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch("https://script.google.com/macros/s/AKfycbxTAugsqiNINTfWLxAVA1h8tVKqmu1s7CpEkteGSunhZF9ywKpJLA9P0kLyzRVapSJydA/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("response").innerText = data;
    e.target.reset();
  });
});
