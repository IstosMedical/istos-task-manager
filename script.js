document.getElementById("taskForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  formData.append("action", "assignTask"); // ✅ Add this line

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
    loadTasks(); // Refresh UI
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
