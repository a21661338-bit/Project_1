const form = document.getElementById("feedbackForm");

// ---------------- READ URL PARAMS ----------------
const urlParams = new URLSearchParams(window.location.search);
const course = urlParams.get("course");
const subject = urlParams.get("subject");
const faculty = urlParams.get("faculty");

// ---------------- LOAD QUESTIONS ----------------
async function loadQuestions() {
  try {
    const res = await fetch("http://localhost:5000/api/questions");
    const questions = await res.json();

    questions.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question-card";

      div.innerHTML = `
        <div class="question-text">${index + 1}. ${q.text}</div>
        <div class="options">
          ${[1, 2, 3, 4, 5].map(val => `
            <label>
              <input type="radio" name="q${index}" value="${val}" required>
              ${val}
            </label>
          `).join("")}
        </div>
      `;

      form.appendChild(div);
    });

    // submit button
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.className = "submit-btn";
    btn.textContent = "Submit Feedback";
    form.appendChild(btn);

  } catch (err) {
    console.error("Error loading questions:", err);
  }
}

loadQuestions();

// ---------------- SUBMIT FEEDBACK ----------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  e.stopPropagation();

  const answers = [];
  const totalQuestions = document.querySelectorAll(".question-card").length;

  for (let i = 0; i < totalQuestions; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("Please answer all questions");
      return;
    }
    answers.push(selected.value);
  }

  const feedbackData = {
    course,
    subject,
    faculty,
    answers
  };

  console.log("Sending feedback:", feedbackData);

  try {
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData)
    });

    if (!res.ok) {
      alert("Submission failed ❌");
      return;
    }

    // ✅ FINAL GUARANTEED REDIRECT
    setTimeout(() => {
      window.location.href = "thankyou.html";
    }, 200);

  } catch (err) {
    console.error(err);
    alert("Backend error ❌");
  }
});
