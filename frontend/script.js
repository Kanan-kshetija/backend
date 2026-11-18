
const API_URL = "http://localhost:5000/api/students";

// Load students
async function loadStudents() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load students");
        }

        const students = await response.json();

        displayStudents(students);
        updateStats(students);

    } catch (error) {
        console.error(error);

        document.getElementById("studentTable").innerHTML = `
            <tr>
                <td colspan="5">Unable to load students.</td>
            </tr>
        `;
    }
}

// Display students
function displayStudents(students) {
    const table = document.getElementById("studentTable");

    if (students.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5">No students found. Add your first student!</td>
            </tr>
        `;
        return;
    }

    table.innerHTML = students.map(student => `
        <tr>
            <td><strong>${escapeHTML(student.name)}</strong></td>
            <td>${escapeHTML(student.email)}</td>
            <td>${student.age}</td>
            <td>${escapeHTML(student.course)}</td>
            <td>
                <button class="action-btn edit-btn"
                    onclick="editStudent('${student._id}')">Edit</button>

                <button class="action-btn delete-btn"
                    onclick="deleteStudent('${student._id}')">Delete</button>
            </td>
        </tr>
    `).join("");
}

// Update statistics
function updateStats(students) {
    document.getElementById("totalStudents").textContent = students.length;

    const courses = new Set(students.map(student => student.course));

    document.getElementById("totalCourses").textContent = courses.size;
}

// Escape HTML
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Open form
function openModal() {
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Student";
    document.getElementById("saveBtn").textContent = "Save Student";
    document.getElementById("studentModal").classList.add("show");
}

// Close form
function closeModal() {
    document.getElementById("studentModal").classList.remove("show");
}

// Add student
document.getElementById("studentForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value.trim()
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to save student");
        }

        alert("Student added successfully!");
        closeModal();
        loadStudents();

    } catch (error) {
        alert(error.message);
    }
});

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        const student = students.find(s => s._id === id);

        if (!student) return;

        document.getElementById("studentId").value = id;
        document.getElementById("name").value = student.name;
        document.getElementById("email").value = student.email;
        document.getElementById("age").value = student.age;
        document.getElementById("course").value = student.course;

        document.getElementById("modalTitle").textContent = "Edit Student";
        document.getElementById("saveBtn").textContent = "Update Student";
        document.getElementById("studentModal").classList.add("show");

    } catch (error) {
        alert(error.message);
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to delete student");
        }

        alert("Student deleted successfully!");
        loadStudents();

    } catch (error) {
        alert(error.message);
    }
}

// Update student when editing
document.getElementById("studentForm").addEventListener("submit", async function(e) {
    const id = document.getElementById("studentId").value;

    if (!id) return;

    e.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value.trim()
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Update failed");

        alert("Student updated successfully!");
        closeModal();
        loadStudents();

    } catch (error) {
        alert(error.message);
    }
});

// Search students
document.getElementById("searchInput").addEventListener("input", async function() {
    const response = await fetch(API_URL);
    const students = await response.json();

    const search = this.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.course.toLowerCase().includes(search)
    );

    displayStudents(filtered);
});

// Start dashboard
loadStudents();
