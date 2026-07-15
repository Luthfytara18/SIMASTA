document.addEventListener("DOMContentLoaded", () => {
  loadKegiatan();
  initSearch();
  initFilter();
  initTambahKegiatan();
});

// LOAD DATA KEGIATAN
async function loadKegiatan(search = "", status = "") {
  const tbody = document.getElementById("kegiatanTableBody");
  tbody.innerHTML =
    '<tr><td colspan="6" class="text-center">Memuat data...</td></tr>';

  try {
    let url = "php/kegiatan/get-data.php";
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status && status !== "Semua status") params.append("status", status);
    if (params.toString()) url += "?" + params.toString();

    const response = await fetch(url);
    const data = await response.json();

    if (!data.length) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="text-center">Tidak ada data kegiatan.</td></tr>';
      return;
    }

    let html = "";
    data.forEach((item, index) => {
      const statusBadge = getStatusBadge(item.status);
      html += `
        <tr data-id="${item.id}" data-tanggal-mulai="${item.tanggal_mulai}" data-tanggal-selesai="${item.tanggal_selesai}" data-deskripsi="${(item.deskripsi || "").replace(/"/g, "&quot;")}">
          <td>${index + 1}</td>
          <td>${item.nama_kegiatan}</td>
          <td>${formatDate(item.tanggal_mulai)}</td>
          <td>${item.lokasi}</td>
          <td>
            <div class="action-btns">
              <button class="btn-icon btn-edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalEditKegiatan">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn-icon btn-delete" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalHapusKegiatan">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
          <td>${statusBadge}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  } catch (error) {
    console.error("Gagal load kegiatan:", error);
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center text-danger">Gagal memuat data.</td></tr>';
  }
}

function getStatusBadge(status) {
  const map = {
    berlangsung: "badge-berlangsung",
    selesai: "badge-selesai",
    terjadwal: "badge-terjadwal",
  };
  const cls = map[status.toLowerCase()] || "badge-terjadwal";
  return `<span class="badge-status ${cls}">${status}</span>`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// SEARCH
function initSearch() {
  const searchInput = document.getElementById("searchKegiatan");
  if (!searchInput) return;
  let timer;
  searchInput.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const keyword = searchInput.value.trim();
      const status = document.getElementById("filterStatus").value;
      loadKegiatan(keyword, status);
    }, 300);
  });
}

// FILTER STATUS
function initFilter() {
  const filter = document.getElementById("filterStatus");
  if (!filter) return;
  filter.addEventListener("change", () => {
    const keyword = document.getElementById("searchKegiatan").value.trim();
    loadKegiatan(keyword, filter.value);
  });
}

// TAMBAH KEGIATAN (fetch)
function initTambahKegiatan() {
  const form = document.getElementById("formTambahKegiatan");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch("php/kegiatan/tambah.php", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("modalTambahKegiatan"),
        );
        if (modal) modal.hide();
        loadKegiatan();
        form.reset();
        showToast(
          result.message || "Kegiatan berhasil ditambahkan.",
          "success",
        );
      } else {
        showToast(result.message || "Gagal menambahkan kegiatan.", "error");
      }
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan saat menyimpan data.", "error");
    }
  });
}

// EDIT MODAL - Isi data (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest(
    '.btn-edit[data-bs-target="#modalEditKegiatan"]',
  );
  if (!btn) return;
  const row = btn.closest("tr");
  if (!row) return;
  const id = row.dataset.id;
  const nama = row.querySelector("td:nth-child(2)").textContent.trim();
  const tanggalMulai = row.dataset.tanggalMulai;
  const tanggalSelesai = row.dataset.tanggalSelesai;
  const lokasi = row.querySelector("td:nth-child(4)").textContent.trim();
  const statusBadge = row.querySelector("td:last-child .badge-status");
  const status = statusBadge
    ? statusBadge.textContent.trim().toLowerCase()
    : "terjadwal";

  document.getElementById("editKegiatanId").value = id;
  document.getElementById("editKegiatanNama").value = nama;
  document.getElementById("editKegiatanDeskripsi").value =
    row.dataset.deskripsi || "";
  document.getElementById("editKegiatanMulai").value = tanggalMulai;
  document.getElementById("editKegiatanSelesai").value = tanggalSelesai;
  document.getElementById("editKegiatanLokasi").value = lokasi;
  document.getElementById("editKegiatanStatus").value = status;
});

// HAPUS MODAL - Set link (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest(
    '.btn-delete[data-bs-target="#modalHapusKegiatan"]',
  );
  if (!btn) return;
  const row = btn.closest("tr");
  const id = btn.dataset.id;
  const nama = row
    ? row.querySelector("td:nth-child(2)").textContent.trim()
    : "Kegiatan";
  document.getElementById("hapusKegiatanText").textContent =
    `"${nama}" akan dihapus permanen.`;
  document.getElementById("hapusKegiatanLink").href =
    `php/kegiatan/proses_hapus_kegiatan.php?id=${id}`;
});
