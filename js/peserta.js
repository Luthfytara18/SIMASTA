document.addEventListener("DOMContentLoaded", () => {
  initSearchPeserta();
  initValidasiForm();
});

// =========================
// SEARCH PESERTA
// =========================
function initSearchPeserta() {
  const searchInput = document.getElementById("searchPeserta");

  if (!searchInput) return;

  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll(
      "#pesertaTableBody tr"
    );

    rows.forEach((row) => {
      const nama = row.children[1].textContent.toLowerCase();
      const nimNip = row.children[2].textContent.toLowerCase();
      const email = row.children[4].textContent.toLowerCase();

      const cocok =
        nama.includes(keyword) ||
        nimNip.includes(keyword) ||
        email.includes(keyword);

      row.style.display = cocok ? "" : "none";
    });
  });
}

// =========================
// VALIDASI FORM
// =========================
function initValidasiForm() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const nama = form.querySelector(
        'input[name="nama_peserta"]'
      );

      const nimNip = form.querySelector(
        'input[name="nim_nip"]'
      );

      const email = form.querySelector(
        'input[name="email"]'
      );

      if (!nama || !nimNip || !email) return;

      if (
        nama.value.trim() === "" ||
        nimNip.value.trim() === "" ||
        email.value.trim() === ""
      ) {
        e.preventDefault();
        alert("Semua field wajib diisi.");
        return;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email.value)) {
        e.preventDefault();
        alert("Format email tidak valid.");
        return;
      }

      if (nimNip.value.length < 5) {
        e.preventDefault();
        alert("NIM / NIP tidak valid.");
      }
    });
  });
}