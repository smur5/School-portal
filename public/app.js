const state = {
  student: "Amara Okafor",
  students: JSON.parse(localStorage.getItem("managedStudents") || "null") || [
    { id: crypto.randomUUID(), name: "Amara Okafor", email: "amara.okafor@example.edu", course: "Computer Science", grade: "A", phone: "+234 801 555 0123", status: "Active" },
    { id: crypto.randomUUID(), name: "David Mensah", email: "david.mensah@example.edu", course: "Business Administration", grade: "B+", phone: "+234 802 555 0190", status: "Active" },
    { id: crypto.randomUUID(), name: "Grace Bello", email: "grace.bello@example.edu", course: "Mass Communication", grade: "A-", phone: "+234 803 555 0145", status: "On Leave" }
  ],
  hostelBooking: JSON.parse(localStorage.getItem("hostelBooking") || "null"),
  attendance: JSON.parse(localStorage.getItem("attendanceLog") || "[]"),
  cbtScore: localStorage.getItem("cbtScore")
};

const results = [
  { course: "Software Engineering", code: "CSC 401", score: 92, grade: "A", semester: "2026 First Semester" },
  { course: "Database Systems", code: "CSC 405", score: 88, grade: "A", semester: "2026 First Semester" },
  { course: "Web Development", code: "CSC 303", score: 81, grade: "B+", semester: "2026 First Semester" },
  { course: "Data Structures", code: "CSC 211", score: 79, grade: "B", semester: "2025 Second Semester" },
  { course: "Discrete Mathematics", code: "MTH 203", score: 84, grade: "A-", semester: "2025 Second Semester" }
];

const courses = [
  { title: "Database Systems", teacher: "Dr. Hassan", progress: 80, modules: "4 of 5 modules complete" },
  { title: "Software Engineering", teacher: "Prof. Mensah", progress: 60, modules: "3 of 5 modules complete" },
  { title: "Web Development", teacher: "Mrs. Adeyemi", progress: 45, modules: "2 of 5 modules complete" }
];

const classes = [
  { title: "Database Systems", time: "Today, 10:00 AM", link: "https://meet.google.com/" },
  { title: "Software Engineering", time: "Today, 1:00 PM", link: "https://zoom.us/" },
  { title: "Web Development Lab", time: "Tomorrow, 9:00 AM", link: "https://teams.microsoft.com/" }
];

const examQuestions = [
  {
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    answer: "SELECT"
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "HyperText Markup Language", "HighText Machine Language", "Hyper Tool Multi Language"],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which model is commonly used for software development life cycle planning?",
    options: ["Waterfall", "Firewall", "Watermark", "Datapath"],
    answer: "Waterfall"
  }
];

const pageTitle = document.querySelector("#pageTitle");
const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");

function setView(viewId) {
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
  views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  pageTitle.textContent = document.querySelector(`[data-view="${viewId}"]`).textContent;
}

function renderResults() {
  const semester = document.querySelector("#semesterFilter").value;
  const filtered = semester === "all" ? results : results.filter((item) => item.semester === semester);
  document.querySelector("#resultsTable").innerHTML = filtered
    .map(
      (item) => `
        <tr>
          <td>${item.course}</td>
          <td>${item.code}</td>
          <td>${item.score}%</td>
          <td><span class="grade-pill">${item.grade}</span></td>
          <td>${item.semester}</td>
        </tr>
      `
    )
    .join("");
}

function saveStudents() {
  localStorage.setItem("managedStudents", JSON.stringify(state.students));
}

