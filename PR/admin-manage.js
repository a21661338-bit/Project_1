const BASE_URL = "http://localhost:5000/api";

/* =========================
   LOAD DATA ON PAGE LOAD
========================= */
window.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("subjectCourse")) {
        loadCourses();
    }

    if (document.getElementById("facultySubject")) {
        loadSubjects();
    }

    if (document.getElementById("questionList")) {
        loadQuestions();
    }
});


/* =========================
   COURSE SECTION
========================= */

async function addCourse() {
    const name = document.getElementById("courseName").value.trim();

    if (!name) {
        alert("Enter course name");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/courses`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name })
        });

        if (!res.ok) throw new Error("Failed to add course");

        alert("Course added ✅");
        document.getElementById("courseName").value = "";
        loadCourses();

    } catch (err) {
        console.error(err);
        alert("Error adding course ❌");
    }
}

async function loadCourses() {
    try {
        const res = await fetch(`${BASE_URL}/courses`);
        const courses = await res.json();

        const dropdown = document.getElementById("subjectCourse");
        if (!dropdown) return;

        dropdown.innerHTML = `<option value="">Select Course</option>`;

        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course._id;
            option.textContent = course.name;
            dropdown.appendChild(option);
        });

    } catch (err) {
        console.error("Error loading courses:", err);
    }
}


/* =========================
   SUBJECT SECTION
========================= */

async function addSubject() {
    const name = document.getElementById("subjectName").value.trim();
    const course = document.getElementById("subjectCourse").value;

    if (!name || !course) {
        alert("Fill all fields");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/subjects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, course })
        });

        if (!res.ok) throw new Error("Failed to add subject");

        alert("Subject added ✅");
        document.getElementById("subjectName").value = "";
        loadSubjects();

    } catch (err) {
        console.error(err);
        alert("Error adding subject ❌");
    }
}

async function loadSubjects() {
    try {
        const res = await fetch(`${BASE_URL}/subjects`);
        const subjects = await res.json();

        const dropdown = document.getElementById("facultySubject");
        if (!dropdown) return;

        dropdown.innerHTML = `<option value="">Select Subject</option>`;

        subjects.forEach(subject => {
            const option = document.createElement("option");
            option.value = subject._id;
            option.textContent = subject.name;
            dropdown.appendChild(option);
        });

    } catch (err) {
        console.error("Error loading subjects:", err);
    }
}


/* =========================
   FACULTY SECTION
========================= */

async function addFaculty() {
    const name = document.getElementById("facultyName").value.trim();
    const subject = document.getElementById("facultySubject").value;

    if (!name || !subject) {
        alert("Fill all fields");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/faculty`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, subject })
        });

        if (!res.ok) throw new Error("Failed to add faculty");

        alert("Faculty added ✅");
        document.getElementById("facultyName").value = "";

    } catch (err) {
        console.error(err);
        alert("Error adding faculty ❌");
    }
}


/* =========================
   QUESTION SECTION
========================= */

async function addQuestion() {
    const text = document.getElementById("questionText").value.trim();

    if (!text) {
        alert("Enter question");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/questions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        if (!res.ok) throw new Error("Failed to add question");

        alert("Question added ✅");
        document.getElementById("questionText").value = "";
        loadQuestions();

    } catch (err) {
        console.error(err);
        alert("Error adding question ❌");
    }
}

async function loadQuestions() {
    try {
        const res = await fetch(`${BASE_URL}/questions`);
        const questions = await res.json();

        const container = document.getElementById("questionList");
        if (!container) return;

        container.innerHTML = "";

        if (questions.length === 0) {
            container.innerHTML = "<p>No questions added yet.</p>";
            return;
        }

        questions.forEach(q => {
            const div = document.createElement("div");
            div.className = "question-item";

            div.innerHTML = `
                <span>${q.text}</span>
                <button class="delete-btn" onclick="deleteQuestion('${q._id}')">
                    Delete
                </button>
            `;

            container.appendChild(div);
        });

    } catch (err) {
        console.error("Error loading questions:", err);
    }
}

async function deleteQuestion(id) {
    try {
        const res = await fetch(`${BASE_URL}/questions/${id}`, {
            method: "DELETE"
        });

        if (!res.ok) throw new Error("Failed to delete");

        loadQuestions();

    } catch (err) {
        console.error(err);
        alert("Error deleting question ❌");
    }
}


/* =========================
   BACK BUTTON
========================= */

function goBack() {
    window.location.href = "admin-dashboard.html";
}
function goToDeletePage() {
  window.location.href = "admin-delete-system.html";
}

