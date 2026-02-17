const BASE_URL = "http://localhost:5000/api";

let allFaculty = [];

window.addEventListener("DOMContentLoaded", () => {
  loadFaculty();

  document.getElementById("facultyFilter")
    .addEventListener("change", renderTable);

  document.getElementById("generatePdfBtn")
    .addEventListener("click", generatePDF);
});

async function loadFaculty() {
  const res = await fetch(`${BASE_URL}/facultyReport`);
  allFaculty = await res.json();

  // populate faculty dropdown
  const dropdown = document.getElementById("facultyFilter");
  dropdown.innerHTML = `<option value="">All Faculties</option>`;
  allFaculty.forEach(f => {
    const option = document.createElement("option");
    option.value = f._id;
    option.textContent = f.name;
    dropdown.appendChild(option);
  });

  renderTable();
}

function renderTable() {
  const selectedFaculty = document.getElementById("facultyFilter").value;
  const table = document.getElementById("reportTableBody");
  table.innerHTML = "";

  const filteredFaculty = selectedFaculty
    ? allFaculty.filter(f => f._id === selectedFaculty)
    : allFaculty;

  filteredFaculty.forEach(f => {
    const status = f.avgRating >= 4 ? "Excellent" : f.avgRating >= 2.5 ? "Average" : "Needs Improvement";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${f.name}</td>
      <td>${f.subject || "Unknown"}</td>
      <td>${f.avgRating.toFixed(1)} ⭐</td>
      <td>${status}</td>
      <td>${new Date(f.createdAt).toLocaleDateString()}</td>
      <td>${f.course || "Unknown"}</td>
      <td>${f.totalFeedback}</td>
    `;
    table.appendChild(row);
  });
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Faculty Report", 14, 20);
  let rowStart = 30;

  const rows = [];
  const selectedFaculty = document.getElementById("facultyFilter").value;
  const filteredFaculty = selectedFaculty
    ? allFaculty.filter(f => f._id === selectedFaculty)
    : allFaculty;

  filteredFaculty.forEach(f => {
    const status = f.avgRating >= 4 ? "Excellent" : f.avgRating >= 2.5 ? "Average" : "Needs Improvement";
    rows.push([f.name, f.subject, f.avgRating.toFixed(1), status, new Date(f.createdAt).toLocaleDateString(), f.course, f.totalFeedback]);
  });

  // Add table
  doc.autoTable({
    head: [['Faculty','Subject','Avg Rating','Status','Date Added','Course','Total Feedback']],
    body: rows,
    startY: rowStart,
  });

  doc.save("faculty_report.pdf");
}

function goBack() {
  window.location.href = "admin-dashboard.html";
}
