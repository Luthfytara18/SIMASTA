document.addEventListener("DOMContentLoaded", () => {
  loadKegiatanOptions();
  loadDokumentasi();
  initFilterDokumentasi();
  initUploadPreview();
  initValidasiUpload();
  initResetForm();
});

// LOAD KEGIATAN OPTIONS (filter + form)
async function loadKegiatanOptions() {
  try {
    const response = await fetch("php/kegiatan/get-list.php");
    if (!response.ok) throw new Error("Gagal memuat daftar kegiatan.");
    const kegiatan = await response.json();

    // 1. Filter dropdown
    const filterSelect = document.getElementById("filterKegiatan");
    if (filterSelect) {
      filterSelect.innerHTML = `<option value="Semua kegiatan">Semua kegiatan</option>`;
      kegiatan.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.nama_kegiatan;
        opt.textContent = item.nama_kegiatan;
        filterSelect.appendChild(opt);
      });
    }

    // 2. Form dropdown (upload dokumentasi)
    const formSelect = document.getElementById("uploadKegiatanSelect");
    if (formSelect) {
      formSelect.innerHTML = `<option value="">Pilih kegiatan</option>`;
      kegiatan.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.nama_kegiatan;
        formSelect.appendChild(opt);
      });
    }
  } catch (error) {
    console.error("Gagal memuat opsi kegiatan:", error);
  }
}

