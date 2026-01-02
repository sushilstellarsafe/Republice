console.log("login.js loaded");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://nfikzrukrmclmcbvysfw.supabase.co",
  "sb_publishable_AlEhg0kkie4efQeGtTGHAA_xuSHPbB9"
);

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("login clicked");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  console.log("login success", data);
  window.location.href = "index.html";
});
