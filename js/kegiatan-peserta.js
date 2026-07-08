document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initFilter();
  initValidation();
});

// ==========================
// SEARCH PESERTA
// ==========================
function initSearch() {
  const search = document.getElementById("searchKegiatanPeserta");

  if (!search) return;

  search.addEventListener("keyup", () => {
    const keyword = search.value.toLowerCase();

    const rows = document.querySelectorAll(
      "#kegiatanPesertaTableBody tr"
    );

    rows.forEach((row) => {
      const nama = row.children[1]?.textContent.toLowerCase() || "";
const kegiatan = row.children[2]?.textContent.toLowerCase() || "";
const keterangan = row.children[3]?.textContent.toLowerCase() || "";

      const cocok =
        nama.includes(keyword) ||
        kegiatan.includes(keyword) ||
        keterangan.includes(keyword);

      row.style.display = cocok ? "" : "none";
    });
  });
}

// ==========================
// FILTER KEGIATAN
// ==========================
function initFilter() {
  const filter = document.getElementById("filterKegiatan");

  if (!filter) return;

  filter.addEventListener("change", () => {
    const value = filter.value.toLowerCase();

    const rows = document.querySelectorAll(
      "#kegiatanPesertaTableBody tr"
    );

    rows.forEach((row) => {
      const kegiatan = row.children[2]?.textContent.toLowerCase() || "";

      if (
        value === "semua kegiatan" ||
        kegiatan === value
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
}

// ==========================
// VALIDASI FORM
// ==========================
function initValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const kegiatan = form.querySelector(
        'select[name="id_kegiatan"]'
      );

      const peserta = form.querySelector(
        'select[name="id_peserta"]'
      );

      const keterangan = form.querySelector(
        'input[name="keterangan"]'
      );

      if (kegiatan && kegiatan.value === "") {
        e.preventDefault();
        alert("Silakan pilih kegiatan.");
        return;
      }

      if (peserta && peserta.value === "") {
        e.preventDefault();
        alert("Silakan pilih peserta.");
        return;
      }

      if (
        keterangan &&
        keterangan.value.trim() === ""
      ) {
        e.preventDefault();
        alert("Keterangan wajib diisi.");
        return;
      }
    });
  });
}