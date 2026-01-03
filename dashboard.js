import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nfikzrukrmclmcbvysfw.supabase.co",
  "sb_publishable_AlEhg0kkie4efQeGtTGHAA_xuSHPbB9"
);

document.addEventListener("DOMContentLoaded", async () => {

  /* ================= AUTH CHECK ================= */
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const user = session.user;

  /* ================= FETCH PROFILE ================= */
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)   
    .single();

  if (profile) {
    document.getElementById("firstName").value =
      profile.full_name?.split(" ")[0] || "";

    document.getElementById("lastName").value =
      profile.full_name?.split(" ")[1] || "";

    document.getElementById("email").value = profile.email || "";

    if (profile.photo_url) {
      document.getElementById("profilePreview").src = profile.photo_url;
      document.getElementById("headerProfileImg").src = profile.photo_url;
    }
  }


  if (profile) {

  // ===== TEXT DATA =====
  document.getElementById("firstName").value =
    profile.full_name?.split(" ")[0] || "";

  document.getElementById("lastName").value =
    profile.full_name?.split(" ")[1] || "";

  document.getElementById("email").value = profile.email || "";

  // ===== IMAGE FIX (IMPORTANT) =====
  const headerImg = document.getElementById("headerProfileImg");
  const profileImg = document.getElementById("profilePreview");

  if (profile.photo_url) {
    headerImg.src = profile.photo_url;
    profileImg.src = profile.photo_url;

    headerImg.style.display = "block";
    profileImg.style.display = "block";
  } else {
    // fallback avatar (optional but recommended)
    headerImg.src = "default-avatar.png";
    profileImg.src = "default-avatar.png";

    headerImg.style.display = "block";
    profileImg.style.display = "block";
  }
}


  /* ================= MENU ================= */
 /* ========== MENU FIX (DESKTOP + MOBILE) ========== */

const menuBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav-dropdown");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  nav.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}


/* ===== PROFILE ICON CLICK ===== */
const profileLink = document.getElementById("profile-link");

if (profileLink) {
  profileLink.addEventListener("click", () => {
    showPage("profile");   // 🔥 profile section open
    navDropdown.classList.remove("active");
  });
}


  /* ================= PAGE SWITCH ================= */
  const sections = document.querySelectorAll(".content-section");
  const navLinks = document.querySelectorAll(".nav-link");

  function showPage(pageId) {
    sections.forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
      window.scrollTo(0, 0);

      if (pageId === "dashboard") {
        renderCalendar(); // 🔥 FORCE render
      }
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const page = link.getAttribute("data-page");

      if (href && href.includes("index.html")) return;

      e.preventDefault();
      if (!page) return;

      showPage(page);
      navDropdown.classList.remove("active");
    });
  });

  /* ================= CALENDAR ================= */
  const calendarGrid = document.getElementById("calendarGrid");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");

  let currentDate = new Date();

  function renderCalendar() {
    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    currentMonthYear.innerText =
      currentDate.toLocaleString("default", { month: "long" }) + " " + year;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
      const d = document.createElement("div");
      d.className = "day-name";
      d.innerText = day;
      calendarGrid.appendChild(d);
    });

    for (let i = 0; i < firstDay; i++) {
      calendarGrid.appendChild(document.createElement("div"));
    }

    for (let d = 1; d <= lastDate; d++) {
      const dateDiv = document.createElement("div");
      dateDiv.className = "date";
      dateDiv.innerText = d;

      if (
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dateDiv.classList.add("today");
      }

      calendarGrid.appendChild(dateDiv);
    }
  }

  prevMonthBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  /* ================= DEFAULT PAGE ================= */
  showPage("dashboard"); // 🔥 now calendar WILL load
  const enrolledToggle = document.querySelector(".enrolled-toggle");
const enrolledDropdown = document.getElementById("enrolled-classes-dropdown");

enrolledToggle.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  enrolledDropdown.classList.toggle("open");
});


});

/* ================= ENROLLED CLASSES DROPDOWN FIX ================= */
// const dropdownParents = document.querySelectorAll(".dropdown > a");

// dropdownParents.forEach((link) => {
//   link.addEventListener("click", (e) => {
//     e.preventDefault();       
//     e.stopPropagation();      

//     const parentLi = link.parentElement;
//     parentLi.classList.toggle("open");
//   });
// });


// 🔹 AUTO CLOSE MENU ON CLICK
const menuToggle = document.getElementById("menu-toggle");
const mainMenu = document.getElementById("main-nav-dropdown");

// sabhi menu links pakdo
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mainMenu.classList.remove("active");
  });
});

// enrolled classes ke andar jo <a> hai unke liye bhi
document.querySelectorAll(".dropdown-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mainMenu.classList.remove("active");
  });
});

