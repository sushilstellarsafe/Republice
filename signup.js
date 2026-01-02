document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registrationForm");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");

  let uploadedImage = "";

  /* ================= PHOTO PREVIEW ================= */
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert("Photo must be less than 3MB");
      photoInput.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage = reader.result;
      photoPreview.innerHTML = `<img src="${uploadedImage}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`;
    };
    reader.readAsDataURL(file);
  });

  /* ================= FORM SUBMIT ================= */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("studentName").value.trim();
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value.trim();

    if (!uploadedImage) {
      alert("Please upload photo");
      return;
    }

    // 🔥 Split full name for dashboard
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    /* ================= SAVE FOR DASHBOARD ================= */
    const profileData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: uploadedImage,
      dob: dob
    };

    localStorage.setItem("profileData", JSON.stringify(profileData));

    // optional: signup flag
    localStorage.setItem("isLoggedIn", "true");

    // 👉 Redirect to dashboard
    window.location.href = "dashboard.html";
  });

});
