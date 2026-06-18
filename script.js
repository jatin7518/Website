/* =========================
   ROLE CHECK ON LOAD
   ========================= */
const role = localStorage.getItem("role");

// agar login nahi hai to login page
if (!role) {
  window.location = "login.html";
}

/* =========================
   SHOW PANEL FUNCTION
   ========================= */
function showPanel(panelId) {

  // ROLE BASED BLOCKING
  if (role === "student" && (panelId === "teacher-db" || panelId === "admin-panel")) {
    alert("Access Denied");
    return;
  }

  if (role === "teacher" && panelId === "admin-panel") {
    alert("Access Denied");
    return;
  }

  // hide all panels
  document.querySelectorAll('.panel').forEach(panel => {
    panel.style.display = 'none';
  });

  // show allowed panel
  const activePanel = document.getElementById(panelId);
  if (activePanel) {
    activePanel.style.display = 'block';
  }

  // active menu highlight
  document.querySelectorAll('.sidebar li').forEach(li => {
    li.classList.remove('active-menu');
  });

  const clicked = document.querySelector(
    `.sidebar li[onclick="showPanel('${panelId}')"]`
  );
  if (clicked) clicked.classList.add('active-menu');
}

/* =========================
   DEFAULT PANEL
   ========================= */
window.onload = function () {
  showPanel('notice-board');
};

/* =========================
   LOGOUT (FIXED)
   ========================= */
function logout() {
  localStorage.removeItem("role");
  window.location.href = "login.html";
}
/* =========================
   ROLE BASED MENU HIDE
   ========================= */
window.addEventListener("DOMContentLoaded", function () {

  const role = localStorage.getItem("role");

  const studentMenu = document.querySelector(
    ".sidebar li[onclick=\"showPanel('student-db')\"]"
  );
  const teacherMenu = document.querySelector(
    ".sidebar li[onclick=\"showPanel('teacher-db')\"]"
  );
  const adminMenu = document.querySelector(
    ".sidebar li[onclick=\"showPanel('admin-panel')\"]"
  );

  // STUDENT LOGIN
  if (role === "student") {
    if (teacherMenu) teacherMenu.style.display = "none";
    if (adminMenu) adminMenu.style.display = "none";
  }

  // TEACHER LOGIN
  if (role === "teacher") {
    if (adminMenu) adminMenu.style.display = "none";
  }

  // PRINCIPAL -> sab dikhega
});
