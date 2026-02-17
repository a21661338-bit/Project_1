document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // ✅ Hardcoded admin credentials
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("adminLoggedIn", "true"); // mark as logged in
    window.location.href = "admin-dashboard.html"; // redirect to dashboard
  } else {
    alert("Invalid admin credentials ❌");
  }
});
