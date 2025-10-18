document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const spinner = document.getElementById("spinner");

  spinner.style.display = "block"; // Show spinner

  fetch("https://script.google.com/macros/s/AKfycbxTAugsqiNINTfWLxAVA1h8tVKqmu1s7CpEkteGSunhZF9ywKpJLA9P0kLyzRVapSJydA/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    spinner.style.display = "none"; // Hide spinner
    showToast("✅ " + data);
    form.reset();

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "https://script.googleusercontent.com/a/macros/istos.in/echo?user_content_key=AehSKLgob5G_l5tM5tVjA2jauC05SBQGisMSlkjuSsue76NQBiJ0v_6yCTziXYAB1rsyBPmTpH1nDYMoYd1jRpfVuy9Pv6-9JguUkgJ4RM7RD0Mzjmu2ycf4UqifR3wIzo6Out0UzBg6_t2EXOfIYGbQqlzQD-RXf1XLp-qPHODW_R9roGCYogh-a9D3buSFRBGyKJfDftjEGCzMJxbQfwkeJAhabq74MzYLl2qJg0qMkb0MSKYu7Os4iOnR6MEUrztIprFD2EhImGDFkHyM94yCYV4sw0bYJ7bhG5BdOVct&lib=M5nM-dmj_k0pc3W-eqoHGLVNrn8xWtDZt";
    }, 2000);
  })
  .catch(() => {
    spinner.style.display = "none"; // Hide spinner
    showToast("⚠️ Error assigning task. Please try again.");
  });
});

function markCompleted(title) {
  const employeeSelect = document.getElementById("employee");
  const formData = new FormData();
  formData.append("action", "updateStatus");
  formData.append("title", title);
  formData.append("assignee", assignee);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg);
    loadTasks();
  })
  .catch(() => showToast("⚠️ Failed to update status"));
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.style.display = "none";
  }, 3000);
}
