// Select elements
const studentForm = document.getElementById("studentForm");
const studentTable = document
  .getElementById("studentTable")
  .querySelector("tbody");

// Load students from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to render students
function renderStudents() {
  studentTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = `<tr>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    </tr>`;
    studentTable.insertAdjacentHTML("beforeend", row);
  });
}

// Add a new student
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = studentForm.studentName.value.trim();
  const id = studentForm.studentID.value.trim();
  const email = studentForm.emailID.value.trim();
  const contact = studentForm.contactNo.value.trim();

  if (!name || !id || !email || !contact)
    return alert("All fields are required!");

  students.push({ name, id, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  studentForm.reset();
});

// Edit a student
function editStudent(index) {
  const student = students[index];
  studentForm.studentName.value = student.name;
  studentForm.studentID.value = student.id;
  studentForm.emailID.value = student.email;
  studentForm.contactNo.value = student.contact;

  deleteStudent(index); // Remove the student to prevent duplication
}

// Delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
}

// Initial render
renderStudents();
