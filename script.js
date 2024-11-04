// Simulated user data and role
const currentUserRole = 'Admin';
let leaveBalance = 5;
let leaveHistory = [];
let notifications = [
  "Your leave request has been approved.",
  "New attendance policy update.",
  "Upcoming holiday on November 30th."
];

// Show the specified section and hide others
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

// Apply role-based permissions
function isAdmin() {
  return currentUserRole === 'Admin';
}

// Generate notifications on the dashboard
function generateNotifications() {
  const notificationList = document.getElementById('notificationList');
  notifications.forEach(notification => {
    const listItem = document.createElement('li');
    listItem.innerText = notification;
    notificationList.appendChild(listItem);
  });
}
generateNotifications();

function generateCalendar(month, year) {
  const calendarDiv = document.getElementById('calendar');
  calendarDiv.innerHTML = '';
  for (let day = 1; day <= 30; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.innerText = `Day ${day}`;
    if (isAdmin()) dayElement.onclick = () => markAttendance(dayElement);
    calendarDiv.appendChild(dayElement);
  }
}

function markAttendance(dayElement) {
  const currentStatus = dayElement.getAttribute('data-status') || 'Absent';
  const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
  dayElement.setAttribute('data-status', newStatus);
  dayElement.classList.toggle('present');
  updateAttendanceCounts();
}

function updateAttendanceCounts() {
  const days = document.querySelectorAll('.day');
  let daysAttended = 0;
  days.forEach(day => {
    if (day.getAttribute('data-status') === 'Present') daysAttended++;
  });
  document.getElementById('daysAttended').innerText = daysAttended;
  document.getElementById('leavesTaken').innerText = 30 - daysAttended;
}

// Filter attendance by date range
function filterAttendance() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  alert(`Filtering attendance from ${startDate} to ${endDate}`);
}

generateCalendar(10, 2024);

// Leave application form submission
function applyForLeave(event) {
  event.preventDefault();
  if (leaveBalance <= 0) return alert('No remaining leave balance.');

  const leaveType = document.getElementById('leaveType').value;
  const startDate = document.getElementById('leaveStartDate').value;
  const endDate = document.getElementById('leaveEndDate').value;
  const reason = document.getElementById('reason').value;

  const leaveRequest = {
    id: leaveHistory.length + 1,
    type: leaveType,
    startDate,
    endDate,
    reason,
    status: 'Pending'
  };
  leaveHistory.push(leaveRequest);
  leaveBalance--;
  document.getElementById('leaveBalance').innerText = leaveBalance;
  displayLeaveHistory();
}

function displayLeaveHistory() {
  const leaveHistoryDiv = document.getElementById('leaveHistory');
  leaveHistoryDiv.innerHTML = '';
  leaveHistory.forEach(request => {
    const requestDiv = document.createElement('div');
    requestDiv.classList.add('leave-request');
    requestDiv.innerHTML = `<p>ID: ${request.id} - ${request.type} from ${request.startDate} to ${request.endDate} - Status: ${request.status}</p>`;
    leaveHistoryDiv.appendChild(requestDiv);
  });
}
displayLeaveHistory();

// Enable editing in the profile section
function enableEditing() {
  document.querySelectorAll('#profile input').forEach(input => {
    input.removeAttribute('readonly');
  });
  document.getElementById('saveButton').style.display = 'inline';
}

// Save profile information
function saveProfile() {
  document.querySelectorAll('#profile input').forEach(input => {
    input.setAttribute('readonly', true);
  });
  document.getElementById('saveButton').style.display = 'none';
  alert('Profile updated successfully!');
}

// Manage courses
function addCourse() {
  const courseList = document.getElementById('courseList');
  const newCourse = prompt("Enter new course name:");
  if (newCourse) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${newCourse} - <a href="#">View Syllabus</a> <button onclick="editCourse(this)">Edit</button> <button onclick="deleteCourse(this)">Delete</button>`;
    courseList.appendChild(listItem);
  }
}

function editCourse(button) {
  const courseName = prompt("Edit course name:", button.parentElement.firstChild.textContent.trim());
  if (courseName) {
    button.parentElement.firstChild.textContent = courseName + ' - ';
  }
}

function deleteCourse(button) {
  if (confirm("Are you sure you want to delete this course?")) {
    button.parentElement.remove();
  }
}


