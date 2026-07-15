document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ index.js loaded!");

  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const loginError = document.getElementById("loginError");

  if (!loginForm) {
    console.error("❌ Form login tidak ditemukan!");
    return;
  }

  console.log("✅ Form login ditemukan");

  // Toggle Password
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      this.classList.toggle("bi-eye");
      this.classList.toggle("bi-eye-slash");
    });
  }

  // Login
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("🔵 Tombol login diklik!");

    loginError.classList.add("d-none");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "" || password === "") {
      loginError.textContent = "Username dan password wajib diisi.";
      loginError.classList.remove("d-none");
      return;
    }

    try {
      console.log("🟡 Mengirim request ke login.php...");
      const response = await fetch("php/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      console.log("🟢 Response dari server:", result);

      if (result.success) {
        console.log("✅ Login berhasil, redirect ke dashboard...");
        window.location.replace("dashboard.html");
      } else {
        loginError.textContent =
          result.message || "Username atau password salah.";
        loginError.classList.remove("d-none");
      }
    } catch (error) {
      console.error("🔴 Error:", error);
      loginError.textContent = "Terjadi kesalahan. Coba lagi.";
      loginError.classList.remove("d-none");
    }
  });

  // Hapus error saat mengetik
  usernameInput.addEventListener("input", function () {
    this.classList.remove("is-invalid");
    loginError.classList.add("d-none");
  });

  passwordInput.addEventListener("input", function () {
    this.classList.remove("is-invalid");
    loginError.classList.add("d-none");
  });
});
