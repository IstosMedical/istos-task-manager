const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxTAugsqiNINTfWLxAVA1h8tVKqmu1s7CpEkteGSunhZF9ywKpJLA9P0kLyzRVapSJydA/exec";

// Handle task assignment form submission
document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  formData.append("action", "assignTask"); // ✅ Required for backend routing

  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    spinner.style.display = "none";
    showToast("✅ " + data);
    form.reset();
    setTimeout(() => {
      window.location.href = "https://istosmedical.github.io/istos-task-manager/";
    }, 2000);
  })
  .catch(() => {
    spinner.style.display = "none";
    showToast("⚠️ Error assigning task. Please try again.");
  });
});

// Handle task completion
function markCompleted(taskId) {
  const employeeSelect = document.getElementById("employee");
  const assignee = employeeSelect.value;

  const formData = new FormData();
  formData.append("action", "updateStatus");
  formData.append("taskId", taskId);
  formData.append("assignee", assignee);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    showToast(msg || "✅ Task marked as completed");
    loadTasks(); // Refresh task list
  })
  .catch(() => showToast("⚠️ Failed to update status"));
}

// Toast notification logic
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
