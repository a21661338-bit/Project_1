function goBack() {
  window.location.href = "admin-manage-system.html";
}

const BASE_URL = "/api";

/* ================= ELEMENTS ================= */

const deleteFacultySubject = document.getElementById("deleteFacultySubject");
const deleteFacultySelect = document.getElementById("deleteFaculty");
const deleteFacultyBtn = document.getElementById("deleteFacultyBtn");
const deleteFacultyMessage = document.getElementById("deleteFacultyMessage");

const deleteSubjectSelect = document.getElementById("deleteSubject");
const deleteSubjectBtn = document.getElementById("deleteSubjectBtn");
const deleteSubjectMessage = document.getElementById("deleteSubjectMessage");

/* ================= LOAD ALL SUBJECTS ================= */

fetch(`${BASE_URL}/subjects`)
  .then(res => res.json())
  .then(data => {
    data.forEach(subject => {

      // For faculty delete section
      const opt1 = document.createElement("option");
      opt1.value = subject._id;
      opt1.textContent = subject.name;
      deleteFacultySubject.appendChild(opt1);

      // For subject delete section
      const opt2 = document.createElement("option");
      opt2.value = subject._id;
      opt2.textContent = subject.name;
      deleteSubjectSelect.appendChild(opt2);

    });
  })
  .catch(() => {
    console.log("Error loading subjects");
  });

/* ================= LOAD FACULTY BY SUBJECT ================= */

deleteFacultySubject.addEventListener("change", () => {

  const subjectId = deleteFacultySubject.value;

  deleteFacultySelect.innerHTML =
    `<option value="">-- Select Faculty --</option>`;

  if (!subjectId) return;

  fetch(`${BASE_URL}/faculty?subjectId=${subjectId}`)
    .then(res => res.json())
    .then(data => {
      data.forEach(faculty => {
        const option = document.createElement("option");
        option.value = faculty._id;
        option.textContent = faculty.name;
        deleteFacultySelect.appendChild(option);
      });
    })
    .catch(() => {
      console.log("Error loading faculty");
    });
});

/* ================= DELETE FACULTY ================= */

deleteFacultyBtn.addEventListener("click", () => {

  const facultyId = deleteFacultySelect.value;

  if (!facultyId) {
    deleteFacultyMessage.textContent = "Please select a faculty.";
    return;
  }

  fetch(`${BASE_URL}/faculty/${facultyId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      deleteFacultyMessage.textContent = data.message;

      // Reset faculty dropdown after delete
      deleteFacultySelect.innerHTML =
        `<option value="">-- Select Faculty --</option>`;
    })
    .catch(() => {
      deleteFacultyMessage.textContent = "Error deleting faculty.";
    });

});

/* ================= DELETE SUBJECT ================= */

deleteSubjectBtn.addEventListener("click", () => {

  const subjectId = deleteSubjectSelect.value;

  if (!subjectId) {
    deleteSubjectMessage.textContent = "Please select a subject.";
    return;
  }

  fetch(`${BASE_URL}/subjects/${subjectId}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      deleteSubjectMessage.textContent = data.message;

      // Reset subject dropdown after delete
      deleteSubjectSelect.innerHTML =
        `<option value="">-- Select Subject --</option>`;
    })
    .catch(() => {
      deleteSubjectMessage.textContent = "Error deleting subject.";
    });

});
