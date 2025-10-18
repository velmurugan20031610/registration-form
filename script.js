// script.js
let students = [];
let editId = null;

document.getElementById("saveBtn").addEventListener("click", function () {
  var name = document.getElementById("name").value.trim();
  var age = document.getElementById("age").value.trim();
  var gender = document.querySelector('input[name="gender"]:checked');
  var course = document.getElementById("course").value;
  var email = document.getElementById("email").value.trim();

  if (!name || !age || !gender || !email) {
    alert("Please fill in all fields!");
    return;
  }

  const studentData = {
    id: editId ? editId : Date.now(),
    name,
    age,
    gender: gender.value,
    course,
    email,
  };

  if (editId) {
    // Update existing student
    students = students.map(s => (s.id === editId ? studentData : s));
    editId = null;
    document.getElementById("saveBtn").textContent = "Save";
  } else {
    // Add new student
    students.push(studentData);
  }

  displayStudents();
  clearForm();
});

function displayStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border p-2 text-center">${index + 1}</td>
      <td class="border p-2">${student.name}</td>
      <td class="border p-2 text-center">${student.age}</td>
      <td class="border p-2 text-center">${student.gender}</td>
      <td class="border p-2 text-center">${student.course}</td>
      <td class="border p-2">${student.email}</td>
      <td class="border p-2 text-center">
        <button onclick="editStudent(${student.id})" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button onclick="deleteStudent(${student.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function deleteStudent(id) {
  students = students.filter(student => student.id !== id);
  displayStudents();
}

function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (student) {
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("email").value = student.email;
    document.getElementById("course").value = student.course;
    document.querySelectorAll('input[name="gender"]').forEach(el => {
      el.checked = el.value === student.gender;
    });

    editId = id;
    document.getElementById("saveBtn").textContent = "Update";
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.querySelectorAll('input[name="gender"]').forEach(el => (el.checked = false));
  document.getElementById("course").selectedIndex = 0;
}
