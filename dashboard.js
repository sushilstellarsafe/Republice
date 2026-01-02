import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ================= SUPABASE ================= */
const supabase = createClient(
  "https://nfikzrukrmclmcbvysfw.supabase.co",
  "sb_publishable_AlEhg0kkie4efQeGtTGHAA_xuSHPbB9"
);

/* ================= AUTH CHECK ================= */
const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  window.location.href = "login.html";
  throw new Error("No session");
}

/* ================= BASIC SELECTORS ================= */
const nav = document.getElementById("main-nav-dropdown");
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");

/* ================= MENU TOGGLE ================= */
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && e.target !== menuBtn) {
    nav.classList.remove("active");
  }
});

/* ================= PAGE SWITCH ================= */
function showPage(pageId) {
  sections.forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(pageId);
  if (target) target.classList.add("active");
}

/* ================= NAVIGATION ================= */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    const page = link.dataset.page;

    // 🔹 REAL PAGE
    if (href && href.endsWith(".html")) {
      return;
    }

    // 🔹 DROPDOWN PARENT (Enrolled Classes)
    if (link.closest(".dropdown") && !page) {
      return;
    }

    // 🔹 SPA PAGE
    if (page && page !== "enrolled-classes-placeholder") {
      e.preventDefault();
      showPage(page);
      nav.classList.remove("active");
    }
  });
});


/* ================= PROFILE ICON ================= */
document.getElementById("profile-link").addEventListener("click", (e) => {
  e.preventDefault();
  showPage("profile");
});

/* ================= DEFAULT ================= */
showPage("dashboard");

/* ================= LOAD PROFILE ================= */
const user = session.user;

const { data: profile } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user.id)
  .single();

if (profile) {
  const name = (profile.full_name || "").split(" ");
  document.getElementById("firstName").value = name[0] || "";
  document.getElementById("lastName").value = name[1] || "";
  document.getElementById("email").value = profile.email || "";

  if (profile.photo_url) {
    document.getElementById("profilePreview").src = profile.photo_url;
    document.getElementById("headerProfileImg").src = profile.photo_url;
  }
}



/* ================= ENROLLED CLASSES DROPDOWN FIX ================= */
const dropdownParents = document.querySelectorAll(".dropdown > a");

dropdownParents.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();       // page switch रोको
    e.stopPropagation();      // menu close ना हो

    const parentLi = link.parentElement;
    parentLi.classList.toggle("open");
  });
});

