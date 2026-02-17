const BASE_URL = "/api";

let allFaculty = [];
let allSubjects = [];

window.addEventListener("DOMContentLoaded",()=>{
    loadSubjects();
    loadFaculty();

    document.getElementById("subjectFilter")
    .addEventListener("change",renderTable);

    document.getElementById("searchInput")
    .addEventListener("input",renderTable);
});


/* LOAD SUBJECTS */
async function loadSubjects(){
    const res = await fetch(`${BASE_URL}/subjects`);
    allSubjects = await res.json();

    const dropdown = document.getElementById("subjectFilter");

    allSubjects.forEach(sub=>{
        const option=document.createElement("option");
        option.value=sub._id;
        option.textContent=sub.name;
        dropdown.appendChild(option);
    });
}


/* LOAD FACULTY */
async function loadFaculty(){
    const res = await fetch(`${BASE_URL}/faculty`);
    allFaculty = await res.json();
    renderTable();
}


/* RENDER TABLE */
function renderTable(){

    const subjectFilter =
    document.getElementById("subjectFilter").value;

    const search =
    document.getElementById("searchInput").value.toLowerCase();

    const table = document.getElementById("facultyTable");
    table.innerHTML="";

    let filtered = allFaculty.filter(f=>{
        const subjectMatch =
        !subjectFilter || f.subject === subjectFilter;

        const searchMatch =
        f.name.toLowerCase().includes(search);

        return subjectMatch && searchMatch;
    });

    /* CHECK IF ANY RECORD HAS DATE */
    const showDateColumn = filtered.some(f=>f.createdAt);

    /* TOGGLE HEADER */
    const headerRow = document.querySelector("thead tr");
    headerRow.innerHTML = showDateColumn
        ? "<th>Name</th><th>Subject</th><th>Date Added</th>"
        : "<th>Name</th><th>Subject</th>";

    if(filtered.length===0){
        table.innerHTML=`<tr><td colspan="${showDateColumn?3:2}">No faculty found</td></tr>`;
        return;
    }

    filtered.forEach(f=>{

        const subjectName =
        allSubjects.find(s=>s._id===f.subject)?.name || "Unknown";

        const row = document.createElement("tr");

        if(showDateColumn){
            const date = f.createdAt
            ? new Date(f.createdAt).toLocaleDateString()
            : "-";

            row.innerHTML=`
            <td>${f.name}</td>
            <td>${subjectName}</td>
            <td>${date}</td>
            `;
        }
        else{
            row.innerHTML=`
            <td>${f.name}</td>
            <td>${subjectName}</td>
            `;
        }

        table.appendChild(row);
    });
}


/* BACK */
function goBack(){
    window.location.href="admin-dashboard.html";
}
