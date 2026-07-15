document.addEventListener("DOMContentLoaded", () => {
  loadPeserta();
  initSearchPeserta();
  initValidasiForm();
});

// LOAD DATA PESERTA
async function loadPeserta(search = "") {
  const tbody = document.getElementById("pesertaTableBody");
  tbody.innerHTML =
    '<tr><td colspan="6" class="text-center">Memuat data...</td></tr>';

  try {
    let url = "php/peserta/get-data.php";
    if (search) url += "?search=" + encodeURIComponent(search);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.length) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="text-center">Tidak ada data peserta.</td></tr>';
      return;
    }

    let html = "";
    data.forEach((item, index) => {
      const jenisBadge = getJenisBadge(item.jenis_peserta);
      html += `
        <tr data-id="${item.id}" data-jenis="${item.jenis_peserta}" data-telp="${item.no_telp || ""}">
          <td>${index + 1}</td>
          <td>${item.nama_peserta}</td>
          <td>${item.nim_nip}</td>
          <td>${jenisBadge}</td>
          <td>${item.email}</td>
          <td>
            <div class="action-btns">
              <button class="btn-icon btn-edit" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalEditPeserta">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn-icon btn-delete" data-id="${item.id}" data-bs-toggle="modal" data-bs-target="#modalHapusPeserta">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  } catch (error) {
    console.error("Gagal load peserta:", error);
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center text-danger">Gagal memuat data.</td></tr>';
  }
}

function getJenisBadge(jenis) {
  const map = {
    mahasiswa: "badge-mahasiswa",
    dosen: "badge-dosen",
    umum: "badge-umum",
  };
  const cls = map[jenis.toLowerCase()] || "badge-umum";
  return `<span class="badge-jenis ${cls}">${jenis}</span>`;
}

// SEARCH PESERTA
function initSearchPeserta() {
  const searchInput = document.getElementById("searchPeserta");
  if (!searchInput) return;
  let timer;
  searchInput.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      loadPeserta(searchInput.value.trim());
    }, 300);
  });
}

// VALIDASI FORM (tetap dari kode lama)
function initValidasiForm() {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      const nama = form.querySelector('input[name="nama_peserta"]');
      const nimNip = form.querySelector('input[name="nim_nip"]');
      const email = form.querySelector('input[name="email"]');
      const noTelp = form.querySelector('input[name="no_telp"]');

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

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        e.preventDefault();
        alert("Format email tidak valid.");
        return;
      }

      if (noTelp && noTelp.value.trim() !== "") {
        const phonePattern = /^[0-9]{10,15}$/;
        if (!phonePattern.test(noTelp.value)) {
          e.preventDefault();
          alert("Nomor telepon hanya boleh berisi angka (10-15 digit).");
          return;
        }
      }

      if (nimNip.value.length < 5) {
        e.preventDefault();
        alert("NIM / NIP tidak valid.");
      }
    });
  });
}

// EDIT MODAL - Isi data (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest('.btn-edit[data-bs-target="#modalEditPeserta"]');
  if (!btn) return;
  const row = btn.closest("tr");
  if (!row) return;
  const id = btn.dataset.id;
  const cells = row.querySelectorAll("td");

  document.getElementById("editPesertaId").value = id;
  document.getElementById("editPesertaNama").value =
    cells[1].textContent.trim();
  document.getElementById("editPesertaNim").value = cells[2].textContent.trim();

  // Ambil jenis dari badge atau dari dataset
  const jenis = row.dataset.jenis || "umum";
  document.getElementById("editPesertaJenis").value = jenis;
  document.getElementById("editPesertaEmail").value =
    cells[4].textContent.trim();
  document.getElementById("editPesertaTelp").value = row.dataset.telp || "";
});

// HAPUS MODAL - Set link (UNIVERSAL)
document.addEventListener("click", function (e) {
  const btn = e.target.closest(
    '.btn-delete[data-bs-target="#modalHapusPeserta"]',
  );
  if (!btn) return;
  const row = btn.closest("tr");
  const id = btn.dataset.id;
  const nama = row
    ? row.querySelector("td:nth-child(2)").textContent.trim()
    : "Peserta";
  document.getElementById("hapusPesertaText").textContent =
    `"${nama}" akan dihapus permanen.`;
  document.getElementById("hapusPesertaLink").href =
    `php/peserta/proses_hapus_peserta.php?id=${id}`;
});
