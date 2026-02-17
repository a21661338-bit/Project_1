document.getElementById("studentSignupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match ❌");
    return;
  }

  try {
    const res = await fetch("/api/student/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful ✅");
      window.location.href = "login.html?type=student";
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (err) {
    console.error(err);
    alert("Backend error ❌");
  }
});
