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

  // Add a vertical scrollbar if there are many records
  if (students.length > 5) {
    studentTable.parentElement.style.overflowY = "auto";
    studentTable.parentElement.style.maxHeight = "300px";
  } else {
    studentTable.parentElement.style.overflowY = "visible";
    studentTable.parentElement.style.maxHeight = "none";
  }
}

// Function to validate input fields
function validateInput(name, id, email, contact) {
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
  const idRegex = /^[0-9]+$/; // Only numbers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  const contactRegex = /^[0-9]{10}$/; // Exactly 10 digits

  if (!name || !nameRegex.test(name)) {
    alert("Please enter a valid name (letters only).");
    return false;
  }
  if (!id || !idRegex.test(id)) {
    alert("Please enter a valid student ID (numbers only).");
    return false;
  }
  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!contact || !contactRegex.test(contact)) {
    alert("Please enter a valid 10-digit contact number.");
    return false;
  }
  return true;
}

// Add a new student
studentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = studentForm.studentName.value.trim();
  const id = studentForm.studentID.value.trim();
  const email = studentForm.emailID.value.trim();
  const contact = studentForm.contactNo.value.trim();

  if (!validateInput(name, id, email, contact)) {
    return; // Stop if validation fails
  }

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
