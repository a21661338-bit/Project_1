document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const container = document.querySelector(".login-container"); 
  // 👆 change class ONLY if your container uses a different name

  try {
    const res = await fetch("http://localhost:5000/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Login success → dashboard
      window.location.href = "student-dashboard.html";
    } else {
      // ❌ Wrong credentials → SHAKE animation
      container.classList.remove("shake-error");
      void container.offsetWidth; // 🔥 re-trigger animation
      container.classList.add("shake-error");
    }

  } catch (err) {
    console.error(err);

    // ❌ Server error → also shake
    container.classList.remove("shake-error");
    void container.offsetWidth;
    container.classList.add("shake-error");
  }
});
