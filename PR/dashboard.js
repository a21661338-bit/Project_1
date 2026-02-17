const courseSelect = document.getElementById("course");
const subjectSelect = document.getElementById("subject");
const facultySelect = document.getElementById("faculty");

// Use the same BASE_URL as your admin-manage.js
const BASE_URL = "http://localhost:5000/api";

/* ================= LOAD COURSES ================= */
fetch(`${BASE_URL}/courses`) // Fixed path: removed /admin/
  .then(res => res.json())
  .then(data => {
    data.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c._id;
      opt.textContent = c.name;
      courseSelect.appendChild(opt);
    });
  });

/* ================= LOAD SUBJECTS BY COURSE ================= */
courseSelect.addEventListener("change", async () => {
  const courseId = courseSelect.value;

  subjectSelect.innerHTML = '<option value="">Select Subject</option>';
  facultySelect.innerHTML = '<option value="">Select Faculty</option>';

  if (!courseId) return;

  // Fixed path: removed /admin/ and ensured query param matches backend
  const res = await fetch(`${BASE_URL}/subjects?courseId=${courseId}`); 
  
  const subjects = await res.json();

  subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s._id;
    opt.textContent = s.name;
    subjectSelect.appendChild(opt);
  });
});

/* ================= LOAD FACULTY BY SUBJECT ================= */
subjectSelect.addEventListener("change", async () => {
  const subjectId = subjectSelect.value;

  facultySelect.innerHTML = '<option value="">Select Faculty</option>';
  if (!subjectId) return;

  // FIXED PATH: Changed from /admin/faculties to /faculty to match your POST request
  // Also changed query parameter to 'subjectId' to match dashboard logic
  const res = await fetch(`${BASE_URL}/faculty?subjectId=${subjectId}`);
  
  const faculties = await res.json();

  faculties.forEach(f => {
    const opt = document.createElement("option");
    opt.value = f._id;
    opt.textContent = f.name;
    facultySelect.appendChild(opt);
  });
});

/* ================= REDIRECT ================= */
document.getElementById("giveFeedback").addEventListener("click", () => {
  const course = courseSelect.value;
  const subject = subjectSelect.value;
  const faculty = facultySelect.value;

  if (!course || !subject || !faculty) {
    alert("Please select all fields!");
    return;
  }

  window.location.href =
    `http://127.0.0.1:5500/feedback-form.html?course=${course}&subject=${subject}&faculty=${faculty}`;
});