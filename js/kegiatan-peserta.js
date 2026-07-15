document.addEventListener("DOMContentLoaded", () => {
  loadDropdownOptions();
  loadKegiatanPeserta();
  initSearch();
  initFilter();
  initValidation();
});

// LOAD DROPDOWN OPTIONS (filter kegiatan, form kegiatan & peserta)
async function loadDropdownOptions() {
  try {
    // 1. Load kegiatan untuk filter + form
    const respKeg = await fetch("php/kegiatan/get-list.php");
    if (!respKeg.ok) throw new Error("Gagal memuat daftar kegiatan.");
    const kegiatan = await respKeg.json();

    // Filter dropdown
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

    // Form dropdown kegiatan
    const formKegSelect = document.getElementById("tambahKegiatanSelect");
    if (formKegSelect) {
      formKegSelect.innerHTML = `<option value="">Pilih kegiatan</option>`;
      kegiatan.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = item.nama_kegiatan;
        formKegSelect.appendChild(opt);
      });
    }

    // 2. Load peserta untuk form dropdown
    const respPes = await fetch("php/peserta/get-list.php");
    if (!respPes.ok) throw new Error("Gagal memuat daftar peserta.");
    const peserta = await respPes.json();

    const formPesSelect = document.getElementById("tambahPesertaSelect");
    if (formPesSelect) {
      formPesSelect.innerHTML = `<option value="">Pilih peserta</option>`;
      peserta.forEach((item) => {
        const opt = document.createElement("option");
        opt.value = item.id;
        opt.textContent = `${item.nama_peserta} - ${item.nim_nip || ""}`;
        formPesSelect.appendChild(opt);
      });
    }
  } catch (error) {
    console.error("Gagal memuat opsi dropdown:", error);
  }
}

// LOAD DATA KEGIATAN PESERTA
async function loadKegiatanPeserta(search = "", filterKeg = "Semua kegiatan") {
  const tbody = document.getElementById("kegiatanPesertaTableBody");
  tbody.innerHTML =
    '<tr><td colspan="5" class="text-center">Memuat data...</td></tr>';

  try {
    let url = "php/kegiatan-peserta/get-data.php";
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (filterKeg && filterKeg !== "Semua kegiatan")
      params.append("filter_kegiatan", filterKeg);
    if (params.toString()) url += "?" + params.toString();

    const response = await fetch(url);
    const data = await response.json();

    if (!data.length) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="text-center">Tidak ada data.</td></tr>';
      return;
    }

    let html = "";
    data.forEach((item, index) => {
      html += `
        <tr data-id="${item.id}" data-nama-peserta="${item.nama_peserta}">
          <td>${index + 1}</td>
          <td>${item.nama_peserta}</td>
          <td>${item.nama_kegiatan}</td>
          <td>${item.keterangan || "-"}</td>
          <td>
            <div class="action-btns">
              <button class="btn-icon btn-edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalEditKP">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn-icon btn-delete" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalHapusKP">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  } catch (error) {
    console.error("Gagal load data:", error);
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center text-danger">Gagal memuat data.</td></tr>';
  }
}

// SEARCH
function initSearch() {
  const search = document.getElementById("searchKegiatanPeserta");
  if (!search) return;
  let timer;
  search.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const keyword = search.value.trim();
      const filterKeg = document.getElementById("filterKegiatan").value;
      loadKegiatanPeserta(keyword, filterKeg);
    }, 300);
  });
}

// FILTER KEGIATAN
function initFilter() {
  const filter = document.getElementById("filterKegiatan");
  if (!filter) return;
  filter.addEventListener("change", () => {
    const keyword = document
      .getElementById("searchKegiatanPeserta")
      .value.trim();
    loadKegiatanPeserta(keyword, filter.value);
  });
}

// VALIDASI FORM (dari kode lama)
function initValidation() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const kegiatan = form.querySelector('select[name="id_kegiatan"]');
      const peserta = form.querySelector('select[name="id_peserta"]');
      const keterangan = form.querySelector('input[name="keterangan"]');

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
      if (keterangan && keterangan.value.trim() === "") {
        e.preventDefault();
        alert("Keterangan wajib diisi.");
        return;
      }
    });
  });
}

// EDIT MODAL - Isi data (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest('.btn-edit[data-bs-target="#modalEditKP"]');
  if (!btn) return;
  const row = btn.closest("tr");
  if (!row) return;
  const id = btn.dataset.id;
  const nama =
    row.dataset.namaPeserta ||
    row.querySelector("td:nth-child(2)").textContent.trim();
  const keterangan = row.querySelector("td:nth-child(4)").textContent.trim();

  document.getElementById("editKPId").value = id;
  document.getElementById("editKPNama").value = nama;
  document.getElementById("editKPKeterangan").value =
    keterangan === "-" ? "" : keterangan;
});

// HAPUS MODAL - Set link (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest('.btn-delete[data-bs-target="#modalHapusKP"]');
  if (!btn) return;
  const row = btn.closest("tr");
  const id = btn.dataset.id;
  const nama = row
    ? row.querySelector("td:nth-child(2)").textContent.trim()
    : "Peserta";
  document.getElementById("hapusKPText").textContent =
    `"${nama}" akan dikeluarkan dari kegiatan ini.`;
  document.getElementById("hapusKPLink").href =
    `php/kegiatan-peserta/proses_hapus_kegiatan_peserta.php?id=${id}`;
});
