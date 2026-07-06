document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const loginError = document.getElementById("loginError");

  if (!loginForm) return;

  // =========================
  // TOGGLE PASSWORD
  // =========================
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    togglePassword.classList.toggle("bi-eye");
    togglePassword.classList.toggle("bi-eye-slash");
  });

  // =========================
  // LOGIN
  // =========================
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    loginError.classList.add("d-none");

    let isValid = true;

    if (usernameInput.value.trim() === "") {
      usernameInput.classList.add("is-invalid");
      isValid = false;
    } else {
      usernameInput.classList.remove("is-invalid");
    }

    if (passwordInput.value.trim() === "") {
      passwordInput.classList.add("is-invalid");
      isValid = false;
    } else {
      passwordInput.classList.remove("is-invalid");
    }

    if (!isValid) return;

    try {
      const response = await fetch("php/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameInput.value.trim(),
          password: passwordInput.value.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = "dashboard.html";
      } else {
        loginError.classList.remove("d-none");
      }
    } catch (error) {
      console.error("Login Error:", error);
      loginError.classList.remove("d-none");
    }
  });

  // =========================
  // HAPUS ERROR SAAT MENGETIK
  // =========================
  usernameInput.addEventListener("input", () => {
    usernameInput.classList.remove("is-invalid");
    loginError.classList.add("d-none");
  });

  passwordInput.addEventListener("input", () => {
    passwordInput.classList.remove("is-invalid");
    loginError.classList.add("d-none");
  });
});