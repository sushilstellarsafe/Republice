import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* ===== SUPABASE CLIENT ===== */
const supabase = createClient(
  "https://nfikzrukrmclmcbvysfw.supabase.co",
  "sb_publishable_AlEhg0kkie4efQeGtTGHAA_xuSHPbB9"
);

/* ===== ELEMENTS ===== */
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const signoutBtn = document.getElementById("signoutBtn");

/* ===== CHECK LOGIN STATE ===== */
document.addEventListener("DOMContentLoaded", async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // ✅ USER LOGGED IN
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (signoutBtn) signoutBtn.style.display = "inline-block";
  } else {
    // ❌ USER LOGGED OUT
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
    if (signoutBtn) signoutBtn.style.display = "none";
  }
});

/* ===== SIGN OUT ===== */
if (signoutBtn) {
  signoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}

/* ===== MOBILE MENU (tumhara existing code safe) ===== */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}
