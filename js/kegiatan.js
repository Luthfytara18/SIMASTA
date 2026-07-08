document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initFilter();
  initTambahKegiatan();
  initEditKegiatan();
});

// ====================
// SEARCH
// ====================
function initSearch() {
  const searchInput = document.getElementById("searchKegiatan");

  if (!searchInput) return;

  searchInput.addEventListener("keyup", () => {
    const keyword = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll(
      "#kegiatanTableBody tr"
    );

    rows.forEach((row) => {
      const nama = row.children[1]?.textContent.toLowerCase() || "";

      row.style.display =
        nama.includes(keyword) ? "" : "none";
    });
  });
}

// ====================
// FILTER STATUS
// ====================
function initFilter() {
  const filter = document.getElementById("filterStatus");

  if (!filter) return;

  filter.addEventListener("change", () => {
    const statusDipilih = filter.value.toLowerCase();

    const rows = document.querySelectorAll(
      "#kegiatanTableBody tr"
    );

    rows.forEach((row) => {
      const status =
row.children[5]?.textContent.trim().toLowerCase() || "";

      if (
        statusDipilih === "semua status" ||
        status === statusDipilih
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });
}

// ====================
// TAMBAH KEGIATAN
// ====================
function initTambahKegiatan() {
  const form = document.getElementById(
    "formTambahKegiatan"
  );

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "php/kegiatan/tambah.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        location.reload();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
alert("Terjadi kesalahan saat menyimpan data.");
    }
  });
}

// ====================
// EDIT KEGIATAN
// ====================
function initEditKegiatan() {
  const forms =
    document.querySelectorAll(".formEditKegiatan");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(
          "php/kegiatan/edit.php",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (result.success) {
          location.reload();
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error(error);
alert("Terjadi kesalahan saat memperbarui data.");
      }
    });
  });
}