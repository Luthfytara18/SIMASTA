document.addEventListener("DOMContentLoaded", () => {
  loadStatistik();
  loadKegiatanTerbaru();
});

// =========================
// LOAD STATISTIK
// =========================
async function loadStatistik() {
  try {
    const response = await fetch(
      "php/dashboard/get-statistik.php"
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data statistik.");
    }

    const data = await response.json();

    document.getElementById("totalKegiatan").textContent =
      data.totalKegiatan;

    document.getElementById("totalPeserta").textContent =
      data.totalPeserta;

    document.getElementById("totalBerlangsung").textContent =
      data.totalBerlangsung;

    document.getElementById("totalDokumentasi").textContent =
      data.totalDokumentasi;
  } catch (error) {
    console.error("Gagal memuat statistik:", error);
  }
}

// =========================
// LOAD KEGIATAN TERBARU
// =========================
async function loadKegiatanTerbaru() {
  try {
    const response = await fetch(
      "php/dashboard/get-kegiatan-terbaru.php"
    );
    if (!response.ok) {
      throw new Error("Gagal mengambil data kegiatan.");
    }

    const kegiatan = await response.json();

    const tbody = document.getElementById("kegiatanTerbaru");

    if (!tbody) return;

    tbody.innerHTML = "";

    kegiatan.forEach((item) => {
      let badgeClass = "";

      switch (item.status.toLowerCase()) {
        case "berlangsung":
          badgeClass = "badge-berlangsung";
          break;

        case "selesai":
          badgeClass = "badge-selesai";
          break;

        case "terjadwal":
          badgeClass = "badge-terjadwal";
          break;
      }

      tbody.innerHTML += `
        <tr>
          <td>${item.nama_kegiatan}</td>
          <td>${item.tanggal}</td>
          <td>
            <span class="badge-status ${badgeClass}">
              ${item.status}
            </span>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Gagal memuat kegiatan terbaru:", error);
  }
}