function renderStudents() {
  const query = document.querySelector("#studentSearch")?.value.trim().toLowerCase() || "";
  const students = state.students.filter((student) => {
    return [student.name, student.email, student.course, student.grade, student.status].join(" ").toLowerCase().includes(query);
  });

  document.querySelector("#studentCount").textContent = state.students.length;
  document.querySelector("#studentsTable").innerHTML = students.length
    ? students
        .map(
          (student) => `
            <tr>
              <td><strong>${student.name}</strong><br /><span class="muted-text">${student.email}</span></td>
              <td>${student.course}</td>
              <td><span class="grade-pill">${student.grade}</span></td>
              <td><span class="status-pill">${student.status}</span></td>
              <td>${student.phone || "Not provided"}</td>
              <td>
                <div class="row-actions">
                  <button type="button" data-action="edit" data-id="${student.id}">Edit</button>
                  <button class="danger-button" type="button" data-action="delete" data-id="${student.id}">Delete</button>
                </div>
              </td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="6">No student records found.</td></tr>`;
}

function resetStudentForm() {
  document.querySelector("#studentForm").reset();
  document.querySelector("#studentForm").elements.id.value = "";
  document.querySelector("#studentFormTitle").textContent = "Add Student";
}

function renderCourses() {
  document.querySelector("#courseGrid").innerHTML = courses
    .map(
      (course) => `
        <article class="course-card">
          <h3>${course.title}</h3>
          <p>${course.teacher}</p>
          <div class="progress-track" aria-label="${course.progress}% complete">
            <div class="progress-bar" style="width: ${course.progress}%"></div>
          </div>
          <p>${course.modules}</p>
          <button class="course-button" type="button">Open Module</button>
        </article>
      `
    )
    .join("");
}

function renderClasses() {
  document.querySelector("#classList").innerHTML = classes
    .map(
      (item) => `
        <article class="class-card">
          <div>
            <h3>${item.title}</h3>
            <p>${item.time}</p>
          </div>
          <a class="join-button" href="${item.link}" target="_blank" rel="noreferrer">Join Class</a>
        </article>
      `
    )
    .join("");
}

function renderHostel() {
  const summary = document.querySelector("#bookingSummary");
  const detail = document.querySelector("#bookingDetail");
  const status = document.querySelector("#hostelStatus");

  if (!state.hostelBooking) {
    summary.textContent = "No hostel booked yet";
    detail.textContent = "Choose a block and room type to reserve accommodation for the session.";
    status.textContent = "Not Booked";
    return;
  }

  summary.textContent = `${state.hostelBooking.block}`;
  detail.textContent = `${state.hostelBooking.roomType} reserved for ${state.hostelBooking.session}.`;
  status.textContent = "Booked";
}

function renderAttendance() {
  const log = document.querySelector("#attendanceLog");
  if (!state.attendance.length) {
    log.innerHTML = `<article class="activity-item"><p>No attendance marked yet.</p></article>`;
    return;
  }

  log.innerHTML = state.attendance
    .map(
      (item) => `
        <article class="activity-item">
          <h3>${item.course}</h3>
          <p>Marked present with code ${item.code} on ${item.date}</p>
        </article>
      `
    )
    .join("");
}

function renderExam() {
  const form = document.querySelector("#examForm");
  const scoreBox = state.cbtScore ? `<div class="score-box">Last CBT Score: ${state.cbtScore}/${examQuestions.length}</div>` : "";

  form.innerHTML =
    scoreBox +
    examQuestions
      .map(
        (question, index) => `
          <fieldset class="question-card">
            <legend><strong>${index + 1}. ${question.question}</strong></legend>
            <div class="option-list">
              ${question.options
                .map(
                  (option) => `
                    <label>
                      <input type="radio" name="question-${index}" value="${option}" required />
                      ${option}
                    </label>
                  `
                )
                .join("")}
            </div>
          </fieldset>
        `
      )
      .join("") +
    `<button type="submit">Submit CBT Exam</button>`;
}

function startTimer() {
  let seconds = 600;
  const timer = document.querySelector("#examTimer");
  setInterval(() => {
    if (seconds <= 0) return;
    seconds -= 1;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timer.textContent = `${mins}:${secs}`;
  }, 1000);
}

navItems.forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
document.querySelector("#semesterFilter").addEventListener("change", renderResults);
document.querySelector("#studentSearch").addEventListener("input", renderStudents);

document.querySelector("#resetStudentForm").addEventListener("click", resetStudentForm);

document.querySelector("#studentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const student = {
    id: data.id || crypto.randomUUID(),
    name: data.name.trim(),
    email: data.email.trim(),
    course: data.course.trim(),
    grade: data.grade.trim(),
    phone: data.phone.trim(),
    status: data.status
  };

  state.students = data.id
    ? state.students.map((item) => (item.id === data.id ? student : item))
    : [student, ...state.students];

  saveStudents();
  resetStudentForm();
  renderStudents();
});

document.querySelector("#studentsTable").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const student = state.students.find((item) => item.id === button.dataset.id);
  if (!student) return;

  if (button.dataset.action === "edit") {
    const form = document.querySelector("#studentForm");
    Object.entries(student).forEach(([key, value]) => {
      if (form.elements[key]) form.elements[key].value = value;
    });
    document.querySelector("#studentFormTitle").textContent = "Edit Student";
    setView("students");
    return;
  }

  if (confirm(`Delete ${student.name}'s record?`)) {
    state.students = state.students.filter((item) => item.id !== student.id);
    saveStudents();
    renderStudents();
  }
});

document.querySelector("#hostelForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.hostelBooking = Object.fromEntries(new FormData(event.currentTarget).entries());
  localStorage.setItem("hostelBooking", JSON.stringify(state.hostelBooking));
  renderHostel();
});

document.querySelector("#attendanceForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  state.attendance.unshift({
    ...data,
    date: new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date())
  });
  localStorage.setItem("attendanceLog", JSON.stringify(state.attendance));
  event.currentTarget.reset();
  renderAttendance();
});

document.querySelector("#examForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const score = examQuestions.reduce((total, question, index) => {
    return total + (data.get(`question-${index}`) === question.answer ? 1 : 0);
  }, 0);
  state.cbtScore = String(score);
  localStorage.setItem("cbtScore", state.cbtScore);
  document.querySelector("#cbtStatus").textContent = "Completed";
  renderExam();
});

document.querySelector("#studentName").textContent = state.student;
renderStudents();
renderResults();
renderCourses();
renderClasses();
renderHostel();
renderAttendance();
renderExam();
startTimer();
