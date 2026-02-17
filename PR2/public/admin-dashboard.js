
// ---------------- DASHBOARD LOGIC ----------------

const API_BASE = "/api/admin";
const tableBody = document.getElementById("facultyTableBody");

document.addEventListener("DOMContentLoaded", () => {
  loadFacultyStats();
});

async function loadFacultyStats() {
  try {
    const res = await fetch(`${API_BASE}/analytics/faculty-average`);
    const data = await res.json();

    tableBody.innerHTML = "";

    let totalFeedback = 0;
    let ratingSum = 0;
    let bestFaculty = "-";
    let bestRating = 0;

    data.forEach(item => {
      totalFeedback += item.totalFeedbacks;
      ratingSum += item.averageRating;

      if (item.averageRating > bestRating) {
        bestRating = item.averageRating;
        bestFaculty = item.facultyName;
      }

      tableBody.innerHTML += `
        <tr>
          <td>${item.facultyName}</td>
          <td>${item.subjectName || "-"}</td>
          <td>${item.averageRating.toFixed(1)}</td>
          <td class="${item.averageRating >= 4 ? "good" : "warn"}">
            ${item.averageRating >= 4 ? "Excellent" : "Needs Improvement"}
          </td>
        </tr>
      `;
    });

    document.getElementById("totalFeedback").innerText = totalFeedback;
    document.getElementById("avgRating").innerText =
      data.length ? (ratingSum / data.length).toFixed(1) + " ⭐" : "0 ⭐";
    document.getElementById("topFaculty").innerText = bestFaculty;

  } catch (err) {
    console.error("Error loading admin dashboard", err);
  }
}
function goToManageQuestions() {
    window.location.href = "admin-questions.html"; // your questions management page
}

function goToManageSystem() {
    window.location.href = "admin-manage-system.html"; // your courses/subjects/faculty page
}