// LOAD DOKUMENTASI
async function loadDokumentasi(
  filterKeg = "Semua kegiatan",
  filterTipe = "Semua tipe",
) {
  const grid = document.querySelector(".dokumentasi-grid");
  if (!grid) return;
  grid.innerHTML = '<div class="col-12 text-center py-5">Memuat data...</div>';

  try {
    let url = "php/dokumentasi/get-data.php";
    const params = new URLSearchParams();
    if (filterKeg && filterKeg !== "Semua kegiatan")
      params.append("filter_kegiatan", filterKeg);
    if (filterTipe && filterTipe !== "Semua tipe")
      params.append("filter_tipe", filterTipe);
    if (params.toString()) url += "?" + params.toString();

    const response = await fetch(url);
    const data = await response.json();

    if (!data.length) {
      grid.innerHTML =
        '<div class="col-12 text-center py-5">Tidak ada dokumentasi.</div>';
      return;
    }

    let html = "";
    data.forEach((item) => {
      const isPdf = item.tipe_file.toUpperCase() === "PDF";
      const iconClass = isPdf ? "bi-filetype-pdf" : "bi-image";
      const thumbClass = isPdf ? "doc-thumb-pdf" : "";
      const ext = item.tipe_file.toUpperCase();
      const tanggal = formatDate(item.tanggal_upload || item.created_at);

      html += `
        <div class="doc-card" data-id="${item.id}" data-kegiatan="${item.nama_kegiatan}" data-tipe="${ext}" data-file="${item.path_file}">
          <div class="doc-thumb ${thumbClass}">
            <i class="bi ${iconClass}"></i>
          </div>
          <div class="doc-filename">${item.nama_file}</div>
          <div class="doc-meta">${ext} &middot; ${tanggal}</div>
          <div class="doc-actions">
            <button class="btn-icon-plain btn-preview"><i class="bi bi-eye"></i></button>
            <button class="btn-icon-plain"><i class="bi bi-download"></i></button>
            <button class="btn-icon-plain text-danger" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalHapusDok">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
    grid.innerHTML = html;

    // Re-attach preview event setelah render
    initPreviewDokumentasi();
  } catch (error) {
    console.error("Gagal load dokumentasi:", error);
    grid.innerHTML =
      '<div class="col-12 text-center py-5 text-danger">Gagal memuat data.</div>';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// FILTER DOKUMENTASI
function initFilterDokumentasi() {
  const filterKeg = document.getElementById("filterKegiatan");
  const filterTipe = document.getElementById("filterTipe");
  if (!filterKeg || !filterTipe) return;

  function applyFilter() {
    loadDokumentasi(filterKeg.value, filterTipe.value);
  }

  filterKeg.addEventListener("change", applyFilter);
  filterTipe.addEventListener("change", applyFilter);
}

// UPLOAD PREVIEW NAMA FILE
function initUploadPreview() {
  const input = document.getElementById("fileUpload");
  if (!input) return;

  input.addEventListener("change", function () {
    const label = document.querySelector('label[for="fileUpload"]');
    if (this.files.length > 0) {
      label.innerHTML = `<i class="bi bi-file-check"></i> ${this.files[0].name}`;
    } else {
      label.innerHTML = `<i class="bi bi-cloud-arrow-up"></i> Klik untuk pilih file (foto / PDF)`;
    }
  });
}

// VALIDASI UPLOAD
function initValidasiUpload() {
  const form = document.querySelector(
    'form[action="php/kegiatan/proses_upload_dokumentasi.php"]',
  );
  if (!form) return;

  form.addEventListener("submit", (e) => {
    const file = form.querySelector('input[name="file_dokumentasi"]');
    if (!file || file.files.length === 0) {
      e.preventDefault();
      alert("Silakan pilih file dokumentasi.");
      return;
    }

    const selectedFile = file.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      e.preventDefault();
      alert("File harus berupa JPG, PNG atau PDF.");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      e.preventDefault();
      alert("Ukuran file maksimal 5 MB.");
      return;
    }
  });
}

// RESET FORM SAAT MODAL DITUTUP
function initResetForm() {
  const modal = document.getElementById("modalUploadDokumentasi");
  if (!modal) return;

  modal.addEventListener("hidden.bs.modal", () => {
    const form = modal.querySelector("form");
    if (form) form.reset();
    const label = document.querySelector('label[for="fileUpload"]');
    if (label) {
      label.innerHTML = `<i class="bi bi-cloud-arrow-up"></i> Klik untuk pilih file (foto / PDF)`;
    }
  });
}

// PREVIEW DOKUMENTASI
function initPreviewDokumentasi() {
  const modal = new bootstrap.Modal(
    document.getElementById("modalPreviewDokumentasi"),
  );
  const previewImage = document.getElementById("previewImage");
  const previewPdf = document.getElementById("previewPdf");
  const previewTitle = document.getElementById("previewTitle");

  document.querySelectorAll(".doc-card .btn-preview").forEach((btn) => {
    btn.addEventListener("click", function () {
      const card = this.closest(".doc-card");
      if (!card) return;
      const file = card.dataset.file;
      const tipe = card.dataset.tipe;
      const nama = card.querySelector(".doc-filename")?.textContent || "File";

      previewTitle.textContent = nama;
      previewImage.classList.add("d-none");
      previewPdf.classList.add("d-none");

      if (tipe === "PDF") {
        previewPdf.src = file;
        previewPdf.classList.remove("d-none");
      } else {
        // Tambah prefix path agar gambar ditemukan dari root simasta/
        previewImage.src = file.startsWith("http")
          ? file
          : "/" + "simasta/" + file;
        previewImage.classList.remove("d-none");
      }
      modal.show();
    });
  });
}

// DOWNLOAD DOKUMENTASI
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-icon-plain .bi-download");
  if (!btn) return;
  const card = e.target.closest(".doc-card");
  if (!card) return;
  const file = card.dataset.file;
  const nama = card.querySelector(".doc-filename")?.textContent || "dokumen";

  const link = document.createElement("a");
  link.href = file;
  link.download = nama;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// HAPUS MODAL - Set link (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest('[data-bs-target="#modalHapusDok"]');
  if (!btn) return;

  const id = btn.dataset.id;
  if (!id) return;

  const card = btn.closest(".doc-card");
  const nama = card
    ? card.querySelector(".doc-filename")?.textContent.trim() || "file"
    : "file";

  document.getElementById("hapusDokText").textContent =
    `"${nama}" akan dihapus permanen.`;
  document.getElementById("hapusDokLink").href =
    `/simasta/php/dokumentasi/proses_hapus_dokumentasi.php?id=${id}`;
});
