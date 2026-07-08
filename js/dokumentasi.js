document.addEventListener("DOMContentLoaded", () => {
  initUploadPreview();
  initValidasiUpload();
  initResetForm();
  initFilterDokumentasi();
  initPreviewDokumentasi();
});

// =========================
// PREVIEW NAMA FILE
// =========================
function initUploadPreview() {
  const input = document.getElementById("fileUpload");

  if (!input) return;

  input.addEventListener("change", function () {
    const label = document.querySelector('label[for="fileUpload"]');

    if (this.files.length > 0) {
      label.innerHTML =
        `<i class="bi bi-file-check"></i> ${this.files[0].name}`;
    } else {
      label.innerHTML =
        `<i class="bi bi-cloud-arrow-up"></i> Klik untuk pilih file (foto / PDF)`;
    }
  });
}

// =========================
// VALIDASI UPLOAD
// =========================
function initValidasiUpload() {
  const form = document.querySelector(
    'form[action="proses_upload_dokumentasi.php"]'
  );

  if (!form) return;

  form.addEventListener("submit", (e) => {
    const submitButton = form.querySelector(".btn-save");
    const kegiatan = form.querySelector(
      'select[name="id_kegiatan"]'
    );

    const file = form.querySelector(
      'input[name="file_dokumentasi"]'
    );

    if (!file) return;

    if (file.files.length === 0) {
      e.preventDefault();
      alert("Silakan pilih file dokumentasi.");
      return;
    }

    const selectedFile = file.files[0];

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf"
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      e.preventDefault();
      alert("File harus berupa JPG, PNG atau PDF.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (selectedFile.size > maxSize) {
      e.preventDefault();
      alert("Ukuran file maksimal 5 MB.");
      return;
    }
    submitButton.disabled = true;

    submitButton.innerHTML =
    `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Mengupload...
`   ;
  });
}

// =========================
// RESET FORM SAAT MODAL DITUTUP
// =========================
function initResetForm() {
  const modal = document.getElementById("modalUploadDokumentasi");

  if (!modal) return;

  modal.addEventListener("hidden.bs.modal", () => {

    const form = modal.querySelector("form");

    form.reset();

const label = document.querySelector('label[for="fileUpload"]');

label.innerHTML =
`<i class="bi bi-cloud-arrow-up"></i> Klik untuk pilih file (foto / PDF)`;

document.getElementById("previewImage").src = "";
document.getElementById("previewPdf").src = "";

  });
}

// =========================
// FILTER DOKUMENTASI
// =========================
function initFilterDokumentasi() {

    const filterKegiatan =
        document.getElementById("filterKegiatan");

    const filterTipe =
        document.getElementById("filterTipe");

    const cards =
        document.querySelectorAll(".doc-card");

    if (!filterKegiatan || !filterTipe) return;

    function filterData() {

        const kegiatan =
            filterKegiatan.value;

        const tipe =
            filterTipe.value;

        cards.forEach((card) => {

            const cardKegiatan =
                card.dataset.kegiatan;

            const cardTipe =
                card.dataset.tipe;

            const cocokKegiatan =
                kegiatan === "Semua kegiatan" ||
                cardKegiatan === kegiatan;

            const cocokTipe =
                tipe === "Semua tipe" ||
                cardTipe === tipe;

            if (cocokKegiatan && cocokTipe) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    }

    filterKegiatan.addEventListener("change", filterData);

    filterTipe.addEventListener("change", filterData);

}

// =========================
// PREVIEW DOKUMENTASI
// =========================
function initPreviewDokumentasi() {

  const modal = new bootstrap.Modal(
    document.getElementById("modalPreviewDokumentasi")
  );

  const previewImage = document.getElementById("previewImage");
  const previewPdf = document.getElementById("previewPdf");
  const previewTitle = document.getElementById("previewTitle");

  document.querySelectorAll(".doc-card").forEach((card) => {

    const eyeButton = card.querySelector(".bi-eye")?.closest("button");

    if (!eyeButton) return;

    eyeButton.addEventListener("click", () => {

      const file = card.dataset.file;
      const tipe = card.dataset.tipe;
      const nama = card.querySelector(".doc-filename").textContent;

      previewTitle.textContent = nama;

      previewImage.classList.add("d-none");
      previewPdf.classList.add("d-none");

      if (tipe === "PDF") {

        previewPdf.src = file;
        previewPdf.classList.remove("d-none");

      } else {

        previewImage.src = file;
        previewImage.classList.remove("d-none");

      }

      modal.show();

    });

  });

}