console.log("signup js loaded");

const SUPABASE_URL = "https://nfikzrukrmclmcbvysfw.supabase.co";
const SUPABASE_KEY = "sb_publishable_AlEhg0kkie4efQeGtTGHAA_xuSHPbB9";

// 👇 NAME CHANGE – PROBLEM KHATAM
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");

// 🔥 PHOTO SELECT EVENT
photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    photoInput.value = "";
    return;
  }

  if (file.size > 3 * 1024 * 1024) {
    alert("Image must be less than 3MB");
    photoInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    photoPreview.innerHTML = `
      <img src="${reader.result}" 
           style="width:100%;height:100%;object-fit:cover;border-radius:10px;">
    `;
  };
  reader.readAsDataURL(file);
});

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // 🔥 YE LINE SABSE IMPORTANT HAI
  e.stopPropagation();

  console.log("submit clicked");

  const fullName = studentName.value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const photoFile = photoInput.files[0];

  if (!photoFile) {
    alert("Please upload photo");
    return;
  }

  // SUPABASE SIGNUP
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  const reader = new FileReader();
  reader.onload = async () => {
    const { error: insertError } = await supabaseClient
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fullName,
        email,
        photo_url: reader.result,
      });

    if (insertError) {
      alert(insertError.message);
      return;
    }

    console.log("Redirecting to dashboard...");
    window.location.href = "index.html";
  };

  reader.readAsDataURL(photoFile);
});
